/* Pemeriksa isi game + pembuat manifes suara.
   Jalankan:  node tools/check.js          (periksa semua pembuat soal)
              node tools/check.js --manifest   (juga menulis tools/manifest.json; --manifest-out=BERKAS untuk tujuan lain) */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const src = ['assets', 'content', 'gen', 'audio'].map((f) => fs.readFileSync(path.join(root, 'js', f + '.js'), 'utf8')).join('\n;\n');
const sandbox = { console, TextEncoder, Math };
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: 'game.js' });

/* Membuat manifes memakai lebih banyak contoh soal (200) supaya kalimat yang jarang muncul ikut terdaftar. */
const REPS = Number(process.env.REPS || (process.argv.includes('--manifest') ? 200 : 60));
const result = vm.runInContext(`(function () {
  const errors = [], stats = {};
  const ALL = VOICES.slice();
  const perVoice = {}; ALL.forEach((v) => { perVoice[v] = new Map(); });
  /* Mencatat klip untuk suara-suara yang membacakannya. voices kosong = hanya memeriksa isi klip. */
  const addClip = (p, voices) => {
    if (p === undefined || p === null) return;
    const c = clipOf(p);
    if (!c.t || typeof c.t !== 'string' || !c.t.trim()) { errors.push('klip kosong: ' + JSON.stringify(p)); return; }
    for (const v of voices) perVoice[v].set(clipFile(p, v), { file: clipFile(p, v), v, l: c.l, t: c.t });
  };
  const walk = (o, voices) => {
    if (Array.isArray(o)) { o.forEach((x) => walk(x, voices)); return; }
    if (o && typeof o === 'object') {
      for (const k of Object.keys(o)) {
        if ((k === 'say' || k === 'sayAnswer') && Array.isArray(o[k])) o[k].forEach((p) => addClip(p, voices));
        else walk(o[k], voices);
      }
    }
  };
  const strip = (h) => String(h || '').replace(/<[^>]+>/g, '').trim();
  function check(q, where, voices) {
    const e = (m) => errors.push(where + ' [' + (q && q.key) + ']: ' + m);
    if (!q || typeof q !== 'object') return e('soal kosong');
    if (!['choice', 'keypad', 'trace', 'abacus', 'tiles', 'flash', 'memory'].includes(q.type)) return e('tipe aneh ' + q.type);
    if (typeof q.key !== 'string') e('tanpa key');
    if (typeof q.prompt !== 'string' || !q.prompt) e('tanpa prompt');
    if (JSON.stringify(JSON.parse(JSON.stringify(q))) !== JSON.stringify(q)) e('tidak murni JSON');
    if (q.type === 'choice') {
      if (!Array.isArray(q.opts) || q.opts.length < 2) return e('pilihan kurang');
      const vs = q.opts.map((o) => String(o.v));
      if (new Set(vs).size !== vs.length) e('pilihan kembar: ' + vs.join(','));
      if (vs.filter((v) => v === String(q.answer)).length !== 1) e('jawaban tidak tepat satu di pilihan: ' + q.answer + ' vs ' + vs.join(','));
      q.opts.forEach((o) => { if (!o.html) e('opsi tanpa html'); });
    }
    if (q.type === 'keypad') {
      if (typeof q.answer !== 'number' || !isFinite(q.answer) || q.answer < 0) e('jawaban keypad buruk ' + q.answer);
      const m = strip(q.visual).replace(/\\s+/g, ' ').match(/^(\\d+) ([+\\-×÷−]) (\\d+) = \\?$/);
      if (m) { const a = +m[1], b = +m[3], op = m[2]; const r = op === '+' ? a + b : op === '×' ? a * b : op === '÷' ? a / b : a - b; if (r !== q.answer) e('hitungan salah ' + strip(q.visual) + ' vs ' + q.answer); }
    }
    if (q.type === 'tiles') {
      const bag = q.tiles.slice(); for (const a of q.answer) { const i = bag.indexOf(a); if (i < 0) { e('ubin tak cukup'); break; } bag.splice(i, 1); }
    }
    if (q.type === 'trace') { if (q.mode === 'text' ? !q.text : !(q.pts && q.pts.length)) e('trace kosong'); }
    if (q.type === 'abacus') { if (!Number.isInteger(q.target) || q.target < 0 || q.target > Math.pow(10, q.rods) - 1) e('target sempoa di luar batas ' + q.target); }
    if (q.type === 'flash') { if (q.seq.reduce((a, b) => a + b, 0) !== q.answer) e('jumlah kilat salah'); }
    if (q.type === 'memory') { if (q.value !== q.answer || q.value >= Math.pow(10, q.rods)) e('memory salah'); }
    walk(q, voices);
  }
  let total = 0;
  for (const L of LEVELS) {
    for (const s of AVAIL[L.id]) {
      const list = GENS[L.id][s];
      if (!list || !list.length) { errors.push('tidak ada pembuat soal: ' + L.id + '.' + s); continue; }
      const voices = [SUBJECTS[s].guide]; /* soal dibacakan pemandu pelajarannya */
      list.forEach((fn, gi) => {
        for (let t = 1; t <= 3; t++) for (let r = 0; r < ${REPS}; r++) {
          try { check(fn(t), L.id + '.' + s + '#' + gi + ' t' + t, voices); total++; }
          catch (err) { errors.push(L.id + '.' + s + '#' + gi + ' t' + t + ' melempar: ' + err.message); }
        }
      });
      stats[L.id + '.' + s] = list.length;
    }
  }
  /* Potongan suara tetap: kalimat umpan balik, pengantar, angka, kosakata, bank bacaan */
  const addFixed = (p) => addClip(p, ALL);
  PHRASES.praise.forEach(addFixed); PHRASES.retry.forEach(addFixed);
  ['reveal', 'gentle', 'welcome', 'chooseLevel', 'chooseSubject', 'done3', 'done2', 'done1', 'traceTry', 'listen', 'ready'].forEach((k) => addFixed(PHRASES[k]));
  Object.values(SUBJECTS).forEach((s) => addFixed(s.intro));
  /* Bank kosakata: dicatat untuk pemandu yang membacakannya dalam soal. Yang tak pernah muncul di contoh soal dibuat untuk semua suara. */
  const staticClips = []; const addStatic = (p) => staticClips.push(p);
  for (let n = 0; n <= 99; n++) addStatic(idNum(n));
  addStatic('seratus'); addStatic('seribu');
  for (let h = 2; h <= 9; h++) { addStatic(U_ID[h] + ' ratus'); addStatic(U_ID[h] + ' ribu'); }
  Object.keys(LETTER_SAY).forEach((k) => addStatic(LETTER_SAY[k]));
  SYLLABLES.forEach(addStatic);
  Object.keys(OBJ).forEach((k) => { addStatic(OBJ[k].id); addStatic(EN(OBJ[k].en)); addStatic('Ini ' + OBJ[k].id + '.'); addStatic(EN('This is ' + (/^[aeiou]/.test(OBJ[k].en) ? 'an ' : 'a ') + OBJ[k].en + '.')); });
  COLORS_EN.forEach((c) => addStatic(EN(c.en)));
  EN_NUM.forEach((w, i) => { if (i > 0) addStatic(EN(w)); });
  DAYS.forEach((d) => addStatic(EN(d[0])));
  EN_GREET.forEach((g) => { addStatic(EN(g.q)); g.o.forEach((o) => addStatic(EN(o))); });
  EN_TRANS.forEach((p) => { addStatic(p[0]); addStatic(EN(p[1])); });
  EN_GRAMMAR.forEach((g) => addStatic(EN(g.s.replace('___', g.a))));
  EN_READ.forEach((p) => { addStatic(EN(p.t)); p.qs.forEach((q) => { addStatic(EN(q.q)); addStatic(EN(q.a)); }); });
  READ_SD12.forEach((r) => { addStatic(r.t); addStatic(r.q); addStatic(r.a); });
  [READ_SD34, READ_SD56].forEach((bank) => bank.forEach((p) => { addStatic(p.t); p.qs.forEach((q) => { addStatic(q.q); addStatic(q.a); }); }));
  SENTENCES_SD56.forEach(addStatic);
  WORDS_TK.forEach(addStatic);
  ['Mana angka', 'Mana huruf', 'Mana suku kata', 'Mana gambar', 'Mana warna'].forEach(addStatic);
  staticClips.forEach((p) => { addClip(p, []); const done = ALL.some((v) => perVoice[v].has(clipFile(p, v))); if (!done) addClip(p, ALL); });
  return { errors, total, stats, clips: ALL.flatMap((v) => Array.from(perVoice[v].values())) };
})()`, sandbox);

