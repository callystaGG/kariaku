/**
 * English to Indonesian Child-Friendly Pronunciation & Phonics Dictionary
 * Translates English words into easy-to-read Indonesian phonetics
 * ("Cara Membaca Bahasa Inggris yang Ramah Anak & Orang Tua")
 */

export const ENGLISH_CARA_BACA_MAP: Record<string, { caraBaca: string; syllables: string[]; phonicsTip?: string }> = {
  // Numbers
  'one': { caraBaca: 'Wan', syllables: ['One'], phonicsTip: 'Dibaca pendek "Wan"' },
  'two': { caraBaca: 'Tu', syllables: ['Two'], phonicsTip: 'Huruf W tidak dibaca' },
  'three': { caraBaca: 'Tri', syllables: ['Three'], phonicsTip: 'Lidah sedikit di antara gigi untuk "Th"' },
  'four': { caraBaca: 'For', syllables: ['Four'], phonicsTip: 'U dan R berbunyi "or"' },
  'five': { caraBaca: 'Faif', syllables: ['Five'], phonicsTip: 'Huruf I dibaca "ai"' },
  'six': { caraBaca: 'Siks', syllables: ['Six'], phonicsTip: 'Huruf X berbunyi "ks"' },
  'seven': { caraBaca: 'Se - ven', syllables: ['Sev', 'en'], phonicsTip: 'V dibaca lembut bergetar' },
  'eight': { caraBaca: 'Eit', syllables: ['Eight'], phonicsTip: 'GH tidak dibaca (silent)' },
  'nine': { caraBaca: 'Nain', syllables: ['Nine'], phonicsTip: 'Huruf I dibaca "ai"' },
  'ten': { caraBaca: 'Ten', syllables: ['Ten'], phonicsTip: 'E berbunyi "e" seperti ember' },
  'eleven': { caraBaca: 'I - le - ven', syllables: ['E', 'lev', 'en'] },
  'twelve': { caraBaca: 'Twelv', syllables: ['Twelve'] },
  'twenty': { caraBaca: 'Twen - ti', syllables: ['Twen', 'ty'] },

  // Colors
  'red': { caraBaca: 'Red', syllables: ['Red'] },
  'blue': { caraBaca: 'Blu', syllables: ['Blue'] },
  'yellow': { caraBaca: 'Ye - lou', syllables: ['Yel', 'low'] },
  'green': { caraBaca: 'Grin', syllables: ['Green'], phonicsTip: 'EE dibaca panjang "ii"' },
  'orange': { caraBaca: 'O - renj', syllables: ['Or', 'ange'] },
  'purple': { caraBaca: 'Per - pel', syllables: ['Pur', 'ple'] },
  'pink': { caraBaca: 'Pingk', syllables: ['Pink'] },
  'brown': { caraBaca: 'Braun', syllables: ['Brown'] },
  'black': { caraBaca: 'Blek', syllables: ['Black'] },
  'white': { caraBaca: 'Wait', syllables: ['White'] },
  'gray': { caraBaca: 'Grei', syllables: ['Gray'] },

  // Animals
  'cat': { caraBaca: 'Ket', syllables: ['Cat'] },
  'dog': { caraBaca: 'Dog', syllables: ['Dog'] },
  'bird': { caraBaca: 'Berd', syllables: ['Bird'] },
  'fish': { caraBaca: 'Fish', syllables: ['Fish'], phonicsTip: 'SH berbunyi desis lembut "sy"' },
  'rabbit': { caraBaca: 'Re - bit', syllables: ['Rab', 'bit'] },
  'duck': { caraBaca: 'Dak', syllables: ['Duck'] },
  'cow': { caraBaca: 'Kau', syllables: ['Cow'] },
  'horse': { caraBaca: 'Hors', syllables: ['Horse'] },
  'sheep': { caraBaca: 'Syip', syllables: ['Sheep'] },
  'lion': { caraBaca: 'Lai - en', syllables: ['Li', 'on'] },
  'tiger': { caraBaca: 'Tai - ger', syllables: ['Ti', 'ger'] },
  'elephant': { caraBaca: 'E - le - fent', syllables: ['El', 'e', 'phant'], phonicsTip: 'PH dibaca seperti huruf F' },
  'monkey': { caraBaca: 'Mong - ki', syllables: ['Mon', 'key'] },
  'bear': { caraBaca: 'Ber', syllables: ['Bear'] },
  'giraffe': { caraBaca: 'Ji - raf', syllables: ['Gi', 'raffe'] },
  'zebra': { caraBaca: 'Zeb - ra', syllables: ['Zeb', 'ra'] },

  // Fruits & Foods
  'apple': { caraBaca: 'E - pel', syllables: ['Ap', 'ple'], phonicsTip: 'Huruf A di awal dibaca seperti "e"' },
  'banana': { caraBaca: 'Be - na - na', syllables: ['Ba', 'na', 'na'] },
  'orange fruit': { caraBaca: 'O - renj', syllables: ['Or', 'ange'] },
  'mango': { caraBaca: 'Meng - gou', syllables: ['Man', 'go'] },
  'grape': { caraBaca: 'Greip', syllables: ['Grape'] },
  'watermelon': { caraBaca: 'Wo - ter - me - len', syllables: ['Wa', 'ter', 'mel', 'on'] },
  'strawberry': { caraBaca: 'Stro - be - ri', syllables: ['Straw', 'ber', 'ry'] },
  'papaya': { caraBaca: 'Pe - pai - ya', syllables: ['Pa', 'pa', 'ya'] },
  'bread': { caraBaca: 'Bred', syllables: ['Bread'] },
  'milk': { caraBaca: 'Milk', syllables: ['Milk'] },
  'egg': { caraBaca: 'Eg', syllables: ['Egg'] },
  'rice': { caraBaca: 'Rais', syllables: ['Rice'] },
  'water': { caraBaca: 'Wo - ter', syllables: ['Wa', 'ter'] },
  'juice': { caraBaca: 'Jus', syllables: ['Juice'] },
  'cheese': { caraBaca: 'Cis', syllables: ['Cheese'] },
  'breakfast': { caraBaca: 'Brek - fes', syllables: ['Break', 'fast'] },
  'lunch': { caraBaca: 'Lanc', syllables: ['Lunch'] },
  'dinner': { caraBaca: 'Di - ner', syllables: ['Din', 'ner'] },

  // Family & Greetings
  'father': { caraBaca: 'Fa - der', syllables: ['Fa', 'ther'] },
  'mother': { caraBaca: 'Ma - der', syllables: ['Moth', 'er'] },
  'brother': { caraBaca: 'Bra - der', syllables: ['Broth', 'er'] },
  'sister': { caraBaca: 'Sis - ter', syllables: ['Sis', 'ter'] },
  'grandfather': { caraBaca: 'Gren - fa - der', syllables: ['Grand', 'fa', 'ther'] },
  'grandmother': { caraBaca: 'Gren - ma - der', syllables: ['Grand', 'moth', 'er'] },
  'baby': { caraBaca: 'Bei - bi', syllables: ['Ba', 'by'] },
  'hello': { caraBaca: 'He - lou', syllables: ['Hel', 'lo'] },
  'good morning': { caraBaca: 'Gud Mor - ning', syllables: ['Good', 'Mor', 'ning'] },
  'good afternoon': { caraBaca: 'Gud Af - ter - nun', syllables: ['Good', 'Af', 'ter', 'noon'] },
  'good evening': { caraBaca: 'Gud Iv - ning', syllables: ['Good', 'Eve', 'ning'] },
  'good night': { caraBaca: 'Gud Nait', syllables: ['Good', 'Night'] },
  'thank you': { caraBaca: 'Tengkyu', syllables: ['Thank', 'you'] },
  'please': { caraBaca: 'Plis', syllables: ['Please'] },
  'sorry': { caraBaca: 'So - ri', syllables: ['Sor', 'ry'] },
  'goodbye': { caraBaca: 'Gud - bai', syllables: ['Good', 'bye'] },

  // Body Parts
  'head': { caraBaca: 'Hed', syllables: ['Head'] },
  'eyes': { caraBaca: 'Ais', syllables: ['Eyes'] },
  'ears': { caraBaca: 'Irs', syllables: ['Ears'] },
  'nose': { caraBaca: 'Nous', syllables: ['Nose'] },
  'mouth': { caraBaca: 'Maut', syllables: ['Mouth'] },
  'hands': { caraBaca: 'Hens', syllables: ['Hands'] },
  'fingers': { caraBaca: 'Fing - gers', syllables: ['Fin', 'gers'] },
  'legs': { caraBaca: 'Legs', syllables: ['Legs'] },
  'feet': { caraBaca: 'Fit', syllables: ['Feet'] },
  'shoulders': { caraBaca: 'Syol - ders', syllables: ['Shoul', 'ders'] },
  'knees': { caraBaca: 'Nis', syllables: ['Knees'], phonicsTip: 'K di depan N tidak dibaca (silent K)' },

  // School & Places
  'book': { caraBaca: 'Buk', syllables: ['Book'] },
  'pencil': { caraBaca: 'Pen - sel', syllables: ['Pen', 'cil'] },
  'eraser': { caraBaca: 'I - rei - ser', syllables: ['E', 'ra', 'ser'] },
  'ruler': { caraBaca: 'Ru - ler', syllables: ['Ru', 'ler'] },
  'bag': { caraBaca: 'Beg', syllables: ['Bag'] },
  'teacher': { caraBaca: 'Ti - cer', syllables: ['Teach', 'er'] },
  'student': { caraBaca: 'Styu - dent', syllables: ['Stu', 'dent'] },
  'school': { caraBaca: 'Skul', syllables: ['School'], phonicsTip: 'CH dibaca "K"' },
  'classroom': { caraBaca: 'Kles - rum', syllables: ['Class', 'room'] },
  'hospital': { caraBaca: 'Hos - pi - tel', syllables: ['Hos', 'pi', 'tal'] },
  'doctor': { caraBaca: 'Dok - ter', syllables: ['Doc', 'tor'] },
  'nurse': { caraBaca: 'Ners', syllables: ['Nurse'] },
  'park': { caraBaca: 'Park', syllables: ['Park'] },
  'supermarket': { caraBaca: 'Su - per - mar - ket', syllables: ['Su', 'per', 'mar', 'ket'] },
  'zoo': { caraBaca: 'Zu', syllables: ['Zoo'] },

  // Phonics Word Families
  'bat': { caraBaca: 'Bet', syllables: ['Bat'] },
  'hat': { caraBaca: 'Het', syllables: ['Hat'] },
  'mat': { caraBaca: 'Met', syllables: ['Mat'] },
  'rat': { caraBaca: 'Ret', syllables: ['Rat'] },
  'pen': { caraBaca: 'Pen', syllables: ['Pen'] },
  'hen': { caraBaca: 'Hen', syllables: ['Hen'] },
  'men': { caraBaca: 'Men', syllables: ['Men'] },
  'pig': { caraBaca: 'Pig', syllables: ['Pig'] },
  'big': { caraBaca: 'Big', syllables: ['Big'] },
  'dig': { caraBaca: 'Dig', syllables: ['Dig'] },
  'fig': { caraBaca: 'Fig', syllables: ['Fig'] },
  'wig': { caraBaca: 'Wig', syllables: ['Wig'] },
  'frog': { caraBaca: 'Frog', syllables: ['Frog'] },
  'log': { caraBaca: 'Log', syllables: ['Log'] },
  'sun': { caraBaca: 'San', syllables: ['Sun'] },
  'run': { caraBaca: 'Ran', syllables: ['Run'] },
  'fun': { caraBaca: 'Fan', syllables: ['Fun'] },
  'bun': { caraBaca: 'Ban', syllables: ['Bun'] }
};

