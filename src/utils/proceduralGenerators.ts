import { QuizQuestion, QuizOption, GradeId } from '../types';

// Helper to shuffle arrays with Fisher-Yates
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Random int between min and max inclusive
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random item from array
export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const EMOJI_ITEMS = [
  { emoji: '🍎', name: 'apel merah', group: 'buah' },
  { emoji: '🍊', name: 'jeruk manis', group: 'buah' },
  { emoji: '🍓', name: 'stroberi segar', group: 'buah' },
  { emoji: '🍌', name: 'pisang kuning', group: 'buah' },
  { emoji: '🍉', name: 'potongan semangka', group: 'buah' },
  { emoji: '🥕', name: 'wortel renyah', group: 'sayur' },
  { emoji: '⭐', name: 'bintang emas', group: 'benda' },
  { emoji: '🎈', name: 'balon ceria', group: 'mainan' },
  { emoji: '🚗', name: 'mobil mainan', group: 'mainan' },
  { emoji: '📚', name: 'buku cerita', group: 'sekolah' },
  { emoji: '✏️', name: 'pensil warna', group: 'sekolah' },
  { emoji: '🐰', name: 'kelinci lucu', group: 'hewan' },
  { emoji: '🐱', name: 'kucing mungil', group: 'hewan' },
  { emoji: '🌸', name: 'bunga mekar', group: 'alam' },
];

const INDONESIAN_NAMES = [
  'Beni', 'Siti', 'Edo', 'Dayu', 'Lani', 'Udin', 'Rafi', 'Alya', 'Putri', 'Budi', 'Rina', 'Doni', 'Tasya', 'Fajar'
];

/**
 * Procedurally generates dynamic math questions for any grade
 */
