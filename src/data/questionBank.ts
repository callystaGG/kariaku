import { QuizQuestion, GradeId } from '../types';

export interface BankQuestionEntry extends QuizQuestion {
  gradeId: GradeId;
  subjectId: string;
  topicTag: string;
}

export const CURATED_QUESTION_BANK: BankQuestionEntry[] = [
  // ==========================================
  // MATEMATIKA - PAUD & TK (Fase Fondasi)
  // ==========================================
  {
    id: 'bank-mat-paud-1',
    gradeId: 'paud',
    subjectId: 'matematika',
    topicTag: 'Membilang Konkret 1-5',
    questionNumber: 1,
    prompt: 'Berapa banyak buah apel manis di bawah ini?',
    speechPrompt: 'Berapa banyak buah apel manis di bawah ini? Mari kita hitung bersama!',
    equationVisual: '🍎 🍎 🍎 = ?',
    itemsVisual: [{ emoji: '🍎', count: 3, label: 'Apel Merah' }],
    options: [
      { id: 'opt-1', text: '3 Apel', visualEmoji: '🍎', visualCount: 3, isCorrect: true },
      { id: 'opt-2', text: '2 Apel', visualEmoji: '🍎', visualCount: 2, isCorrect: false },
      { id: 'opt-3', text: '4 Apel', visualEmoji: '🍎', visualCount: 4, isCorrect: false },
    ],
    explanation: 'Hebat! Jika kita hitung satu per satu: satu, dua, tiga! Ada 3 buah apel merah!',
    hint: 'Sentuh setiap apel sambil berhitung 1, 2, 3!'
  },
  {
    id: 'bank-mat-paud-2',
    gradeId: 'paud',
    subjectId: 'matematika',
    topicTag: 'Bentuk Geometris Dasar',
    questionNumber: 2,
    prompt: 'Benda mana yang bentuknya bulat seperti roda sepeda?',
    speechPrompt: 'Benda mana yang bentuknya bulat seperti roda sepeda?',
    equationVisual: '⭕ Bentuk Bulat / Lingkaran',
    options: [
      { id: 'opt-1', text: 'Bola Sepak ⚽', visualEmoji: '⚽', isCorrect: true },
      { id: 'opt-2', text: 'Buku Tulis 📘', visualEmoji: '📘', isCorrect: false },
      { id: 'opt-3', text: 'Piramida Segitiga 🔺', visualEmoji: '🔺', isCorrect: false },
    ],
    explanation: 'Pintar sekali! Bola sepak memiliki bentuk lingkaran / bulat sempurna.',
    hint: 'Bentuk lingkaran tidak punya sudut lancip.'
  },
  {
    id: 'bank-mat-paud-3',
    gradeId: 'paud',
    subjectId: 'matematika',
    topicTag: 'Perbandingan Ukuran',
    questionNumber: 3,
    prompt: 'Hewan mana yang ukurannya PALING BESAR?',
    speechPrompt: 'Hewan mana yang ukurannya paling besar?',
    options: [
      { id: 'opt-1', text: 'Gajah Raksasa 🐘', visualEmoji: '🐘', isCorrect: true },
      { id: 'opt-2', text: 'Semut Kecil 🐜', visualEmoji: '🐜', isCorrect: false },
      { id: 'opt-3', text: 'Kucing Imut 🐱', visualEmoji: '🐱', isCorrect: false },
    ],
    explanation: 'Tepat! Gajah adalah hewan darat bertubuh paling besar dibandingkan semut dan kucing.',
    hint: 'Lihat hewan yang badannya paling tinggi dan berbelalai!'
  },
  {
    id: 'bank-mat-tk-1',
    gradeId: 'tk',
    subjectId: 'matematika',
    topicTag: 'Membilang 1-10',
    questionNumber: 1,
    prompt: 'Ada 4 bintang kuning dan datang 2 bintang lagi. Berapa total bintang sekarang?',
    speechPrompt: 'Ada 4 bintang kuning dan datang 2 bintang lagi. Berapa total bintang sekarang?',
    equationVisual: '4 ⭐ + 2 ⭐ = ?',
    itemsVisual: [
      { emoji: '⭐', count: 4, label: 'Bintang Awal' },
      { emoji: '🌟', count: 2, label: 'Bintang Datang' }
    ],
    options: [
      { id: 'opt-1', text: '6 Bintang ⭐', visualEmoji: '⭐', visualCount: 6, isCorrect: true },
      { id: 'opt-2', text: '5 Bintang ⭐', visualEmoji: '⭐', visualCount: 5, isCorrect: false },
      { id: 'opt-3', text: '7 Bintang ⭐', visualEmoji: '⭐', visualCount: 7, isCorrect: false },
    ],
    explanation: 'Luar biasa! 4 ditambah 2 hasilnya adalah 6 bintang berkilau!',
    hint: 'Hitung terus setelah angka 4: lima, enam!'
  },
  {
    id: 'bank-mat-tk-2',
    gradeId: 'tk',
    subjectId: 'matematika',
    topicTag: 'Konsep Lebih Banyak / Sedikit',
    questionNumber: 2,
    prompt: 'Kelompok mana yang jumlah buahnya LEBIH BANYAK?',
    speechPrompt: 'Kelompok mana yang jumlah buahnya lebih banyak?',
    options: [
      { id: 'opt-1', text: '5 Stroberi 🍓🍓🍓🍓🍓', visualEmoji: '🍓', visualCount: 5, isCorrect: true },
      { id: 'opt-2', text: '2 Pisang 🍌🍌', visualEmoji: '🍌', visualCount: 2, isCorrect: false },
      { id: 'opt-3', text: '3 Jeruk 🍊🍊🍊', visualEmoji: '🍊', visualCount: 3, isCorrect: false },
    ],
    explanation: 'Tepat! Angka 5 lebih besar dari 2 dan 3, jadi stroberi paling banyak!',
    hint: 'Bandingkan jumlah buahnya: 5 adalah yang terbanyak!'
  },
  {
    id: 'bank-mat-tk-3',
    gradeId: 'tk',
    subjectId: 'matematika',
    topicTag: 'Pengurangan Benda Nyata',
    questionNumber: 3,
    prompt: 'Ada 5 balon gas. Meletus 2 balon 🎈. Sisa berapa balon yang terbang?',
    speechPrompt: 'Ada lima balon gas. Meletus dua balon. Sisa berapa balon yang terbang?',
    equationVisual: '5 🎈 - 2 🎈 = ?',
    itemsVisual: [{ emoji: '🎈', count: 5, struckCount: 2, label: '5 Balon (2 meletus)' }],
    options: [
      { id: 'opt-1', text: '3 Balon', visualEmoji: '🎈', visualCount: 3, isCorrect: true },
      { id: 'opt-2', text: '2 Balon', visualEmoji: '🎈', visualCount: 2, isCorrect: false },
      { id: 'opt-3', text: '4 Balon', visualEmoji: '🎈', visualCount: 4, isCorrect: false },
    ],
    explanation: 'Benar! 5 dikurangi 2 sisanya adalah 3 balon.',
    hint: 'Tutup 2 jari dari 5 jari tanganmu, sisa berapa jari?'
  },

  // ==========================================
  // MATEMATIKA - SD 1 (Fase A)
  // ==========================================
  {
    id: 'bank-mat-sd1-1',
    gradeId: 'sd-1',
    subjectId: 'matematika',
    topicTag: 'Penjumlahan 1-20',
    questionNumber: 1,
    prompt: 'Beni memetik 7 jeruk 🍊 dan Siti memetik 5 jeruk 🍊. Berapa jumlah jeruk mereka seluruhnya?',
    speechPrompt: 'Beni memetik 7 jeruk dan Siti memetik 5 jeruk. Berapa jumlah jeruk mereka seluruhnya?',
    equationVisual: '7 + 5 = ...',
    itemsVisual: [
      { emoji: '🍊', count: 7, label: 'Jeruk Beni' },
      { emoji: '🍊', count: 5, label: 'Jeruk Siti' }
    ],
    options: [
      { id: 'opt-1', text: '12 Jeruk', isCorrect: true },
      { id: 'opt-2', text: '11 Jeruk', isCorrect: false },
      { id: 'opt-3', text: '13 Jeruk', isCorrect: false },
      { id: 'opt-4', text: '10 Jeruk', isCorrect: false },
    ],
    explanation: 'Hebat! 7 disimpan di kepala, lalu maju 5 langkah: 8, 9, 10, 11, 12!',
    hint: '7 + 3 = 10, ditambah sisa 2 lagi jadi 12.'
  },
  {
    id: 'bank-mat-sd1-2',
    gradeId: 'sd-1',
    subjectId: 'matematika',
    topicTag: 'Nilai Tempat Satuan Puluhan',
    questionNumber: 2,
    prompt: 'Bilangan 17 terdiri dari ...',
    speechPrompt: 'Bilangan 17 terdiri dari berapa puluhan dan berapa satuan?',
    equationVisual: '17 = ... puluhan + ... satuan',
    options: [
      { id: 'opt-1', text: '1 Puluhan + 7 Satuan', isCorrect: true },
      { id: 'opt-2', text: '7 Puluhan + 1 Satuan', isCorrect: false },
      { id: 'opt-3', text: '10 Puluhan + 7 Satuan', isCorrect: false },
    ],
    explanation: 'Tepat sekali! Angka 1 di depan bernilai 1 puluhan (10) dan angka 7 di belakang adalah 7 satuan.',
    hint: 'Angka sebelah kiri puluhan, angka sebelah kanan satuan.'
  },
  {
    id: 'bank-mat-sd1-3',
    gradeId: 'sd-1',
    subjectId: 'matematika',
    topicTag: 'Pengurangan 1-20',
    questionNumber: 3,
    prompt: 'Ibu membeli 15 telur 🥚. Saat memasak, terpakai 6 telur. Berapa sisa telur Ibu?',
    speechPrompt: 'Ibu membeli 15 telur. Saat memasak, terpakai 6 telur. Berapa sisa telur Ibu?',
    equationVisual: '15 - 6 = ...',
    itemsVisual: [{ emoji: '🥚', count: 15, struckCount: 6, label: '15 Telur (6 terpakai)' }],
    options: [
      { id: 'opt-1', text: '9 Telur', isCorrect: true },
      { id: 'opt-2', text: '8 Telur', isCorrect: false },
      { id: 'opt-3', text: '10 Telur', isCorrect: false },
    ],
    explanation: 'Benar! 15 - 6 = 9. Sisa telur Ibu ada 9 butir.',
    hint: '15 - 5 = 10, kurangi 1 lagi menjadi 9.'
  },
  {
    id: 'bank-mat-sd1-4',
    gradeId: 'sd-1',
    subjectId: 'matematika',
    topicTag: 'Garis Bilangan',
    questionNumber: 4,
    prompt: 'Katak melompat dari angka 8 maju 6 langkah ke kanan. Di angka berapakah katak mendarat?',
    speechPrompt: 'Katak melompat dari angka 8 maju 6 langkah ke kanan. Di angka berapakah katak mendarat?',
    equationVisual: '8 ➡️ +6 = ...',
    options: [
      { id: 'opt-1', text: '14', isCorrect: true },
      { id: 'opt-2', text: '13', isCorrect: false },
      { id: 'opt-3', text: '15', isCorrect: false },
    ],
    explanation: 'Hebat! 8 + 6 = 14. Katak mendarat tepat di angka 14!',
    hint: 'Hitung maju 6 kali dari 8: 9, 10, 11, 12, 13, 14!'
  },

  // ==========================================
  // MATEMATIKA - SD 2 (Fase A)
  // ==========================================
  {
    id: 'bank-mat-sd2-1',
    gradeId: 'sd-2',
    subjectId: 'matematika',
    topicTag: 'Konsep Perkalian Dasar',
    questionNumber: 1,
    prompt: 'Bentuk penjumlahan berulang dari perkalian 3 × 4 adalah ...',
    speechPrompt: 'Bentuk penjumlahan berulang dari perkalian 3 kali 4 adalah ...',
    equationVisual: '3 × 4 = ... ?',
    options: [
      { id: 'opt-1', text: '4 + 4 + 4 (tiga kali angka 4)', isCorrect: true },
      { id: 'opt-2', text: '3 + 3 + 3 + 3 (empat kali angka 3)', isCorrect: false },
      { id: 'opt-3', text: '3 + 4', isCorrect: false },
    ],
    explanation: 'Sempurna! 3 × 4 artinya ada 3 kelompok yang masing-masing berisi 4: (4 + 4 + 4 = 12).',
    hint: 'Angka depan adalah jumlah kelompok, angka belakang adalah isinya.'
  },
  {
    id: 'bank-mat-sd2-2',
    gradeId: 'sd-2',
    subjectId: 'matematika',
    topicTag: 'Penjumlahan 2 Digit',
    questionNumber: 2,
    prompt: 'Berapakah hasil dari 28 + 15?',
    speechPrompt: 'Berapakah hasil penjumlahan 28 ditambah 15?',
    equationVisual: '28 + 15 = ...',
    options: [
      { id: 'opt-1', text: '43', isCorrect: true },
      { id: 'opt-2', text: '42', isCorrect: false },
      { id: 'opt-3', text: '33', isCorrect: false },
      { id: 'opt-4', text: '45', isCorrect: false },
    ],
    explanation: 'Pintar! Satuan: 8 + 5 = 13 (tulis 3 simpan 1). Puluhan: 1 + 2 + 1 = 4. Jadi 43.',
    hint: 'Jumlahkan satuan terlebih dahulu: 8 + 5 = 13.'
  },
  {
    id: 'bank-mat-sd2-3',
    gradeId: 'sd-2',
    subjectId: 'matematika',
    topicTag: 'Pecahan Sederhana',
    questionNumber: 3,
    prompt: 'Satu buah semangka 🍉 dipotong menjadi 2 bagian yang SAMA BESAR. Setiap bagian bernilai pecahan ...',
    speechPrompt: 'Satu buah semangka dipotong menjadi 2 bagian yang sama besar. Setiap bagian bernilai pecahan berapa?',
    equationVisual: '🍉 ➡️ 🍉/2 + 🍉/2',
    options: [
      { id: 'opt-1', text: '1/2 (Satu perdua / Setengah)', isCorrect: true },
      { id: 'opt-2', text: '1/4 (Seperempat)', isCorrect: false },
      { id: 'opt-3', text: '2/1 (Dua persatu)', isCorrect: false },
    ],
    explanation: 'Tepat sekali! 1 benda utuh dibagi menjadi 2 bagian yang sama bernilai 1/2.',
    hint: 'Penyebut di bawah menunjukkan jumlah potongan yang sama (2 bagian).'
  },
  {
    id: 'bank-mat-sd2-4',
    gradeId: 'sd-2',
    subjectId: 'matematika',
    topicTag: 'Membaca Jam Analog',
    questionNumber: 4,
    prompt: 'Jarum pendek menunjuk ke angka 4, dan jarum panjang menunjuk tepat ke angka 12. Pukul berapakah sekarang?',
    speechPrompt: 'Jarum pendek menunjuk ke angka 4, dan jarum panjang menunjuk tepat ke angka 12. Pukul berapakah sekarang?',
    equationVisual: '🕐 Jam: Pendek ke 4, Panjang ke 12',
    options: [
      { id: 'opt-1', text: 'Pukul 04.00 tepat', isCorrect: true },
      { id: 'opt-2', text: 'Pukul 12.04', isCorrect: false },
      { id: 'opt-3', text: 'Pukul 04.30', isCorrect: false },
    ],
    explanation: 'Hebat! Jarum pendek menunjukkan jam, dan jarum panjang di angka 12 menunjukkan menit ke-00.',
    hint: 'Jarum pendek = jam, jarum panjang = menit.'
  },

  // ==========================================
  // MATEMATIKA - SD 3 (Fase B)
  // ==========================================
  {
    id: 'bank-mat-sd3-1',
    gradeId: 'sd-3',
    subjectId: 'matematika',
    topicTag: 'Perkalian & Pembagian',
    questionNumber: 1,
    prompt: 'Pak Tono memiliki 36 bibit pohon. Bibit tersebut dibagikan sama rata ke dalam 4 kebun. Berapa bibit di setiap kebun?',
    speechPrompt: 'Pak Tono memiliki 36 bibit pohon. Bibit tersebut dibagikan sama rata ke dalam 4 kebun. Berapa bibit di setiap kebun?',
    equationVisual: '36 ÷ 4 = ...',
    options: [
      { id: 'opt-1', text: '9 bibit', isCorrect: true },
      { id: 'opt-2', text: '8 bibit', isCorrect: false },
      { id: 'opt-3', text: '7 bibit', isCorrect: false },
      { id: 'opt-4', text: '6 bibit', isCorrect: false },
    ],
    explanation: 'Benar! 36 ÷ 4 = 9 karena 9 × 4 = 36.',
    hint: 'Ingat perkalian 4 yang menghasilkan 36!'
  },
  {
    id: 'bank-mat-sd3-2',
    gradeId: 'sd-3',
    subjectId: 'matematika',
    topicTag: 'Keliling Bangun Datar',
    questionNumber: 2,
    prompt: 'Sebuah papan catur berbentuk persegi dengan panjang sisi 10 cm. Berapakah keliling papan catur tersebut?',
    speechPrompt: 'Sebuah papan catur berbentuk persegi dengan panjang sisi 10 sentimeter. Berapakah kelilingnya?',
    equationVisual: 'Keliling Persegi = 4 × sisi = 4 × 10 cm',
    options: [
      { id: 'opt-1', text: '40 cm', isCorrect: true },
      { id: 'opt-2', text: '100 cm', isCorrect: false },
      { id: 'opt-3', text: '20 cm', isCorrect: false },
    ],
    explanation: 'Luar biasa! Keliling persegi dihitung dengan menjumlahkan ke-4 sisinya (4 × 10 cm = 40 cm).',
    hint: 'Persegi punya 4 sisi yang sama panjang.'
  },
  {
    id: 'bank-mat-sd3-3',
    gradeId: 'sd-3',
    subjectId: 'matematika',
    topicTag: 'Uang & Transaksi Rupiah',
    questionNumber: 3,
    prompt: 'Ali membeli buku seharga Rp 7.500 dan membayar dengan selembar uang Rp 10.000. Berapa uang kembalian Ali?',
    speechPrompt: 'Ali membeli buku seharga 7.500 rupiah dan membayar dengan uang 10.000 rupiah. Berapa uang kembaliannya?',
    equationVisual: 'Rp 10.000 - Rp 7.500 = ...',
    options: [
      { id: 'opt-1', text: 'Rp 2.500', isCorrect: true },
      { id: 'opt-2', text: 'Rp 3.500', isCorrect: false },
      { id: 'opt-3', text: 'Rp 1.500', isCorrect: false },
    ],
    explanation: 'Tepat! Rp 10.000 - Rp 7.500 = Rp 2.500.',
    hint: 'Hitung selisih dari 7.500 ke 10.000.'
  },

  // ==========================================
  // MATEMATIKA - SD 4-6 (Fase B & C)
  // ==========================================
  {
    id: 'bank-mat-sd4-1',
    gradeId: 'sd-4-6',
    subjectId: 'matematika',
    topicTag: 'Operasi Campuran (Kabataku)',
    questionNumber: 1,
    prompt: 'Berapakah hasil dari 25 + 15 × 4 - 30?',
    speechPrompt: 'Berapakah hasil operasi 25 ditambah 15 kali 4 dikurang 30?',
    equationVisual: '25 + (15 × 4) - 30 = ...',
    options: [
      { id: 'opt-1', text: '55', isCorrect: true },
      { id: 'opt-2', text: '130', isCorrect: false },
      { id: 'opt-3', text: '65', isCorrect: false },
      { id: 'opt-4', text: '45', isCorrect: false },
    ],
    explanation: 'Hebat! Dahulukan perkalian: 15 × 4 = 60. Lalu: 25 + 60 = 85. Terakhir: 85 - 30 = 55.',
    hint: 'Urutan Kabataku: Perkalian dikerjakan terlebih dahulu sebelum penjumlahan dan pengurangan!'
  },
  {
    id: 'bank-mat-sd4-2',
    gradeId: 'sd-4-6',
    subjectId: 'matematika',
    topicTag: 'KPK dan FPB',
    questionNumber: 2,
    prompt: 'Kelipatan Persekutuan Terkecil (KPK) dari bilangan 6 dan 8 adalah ...',
    speechPrompt: 'Kelipatan Persekutuan Terkecil dari bilangan 6 dan 8 adalah ...',
    equationVisual: 'KPK(6, 8) = ... ?',
    options: [
      { id: 'opt-1', text: '24', isCorrect: true },
      { id: 'opt-2', text: '48', isCorrect: false },
      { id: 'opt-3', text: '18', isCorrect: false },
      { id: 'opt-4', text: '12', isCorrect: false },
    ],
    explanation: 'Luar biasa! Kelipatan 6: 6, 12, 18, 24, 30... Kelipatan 8: 8, 16, 24, 32... Angka pertama yang sama adalah 24.',
    hint: 'Cari angka terkecil yang bisa dibagi habis oleh 6 dan 8.'
  },
  {
    id: 'bank-mat-sd4-3',
    gradeId: 'sd-4-6',
    subjectId: 'matematika',
    topicTag: 'Luas Bangun Datar Segitiga',
    questionNumber: 3,
    prompt: 'Sebuah segitiga memiliki alas 12 cm dan tinggi 8 cm. Berapakah luas segitiga tersebut?',
    speechPrompt: 'Sebuah segitiga memiliki alas 12 sentimeter dan tinggi 8 sentimeter. Berapakah luas segitiga tersebut?',
    equationVisual: 'Luas = (Alas × Tinggi) ÷ 2 = (12 × 8) ÷ 2',
    options: [
      { id: 'opt-1', text: '48 cm²', isCorrect: true },
      { id: 'opt-2', text: '96 cm²', isCorrect: false },
      { id: 'opt-3', text: '40 cm²', isCorrect: false },
    ],
    explanation: 'Benar! Luas = (12 × 8) / 2 = 96 / 2 = 48 cm².',
    hint: 'Rumus luas segitiga adalah setengah kali alas kali tinggi.'
  },

  // ==========================================
  // BAHASA & CALISTUNG (Semua Jenjang)
  // ==========================================
  {
    id: 'bank-cal-1',
    gradeId: 'paud',
    subjectId: 'calistung',
    topicTag: 'Huruf Vokal A-I-U-E-O',
    questionNumber: 1,
    prompt: 'Huruf apakah yang mengawali kata "A P E L"?',
    speechPrompt: 'Huruf apakah yang mengawali kata apel?',
    equationVisual: '... - P - E - L',
    options: [
      { id: 'opt-1', text: 'Huruf A', isCorrect: true },
      { id: 'opt-2', text: 'Huruf B', isCorrect: false },
      { id: 'opt-3', text: 'Huruf O', isCorrect: false },
    ],
    explanation: 'Pintar! Kata "Apel" diawali dengan huruf vokal A!',
    hint: 'Bunyikan huruf pertamanya: Aaaa-pel!'
  },
  {
    id: 'bank-cal-2',
    gradeId: 'tk',
    subjectId: 'calistung',
    topicTag: 'Membaca Suku Kata',
    questionNumber: 2,
    prompt: 'Gabungan suku kata "BU" + "KU" jika dibaca menjadi kata ...',
    speechPrompt: 'Gabungan suku kata BU ditambah KU jika dibaca menjadi apa?',
    equationVisual: 'BU + KU = ?',
    options: [
      { id: 'opt-1', text: 'BUKU 📖', isCorrect: true },
      { id: 'opt-2', text: 'BOLA ⚽', isCorrect: false },
      { id: 'opt-3', text: 'KUKU 💅', isCorrect: false },
    ],
    explanation: 'Hebat! BU-KU dibaca BUKU, tempat kita membaca cerita seru!',
    hint: 'Satukan bunyi: B-U dan K-U.'
  },
  {
    id: 'bank-cal-3',
    gradeId: 'sd-1',
    subjectId: 'calistung',
    topicTag: 'Menyusun Kata Menjadi Kalimat',
    questionNumber: 3,
    prompt: 'Susun kata berikut menjadi kalimat yang benar: [membaca - Ani - buku]',
    speechPrompt: 'Susun kata membaca, Ani, buku menjadi kalimat yang benar.',
    options: [
      { id: 'opt-1', text: 'Ani membaca buku.', isCorrect: true },
      { id: 'opt-2', text: 'Buku membaca Ani.', isCorrect: false },
      { id: 'opt-3', text: 'Membaca buku Ani.', isCorrect: false },
    ],
    explanation: 'Tepat sekali! Pola kalimat yang baik diawali dengan subjek (Ani) lalu tindakan (membaca) dan objek (buku).',
    hint: 'Siapa yang membaca? Ani yang membaca!'
  },
  {
    id: 'bank-cal-4',
    gradeId: 'sd-2',
    subjectId: 'calistung',
    topicTag: 'Antonim (Lawan Kata)',
    questionNumber: 4,
    prompt: 'Lawan kata (antonim) dari kata "RAJIN" adalah ...',
    speechPrompt: 'Lawan kata dari kata rajin adalah apa?',
    options: [
      { id: 'opt-1', text: 'MALAS', isCorrect: true },
      { id: 'opt-2', text: 'PANDAI', isCorrect: false },
      { id: 'opt-3', text: 'PINTAR', isCorrect: false },
    ],
    explanation: 'Benar! Lawan kata dari rajin adalah malas. Anak hebat pasti selalu rajin!',
    hint: 'Jika tidak rajin belajar, berarti...'
  },
  {
    id: 'bank-cal-5',
    gradeId: 'sd-3',
    subjectId: 'calistung',
    topicTag: 'Tanda Baca',
    questionNumber: 5,
    prompt: 'Tanda baca yang tepat untuk mengakhiri kalimat tanya adalah ...',
    speechPrompt: 'Tanda baca yang tepat untuk mengakhiri kalimat tanya adalah apa?',
    options: [
      { id: 'opt-1', text: 'Tanda Tanya (?)', isCorrect: true },
      { id: 'opt-2', text: 'Tanda Seru (!)', isCorrect: false },
      { id: 'opt-3', text: 'Tanda Titik (.)', isCorrect: false },
    ],
    explanation: 'Pintar! Kalimat pertanyaan selalu diakhiri dengan tanda tanya (?).',
    hint: 'Contoh: "Di mana rumahmu?"'
  },
  {
    id: 'bank-cal-6',
    gradeId: 'sd-4-6',
    subjectId: 'calistung',
    topicTag: 'Ide Pokok Paragraf',
    questionNumber: 6,
    prompt: 'Bacalah: "Hutan bakau sangat penting untuk mencegah abrasi pantai. Selain itu, hutan bakau juga menjadi tempat tinggal kepiting dan ikan kecil." Ide pokok teks tersebut adalah ...',
    speechPrompt: 'Apa ide pokok dari teks tentang hutan bakau tersebut?',
    options: [
      { id: 'opt-1', text: 'Manfaat penting hutan bakau bagi lingkungan', isCorrect: true },
      { id: 'opt-2', text: 'Cara memancing kepiting di bakau', isCorrect: false },
      { id: 'opt-3', text: 'Jenis-jenis pohon di pantai', isCorrect: false },
    ],
    explanation: 'Hebat! Paragraf tersebut menceritakan beragam manfaat penting dari hutan bakau.',
    hint: 'Lihat gagasan utama yang dibahas di awal kalimat.'
  },

  // ==========================================
  // SAINS & ALAM (IPAS)
  // ==========================================
  {
    id: 'bank-ipa-1',
    gradeId: 'paud',
    subjectId: 'ipa_alam',
    topicTag: 'Pancaindra',
    questionNumber: 1,
    prompt: 'Bagian tubuh manakah yang kita gunakan untuk MELIHAT pelangi yang indah?',
    speechPrompt: 'Bagian tubuh manakah yang kita gunakan untuk melihat pelangi yang indah?',
    options: [
      { id: 'opt-1', text: 'Mata 👀', visualEmoji: '👀', isCorrect: true },
      { id: 'opt-2', text: 'Telinga 👂', visualEmoji: '👂', isCorrect: false },
      { id: 'opt-3', text: 'Hidung 👃', visualEmoji: '👃', isCorrect: false },
    ],
    explanation: 'Benar! Mata adalah indra penglihatan untuk melihat segala keindahan di bumi!',
    hint: 'Kita membuka mata untuk melihat warna-warni.'
  },
  {
    id: 'bank-ipa-2',
    gradeId: 'tk',
    subjectId: 'ipa_alam',
    topicTag: 'Benda Hidup & Tak Hidup',
    questionNumber: 2,
    prompt: 'Benda manakah yang termasuk BENDA HIDUP karena bisa tumbuh dan bernapas?',
    speechPrompt: 'Benda manakah yang termasuk benda hidup karena bisa tumbuh dan bernapas?',
    options: [
      { id: 'opt-1', text: 'Tanaman Bunga Mawar 🌹', visualEmoji: '🌹', isCorrect: true },
      { id: 'opt-2', text: 'Batu Sungai 🪨', visualEmoji: '🪨', isCorrect: false },
      { id: 'opt-3', text: 'Mobil Mainan 🚗', visualEmoji: '🚗', isCorrect: false },
    ],
    explanation: 'Tepat! Tumbuhan adalah makhluk hidup karena memerlukan air, cahaya matahari, dan tumbuh membesar.',
    hint: 'Benda hidup butuh makan dan minum.'
  },
  {
    id: 'bank-ipa-3',
    gradeId: 'sd-1',
    subjectId: 'ipa_alam',
    topicTag: 'Hewan Herbivora',
    questionNumber: 3,
    prompt: 'Hewan pemakan tumbuhan (rumput dan wortel) seperti kelinci 🐇 disebut hewan ...',
    speechPrompt: 'Hewan pemakan tumbuhan seperti kelinci disebut hewan apa?',
    options: [
      { id: 'opt-1', text: 'Herbivora', isCorrect: true },
      { id: 'opt-2', text: 'Karnivora (Pemakan Daging)', isCorrect: false },
      { id: 'opt-3', text: 'Omnivora (Pemakan Segala)', isCorrect: false },
    ],
    explanation: 'Hebat! Herbivora adalah hewan pemakan dedaunan, rumput, dan buah-buahan.',
    hint: 'Contoh herbivora: kelinci, kambing, sapi, gajah.'
  },
  {
    id: 'bank-ipa-4',
    gradeId: 'sd-2',
    subjectId: 'ipa_alam',
    topicTag: 'Perubahan Wujud Benda',
    questionNumber: 4,
    prompt: 'Es batu 🧊 yang dibiarkan di tempat terbuka akan berubah menjadi air cair. Peristiwa ini disebut ...',
    speechPrompt: 'Es batu yang dibiarkan di tempat terbuka akan berubah menjadi air cair. Peristiwa ini disebut apa?',
    options: [
      { id: 'opt-1', text: 'Mencair (Melebur)', isCorrect: true },
      { id: 'opt-2', text: 'Membeku', isCorrect: false },
      { id: 'opt-3', text: 'Menguap', isCorrect: false },
    ],
    explanation: 'Pintar! Perubahan dari benda padat (es) menjadi cair (air) karena panas disebut mencair.',
    hint: 'Seperti es krim yang meleleh saat terkena terik matahari.'
  },
  {
    id: 'bank-ipa-5',
    gradeId: 'sd-3',
    subjectId: 'ipa_alam',
    topicTag: 'Siklus Air & Cuaca',
    questionNumber: 5,
    prompt: 'Air laut dan sungai yang terkena panas matahari menguap ke udara membentuk awan. Proses penguapan air ini disebut ...',
    speechPrompt: 'Proses penguapan air permukaan bumi karena panas matahari disebut apa?',
    options: [
      { id: 'opt-1', text: 'Evaporasi (Penguapan)', isCorrect: true },
      { id: 'opt-2', text: 'Kondensasi (Pengembunan)', isCorrect: false },
      { id: 'opt-3', text: 'Presipitasi (Hujan)', isCorrect: false },
    ],
    explanation: 'Hebat! Panas matahari membuat air menguap ke atmosfer (Evaporasi), lalu mengembun menjadi awan.',
    hint: 'Evaporasi berasal dari kata "uap" (vapor).'
  },
  {
    id: 'bank-ipa-6',
    gradeId: 'sd-4-6',
    subjectId: 'ipa_alam',
    topicTag: 'Fotosintesis & Tata Surya',
    questionNumber: 6,
    prompt: 'Gas yang diserap oleh daun tumbuhan hijau saat melakukan fotosintesis di siang hari adalah ...',
    speechPrompt: 'Gas apakah yang diserap oleh daun tumbuhan hijau saat berfotosintesis?',
    options: [
      { id: 'opt-1', text: 'Karbon Dioksida (CO₂)', isCorrect: true },
      { id: 'opt-2', text: 'Oksigen (O₂)', isCorrect: false },
      { id: 'opt-3', text: 'Nitrogen', isCorrect: false },
    ],
    explanation: 'Luar biasa! Tumbuhan menyerap Karbon Dioksida (CO₂) dan menghasilkan Oksigen segar (O₂) untuk kita bernapas!',
    hint: 'Tumbuhan membersihkan udara kotor karbon dioksida.'
  },

  // ==========================================
  // KARAKTER & PANCASILA
  // ==========================================
  {
    id: 'bank-kar-1',
    gradeId: 'paud',
    subjectId: 'karakter',
    topicTag: '4 Kata Ajaib',
    questionNumber: 1,
    prompt: 'Ketika kita tidak sengaja menabrak teman saat bermain, kata santun apa yang harus kita ucapkan?',
    speechPrompt: 'Ketika kita tidak sengaja menabrak teman saat bermain, kata apa yang harus kita ucapkan?',
    options: [
      { id: 'opt-1', text: '"Maafkan aku ya teman."', visualEmoji: '🙏', isCorrect: true },
      { id: 'opt-2', text: '"Biarin saja."', visualEmoji: '🙈', isCorrect: false },
      { id: 'opt-3', text: '"Kamu yang salah!"', visualEmoji: '😠', isCorrect: false },
    ],
    explanation: 'Hebat! Meminta maaf secara tulus adalah sikap pemberani dan terpuji!',
    hint: 'Gunakan kata ajaib "Maaf".'
  },
  {
    id: 'bank-kar-2',
    gradeId: 'tk',
    subjectId: 'karakter',
    topicTag: 'Berbagi & Antre',
    questionNumber: 2,
    prompt: 'Saat ingin menaiki perosotan di taman bersama teman-teman, sikap yang benar adalah ...',
    speechPrompt: 'Saat ingin menaiki perosotan di taman bersama teman-teman, sikap yang benar adalah apa?',
    options: [
      { id: 'opt-1', text: 'Tertib mengantre menunggu giliran', isCorrect: true },
      { id: 'opt-2', text: 'Menyerobot antrean di depan', isCorrect: false },
      { id: 'opt-3', text: 'Mendorong teman agar cepat', isCorrect: false },
    ],
    explanation: 'Pintar! Mengantre dengan sabar menjaga keselamatan dan membuat semua orang senang.',
    hint: 'Budaya antre menunjukkan anak yang disiplin.'
  },
  {
    id: 'bank-kar-3',
    gradeId: 'sd-1',
    subjectId: 'karakter',
    topicTag: 'Pancasila Sila Pertama',
    questionNumber: 3,
    prompt: 'Simbol Bintang Emas pada Garuda Pancasila melambangkan Sila ke-1, yaitu ...',
    speechPrompt: 'Simbol Bintang Emas pada Garuda Pancasila melambangkan sila ke-1, bunyinya apa?',
    equationVisual: '⭐ Sila ke-1',
    options: [
      { id: 'opt-1', text: 'Ketuhanan Yang Maha Esa', isCorrect: true },
      { id: 'opt-2', text: 'Kemanusiaan yang Adil dan Beradab', isCorrect: false },
      { id: 'opt-3', text: 'Persatuan Indonesia', isCorrect: false },
    ],
    explanation: 'Benar sekali! Sila pertama adalah "Ketuhanan Yang Maha Esa" yang disimbolkan oleh Bintang Emas berkilau.',
    hint: 'Contoh pengamalannya adalah rajin berdoa dan beribadah.'
  },
  {
    id: 'bank-kar-4',
    gradeId: 'sd-2',
    subjectId: 'karakter',
    topicTag: 'Gotong Royong & Kerja Sama',
    questionNumber: 4,
    prompt: 'Saat kelas kotor sehabis pelajaran seni, apa yang sebaiknya kita lakukan bersama teman sekelas?',
    speechPrompt: 'Saat kelas kotor sehabis pelajaran seni, apa yang sebaiknya kita lakukan bersama teman sekelas?',
    options: [
      { id: 'opt-1', text: 'Gotong royong membersihkan kelas bersama-sama', isCorrect: true },
      { id: 'opt-2', text: 'Langsung pulang dan membiarkan kotor', isCorrect: false },
      { id: 'opt-3', text: 'Menyuruh satu teman saja yang bersih-bersih', isCorrect: false },
    ],
    explanation: 'Hebat! Dengan gotong royong, pekerjaan berat menjadi ringan dan kelas cepat bersih.',
    hint: 'Berat sama dipikul, ringan sama dijinjing.'
  },
  {
    id: 'bank-kar-5',
    gradeId: 'sd-3',
    subjectId: 'karakter',
    topicTag: 'Menghargai Keberagaman',
    questionNumber: 5,
    prompt: 'Semboyan bangsa Indonesia yang berarti "Berbeda-beda tetapi tetap satu jua" adalah ...',
    speechPrompt: 'Semboyan bangsa Indonesia yang berarti Berbeda-beda tetapi tetap satu jua adalah apa?',
    options: [
      { id: 'opt-1', text: 'Bhinneka Tunggal Ika', isCorrect: true },
      { id: 'opt-2', text: 'Tut Wuri Handayani', isCorrect: false },
      { id: 'opt-3', text: 'Ing Ngarso Sung Tulodo', isCorrect: false },
    ],
    explanation: 'Luar biasa! Bhinneka Tunggal Ika tertulis di pita cengkeraman burung Garuda Pancasila.',
    hint: 'Semboyan persatuan suku, agama, dan budaya Indonesia.'
  },
  {
    id: 'bank-kar-6',
    gradeId: 'sd-4-6',
    subjectId: 'karakter',
    topicTag: 'Kejujuran & Integritas',
    questionNumber: 6,
    prompt: 'Ketika menemukan dompet terjatuh di halaman sekolah, tindakan yang mencerminkan integritas dan kejujuran adalah ...',
    speechPrompt: 'Ketika menemukan dompet terjatuh di halaman sekolah, tindakan jujur apa yang harus dilakukan?',
    options: [
      { id: 'opt-1', text: 'Menyerahkan dompet ke guru piket atau ruang kepala sekolah', isCorrect: true },
      { id: 'opt-2', text: 'Mengambil uangnya lalu membuang dompetnya', isCorrect: false },
      { id: 'opt-3', text: 'Menyembunyikannya di dalam tas sendiri', isCorrect: false },
    ],
    explanation: 'Sempurna! Anak hebat selalu jujur dan mengembalikan barang yang bukan miliknya kepada pemiliknya.',
    hint: 'Kejujuran adalah perhiasan hati yang paling mulia.'
  },

  // ==========================================
  // BAHASA INGGRIS (ENGLISH FOR KIDS)
  // ==========================================
  {
    id: 'bank-eng-paud-1',
    gradeId: 'paud',
    subjectId: 'bahasa_inggris',
    topicTag: 'Alphabet & Phonics',
    questionNumber: 1,
    prompt: 'Huruf apakah yang berpasangan dengan "Apple" (🍎) dalam bahasa Inggris?',
    speechPrompt: 'What letter does Apple start with?',
    equationVisual: '🍎 = ... for Apple',
    options: [
      { id: 'opt-1', text: 'A (A for Apple) 🍎', isCorrect: true },
      { id: 'opt-2', text: 'B (B for Ball) ⚽', isCorrect: false },
      { id: 'opt-3', text: 'C (C for Cat) 🐱', isCorrect: false }
    ],
    explanation: 'Benar sekali! "A" is for Apple (Apel merah manis).',
    hint: 'A - P - P - L - E'
  },
  {
    id: 'bank-eng-paud-2',
    gradeId: 'paud',
    subjectId: 'bahasa_inggris',
    topicTag: 'Numbers 1-10',
    questionNumber: 2,
    prompt: 'Berapa jumlah bintang di bawah ini? ⭐ ⭐ ⭐',
    speechPrompt: 'How many stars are there?',
    equationVisual: '⭐ ⭐ ⭐ = ?',
    options: [
      { id: 'opt-1', text: 'Three stars (3) ⭐', isCorrect: true },
      { id: 'opt-2', text: 'Two stars (2)', isCorrect: false },
      { id: 'opt-3', text: 'Four stars (4)', isCorrect: false }
    ],
    explanation: 'Pintar! One, Two, Three! Ada 3 bintang ("Three stars").',
    hint: 'Hitung one, two, three!'
  },
  {
    id: 'bank-eng-tk-1',
    gradeId: 'tk',
    subjectId: 'bahasa_inggris',
    topicTag: 'Colors & Shapes',
    questionNumber: 1,
    prompt: 'Warna apakah buah pisang matang 🍌 dalam bahasa Inggris?',
    speechPrompt: 'What color is a ripe banana in English?',
    equationVisual: '🍌 = ?',
    options: [
      { id: 'opt-1', text: 'Yellow 🟡', isCorrect: true },
      { id: 'opt-2', text: 'Blue 🔵', isCorrect: false },
      { id: 'opt-3', text: 'Red 🔴', isCorrect: false }
    ],
    explanation: 'Hebat! Pisang matang berwarna kuning atau "Yellow".',
    hint: 'Warna seperti sinar matahari.'
  },
  {
    id: 'bank-eng-tk-2',
    gradeId: 'tk',
    subjectId: 'bahasa_inggris',
    topicTag: 'Animals & Sounds',
    questionNumber: 2,
    prompt: 'Hewan berkaki empat yang bersuara "meow" 🐱 dalam bahasa Inggris disebut ...',
    speechPrompt: 'What animal says meow in English?',
    equationVisual: '🐱 "Meow" = ?',
    options: [
      { id: 'opt-1', text: 'Cat 🐱', isCorrect: true },
      { id: 'opt-2', text: 'Dog 🐶', isCorrect: false },
      { id: 'opt-3', text: 'Duck 🦆', isCorrect: false }
    ],
    explanation: 'Tepat! Kucing dalam bahasa Inggris adalah "Cat".',
    hint: 'C - A - T'
  },
  {
    id: 'bank-eng-sd1-1',
    gradeId: 'sd-1',
    subjectId: 'bahasa_inggris',
    topicTag: 'Greetings & Manners',
    questionNumber: 1,
    prompt: 'Saat bertemu guru atau teman di pagi hari sebelum masuk kelas, kita menyapa dengan ...',
    speechPrompt: 'What greeting do you say in the morning?',
    options: [
      { id: 'opt-1', text: 'Good morning! 🌅', isCorrect: true },
      { id: 'opt-2', text: 'Good night! 🌙', isCorrect: false },
      { id: 'opt-3', text: 'Good bye! 👋', isCorrect: false }
    ],
    explanation: 'Luar biasa! Di pagi hari kita menyapa "Good morning!"',
    hint: 'Sapaan selamat pagi yang ramah.'
  },
  {
    id: 'bank-eng-sd2-1',
    gradeId: 'sd-2',
    subjectId: 'bahasa_inggris',
    topicTag: 'Rooms & Prepositions',
    questionNumber: 1,
    prompt: 'The books are ... the table (Buku-buku berada di ATAS meja). Kata yang tepat adalah ...',
    speechPrompt: 'Which preposition means di atas?',
    options: [
      { id: 'opt-1', text: 'On 🪵', isCorrect: true },
      { id: 'opt-2', text: 'Under 🪑', isCorrect: false },
      { id: 'opt-3', text: 'In 📦', isCorrect: false }
    ],
    explanation: 'Benar! "On" digunakan untuk menyatakan letak di atas permukaan.',
    hint: 'On the table = di atas meja.'
  },
  {
    id: 'bank-eng-sd3-1',
    gradeId: 'sd-3',
    subjectId: 'bahasa_inggris',
    topicTag: 'Telling Time',
    questionNumber: 1,
    prompt: 'Jika jam menunjukkan pukul 07.00 tepat, kalimat bahasa Inggris yang benar adalah ...',
    speechPrompt: 'What time is it at 7 o clock?',
    options: [
      { id: 'opt-1', text: "It is seven o'clock 🕖", isCorrect: true },
      { id: 'opt-2', text: 'It is half past two 🕝', isCorrect: false },
      { id: 'opt-3', text: 'It is yellow balloon 🎈', isCorrect: false }
    ],
    explanation: 'Pintar! Pukul 7 tepat disebut "It is seven o\'clock".',
    hint: 'O\'clock dipakai untuk jam bulat tepat.'
  }
];
