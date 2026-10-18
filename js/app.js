/* Aplikasi: layar, sesi belajar, penyimpanan progres, lencana. */

const SAVE_KEY = 'kawan-belajar-v1';
const defaults = () => ({ stars: 0, sessions: 0, level: 'tka', tiers: {}, best: {}, played: {}, badges: {}, streak: { last: '', count: 0 }, sound: true, weak: {}, perfect: 0 });
function loadState() {
  try { const j = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (j) return Object.assign(defaults(), j); } catch (e) { /* abaikan */ }
  return defaults();
}
let S = loadState();
const save = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* abaikan */ } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BADGES = [
  { id: 'first', name: 'Bintang Pertama', desc: 'Selesaikan 1 sesi belajar', test: (s) => s.sessions >= 1, color: '#FFD95A' },
  { id: 'ten', name: 'Rajin Belajar', desc: 'Selesaikan 10 sesi', test: (s) => s.sessions >= 10, color: '#7CC8FF' },
  { id: 'stars25', name: 'Kolektor Bintang', desc: 'Kumpulkan 25 bintang', test: (s) => s.stars >= 25, color: '#FF8FB8' },
  { id: 'stars100', name: 'Raja Bintang', desc: 'Kumpulkan 100 bintang', test: (s) => s.stars >= 100, color: '#B79CFF' },
  { id: 'perfect', name: 'Sempurna', desc: 'Jawab semua benar dalam satu sesi', test: (s) => s.perfect >= 1, color: '#6FE0B8' },
  { id: 'explorer', name: 'Penjelajah', desc: 'Coba 5 pelajaran berbeda', test: (s) => Object.keys(s.played).length >= 5, color: '#FFB067' },
  { id: 'streak3', name: 'Tiga Hari Berturut', desc: 'Belajar 3 hari berturut-turut', test: (s) => s.streak.count >= 3, color: '#FF8F8F' }
];

const app = () => document.getElementById('app');
const lvl = (id) => LEVELS.find((l) => l.id === id);

function topbar(o) {
  return `<header class="topbar">${o.back ? `<button class="round" data-act="${o.back}" aria-label="Kembali">${icon('back', 28)}</button>` : '<span class="sp"></span>'}
  <div class="tb-mid">${o.mid || ''}</div>
  <div class="tb-right"><div class="chip">${starSVG(26)}<b>${S.stars}</b></div><button class="round" data-act="toggleSound" aria-label="Suara">${icon(S.sound ? 'sound' : 'soundoff', 26)}</button></div></header>`;
}
function bubble(text, id) { return `<div class="bubble" ${id ? `id="${id}"` : ''}>${text}</div>`; }

let ABACUS_CTL = null;

function screenAbacusLearn(initialStep = 0) {
  if (SES && SES.ctl) SES.ctl.destroy();
  if (SES && SES.timer) clearTimeout(SES.timer);
  SES = null;
  if (ABACUS_CTL && ABACUS_CTL.destroy) ABACUS_CTL.destroy();
  A.stop();
  A.setVoice('bintang');
  app().className = 'abacus-learn';
  ABACUS_CTL = mountAbacusLearn(app(), initialStep, () => {
    if (ABACUS_CTL && ABACUS_CTL.destroy) ABACUS_CTL.destroy();
    ABACUS_CTL = null;
    A.stop();
    screenHome();
  });
}

/* ===== Progressive Web App (PWA) & Instalasi Android ===== */
let deferredInstallPrompt = null;
let isAppInstalled = (typeof window !== 'undefined' && (
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true
)) || false;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    updateInstallUI();
  });

  window.addEventListener('appinstalled', () => {
    isAppInstalled = true;
    deferredInstallPrompt = null;
    updateInstallUI();
  });
}

function renderInstallBtn() {
  if (isAppInstalled) {
    return `<button class="install-btn installed" aria-label="Aplikasi Sudah Terpasang di Perangkat">${icon('android', 26)} <span>Terpasang ✓</span></button>`;
  }
  return `<button class="install-btn" data-act="promptInstall" aria-label="Pasang Aplikasi ke Perangkat Android">${icon('android', 26)} <span>Pasang di HP</span></button>`;
}

