import { AvatarItem } from '../types';

export type CharacterId = 'leo' | 'ciko' | 'owi' | 'mimi' | 'dino' | 'kids';
export type VoiceId = 'leo' | 'ciko' | 'owi' | 'mimi' | 'dino' | 'budi' | 'callysta';
export type Situation = 'sapa' | 'benar' | 'salah' | 'petunjuk' | 'semangat' | 'bintang';

export interface CharacterVoice {
  id: VoiceId;
  label: string;
  /** Browser speech settings used only when no recorded clip is available. */
  fallback: { pitch: number; rate: number };
}

export interface Character extends AvatarItem {
  id: CharacterId;
  age: number;
  role: string;
  subject: string;
  personality: string;
  greeting: string;
  soundEffect: 'lion' | 'bunny' | 'owl' | 'panda' | 'dino' | 'kids';
  voices: CharacterVoice[];
  badge: string;
  voiceStyle: string;
  soundEffectName: string;
  color: string;
  border: string;
  bgGrad: string;
  favoriteFood: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 'leo',
    name: 'Leo si Singa Juara',
    emoji: '🦁',
    bgGradient: 'from-amber-500 to-red-500',
    accentColor: '#ea580c',
    description: 'Leo anak yang pemberani dan ceria, sangat menyukai tantangan berhitung dan selalu menyemangati teman-temannya.',
    age: 8,
    role: 'Sahabat Cilik 8 Tahun (Pemberani & Ceria)',
    subject: 'Matematika & Logika Berhitung',
    personality: 'Pemberani, optimis, dan selalu riang gembira.',
    greeting: 'Rawrrr! Keren sekali! Halo kawan-kawan! Aku Leo si Singa Juara. Belajar berhitung dan matematika itu seru dan mudah sekali kalau kita belajar bersama. Yuk, kita mulai petualangan berhitung sekarang!',
    soundEffect: 'lion',
    voices: [{ id: 'leo', label: 'Leo', fallback: { pitch: 1.28, rate: 1.02 } }],
    badge: '👑 Raja Berhitung',
    voiceStyle: 'Suara Ceria & Bersemangat (Pemberani & Optimis)',
    soundEffectName: 'Auman Singa Lucu 🎺',
    color: 'text-amber-700',
    border: 'border-amber-300 hover:border-amber-500',
    bgGrad: 'from-amber-100 via-orange-50 to-amber-50',
    favoriteFood: 'Buah Mangga Manis 🥭'
  },
  {
    id: 'ciko',
    name: 'Ciko si Kelinci Ceria',
    emoji: '🐰',
    bgGradient: 'from-pink-400 to-rose-500',
    accentColor: '#f43f5e',
    description: 'Ciko suka melompat gembira dan tertawa riang saat membaca kisah petualangan menarik.',
    age: 7,
    role: 'Sahabat Cilik 7 Tahun (Lincah & Gemar Membaca)',
    subject: 'Bahasa Indonesia & Literasi Cerita',
    personality: 'Ceria, lincah, ekspresif, dan ramah.',
    greeting: 'Boing boing! Hihihi! Halo teman-temanku yang hebat! Aku Ciko si Kelinci Ceria. Membaca buku dongeng dan cerita bergambar itu asyik sekali lho! Tiba-tiba kita bisa bertualang ke negeri ajaib! Ayo, kita buka buku ceritanya dan belajar bersama!',
    soundEffect: 'bunny',
    voices: [{ id: 'ciko', label: 'Ciko', fallback: { pitch: 1.38, rate: 1.04 } }],
    badge: '🥕 Bintang Literasi',
    voiceStyle: 'Suara Lincah & Menggemaskan (Ceria & Riang)',
    soundEffectName: 'Lompatan Kelinci 🌀',
    color: 'text-rose-700',
    border: 'border-rose-300 hover:border-rose-500',
    bgGrad: 'from-rose-100 via-pink-50 to-rose-50',
    favoriteFood: 'Wortel Madu Renyah 🥕'
  },
  {
    id: 'owi',
    name: 'Profesor Owi si Burung Hantu',
    emoji: '🦉',
    bgGradient: 'from-cyan-400 to-blue-500',
    accentColor: '#0284c7',
    description: 'Owi selalu penasaran tentang cara kerja alam semesta dan suka mengamati hal-hal baru dengan teliti.',
    age: 9,
    role: 'Sahabat Cilik 9 Tahun (Penasaran & Teliti)',
    subject: 'IPAS & Eksplorasi Sains Alam',
    personality: 'Cerdas, bijak, suka bereksperimen, dan penuh rasa ingin tahu.',
    greeting: 'Hmm... Kacamata sainsku sudah terpasang rapi! Hoo-hooo! Tahukah kamu kenapa pelangi punya warna-warni yang indah? Rahasia alam semesta itu ajaib dan luar biasa lho! Yuk, kita selidiki rahasia sains bersama!',
    soundEffect: 'owl',
    voices: [{ id: 'owi', label: 'Owi', fallback: { pitch: 1.22, rate: 0.98 } }],
    badge: '🔭 Peneliti Cilik',
    voiceStyle: 'Suara Cerdas & Penuh Rasa Ingin Tahu (Ajaib Sekali!)',
    soundEffectName: 'Seruling Burung Hantu 🦉',
    color: 'text-blue-700',
    border: 'border-blue-300 hover:border-blue-500',
    bgGrad: 'from-blue-100 via-cyan-50 to-blue-50',
    favoriteFood: 'Biji Bunga Matahari 🌻'
  },
  {
    id: 'mimi',
    name: 'Mimi si Panda Pelangi',
    emoji: '🐼',
    bgGradient: 'from-emerald-400 to-teal-600',
    accentColor: '#059669',
    description: 'Mimi anak yang ramah dan suka berbagi, selalu mengingatkan teman-temannya untuk saling menyayangi dan berbuat baik.',
    age: 7,
    role: 'Sahabat Cilik 7 Tahun (Manis & Penyayang)',
    subject: 'Pendidikan Pancasila & Budi Pekerti',
    personality: 'Penyayang, santun, hangat, dan murah senyum.',
    greeting: 'Hihihi! Halo teman-temanku tersayang! Mimi punya pelangi kebaikan hari ini. Kalau kita saling membantu, berbagi, dan menyayangi sesama teman, hati kita jadi damai dan bahagia lho. Tetap tersenyum dan semangat ya!',
    soundEffect: 'panda',
    voices: [{ id: 'mimi', label: 'Mimi', fallback: { pitch: 1.4, rate: 1.02 } }],
    badge: '🌸 Sahabat Hangat',
    voiceStyle: 'Suara Lembut & Riang (Ramah & Hangat)',
    soundEffectName: 'Lonceng Gemerincing 🔔',
    color: 'text-emerald-700',
    border: 'border-emerald-300 hover:border-emerald-500',
    bgGrad: 'from-emerald-100 via-teal-50 to-emerald-50',
    favoriteFood: 'Puding Bambu Manis 🎋'
  },
  {
    id: 'dino',
    name: 'Dino si Penjelajah Hijau',
    emoji: '🦕',
    bgGradient: 'from-indigo-400 to-purple-600',
    accentColor: '#6366f1',
    description: 'Dino gemar menirukan roket luar angkasa dan mencari rasi bintang baru di langit malam.',
    age: 8,
    role: 'Sahabat Cilik 8 Tahun (Petualang Antariksa)',
    subject: 'Eksplorasi Antariksa & Samudra',
    personality: 'Penuh petualangan, berimajinasi tinggi, dan tangkas.',
    greeting: 'Wuuush! Duum duum! Rawrrr cilik! Siap menjelajahi bintang-bintang di luar angkasa bersamaku? Alam semesta ini luar biasa luas dan menakjubkan lho! Ayo pegangan yang erat, kita meluncur bersama!',
    soundEffect: 'dino',
    voices: [{ id: 'dino', label: 'Dino', fallback: { pitch: 1.26, rate: 1.02 } }],
    badge: '🚀 Penjelajah Bintang',
    voiceStyle: 'Suara Penjelajah Cilik (Wuuush! Bersemangat)',
    soundEffectName: 'Hentakan Dinosaurus 🐾',
    color: 'text-indigo-700',
    border: 'border-indigo-300 hover:border-indigo-500',
    bgGrad: 'from-indigo-100 via-sky-50 to-indigo-50',
    favoriteFood: 'Daun Semanggi Segar 🍀'
  },
  {
    id: 'kids',
    name: 'Budi & Callysta',
    emoji: '👧👦',
    bgGradient: 'from-purple-400 to-fuchsia-500',
    accentColor: '#9333ea',
    description: 'Budi dan Callysta selalu belajar bersama, saling menyemangati, dan merayakan keberhasilan teman-temannya.',
    age: 8,
    role: 'Teman Belajar Kompak 8 Tahun (Sahabat Sejati)',
    subject: 'Seluruh Modul Kurikulum Merdeka',
    personality: 'Kompak, rajin, pantang menyerah, dan suportif.',
    greeting: 'Horeee! Halo sahabat hebat! Kami Budi dan Callysta! Belajar di Karia Ku sangat menyenangkan dan membuat kita makin pintar, kan? Yuk, kita selesaikan kuis bersama dan kumpulkan semua bintang juaramu!',
    soundEffect: 'kids',
    voices: [
      { id: 'budi', label: 'Budi', fallback: { pitch: 1.26, rate: 1.04 } },
      { id: 'callysta', label: 'Callysta', fallback: { pitch: 1.4, rate: 1.04 } }
    ],
    badge: '🌟 Bintang Prestasi',
    voiceStyle: 'Suara Dua Sahabat Kompak (Horeee! Semangat Bareng)',
    soundEffectName: 'Melodi Xilofon 🎼',
    color: 'text-purple-700',
    border: 'border-purple-300 hover:border-purple-500',
    bgGrad: 'from-purple-100 via-fuchsia-50 to-purple-50',
    favoriteFood: 'Roti Panggang Cokelat 🥪'
  }
];

export const getCharacterById = (id: string): Character => {
  return CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
};
