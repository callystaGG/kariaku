/* Pembuat soal: setiap fungsi menerima tingkat kesulitan t (1..3) dan mengembalikan data soal murni (JSON). */

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (a) => a[rnd(0, a.length - 1)];
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const uniq = (a) => Array.from(new Set(a));

function numChoices(c, n, lo, hi) {
  const s = new Set([c]); let g = 0;
  while (s.size < n && g++ < 300) {
    const d = c + pick([-3, -2, -1, 1, 2, 3, -10, 10, -5, 5]);
    if (d >= lo && d <= hi) s.add(d);
  }
  for (let v = lo; s.size < n && v <= hi; v++) s.add(v);
  return shuffle([...s]);
}
const bigOpt = (v) => ({ v, html: `<span class="big">${v}</span>`, say: N(Number(v)) });
const numOpts = (vals) => vals.map(bigOpt);

function iconGrid(ic, n, px, cols, goneFrom) {
  let s = `<div class="igrid" style="--cols:${cols}">`;
  for (let i = 0; i < n; i++) s += `<span class="${goneFrom !== undefined && i >= goneFrom ? 'gone' : ''}">${icon(ic, px)}</span>`;
  return s + '</div>';
}
const exprHTML = (t) => `<div class="expr">${t}</div>`;
const fracHTML = (n, d) => `<span class="frac"><b>${n}</b><i>${d}</i></span>`;
const SAY_SIGN = { '<': 'kurang dari', '>': 'lebih dari', '=': 'sama dengan' };

