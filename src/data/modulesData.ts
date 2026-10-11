import { LearningModule, GradeId } from '../types';
import { NEW_CURRICULUM_MODULES } from './newCurriculumModules';
import { ENGLISH_LEARNING_MODULES } from './englishModules';

export interface SubjectItem {
  id: string;
  name: string;
  category: 'akademik' | 'karakter';
  iconEmoji: string;
  badgeColor: string;
  description: string;
  isAvailable: boolean;
  totalModules: number;
}

export interface GradeItem {
  id: GradeId;
  label: string;
  ageRange: string;
  fase: string;
  kurikulumDesc: string;
  icon: string;
  isAvailable: boolean;
  color: string;
}

export const GRADES_LIST: GradeItem[] = [
  {
    id: 'paud',
    label: 'PAUD (Usia 2-4 Thn)',
    ageRange: '2-4 Tahun',
    fase: 'Fase Fondasi Awal',
    kurikulumDesc: 'Sensori motorik, warna dasar, bentuk & membilang 1-5 konkret',
    icon: '🐣',
    isAvailable: true,
    color: 'bg-[#FCE4EC] text-[#AD1457] border-[#F48FB1]'
  },
  {
    id: 'tk',
    label: 'TK A & TK B (Usia 4-6 Thn)',
    ageRange: '4-6 Tahun',
    fase: 'Fase Fondasi TK',
    kurikulumDesc: 'Bilangan 1-10, abjad A-Z, perbandingan banyak/sedikit & alam sekitar',
    icon: '🎨',
    isAvailable: true,
    color: 'bg-[#FFF3E0] text-[#E65100] border-[#FFCC80]'
  },
  {
    id: 'sd-1',
    label: 'SD Kelas 1 (Usia 6-7 Thn)',
    ageRange: '6-7 Tahun',
    fase: 'Fase A (Kelas 1)',
    kurikulumDesc: 'Bilangan 1-20, penjumlahan & pengurangan konkret, suku kata & pancaindra',
    icon: '🎒',
    isAvailable: true,
    color: 'bg-[#FFF8E1] text-[#5D4037] border-[#FFE082]'
  },
  {
    id: 'sd-2',
    label: 'SD Kelas 2 (Usia 7-8 Thn)',
    ageRange: '7-8 Tahun',
    fase: 'Fase A (Kelas 2)',
    kurikulumDesc: 'Operasi 2 digit, konsep perkalian dasar, pecahan 1/2 & wujud benda',
    icon: '📘',
    isAvailable: true,
    color: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
  },
  {
    id: 'sd-3',
    label: 'SD Kelas 3 (Usia 8-9 Thn)',
    ageRange: '8-9 Tahun',
    fase: 'Fase B (Kelas 3)',
    kurikulumDesc: 'Perkalian & pembagian s.d 100, keliling persegi, arah mata angin & sumber energi',
    icon: '🚀',
    isAvailable: true,
    color: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]'
  },
  {
    id: 'sd-4-6',
    label: 'SD Kelas 4-6 (Usia 9-12 Thn)',
    ageRange: '9-12 Tahun',
    fase: 'Fase B & C (Kelas 4-6)',
    kurikulumDesc: 'Operasi campuran, FPB/KPK, desimal, rantai makanan, gaya & nilai Pancasila',
    icon: '🏆',
    isAvailable: true,
    color: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#CE93D8]'
  },
];

export const SUBJECTS_LIST: SubjectItem[] = [
  {
    id: 'menulis_tracing',
    name: 'Menulis & Tracing',
    category: 'akademik',
    iconEmoji: '✍️',
    badgeColor: 'bg-[#E65100]',
    description: 'Latihan menulis dengan tracing huruf A-Z, pola garis lurus, lengkung, dan kata dasar di buku bergaris tiga.',
    isAvailable: true,
    totalModules: 8
  },
  {
    id: 'belajar_membaca',
    name: 'Belajar Membaca',
    category: 'akademik',
    iconEmoji: '🔤',
    badgeColor: 'bg-[#0288D1]',
    description: 'Fonik bunyi huruf, mengeja suku kata terbuka & tertutup, merangkai kata, hingga membaca cerita bergambar.',
    isAvailable: true,
    totalModules: 10
  },
  {
    id: 'sempoa',
    name: 'Belajar Sempoa',
    category: 'akademik',
    iconEmoji: '🧮',
    badgeColor: 'bg-[#7B1FA2]',
    description: 'Sempoa Soroban interaktif untuk semua jenjang: nilai tempat, rumus teman kecil (+5), teman besar (+10), dan mental aritmatika.',
    isAvailable: true,
    totalModules: 12
  },
  {
    id: 'matematika',
    name: 'Matematika Ceria',
    category: 'akademik',
    iconEmoji: '🔢',
    badgeColor: 'bg-[#D97706]',
    description: 'Belajar berhitung, logika bilangan, dan operasi matematika sesuai fase Kurikulum Merdeka.',
    isAvailable: true,
    totalModules: 12
  },
  {
    id: 'calistung',
    name: 'Bahasa & Literasi',
    category: 'akademik',
    iconEmoji: '📖',
    badgeColor: 'bg-[#1976D2]',
    description: 'Mengenal huruf, membaca suku kata, memahami bacaan, hingga membedakan fakta vs opini.',
    isAvailable: true,
    totalModules: 10
  },
  {
    id: 'ipa_alam',
    name: 'Sains & Alam (IPAS)',
    category: 'akademik',
    iconEmoji: '🌿',
    badgeColor: 'bg-[#388E3C]',
    description: 'Pancaindra, siklus hidup satwa, wujud benda, sumber energi, hingga ekosistem dan tata surya.',
    isAvailable: true,
    totalModules: 10
  },
  {
    id: 'karakter',
    name: 'Karakter & Pancasila',
    category: 'karakter',
    iconEmoji: '❤️',
    badgeColor: 'bg-[#D32F2F]',
    description: 'Sopan santun, 4 kata ajaib, empati, musyawarah, dan pengamalan butir Sila Pancasila.',
    isAvailable: true,
    totalModules: 10
  },
  {
    id: 'bahasa_inggris',
    name: 'Bahasa Inggris (English for Kids)',
    category: 'akademik',
    iconEmoji: '🇬🇧',
    badgeColor: 'bg-[#FF6F00]',
    description: 'Alphabet & Phonics Song, Numbers 1-10, Colors, Shapes, Animals, Family, Fruits & Veggies, Body Parts, Daily Objects, Greetings, dan kurikulum SD British Council & Italki.',
    isAvailable: true,
    totalModules: 17
  }
];

