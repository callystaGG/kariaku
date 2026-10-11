export type TracingCategory = 'huruf_kapital' | 'huruf_kecil' | 'angka' | 'pola_dasar';

export interface StrokePoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
}

export interface StrokeStep {
  stepNumber: number;
  instruction: string;
  arrow: string;
  speechInstruction: string;
  points: StrokePoint[]; // normalized points defining the stroke path
}

export interface TracingItem {
  id: string;
  char: string;
  label: string;
  category: TracingCategory;
  exampleWord: string;
  exampleEmoji: string;
  rhymeOrMotto?: string;
  phonicsSound: string;
  strokeGuide: string[];
  speechGuide: string;
  strokeSteps: StrokeStep[];
  countingCount?: number; // for numbers (e.g. 3 = 🍎🍎🍎)
}

// 1. HURUF KAPITAL (A - Z)
export const CAPITAL_LETTERS_TRACING: TracingItem[] = [
  {
    id: 'cap_A',
    char: 'A',
    label: 'Huruf A Besar',
    category: 'huruf_kapital',
    exampleWord: 'Apel',
    exampleEmoji: '🍎',
    rhymeOrMotto: 'A seperti tenda segitiga yang kokoh!',
    phonicsSound: 'A! A untuk Apel manis!',
    strokeGuide: [
      '1. Tarik garis miring dari atas ke kiri bawah ↙️',
      '2. Tarik garis miring dari atas ke kanan bawah ↘️',
      '3. Hubungkan garis mendatar di bagian tengah ➡️'
    ],
    speechGuide: 'Langkah satu: tarik garis miring dari atas ke kiri bawah. Langkah dua: tarik garis miring dari atas ke kanan bawah. Langkah tiga: tarik garis mendatar di tengah. Hebat!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik garis miring ke kiri bawah',
        arrow: '↙️',
        speechInstruction: 'Tarik garis miring dari puncak ke kiri bawah',
        points: [{ x: 0.5, y: 0.18 }, { x: 0.35, y: 0.48 }, { x: 0.22, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Tarik garis miring ke kanan bawah',
        arrow: '↘️',
        speechInstruction: 'Tarik garis miring dari puncak ke kanan bawah',
        points: [{ x: 0.5, y: 0.18 }, { x: 0.65, y: 0.48 }, { x: 0.78, y: 0.78 }]
      },
      {
        stepNumber: 3,
        instruction: 'Hubungkan garis mendatar di tengah',
        arrow: '➡️',
        speechInstruction: 'Hubungkan jembatan mendatar di tengah',
        points: [{ x: 0.32, y: 0.55 }, { x: 0.5, y: 0.55 }, { x: 0.68, y: 0.55 }]
      }
    ]
  },
  {
    id: 'cap_B',
    char: 'B',
    label: 'Huruf B Besar',
    category: 'huruf_kapital',
    exampleWord: 'Bola',
    exampleEmoji: '⚽',
    rhymeOrMotto: 'B punya satu tiang lurus dan dua perut bulat!',
    phonicsSound: 'B! B untuk Bola bulat!',
    strokeGuide: [
      '1. Tarik garis tegak lurus dari atas ke bawah ⬇️',
      '2. Buat lengkungan setengah lingkaran atas ↪️',
      '3. Buat lengkungan setengah lingkaran bawah ↪️'
    ],
    speechGuide: 'Langkah satu: garis lurus tegak turun ke bawah. Langkah dua: lengkungkan setengah lingkaran atas. Langkah tiga: lengkungkan setengah lingkaran bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik garis tegak dari atas ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak ke bawah',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.48 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Lengkungkan perut bagian atas',
        arrow: '↪️',
        speechInstruction: 'Buat lengkungan atas',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.58, y: 0.20 }, { x: 0.62, y: 0.33 }, { x: 0.58, y: 0.46 }, { x: 0.32, y: 0.46 }]
      },
      {
        stepNumber: 3,
        instruction: 'Lengkungkan perut bagian bawah',
        arrow: '↪️',
        speechInstruction: 'Buat lengkungan bawah',
        points: [{ x: 0.32, y: 0.46 }, { x: 0.62, y: 0.48 }, { x: 0.68, y: 0.62 }, { x: 0.62, y: 0.78 }, { x: 0.32, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_C',
    char: 'C',
    label: 'Huruf C Besar',
    category: 'huruf_kapital',
    exampleWord: 'Ceri',
    exampleEmoji: '🍒',
    rhymeOrMotto: 'C melengkung seperti bulan sabit manis di malam hari!',
    phonicsSound: 'C! C untuk Ceri merah!',
    strokeGuide: [
      '1. Mulai dari kanan atas, putar melengkung ke kiri ↩️',
      '2. Teruskan lengkungan ke bawah menuju kanan bawah ↪️'
    ],
    speechGuide: 'Mulai dari kanan atas, putar melengkung ke kiri, lalu teruskan ke bawah sampai kanan bawah seperti bulan sabit!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Lengkungkan seperti bulan sabit',
        arrow: '🔄',
        speechInstruction: 'Putar melengkung dari atas ke kiri bawah',
        points: [
          { x: 0.72, y: 0.24 },
          { x: 0.52, y: 0.18 },
          { x: 0.30, y: 0.32 },
          { x: 0.26, y: 0.48 },
          { x: 0.30, y: 0.64 },
          { x: 0.52, y: 0.78 },
          { x: 0.72, y: 0.72 }
        ]
      }
    ]
  },
  {
    id: 'cap_D',
    char: 'D',
    label: 'Huruf D Besar',
    category: 'huruf_kapital',
    exampleWord: 'Domba',
    exampleEmoji: '🐑',
    rhymeOrMotto: 'D punya tiang tegak dan satu perut gendut besar!',
    phonicsSound: 'D! D untuk Domba putih!',
    strokeGuide: [
      '1. Tarik garis tegak lurus dari atas ke bawah ⬇️',
      '2. Buat satu lengkungan perut besar dari atas sampai bawah ↪️'
    ],
    speechGuide: 'Langkah satu: tarik garis tegak ke bawah. Langkah dua: buat lengkungan besar dari puncak atas meliuk sampai ke dasar!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik garis tegak lurus ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis lurus dari atas ke bawah',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.48 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Buat lengkungan perut besar',
        arrow: '↪️',
        speechInstruction: 'Lengkungkan melingkar dari atas ke bawah',
        points: [
          { x: 0.32, y: 0.18 },
          { x: 0.60, y: 0.20 },
          { x: 0.72, y: 0.36 },
          { x: 0.72, y: 0.60 },
          { x: 0.60, y: 0.76 },
          { x: 0.32, y: 0.78 }
        ]
      }
    ]
  },
  {
    id: 'cap_E',
    char: 'E',
    label: 'Huruf E Besar',
    category: 'huruf_kapital',
    exampleWord: 'Elang',
    exampleEmoji: '🦅',
    rhymeOrMotto: 'E punya 1 tiang dan 3 cabang mendatar seperti sisir!',
    phonicsSound: 'E! E untuk Elang terbang!',
    strokeGuide: [
      '1. Tarik garis tegak lurus dari atas ke bawah ⬇️',
      '2. Tarik garis mendatar di atas ➡️',
      '3. Tarik garis mendatar di tengah ➡️',
      '4. Tarik garis mendatar di bawah ➡️'
    ],
    speechGuide: 'Tarik garis tegak ke bawah, lalu beri garis mendatar di atas, di tengah, dan di bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik garis tegak ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Garis tegak dari atas ke bawah',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.48 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Garis mendatar atas',
        arrow: '➡️',
        speechInstruction: 'Garis mendatar atas',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.68, y: 0.18 }]
      },
      {
        stepNumber: 3,
        instruction: 'Garis mendatar tengah',
        arrow: '➡️',
        speechInstruction: 'Garis mendatar tengah',
        points: [{ x: 0.32, y: 0.48 }, { x: 0.58, y: 0.48 }]
      },
      {
        stepNumber: 4,
        instruction: 'Garis mendatar bawah',
        arrow: '➡️',
        speechInstruction: 'Garis mendatar bawah',
        points: [{ x: 0.32, y: 0.78 }, { x: 0.68, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_I',
    char: 'I',
    label: 'Huruf I Besar',
    category: 'huruf_kapital',
    exampleWord: 'Ikan',
    exampleEmoji: '🐟',
    rhymeOrMotto: 'I berdiri tegak lurus seperti lilin yang menyala!',
    phonicsSound: 'I! I untuk Ikan berenang!',
    strokeGuide: [
      '1. Tarik garis lurus tegak dari atas ke bawah ⬇️',
      '2. Beri garis kecil mendatar di atas ➡️ (opsional)',
      '3. Beri garis kecil mendatar di bawah ➡️ (opsional)'
    ],
    speechGuide: 'Tarik satu garis lurus tegak yang tegap dari atas ke bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis tegak lurus ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak lurus',
        points: [{ x: 0.5, y: 0.18 }, { x: 0.5, y: 0.48 }, { x: 0.5, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Topi kecil di atas',
        arrow: '➡️',
        speechInstruction: 'Garis mendatar di atas',
        points: [{ x: 0.36, y: 0.18 }, { x: 0.64, y: 0.18 }]
      },
      {
        stepNumber: 3,
        instruction: 'Sepatu kecil di bawah',
        arrow: '➡️',
        speechInstruction: 'Garis mendatar di bawah',
        points: [{ x: 0.36, y: 0.78 }, { x: 0.64, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_M',
    char: 'M',
    label: 'Huruf M Besar',
    category: 'huruf_kapital',
    exampleWord: 'Matahari',
    exampleEmoji: '☀️',
    rhymeOrMotto: 'M punya dua puncak gunung yang gagah menjulang tinggi!',
    phonicsSound: 'M! M untuk Matahari bersinar!',
    strokeGuide: [
      '1. Tarik garis tegak kiri dari atas ke bawah ⬇️',
      '2. Tarik garis miring dari kiri atas ke tengah bawah ↘️',
      '3. Tarik garis miring dari tengah bawah ke kanan atas ↗️',
      '4. Tarik garis tegak kanan dari atas ke bawah ⬇️'
    ],
    speechGuide: 'Tarik garis tegak kiri, garis miring ke tengah bawah, naik ke kanan atas, lalu turun tegak ke bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis tegak kiri',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak kiri',
        points: [{ x: 0.24, y: 0.18 }, { x: 0.24, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Garis miring ke lembah tengah',
        arrow: '↘️',
        speechInstruction: 'Turun miring ke tengah',
        points: [{ x: 0.24, y: 0.18 }, { x: 0.50, y: 0.62 }]
      },
      {
        stepNumber: 3,
        instruction: 'Garis miring naik ke puncak kanan',
        arrow: '↗️',
        speechInstruction: 'Naik miring ke kanan atas',
        points: [{ x: 0.50, y: 0.62 }, { x: 0.76, y: 0.18 }]
      },
      {
        stepNumber: 4,
        instruction: 'Garis tegak kanan',
        arrow: '⬇️',
        speechInstruction: 'Turun tegak di kanan',
        points: [{ x: 0.76, y: 0.18 }, { x: 0.76, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_O',
    char: 'O',
    label: 'Huruf O Besar',
    category: 'huruf_kapital',
    exampleWord: 'Obor',
    exampleEmoji: '🔥',
    rhymeOrMotto: 'O bulat sempurna seperti donat atau roda sepeda!',
    phonicsSound: 'O! O untuk Obor menyala!',
    strokeGuide: [
      '1. Mulai dari titik puncak atas, putar melengkung ke kiri 🔄',
      '2. Teruskan melingkar ke bawah, lalu naik kembali bertemu di atas ⭕'
    ],
    speechGuide: 'Mulai dari atas, putar melengkung ke kiri, kelilingi ke bawah, lalu naik kembali bertemu di puncak!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Putar lingkaran penuh berlawanan arah jarum jam',
        arrow: '🔄',
        speechInstruction: 'Putar lingkaran penuh dari atas ke kiri',
        points: [
          { x: 0.50, y: 0.18 },
          { x: 0.32, y: 0.24 },
          { x: 0.24, y: 0.48 },
          { x: 0.32, y: 0.72 },
          { x: 0.50, y: 0.78 },
          { x: 0.68, y: 0.72 },
          { x: 0.76, y: 0.48 },
          { x: 0.68, y: 0.24 },
          { x: 0.50, y: 0.18 }
        ]
      }
    ]
  },
  {
    id: 'cap_S',
    char: 'S',
    label: 'Huruf S Besar',
    category: 'huruf_kapital',
    exampleWord: 'Sepeda',
    exampleEmoji: '🚲',
    rhymeOrMotto: 'S meliuk anggun seperti ular yang ramah!',
    phonicsSound: 'S! S untuk Sepeda baru!',
    strokeGuide: [
      '1. Mulai dari kanan atas, lengkungkan ke kiri ↩️',
      '2. Liukkan ke tengah kanan, lalu belok melengkung ke kiri bawah ↪️'
    ],
    speechGuide: 'Mulai dari kanan atas, liukkan ke kiri, belok ke kanan tengah, lalu melengkung ke kiri bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Liukkan kurva atas dan bawah seperti ular',
        arrow: '〰️',
        speechInstruction: 'Liukkan melengkung seperti ular',
        points: [
          { x: 0.68, y: 0.24 },
          { x: 0.50, y: 0.18 },
          { x: 0.34, y: 0.28 },
          { x: 0.48, y: 0.46 },
          { x: 0.66, y: 0.58 },
          { x: 0.62, y: 0.74 },
          { x: 0.46, y: 0.78 },
          { x: 0.30, y: 0.72 }
        ]
      }
    ]
  },
  {
    id: 'cap_U',
    char: 'U',
    label: 'Huruf U Besar',
    category: 'huruf_kapital',
    exampleWord: 'Udang',
    exampleEmoji: '🦐',
    rhymeOrMotto: 'U melengkung seperti mangkuk air atau senyuman manis!',
    phonicsSound: 'U! U untuk Udang lezat!',
    strokeGuide: [
      '1. Tarik garis dari kiri atas turun ke bawah ⬇️',
      '2. Lengkungkan di dasar seperti mangkuk 🔄',
      '3. Tarik naik tegak ke kanan atas ⬆️'
    ],
    speechGuide: 'Turun dari kiri atas, lengkungkan di dasar mangkuk, lalu naik tegak ke kanan atas!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Turun, lengkungkan mangkuk, lalu naik',
        arrow: '🥣',
        speechInstruction: 'Turun ke bawah, lengkungkan di dasar, lalu naik lurus ke atas',
        points: [
          { x: 0.30, y: 0.18 },
          { x: 0.30, y: 0.58 },
          { x: 0.38, y: 0.74 },
          { x: 0.50, y: 0.78 },
          { x: 0.62, y: 0.74 },
          { x: 0.70, y: 0.58 },
          { x: 0.70, y: 0.18 }
        ]
      }
    ]
  },
  {
    id: 'cap_K',
    char: 'K',
    label: 'Huruf K Besar',
    category: 'huruf_kapital',
    exampleWord: 'Kucing',
    exampleEmoji: '🐱',
    rhymeOrMotto: 'K punya tiang tegak dengan tangan menyapa ke atas dan kaki melangkah ke bawah!',
    phonicsSound: 'K! K untuk Kucing lucu!',
    strokeGuide: [
      '1. Tarik garis lurus tegak dari atas ke bawah ⬇️',
      '2. Tarik garis miring dari kanan atas ke tengah tiang ↙️',
      '3. Tarik garis miring dari tengah tiang ke kanan bawah ↘️'
    ],
    speechGuide: 'Langkah satu: tarik garis lurus tegak. Langkah dua: tarik garis miring ke tengah tiang. Langkah tiga: tarik garis miring ke kanan bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik garis tegak ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Garis tegak lurus',
        points: [{ x: 0.30, y: 0.18 }, { x: 0.30, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Garis miring atas ke tengah',
        arrow: '↙️',
        speechInstruction: 'Tarik garis miring ke tengah',
        points: [{ x: 0.68, y: 0.20 }, { x: 0.30, y: 0.48 }]
      },
      {
        stepNumber: 3,
        instruction: 'Garis miring tengah ke bawah',
        arrow: '↘️',
        speechInstruction: 'Tarik garis miring ke kanan bawah',
        points: [{ x: 0.30, y: 0.48 }, { x: 0.70, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_T',
    char: 'T',
    label: 'Huruf T Besar',
    category: 'huruf_kapital',
    exampleWord: 'Topi',
    exampleEmoji: '👒',
    rhymeOrMotto: 'T punya atap mendatar yang lebar dan tiang penyangga tegak!',
    phonicsSound: 'T! T untuk Topi bundar!',
    strokeGuide: [
      '1. Tarik garis mendatar di bagian atas dari kiri ke kanan ➡️',
      '2. Tarik garis tegak lurus dari tengah atap turun ke bawah ⬇️'
    ],
    speechGuide: 'Tarik garis mendatar di atas seperti atap rumah, lalu tarik tiang lurus tegak tepat dari tengahnya ke bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis mendatar di atas',
        arrow: '➡️',
        speechInstruction: 'Garis atap mendatar',
        points: [{ x: 0.22, y: 0.18 }, { x: 0.78, y: 0.18 }]
      },
      {
        stepNumber: 2,
        instruction: 'Garis tegak dari tengah ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tiang tegak turun ke bawah',
        points: [{ x: 0.50, y: 0.18 }, { x: 0.50, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_L',
    char: 'L',
    label: 'Huruf L Besar',
    category: 'huruf_kapital',
    exampleWord: 'Lebah',
    exampleEmoji: '🐝',
    rhymeOrMotto: 'L berdiri tegak lalu melangkah santai ke kanan seperti sepatu!',
    phonicsSound: 'L! L untuk Lebah madu!',
    strokeGuide: [
      '1. Tarik garis tegak lurus dari atas ke bawah ⬇️',
      '2. Belok mendatar ke kanan di bagian dasar ➡️'
    ],
    speechGuide: 'Tarik garis tegak lurus turun ke bawah, lalu belok garis mendatar ke kanan di dasarnya!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis tegak turun ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Garis tegak turun ke dasar',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Garis mendatar ke kanan',
        arrow: '➡️',
        speechInstruction: 'Garis mendatar ke kanan',
        points: [{ x: 0.32, y: 0.78 }, { x: 0.72, y: 0.78 }]
      }
    ]
  },
  {
    id: 'cap_P',
    char: 'P',
    label: 'Huruf P Besar',
    category: 'huruf_kapital',
    exampleWord: 'Pisang',
    exampleEmoji: '🍌',
    rhymeOrMotto: 'P punya tiang tegak dan kepala melengkung di atas!',
    phonicsSound: 'P! P untuk Pisang manis!',
    strokeGuide: [
      '1. Tarik garis tegak lurus dari atas ke bawah ⬇️',
      '2. Buat lengkungan setengah lingkaran di bagian atas ↪️'
    ],
    speechGuide: 'Tarik garis tegak lurus ke bawah, lalu buat lengkungan kepala di sebelah kanan atas!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis tegak ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak ke bawah',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Lengkung kepala atas',
        arrow: '↪️',
        speechInstruction: 'Lengkungkan kepala di kanan atas',
        points: [
          { x: 0.32, y: 0.18 },
          { x: 0.60, y: 0.20 },
          { x: 0.66, y: 0.34 },
          { x: 0.58, y: 0.48 },
          { x: 0.32, y: 0.48 }
        ]
      }
    ]
  },
  {
    id: 'cap_R',
    char: 'R',
    label: 'Huruf R Besar',
    category: 'huruf_kapital',
    exampleWord: 'Roti',
    exampleEmoji: '🍞',
    rhymeOrMotto: 'R mirip huruf P tapi punya kaki miring yang kokoh melangkah!',
    phonicsSound: 'R! R untuk Roti lezat!',
    strokeGuide: [
      '1. Tarik garis tegak lurus dari atas ke bawah ⬇️',
      '2. Buat lengkungan kepala di kanan atas ↪️',
      '3. Tarik kaki miring dari bawah kepala ke kanan dasar ↘️'
    ],
    speechGuide: 'Tarik garis tegak, lengkungkan kepala di atas, lalu luncurkan kaki miring ke kanan bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis tegak ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Garis tegak ke bawah',
        points: [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Lengkung kepala atas',
        arrow: '↪️',
        speechInstruction: 'Lengkungkan kepala di atas',
        points: [
          { x: 0.32, y: 0.18 },
          { x: 0.60, y: 0.20 },
          { x: 0.66, y: 0.34 },
          { x: 0.58, y: 0.48 },
          { x: 0.32, y: 0.48 }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Kaki miring ke kanan bawah',
        arrow: '↘️',
        speechInstruction: 'Tarik kaki miring ke kanan bawah',
        points: [{ x: 0.46, y: 0.48 }, { x: 0.70, y: 0.78 }]
      }
    ]
  }
];

// 2. ANGKA (0 - 10) LENGKAP DENGAN RIMA & CARA GOORISAN
export const NUMBERS_TRACING: TracingItem[] = [
  {
    id: 'num_0',
    char: '0',
    label: 'Angka 0 (Nol)',
    category: 'angka',
    exampleWord: 'Nol (Kosong)',
    exampleEmoji: '🥚',
    countingCount: 0,
    rhymeOrMotto: 'Angka 0 bulat lonjong seperti telur ayam!',
    phonicsSound: 'Nol! Bulat mulus tidak bersudut!',
    strokeGuide: [
      '1. Mulai dari atas tengah, putar melengkung ke kiri 🔄',
      '2. Teruskan melingkar ke bawah, lalu naik kembali bertemu di atas ⭕'
    ],
    speechGuide: 'Mulai dari atas tengah, putar melengkung ke kiri turun ke dasar, lalu naik melingkar kembali ke atas!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Putar lingkaran lonjong',
        arrow: '🔄',
        speechInstruction: 'Putar lingkaran lonjong dari atas ke bawah dan naik lagi',
        points: [
          { x: 0.50, y: 0.18 },
          { x: 0.32, y: 0.28 },
          { x: 0.26, y: 0.48 },
          { x: 0.32, y: 0.70 },
          { x: 0.50, y: 0.78 },
          { x: 0.68, y: 0.70 },
          { x: 0.74, y: 0.48 },
          { x: 0.68, y: 0.28 },
          { x: 0.50, y: 0.18 }
        ]
      }
    ]
  },
  {
    id: 'num_1',
    char: '1',
    label: 'Angka 1 (Satu)',
    category: 'angka',
    exampleWord: 'Satu Jari / Tongkat',
    exampleEmoji: '☝️',
    countingCount: 1,
    rhymeOrMotto: 'Angka 1 tegak lurus seperti tiang bendera atau tongkat!',
    phonicsSound: 'Satu! Satu tiang tegak lurus!',
    strokeGuide: [
      '1. Tarik garis miring kecil naik dari kiri ke atas ↗️',
      '2. Tarik garis lurus tegak dari puncak turun ke dasar ⬇️'
    ],
    speechGuide: 'Langkah satu: naik miring sedikit ke puncak. Langkah dua: tarik garis lurus tegak ke bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik miring kecil ke puncak',
        arrow: '↗️',
        speechInstruction: 'Naik miring kecil ke atas',
        points: [{ x: 0.38, y: 0.32 }, { x: 0.50, y: 0.18 }]
      },
      {
        stepNumber: 2,
        instruction: 'Tarik lurus tegak ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak lurus turun ke bawah',
        points: [{ x: 0.50, y: 0.18 }, { x: 0.50, y: 0.48 }, { x: 0.50, y: 0.78 }]
      }
    ]
  },
  {
    id: 'num_2',
    char: '2',
    label: 'Angka 2 (Dua)',
    category: 'angka',
    exampleWord: 'Dua Bebek',
    exampleEmoji: '🦆',
    countingCount: 2,
    rhymeOrMotto: 'Angka 2 melengkung indah seperti leher bebek berenang!',
    phonicsSound: 'Dua! Lengkung leher bebek lalu mendatar di air!',
    strokeGuide: [
      '1. Lengkungkan kepala dari kiri ke kanan atas ↪️',
      '2. Tarik garis miring turun ke kiri bawah ↙️',
      '3. Tarik garis lurus mendatar di dasar ke kanan ➡️'
    ],
    speechGuide: 'Lengkungkan kepala bebek di atas, luncurkan garis miring ke kiri bawah, lalu tarik garis mendatar di dasar!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Lengkung kepala lalu miring ke dasar',
        arrow: '🦆',
        speechInstruction: 'Lengkungkan kepala lalu tarik miring ke kiri bawah',
        points: [
          { x: 0.32, y: 0.30 },
          { x: 0.44, y: 0.18 },
          { x: 0.66, y: 0.22 },
          { x: 0.66, y: 0.36 },
          { x: 0.50, y: 0.54 },
          { x: 0.30, y: 0.78 }
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Garis lurus mendatar di dasar',
        arrow: '➡️',
        speechInstruction: 'Tarik garis mendatar ke kanan',
        points: [{ x: 0.30, y: 0.78 }, { x: 0.50, y: 0.78 }, { x: 0.70, y: 0.78 }]
      }
    ]
  },
  {
    id: 'num_3',
    char: '3',
    label: 'Angka 3 (Tiga)',
    category: 'angka',
    exampleWord: 'Tiga Kupu-kupu',
    exampleEmoji: '🦋',
    countingCount: 3,
    rhymeOrMotto: 'Angka 3 meliuk ganda seperti kepakan sayap burung!',
    phonicsSound: 'Tiga! Lengkung atas dan lengkung bawah!',
    strokeGuide: [
      '1. Lengkungkan kurva atas dari kiri ke tengah ↪️',
      '2. Teruskan lengkungkan kurva bawah menuju kiri dasar ↪️'
    ],
    speechGuide: 'Lengkungkan kurva setengah lingkaran di atas, lalu lanjutkan melengkung kurva di bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Lengkung kurva atas ke tengah',
        arrow: '↪️',
        speechInstruction: 'Lengkungkan setengah lingkaran atas',
        points: [
          { x: 0.34, y: 0.24 },
          { x: 0.48, y: 0.18 },
          { x: 0.66, y: 0.26 },
          { x: 0.54, y: 0.46 }
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Lengkung kurva bawah ke dasar',
        arrow: '↪️',
        speechInstruction: 'Lengkungkan setengah lingkaran bawah',
        points: [
          { x: 0.54, y: 0.46 },
          { x: 0.68, y: 0.58 },
          { x: 0.62, y: 0.74 },
          { x: 0.46, y: 0.78 },
          { x: 0.32, y: 0.72 }
        ]
      }
    ]
  },
  {
    id: 'num_4',
    char: '4',
    label: 'Angka 4 (Empat)',
    category: 'angka',
    exampleWord: 'Empat Bintang',
    exampleEmoji: '⭐',
    countingCount: 4,
    rhymeOrMotto: 'Angka 4 kokoh seperti kursi yang terbalik!',
    phonicsSound: 'Empat! Miring, mendatar, lalu potong garis tegak!',
    strokeGuide: [
      '1. Tarik garis miring turun dari atas ke tengah kiri ↙️',
      '2. Belok mendatar ke kanan ➡️',
      '3. Tarik garis tegak memotong dari atas ke bawah ⬇️'
    ],
    speechGuide: 'Tarik garis miring ke tengah, belok mendatar ke kanan, lalu potong dengan garis tegak dari atas ke bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis miring lalu mendatar',
        arrow: '↙️➡️',
        speechInstruction: 'Tarik miring ke tengah lalu mendatar ke kanan',
        points: [{ x: 0.58, y: 0.18 }, { x: 0.28, y: 0.56 }, { x: 0.74, y: 0.56 }]
      },
      {
        stepNumber: 2,
        instruction: 'Garis tegak memotong',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak dari atas sampai dasar',
        points: [{ x: 0.60, y: 0.24 }, { x: 0.60, y: 0.78 }]
      }
    ]
  },
  {
    id: 'num_5',
    char: '5',
    label: 'Angka 5 (Lima)',
    category: 'angka',
    exampleWord: 'Lima Apel',
    exampleEmoji: '🍎',
    countingCount: 5,
    rhymeOrMotto: 'Angka 5 pakai topi keren dan punya perut gendut!',
    phonicsSound: 'Lima! Tiang pendek, perut gendut, dan topi mendatar!',
    strokeGuide: [
      '1. Tarik garis tegak pendek turun dari atas ⬇️',
      '2. Buat perut melengkung besar ke kanan lalu ke dasar ↪️',
      '3. Beri topi garis mendatar di atas ➡️'
    ],
    speechGuide: 'Tarik garis tegak pendek, buat perut gendut melengkung, lalu pasang topi garis mendatar di atasnya!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis tegak pendek turun',
        arrow: '⬇️',
        speechInstruction: 'Garis tegak pendek turun',
        points: [{ x: 0.38, y: 0.20 }, { x: 0.38, y: 0.44 }]
      },
      {
        stepNumber: 2,
        instruction: 'Perut gendut melengkung',
        arrow: '↪️',
        speechInstruction: 'Lengkungkan perut gendut ke kanan',
        points: [
          { x: 0.38, y: 0.44 },
          { x: 0.64, y: 0.46 },
          { x: 0.68, y: 0.62 },
          { x: 0.56, y: 0.76 },
          { x: 0.34, y: 0.74 }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Topi mendatar di atas',
        arrow: '➡️',
        speechInstruction: 'Tarik garis topi mendatar',
        points: [{ x: 0.38, y: 0.20 }, { x: 0.68, y: 0.20 }]
      }
    ]
  },
  {
    id: 'num_6',
    char: '6',
    label: 'Angka 6 (Enam)',
    category: 'angka',
    exampleWord: 'Enam Ikan',
    exampleEmoji: '🐟',
    countingCount: 6,
    rhymeOrMotto: 'Angka 6 meluncur melengkung lalu membuat pusaran lingkaran!',
    phonicsSound: 'Enam! Meluncur dari atas lalu buat perut bulat!',
    strokeGuide: [
      '1. Mulai dari kanan atas, meluncur melengkung ke kiri bawah ↙️',
      '2. Teruskan melingkar menutup perut bulat di bawah 🔄'
    ],
    speechGuide: 'Mulai dari atas, meluncur melengkung ke kiri bawah, lalu putar lingkaran penuh di bagian bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Meluncur lalu putar lingkaran bawah',
        arrow: '🔄',
        speechInstruction: 'Meluncur ke kiri bawah lalu buat lingkaran',
        points: [
          { x: 0.62, y: 0.20 },
          { x: 0.42, y: 0.28 },
          { x: 0.30, y: 0.50 },
          { x: 0.34, y: 0.72 },
          { x: 0.50, y: 0.78 },
          { x: 0.66, y: 0.70 },
          { x: 0.64, y: 0.54 },
          { x: 0.50, y: 0.48 },
          { x: 0.32, y: 0.56 }
        ]
      }
    ]
  },
  {
    id: 'num_7',
    char: '7',
    label: 'Angka 7 (Tujuh)',
    category: 'angka',
    exampleWord: 'Tujuh Bunga',
    exampleEmoji: '🌸',
    countingCount: 7,
    rhymeOrMotto: 'Angka 7 seperti cangkul petani yang rajin!',
    phonicsSound: 'Tujuh! Mendatar di atas lalu meluncur miring ke bawah!',
    strokeGuide: [
      '1. Tarik garis lurus mendatar di atas ke kanan ➡️',
      '2. Tarik garis miring tajam turun ke kiri bawah ↙️'
    ],
    speechGuide: 'Tarik garis mendatar di atas, lalu luncurkan garis miring tajam ke kiri bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Garis mendatar lalu miring turun',
        arrow: '➡️↙️',
        speechInstruction: 'Garis mendatar lalu meluncur miring ke kiri bawah',
        points: [
          { x: 0.30, y: 0.20 },
          { x: 0.70, y: 0.20 },
          { x: 0.44, y: 0.78 }
        ]
      }
    ]
  },
  {
    id: 'num_8',
    char: '8',
    label: 'Angka 8 (Delapan)',
    category: 'angka',
    exampleWord: 'Delapan Balon',
    exampleEmoji: '🎈',
    countingCount: 8,
    rhymeOrMotto: 'Angka 8 bersambung tanpa putus seperti manusia salju atau kacamata!',
    phonicsSound: 'Delapan! Meliuk seperti huruf S lalu kembali naik ke atas!',
    strokeGuide: [
      '1. Mulai dari tengah atas, liukkan huruf S ke bawah 〰️',
      '2. Silangkan garis naik kembali ke titik awal tanpa putus 🔄'
    ],
    speechGuide: 'Mulai dari atas, buat liukan seperti huruf S sampai bawah, lalu naik menyilang kembali ke atas!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Liuk angka 8 tak terputus',
        arrow: '♾️',
        speechInstruction: 'Liukkan melingkar atas dan bawah tanpa mengangkat kuas',
        points: [
          { x: 0.50, y: 0.20 },
          { x: 0.36, y: 0.28 },
          { x: 0.50, y: 0.46 },
          { x: 0.66, y: 0.62 },
          { x: 0.50, y: 0.78 },
          { x: 0.34, y: 0.62 },
          { x: 0.50, y: 0.46 },
          { x: 0.64, y: 0.28 },
          { x: 0.50, y: 0.20 }
        ]
      }
    ]
  },
  {
    id: 'num_9',
    char: '9',
    label: 'Angka 9 (Sembilan)',
    category: 'angka',
    exampleWord: 'Sembilan Mobil',
    exampleEmoji: '🚗',
    countingCount: 9,
    rhymeOrMotto: 'Angka 9 punya kepala bulat di atas dan ekor meluncur ke bawah!',
    phonicsSound: 'Sembilan! Buat lingkaran kepala di atas lalu turunkan ekor!',
    strokeGuide: [
      '1. Buat lingkaran kepala di atas berlawanan jarum jam 🔄',
      '2. Tarik garis ekor meluncur dari kanan atas turun melengkung ke dasar ⬇️'
    ],
    speechGuide: 'Buat lingkaran kepala di atas, lalu tarik garis ekor meluncur turun melengkung ke bawah!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Lingkaran kepala atas lalu ekor',
        arrow: '🔄⬇️',
        speechInstruction: 'Putar lingkaran di atas lalu tarik ekor ke bawah',
        points: [
          { x: 0.64, y: 0.36 },
          { x: 0.50, y: 0.20 },
          { x: 0.36, y: 0.36 },
          { x: 0.50, y: 0.50 },
          { x: 0.64, y: 0.36 },
          { x: 0.64, y: 0.60 },
          { x: 0.52, y: 0.76 },
          { x: 0.38, y: 0.74 }
        ]
      }
    ]
  },
  {
    id: 'num_10',
    char: '10',
    label: 'Angka 10 (Sepuluh)',
    category: 'angka',
    exampleWord: 'Sepuluh Jari Lengkap',
    exampleEmoji: '👐',
    countingCount: 10,
    rhymeOrMotto: 'Angka 10 pasangan hebat: satu tiang tegak dan satu lingkaran bulat!',
    phonicsSound: 'Sepuluh! Angka 1 berdampingan dengan angka 0!',
    strokeGuide: [
      '1. Tulis angka 1: tarik garis tegak dari atas ke bawah ⬇️',
      '2. Tulis angka 0: putar lingkaran bulat penuh di sebelahnya ⭕'
    ],
    speechGuide: 'Tulis angka satu tegak di sebelah kiri, lalu buat lingkaran angka nol di sebelah kanannya!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tulis angka 1',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak untuk angka 1',
        points: [{ x: 0.32, y: 0.22 }, { x: 0.32, y: 0.78 }]
      },
      {
        stepNumber: 2,
        instruction: 'Tulis angka 0',
        arrow: '⭕',
        speechInstruction: 'Putar lingkaran untuk angka 0',
        points: [
          { x: 0.64, y: 0.22 },
          { x: 0.50, y: 0.34 },
          { x: 0.50, y: 0.66 },
          { x: 0.64, y: 0.78 },
          { x: 0.78, y: 0.66 },
          { x: 0.78, y: 0.34 },
          { x: 0.64, y: 0.22 }
        ]
      }
    ]
  }
];