export function generateProceduralMathQuestion(gradeId: GradeId, index: number): QuizQuestion {
  const item = randomChoice(EMOJI_ITEMS);
  const name1 = randomChoice(INDONESIAN_NAMES);
  const name2 = randomChoice(INDONESIAN_NAMES.filter(n => n !== name1));

  if (gradeId === 'paud') {
    // Counting 1 to 5
    const count = randomInt(1, 5);
    const correctVal = count;
    const distractors = [correctVal + 1, Math.max(1, correctVal - 1), correctVal + 2]
      .filter((v, idx, self) => v !== correctVal && self.indexOf(v) === idx)
      .slice(0, 2);

    const options: QuizOption[] = shuffleArray([
      { id: 'opt-c', text: `${correctVal} ${item.name}`, visualEmoji: item.emoji, visualCount: correctVal, isCorrect: true },
      ...distractors.map((d, i) => ({
        id: `opt-w-${i}`,
        text: `${d} ${item.name}`,
        visualEmoji: item.emoji,
        visualCount: d,
        isCorrect: false
      }))
    ]);

    return {
      id: `proc-paud-count-${Date.now()}-${index}`,
      questionNumber: index + 1,
      prompt: `Ada berapa ${item.name} ${item.emoji} di bawah ini?`,
      speechPrompt: `Ada berapa ${item.name} di bawah ini? Ayo hitung bersama!`,
      equationVisual: `${item.emoji.repeat(count)} = ?`,
      itemsVisual: [{ emoji: item.emoji, count: count, label: item.name }],
      options,
      explanation: `Hebat! Jumlah ${item.name} ada ${correctVal}!`,
      hint: 'Sentuh dan hitung satu per satu!'
    };
  }

  if (gradeId === 'tk') {
    // Addition or comparison within 10
    const a = randomInt(1, 6);
    const b = randomInt(1, 4);
    const sum = a + b;

    const distractors = [sum + 1, Math.max(1, sum - 1), sum + 2]
      .filter((v, idx, self) => v !== sum && self.indexOf(v) === idx)
      .slice(0, 2);

    const options: QuizOption[] = shuffleArray([
      { id: 'opt-c', text: `${sum} ${item.name}`, visualEmoji: item.emoji, visualCount: sum, isCorrect: true },
      ...distractors.map((d, i) => ({
        id: `opt-w-${i}`,
        text: `${d} ${item.name}`,
        visualEmoji: item.emoji,
        visualCount: d,
        isCorrect: false
      }))
    ]);

    return {
      id: `proc-tk-add-${Date.now()}-${index}`,
      questionNumber: index + 1,
      prompt: `${name1} punya ${a} ${item.name} ${item.emoji}, lalu diberi ${b} lagi oleh ${name2}. Berapa totalnya sekarang?`,
      speechPrompt: `${name1} punya ${a} ${item.name}, lalu diberi ${b} lagi oleh ${name2}. Berapa totalnya sekarang?`,
      equationVisual: `${a} ${item.emoji} + ${b} ${item.emoji} = ... ?`,
      itemsVisual: [
        { emoji: item.emoji, count: a, label: `Punya ${name1}` },
        { emoji: item.emoji, count: b, label: `Dari ${name2}` }
      ],
      options,
      explanation: `Pintar! ${a} ditambah ${b} hasilnya adalah ${sum}!`,
      hint: `Hitung maju ${b} langkah setelah angka ${a}!`
    };
  }

  if (gradeId === 'sd-1') {
    const isAddition = Math.random() > 0.4;
    if (isAddition) {
      const a = randomInt(4, 12);
      const b = randomInt(3, 9);
      const ans = a + b;
      const distractors = [ans - 1, ans + 1, ans + 2].filter(v => v !== ans).slice(0, 3);

      return {
        id: `proc-sd1-add-${Date.now()}-${index}`,
        questionNumber: index + 1,
        prompt: `${name1} mengumpulkan ${a} ${item.name} dan ${name2} mengumpulkan ${b} ${item.name}. Berapa jumlah seluruhnya?`,
        speechPrompt: `${name1} mengumpulkan ${a} ${item.name} dan ${name2} mengumpulkan ${b} ${item.name}. Berapa jumlah seluruhnya?`,
        equationVisual: `${a} + ${b} = ...`,
        itemsVisual: [
          { emoji: item.emoji, count: a, label: name1 },
          { emoji: item.emoji, count: b, label: name2 }
        ],
        options: shuffleArray([
          { id: 'opt-c', text: `${ans} ${item.name}`, isCorrect: true },
          ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: `${d} ${item.name}`, isCorrect: false }))
        ]),
        explanation: `Tepat sekali! ${a} + ${b} = ${ans}!`,
        hint: `Simpan angka ${Math.max(a, b)} di kepala, lalu hitung maju ${Math.min(a, b)} langkah.`
      };
    } else {
      const a = randomInt(11, 20);
      const b = randomInt(3, 8);
      const ans = a - b;
      const distractors = [ans - 1, ans + 1, ans + 2].filter(v => v !== ans).slice(0, 3);

      return {
        id: `proc-sd1-sub-${Date.now()}-${index}`,
        questionNumber: index + 1,
        prompt: `Ibu menyiapkan ${a} ${item.name}. Dimakan oleh ${name1} sebanyak ${b} buah. Berapa sisa ${item.name} Ibu?`,
        speechPrompt: `Ibu menyiapkan ${a} ${item.name}. Dimakan oleh ${name1} sebanyak ${b} buah. Berapa sisanya?`,
        equationVisual: `${a} - ${b} = ...`,
        itemsVisual: [{ emoji: item.emoji, count: a, struckCount: b, label: `${a} ${item.name} (${b} dimakan)` }],
        options: shuffleArray([
          { id: 'opt-c', text: `${ans} buah`, isCorrect: true },
          ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: `${d} buah`, isCorrect: false }))
        ]),
        explanation: `Hebat! ${a} dikurang ${b} sisanya adalah ${ans}!`,
        hint: `Hitung mundur ${b} langkah dari ${a}.`
      };
    }
  }

  if (gradeId === 'sd-2') {
    const type = randomChoice(['mul_concept', 'add_2digit', 'fraction']);
    if (type === 'mul_concept') {
      const groups = randomInt(3, 5);
      const perGroup = randomInt(2, 6);
      const total = groups * perGroup;
      const options = shuffleArray([
        { id: 'opt-c', text: `${total} (karena ${groups} × ${perGroup} = ${Array(groups).fill(perGroup).join(' + ')})`, isCorrect: true },
        { id: 'opt-w1', text: `${groups + perGroup} (karena ${groups} + ${perGroup})`, isCorrect: false },
        { id: 'opt-w2', text: `${total + groups} (karena ${groups} × ${perGroup + 1})`, isCorrect: false },
      ]);

      return {
        id: `proc-sd2-mul-${Date.now()}-${index}`,
        questionNumber: index + 1,
        prompt: `Ada ${groups} piring. Setiap piring berisi ${perGroup} ${item.name} ${item.emoji}. Berapakah jumlah seluruh ${item.name}?`,
        speechPrompt: `Ada ${groups} piring. Setiap piring berisi ${perGroup} ${item.name}. Berapakah jumlah seluruhnya?`,
        equationVisual: `${groups} × ${perGroup} = ... ?`,
        options,
        explanation: `Pintar! Perkalian ${groups} × ${perGroup} adalah penjumlahan berulang angka ${perGroup} sebanyak ${groups} kali = ${total}!`,
        hint: `Jumlahkan ${Array(groups).fill(perGroup).join(' + ')}.`
      };
    } else {
      const a = randomInt(24, 68);
      const b = randomInt(15, 39);
      const ans = a + b;
      const distractors = [ans - 10, ans - 1, ans + 1, ans + 10].filter(v => v !== ans).slice(0, 3);

      return {
        id: `proc-sd2-add-${Date.now()}-${index}`,
        questionNumber: index + 1,
        prompt: `Berapakah hasil penjumlahan susun dari ${a} + ${b}?`,
        speechPrompt: `Berapakah hasil penjumlahan susun dari ${a} ditambah ${b}?`,
        equationVisual: `${a} + ${b} = ...`,
        options: shuffleArray([
          { id: 'opt-c', text: `${ans}`, isCorrect: true },
          ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: `${d}`, isCorrect: false }))
        ]),
        explanation: `Hebat! Satuan: ${(a % 10)} + ${(b % 10)} = ${(a % 10) + (b % 10)}. Puluhan dijumlahkan hingga totalnya ${ans}.`,
        hint: 'Jumlahkan angka satuan terlebih dahulu di sebelah kanan.'
      };
    }
  }

  if (gradeId === 'sd-3') {
    const isMultiplication = Math.random() > 0.5;
    if (isMultiplication) {
      const a = randomInt(6, 12);
      const b = randomInt(4, 9);
      const ans = a * b;
      const distractors = [ans - b, ans + b, ans - 1, ans + 2].filter(v => v !== ans).slice(0, 3);

      return {
        id: `proc-sd3-mul-${Date.now()}-${index}`,
        questionNumber: index + 1,
        prompt: `Sebuah toko buku memiliki ${a} rak. Setiap rak menampung ${b} buah buku cerita 📚. Berapa total buku di toko tersebut?`,
        speechPrompt: `Sebuah toko buku memiliki ${a} rak. Setiap rak menampung ${b} buah buku cerita. Berapa total buku di toko tersebut?`,
        equationVisual: `${a} × ${b} = ...`,
        options: shuffleArray([
          { id: 'opt-c', text: `${ans} buku`, isCorrect: true },
          ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: `${d} buku`, isCorrect: false }))
        ]),
        explanation: `Sempurna! ${a} × ${b} = ${ans} buku cerita!`,
        hint: `Gunakan sifat perkalian: ${a} dikali ${b}.`
      };
    } else {
      const divisor = randomInt(3, 8);
      const quotient = randomInt(6, 12);
      const dividend = divisor * quotient;
      const distractors = [quotient - 1, quotient + 1, quotient + 2].filter(v => v !== quotient).slice(0, 3);

      return {
        id: `proc-sd3-div-${Date.now()}-${index}`,
        questionNumber: index + 1,
        prompt: `Pak Guru memiliki ${dividend} pensil warna ✏️ yang akan dibagikan sama banyak kepada ${divisor} kelompok belajar. Berapa pensil yang didapat setiap kelompok?`,
        speechPrompt: `Pak Guru memiliki ${dividend} pensil warna yang dibagikan kepada ${divisor} kelompok. Berapa pensil per kelompok?`,
        equationVisual: `${dividend} ÷ ${divisor} = ...`,
        options: shuffleArray([
          { id: 'opt-c', text: `${quotient} pensil`, isCorrect: true },
          ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: `${d} pensil`, isCorrect: false }))
        ]),
        explanation: `Benar! ${dividend} ÷ ${divisor} = ${quotient} karena ${quotient} × ${divisor} = ${dividend}.`,
        hint: `Cari angka yang bila dikalikan ${divisor} hasilnya ${dividend}.`
      };
    }
  }

  // SD 4-6
  const a = randomInt(12, 35);
  const b = randomInt(3, 8);
  const c = randomInt(4, 15);
  const mulPart = b * c;
  const ans = a + mulPart;
  const distractors = [(a + b) * c, ans - 10, ans + 10].filter(v => v !== ans).slice(0, 3);

  return {
    id: `proc-sd4-kabataku-${Date.now()}-${index}`,
    questionNumber: index + 1,
    prompt: `Berapakah hasil operasi hitung campuran: ${a} + ${b} × ${c}?`,
    speechPrompt: `Berapakah hasil operasi hitung campuran: ${a} ditambah ${b} kali ${c}?`,
    equationVisual: `${a} + (${b} × ${c}) = ...`,
    options: shuffleArray([
      { id: 'opt-c', text: `${ans}`, isCorrect: true },
      ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: `${d}`, isCorrect: false }))
    ]),
    explanation: `Pintar! Aturan Kabataku: kerjakan perkalian lebih dulu (${b} × ${c} = ${mulPart}), lalu tambahkan ${a} (${a} + ${mulPart} = ${ans}).`,
    hint: 'Dahulukan perkalian sebelum penjumlahan!'
  };
}