/* ============ MATEMATIKA ============ */
function countQ(max, px) {
  const n = rnd(1, max), ic = pick(COUNT_ICONS), nm = OBJ[ic].id;
  const size = px || (max <= 5 ? 60 : max <= 10 ? 48 : 38);
  return { type: 'choice', key: `cnt-${ic}-${n}`, prompt: `Ada berapa ${nm}?`, say: ['Ada berapa', nm],
    visual: iconGrid(ic, n, size, Math.min(n, 5)), opts: numOpts(numChoices(n, max > 10 ? 4 : 3, 1, Math.max(max + 2, n + 2))), answer: n, sayAnswer: N(n) };
}
function moreQ(max, fewer) {
  const ic = pick(COUNT_ICONS); let a = rnd(1, max), b = rnd(1, max); while (b === a) b = rnd(1, max);
  const sz = max <= 5 ? 34 : 28;
  return { type: 'choice', key: `more-${ic}-${a}-${b}-${fewer ? 1 : 0}`, prompt: fewer ? 'Mana yang lebih sedikit?' : 'Mana yang lebih banyak?', say: [fewer ? 'Mana yang lebih sedikit' : 'Mana yang lebih banyak'],
    opts: [{ v: 'L', html: iconGrid(ic, a, sz, Math.min(a, 3)) }, { v: 'R', html: iconGrid(ic, b, sz, Math.min(b, 3)) }],
    answer: (fewer ? a < b : a > b) ? 'L' : 'R', cols: 2 };
}
function findNumQ(max) {
  const n = rnd(1, max);
  return { type: 'choice', key: `find-${n}-${max}`, prompt: `Mana angka ${n}?`, say: ['Mana angka'].concat(N(n)), opts: numOpts(numChoices(n, 3, 1, max)), answer: n, sayAnswer: N(n) };
}
function addObjsQ(maxSum) {
  const a = rnd(1, maxSum - 1), b = rnd(1, maxSum - a), ic = pick(COUNT_ICONS), s = a + b;
  const px = maxSum <= 5 ? 44 : 34;
  return { type: 'choice', key: `addo-${a}-${b}-${ic}`, prompt: 'Berapa semuanya?', say: ['Berapa'].concat(N(a), ['tambah'], N(b)),
    visual: `<div class="addrow">${iconGrid(ic, a, px, Math.min(a, 3))}<span class="op">+</span>${iconGrid(ic, b, px, Math.min(b, 3))}</div>`,
    opts: numOpts(numChoices(s, 3, 1, maxSum + 2)), answer: s, sayAnswer: N(s) };
}
function subObjsQ(maxA) {
  const a = rnd(2, maxA), b = rnd(1, a - 1), ic = pick(COUNT_ICONS), r = a - b;
  return { type: 'choice', key: `subo-${a}-${b}-${ic}`, prompt: `Ada ${a}, diambil ${b}. Sisa berapa?`, say: ['Ada'].concat(N(a), ['diambil'], N(b), ['Sisa berapa']),
    visual: iconGrid(ic, a, a > 6 ? 38 : 46, Math.min(a, 5), a - b), opts: numOpts(numChoices(r, 3, 0, maxA)), answer: r, sayAnswer: N(r) };
}
function nextNumQ(max, before) {
  const n = before ? rnd(2, max) : rnd(1, max - 1), r = before ? n - 1 : n + 1;
  return { type: 'choice', key: `nx-${n}-${before ? 'b' : 'a'}`, prompt: `${before ? 'Sebelum' : 'Setelah'} angka ${n} adalah?`, say: [before ? 'Sebelum angka' : 'Setelah angka'].concat(N(n), ['adalah angka berapa']),
    visual: exprHTML(before ? `? , ${n}` : `${n} , ?`), opts: numOpts(numChoices(r, 3, 0, max + 1)), answer: r, sayAnswer: N(r) };
}
function bigSmallNumQ(max) {
  let a = rnd(1, max), b = rnd(1, max); while (a === b) b = rnd(1, max);
  const big = Math.random() < 0.5;
  return { type: 'choice', key: `bs-${a}-${b}-${big ? 1 : 0}`, prompt: big ? 'Mana angka yang lebih besar?' : 'Mana angka yang lebih kecil?', say: [big ? 'Mana angka yang lebih besar' : 'Mana angka yang lebih kecil'],
    opts: numOpts([a, b]), answer: big ? Math.max(a, b) : Math.min(a, b), cols: 2, sayAnswer: N(big ? Math.max(a, b) : Math.min(a, b)) };
}
function exprKeypad(a, op, b, ans, key, extra) {
  const sayOp = { '+': 'tambah', '-': 'kurang', '×': 'kali', '÷': 'bagi' }[op];
  return Object.assign({ type: 'keypad', key, prompt: 'Berapa hasilnya?', say: ['Berapa'].concat(N(a), [sayOp], N(b)), visual: exprHTML(`${a} ${op} ${b} = ?`), answer: ans, sayAnswer: N(ans) }, extra || {});
}
function addSubQ(max, allowSub) {
  const sub = allowSub && Math.random() < 0.5;
  if (sub) { const a = rnd(2, max), b = rnd(1, a); return exprKeypad(a, '-', b, a - b, `sub-${a}-${b}`); }
  const a = rnd(1, max - 1), b = rnd(1, max - a); return exprKeypad(a, '+', b, a + b, `add-${a}-${b}`);
}
function placeValueQ(max) {
  const n = rnd(11, max), which = pick(['puluhan', 'satuan']);
  const tens = Math.floor(n / 10) % 10, ones = n % 10, ans = which === 'puluhan' ? tens : ones;
  return { type: 'choice', key: `pv-${n}-${which}`, prompt: `Pada angka ${n}, berapa ${which}nya?`, say: ['Pada angka'].concat(N(n), ['berapa ' + which + 'nya']),
    visual: exprHTML(String(n)), opts: numOpts(numChoices(ans, 4, 0, 9)), answer: ans, sayAnswer: N(ans) };
}
function compareNumsQ(max) {
  let a = rnd(1, max), b = rnd(1, max); if (Math.random() < 0.15) b = a;
  const sign = a < b ? '<' : a > b ? '>' : '=';
  return { type: 'choice', key: `cmp-${a}-${b}`, prompt: 'Pilih tanda yang benar.', say: ['Pilih tanda yang benar'], visual: exprHTML(`${a} <span class="blank">?</span> ${b}`),
    opts: ['<', '>', '='].map((s) => ({ v: s, html: `<span class="big">${s}</span>`, say: [SAY_SIGN[s]] })), answer: sign, cols: 3 };
}
function skipCountQ(max) {
  const step = pick([2, 5, 10]), start = step * rnd(0, 3), seq = [0, 1, 2, 3].map((i) => start + step * i), ans = start + step * 4;
  return { type: 'keypad', key: `skip-${step}-${start}`, prompt: 'Lanjutkan hitungannya.', say: ['Lanjutkan hitungannya'], visual: exprHTML(seq.join(' , ') + ' , ?'), answer: ans, sayAnswer: N(ans) };
}
function mulQ(t) {
  const hi = t === 1 ? 5 : t === 2 ? 9 : 12, a = rnd(2, hi), b = rnd(2, 10);
  return exprKeypad(a, '×', b, a * b, `mul-${a}-${b}`);
}
function divQ(t) {
  const hi = t === 1 ? 5 : t === 2 ? 9 : 12, b = rnd(2, hi), c = rnd(2, 10);
  return exprKeypad(b * c, '÷', b, c, `div-${b * c}-${b}`);
}
function add3Q(t) {
  const hi = t === 1 ? 200 : t === 2 ? 500 : 900, a = rnd(30, hi), b = rnd(30, hi);
  if (Math.random() < 0.5) return exprKeypad(a, '+', b, a + b, `add3-${a}-${b}`);
  const x = Math.max(a, b), y = Math.min(a, b); return exprKeypad(x, '-', y, x - y, `sub3-${x}-${y}`);
}
function fracReadQ(t) {
  const d = pick(t === 1 ? [2, 3, 4] : [3, 4, 5, 6, 8]), n = rnd(1, d - 1), correct = `${n}/${d}`;
  let bar = `<div class="fbar" style="--d:${d}">`;
  for (let i = 0; i < d; i++) bar += `<span class="${i < n ? 'on' : ''}"></span>`;
  bar += '</div>';
  const cand = uniq([`${d - n}/${d}`, `${n}/${d + 1}`, `${Math.min(n + 1, d)}/${d}`, `${n}/${d + 2}`].filter((x) => x !== correct));
  const opts = [correct, ...cand.slice(0, 2)];
  return { type: 'choice', key: `frac-${n}-${d}`, prompt: 'Pecahan berapa bagian yang berwarna?', say: ['Pecahan berapa bagian yang berwarna'], visual: bar,
    opts: shuffle(opts).map((s) => { const [a, b] = s.split('/'); return { v: s, html: fracHTML(a, b) }; }), answer: correct, cols: 3 };
}
function wordProblemQ(t, lvl) {
  const nm = pick(NAMES), item = pick(['kelereng', 'permen', 'stiker', 'buku', 'pensil', 'apel']);
  const kinds = [
    () => { const a = rnd(10, 40 * t), b = rnd(5, 30 * t); return { s: `${nm} punya ${a} ${item}. Lalu ${nm} diberi ${b} ${item} lagi. Berapa ${item} ${nm} sekarang?`, a: a + b }; },
    () => { const a = rnd(20, 50 * t), b = rnd(5, 19); return { s: `${nm} punya ${a} ${item}. Sebanyak ${b} ${item} diberikan kepada adik. Berapa ${item} yang tersisa?`, a: a - b }; },
    () => { const a = rnd(2, 9), b = rnd(3, 9); return { s: `Ada ${a} kotak. Setiap kotak berisi ${b} ${item}. Berapa ${item} seluruhnya?`, a: a * b }; },
    () => { const b = rnd(2, 8), c = rnd(3, 9); return { s: `${b * c} ${item} dibagi sama rata untuk ${b} anak. Setiap anak mendapat berapa ${item}?`, a: c }; }
  ];
  if (lvl === 'sd56') {
    kinds.push(() => { const p = rnd(2, 9) * 1000, q = rnd(2, 9) * 500; return { s: `${nm} membeli buku seharga Rp${p} dan pensil seharga Rp${q}. Berapa rupiah yang harus dibayar?`, a: p + q }; });
    kinds.push(() => { const k = rnd(3, 9), v = rnd(4, 9) * 100; return { s: `Satu pak berisi ${k} penghapus. ${nm} membeli 12 pak. Berapa penghapus yang ${nm} punya?`, a: k * 12 }; });
    kinds.push(() => { const s = rnd(2, 5) * 20, h = pick([2, 3, 4, 5]); return { s: `Sebuah mobil melaju dengan kecepatan ${s} km per jam selama ${h} jam. Berapa km jarak yang ditempuh?`, a: s * h }; });
  }
  const k = pick(kinds)();
  return { type: 'keypad', key: 'wp-' + k.s, prompt: k.s, visual: `<div class="story">${k.s}</div>`, answer: k.a, noSpeak: true, sayAnswer: N(k.a) };
}
function fracAddQ() {
  const d = pick([5, 6, 7, 8, 9, 10]), a = rnd(1, d - 2), b = rnd(1, d - a - 1), r = a + b, correct = `${r}/${d}`;
  const wrong = uniq([`${r}/${d * 2}`, `${a * b}/${d}`, `${r + 1}/${d}`, `${a + b}/${d + d - 1}`].filter((x) => x !== correct));
  return { type: 'choice', key: `fadd-${a}-${b}-${d}`, prompt: 'Berapa hasilnya?', visual: exprHTML(`${fracHTML(a, d)} + ${fracHTML(b, d)} = ?`),
    opts: shuffle([correct, ...wrong.slice(0, 3)]).map((s) => { const [x, y] = s.split('/'); return { v: s, html: fracHTML(x, y) }; }), answer: correct, cols: 2 };
}
function fracOfQ() {
  const d = pick([2, 3, 4, 5]), n = rnd(1, d - 1), m = d * rnd(2, 8);
  return { type: 'keypad', key: `fof-${n}-${d}-${m}`, prompt: 'Berapa hasilnya?', visual: exprHTML(`${fracHTML(n, d)} dari ${m} = ?`), answer: n * m / d, sayAnswer: N(n * m / d) };
}
function percentQ() {
  const p = pick([10, 20, 25, 50, 75]), base = pick([40, 80, 100, 200, 120]);
  return { type: 'keypad', key: `pct-${p}-${base}`, prompt: 'Berapa hasilnya?', visual: exprHTML(`${p}% dari ${base} = ?`), answer: p * base / 100, sayAnswer: N(p * base / 100) };
}
function decimalQ() {
  const a = rnd(11, 59) / 10, b = rnd(11, 59) / 10, plus = Math.random() < 0.6, x = Math.max(a, b), y = Math.min(a, b);
  const f = (v) => String(v).replace('.', ',');
  return plus ? { type: 'keypad', key: `dec-${a}-${b}-p`, prompt: 'Berapa hasilnya?', visual: exprHTML(`${f(a)} + ${f(b)} = ?`), answer: Math.round((a + b) * 10) / 10, dot: true }
    : { type: 'keypad', key: `dec-${x}-${y}-m`, prompt: 'Berapa hasilnya?', visual: exprHTML(`${f(x)} − ${f(y)} = ?`), answer: Math.round((x - y) * 10) / 10, dot: true };
}
function orderOpsQ() {
  const a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9), k = pick(['a+b×c', 'a×b−c', '(a+b)×c']);
  let s, ans;
  if (k === 'a+b×c') { s = `${a} + ${b} × ${c}`; ans = a + b * c; }
  else if (k === 'a×b−c') { s = `${a} × ${b} − ${c}`; ans = a * b - c; if (ans < 0) { ans = a * b + c; s = `${a} × ${b} + ${c}`; } }
  else { s = `(${a} + ${b}) × ${c}`; ans = (a + b) * c; }
  return { type: 'keypad', key: 'ord-' + s, prompt: 'Berapa hasilnya?', visual: exprHTML(`${s} = ?`), answer: ans, sayAnswer: N(ans) };
}
function mul2Q(t) {
  const a = rnd(11, t === 1 ? 25 : t === 2 ? 49 : 99), b = rnd(3, t === 3 ? 12 : 9);
  return exprKeypad(a, '×', b, a * b, `mul2-${a}-${b}`);
}
function gcdQ() {
  const g = rnd(2, 9), a = g * rnd(2, 5); let b = g * rnd(2, 6); while (b === a) b = g * rnd(2, 6);
  const gcd = (x, y) => (y ? gcd(y, x % y) : x), lcmMode = Math.random() < 0.5;
  const G = gcd(a, b);
  return { type: 'keypad', key: `gcd-${a}-${b}-${lcmMode ? 'k' : 'f'}`, prompt: lcmMode ? `Berapa KPK dari ${a} dan ${b}?` : `Berapa FPB dari ${a} dan ${b}?`, visual: `<div class="story">${lcmMode ? 'KPK' : 'FPB'} dari ${a} dan ${b} = ?</div>`, answer: lcmMode ? a * b / G : G, noSpeak: true };
}
function averageQ() {
  const n = rnd(3, 5), avg = rnd(5, 20), arr = Array.from({ length: n }, () => avg + rnd(-4, 4)); arr[n - 1] += avg * n - arr.reduce((x, y) => x + y, 0);
  if (arr[n - 1] < 1) return averageQ();
  return { type: 'keypad', key: 'avg-' + arr.join('-'), prompt: 'Berapa rata-ratanya?', visual: `<div class="story">Rata-rata dari ${arr.join(', ')} adalah ...</div>`, answer: avg, noSpeak: true };
}

