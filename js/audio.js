/* Suara: memutar rekaman (mp3) per potongan kalimat + efek bunyi sederhana.
   Rekaman diutamakan. Selama rekaman belum ada, game memakai suara sistem perangkat (speechSynthesis) dengan
   nada, tempo, dan jenis suara yang berbeda untuk tiap karakter. Tanpa keduanya, game tetap jalan dalam mode senyap. */

function fnv1a(str) {
  const bytes = (typeof TextEncoder !== 'undefined') ? new TextEncoder().encode(str) : Array.from(unescape(encodeURIComponent(str))).map((c) => c.charCodeAt(0));
  let h = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i++) { h ^= bytes[i]; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}
const clipOf = (p) => (typeof p === 'string' ? { l: 'id', t: p } : p);
/* Tiap karakter punya suara sendiri: rekaman ada di audio/<karakter>/. Awan juga menjadi suara bawaan. */
const VOICES = ['awan', 'bintang', 'bulan'];
const DEFAULT_VOICE = 'awan';
const clipFile = (p, voice) => { const c = clipOf(p); const v = VOICES.includes(voice) ? voice : DEFAULT_VOICE; return `audio/${v}/${c.l}_${fnv1a(c.t)}.mp3`; };

/* Suara sistem: dipakai bila rekaman belum ada. Karakter dibedakan lewat nada, tempo, dan pria/wanita. */
const SYSTEM_VOICES = {
  awan:    { gender: 'f', pitch: 1.2,  rate: 0.9 },
  bintang: { gender: 'f', pitch: 1.45, rate: 1.0 },
  bulan:   { gender: 'm', pitch: 1.0,  rate: 0.92 }
};
const MALE_NAME = /\b(ardi|andika|david|guy|mark|george|ryan|james|daniel|brian|male|pria|laki)\b/i;
const FEMALE_NAME = /\b(gadis|siti|damayanti|jenny|aria|zira|samantha|ana|hazel|susan|female|wanita|perempuan)\b/i;
/* Pilih suara sistem untuk bahasa ('id'/'en') dan jenis kelamin ('f'/'m'): yang alami/online dan cocok jenis kelaminnya didahulukan. */
function pickSystemVoice(lang, gender) {
  let list = [];
  try { list = Array.from(speechSynthesis.getVoices() || []); } catch (e) { return null; }
  const want = lang === 'en' ? /^en([-_]|$)/i : /^id([-_]|$)/i;
  let best = null, bestScore = -Infinity;
  for (const v of list) {
    if (!want.test(v.lang || '')) continue;
    const n = v.name || '';
    let s = 0;
    if (/natural|online/i.test(n)) s += 40;
    if (/google/i.test(n)) s += 15;
    if (lang === 'en' && /^en[-_]us/i.test(v.lang)) s += 10;
    const male = MALE_NAME.test(n), female = FEMALE_NAME.test(n);
    if ((gender === 'm' && male) || (gender === 'f' && female)) s += 30;
    else if ((gender === 'm' && female) || (gender === 'f' && male)) s -= 30;
    if (s > bestScore) { best = v; bestScore = s; }
  }
  return best;
}
/* Gabungkan potongan berurutan yang berbahasa sama menjadi satu ucapan agar suara sistem terdengar mengalir */
function mergeParts(parts) {
  const out = [];
  for (const p of parts) {
    const c = clipOf(p);
    if (!c || !c.t) continue;
    const last = out[out.length - 1];
    if (last && last.l === c.l) last.t += ' ' + c.t; else out.push({ l: c.l, t: c.t });
  }
  return out;
}