/**
 * Returns Indonesian reading guide (cara baca) for any English word.
 * If not explicitly in the map, generates a clean phonetic syllable guide.
 */
export function getEnglishCaraBaca(word: string, fallbackCaraBaca?: string): { caraBaca: string; syllables: string[]; phonicsTip?: string } {
  if (fallbackCaraBaca) {
    return {
      caraBaca: fallbackCaraBaca,
      syllables: fallbackCaraBaca.includes('-') ? fallbackCaraBaca.split('-').map(s => s.trim()) : [fallbackCaraBaca]
    };
  }

  const clean = word.toLowerCase().trim().replace(/[.,!?:;()]/g, '');
  if (ENGLISH_CARA_BACA_MAP[clean]) {
    return ENGLISH_CARA_BACA_MAP[clean];
  }

  // Fallback simple syllabification
  const chars = word.trim();
  return {
    caraBaca: chars,
    syllables: [chars]
  };
}

/**
 * Word Families for English Phonics Lab
 */
export interface PhonicsWordFamily {
  family: string;
  sound: string;
  caraBacaFamily: string;
  words: Array<{
    word: string;
    onset: string;
    rime: string;
    translation: string;
    emoji: string;
    caraBaca: string;
  }>;
}

export const PHONICS_WORD_FAMILIES: PhonicsWordFamily[] = [
  {
    family: '-at',
    sound: '/æt/',
    caraBacaFamily: 'Dibaca: "Et"',
    words: [
      { word: 'Cat', onset: 'C', rime: 'at', translation: 'Kucing', emoji: '🐱', caraBaca: 'Ket' },
      { word: 'Bat', onset: 'B', rime: 'at', translation: 'Kelelawar / Tongkat', emoji: '🦇', caraBaca: 'Bet' },
      { word: 'Hat', onset: 'H', rime: 'at', translation: 'Topi', emoji: '👒', caraBaca: 'Het' },
      { word: 'Mat', onset: 'M', rime: 'at', translation: 'Keset / Matras', emoji: '🧘', caraBaca: 'Met' },
      { word: 'Rat', onset: 'R', rime: 'at', translation: 'Tikus', emoji: '🐀', caraBaca: 'Ret' }
    ]
  },
  {
    family: '-en',
    sound: '/en/',
    caraBacaFamily: 'Dibaca: "En"',
    words: [
      { word: 'Pen', onset: 'P', rime: 'en', translation: 'Pulpen', emoji: '🖊️', caraBaca: 'Pen' },
      { word: 'Hen', onset: 'H', rime: 'en', translation: 'Ayam Betina', emoji: '🐔', caraBaca: 'Hen' },
      { word: 'Ten', onset: 'T', rime: 'en', translation: 'Sepuluh (10)', emoji: '🔟', caraBaca: 'Ten' },
      { word: 'Men', onset: 'M', rime: 'en', translation: 'Orang-orang', emoji: '👥', caraBaca: 'Men' }
    ]
  },
  {
    family: '-ig',
    sound: '/ɪɡ/',
    caraBacaFamily: 'Dibaca: "Ig"',
    words: [
      { word: 'Pig', onset: 'P', rime: 'ig', translation: 'Babi', emoji: '🐷', caraBaca: 'Pig' },
      { word: 'Big', onset: 'B', rime: 'ig', translation: 'Besar', emoji: '🐘', caraBaca: 'Big' },
      { word: 'Dig', onset: 'D', rime: 'ig', translation: 'Menggali', emoji: '⛏️', caraBaca: 'Dig' },
      { word: 'Wig', onset: 'W', rime: 'ig', translation: 'Rambut Palsu', emoji: '💇', caraBaca: 'Wig' }
    ]
  },
  {
    family: '-og',
    sound: '/ɒɡ/',
    caraBacaFamily: 'Dibaca: "Og"',
    words: [
      { word: 'Dog', onset: 'D', rime: 'og', translation: 'Anjing', emoji: '🐶', caraBaca: 'Dog' },
      { word: 'Frog', onset: 'Fr', rime: 'og', translation: 'Katak', emoji: '🐸', caraBaca: 'Frog' },
      { word: 'Log', onset: 'L', rime: 'og', translation: 'Kayu Batang', emoji: '🪵', caraBaca: 'Log' }
    ]
  },
  {
    family: '-un',
    sound: '/ʌn/',
    caraBacaFamily: 'Dibaca: "An"',
    words: [
      { word: 'Sun', onset: 'S', rime: 'un', translation: 'Matahari', emoji: '☀️', caraBaca: 'San' },
      { word: 'Run', onset: 'R', rime: 'un', translation: 'Berlari', emoji: '🏃', caraBaca: 'Ran' },
      { word: 'Fun', onset: 'F', rime: 'un', translation: 'Menyenangkan', emoji: '🎉', caraBaca: 'Fan' },
      { word: 'Bun', onset: 'B', rime: 'un', translation: 'Roti Manis', emoji: '🥯', caraBaca: 'Ban' }
    ]
  }
];