/* ============ HITUNG CEPAT ============ */
function speedChoiceQ(max, secs) {
  const a = rnd(1, max - 1), b = rnd(1, max - a), plus = Math.random() < 0.65;
  if (plus || a < 2) return Object.assign(exprChoice(a, '+', b, a + b, max), { timed: secs });
  const x = rnd(2, max), y = rnd(1, x - 1); return Object.assign(exprChoice(x, '-', y, x - y, max), { timed: secs });
}
function exprChoice(a, op, b, ans, max) {
  const sayOp = op === '+' ? 'tambah' : 'kurang';
  return { type: 'choice', key: `qc-${a}${op}${b}`, prompt: 'Berapa hasilnya?', say: ['Berapa'].concat(N(a), [sayOp], N(b)), visual: exprHTML(`${a} ${op} ${b} = ?`), opts: numOpts(numChoices(ans, 3, 0, Math.max(max, ans + 3))), answer: ans, sayAnswer: N(ans) };
}
function speedKeyQ(level, t) {
  let q;
  if (level === 'sd12') {
    const hi = [20, 50, 100][t - 1], k = pick(['add', 'sub', 'dbl']);
    if (k === 'dbl') { const a = rnd(2, hi / 2 | 0); q = exprKeypad(a, '+', a, a * 2, `sq-d${a}`); }
    else q = addSubQ(hi, k === 'sub');
    q.timed = [14, 12, 10][t - 1];
  } else if (level === 'sd34') {
    const k = pick(['mul', 'mul', 'div', 'add9', 'add3']);
    if (k === 'mul') q = mulQ(t);
    else if (k === 'div') q = divQ(t);
    else if (k === 'add9') { const a = rnd(12, 190), d = pick([9, 99]); q = exprKeypad(a, '+', d, a + d, `sp9-${a}-${d}`); }
    else q = add3Q(t);
    q.timed = [14, 12, 10][t - 1];
  } else {
    const k = pick(['mul2', 'sq', 'pct', 'ord', 'mix']);
    if (k === 'mul2') q = mul2Q(t);
    else if (k === 'sq') { const a = rnd(6, 10 + t * 3); q = exprKeypad(a, '×', a, a * a, `sqr-${a}`); }
    else if (k === 'pct') q = percentQ();
    else if (k === 'ord') q = orderOpsQ();
    else { const a = rnd(20, 90), b = rnd(10, 60), c = rnd(5, 30); q = { type: 'keypad', key: `mix-${a}-${b}-${c}`, prompt: 'Berapa hasilnya?', visual: exprHTML(`${a} + ${b} − ${c} = ?`), answer: a + b - c, say: ['Berapa'].concat(N(a), ['tambah'], N(b), ['kurang'], N(c)), sayAnswer: N(a + b - c) }; }
    q.timed = [16, 13, 11][t - 1];
  }
  return q;
}

/* ============ SEMPOA ============ */
function abacusSetQ(rods, max, key) {
  const target = rnd(rods === 1 ? 1 : 1, max);
  return { type: 'abacus', key: `${key}-${target}`, prompt: `Tunjukkan angka ${target} di sempoa.`, say: ['Tunjukkan angka'].concat(N(target), ['di sempoa']), rods, target, sayAnswer: N(target) };
}
function abacusReadQ(rods, max) {
  const v = rnd(1, max);
  return { type: 'choice', key: `abr-${rods}-${v}`, prompt: 'Angka berapa yang ditunjukkan sempoa ini?', say: ['Angka berapa yang ditunjukkan sempoa ini'], visual: abacusStatic(v, rods),
    opts: numOpts(numChoices(v, 3, 1, Math.max(max, v + 5))), answer: v, sayAnswer: N(v) };
}
function abacusAddQ(rods, max) {
  const a = rnd(2, max), b = rnd(2, max), s = a + b;
  const cap = Math.pow(10, rods) - 1; if (s > cap) return abacusAddQ(rods, Math.floor(max / 2));
  return { type: 'abacus', key: `aba-${a}-${b}`, prompt: `Hitung ${a} + ${b}, lalu tunjukkan hasilnya di sempoa.`, say: ['Hitung'].concat(N(a), ['tambah'], N(b), ['lalu tunjukkan hasilnya di sempoa']),
    problem: `${a} + ${b} = ?`, rods, target: s, sayAnswer: N(s) };
}
function flashQ(t) {
  const count = [3, 4, 5][t - 1], seq = []; let total = 0;
  for (let i = 0; i < count; i++) { const v = rnd(1, t === 1 ? 9 : t === 2 ? 20 : 30); seq.push(v); total += v; }
  return { type: 'flash', key: 'flash-' + seq.join('-'), prompt: 'Perhatikan angka yang muncul, lalu jumlahkan di kepalamu.', say: ['Perhatikan angka yang muncul, lalu jumlahkan di kepalamu'], seq, ms: [1400, 1100, 850][t - 1], answer: total, sayAnswer: N(total) };
}
function abacusMemoryQ(rods, max) {
  const v = rnd(Math.pow(10, rods - 2), max);
  return { type: 'memory', key: `abm-${rods}-${v}`, prompt: 'Ingat angka di sempoa, lalu ketik angkanya.', say: ['Ingat angka di sempoa, lalu ketik angkanya'], value: v, rods, ms: 2200, answer: v, sayAnswer: N(v) };
}

