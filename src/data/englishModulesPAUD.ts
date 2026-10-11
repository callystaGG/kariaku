import { LearningModule } from '../types';

export const ENGLISH_PAUD_TK_MODULES: LearningModule[] = [
  // =========================================================================
  // 1. ALPHABET & PHONICS (PAUD & TK)
  // =========================================================================
  {
    id: 'mod-eng-alphabet-phonics',
    subjectId: 'bahasa_inggris',
    gradeId: 'paud',
    order: 1,
    title: 'Alphabet & Phonics Song (A - Z)',
    shortDesc: 'Ayo bernyanyi The Alphabet Song, mengeja nama sendiri, dan mengenal huruf A sampai Z!',
    fullDesc: 'Fase Fondasi: Belajar mengenali bentuk dan pelafalan huruf alfabet bahasa Inggris lewat lagu ceria, mengeja nama sendiri, serta mengaitkan huruf awal dengan kosakata benda sehari-hari (A for Apple, B for Ball, C for Cat).',
    kurikulumFase: 'Fase Fondasi (PAUD & TK)',
    kurikulumFokus: 'English Alphabet, Song Lyrics, Name Spelling, & Letter-by-Letter Phonics',
    estimatedMinutes: 5,
    starsReward: 20,
    coverEmoji: '🔤',
    themeColor: 'from-[#FF6F00] to-[#FFA000]',
    themeBg: 'bg-[#FFF8E1] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['PAUD', 'TK', 'English', 'Alphabet', 'Phonics', 'Song'],
    badgeReward: {
      id: 'badge_eng_alphabet_master',
      name: 'English Alphabet Star',
      description: 'Hebat! Kamu sudah hafal abjad bahasa Inggris A-Z dan pintar bernyanyi lagu alfabet!',
      emoji: '🔤',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-ab-1',
        title: 'Menyanyikan Lagu Alphabet Bahasa Inggris 🎶',
        subtitle: 'The Alphabet Song (A-B-C-D-E-F-G)',
        type: 'alphabet_song',
        prompt: 'Ayo dengarkan dan nyanyikan lagu Alphabet Song bersama-sama! Sentuh setiap baris lirik untuk mendengarkan nadanya.',
        speechText: 'Ayo kita bernyanyi lagu alfabet bahasa Inggris! A, B, C, D, E, F, G... Dengarkan dan ikuti ya!',
        interactiveData: {
          interactiveType: 'alphabet_song',
          songLyrics: [
            { lineEnglish: 'A B C D E F G', lineIndonesian: 'A, B, C, D, E, F, G' },
            { lineEnglish: 'H I J K L M N O P', lineIndonesian: 'H, I, J, K, L, M, N, O, P' },
            { lineEnglish: 'Q R S T U and V', lineIndonesian: 'Q, R, S, T, U dan V' },
            { lineEnglish: 'W X Y and Z', lineIndonesian: 'W, X, Y dan Z' },
            { lineEnglish: "Now I know my A B C's", lineIndonesian: 'Sekarang aku tahu ABC-ku' },
            { lineEnglish: "Next time won't you sing with me?", lineIndonesian: 'Lain kali maukah bernyanyi bersamaku?' }
          ]
        },
        tips: 'Bernyanyi dengan ceria membantu anak mengingat urutan huruf dengan sangat cepat!'
      },
      {
        id: 'step-eng-ab-2',
        title: 'Mengeja Nama Sendiri (Spell Your Name) ✍️',
        subtitle: 'Alya = A - L - Y - A | Bimo = B - I - M - O',
        type: 'alphabet_song',
        prompt: 'Belajar mengeja nama si Kecil huruf per huruf secara berulang agar lebih cepat mengenali bentuk dan bunyi huruf dalam bahasa Inggris.',
        speechText: 'Sekarang mari kita eja nama sendiri! Contohnya: Alya, dieja A, L, Y, A. Bimo, dieja B, I, M, O!',
        interactiveData: {
          interactiveType: 'alphabet_song'
        },
        tips: 'Ketik nama si Kecil pada kolom di atas lalu sentuh tombol Eja Nama Saya!'
      },
      {
        id: 'step-eng-ab-3',
        title: 'Letter by Letter: A, B, C, D, E & Friends 🍎',
        subtitle: 'A for Apple, B for Ball, C for Cat, D for Dog, E for Ear',
        type: 'alphabet_song',
        prompt: 'Sentuh setiap kartu huruf di bawah untuk mendengarkan bunyi fonik dan contoh kata dasarnya dalam bahasa Inggris!',
        speechText: 'Sentuh huruf untuk mendengar bunyinya! A for Apple, B for Ball, C for Cat, D for Dog, E for Ear!',
        interactiveData: {
          interactiveType: 'alphabet_song',
          alphabetLetters: [
            { letter: 'A', word: 'Apple', emoji: '🍎', sound: 'A for Apple (Apel)' },
            { letter: 'B', word: 'Ball', emoji: '⚽', sound: 'B for Ball (Bola)' },
            { letter: 'C', word: 'Cat', emoji: '🐱', sound: 'C for Cat (Kucing)' },
            { letter: 'D', word: 'Dog', emoji: '🐶', sound: 'D for Dog (Anjing)' },
            { letter: 'E', word: 'Ear', emoji: '👂', sound: 'E for Ear (Telinga)' },
            { letter: 'F', word: 'Fish', emoji: '🐟', sound: 'F for Fish (Ikan)' },
            { letter: 'G', word: 'Giraffe', emoji: '🦒', sound: 'G for Giraffe (Jerapah)' },
            { letter: 'H', word: 'Hat', emoji: '👒', sound: 'H for Hat (Topi)' },
            { letter: 'I', word: 'Ice cream', emoji: '🍦', sound: 'I for Ice cream (Es Krim)' },
            { letter: 'J', word: 'Juice', emoji: '🧃', sound: 'J for Juice (Jus)' }
          ]
        },
        tips: 'Ucapkan kembali kata tersebut bersama si Kecil sambil menunjuk gambarnya.'
      },
      {
        id: 'step-eng-ab-4',
        title: 'Hebat, Kamu Sudah Hafal Alphabet!',
        subtitle: 'Siap untuk Kuis Seru',
        type: 'summary',
        prompt: 'Kamu sudah belajar bernyanyi lagu alphabet, mengeja nama, dan melafalkan huruf A sampai Z. Sekarang ayo uji kemampuanmu di kuis interaktif!',
        speechText: 'Luar biasa! Sekarang ayo jawab kuis seru dan kumpulkan bintang belajarmu!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-ab-1',
        questionNumber: 1,
        prompt: 'Huruf apakah yang berpasangan dengan "Apple" (🍎)?',
        speechPrompt: 'What letter is for Apple?',
        equationVisual: '🍎 = ... for Apple',
        options: [
          { id: 'opt-a', text: 'A (A for Apple) 🍎', isCorrect: true },
          { id: 'opt-b', text: 'B (B for Ball) ⚽', isCorrect: false },
          { id: 'opt-c', text: 'C (C for Cat) 🐱', isCorrect: false }
        ],
        explanation: 'Benar sekali! "A" is for Apple (Apel manis merah).'
      },
      {
        id: 'q-eng-ab-2',
        questionNumber: 2,
        prompt: 'Lanjutan dari baris lagu: "A B C D E F ..." adalah?',
        speechPrompt: 'What comes after F in the alphabet song?',
        equationVisual: 'A B C D E F [ ? ]',
        options: [
          { id: 'opt-a', text: 'G 🌟', isCorrect: true },
          { id: 'opt-b', text: 'H', isCorrect: false },
          { id: 'opt-c', text: 'Z', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Urutan alfabetnya adalah A, B, C, D, E, F, G!'
      },
      {
        id: 'q-eng-ab-3',
        questionNumber: 3,
        prompt: '"Cat" 🐱 (Kucing) diawali dengan huruf apa dalam bahasa Inggris?',
        speechPrompt: 'What letter does Cat start with?',
        options: [
          { id: 'opt-a', text: 'C (C for Cat) 🐱', isCorrect: true },
          { id: 'opt-b', text: 'D (D for Dog) 🐶', isCorrect: false },
          { id: 'opt-c', text: 'E (E for Ear) 👂', isCorrect: false }
        ],
        explanation: 'Pintar! C is for Cat!'
      }
    ]
  },

  // =========================================================================
  // 2. NUMBERS (1 - 10)
  // =========================================================================
  {
    id: 'mod-eng-numbers-1-10',
    subjectId: 'bahasa_inggris',
    gradeId: 'paud',
    order: 2,
    title: 'Numbers 1 - 10 (Mengenal Angka)',
    shortDesc: 'Belajar berhitung one, two, three sampai ten bersama benda-benda seru di rumah!',
    fullDesc: 'Fase Fondasi: Mengenalkan angka 1 sampai 10 dalam bahasa Inggris (One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten) dengan menghitung benda nyata dan visual menyenangkan.',
    kurikulumFase: 'Fase Fondasi (PAUD & TK)',
    kurikulumFokus: 'Counting 1-10 in English & Object Enumeration',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '🔢',
    themeColor: 'from-[#0288D1] to-[#29B6F6]',
    themeBg: 'bg-[#E1F5FE] border-[#81D4FA]',
    themeBorder: 'border-[#81D4FA]',
    tags: ['PAUD', 'TK', 'English', 'Numbers', 'Counting'],
    badgeReward: {
      id: 'badge_eng_number_star',
      name: 'Number Champion',
      description: 'Luar biasa! Kamu sudah bisa berhitung 1 sampai 10 dalam bahasa Inggris!',
      emoji: '🔢',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-num-1',
        title: 'Counting Numbers 1 to 5 (Satu sampai Lima)',
        subtitle: 'One, Two, Three, Four, Five',
        type: 'english_cards',
        prompt: 'Sentuh kartu angka di bawah ini untuk mendengarkan pengucapan angka 1 sampai 5 dalam bahasa Inggris!',
        speechText: 'Ayo berhitung satu sampai lima! One, Two, Three, Four, Five!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'One', translation: 'Satu (1)', phonetic: '/wʌn/', emoji: '1️⃣', exampleSentence: 'One red apple', sentenceTranslation: 'Satu apel merah', category: 'Numbers' },
            { word: 'Two', translation: 'Dua (2)', phonetic: '/tuː/', emoji: '2️⃣', exampleSentence: 'Two cute cats', sentenceTranslation: 'Dua kucing lucu', category: 'Numbers' },
            { word: 'Three', translation: 'Tiga (3)', phonetic: '/θriː/', emoji: '3️⃣', exampleSentence: 'Three shining stars', sentenceTranslation: 'Tiga bintang bersinar', category: 'Numbers' },
            { word: 'Four', translation: 'Empat (4)', phonetic: '/fɔːr/', emoji: '4️⃣', exampleSentence: 'Four sweet bananas', sentenceTranslation: 'Empat pisang manis', category: 'Numbers' },
            { word: 'Five', translation: 'Lima (5)', phonetic: '/faɪv/', emoji: '5️⃣', exampleSentence: 'Five little ducks', sentenceTranslation: 'Lima anak bebek', category: 'Numbers' }
          ]
        },
        tips: 'Ajak si Kecil menghitung jari tangannya: One, Two, Three, Four, Five!'
      },
      {
        id: 'step-eng-num-2',
        title: 'Counting Numbers 6 to 10 (Enam sampai Sepuluh)',
        subtitle: 'Six, Seven, Eight, Nine, Ten',
        type: 'english_cards',
        prompt: 'Sekarang lanjutkan ke angka 6 sampai 10! Dengarkan bunyinya dan tirukan ya.',
        speechText: 'Six, Seven, Eight, Nine, Ten! Sepuluh jari tangan kita!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Six', translation: 'Enam (6)', phonetic: '/sɪks/', emoji: '6️⃣', exampleSentence: 'Six colorful balloons', sentenceTranslation: 'Enam balon warna-warni', category: 'Numbers' },
            { word: 'Seven', translation: 'Tujuh (7)', phonetic: '/ˈsev.ən/', emoji: '7️⃣', exampleSentence: 'Seven days in a week', sentenceTranslation: 'Tujuh hari dalam seminggu', category: 'Numbers' },
            { word: 'Eight', translation: 'Delapan (8)', phonetic: '/eɪt/', emoji: '8️⃣', exampleSentence: 'Eight orange carrots', sentenceTranslation: 'Delapan wortel oranye', category: 'Numbers' },
            { word: 'Nine', translation: 'Sembilan (9)', phonetic: '/naɪn/', emoji: '9️⃣', exampleSentence: 'Nine beautiful flowers', sentenceTranslation: 'Sembilan bunga indah', category: 'Numbers' },
            { word: 'Ten', translation: 'Sepuluh (10)', phonetic: '/ten/', emoji: '🔟', exampleSentence: 'Ten little fingers', sentenceTranslation: 'Sepuluh jari mungil', category: 'Numbers' }
          ]
        },
        tips: 'Bisa diajarkan sambil menghitung benda mainan di sekitar meja belajar.'
      },
      {
        id: 'step-eng-num-3',
        title: 'Kuis Berhitung Bahasa Inggris',
        subtitle: 'Ayo Uji Pemahaman Angka',
        type: 'summary',
        prompt: 'Kamu sudah hebat menghitung 1-10 dalam bahasa Inggris! Ayo jawab kuis berhitung di bawah ini.',
        speechText: 'Hebat! Yuk kita mulai kuis angka bahasa Inggris!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-num-1',
        questionNumber: 1,
        prompt: 'Bahasa Inggris dari angka 3 (tiga) adalah?',
        speechPrompt: 'What is the English word for number 3?',
        equationVisual: '3️⃣ = ?',
        options: [
          { id: 'opt-a', text: 'Three ⭐', isCorrect: true },
          { id: 'opt-b', text: 'Two', isCorrect: false },
          { id: 'opt-c', text: 'Four', isCorrect: false }
        ],
        explanation: 'Benar! Angka 3 dalam bahasa Inggris adalah "Three".'
      },
      {
        id: 'q-eng-num-2',
        questionNumber: 2,
        prompt: 'Berapa jumlah bebek di bawah ini? 🦆 🦆 🦆 🦆 🦆',
        speechPrompt: 'How many ducks are there?',
        equationVisual: '🦆 🦆 🦆 🦆 🦆 = ?',
        options: [
          { id: 'opt-a', text: 'Five ducks 🦆', isCorrect: true },
          { id: 'opt-b', text: 'Four ducks', isCorrect: false },
          { id: 'opt-c', text: 'Six ducks', isCorrect: false }
        ],
        explanation: 'Pintar! Ada 5 bebek, bahasa Inggrisnya "Five ducks".'
      }
    ]
  },

  // =========================================================================
  // 3. COLORS (WARNA)
  // =========================================================================
  {
    id: 'mod-eng-colors',
    subjectId: 'bahasa_inggris',
    gradeId: 'paud',
    order: 3,
    title: 'Colors (Mengenal Warna Ceria)',
    shortDesc: 'Mengenal nama warna: Red, Blue, Yellow, Pink, Orange, Green, dan lainnya!',
    fullDesc: 'Fase Fondasi: Belajar mengenal nama-nama warna dalam bahasa Inggris seperti red, blue, yellow, pink, orange, green, purple, black, dan white melalui mainan dan benda warna-warni.',
    kurikulumFase: 'Fase Fondasi (PAUD & TK)',
    kurikulumFokus: 'Colors Vocabulary, Visual Recognition, & Descriptive Language',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '🎨',
    themeColor: 'from-[#E91E63] to-[#FF4081]',
    themeBg: 'bg-[#FCE4EC] border-[#F8BBD0]',
    themeBorder: 'border-[#F8BBD0]',
    tags: ['PAUD', 'TK', 'English', 'Colors'],
    badgeReward: {
      id: 'badge_eng_colors_artist',
      name: 'Rainbow Color Master',
      description: 'Hebat! Kamu sudah pandai menyebutkan semua warna dalam bahasa Inggris!',
      emoji: '🎨',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-col-1',
        title: 'Primary & Cute Colors (Warna-Warni)',
        subtitle: 'Red, Blue, Yellow, Green, Pink, Orange',
        type: 'english_cards',
        prompt: 'Sentuh setiap kartu warna untuk mendengar pengucapan aslinya dalam bahasa Inggris!',
        speechText: 'Ayo belajar warna! Red merah, Blue biru, Yellow kuning, Green hijau, Pink merah muda, Orange jingga!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Red', translation: 'Merah', phonetic: '/red/', emoji: '🔴', exampleSentence: 'The apple is red', sentenceTranslation: 'Apel itu berwarna merah', category: 'Colors' },
            { word: 'Blue', translation: 'Biru', phonetic: '/bluː/', emoji: '🔵', exampleSentence: 'The sky is blue', sentenceTranslation: 'Langit berwarna biru', category: 'Colors' },
            { word: 'Yellow', translation: 'Kuning', phonetic: '/ˈjel.oʊ/', emoji: '🟡', exampleSentence: 'The sun is yellow', sentenceTranslation: 'Matahari berwarna kuning', category: 'Colors' },
            { word: 'Green', translation: 'Hijau', phonetic: '/ɡriːn/', emoji: '🟢', exampleSentence: 'The leaf is green', sentenceTranslation: 'Daun itu berwarna hijau', category: 'Colors' },
            { word: 'Pink', translation: 'Merah Muda', phonetic: '/pɪŋk/', emoji: '🌸', exampleSentence: 'The flower is pink', sentenceTranslation: 'Bunga itu berwarna merah muda', category: 'Colors' },
            { word: 'Orange', translation: 'Jingga / Oranye', phonetic: '/ˈɔːr.ɪndʒ/', emoji: '🟠', exampleSentence: 'The carrot is orange', sentenceTranslation: 'Wortel itu berwarna jingga', category: 'Colors' },
            { word: 'Purple', translation: 'Ungu', phonetic: '/ˈpɜːr.pəl/', emoji: '🟣', exampleSentence: 'Purple grapes', sentenceTranslation: 'Anggur berwarna ungu', category: 'Colors' },
            { word: 'White', translation: 'Putih', phonetic: '/waɪt/', emoji: '⚪', exampleSentence: 'White cloud', sentenceTranslation: 'Awan putih', category: 'Colors' },
            { word: 'Black', translation: 'Hitam', phonetic: '/blæk/', emoji: '⚫', exampleSentence: 'Black shoes', sentenceTranslation: 'Sepatu hitam', category: 'Colors' }
          ]
        },
        tips: 'Tunjuk benda berwarna di rumah: "What color is this? It is red!"'
      },
      {
        id: 'step-eng-col-2',
        title: 'Kuis Tebak Warna Bahasa Inggris',
        subtitle: 'Siap Menguji Penglihatan Warnamu?',
        type: 'summary',
        prompt: 'Kamu sudah mengenal beragam warna ceria! Ayo coba jawab kuis tebak warna.',
        speechText: 'Waktunya kuis warna! Ayo pilih jawaban yang benar!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-col-1',
        questionNumber: 1,
        prompt: 'Warna apakah buah pisang matang 🍌 dalam bahasa Inggris?',
        speechPrompt: 'What color is a banana in English?',
        equationVisual: '🍌 = ?',
        options: [
          { id: 'opt-a', text: 'Yellow (Kuning) 🟡', isCorrect: true },
          { id: 'opt-b', text: 'Blue (Biru) 🔵', isCorrect: false },
          { id: 'opt-c', text: 'Red (Merah) 🔴', isCorrect: false }
        ],
        explanation: 'Benar! Pisang matang berwarna kuning atau "Yellow".'
      },
      {
        id: 'q-eng-col-2',
        questionNumber: 2,
        prompt: 'Bahasa Inggris dari warna "Merah" 🔴 adalah?',
        speechPrompt: 'What is the English word for merah?',
        options: [
          { id: 'opt-a', text: 'Red 🔴', isCorrect: true },
          { id: 'opt-b', text: 'Green 🟢', isCorrect: false },
          { id: 'opt-c', text: 'Pink 🌸', isCorrect: false }
        ],
        explanation: 'Pintar! Merah dalam bahasa Inggris adalah "Red".'
      }
    ]
  },

  // =========================================================================
  // 4. SHAPES (BENTUK)
  // =========================================================================
  {
    id: 'mod-eng-shapes',
    subjectId: 'bahasa_inggris',
    gradeId: 'paud',
    order: 4,
    title: 'Shapes (Bentuk-Bentuk Dasar)',
    shortDesc: 'Mengenal Circle, Square, Triangle, Rectangle, Star, dan Heart di sekitar kita!',
    fullDesc: 'Fase Fondasi: Belajar mengenal nama-nama bentuk dasar geometri dalam bahasa Inggris seperti circle, square, triangle, rectangle, star, dan heart dengan mengaitkannya pada benda-benda rumah.',
    kurikulumFase: 'Fase Fondasi (PAUD & TK)',
    kurikulumFokus: 'Basic Shapes & Environmental Objects in English',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '🔺',
    themeColor: 'from-[#7B1FA2] to-[#AB47BC]',
    themeBg: 'bg-[#F3E5F5] border-[#E1BEE7]',
    themeBorder: 'border-[#E1BEE7]',
    tags: ['PAUD', 'TK', 'English', 'Shapes'],
    badgeReward: {
      id: 'badge_eng_shapes_detective',
      name: 'Shape Detective',
      description: 'Hebat! Kamu bisa menemukan dan menyebutkan semua bentuk dalam bahasa Inggris!',
      emoji: '🔺',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-shp-1',
        title: 'Basic Shapes (Bentuk-Bentuk di Sekitar Kita)',
        subtitle: 'Circle, Square, Triangle, Rectangle, Star, Heart',
        type: 'english_cards',
        prompt: 'Sentuh kartu bentuk untuk mendengar pelafalannya dan contoh bendanya!',
        speechText: 'Ayo belajar bentuk! Circle lingkaran, Square persegi, Triangle segitiga, Rectangle persegi panjang, Star bintang, Heart hati!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Circle', translation: 'Lingkaran / Bulat', phonetic: '/ˈsɜːr.kəl/', emoji: '⭕', exampleSentence: 'A clock is a circle', sentenceTranslation: 'Jam dinding berbentuk lingkaran', category: 'Shapes' },
            { word: 'Square', translation: 'Persegi (Kotak)', phonetic: '/skwer/', emoji: '⏹️', exampleSentence: 'A window is a square', sentenceTranslation: 'Jendela berbentuk persegi', category: 'Shapes' },
            { word: 'Triangle', translation: 'Segitiga', phonetic: '/ˈtraɪ.æŋ.ɡəl/', emoji: '🔺', exampleSentence: 'A slice of pizza is a triangle', sentenceTranslation: 'Sepotong pizza berbentuk segitiga', category: 'Shapes' },
            { word: 'Rectangle', translation: 'Persegi Panjang', phonetic: '/ˈrek.tæŋ.ɡəl/', emoji: '▭', exampleSentence: 'A door is a rectangle', sentenceTranslation: 'Pintu berbentuk persegi panjang', category: 'Shapes' },
            { word: 'Star', translation: 'Bintang', phonetic: '/stɑːr/', emoji: '⭐', exampleSentence: 'A shining star', sentenceTranslation: 'Bintang yang bersinar', category: 'Shapes' },
            { word: 'Heart', translation: 'Hati / Cinta', phonetic: '/hɑːrt/', emoji: '💖', exampleSentence: 'A red heart', sentenceTranslation: 'Sebuah bentuk hati merah', category: 'Shapes' }
          ]
        },
        tips: 'Ajak anak mencari benda di rumah: roda sepeda (circle), buku tulis (rectangle).'
      },
      {
        id: 'step-eng-shp-2',
        title: 'Kuis Bentuk Bahasa Inggris',
        subtitle: 'Tebak Bentuk Benda',
        type: 'summary',
        prompt: 'Sudah hafal bentuk-bentuknya? Ayo selesaikan kuis bentuk interaktif!',
        speechText: 'Waktunya kuis bentuk! Ayo tebak bentuk bendanya!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-shp-1',
        questionNumber: 1,
        prompt: 'Roda sepeda dan bola sepak ⚽ memiliki bentuk apa dalam bahasa Inggris?',
        speechPrompt: 'What shape is a ball in English?',
        options: [
          { id: 'opt-a', text: 'Circle (Lingkaran) ⭕', isCorrect: true },
          { id: 'opt-b', text: 'Triangle (Segitiga) 🔺', isCorrect: false },
          { id: 'opt-c', text: 'Square (Kotak) ⏹️', isCorrect: false }
        ],
        explanation: 'Benar! Bola dan roda berbentuk bulat lingkaran atau "Circle".'
      }
    ]
  },

  // =========================================================================
  // 5. ANIMALS (HEWAN)
  // =========================================================================
  {
    id: 'mod-eng-animals',
    subjectId: 'bahasa_inggris',
    gradeId: 'paud',
    order: 5,
    title: 'Animals (Hewan-Hewan Favorit)',
    shortDesc: 'Mengenal Cat, Dog, Bird, Fish, Elephant, Lion, Duck, dan Cow!',
    fullDesc: 'Fase Fondasi: Belajar nama-nama hewan favorit dalam bahasa Inggris seperti cat, dog, bird, fish, elephant, lion, duck, dan cow disertai gambar lucu dan suara hewan.',
    kurikulumFase: 'Fase Fondasi (PAUD & TK)',
    kurikulumFokus: 'Animal Names, Sounds, & Basic Phrasing in English',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '🐱',
    themeColor: 'from-[#43A047] to-[#66BB6A]',
    themeBg: 'bg-[#E8F5E9] border-[#C8E6C9]',
    themeBorder: 'border-[#C8E6C9]',
    tags: ['PAUD', 'TK', 'English', 'Animals'],
    badgeReward: {
      id: 'badge_eng_animal_friend',
      name: 'Animal Safari Friend',
      description: 'Luar biasa! Kamu sudah hafal nama hewan-hewan dalam bahasa Inggris!',
      emoji: '🐾',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-ani-1',
        title: 'Lovely Animals (Hewan yang Menggemaskan)',
        subtitle: 'Cat, Dog, Bird, Fish, Elephant, Duck, Lion',
        type: 'english_cards',
        prompt: 'Sentuh kartu hewan untuk mendengarkan nama dan contoh kalimatnya dalam bahasa Inggris!',
        speechText: 'Ayo kenali hewan-hewan lucu! Cat kucing, Dog anjing, Bird burung, Fish ikan, Elephant gajah, Duck bebek, Lion singa!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Cat', translation: 'Kucing', phonetic: '/kæt/', emoji: '🐱', exampleSentence: 'The cat says meow', sentenceTranslation: 'Kucing bersuara meong', category: 'Animals' },
            { word: 'Dog', translation: 'Anjing', phonetic: '/dɔːɡ/', emoji: '🐶', exampleSentence: 'The dog wags its tail', sentenceTranslation: 'Anjing mengibaskan ekornya', category: 'Animals' },
            { word: 'Bird', translation: 'Burung', phonetic: '/bɜːrd/', emoji: '🐦', exampleSentence: 'The bird can fly high', sentenceTranslation: 'Burung bisa terbang tinggi', category: 'Animals' },
            { word: 'Fish', translation: 'Ikan', phonetic: '/fɪʃ/', emoji: '🐟', exampleSentence: 'The fish swims in the water', sentenceTranslation: 'Ikan berenang di dalam air', category: 'Animals' },
            { word: 'Elephant', translation: 'Gajah', phonetic: '/ˈel.ə.fənt/', emoji: '🐘', exampleSentence: 'The elephant has a long trunk', sentenceTranslation: 'Gajah memiliki belalai panjang', category: 'Animals' },
            { word: 'Lion', translation: 'Singa', phonetic: '/ˈlaɪ.ən/', emoji: '🦁', exampleSentence: 'The lion is strong and brave', sentenceTranslation: 'Singa kuat dan berani', category: 'Animals' },
            { word: 'Duck', translation: 'Bebek', phonetic: '/dʌk/', emoji: '🦆', exampleSentence: 'The duck says quack quack', sentenceTranslation: 'Bebek bersuara kwek-kwek', category: 'Animals' },
            { word: 'Cow', translation: 'Sapi', phonetic: '/kaʊ/', emoji: '🐮', exampleSentence: 'The cow gives healthy milk', sentenceTranslation: 'Sapi menghasilkan susu sehat', category: 'Animals' }
          ]
        },
        tips: 'Tirukan juga suara hewannya agar suasana belajar semakin ceria!'
      },
      {
        id: 'step-eng-ani-2',
        title: 'Kuis Satwa Cilik',
        subtitle: 'Uji Kosakata Hewan',
        type: 'summary',
        prompt: 'Ayo jawab pertanyaan kuis tentang hewan favoritmu!',
        speechText: 'Waktunya kuis hewan! Ayo tebak bahasa Inggris hewan ini!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-ani-1',
        questionNumber: 1,
        prompt: 'Hewan berbelalai panjang 🐘 dalam bahasa Inggris disebut?',
        speechPrompt: 'What is the English word for gajah?',
        equationVisual: '🐘 = ?',
        options: [
          { id: 'opt-a', text: 'Elephant 🐘', isCorrect: true },
          { id: 'opt-b', text: 'Lion 🦁', isCorrect: false },
          { id: 'opt-c', text: 'Bird 🐦', isCorrect: false }
        ],
        explanation: 'Benar! Gajah dalam bahasa Inggris adalah "Elephant".'
      }
    ]
  },

  // =========================================================================
  // 6. FAMILY MEMBERS (KELUARGA)
  // =========================================================================
  {
    id: 'mod-eng-family',
    subjectId: 'bahasa_inggris',
    gradeId: 'tk',
    order: 6,
    title: 'Family Members (Keluarga Tercinta)',
    shortDesc: 'Mengenal Father, Mother, Brother, Sister, Grandfather, Grandmother, dan Baby!',
    fullDesc: 'Fase Fondasi TK: Belajar mengenal anggota keluarga dalam bahasa Inggris seperti father (ayah), mother (ibu), brother (saudara laki-laki), sister (saudara perempuan), grandfather (kakek), grandmother (nenek), dan baby (bayi).',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Family Vocabulary & Expressing Love in English',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '👨‍👩‍👧‍👦',
    themeColor: 'from-[#D81B60] to-[#EC407A]',
    themeBg: 'bg-[#FCE4EC] border-[#F48FB1]',
    themeBorder: 'border-[#F48FB1]',
    tags: ['TK', 'English', 'Family'],
    badgeReward: {
      id: 'badge_eng_family_love',
      name: 'Family Hero',
      description: 'Hebat! Kamu bisa memperkenalkan semua anggota keluarga dalam bahasa Inggris!',
      emoji: '💖',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-fam-1',
        title: 'My Lovely Family (Keluargaku yang Hangat)',
        subtitle: 'Father, Mother, Brother, Sister, Grandfather, Grandmother',
        type: 'english_cards',
        prompt: 'Sentuh kartu anggota keluarga untuk mendengarkan sebutan dalam bahasa Inggris!',
        speechText: 'Ayo kenali anggota keluarga! Father ayah, Mother ibu, Brother saudara laki-laki, Sister saudara perempuan, Grandfather kakek, Grandmother nenek, Baby bayi!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Father', translation: 'Ayah / Papa', phonetic: '/ˈfɑː.ðər/', emoji: '👨', exampleSentence: 'This is my father', sentenceTranslation: 'Ini adalah ayahku', category: 'Family' },
            { word: 'Mother', translation: 'Ibu / Mama', phonetic: '/ˈmʌð.ər/', emoji: '👩', exampleSentence: 'I love my mother', sentenceTranslation: 'Aku menyayangi ibuku', category: 'Family' },
            { word: 'Brother', translation: 'Saudara Laki-laki (Kakak/Adik)', phonetic: '/ˈbrʌð.ər/', emoji: '👦', exampleSentence: 'My brother plays with me', sentenceTranslation: 'Saudara laki-lakiku bermain bersamaku', category: 'Family' },
            { word: 'Sister', translation: 'Saudara Perempuan (Kakak/Adik)', phonetic: '/ˈsɪs.tər/', emoji: '👧', exampleSentence: 'My sister is kind', sentenceTranslation: 'Saudara perempuanku baik hati', category: 'Family' },
            { word: 'Grandfather', translation: 'Kakek', phonetic: '/ˈɡræn.fɑː.ðər/', emoji: '👴', exampleSentence: 'My grandfather tells good stories', sentenceTranslation: 'Kakekku suka bercerita dongeng', category: 'Family' },
            { word: 'Grandmother', translation: 'Nenek', phonetic: '/ˈɡræn.mʌð.ər/', emoji: '👵', exampleSentence: 'My grandmother bakes delicious cookies', sentenceTranslation: 'Nenekku membuat kue lezat', category: 'Family' },
            { word: 'Baby', translation: 'Bayi mungil', phonetic: '/ˈbeɪ.bi/', emoji: '👶', exampleSentence: 'The baby is smiling', sentenceTranslation: 'Bayi itu sedang tersenyum', category: 'Family' }
          ]
        },
        tips: 'Tunjukkan foto keluarga sambil mengajak si Kecil berkata: "This is my mom, this is my dad!"'
      },
      {
        id: 'step-eng-fam-2',
        title: 'Kuis Anggota Keluarga',
        subtitle: 'Siap Menjawab Soal?',
        type: 'summary',
        prompt: 'Ayo uji ingatanmu tentang anggota keluarga dalam bahasa Inggris!',
        speechText: 'Waktunya kuis keluarga tercinta!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-fam-1',
        questionNumber: 1,
        prompt: 'Sebutan untuk "Ibu / Mama" 👩 dalam bahasa Inggris adalah?',
        speechPrompt: 'What is the English word for ibu?',
        options: [
          { id: 'opt-a', text: 'Mother 👩', isCorrect: true },
          { id: 'opt-b', text: 'Father 👨', isCorrect: false },
          { id: 'opt-c', text: 'Brother 👦', isCorrect: false }
        ],
        explanation: 'Benar! Ibu dalam bahasa Inggris adalah "Mother" atau "Mom".'
      }
    ]
  },

  // =========================================================================
  // 7. FRUITS AND VEGETABLES (BUAH & SAYUR)
  // =========================================================================
  {
    id: 'mod-eng-fruits-veg',
    subjectId: 'bahasa_inggris',
    gradeId: 'tk',
    order: 7,
    title: 'Fruits & Vegetables (Buah & Sayur Sehat)',
    shortDesc: 'Mengenal Apple, Banana, Orange, Carrot, Tomato, Strawberry, dan Watermelon!',
    fullDesc: 'Fase Fondasi TK: Mengenal nama-nama buah dan sayuran bergizi dalam bahasa Inggris serta menambah kosakata makanan sehat di sekitar kita.',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Fruits, Vegetables, & Healthy Habits Vocabulary',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '🍎',
    themeColor: 'from-[#FB8C00] to-[#FFA726]',
    themeBg: 'bg-[#FFF3E0] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['TK', 'English', 'Fruits', 'Vegetables'],
    badgeReward: {
      id: 'badge_eng_fruits_healthy',
      name: 'Healthy Food Star',
      description: 'Hebat! Kamu hafal nama aneka buah dan sayuran bergizi dalam bahasa Inggris!',
      emoji: '🍉',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-fv-1',
        title: 'Delicious Fruits & Vegetables (Buah & Sayur Lezat)',
        subtitle: 'Apple, Banana, Orange, Carrot, Tomato, Strawberry, Watermelon',
        type: 'english_cards',
        prompt: 'Sentuh setiap kartu buah dan sayur untuk mendengarkan namanya dalam bahasa Inggris!',
        speechText: 'Ayo sebutkan buah dan sayur sehat! Apple apel, Banana pisang, Orange jeruk, Carrot wortel, Tomato tomat, Strawberry stroberi, Watermelon semangka!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Apple', translation: 'Apel', phonetic: '/ˈæp.əl/', emoji: '🍎', exampleSentence: 'An apple a day keeps the doctor away', sentenceTranslation: 'Makan apel setiap hari membuat tubuh sehat', category: 'Fruits' },
            { word: 'Banana', translation: 'Pisang', phonetic: '/bəˈnæn.ə/', emoji: '🍌', exampleSentence: 'Monkeys love bananas', sentenceTranslation: 'Monyet suka buah pisang', category: 'Fruits' },
            { word: 'Orange', translation: 'Jeruk', phonetic: '/ˈɔːr.ɪndʒ/', emoji: '🍊', exampleSentence: 'Sweet orange juice', sentenceTranslation: 'Jus jeruk manis segar', category: 'Fruits' },
            { word: 'Carrot', translation: 'Wortel', phonetic: '/ˈkær.ət/', emoji: '🥕', exampleSentence: 'Rabbits eat orange carrots', sentenceTranslation: 'Kelinci makan wortel oranye', category: 'Vegetables' },
            { word: 'Tomato', translation: 'Tomat', phonetic: '/təˈmeɪ.toʊ/', emoji: '🍅', exampleSentence: 'Juicy red tomato', sentenceTranslation: 'Tomat merah segar', category: 'Vegetables' },
            { word: 'Strawberry', translation: 'Stroberi', phonetic: '/ˈstrɔːˌber.i/', emoji: '🍓', exampleSentence: 'Sweet strawberry ice cream', sentenceTranslation: 'Es krim stroberi manis', category: 'Fruits' },
            { word: 'Watermelon', translation: 'Semangka', phonetic: '/ˈwɑː.t̬ɚˌmel.ən/', emoji: '🍉', exampleSentence: 'Fresh cold watermelon', sentenceTranslation: 'Semangka dingin segar', category: 'Fruits' }
          ]
        },
        tips: 'Sambil makan buah bersama anak, tanyakan namanya: "What fruit are you eating? I am eating an apple!"'
      },
      {
        id: 'step-eng-fv-2',
        title: 'Kuis Buah & Sayur',
        subtitle: 'Siap Uji Kosakata Makanan Sehat',
        type: 'summary',
        prompt: 'Ayo jawab kuis tebak buah dan sayuran bergizi!',
        speechText: 'Waktunya kuis buah dan sayuran sehat!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-fv-1',
        questionNumber: 1,
        prompt: 'Sayuran oranye renyah makanan kelinci 🥕 dalam bahasa Inggris adalah?',
        speechPrompt: 'What is the English word for wortel?',
        equationVisual: '🥕 = ?',
        options: [
          { id: 'opt-a', text: 'Carrot 🥕', isCorrect: true },
          { id: 'opt-b', text: 'Tomato 🍅', isCorrect: false },
          { id: 'opt-c', text: 'Banana 🍌', isCorrect: false }
        ],
        explanation: 'Benar! Wortel dalam bahasa Inggris adalah "Carrot".'
      }
    ]
  },

  // =========================================================================
  // 8. BODY PARTS (ANGGOTA TUBUH)
  // =========================================================================
  {
    id: 'mod-eng-body-parts',
    subjectId: 'bahasa_inggris',
    gradeId: 'tk',
    order: 8,
    title: 'Body Parts (Anggota Tubuh Kita)',
    shortDesc: 'Mengenal Head, Eyes, Nose, Ears, Mouth, Hands, dan Legs!',
    fullDesc: 'Fase Fondasi TK: Belajar mengenal anggota tubuh seperti head, eyes, nose, ears, mouth, hands, dan legs dengan langsung menunjuk dan mengucapkannya secara interaktif.',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Body Parts Vocabulary & Action Commands (Touch, Clap)',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '👤',
    themeColor: 'from-[#00897B] to-[#26A69A]',
    themeBg: 'bg-[#E0F2F1] border-[#80CBC4]',
    themeBorder: 'border-[#80CBC4]',
    tags: ['TK', 'English', 'Body Parts'],
    badgeReward: {
      id: 'badge_eng_body_expert',
      name: 'Body Parts Master',
      description: 'Luar biasa! Kamu hafal semua anggota tubuh dalam bahasa Inggris!',
      emoji: '💪',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-bp-1',
        title: 'My Wonderful Body (Anggota Tubuhku)',
        subtitle: 'Head, Eyes, Nose, Ears, Mouth, Hands, Legs',
        type: 'english_cards',
        prompt: 'Sentuh kartu anggota tubuh untuk mendengarkan sebutan dalam bahasa Inggris sambil menunjuk tubuhmu sendiri!',
        speechText: 'Ayo sebutkan anggota tubuh! Head kepala, Eyes mata, Nose hidung, Ears telinga, Mouth mulut, Hands tangan, Legs kaki!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Head', translation: 'Kepala', phonetic: '/hed/', emoji: '👤', exampleSentence: 'Nod your head', sentenceTranslation: 'Anggukkan kepalamu', category: 'Body Parts' },
            { word: 'Eyes', translation: 'Mata (untuk melihat)', phonetic: '/aɪz/', emoji: '👀', exampleSentence: 'I see with my two eyes', sentenceTranslation: 'Aku melihat dengan kedua mataku', category: 'Body Parts' },
            { word: 'Nose', translation: 'Hidung (untuk mencium bau)', phonetic: '/noʊz/', emoji: '👃', exampleSentence: 'Touch your nose', sentenceTranslation: 'Sentuh hidungmu', category: 'Body Parts' },
            { word: 'Ears', translation: 'Telinga (untuk mendengar)', phonetic: '/ɪrz/', emoji: '👂', exampleSentence: 'I listen with my ears', sentenceTranslation: 'Aku mendengarkan dengan telingaku', category: 'Body Parts' },
            { word: 'Mouth', translation: 'Mulut (untuk berbicara & makan)', phonetic: '/maʊθ/', emoji: '👄', exampleSentence: 'Open your mouth and smile', sentenceTranslation: 'Buka mulutmu dan tersenyum', category: 'Body Parts' },
            { word: 'Hands', translation: 'Tangan (untuk bertepuk & memegang)', phonetic: '/hændz/', emoji: '✋', exampleSentence: 'Clap your hands together', sentenceTranslation: 'Tepuk kedua tanganmu', category: 'Body Parts' },
            { word: 'Legs', translation: 'Kaki (untuk berjalan & berlari)', phonetic: '/leɡz/', emoji: '🦵', exampleSentence: 'My legs can run and jump', sentenceTranslation: 'Kakiku bisa berlari dan melompat', category: 'Body Parts' }
          ]
        },
        tips: 'Ajak anak bermain perintah: "Touch your nose! Clap your hands!"'
      },
      {
        id: 'step-eng-bp-2',
        title: 'Kuis Anggota Tubuh',
        subtitle: 'Uji Pemahaman Tubuh Sehat',
        type: 'summary',
        prompt: 'Ayo selesaikan kuis anggota tubuh dalam bahasa Inggris!',
        speechText: 'Waktunya kuis anggota tubuh!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-bp-1',
        questionNumber: 1,
        prompt: 'Anggota tubuh untuk melihat 👀 dalam bahasa Inggris disebut?',
        speechPrompt: 'What is the English word for mata?',
        equationVisual: '👀 = ?',
        options: [
          { id: 'opt-a', text: 'Eyes 👀', isCorrect: true },
          { id: 'opt-b', text: 'Nose 👃', isCorrect: false },
          { id: 'opt-c', text: 'Ears 👂', isCorrect: false }
        ],
        explanation: 'Benar! Mata dalam bahasa Inggris adalah "Eyes".'
      }
    ]
  },

  // =========================================================================
  // 9. DAILY OBJECTS (BENDA SEHARI-HARI)
  // =========================================================================
  {
    id: 'mod-eng-daily-objects',
    subjectId: 'bahasa_inggris',
    gradeId: 'tk',
    order: 9,
    title: 'Daily Objects (Benda di Rumah & Sekolah)',
    shortDesc: 'Mengenal Book, Chair, Table, Bag, Pencil, Eraser, Cup, dan Bed!',
    fullDesc: 'Fase Fondasi TK: Belajar mengenal nama benda sehari-hari yang sering dijumpai anak di rumah dan kelas sekolah seperti book, chair, table, bag, pencil, dan cup.',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'Classroom & Household Objects Vocabulary in English',
    estimatedMinutes: 4,
    starsReward: 20,
    coverEmoji: '🎒',
    themeColor: 'from-[#3949AB] to-[#5C6BC0]',
    themeBg: 'bg-[#E8EAF6] border-[#9FA8DA]',
    themeBorder: 'border-[#9FA8DA]',
    tags: ['TK', 'English', 'Objects'],
    badgeReward: {
      id: 'badge_eng_objects_smart',
      name: 'Smart Object Finder',
      description: 'Hebat! Kamu bisa menyebutkan nama semua benda di sekitarmu dalam bahasa Inggris!',
      emoji: '🎒',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-obj-1',
        title: 'Objects All Around Us (Benda di Sekitar Kita)',
        subtitle: 'Book, Chair, Table, Bag, Pencil, Eraser, Bed, Cup',
        type: 'english_cards',
        prompt: 'Sentuh kartu benda untuk mendengarkan pengucapan dalam bahasa Inggris!',
        speechText: 'Ayo sebutkan benda sehari-hari! Book buku, Chair kursi, Table meja, Bag tas, Pencil pensil, Bed tempat tidur!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Book', translation: 'Buku cerita / bacaan', phonetic: '/bʊk/', emoji: '📖', exampleSentence: 'I read an English book', sentenceTranslation: 'Aku membaca buku bahasa Inggris', category: 'Objects' },
            { word: 'Chair', translation: 'Kursi untuk duduk', phonetic: '/tʃer/', emoji: '🪑', exampleSentence: 'Sit down on the chair', sentenceTranslation: 'Duduklah di atas kursi', category: 'Objects' },
            { word: 'Table', translation: 'Meja belajar / makan', phonetic: '/ˈteɪ.bəl/', emoji: '🪵', exampleSentence: 'Put the book on the table', sentenceTranslation: 'Taruh buku di atas meja', category: 'Objects' },
            { word: 'Bag', translation: 'Tas sekolah', phonetic: '/bæɡ/', emoji: '🎒', exampleSentence: 'My school bag is blue', sentenceTranslation: 'Tas sekolahku berwarna biru', category: 'Objects' },
            { word: 'Pencil', translation: 'Pensil tulis / gambar', phonetic: '/ˈpen.səl/', emoji: '✏️', exampleSentence: 'I draw with my pencil', sentenceTranslation: 'Aku menggambar dengan pensilku', category: 'Objects' },
            { word: 'Eraser', translation: 'Penghapus', phonetic: '/ɪˈreɪ.sər/', emoji: '🧼', exampleSentence: 'Use an eraser to clean', sentenceTranslation: 'Gunakan penghapus untuk membersihkan tulisan', category: 'Objects' },
            { word: 'Bed', translation: 'Tempat tidur', phonetic: '/bed/', emoji: '🛏️', exampleSentence: 'Time to sleep in bed', sentenceTranslation: 'Saatnya tidur di tempat tidur', category: 'Objects' },
            { word: 'Cup', translation: 'Gelas / cangkir minum', phonetic: '/kʌp/', emoji: '🥛', exampleSentence: 'A cup of fresh milk', sentenceTranslation: 'Segelas susu segar', category: 'Objects' }
          ]
        },
        tips: 'Ajak anak menunjuk benda di meja belajarnya: "What is this? It is a book!"'
      },
      {
        id: 'step-eng-obj-2',
        title: 'Kuis Benda Sehari-hari',
        subtitle: 'Siap Menguji Kosakata Benda',
        type: 'summary',
        prompt: 'Ayo jawab kuis tebak benda di bawah ini!',
        speechText: 'Waktunya kuis benda sehari-hari!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-obj-1',
        questionNumber: 1,
        prompt: 'Benda untuk membaca cerita 📖 dalam bahasa Inggris disebut?',
        speechPrompt: 'What is the English word for buku?',
        options: [
          { id: 'opt-a', text: 'Book 📖', isCorrect: true },
          { id: 'opt-b', text: 'Pencil ✏️', isCorrect: false },
          { id: 'opt-c', text: 'Bag 🎒', isCorrect: false }
        ],
        explanation: 'Benar! Buku dalam bahasa Inggris adalah "Book".'
      }
    ]
  },

  // =========================================================================
  // 10. GREETINGS AND SIMPLE EXPRESSIONS (SAPAAN & UNGKAPAN)
  // =========================================================================
  {
    id: 'mod-eng-greetings',
    subjectId: 'bahasa_inggris',
    gradeId: 'tk',
    order: 10,
    title: 'Greetings & Simple Expressions (Sapaan Ramah)',
    shortDesc: 'Hello, Good morning, Thank you, Sorry, Good bye, dan roleplay percakapan!',
    fullDesc: 'Fase Fondasi TK: Mengenal ungkapan salam dan percakapan dasar sehari-hari seperti Hello, Good morning, Thank you, Sorry, Good bye dengan simulasi dialog seru (Mother & Aira, Father & Rafi).',
    kurikulumFase: 'Fase Fondasi TK',
    kurikulumFokus: 'English Greetings, Manners, & Parent-Child Roleplay Dialogues',
    estimatedMinutes: 5,
    starsReward: 20,
    coverEmoji: '👋',
    themeColor: 'from-[#0097A7] to-[#00ACC1]',
    themeBg: 'bg-[#E0F7FA] border-[#80DEEA]',
    themeBorder: 'border-[#80DEEA]',
    tags: ['TK', 'English', 'Greetings', 'Roleplay', 'Manners'],
    badgeReward: {
      id: 'badge_eng_greetings_polite',
      name: 'Polite English Speaker',
      description: 'Hebat! Kamu anak yang sopan dan percaya diri menyapa dalam bahasa Inggris!',
      emoji: '🌟',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-gr-1',
        title: 'Magic Expressions (Ungkapan Ramah Sehari-hari)',
        subtitle: 'Hello, Good morning, Thank you, Sorry, Good bye',
        type: 'english_cards',
        prompt: 'Sentuh kartu salam di bawah ini untuk mendengarkan cara pengucapan yang ramah dan sopan!',
        speechText: 'Ayo belajar sapaan ramah! Hello halo, Good morning selamat pagi, Thank you terima kasih, Sorry maaf, Good bye selamat tinggal!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Hello', translation: 'Halo 👋', phonetic: '/həˈloʊ/', emoji: '👋', exampleSentence: 'Hello, my friend!', sentenceTranslation: 'Halo, temanku!', category: 'Greetings' },
            { word: 'Good morning', translation: 'Selamat pagi 🌅', phonetic: '/ˌɡʊd ˈmɔːr.nɪŋ/', emoji: '🌅', exampleSentence: 'Good morning, Teacher!', sentenceTranslation: 'Selamat pagi, Ibu/Bapak Guru!', category: 'Greetings' },
            { word: 'Good afternoon', translation: 'Selamat siang ☀️', phonetic: '/ˌɡʊd ˌæf.tɚˈnuːn/', emoji: '☀️', exampleSentence: 'Good afternoon, Mom!', sentenceTranslation: 'Selamat siang, Ibu!', category: 'Greetings' },
            { word: 'Good night', translation: 'Selamat malam / tidur nyenyak 🌙', phonetic: '/ˌɡʊd ˈnaɪt/', emoji: '🌙', exampleSentence: 'Good night, sleep tight', sentenceTranslation: 'Selamat malam, tidur nyenyak ya', category: 'Greetings' },
            { word: 'Thank you', translation: 'Terima kasih 🙏', phonetic: '/ˈθæŋk ˌjuː/', emoji: '🙏', exampleSentence: 'Thank you very much', sentenceTranslation: 'Terima kasih banyak', category: 'Greetings' },
            { word: "You're welcome", translation: 'Sama-sama 😊', phonetic: '/jʊr ˈwel.kəm/', emoji: '😊', exampleSentence: "You're welcome, my dear", sentenceTranslation: 'Sama-sama sayangku', category: 'Greetings' },
            { word: 'Sorry', translation: 'Maaf 🥺', phonetic: '/ˈsɑːr.i/', emoji: '🥺', exampleSentence: "I am sorry, please forgive me", sentenceTranslation: 'Aku minta maaf ya', category: 'Greetings' },
            { word: 'Good bye', translation: 'Selamat tinggal 👋', phonetic: '/ˌɡʊd ˈbaɪ/', emoji: '👋', exampleSentence: 'Good bye, see you tomorrow!', sentenceTranslation: 'Sampai jumpa besok!', category: 'Greetings' }
          ]
        },
        tips: 'Praktikkan setiap pagi: ucapkan "Good morning, Mom!" saat bangun tidur.'
      },
      {
        id: 'step-eng-gr-2',
        title: 'Roleplay Percakapan 1: Mother & Aira 👩👧',
        subtitle: '"Hello, Aira. How are you?" — "I am fine, thank you, Mom."',
        type: 'dialogue_roleplay',
        prompt: 'Sentuh gelembung percakapan di bawah untuk mendengarkan dialog antara Ibu dan Aira!',
        speechText: 'Sentuh gelembung untuk mendengar suara Mother dan Aira! Mother: Hello Aira, how are you? Aira: I am fine, thank you Mom!',
        interactiveData: {
          interactiveType: 'dialogue_roleplay',
          dialogues: [
            {
              speaker: 'Mother',
              textEnglish: 'Hello, Aira. How are you?',
              textIndonesian: 'Halo, Aira. Apa kabar?',
              avatarEmoji: '👩',
              audioPitch: 1.25
            },
            {
              speaker: 'Aira',
              textEnglish: 'I am fine, thank you, Mom.',
              textIndonesian: 'Aku baik-baik saja, terima kasih, Mom.',
              avatarEmoji: '👧',
              audioPitch: 1.45
            },
            {
              speaker: 'Mother',
              textEnglish: 'Are you ready to play and learn English?',
              textIndonesian: 'Apakah kamu siap untuk bermain dan belajar bahasa Inggris?',
              avatarEmoji: '👩',
              audioPitch: 1.25
            },
            {
              speaker: 'Aira',
              textEnglish: 'Yes, I am ready! Let’s go!',
              textIndonesian: 'Ya, aku siap! Ayo kita mulai!',
              avatarEmoji: '👧',
              audioPitch: 1.45
            }
          ]
        },
        tips: 'Ajak si Kecil berperan sebagai Aira dan orang tua sebagai Mother!'
      },
      {
        id: 'step-eng-gr-3',
        title: 'Roleplay Percakapan 2: Father & Rafi 👨👦',
        subtitle: '"Good morning, Rafi." — "Good morning, Dad. Have a nice day!"',
        type: 'dialogue_roleplay',
        prompt: 'Sentuh gelembung percakapan antara Ayah dan Rafi sebelum berangkat sekolah!',
        speechText: 'Sentuh gelembung dialog Ayah dan Rafi! Father: Good morning, Rafi. Rafi: Good morning, Dad. Have a nice day! Thank you!',
        interactiveData: {
          interactiveType: 'dialogue_roleplay',
          dialogues: [
            {
              speaker: 'Father',
              textEnglish: 'Good morning, Rafi.',
              textIndonesian: 'Selamat pagi, Rafi.',
              avatarEmoji: '👨',
              audioPitch: 1.05
            },
            {
              speaker: 'Rafi',
              textEnglish: 'Good morning, Dad.',
              textIndonesian: 'Selamat pagi, Dad.',
              avatarEmoji: '👦',
              audioPitch: 1.35
            },
            {
              speaker: 'Father',
              textEnglish: 'Have a nice day at school!',
              textIndonesian: 'Semoga harimu menyenangkan di sekolah!',
              avatarEmoji: '👨',
              audioPitch: 1.05
            },
            {
              speaker: 'Rafi',
              textEnglish: 'Thank you, Dad! Good bye!',
              textIndonesian: 'Terima kasih, Dad! Selamat tinggal!',
              avatarEmoji: '👦',
              audioPitch: 1.35
            }
          ]
        },
        tips: 'Bisa dipraktikkan langsung di pagi hari saat Ayah atau anak hendak beraktivitas.'
      },
      {
        id: 'step-eng-gr-4',
        title: 'Kuis Sapaan & Ungkapan',
        subtitle: 'Siap Menjawab Soal Sopan Santun?',
        type: 'summary',
        prompt: 'Kamu sudah pandai menyapa dalam bahasa Inggris! Ayo jawab kuis terakhir ini!',
        speechText: 'Hebat sekali! Ayo selesaikan kuis sapaan bahasa Inggris!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-gr-1',
        questionNumber: 1,
        prompt: 'Jika seseorang berkata "How are you?" (Apa kabar?), jawaban yang tepat adalah?',
        speechPrompt: 'How do you answer when someone asks how are you?',
        options: [
          { id: 'opt-a', text: 'I am fine, thank you! 😊', isCorrect: true },
          { id: 'opt-b', text: 'Good night 🌙', isCorrect: false },
          { id: 'opt-c', text: 'Sorry 🥺', isCorrect: false }
        ],
        explanation: 'Tepat sekali! Kita menjawab "I am fine, thank you" yang artinya "Aku baik-baik saja, terima kasih".'
      },
      {
        id: 'q-eng-gr-2',
        questionNumber: 2,
        prompt: 'Ungkapan sopan yang kita ucapkan setelah menerima bantuan atau hadiah adalah?',
        speechPrompt: 'What do you say after receiving a gift?',
        options: [
          { id: 'opt-a', text: 'Thank you! 🙏', isCorrect: true },
          { id: 'opt-b', text: 'Good bye! 👋', isCorrect: false },
          { id: 'opt-c', text: 'Good morning! 🌅', isCorrect: false }
        ],
        explanation: 'Benar! Ucapkan "Thank you" sebagai tanda terima kasih.'
      }
    ]
  }
];