// 3. POLA GARIS DASAR PRA-MENULIS (PRE-WRITING STROKES)
export const PRE_WRITING_PATTERNS: TracingItem[] = [
  {
    id: 'pat_tegak',
    char: '|',
    label: 'Garis Tegak (Hujan Rintik)',
    category: 'pola_dasar',
    exampleWord: 'Hujan Rintik-Rintik',
    exampleEmoji: '🌧️',
    rhymeOrMotto: 'Garis tegak lurus seperti tetesan air hujan dari langit!',
    phonicsSound: 'Tarik lurus dari atas langit turun ke bumi!',
    strokeGuide: [
      '1. Letakkan kuas di titik atas ⬆️',
      '2. Tarik lurus tegak ke bawah tanpa berbelok ⬇️'
    ],
    speechGuide: 'Pegang pensil dengan santai, tarik garis lurus tegak dari atas ke bawah seperti tetesan hujan!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik lurus tegak dari atas ke bawah',
        arrow: '⬇️',
        speechInstruction: 'Tarik garis tegak lurus ke bawah',
        points: [{ x: 0.50, y: 0.18 }, { x: 0.50, y: 0.48 }, { x: 0.50, y: 0.78 }]
      }
    ]
  },
  {
    id: 'pat_mendatar',
    char: '—',
    label: 'Garis Mendatar (Jembatan)',
    category: 'pola_dasar',
    exampleWord: 'Jembatan Kayu',
    exampleEmoji: '🌉',
    rhymeOrMotto: 'Garis mendatar lurus seperti rel kereta atau jembatan sungai!',
    phonicsSound: 'Meluncur lurus dari kiri ke kanan!',
    strokeGuide: [
      '1. Letakkan kuas di sebelah kiri ⬅️',
      '2. Geser lurus mendatar ke sebelah kanan ➡️'
    ],
    speechGuide: 'Mulai dari sisi kiri, geser kuasmu lurus mendatar ke kanan seperti kereta melaju di atas rel!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Tarik lurus mendatar dari kiri ke kanan',
        arrow: '➡️',
        speechInstruction: 'Geser lurus mendatar ke kanan',
        points: [{ x: 0.20, y: 0.48 }, { x: 0.50, y: 0.48 }, { x: 0.80, y: 0.48 }]
      }
    ]
  },
  {
    id: 'pat_miring',
    char: '/',
    label: 'Garis Miring (Perosotan)',
    category: 'pola_dasar',
    exampleWord: 'Perosotan Seru',
    exampleEmoji: '🛝',
    rhymeOrMotto: 'Garis miring meluncur seru seperti bermain perosotan!',
    phonicsSound: 'Meluncur miring dari atas ke bawah!',
    strokeGuide: [
      '1. Mulai dari kanan atas ↗️',
      '2. Luncurkan garis miring turun ke kiri bawah ↙️'
    ],
    speechGuide: 'Mulai dari kanan atas, luncurkan garis miring dengan mulus ke kiri bawah seperti meluncur di perosotan!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Luncurkan garis miring dari kanan atas ke kiri bawah',
        arrow: '↙️',
        speechInstruction: 'Luncurkan garis miring ke kiri bawah',
        points: [{ x: 0.75, y: 0.18 }, { x: 0.50, y: 0.48 }, { x: 0.25, y: 0.78 }]
      }
    ]
  },
  {
    id: 'pat_lengkung_u',
    char: '∪',
    label: 'Garis Lengkung Mangkuk (Senyuman)',
    category: 'pola_dasar',
    exampleWord: 'Senyum Ceria',
    exampleEmoji: '😊',
    rhymeOrMotto: 'Garis lengkung manis seperti senyuman lebar wajah gembira!',
    phonicsSound: 'Turun melengkung lalu naik kembali!',
    strokeGuide: [
      '1. Turun dari kiri atas ⬇️',
      '2. Lengkungkan di dasar seperti mangkuk 🔄',
      '3. Naik kembali ke kanan atas ⬆️'
    ],
    speechGuide: 'Turun dari kiri atas, buat lengkungan senyum di bawah, lalu bawa naik kembali ke kanan atas!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Lengkung mangkuk senyuman',
        arrow: '😊',
        speechInstruction: 'Turun melengkung di dasar lalu naik ke atas',
        points: [
          { x: 0.25, y: 0.25 },
          { x: 0.30, y: 0.60 },
          { x: 0.50, y: 0.75 },
          { x: 0.70, y: 0.60 },
          { x: 0.75, y: 0.25 }
        ]
      }
    ]
  },
  {
    id: 'pat_zigzag',
    char: 'W',
    label: 'Garis Zig-Zag (Rumput Segitiga)',
    category: 'pola_dasar',
    exampleWord: 'Gunung Zig-Zag',
    exampleEmoji: '⛰️',
    rhymeOrMotto: 'Garis zig-zag naik turun lincah seperti kilat petir!',
    phonicsSound: 'Naik, turun, naik, turun!',
    strokeGuide: [
      '1. Turun miring ke kanan bawah ↘️',
      '2. Naik miring ke kanan atas ↗️',
      '3. Turun lagi ↘️ lalu naik lagi ↗️'
    ],
    speechGuide: 'Turun miring, naik miring, turun miring, dan naik miring lagi seperti lereng bukit zig-zag!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Pola zig-zag bersambung',
        arrow: '⚡',
        speechInstruction: 'Lakukan gerakan naik turun bersambung',
        points: [
          { x: 0.18, y: 0.25 },
          { x: 0.34, y: 0.72 },
          { x: 0.50, y: 0.25 },
          { x: 0.66, y: 0.72 },
          { x: 0.82, y: 0.25 }
        ]
      }
    ]
  },
  {
    id: 'pat_ombak',
    char: '~',
    label: 'Garis Gelombang Ombak Laut',
    category: 'pola_dasar',
    exampleWord: 'Ombak Laut Biru',
    exampleEmoji: '🌊',
    rhymeOrMotto: 'Garis ombak meliuk lembut seperti tarian air laut!',
    phonicsSound: 'Meliuk lembut naik dan turun!',
    strokeGuide: [
      '1. Lengkungkan naik bukit ombak ↗️',
      '2. Turunkan ke lembah ombak ↘️',
      '3. Naikkan lagi ke puncak berikutnya ↗️'
    ],
    speechGuide: 'Gerakkan kuas dengan rileks, meliuk naik ke puncak ombak lalu turun lembut ke lembah ombak!',
    strokeSteps: [
      {
        stepNumber: 1,
        instruction: 'Gelombang ombak laut',
        arrow: '🌊',
        speechInstruction: 'Liukkan melengkung seperti gelombang laut',
        points: [
          { x: 0.16, y: 0.50 },
          { x: 0.32, y: 0.28 },
          { x: 0.50, y: 0.50 },
          { x: 0.68, y: 0.72 },
          { x: 0.84, y: 0.50 }
        ]
      }
    ]
  }
];