const BASE_LEARNING_MODULES: LearningModule[] = [
  // =========================================================================
  // ============================ 1. PAUD (2-4 THN) ==========================
  // =========================================================================
  {
    id: 'mod-paud-angka-1-5',
    subjectId: 'matematika',
    gradeId: 'paud',
    order: 1,
    title: 'Membilang 1 sampai 5 & Warna Dasar',
    shortDesc: 'Ayo hitung jari tangan dan buah apel manis bersama Beruang Madu!',
    fullDesc: 'Fase Fondasi Awal: Mengembangkan kepekaan sensori membilang 1 sampai 5 dengan benda konkret, mengenal warna merah, kuning, biru, serta ukuran besar-kecil.',
    kurikulumFase: 'Fase Fondasi Awal (PAUD)',
    kurikulumFokus: 'Membilang 1-5 Konkret, Warna Primer & Ukuran Objek',
    estimatedMinutes: 4,
    starsReward: 15,
    coverEmoji: '🖐️',
    themeColor: 'from-[#F48FB1] to-[#EC407A]',
    themeBg: 'bg-[#FCE4EC] border-[#F48FB1]',
    themeBorder: 'border-[#F48FB1]',
    tags: ['PAUD', 'Membilang 1-5', 'Warna Dasar', 'Besar Kecil'],
    badgeReward: {
      id: 'badge_paud_bintang_kecil',
      name: 'Bintang Cilik PAUD',
      description: 'Hebat! Kamu sudah pandai berhitung 1 sampai 5!',
      emoji: '🐣',
      category: 'math'
    },
    steps: [
      {
        id: 'step-paud-1',
        title: 'Membilang 1, 2, 3 Buah Apel Merah',
        subtitle: 'Sentuh setiap apel untuk mendengar suaranya',
        type: 'interactive_counter',
        prompt: 'Yuk sentuh 3 apel merah manis ini: Satu, Dua, Tiga! 🍎',
        speechText: 'Ayo sentuh buah apel merah! Satu, dua, tiga! Apel berwarna merah dan rasanya manis.',
        interactiveData: {
          initialCount: 0,
          targetCount: 3,
          emoji: '🍎',
          itemLabel: 'Apel Merah',
          interactiveType: 'tap_to_count'
        },
        tips: 'Sentuh dan sebutkan: Satu... Dua... Tiga!'
      },
      {
        id: 'step-paud-2',
        title: 'Mengenal Ukuran: BESAR dan KECIL',
        subtitle: 'Gajah yang Besar dan Kelinci yang Mungil',
        type: 'story',
        prompt: 'Gajah 🐘 tubuhnya BESAR sekali! Kelinci 🐰 tubuhnya KECIL dan lucu.',
        speechText: 'Lihat, Gajah tubuhnya besar sekali! Sedangkan Kelinci bertubuh kecil dan lincah.',
        interactiveData: {
          itemsA: { emoji: '🐘', count: 1, label: 'Gajah BESAR' },
          itemsB: { emoji: '🐰', count: 1, label: 'Kelinci KECIL' },
          operator: '+'
        },
        tips: 'Gajah = Besar. Kelinci = Kecil.'
      },
      {
        id: 'step-paud-3',
        title: 'Siap untuk Kuis Ceria PAUD!',
        subtitle: 'Ayo tunjuk gambar yang benar',
        type: 'summary',
        prompt: 'Pintar sekali! Sekarang mari kita bermain tebak-tebakan kuis!',
        speechText: 'Hebat sekali! Mari kita mulai kuis ceria untuk anak hebat.'
      }
    ],
    quiz: [
      {
        id: 'q-paud-m1',
        questionNumber: 1,
        prompt: 'Ada berapa buah apel merah 🍎 di bawah ini?',
        speechPrompt: 'Ada berapa jumlah buah apel merah ini?',
        itemsVisual: [{ emoji: '🍎', count: 3, label: 'Apel Merah' }],
        options: [
          { id: 'opt-a', text: '3 Apel', isCorrect: true },
          { id: 'opt-b', text: '1 Apel', isCorrect: false },
          { id: 'opt-c', text: '5 Apel', isCorrect: false }
        ],
        explanation: 'Pintar! Ada 3 buah apel merah yang manis (1, 2, 3).'
      },
      {
        id: 'q-paud-m2',
        questionNumber: 2,
        prompt: 'Hewan manakah yang bertubuh paling BESAR?',
        speechPrompt: 'Hewan manakah yang bertubuh paling besar?',
        options: [
          { id: 'opt-a', text: 'Gajah 🐘 (Besar)', isCorrect: true },
          { id: 'opt-b', text: 'Semut 🐜 (Kecil)', isCorrect: false },
          { id: 'opt-c', text: 'Kupu-kupu 🦋', isCorrect: false }
        ],
        explanation: 'Benar sekali! Gajah berukuran paling besar.'
      },
      {
        id: 'q-paud-m3',
        questionNumber: 3,
        prompt: 'Berapa jumlah mata 👀 yang kita miliki di wajah?',
        speechPrompt: 'Berapa jumlah mata yang kita miliki?',
        options: [
          { id: 'opt-a', text: '2 Mata (Kiri & Kanan)', isCorrect: true },
          { id: 'opt-b', text: '4 Mata', isCorrect: false },
          { id: 'opt-c', text: '1 Mata', isCorrect: false }
        ],
        explanation: 'Hebat! Kita memiliki 2 mata untuk melihat dunia yang indah.'
      }
    ]
  },
  {
    id: 'mod-paud-suara-kata',
    subjectId: 'calistung',
    gradeId: 'paud',
    order: 1,
    title: 'Tirukan Suara Hewan & Kata Sapaan',
    shortDesc: 'Meong meong kucing, kwek kwek bebek, dan kata Halo yang ramah!',
    fullDesc: 'Fase Fondasi Awal: Mengasah sensori auditori anak usia 2-4 tahun dengan menirukan bunyi alam, suara hewan peliharaan, dan melafalkan sapaan ramah keluarga.',
    kurikulumFase: 'Fase Fondasi Awal (PAUD)',
    kurikulumFokus: 'Auditori Bahasa, Tiruan Suara & Kosakata Sapaan',
    estimatedMinutes: 4,
    starsReward: 15,
    coverEmoji: '🐱',
    themeColor: 'from-[#64B5F6] to-[#42A5F5]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['PAUD', 'Suara Hewan', 'Bahasa Awal', 'Kata Sapaan'],
    badgeReward: {
      id: 'badge_paud_celoteh_pintar',
      name: 'Bintang Celoteh Cilik',
      description: 'Pintar menirukan suara hewan dan menyapa ramah!',
      emoji: '🐤',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-paud-s1',
        title: 'Suara Kucing: Meong Meong! 🐱',
        subtitle: 'Kucing manis berbulu lembut',
        type: 'story',
        prompt: 'Kucing manis bersuara "Meong... Meong!". Kucing suka dielus lembut.',
        speechText: 'Kucing manis berbulu lembut bersuara: Meong meong! Ayo tirukan bersama: Meong meong!',
        interactiveData: {
          itemsA: { emoji: '🐱', count: 1, label: 'Kucing Meong' },
          itemsB: { emoji: '🥛', count: 1, label: 'Susu Kucing' },
          operator: '+'
        }
      },
      {
        id: 'step-paud-s2',
        title: 'Kata Ajaib: HALO & DADA 👋',
        subtitle: 'Menyapa teman dan keluarga dengan riang',
        type: 'interactive_counter',
        prompt: 'Sentuh tangan melambai untuk menyapa teman: HALO! 👋',
        speechText: 'Ketika bertemu teman, kita tersenyum dan berkata: Halo! Lalu saat berpisah kita ucapkan: Dada!',
        interactiveData: {
          initialCount: 0,
          targetCount: 3,
          emoji: '👋',
          itemLabel: 'Lambaian Tangan',
          interactiveType: 'tap_to_count'
        }
      }
    ],
    quiz: [
      {
        id: 'q-paud-c1',
        questionNumber: 1,
        prompt: 'Bagaimanakah suara anak kucing 🐱 yang lucu?',
        speechPrompt: 'Bagaimanakah suara anak kucing yang lucu?',
        options: [
          { id: 'opt-a', text: 'Meong... Meong! 🐱', isCorrect: true },
          { id: 'opt-b', text: 'Kwek... Kwek! 🦆', isCorrect: false },
          { id: 'opt-c', text: 'Guk... Guk! 🐶', isCorrect: false }
        ],
        explanation: 'Benar sekali! Kucing bersuara meong meong.'
      },
      {
        id: 'q-paud-c2',
        questionNumber: 2,
        prompt: 'Ketika bertemu Ayah atau Bunda di pagi hari, kata apa yang kita ucapkan?',
        speechPrompt: 'Ketika bertemu orang tua di pagi hari, apa yang kita ucapkan?',
        options: [
          { id: 'opt-a', text: 'Halo / Selamat Pagi! ☀️', isCorrect: true },
          { id: 'opt-b', text: 'Menangis', isCorrect: false },
          { id: 'opt-c', text: 'Marah-marah', isCorrect: false }
        ],
        explanation: 'Pintar! Anak hebat menyapa dengan senyum ceria.'
      }
    ]
  },
  {
    id: 'mod-paud-tubuh-warna',
    subjectId: 'ipa_alam',
    gradeId: 'paud',
    order: 1,
    title: 'Tubuhku yang Sehat & Warna Alam',
    shortDesc: 'Mengenal kepala, tangan, kaki, dan warna hijau dedaunan!',
    fullDesc: 'Fase Fondasi Awal: Eksplorasi anggota tubuh utama, fungsi kaki untuk berjalan, tangan untuk memegang, dan mengenali warna alami alam.',
    kurikulumFase: 'Fase Fondasi Awal (PAUD)',
    kurikulumFokus: 'Anggota Tubuh Utama & Observasi Warna Alami',
    estimatedMinutes: 4,
    starsReward: 15,
    coverEmoji: '🦶',
    themeColor: 'from-[#81C784] to-[#4CAF50]',
    themeBg: 'bg-[#E8F5E9] border-[#A5D6A7]',
    themeBorder: 'border-[#A5D6A7]',
    tags: ['PAUD', 'Tubuh Sehat', 'Warna Alam', 'Sains Balita'],
    badgeReward: {
      id: 'badge_paud_sehat_ceria',
      name: 'Bintang Tubuh Sehat',
      description: 'Mengenal anggota tubuh dan merawat diri dengan baik!',
      emoji: '💪',
      category: 'science'
    },
    steps: [
      {
        id: 'step-paud-t1',
        title: 'Kaki untuk Berjalan & Melompat 🦶',
        subtitle: 'Kaki melangkah riang di taman',
        type: 'story',
        prompt: 'Kita punya dua kaki untuk berjalan, berlari, dan melompat gembira!',
        speechText: 'Kaki kita kuat! Kaki digunakan untuk melangkah, berjalan, dan melompat di atas rumput hijau.'
      }
    ],
    quiz: [
      {
        id: 'q-paud-s1',
        questionNumber: 1,
        prompt: 'Bagian tubuh manakah yang kita gunakan untuk berjalan dan melompat?',
        speechPrompt: 'Bagian tubuh manakah yang kita gunakan untuk berjalan dan melompat?',
        options: [
          { id: 'opt-a', text: 'Kaki 🦶', isCorrect: true },
          { id: 'opt-b', text: 'Telinga 👂', isCorrect: false },
          { id: 'opt-c', text: 'Hidung 👃', isCorrect: false }
        ],
        explanation: 'Benar! Kaki digunakan untuk berjalan dan melompat.'
      },
      {
        id: 'q-paud-s2',
        questionNumber: 2,
        prompt: 'Apakah warna daun yang segar di pohon 🍃?',
        speechPrompt: 'Apakah warna daun yang segar di pohon?',
        options: [
          { id: 'opt-a', text: 'Warna Hijau 🟢', isCorrect: true },
          { id: 'opt-b', text: 'Warna Ungu 🟣', isCorrect: false },
          { id: 'opt-c', text: 'Warna Hitam ⚫', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Daun segar berwarna hijau.'
      }
    ]
  },
  {
    id: 'mod-paud-senyum-salam',
    subjectId: 'karakter',
    gradeId: 'paud',
    order: 1,
    title: 'Senyum Ceria & Sayang Teman',
    shortDesc: 'Belajar berpelukan hangat, tersenyum ceria, dan merapikan mainan bersama!',
    fullDesc: 'Fase Fondasi Awal: Mengembangkan rasa kasih sayang, ekspresi emosi gembira, serta kebiasaan merapikan mainan setelah bermain.',
    kurikulumFase: 'Fase Fondasi Awal (PAUD)',
    kurikulumFokus: 'Sosial Emosional, Empati & Kerapian Mainan',
    estimatedMinutes: 4,
    starsReward: 15,
    coverEmoji: '🤗',
    themeColor: 'from-[#FFD54F] to-[#FFCA28]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['PAUD', 'Kasih Sayang', 'Senyum', 'Merapikan Mainan'],
    badgeReward: {
      id: 'badge_paud_hati_hangat',
      name: 'Sahabat Ceria PAUD',
      description: 'Anak manis yang selalu tersenyum dan menyayangi keluarga!',
      emoji: '💖',
      category: 'character'
    },
    steps: [
      {
        id: 'step-paud-k1',
        title: 'Merapikan Mainan ke Dalam Kotak 📦',
        subtitle: 'Selesai bermain, kamar tetap bersih',
        type: 'interactive_counter',
        prompt: 'Sentuh 3 boneka beruang 🧸 untuk memasukkannya ke dalam kotak mainan!',
        speechText: 'Anak pintar selesai bermain selalu merapikan mainan kembali ke kotaknya agar rumah rapi dan aman.',
        interactiveData: {
          initialCount: 0,
          targetCount: 3,
          emoji: '🧸',
          itemLabel: 'Boneka Beruang',
          interactiveType: 'tap_to_count'
        }
      }
    ],
    quiz: [
      {
        id: 'q-paud-k1',
        questionNumber: 1,
        prompt: 'Apa yang kita lakukan setelah selesai bermain boneka dan mobil-mobilan?',
        speechPrompt: 'Apa yang kita lakukan setelah selesai bermain?',
        options: [
          { id: 'opt-a', text: 'Merapikan kembali ke kotak mainan 📦', isCorrect: true },
          { id: 'opt-b', text: 'Ditinggal berserakan di lantai', isCorrect: false },
          { id: 'opt-c', text: 'Menangis', isCorrect: false }
        ],
        explanation: 'Hebat! Anak hebat selalu merapikan mainannya sendiri.'
      }
    ]
  },

  // =========================================================================
  // ============================ 2. TK A & TK B (4-6 THN) ===================
  // =========================================================================
  {
    id: 'mod-tk-angka-1-10',
    subjectId: 'matematika',
    gradeId: 'tk',
    order: 1,
    title: 'Membilang 1-10 & Banyak Sedikit',
    shortDesc: 'Ayo hitung bintang gemerlap dan bandingkan kumpulan benda ceria!',
    fullDesc: 'Fase Fondasi TK: Mengembangkan kemampuan membilang 1 sampai 10, mengurutkan bilangan, membandingkan konsep kuantitas lebih banyak vs lebih sedikit, dan pola urutan sederhana.',
    kurikulumFase: 'Fase Fondasi TK (4-6 Thn)',
    kurikulumFokus: 'Kuantitas 1-10, Perbandingan Kumpulan Objek & Pola Urutan',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🔢',
    themeColor: 'from-[#FFB74D] to-[#FFA726]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['TK', 'Bilangan 1-10', 'Banyak Sedikit', 'Pola Bentuk'],
    badgeReward: {
      id: 'badge_tk_juara_hitung',
      name: 'Bintang Hitung TK',
      description: 'Luar biasa! Kamu mahir membilang 1-10 dan membandingkan benda!',
      emoji: '🎨',
      category: 'math'
    },
    steps: [
      {
        id: 'step-tk-m1',
        title: 'Membilang 1 sampai 10 dengan Balon Warna 🎈',
        subtitle: 'Hitung balon warna-warni yang terbang',
        type: 'interactive_counter',
        prompt: 'Sentuh 5 balon warna-warni ini: 1, 2, 3, 4, 5! 🎈',
        speechText: 'Ayo sentuh balon warna-warni dan hitung bersama: Satu, dua, tiga, empat, lima!',
        interactiveData: {
          initialCount: 0,
          targetCount: 5,
          emoji: '🎈',
          itemLabel: 'Balon Ceria',
          interactiveType: 'tap_to_count'
        }
      },
      {
        id: 'step-tk-m2',
        title: 'Membandingkan Kumpulan Benda: Lebih Banyak vs Sedikit',
        subtitle: '5 Pisang 🍌 Lebih Banyak dari 2 Pisang 🍌',
        type: 'story',
        prompt: 'Monyet memiliki 5 pisang 🍌. Kelinci memiliki 2 pisang 🍌. 5 pisang LEBIH BANYAK dari 2 pisang!',
        speechText: 'Lima pisang jumlahnya lebih banyak daripada dua pisang. Kita bisa membandingkan kumpulan benda dengan menghitungnya!',
        interactiveData: {
          itemsA: { emoji: '🍌', count: 5, label: '5 Pisang (Lebih Banyak)' },
          itemsB: { emoji: '🍌', count: 2, label: '2 Pisang (Lebih Sedikit)' },
          operator: '+'
        }
      }
    ],
    quiz: [
      {
        id: 'q-tk-m1',
        questionNumber: 1,
        prompt: 'Ada berapa jumlah bintang ⭐ gemerlap di bawah ini?',
        speechPrompt: 'Ada berapa jumlah bintang gemerlap di bawah ini?',
        itemsVisual: [{ emoji: '⭐', count: 7, label: 'Bintang' }],
        options: [
          { id: 'opt-a', text: '7 Bintang ⭐', isCorrect: true },
          { id: 'opt-b', text: '5 Bintang', isCorrect: false },
          { id: 'opt-c', text: '9 Bintang', isCorrect: false },
          { id: 'opt-d', text: '4 Bintang', isCorrect: false }
        ],
        explanation: 'Benar sekali! Ada 7 buah bintang di langit.'
      },
      {
        id: 'q-tk-m2',
        questionNumber: 2,
        prompt: 'Kumpulan manakah yang jumlahnya LEBIH BANYAK?',
        speechPrompt: 'Kumpulan manakah yang jumlahnya lebih banyak?',
        options: [
          { id: 'opt-a', text: '6 Buah Jeruk 🍊 (Lebih Banyak)', isCorrect: true },
          { id: 'opt-b', text: '2 Buah Jeruk 🍊', isCorrect: false },
          { id: 'opt-c', text: 'Jumlahnya sama', isCorrect: false }
        ],
        explanation: 'Tepat! 6 buah jeruk lebih banyak daripada 2 buah jeruk.'
      },
      {
        id: 'q-tk-m3',
        questionNumber: 3,
        prompt: 'Urutan angka: 1, 2, 3, 4, [ ? ]. Angka berapakah yang tepat?',
        speechPrompt: 'Setelah angka 4, angka berapakah selanjutnya?',
        equationVisual: '1 - 2 - 3 - 4 - [ ? ]',
        options: [
          { id: 'opt-a', text: 'Angka 5', isCorrect: true },
          { id: 'opt-b', text: 'Angka 7', isCorrect: false },
          { id: 'opt-c', text: 'Angka 2', isCorrect: false },
          { id: 'opt-d', text: 'Angka 9', isCorrect: false }
        ],
        explanation: 'Hebat! Setelah angka 4 adalah angka 5.'
      },
      {
        id: 'q-tk-m4',
        questionNumber: 4,
        prompt: 'Jika kamu memiliki 3 permen 🍬 lalu diberi lagi 2 permen 🍬, sekarang ada berapa?',
        speechPrompt: 'Tiga permen ditambah dua permen menjadi berapa?',
        equationVisual: '3 + 2 = ?',
        options: [
          { id: 'opt-a', text: '5 Permen 🍬', isCorrect: true },
          { id: 'opt-b', text: '4 Permen', isCorrect: false },
          { id: 'opt-c', text: '6 Permen', isCorrect: false }
        ],
        explanation: 'Pintar! 3 + 2 = 5 permen.'
      }
    ]
  },
  {
    id: 'mod-tk-huruf-abjad',
    subjectId: 'calistung',
    gradeId: 'tk',
    order: 1,
    title: 'Mengenal Huruf Abjad A-Z & Huruf Awal Benda',
    shortDesc: 'B untuk Bola, K untuk Kucing, dan M untuk Mata!',
    fullDesc: 'Fase Fondasi TK: Pengenalan simbol fonik huruf alfabet A-Z, mencocokkan huruf awal dengan nama benda konkret, dan menggabungkan suku kata 2 huruf.',
    kurikulumFase: 'Fase Fondasi TK (4-6 Thn)',
    kurikulumFokus: 'Fonik Simbol A-Z & Bunyi Huruf Awal Benda',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🔤',
    themeColor: 'from-[#42A5F5] to-[#1E88E5]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['TK', 'Abjad A-Z', 'Huruf Awal', 'Fonik'],
    badgeReward: {
      id: 'badge_tk_abjad_emas',
      name: 'Bintang Abjad TK',
      description: 'Hafal huruf abjad dan pandai menebak huruf awal benda!',
      emoji: '📚',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-tk-h1',
        title: 'Huruf B untuk BOLA ⚽ & Huruf K untuk KUCING 🐱',
        subtitle: 'Dengarkan bunyi huruf awal setiap benda',
        type: 'story',
        prompt: 'B-O-L-A diawali huruf B. K-U-C-I-N-G diawali huruf K.',
        speechText: 'Huruf B untuk Bola. Huruf K untuk Kucing. Mari kita bunyikan: B... dan K...!',
        interactiveData: {
          itemsA: { emoji: '⚽', count: 1, label: 'B - Bola' },
          itemsB: { emoji: '🐱', count: 1, label: 'K - Kucing' },
          operator: '+'
        }
      }
    ],
    quiz: [
      {
        id: 'q-tk-c1',
        questionNumber: 1,
        prompt: 'Huruf awal apakah yang mengawali kata B-O-L-A ⚽?',
        speechPrompt: 'Huruf awal apakah yang mengawali kata Bola?',
        options: [
          { id: 'opt-a', text: 'Huruf B ⚽', isCorrect: true },
          { id: 'opt-b', text: 'Huruf M', isCorrect: false },
          { id: 'opt-c', text: 'Huruf P', isCorrect: false },
          { id: 'opt-d', text: 'Huruf S', isCorrect: false }
        ],
        explanation: 'Benar! Kata "Bola" diawali huruf B (B-O-L-A).'
      },
      {
        id: 'q-tk-c2',
        questionNumber: 2,
        prompt: 'Benda manakah yang namanya diawali dengan huruf "M"?',
        speechPrompt: 'Benda manakah yang namanya diawali dengan huruf M?',
        options: [
          { id: 'opt-a', text: 'Mata 👀', isCorrect: true },
          { id: 'opt-b', text: 'Buku 📖', isCorrect: false },
          { id: 'opt-c', text: 'Pohon 🌳', isCorrect: false },
          { id: 'opt-d', text: 'Topi 🧢', isCorrect: false }
        ],
        explanation: 'Pintar! Mata diawali huruf M (M-A-T-A).'
      }
    ]
  },
  {
    id: 'mod-tk-siang-malam',
    subjectId: 'ipa_alam',
    gradeId: 'tk',
    order: 1,
    title: 'Terangnya Siang, Indahnya Malam & Tumbuhan',
    shortDesc: 'Matahari terbit di siang hari, bulan bintang bersinar di malam hari!',
    fullDesc: 'Fase Fondasi TK: Eksplorasi fenomena alam siang dan malam, benda-benda langit ciptaan Tuhan, serta bagaimana tumbuhan memerlukan air dan sinar matahari.',
    kurikulumFase: 'Fase Fondasi TK (4-6 Thn)',
    kurikulumFokus: 'Fenomena Siang-Malam, Benda Langit & Kebutuhan Tanaman',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '☀️',
    themeColor: 'from-[#FFCA28] to-[#FFA000]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['TK', 'Siang Malam', 'Matahari Bulan', 'Tumbuhan'],
    badgeReward: {
      id: 'badge_tk_penjelajah_alam',
      name: 'Penjelajah Langit TK',
      description: 'Memahami indahnya siang hari dan malam hari!',
      emoji: '🌙',
      category: 'science'
    },
    steps: [
      {
        id: 'step-tk-s1',
        title: 'Matahari di Siang Hari ☀️',
        subtitle: 'Memberi cahaya hangat bagi bumi',
        type: 'story',
        prompt: 'Di siang hari, Matahari ☀️ bersinar terang menghangatkan bumi dan membantu tanaman tumbuh!',
        speechText: 'Matahari bersinar terang di siang hari. Di malam hari giliran Bulan dan Bintang yang menerangi langit gelap.'
      }
    ],
    quiz: [
      {
        id: 'q-tk-s1',
        questionNumber: 1,
        prompt: 'Benda langit apakah yang bersinar terang dan menghangatkan kita di siang hari?',
        speechPrompt: 'Benda langit apakah yang bersinar di siang hari?',
        options: [
          { id: 'opt-a', text: 'Matahari ☀️', isCorrect: true },
          { id: 'opt-b', text: 'Bulan Sabit 🌙', isCorrect: false },
          { id: 'opt-c', text: 'Awan Gelap ☁️', isCorrect: false }
        ],
        explanation: 'Benar! Matahari menyinari bumi di waktu siang hari.'
      },
      {
        id: 'q-tk-s2',
        questionNumber: 2,
        prompt: 'Agar tanaman bunga 🌸 di halaman tumbuh subur dan mekar, tanaman harus disiram dengan?',
        speechPrompt: 'Agar tanaman tumbuh subur, harus disiram dengan apa?',
        options: [
          { id: 'opt-a', text: 'Air bersih 💧', isCorrect: true },
          { id: 'opt-b', text: 'Minyak goreng', isCorrect: false },
          { id: 'opt-c', text: 'Pasir kering', isCorrect: false }
        ],
        explanation: 'Pintar! Tanaman membutuhkan air dan sinar matahari untuk tumbuh subur.'
      }
    ]
  },
  {
    id: 'mod-tk-berbagi-teman',
    subjectId: 'karakter',
    gradeId: 'tk',
    order: 1,
    title: 'Asyiknya Berbagi & Budaya Antre',
    shortDesc: 'Belajar meminjamkan mainan dan sabar menunggu giliran bermain ayunan!',
    fullDesc: 'Fase Fondasi TK: Mengembangkan keterampilan sosial emosional berbagi dengan teman, antre menunggu giliran, dan saling tolong-menolong.',
    kurikulumFase: 'Fase Fondasi TK (4-6 Thn)',
    kurikulumFokus: 'Sosial Emosional, Budaya Antre & Berbagi Mainan',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🤝',
    themeColor: 'from-[#EC407A] to-[#D81B60]',
    themeBg: 'bg-[#FCE4EC] border-[#F48FB1]',
    themeBorder: 'border-[#F48FB1]',
    tags: ['TK', 'Berbagi', 'Antre', 'Sayang Teman'],
    badgeReward: {
      id: 'badge_tk_sahabat_terbaik',
      name: 'Sahabat Berhati Mulia',
      description: 'Anak yang suka berbagi dan sabar mengantre!',
      emoji: '💖',
      category: 'character'
    },
    steps: [
      {
        id: 'step-tk-k1',
        title: 'Sabar Menunggu Giliran di Ayunan 🎡',
        subtitle: 'Budaya antre yang tertib',
        type: 'story',
        prompt: 'Saat bermain ayunan di taman sekolah, kita antre menunggu giliran dengan sabar dan tersenyum!',
        speechText: 'Anak hebat selalu sabar menunggu giliran dan suka berbagi mainan dengan teman-temannya.'
      }
    ],
    quiz: [
      {
        id: 'q-tk-k1',
        questionNumber: 1,
        prompt: 'Ketika ada banyak teman yang ingin bermain perosotan di taman, apa yang sebaiknya kita lakukan?',
        speechPrompt: 'Saat banyak teman ingin bermain perosotan, apa yang kita lakukan?',
        options: [
          { id: 'opt-a', text: 'Mengantre dengan tertib dan sabar 🚶‍♂️🚶‍♀️', isCorrect: true },
          { id: 'opt-b', text: 'Menyerobot paling depan', isCorrect: false },
          { id: 'opt-c', text: 'Mendorong teman', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Mengantre dengan sabar adalah perilaku anak yang terpuji.'
      }
    ]
  },

  // =========================================================================
  // ============================ 3. SD KELAS 1 (6-7 THN) ====================
  // =========================================================================
  {
    id: 'mod-angka-1-20',
    subjectId: 'matematika',
    gradeId: 'sd-1',
    order: 1,
    title: 'Mengenal Bilangan Cacah 1 sampai 20',
    shortDesc: 'Ayo belajar membilang benda dari 1 sampai 20 dengan buah-buahan segar dan kelinci!',
    fullDesc: 'Fase A Kelas 1: Memahami konsep bilangan cacah 1-20, nilai bilangan, membilang maju-mundur, serta pasangan bilangan penyusun puluhan dan satuan.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Bilangan Cacah 1-20 & Pasangan Bilangan',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🔢',
    themeColor: 'from-[#FFB74D] to-[#FFA726]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['SD 1', 'Angka 1-20', 'Membilang Maju', 'Dasar Berhitung'],
    badgeReward: {
      id: 'badge_bintang_hitung',
      name: 'Bintang Hitung 1-20',
      description: 'Hebat! Kamu sudah pandai membilang angka 1 sampai 20!',
      emoji: '🌟',
      category: 'math'
    },
    steps: [
      {
        id: 'step-1-1',
        title: 'Mengenal Angka 1 sampai 5',
        subtitle: 'Hitung buah apel merah di pohon',
        type: 'interactive_counter',
        prompt: 'Klik atau sentuh setiap buah apel merah untuk mendengarkan hitungannya!',
        speechText: 'Mari kita hitung buah apel merah segar di pohon: Satu, dua, tiga, empat, lima!',
        interactiveData: {
          initialCount: 0,
          targetCount: 5,
          emoji: '🍎',
          itemLabel: 'Apel Merah',
          interactiveType: 'tap_to_count'
        },
        tips: 'Sentuh apel satu per satu secara berurutan.'
      },
      {
        id: 'step-1-2',
        title: 'Mengenal Angka 6 sampai 10',
        subtitle: 'Kelompokkan wortel oranye kesukaan kelinci',
        type: 'interactive_counter',
        prompt: 'Ayo kumpulkan 5 wortel lagi untuk melengkapi jumlah menjadi 10 wortel!',
        speechText: 'Kelinci sangat suka wortel! Ayo kumpulkan 5 wortel lagi: enam, tujuh, delapan, sembilan, sepuluh!',
        interactiveData: {
          initialCount: 5,
          targetCount: 10,
          emoji: '🥕',
          itemLabel: 'Wortel Kelinci',
          interactiveType: 'tap_to_count'
        },
        tips: 'Ingat: 5 apel ditambah 5 wortel sama dengan 10 benda.'
      },
      {
        id: 'step-1-3',
        title: 'Mengenal Angka Belasan: 11 sampai 20',
        subtitle: '1 Puluhan + Satuan = Belasan',
        type: 'story',
        prompt: 'Perhatikan keranjang: 10 buah stroberi (1 puluhan) ditambah 3 stroberi menjadi 13 stroberi 🍓!',
        speechText: 'Angka belasan adalah sepuluh ditambah angka satuan. Sepuluh ditambah tiga menjadi tiga belas!',
        interactiveData: {
          itemsA: { emoji: '🍓', count: 10, label: '1 Puluhan (10)' },
          itemsB: { emoji: '🍓', count: 3, label: '3 Satuan (3)' },
          operator: '+'
        },
        tips: '10 + 1 = 11, 10 + 2 = 12, 10 + 3 = 13, ..., 10 + 10 = 20.'
      },
      {
        id: 'step-1-4',
        title: 'Garis Bilangan Ceria 1-20',
        subtitle: 'Kelinci melompat maju di garis bilangan',
        type: 'number_line',
        prompt: 'Garis bilangan membantu kita melihat urutan angka dari yang terkecil di kiri ke yang terbesar di kanan.',
        speechText: 'Perhatikan kelinci melompat dari angka 1 maju sampai angka 20!',
        tips: 'Semakin ke kanan, nilainya semakin besar.'
      },
      {
        id: 'step-1-5',
        title: 'Kamu Siap untuk Kuis!',
        subtitle: 'Buktikan kemampuan hebatmu dan raih 3 Bintang Emas',
        type: 'summary',
        prompt: 'Luar biasa! Kamu telah mempelajari bilangan 1 sampai 20. Sekarang saatnya menguji kemampuanmu dalam kuis ceria!',
        speechText: 'Hebat sekali! Ayo kita mulai kuis berhitung angka satu sampai dua puluh!'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        questionNumber: 1,
        prompt: 'Ada berapa jumlah buah apel merah 🍎 di bawah ini?',
        speechPrompt: 'Ada berapa jumlah buah apel merah di bawah ini?',
        itemsVisual: [{ emoji: '🍎', count: 6, label: 'Apel' }],
        options: [
          { id: 'opt-a', text: '5 Apel', isCorrect: false },
          { id: 'opt-b', text: '6 Apel', isCorrect: true },
          { id: 'opt-c', text: '7 Apel', isCorrect: false },
          { id: 'opt-d', text: '8 Apel', isCorrect: false }
        ],
        explanation: 'Benar sekali! Ada 6 buah apel merah (1, 2, 3, 4, 5, 6).'
      },
      {
        id: 'q1-2',
        questionNumber: 2,
        prompt: 'Lengkapilah urutan angka berikut: 12, 13, 14, [ ? ], 16',
        speechPrompt: 'Angka berapakah yang berada di antara angka 14 dan 16?',
        equationVisual: '12 - 13 - 14 - [ ? ] - 16',
        options: [
          { id: 'opt-a', text: '15', isCorrect: true },
          { id: 'opt-b', text: '17', isCorrect: false },
          { id: 'opt-c', text: '11', isCorrect: false },
          { id: 'opt-d', text: '18', isCorrect: false }
        ],
        explanation: 'Tepat! Setelah angka 14 dan sebelum angka 16 adalah angka 15.'
      },
      {
        id: 'q1-3',
        questionNumber: 3,
        prompt: '1 Puluhan (10) ditambah 7 Satuan (7) menghasilkan bilangan apa?',
        speechPrompt: 'Sepuluh ditambah tujuh sama dengan berapa?',
        equationVisual: '10 + 7 = ?',
        options: [
          { id: 'opt-a', text: '16', isCorrect: false },
          { id: 'opt-b', text: '17', isCorrect: true },
          { id: 'opt-c', text: '18', isCorrect: false },
          { id: 'opt-d', text: '70', isCorrect: false }
        ],
        explanation: 'Pintar! 10 + 7 = 17 (Tujuh belas).'
      },
      {
        id: 'q1-4',
        questionNumber: 4,
        prompt: 'Manakah di antara bilangan berikut yang nilainya PALING BESAR?',
        speechPrompt: 'Manakah bilangan yang nilainya paling besar?',
        options: [
          { id: 'opt-a', text: '9', isCorrect: false },
          { id: 'opt-b', text: '14', isCorrect: false },
          { id: 'opt-c', text: '19', isCorrect: true },
          { id: 'opt-d', text: '12', isCorrect: false }
        ],
        explanation: 'Luar biasa! 19 adalah angka terbesar di antara pilihan tersebut.'
      },
      {
        id: 'q1-5',
        questionNumber: 5,
        prompt: 'Hitung total stroberi di bawah ini: 8 stroberi + 4 stroberi = ?',
        speechPrompt: 'Berapa jumlah delapan stroberi ditambah empat stroberi?',
        itemsVisual: [
          { emoji: '🍓', count: 8, label: 'Grup A (8)' },
          { emoji: '🍓', count: 4, label: 'Grup B (4)' }
        ],
        options: [
          { id: 'opt-a', text: '11 Stroberi', isCorrect: false },
          { id: 'opt-b', text: '12 Stroberi', isCorrect: true },
          { id: 'opt-c', text: '13 Stroberi', isCorrect: false },
          { id: 'opt-d', text: '14 Stroberi', isCorrect: false }
        ],
        explanation: 'Hebat! 8 + 4 = 12 stroberi segar.'
      }
    ]
  },
  {
    id: 'mod-penjumlahan-ceria-1-20',
    subjectId: 'matematika',
    gradeId: 'sd-1',
    order: 2,
    title: 'Penjumlahan Ceria sampai 20',
    shortDesc: 'Gabungkan dua kelompok benda dan temukan jumlah totalnya dengan gembira!',
    fullDesc: 'Fase A Kelas 1: Belajar konsep dasar penjumlahan dengan menggabungkan dua kelompok objek konkret, membilang lanjut, dan menyelesaikan soal cerita sederhana.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Penjumlahan Bilangan 1-20 & Soal Cerita Konkret',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '➕',
    themeColor: 'from-[#81C784] to-[#4CAF50]',
    themeBg: 'bg-[#E8F5E9] border-[#A5D6A7]',
    themeBorder: 'border-[#A5D6A7]',
    tags: ['SD 1', 'Penjumlahan', 'Tambah-tambahan', 'Soal Cerita'],
    badgeReward: {
      id: 'badge_juara_tambah',
      name: 'Juara Penjumlahan',
      description: 'Kuasai penjumlahan matematika dasar 1-20.',
      emoji: '🏆',
      category: 'math'
    },
    steps: [
      {
        id: 'step-2-1',
        title: 'Konsep Dasar: Menggabungkan Dua Kelompok',
        subtitle: '3 Donat Cokelat + 2 Donat Stroberi',
        type: 'addition_visual',
        prompt: 'Klik tombol "Gabungkan" untuk menyatukan kedua kelompok donat lezat!',
        speechText: 'Ketika kita menjumlahkan, kita menggabungkan dua kelompok benda menjadi satu kelompok yang lebih banyak!',
        interactiveData: {
          itemsA: { emoji: '🍩', count: 3, label: '3 Donat Cokelat' },
          itemsB: { emoji: '🍩', count: 2, label: '2 Donat Stroberi' },
          operator: '+'
        },
        tips: '3 + 2 = 5 donat.'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        questionNumber: 1,
        prompt: 'Berapakah hasil dari 7 + 5 = ?',
        speechPrompt: 'Tujuh ditambah lima sama dengan berapa?',
        itemsVisual: [
          { emoji: '🌟', count: 7, label: '7 Bintang' },
          { emoji: '🌟', count: 5, label: '5 Bintang' }
        ],
        options: [
          { id: 'opt-a', text: '11', isCorrect: false },
          { id: 'opt-b', text: '12', isCorrect: true },
          { id: 'opt-c', text: '13', isCorrect: false },
          { id: 'opt-d', text: '14', isCorrect: false }
        ],
        explanation: 'Benar! 7 + 5 = 12.'
      }
    ]
  },
  {
    id: 'mod-pengurangan-ceria-1-20',
    subjectId: 'matematika',
    gradeId: 'sd-1',
    order: 3,
    title: 'Pengurangan Ceria sampai 20',
    shortDesc: 'Ketahui sisa benda saat diambil, dimakan, atau terbang pergi!',
    fullDesc: 'Fase A Kelas 1: Memahami konsep pengurangan sebagai mengambil sebagian dari himpunan, menghitung sisa benda, dan operasi hitung 1-20.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Pengurangan Bilangan 1-20 & Sisa Benda',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '➖',
    themeColor: 'from-[#64B5F6] to-[#2196F3]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['SD 1', 'Pengurangan', 'Sisa Benda'],
    badgeReward: {
      id: 'badge_pakar_kurang',
      name: 'Pakar Pengurangan',
      description: 'Kuasai pengurangan matematika dasar 1-20.',
      emoji: '🎯',
      category: 'math'
    },
    steps: [
      {
        id: 'step-3-1',
        title: 'Konsep Pengurangan: Mengambil Benda',
        subtitle: '8 Permen diambil 3',
        type: 'subtraction_visual',
        prompt: 'Sentuh permen untuk melihat sisa permen yang tersisa!',
        speechText: 'Pengurangan artinya benda berkurang atau diambil.',
        interactiveData: {
          itemsA: { emoji: '🍬', count: 8, label: '8 Permen' },
          itemsB: { emoji: '🍬', count: 3, label: '3 Diambil' },
          operator: '-'
        }
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        questionNumber: 1,
        prompt: '10 balon gas 🎈 terbang 4 buah. Berapa sisa balon yang masih dipegang?',
        speechPrompt: 'Sepuluh balon diambil empat balon, tersisa berapa?',
        equationVisual: '10 - 4 = ?',
        options: [
          { id: 'opt-a', text: '5 Balon', isCorrect: false },
          { id: 'opt-b', text: '6 Balon', isCorrect: true },
          { id: 'opt-c', text: '7 Balon', isCorrect: false }
        ],
        explanation: 'Benar! 10 - 4 = 6 balon.'
      }
    ]
  },
  {
    id: 'mod-calistung-huruf-vokal',
    subjectId: 'calistung',
    gradeId: 'sd-1',
    order: 1,
    title: 'Mengenal 5 Huruf Vokal (A, I, U, E, O)',
    shortDesc: 'Ayo bunyikan huruf vokal A-I-U-E-O bersama hewan-hewan lucu!',
    fullDesc: 'Fase A Kelas 1: Belajar bentuk dan bunyi 5 huruf vokal utama dalam bahasa Indonesia dengan contoh kata visual dan pelafalan ceria.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Fonik Huruf Vokal & Ejaan Kata Benda',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🔤',
    themeColor: 'from-[#64B5F6] to-[#42A5F5]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['SD 1', 'Huruf Vokal', 'Membaca Dasar', 'A I U E O'],
    badgeReward: {
      id: 'badge_jago_vokal',
      name: 'Bintang Huruf Vokal',
      description: 'Luar biasa! Kamu sudah hafal 5 huruf vokal A I U E O!',
      emoji: '🔤',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-vokal-1',
        title: 'Huruf A - Apel & Ayam',
        subtitle: 'Buka mulut lebar-lebar: AAAA!',
        type: 'interactive_counter',
        prompt: 'Sentuh huruf A dan buah apel untuk mendengarkan bunyinya!',
        speechText: 'Huruf A! A untuk Apel dan Ayam. Buka mulut lebar-lebar dan ucapkan: AAAA!',
        interactiveData: {
          initialCount: 0,
          targetCount: 3,
          emoji: '🍎',
          itemLabel: 'Apel',
          interactiveType: 'tap_to_count'
        }
      }
    ],
    quiz: [
      {
        id: 'qv-1',
        questionNumber: 1,
        prompt: 'Huruf vokal apakah yang mengawali kata "A-P-E-L" 🍎?',
        speechPrompt: 'Huruf vokal apakah yang mengawali kata Apel?',
        itemsVisual: [{ emoji: '🍎', count: 1, label: 'Apel' }],
        options: [
          { id: 'opt-a', text: 'Huruf A', isCorrect: true },
          { id: 'opt-b', text: 'Huruf I', isCorrect: false },
          { id: 'opt-c', text: 'Huruf U', isCorrect: false },
          { id: 'opt-d', text: 'Huruf O', isCorrect: false }
        ],
        explanation: 'Benar! Kata "Apel" diawali dengan huruf vokal A.'
      }
    ]
  },
  {
    id: 'mod-ipa-pancaindra',
    subjectId: 'ipa_alam',
    gradeId: 'sd-1',
    order: 1,
    title: 'Mengenal 5 Pancaindra Tubuh Kita',
    shortDesc: 'Mata untuk melihat, telinga mendengar, hidung mencium, lidah mengecap, kulit meraba!',
    fullDesc: 'Fase A Kelas 1: Pelajari fungsi 5 indra manusia dan cara merawatnya agar tubuh tetap sehat dan bugar.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Pancaindra & Kebersihan Tubuh',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '👀',
    themeColor: 'from-[#81C784] to-[#66BB6A]',
    themeBg: 'bg-[#E8F5E9] border-[#A5D6A7]',
    themeBorder: 'border-[#A5D6A7]',
    tags: ['SD 1', 'Pancaindra', 'Tubuh Sehat', 'Sains Cilik'],
    badgeReward: {
      id: 'badge_detektif_sains',
      name: 'Detektif Sains Cilik',
      description: 'Hebat! Kamu telah memahami 5 pancaindra tubuh kita!',
      emoji: '🔬',
      category: 'science'
    },
    steps: [
      {
        id: 'step-indra-1',
        title: 'Mata & Telinga',
        subtitle: 'Melihat warna pelangi & mendengar musik merdu',
        type: 'story',
        prompt: 'Mata 👀 digunakan untuk melihat. Telinga 👂 digunakan untuk mendengar.',
        speechText: 'Mata untuk melihat keindahan sekitar. Telinga untuk mendengar suara merdu.'
      }
    ],
    quiz: [
      {
        id: 'q-indra-1',
        questionNumber: 1,
        prompt: 'Indra apakah yang kita gunakan untuk melihat pelangi 🌈 di langit?',
        speechPrompt: 'Indra apakah yang kita gunakan untuk melihat pelangi di langit?',
        options: [
          { id: 'opt-a', text: 'Mata 👀', isCorrect: true },
          { id: 'opt-b', text: 'Telinga 👂', isCorrect: false },
          { id: 'opt-c', text: 'Hidung 👃', isCorrect: false }
        ],
        explanation: 'Benar! Mata adalah indra penglihatan.'
      }
    ]
  },
  {
    id: 'mod-karakter-4-kata-ajaib',
    subjectId: 'karakter',
    gradeId: 'sd-1',
    order: 1,
    title: '4 Kata Ajaib: Tolong, Maaf, Terima Kasih, Permisi',
    shortDesc: 'Pelajari kekuatan sopan santun dalam pergaulan sehari-hari di rumah dan sekolah!',
    fullDesc: 'Fase A Kelas 1: Menumbuhkan kebiasaan bertutur kata santun dan menghargai sesama dengan 4 kata ajaib yang dicintai semua orang.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Pendidikan Karakter & Sopan Santun',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '✨',
    themeColor: 'from-[#F48FB1] to-[#EC407A]',
    themeBg: 'bg-[#FCE4EC] border-[#F48FB1]',
    themeBorder: 'border-[#F48FB1]',
    tags: ['SD 1', 'Sopan Santun', 'Budi Pekerti', '4 Kata Ajaib'],
    badgeReward: {
      id: 'badge_budi_pekerti',
      name: 'Pahlawan 4 Kata Ajaib',
      description: 'Hebat! Kamu anak yang sopan, santun, dan selalu menghargai teman!',
      emoji: '🌟',
      category: 'character'
    },
    steps: [
      {
        id: 'step-karakter-1',
        title: 'Kata Ajaib: TOLONG & TERIMA KASIH',
        subtitle: 'Saat butuh bantuan dan saat menerima kebaikan',
        type: 'story',
        prompt: 'Ucapkan "TOLONG" saat meminta bantuan dan "TERIMA KASIH" saat menerima bantuan! 🎁',
        speechText: 'Ucapkan Tolong dengan suara lembut saat membutuhkan bantuan. Dan jangan lupa ucapkan Terima Kasih!'
      }
    ],
    quiz: [
      {
        id: 'qk-1',
        questionNumber: 1,
        prompt: 'Apa yang harus kita ucapkan setelah diberi hadiah ulang tahun 🎁 oleh teman?',
        speechPrompt: 'Apa yang harus kita ucapkan setelah menerima hadiah?',
        options: [
          { id: 'opt-a', text: 'Terima Kasih 🙏', isCorrect: true },
          { id: 'opt-b', text: 'Minta Maaf', isCorrect: false },
          { id: 'opt-c', text: 'Diam saja', isCorrect: false }
        ],
        explanation: 'Benar! Selalu ucapkan terima kasih saat menerima kebaikan.'
      }
    ]
  },

  // =========================================================================
  // ============================ 4. SD KELAS 2 (7-8 THN) ====================
  // =========================================================================
  {
    id: 'mod-sd2-penjumlahan-puluhan',
    subjectId: 'matematika',
    gradeId: 'sd-2',
    order: 1,
    title: 'Penjumlahan 2 Digit & Nilai Tempat Puluhan',
    shortDesc: 'Menghitung bilangan cacah 1-100 dengan nilai tempat puluhan & satuan!',
    fullDesc: 'Fase A Kelas 2: Menguasai nilai tempat (Puluhan & Satuan) pada bilangan cacah hingga 100, penjumlahan bersusun, serta penyelesaian masalah kontekstual.',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Nilai Tempat Puluhan & Satuan, Penjumlahan Bersusun',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '➕',
    themeColor: 'from-[#81C784] to-[#388E3C]',
    themeBg: 'bg-[#E8F5E9] border-[#A5D6A7]',
    themeBorder: 'border-[#A5D6A7]',
    tags: ['SD 2', 'Nilai Tempat', 'Puluhan Satuan', 'Penjumlahan 2 Digit'],
    badgeReward: {
      id: 'badge_sd2_ahli_puluhan',
      name: 'Pakar Puluhan SD 2',
      description: 'Luar biasa! Kamu menguasai penjumlahan 2 digit dan nilai tempat!',
      emoji: '📘',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd2-m1',
        title: 'Mengenal Nilai Tempat: 47 = 4 Puluhan (40) + 7 Satuan (7)',
        subtitle: 'Memisahkan puluhan dan satuan',
        type: 'story',
        prompt: 'Pada bilangan 47, angka 4 bernilai 40 (4 Puluhan) dan angka 7 bernilai 7 (7 Satuan).',
        speechText: 'Bilangan dua digit terdiri dari puluhan dan satuan. Empat puluh tujuh tersusun dari empat puluh ditambah tujuh!',
        interactiveData: {
          itemsA: { emoji: '📦', count: 4, label: '4 Kotak Puluhan (40)' },
          itemsB: { emoji: '📦', count: 7, label: '7 Satuan (7)' },
          operator: '+'
        }
      }
    ],
    quiz: [
      {
        id: 'q-sd2-m1',
        questionNumber: 1,
        prompt: 'Berapakah nilai tempat angka 7 pada bilangan 75?',
        speechPrompt: 'Berapakah nilai tempat angka 7 pada bilangan 75?',
        equationVisual: '75 = [ ? ] + 5',
        options: [
          { id: 'opt-a', text: '7 Puluhan (70)', isCorrect: true },
          { id: 'opt-b', text: '7 Satuan (7)', isCorrect: false },
          { id: 'opt-c', text: '7 Ratusan (700)', isCorrect: false },
          { id: 'opt-d', text: '5 Puluhan (50)', isCorrect: false }
        ],
        explanation: 'Benar! Angka 7 menempati posisi puluhan sehingga bernilai 70.'
      },
      {
        id: 'q-sd2-m2',
        questionNumber: 2,
        prompt: 'Berapakah hasil dari 34 + 25 = ?',
        speechPrompt: 'Tiga puluh empat ditambah dua puluh lima sama dengan berapa?',
        equationVisual: '34 + 25 = ?',
        options: [
          { id: 'opt-a', text: '59', isCorrect: true },
          { id: 'opt-b', text: '69', isCorrect: false },
          { id: 'opt-c', text: '58', isCorrect: false },
          { id: 'opt-d', text: '55', isCorrect: false }
        ],
        explanation: 'Pintar! Satuan: 4 + 5 = 9. Puluhan: 30 + 20 = 50. Total = 59.'
      },
      {
        id: 'q-sd2-m3',
        questionNumber: 3,
        prompt: 'Ibu membeli 50 butir telur 🥚. Sebanyak 18 butir dimasak untuk sarapan. Berapa butir telur yang tersisa?',
        speechPrompt: 'Lima puluh dikurangi delapan belas sama dengan berapa?',
        equationVisual: '50 - 18 = ?',
        options: [
          { id: 'opt-a', text: '32 Butir', isCorrect: true },
          { id: 'opt-b', text: '38 Butir', isCorrect: false },
          { id: 'opt-c', text: '42 Butir', isCorrect: false },
          { id: 'opt-d', text: '28 Butir', isCorrect: false }
        ],
        explanation: 'Hebat! 50 - 18 = 32 butir telur.'
      }
    ]
  },
  {
    id: 'mod-sd2-konsep-perkalian',
    subjectId: 'matematika',
    gradeId: 'sd-2',
    order: 2,
    title: 'Konsep Perkalian: Penjumlahan Berulang & Pecahan 1/2',
    shortDesc: '3 x 4 sama dengan 4 + 4 + 4 = 12! Kenali juga setengah potongan kue!',
    fullDesc: 'Fase A Kelas 2: Pengenalan konsep perkalian dasar sebagai penjumlahan berulang objek yang sama serta konsep pecahan sederhana 1/2 dan 1/4.',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Perkalian Penjumlahan Berulang & Pecahan Sederhana',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '✖️',
    themeColor: 'from-[#FFB74D] to-[#F57C00]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['SD 2', 'Perkalian Dasar', 'Penjumlahan Berulang', 'Pecahan Setengah'],
    badgeReward: {
      id: 'badge_sd2_perkalian_kilat',
      name: 'Bintang Perkalian Dasar',
      description: 'Memahami konsep perkalian penjumlahan berulang dengan hebat!',
      emoji: '⭐',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd2-k1',
        title: '3 Kelompok @ 4 Apel: 3 x 4 = 4 + 4 + 4 = 12',
        subtitle: 'Perkalian adalah penjumlahan berulang',
        type: 'story',
        prompt: 'Ada 3 piring 🍽️. Setiap piring berisi 4 buah apel 🍎. Total apel = 4 + 4 + 4 = 12 apel!',
        speechText: 'Perkalian adalah cara cepat menghitung kelompok benda yang jumlahnya sama. Tiga dikali empat artinya empat ditambah empat ditambah empat, hasilnya dua belas!'
      }
    ],
    quiz: [
      {
        id: 'q-sd2-k1',
        questionNumber: 1,
        prompt: 'Bentuk penjumlahan berulang dari perkalian "4 x 3" adalah?',
        speechPrompt: 'Bentuk penjumlahan berulang dari perkalian 4 dikali 3 adalah?',
        equationVisual: '4 x 3 = ?',
        options: [
          { id: 'opt-a', text: '3 + 3 + 3 + 3 (Jumlah = 12)', isCorrect: true },
          { id: 'opt-b', text: '4 + 3', isCorrect: false },
          { id: 'opt-c', text: '4 + 4 + 4 + 4', isCorrect: false }
        ],
        explanation: 'Benar! 4 x 3 artinya angka 3 dijumlahkan sebanyak 4 kali.'
      },
      {
        id: 'q-sd2-k2',
        questionNumber: 2,
        prompt: 'Sebuah semangka 🍉 dipotong menjadi 2 bagian sama besar. Satu bagian semangka bernilai pecahan?',
        speechPrompt: 'Satu bagian dari dua bagian semangka bernilai pecahan berapa?',
        options: [
          { id: 'opt-a', text: '1/2 (Setengah)', isCorrect: true },
          { id: 'opt-b', text: '1/4 (Seperempat)', isCorrect: false },
          { id: 'opt-c', text: '2/1', isCorrect: false }
        ],
        explanation: 'Pintar! 1 dari 2 bagian bernilai satu per dua (1/2).'
      }
    ]
  },
  {
    id: 'mod-sd2-wujud-benda',
    subjectId: 'ipa_alam',
    gradeId: 'sd-2',
    order: 1,
    title: '3 Wujud Benda: Padat, Cair, Gas & Perubahannya',
    shortDesc: 'Batu yang keras, air yang mengalir, dan udara yang kita hirup!',
    fullDesc: 'Fase A Kelas 2: Mengidentifikasi karakteristik 3 wujud benda (padat, cair, gas) di lingkungan sekitar serta peristiwa perubahan wujud seperti mencair dan membeku.',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Karakteristik Wujud Zat & Perubahan Fisika Sederhana',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🧊',
    themeColor: 'from-[#4FC3F7] to-[#0288D1]',
    themeBg: 'bg-[#E1F5FE] border-[#81D4FA]',
    themeBorder: 'border-[#81D4FA]',
    tags: ['SD 2', 'Padat Cair Gas', 'Mencair Membeku', 'IPAS'],
    badgeReward: {
      id: 'badge_sd2_ilmuwan_cilik',
      name: 'Peneliti Zat Cilik',
      description: 'Memahami wujud benda padat, cair, gas dan perubahannya!',
      emoji: '🔬',
      category: 'science'
    },
    steps: [
      {
        id: 'step-sd2-w1',
        title: 'Ciri-Ciri Benda Padat, Cair, dan Gas',
        subtitle: 'Bentuk tetap vs mengikuti wadah',
        type: 'story',
        prompt: 'Benda padat (buku, batu) bentuknya tetap. Benda cair (air, sirup) bentuknya berubah mengikuti wadah!',
        speechText: 'Benda padat bentuknya selalu tetap. Benda cair mengalir dan bentuknya mengikuti bentuk wadahnya.'
      }
    ],
    quiz: [
      {
        id: 'q-sd2-w1',
        questionNumber: 1,
        prompt: 'Benda di bawah ini yang termasuk wujud BENDA CAIR adalah?',
        speechPrompt: 'Manakah yang termasuk benda cair?',
        options: [
          { id: 'opt-a', text: 'Minyak goreng & Air susu 🥛', isCorrect: true },
          { id: 'opt-b', text: 'Pensil & Buku tulis ✏️', isCorrect: false },
          { id: 'opt-c', text: 'Meja kayu', isCorrect: false },
          { id: 'opt-d', text: 'Batu kerikil', isCorrect: false }
        ],
        explanation: 'Benar! Minyak goreng dan susu berwujud cair.'
      },
      {
        id: 'q-sd2-w2',
        questionNumber: 2,
        prompt: 'Es batu 🧊 yang diletakkan di tempat terbuka terkena sinar matahari akan berubah menjadi air 💧. Peristiwa ini disebut?',
        speechPrompt: 'Perubahan es batu menjadi air disebut apa?',
        options: [
          { id: 'opt-a', text: 'Mencair (Melebur)', isCorrect: true },
          { id: 'opt-b', text: 'Membeku', isCorrect: false },
          { id: 'opt-c', text: 'Menguap', isCorrect: false },
          { id: 'opt-d', text: 'Mengembun', isCorrect: false }
        ],
        explanation: 'Pintar! Perubahan padat menjadi cair disebut mencair.'
      }
    ]
  },
  {
    id: 'mod-sd2-rukun-musyawarah',
    subjectId: 'karakter',
    gradeId: 'sd-2',
    order: 1,
    title: 'Hidup Rukun & Musyawarah Kelas',
    shortDesc: 'Menghargai keberagaman teman dan bermusyawarah memilih ketua kelas!',
    fullDesc: 'Fase A Kelas 2: Mengamalkan sikap toleransi terhadap perbedaan teman di sekolah serta membiasakan diri bermusyawarah untuk mufakat.',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Toleransi Perbedaan, Musyawarah & Gotong Royong',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '🤝',
    themeColor: 'from-[#EC407A] to-[#C2185B]',
    themeBg: 'bg-[#FCE4EC] border-[#F48FB1]',
    themeBorder: 'border-[#F48FB1]',
    tags: ['SD 2', 'Hidup Rukun', 'Musyawarah', 'Pancasila'],
    badgeReward: {
      id: 'badge_sd2_teladan_rukun',
      name: 'Bintang Kerukunan SD 2',
      description: 'Selalu menjaga kerukunan dan menghargai teman!',
      emoji: '🌟',
      category: 'character'
    },
    steps: [
      {
        id: 'step-sd2-r1',
        title: 'Musyawarah Memilih Regu Piket Kebersihan',
        subtitle: 'Mendengarkan pendapat bersama',
        type: 'story',
        prompt: 'Saat memilih regu piket kelas, kita bermusyawarah dan saling menghargai pendapat teman.',
        speechText: 'Musyawarah adalah berdiskusi bersama untuk mencapai keputusan yang baik bagi semua orang.'
      }
    ],
    quiz: [
      {
        id: 'q-sd2-r1',
        questionNumber: 1,
        prompt: 'Sikap yang baik ketika teman sedang menyampaikan pendapatnya di depan kelas adalah?',
        speechPrompt: 'Sikap kita saat teman berbicara di depan kelas adalah?',
        options: [
          { id: 'opt-a', text: 'Mendengarkan dengan tenang dan sopan 👂', isCorrect: true },
          { id: 'opt-b', text: 'Mengobrol sendiri dengan teman sebelah', isCorrect: false },
          { id: 'opt-c', text: 'Mengejek pendapat teman', isCorrect: false }
        ],
        explanation: 'Tepat! Menghargai teman yang berpendapat mencerminkan pengamalan Sila ke-4 Pancasila.'
      }
    ]
  },

  // =========================================================================
  // ============================ 5. SD KELAS 3 (8-9 THN) ====================
  // =========================================================================
  {
    id: 'mod-sd3-perkalian-pembagian',
    subjectId: 'matematika',
    gradeId: 'sd-3',
    order: 1,
    title: 'Perkalian & Pembagian sampai 100 serta Bilangan Cacah s.d 1.000',
    shortDesc: 'Kuasai perkalian tabel 1-10, pembagian pengurangan berulang, dan ribuan!',
    fullDesc: 'Fase B Kelas 3: Mengembangkan kemampuan operasi hitung perkalian dan pembagian bilangan cacah sampai 100, mengenal nilai tempat ratusan/ribuan (1.000), serta menyelesaikan soal cerita matematika terapan.',
    kurikulumFase: 'Fase B (SD Kelas 3)',
    kurikulumFokus: 'Operasi Perkalian, Pembagian & Bilangan Ribuan',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '➗',
    themeColor: 'from-[#42A5F5] to-[#1565C0]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['SD 3', 'Perkalian 1-100', 'Pembagian', 'Nilai Ribuan'],
    badgeReward: {
      id: 'badge_sd3_ahli_hitung',
      name: 'Master Hitung SD 3',
      description: 'Luar biasa! Kamu mahir perkalian dan pembagian sampai 100!',
      emoji: '🚀',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd3-m1',
        title: 'Pembagian sebagai Pengurangan Berulang: 24 : 6 = 4',
        subtitle: '24 dikurangi 6 sebanyak 4 kali sampai habis 0',
        type: 'story',
        prompt: '24 - 6 - 6 - 6 - 6 = 0. Ada 4 kali pengurangan dengan angka 6, jadi 24 : 6 = 4!',
        speechText: 'Pembagian adalah kebalikan dari perkalian. Dua puluh empat dibagi enam artinya dua puluh empat dikurangi enam secara berulang sampai habis, yaitu empat kali!'
      }
    ],
    quiz: [
      {
        id: 'q-sd3-m1',
        questionNumber: 1,
        prompt: 'Berapakah hasil perkalian dari 7 x 8 = ?',
        speechPrompt: 'Berapa hasil tujuh dikali delapan?',
        equationVisual: '7 x 8 = ?',
        options: [
          { id: 'opt-a', text: '56', isCorrect: true },
          { id: 'opt-b', text: '54', isCorrect: false },
          { id: 'opt-c', text: '64', isCorrect: false },
          { id: 'opt-d', text: '48', isCorrect: false }
        ],
        explanation: 'Benar sekali! 7 x 8 = 56.'
      },
      {
        id: 'q-sd3-m2',
        questionNumber: 2,
        prompt: 'Pak Budi membagikan 45 buah jeruk 🍊 sama rata kepada 5 anak. Setiap anak mendapat berapa buah jeruk?',
        speechPrompt: 'Empat puluh lima dibagi lima sama dengan berapa?',
        equationVisual: '45 : 5 = ?',
        options: [
          { id: 'opt-a', text: '9 Buah Jeruk', isCorrect: true },
          { id: 'opt-b', text: '8 Buah Jeruk', isCorrect: false },
          { id: 'opt-c', text: '7 Buah Jeruk', isCorrect: false },
          { id: 'opt-d', text: '10 Buah Jeruk', isCorrect: false }
        ],
        explanation: 'Tepat! 45 : 5 = 9 buah jeruk per anak.'
      },
      {
        id: 'q-sd3-m3',
        questionNumber: 3,
        prompt: 'Sebuah persegi memiliki panjang sisi 6 cm. Berapakah KELILING persegi tersebut?',
        speechPrompt: 'Berapakah keliling persegi dengan panjang sisi enam sentimeter?',
        equationVisual: 'Keliling = 4 x Sisi = 4 x 6 cm',
        options: [
          { id: 'opt-a', text: '24 cm', isCorrect: true },
          { id: 'opt-b', text: '36 cm', isCorrect: false },
          { id: 'opt-c', text: '18 cm', isCorrect: false },
          { id: 'opt-d', text: '12 cm', isCorrect: false }
        ],
        explanation: 'Pintar! Keliling persegi = 4 x sisi = 4 x 6 = 24 cm.'
      }
    ]
  },
  {
    id: 'mod-sd3-energi-perubahan',
    subjectId: 'ipa_alam',
    gradeId: 'sd-3',
    order: 1,
    title: 'Sumber Energi & Perubahannya di Sekitar Kita',
    shortDesc: 'Energi matahari, listrik menjadi panas pada setrika, dan hemat energi!',
    fullDesc: 'Fase B Kelas 3: Mengidentifikasi berbagai bentuk energi (panas, listrik, gerak, cahaya), sumber energi terbesar bumi (Matahari), dan perilaku hemat energi dalam kehidupan sehari-hari.',
    kurikulumFase: 'Fase B (SD Kelas 3)',
    kurikulumFokus: 'Bentuk & Perubahan Energi, Hemat Energi',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '⚡',
    themeColor: 'from-[#FFD54F] to-[#FF8F00]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['SD 3', 'Energi', 'Perubahan Energi', 'Matahari', 'IPAS'],
    badgeReward: {
      id: 'badge_sd3_pahlawan_energi',
      name: 'Pahlawan Hemat Energi',
      description: 'Memahami perubahan bentuk energi dan peduli hemat listrik!',
      emoji: '💡',
      category: 'science'
    },
    steps: [
      {
        id: 'step-sd3-e1',
        title: 'Matahari: Sumber Energi Terbesar di Bumi ☀️',
        subtitle: 'Menghasilkan panas dan cahaya alami',
        type: 'story',
        prompt: 'Matahari adalah sumber energi panas dan cahaya terbesar bagi bumi. Matahari membantu fotosintesis tumbuhan dan mengeringkan pakaian.',
        speechText: 'Matahari adalah sumber energi utama bagi kehidupan di bumi!'
      }
    ],
    quiz: [
      {
        id: 'q-sd3-e1',
        questionNumber: 1,
        prompt: 'Kipas angin 🌀 yang menyala memanfaatkan perubahan energi listrik menjadi energi?',
        speechPrompt: 'Kipas angin mengubah energi listrik menjadi energi apa?',
        options: [
          { id: 'opt-a', text: 'Energi Gerak', isCorrect: true },
          { id: 'opt-b', text: 'Energi Panas', isCorrect: false },
          { id: 'opt-c', text: 'Energi Kimia', isCorrect: false },
          { id: 'opt-d', text: 'Energi Bunyi saja', isCorrect: false }
        ],
        explanation: 'Benar! Kipas angin mengubah energi listrik menjadi energi gerak.'
      },
      {
        id: 'q-sd3-e2',
        questionNumber: 2,
        prompt: 'Manakah tindakan di bawah ini yang mencerminkan perilaku MENGHEMAT ENERGI listrik di rumah?',
        speechPrompt: 'Manakah perilaku menghemat energi listrik di rumah?',
        options: [
          { id: 'opt-a', text: 'Mematikan lampu kamar saat siang hari yang terang 💡', isCorrect: true },
          { id: 'opt-b', text: 'Membiarkan televisi menyala saat tidur', isCorrect: false },
          { id: 'opt-c', text: 'Menyalakan AC saat jendela terbuka lebar', isCorrect: false }
        ],
        explanation: 'Tepat! Mematikan lampu saat tidak digunakan menghemat energi bumi.'
      }
    ]
  },
  {
    id: 'mod-sd3-hak-kewajiban',
    subjectId: 'karakter',
    gradeId: 'sd-3',
    order: 1,
    title: 'Hak & Kewajiban Anak di Rumah dan Sekolah',
    shortDesc: 'Hak mendapat kasih sayang dan pendidikan, kewajiban belajar dan membantu!',
    fullDesc: 'Fase B Kelas 3: Membedakan pengertian hak (sesuatu yang patut diterima) dan kewajiban (sesuatu yang harus dilaksanakan dengan penuh tanggung jawab) sebagai anggota keluarga dan warga sekolah.',
    kurikulumFase: 'Fase B (SD Kelas 3)',
    kurikulumFokus: 'Pendidikan Pancasila: Hak & Kewajiban Seimbang',
    estimatedMinutes: 5,
    starsReward: 15,
    coverEmoji: '⚖️',
    themeColor: 'from-[#81C784] to-[#2E7D32]',
    themeBg: 'bg-[#E8F5E9] border-[#A5D6A7]',
    themeBorder: 'border-[#A5D6A7]',
    tags: ['SD 3', 'Hak dan Kewajiban', 'Tanggung Jawab', 'Pancasila'],
    badgeReward: {
      id: 'badge_sd3_warga_teladan',
      name: 'Siswa Berintegritas',
      description: 'Menjalankan kewajiban belajar dan menghormati hak sesama!',
      emoji: '🏅',
      category: 'character'
    },
    steps: [
      {
        id: 'step-sd3-h1',
        title: 'Keseimbangan Hak dan Kewajiban',
        subtitle: 'Laksanakan kewajiban sebelum menuntut hak',
        type: 'story',
        prompt: 'Hak kita di sekolah adalah mendapatkan ilmu dan pelajaran. Kewajiban kita adalah belajar dengan sungguh-sungguh dan mematuhi tata tertib sekolah.',
        speechText: 'Hak dan kewajiban harus dilaksanakan secara seimbang dan bertanggung jawab.'
      }
    ],
    quiz: [
      {
        id: 'q-sd3-h1',
        questionNumber: 1,
        prompt: 'Manakah di bawah ini yang merupakan contoh KEWAJIBAN siswa di sekolah?',
        speechPrompt: 'Manakah yang merupakan kewajiban siswa di sekolah?',
        options: [
          { id: 'opt-a', text: 'Mengikuti upacara bendera dan menjaga kebersihan kelas 🧹', isCorrect: true },
          { id: 'opt-b', text: 'Mendapatkan nilai rapor', isCorrect: false },
          { id: 'opt-c', text: 'Menggunakan fasilitas perpustakaan', isCorrect: false }
        ],
        explanation: 'Benar! Menjaga kebersihan dan mematuhi tata tertib adalah kewajiban siswa.'
      }
    ]
  },

  // =========================================================================
  // ============================ 6. SD KELAS 4-6 (9-12 THN) =================
  // =========================================================================
  {
    id: 'mod-sd46-operasi-campuran-fpb-kpk',
    subjectId: 'matematika',
    gradeId: 'sd-4-6',
    order: 1,
    title: 'Operasi Hitung Campuran, KPK, FPB & Desimal',
    shortDesc: 'Aturan Kabataku, mencari kelipatan persekutuan, faktor terbesar, dan persen!',
    fullDesc: 'Fase B & C (Kelas 4-6): Menyelesaikan operasi hitung campuran (Kabataku), menentukan KPK dan FPB dengan pohon faktor/faktorisasi prima, serta konversi pecahan biasa, desimal, dan persentase.',
    kurikulumFase: 'Fase B & C (SD Kelas 4-6)',
    kurikulumFokus: 'Operasi Campuran (Kabataku), KPK & FPB, Pecahan Desimal',
    estimatedMinutes: 7,
    starsReward: 25,
    coverEmoji: '📐',
    themeColor: 'from-[#AB47BC] to-[#7B1FA2]',
    themeBg: 'bg-[#F3E5F5] border-[#CE93D8]',
    themeBorder: 'border-[#CE93D8]',
    tags: ['SD 4-6', 'Kabataku', 'KPK FPB', 'Pecahan Desimal', 'Persentase'],
    badgeReward: {
      id: 'badge_sd46_master_matematika',
      name: 'Cendekia Matematika Tingkat Lanjut',
      description: 'Luar biasa! Menguasai operasi campuran, KPK/FPB, dan pecahan!',
      emoji: '🏆',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd46-m1',
        title: 'Aturan Hierarki Operasi Hitung Campuran (Kabataku)',
        subtitle: 'Kali & Bagi LEBIH KUAT daripada Tambah & Kurang',
        type: 'story',
        prompt: 'Contoh: 25 + 15 x 2. Kerjakan PERKALIAN terlebih dahulu: 15 x 2 = 30. Lalu jumlahkan: 25 + 30 = 55!',
        speechText: 'Ingat prinsip Kabataku: Kali dan Bagi harus dihitung terlebih dahulu sebelum Tambah dan Kurang!'
      }
    ],
    quiz: [
      {
        id: 'q-sd46-m1',
        questionNumber: 1,
        prompt: 'Berapakah hasil dari operasi hitung: 30 + 20 x 4 = ?',
        speechPrompt: 'Berapa hasil tiga puluh ditambah dua puluh dikali empat?',
        equationVisual: '30 + (20 x 4) = ?',
        options: [
          { id: 'opt-a', text: '110 (Perkalian dulu: 20x4=80; 30+80=110)', isCorrect: true },
          { id: 'opt-b', text: '200', isCorrect: false },
          { id: 'opt-c', text: '90', isCorrect: false },
          { id: 'opt-d', text: '150', isCorrect: false }
        ],
        explanation: 'Benar! Utamakan perkalian: 20 x 4 = 80, kemudian 30 + 80 = 110.'
      },
      {
        id: 'q-sd46-m2',
        questionNumber: 2,
        prompt: 'Kelipatan Persekutuan Terkecil (KPK) dari bilangan 6 dan 8 adalah?',
        speechPrompt: 'Berapakah KPK dari bilangan 6 dan 8?',
        options: [
          { id: 'opt-a', text: '24', isCorrect: true },
          { id: 'opt-b', text: '48', isCorrect: false },
          { id: 'opt-c', text: '16', isCorrect: false },
          { id: 'opt-d', text: '12', isCorrect: false }
        ],
        explanation: 'Pintar! Kelipatan 6: 6, 12, 18, 24... Kelipatan 8: 8, 16, 24... KPK = 24.'
      },
      {
        id: 'q-sd46-m3',
        questionNumber: 3,
        prompt: 'Bentuk desimal dari pecahan 3/4 adalah?',
        speechPrompt: 'Bentuk desimal dari pecahan tiga per empat adalah?',
        equationVisual: '3/4 = ?',
        options: [
          { id: 'opt-a', text: '0,75 (atau 75%)', isCorrect: true },
          { id: 'opt-b', text: '0,34', isCorrect: false },
          { id: 'opt-c', text: '0,50', isCorrect: false },
          { id: 'opt-d', text: '0,25', isCorrect: false }
        ],
        explanation: 'Hebat! 3/4 = 75/100 = 0,75.'
      },
      {
        id: 'q-sd46-m4',
        questionNumber: 4,
        prompt: 'Hitunglah LUAS SEGITIGA yang memiliki panjang alas 10 cm dan tinggi 6 cm!',
        speechPrompt: 'Berapakah luas segitiga dengan alas sepuluh sentimeter dan tinggi enam sentimeter?',
        equationVisual: 'Luas = 1/2 x Alas x Tinggi = 1/2 x 10 x 6',
        options: [
          { id: 'opt-a', text: '30 cm²', isCorrect: true },
          { id: 'opt-b', text: '60 cm²', isCorrect: false },
          { id: 'opt-c', text: '16 cm²', isCorrect: false },
          { id: 'opt-d', text: '45 cm²', isCorrect: false }
        ],
        explanation: 'Luar biasa! Luas segitiga = 1/2 x 10 x 6 = 30 cm².'
      }
    ]
  },
  {
    id: 'mod-sd46-fakta-opini-gagasan',
    subjectId: 'calistung',
    gradeId: 'sd-4-6',
    order: 1,
    title: 'Literasi Kritis: Fakta vs Opini & Kalimat Efektif',
    shortDesc: 'Bedakan informasi nyata berbasis bukti dengan pendapat subjektif!',
    fullDesc: 'Fase B & C (Kelas 4-6): Mengembangkan kemampuan berpikir kritis membedakan kalimat fakta vs kalimat opini, menemukan gagasan utama paragraf, dan menggunakan kata baku sesuai KBBI.',
    kurikulumFase: 'Fase B & C (SD Kelas 4-6)',
    kurikulumFokus: 'Fakta vs Opini, Teks Eksplanasi & Kosakata Baku',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '📰',
    themeColor: 'from-[#1E88E5] to-[#1565C0]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['SD 4-6', 'Fakta vs Opini', 'Literasi Kritis', 'Kata Baku'],
    badgeReward: {
      id: 'badge_sd46_jurnalis_cilik',
      name: 'Detektif Literasi Kritis',
      description: 'Mampu membedakan fakta dan opini dengan tepat!',
      emoji: '✍️',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-sd46-l1',
        title: 'Ciri Kalimat Fakta vs Opini',
        subtitle: 'Fakta dapat dibuktikan kebenarannya, Opini adalah pendapat',
        type: 'story',
        prompt: 'Fakta: "Matahari terbit di sebelah timur." Opini: "Es krim rasa cokelat adalah es krim paling enak di dunia."',
        speechText: 'Fakta adalah peristiwa nyata yang didukung bukti. Opini adalah pandangan pribadi seseorang.'
      }
    ],
    quiz: [
      {
        id: 'q-sd46-l1',
        questionNumber: 1,
        prompt: 'Manakah di bawah ini yang merupakan contoh kalimat FAKTA?',
        speechPrompt: 'Manakah yang merupakan kalimat fakta?',
        options: [
          { id: 'opt-a', text: 'Indonesia memproklamasikan kemerdekaan pada tanggal 17 Agustus 1945 🇮🇩', isCorrect: true },
          { id: 'opt-b', text: 'Matematika adalah pelajaran yang paling membosankan', isCorrect: false },
          { id: 'opt-c', text: 'Bunga mawar lebih harum daripada semua bunga lain', isCorrect: false },
          { id: 'opt-d', text: 'Kucing berbulu oranye adalah kucing paling pintar', isCorrect: false }
        ],
        explanation: 'Benar! Tanggal kemerdekaan Indonesia adalah fakta sejarah yang pasti.'
      },
      {
        id: 'q-sd46-l2',
        questionNumber: 2,
        prompt: 'Penulisan kata baku yang BENAR menurut Kamus Besar Bahasa Indonesia (KBBI) adalah?',
        speechPrompt: 'Manakah penulisan kata baku yang benar?',
        options: [
          { id: 'opt-a', text: 'Praktik dan Izin', isCorrect: true },
          { id: 'opt-b', text: 'Praktek dan Ijin', isCorrect: false },
          { id: 'opt-c', text: 'Apotik dan Nasehat', isCorrect: false }
        ],
        explanation: 'Tepat! Kata baku adalah "Praktik" (bukan praktek) dan "Izin" (bukan ijin).'
      }
    ]
  },
  {
    id: 'mod-sd46-ekosistem-rantai-makanan',
    subjectId: 'ipa_alam',
    gradeId: 'sd-4-6',
    order: 1,
    title: 'Ekosistem, Rantai Makanan & Macam Gaya',
    shortDesc: 'Produsen, konsumen, pengurai, gaya gravitasi, gesek, dan magnet!',
    fullDesc: 'Fase B & C (Kelas 4-6): Memahami aliran energi pada rantai makanan ekosistem (produsen, konsumen I/II/III, dekomposer) serta pengaruh berbagai jenis gaya terhadap gerak dan bentuk benda.',
    kurikulumFase: 'Fase B & C (SD Kelas 4-6)',
    kurikulumFokus: 'Rantai Makanan, Aliran Energi & Macam-Macam Gaya',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '🦅',
    themeColor: 'from-[#43A047] to-[#2E7D32]',
    themeBg: 'bg-[#E8F5E9] border-[#A5D6A7]',
    themeBorder: 'border-[#A5D6A7]',
    tags: ['SD 4-6', 'Rantai Makanan', 'Ekosistem', 'Gaya Gravitasi', 'IPAS'],
    badgeReward: {
      id: 'badge_sd46_peneliti_ekosistem',
      name: 'Peneliti Ekosistem & Gaya',
      description: 'Memahami rantai makanan ekosistem dan gaya fisika terapan!',
      emoji: '🌿',
      category: 'science'
    },
    steps: [
      {
        id: 'step-sd46-s1',
        title: 'Rantai Makanan di Ekosistem Sawah',
        subtitle: 'Padi 🌾 -> Belalang 🦗 -> Katak 🐸 -> Ular 🐍 -> Elang 🦅',
        type: 'story',
        prompt: 'Padi adalah PRODUSEN karena membuat makanannya sendiri melalui fotosintesis. Belalang dan katak adalah KONSUMEN.',
        speechText: 'Dalam rantai makanan, energi berpindah dari produsen ke konsumen hingga akhirnya diurai oleh bakteri dan jamur pengurai.'
      }
    ],
    quiz: [
      {
        id: 'q-sd46-s1',
        questionNumber: 1,
        prompt: 'Organisme yang berperan sebagai PRODUSEN dalam rantai makanan adalah?',
        speechPrompt: 'Organisme yang berperan sebagai produsen adalah?',
        options: [
          { id: 'opt-a', text: 'Tumbuhan hijau / Padi yang berfotosintesis 🌾', isCorrect: true },
          { id: 'opt-b', text: 'Burung elang pemangsa', isCorrect: false },
          { id: 'opt-c', text: 'Singa pemakan daging', isCorrect: false },
          { id: 'opt-d', text: 'Ular sawah', isCorrect: false }
        ],
        explanation: 'Benar! Tumbuhan hijau adalah produsen karena menghasilkan makanannya sendiri.'
      },
      {
        id: 'q-sd46-s2',
        questionNumber: 2,
        prompt: 'Gaya apakah yang menyebabkan buah apel 🍎 jatuh dari pohon ke arah tanah bumi?',
        speechPrompt: 'Gaya apakah yang menyebabkan benda jatuh ke bawah bumi?',
        options: [
          { id: 'opt-a', text: 'Gaya Gravitasi Bumi', isCorrect: true },
          { id: 'opt-b', text: 'Gaya Gesek', isCorrect: false },
          { id: 'opt-c', text: 'Gaya Magnet', isCorrect: false },
          { id: 'opt-d', text: 'Gaya Pegas', isCorrect: false }
        ],
        explanation: 'Pintar! Gaya gravitasi bumi menarik semua benda menuju pusat bumi.'
      }
    ]
  },
  {
    id: 'mod-sd46-pengamalan-pancasila',
    subjectId: 'karakter',
    gradeId: 'sd-4-6',
    order: 1,
    title: 'Pengamalan 5 Sila Pancasila & Bhinneka Tunggal Ika',
    shortDesc: 'Menerapkan nilai-nilai luhur Pancasila dalam kehidupan bermasyarakat dan berbangsa!',
    fullDesc: 'Fase B & C (Kelas 4-6): Memahami makna lambang Garuda Pancasila, penerapan butir-butir Sila 1 sampai 5 dalam kehidupan sehari-hari, serta merawat persatuan dalam keberagaman suku, agama, dan budaya.',
    kurikulumFase: 'Fase B & C (SD Kelas 4-6)',
    kurikulumFokus: 'Pendidikan Pancasila: Nilai Luhur Sila 1-5 & Persatuan',
    estimatedMinutes: 6,
    starsReward: 20,
    coverEmoji: '🇮🇩',
    themeColor: 'from-[#E53935] to-[#B71C1C]',
    themeBg: 'bg-[#FFEBEE] border-[#FFCDD2]',
    themeBorder: 'border-[#FFCDD2]',
    tags: ['SD 4-6', 'Pancasila', 'Sila 1-5', 'Bhinneka Tunggal Ika'],
    badgeReward: {
      id: 'badge_sd46_duta_pancasila',
      name: 'Duta Garuda Pancasila',
      description: 'Mengamalkan nilai-nilai luhur Pancasila dengan bangga!',
      emoji: '🌟',
      category: 'character'
    },
    steps: [
      {
        id: 'step-sd46-p1',
        title: '5 Sila Dasar Negara Indonesia',
        subtitle: 'Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, Keadilan',
        type: 'story',
        prompt: 'Pancasila adalah panduan hidup bangsa Indonesia. Kita saling menghormati perbedaan agama (Sila 1) dan tolong menolong tanpa membedakan suku (Sila 2 & 3).',
        speechText: 'Garuda Pancasila adalah lambang negara kita. Mari kita amalkan nilai-nilai Pancasila dalam kehidupan sehari-hari.'
      }
    ],
    quiz: [
      {
        id: 'q-sd46-p1',
        questionNumber: 1,
        prompt: 'Menggalang donasi dan bantuan makanan untuk korban bencana alam merupakan pengamalan Pancasila sila ke?',
        speechPrompt: 'Membantu korban bencana alam merupakan pengamalan sila ke berapa?',
        options: [
          { id: 'opt-a', text: 'Sila ke-2 (Kemanusiaan yang Adil dan Beradab) 🤝', isCorrect: true },
          { id: 'opt-b', text: 'Sila ke-1', isCorrect: false },
          { id: 'opt-c', text: 'Sila ke-4', isCorrect: false }
        ],
        explanation: 'Benar! Menolong sesama manusia dengan kasih sayang mencerminkan pengamalan Sila ke-2.'
      },
      {
        id: 'q-sd46-p2',
        questionNumber: 2,
        prompt: 'Arti dari semboyan "Bhinneka Tunggal Ika" yang tertulis pada cengkeraman kaki Garuda Pancasila adalah?',
        speechPrompt: 'Apakah arti dari semboyan Bhinneka Tunggal Ika?',
        options: [
          { id: 'opt-a', text: 'Berbeda-beda tetapi tetap satu jua 🇮🇩', isCorrect: true },
          { id: 'opt-b', text: 'Bersatu kita teguh', isCorrect: false },
          { id: 'opt-c', text: 'Maju tak gentar membela yang benar', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Meskipun Indonesia memiliki beragam suku, bahasa, dan agama, kita tetap satu bangsa Indonesia.'
      }
    ]
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  ...NEW_CURRICULUM_MODULES,
  ...ENGLISH_LEARNING_MODULES,
  ...BASE_LEARNING_MODULES
];

export const ALL_BADGES = [
  // English Badges
  {
    id: 'badge_eng_alphabet_master',
    name: 'English Alphabet Star',
    description: 'Hafal abjad bahasa Inggris A-Z dan pintar bernyanyi lagu alfabet!',
    emoji: '🔤',
    category: 'english' as const
  },
  {
    id: 'badge_eng_number_star',
    name: 'Number Champion',
    description: 'Bisa berhitung 1 sampai 10 dalam bahasa Inggris!',
    emoji: '🔢',
    category: 'english' as const
  },
  {
    id: 'badge_eng_colors_artist',
    name: 'Rainbow Color Master',
    description: 'Pandai menyebutkan semua warna dalam bahasa Inggris!',
    emoji: '🎨',
    category: 'english' as const
  },
  {
    id: 'badge_eng_shapes_detective',
    name: 'Shape Detective',
    description: 'Bisa menemukan dan menyebutkan bentuk dalam bahasa Inggris!',
    emoji: '🔺',
    category: 'english' as const
  },
  {
    id: 'badge_eng_animal_friend',
    name: 'Animal Safari Friend',
    description: 'Hafal nama hewan-hewan dalam bahasa Inggris!',
    emoji: '🐾',
    category: 'english' as const
  },
  {
    id: 'badge_eng_family_love',
    name: 'Family Hero',
    description: 'Bisa memperkenalkan anggota keluarga dalam bahasa Inggris!',
    emoji: '💖',
    category: 'english' as const
  },
  {
    id: 'badge_eng_fruits_healthy',
    name: 'Healthy Food Star',
    description: 'Hafal nama buah dan sayuran bergizi dalam bahasa Inggris!',
    emoji: '🍉',
    category: 'english' as const
  },
  {
    id: 'badge_eng_body_expert',
    name: 'Body Parts Master',
    description: 'Hafal semua anggota tubuh dalam bahasa Inggris!',
    emoji: '💪',
    category: 'english' as const
  },
  {
    id: 'badge_eng_objects_smart',
    name: 'Smart Object Finder',
    description: 'Bisa menyebutkan nama benda di sekitar dalam bahasa Inggris!',
    emoji: '🎒',
    category: 'english' as const
  },
  {
    id: 'badge_eng_greetings_polite',
    name: 'Polite English Speaker',
    description: 'Anak sopan dan percaya diri menyapa dalam bahasa Inggris!',
    emoji: '🌟',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd1_star',
    name: 'Classroom Communicator',
    description: 'Percaya diri memperkenalkan diri dan memahami instruksi kelas!',
    emoji: '🏫',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd1_calendar',
    name: 'Calendar & Weather Explorer',
    description: 'Hafal nama hari dan macam-macam cuaca dalam bahasa Inggris!',
    emoji: '☀️',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd2_routine',
    name: 'Daily Routine Master',
    description: 'Bisa menceritakan rutinitas harian dalam bahasa Inggris!',
    emoji: '⏰',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd2_house',
    name: 'Home Architect',
    description: 'Bisa menyebutkan seluruh ruangan di rumah dalam bahasa Inggris!',
    emoji: '🏡',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd3_time',
    name: 'Master of Time',
    description: 'Bisa membaca jam dan mengatur jadwal dalam bahasa Inggris!',
    emoji: '⏱️',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd46_dream',
    name: 'Future Visionary',
    description: 'Bisa menceritakan cita-cita impian dalam bahasa Inggris!',
    emoji: '🚀',
    category: 'english' as const
  },
  {
    id: 'badge_eng_sd46_navigator',
    name: 'City Navigator',
    description: 'Bisa membaca peta dan memberi petunjuk arah dalam bahasa Inggris!',
    emoji: '🗺️',
    category: 'english' as const
  },

  // Math Badges
  {
    id: 'badge_paud_bintang_kecil',
    name: 'Bintang Cilik PAUD',
    description: 'Pandai berhitung membilang 1 sampai 5 konkret.',
    emoji: '🐣',
    category: 'math' as const
  },
  {
    id: 'badge_tk_juara_hitung',
    name: 'Bintang Hitung TK',
    description: 'Mahir membilang 1-10 dan membandingkan kuantitas objek.',
    emoji: '🎨',
    category: 'math' as const
  },
  {
    id: 'badge_bintang_hitung',
    name: 'Bintang Hitung 1-20',
    description: 'Selesaikan modul Mengenal Angka 1-20 dengan gemilang.',
    emoji: '🌟',
    category: 'math' as const
  },
  {
    id: 'badge_juara_tambah',
    name: 'Juara Penjumlahan',
    description: 'Kuasai penjumlahan matematika dasar 1-20.',
    emoji: '🏆',
    category: 'math' as const
  },
  {
    id: 'badge_pakar_kurang',
    name: 'Pakar Pengurangan',
    description: 'Kuasai pengurangan matematika dasar 1-20 dengan teliti.',
    emoji: '🎯',
    category: 'math' as const
  },
  {
    id: 'badge_sd2_ahli_puluhan',
    name: 'Pakar Puluhan SD 2',
    description: 'Menguasai nilai tempat puluhan dan penjumlahan 2 digit.',
    emoji: '📘',
    category: 'math' as const
  },
  {
    id: 'badge_sd2_perkalian_kilat',
    name: 'Bintang Perkalian Dasar',
    description: 'Memahami konsep perkalian penjumlahan berulang dan pecahan 1/2.',
    emoji: '⭐',
    category: 'math' as const
  },
  {
    id: 'badge_sd3_ahli_hitung',
    name: 'Master Hitung SD 3',
    description: 'Mahir operasi perkalian & pembagian s.d 100 dan keliling persegi.',
    emoji: '🚀',
    category: 'math' as const
  },
  {
    id: 'badge_sd46_master_matematika',
    name: 'Cendekia Matematika Tingkat Lanjut',
    description: 'Menguasai operasi campuran Kabataku, KPK, FPB, dan pecahan desimal.',
    emoji: '🏆',
    category: 'math' as const
  },

  // Calistung / Literasi Badges
  {
    id: 'badge_paud_celoteh_pintar',
    name: 'Bintang Celoteh Cilik',
    description: 'Menirukan suara hewan dan mengucapkan salam ramah.',
    emoji: '🐤',
    category: 'calistung' as const
  },
  {
    id: 'badge_tk_abjad_emas',
    name: 'Bintang Abjad TK',
    description: 'Mengenal simbol abjad A-Z dan bunyi awal benda.',
    emoji: '📚',
    category: 'calistung' as const
  },
  {
    id: 'badge_jago_vokal',
    name: 'Bintang Huruf Vokal',
    description: 'Hafal 5 huruf vokal utama A, I, U, E, O dengan baik.',
    emoji: '🔤',
    category: 'calistung' as const
  },
  {
    id: 'badge_jago_baca',
    name: 'Pintar Suku Kata',
    description: 'Mahir membaca suku kata Ba-Bi-Bu-Be-Bo.',
    emoji: '📖',
    category: 'calistung' as const
  },
  {
    id: 'badge_sd46_jurnalis_cilik',
    name: 'Detektif Literasi Kritis',
    description: 'Mampu membedakan fakta vs opini dan menggunakan kata baku.',
    emoji: '✍️',
    category: 'calistung' as const
  },

  // Science / IPAS Badges
  {
    id: 'badge_paud_sehat_ceria',
    name: 'Bintang Tubuh Sehat',
    description: 'Mengenal anggota tubuh utama dan warna alami.',
    emoji: '💪',
    category: 'science' as const
  },
  {
    id: 'badge_tk_penjelajah_alam',
    name: 'Penjelajah Langit TK',
    description: 'Memahami terangnya siang hari dan indahnya malam hari.',
    emoji: '🌙',
    category: 'science' as const
  },
  {
    id: 'badge_detektif_sains',
    name: 'Detektif Sains Cilik',
    description: 'Memahami 5 pancaindra tubuh kita dan fungsinya.',
    emoji: '🔬',
    category: 'science' as const
  },
  {
    id: 'badge_sahabat_alam',
    name: 'Sahabat Satwa & Alam',
    description: 'Mengenal tempat hidup hewan di darat, air, dan udara.',
    emoji: '🐾',
    category: 'science' as const
  },
  {
    id: 'badge_sd2_ilmuwan_cilik',
    name: 'Peneliti Zat Cilik',
    description: 'Memahami wujud padat, cair, gas dan perubahan wujudnya.',
    emoji: '🔬',
    category: 'science' as const
  },
  {
    id: 'badge_sd3_pahlawan_energi',
    name: 'Pahlawan Hemat Energi',
    description: 'Memahami sumber energi dan pentingnya hemat listrik.',
    emoji: '💡',
    category: 'science' as const
  },
  {
    id: 'badge_sd46_peneliti_ekosistem',
    name: 'Peneliti Ekosistem & Gaya',
    description: 'Memahami rantai makanan ekosistem dan gaya gravitasi.',
    emoji: '🌿',
    category: 'science' as const
  },

  // Character & Pancasila Badges
  {
    id: 'badge_paud_hati_hangat',
    name: 'Sahabat Ceria PAUD',
    description: 'Selalu tersenyum, menyayangi keluarga, dan merapikan mainan.',
    emoji: '💖',
    category: 'character' as const
  },
  {
    id: 'badge_tk_sahabat_terbaik',
    name: 'Sahabat Berhati Mulia',
    description: 'Suka berbagi mainan dan sabar mengantre giliran.',
    emoji: '💖',
    category: 'character' as const
  },
  {
    id: 'badge_budi_pekerti',
    name: 'Pahlawan 4 Kata Ajaib',
    description: 'Anak sopan yang selalu mengamalkan Tolong, Maaf, Terima Kasih, dan Permisi.',
    emoji: '🌟',
    category: 'character' as const
  },
  {
    id: 'badge_anak_mandiri',
    name: 'Bintang Mandiri & Rapih',
    description: 'Rajin merapikan mainan dan menyiapkan perlengkapan mandiri.',
    emoji: '🧹',
    category: 'character' as const
  },
  {
    id: 'badge_sd2_teladan_rukun',
    name: 'Bintang Kerukunan SD 2',
    description: 'Selalu menjaga kerukunan dan menghargai musyawarah di kelas.',
    emoji: '🌟',
    category: 'character' as const
  },
  {
    id: 'badge_sd3_warga_teladan',
    name: 'Siswa Berintegritas',
    description: 'Menjalankan kewajiban belajar dan menghormati hak sesama.',
    emoji: '🏅',
    category: 'character' as const
  },
  {
    id: 'badge_sd46_duta_pancasila',
    name: 'Duta Garuda Pancasila',
    description: 'Mengamalkan butir-butir Sila 1-5 Pancasila dengan bangga.',
    emoji: '🌟',
    category: 'character' as const
  },

  // Generic Mastery & Streaks
  {
    id: 'badge_rajin_belajar',
    name: 'Anak Rajin Bintang 5',
    description: 'Mengumpulkan lebih dari 50 bintang belajar!',
    emoji: '🚀',
    category: 'streak' as const
  },
  {
    id: 'badge_skor_sempurna',
    name: 'Cendekia Nilai 100',
    description: 'Mendapatkan nilai 100 sempurna pada kuis.',
    emoji: '👑',
    category: 'mastery' as const
  }
];