/**
 * Procedural Language & Literacy generator
 */
export function generateProceduralLanguageQuestion(gradeId: GradeId, index: number): QuizQuestion {
  const wordPairs = [
    { word: 'BESAR', antonym: 'KECIL', synonym: 'AKBAR', type: 'antonim' },
    { word: 'TINGGI', antonym: 'PENDEK', synonym: 'JANGKUNG', type: 'antonim' },
    { word: 'TERANG', antonym: 'GELAP', synonym: 'SILAU', type: 'antonim' },
    { word: 'CEPAT', antonym: 'LAMBAT', synonym: 'KILAT', type: 'antonim' },
    { word: 'GEMBIRA', antonym: 'SEDIH', synonym: 'SENANG', type: 'sinonim' },
    { word: 'PANDAI', antonym: 'BODOH', synonym: 'PINTAR', type: 'sinonim' },
    { word: 'INDAH', antonym: 'JELEK', synonym: 'BAGUS', type: 'sinonim' },
  ];

  const pair = randomChoice(wordPairs);
  const isSynonym = Math.random() > 0.5;

  if (isSynonym) {
    const distractors = ['MALAS', 'KECIL', 'GELAP'].filter(d => d !== pair.synonym).slice(0, 2);
    return {
      id: `proc-lang-syn-${Date.now()}-${index}`,
      questionNumber: index + 1,
      prompt: `Kata yang memiliki arti SAMA (Sinonim) dengan kata "${pair.word}" adalah ...`,
      speechPrompt: `Kata yang memiliki arti sama dengan kata ${pair.word} adalah apa?`,
      options: shuffleArray([
        { id: 'opt-c', text: pair.synonym, isCorrect: true },
        ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: d, isCorrect: false }))
      ]),
      explanation: `Tepat sekali! "${pair.word}" dan "${pair.synonym}" memiliki arti yang serupa.`,
      hint: `Sinonim artinya persamaan makna kata.`
    };
  } else {
    const distractors = ['PANDAI', 'INDAH', 'SENANG'].filter(d => d !== pair.antonym).slice(0, 2);
    return {
      id: `proc-lang-ant-${Date.now()}-${index}`,
      questionNumber: index + 1,
      prompt: `Lawan kata (Antonim) dari kata "${pair.word}" adalah ...`,
      speechPrompt: `Lawan kata dari ${pair.word} adalah apa?`,
      options: shuffleArray([
        { id: 'opt-c', text: pair.antonym, isCorrect: true },
        ...distractors.map((d, i) => ({ id: `opt-w-${i}`, text: d, isCorrect: false }))
      ]),
      explanation: `Benar! Antonim dari "${pair.word}" adalah "${pair.antonym}".`,
      hint: `Antonim adalah lawan kata.`
    };
  }
}

