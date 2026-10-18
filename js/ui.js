/* Komponen soal: pilihan, tombol angka, menjiplak, sempoa, susun kata, kilat angka. */

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

const Q = {
  mount(q, host, ctx) {
    const fn = Q.types[q.type];
    return fn(q, host, ctx);
  },
  types: {}
};

/* ---------- Pilihan ganda ---------- */
Q.types.choice = function (q, host, ctx) {
  const n = q.opts.length, cols = q.cols || (n <= 3 ? n : 2);
  host.innerHTML = `<div class="qvis">${q.visual || ''}</div><div class="opts cols-${cols}">${q.opts.map((o, i) => `<button class="opt" data-i="${i}" aria-label="Pilihan ${i + 1}">${o.html}</button>`).join('')}</div>`;
  let tries = 0, locked = false;
  host.onclick = async (e) => {
    const b = e.target.closest('.opt');
    if (!b || locked || b.disabled) return;
    const o = q.opts[+b.dataset.i];
    A.sfx('tap');
    if (String(o.v) === String(q.answer)) {
      locked = true; b.classList.add('right');
      await ctx.react('right', { first: tries === 0 });
      ctx.done(tries === 0);
    } else {
      tries++; b.classList.add('wrong'); b.disabled = true;
      const left = $$('.opt', host).filter((x) => !x.disabled).length;
      if (tries >= 2 || left <= 1) {
        locked = true;
        $$('.opt', host).forEach((x, i) => { if (String(q.opts[i].v) === String(q.answer)) x.classList.add('right'); });
        await ctx.react('reveal');
        ctx.done(false);
      } else ctx.react('wrong');
    }
  };
  return { destroy() { host.onclick = null; } };
};

/* ---------- Tombol angka ---------- */
function keypadUI(area, q, ctx) {
  area.innerHTML = `<div class="kp-display" aria-live="polite"><span class="kp-val"></span><span class="kp-cursor"></span></div>
  <div class="kp-grid">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => `<button class="kp" data-k="${d}">${d}</button>`).join('')}
  <button class="kp alt" data-k="del">Hapus</button><button class="kp" data-k="0">0</button>${q.dot ? '<button class="kp alt" data-k=",">,</button>' : ''}<button class="kp go wide" data-k="ok">OK</button></div>`;
  let val = '', tries = 0, locked = false;
  const show = () => { $('.kp-val', area).textContent = val; };
  const press = async (k) => {
    if (locked) return;
    if (k === 'del') { val = val.slice(0, -1); A.sfx('tap'); show(); return; }
    if (k === 'ok') {
      if (!val) return;
      const num = parseFloat(val.replace(',', '.'));
      if (Math.abs(num - q.answer) < 1e-9) { locked = true; A.sfx('tap'); await ctx.react('right', { first: tries === 0 }); ctx.done(tries === 0); }
      else {
        tries++;
        if (tries >= 2) { locked = true; val = String(q.answer).replace('.', ','); show(); await ctx.react('reveal'); ctx.done(false); }
        else { val = ''; show(); area.classList.add('shake'); setTimeout(() => area.classList.remove('shake'), 400); ctx.react('wrong'); }
      }
      return;
    }
    if (val.length >= 7) return;
    if (k === ',' && val.includes(',')) return;
    val += k; A.sfx('tap'); show();
  };
  area.onclick = (e) => { const b = e.target.closest('.kp'); if (b) press(b.dataset.k); };
  const onKey = (e) => {
    if (/^[0-9]$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('del');
    else if (e.key === 'Enter') press('ok');
    else if ((e.key === ',' || e.key === '.') && q.dot) press(',');
  };
  document.addEventListener('keydown', onKey);
  show();
  return { destroy() { area.onclick = null; document.removeEventListener('keydown', onKey); } };
}
Q.types.keypad = function (q, host, ctx) {
  host.innerHTML = `<div class="qvis">${q.visual || ''}</div><div class="kp-area"></div>`;
  return keypadUI($('.kp-area', host), q, ctx);
};

/* ---------- Susun huruf / kata ---------- */
Q.types.tiles = function (q, host, ctx) {
  host.innerHTML = `<div class="qvis">${q.visual || ''}</div><div class="answer-row" aria-label="Jawabanmu"></div><div class="tile-bank"></div>
  <div class="trace-btns"><button class="btn alt" data-t="clear">Ulang</button><button class="btn go" data-t="check">Selesai</button></div>`;
  const bank = q.tiles.map((t, i) => ({ t, i, used: false })), placed = [];
  let tries = 0, locked = false;
  const paint = () => {
    $('.answer-row', host).innerHTML = placed.map((p, k) => `<button class="tile placed" data-p="${k}">${p.t}</button>`).join('') || '<span class="ghost">Ketuk huruf di bawah</span>';
    $('.tile-bank', host).innerHTML = bank.map((b) => `<button class="tile" data-b="${b.i}" ${b.used ? 'disabled' : ''}>${b.t}</button>`).join('');
  };
  host.onclick = async (e) => {
    if (locked) return;
    const tb = e.target.closest('[data-b]'), tp = e.target.closest('[data-p]'), tt = e.target.closest('[data-t]');
    if (tb) { const b = bank[+tb.dataset.b]; if (b.used) return; b.used = true; placed.push(b); A.sfx('tap'); paint(); }
    else if (tp) { const p = placed.splice(+tp.dataset.p, 1)[0]; p.used = false; A.sfx('tap'); paint(); }
    else if (tt && tt.dataset.t === 'clear') { placed.splice(0).forEach((p) => { p.used = false; }); paint(); }
    else if (tt && tt.dataset.t === 'check') {
      if (!placed.length) return;
      const ok = placed.map((p) => p.t).join('|') === q.answer.join('|');
      if (ok) { locked = true; await ctx.react('right', { first: tries === 0 }); ctx.done(tries === 0); }
      else {
        tries++;
        if (tries >= 2) { locked = true; placed.splice(0).forEach((p) => { p.used = false; }); q.answer.forEach((t) => { const b = bank.find((x) => !x.used && x.t === t); if (b) { b.used = true; placed.push(b); } }); paint(); await ctx.react('reveal'); ctx.done(false); }
        else { placed.splice(0).forEach((p) => { p.used = false; }); paint(); ctx.react('wrong'); }
      }
    }
  };
  paint();
  return { destroy() { host.onclick = null; } };
};

/* ---------- Menjiplak huruf, angka, kata, dan bentuk (Guided Stroke Tracing) ---------- */
const TRACE_FONT = (px) => `700 ${px}px "Fredoka","Baloo 2","Arial Rounded MT Bold","Trebuchet MS",Arial,sans-serif`;
const TRACE_GUIDE = { top: '#7FA6E8', mid: '#F2799F', base: '#5B86D6' };

/* Pembangun kurva vektor halus untuk garis putus-putus di dalam huruf & angka */
const _line = (x0, y0, x1, y1, n = 24) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n; return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
});
const _quad = (x0, y0, cx, cy, x1, y1, n = 28) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n, u = 1 - t;
  return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1];
});
const _arc = (cx, cy, rx, ry, deg0, deg1, n = 36) => Array.from({ length: n + 1 }, (_, i) => {
  const a = (deg0 + (deg1 - deg0) * (i / n)) * Math.PI / 180;
  return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
});
const _join = (...segs) => {
  const out = [];
  segs.forEach((s, idx) => {
    if (!s || !s.length) return;
    if (idx > 0 && out.length) out.push(...s.slice(1));
    else out.push(...s);
  });
  return out;
};
const _resample = (pts, step = 0.015) => {
  if (!pts || pts.length < 2) return pts ? pts.slice() : [];
  const out = [pts[0].slice()];
  let acc = 0, prev = pts[0];
  for (let i = 1; i < pts.length; i++) {
    let cur = pts[i], dx = cur[0] - prev[0], dy = cur[1] - prev[1], d = Math.hypot(dx, dy);
    while (acc + d >= step && d > 1e-6) {
      const r = (step - acc) / d;
      const nx = prev[0] + dx * r, ny = prev[1] + dy * r;
      out.push([nx, ny]);
      prev = [nx, ny]; dx = cur[0] - prev[0]; dy = cur[1] - prev[1]; d = Math.hypot(dx, dy); acc = 0;
    }
    acc += d; prev = cur;
  }
  const last = pts[pts.length - 1], end = out[out.length - 1];
  if (Math.hypot(last[0] - end[0], last[1] - end[1]) > 0.003 || out.length < 2) out.push(last.slice());
  return out;
};

