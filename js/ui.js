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

/* ---------- Menjiplak huruf, angka, kata, dan bentuk ---------- */
const TRACE_FONT = (px) => `700 ${px}px "Fredoka","Baloo 2","Arial Rounded MT Bold","Trebuchet MS",Arial,sans-serif`;
/* Garis panduan menulis seperti buku tulis: garis atas, garis tengah putus-putus, dan garis dasar yang lebih tebal.
   Posisinya dihitung dari ukuran huruf sebenarnya (tinggi huruf besar dan huruf kecil), hanya untuk huruf, angka, dan kata. */
const TRACE_GUIDE = { top: '#7FA6E8', mid: '#F2799F', base: '#5B86D6' };
Q.types.trace = function (q, host, ctx) {
  const isWord = q.mode === 'text' && q.text.length > 2;
  host.innerHTML = `<div class="trace-wrap"><canvas aria-label="Kertas menulis"></canvas></div>
  <div class="trace-btns"><button class="btn alt" data-t="clear">Hapus</button><button class="btn go" data-t="check">Selesai</button></div>`;
  const cv = $('canvas', host), avail = Math.max(240, (host.clientWidth || 360) - 8), dpr = Math.min(2, window.devicePixelRatio || 1);
  let cssW, cssH;
  if (isWord) { cssW = Math.min(560, avail); cssH = cssW * 0.42; }
  else { cssH = Math.min(avail, 440, Math.max(220, window.innerHeight * 0.4)); cssW = cssH; }
  const W = Math.round(cssW * dpr), H = Math.round(cssH * dpr);
  cv.width = W; cv.height = H; cv.style.width = cssW + 'px'; cv.style.height = cssH + 'px';
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const mask = mk(), ink = mk(), wide = mk();
  const g = cv.getContext('2d'), mg = mask.getContext('2d'), ig = ink.getContext('2d'), wg = wide.getContext('2d');
  const brush = (isWord ? cssH * 0.1 : cssH * 0.07) * dpr;
  let fontPx = 0, guide = null;
  const computeGuide = () => {
    guide = null;
    if (q.mode !== 'text') return;
    g.font = TRACE_FONT(fontPx); g.textBaseline = 'middle';
    const y = H / 2 + fontPx * 0.04, cap = g.measureText('H'), xh = g.measureText('x');
    if (cap.actualBoundingBoxAscent !== undefined) guide = { top: y - cap.actualBoundingBoxAscent, mid: y - xh.actualBoundingBoxAscent, base: y + cap.actualBoundingBoxDescent };
    else guide = { top: y - fontPx * 0.36, mid: y - fontPx * 0.1, base: y + fontPx * 0.36 }; /* cadangan untuk peramban lama */
  };
  const drawGuide = () => {
    if (!guide) return;
    const x0 = W * 0.04, x1 = W * 0.96, line = (y) => { const yy = Math.round(y) + 0.5; g.beginPath(); g.moveTo(x0, yy); g.lineTo(x1, yy); g.stroke(); };
    g.save(); g.lineCap = 'butt';
    g.lineWidth = 2.5 * dpr; g.strokeStyle = TRACE_GUIDE.top; line(guide.top);
    g.setLineDash([12 * dpr, 10 * dpr]); g.strokeStyle = TRACE_GUIDE.mid; line(guide.mid); g.setLineDash([]);
    g.lineWidth = 5 * dpr; g.strokeStyle = TRACE_GUIDE.base; line(guide.base);
    g.restore();
  };
  const layoutFont = () => {
    if (q.mode !== 'text') return;
    fontPx = isWord ? cssH * 0.62 : cssH * 0.8; fontPx *= dpr;
    g.font = TRACE_FONT(fontPx); const wpx = g.measureText(q.text).width;
    if (wpx > W * 0.9) fontPx *= (W * 0.9) / wpx;
    if (q.text.length === 1 && q.text === q.text.toLowerCase() && /[a-z]/.test(q.text)) fontPx *= 0.95;
    computeGuide();
  };
  layoutFont();
  const poly = (ctx2, pts) => { pts.forEach((p, i) => { const x = p[0] * W, y = p[1] * H; if (i) ctx2.lineTo(x, y); else { ctx2.beginPath(); ctx2.moveTo(x, y); } }); };
  const drawTextShape = (c, mode) => {
    c.font = TRACE_FONT(fontPx); c.textAlign = 'center'; c.textBaseline = 'middle';
    const y = H / 2 + fontPx * 0.04;
    if (mode === 'fill') c.fillText(q.text, W / 2, y); else c.strokeText(q.text, W / 2, y);
  };
  // topeng: area yang benar (digambar ulang bila font baru selesai dimuat)
  const buildMask = () => {
    mg.clearRect(0, 0, W, H);
    mg.fillStyle = '#000'; mg.strokeStyle = '#000'; mg.lineCap = 'round'; mg.lineJoin = 'round';
    if (q.mode === 'text') drawTextShape(mg, 'fill');
    else { mg.lineWidth = W * 0.13; q.pts.forEach((pl) => { poly(mg, pl); mg.stroke(); }); }
  };
  buildMask();
  let strokes = [];
  const paint = () => {
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H);
    g.lineCap = 'round'; g.lineJoin = 'round';
    if (q.mode === 'text') {
      g.fillStyle = '#EFE9FF'; drawTextShape(g, 'fill');
      drawGuide();
      g.setLineDash([10 * dpr, 9 * dpr]); g.lineWidth = 3 * dpr; g.strokeStyle = INK; drawTextShape(g, 'stroke'); g.setLineDash([]);
    } else {
      g.strokeStyle = '#EFE9FF'; g.lineWidth = W * 0.1; q.pts.forEach((pl) => { poly(g, pl); g.stroke(); });
      g.setLineDash([12 * dpr, 10 * dpr]); g.strokeStyle = INK; g.lineWidth = 3 * dpr; q.pts.forEach((pl) => { poly(g, pl); g.stroke(); }); g.setLineDash([]);
      const s = q.pts[0][0]; g.fillStyle = '#4FD6A0'; g.strokeStyle = INK; g.lineWidth = 3 * dpr; g.beginPath(); g.arc(s[0] * W, s[1] * H, W * 0.035, 0, 7); g.fill(); g.stroke();
    }
    g.drawImage(ink, 0, 0);
  };
  const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  let drawing = false, last = null, locked = false, tries = 0;
  const seg = (c, a, b, lw, col) => { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); };
  cv.onpointerdown = (e) => { if (locked) return; e.preventDefault(); cv.setPointerCapture(e.pointerId); drawing = true; last = pos(e); seg(ig, last, last, brush, '#FF6FA5'); seg(wg, last, last, brush * 2.6, '#000'); paint(); };
  cv.onpointermove = (e) => { if (!drawing) return; const p = pos(e); seg(ig, last, p, brush, '#FF6FA5'); seg(wg, last, p, brush * 2.6, '#000'); last = p; paint(); };
  const up = () => { drawing = false; last = null; };
  cv.onpointerup = up; cv.onpointercancel = up;
  const clear = () => { ig.clearRect(0, 0, W, H); wg.clearRect(0, 0, W, H); paint(); };
  const measure = () => {
    const m = mg.getImageData(0, 0, W, H).data, u = ig.getImageData(0, 0, W, H).data, w = wg.getImageData(0, 0, W, H).data;
    let mc = 0, hit = 0, uc = 0, out = 0;
    for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x += 3) {
      const i = (y * W + x) * 4 + 3, inMask = m[i] > 40;
      if (inMask) { mc++; if (w[i] > 40) hit++; }
      if (u[i] > 40) { uc++; if (!inMask) out++; }
    }
    return { cov: mc ? hit / mc : 0, spill: uc ? out / uc : 1, inkAmt: uc };
  };
  host.onclick = async (e) => {
    const tt = e.target.closest('[data-t]');
    if (!tt || locked) return;
    if (tt.dataset.t === 'clear') { clear(); return; }
    const r = measure();
    const thr = q.mode === 'text' ? 0.7 : 0.75;
    if (r.inkAmt > 30 && r.cov >= thr && r.spill <= 0.55) {
      locked = true; A.sfx('tap'); await ctx.react('right', { first: tries === 0 }); ctx.done(tries <= 1);
    } else {
      tries++;
      if (tries >= 3) { locked = true; paint(); g.fillStyle = 'rgba(111,224,184,0.55)'; if (q.mode === 'text') drawTextShape(g, 'fill'); await ctx.react('reveal'); ctx.done(false); }
      else { clear(); ctx.react('wrong', { say: PHRASES.traceTry }); }
    }
  };
  paint();
  if (q.mode === 'text' && document.fonts && document.fonts.load) {
    document.fonts.load(TRACE_FONT(40), q.text).then(() => { layoutFont(); buildMask(); paint(); }).catch(() => {});
  }
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
