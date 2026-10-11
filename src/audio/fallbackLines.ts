import type { Situation } from '../data/characters';

/** Generic Indonesian lines spoken by the browser voice when no recorded clip is available. */
export const FALLBACK_LINES: Record<Situation, string[]> = {
  sapa: ['Halo sahabat belajar! Yuk kita belajar bersama!'],
  benar: [
    'Wah, jawabanmu benar sekali! Hebat!',
    'Horeee! Pintar sekali kamu!',
    'Luar biasa! Jawabanmu tepat sekali!'
  ],
  salah: ['Hampir tepat nih! Coba kita perhatikan penjelasannya bersama ya! Tetap semangat, kamu pasti bisa!'],
  petunjuk: ['Tenang, baca pelan-pelan dulu ya. Kamu pasti bisa!'],
  semangat: ['Horeee! Kuis selesai dengan gemilang! Bintang juaramu bertambah banyak sekali! Selamat ya, kamu hebat!'],
  bintang: ['Wah, kamu dapat bintang! Hebat sekali!']
};
