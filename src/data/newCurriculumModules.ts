import { LearningModule } from '../types';

export const NEW_CURRICULUM_MODULES: LearningModule[] = [
  // =========================================================================
  // 1. TK - MENULIS DENGAN TRACING HURUF
  // =========================================================================
  {
    id: 'mod-tk-tracing-huruf',
    subjectId: 'menulis_tracing',
    gradeId: 'tk',
    order: 1,
    title: 'Tracing Huruf Vokal & Garis Pola (A, I, U, E, O)',
    shortDesc: 'Ayo belajar memegang pensil dan menebalkan huruf vokal A-I-U-E-O dengan kuas bintang!',
    fullDesc: 'Fase Fondasi TK: Melatih kemampuan motorik halus, koordinasi mata-tangan, kontrol pensil, dan orientasi arah goresan tracing huruf vokal bergaris putus-putus.',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Motorik Halus, Arah Goresan Huruf Vokal & Tracing Interaktif',
    estimatedMinutes: 5,
    starsReward: 20,
    coverEmoji: '✍️',
    themeColor: 'from-[#FFB74D] to-[#F57C00]',
    themeBg: 'bg-[#FFF3E0] border-[#FFCC80]',
    themeBorder: 'border-[#FFCC80]',
    tags: ['TK', 'Menulis Tracing', 'Huruf Vokal', 'Motorik Halus'],
    badgeReward: {
      id: 'badge_tk_penulis_bintang',
      name: 'Penulis Cilik Bintang',
      description: 'Hebat! Kamu sudah pandai menebalkan huruf vokal dengan rapi!',
      emoji: '✍️',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-tk-trace-1',
        title: 'Mengenal Arah Goresan Huruf A',
        subtitle: 'Tarik garis dari atas ke bawah, lalu beri garis tengah',
        type: 'letter_tracing',
        prompt: 'Gunakan jari atau kuasmu untuk menebalkan huruf A besar di bawah ini. Dengarkan bunyi fonik A seperti pada kata Apel!',
        speechText: 'Ayo tebalkan huruf A besar! Tarik garis miring ke kiri, tarik garis miring ke kanan, lalu tarik garis mendatar di tengah. A untuk Apel!',
        interactiveData: {
          interactiveType: 'letter_tracing',
          letter: 'A',
          letterCase: 'upper',
          exampleWord: 'Apel',
          exampleEmoji: '🍎',
          phonicsSound: 'A! A untuk Apel manis!',
          strokeGuide: [
            '1. Tarik garis miring dari atas ke kiri bawah ↙️',
            '2. Tarik garis miring dari atas ke kanan bawah ↘️',
            '3. Hubungkan garis mendatar di bagian tengah ➡️'
          ],
          availableLetters: ['A', 'I', 'U', 'E', 'O']
        },
        tips: 'Pegang jari atau layar dengan santai dan ikuti titik-titik panduan.'
      },
      {
        id: 'step-tk-trace-2',
        title: 'Tracing Huruf I & U yang Lincah',
        subtitle: 'Garis lurus tegak untuk I dan lengkungan mangkuk untuk U',
        type: 'letter_tracing',
        prompt: 'Pilih huruf I untuk Ikan 🐟 atau huruf U untuk Udang 🦐! Rasakan betapa mudahnya membuat garis tegak dan lengkung.',
        speechText: 'Huruf I dibuat dengan satu garis tegak lurus dari atas ke bawah. Sedangkan huruf U melengkung seperti mangkuk air!',
        interactiveData: {
          interactiveType: 'letter_tracing',
          letter: 'I',
          letterCase: 'upper',
          exampleWord: 'Ikan',
          exampleEmoji: '🐟',
          phonicsSound: 'I! I untuk Ikan berenang!',
          strokeGuide: [
            '1. Tarik garis lurus tegak dari atas ke bawah ⬇️',
            '2. Beri garis kecil di atas dan di bawah sebagai mahkota 👑'
          ],
          availableLetters: ['I', 'U', 'A', 'E', 'O']
        },
        tips: 'Huruf U mirip seperti senyuman lebar: turun, belok melengkung, lalu naik ke atas.'
      },
      {
        id: 'step-tk-trace-3',
        title: 'Tracing Huruf E & O yang Bulat',
        subtitle: 'Huruf E punya 3 garis mendatar, huruf O bulat sempurna',
        type: 'letter_tracing',
        prompt: 'Sekarang coba huruf E (Ekor 🐿️) dan O (Obor 🔥). Pilih warna tinta kesukaanmu!',
        speechText: 'Huruf E punya garis tegak dan tiga tangan mendatar. Huruf O berputar bulat penuh seperti roda sepeda!',
        interactiveData: {
          interactiveType: 'letter_tracing',
          letter: 'O',
          letterCase: 'upper',
          exampleWord: 'Obor',
          exampleEmoji: '🔥',
          phonicsSound: 'O! O untuk Obor menyala terang!',
          strokeGuide: [
            '1. Mulai dari titik atas, putar melengkung ke kiri 🔄',
            '2. Teruskan melingkar ke bawah hingga kembali bertemu di atas ⭕'
          ],
          availableLetters: ['O', 'E', 'A', 'I', 'U']
        },
        tips: 'Gunakan warna tinta yang berbeda-beda agar catatanmu semakin berwarna!'
      },
      {
        id: 'step-tk-trace-4',
        title: 'Hebat! Kamu Siap Menulis Mandiri',
        type: 'summary',
        prompt: 'Luar biasa! Kamu sudah belajar menebalkan huruf A, I, U, E, dan O. Yuk selesaikan kuis menulis untuk meraih lencana!',
        speechText: 'Hore! Tanganmu sangat lincah dan rapi. Mari kita mulai kuis menulis huruf vokal sekarang!'
      }
    ],
    quiz: [
      {
        id: 'q-tk-trace-1',
        questionNumber: 1,
        prompt: 'Huruf vokal apa yang diawali dari gambar buah Apel 🍎 merah?',
        speechPrompt: 'Huruf vokal apa yang diawali dari gambar buah apel merah?',
        equationVisual: '🍎 = [ ? ] - P - E - L',
        options: [
          { id: 'opt-1', text: 'Huruf A', visualEmoji: '🅰️', isCorrect: true },
          { id: 'opt-2', text: 'Huruf I', visualEmoji: 'ℹ️', isCorrect: false },
          { id: 'opt-3', text: 'Huruf U', visualEmoji: '⛎', isCorrect: false }
        ],
        explanation: 'Benar sekali! Apel diawali oleh huruf vokal A!',
        hint: 'Ucapkan kata "A-pel" secara perlahan.'
      },
      {
        id: 'q-tk-trace-2',
        questionNumber: 2,
        prompt: 'Huruf apa yang bentuknya bulat melingkar seperti cincin atau roda donat 🍩?',
        speechPrompt: 'Huruf apa yang bentuknya bulat melingkar seperti donat?',
        equationVisual: '⭕ Bentuk Huruf Bulat',
        options: [
          { id: 'opt-1', text: 'Huruf O ⭕', visualEmoji: '⭕', isCorrect: true },
          { id: 'opt-2', text: 'Huruf I 📏', visualEmoji: '📏', isCorrect: false },
          { id: 'opt-3', text: 'Huruf E 🪜', visualEmoji: '🪜', isCorrect: false }
        ],
        explanation: 'Pintar! Huruf O berbentuk lingkaran bulat tanpa sudut lancip.',
        hint: 'Bentuknya sama persis seperti angka nol (0).'
      },
      {
        id: 'q-tk-trace-3',
        questionNumber: 3,
        prompt: 'Berapa jumlah garis mendatar pada huruf E besar?',
        speechPrompt: 'Berapa jumlah garis mendatar pada huruf E besar?',
        equationVisual: 'Huruf E = 1 Garis Tegak + [ ? ] Garis Mendatar',
        options: [
          { id: 'opt-1', text: '3 Garis Mendatar (Atas, Tengah, Bawah)', visualEmoji: '3️⃣', isCorrect: true },
          { id: 'opt-2', text: '1 Garis Mendatar', visualEmoji: '1️⃣', isCorrect: false },
          { id: 'opt-3', text: '5 Garis Mendatar', visualEmoji: '5️⃣', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Huruf E besar memiliki 3 garis mendatar di atas, tengah, dan bawah.',
        hint: 'Lihat bentuk huruf E: ada tangan atas, tangan tengah, dan kaki bawah.'
      },
      {
        id: 'q-tk-trace-4',
        questionNumber: 4,
        prompt: 'Huruf vokal manakah yang terdapat pada kata "I - K - A - N" 🐟?',
        speechPrompt: 'Huruf vokal manakah yang terdapat pada kata ikan?',
        equationVisual: '🐟 I - K - A - N',
        options: [
          { id: 'opt-1', text: 'Huruf I dan A', visualEmoji: '✨', isCorrect: true },
          { id: 'opt-2', text: 'Huruf U dan O', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Huruf E dan U', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Luar biasa! Pada kata IKAN ada huruf vokal I di depan dan A di tengah.',
        hint: 'I-K-A-N memiliki 2 huruf vokal.'
      },
      {
        id: 'q-tk-trace-5',
        questionNumber: 5,
        prompt: 'Arah yang benar saat menarik garis tegak pada huruf I adalah...',
        speechPrompt: 'Arah yang benar saat menarik garis tegak pada huruf I adalah dari mana ke mana?',
        equationVisual: '✍️ Menulis Huruf I',
        options: [
          { id: 'opt-1', text: 'Dari Atas ditarik ke Bawah ⬇️', visualEmoji: '⬇️', isCorrect: true },
          { id: 'opt-2', text: 'Dari Kanan ke Kiri ⬅️', visualEmoji: '⬅️', isCorrect: false },
          { id: 'opt-3', text: 'Memutar acak-acakan 🌀', visualEmoji: '🌀', isCorrect: false }
        ],
        explanation: 'Hebat! Menulis garis tegak selalu dimulai dari atas menuju ke bawah dengan mantap.',
        hint: 'Tarik garis lurus dari atas seperti tetesan air hujan.'
      }
    ]
  },

  // =========================================================================
  // 2. SD KELAS 1 - MENULIS DENGAN TRACING KATA DI BUKU GARIS TIGA
  // =========================================================================
  {
    id: 'mod-sd1-tracing-kata',
    subjectId: 'menulis_tracing',
    gradeId: 'sd-1',
    order: 1,
    title: 'Menulis Huruf Konsonan & Kata Dasar di Garis Tiga',
    shortDesc: 'Latihan menulis huruf konsonan (B, C, D, K, M, S, T) dan merangkai kata di buku halus tiga garis.',
    fullDesc: 'Fase A (Kelas 1): Menguasai proporsi tinggi huruf pada buku tulis halus bergaris tiga (badan huruf di baris tengah, tiang atas pada B/D/K, dan ekor bawah pada G/J/P/Y).',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Proporsi Huruf Buku Garis Tiga, Huruf Konsonan & Penulisan Kata',
    estimatedMinutes: 6,
    starsReward: 25,
    coverEmoji: '📝',
    themeColor: 'from-[#FB8C00] to-[#E65100]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['SD 1', 'Menulis Tracing', 'Buku Garis Tiga', 'Huruf Konsonan'],
    badgeReward: {
      id: 'badge_sd1_tinta_emas',
      name: 'Pena Emas Fase A',
      description: 'Luar biasa! Tulisanmu rapi dan tepat di dalam garis tiga!',
      emoji: '📝',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-sd1-trace-1',
        title: 'Mengenal Buku Garis Tiga (Buku Halus)',
        subtitle: 'Tinggi badan huruf berada di area baris tengah yang pas',
        type: 'letter_tracing',
        prompt: 'Tebalkan huruf B besar dan kecil. Perhatikan tiang tegak dari garis atas dan perut bulat di baris tengah.',
        speechText: 'Pada buku bergaris tiga, badan huruf selalu diletakkan di baris tengah. Tiang huruf B menjulang dari garis paling atas.',
        interactiveData: {
          interactiveType: 'letter_tracing',
          letter: 'B',
          letterCase: 'upper',
          exampleWord: 'Buku',
          exampleEmoji: '📚',
          phonicsSound: 'B! B untuk Buku bacaan!',
          strokeGuide: [
            '1. Tarik garis tiang lurus dari atas ke bawah ⬇️',
            '2. Buat perut melengkung di bagian atas 🔄',
            '3. Buat perut melengkung di bagian bawah 🔄'
          ],
          availableLetters: ['B', 'C', 'D', 'K', 'M', 'S', 'T']
        },
        tips: 'Jaga ujung pena tetap menempel pada layar sampai satu goresan selesai.'
      },
      {
        id: 'step-sd1-trace-2',
        title: 'Menulis Huruf M dan S yang Meliuk Rapi',
        subtitle: 'Huruf M seperti dua bukit, huruf S meliuk seperti jalan berliku',
        type: 'letter_tracing',
        prompt: 'Sekarang pilih huruf M (Mata 👁️) atau huruf S (Sepatu 👟). Ikuti lekukan garis dengan lembut.',
        speechText: 'Huruf M memiliki dua lengkungan bukit yang sama tinggi. Huruf S meliuk dari kanan ke kiri lalu melengkung kembali ke kanan.',
        interactiveData: {
          interactiveType: 'letter_tracing',
          letter: 'M',
          letterCase: 'upper',
          exampleWord: 'Mata',
          exampleEmoji: '👁️',
          phonicsSound: 'M! M untuk Mata berbinar!',
          strokeGuide: [
            '1. Tarik garis tiang lurus di kiri ⬇️',
            '2. Tarik garis miring turun ke tengah ↘️',
            '3. Tarik garis miring naik ke kanan ↗️',
            '4. Tarik garis tiang lurus di kanan ⬇️'
          ],
          availableLetters: ['M', 'S', 'K', 'T', 'D', 'B']
        },
        tips: 'Ukuran kedua bukit pada huruf M harus seimbang dan simetris.'
      },
      {
        id: 'step-sd1-trace-3',
        title: 'Merangkai Huruf Menjadi Kata',
        subtitle: 'Menulis kata B-O-L-A dan B-U-K-U dengan jarak spasi rapi',
        type: 'letter_tracing',
        prompt: 'Pilih huruf K untuk kata Kuda 🐴 atau T untuk kata Topi 🎩. Rasakan betapa bangganya saat huruf-huruf tersusun rapi!',
        speechText: 'Saat merangkai kata, beri jarak spasi yang cukup antar huruf agar tulisan mudah dibaca oleh guru dan orang tua.',
        interactiveData: {
          interactiveType: 'letter_tracing',
          letter: 'K',
          letterCase: 'upper',
          exampleWord: 'Kuda',
          exampleEmoji: '🐴',
          phonicsSound: 'K! K untuk Kuda gagah!',
          strokeGuide: [
            '1. Tarik garis lurus tegak dari atas ke bawah ⬇️',
            '2. Tarik garis serong dari atas kanan ke tengah tiang ↙️',
            '3. Tarik garis serong dari tengah tiang ke bawah kanan ↘️'
          ],
          availableLetters: ['K', 'T', 'B', 'D', 'S']
        },
        tips: 'Goresan huruf K seperti tangan menyapa ke atas dan kaki melangkah ke bawah.'
      },
      {
        id: 'step-sd1-trace-4',
        title: 'Selamat! Tulisanmu Sangat Rapi',
        type: 'summary',
        prompt: 'Kerja keras yang luar biasa! Kamu sudah memahami posisi huruf di buku bergaris tiga. Yuk buktikan pemahamanmu di kuis!',
        speechText: 'Pintar sekali! Tulisan tanganmu semakin indah dan rapi. Ayo kita selesaikan kuis menulis kelas 1!'
      }
    ],
    quiz: [
      {
        id: 'q-sd1-trace-1',
        questionNumber: 1,
        prompt: 'Pada buku tulis halus bergaris tiga, badan huruf kecil seperti "a", "c", "m" berada di...',
        speechPrompt: 'Pada buku tulis halus bergaris tiga, badan huruf kecil berada di garis mana?',
        equationVisual: '📝 Buku Garis Tiga',
        options: [
          { id: 'opt-1', text: 'Baris Tengah yang diarsir rapat', visualEmoji: '📏', isCorrect: true },
          { id: 'opt-2', text: 'Keluar melayang di atas buku', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Tembus di bawah halaman meja', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Badan huruf kecil selalu diletakkan rapi di dalam baris tengah.',
        hint: 'Baris tengah adalah rumah utama bagi semua badan huruf.'
      },
      {
        id: 'q-sd1-trace-2',
        questionNumber: 2,
        prompt: 'Huruf kecil manakah yang memiliki "tiang tinggi ke atas" menyentuh garis pertama?',
        speechPrompt: 'Huruf kecil manakah yang memiliki tiang tinggi ke atas?',
        equationVisual: 'Tiang Tinggi ⬆️: b, d, h, k, l, t',
        options: [
          { id: 'opt-1', text: 'Huruf "b" dan "k" 🦒', visualEmoji: '🦒', isCorrect: true },
          { id: 'opt-2', text: 'Huruf "a" dan "c" 🐜', visualEmoji: '🐜', isCorrect: false },
          { id: 'opt-3', text: 'Huruf "m" dan "n" 🐁', visualEmoji: '🐁', isCorrect: false }
        ],
        explanation: 'Benar! Huruf b, d, h, k, dan l memiliki tiang panjang menjulang ke atas.',
        hint: 'Bayangkan leher jerapah yang tinggi ke atas.'
      },
      {
        id: 'q-sd1-trace-3',
        questionNumber: 3,
        prompt: 'Huruf kecil manakah yang memiliki "ekor turun ke bawah" menembus garis ketiga?',
        speechPrompt: 'Huruf kecil manakah yang memiliki ekor turun ke bawah?',
        equationVisual: 'Ekor Bawah ⬇️: g, j, p, q, y',
        options: [
          { id: 'opt-1', text: 'Huruf "g" dan "y" 🐒', visualEmoji: '🐒', isCorrect: true },
          { id: 'opt-2', text: 'Huruf "b" dan "d" 🦒', visualEmoji: '🦒', isCorrect: false },
          { id: 'opt-3', text: 'Huruf "o" dan "s" 🐢', visualEmoji: '🐢', isCorrect: false }
        ],
        explanation: 'Pintar sekali! Huruf g, j, p, q, dan y memiliki ekor yang menjuntai ke garis bawah.',
        hint: 'Seperti ekor monyet yang bergelantungan ke bawah.'
      },
      {
        id: 'q-sd1-trace-4',
        questionNumber: 4,
        prompt: 'Jika kita merangkai huruf B - U - K - U, maka akan terbaca kata apa?',
        speechPrompt: 'Jika kita merangkai huruf B U K U, maka akan terbaca kata apa?',
        equationVisual: 'B + U + K + U = ?',
        options: [
          { id: 'opt-1', text: 'BUKU 📚', visualEmoji: '📚', isCorrect: true },
          { id: 'opt-2', text: 'BOLA ⚽', visualEmoji: '⚽', isCorrect: false },
          { id: 'opt-3', text: 'BAJU 👕', visualEmoji: '👕', isCorrect: false }
        ],
        explanation: 'Hebat! B-U dibaca BU, K-U dibaca KU, digabung menjadi BUKU!',
        hint: 'Benda yang kita gunakan untuk membaca dan belajar.'
      },
      {
        id: 'q-sd1-trace-5',
        questionNumber: 5,
        prompt: 'Sikap duduk yang benar saat menulis di atas meja adalah...',
        speechPrompt: 'Sikap duduk yang benar saat menulis di atas meja adalah bagaimana?',
        equationVisual: '🪑 Postur Duduk Menulis',
        options: [
          { id: 'opt-1', text: 'Duduk tegak dengan jarak mata sekitar 30 cm dari buku 👀', visualEmoji: '✅', isCorrect: true },
          { id: 'opt-2', text: 'Tengkurap menempel di lantai sambil mata dekat sekali 😴', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Menulis dalam ruangan gelap gulita 🌑', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Luar biasa! Duduk tegak menjaga tulang punggung tetap sehat dan mata tidak cepat lelah.',
        hint: 'Duduk tegak dan pastikan ruangan terang benderang.'
      }
    ]
  },

  // =========================================================================
  // 3. TK - BELAJAR MEMBACA DENGAN FONIK & 2 SUKU KATA TERBUKA
  // =========================================================================
  {
    id: 'mod-tk-belajar-membaca',
    subjectId: 'belajar_membaca',
    gradeId: 'tk',
    order: 1,
    title: 'Fonik Ceria & Membaca 2 Suku Kata Terbuka',
    shortDesc: 'Ayo bunyikan huruf dan gabungkan suku kata seperti BA-JU, BO-LA, BU-KU bersama Ciko!',
    fullDesc: 'Fase Fondasi TK: Mengenal kesadaran fonologis (bunyi huruf), memenggal kata menjadi 2 suku kata terbuka berpola K-V (Konsonan-Vokal), dan merangkainya menjadi kata bermakna.',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Kesadaran Fonologis, Suku Kata Terbuka (K-V) & Membaca Bergambar',
    estimatedMinutes: 5,
    starsReward: 20,
    coverEmoji: '🔤',
    themeColor: 'from-[#29B6F6] to-[#0288D1]',
    themeBg: 'bg-[#E1F5FE] border-[#81D4FA]',
    themeBorder: 'border-[#81D4FA]',
    tags: ['TK', 'Belajar Membaca', 'Fonik', '2 Suku Kata'],
    badgeReward: {
      id: 'badge_tk_pembaca_cerdas',
      name: 'Pembaca Cilik Ceria',
      description: 'Hore! Kamu sudah bisa membaca kata-kata dua suku kata dengan lancar!',
      emoji: '🔤',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-tk-read-1',
        title: 'Mengenal Suku Kata B-A dan J-U',
        subtitle: 'Sentuh setiap kartu suku kata untuk mendengar bunyinya',
        type: 'syllable_reading',
        prompt: 'Sentuh kartu [BA] lalu sentuh kartu [JU]. Tekan tombol gabung untuk mendengarkan kata BAJU!',
        speechText: 'Ayo ketuk BA, lalu ketuk JU. Kemudian tekan tombol gabungkan kata untuk melihat gambar baju baru!',
        interactiveData: {
          interactiveType: 'syllable_reading',
          syllables: ['BA', 'JU'],
          fullWord: 'BAJU',
          wordEmoji: '👕',
          exampleSentence: 'Ciko memakai baju baru yang bersih dan wangi.',
          allWords: [
            { syllables: ['BA', 'JU'], fullWord: 'BAJU', emoji: '👕', sentence: 'Ciko memakai baju bersih warna biru.' },
            { syllables: ['BO', 'LA'], fullWord: 'BOLA', emoji: '⚽', sentence: 'Leo menendang bola ke gawang.' },
            { syllables: ['BU', 'KU'], fullWord: 'BUKU', emoji: '📚', sentence: 'Profesor Owi rajin membaca buku cerita.' },
            { syllables: ['RO', 'TI'], fullWord: 'ROTI', emoji: '🍞', sentence: 'Mimi sarapan roti manis selai madu.' },
            { syllables: ['KU', 'DA'], fullWord: 'KUDA', emoji: '🐴', sentence: 'Kuda berlari riang di padang rumput.' }
          ]
        },
        tips: 'Ucapkan bunyinya keras-keras: B... A... menjadi BA!'
      },
      {
        id: 'step-tk-read-2',
        title: 'Eksplorasi Kata BO-LA dan RO-TI',
        subtitle: 'Vokal O membuat mulut kita membulat ceria',
        type: 'syllable_reading',
        prompt: 'Pilih kata BOLA ⚽ atau ROTI 🍞 dari daftar di bawah. Gabungkan suku kata dan dengarkan kalimatnya!',
        speechText: 'Huruf B bertemu O berbunyi BO. L bertemu A berbunyi LA. Jika digabung menjadi BOLA!',
        interactiveData: {
          interactiveType: 'syllable_reading',
          syllables: ['BO', 'LA'],
          fullWord: 'BOLA',
          wordEmoji: '⚽',
          exampleSentence: 'Budi mengajak Leo bermain bola sepak di lapangan.',
          allWords: [
            { syllables: ['BO', 'LA'], fullWord: 'BOLA', emoji: '⚽', sentence: 'Leo menendang bola ke gawang.' },
            { syllables: ['RO', 'TI'], fullWord: 'ROTI', emoji: '🍞', sentence: 'Roti panggang ini sangat lezat.' },
            { syllables: ['TO', 'PI'], fullWord: 'TOPI', emoji: '🎩', sentence: 'Dino memakai topi bundar agar tidak silau.' },
            { syllables: ['KA', 'KI'], fullWord: 'KAKI', emoji: '🦶', sentence: 'Kaki kita digunakan untuk melangkah dan melompat.' }
          ]
        },
        tips: 'B-O dibaca BO, L-A dibaca LA. BO... LA... BOLA!'
      },
      {
        id: 'step-tk-read-3',
        title: 'Membaca Kalimat Cerita Bergambar',
        subtitle: 'Menghubungkan kata-kata sederhana menjadi cerita',
        type: 'story',
        prompt: 'Baca kalimat ini bersama Ciko: "Ibu beli tiga roti manis. Ciko dan Mimi makan roti bersama." Wah seru sekali!',
        speechText: 'Mari membaca cerita: Ibu beli tiga roti manis. Ciko dan Mimi makan roti bersama. Semua merasa kenyang dan gembira!',
        tips: 'Setiap kata memiliki arti yang membuat cerita menjadi hidup.'
      },
      {
        id: 'step-tk-read-4',
        title: 'Hore! Kamu Hebat Membaca',
        type: 'summary',
        prompt: 'Selamat! Kamu sudah pandai membaca suku kata terbuka. Yuk uji kemampuan membaca di kuis bergambar!',
        speechText: 'Kamu hebat sekali! Sekarang kamu sudah bisa membaca kata-kata di sekitarmu. Ayo kita mulai kuis membaca!'
      }
    ],
    quiz: [
      {
        id: 'q-tk-read-1',
        questionNumber: 1,
        prompt: 'Jika suku kata "BA" digabung dengan "JU", akan membentuk kata apa?',
        speechPrompt: 'Jika suku kata BA digabung dengan JU, akan membentuk kata apa?',
        equationVisual: '[ BA ] + [ JU ] = ?',
        options: [
          { id: 'opt-1', text: 'BAJU 👕', visualEmoji: '👕', isCorrect: true },
          { id: 'opt-2', text: 'BATU 🪨', visualEmoji: '🪨', isCorrect: false },
          { id: 'opt-3', text: 'BOLA ⚽', visualEmoji: '⚽', isCorrect: false }
        ],
        explanation: 'Benar! BA + JU = BAJU, pakaian yang kita kenakan sehari-hari.',
        hint: 'B-A = BA, J-U = JU.'
      },
      {
        id: 'q-tk-read-2',
        questionNumber: 2,
        prompt: 'Gambar manakah yang sesuai dengan kata "B - U - K - U" 📚?',
        speechPrompt: 'Gambar manakah yang sesuai dengan kata BUKU?',
        equationVisual: '📖 Kata: BUKU',
        options: [
          { id: 'opt-1', text: 'Buku Cerita Bergambar 📚', visualEmoji: '📚', isCorrect: true },
          { id: 'opt-2', text: 'Sepeda Roda Dua 🚲', visualEmoji: '🚲', isCorrect: false },
          { id: 'opt-3', text: 'Piring Makan 🍽️', visualEmoji: '🍽️', isCorrect: false }
        ],
        explanation: 'Pintar sekali! Kata BUKU melambangkan buku bacaan untuk belajar.',
        hint: 'BU-KU dieja B-U dan K-U.'
      },
      {
        id: 'q-tk-read-3',
        questionNumber: 3,
        prompt: 'Suku kata awal dari kata "K - U - D - A" 🐴 adalah...',
        speechPrompt: 'Suku kata awal dari kata KUDA adalah apa?',
        equationVisual: '🐴 [ ? ] - DA',
        options: [
          { id: 'opt-1', text: 'KU', visualEmoji: '🐴', isCorrect: true },
          { id: 'opt-2', text: 'MA', visualEmoji: '🍯', isCorrect: false },
          { id: 'opt-3', text: 'BO', visualEmoji: '⚽', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Suku kata pertama KUDA adalah KU (K-U).',
        hint: 'K-U dibaca KU.'
      },
      {
        id: 'q-tk-read-4',
        questionNumber: 4,
        prompt: 'Lengkapilah kata ini: "R O - [ ? ]" untuk makanan sarapan pagi 🍞',
        speechPrompt: 'Lengkapilah kata ini: RO titik-titik untuk makanan sarapan pagi berbentuk roti',
        equationVisual: '🍞 [ RO ] + [ ? ] = ROTI',
        options: [
          { id: 'opt-1', text: 'TI (menjadi ROTI)', visualEmoji: '🍞', isCorrect: true },
          { id: 'opt-2', text: 'DA (menjadi RODA)', visualEmoji: '🛞', isCorrect: false },
          { id: 'opt-3', text: 'SA (menjadi ROSA)', visualEmoji: '🌸', isCorrect: false }
        ],
        explanation: 'Luar biasa! [RO] + [TI] = ROTI yang empuk dan lezat!',
        hint: 'T-I dibaca TI.'
      },
      {
        id: 'q-tk-read-5',
        questionNumber: 5,
        prompt: 'Manakah susunan kata yang benar untuk: "makan - Leo - roti" 🦁🍞?',
        speechPrompt: 'Manakah susunan kalimat yang benar dari kata makan, Leo, roti?',
        equationVisual: '🦁 🍞 Susun Kalimat',
        options: [
          { id: 'opt-1', text: 'Leo makan roti.', visualEmoji: '🦁', isCorrect: true },
          { id: 'opt-2', text: 'Roti Leo makan makan.', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Makan makan roti Leo.', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Hebat sekali! Subjek (Leo) melakukan tindakan (makan) objek (roti).',
        hint: 'Siapa yang makan? Leo!'
      }
    ]
  },

  // =========================================================================
  // 4. SD KELAS 1 - BELAJAR MEMBACA SUKU KATA TERTUTUP & KALIMAT CERITA
  // =========================================================================
  {
    id: 'mod-sd1-belajar-membaca',
    subjectId: 'belajar_membaca',
    gradeId: 'sd-1',
    order: 1,
    title: 'Membaca Kata Bervokal Ganda, Suku Kata Tertutup & Kalimat Cerita',
    shortDesc: 'Membaca kata berakhiran konsonan (RUMAH, GAJAH, PINTU, IKAN) dan memahami cerita bergambar.',
    fullDesc: 'Fase A (Kelas 1): Membaca lancar kata berpola K-V-K (Konsonan-Vokal-Konsonan), diftong (ai, au, oi), serta menyimpulkan pesan cerita pendek dalam kehidupan sehari-hari.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Suku Kata Tertutup (K-V-K), Diftong & Pemahaman Isi Bacaan',
    estimatedMinutes: 6,
    starsReward: 25,
    coverEmoji: '📖',
    themeColor: 'from-[#0288D1] to-[#01579B]',
    themeBg: 'bg-[#E1F5FE] border-[#4FC3F7]',
    themeBorder: 'border-[#4FC3F7]',
    tags: ['SD 1', 'Belajar Membaca', 'Suku Kata Tertutup', 'Cerita Pendek'],
    badgeReward: {
      id: 'badge_sd1_pembaca_mahir',
      name: 'Pembaca Mahir Fase A',
      description: 'Luar biasa! Kamu membaca kalimat panjang dengan intonasi yang jelas dan lancar!',
      emoji: '📖',
      category: 'calistung'
    },
    steps: [
      {
        id: 'step-sd1-read-1',
        title: 'Mengenal Suku Kata Tertutup Berakhiran Konsonan',
        subtitle: 'Kata yang diakhiri bunyi mati seperti -H, -N, -K, -M, -S',
        type: 'syllable_reading',
        prompt: 'Perhatikan kata RU-MAH 🏠. Suku kata kedua diakhiri huruf H. Coba dengarkan dan baca bersama!',
        speechText: 'Suku kata tertutup memiliki huruf konsonan di akhir, seperti MAH pada kata RUMAH atau KAN pada kata IKAN.',
        interactiveData: {
          interactiveType: 'syllable_reading',
          syllables: ['RU', 'MAH'],
          fullWord: 'RUMAH',
          wordEmoji: '🏠',
          exampleSentence: 'Rumah Mimi bersih, nyaman, dan penuh tanaman bunga.',
          allWords: [
            { syllables: ['RU', 'MAH'], fullWord: 'RUMAH', emoji: '🏠', sentence: 'Rumah Mimi bersih, asri, dan rapi.' },
            { syllables: ['GA', 'JAH'], fullWord: 'GAJAH', emoji: '🐘', sentence: 'Gajah besar memiliki belalai panjang.' },
            { syllables: ['PIN', 'TU'], fullWord: 'PINTU', emoji: '🚪', sentence: 'Tutup pintu rumah saat malam tiba.' },
            { syllables: ['PO', 'HON'], fullWord: 'POHON', emoji: '🌳', sentence: 'Pohon rindang menghasilkan udara segar.' },
            { syllables: ['BU', 'RUNG'], fullWord: 'BURUNG', emoji: '🐦', sentence: 'Burung bernyanyi merdu di atas ranting.' }
          ]
        },
        tips: 'Bunyikan huruf akhir dengan jelas: M-A-H berbunyi MAH.'
      },
      {
        id: 'step-sd1-read-2',
        title: 'Mengenal Diftong Vokal Ganda (AI, AU, OI)',
        subtitle: 'Bunyi dua vokal yang meluncur bersama dalam satu hembusan napas',
        type: 'syllable_reading',
        prompt: 'Dengarkan kata PAN-TAI 🏖️ dan TU-PAI 🐿️. Vokal A dan I bersatu membentuk bunyi AI!',
        speechText: 'Vokal ganda AI seperti pada kata PANTAI terdengar lembut. AU seperti pada kata KERBAU dan PULAU!',
        interactiveData: {
          interactiveType: 'syllable_reading',
          syllables: ['PAN', 'TAI'],
          fullWord: 'PANTAI',
          wordEmoji: '🏖️',
          exampleSentence: 'Dino dan teman-teman bermain pasir putih di pantai.',
          allWords: [
            { syllables: ['PAN', 'TAI'], fullWord: 'PANTAI', emoji: '🏖️', sentence: 'Pantai yang indah dengan ombak tenang.' },
            { syllables: ['TU', 'PAI'], fullWord: 'TUPAI', emoji: '🐿️', sentence: 'Tupai melompat lincah dari dahan ke dahan.' },
            { syllables: ['KER', 'BAU'], fullWord: 'KERBAU', emoji: '🐃', sentence: 'Pak Tani membajak sawah bersama kerbau.' },
            { syllables: ['AM', 'BOI'], fullWord: 'AMBOI', emoji: '✨', sentence: 'Amboi indahnya pelangi di langit sore!' }
          ]
        },
        tips: 'Ucapkan diftong secara mengalir tanpa terputus: T-A-I berbunyi TAI.'
      },
      {
        id: 'step-sd1-read-3',
        title: 'Membaca Cerita: Sahabat Hutan yang Rukun',
        subtitle: 'Memahami makna cerita dan pesan moral',
        type: 'story',
        prompt: 'Baca cerita ini: "Pada hari Minggu, Leo singa dan Ciko kelinci pergi ke kebun buah. Mereka memetik apel merah bersama. Ciko berbagi buah dengan Mimi panda. Mereka bersahabat selamanya."',
        speechText: 'Mari menyimak cerita: Pada hari Minggu, Leo singa dan Ciko kelinci pergi ke kebun buah. Mereka memetik apel merah bersama. Ciko berbagi buah dengan Mimi panda. Mereka bersahabat selamanya!',
        tips: 'Siapa saja tokoh dalam cerita di atas? Leo, Ciko, dan Mimi!'
      },
      {
        id: 'step-sd1-read-4',
        title: 'Luar Biasa! Kamu Siap Kuis Membaca',
        type: 'summary',
        prompt: 'Hebat sekali! Kemampuan membacamu semakin lancar dan kamu paham isi cerita. Yuk jawab 5 soal kuis seru!',
        speechText: 'Kamu membaca dengan sangat lancar dan penuh percaya diri. Mari kita buktikan di kuis membaca kelas 1!'
      }
    ],
    quiz: [
      {
        id: 'q-sd1-read-1',
        questionNumber: 1,
        prompt: 'Kata "G - A - J - A - H" 🐘 jika dipenggal menurut suku katanya menjadi...',
        speechPrompt: 'Kata GAJAH jika dipenggal menurut suku katanya menjadi apa?',
        equationVisual: '🐘 GAJAH = [ ? ] - [ ? ]',
        options: [
          { id: 'opt-1', text: 'GA - JAH', visualEmoji: '🐘', isCorrect: true },
          { id: 'opt-2', text: 'GAJ - AH', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'G - AJAH', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Benar! Suku kata pertama adalah GA, dan suku kata kedua adalah JAH.',
        hint: 'Ucapkan GA... JAH...'
      },
      {
        id: 'q-sd1-read-2',
        questionNumber: 2,
        prompt: 'Kata manakah di bawah ini yang memiliki vokal ganda diftong "AI"?',
        speechPrompt: 'Kata manakah di bawah ini yang memiliki vokal ganda diftong AI?',
        equationVisual: '🏖️ Diftong -AI',
        options: [
          { id: 'opt-1', text: 'PANTAI 🏖️', visualEmoji: '🏖️', isCorrect: true },
          { id: 'opt-2', text: 'PINTU 🚪', visualEmoji: '🚪', isCorrect: false },
          { id: 'opt-3', text: 'POHON 🌳', visualEmoji: '🌳', isCorrect: false }
        ],
        explanation: 'Tepat sekali! PAN-TAI memiliki diftong AI di suku kata kedua.',
        hint: 'Dengarkan akhiran kata: pan-tai.'
      },
      {
        id: 'q-sd1-read-3',
        questionNumber: 3,
        prompt: 'Berdasarkan cerita petualangan di kebun buah, siapakah yang memetik apel bersama Leo?',
        speechPrompt: 'Siapakah yang memetik apel bersama Leo di kebun buah?',
        equationVisual: '🍎 Cerita Kebun Apel',
        options: [
          { id: 'opt-1', text: 'Ciko si Kelinci 🐰', visualEmoji: '🐰', isCorrect: true },
          { id: 'opt-2', text: 'Serigala Galak 🐺', visualEmoji: '🐺', isCorrect: false },
          { id: 'opt-3', text: 'Dinosaurus Raksasa 🦖', visualEmoji: '🦖', isCorrect: false }
        ],
        explanation: 'Pintar! Ciko kelinci memetik apel bersama Leo dan membagikannya ke Mimi panda.',
        hint: 'Sahabat berbulu putih yang suka wortel dan apel.'
      },
      {
        id: 'q-sd1-read-4',
        questionNumber: 4,
        prompt: 'Kalimat berikut yang ditulis dengan huruf kapital dan tanda titik yang tepat adalah...',
        speechPrompt: 'Kalimat berikut yang ditulis dengan huruf kapital dan tanda titik yang tepat adalah yang mana?',
        equationVisual: '✍️ Huruf Kapital & Tanda Titik',
        options: [
          { id: 'opt-1', text: 'Budi membaca buku di perpustakaan.', visualEmoji: '✅', isCorrect: true },
          { id: 'opt-2', text: 'budi membaca buku di perpustakaan', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'BUDI MEMBACA BUKU DI PERPUSTAKAAN,', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Hebat! Awal kalimat diawali huruf kapital (Budi) dan diakhiri tanda titik (.)',
        hint: 'Ingat rumus: Huruf besar di awal, tanda titik di akhir.'
      },
      {
        id: 'q-sd1-read-5',
        questionNumber: 5,
        prompt: 'Pesan kebaikan apa yang kita pelajari saat Ciko membagikan apel kepada Mimi?',
        speechPrompt: 'Pesan kebaikan apa yang kita pelajari saat Ciko membagikan apel kepada teman?',
        equationVisual: '❤️ Nilai Karakter Berbagi',
        options: [
          { id: 'opt-1', text: 'Suka berbagi dan peduli kepada sesama sahabat 🤝', visualEmoji: '🤝', isCorrect: true },
          { id: 'opt-2', text: 'Menyimpan semua makanan sendirian 😠', visualEmoji: '😠', isCorrect: false },
          { id: 'opt-3', text: 'Membuang makanan ke jalanan 🗑️', visualEmoji: '🗑️', isCorrect: false }
        ],
        explanation: 'Luar biasa! Berbagi membuat persahabatan semakin erat dan hati menjadi bahagia.',
        hint: 'Berbagi rezeki membawa kebahagiaan.'
      }
    ]
  },

  // =========================================================================
  // 5. PAUD - BELAJAR SEMPOA MANIK CERIA (1-5)
  // =========================================================================
  {
    id: 'mod-paud-sempoa-biji',
    subjectId: 'sempoa',
    gradeId: 'paud',
    order: 1,
    title: 'Mengenal Biji Sempoa Manik Ceria (1 sampai 5)',
    shortDesc: 'Ayo geser manik-manik sempoa warna-warni dan hitung 1 sampai 5 bersama Beruang Madu!',
    fullDesc: 'Fase Fondasi Awal: Mengenalkan instrumen sempoa / abacus secara konkret dan sensori. Anak belajar menggeser manik bawah satu per satu (+1) hingga 4 dan mengenal manik atas bernilai 5.',
    kurikulumFase: 'Fase Fondasi Awal (PAUD)',
    kurikulumFokus: 'Sensori Motorik Sempoa, Manik Bawah (1-4) & Manik Atas (5)',
    estimatedMinutes: 4,
    starsReward: 15,
    coverEmoji: '🧮',
    themeColor: 'from-[#BA68C8] to-[#8E24AA]',
    themeBg: 'bg-[#F3E5F5] border-[#CE93D8]',
    themeBorder: 'border-[#CE93D8]',
    tags: ['PAUD', 'Sempoa', 'Manik Biji', 'Membilang 1-5'],
    badgeReward: {
      id: 'badge_paud_sempoa_bintang',
      name: 'Sahabat Sempoa Cilik',
      description: 'Hebat! Kamu sudah pandai menggeser manik sempoa dengan jari jemari mungilmu!',
      emoji: '🧮',
      category: 'math'
    },
    steps: [
      {
        id: 'step-paud-sempoa-1',
        title: 'Mengenal Rumah Sempoa & Manik Bawah',
        subtitle: 'Setiap manik bawah yang naik bernilai 1',
        type: 'abacus_interactive',
        prompt: 'Sentuh manik bawah warna biru untuk menaikkannya ke palang tengah. Setiap 1 manik naik, nilainya bertambah 1!',
        speechText: 'Halo sahabat cilik! Ini adalah sempoa ajaib. Geser manik bawah warna biru ke atas untuk menghitung satu, dua, tiga, empat!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 3,
          targetNumber: 3,
          operationType: 'explore',
          showFormula: 'Geser 3 manik bawah pada tiang satuan ke atas untuk membentuk angka 3.',
          formulaTitle: '💡 Cara Menghitung 3 di Sempoa'
        },
        tips: 'Gunakan jempol tangan untuk menaikkan manik bawah ke palang tengah.'
      },
      {
        id: 'step-paud-sempoa-2',
        title: 'Mengenal Manik Atas yang Bernilai 5',
        subtitle: 'Manik atas yang turun bernilai lima seketika!',
        type: 'abacus_interactive',
        prompt: 'Sentuh manik atas warna emas untuk menurunkannya menyentuh palang. Nilainya langsung 5!',
        speechText: 'Manik atas warna emas ini sangat istimewa. Jika turun menyentuh palang tengah, nilainya adalah lima!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 3,
          targetNumber: 5,
          operationType: 'single_digit',
          showFormula: 'Turunkan 1 manik atas warna emas ke palang tengah. Nilainya adalah 5.',
          formulaTitle: '⭐ Rahasia Manik Atas (Nilai 5)'
        },
        tips: 'Gunakan jari telunjuk untuk menurunkan manik atas bernilai 5.'
      },
      {
        id: 'step-paud-sempoa-3',
        title: 'Hore! Sempoa Cilik PAUD Selesai',
        type: 'summary',
        prompt: 'Luar biasa! Kamu sudah tahu manik bawah (1) dan manik atas (5). Yuk mainkan kuis sempoa bersama!',
        speechText: 'Hore! Kamu pintar sekali bermain sempoa. Ayo kita jawab kuis sempoa PAUD!'
      }
    ],
    quiz: [
      {
        id: 'q-paud-sempoa-1',
        questionNumber: 1,
        prompt: 'Satu manik atas warna emas yang turun menyentuh palang bernilai berapa?',
        speechPrompt: 'Satu manik atas warna emas yang turun menyentuh palang bernilai berapa?',
        equationVisual: '🧮 Manik Atas = ?',
        options: [
          { id: 'opt-1', text: 'Nilai 5 🖐️', visualEmoji: '🖐️', isCorrect: true },
          { id: 'opt-2', text: 'Nilai 1 ☝️', visualEmoji: '☝️', isCorrect: false },
          { id: 'opt-3', text: 'Nilai 0 ⭕', visualEmoji: '⭕', isCorrect: false }
        ],
        explanation: 'Benar sekali! Manik atas pada sempoa melambangkan nilai 5!',
        hint: 'Sama seperti jumlah lima jari di satu telapak tanganmu.'
      },
      {
        id: 'q-paud-sempoa-2',
        questionNumber: 2,
        prompt: 'Jika kita menaikkan 2 manik bawah ke atas, maka nilai sempoa adalah...',
        speechPrompt: 'Jika kita menaikkan dua manik bawah ke atas, maka nilai sempoa adalah berapa?',
        equationVisual: '🧮 2 Manik Bawah Naik = ?',
        options: [
          { id: 'opt-1', text: '2 ✌️', visualEmoji: '✌️', isCorrect: true },
          { id: 'opt-2', text: '5 🖐️', visualEmoji: '🖐️', isCorrect: false },
          { id: 'opt-3', text: '10 👐', visualEmoji: '👐', isCorrect: false }
        ],
        explanation: 'Pintar! Tiap manik bawah bernilai 1. Jadi 2 manik bawah = 2.',
        hint: 'Satu ditambah satu sama dengan dua.'
      },
      {
        id: 'q-paud-sempoa-3',
        questionNumber: 3,
        prompt: 'Benda apakah yang kita gunakan untuk berhitung cepat dengan biji manik?',
        speechPrompt: 'Benda apakah yang kita gunakan untuk berhitung cepat dengan biji manik?',
        equationVisual: '🧮 Alat Berhitung',
        options: [
          { id: 'opt-1', text: 'Sempoa / Soroban 🧮', visualEmoji: '🧮', isCorrect: true },
          { id: 'opt-2', text: 'Gunting Kertas ✂️', visualEmoji: '✂️', isCorrect: false },
          { id: 'opt-3', text: 'Sendok Makan 🥄', visualEmoji: '🥄', isCorrect: false }
        ],
        explanation: 'Hebat! Sempoa adalah alat tradisional yang sangat hebat untuk melatih kecerdasan otak.',
        hint: 'Alat berbingkai kayu dengan tiang dan manik-manik bergeser.'
      }
    ]
  },

  // =========================================================================
  // 6. TK - BELAJAR SEMPOA: MEMBENTUK ANGKA 1-9 DI TIANG SATUAN
  // =========================================================================
  {
    id: 'mod-tk-sempoa-angka-1-9',
    subjectId: 'sempoa',
    gradeId: 'tk',
    order: 1,
    title: 'Sempoa Soroban: Membentuk Angka 1-9 di Tiang Satuan',
    shortDesc: 'Gabungkan manik atas (5) dan manik bawah (1-4) untuk membentuk angka 6, 7, 8, dan 9!',
    fullDesc: 'Fase Fondasi TK: Mengembangkan konsep dekomposisi bilangan 1 sampai 9 pada sempoa Soroban (contoh: 6 = 5 + 1, 7 = 5 + 2, 8 = 5 + 3, 9 = 5 + 4) serta teknik menjepit manik (pinch move).',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Konsep Angka 1-9 pada Sempoa, Dekomposisi Bilangan 5+n & Teknik Jepit',
    estimatedMinutes: 5,
    starsReward: 20,
    coverEmoji: '🧮',
    themeColor: 'from-[#AB47BC] to-[#7B1FA2]',
    themeBg: 'bg-[#F3E5F5] border-[#BA68C8]',
    themeBorder: 'border-[#BA68C8]',
    tags: ['TK', 'Sempoa', 'Angka 1-9', 'Dekomposisi Bilangan'],
    badgeReward: {
      id: 'badge_tk_sempoa_master',
      name: 'Bintang Sempoa TK',
      description: 'Luar biasa! Kamu mahir membentuk angka 1 sampai 9 di sempoa dengan cepat!',
      emoji: '🧮',
      category: 'math'
    },
    steps: [
      {
        id: 'step-tk-sempoa-1',
        title: 'Membentuk Angka 6 dan 7 dengan Teknik Jepit',
        subtitle: 'Angka 6 = 1 Manik Atas (5) + 1 Manik Bawah (1)',
        type: 'abacus_interactive',
        prompt: 'Coba bentuk angka 7 pada sempoa! Turunkan manik atas bernilai 5 dan naikkan 2 manik bawah (5 + 2 = 7).',
        speechText: 'Untuk membuat angka 7 di sempoa: turunkan manik atas bernilai 5, lalu naikkan 2 manik bawah. 5 ditambah 2 sama dengan 7!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 7,
          operationType: 'single_digit',
          showFormula: 'Turunkan manik 5 + Naikkan 2 manik bawah = Angka 7.',
          formulaTitle: '🔢 Membentuk Angka 7 (5 + 2)'
        },
        tips: 'Ingat selalu: 6 = 5+1, 7 = 5+2, 8 = 5+3, 9 = 5+4.'
      },
      {
        id: 'step-tk-sempoa-2',
        title: 'Membentuk Angka Paling Penuh: Angka 9',
        subtitle: 'Manik atas (5) turun + Semua 4 manik bawah naik (5 + 4 = 9)',
        type: 'abacus_interactive',
        prompt: 'Sekarang tantangan seru: Buat angka 9 di tiang satuan sempoa!',
        speechText: 'Angka 9 adalah angka terbesar di satu tiang sempoa! Turunkan manik 5 dan naikkan keempat manik bawah. 5 ditambah 4 sama dengan 9!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 9,
          operationType: 'single_digit',
          showFormula: 'Turunkan 1 manik atas (5) dan naikkan 4 manik bawah (4). Total = 9.',
          formulaTitle: '🌟 Angka 9 Penuh di Tiang Satuan'
        },
        tips: 'Jika semua manik menyentuh palang tengah pada tiang satuan, nilainya tepat 9.'
      },
      {
        id: 'step-tk-sempoa-3',
        title: 'Hebat! Kamu Siap Uji Kemampuan',
        type: 'summary',
        prompt: 'Pintar sekali! Kamu sudah bisa membentuk angka 1 sampai 9 dengan sempoa. Yuk selesaikan kuis sempoa TK!',
        speechText: 'Luar biasa! Jari-jemarimu sangat lincah menggeser manik sempoa. Mari kita mulai kuis sempoa TK!'
      }
    ],
    quiz: [
      {
        id: 'q-tk-sempoa-1',
        questionNumber: 1,
        prompt: 'Jika pada tiang satuan ada 1 manik atas (5) dan 3 manik bawah (3) aktif, berapakah nilainya?',
        speechPrompt: 'Jika pada tiang satuan ada 1 manik atas dan 3 manik bawah aktif, berapakah nilainya?',
        equationVisual: '5 + 3 = ?',
        options: [
          { id: 'opt-1', text: '8 🎱', visualEmoji: '8️⃣', isCorrect: true },
          { id: 'opt-2', text: '7 🌈', visualEmoji: '7️⃣', isCorrect: false },
          { id: 'opt-3', text: '9 🌟', visualEmoji: '9️⃣', isCorrect: false }
        ],
        explanation: 'Tepat sekali! 5 ditambah 3 sama dengan 8!',
        hint: 'Hitung setelah lima: enam, tujuh, delapan.'
      },
      {
        id: 'q-tk-sempoa-2',
        questionNumber: 2,
        prompt: 'Bagaimana cara membentuk angka 6 pada sempoa?',
        speechPrompt: 'Bagaimana cara membentuk angka 6 pada sempoa?',
        equationVisual: 'Bentuk Angka 6',
        options: [
          { id: 'opt-1', text: '1 Manik Atas (5) + 1 Manik Bawah (1)', visualEmoji: '✅', isCorrect: true },
          { id: 'opt-2', text: '6 Manik Bawah semuanya naik', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Tidak ada manik yang digeser', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Benar! Karena manik bawah hanya ada 4, maka 6 dibentuk dari 5 + 1.',
        hint: '5 + 1 = 6.'
      },
      {
        id: 'q-tk-sempoa-3',
        questionNumber: 3,
        prompt: 'Berapakah nilai terbesar yang dapat dibentuk pada 1 tiang sempoa?',
        speechPrompt: 'Berapakah nilai terbesar yang dapat dibentuk pada satu tiang sempoa?',
        equationVisual: 'Nilai Maksimal 1 Tiang',
        options: [
          { id: 'opt-1', text: '9 (1 manik 5 + 4 manik 1)', visualEmoji: '9️⃣', isCorrect: true },
          { id: 'opt-2', text: '5', visualEmoji: '5️⃣', isCorrect: false },
          { id: 'opt-3', text: '100', visualEmoji: '💯', isCorrect: false }
        ],
        explanation: 'Luar biasa! Satu tiang sempoa memiliki kapasitas maksimal angka 9.',
        hint: '5 + 4 = 9.'
      },
      {
        id: 'q-tk-sempoa-4',
        questionNumber: 4,
        prompt: 'Jika semua manik dijauhkan dari palang tengah (posisi netral), maka nilai sempoa adalah...',
        speechPrompt: 'Jika semua manik dijauhkan dari palang tengah, maka nilai sempoa adalah berapa?',
        equationVisual: 'Sempoa Posisi Bersih',
        options: [
          { id: 'opt-1', text: 'Nol (0) ⭕', visualEmoji: '0️⃣', isCorrect: true },
          { id: 'opt-2', text: 'Sepuluh (10)', visualEmoji: '🔟', isCorrect: false },
          { id: 'opt-3', text: 'Lima (5)', visualEmoji: '5️⃣', isCorrect: false }
        ],
        explanation: 'Pintar! Posisi netral atau bersih tanpa manik yang menyentuh palang bernilai 0.',
        hint: 'Nol artinya belum ada hitungan.'
      },
      {
        id: 'q-tk-sempoa-5',
        questionNumber: 5,
        prompt: 'Berapakah hasil dari 2 + 5 jika dihitung di sempoa?',
        speechPrompt: 'Berapakah hasil dari 2 ditambah 5 jika dihitung di sempoa?',
        equationVisual: '2 + 5 = ?',
        options: [
          { id: 'opt-1', text: '7 🌟', visualEmoji: '7️⃣', isCorrect: true },
          { id: 'opt-2', text: '6 ⚽', visualEmoji: '6️⃣', isCorrect: false },
          { id: 'opt-3', text: '8 🎱', visualEmoji: '8️⃣', isCorrect: false }
        ],
        explanation: 'Hebat sekali! 2 manik bawah + 1 manik atas (5) = 7!',
        hint: 'Naikkan 2, turunkan 5, jadilah 7.'
      }
    ]
  },

  // =========================================================================
  // 7. SD KELAS 1 - PENJUMLAHAN & PENGURANGAN DASAR PADA SEMPOA (1-20)
  // =========================================================================
  {
    id: 'mod-sd1-sempoa-tambah-kurang',
    subjectId: 'sempoa',
    gradeId: 'sd-1',
    order: 1,
    title: 'Penjumlahan & Pengurangan Dasar Tanpa Rumus (1-20) pada Sempoa',
    shortDesc: 'Belajar operasi tambah dan kurang sederhana menggunakan tiang puluhan dan satuan pada sempoa.',
    fullDesc: 'Fase A (Kelas 1): Menggunakan 2 tiang sempoa (tiang puluhan dan satuan) untuk menyelesaikan operasi hitung 1 sampai 20 tanpa rumus, seperti 4 + 5 = 9, 12 + 6 = 18, dan 17 - 5 = 12.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Nilai Tempat Puluhan & Satuan, Operasi Hitung Dasar Sempoa 1-20',
    estimatedMinutes: 6,
    starsReward: 25,
    coverEmoji: '🧮',
    themeColor: 'from-[#8E24AA] to-[#4A148C]',
    themeBg: 'bg-[#F3E5F5] border-[#BA68C8]',
    themeBorder: 'border-[#BA68C8]',
    tags: ['SD 1', 'Sempoa', 'Operasi 1-20', 'Puluhan & Satuan'],
    badgeReward: {
      id: 'badge_sd1_sempoa_juara',
      name: 'Kalkulator Cilik Sempoa',
      description: 'Luar biasa! Kamu bisa menjumlahkan dan mengurangkan angka 1-20 dengan sempoa secepat kilat!',
      emoji: '🧮',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd1-sempoa-1',
        title: 'Mengenal Tiang Puluhan & Satuan',
        subtitle: 'Tiang kedua dari kanan bernilai puluhan (10, 20, 30...)',
        type: 'abacus_interactive',
        prompt: 'Bentuk angka 15 pada sempoa! Naikkan 1 manik bawah di tiang Puluhan (10), dan turunkan 1 manik atas di tiang Satuan (5).',
        speechText: 'Untuk membentuk angka 15: naikkan satu manik bawah di tiang puluhan bernilai sepuluh, dan turunkan manik atas di tiang satuan bernilai lima. 10 ditambah 5 sama dengan 15!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 15,
          operationType: 'double_digit',
          showFormula: 'Tiang Puluhan (10) + Tiang Satuan (5) = Angka 15.',
          formulaTitle: '💡 Nilai Tempat Puluhan & Satuan'
        },
        tips: 'Tiang paling kanan adalah Satuan, tiang di sebelah kirinya adalah Puluhan.'
      },
      {
        id: 'step-sd1-sempoa-2',
        title: 'Operasi Tambah Sederhana: 12 + 6 = 18',
        subtitle: 'Jumlahkan manik satuan secara bertahap',
        type: 'abacus_interactive',
        prompt: 'Mula-mula pasang angka 12 di sempoa, lalu tambahkan 6 (turunkan 5 dan naikkan 1 di tiang satuan). Hasilnya adalah 18!',
        speechText: 'Pasang angka 12. Sekarang tambah 6 pada tiang satuan: turunkan manik lima dan naikkan satu manik bawah. Sempoa kita sekarang bernilai 18!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 18,
          operationType: 'addition',
          showFormula: '12 + 6: Pada tiang satuan (2 + 6 = 8). Hasil akhir = 18.',
          formulaTitle: '➕ Penjumlahan Langsung 12 + 6 = 18'
        },
        tips: 'Kerjakan tiang puluhan dan tiang satuan dengan teliti.'
      },
      {
        id: 'step-sd1-sempoa-3',
        title: 'Operasi Kurang Sederhana: 17 - 5 = 12',
        subtitle: 'Menjauhkan manik dari palang tengah',
        type: 'abacus_interactive',
        prompt: 'Sekarang coba bentuk angka 12 hasil dari pengurangan 17 dikurang 5!',
        speechText: 'Dari angka 17, kita kurangi 5 dengan menaikkan kembali manik atas ke atas. Hasil akhirnya adalah 12!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 12,
          operationType: 'subtraction',
          showFormula: '17 - 5: Naikkan manik 5 menjauhi palang pada tiang satuan. Sisa = 12.',
          formulaTitle: '➖ Pengurangan Langsung 17 - 5 = 12'
        },
        tips: 'Mengurangi artinya menjauhkan manik dari palang tengah.'
      },
      {
        id: 'step-sd1-sempoa-4',
        title: 'Selamat! Kamu Hebat Berhitung Sempoa',
        type: 'summary',
        prompt: 'Luar biasa! Kamu sudah menguasai operasi tambah dan kurang pada sempoa. Yuk uji kecepatanmu di kuis!',
        speechText: 'Hebat sekali! Otak dan jemarimu bekerja kompak dan cepat. Mari kita mulai kuis sempoa kelas 1!'
      }
    ],
    quiz: [
      {
        id: 'q-sd1-sempoa-1',
        questionNumber: 1,
        prompt: 'Jika pada tiang puluhan ada 1 manik bawah naik (10) dan tiang satuan ada 4 manik bawah naik (4), berapakah total nilainya?',
        speechPrompt: 'Jika pada tiang puluhan ada 1 manik naik dan tiang satuan ada 4 manik naik, berapakah nilainya?',
        equationVisual: '10 + 4 = ?',
        options: [
          { id: 'opt-1', text: '14', visualEmoji: '🔢', isCorrect: true },
          { id: 'opt-2', text: '5', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '41', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Tepat sekali! 1 Puluhan + 4 Satuan = 14.',
        hint: 'Sepuluh ditambah empat = empat belas.'
      },
      {
        id: 'q-sd1-sempoa-2',
        questionNumber: 2,
        prompt: 'Berapakah hasil dari 13 + 5 jika diselesaikan menggunakan sempoa?',
        speechPrompt: 'Berapakah hasil dari 13 ditambah 5 jika dihitung dengan sempoa?',
        equationVisual: '13 + 5 = ?',
        options: [
          { id: 'opt-1', text: '18', visualEmoji: '🎯', isCorrect: true },
          { id: 'opt-2', text: '17', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '19', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Benar! Pada tiang satuan 3 + 5 = 8. Ditambah 1 puluhan menjadi 18.',
        hint: '13 + 5 = 18.'
      },
      {
        id: 'q-sd1-sempoa-3',
        questionNumber: 3,
        prompt: 'Berapakah hasil dari 19 - 4 pada sempoa?',
        speechPrompt: 'Berapakah hasil dari 19 dikurang 4 pada sempoa?',
        equationVisual: '19 - 4 = ?',
        options: [
          { id: 'opt-1', text: '15', visualEmoji: '✨', isCorrect: true },
          { id: 'opt-2', text: '14', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '16', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Pintar! Turunkan 4 manik bawah pada tiang satuan. Tersisa manik 5 dan 1 puluhan = 15.',
        hint: '9 - 4 = 5. Jadi 19 - 4 = 15.'
      },
      {
        id: 'q-sd1-sempoa-4',
        questionNumber: 4,
        prompt: 'Untuk membentuk angka 20 pada sempoa, manik apakah yang harus dinaikkan?',
        speechPrompt: 'Untuk membentuk angka 20 pada sempoa, manik apakah yang harus dinaikkan?',
        equationVisual: 'Angka 20 di Sempoa',
        options: [
          { id: 'opt-1', text: '2 manik bawah pada Tiang Puluhan ✌️', visualEmoji: '✌️', isCorrect: true },
          { id: 'opt-2', text: '20 manik di tiang satuan', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '1 manik atas di tiang ribuan', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Hebat! Tiap manik bawah di tiang puluhan bernilai 10. Dua manik = 20.',
        hint: '10 + 10 = 20.'
      },
      {
        id: 'q-sd1-sempoa-5',
        questionNumber: 5,
        prompt: 'Berapakah hasil dari 11 + 3 + 5 pada sempoa?',
        speechPrompt: 'Berapakah hasil dari 11 ditambah 3 ditambah 5 pada sempoa?',
        equationVisual: '11 + 3 + 5 = ?',
        options: [
          { id: 'opt-1', text: '19', visualEmoji: '🏆', isCorrect: true },
          { id: 'opt-2', text: '18', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '20', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Luar biasa! 11 + 3 = 14, lalu 14 + 5 = 19!',
        hint: '1 + 3 + 5 = 9 pada tiang satuan. Total = 19.'
      }
    ]
  },

  // =========================================================================
  // 8. SD KELAS 2 - SEMPOA: RUMUS TEMAN KECIL (+5) & OPERASI PULUHAN (1-100)
  // =========================================================================
  {
    id: 'mod-sd2-sempoa-teman-kecil',
    subjectId: 'sempoa',
    gradeId: 'sd-2',
    order: 1,
    title: 'Sempoa: Rumus Teman Kecil (+5) & Operasi Puluhan (1-100)',
    shortDesc: 'Pelajari rumus kombinasi 5 (Teman Kecil: +1 = +5-4, +2 = +5-3, +3 = +5-2, +4 = +5-1) untuk penjumlahan cepat.',
    fullDesc: 'Fase A (Kelas 2): Menguasai rumus kombinasi 5 (Small Friends) saat manik bawah tidak mencukupi untuk ditambah langsung, serta menyelesaikan operasi 2 digit hingga 100.',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Rumus Teman Kecil (+5), Logika Komplementer 5 & Operasi Hitung Puluhan',
    estimatedMinutes: 6,
    starsReward: 25,
    coverEmoji: '🧮',
    themeColor: 'from-[#7B1FA2] to-[#4A148C]',
    themeBg: 'bg-[#F3E5F5] border-[#AB47BC]',
    themeBorder: 'border-[#AB47BC]',
    tags: ['SD 2', 'Sempoa', 'Teman Kecil 5', 'Operasi Puluhan'],
    badgeReward: {
      id: 'badge_sd2_sempoa_arsitek',
      name: 'Master Teman Kecil Sempoa',
      description: 'Luar biasa! Kamu menguasai rumus kombinasi 5 dengan sangat presisi!',
      emoji: '🧮',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd2-sempoa-1',
        title: 'Mengenal Pasangan Teman Kecil (Jumlah = 5)',
        subtitle: '1 teman 4 • 2 teman 3 • 3 teman 2 • 4 teman 1',
        type: 'abacus_interactive',
        prompt: 'Jika kita punya angka 4 dan ingin menambah 1 (4 + 1), manik bawah sudah habis. Caranya: Turunkan manik 5 dan buang 4 manik bawah (+1 = +5 - 4)! Coba bentuk angka 5!',
        speechText: 'Saat manik bawah tidak cukup, gunakan Teman Kecil lima! Rumus tambah satu adalah: turunkan lima, kurangi empat. 4 ditambah 1 menjadi 5!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 5,
          operationType: 'small_friend',
          showFormula: 'Rumus Teman Kecil: +1 = +5 - 4. Pasangan: (1 & 4), (2 & 3), (3 & 2), (4 & 1).',
          formulaTitle: '🤝 Rumus Teman Kecil (+5)'
        },
        tips: 'Ingat pasangan teman kecil: 1 dengan 4, 2 dengan 3.'
      },
      {
        id: 'step-sd2-sempoa-2',
        title: 'Penjumlahan Teman Kecil: 4 + 3 = 7',
        subtitle: 'Rumus +3 = +5 - 2',
        type: 'abacus_interactive',
        prompt: 'Hitung 4 + 3 pada sempoa: Turunkan manik 5 dan buang 2 manik bawah (+3 = +5 - 2). Hasil akhirnya adalah 7!',
        speechText: 'Untuk menambah tiga: turunkan manik lima, lalu turunkan dua manik bawah. Sekarang sempoa kita bernilai 7!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 7,
          operationType: 'small_friend',
          showFormula: '4 + 3: Karena manik bawah kurang, gunakan rumus +3 = +5 - 2. Total = 7.',
          formulaTitle: '⚡ Rumus +3 = +5 - 2'
        },
        tips: 'Teman kecil dari 3 adalah 2 (karena 3 + 2 = 5).'
      },
      {
        id: 'step-sd2-sempoa-3',
        title: 'Operasi Puluhan: 35 + 14 = 49',
        subtitle: 'Menggabungkan operasi di tiang puluhan dan satuan',
        type: 'abacus_interactive',
        prompt: 'Sekarang mari selesaikan 35 + 14 = 49 pada sempoa 4 tiang!',
        speechText: 'Pada tiang puluhan 30 ditambah 10 menjadi 40. Pada tiang satuan 5 ditambah 4 menjadi 9. Hasilnya adalah 49!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 49,
          operationType: 'double_digit',
          showFormula: '35 + 14 = (30 + 10) + (5 + 4) = 40 + 9 = 49.',
          formulaTitle: '🧮 Penjumlahan Puluhan Sempoa'
        },
        tips: 'Kerjakan tiang puluhan terlebih dahulu, baru kemudian tiang satuan.'
      },
      {
        id: 'step-sd2-sempoa-4',
        title: 'Luar Biasa! Kamu Siap Kuis Teman Kecil',
        type: 'summary',
        prompt: 'Hebat sekali! Kamu sudah menguasai rumus Teman Kecil 5 dan operasi puluhan. Yuk raih skor sempurna di kuis!',
        speechText: 'Kamu hebat luar biasa! Rumus teman kecil membuat perhitunganmu semakin cepat. Ayo kita mulai kuis!'
      }
    ],
    quiz: [
      {
        id: 'q-sd2-sempoa-1',
        questionNumber: 1,
        prompt: 'Siapakah pasangan "Teman Kecil" dari angka 2 untuk membentuk jumlah 5?',
        speechPrompt: 'Siapakah pasangan Teman Kecil dari angka 2 untuk membentuk jumlah 5?',
        equationVisual: '2 + [ ? ] = 5',
        options: [
          { id: 'opt-1', text: 'Angka 3 🤝', visualEmoji: '3️⃣', isCorrect: true },
          { id: 'opt-2', text: 'Angka 4', visualEmoji: '4️⃣', isCorrect: false },
          { id: 'opt-3', text: 'Angka 1', visualEmoji: '1️⃣', isCorrect: false }
        ],
        explanation: 'Benar! Teman kecil dari 2 adalah 3 karena 2 + 3 = 5.',
        hint: 'Berapa yang dibutuhkan 2 agar menjadi 5? Tiga!'
      },
      {
        id: 'q-sd2-sempoa-2',
        questionNumber: 2,
        prompt: 'Rumus Teman Kecil untuk menambah 4 (+4) saat manik bawah tidak cukup adalah...',
        speechPrompt: 'Rumus Teman Kecil untuk menambah 4 saat manik bawah tidak cukup adalah apa?',
        equationVisual: 'Rumus +4 = ?',
        options: [
          { id: 'opt-1', text: '+4 = +5 - 1 ⚡', visualEmoji: '⚡', isCorrect: true },
          { id: 'opt-2', text: '+4 = +10 - 6', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '+4 = +5 + 1', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Tambah 5 lalu kurangi teman kecilnya yaitu 1 (+5 - 1).',
        hint: 'Teman kecil dari 4 adalah 1.'
      },
      {
        id: 'q-sd2-sempoa-3',
        questionNumber: 3,
        prompt: 'Berapakah hasil dari 4 + 4 dihitung dengan rumus sempoa (+4 = +5 - 1)?',
        speechPrompt: 'Berapakah hasil dari 4 ditambah 4 dihitung dengan rumus sempoa?',
        equationVisual: '4 + 4 = 4 + 5 - 1 = ?',
        options: [
          { id: 'opt-1', text: '8', visualEmoji: '8️⃣', isCorrect: true },
          { id: 'opt-2', text: '7', visualEmoji: '7️⃣', isCorrect: false },
          { id: 'opt-3', text: '9', visualEmoji: '9️⃣', isCorrect: false }
        ],
        explanation: 'Pintar! 4 + 5 = 9, dikurang 1 = 8.',
        hint: '4 + 4 = 8.'
      },
      {
        id: 'q-sd2-sempoa-4',
        questionNumber: 4,
        prompt: 'Berapakah hasil dari 23 + 25 pada sempoa?',
        speechPrompt: 'Berapakah hasil dari 23 ditambah 25 pada sempoa?',
        equationVisual: '23 + 25 = ?',
        options: [
          { id: 'opt-1', text: '48', visualEmoji: '🎯', isCorrect: true },
          { id: 'opt-2', text: '45', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '58', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Hebat! Puluhan: 20 + 20 = 40. Satuan: 3 + 5 = 8. Total = 48.',
        hint: '23 + 25 = 48.'
      },
      {
        id: 'q-sd2-sempoa-5',
        questionNumber: 5,
        prompt: 'Manakah cara mengurangkan 2 (-2) dengan rumus Teman Kecil (-2 = -5 + 3)?',
        speechPrompt: 'Bagaimana cara mengurangkan 2 dengan rumus teman kecil?',
        equationVisual: 'Rumus Kurang: -2 = -5 + 3',
        options: [
          { id: 'opt-1', text: 'Naikkan manik 5 menjauhi palang, lalu naikkan 3 manik bawah ✅', visualEmoji: '✅', isCorrect: true },
          { id: 'opt-2', text: 'Turunkan semua manik', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Nol-kan sempoa seketika', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Luar biasa! Buang 5 lalu kembalikan teman kecilnya yaitu 3.',
        hint: 'Minus lima ditambah tiga sama dengan minus dua.'
      }
    ]
  },

  // =========================================================================
  // 9. SD KELAS 3 - SEMPOA: RUMUS TEMAN BESAR (+10) & RATUSAN (1-1.000)
  // =========================================================================
  {
    id: 'mod-sd3-sempoa-teman-besar',
    subjectId: 'sempoa',
    gradeId: 'sd-3',
    order: 1,
    title: 'Sempoa: Kombinasi Teman Besar (+10) & Operasi Ratusan (1-1.000)',
    shortDesc: 'Kuasai rumus Teman Besar puluhan (+9 = +10-1, +8 = +10-2, +7 = +10-3, dst) hingga operasi ratusan.',
    fullDesc: 'Fase B (Kelas 3): Menyelesaikan penjumlahan dan pengurangan dengan menyeberang tiang (carry over) menggunakan rumus kombinasi 10 (Big Friends) serta operasi 3 digit (ratusan).',
    kurikulumFase: 'Fase B (SD Kelas 3)',
    kurikulumFokus: 'Rumus Teman Besar (+10), Penyeberangan Tiang & Operasi Ratusan',
    estimatedMinutes: 7,
    starsReward: 30,
    coverEmoji: '🧮',
    themeColor: 'from-[#6A1B9A] to-[#311B92]',
    themeBg: 'bg-[#EDE7F6] border-[#B39DDB]',
    themeBorder: 'border-[#B39DDB]',
    tags: ['SD 3', 'Sempoa', 'Teman Besar 10', 'Operasi Ratusan'],
    badgeReward: {
      id: 'badge_sd3_sempoa_pakar',
      name: 'Pakar Teman Besar Soroban',
      description: 'Luar biasa! Kamu menyelesaikan perhitungan ratusan dengan rumus Teman Besar secara akurat!',
      emoji: '🧮',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd3-sempoa-1',
        title: 'Mengenal Pasangan Teman Besar (Jumlah = 10)',
        subtitle: '9 teman 1 • 8 teman 2 • 7 teman 3 • 6 teman 4 • 5 teman 5',
        type: 'abacus_interactive',
        prompt: 'Contoh: 9 + 9. Tiang satuan sudah penuh 9. Caranya: Naikkan 1 di tiang puluhan (+10) dan buang 1 di tiang satuan (-1). Rumus: +9 = +10 - 1. Coba bentuk angka 18!',
        speechText: 'Saat tiang satuan tidak cukup, gunakan Teman Besar 10! Rumus tambah sembilan adalah: tambah sepuluh di tiang kiri, kurangi satu di tiang satuan. 9 ditambah 9 sama dengan 18!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 18,
          operationType: 'big_friend',
          showFormula: 'Rumus Teman Besar: +9 = +10 - 1. Pasangan: (9 & 1), (8 & 2), (7 & 3), (6 & 4), (5 & 5).',
          formulaTitle: '🌟 Rumus Teman Besar (+10)'
        },
        tips: 'Teman besar selalu berjumlah 10 jika digabungkan.'
      },
      {
        id: 'step-sd3-sempoa-2',
        title: 'Operasi Ratusan: 125 + 234 = 359',
        subtitle: 'Bekerja dengan 3 tiang: Ratusan, Puluhan, dan Satuan',
        type: 'abacus_interactive',
        prompt: 'Bentuk angka 359 hasil dari 125 + 234 pada sempoa 4 tiang!',
        speechText: 'Tiang ratusan: 100 + 200 = 300. Tiang puluhan: 20 + 30 = 50. Tiang satuan: 5 + 4 = 9. Total sempoa adalah 359!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 359,
          operationType: 'addition',
          showFormula: '125 + 234 = 300 + 50 + 9 = 359.',
          formulaTitle: '🧮 Penjumlahan 3 Digit Ratusan'
        },
        tips: 'Selalu gerakkan tiang dari sebelah kiri (ratusan) ke kanan (satuan).'
      },
      {
        id: 'step-sd3-sempoa-3',
        title: 'Hebat! Kamu Siap Uji Kemampuan Fase B',
        type: 'summary',
        prompt: 'Luar biasa! Kamu sudah menguasai rumus Teman Besar dan operasi ratusan. Mari selesaikan 5 soal kuis!',
        speechText: 'Kemampuan sempoamu luar biasa pesat! Mari kita selesaikan kuis sempoa kelas 3!'
      }
    ],
    quiz: [
      {
        id: 'q-sd3-sempoa-1',
        questionNumber: 1,
        prompt: 'Siapakah pasangan "Teman Besar" dari angka 8 untuk menghasilkan jumlah 10?',
        speechPrompt: 'Siapakah pasangan Teman Besar dari angka 8 untuk menghasilkan jumlah 10?',
        equationVisual: '8 + [ ? ] = 10',
        options: [
          { id: 'opt-1', text: 'Angka 2 ✌️', visualEmoji: '2️⃣', isCorrect: true },
          { id: 'opt-2', text: 'Angka 3', visualEmoji: '3️⃣', isCorrect: false },
          { id: 'opt-3', text: 'Angka 5', visualEmoji: '5️⃣', isCorrect: false }
        ],
        explanation: 'Benar! Teman besar dari 8 adalah 2 karena 8 + 2 = 10.',
        hint: '10 dikurang 8 sama dengan 2.'
      },
      {
        id: 'q-sd3-sempoa-2',
        questionNumber: 2,
        prompt: 'Rumus Teman Besar untuk menambah 7 (+7) pada sempoa adalah...',
        speechPrompt: 'Rumus Teman Besar untuk menambah 7 pada sempoa adalah apa?',
        equationVisual: 'Rumus +7 = ?',
        options: [
          { id: 'opt-1', text: '+7 = +10 - 3 ⚡', visualEmoji: '⚡', isCorrect: true },
          { id: 'opt-2', text: '+7 = +10 - 4', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '+7 = +5 + 2', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Naikkan 1 di tiang puluhan (+10) dan buang 3 di tiang satuan (-3).',
        hint: 'Teman besar dari 7 adalah 3.'
      },
      {
        id: 'q-sd3-sempoa-3',
        questionNumber: 3,
        prompt: 'Berapakah hasil dari 28 + 14 jika dihitung dengan sempoa?',
        speechPrompt: 'Berapakah hasil dari 28 ditambah 14 pada sempoa?',
        equationVisual: '28 + 14 = ?',
        options: [
          { id: 'opt-1', text: '42', visualEmoji: '🎯', isCorrect: true },
          { id: 'opt-2', text: '41', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '38', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Pintar! 28 + 10 = 38, lalu 38 + 4 (+10-6) = 42!',
        hint: '28 + 14 = 42.'
      },
      {
        id: 'q-sd3-sempoa-4',
        questionNumber: 4,
        prompt: 'Berapakah hasil dari 250 + 175 pada sempoa ratusan?',
        speechPrompt: 'Berapakah hasil dari 250 ditambah 175 pada sempoa?',
        equationVisual: '250 + 175 = ?',
        options: [
          { id: 'opt-1', text: '425', visualEmoji: '✨', isCorrect: true },
          { id: 'opt-2', text: '325', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '415', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Luar biasa! 200 + 100 = 300, 50 + 70 = 120 (jadi 420), lalu + 5 = 425.',
        hint: '250 + 175 = 425.'
      },
      {
        id: 'q-sd3-sempoa-5',
        questionNumber: 5,
        prompt: 'Manfaat utama mempelajari rumus Teman Besar pada sempoa adalah...',
        speechPrompt: 'Manfaat utama mempelajari rumus Teman Besar pada sempoa adalah apa?',
        equationVisual: '🧠 Manfaat Sempoa Soroban',
        options: [
          { id: 'opt-1', text: 'Dapat berhitung cepat tanpa kalkulator dan melatih konsentrasi otak kanan 🧠', visualEmoji: '🧠', isCorrect: true },
          { id: 'opt-2', text: 'Membuat tangan lelah', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Hanya sebagai mainan pajangan', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Hebat! Sempoa merangsang visualisasi mental aritmatika dan daya ingat konsentrasi.',
        hint: 'Melatih otak kanan dan kecepatan berhitung mental.'
      }
    ]
  },

  // =========================================================================
  // 10. SD KELAS 4-6 - SEMPOA: MENTAL ARITMATIKA & PERKALIAN SOROBAN
  // =========================================================================
  {
    id: 'mod-sd46-sempoa-mental-aritmatika',
    subjectId: 'sempoa',
    gradeId: 'sd-4-6',
    order: 1,
    title: 'Mental Aritmatika Sempoa Bayangan Cepat & Perkalian Soroban',
    shortDesc: 'Melatih teknik Anzan (bayangan sempoa di pikiran) dan metode perkalian multi-digit dengan soroban.',
    fullDesc: 'Fase B & C (Kelas 4-6): Melatih mental aritmatika (Anzan) tanpa alat fisik melalui visualisasi manik sempoa di memori otak, serta menguasai teknik perkalian bersusun pada tiang sempoa.',
    kurikulumFase: 'Fase B & C (SD Kelas 4-6)',
    kurikulumFokus: 'Mental Aritmatika Anzan, Perkalian Soroban & Kecepatan Komputasi',
    estimatedMinutes: 7,
    starsReward: 30,
    coverEmoji: '🧮',
    themeColor: 'from-[#4A148C] to-[#1A237E]',
    themeBg: 'bg-[#EDE7F6] border-[#9575CD]',
    themeBorder: 'border-[#9575CD]',
    tags: ['SD 4-6', 'Sempoa', 'Mental Aritmatika', 'Perkalian Soroban'],
    badgeReward: {
      id: 'badge_sd46_grandmaster_sempoa',
      name: 'Grandmaster Mental Aritmatika',
      description: 'Luar biasa spektakuler! Kecepatan mental aritmatika sempoamu setara kalkulator!',
      emoji: '🧮',
      category: 'math'
    },
    steps: [
      {
        id: 'step-sd46-sempoa-1',
        title: 'Teknik Anzan: Membayangkan Sempoa di Udara',
        subtitle: 'Gerakkan jari imajiner untuk memindahkan manik di pikiran',
        type: 'abacus_interactive',
        prompt: 'Coba hitung mental: 25 + 13 + 51 = 89. Bentuk hasil akhirnya 89 pada simulator sempoa!',
        speechText: 'Teknik Anzan adalah melihat bayangan sempoa di dalam pikiran. Bayangkan manik-manik bergerak naik dan turun saat kamu mendengar angka!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 89,
          operationType: 'double_digit',
          showFormula: 'Mental Anzan: 25 + 13 = 38. Lalu 38 + 51 = 89.',
          formulaTitle: '🧠 Visualisasi Mental Aritmatika (Anzan)'
        },
        tips: 'Tutup mata sejenak dan lihat 4 tiang sempoa di pikiranmu.'
      },
      {
        id: 'step-sd46-sempoa-2',
        title: 'Perkalian pada Sempoa: 24 × 6 = 144',
        subtitle: 'Kalikan puluhan (20 × 6 = 120) lalu satuan (4 × 6 = 24)',
        type: 'abacus_interactive',
        prompt: 'Hitung perkalian 24 × 6 = 144 pada sempoa! Bentuk angka 144 (1 ratusan, 4 puluhan, 4 satuan).',
        speechText: 'Pada sempoa, 20 dikali 6 sama dengan 120. 4 dikali 6 sama dengan 24. 120 ditambah 24 sama dengan 144!',
        interactiveData: {
          interactiveType: 'abacus_interactive',
          rodsCount: 4,
          targetNumber: 144,
          operationType: 'addition',
          showFormula: '24 × 6: (20 × 6 = 120) + (4 × 6 = 24) = 144.',
          formulaTitle: '✖️ Perkalian Soroban: 24 × 6 = 144'
        },
        tips: 'Jumlahkan hasil perkalian bagian puluhan dan satuan secara berurutan.'
      },
      {
        id: 'step-sd46-sempoa-3',
        title: 'Hebat! Kamu Siap Kuis Grandmaster',
        type: 'summary',
        prompt: 'Luar biasa! Kamu telah menguasai sempoa dari tingkat dasar hingga mental aritmatika lanjutan. Yuk raih bintang emas!',
        speechText: 'Kamu adalah juara sejati! Mari selesaikan kuis mental aritmatika sempoa kelas 4 sampai 6!'
      }
    ],
    quiz: [
      {
        id: 'q-sd46-sempoa-1',
        questionNumber: 1,
        prompt: 'Teknik berhitung cepat dengan membayangkan manik sempoa bergerak di dalam pikiran disebut teknik...',
        speechPrompt: 'Teknik berhitung cepat dengan membayangkan manik sempoa di dalam pikiran disebut teknik apa?',
        equationVisual: '🧠 Bayangan Sempoa Mental',
        options: [
          { id: 'opt-1', text: 'Anzan (Mental Soroban) 🧠', visualEmoji: '🧠', isCorrect: true },
          { id: 'opt-2', text: 'Kalkulator Elektrik', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: 'Menebak Acak', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Benar! Anzan adalah metode mental aritmatika visualisasi soroban asal Jepang.',
        hint: 'Kata berawalan huruf A yang terkenal dalam dunia sempoa.'
      },
      {
        id: 'q-sd46-sempoa-2',
        questionNumber: 2,
        prompt: 'Berapakah hasil dari 35 × 4 jika dihitung dengan metode sempoa (30×4 + 5×4)?',
        speechPrompt: 'Berapakah hasil dari 35 dikali 4 jika dihitung dengan sempoa?',
        equationVisual: '35 × 4 = (120 + 20) = ?',
        options: [
          { id: 'opt-1', text: '140', visualEmoji: '🎯', isCorrect: true },
          { id: 'opt-2', text: '130', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '150', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Tepat sekali! 30 × 4 = 120. 5 × 4 = 20. 120 + 20 = 140.',
        hint: '120 + 20 = 140.'
      },
      {
        id: 'q-sd46-sempoa-3',
        questionNumber: 3,
        prompt: 'Berapakah hasil hitung cepat dari deret mental: 15 + 25 + 30 + 10?',
        speechPrompt: 'Berapakah hasil hitung cepat dari 15 ditambah 25 ditambah 30 ditambah 10?',
        equationVisual: '15 + 25 + 30 + 10 = ?',
        options: [
          { id: 'opt-1', text: '80 ⚡', visualEmoji: '8️⃣', isCorrect: true },
          { id: 'opt-2', text: '75', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '85', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Pintar! 15 + 25 = 40. 40 + 30 = 70. 70 + 10 = 80!',
        hint: '40 + 40 = 80.'
      },
      {
        id: 'q-sd46-sempoa-4',
        questionNumber: 4,
        prompt: 'Jika sebuah bilangan ratusan di sempoa memiliki 5 di ratusan, 0 di puluhan, dan 8 di satuan, bilangan tersebut adalah...',
        speechPrompt: 'Jika di sempoa ada 5 di ratusan, 0 di puluhan, dan 8 di satuan, bilangan itu adalah berapa?',
        equationVisual: 'Ratusan: 5, Puluhan: 0, Satuan: 8',
        options: [
          { id: 'opt-1', text: '508', visualEmoji: '🔢', isCorrect: true },
          { id: 'opt-2', text: '580', visualEmoji: '❌', isCorrect: false },
          { id: 'opt-3', text: '58', visualEmoji: '❌', isCorrect: false }
        ],
        explanation: 'Luar biasa! 500 + 0 + 8 = 508.',
        hint: 'Lima ratus delapan.'
      },
      {
        id: 'q-sd46-sempoa-5',
        questionNumber: 5,
        prompt: 'Berapakah hasil dari 72 ÷ 8 yang dapat diverifikasi dengan sempoa?',
        speechPrompt: 'Berapakah hasil dari 72 dibagi 8?',
        equationVisual: '72 ÷ 8 = ?',
        options: [
          { id: 'opt-1', text: '9 🌟', visualEmoji: '9️⃣', isCorrect: true },
          { id: 'opt-2', text: '8', visualEmoji: '8️⃣', isCorrect: false },
          { id: 'opt-3', text: '7', visualEmoji: '7️⃣', isCorrect: false }
        ],
        explanation: 'Hebat sekali! 8 × 9 = 72, sehingga 72 ÷ 8 = 9.',
        hint: 'Perkalian 8 yang menghasilkan 72 adalah 9.'
      }
    ]
  }
];
