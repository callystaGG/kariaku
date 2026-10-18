/* Suara: memutar rekaman manusia (mp3) per potongan kalimat + efek bunyi sederhana.
   Tidak memakai suara robot bawaan browser. Jika file suara belum ada, game tetap jalan dalam mode senyap. */

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

const A = {
  voice: DEFAULT_VOICE, voiceOn: true, sfxOn: true, token: 0, current: null, missing: 0, played: 0, probe: null,
  ctx: null,

  /* Pilih suara karakter yang sedang tampil di layar */
  setVoice(v) { A.voice = VOICES.includes(v) ? v : DEFAULT_VOICE; },
  setSound(on) { A.voiceOn = on; A.sfxOn = on; if (!on) A.stop(); },
  stop() { A.token++; if (A.current) { try { A.current.pause(); } catch (e) {} A.current = null; } },

  playClip(p, token) {
    return new Promise((resolve) => {
      const a = new Audio(clipFile(p, A.voice));
      A.current = a;
      let done = false;
      const end = (ok) => { if (done) return; done = true; if (ok) A.played++; else A.missing++; resolve(ok); };
      a.onended = () => end(true);
      a.onerror = () => end(false);
      a.play().catch(() => end(false));
      setTimeout(() => { if (!done && token !== A.token) end(false); }, 20000);
    });
  },
  /* Ucapkan urutan potongan suara. parts: array string (Indonesia) atau {l:'en',t:'...'} */
  async say(parts) {
    if (!A.voiceOn || !parts || !parts.length) return;
    A.stop();
    const my = ++A.token;
    for (const p of parts) {
      if (my !== A.token) return;
      if (!(typeof p === 'string' ? p : p.t)) continue;
      await A.playClip(p, my);
      if (my !== A.token) return;
      await new Promise((r) => setTimeout(r, 90));
    }
  },
  /* Cek apakah file suara tersedia (untuk pesan di layar depan) */
  check() {
    return new Promise((resolve) => {
      const a = new Audio(clipFile(PHRASES.welcome, DEFAULT_VOICE));
      a.onerror = () => resolve(false);
      a.oncanplaythrough = () => resolve(true);
      a.preload = 'auto';
      setTimeout(() => resolve(false), 2500);
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