/**
 * Procedural Science / IPAS generator
 */
export function generateProceduralScienceQuestion(gradeId: GradeId, index: number): QuizQuestion {
  const scienceTopics = [
    {
      prompt: 'Hewan pemakan serangga seperti katak 🐸 dan cicak 🦎 memiliki lidah yang ...',
      speechPrompt: 'Hewan pemakan serangga seperti katak dan cicak memiliki lidah yang bagaimana?',
      correct: 'Panjang dan lengket untuk menangkap mangsa',
      wrongs: ['Pendek dan keras', 'Bercabang tajam'],
      expl: 'Katak dan cicak mempunyai lidah berlendir lengket agar serangga langsung menempel cepat.'
    },
    {
      prompt: 'Bagian tumbuhan yang berfungsi menyerap air dan zat hara mineral dari dalam tanah adalah ...',
      speechPrompt: 'Bagian tumbuhan yang menyerap air dari dalam tanah adalah apa?',
      correct: 'Akar 🌿',
      wrongs: ['Daun 🍃', 'Bunga 🌸', 'Batang 🪵'],
      expl: 'Akar menancap ke tanah dan menyerap air serta unsur hara untuk pertumbuhan pohon.'
    },
    {
      prompt: 'Planet yang terdekat dengan Matahari dalam sistem Tata Surya kita adalah planet ...',
      speechPrompt: 'Planet yang terdekat dengan Matahari adalah planet apa?',
      correct: 'Merkurius 🪐',
      wrongs: ['Bumi 🌍', 'Mars 🔴', 'Jupiter 🌕'],
      expl: 'Merkurius adalah planet pertama yang posisinya paling dekat dengan pusat Tata Surya (Matahari).'
    },
    {
      prompt: 'Uap air di udara yang mendingin dan berubah menjadi butiran air di pagi hari disebut peristiwa ...',
      speechPrompt: 'Uap air yang mendingin dan menjadi butiran air di pagi hari disebut apa?',
      correct: 'Mengembun (Embun Pagi) 💧',
      wrongs: ['Mendidih 🔥', 'Menyublim ❄️'],
      expl: 'Kondensasi atau mengembun adalah perubahan wujud gas menjadi butiran cair akibat penurunan suhu dingin.'
    }
  ];

  const topic = randomChoice(scienceTopics);
  return {
    id: `proc-sci-${Date.now()}-${index}`,
    questionNumber: index + 1,
    prompt: topic.prompt,
    speechPrompt: topic.speechPrompt,
    options: shuffleArray([
      { id: 'opt-c', text: topic.correct, isCorrect: true },
      ...topic.wrongs.map((w, i) => ({ id: `opt-w-${i}`, text: w, isCorrect: false }))
    ]),
    explanation: topic.expl,
    hint: 'Perhatikan ciri-ciri fisik dan fenomena alam di sekitarmu.'
  };
}