/* ============ LOGIKA ============ */
const KINDS = SHAPE_KINDS, COLS = Object.keys(SHAPE_COLORS);
const shapeKey = (s) => `${s.k}-${s.c}`;
const shapeOpt = (s, px) => ({ v: shapeKey(s), html: shapeSVG(s.k, s.c, px || 60) });
function randShape() { return { k: pick(KINDS), c: pick(COLS) }; }
function sameQ() {
  const t = randShape(); const others = [];
  while (others.length < 2) { const o = randShape(); if (shapeKey(o) !== shapeKey(t) && !others.some((x) => shapeKey(x) === shapeKey(o))) others.push(o); }
  return { type: 'choice', key: 'same-' + shapeKey(t), prompt: 'Mana yang sama?', say: ['Mana yang sama'], visual: `<div class="bigshape">${shapeSVG(t.k, t.c, 96)}</div>`, opts: shuffle([t, ...others]).map((s) => shapeOpt(s, 64)), answer: shapeKey(t), cols: 3 };
}
function oddShapeQ(t) {
  const base = randShape(); let odd;
  do { odd = t === 1 ? { k: pick(KINDS), c: base.c } : (Math.random() < 0.5 ? { k: base.k, c: pick(COLS) } : { k: pick(KINDS), c: pick(COLS) }); } while (shapeKey(odd) === shapeKey(base));
  const arr = shuffle([base, base, base, odd]);
  return { type: 'choice', key: `odd-${shapeKey(base)}-${shapeKey(odd)}`, prompt: 'Mana yang berbeda?', say: ['Mana yang berbeda'], opts: arr.map((s, i) => ({ v: String(i), html: shapeSVG(s.k, s.c, 60) })), answer: String(arr.findIndex((s) => shapeKey(s) === shapeKey(odd))), cols: 4 };
}
function sizeQ() {
  const ic = pick(OBJ_KEYS), big = Math.random() < 0.5, sizes = shuffle([36, 60, 92]);
  const ans = big ? Math.max(...sizes) : Math.min(...sizes);
  return { type: 'choice', key: `size-${ic}-${sizes.join('')}-${big ? 1 : 0}`, prompt: big ? 'Mana yang paling besar?' : 'Mana yang paling kecil?', say: [big ? 'Mana yang paling besar' : 'Mana yang paling kecil'],
    opts: sizes.map((s) => ({ v: String(s), html: icon(ic, s) })), answer: String(ans), cols: 3 };
}
function patternQ(t, level) {
  const pats = t === 1 ? ['AB'] : t === 2 ? ['AB', 'AAB', 'ABB'] : ['AAB', 'ABB', 'ABC', 'AABB'];
  const p = pick(pats), letters = uniq(p.split('')), pool = shuffle(KINDS.map((k) => ({ k, c: pick(COLS) })));
  const map = {}; letters.forEach((l, i) => { map[l] = pool[i]; });
  if (t === 1 && Math.random() < 0.5) { const k = pool[0].k; letters.forEach((l, i) => { map[l] = { k, c: COLS[i] }; }); }
  const seq = []; for (let i = 0; i < 6; i++) seq.push(map[p[i % p.length]]);
  const ans = seq[5]; const opts = [ans];
  while (opts.length < 3) { const c = Math.random() < 0.6 ? map[pick(letters)] : randShape(); if (!opts.some((o) => shapeKey(o) === shapeKey(c))) opts.push(c); }
  const shown = seq.slice(0, 5).map((s) => shapeSVG(s.k, s.c, 52)).join('') + `<span class="qmark">?</span>`;
  return { type: 'choice', key: `pat-${p}-${seq.map(shapeKey).join('_')}`, prompt: 'Gambar apa yang datang berikutnya?', say: ['Gambar apa yang datang berikutnya'], visual: `<div class="seq">${shown}</div>`, opts: shuffle(opts).map((s) => shapeOpt(s, 58)), answer: shapeKey(ans), cols: 3 };
}
function categoryOddQ() {
  const cats = Object.keys(CATS).filter((c) => CATS[c].length >= 3), c1 = pick(cats), c2 = pick(Object.keys(CATS).filter((c) => c !== c1));
  const same = sample(CATS[c1], 3), odd = pick(CATS[c2]), arr = shuffle([...same, odd]);
  return { type: 'choice', key: `cat-${arr.join('-')}`, prompt: 'Mana yang tidak sejenis?', say: ['Mana yang tidak sejenis'], opts: arr.map((n) => ({ v: n, html: icon(n, 62), say: [OBJ[n].id] })), answer: odd, cols: 4 };
}
function numPatternQ(t, level) {
  let seq, ans;
  const kind = level === 'tkb' ? 'add1' : pick(level === 'sd12' ? ['add', 'add', 'sub'] : level === 'sd34' ? ['add', 'sub', 'mul', 'add'] : ['add', 'mul', 'alt', 'sq', 'fib']);
  if (kind === 'add1') { const s = rnd(1, 8); seq = [s, s + 1, s + 2, s + 3]; ans = s + 4; }
  else if (kind === 'add') { const d = pick(level === 'sd12' ? [2, 3, 5, 10] : [3, 4, 6, 7, 9, 11]), s = rnd(1, 15); seq = [0, 1, 2, 3].map((i) => s + d * i); ans = s + d * 4; }
  else if (kind === 'sub') { const d = pick([2, 3, 4, 5]), s = rnd(30, 60); seq = [0, 1, 2, 3].map((i) => s - d * i); ans = s - d * 4; }
  else if (kind === 'mul') { const m = pick([2, 3]), s = rnd(1, 4); seq = [0, 1, 2, 3].map((i) => s * Math.pow(m, i)); ans = s * Math.pow(m, 4); }
  else if (kind === 'alt') { const a = rnd(2, 5), b = rnd(1, 3), s = rnd(1, 9); seq = [s, s + a, s + a - b, s + 2 * a - b, s + 2 * a - 2 * b]; ans = s + 3 * a - 2 * b; }
  else if (kind === 'sq') { const s = rnd(1, 4); seq = [0, 1, 2, 3].map((i) => (s + i) * (s + i)); ans = (s + 4) * (s + 4); }
  else { const a = rnd(1, 3), b = rnd(2, 4); seq = [a, b, a + b, a + 2 * b]; ans = 2 * a + 3 * b; }
  const vis = exprHTML(seq.join(' , ') + ' , ?');
  if (level === 'tkb') return { type: 'choice', key: `np-${seq.join('-')}`, prompt: 'Angka berapa yang hilang?', say: ['Angka berapa yang hilang'], visual: vis, opts: numOpts(numChoices(ans, 3, 1, ans + 4)), answer: ans, sayAnswer: N(ans) };
  return { type: 'keypad', key: `np-${seq.join('-')}`, prompt: 'Angka berapa selanjutnya?', say: ['Angka berapa selanjutnya'], visual: vis, answer: ans, sayAnswer: N(ans) };
}
function deductionQ(n) {
  const who = sample(NAMES, n), trait = pick([['tinggi', 'lebih tinggi', 'paling tinggi', 'paling pendek'], ['cepat', 'lebih cepat', 'paling cepat', 'paling lambat'], ['berat', 'lebih berat', 'paling berat', 'paling ringan']]);
  const st = []; for (let i = 0; i < n - 1; i++) st.push(`${who[i]} ${trait[1]} dari ${who[i + 1]}.`);
  const top = Math.random() < 0.5, ans = top ? who[0] : who[n - 1];
  return { type: 'choice', key: `ded-${who.join('')}-${top ? 1 : 0}`, prompt: `Siapa yang ${top ? trait[2] : trait[3]}?`, visual: `<div class="story">${shuffle(st).join(' ')}</div>`, say: [shuffle(st).join(' '), `Siapa yang ${top ? trait[2] : trait[3]}`], opts: shuffle(who.slice()).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>` })), answer: ans, cols: n > 3 ? 2 : 3 };
}
function analogyQ() {
  const bank = [['Burung', 'terbang', 'Ikan', 'berenang', ['berlari', 'tidur']], ['Siang', 'terang', 'Malam', 'gelap', ['panas', 'ramai']], ['Pensil', 'menulis', 'Sendok', 'makan', ['tidur', 'berjalan']],
    ['Mata', 'melihat', 'Telinga', 'mendengar', ['mencium', 'berlari']], ['Kaki', 'berjalan', 'Tangan', 'memegang', ['melihat', 'mendengar']], ['Api', 'panas', 'Es', 'dingin', ['basah', 'manis']]];
  const b = pick(bank);
  return { type: 'choice', key: 'ana-' + b[0], prompt: `${b[0]} berhubungan dengan ${b[1]}. ${b[2]} berhubungan dengan ...?`, say: [`${b[0]} berhubungan dengan ${b[1]}. ${b[2]} berhubungan dengan apa`], opts: shuffle([b[3], ...b[4]]).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>` })), answer: b[3], cols: 3 };
}
function dayQ() {
  const d = rnd(0, 6), k = rnd(1, 5), fwd = Math.random() < 0.5, idx = ((d + (fwd ? k : -k)) % 7 + 7) % 7;
  const names = DAYS.map((x) => x[1]);
  const opts = uniq([names[idx], ...sample(names.filter((n) => n !== names[idx]), 3)]);
  return { type: 'choice', key: `day-${d}-${k}-${fwd}`, prompt: `Hari ini hari ${names[d]}. ${k} hari ${fwd ? 'lagi' : 'yang lalu'} hari apa?`, visual: `<div class="story">Hari ini hari ${names[d]}. ${k} hari ${fwd ? 'lagi' : 'yang lalu'} hari apa?</div>`, opts: shuffle(opts).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>` })), answer: names[idx], cols: 2, noSpeak: true };
}
function codeQ() {
  const w = pick(['BAD', 'CAB', 'DEF', 'BED', 'ADA', 'FED']), val = w.split('').reduce((s, c) => s + c.charCodeAt(0) - 64, 0);
  return { type: 'keypad', key: 'code-' + w, prompt: `Jika A=1, B=2, C=3, dan seterusnya, berapa nilai kata ${w}?`, visual: `<div class="story">A=1, B=2, C=3, dan seterusnya.<br>Berapa jumlah nilai huruf pada kata <b>${w}</b>?</div>`, answer: val, noSpeak: true };
}

/* ============ MEMBACA ============ */
function letterHearQ(t) {
  const pool = t === 1 ? 'AIUEOBKMS'.split('') : t === 2 ? 'ABCDEFGHIJKLM'.split('') : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const L = pick(pool), opts = sample(pool.filter((x) => x !== L), 2).concat(L);
  return { type: 'choice', key: 'lh-' + L, prompt: 'Dengarkan lalu pilih hurufnya.', say: ['Mana huruf', LETTER_SAY[L]], opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big">${x}</span>`, say: [LETTER_SAY[x]] })), answer: L, sayAnswer: [LETTER_SAY[L]], cols: 3 };
}
function letterCaseQ(t) {
  const pool = (t === 1 ? 'ABDEGHIKMNPRT' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').split(''), L = pick(pool);
  const opts = sample(pool.filter((x) => x !== L), 2).map((x) => x.toLowerCase()).concat(L.toLowerCase());
  return { type: 'choice', key: 'lc-' + L, prompt: 'Mana huruf kecilnya?', say: ['Mana huruf kecilnya'], visual: `<div class="expr">${L}</div>`, opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big">${x}</span>`, say: [LETTER_SAY[x.toUpperCase()]] })), answer: L.toLowerCase(), cols: 3 };
}
function syllableHearQ(t) {
  const pool = t === 1 ? SYLLABLES.slice(0, 12) : t === 2 ? SYLLABLES.slice(0, 24) : SYLLABLES, S = pick(pool);
  const opts = sample(pool.filter((x) => x !== S), 2).concat(S);
  return { type: 'choice', key: 'sy-' + S, prompt: 'Dengarkan lalu pilih suku katanya.', say: ['Mana suku kata', S], opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big">${x}</span>`, say: [x] })), answer: S, sayAnswer: [S], cols: 3 };
}
function wordPicQ(keys) {
  const ic = pick(keys), nm = OBJ[ic].id, opts = sample(keys.filter((k) => k !== ic), 2).concat(ic);
  return { type: 'choice', key: 'wp-' + ic, prompt: 'Baca kata ini. Mana gambarnya?', say: ['Mana gambar', nm], visual: `<div class="expr word">${nm}</div>`, opts: shuffle(opts).map((k) => ({ v: k, html: icon(k, 70) })), answer: ic, sayAnswer: [nm], cols: 3 };
}
function picWordQ(keys) {
  const ic = pick(keys), nm = OBJ[ic].id, opts = sample(keys.filter((k) => k !== ic), 2).map((k) => OBJ[k].id).concat(nm);
  return { type: 'choice', key: 'pw-' + ic, prompt: 'Gambar apa ini? Pilih tulisannya.', say: ['Gambar apa ini? Pilih tulisannya'], visual: `<div class="bigshape">${icon(ic, 100)}</div>`, opts: shuffle(opts).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>`, say: [w] })), answer: nm, sayAnswer: [nm], cols: 3 };
}
function missingLetterQ(keys) {
  const ic = pick(keys.filter((k) => OBJ[k].id.length >= 3 && OBJ[k].id.length <= 6)), w = OBJ[ic].id, pos = rnd(0, w.length - 1), L = w[pos];
  const letters = 'abcdefghijklmnoprstu'.split('').filter((x) => x !== L), opts = sample(letters, 2).concat(L);
  const shown = w.split('').map((c, i) => (i === pos ? '_' : c)).join(' ');
  return { type: 'choice', key: `ml-${w}-${pos}`, prompt: 'Huruf apa yang hilang?', say: ['Huruf apa yang hilang'], visual: `<div class="bigshape">${icon(ic, 84)}</div><div class="expr word">${shown}</div>`, opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big">${x}</span>` })), answer: L, sayAnswer: [w], cols: 3 };
}
function sentencePicQ(keys) {
  const ic = pick(keys), nm = OBJ[ic].id, opts = sample(keys.filter((k) => k !== ic), 2).concat(ic);
  return { type: 'choice', key: 'sp-' + ic, prompt: 'Baca kalimat ini. Mana gambarnya?', say: ['Mana gambar', `Ini ${nm}.`], visual: `<div class="expr word">Ini ${nm}.</div>`, opts: shuffle(opts).map((k) => ({ v: k, html: icon(k, 70) })), answer: ic, sayAnswer: [`Ini ${nm}.`], cols: 3 };
}
function readSentenceQ() {
  const r = pick(READ_SD12);
  return { type: 'choice', key: 'rs-' + r.t, prompt: r.q, say: [r.t, r.q], visual: `<div class="story">${r.t}</div>`, opts: shuffle(r.o).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>` })), answer: r.a, cols: 3, sayAnswer: [r.a] };
}
function readPassageQ(bank) {
  const p = pick(bank), q = pick(p.qs);
  return { type: 'choice', key: 'rp-' + p.t.slice(0, 30) + q.q, prompt: q.q, say: [p.t, q.q], visual: `<div class="story passage">${p.t}</div>`, opts: shuffle(q.o).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>` })), answer: q.a, cols: 1 };
}

