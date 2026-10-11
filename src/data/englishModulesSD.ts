import { LearningModule } from '../types';

export const ENGLISH_SD_MODULES: LearningModule[] = [
  // =========================================================================
  // SD KELAS 1: SELF INTRODUCTION & CLASSROOM COMMANDS (Fase A)
  // =========================================================================
  {
    id: 'mod-eng-sd1-intro-school',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-1',
    order: 11,
    title: 'Self-Introduction & Classroom Commands',
    shortDesc: 'Memperkenalkan diri ("My name is...") dan instruksi kelas ("Stand up", "Open your book").',
    fullDesc: 'Fase A (SD Kelas 1): Belajar memperkenalkan nama, umur, dan hobi secara percaya diri serta merespons instruksi guru di kelas dalam bahasa Inggris sesuai standar British Council for Kids.',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Self-Introduction, Age, & Classroom Action Commands',
    estimatedMinutes: 5,
    starsReward: 25,
    coverEmoji: '🏫',
    themeColor: 'from-[#1E88E5] to-[#42A5F5]',
    themeBg: 'bg-[#E3F2FD] border-[#90CAF9]',
    themeBorder: 'border-[#90CAF9]',
    tags: ['SD Kelas 1', 'Fase A', 'English', 'Introduction', 'Classroom'],
    badgeReward: {
      id: 'badge_eng_sd1_star',
      name: 'Classroom Communicator',
      description: 'Luar biasa! Kamu percaya diri memperkenalkan diri dan memahami instruksi kelas dalam bahasa Inggris!',
      emoji: '🌟',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-sd1-1',
        title: 'How to Introduce Yourself (Perkenalan Diri)',
        subtitle: '"Hello, my name is Alex. I am 7 years old."',
        type: 'dialogue_roleplay',
        prompt: 'Sentuh gelembung percakapan untuk mendengarkan cara memperkenalkan diri di depan kelas!',
        speechText: 'Dengarkan percakapan perkenalan diri! Teacher: Hello everyone, please welcome our new friend. Alex: Hello, my name is Alex. I am 7 years old. Nice to meet you!',
        interactiveData: {
          interactiveType: 'dialogue_roleplay',
          dialogues: [
            {
              speaker: 'Teacher',
              textEnglish: 'Hello class! Please welcome our friend.',
              textIndonesian: 'Halo semuanya! Sambut teman baru kita ya.',
              avatarEmoji: '👩‍🏫',
              audioPitch: 1.2
            },
            {
              speaker: 'Alex',
              textEnglish: 'Hello, my name is Alex. I am 7 years old.',
              textIndonesian: 'Halo, namaku Alex. Aku berumur 7 tahun.',
              avatarEmoji: '👦',
              audioPitch: 1.4
            },
            {
              speaker: 'Classmate',
              textEnglish: 'Nice to meet you, Alex!',
              textIndonesian: 'Senang bertemu denganmu, Alex!',
              avatarEmoji: '👧',
              audioPitch: 1.35
            },
            {
              speaker: 'Alex',
              textEnglish: 'Nice to meet you too!',
              textIndonesian: 'Senang juga bertemu dengan kalian!',
              avatarEmoji: '👦',
              audioPitch: 1.4
            }
          ]
        },
        tips: 'Cobalah berdiri di depan cermin dan katakan: "Hello, my name is [Nama], I am [Umur] years old."'
      },
      {
        id: 'step-eng-sd1-2',
        title: 'Classroom Action Commands (Perintah di Kelas)',
        subtitle: 'Listen, Stand up, Sit down, Open your book, Raise your hand',
        type: 'english_cards',
        prompt: 'Sentuh setiap kartu instruksi untuk mendengarkan suaranya dan ikuti gerakannya!',
        speechText: 'Ayo dengarkan instruksi guru di kelas! Stand up berdiri, Sit down duduk, Open your book buka bukumu, Raise your hand angkat tanganmu!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Stand up', translation: 'Berdiri', phonetic: '/stænd ʌp/', emoji: '🧍', exampleSentence: 'Stand up, please', sentenceTranslation: 'Silakan berdiri', category: 'Commands' },
            { word: 'Sit down', translation: 'Duduk', phonetic: '/sɪt daʊn/', emoji: '🪑', exampleSentence: 'Sit down quietly', sentenceTranslation: 'Duduklah dengan tenang', category: 'Commands' },
            { word: 'Open your book', translation: 'Buka bukumu', phonetic: '/ˈoʊ.pən jʊr bʊk/', emoji: '📖', exampleSentence: 'Open your book to page 10', sentenceTranslation: 'Buka bukumu halaman 10', category: 'Commands' },
            { word: 'Close your book', translation: 'Tutup bukumu', phonetic: '/kloʊz jʊr bʊk/', emoji: '📕', exampleSentence: 'Close your book and listen', sentenceTranslation: 'Tutup bukumu dan dengarkan', category: 'Commands' },
            { word: 'Raise your hand', translation: 'Angkat tanganmu', phonetic: '/reɪz jʊr hænd/', emoji: '🙋', exampleSentence: 'Raise your hand to speak', sentenceTranslation: 'Angkat tanganmu untuk berbicara', category: 'Commands' },
            { word: 'Listen carefully', translation: 'Dengarkan baik-baik', phonetic: '/ˈlɪs.ən ˈker.fəl.i/', emoji: '👂', exampleSentence: 'Listen carefully to the story', sentenceTranslation: 'Dengarkan ceritanya dengan baik', category: 'Commands' }
          ]
        },
        tips: 'Permainan Simon Says dalam bahasa Inggris sangat seru untuk melatih instruksi ini!'
      },
      {
        id: 'step-eng-sd1-3',
        title: 'Kuis Kelas 1 SD',
        subtitle: 'Uji Pemahaman Perkenalan & Instruksi',
        type: 'summary',
        prompt: 'Ayo uji kemampuan bahasa Inggrismu dengan menjawab kuis di bawah ini!',
        speechText: 'Hebat! Ayo jawab kuis perkenalan dan instruksi kelas!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-sd1-1',
        questionNumber: 1,
        prompt: 'Jika guru berkata "Open your book", apa yang harus kamu lakukan?',
        speechPrompt: 'What does open your book mean?',
        options: [
          { id: 'opt-a', text: 'Membuka buku 📖', isCorrect: true },
          { id: 'opt-b', text: 'Menutup buku 📕', isCorrect: false },
          { id: 'opt-c', text: 'Berdiri 🧍', isCorrect: false }
        ],
        explanation: 'Benar! "Open your book" artinya buka bukumu.'
      },
      {
        id: 'q-eng-sd1-2',
        questionNumber: 2,
        prompt: 'Kalimat yang tepat untuk menyebutkan nama dalam bahasa Inggris adalah?',
        speechPrompt: 'How do you say your name in English?',
        options: [
          { id: 'opt-a', text: 'My name is Sarah 👧', isCorrect: true },
          { id: 'opt-b', text: 'I am book 📖', isCorrect: false },
          { id: 'opt-c', text: 'Sit down please 🪑', isCorrect: false }
        ],
        explanation: 'Tepat! "My name is [Nama]" adalah pola yang benar untuk memperkenalkan diri.'
      }
    ]
  },

  // =========================================================================
  // SD KELAS 1: DAYS OF THE WEEK & WEATHER (Fase A)
  // =========================================================================
  {
    id: 'mod-eng-sd1-days-weather',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-1',
    order: 12,
    title: 'Days of the Week & Weather (Hari & Cuaca)',
    shortDesc: 'Mengenal Monday - Sunday dan cuaca: Sunny, Rainy, Cloudy, Windy!',
    fullDesc: 'Fase A (SD Kelas 1): Belajar menyebutkan 7 nama hari dalam sepekan (Monday to Sunday) dan menanyakan kondisi cuaca ("How is the weather today? It is sunny!").',
    kurikulumFase: 'Fase A (SD Kelas 1)',
    kurikulumFokus: 'Days of the Week, Weather Conditions, & Daily Routine English',
    estimatedMinutes: 5,
    starsReward: 25,
    coverEmoji: '📅',
    themeColor: 'from-[#F57C00] to-[#FFB74D]',
    themeBg: 'bg-[#FFF3E0] border-[#FFE082]',
    themeBorder: 'border-[#FFE082]',
    tags: ['SD Kelas 1', 'Fase A', 'English', 'Days', 'Weather'],
    badgeReward: {
      id: 'badge_eng_sd1_calendar',
      name: 'Calendar & Weather Explorer',
      description: 'Hebat! Kamu hafal semua nama hari dan macam-macam cuaca dalam bahasa Inggris!',
      emoji: '☀️',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-day-1',
        title: '7 Days in a Week (Tujuh Hari dalam Seminggu)',
        subtitle: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
        type: 'english_cards',
        prompt: 'Sentuh kartu hari untuk mendengarkan pengucapan yang benar!',
        speechText: 'Ayo sebutkan 7 hari dalam seminggu! Monday Senin, Tuesday Selasa, Wednesday Rabu, Thursday Kamis, Friday Jumat, Saturday Sabtu, Sunday Minggu!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Monday', translation: 'Senin', phonetic: '/ˈmʌn.deɪ/', emoji: '🎒', exampleSentence: 'School starts on Monday', sentenceTranslation: 'Sekolah dimulai pada hari Senin', category: 'Days' },
            { word: 'Tuesday', translation: 'Selasa', phonetic: '/ˈtuːz.deɪ/', emoji: '🎨', exampleSentence: 'We draw pictures on Tuesday', sentenceTranslation: 'Kita menggambar di hari Selasa', category: 'Days' },
            { word: 'Wednesday', translation: 'Rabu', phonetic: '/ˈwenz.deɪ/', emoji: '⚽', exampleSentence: 'We play sports on Wednesday', sentenceTranslation: 'Kita berolahraga di hari Rabu', category: 'Days' },
            { word: 'Thursday', translation: 'Kamis', phonetic: '/ˈθɜːrz.deɪ/', emoji: '📚', exampleSentence: 'We read books on Thursday', sentenceTranslation: 'Kita membaca buku di hari Kamis', category: 'Days' },
            { word: 'Friday', translation: 'Jumat', phonetic: '/ˈfraɪ.deɪ/', emoji: '🕌', exampleSentence: 'Friday is a blessed day', sentenceTranslation: 'Hari Jumat adalah hari yang berkah', category: 'Days' },
            { word: 'Saturday', translation: 'Sabtu', phonetic: '/ˈsæt̬.ɚ.deɪ/', emoji: '🚲', exampleSentence: 'I ride my bike on Saturday', sentenceTranslation: 'Aku bersepeda di hari Sabtu', category: 'Days' },
            { word: 'Sunday', translation: 'Minggu (Libur)', phonetic: '/ˈsʌn.deɪ/', emoji: '🏖️', exampleSentence: 'Sunday is a family holiday', sentenceTranslation: 'Hari Minggu adalah liburan bersama keluarga', category: 'Days' }
          ]
        },
        tips: 'Lagu "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday" sangat mudah dihafalkan!'
      },
      {
        id: 'step-eng-day-2',
        title: 'How is the Weather Today? (Bagaimana Cuaca Hari Ini?)',
        subtitle: 'Sunny, Rainy, Cloudy, Windy',
        type: 'english_cards',
        prompt: 'Sentuh kartu cuaca di bawah untuk mendengarkan kosakata cuaca!',
        speechText: 'Bagaimana cuaca hari ini? Sunny cerah, Rainy hujan, Cloudy berawan, Windy berangin!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Sunny', translation: 'Cerah berpanas matahari ☀️', phonetic: '/ˈsʌn.i/', emoji: '☀️', exampleSentence: 'It is a sunny day today', sentenceTranslation: 'Hari ini cuacanya cerah berawan', category: 'Weather' },
            { word: 'Rainy', translation: 'Hujan rintik / lebat 🌧️', phonetic: '/ˈreɪ.ni/', emoji: '🌧️', exampleSentence: 'Take an umbrella on a rainy day', sentenceTranslation: 'Bawalah payung saat hari hujan', category: 'Weather' },
            { word: 'Cloudy', translation: 'Berawan teduh ☁️', phonetic: '/ˈklaʊ.di/', emoji: '☁️', exampleSentence: 'The sky looks cloudy', sentenceTranslation: 'Langit terlihat berawan', category: 'Weather' },
            { word: 'Windy', translation: 'Berangin kencang 💨', phonetic: '/ˈwɪn.di/', emoji: '💨', exampleSentence: 'Let us fly a kite on a windy day', sentenceTranslation: 'Ayo main layang-layang saat cuaca berangin', category: 'Weather' }
          ]
        },
        tips: 'Tatap ke luar jendela setiap pagi lalu tanyakan: "What is the weather like today?"'
      },
      {
        id: 'step-eng-day-3',
        title: 'Kuis Hari & Cuaca',
        subtitle: 'Uji Pemahaman Kalender & Langit',
        type: 'summary',
        prompt: 'Ayo jawab kuis hari dan cuaca!',
        speechText: 'Waktunya kuis hari dan cuaca ceria!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-day-1',
        questionNumber: 1,
        prompt: 'Hari apakah "Monday" dalam bahasa Indonesia?',
        speechPrompt: 'What day is Monday in Indonesian?',
        options: [
          { id: 'opt-a', text: 'Senin 🎒', isCorrect: true },
          { id: 'opt-b', text: 'Minggu 🏖️', isCorrect: false },
          { id: 'opt-c', text: 'Jumat 🕌', isCorrect: false }
        ],
        explanation: 'Benar! "Monday" adalah hari Senin.'
      }
    ]
  },

  // =========================================================================
  // SD KELAS 2: DAILY ROUTINES & ACTION VERBS (Fase A)
  // =========================================================================
  {
    id: 'mod-eng-sd2-routines-verbs',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-2',
    order: 13,
    title: 'Daily Routines & Action Verbs',
    shortDesc: 'Kegiatan harian: wake up, brush teeth, eat breakfast, go to school & kata kerja aksi!',
    fullDesc: 'Fase A (SD Kelas 2): Belajar menceritakan rutinitas dari pagi hingga malam hari dan menggunakan kata kerja aksi (can run, can swim, can sing) sesuai pedoman Italki & British Council.',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Daily Habit Verbs & "I can..." Abilities',
    estimatedMinutes: 5,
    starsReward: 25,
    coverEmoji: '⏰',
    themeColor: 'from-[#00897B] to-[#4DB6AC]',
    themeBg: 'bg-[#E0F2F1] border-[#80CBC4]',
    themeBorder: 'border-[#80CBC4]',
    tags: ['SD Kelas 2', 'Fase A', 'English', 'Routines', 'Verbs'],
    badgeReward: {
      id: 'badge_eng_sd2_routine',
      name: 'Daily Routine Master',
      description: 'Hebat! Kamu bisa menceritakan jadwal rutinitas pagimu dengan lancar dalam bahasa Inggris!',
      emoji: '⏰',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-rt-1',
        title: 'My Morning Routine (Rutinitas Pagi Hari)',
        subtitle: 'Wake up, Wash face, Brush teeth, Eat breakfast, Go to school',
        type: 'english_cards',
        prompt: 'Sentuh setiap kartu kegiatan pagi untuk mendengarkan pelafalan kalimatnya!',
        speechText: 'Ayo sebutkan kegiatan harian! I wake up early, I wash my face, I brush my teeth, I eat breakfast, I go to school!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Wake up', translation: 'Bangun tidur 🌅', phonetic: '/weɪk ʌp/', emoji: '⏰', exampleSentence: 'I wake up at 6 AM', sentenceTranslation: 'Aku bangun tidur pukul 6 pagi', category: 'Routines' },
            { word: 'Brush teeth', translation: 'Menggosok gigi 🪥', phonetic: '/brʌʃ tiːθ/', emoji: '🪥', exampleSentence: 'I brush my teeth twice a day', sentenceTranslation: 'Aku menggosok gigi dua kali sehari', category: 'Routines' },
            { word: 'Take a bath', translation: 'Mandi bersih 🚿', phonetic: '/teɪk ə bæθ/', emoji: '🚿', exampleSentence: 'I take a fresh shower', sentenceTranslation: 'Aku mandi segar', category: 'Routines' },
            { word: 'Eat breakfast', translation: 'Makan sarapan pagi 🥞', phonetic: '/iːt ˈbrek.fəst/', emoji: '🍳', exampleSentence: 'I eat healthy breakfast with milk', sentenceTranslation: 'Aku sarapan sehat dengan susu', category: 'Routines' },
            { word: 'Go to school', translation: 'Pergi ke sekolah 🏫', phonetic: '/ɡoʊ tuː skuːl/', emoji: '🎒', exampleSentence: 'I go to school with my friends', sentenceTranslation: 'Aku berangkat ke sekolah bersama teman-temanku', category: 'Routines' },
            { word: 'Sleep at night', translation: 'Tidur di malam hari 🌙', phonetic: '/sliːp æt naɪt/', emoji: '🛏️', exampleSentence: 'I sleep at 8 PM', sentenceTranslation: 'Aku tidur pukul 8 malam', category: 'Routines' }
          ]
        },
        tips: 'Ajak si Kecil menceritakan paginya: "First I wake up, then I brush my teeth!"'
      },
      {
        id: 'step-eng-rt-2',
        title: 'Action Verbs & Abilities ("I can...")',
        subtitle: 'Run, Swim, Sing, Dance, Read, Jump',
        type: 'english_cards',
        prompt: 'Sentuh kartu aksi untuk mendengar kemampuan apa saja yang bisa kamu lakukan!',
        speechText: 'Aku bisa beraksi! I can run fast, I can swim, I can sing happily, I can read books!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Run', translation: 'Berlari 🏃', phonetic: '/rʌn/', emoji: '🏃', exampleSentence: 'I can run very fast', sentenceTranslation: 'Aku bisa berlari sangat cepat', category: 'Actions' },
            { word: 'Swim', translation: 'Berenang 🏊', phonetic: '/swɪm/', emoji: '🏊', exampleSentence: 'I can swim like a fish', sentenceTranslation: 'Aku bisa berenang seperti ikan', category: 'Actions' },
            { word: 'Sing', translation: 'Bernyanyi 🎤', phonetic: '/sɪŋ/', emoji: '🎤', exampleSentence: 'I can sing a happy song', sentenceTranslation: 'Aku bisa menyanyikan lagu ceria', category: 'Actions' },
            { word: 'Dance', translation: 'Menari 💃', phonetic: '/dæns/', emoji: '💃', exampleSentence: 'We dance to the rhythm', sentenceTranslation: 'Kita menari mengikuti irama', category: 'Actions' },
            { word: 'Jump', translation: 'Melompat 🦘', phonetic: '/dʒʌmp/', emoji: '🦘', exampleSentence: 'I can jump high', sentenceTranslation: 'Aku bisa melompat tinggi', category: 'Actions' }
          ]
        },
        tips: 'Latih kalimat "I can..." untuk membangun rasa percaya diri anak.'
      },
      {
        id: 'step-eng-rt-3',
        title: 'Kuis Rutinitas Harian',
        subtitle: 'Siap Menjawab Soal Aksi?',
        type: 'summary',
        prompt: 'Ayo jawab kuis kegiatan harian!',
        speechText: 'Waktunya kuis aksi dan rutinitas harian!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-rt-1',
        questionNumber: 1,
        prompt: 'Kalimat "I brush my teeth" artinya adalah?',
        speechPrompt: 'What does I brush my teeth mean?',
        options: [
          { id: 'opt-a', text: 'Aku menggosok gigi 🪥', isCorrect: true },
          { id: 'opt-b', text: 'Aku makan sarapan 🍳', isCorrect: false },
          { id: 'opt-c', text: 'Aku tidur malam 🌙', isCorrect: false }
        ],
        explanation: 'Benar! "Brush teeth" artinya menggosok gigi.'
      }
    ]
  },

  // =========================================================================
  // SD KELAS 2: MY HOUSE & ROOMS (Fase A)
  // =========================================================================
  {
    id: 'mod-eng-sd2-house-rooms',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-2',
    order: 14,
    title: 'My House & Rooms (Rumah & Ruangan)',
    shortDesc: 'Living room, Bedroom, Kitchen, Bathroom, Garden & Prepositions in/on/under!',
    fullDesc: 'Fase A (SD Kelas 2): Belajar mengenal nama-nama ruangan di rumah dan letak benda menggunakan preposisi (in, on, under).',
    kurikulumFase: 'Fase A (SD Kelas 2)',
    kurikulumFokus: 'Rooms in the House & Basic Prepositions of Place',
    estimatedMinutes: 5,
    starsReward: 25,
    coverEmoji: '🏡',
    themeColor: 'from-[#5C6BC0] to-[#7986CB]',
    themeBg: 'bg-[#EDE7F6] border-[#D1C4E9]',
    themeBorder: 'border-[#D1C4E9]',
    tags: ['SD Kelas 2', 'Fase A', 'English', 'House', 'Prepositions'],
    badgeReward: {
      id: 'badge_eng_sd2_house',
      name: 'Home Architect',
      description: 'Hebat! Kamu bisa menyebutkan seluruh ruangan di rumah dalam bahasa Inggris!',
      emoji: '🏡',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-hs-1',
        title: 'Rooms in the House (Ruangan di Rumah)',
        subtitle: 'Living room, Bedroom, Kitchen, Bathroom, Dining room, Garden',
        type: 'english_cards',
        prompt: 'Sentuh kartu ruangan untuk mendengarkan sebutan dan contoh aktivitasnya!',
        speechText: 'Ayo keliling rumah! Living room ruang tamu, Bedroom kamar tidur, Kitchen dapur, Bathroom kamar mandi, Garden taman bunga!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Living room', translation: 'Ruang tamu / keluarga 🛋️', phonetic: '/ˈlɪv.ɪŋ ˌruːm/', emoji: '🛋️', exampleSentence: 'We watch TV in the living room', sentenceTranslation: 'Kita menonton TV di ruang keluarga', category: 'House' },
            { word: 'Bedroom', translation: 'Kamar tidur 🛏️', phonetic: '/ˈbed.ruːm/', emoji: '🛏️', exampleSentence: 'My bedroom is clean and tidy', sentenceTranslation: 'Kamar tidurku bersih dan rapi', category: 'House' },
            { word: 'Kitchen', translation: 'Dapur tempat memasak 🍳', phonetic: '/ˈkɪtʃ.ən/', emoji: '🍳', exampleSentence: 'Mom cooks yummy food in the kitchen', sentenceTranslation: 'Ibu memasak makanan lezat di dapur', category: 'House' },
            { word: 'Bathroom', translation: 'Kamar mandi 🚿', phonetic: '/ˈbæθ.ruːm/', emoji: '🚿', exampleSentence: 'I wash my hands in the bathroom', sentenceTranslation: 'Aku mencuci tangan di kamar mandi', category: 'House' },
            { word: 'Garden', translation: 'Taman atau kebun bunga 🌻', phonetic: '/ˈɡɑːr.dən/', emoji: '🌻', exampleSentence: 'Beautiful roses in the garden', sentenceTranslation: 'Bunga mawar yang indah di taman', category: 'House' }
          ]
        },
        tips: 'Ajak anak berjalan dari ruang tamu ke dapur sambil menyebut namanya dalam bahasa Inggris.'
      },
      {
        id: 'step-eng-hs-2',
        title: 'Where is it? (Preposisi: In, On, Under)',
        subtitle: 'In (Di dalam), On (Di atas), Under (Di bawah)',
        type: 'english_cards',
        prompt: 'Sentuh kartu letak benda untuk mendengarkan contoh kalimat preposisi!',
        speechText: 'Dimana letak bendanya? In di dalam, On di atas, Under di bawah!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'In', translation: 'Di dalam', phonetic: '/ɪn/', emoji: '📦', exampleSentence: 'The pencil is in the bag', sentenceTranslation: 'Pensil berada di dalam tas', category: 'Preposition' },
            { word: 'On', translation: 'Di atas (menempel)', phonetic: '/ɑːn/', emoji: '🪵', exampleSentence: 'The book is on the table', sentenceTranslation: 'Buku berada di atas meja', category: 'Preposition' },
            { word: 'Under', translation: 'Di bawah', phonetic: '/ˈʌn.dɚ/', emoji: '🪑', exampleSentence: 'The cat is sleeping under the chair', sentenceTranslation: 'Kucing sedang tidur di bawah kursi', category: 'Preposition' }
          ]
        },
        tips: 'Latih dengan meletakkan boneka di atas meja (on the table) atau di dalam kotak (in the box).'
      },
      {
        id: 'step-eng-hs-3',
        title: 'Kuis Rumah & Ruangan',
        subtitle: 'Uji Pemahaman Tempat',
        type: 'summary',
        prompt: 'Ayo jawab kuis ruangan dan letak benda!',
        speechText: 'Waktunya kuis rumah dan preposisi!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-hs-1',
        questionNumber: 1,
        prompt: 'Tempat untuk tidur 🛏️ di rumah dalam bahasa Inggris disebut?',
        speechPrompt: 'What room do you sleep in?',
        options: [
          { id: 'opt-a', text: 'Bedroom 🛏️', isCorrect: true },
          { id: 'opt-b', text: 'Kitchen 🍳', isCorrect: false },
          { id: 'opt-c', text: 'Bathroom 🚿', isCorrect: false }
        ],
        explanation: 'Benar! Kamar tidur adalah "Bedroom".'
      }
    ]
  },

  // =========================================================================
  // SD KELAS 3: TELLING TIME & DAILY SCHEDULES (Fase B)
  // =========================================================================
  {
    id: 'mod-eng-sd3-time-schedules',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-3',
    order: 15,
    title: 'Telling Time & Schedules (Membaca Jam)',
    shortDesc: 'Menanyakan dan membaca jam: "What time is it?", o\'clock, half past, jadwal kegiatan!',
    fullDesc: 'Fase B (SD Kelas 3): Membaca jam analog dan digital dalam bahasa Inggris, memahami "o\'clock", "half past", dan menyusun jadwal harian sesuai kurikulum SD.',
    kurikulumFase: 'Fase B (SD Kelas 3)',
    kurikulumFokus: 'Telling Time, Time Prepositions at/in, & Daily Timetables',
    estimatedMinutes: 6,
    starsReward: 30,
    coverEmoji: '⏱️',
    themeColor: 'from-[#00838F] to-[#00ACC1]',
    themeBg: 'bg-[#E0F7FA] border-[#80DEEA]',
    themeBorder: 'border-[#80DEEA]',
    tags: ['SD Kelas 3', 'Fase B', 'English', 'Time', 'Schedules'],
    badgeReward: {
      id: 'badge_eng_sd3_time',
      name: 'Master of Time',
      description: 'Luar biasa! Kamu bisa membaca jam dan mengatur jadwal dalam bahasa Inggris!',
      emoji: '⏱️',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-tm-1',
        title: 'What Time Is It? (Pukul Berapa Sekarang?)',
        subtitle: 'It is 7 o\'clock, It is half past eight',
        type: 'english_cards',
        prompt: 'Sentuh kartu jam untuk mendengarkan cara membaca waktu dalam bahasa Inggris!',
        speechText: 'Pukul berapa sekarang? It is seven o clock, jam tujuh tepat. It is half past eight, jam delapan lewat tiga puluh!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: "Seven o'clock", translation: 'Pukul 07.00 tepat 🕖', phonetic: '/ˈsev.ən əˈklɑːk/', emoji: '🕖', exampleSentence: "It is seven o'clock in the morning", sentenceTranslation: 'Sekarang pukul 7 tepat di pagi hari', category: 'Time' },
            { word: 'Half past eight', translation: 'Pukul 08.30 (lewat setengah jam) 🕣', phonetic: '/hæf pæst eɪt/', emoji: '🕣', exampleSentence: 'Class begins at half past eight', sentenceTranslation: 'Pelajaran dimulai pukul 8 lewat 30 menit', category: 'Time' },
            { word: 'Quarter past nine', translation: 'Pukul 09.15 (lewat 15 menit) 🕤', phonetic: '/ˈkwɔːr.t̬ɚ pæst naɪn/', emoji: '🕤', exampleSentence: 'Recess time is at quarter past nine', sentenceTranslation: 'Waktu istirahat pukul 9 lewat 15', category: 'Time' },
            { word: 'Twelve o\'clock', translation: 'Pukul 12.00 siang (Noon) 🕛', phonetic: '/twelv əˈklɑːk/', emoji: '🕛', exampleSentence: 'Time for lunch at twelve o\'clock', sentenceTranslation: 'Saatnya makan siang pukul 12 tepat', category: 'Time' }
          ]
        },
        tips: 'Gunakan jam dinding di rumah untuk mempraktikkan "What time is it?" setiap saat.'
      },
      {
        id: 'step-eng-tm-2',
        title: 'Daily Schedule Dialogue (Dialog Jadwal Harian)',
        subtitle: 'When do you study? — I study at 4 o\'clock.',
        type: 'dialogue_roleplay',
        prompt: 'Sentuh percakapan jadwal belajar bersama teman!',
        speechText: 'Dengarkan dialog jadwal harian! Sarah: What time do you wake up? Budi: I wake up at 5 o clock. Sarah: What time do you go to sleep? Budi: I go to sleep at 9 o clock.',
        interactiveData: {
          interactiveType: 'dialogue_roleplay',
          dialogues: [
            {
              speaker: 'Sarah',
              textEnglish: 'What time do you wake up every morning?',
              textIndonesian: 'Jam berapa kamu bangun tidur setiap pagi?',
              avatarEmoji: '👧',
              audioPitch: 1.35
            },
            {
              speaker: 'Budi',
              textEnglish: "I wake up at six o'clock every morning.",
              textIndonesian: 'Aku bangun jam 6 tepat setiap pagi.',
              avatarEmoji: '👦',
              audioPitch: 1.2
            },
            {
              speaker: 'Sarah',
              textEnglish: 'And what time do you do your homework?',
              textIndonesian: 'Dan jam berapa kamu mengerjakan PR-mu?',
              avatarEmoji: '👧',
              audioPitch: 1.35
            },
            {
              speaker: 'Budi',
              textEnglish: "I study at half past four in the afternoon.",
              textIndonesian: 'Aku belajar jam 4 lewat 30 menit di sore hari.',
              avatarEmoji: '👦',
              audioPitch: 1.2
            }
          ]
        },
        tips: 'Latih tanya jawab jam bersama anggota keluarga!'
      },
      {
        id: 'step-eng-tm-3',
        title: 'Kuis Waktu & Jadwal',
        subtitle: 'Uji Kemampuan Membaca Jam',
        type: 'summary',
        prompt: 'Ayo jawab kuis membaca jam dalam bahasa Inggris!',
        speechText: 'Waktunya kuis membaca jam!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-tm-1',
        questionNumber: 1,
        prompt: 'Jika jam dinding menunjukkan pukul 07.00 tepat, kalimat bahasa Inggrisnya adalah?',
        speechPrompt: 'How do you say 7:00 sharp in English?',
        options: [
          { id: 'opt-a', text: "It is seven o'clock 🕖", isCorrect: true },
          { id: 'opt-b', text: 'It is half past two', isCorrect: false },
          { id: 'opt-c', text: 'It is yellow apple', isCorrect: false }
        ],
        explanation: 'Benar! "Seven o\'clock" berarti pukul 7 tepat.'
      }
    ]
  },

  // =========================================================================
  // SD KELAS 4-6: JOBS, CAREERS & FUTURE DREAMS (Fase C)
  // =========================================================================
  {
    id: 'mod-eng-sd46-jobs-dreams',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-4-6',
    order: 16,
    title: 'Jobs, Careers & Future Dreams (Profesi & Cita-Cita)',
    shortDesc: 'Doctor, Teacher, Pilot, Astronaut, Chef & "What do you want to be?"',
    fullDesc: 'Fase C (SD Kelas 4-6): Mengenal aneka ragam profesi pekerjaan di masyarakat dan mengekspresikan cita-cita masa depan ("I want to be an astronaut because...").',
    kurikulumFase: 'Fase C (SD Kelas 4, 5, 6)',
    kurikulumFokus: 'Professions, Workplaces, & Expressing Future Ambitions',
    estimatedMinutes: 6,
    starsReward: 30,
    coverEmoji: '🚀',
    themeColor: 'from-[#4527A0] to-[#7E57C2]',
    themeBg: 'bg-[#EDE7F6] border-[#B39DDB]',
    themeBorder: 'border-[#B39DDB]',
    tags: ['SD Kelas 4', 'SD Kelas 5', 'SD Kelas 6', 'Fase C', 'English', 'Jobs', 'Dreams'],
    badgeReward: {
      id: 'badge_eng_sd46_dream',
      name: 'Future Visionary',
      description: 'Luar biasa! Kamu bisa menceritakan cita-cita besarmu dengan bahasa Inggris yang hebat!',
      emoji: '🚀',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-jb-1',
        title: 'Exciting Professions (Profesi-Profesi Hebat)',
        subtitle: 'Doctor, Teacher, Pilot, Chef, Engineer, Police Officer, Astronaut',
        type: 'english_cards',
        prompt: 'Sentuh kartu profesi untuk mendengarkan sebutan dan tempat kerjanya!',
        speechText: 'Apa cita-citamu? Doctor dokter di rumah sakit, Teacher guru di sekolah, Pilot menerbangkan pesawat, Chef koki di restoran, Astronaut menjelajah luar angkasa!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Doctor', translation: 'Dokter (bekerja di rumah sakit)', phonetic: '/ˈdɑːk.tɚ/', emoji: '🩺', exampleSentence: 'A doctor helps sick people get well', sentenceTranslation: 'Dokter membantu orang sakit agar sembuh', category: 'Jobs' },
            { word: 'Teacher', translation: 'Guru (mengajar di sekolah)', phonetic: '/ˈtiː.tʃɚ/', emoji: '👩‍🏫', exampleSentence: 'A teacher guides students patiently', sentenceTranslation: 'Guru membimbing siswa dengan sabar', category: 'Jobs' },
            { word: 'Pilot', translation: 'Pilot pesawat terbang', phonetic: '/ˈpaɪ.lət/', emoji: '✈️', exampleSentence: 'A pilot flies airplanes across the world', sentenceTranslation: 'Pilot menerbangkan pesawat melintasi dunia', category: 'Jobs' },
            { word: 'Chef', translation: 'Koki / Juru masak handal', phonetic: '/ʃef/', emoji: '👨‍🍳', exampleSentence: 'A chef cooks delicious recipes', sentenceTranslation: 'Koki memasak hidangan yang lezat', category: 'Jobs' },
            { word: 'Astronaut', translation: 'Astronot penjelajah angkasa', phonetic: '/ˈæs.trə.nɑːt/', emoji: '🚀', exampleSentence: 'An astronaut travels to the moon', sentenceTranslation: 'Astronot bepergian ke bulan', category: 'Jobs' },
            { word: 'Engineer', translation: 'Insinyur / Teknisi perancang', phonetic: '/ˌen.dʒɪˈnɪr/', emoji: '🏗️', exampleSentence: 'An engineer builds bridges and robots', sentenceTranslation: 'Insinyur merancang jembatan dan robot', category: 'Jobs' }
          ]
        },
        tips: 'Tanyakan cita-cita anak: "What do you want to be when you grow up?"'
      },
      {
        id: 'step-eng-jb-2',
        title: 'Future Ambition Roleplay (Percakapan Cita-Cita)',
        subtitle: '"What do you want to be?" — "I want to be a doctor to help people."',
        type: 'dialogue_roleplay',
        prompt: 'Sentuh gelembung percakapan antara guru dan murid tentang cita-cita masa depan!',
        speechText: 'Dengarkan percakapan cita-cita masa depan! Teacher: What do you want to be when you grow up? Maya: I want to be a doctor because I want to help sick people. Teacher: That is a wonderful dream, Maya!',
        interactiveData: {
          interactiveType: 'dialogue_roleplay',
          dialogues: [
            {
              speaker: 'Teacher',
              textEnglish: 'What do you want to be when you grow up, Maya?',
              textIndonesian: 'Apa cita-citamu saat besar nanti, Maya?',
              avatarEmoji: '👩‍🏫',
              audioPitch: 1.2
            },
            {
              speaker: 'Maya',
              textEnglish: 'I want to be a doctor, because I want to help sick people.',
              textIndonesian: 'Aku ingin menjadi dokter, karena aku ingin menolong orang sakit.',
              avatarEmoji: '👧',
              audioPitch: 1.35
            },
            {
              speaker: 'Teacher',
              textEnglish: 'That is a wonderful dream! Study hard and you will achieve it.',
              textIndonesian: 'Itu cita-cita yang mulia! Belajar dengan tekun dan kamu pasti bisa meraihnya.',
              avatarEmoji: '👩‍🏫',
              audioPitch: 1.2
            }
          ]
        },
        tips: 'Ajak anak membuat kalimat: "I want to be a [Profesi] because [Alasan]."'
      },
      {
        id: 'step-eng-jb-3',
        title: 'Kuis Profesi & Cita-Cita',
        subtitle: 'Uji Pemahaman Karir',
        type: 'summary',
        prompt: 'Ayo jawab kuis profesi masa depan!',
        speechText: 'Waktunya kuis profesi dan cita-cita impian!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-jb-1',
        questionNumber: 1,
        prompt: 'Orang yang menerbangkan pesawat terbang ✈️ dalam bahasa Inggris disebut?',
        speechPrompt: 'What is the person who flies planes called?',
        options: [
          { id: 'opt-a', text: 'Pilot ✈️', isCorrect: true },
          { id: 'opt-b', text: 'Chef 👨‍🍳', isCorrect: false },
          { id: 'opt-c', text: 'Teacher 👩‍🏫', isCorrect: false }
        ],
        explanation: 'Benar! Orang yang menerbangkan pesawat adalah "Pilot".'
      }
    ]
  },

  // =========================================================================
  // SD KELAS 4-6: PLACES IN TOWN & ASKING FOR DIRECTIONS (Fase C)
  // =========================================================================
  {
    id: 'mod-eng-sd46-town-directions',
    subjectId: 'bahasa_inggris',
    gradeId: 'sd-4-6',
    order: 17,
    title: 'Places in Town & Directions (Kota & Petunjuk Jalan)',
    shortDesc: 'Hospital, Library, Supermarket, Park & "Turn left, go straight"!',
    fullDesc: 'Fase C (SD Kelas 4-6): Mengenal tempat-tempat umum di kota dan menanyakan serta memberikan petunjuk arah (Turn left, Turn right, Go straight) dengan sopan.',
    kurikulumFase: 'Fase C (SD Kelas 4, 5, 6)',
    kurikulumFokus: 'Public Places & Giving Directions Navigation',
    estimatedMinutes: 6,
    starsReward: 30,
    coverEmoji: '🗺️',
    themeColor: 'from-[#00695C] to-[#00897B]',
    themeBg: 'bg-[#E0F2F1] border-[#80CBC4]',
    themeBorder: 'border-[#80CBC4]',
    tags: ['SD Kelas 4', 'SD Kelas 5', 'SD Kelas 6', 'Fase C', 'English', 'Places', 'Directions'],
    badgeReward: {
      id: 'badge_eng_sd46_navigator',
      name: 'City Navigator',
      description: 'Hebat! Kamu bisa membaca peta dan memberi petunjuk arah dalam bahasa Inggris!',
      emoji: '🗺️',
      category: 'english'
    },
    steps: [
      {
        id: 'step-eng-pl-1',
        title: 'Places in Town (Tempat-Tempat di Kota)',
        subtitle: 'Hospital, Library, Supermarket, School, Park, Bank, Museum',
        type: 'english_cards',
        prompt: 'Sentuh kartu tempat umum untuk mendengarkan fungsi dan pengucapannya!',
        speechText: 'Ayo berkeliling kota! Hospital rumah sakit, Library perpustakaan, Supermarket toko swalayan, Park taman kota, Museum museum sejarah!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Hospital', translation: 'Rumah sakit 🏥', phonetic: '/ˈhɑː.spɪ.t̬əl/', emoji: '🏥', exampleSentence: 'The hospital is near the main road', sentenceTranslation: 'Rumah sakit berada di dekat jalan utama', category: 'Places' },
            { word: 'Library', translation: 'Perpustakaan umum 📚', phonetic: '/ˈlaɪ.brer.i/', emoji: '📚', exampleSentence: 'We read silent books in the library', sentenceTranslation: 'Kita membaca buku dengan tenang di perpustakaan', category: 'Places' },
            { word: 'Supermarket', translation: 'Pasar swalayan / supermarket 🛒', phonetic: '/ˈsuː.pɚˌmɑːr.kɪt/', emoji: '🛒', exampleSentence: 'Mom buys fresh fruits at the supermarket', sentenceTranslation: 'Ibu membeli buah segar di supermarket', category: 'Places' },
            { word: 'Park', translation: 'Taman bermain & rekreasi 🌳', phonetic: '/pɑːrk/', emoji: '🌳', exampleSentence: 'Children play happily in the park', sentenceTranslation: 'Anak-anak bermain riang di taman', category: 'Places' },
            { word: 'Museum', translation: 'Museum sejarah & seni 🏛️', phonetic: '/mjuːˈziː.əm/', emoji: '🏛️', exampleSentence: 'We see dinosaur fossils in the museum', sentenceTranslation: 'Kita melihat fosil dinosaurus di museum', category: 'Places' }
          ]
        },
        tips: 'Bahas tempat yang dikunjungi keluarga saat akhir pekan.'
      },
      {
        id: 'step-eng-pl-2',
        title: 'Giving Directions (Memberi Petunjuk Arah)',
        subtitle: 'Turn left, Turn right, Go straight, Next to, Opposite',
        type: 'english_cards',
        prompt: 'Sentuh kartu petunjuk arah untuk mendengar arahan jalan dalam bahasa Inggris!',
        speechText: 'Bagaimana petunjuk arahnya? Go straight jalan lurus, Turn left belok kiri, Turn right belok kanan, Next to di sebelah!',
        interactiveData: {
          interactiveType: 'english_cards',
          englishWords: [
            { word: 'Go straight', translation: 'Jalan lurus ke depan ⬆️', phonetic: '/ɡoʊ streɪt/', emoji: '⬆️', exampleSentence: 'Go straight for 100 meters', sentenceTranslation: 'Jalan lurus sejauh 100 meter', category: 'Directions' },
            { word: 'Turn left', translation: 'Belok ke arah kiri ⬅️', phonetic: '/tɜːrn left/', emoji: '⬅️', exampleSentence: 'Turn left at the traffic light', sentenceTranslation: 'Belok kiri di lampu lalu lintas', category: 'Directions' },
            { word: 'Turn right', translation: 'Belok ke arah kanan ➡️', phonetic: '/tɜːrn raɪt/', emoji: '➡️', exampleSentence: 'Turn right after the bank', sentenceTranslation: 'Belok kanan setelah gedung bank', category: 'Directions' },
            { word: 'Next to', translation: 'Tepat di sebelah / samping 📍', phonetic: '/nekst tuː/', emoji: '📍', exampleSentence: 'The library is next to the school', sentenceTranslation: 'Perpustakaan berada di sebelah sekolah', category: 'Directions' }
          ]
        },
        tips: 'Gunakan peta sederhana atau denah rumah untuk berlatih belok kiri dan kanan.'
      },
      {
        id: 'step-eng-pl-3',
        title: 'Kuis Tempat & Petunjuk Arah',
        subtitle: 'Siap Menguji Kemampuan Navigasi?',
        type: 'summary',
        prompt: 'Ayo selesaikan kuis arah dan tempat umum!',
        speechText: 'Waktunya kuis arah dan petunjuk jalan!'
      }
    ],
    quiz: [
      {
        id: 'q-eng-pl-1',
        questionNumber: 1,
        prompt: 'Instruksi "Turn left" dalam bahasa Indonesia artinya adalah?',
        speechPrompt: 'What does turn left mean?',
        options: [
          { id: 'opt-a', text: 'Belok kiri ⬅️', isCorrect: true },
          { id: 'opt-b', text: 'Belok kanan ➡️', isCorrect: false },
          { id: 'opt-c', text: 'Jalan lurus ⬆️', isCorrect: false }
        ],
        explanation: 'Benar! "Turn left" artinya belok ke arah kiri.'
      }
    ]
  }
];