/**
 * Procedural Character & Pancasila generator
 */
export function generateProceduralCharacterQuestion(gradeId: GradeId, index: number): QuizQuestion {
  const charTopics = [
    {
      prompt: 'Saat kita diberi hadiah atau ditolong oleh teman, ungkapan santun yang wajib kita katakan adalah ...',
      speechPrompt: 'Saat kita diberi hadiah atau ditolong teman, apa yang wajib kita katakan?',
      correct: '"Terima kasih banyak ya teman!" 🙏',
      wrongs: ['"Aku maunya yang lebih besar!"', '"Biasa saja."'],
      expl: 'Mengucapkan terima kasih adalah bentuk rasa syukur dan menghargai kebaikan orang lain.'
    },
    {
      prompt: 'Pohon Beringin pada perisai Garuda Pancasila adalah lambang dari Sila ke-3, yaitu ...',
      speechPrompt: 'Pohon Beringin pada perisai Garuda Pancasila adalah lambang dari Sila ke-3, bunyinya apa?',
      correct: 'Persatuan Indonesia 🌳',
      wrongs: ['Keadilan Sosial', 'Kerakyatan yang Dipimpin oleh Hikmat'],
      expl: 'Pohon beringin memiliki sulur dan akar kuat yang melambangkan keberagaman suku bangsa yang bersatu dalam NKRI.'
    },
    {
      prompt: 'Ketika bermain permainan kelompok, sikap sportif yang harus kita tunjukkan adalah ...',
      speechPrompt: 'Ketika bermain kelompok, sikap sportif apa yang harus kita tunjukkan?',
      correct: 'Menerima kekalahan dengan lapang dada dan memberi selamat pada pemenang',
      wrongs: ['Marah dan merusak alat permainan', 'Menuduh teman lain berbuat curang'],
      expl: 'Sikap sportif mengajarkan kita menghargai aturan main dan menjaga persahabatan.'
    }
  ];

  const topic = randomChoice(charTopics);
  return {
    id: `proc-char-${Date.now()}-${index}`,
    questionNumber: index + 1,
    prompt: topic.prompt,
    speechPrompt: topic.speechPrompt,
    options: shuffleArray([
      { id: 'opt-c', text: topic.correct, isCorrect: true },
      ...topic.wrongs.map((w, i) => ({ id: `opt-w-${i}`, text: w, isCorrect: false }))
    ]),
    explanation: topic.expl,
    hint: 'Pilihlah tindakan yang penuh sopan santun dan kasih sayang.'
  };
}