const errs = result.errors;
console.log(`Soal diperiksa: ${result.total}`);
console.log(`Pembuat soal per jenjang.pelajaran:`, Object.keys(result.stats).length, 'kombinasi');
const uniq = [...new Set(errs)];
if (uniq.length) { console.log(`\nKESALAHAN (${uniq.length} unik):`); uniq.slice(0, 40).forEach((e) => console.log(' - ' + e)); }
else console.log('Tidak ada kesalahan.');
const byLang = result.clips.reduce((a, c) => { a[c.l] = (a[c.l] || 0) + 1; return a; }, {});
const byVoice = result.clips.reduce((a, c) => { a[c.v] = (a[c.v] || 0) + 1; return a; }, {});
console.log('Potongan suara:', result.clips.length, byLang, 'per karakter:', byVoice);
if (process.argv.includes('--manifest')) {
  const outArg = process.argv.find((a) => a.startsWith('--manifest-out='));
  const target = outArg ? outArg.slice('--manifest-out='.length) : path.join(root, 'tools', 'manifest.json');
  fs.writeFileSync(target, JSON.stringify(result.clips.sort((a, b) => a.file.localeCompare(b.file)), null, 1));
  console.log('Menulis ' + path.relative(root, target));
}
process.exit(uniq.length ? 1 : 0);