const A = {
  voice: DEFAULT_VOICE, voiceOn: true, sfxOn: true, token: 0, current: null, missing: 0, played: 0, spoken: 0, probe: null,
  mode: 'clips', /* 'clips' = rekaman dulu; 'system' = langsung suara sistem (dipilih A.detect bila rekaman belum ada) */
  ctx: null,

  /* Pilih suara karakter yang sedang tampil di layar */
  setVoice(v) { A.voice = VOICES.includes(v) ? v : DEFAULT_VOICE; },
  setSound(on) { A.voiceOn = on; A.sfxOn = on; if (!on) A.stop(); },
  stop() {
    A.token++;
    if (A.current) { try { A.current.pause(); } catch (e) {} A.current = null; }
    try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); } catch (e) { /* abaikan */ }
  },

  /* Apakah perangkat punya suara sistem yang bisa dipakai */
  systemOK() {
    try { return typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined' && speechSynthesis.getVoices().length > 0; } catch (e) { return false; }
  },
  speakSystem(p) {
    return new Promise((resolve) => {
      if (!A.systemOK()) { resolve(false); return; }
      const c = clipOf(p), prof = SYSTEM_VOICES[A.voice] || SYSTEM_VOICES[DEFAULT_VOICE];
      const u = new SpeechSynthesisUtterance(c.t);
      u.lang = c.l === 'en' ? 'en-US' : 'id-ID';
      const v = pickSystemVoice(c.l, prof.gender); if (v) u.voice = v;
      u.pitch = prof.pitch; u.rate = prof.rate;
      let done = false;
      const end = (ok) => { if (done) return; done = true; if (ok) A.spoken++; resolve(ok); };
      u.onend = () => end(true);
      u.onerror = () => end(false);
      speechSynthesis.speak(u);
      setTimeout(() => end(false), Math.max(6000, c.t.length * 180)); /* jaga-jaga bila peramban tak mengabari selesai */
    });
  },

  /* Satu klip: rekaman dulu; jika tidak ada, suara sistem untuk klip itu */
  playClip(p, token) {
    if (A.mode === 'system') return A.speakSystem(p);
    return A.tryClip(p, token).then((ok) => (ok ? true : A.speakSystem(p)));
  },
  tryClip(p, token) {
    return new Promise((resolve) => {
      try {
        if (typeof Audio === 'undefined') return resolve(false);
        const a = new Audio(clipFile(p, A.voice));
        A.current = a;
        let done = false;
        const end = (ok) => { if (done) return; done = true; if (ok) A.played++; else A.missing++; resolve(ok); };
        a.onended = () => end(true);
        a.onerror = () => end(false);
        a.play().catch(() => end(false));
        setTimeout(() => { if (!done && token !== A.token) end(false); }, 20000);
      } catch (e) {
        resolve(false);
      }
    });
  },
  /* Ucapkan urutan potongan suara. parts: array string (Indonesia) atau {l:'en',t:'...'} */
  async say(parts) {
    if (!A.voiceOn || !parts || !parts.length) return;
    A.stop();
    const my = ++A.token;
    const list = A.mode === 'system' ? mergeParts(parts) : parts;
    for (const p of list) {
      if (my !== A.token) return;
      if (!(typeof p === 'string' ? p : p.t)) continue;
      await A.playClip(p, my);
      if (my !== A.token) return;
      await new Promise((r) => setTimeout(r, 90));
    }
  },
  /* Tentukan mode: rekaman ada (clips) atau belum (system). Dipanggil di layar depan. */
  detect() { return A.check().then((ok) => { A.mode = ok ? 'clips' : 'system'; return ok; }); },
  /* Cek apakah file suara tersedia (untuk pesan di layar depan) */
  check() {
    return new Promise((resolve) => {
      try {
        if (typeof Audio === 'undefined') return resolve(false);
        const a = new Audio(clipFile(PHRASES.welcome, DEFAULT_VOICE));
        a.onerror = () => resolve(false);
        a.oncanplaythrough = () => resolve(true);
        a.preload = 'auto';
        setTimeout(() => resolve(false), 2500);
      } catch (e) {
        resolve(false);
      }
    });
  },

  /* ===== Efek bunyi (disintesis, lembut) ===== */
  ac() {
    if (!A.ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) A.ctx = new C(); }
    if (A.ctx && A.ctx.state === 'suspended') A.ctx.resume();
    return A.ctx;
  },
  tone(freq, start, dur, type = 'sine', vol = 0.16) {
    const c = A.ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + start;
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.05);
  },
  sfx(name) {
    if (!A.sfxOn) return;
    try {
      if (name === 'tap') A.tone(520, 0, 0.08, 'triangle', 0.1);
      else if (name === 'bead') A.tone(300, 0, 0.07, 'square', 0.05);
      else if (name === 'ok') { A.tone(660, 0, 0.14, 'sine'); A.tone(880, 0.1, 0.22, 'sine'); A.tone(1175, 0.2, 0.3, 'sine', 0.12); }
      else if (name === 'no') { A.tone(300, 0, 0.18, 'sine', 0.12); A.tone(250, 0.12, 0.22, 'sine', 0.1); }
      else if (name === 'star') { [784, 988, 1175, 1568].forEach((f, i) => A.tone(f, i * 0.09, 0.25, 'sine', 0.12)); }
      else if (name === 'win') { [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => A.tone(f, i * 0.12, 0.3, 'triangle', 0.13)); }
    } catch (e) { /* abaikan */ }
  }
};

/* Memancing peramban memuat daftar suara sistem lebih awal */
try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.getVoices(); } catch (e) { /* abaikan */ }
