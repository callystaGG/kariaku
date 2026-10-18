/* Pemeriksa isi game + pembuat manifes suara.
   Jalankan:  node tools/check.js          (periksa semua pembuat soal)
              node tools/check.js --manifest   (juga menulis tools/manifest.json) */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const src = ['assets', 'content', 'gen', 'audio'].map((f) => fs.readFileSync(path.join(root, 'js', f + '.js'), 'utf8')).join('\n;\n');
const sandbox = { console, TextEncoder, Math };
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: 'game.js' });

const REPS = Number(process.env.REPS || 60);
const result = vm.runInContext(`(function () {
  const errors = [], clips = new Map(), stats = {};
  const addClip = (p) => {
    if (p === undefined || p === null) return;
    const c = clipOf(p);
    if (!c.t || typeof c.t !== 'string' || !c.t.trim()) { errors.push('klip kosong: ' + JSON.stringify(p)); return; }
    clips.set(clipFile(p), { file: clipFile(p), l: c.l, t: c.t });
  };
  const walk = (o) => {
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (o && typeof o === 'object') {
      for (const k of Object.keys(o)) {
        if ((k === 'say' || k === 'sayAnswer') && Array.isArray(o[k])) o[k].forEach(addClip);
        else walk(o[k]);
      }
    }
  };
  const strip = (h) => String(h || '').replace(/<[^>]+>/g, '').trim();
  function check(q, where) {
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
    walk(q);
  }
  let total = 0;
  for (const L of LEVELS) {
    for (const s of AVAIL[L.id]) {
      const list = GENS[L.id][s];
      if (!list || !list.length) { errors.push('tidak ada pembuat soal: ' + L.id + '.' + s); continue; }
      list.forEach((fn, gi) => {
        for (let t = 1; t <= 3; t++) for (let r = 0; r < ${REPS}; r++) {
          try { check(fn(t), L.id + '.' + s + '#' + gi + ' t' + t); total++; }
          catch (err) { errors.push(L.id + '.' + s + '#' + gi + ' t' + t + ' melempar: ' + err.message); }
        }
      });
      stats[L.id + '.' + s] = list.length;
    }
  }
  /* Potongan suara tetap: kalimat umpan balik, pengantar, angka, kosakata, bank bacaan */
  PHRASES.praise.forEach(addClip); PHRASES.retry.forEach(addClip);
  ['reveal', 'gentle', 'welcome', 'chooseLevel', 'chooseSubject', 'done3', 'done2', 'done1', 'traceTry', 'listen', 'ready'].forEach((k) => addClip(PHRASES[k]));
  Object.values(SUBJECTS).forEach((s) => addClip(s.intro));
  for (let n = 0; n <= 99; n++) addClip(idNum(n));
  addClip('seratus'); addClip('seribu');
  for (let h = 2; h <= 9; h++) { addClip(U_ID[h] + ' ratus'); addClip(U_ID[h] + ' ribu'); }
  Object.keys(LETTER_SAY).forEach((k) => addClip(LETTER_SAY[k]));
  SYLLABLES.forEach(addClip);
  Object.keys(OBJ).forEach((k) => { addClip(OBJ[k].id); addClip(EN(OBJ[k].en)); addClip('Ini ' + OBJ[k].id + '.'); addClip(EN('This is ' + (/^[aeiou]/.test(OBJ[k].en) ? 'an ' : 'a ') + OBJ[k].en + '.')); });
  COLORS_EN.forEach((c) => addClip(EN(c.en)));
  EN_NUM.forEach((w, i) => { if (i > 0) addClip(EN(w)); });
  DAYS.forEach((d) => addClip(EN(d[0])));
  EN_GREET.forEach((g) => { addClip(EN(g.q)); g.o.forEach((o) => addClip(EN(o))); });
  EN_TRANS.forEach((p) => { addClip(p[0]); addClip(EN(p[1])); });
  EN_GRAMMAR.forEach((g) => addClip(EN(g.s.replace('___', g.a))));
  EN_READ.forEach((p) => { addClip(EN(p.t)); p.qs.forEach((q) => { addClip(EN(q.q)); addClip(EN(q.a)); }); });
  READ_SD12.forEach((r) => { addClip(r.t); addClip(r.q); addClip(r.a); });
  [READ_SD34, READ_SD56].forEach((bank) => bank.forEach((p) => { addClip(p.t); p.qs.forEach((q) => { addClip(q.q); addClip(q.a); }); }));
  SENTENCES_SD56.forEach(addClip);
  WORDS_TK.forEach(addClip);
  ['Mana angka', 'Mana huruf', 'Mana suku kata', 'Mana gambar', 'Mana warna'].forEach(addClip);
  return { errors, total, stats, clips: Array.from(clips.values()) };
})()`, sandbox);

const errs = result.errors;
console.log(`Soal diperiksa: ${result.total}`);
console.log(`Pembuat soal per jenjang.pelajaran:`, Object.keys(result.stats).length, 'kombinasi');
const uniq = [...new Set(errs)];
if (uniq.length) { console.log(`\nKESALAHAN (${uniq.length} unik):`); uniq.slice(0, 40).forEach((e) => console.log(' - ' + e)); }
else console.log('Tidak ada kesalahan.');
const byLang = result.clips.reduce((a, c) => { a[c.l] = (a[c.l] || 0) + 1; return a; }, {});
console.log('Potongan suara:', result.clips.length, byLang);
if (process.argv.includes('--manifest')) {
  fs.writeFileSync(path.join(root, 'tools', 'manifest.json'), JSON.stringify(result.clips.sort((a, b) => a.file.localeCompare(b.file)), null, 1));
  console.log('Menulis tools/manifest.json');
}
process.exit(uniq.length ? 1 : 0);