function updateInstallUI() {
  const btn = document.querySelector('.install-btn');
  if (btn) {
    if (isAppInstalled) {
      btn.className = 'install-btn installed';
      btn.innerHTML = `${icon('android', 26)} <span>Terpasang ✓</span>`;
      btn.removeAttribute('data-act');
    } else {
      btn.className = 'install-btn';
      btn.innerHTML = `${icon('android', 26)} <span>Pasang di HP</span>`;
      btn.setAttribute('data-act', 'promptInstall');
    }
  }
}

function showInstallModal() {
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  const existing = document.getElementById('pwa-install-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'pwa-install-modal';
  modal.className = 'pwa-modal-overlay';
  modal.innerHTML = `
    <div class="pwa-modal" role="dialog" aria-modal="true" aria-labelledby="pwa-title">
      <div class="pwa-modal-head">
        <h2 class="pwa-modal-title" id="pwa-title">${icon('android', 32)} Pasang Aplikasi</h2>
        <button class="round sm" id="pwa-close-btn" aria-label="Tutup">✕</button>
      </div>
      <div class="pwa-modal-body">
        <p style="margin:0; font-size:1.05rem; line-height:1.4;">
          Pasang <b>Kawan Belajar</b> di layar HP atau Tablet Android Anda agar bisa dimainkan langsung satu ketukan dan tetap aktif saat offline!
        </p>
        ${deferredInstallPrompt ? `
          <button class="btn go" id="pwa-direct-install-btn" style="font-size:1.25rem; display:flex; align-items:center; justify-content:center; gap:0.6rem; width:100%; padding:0.65rem 1rem;">
            ${icon('install', 28)} Pasang Sekarang
          </button>
          <div style="font-size:0.88rem; opacity:0.8; margin:-0.2rem 0 0.2rem;">atau pasang secara manual:</div>
        ` : ''}
        ${isIOS ? `
          <div class="pwa-steps">
            <div class="pwa-step-item">
              <span class="pwa-step-num">1</span>
              <div>Buka tautan game ini di browser <b>Safari</b>.</div>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">2</span>
              <div>Tekan tombol <b>Bagikan (Share)</b> di bilah bawah Safari (ikon kotak dengan panah ke atas).</div>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">3</span>
              <div>Gulir ke bawah dan pilih <b>Tambahkan ke Layar Utama</b> (<i>Add to Home Screen</i>).</div>
            </div>
          </div>
        ` : `
          <div class="pwa-steps">
            <div class="pwa-step-item">
              <span class="pwa-step-num">1</span>
              <div>Buka di browser <b>Google Chrome</b> di perangkat Android Anda.</div>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">2</span>
              <div>Tekan tombol menu <b>titik tiga (⋮)</b> di pojok kanan atas browser.</div>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">3</span>
              <div>Pilih menu <b>"Instal aplikasi"</b> atau <b>"Tambahkan ke Layar Utama"</b> (<i>Add to Home screen</i>).</div>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-num">4</span>
              <div>Tekan <b>Instal</b>. Ikon Kawan Belajar akan otomatis terpasang di menu utama HP!</div>
            </div>
          </div>
        `}
      </div>
      <button class="btn alt" id="pwa-close-btn-bottom" style="font-size:1.15rem; width:100%;">Tutup</button>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => { modal.remove(); };
  const c1 = modal.querySelector('#pwa-close-btn');
  const c2 = modal.querySelector('#pwa-close-btn-bottom');
  if (c1) c1.onclick = close;
  if (c2) c2.onclick = close;
  modal.onclick = (e) => { if (e.target === modal) close(); };

  const directBtn = modal.querySelector('#pwa-direct-install-btn');
  if (directBtn && deferredInstallPrompt) {
    directBtn.onclick = async () => {
      close();
      try {
        await deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          isAppInstalled = true;
          deferredInstallPrompt = null;
          updateInstallUI();
        }
      } catch (err) {
        console.warn('Install error:', err);
      }
    };
  }
}

function initConnectivity() {
  if (typeof window === 'undefined') return;
  const updateStatus = () => {
    const existing = document.getElementById('offline-banner');
    if (!navigator.onLine) {
      if (!existing) {
        const ban = document.createElement('div');
        ban.id = 'offline-banner';
        ban.className = 'offline-banner';
        ban.innerHTML = `<span class="offline-dot"></span> Mode Offline: Tetap bisa belajar tanpa kuota!`;
        document.body.appendChild(ban);
      }
    } else if (existing) {
      existing.remove();
    }
  };
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

/* ---------- Layar depan ---------- */
function screenHome() {
  if (ABACUS_CTL && ABACUS_CTL.destroy) {
    ABACUS_CTL.destroy();
    ABACUS_CTL = null;
  }
  A.setVoice('awan');
  app().className = 'home';
  app().innerHTML = `${topbar({})}
  <main class="center">
    <h1 class="logo">Kawan Belajar</h1>
    <div class="cast"><div class="bob b1">${charSVG('awan', 'normal', 150)}</div><div class="bob b2">${charSVG('bintang', 'happy', 170)}</div><div class="bob b3">${charSVG('bulan', 'normal', 150)}</div></div>
    ${bubble('Halo! Ayo kita belajar sambil bermain.')}
    <div class="home-btns">
      <button class="btn big go" data-act="goLevels">Main</button>
      <button class="btn big abacus-btn" data-act="goAbacusLearn">${icon('abacus', 38)} Belajar Sempoa</button>
    </div>
    <div class="row">
      <button class="btn alt" data-act="goBadges">Lencana</button>
      ${renderInstallBtn()}
    </div>
    <p class="note" id="audio-note" hidden></p>
  </main>`;
  A.detect().then((ok) => {
    const n = $('#audio-note'); if (!n) return;
    n.hidden = ok;
    n.textContent = A.systemOK()
      ? 'Sementara memakai suara sistem perangkat. Untuk suara tiap karakter yang lebih natural, buat rekaman satu kali (lihat BACA-SAYA.txt).'
      : 'Suara belum terpasang dan perangkat ini tidak punya suara sistem. Buat rekaman satu kali (lihat BACA-SAYA.txt) agar karakter bisa berbicara.';
  });
}

/* ---------- Pilih kelas ---------- */
function screenLevels() {
  A.setVoice('awan'); /* yang tampil: Awan */
  app().className = 'levels';
  app().innerHTML = `${topbar({ back: 'goHome' })}
  <main class="center">
    <div class="host-row">${charSVG('awan', 'normal', 120)}${bubble('Halo! Kamu kelas berapa?')}</div>
    <div class="grid3">${LEVELS.map((l) => `<button class="lvl ${S.level === l.id ? 'sel' : ''}" data-act="pickLevel" data-id="${l.id}" style="--c:${l.color}"><span class="badge">${l.short}</span><span class="lt"><b>${l.name}</b><i>${l.age}</i></span></button>`).join('')}</div>
  </main>`;
  A.say([PHRASES.chooseLevel]);
}

/* ---------- Pilih pelajaran ---------- */
function screenSubjects() {
  const L = lvl(S.level);
  A.setVoice('bulan'); /* yang tampil: Bulan */
  app().className = 'subjects';
  app().innerHTML = `${topbar({ back: 'goLevels', mid: `<span class="pill" style="background:${L.color}">${L.name}</span>` })}
  <main class="center">
    <div class="host-row">${charSVG('bulan', 'normal', 110)}${bubble('Mau belajar apa hari ini?')}</div>
    <div class="grid4">${AVAIL[L.id].map((id) => { const sj = SUBJECTS[id], b = S.best[L.id + '.' + id] || 0;
      return `<button class="subj" data-act="startSession" data-s="${id}" style="--c:${sj.color}">${icon(sj.icon, 64)}<b>${sj.name}</b><span class="stars3">${[1, 2, 3].map((n) => starSVG(22, n <= b ? '#FFD95A' : '#ffffff')).join('')}</span></button>`; }).join('')}</div>
  </main>`;
  A.say([PHRASES.chooseSubject]);
}

/* ---------- Lencana ---------- */
function screenBadges() {
  app().className = 'badges';
  app().innerHTML = `${topbar({ back: 'goHome' })}<main class="center"><h2>Lencana</h2><div class="grid4">${BADGES.map((b) => {
    const got = !!S.badges[b.id];
    return `<div class="bdg ${got ? 'got' : ''}" style="--c:${b.color}">${icon(got ? 'medal' : 'lock', 64)}<b>${b.name}</b><i>${b.desc}</i></div>`; }).join('')}</div>
    <p class="note">Total bintang: ${S.stars}. Sesi belajar: ${S.sessions}. Hari beruntun: ${S.streak.count}.</p></main>`;
}

/* ---------- Sesi belajar ---------- */
let SES = null;

function startSession(subjId) {
  const L = lvl(S.level), subj = SUBJECTS[subjId], key = L.id + '.' + subjId;
  SES = { L, subj, key, n: L.n, tier: S.tiers[key] || 1, asked: 0, correct: 0, fast: 0, okStreak: 0, badStreak: 0, recent: [], retries: [], weakQ: (S.weak[key] || []).slice(0, 2),
    lastGen: -1, newWeak: [], cur: null, ctl: null, t0: 0, timer: null, mood: 'normal' };
  S.weak[key] = [];
  A.ac();
  A.setVoice(subj.guide);
  renderSessionShell();
  say(subj.intro, 'happy');
  setTimeout(nextQ, 1100);
}

function renderSessionShell() {
  const g = SES.subj.guide;
  app().className = 'session';
  app().innerHTML = `<header class="topbar"><button class="round" data-act="exitSession" aria-label="Keluar">${icon('back', 28)}</button>
  <div class="progress" aria-label="Kemajuan"></div>
  <div class="tb-right"><div class="chip">${starSVG(26)}<b id="tstars">${S.stars}</b></div><button class="round" data-act="toggleSound" aria-label="Suara">${icon(S.sound ? 'sound' : 'soundoff', 26)}</button></div></header>
  <div class="timerbar" hidden><i></i></div>
  <main class="s-body">
    <aside class="s-char"><div class="bubble" id="sbub">&nbsp;</div><div class="char-slot" id="cslot">${charSVG(g, 'normal', 200)}</div></aside>
    <section class="s-card"><div class="s-promptrow"><button class="round sm" data-act="speak" id="spk" aria-label="Dengarkan lagi">${icon('sound', 28)}</button><h2 class="s-prompt" id="sprompt"></h2></div><div class="s-host" id="shost"></div></section>
  </main>`;
  paintProgress();
}
function paintProgress() {
  const p = $('.progress');
  if (!p) return;
  p.innerHTML = Array.from({ length: SES.n }, (_, i) => starSVG(24, i < SES.asked ? '#FFD95A' : '#ffffff', i === SES.asked ? 'cur' : '')).join('');
}
function setMood(mood, text, anim) {
  const slot = $('#cslot'); if (!slot) return;
  SES.mood = mood;
  slot.innerHTML = charSVG(SES.subj.guide, mood, 200);
  slot.classList.remove('jump', 'wob'); void slot.offsetWidth;
  if (anim) slot.classList.add(anim);
  const b = $('#sbub'); if (b && text !== undefined) b.textContent = text;
}
function say(text, mood) { setMood(mood || 'normal', text); A.say([text]); }

function nextQ() {
  if (!SES) return;
  if (SES.asked >= SES.n) return finishSession();
  let q;
  const due = SES.retries.findIndex((r) => r.at <= SES.asked);
  if (due >= 0) { q = SES.retries.splice(due, 1)[0].q; q._retry = true; }
  else if (SES.weakQ.length) { q = SES.weakQ.shift(); q._weak = true; }
  else { q = Gen.next(SES.L.id, SES.subj.id, SES.tier, SES.recent, SES.lastGen); SES.lastGen = q.gen; }
  SES.cur = q; SES.recent.push(q.key); if (SES.recent.length > 6) SES.recent.shift();
  paintQuestion(q);
}

function paintQuestion(q) {
  paintProgress();
  const pr = $('#sprompt'), host = $('#shost'), spk = $('#spk');
  const showPrompt = !(q.visual && q.visual.includes(q.prompt));
  pr.textContent = showPrompt ? q.prompt : '';
  pr.hidden = !showPrompt;
  spk.hidden = !q.say || q.noSpeak;
  setMood('normal', q._retry ? 'Coba lagi yang tadi ya.' : 'Ayo!');
  if (SES.ctl) SES.ctl.destroy();
  const tb = $('.timerbar');
  clearTimeout(SES.timer);
  if (q.timed) {
    tb.hidden = false; const bar = $('i', tb); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = `shrink ${q.timed}s linear forwards`; tb.classList.remove('late');
    SES.timer = setTimeout(() => { tb.classList.add('late'); setMood(SES.mood, 'Ayo sedikit lebih cepat!'); }, q.timed * 1000);
  } else tb.hidden = true;
  host.innerHTML = '';
  SES.ctl = Q.mount(q, host, ctx);
  SES.t0 = Date.now();
  if (q.say && !q.noSpeak) setTimeout(() => { if (SES && SES.cur === q) A.say(q.say); }, 350);
}

const ctx = {
  async react(kind, opts) {
    const q = SES.cur; opts = opts || {};
    let msg, mood, parts, anim = 'wob';
    if (kind === 'right') { A.sfx('ok'); mood = 'happy'; anim = 'jump'; msg = pick(PHRASES.praise); parts = [msg]; if (q.sayAnswer && !q.timed) parts = parts.concat(q.sayAnswer); burst(14); }
    else if (kind === 'wrong') { A.sfx('no'); mood = 'oops'; msg = opts.say || pick(PHRASES.retry); parts = [msg]; }
    else { A.sfx('no'); mood = 'think'; if (q.sayAnswer) { msg = 'Jawabannya begini.'; parts = [PHRASES.reveal].concat(q.sayAnswer); } else { msg = PHRASES.gentle; parts = [msg]; } }
    setMood(mood, msg, anim);
    await Promise.all([A.say(parts), sleep(kind === 'wrong' ? 600 : 1100)]);
  },
  done(ok) { finishQ(ok); }
};

function finishQ(ok) {
  const q = SES.cur; if (!q) return;
  clearTimeout(SES.timer);
  const elapsed = Date.now() - SES.t0;
  if (!q._retry) {
    SES.asked++;
    if (ok) { SES.correct++; if (q.timed && elapsed <= q.timed * 1000) SES.fast++; }
    if (ok) { SES.okStreak++; SES.badStreak = 0; if (SES.okStreak >= 3 && SES.tier < 3) { SES.tier++; SES.okStreak = 0; } }
    else { SES.badStreak++; SES.okStreak = 0; if (SES.badStreak >= 2 && SES.tier > 1) { SES.tier--; SES.badStreak = 0; } }
  }
  if (!ok) {
    if (q._retry || q._weak) { if (SES.newWeak.length < 3) { const c = JSON.parse(JSON.stringify(q)); delete c._retry; delete c._weak; SES.newWeak.push(c); } }
    else if (SES.retries.length < 2) { const c = JSON.parse(JSON.stringify(q)); SES.retries.push({ q: c, at: SES.asked + 2 }); }
  }
  SES.cur = null;
  paintProgress();
  setTimeout(() => { if (SES && SES.ctl) { SES.ctl.destroy(); SES.ctl = null; } nextQ(); }, 250);
}

function todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function yesterdayStr() { const d = new Date(Date.now() - 86400000); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

function finishSession() {
  const { L, subj, key } = SES;
  const acc = SES.correct / SES.n;
  let stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
  if (subj.id === 'cepat' && stars === 3 && SES.fast / SES.n < 0.5) stars = 2;
  S.stars += stars; S.sessions++; S.tiers[key] = SES.tier; S.best[key] = Math.max(S.best[key] || 0, stars); S.played[subj.id] = 1;
  if (acc === 1) S.perfect++;
  S.weak[key] = SES.newWeak;
  const t = todayStr();
  if (S.streak.last !== t) { S.streak.count = S.streak.last === yesterdayStr() ? S.streak.count + 1 : 1; S.streak.last = t; }
  const fresh = BADGES.filter((b) => !S.badges[b.id] && b.test(S));
  fresh.forEach((b) => { S.badges[b.id] = 1; });
  save();
  const total = SES.n, right = SES.correct, g = subj.guide;
  if (SES.ctl) { SES.ctl.destroy(); SES.ctl = null; }
  SES = null;
  app().className = 'result';
  app().innerHTML = `${topbar({})}<main class="center">
    <div class="res-stars">${[1, 2, 3].map((n) => starSVG(96, n <= stars ? '#FFD95A' : '#ffffff', n <= stars ? 'pop' : '')).join('')}</div>
    <div class="cast one"><div class="bob b2" id="rchar">${charSVG(g, 'happy', 200)}</div></div>
    ${bubble(`Kamu mendapat ${stars} bintang! Benar ${right} dari ${total}.`)}
    ${fresh.length ? `<div class="newbadge">${fresh.map((b) => `<span class="pill" style="background:${b.color}">${icon('medal', 26)} ${b.name}</span>`).join(' ')}</div>` : ''}
    <div class="row"><button class="btn big go" data-act="again" data-s="${subj.id}">Main lagi</button><button class="btn alt" data-act="goSubjects">Pilih pelajaran</button></div>
  </main>`;
  A.sfx(stars === 3 ? 'win' : 'star'); burst(stars === 3 ? 60 : 30);
  A.say([stars === 3 ? PHRASES.done3 : stars === 2 ? PHRASES.done2 : PHRASES.done1]);
}

/* ---------- Efek bintang berhamburan ---------- */
let fxRunning = false;
function burst(n) {
  const cv = $('#fx'); if (!cv) return;
  const W = cv.width = window.innerWidth, H = cv.height = window.innerHeight, g = cv.getContext('2d');
  const cols = ['#FFD95A', '#FF8FB8', '#7CC8FF', '#6FE0B8', '#B79CFF', '#FFB067'];
  const ps = Array.from({ length: n }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.45, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4, r: 8 + Math.random() * 10, c: cols[(Math.random() * cols.length) | 0], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, life: 0 }));
  if (fxRunning) return;
  fxRunning = true;
  (function step() {
    g.clearRect(0, 0, W, H);
    let alive = 0;
    ps.forEach((p) => {
      p.life++; p.vy += 0.5; p.x += p.vx; p.y += p.vy; p.a += p.va;
      if (p.y < H + 30 && p.life < 110) {
        alive++; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.strokeStyle = INK; g.lineWidth = 2; g.globalAlpha = Math.max(0, 1 - p.life / 110);
        g.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? p.r * 0.45 : p.r, a = Math.PI * i / 5 - Math.PI / 2; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
        g.closePath(); g.fill(); g.stroke(); g.restore();
      }
    });
    if (alive) requestAnimationFrame(step); else { g.clearRect(0, 0, W, H); fxRunning = false; }
  })();
}

/* ---------- Aksi ---------- */
const ACT = {
  goHome: () => { A.stop(); screenHome(); },
  goLevels: () => { A.ac(); screenLevels(); },
  goAbacusLearn: () => { A.ac(); A.stop(); screenAbacusLearn(); },
  goSubjects: () => screenSubjects(),
  goBadges: () => screenBadges(),
  pickLevel: (el) => { S.level = el.dataset.id; save(); A.sfx('tap'); screenSubjects(); },
  startSession: (el) => startSession(el.dataset.s),
  again: (el) => startSession(el.dataset.s),
  exitSession: () => { if (SES && SES.ctl) SES.ctl.destroy(); clearTimeout(SES && SES.timer); SES = null; A.stop(); screenSubjects(); },
  speak: () => { if (SES && SES.cur && SES.cur.say) A.say(SES.cur.say); },
  toggleSound: () => { S.sound = !S.sound; A.setSound(S.sound); save(); const r = $('[data-act="toggleSound"]'); $$('[data-act="toggleSound"]').forEach((b) => { b.innerHTML = icon(S.sound ? 'sound' : 'soundoff', 26); }); },
  promptInstall: async () => {
    if (isAppInstalled) return;
    if (deferredInstallPrompt) {
      try {
        await deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          isAppInstalled = true;
          deferredInstallPrompt = null;
          updateInstallUI();
          return;
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
    showInstallModal();
  }
};
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (el && ACT[el.dataset.act]) { A.sfx('tap'); ACT[el.dataset.act](el, e); }
});

function boot() {
  try {
    A.setSound(S.sound);
  } catch (e) {
    console.warn('Audio setup error:', e);
  }
  try {
    screenHome();
  } catch (e) {
    console.error('Boot render error:', e);
    const root = document.getElementById('app');
    if (root && !root.innerHTML) {
      root.innerHTML = '<main class="center" style="padding:2rem;text-align:center;"><h1>Kawan Belajar</h1><button class="btn big go" onclick="location.reload()">Buka Aplikasi</button></main>';
    }
  }
  try {
    initConnectivity();
  } catch (e) {}
  try {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '0.0.0.0' || location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => console.log('Service Worker registered:', reg.scope))
        .catch((err) => console.warn('Service Worker registration failed:', err));
    }
  } catch (e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