/* ============ MENULIS ============ */
const PATHS = {
  'garis lurus ke bawah': [[[0.5, 0.12], [0.5, 0.88]]],
  'garis lurus mendatar': [[[0.12, 0.5], [0.88, 0.5]]],
  'garis miring': [[[0.2, 0.85], [0.8, 0.15]]],
  'garis zigzag': [[[0.08, 0.7], [0.29, 0.3], [0.5, 0.7], [0.71, 0.3], [0.92, 0.7]]],
  'garis lengkung': [Array.from({ length: 25 }, (_, i) => { const a = Math.PI * (i / 24); return [0.5 - 0.38 * Math.cos(a), 0.7 - 0.45 * Math.sin(a)]; })],
  'lingkaran': [Array.from({ length: 41 }, (_, i) => { const a = 2 * Math.PI * (i / 40) - Math.PI / 2; return [0.5 + 0.34 * Math.cos(a), 0.5 + 0.34 * Math.sin(a)]; })],
  'persegi': [[[0.2, 0.2], [0.8, 0.2], [0.8, 0.8], [0.2, 0.8], [0.2, 0.2]]],
  'segitiga': [[[0.5, 0.15], [0.85, 0.82], [0.15, 0.82], [0.5, 0.15]]]
};
function traceShapeQ(names) {
  const nm = pick(names);
  return { type: 'trace', key: 'ts-' + nm, prompt: `Ikuti ${nm} ini dengan jarimu.`, say: ['Ikuti', nm, 'ini dengan jarimu'], mode: 'path', pts: PATHS[nm], label: nm };
}
function traceTextQ(chars, size) {
  const ch = pick(chars), spoken = /^[A-Za-z]$/.test(ch) ? LETTER_SAY[ch.toUpperCase()] : /^\d+$/.test(ch) ? N(Number(ch))[0] : ch;
  const kind = /^[A-Za-z]$/.test(ch) ? (ch === ch.toUpperCase() ? 'huruf besar' : 'huruf kecil') : /^\d+$/.test(ch) ? 'angka' : 'kata';
  const say = kind === 'kata' ? ['Tulis kata', ch] : kind === 'angka' ? ['Tulis angka', spoken] : ['Tulis huruf', spoken];
  return { type: 'trace', key: 'tt-' + ch, prompt: `Tulis ${kind} ${ch}`, say, mode: 'text', text: ch, size: size || 1, label: ch };
}
function tilesWordQ(level, t, lang) {
  const keys = OBJ_KEYS.filter((k) => (lang === 'en' ? OBJ[k].en : OBJ[k].id).length >= 3 && (lang === 'en' ? OBJ[k].en : OBJ[k].id).length <= (t === 1 ? 5 : 8));
  const ic = pick(keys), w = lang === 'en' ? OBJ[ic].en : OBJ[ic].id, letters = w.split('');
  const extra = t >= 2 ? sample('abcdeiklmnoprstu'.split('').filter((c) => !letters.includes(c)), t - 1) : [];
  const tiles = shuffle(letters.concat(extra));
  return { type: 'tiles', key: `tw-${lang}-${w}`, prompt: lang === 'en' ? 'Susun hurufnya menjadi kata bahasa Inggris.' : 'Susun hurufnya menjadi kata.', say: lang === 'en' ? ['Susun hurufnya menjadi kata bahasa Inggris', EN(w)] : ['Susun hurufnya menjadi kata', w],
    visual: `<div class="bigshape">${icon(ic, 90)}</div>`, tiles, answer: letters, join: '', sayAnswer: lang === 'en' ? [EN(w)] : [w] };
}
function sentenceTilesQ() {
  const s = pick(SENTENCES_SD56), words = s.split(' ');
  return { type: 'tiles', key: 'st-' + s, prompt: 'Susun kata-kata ini menjadi kalimat yang benar.', say: ['Susun kata-kata ini menjadi kalimat yang benar'], tiles: shuffle(words), answer: words, join: ' ', sayAnswer: [s] };
}
function spellingQ() {
  const p = pick(SPELLING);
  return { type: 'choice', key: 'spl-' + p[0], prompt: 'Pilih penulisan kata yang benar.', say: ['Pilih penulisan kata yang benar'], opts: shuffle(p).map((w) => ({ v: w, html: `<span class="big sm">${w}</span>` })), answer: p[0], cols: 2 };
}

