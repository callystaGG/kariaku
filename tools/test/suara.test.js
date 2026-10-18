// Jalankan:  node --test tools/test
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs'), vm = require('vm'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..', '..');
const VOICES = ['awan', 'bintang', 'bulan'];

function loadGame() {
  const src = ['assets', 'content', 'gen', 'audio'].map((f) => fs.readFileSync(path.join(root, 'js', f + '.js'), 'utf8')).join('\n;\n');
  const sandbox = { console, TextEncoder, Math };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: 'game.js' });
  return sandbox;
}
const run = (sb, code) => vm.runInContext(code, sb);

test('jalur klip memuat folder karakter dan awan adalah bawaan', () => {
  const sb = loadGame();
  const hash = run(sb, "fnv1a('Halo')");
  assert.strictEqual(run(sb, "clipFile('Halo', 'bulan')"), `audio/bulan/id_${hash}.mp3`);
  assert.strictEqual(run(sb, "clipFile('Halo')"), `audio/awan/id_${hash}.mp3`);
  assert.strictEqual(run(sb, "clipFile({ l: 'en', t: 'Halo' }, 'bintang')"), `audio/bintang/en_${hash}.mp3`);
});

test('suara yang tidak dikenal jatuh ke awan', () => {
  const sb = loadGame();
  const hash = run(sb, "fnv1a('Halo')");
  assert.strictEqual(run(sb, "clipFile('Halo', 'naga')"), `audio/awan/id_${hash}.mp3`);
  assert.strictEqual(run(sb, "A.setVoice('bintang'); A.voice"), 'bintang');
  assert.strictEqual(run(sb, "A.setVoice('naga'); A.voice"), 'awan');
  assert.strictEqual(run(sb, "A.setVoice(undefined); A.voice"), 'awan');
});

test('manifes per karakter: lengkap, tanpa kembar, dan sesuai jalur game', () => {
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'kawan-')), 'manifest.json');
  const r = spawnSync(process.execPath, [path.join(root, 'tools', 'check.js'), '--manifest', `--manifest-out=${out}`], { env: { ...process.env, REPS: '20' }, encoding: 'utf8' });
  assert.strictEqual(r.status, 0, r.stdout + r.stderr);
  const manifest = JSON.parse(fs.readFileSync(out, 'utf8'));
  const sb = loadGame();

  const files = manifest.map((m) => m.file);
  assert.strictEqual(new Set(files).size, files.length, 'ada berkas kembar di manifes');
  for (const m of manifest) {
    assert.ok(VOICES.includes(m.v), 'suara tak dikenal: ' + m.v);
    sb.__m = m;
    assert.strictEqual(m.file, run(sb, "clipFile({ l: __m.l, t: __m.t }, __m.v)"), 'jalur manifes beda dari game: ' + m.t);
  }
  const has = (v, p) => { sb.__p = p; sb.__v = v; return files.includes(run(sb, 'clipFile(__p, __v)')); };

  // kalimat tetap dibuat untuk ketiga karakter
  for (const v of VOICES) {
    assert.ok(has(v, run(sb, 'PHRASES.praise[0]')), 'pujian hilang untuk ' + v);
    assert.ok(has(v, run(sb, 'PHRASES.retry[0]')), 'coba-lagi hilang untuk ' + v);
    assert.ok(has(v, run(sb, 'PHRASES.done3')), 'selesai hilang untuk ' + v);
  }
  // pengantar pelajaran diucapkan pemandunya
  assert.ok(has('awan', run(sb, 'SUBJECTS.baca.intro')));
  assert.ok(has('bintang', run(sb, 'SUBJECTS.mat.intro')));
  assert.ok(has('bulan', run(sb, 'SUBJECTS.inggris.intro')));
  // kosakata Inggris diucapkan Bulan (pemandu Bahasa Inggris)
  assert.ok(has('bulan', run(sb, "EN('twenty')")), 'kata Inggris tidak ada untuk bulan');
});

test('soal deduksi dibacakan per pernyataan, sehingga klipnya terbatas dan bisa direkam', () => {
  const sb = loadGame();
  const texts = new Set();
  for (const n of [3, 4, 5]) for (let i = 0; i < 1500; i++) {
    const q = run(sb, `deductionQ(${n})`);
    q.say.forEach((p) => texts.add(typeof p === 'string' ? p : p.t));
  }
  const pernyataan = [...texts].filter((t) => !t.startsWith('Siapa yang'));
  for (const t of pernyataan) {
    assert.match(t, /^[A-Z][a-z]+ lebih [a-z]+ dari [A-Z][a-z]+\.$/, 'klip memuat lebih dari satu pernyataan: ' + t);
  }
  // 8 nama x 7 lawan x 3 sifat = 168 pernyataan paling banyak, ditambah beberapa pertanyaan
  assert.ok(texts.size <= 168 + 12, 'klip deduksi tidak terbatas: ' + texts.size);
});

test('urutan bicara deduksi sama dengan urutan yang tampil di layar', () => {
  const sb = loadGame();
  for (let i = 0; i < 200; i++) {
    const q = run(sb, 'deductionQ(4)');
    const tampil = q.visual.replace(/<[^>]+>/g, '').trim();
    const bicara = q.say.filter((p) => !String(p).startsWith('Siapa yang')).join(' ');
    assert.strictEqual(bicara, tampil);
  }
});