// Helper: Get item by char or id
export function findTracingItem(charOrId: string): TracingItem | undefined {
  const allItems = [...CAPITAL_LETTERS_TRACING, ...NUMBERS_TRACING, ...PRE_WRITING_PATTERNS];
  return (
    allItems.find(item => item.id.toLowerCase() === charOrId.toLowerCase()) ||
    allItems.find(item => item.char.toLowerCase() === charOrId.toLowerCase()) ||
    allItems.find(item => item.label.toLowerCase().includes(charOrId.toLowerCase()))
  );
}

// Parent and Teacher Fine Motor Guides
export const MOTORIC_POSTURE_TIPS = [
  {
    title: 'Cara Memegang Pensil (Tripod Grip)',
    emoji: '✍️',
    desc: 'Gunakan 3 jari: Ibu jari dan jari telunjuk menjepit pensil secara rileks, disangga oleh jari tengah di bawahnya.'
  },
  {
    title: 'Posisi Duduk Ergonomis & Tegak',
    emoji: '🪑',
    desc: 'Kaki menapak di lantai, punggung tegak bersandar nyaman, dan jarak mata ke kertas/layar sekitar 30 cm.'
  },
  {
    title: 'Pemanasan Motorik Halus (Fine-Motor Warm-up)',
    emoji: '👐',
    desc: 'Ajak anak meremas plastisin/playdough atau membuka-tutup jemari seperti bintang bersinar sebelum mulai menulis.'
  },
  {
    title: 'Beri Pujian pada Usaha, Bukan Hanya Hasil',
    emoji: '⭐',
    desc: 'Apresiasi keberanian anak mencoba garis baru dan konsistensi arah goresan dari atas ke bawah.'
  }
];