/**
 * Procedurally generates English vocabulary and grammar questions
 */
export function generateProceduralEnglishQuestion(gradeId: GradeId, index: number): QuizQuestion {
  const englishQuestionsPool = [
    {
      prompt: 'What letter does "Ball" (⚽) start with?',
      speechPrompt: 'What letter does Ball start with in English?',
      equationVisual: '⚽ = ... for Ball',
      correct: 'B (B for Ball) ⚽',
      wrongs: ['C (C for Cat)', 'D (D for Dog)'],
      expl: 'B is for Ball (bola)!'
    },
    {
      prompt: 'What is the English word for "Kucing" (🐱)?',
      speechPrompt: 'What is the English word for kucing?',
      equationVisual: '🐱 = ?',
      correct: 'Cat 🐱',
      wrongs: ['Dog 🐶', 'Elephant 🐘'],
      expl: 'Kucing in English is "Cat"!'
    },
    {
      prompt: 'What color is the bright sun (☀️)?',
      speechPrompt: 'What color is the sun in English?',
      equationVisual: '☀️ = ?',
      correct: 'Yellow 🟡',
      wrongs: ['Blue 🔵', 'Green 🟢'],
      expl: 'The sun is Yellow (kuning)!'
    },
    {
      prompt: 'How do you say "Terima Kasih" in English?',
      speechPrompt: 'How do you say terima kasih in English?',
      correct: 'Thank you 🙏',
      wrongs: ['Good bye 👋', 'Sorry 🥺'],
      expl: 'Terima kasih is "Thank you"!'
    },
    {
      prompt: 'Which room do we cook food in? (🍳)',
      speechPrompt: 'Which room in the house do we cook food in?',
      correct: 'Kitchen 🍳',
      wrongs: ['Bedroom 🛏️', 'Bathroom 🚿'],
      expl: 'We cook yummy meals in the Kitchen!'
    },
    {
      prompt: 'What is the name of the day before Tuesday?',
      speechPrompt: 'What day comes before Tuesday?',
      correct: 'Monday 🎒',
      wrongs: ['Wednesday ⚽', 'Friday 🕌'],
      expl: 'Monday comes before Tuesday!'
    }
  ];

  const item = randomChoice(englishQuestionsPool);
  return {
    id: `proc-eng-${Date.now()}-${index}`,
    questionNumber: index + 1,
    prompt: item.prompt,
    speechPrompt: item.speechPrompt,
    equationVisual: item.equationVisual,
    options: shuffleArray([
      { id: 'opt-c', text: item.correct, isCorrect: true },
      ...item.wrongs.map((w, i) => ({ id: `opt-w-${i}`, text: w, isCorrect: false }))
    ]),
    explanation: item.expl,
    hint: 'Listen carefully and choose the correct English word.'
  };
}
