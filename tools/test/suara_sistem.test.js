// Suara sistem (speechSynthesis) sebagai cadangan saat rekaman belum ada.  Jalankan: node --test tools/test
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs'), vm = require('vm'), path = require('path');

const root = path.join(__dirname, '..', '..');
const VOICES = {
  gadis: { name: 'Microsoft Gadis Online (Natural) - Indonesian (Indonesia)', lang: 'id-ID' },
  andika: { name: 'Microsoft Andika - Indonesian (Indonesia)', lang: 'id-ID' },
  jenny: { name: 'Microsoft Jenny Online (Natural) - English (United States)', lang: 'en-US' },
  guy: { name: 'Microsoft Guy Online (Natural) - English (United States)', lang: 'en-US' }
};

function lingkungan({ voices = [VOICES.gadis, VOICES.andika, VOICES.jenny, VOICES.guy], audioOk = false, tanpaSintesis = false } = {}) {
  const spoken = [], dibuat = [];
  const synth = {
    cancelled: 0,
    getVoices: () => voices,
    speak(u) { spoken.push(u); setImmediate(() => u.onend && u.onend()); },
    cancel() { synth.cancelled++; }
  };
  class Utt { constructor(text) { this.text = text; } }
  class FakeAudio {
    constructor(url) { this.url = url; dibuat.push(url); }
    play() { setImmediate(() => (audioOk ? this.onended && this.onended() : this.onerror && this.onerror())); return Promise.resolve(); }
    pause() {}
  }
  const extra = { setTimeout, clearTimeout, setImmediate, Audio: FakeAudio };
  if (!tanpaSintesis) { extra.speechSynthesis = synth; extra.SpeechSynthesisUtterance = Utt; }
  const src = ['assets', 'content', 'gen', 'audio'].map((f) => fs.readFileSync(path.join(root, 'js', f + '.js'), 'utf8')).join('\n;\n');
  const sb = { console, TextEncoder, Math, ...extra };
  vm.createContext(sb); vm.runInContext(src, sb, { filename: 'game.js' });
  return { sb, spoken, dibuat, synth, run: (code) => vm.runInContext(code, sb) };
}

test('mode sistem: kalimat diucapkan dengan nada dan tempo karakter', async () => {
  const e = lingkungan();
  await e.run("A.mode = 'system'; A.setVoice('bintang'); A.say(['Ayo berhitung'])");
  assert.strictEqual(e.spoken.length, 1);
  assert.strictEqual(e.spoken[0].text, 'Ayo berhitung');
  assert.strictEqual(e.spoken[0].lang, 'id-ID');
  assert.strictEqual(e.spoken[0].pitch, e.run('SYSTEM_VOICES.bintang.pitch'));
  assert.strictEqual(e.spoken[0].rate, e.run('SYSTEM_VOICES.bintang.rate'));
  assert.deepStrictEqual(e.dibuat, [], 'mode sistem tidak boleh meminta berkas rekaman');
});

test('tiap karakter punya profil berbeda', () => {
  const e = lingkungan();
  const profil = ['awan', 'bintang', 'bulan'].map((v) => JSON.stringify(e.run(`SYSTEM_VOICES.${v}`)));
  assert.strictEqual(new Set(profil).size, 3);
});

test('memilih suara sistem sesuai bahasa dan jenis kelamin karakter', async () => {
  const e = lingkungan();
  await e.run("A.mode = 'system'; A.setVoice('awan'); A.say(['Halo'])");
  await e.run("A.setVoice('bulan'); A.say(['Halo'])");
  await e.run("A.setVoice('bulan'); A.say([{ l: 'en', t: 'green' }])");
  await e.run("A.setVoice('bintang'); A.say([{ l: 'en', t: 'green' }])");
  assert.deepStrictEqual(e.spoken.map((u) => u.voice && u.voice.name), [VOICES.gadis.name, VOICES.andika.name, VOICES.guy.name, VOICES.jenny.name]);
  assert.strictEqual(e.spoken[2].lang, 'en-US');
});

test('bagian berurutan dalam bahasa yang sama digabung agar mengalir', async () => {
  const e = lingkungan();
  await e.run("A.mode = 'system'; A.say(['satu', 'dua', { l: 'en', t: 'three' }, 'empat'])");
  assert.deepStrictEqual(e.spoken.map((u) => u.text), ['satu dua', 'three', 'empat']);
});

test('rekaman diutamakan: jika ada, suara sistem tidak dipakai', async () => {
  const e = lingkungan({ audioOk: true });
  await e.run("A.mode = 'clips'; A.setVoice('bulan'); A.say(['Halo'])");
  assert.strictEqual(e.spoken.length, 0);
  assert.strictEqual(e.dibuat.length, 1);
  assert.match(e.dibuat[0], /^audio\/bulan\/id_[0-9a-f]{8}\.mp3$/);
});

test('rekaman yang tidak ada digantikan suara sistem untuk klip itu saja', async () => {
  const e = lingkungan({ audioOk: false });
  await e.run("A.mode = 'clips'; A.say(['Halo teman'])");
  assert.deepStrictEqual(e.spoken.map((u) => u.text), ['Halo teman']);
  assert.strictEqual(e.run('A.missing'), 1);
});

test('tanpa suara sistem di perangkat: tidak menggantung dan tidak melempar galat', async () => {
  const kosong = lingkungan({ voices: [] });
  await kosong.run("A.mode = 'system'; A.say(['Halo'])");
  assert.strictEqual(kosong.spoken.length, 0);
  const tanpa = lingkungan({ tanpaSintesis: true });
  await tanpa.run("A.mode = 'system'; A.say(['Halo'])");
});

test('berhenti dan tombol suara mematikan suara sistem', async () => {
  const e = lingkungan();
  e.run("A.stop()");
  assert.ok(e.synth.cancelled >= 1, 'speechSynthesis.cancel tidak dipanggil');
  await e.run("A.mode = 'system'; A.setSound(false); A.say(['Halo'])");
  assert.strictEqual(e.spoken.length, 0);
});

test('pesan di layar depan menyesuaikan: suara sistem tersedia atau tidak', () => {
  assert.strictEqual(lingkungan().run('A.systemOK()'), true);
  assert.strictEqual(lingkungan({ voices: [] }).run('A.systemOK()'), false);
  assert.strictEqual(lingkungan({ tanpaSintesis: true }).run('A.systemOK()'), false);
});