/* Koordinat baris buku tulis: T (atas), M (tengah), B (dasar), D (ekor bawah) */
const _T = 0.20, _M = 0.48, _B = 0.78, _D = 0.91;
const CHAR_STROKES = {
  /* Angka 0 - 9 */
  '0': [_arc(0.50, 0.49, 0.19, 0.29, -90, -450)],
  '1': [_line(0.50, _T, 0.50, _B)],
  '2': [_join(_arc(0.50, 0.34, 0.17, 0.14, -165, 25), _line(0.65, 0.40, 0.33, _B), _line(0.33, _B, 0.68, _B))],
  '3': [_join(_arc(0.49, 0.34, 0.16, 0.14, -155, 90), _arc(0.49, 0.63, 0.18, 0.15, -90, 155))],
  '4': [_join(_line(0.58, _T, 0.31, 0.58), _line(0.31, 0.58, 0.70, 0.58)), _line(0.58, _T, 0.58, _B)],
  '5': [_join(_line(0.36, _T, 0.35, 0.46), _arc(0.49, 0.61, 0.18, 0.17, -135, 145)), _line(0.36, _T, 0.66, _T)],
  '6': [_join(_quad(0.62, _T, 0.31, 0.36, 0.32, 0.62), _arc(0.50, 0.63, 0.18, 0.15, 180, -180))],
  '7': [_join(_line(0.32, _T, 0.68, _T), _line(0.68, _T, 0.42, _B))],
  '8': [_join(_arc(0.50, 0.34, 0.16, 0.14, -90, -270), _arc(0.50, 0.63, 0.18, 0.15, -90, 270), _arc(0.50, 0.34, 0.16, 0.14, 90, -90))],
  '9': [_join(_arc(0.50, 0.35, 0.17, 0.15, 0, -360), _line(0.67, 0.35, 0.67, _B))],

  /* Huruf Besar A - Z */
  'A': [_line(0.50, _T, 0.30, _B), _line(0.50, _T, 0.70, _B), _line(0.37, 0.56, 0.63, 0.56)],
  'B': [_line(0.35, _T, 0.35, _B), _join(_line(0.35, _T, 0.50, _T), _arc(0.50, 0.34, 0.15, 0.14, -90, 90), _line(0.50, _M, 0.35, _M), _line(0.35, _M, 0.52, _M), _arc(0.52, 0.63, 0.16, 0.15, -90, 90), _line(0.52, _B, 0.35, _B))],
  'C': [_arc(0.52, 0.49, 0.20, 0.29, -45, -315)],
  'D': [_line(0.35, _T, 0.35, _B), _join(_line(0.35, _T, 0.48, _T), _arc(0.48, 0.49, 0.20, 0.29, -90, 90), _line(0.48, _B, 0.35, _B))],
  'E': [_line(0.35, _T, 0.35, _B), _line(0.35, _T, 0.67, _T), _line(0.35, _M, 0.62, _M), _line(0.35, _B, 0.67, _B)],
  'F': [_line(0.36, _T, 0.36, _B), _line(0.36, _T, 0.67, _T), _line(0.36, _M, 0.62, _M)],
  'G': [_join(_arc(0.52, 0.49, 0.20, 0.29, -45, -345), _line(0.71, 0.56, 0.52, 0.56))],
  'H': [_line(0.33, _T, 0.33, _B), _line(0.67, _T, 0.67, _B), _line(0.33, _M, 0.67, _M)],
  'I': [_line(0.50, _T, 0.50, _B), _line(0.36, _T, 0.64, _T), _line(0.36, _B, 0.64, _B)],
  'J': [_join(_line(0.58, _T, 0.58, 0.63), _arc(0.46, 0.63, 0.12, 0.15, 0, 180))],
  'K': [_line(0.35, _T, 0.35, _B), _line(0.66, _T, 0.36, 0.50), _line(0.43, 0.44, 0.67, _B)],
  'L': [_line(0.36, _T, 0.36, _B), _line(0.36, _B, 0.67, _B)],
  'M': [_line(0.28, _T, 0.28, _B), _line(0.28, _T, 0.50, 0.62), _line(0.50, 0.62, 0.72, _T), _line(0.72, _T, 0.72, _B)],
  'N': [_line(0.33, _T, 0.33, _B), _line(0.33, _T, 0.67, _B), _line(0.67, _T, 0.67, _B)],
  'O': [_arc(0.50, 0.49, 0.21, 0.29, -90, -450)],
  'P': [_line(0.35, _T, 0.35, _B), _join(_line(0.35, _T, 0.51, _T), _arc(0.51, 0.35, 0.16, 0.15, -90, 90), _line(0.51, 0.50, 0.35, 0.50))],
  'Q': [_arc(0.50, 0.49, 0.21, 0.29, -90, -450), _line(0.54, 0.64, 0.71, 0.81)],
  'R': [_line(0.35, _T, 0.35, _B), _join(_line(0.35, _T, 0.51, _T), _arc(0.51, 0.35, 0.16, 0.15, -90, 90), _line(0.51, 0.50, 0.35, 0.50)), _line(0.49, 0.50, 0.67, _B)],
  'S': [_join(_arc(0.50, 0.34, 0.16, 0.14, -30, -255), _arc(0.50, 0.63, 0.17, 0.15, -75, 155))],
  'T': [_line(0.50, _T, 0.50, _B), _line(0.30, _T, 0.70, _T)],
  'U': [_join(_line(0.33, _T, 0.33, 0.60), _arc(0.50, 0.60, 0.17, 0.18, 180, 0), _line(0.67, 0.60, 0.67, _T))],
  'V': [_line(0.32, _T, 0.50, _B), _line(0.50, _B, 0.68, _T)],
  'W': [_line(0.24, _T, 0.37, _B), _line(0.37, _B, 0.50, 0.42), _line(0.50, 0.42, 0.63, _B), _line(0.63, _B, 0.76, _T)],
  'X': [_line(0.33, _T, 0.67, _B), _line(0.67, _T, 0.33, _B)],
  'Y': [_line(0.32, _T, 0.50, _M), _line(0.68, _T, 0.50, _M), _line(0.50, _M, 0.50, _B)],
  'Z': [_join(_line(0.32, _T, 0.68, _T), _line(0.68, _T, 0.32, _B), _line(0.32, _B, 0.68, _B))],

  /* Huruf Kecil a - z */
  'a': [_arc(0.49, 0.63, 0.15, 0.15, -35, -395), _line(0.64, _M, 0.64, _B)],
  'b': [_line(0.36, _T, 0.36, _B), _arc(0.50, 0.63, 0.15, 0.15, -145, 145)],
  'c': [_arc(0.52, 0.63, 0.16, 0.15, -45, -315)],
  'd': [_arc(0.49, 0.63, 0.15, 0.15, -35, -395), _line(0.64, _T, 0.64, _B)],
  'e': [_join(_line(0.35, 0.62, 0.65, 0.62), _arc(0.50, 0.63, 0.15, 0.15, 0, -315))],
  'f': [_join(_arc(0.54, 0.30, 0.10, 0.10, -20, -180), _line(0.44, 0.30, 0.44, _B)), _line(0.32, _M, 0.58, _M)],
  'g': [_arc(0.49, 0.63, 0.15, 0.15, -35, -395), _join(_line(0.64, _M, 0.64, 0.80), _arc(0.50, 0.80, 0.14, 0.11, 0, 165))],
  'h': [_line(0.36, _T, 0.36, _B), _join(_arc(0.50, 0.58, 0.14, 0.10, -180, 0), _line(0.64, 0.58, 0.64, _B))],
  'i': [_line(0.50, _M, 0.50, _B), _line(0.50, 0.32, 0.50, 0.35, 6)],
  'j': [_join(_line(0.54, _M, 0.54, 0.80), _arc(0.43, 0.80, 0.11, 0.11, 0, 165)), _line(0.54, 0.32, 0.54, 0.35, 6)],
  'k': [_line(0.36, _T, 0.36, _B), _line(0.62, _M, 0.38, 0.64), _line(0.45, 0.59, 0.64, _B)],
  'l': [_line(0.50, _T, 0.50, _B)],
  'm': [_line(0.26, _M, 0.26, _B), _join(_arc(0.38, 0.58, 0.12, 0.10, -180, 0), _line(0.50, 0.58, 0.50, _B)), _join(_arc(0.62, 0.58, 0.12, 0.10, -180, 0), _line(0.74, 0.58, 0.74, _B))],
  'n': [_line(0.36, _M, 0.36, _B), _join(_arc(0.50, 0.58, 0.14, 0.10, -180, 0), _line(0.64, 0.58, 0.64, _B))],
  'o': [_arc(0.50, 0.63, 0.16, 0.15, -90, -450)],
  'p': [_line(0.36, _M, 0.36, _D), _arc(0.50, 0.63, 0.15, 0.15, -145, 145)],
  'q': [_arc(0.49, 0.63, 0.15, 0.15, -35, -395), _line(0.64, _M, 0.64, _D)],
  'r': [_line(0.38, _M, 0.38, _B), _arc(0.52, 0.58, 0.14, 0.10, -180, -35)],
  's': [_join(_arc(0.50, 0.55, 0.13, 0.07, -30, -255), _arc(0.50, 0.70, 0.14, 0.08, -75, 155))],
  't': [_join(_line(0.48, 0.28, 0.48, 0.71), _arc(0.55, 0.71, 0.07, 0.07, 180, 20)), _line(0.35, _M, 0.61, _M)],
  'u': [_join(_line(0.36, _M, 0.36, 0.66), _arc(0.50, 0.66, 0.14, 0.12, 180, 0)), _line(0.64, _M, 0.64, _B)],
  'v': [_line(0.34, _M, 0.50, _B), _line(0.50, _B, 0.66, _M)],
  'w': [_line(0.26, _M, 0.38, _B), _line(0.38, _B, 0.50, 0.56), _line(0.50, 0.56, 0.62, _B), _line(0.62, _B, 0.74, _M)],
  'x': [_line(0.35, _M, 0.65, _B), _line(0.65, _M, 0.35, _B)],
  'y': [_line(0.34, _M, 0.50, _B), _line(0.66, _M, 0.38, _D)],
  'z': [_join(_line(0.35, _M, 0.65, _M), _line(0.65, _M, 0.35, _B), _line(0.35, _B, 0.65, _B))]
};