/* ============ BAHASA INGGRIS ============ */
function misspell(w) {
  const out = new Set(); let g = 0;
  while (out.size < 2 && g++ < 40) {
    const i = rnd(0, w.length - 2), m = pick(['swap', 'drop', 'dbl']); let x;
    if (m === 'swap') x = w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2);
    else if (m === 'drop') x = w.slice(0, i) + w.slice(i + 1);
    else x = w.slice(0, i) + w[i] + w.slice(i);
    if (x !== w) out.add(x);
  }
  return [...out];
}
function colorHearQ(t) {
  const pool = COLORS_EN.slice(0, t === 1 ? 4 : 7), c = pick(pool), opts = sample(pool.filter((x) => x.en !== c.en), 2).concat(c);
  return { type: 'choice', key: 'col-' + c.en, prompt: 'Dengarkan lalu pilih warnanya.', say: ['Mana warna', EN(c.en)], opts: shuffle(opts).map((x) => ({ v: x.en, html: `<span class="swatch" style="background:${x.hex}"></span>`, say: [EN(x.en)] })), answer: c.en, sayAnswer: [EN(c.en)], cols: 3 };
}
function hearPicQ(keys) {
  const ic = pick(keys), w = OBJ[ic].en, opts = sample(keys.filter((k) => k !== ic), 2).concat(ic);
  return { type: 'choice', key: 'hp-' + ic, prompt: 'Dengarkan kata bahasa Inggris ini. Mana gambarnya?', say: ['Mana gambar', EN(w)], opts: shuffle(opts).map((k) => ({ v: k, html: icon(k, 70) })), answer: ic, sayAnswer: [EN(w)], cols: 3 };
}
function picEnWordQ(keys) {
  const ic = pick(keys), w = OBJ[ic].en, opts = sample(keys.filter((k) => k !== ic), 2).map((k) => OBJ[k].en).concat(w);
  return { type: 'choice', key: 'pe-' + ic, prompt: 'Apa bahasa Inggrisnya?', say: ['Apa bahasa Inggrisnya', OBJ[ic].id], visual: `<div class="bigshape">${icon(ic, 100)}</div>`, opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big sm">${x}</span>`, say: [EN(x)] })), answer: w, sayAnswer: [EN(w)], cols: 3 };
}
function enNumberQ(max) {
  const n = rnd(1, max), opts = numChoices(n, 3, 1, max);
  return { type: 'choice', key: 'en-n-' + n, prompt: 'Dengarkan angka ini.', say: ['Mana angka', EN(EN_NUM[n])], opts: numOpts(opts).map((o) => Object.assign(o, { say: [EN(EN_NUM[o.v])] })), answer: n, sayAnswer: [EN(EN_NUM[n])], cols: 3 };
}
function enNumberWordQ(max) {
  const n = rnd(1, max), opts = numChoices(n, 3, 1, max);
  return { type: 'choice', key: 'en-nw-' + n, prompt: 'Angka berapa ini dalam bahasa Inggris?', say: ['Angka berapa ini'], visual: `<div class="expr word">${EN_NUM[n]}</div>`, opts: numOpts(opts), answer: n, sayAnswer: [EN(EN_NUM[n])], cols: 3 };
}
function enGreetQ() {
  const g = pick(EN_GREET);
  return { type: 'choice', key: 'gr-' + g.q, prompt: 'Pilih jawaban yang tepat.', say: [EN(g.q)], visual: `<div class="story en">${g.q}</div>`, opts: shuffle(g.o).map((x) => ({ v: x, html: `<span class="big sm">${x}</span>`, say: [EN(x)] })), answer: g.a, cols: 1, sayAnswer: [EN(g.a)] };
}
function enSpellQ() {
  const ic = pick(OBJ_KEYS.filter((k) => OBJ[k].en.length >= 3)), w = OBJ[ic].en, opts = [w, ...misspell(w)];
  return { type: 'choice', key: 'sp-en-' + ic, prompt: 'Pilih ejaan bahasa Inggris yang benar.', say: ['Pilih ejaan bahasa Inggris yang benar'], visual: `<div class="bigshape">${icon(ic, 96)}</div>`, opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big sm">${x}</span>`, say: [EN(x)] })), answer: w, sayAnswer: [EN(w)], cols: 3 };
}
function enThisIsQ() {
  const ic = pick(OBJ_KEYS), w = OBJ[ic].en, vowel = /^[aeiou]/.test(w), art = vowel ? 'an' : 'a', opts = sample(OBJ_KEYS.filter((k) => k !== ic), 2).map((k) => OBJ[k].en).concat(w);
  return { type: 'choice', key: 'ti-' + ic, prompt: `This is ${art} ___ .`, say: ['Lengkapi kalimatnya'], visual: `<div class="bigshape">${icon(ic, 92)}</div><div class="expr word">This is ${art} ___ .</div>`, opts: shuffle(opts).map((x) => ({ v: x, html: `<span class="big sm">${x}</span>`, say: [EN(x)] })), answer: w, sayAnswer: [EN(`This is ${art} ${w}.`)], cols: 3 };
}
function enDayQ() {
  const d = pick(DAYS), opts = sample(DAYS.filter((x) => x !== d), 2).concat([d]);
  return { type: 'choice', key: 'dy-' + d[0], prompt: 'Dengarkan nama hari ini. Pilih artinya.', say: ['Pilih artinya', EN(d[0])], visual: `<div class="expr word">${d[0]}</div>`, opts: shuffle(opts).map((x) => ({ v: x[1], html: `<span class="big sm">${x[1]}</span>` })), answer: d[1], sayAnswer: [EN(d[0])], cols: 3 };
}
function enTransQ() {
  const p = pick(EN_TRANS), toEn = Math.random() < 0.5, others = sample(EN_TRANS.filter((x) => x !== p), 2);
  if (toEn) return { type: 'choice', key: 'tr-' + p[0], prompt: 'Apa bahasa Inggrisnya kalimat ini?', say: ['Apa bahasa Inggrisnya', p[0]], visual: `<div class="story">${p[0]}</div>`, opts: shuffle([p, ...others]).map((x) => ({ v: x[1], html: `<span class="big sm">${x[1]}</span>`, say: [EN(x[1])] })), answer: p[1], sayAnswer: [EN(p[1])], cols: 1 };
  return { type: 'choice', key: 'tr2-' + p[1], prompt: 'Apa artinya dalam bahasa Indonesia?', say: [EN(p[1]), 'Apa artinya'], visual: `<div class="story en">${p[1]}</div>`, opts: shuffle([p, ...others]).map((x) => ({ v: x[0], html: `<span class="big sm">${x[0]}</span>` })), answer: p[0], sayAnswer: [p[0]], cols: 1 };
}
function enGrammarQ() {
  const g = pick(EN_GRAMMAR), full = g.s.replace('___', g.a);
  return { type: 'choice', key: 'gm-' + g.s, prompt: 'Lengkapi kalimat ini.', say: ['Lengkapi kalimat ini'], visual: `<div class="story en">${g.s}</div>`, opts: shuffle(g.o).map((x) => ({ v: x, html: `<span class="big sm">${x}</span>` })), answer: g.a, cols: 3, sayAnswer: [EN(full)] };
}
function enReadQ() {
  const p = pick(EN_READ), q = pick(p.qs);
  return { type: 'choice', key: 'er-' + p.t.slice(0, 25) + q.q, prompt: q.q, say: [EN(p.t), EN(q.q)], visual: `<div class="story en passage">${p.t}</div><div class="qline">${q.q}</div>`, opts: shuffle(q.o).map((x) => ({ v: x, html: `<span class="big sm">${x}</span>` })), answer: q.a, cols: 1, sayAnswer: [EN(q.a)] };
}

/* ============ PEMETAAN JENJANG x PELAJARAN ============ */
const ALL_PIC = OBJ_KEYS, EASY_PIC = ['apple', 'ball', 'banana', 'star', 'sun', 'moon', 'heart', 'flower', 'tree', 'house', 'fish', 'balloon', 'cup', 'book', 'cat', 'dog', 'car', 'bird'];
const GENS = {
  kb: {
    baca:    [(t) => letterHearQ(1), (t) => letterHearQ(t === 1 ? 1 : 2), (t) => letterCaseQ(1)],
    tulis:   [(t) => traceShapeQ(['garis lurus ke bawah', 'garis lurus mendatar', 'garis lengkung', 'lingkaran']), (t) => traceTextQ(['1', '2', '3', 'I', 'O', 'L'], 1), (t) => traceShapeQ(['garis miring', 'garis zigzag', 'lingkaran'])],
    logika:  [(t) => sameQ(), (t) => oddShapeQ(1), (t) => sizeQ()],
    mat:     [(t) => countQ(t === 1 ? 3 : t === 2 ? 4 : 5), (t) => moreQ(5, Math.random() < 0.3), (t) => findNumQ(t === 1 ? 3 : 5)],
    inggris: [(t) => colorHearQ(t === 1 ? 1 : 2), (t) => hearPicQ(['apple', 'ball', 'cat', 'dog', 'fish', 'sun'])]
  },
  tka: {
    baca:    [(t) => syllableHearQ(t), (t) => letterCaseQ(t === 1 ? 1 : 2), (t) => wordPicQ(['apple', 'ball', 'banana', 'cat', 'dog', 'fish', 'sun', 'moon', 'star', 'heart', 'book', 'bird'])],
    tulis:   [(t) => traceTextQ(t === 1 ? 'ILTHEFAUO'.split('') : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), 1), (t) => traceTextQ(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 1), (t) => traceShapeQ(['persegi', 'segitiga', 'lingkaran', 'garis zigzag'])],
    logika:  [(t) => patternQ(1, 'tka'), (t) => oddShapeQ(t), (t) => sizeQ(), (t) => sameQ()],
    mat:     [(t) => countQ(t === 1 ? 5 : 10), (t) => addObjsQ(t === 1 ? 5 : 7), (t) => moreQ(8, false), (t) => findNumQ(10), (t) => nextNumQ(9, false)],
    inggris: [(t) => hearPicQ(['apple', 'banana', 'orange', 'cat', 'dog', 'fish', 'bird']), (t) => picEnWordQ(['apple', 'banana', 'cat', 'dog', 'fish', 'bird', 'sun', 'moon']), (t) => colorHearQ(t === 1 ? 2 : 3)]
  },
  tkb: {
    baca:    [(t) => wordPicQ(EASY_PIC), (t) => picWordQ(EASY_PIC), (t) => missingLetterQ(EASY_PIC), (t) => sentencePicQ(EASY_PIC)],
    tulis:   [(t) => traceTextQ('abcdefghijklmnopqrstuvwxyz'.split(''), 1), (t) => traceTextQ(WORDS_TK, 1), (t) => traceTextQ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), 1), (t) => traceTextQ(['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], 1)],
    logika:  [(t) => patternQ(t === 1 ? 2 : 3, 'tkb'), (t) => categoryOddQ(), (t) => oddShapeQ(2), (t) => numPatternQ(t, 'tkb')],
    mat:     [(t) => countQ(t === 1 ? 10 : 20), (t) => addObjsQ(t === 1 ? 7 : 10), (t) => subObjsQ(t === 1 ? 6 : 10), (t) => nextNumQ(19, Math.random() < 0.4), (t) => bigSmallNumQ(20)],
    inggris: [(t) => hearPicQ(ALL_PIC), (t) => picEnWordQ(ALL_PIC), (t) => enNumberQ(10), (t) => enGreetQ()],
    cepat:   [(t) => speedChoiceQ(t === 1 ? 5 : t === 2 ? 8 : 10, [16, 14, 12][t - 1])],
    sempoa:  [(t) => abacusSetQ(1, t === 1 ? 4 : 9, 'ab1')]
  },
  sd12: {
    baca:    [() => readSentenceQ(), () => picWordQ(ALL_PIC.filter((k) => OBJ[k].id.length >= 4)), () => missingLetterQ(ALL_PIC)],
    tulis:   [(t) => traceTextQ(['apel', 'bola', 'ikan', 'buku', 'bunga', 'pohon', 'bulan', 'hati', 'rumah', 'balon'], 1), (t) => tilesWordQ('sd12', t, 'id'), (t) => traceTextQ(['Budi', 'Ani', 'Siti', 'Dedi', 'Rina'], 1)],
    logika:  [(t) => numPatternQ(t, 'sd12'), (t) => deductionQ(3), (t) => analogyQ(), (t) => patternQ(3, 'sd12'), (t) => categoryOddQ()],
    mat:     [(t) => addSubQ(t === 1 ? 20 : t === 2 ? 50 : 100, true), (t) => placeValueQ(t === 1 ? 49 : 99), (t) => compareNumsQ(t === 1 ? 50 : 99), (t) => skipCountQ(), (t) => addSubQ(t === 1 ? 20 : 100, false)],
    inggris: [() => enSpellQ(), () => enNumberWordQ(20), () => enDayQ(), () => enThisIsQ(), (t) => tilesWordQ('sd12', 1, 'en')],
    cepat:   [(t) => speedKeyQ('sd12', t)],
    sempoa:  [(t) => abacusSetQ(2, t === 1 ? 20 : 99, 'ab2'), (t) => abacusReadQ(2, t === 1 ? 30 : 99), (t) => abacusSetQ(2, 99, 'ab2')]
  },
  sd34: {
    baca:    [() => readPassageQ(READ_SD34), () => readPassageQ(READ_SD34), () => readSentenceQ()],
    tulis:   [(t) => tilesWordQ('sd34', t === 1 ? 2 : 3, 'id'), (t) => tilesWordQ('sd34', t === 1 ? 2 : 3, 'en'), () => spellingQ()],
    logika:  [(t) => numPatternQ(t, 'sd34'), (t) => deductionQ(3), (t) => deductionQ(4), (t) => analogyQ(), () => dayQ()],
    mat:     [(t) => mulQ(t), (t) => divQ(t), (t) => add3Q(t), () => fracReadQ(2), (t) => wordProblemQ(t, 'sd34'), (t) => mulQ(t)],
    inggris: [() => enTransQ(), () => enDayQ(), () => enSpellQ(), () => enThisIsQ(), () => enTransQ()],
    cepat:   [(t) => speedKeyQ('sd34', t)],
    sempoa:  [(t) => abacusSetQ(3, t === 1 ? 99 : 999, 'ab3'), (t) => abacusAddQ(3, t === 1 ? 40 : 300), (t) => abacusReadQ(3, 999)]
  },
  sd56: {
    baca:    [() => readPassageQ(READ_SD56), () => readPassageQ(READ_SD56), () => readPassageQ(READ_SD34)],
    tulis:   [() => sentenceTilesQ(), () => spellingQ(), () => sentenceTilesQ(), (t) => tilesWordQ('sd56', 3, 'en')],
    logika:  [(t) => numPatternQ(t, 'sd56'), (t) => deductionQ(4), (t) => deductionQ(4), () => dayQ(), () => codeQ()],
    mat:     [() => fracAddQ(), () => fracOfQ(), () => percentQ(), () => decimalQ(), () => orderOpsQ(), (t) => mul2Q(t), (t) => wordProblemQ(t, 'sd56'), () => gcdQ(), () => averageQ()],
    inggris: [() => enGrammarQ(), () => enGrammarQ(), () => enReadQ(), () => enTransQ(), () => enGrammarQ()],
    cepat:   [(t) => speedKeyQ('sd56', t)],
    sempoa:  [(t) => abacusSetQ(4, t === 1 ? 999 : 9999, 'ab4'), (t) => flashQ(t), (t) => abacusMemoryQ(t === 1 ? 2 : 3, t === 1 ? 99 : 999), (t) => abacusAddQ(4, t === 1 ? 500 : 4000)]
  }
};

const Gen = {
  /* Ambil satu soal baru; hindari kunci yang baru dipakai. */
  next(level, subject, tier, recentKeys, lastIdx) {
    const list = GENS[level][subject];
    let q = null, idx = -1;
    for (let tries = 0; tries < 12; tries++) {
      idx = list.length > 1 ? rnd(0, list.length - 1) : 0;
      if (list.length > 1 && idx === lastIdx && tries < 6) continue;
      q = list[idx](tier);
      if (!recentKeys || !recentKeys.includes(q.key)) break;
    }
    q.gen = idx;
    return q;
  }
};