function getTraceStrokes(q) {
  if (q.mode !== 'text') return (q.pts || []).map((pl) => _resample(pl, 0.015));
  const chars = String(q.text || '').split('');
  if (chars.length === 1) {
    const raw = CHAR_STROKES[chars[0]] || CHAR_STROKES[chars[0].toUpperCase()] || [_line(0.5, _T, 0.5, _B)];
    return raw.map((pl) => _resample(pl, 0.014));
  }
  const all = [], n = chars.length, pad = 0.06, span = (1 - pad * 2) / n;
  chars.forEach((ch, idx) => {
    const raw = CHAR_STROKES[ch] || CHAR_STROKES[ch.toUpperCase()] || [_line(0.5, _T, 0.5, _B)];
    const xStart = pad + idx * span;
    raw.forEach((pl) => {
      const mapped = pl.map((p) => [xStart + ((p[0] - 0.22) / 0.56) * span * 0.88, p[1]]);
      all.push(_resample(mapped, 0.014));
    });
  });
  return all;
}

Q.types.trace = function (q, host, ctx) {
  const isWord = q.mode === 'text' && q.text.length > 2;
  const rawStrokes = getTraceStrokes(q);
  const totalStrokes = rawStrokes.length;
  host.innerHTML = `<div class="trace-status"><span class="trace-badge" data-step-info>Ikuti garis putus-putus dari nomor 1</span></div>
  <div class="trace-wrap"><canvas aria-label="Kertas menulis"></canvas></div>
  <div class="trace-btns"><button class="btn alt" data-t="clear">Ulangi</button><button class="btn go" data-t="check">Selesai</button></div>`;
  const stepInfo = $('[data-step-info]', host);
  const cv = $('canvas', host), avail = Math.max(240, (host.clientWidth || 360) - 8), dpr = Math.min(2, window.devicePixelRatio || 1);
  let cssW, cssH;
  if (isWord) { cssW = Math.min(560, avail); cssH = cssW * 0.48; }
  else { cssH = Math.min(avail, 430, Math.max(220, window.innerHeight * 0.42)); cssW = cssH; }
  const W = Math.round(cssW * dpr), H = Math.round(cssH * dpr);
  cv.width = W; cv.height = H; cv.style.width = cssW + 'px'; cv.style.height = cssH + 'px';
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const mask = mk(), ink = mk(), wide = mk();
  const g = cv.getContext('2d'), mg = mask.getContext('2d'), ig = ink.getContext('2d'), wg = wide.getContext('2d');
  const trackW = (isWord ? cssH * 0.13 : cssH * 0.155) * dpr;
  const brush = trackW * 0.66;

  /* Konversi koordinat stroke ke piksel kanvas */
  const strokes = rawStrokes.map((pl) => pl.map((p) => [p[0] * W, p[1] * H]));
  let strokeIdx = 0, prog = 0;

  const updateBanner = () => {
    if (!stepInfo) return;
    if (strokeIdx >= totalStrokes) {
      stepInfo.textContent = 'Hebat! Semua garis selesai ditebali!';
      stepInfo.classList.add('done');
    } else if (totalStrokes > 1) {
      stepInfo.textContent = `Tarikan ${strokeIdx + 1} dari ${totalStrokes} • Ikuti garis putus-putus & panah dari nomor ${strokeIdx + 1}`;
      stepInfo.classList.remove('done');
    } else {
      stepInfo.textContent = 'Ikuti garis putus-putus & panah dari nomor 1 sampai ujung';
      stepInfo.classList.remove('done');
    }
  };
  updateBanner();

  const drawGuide = () => {
    if (q.mode !== 'text') return;
    const x0 = W * 0.04, x1 = W * 0.96, line = (y) => { const yy = Math.round(y) + 0.5; g.beginPath(); g.moveTo(x0, yy); g.lineTo(x1, yy); g.stroke(); };
    g.save(); g.lineCap = 'butt';
    g.lineWidth = 2.5 * dpr; g.strokeStyle = TRACE_GUIDE.top; line(_T * H);
    g.setLineDash([12 * dpr, 10 * dpr]); g.strokeStyle = TRACE_GUIDE.mid; line(_M * H); g.setLineDash([]);
    g.lineWidth = 5 * dpr; g.strokeStyle = TRACE_GUIDE.base; line(_B * H);
    g.restore();
  };

  const polyPx = (ctx2, pts, startI = 0, endI = pts.length - 1) => {
    if (!pts || endI < startI) return;
    ctx2.beginPath();
    ctx2.moveTo(pts[startI][0], pts[startI][1]);
    for (let i = startI + 1; i <= endI; i++) ctx2.lineTo(pts[i][0], pts[i][1]);
  };

  /* Gambar panah penunjuk arah di sepanjang jalur tarikan */
  const drawArrowAt = (pts, idx, color, sz) => {
    if (!pts || pts.length < 3) return;
    const i0 = Math.max(0, idx - 1), i1 = Math.min(pts.length - 1, idx + 1);
    const dx = pts[i1][0] - pts[i0][0], dy = pts[i1][1] - pts[i0][1];
    if (Math.hypot(dx, dy) < 0.5) return;
    const ang = Math.atan2(dy, dx), x = pts[idx][0], y = pts[idx][1];
    g.save();
    g.translate(x, y); g.rotate(ang);
    g.strokeStyle = color; g.lineWidth = 3 * dpr; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(-sz * 0.85, -sz * 0.65);
    g.lineTo(sz * 0.25, 0);
    g.lineTo(-sz * 0.85, sz * 0.65);
    g.stroke();
    g.restore();
  };

  /* Gambar lencana nomor urutan tarikan */
  const drawNumBadge = (x, y, num, active) => {
    const r = active ? Math.max(15 * dpr, trackW * 0.38) : Math.max(11 * dpr, trackW * 0.26);
    g.save();
    if (active) {
      g.fillStyle = 'rgba(79, 214, 160, 0.28)';
      g.beginPath(); g.arc(x, y, r * 1.32, 0, Math.PI * 2); g.fill();
    }
    g.fillStyle = active ? '#4FD6A0' : '#E2E8F0';
    g.strokeStyle = active ? INK : '#64748B';
    g.lineWidth = (active ? 3 : 2) * dpr;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = active ? INK : '#475569';
    g.font = `700 ${Math.round(r * 1.15)}px "Fredoka", sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(String(num), x, y + 1 * dpr);
    g.restore();
  };

  /* Topeng area untuk kompatibilitas pemeriksaan cakupan */
  const buildMask = () => {
    mg.clearRect(0, 0, W, H);
    mg.strokeStyle = '#000'; mg.lineCap = 'round'; mg.lineJoin = 'round';
    mg.lineWidth = trackW;
    strokes.forEach((pts) => { polyPx(mg, pts); mg.stroke(); });
  };
  buildMask();

  const paint = () => {
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H);
    drawGuide();
    g.lineCap = 'round'; g.lineJoin = 'round';

    /* 1. Tepi luar & lorong tubuh huruf/angka (#EFE9FF) */
    g.strokeStyle = '#D5C8FA'; g.lineWidth = trackW + 5 * dpr;
    strokes.forEach((pts) => { polyPx(g, pts); g.stroke(); });
    g.strokeStyle = '#EFE9FF'; g.lineWidth = trackW;
    strokes.forEach((pts) => { polyPx(g, pts); g.stroke(); });

    /* 2. Garis putus-putus untuk tarikan berikutnya (belum aktif) */
    for (let s = strokeIdx + 1; s < totalStrokes; s++) {
      const pts = strokes[s];
      g.save();
      g.setLineDash([8 * dpr, 8 * dpr]);
      g.strokeStyle = '#94A3B8'; g.lineWidth = 2.5 * dpr;
      polyPx(g, pts); g.stroke();
      g.restore();
      const mIdx = Math.floor(pts.length * 0.5);
      drawArrowAt(pts, mIdx, '#94A3B8', 7 * dpr);
    }

    /* 3. Tinta mentah cadangan & tarikan yang sudah selesai */
    g.drawImage(ink, 0, 0);
    for (let s = 0; s < strokeIdx && s < totalStrokes; s++) {
      const pts = strokes[s];
      g.strokeStyle = '#FF6FA5'; g.lineWidth = brush;
      polyPx(g, pts); g.stroke();
    }

    /* 4. Tarikan aktif: garis putus-putus di dalam huruf, panah arah, bagian yang sudah ditebali, titik mulai & akhir */
    if (strokeIdx < totalStrokes) {
      const pts = strokes[strokeIdx];
      /* Bagian yang sudah berhasil ditebali pada tarikan aktif */
      if (prog > 0) {
        g.strokeStyle = '#FF6FA5'; g.lineWidth = brush;
        polyPx(g, pts, 0, prog); g.stroke();
      }
      /* Sisa garis putus-putus di dalam huruf */
      g.save();
      g.setLineDash([10 * dpr, 9 * dpr]);
      g.strokeStyle = INK; g.lineWidth = 3.5 * dpr;
      polyPx(g, pts, prog, pts.length - 1); g.stroke();
      g.restore();

      /* Panah instruksi arah di sepanjang sisa garis putus-putus */
      if (pts.length >= 6) {
        const a1 = Math.floor(pts.length * 0.35), a2 = Math.floor(pts.length * 0.70);
        if (a1 > prog + 2) drawArrowAt(pts, a1, INK, 9 * dpr);
        if (a2 > prog + 2) drawArrowAt(pts, a2, INK, 9 * dpr);
      }

      /* Titik target ujung tarikan */
      const endPt = pts[pts.length - 1];
      const endR = Math.max(9 * dpr, trackW * 0.24);
      g.save();
      g.fillStyle = '#FFD447'; g.strokeStyle = INK; g.lineWidth = 2.5 * dpr;
      g.beginPath(); g.arc(endPt[0], endPt[1], endR, 0, Math.PI * 2); g.fill(); g.stroke();
      g.restore();

      /* Lencana nomor untuk tarikan berikutnya agar urutan terlihat */
      for (let s = totalStrokes - 1; s > strokeIdx; s--) {
        const sp = strokes[s][0];
        drawNumBadge(sp[0], sp[1], s + 1, false);
      }

      /* Titik mulai bernomor atau kursor penuntun aktif */
      const curPt = pts[prog];
      drawNumBadge(curPt[0], curPt[1], strokeIdx + 1, true);
    }
  };

  const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  let drawing = false, last = null, locked = false, tries = 0;
  const seg = (c, a, b, lw, col) => { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); };

  const finishAll = async () => {
    if (locked) return;
    locked = true;
    strokeIdx = totalStrokes;
    updateBanner();
    paint();
    A.sfx('tap');
    await ctx.react('right', { first: tries === 0 });
    ctx.done(tries <= 1);
  };

  /* Lacak kemajuan jari di sepanjang garis putus-putus aktif */
  const advanceAlongStroke = (p0, p1) => {
    if (locked || strokeIdx >= totalStrokes) return;
    const pts = strokes[strokeIdx];
    const hitR = Math.max(trackW * 0.82, 28 * dpr);
    const distSeg = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
    const steps = Math.max(1, Math.ceil(distSeg / (4 * dpr)));
    for (let s = 1; s <= steps; s++) {
      const sx = p0[0] + (p1[0] - p0[0]) * (s / steps);
      const sy = p0[1] + (p1[1] - p0[1]) * (s / steps);
      const lookAhead = Math.min(pts.length - 1, prog + Math.max(8, Math.ceil(pts.length * 0.22)));
      let bestK = prog, bestD = Infinity;
      for (let k = prog; k <= lookAhead; k++) {
        const d = Math.hypot(pts[k][0] - sx, pts[k][1] - sy);
        if (d <= hitR && d < bestD) { bestD = d; bestK = k; }
      }
      if (bestK > prog) {
        for (let k = prog; k < bestK; k++) {
          seg(ig, pts[k], pts[k + 1], brush, '#FF6FA5');
          seg(wg, pts[k], pts[k + 1], brush * 2.2, '#000');
        }
        prog = bestK;
      } else if (prog === 0 && Math.hypot(pts[0][0] - sx, pts[0][1] - sy) <= hitR) {
        prog = Math.min(pts.length - 1, 1);
      }
      /* Jika mencapai ujung garis putus-putus (atau tarikan titik pendek seperti huruf i/j) */
      const endPt = pts[pts.length - 1];
      const nearEnd = Math.hypot(endPt[0] - sx, endPt[1] - sy) <= hitR * 0.85;
      if (prog >= pts.length - 2 || (pts.length <= 8 && prog >= 1) || (prog >= Math.floor(pts.length * 0.78) && nearEnd)) {
        for (let k = prog; k < pts.length - 1; k++) {
          seg(ig, pts[k], pts[k + 1], brush, '#FF6FA5');
          seg(wg, pts[k], pts[k + 1], brush * 2.2, '#000');
        }
        strokeIdx++;
        prog = 0;
        updateBanner();
        if (strokeIdx >= totalStrokes) {
          finishAll();
          return;
        } else {
          A.sfx('bead');
          break;
        }
      }
    }
  };

  cv.onpointerdown = (e) => {
    if (locked) return;
    e.preventDefault();
    if (cv.setPointerCapture) { try { cv.setPointerCapture(e.pointerId); } catch (_) {} }
    drawing = true;
    last = pos(e);
    seg(wg, last, last, brush * 2.6, '#000');
    advanceAlongStroke(last, last);
    paint();
  };
  cv.onpointermove = (e) => {
    if (!drawing || locked) return;
    const p = pos(e);
    seg(wg, last, p, brush * 2.6, '#000');
    advanceAlongStroke(last, p);
    last = p;
    if (!locked) paint();
  };
  const up = () => { drawing = false; last = null; };
  cv.onpointerup = up; cv.onpointercancel = up;

  const clear = () => {
    strokeIdx = 0; prog = 0;
    ig.clearRect(0, 0, W, H); wg.clearRect(0, 0, W, H);
    updateBanner();
    paint();
  };

  const measure = () => {
    const m = mg.getImageData(0, 0, W, H).data, w = wg.getImageData(0, 0, W, H).data;
    let mc = 0, hit = 0, wc = 0;
    for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x += 3) {
      const i = (y * W + x) * 4 + 3, inMask = m[i] > 40;
      if (inMask) { mc++; if (w[i] > 40) hit++; }
      if (w[i] > 40) wc++;
    }
    return { cov: mc ? hit / mc : 0, inkAmt: wc };
  };

  host.onclick = async (e) => {
    const tt = e.target.closest('[data-t]');
    if (!tt || locked) return;
    if (tt.dataset.t === 'clear') { clear(); return; }
    const r = measure();
    if (strokeIdx >= totalStrokes || (r.inkAmt > 25 && r.cov >= 0.65)) {
      await finishAll();
    } else {
      tries++;
      if (tries >= 3) {
        locked = true; strokeIdx = totalStrokes; updateBanner(); paint();
        await ctx.react('reveal'); ctx.done(false);
      } else {
        ctx.react('wrong', { say: PHRASES.traceTry });
      }
    }
  };
  paint();
  return { destroy() { host.onclick = null; cv.onpointerdown = cv.onpointermove = cv.onpointerup = cv.onpointercancel = null; } };
};

/* ---------- Sempoa interaktif ---------- */
Q.types.abacus = function (q, host, ctx) {
  const st = Array.from({ length: q.rods }, () => ({ up: 0, low: 0 }));
  host.innerHTML = `<div class="qvis">${q.problem ? exprHTML(q.problem) : ''}</div><div class="abacus-wrap" data-ab></div><div class="ab-live"></div><div class="ab-help">Manik atas bernilai 5, manik bawah bernilai 1. Dorong manik ke garis tengah untuk menghitungnya.</div>
  <div class="trace-btns"><button class="btn alt" data-t="clear">Kosongkan</button><button class="btn go" data-t="check">Cek</button></div>`;
  const wrap = $('[data-ab]', host), live = $('.ab-live', host);
  let tries = 0, locked = false;
  const paint = () => { wrap.innerHTML = abacusSVG(st, true); live.textContent = q.problem ? '' : `Sempoamu menunjukkan angka ${abacusValue(st)}`; };
  host.onclick = async (e) => {
    if (locked) return;
    const bd = e.target.closest('.bead[data-r]'), tt = e.target.closest('[data-t]');
    if (bd) {
      const r = st[+bd.dataset.r], b = bd.dataset.b;
      if (b === 'u') r.up = r.up ? 0 : 1; else { const i = +b; r.low = i <= r.low ? i - 1 : i; }
      A.sfx('bead'); paint();
    } else if (tt && tt.dataset.t === 'clear') { st.forEach((r) => { r.up = 0; r.low = 0; }); paint(); }
    else if (tt && tt.dataset.t === 'check') {
      if (abacusValue(st) === q.target) { locked = true; await ctx.react('right', { first: tries === 0 }); ctx.done(tries === 0); }
      else {
        tries++;
        if (tries >= 2) { locked = true; abacusState(q.target, q.rods).forEach((s, i) => { st[i] = s; }); paint(); await ctx.react('reveal'); ctx.done(false); }
        else ctx.react('wrong');
      }
    }
  };
  paint();
  return { destroy() { host.onclick = null; } };
};

/* ---------- Kilat angka (sempoa mental) ---------- */
Q.types.flash = function (q, host, ctx) {
  host.innerHTML = `<div class="flash-box"><div class="flash-num"></div></div><div class="trace-btns"><button class="btn alt" data-t="again" disabled>Lihat lagi</button></div><div class="kp-area" hidden></div>`;
  const num = $('.flash-num', host), area = $('.kp-area', host), again = $('[data-t="again"]', host);
  let kp = null, dead = false, replayed = false;
  const play = async () => {
    again.disabled = true; area.hidden = true; if (kp) { kp.destroy(); kp = null; }
    num.textContent = 'Siap?'; await new Promise((r) => setTimeout(r, 900));
    for (const v of q.seq) {
      if (dead) return;
      num.textContent = v; num.classList.remove('pop'); void num.offsetWidth; num.classList.add('pop'); A.sfx('bead');
      await new Promise((r) => setTimeout(r, q.ms));
      num.textContent = ''; await new Promise((r) => setTimeout(r, 160));
    }
    if (dead) return;
    num.textContent = '?'; area.hidden = false; kp = keypadUI(area, q, ctx);
    again.disabled = replayed;
  };
  host.onclick = (e) => { const b = e.target.closest('[data-t="again"]'); if (b && !b.disabled) { replayed = true; play(); } };
  play();
  return { destroy() { dead = true; host.onclick = null; if (kp) kp.destroy(); } };
};

/* ---------- Ingat sempoa ---------- */
Q.types.memory = function (q, host, ctx) {
  host.innerHTML = `<div class="abacus-wrap mem">${abacusSVG(abacusState(q.value, q.rods), false)}</div><div class="ab-live">Ingat angkanya!</div><div class="kp-area" hidden></div>`;
  const wrap = $('.abacus-wrap', host), area = $('.kp-area', host), live = $('.ab-live', host);
  let kp = null, dead = false;
  setTimeout(() => {
    if (dead) return;
    wrap.innerHTML = '<div class="hidden-ab">Angka berapa tadi?</div>'; live.textContent = ''; area.hidden = false; kp = keypadUI(area, q, ctx);
  }, q.ms + 400);
  return { destroy() { dead = true; if (kp) kp.destroy(); } };
};

/* ===== Modul Interaktif: Belajar Sempoa Pemula (Dari 0) ===== */
function mountAbacusLearn(host, initialStep = 0, onExit = null) {
  let stepIdx = Math.max(0, Math.min(initialStep, ABACUS_TUTORIAL_STEPS.length - 1));
  let st = { up: 0, low: 0 };
  let challengeTarget = 3;
  let solved = false;
  let dead = false;
  let completed = {};

  const currentStep = () => ABACUS_TUTORIAL_STEPS[stepIdx];
  const currentValue = () => (st.up ? 5 : 0) + st.low;
  const isTargetAchieved = () => {
    const s = currentStep();
    if (s.id === 10) return currentValue() === challengeTarget;
    return currentValue() === s.target;
  };

  function pickNewChallenge() {
    const cur = challengeTarget;
    let n = Math.floor(Math.random() * 9) + 1;
    if (n === cur) n = (n % 9) + 1;
    challengeTarget = n;
  }

  function setupStep(idx) {
    stepIdx = idx;
    solved = false;
    const s = currentStep();
    if (s.id === 10) {
      pickNewChallenge();
      st = { up: 0, low: 0 };
    } else if (s.id === 0) {
      st = { up: 0, low: 0 };
    } else {
      st = { up: 0, low: 0 };
    }
    render();
    speakStep();
  }

  function speakStep() {
    if (dead) return;
    const s = currentStep();
    A.setVoice('bintang');
    if (s.id === 10) {
      A.say(['Coba buat angka ' + idNum(challengeTarget) + ' di sempoa!']);
    } else {
      A.say([s.say]);
    }
  }

  function checkGoal() {
    const val = currentValue();
    const s = currentStep();
    const targetVal = s.id === 10 ? challengeTarget : s.target;

    if (val === targetVal && !solved) {
      solved = true;
      completed[s.id] = true;
      if (typeof S !== 'undefined' && S.stars !== undefined) {
        S.stars++;
        if (typeof save === 'function') save();
      }
      A.sfx('win');
      if (typeof fxBurst === 'function') {
        const wrap = $('.ab-learn-canvas', host) || host;
        const rect = wrap.getBoundingClientRect();
        fxBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
      }
      setTimeout(() => {
        if (dead) return;
        A.say(['Bagus sekali! Angka ' + idNum(targetVal) + ' berhasil!']);
      }, 400);
      render();
    } else {
      render();
    }
  }

  function render() {
    if (dead) return;
    const s = currentStep();
    const val = currentValue();
    const targetVal = s.id === 10 ? challengeTarget : s.target;
    const isGoal = solved || isTargetAchieved();
    const mood = isGoal ? 'happy' : 'normal';

    let fingerType = s.finger || 'thumb';
    let fingerDir = s.dir || 'up';
    let fingerText = s.fingerLabel || '';

    let rodGuideBead = null;
    if (!isGoal) {
      if (s.id >= 1 && s.id <= 4) {
        rodGuideBead = 'b' + s.target;
      } else if (s.id === 5) {
        rodGuideBead = 'u';
      } else if (s.id >= 6 && s.id <= 9) {
        rodGuideBead = st.up === 0 ? 'u' : ('b' + (s.target - 5));
      }
    }

    host.innerHTML = `
      <div class="ab-learn-wrap">
        <header class="topbar">
          <button class="round" data-act="exitAbacus" aria-label="Kembali">${icon('back', 28)}</button>
          <div class="ab-step-pills">
            ${ABACUS_TUTORIAL_STEPS.map((stItem, i) => {
              const isCur = i === stepIdx;
              const isDone = !!completed[stItem.id];
              const label = stItem.id === 10 ? starSVG(18, '#FFD95A') : stItem.id;
              return `<button class="step-pill ${isCur ? 'active' : ''} ${isDone ? 'done' : ''}" data-step="${i}" aria-label="${stItem.title}">${label}</button>`;
            }).join('')}
          </div>
          <div class="tb-right">
            <div class="chip">${starSVG(26)}<b id="ab-stars">${typeof S !== 'undefined' ? S.stars : 0}</b></div>
            <button class="round" data-act="toggleSound" aria-label="Suara">${icon(typeof S !== 'undefined' && S.sound ? 'sound' : 'soundoff', 26)}</button>
          </div>
        </header>

        <main class="ab-learn-body">
          <div class="ab-mascot-row">
            <div class="ab-char">${charSVG('bintang', mood, 130)}</div>
            <div class="bubble ab-bubble">
              <div class="bubble-row">
                <button class="round sm voice-btn" data-act="reSpeak" aria-label="Dengarkan lagi">${icon('sound', 24)}</button>
                <div class="bubble-text">${s.id === 10 ? `Ayo buat angka <b>${challengeTarget}</b> di sempoa!` : s.bubble}</div>
              </div>
            </div>
          </div>

          <div class="ab-stage">
            <div class="ab-guide-col">
              <div class="finger-card">
                <div class="finger-ico">${guideHandSVG(fingerType, fingerDir, 62)}</div>
                <div class="finger-title">Petunjuk Gerakan</div>
                <div class="finger-desc">${fingerText}</div>
              </div>
              <div class="ab-hint-box">
                <span class="hint-tag">${s.tag}</span>
                <p class="hint-p">${s.id === 10 ? 'Dorong manik mendekati garis tengah untuk membuat angka.' : s.guideText}</p>
              </div>
            </div>

            <div class="ab-canvas-col">
              <div class="ab-learn-canvas">
                ${abacusLearnRodSVG(st, { guideBead: rodGuideBead, interactive: true })}
              </div>
            </div>

            <div class="ab-score-col">
              <div class="val-card ${isGoal ? 'goal-hit' : ''}">
                <div class="val-label">Nilai Saat Ini</div>
                <div class="val-num ${isGoal ? 'pop' : ''}">${val}</div>
                <div class="val-target">${s.id === 10 ? `Target: <b>${challengeTarget}</b>` : `Misi: Angka <b>${s.target}</b>`}</div>
              </div>

              ${isGoal ? `
                <div class="goal-banner">
                  <div class="star-row">${starSVG(32, '#FFD95A', 'pop')}</div>
                  <div class="goal-msg">Hebat Sekali!</div>
                  ${s.id < 10 ? `
                    <button class="btn big go next-step-btn" data-act="nextStep">Lanjut ➔</button>
                  ` : `
                    <button class="btn big go next-step-btn" data-act="nextChallenge">Tantangan Baru ➔</button>
                  `}
                </div>
              ` : `
                <div class="ab-actions">
                  <button class="btn alt sm-act" data-act="clearBeads">Bersihkan (0)</button>
                  ${s.id > 0 ? `<button class="btn alt sm-act" data-act="prevStep">Sebelumnya</button>` : ''}
                  ${s.id < 10 ? `<button class="btn go sm-act" data-act="nextStep">Lewati ➔</button>` : ''}
                </div>
              `}
            </div>
          </div>
        </main>
      </div>
    `;
  }

  host.onclick = (e) => {
    if (dead) return;
    const btn = e.target.closest('[data-act]');
    const pill = e.target.closest('[data-step]');
    const beadEl = e.target.closest('.bead[data-b]');

    if (pill) {
      const idx = +pill.dataset.step;
      A.sfx('tap');
      setupStep(idx);
      return;
    }

    if (beadEl) {
      const b = beadEl.dataset.b;
      A.sfx('bead');
      if (b === 'u') {
        st.up = st.up ? 0 : 1;
      } else {
        const i = +b;
        if (i <= st.low) {
          st.low = i - 1;
        } else {
          st.low = i;
        }
      }
      checkGoal();
      return;
    }

    if (!btn) return;
    const act = btn.dataset.act;

    if (act === 'exitAbacus') {
      A.sfx('tap');
      dead = true;
      A.stop();
      if (typeof onExit === 'function') onExit();
    } else if (act === 'reSpeak') {
      A.sfx('tap');
      speakStep();
    } else if (act === 'clearBeads') {
      A.sfx('tap');
      st.up = 0;
      st.low = 0;
      checkGoal();
    } else if (act === 'nextStep') {
      A.sfx('tap');
      if (stepIdx < ABACUS_TUTORIAL_STEPS.length - 1) {
        setupStep(stepIdx + 1);
      }
    } else if (act === 'prevStep') {
      A.sfx('tap');
      if (stepIdx > 0) {
        setupStep(stepIdx - 1);
      }
    } else if (act === 'nextChallenge') {
      A.sfx('tap');
      setupStep(10);
    } else if (act === 'toggleSound') {
      if (typeof S !== 'undefined') {
        S.sound = !S.sound;
        if (typeof A !== 'undefined') A.setSound(S.sound);
        if (typeof save === 'function') save();
      }
      render();
    }
  };

  setupStep(stepIdx);

  return {
    destroy() {
      dead = true;
      host.onclick = null;
    }
  };
}

