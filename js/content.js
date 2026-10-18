/* Isi pelajaran: jenjang, mata pelajaran, kosakata, dan bank bacaan. */

const LEVELS = [
  { id: 'kb',   name: 'Kelompok Bermain', short: 'KB',  age: '2–4 tahun',   color: '#FF8FB8', n: 6 },
  { id: 'tka',  name: 'TK Kelompok A',    short: 'A',   age: '4–5 tahun',   color: '#FFD95A', n: 8 },
  { id: 'tkb',  name: 'TK Kelompok B',    short: 'B',   age: '5–6 tahun',   color: '#6FE0B8', n: 8 },
  { id: 'sd12', name: 'SD Kelas 1 & 2',   short: '1-2', age: '6–8 tahun',   color: '#7CC8FF', n: 10 },
  { id: 'sd34', name: 'SD Kelas 3 & 4',   short: '3-4', age: '8–10 tahun',  color: '#B79CFF', n: 10 },
  { id: 'sd56', name: 'SD Kelas 5 & 6',   short: '5-6', age: '10–12 tahun', color: '#FFB067', n: 10 }
];

const SUBJECTS = {
  baca:    { id: 'baca',    name: 'Membaca',        guide: 'awan',    color: '#7CC8FF', icon: 'book',    intro: 'Ayo belajar membaca!' },
  tulis:   { id: 'tulis',   name: 'Menulis',        guide: 'awan',    color: '#FF8FB8', icon: 'pencil',  intro: 'Ayo belajar menulis!' },
  logika:  { id: 'logika',  name: 'Logika',         guide: 'bulan',   color: '#B79CFF', icon: 'puzzle',  intro: 'Ayo berpikir bersama!' },
  mat:     { id: 'mat',     name: 'Matematika',     guide: 'bintang', color: '#FFD95A', icon: 'plus',    intro: 'Ayo berhitung!' },
  inggris: { id: 'inggris', name: 'Bahasa Inggris', guide: 'bulan',   color: '#6FE0B8', icon: 'abc',     intro: 'Ayo belajar bahasa Inggris!' },
  cepat:   { id: 'cepat',   name: 'Hitung Cepat',   guide: 'bintang', color: '#FFB067', icon: 'bolt',    intro: 'Ayo hitung secepat kilat!' },
  sempoa:  { id: 'sempoa',  name: 'Sempoa',         guide: 'bintang', color: '#FF8F8F', icon: 'abacus',  intro: 'Ayo main sempoa!' }
};

const AVAIL = {
  kb:   ['baca', 'tulis', 'logika', 'mat', 'inggris'],
  tka:  ['baca', 'tulis', 'logika', 'mat', 'inggris'],
  tkb:  ['baca', 'tulis', 'logika', 'mat', 'inggris', 'cepat', 'sempoa'],
  sd12: ['baca', 'tulis', 'logika', 'mat', 'inggris', 'cepat', 'sempoa'],
  sd34: ['baca', 'tulis', 'logika', 'mat', 'inggris', 'cepat', 'sempoa'],
  sd56: ['baca', 'tulis', 'logika', 'mat', 'inggris', 'cepat', 'sempoa']
};

const OBJ = {
  apple: { id: 'apel', en: 'apple' }, ball: { id: 'bola', en: 'ball' }, banana: { id: 'pisang', en: 'banana' },
  orange: { id: 'jeruk', en: 'orange' }, star: { id: 'bintang', en: 'star' }, sun: { id: 'matahari', en: 'sun' },
  moon: { id: 'bulan', en: 'moon' }, heart: { id: 'hati', en: 'heart' }, flower: { id: 'bunga', en: 'flower' },
  tree: { id: 'pohon', en: 'tree' }, house: { id: 'rumah', en: 'house' }, fish: { id: 'ikan', en: 'fish' },
  balloon: { id: 'balon', en: 'balloon' }, cup: { id: 'gelas', en: 'cup' }, book: { id: 'buku', en: 'book' },
  cat: { id: 'kucing', en: 'cat' }, dog: { id: 'anjing', en: 'dog' }, bird: { id: 'burung', en: 'bird' },
  car: { id: 'mobil', en: 'car' }, bus: { id: 'bus', en: 'bus' }, plane: { id: 'pesawat', en: 'plane' }, boat: { id: 'perahu', en: 'boat' }
};
const OBJ_KEYS = Object.keys(OBJ);
const COUNT_ICONS = ['star', 'apple', 'ball', 'heart', 'fish', 'balloon', 'flower', 'banana', 'orange', 'cat'];
const CATS = {
  buah: ['apple', 'banana', 'orange'],
  hewan: ['fish', 'cat', 'dog', 'bird'],
  langit: ['sun', 'moon', 'star'],
  kendaraan: ['car', 'bus', 'plane', 'boat'],
  benda: ['ball', 'cup', 'book', 'balloon']
};

/* Nama huruf dalam bahasa Indonesia (yang diucapkan) */
const LETTER_SAY = { A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'ef', G: 'ge', H: 'ha', I: 'i', J: 'je', K: 'ka', L: 'el', M: 'em', N: 'en', O: 'o', P: 'pe', Q: 'ki', R: 'er', S: 'es', T: 'te', U: 'u', V: 'fe', W: 'we', X: 'eks', Y: 'ye', Z: 'zet' };
const SYLLABLES = ['ba', 'bi', 'bu', 'be', 'bo', 'ca', 'ci', 'cu', 'da', 'di', 'du', 'ka', 'ki', 'ku', 'la', 'li', 'lu', 'ma', 'mi', 'mu', 'na', 'ni', 'nu', 'pa', 'pi', 'pu', 'ra', 'ri', 'ru', 'sa', 'si', 'su', 'ta', 'ti', 'tu'];

const COLORS_EN = [
  { en: 'red', id: 'merah', hex: '#FF6B6B' }, { en: 'blue', id: 'biru', hex: '#5BB5FF' },
  { en: 'yellow', id: 'kuning', hex: '#FFD95A' }, { en: 'green', id: 'hijau', hex: '#4FD6A0' },
  { en: 'pink', id: 'merah muda', hex: '#FF9EC0' }, { en: 'purple', id: 'ungu', hex: '#B79CFF' },
  { en: 'orange', id: 'jingga', hex: '#FFA533' }
];
const DAYS = [['Monday', 'Senin'], ['Tuesday', 'Selasa'], ['Wednesday', 'Rabu'], ['Thursday', 'Kamis'], ['Friday', 'Jumat'], ['Saturday', 'Sabtu'], ['Sunday', 'Minggu']];
const NAMES = ['Ani', 'Budi', 'Caca', 'Dedi', 'Eka', 'Fani', 'Gita', 'Hadi'];

/* ===== Angka dalam bahasa Indonesia ===== */
const U_ID = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
function idNum(n) {
  if (n < 10) return U_ID[n];
  if (n === 10) return 'sepuluh';
  if (n === 11) return 'sebelas';
  if (n < 20) return U_ID[n - 10] + ' belas';
  if (n < 100) return U_ID[Math.floor(n / 10)] + ' puluh' + (n % 10 ? ' ' + U_ID[n % 10] : '');
  return String(n);
}
/* Pecah bilangan menjadi potongan suara pendek (maks. 9999) */
function N(n) {
  n = Math.round(n);
  if (n < 0 || n > 9999) return [];
  if (n < 100) return [idNum(n)];
  if (n < 1000) {
    const h = Math.floor(n / 100), r = n % 100;
    return [h === 1 ? 'seratus' : U_ID[h] + ' ratus'].concat(r ? N(r) : []);
  }
  const t = Math.floor(n / 1000), r = n % 1000;
  return [t === 1 ? 'seribu' : U_ID[t] + ' ribu'].concat(r ? N(r) : []);
}
const EN_NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

/* Bagian suara: string = bahasa Indonesia, EN() = bahasa Inggris */
const EN = (t) => ({ l: 'en', t });

/* Kalimat tetap untuk umpan balik dan sapaan */
const PHRASES = {
  praise: ['Hebat!', 'Pintar sekali!', 'Benar sekali!', 'Keren!', 'Mantap!', 'Bagus sekali!'],
  retry: ['Hampir benar. Coba lagi ya.', 'Tidak apa-apa. Ayo coba lagi.', 'Sedikit lagi. Coba sekali lagi ya.'],
  reveal: 'Jawabannya adalah',
  gentle: 'Tidak apa-apa. Kita belajar lagi ya.',
  welcome: 'Halo! Ayo kita belajar sambil bermain.',
  chooseLevel: 'Halo! Kamu kelas berapa?',
  chooseSubject: 'Mau belajar apa hari ini?',
  done3: 'Luar biasa! Kamu mendapat tiga bintang.',
  done2: 'Bagus! Kamu mendapat dua bintang.',
  done1: 'Terima kasih sudah belajar. Besok kita main lagi ya.',
  traceTry: 'Ikuti garis putus-putusnya ya.',
  listen: 'Dengarkan baik-baik.',
  ready: 'Siap? Ayo mulai!'
};

/* ===== Bank bacaan SD ===== */
const READ_SD12 = [
  { t: 'Ibu memasak nasi di dapur.', q: 'Siapa yang memasak nasi?', o: ['Ibu', 'Ayah', 'Adik'], a: 'Ibu' },
  { t: 'Adi bermain bola di lapangan.', q: 'Di mana Adi bermain bola?', o: ['lapangan', 'kamar', 'sekolah'], a: 'lapangan' },
  { t: 'Kucing itu tidur di atas kursi.', q: 'Kucing itu tidur di mana?', o: ['kursi', 'meja', 'kasur'], a: 'kursi' },
  { t: 'Sinta membaca buku cerita.', q: 'Apa yang dibaca Sinta?', o: ['buku cerita', 'koran', 'surat'], a: 'buku cerita' },
  { t: 'Ayah pergi ke kantor naik motor.', q: 'Ayah naik apa?', o: ['motor', 'mobil', 'sepeda'], a: 'motor' },
  { t: 'Burung terbang di langit yang biru.', q: 'Apa warna langit?', o: ['biru', 'merah', 'hijau'], a: 'biru' },
  { t: 'Dina menyiram bunga setiap pagi.', q: 'Kapan Dina menyiram bunga?', o: ['pagi', 'malam', 'siang'], a: 'pagi' },
  { t: 'Ikan hidup di dalam air.', q: 'Di mana ikan hidup?', o: ['air', 'pasir', 'pohon'], a: 'air' },
  { t: 'Rani memakai topi merah ke sekolah.', q: 'Apa warna topi Rani?', o: ['merah', 'kuning', 'biru'], a: 'merah' },
  { t: 'Kakak membeli tiga apel di pasar.', q: 'Kakak membeli berapa apel?', o: ['tiga', 'dua', 'lima'], a: 'tiga' }
];
const READ_SD34 = [
  { t: 'Tadi pagi Dewi pergi ke pasar bersama ibunya. Mereka membeli sayur, ikan, dan buah. Dewi membawa keranjang kecil. Setelah itu, mereka pulang naik becak.',
    qs: [{ q: 'Siapa yang pergi bersama Dewi?', o: ['Ibunya', 'Ayahnya', 'Kakaknya'], a: 'Ibunya' }, { q: 'Mereka pulang naik apa?', o: ['becak', 'bus', 'ojek'], a: 'becak' }] },
  { t: 'Kupu-kupu berasal dari ulat. Ulat makan daun sampai kenyang. Lalu ulat berubah menjadi kepompong. Beberapa hari kemudian, kepompong menjadi kupu-kupu yang indah.',
    qs: [{ q: 'Apa yang dimakan ulat?', o: ['daun', 'bunga', 'air'], a: 'daun' }, { q: 'Kepompong berubah menjadi apa?', o: ['kupu-kupu', 'ulat', 'telur'], a: 'kupu-kupu' }] },
  { t: 'Hari Minggu keluarga Rudi berlibur ke pantai. Rudi membangun istana dari pasir. Adiknya berenang di tepi pantai. Sore hari mereka makan jagung bakar.',
    qs: [{ q: 'Ke mana keluarga Rudi berlibur?', o: ['pantai', 'gunung', 'kebun'], a: 'pantai' }, { q: 'Apa yang dibangun Rudi?', o: ['istana pasir', 'rumah kayu', 'jembatan'], a: 'istana pasir' }] },
  { t: 'Hujan turun deras sejak siang. Sungai di dekat desa mulai penuh. Warga bergotong royong membersihkan selokan agar air tidak meluap. Berkat kerja sama itu, desa mereka aman dari banjir.',
    qs: [{ q: 'Apa yang dilakukan warga?', o: ['membersihkan selokan', 'menanam padi', 'menjual ikan'], a: 'membersihkan selokan' }, { q: 'Mengapa desa aman dari banjir?', o: ['Karena warga bekerja sama', 'Karena tidak hujan', 'Karena sungai kering'], a: 'Karena warga bekerja sama' }] },
  { t: 'Matahari terbit dari timur dan terbenam di barat. Pada siang hari, matahari bersinar paling terik. Cahayanya membantu tumbuhan membuat makanan.',
    qs: [{ q: 'Matahari terbit dari arah mana?', o: ['timur', 'barat', 'utara'], a: 'timur' }, { q: 'Cahaya matahari membantu tumbuhan membuat apa?', o: ['makanan', 'air', 'tanah'], a: 'makanan' }] },
  { t: 'Pak Tani bangun sebelum subuh. Ia membawa cangkul ke sawah. Ia menanam padi dengan sabar. Beberapa bulan kemudian, padinya menguning dan siap dipanen.',
    qs: [{ q: 'Apa yang ditanam Pak Tani?', o: ['padi', 'jagung', 'cabai'], a: 'padi' }, { q: 'Kapan padi siap dipanen?', o: ['Setelah menguning', 'Saat masih hijau', 'Saat hujan'], a: 'Setelah menguning' }] }
];
const READ_SD56 = [
  { t: 'Sampah plastik membutuhkan ratusan tahun untuk terurai di tanah. Jika dibuang sembarangan, sampah itu mencemari sungai dan laut. Banyak hewan laut mati karena tidak sengaja menelan plastik. Karena itu, kita perlu mengurangi pemakaian kantong plastik dan membiasakan diri membawa tas belanja sendiri.',
    qs: [{ q: 'Apa ide pokok bacaan ini?', o: ['Pentingnya mengurangi sampah plastik', 'Cara membuat tas belanja', 'Jenis-jenis hewan laut'], a: 'Pentingnya mengurangi sampah plastik' }, { q: 'Mengapa hewan laut bisa mati?', o: ['Menelan plastik tanpa sengaja', 'Kekurangan cahaya matahari', 'Air laut terlalu dingin'], a: 'Menelan plastik tanpa sengaja' }] },
  { t: 'Indonesia memiliki ribuan pulau yang terbentang dari Sabang sampai Merauke. Setiap daerah memiliki bahasa, tarian, dan makanan khas. Perbedaan itu tidak memecah belah bangsa, justru menjadi kekayaan yang patut dijaga. Semboyan Bhinneka Tunggal Ika mengingatkan kita untuk tetap bersatu.',
    qs: [{ q: 'Apa arti perbedaan menurut bacaan?', o: ['Kekayaan yang patut dijaga', 'Penyebab perpecahan', 'Hal yang harus dihilangkan'], a: 'Kekayaan yang patut dijaga' }, { q: 'Wilayah Indonesia terbentang dari mana sampai mana?', o: ['Sabang sampai Merauke', 'Medan sampai Surabaya', 'Jakarta sampai Bali'], a: 'Sabang sampai Merauke' }] },
  { t: 'Lebah madu hidup berkelompok dalam sebuah sarang. Setiap lebah punya tugas masing-masing. Lebah pekerja mencari nektar dari bunga, sedangkan ratu lebah bertugas bertelur. Dengan pembagian tugas yang jelas, koloni lebah dapat bertahan hidup dengan baik.',
    qs: [{ q: 'Apa tugas ratu lebah?', o: ['Bertelur', 'Mencari nektar', 'Menjaga bunga'], a: 'Bertelur' }, { q: 'Mengapa koloni lebah dapat bertahan hidup?', o: ['Karena tugasnya dibagi dengan jelas', 'Karena sarangnya besar', 'Karena tidak ada musuh'], a: 'Karena tugasnya dibagi dengan jelas' }] },
  { t: 'Andi selalu menyisihkan sebagian uang sakunya setiap hari. Teman-temannya sering menertawakannya karena jarang jajan. Setelah enam bulan, tabungan Andi cukup untuk membeli buku yang sangat ia inginkan. Teman-temannya pun menyadari bahwa menabung membuahkan hasil.',
    qs: [{ q: 'Sifat apa yang ditunjukkan Andi?', o: ['Hemat dan sabar', 'Boros', 'Pemarah'], a: 'Hemat dan sabar' }, { q: 'Mengapa Andi bisa membeli buku?', o: ['Karena rajin menabung', 'Karena diberi hadiah', 'Karena menang lomba'], a: 'Karena rajin menabung' }] },
  { t: 'Air hujan yang jatuh ke bumi meresap ke dalam tanah, mengalir ke sungai, lalu menuju laut. Panas matahari membuat air laut menguap menjadi uap air. Uap air naik, mendingin, dan membentuk awan. Dari awan itulah hujan turun kembali. Peristiwa ini disebut siklus air.',
    qs: [{ q: 'Apa yang terjadi setelah air laut menguap?', o: ['Uap air naik dan membentuk awan', 'Air langsung menjadi hujan', 'Air menjadi es'], a: 'Uap air naik dan membentuk awan' }, { q: 'Peristiwa yang berulang ini disebut apa?', o: ['Siklus air', 'Siklus awan', 'Siklus angin'], a: 'Siklus air' }] },
  { t: 'Kemarin sore sekolah mengadakan kerja bakti membersihkan halaman. Para siswa membawa sapu dan kantong sampah dari rumah. Kelas lima bertugas memangkas rumput, sedangkan kelas enam mengecat pagar. Meskipun lelah, semua siswa tampak gembira karena sekolah menjadi bersih dan rapi.',
    qs: [{ q: 'Apa tugas kelas enam?', o: ['Mengecat pagar', 'Memangkas rumput', 'Menyapu kelas'], a: 'Mengecat pagar' }, { q: 'Bagaimana perasaan siswa setelah selesai?', o: ['Gembira', 'Marah', 'Bosan'], a: 'Gembira' }] }
];

/* ===== Bahasa Inggris ===== */
const EN_GREET = [
  { q: 'Hello! How are you?', o: ['I am fine, thank you.', 'Good night.', 'Goodbye.'], a: 'I am fine, thank you.' },
  { q: 'What is your name?', o: ['My name is Bulan.', 'I am five.', 'Thank you.'], a: 'My name is Bulan.' },
  { q: 'Thank you!', o: ["You're welcome.", 'Good morning.', 'Sorry.'], a: "You're welcome." },
  { q: 'Good morning!', o: ['Good morning!', 'Good night!', 'Goodbye!'], a: 'Good morning!' },
  { q: 'Goodbye!', o: ['Goodbye!', 'Hello!', 'Good morning!'], a: 'Goodbye!' },
  { q: 'How old are you?', o: ['I am six.', 'I am fine.', 'I am a cat.'], a: 'I am six.' }
];
const EN_TRANS = [
  ['Saya suka apel.', 'I like apples.'], ['Ini kucing saya.', 'This is my cat.'], ['Nama saya Dina.', 'My name is Dina.'],
  ['Ayah membaca buku.', 'Father reads a book.'], ['Kami pergi ke sekolah.', 'We go to school.'], ['Terima kasih banyak.', 'Thank you very much.'],
  ['Di mana rumahmu?', 'Where is your house?'], ['Hari ini cerah.', 'Today is sunny.'], ['Aku punya tiga bola.', 'I have three balls.'],
  ['Burung bisa terbang.', 'Birds can fly.'], ['Ibu memasak nasi.', 'Mother cooks rice.'], ['Selamat tidur.', 'Good night.']
];
const EN_GRAMMAR = [
  { s: 'She ___ a teacher.', o: ['is', 'are', 'am'], a: 'is' },
  { s: 'I ___ happy today.', o: ['am', 'is', 'are'], a: 'am' },
  { s: 'They ___ my friends.', o: ['are', 'is', 'am'], a: 'are' },
  { s: 'He ___ football every Sunday.', o: ['plays', 'play', 'playing'], a: 'plays' },
  { s: 'We ___ to school by bus.', o: ['go', 'goes', 'going'], a: 'go' },
  { s: 'There are three ___ on the table.', o: ['books', 'book', 'bookes'], a: 'books' },
  { s: 'The book is ___ the table.', o: ['on', 'in', 'at'], a: 'on' },
  { s: 'Yesterday, I ___ a cake.', o: ['made', 'make', 'making'], a: 'made' },
  { s: 'My mother ___ in the kitchen now.', o: ['is cooking', 'cooks', 'cook'], a: 'is cooking' },
  { s: 'These are two ___.', o: ['boxes', 'boxs', 'box'], a: 'boxes' },
  { s: 'Rina ___ not like spicy food.', o: ['does', 'do', 'is'], a: 'does' },
  { s: '___ you like ice cream?', o: ['Do', 'Does', 'Is'], a: 'Do' }
];
const EN_READ = [
  { t: "Tom has a small dog. The dog's name is Max. Max likes to play in the park. Every afternoon, Tom and Max run together.",
    qs: [{ q: "What is the dog's name?", o: ['Max', 'Tom', 'Bob'], a: 'Max' }, { q: 'Where does Max like to play?', o: ['In the park', 'At school', 'In the house'], a: 'In the park' }] },
  { t: 'My school starts at seven o\'clock. I go to school by bike. My best friend is Lina. We read books in the library.',
    qs: [{ q: 'How does the writer go to school?', o: ['By bike', 'By bus', 'On foot'], a: 'By bike' }, { q: 'Where do they read books?', o: ['In the library', 'In the garden', 'In the canteen'], a: 'In the library' }] }
];

/* ===== Menulis ===== */
const SENTENCES_SD56 = [
  'Ibu membeli sayur di pasar', 'Kami belajar bersama di perpustakaan', 'Adik bermain layang-layang di lapangan',
  'Ayah membaca koran setiap pagi', 'Burung berkicau di atas pohon mangga', 'Para siswa membersihkan halaman sekolah',
  'Nenek menanam bunga di kebun belakang', 'Hujan turun dengan deras sore ini'
];
const SPELLING = [
  ['sekolah', 'sekola'], ['kemarin', 'kemaren'], ['apotek', 'apotik'], ['november', 'nopember'], ['analisis', 'analisa'],
  ['ubah', 'rubah'], ['teknik', 'tehnik'], ['nasihat', 'nasehat'], ['risiko', 'resiko'], ['kuantitas', 'kwantitas'],
  ['izin', 'ijin'], ['objek', 'obyek'], ['jadwal', 'jadual'], ['silakan', 'silahkan'], ['hakikat', 'hakekat']
];
const WORDS_TK = ['ibu', 'ayah', 'bola', 'mata', 'roti', 'buku', 'bulan', 'kaki', 'topi', 'sapi'];

/* ===== Panduan Belajar Sempoa Dasar (Mengenal Manik & Angka 1-9) ===== */
const ABACUS_TUTORIAL_STEPS = [
  {
    id: 0,
    tag: 'Rumah Sempoa',
    title: 'Mengenal Sempoa & Angka 0',
    target: 0,
    targetState: { up: 0, low: 0 },
    bubble: 'Halo! Ini sempoa satuan. Manik yang menempel di garis tengah adalah nilainya. Jika semua menjauh, nilainya 0!',
    say: 'Halo! Ini sempoa satuan. Manik yang menempel di garis tengah adalah nilainya. Jika semua menjauh, nilainya nol!',
    finger: 'index',
    dir: 'up',
    fingerLabel: 'Perhatikan garis tengah',
    guideBead: null,
    guideText: 'Sempoa bersih = semua manik menjauhi garis tengah (nilai 0).'
  },
  {
    id: 1,
    tag: 'Angka 1',
    title: 'Membuat Angka 1',
    target: 1,
    targetState: { up: 0, low: 1 },
    bubble: 'Tiap manik bawah bernilai 1. Dorong 1 manik bawah ke atas memakai jempol!',
    say: 'Tiap manik bawah bernilai satu. Dorong satu manik bawah ke atas memakai jempol!',
    finger: 'thumb',
    dir: 'up',
    fingerLabel: 'Jempol naikkan 1 manik',
    guideBead: 'b1',
    guideText: 'Sentuh manik bawah pertama dan dorong ke garis tengah.'
  },
  {
    id: 2,
    tag: 'Angka 2',
    title: 'Membuat Angka 2',
    target: 2,
    targetState: { up: 0, low: 2 },
    bubble: 'Dorong 2 manik bawah ke atas dengan jempol. 1 ditambah 1 jadi 2!',
    say: 'Dorong dua manik bawah ke atas dengan jempol. Satu ditambah satu jadi dua!',
    finger: 'thumb',
    dir: 'up',
    fingerLabel: 'Jempol naikkan 2 manik',
    guideBead: 'b2',
    guideText: 'Naikkan manik ke-2 mendekati garis tengah.'
  },
  {
    id: 3,
    tag: 'Angka 3',
    title: 'Membuat Angka 3',
    target: 3,
    targetState: { up: 0, low: 3 },
    bubble: 'Dorong 3 manik bawah ke atas dengan jempol. Sekarang bernilai 3!',
    say: 'Dorong tiga manik bawah ke atas dengan jempol. Sekarang bernilai tiga!',
    finger: 'thumb',
    dir: 'up',
    fingerLabel: 'Jempol naikkan 3 manik',
    guideBead: 'b3',
    guideText: 'Naikkan manik ke-3 ke garis tengah.'
  },
  {
    id: 4,
    tag: 'Angka 4',
    title: 'Membuat Angka 4',
    target: 4,
    targetState: { up: 0, low: 4 },
    bubble: 'Dorong 4 manik bawah ke atas dengan jempol. Semua manik bawah menempel di garis tengah!',
    say: 'Dorong empat manik bawah ke atas dengan jempol. Semua manik bawah bernilai empat!',
    finger: 'thumb',
    dir: 'up',
    fingerLabel: 'Jempol naikkan 4 manik',
    guideBead: 'b4',
    guideText: 'Naikkan semua 4 manik bawah.'
  },
  {
    id: 5,
    tag: 'Angka 5',
    title: 'Manik Atas Istimewa (5)',
    target: 5,
    targetState: { up: 1, low: 0 },
    bubble: 'Manik atas sangat istimewa, nilainya 5! Turunkan manik atas ke garis tengah memakai jari telunjuk!',
    say: 'Manik atas sangat istimewa, nilainya lima! Turunkan manik atas memakai jari telunjuk!',
    finger: 'index',
    dir: 'down',
    fingerLabel: 'Telunjuk turunkan manik atas',
    guideBead: 'u',
    guideText: 'Turunkan manik atas (5) dan bersihkan manik bawah.'
  },
  {
    id: 6,
    tag: 'Angka 6',
    title: 'Membuat Angka 6 (5 + 1)',
    target: 6,
    targetState: { up: 1, low: 1 },
    bubble: 'Angka 6 adalah 5 ditambah 1! Turunkan manik atas 5 dan naikkan 1 manik bawah bersamaan!',
    say: 'Angka enam adalah lima ditambah satu. Turunkan manik lima dan naikkan satu manik bawah!',
    finger: 'pinch',
    dir: 'pinch',
    fingerLabel: 'Jepit 5 dan 1 ke tengah',
    guideBead: 'b1',
    guideText: 'Gabungkan manik atas (5) dan 1 manik bawah (1).'
  },
  {
    id: 7,
    tag: 'Angka 7',
    title: 'Membuat Angka 7 (5 + 2)',
    target: 7,
    targetState: { up: 1, low: 2 },
    bubble: 'Angka 7 adalah 5 ditambah 2! Manik atas 5 bersama 2 manik bawah di garis tengah.',
    say: 'Angka tujuh adalah lima ditambah dua. Gabungkan manik atas lima dan dua manik bawah!',
    finger: 'pinch',
    dir: 'pinch',
    fingerLabel: 'Jepit 5 dan 2 ke tengah',
    guideBead: 'b2',
    guideText: 'Gabungkan manik atas (5) dan 2 manik bawah (2).'
  },
  {
    id: 8,
    tag: 'Angka 8',
    title: 'Membuat Angka 8 (5 + 3)',
    target: 8,
    targetState: { up: 1, low: 3 },
    bubble: 'Angka 8 adalah 5 ditambah 3! Manik atas 5 bersama 3 manik bawah di garis tengah.',
    say: 'Angka delapan adalah lima ditambah tiga. Manik atas lima bersama tiga manik bawah!',
    finger: 'pinch',
    dir: 'pinch',
    fingerLabel: 'Jepit 5 dan 3 ke tengah',
    guideBead: 'b3',
    guideText: 'Gabungkan manik atas (5) dan 3 manik bawah (3).'
  },
  {
    id: 9,
    tag: 'Angka 9',
    title: 'Membuat Angka 9 (Maksimal)',
    target: 9,
    targetState: { up: 1, low: 4 },
    bubble: 'Angka 9 adalah 5 ditambah 4! Semua manik merapat ke garis tengah. Ini nilai tertinggi tiang satuan!',
    say: 'Angka sembilan adalah lima ditambah empat. Semua manik merapat ke garis tengah!',
    finger: 'pinch',
    dir: 'pinch',
    fingerLabel: 'Semua manik merapat',
    guideBead: 'b4',
    guideText: 'Manik atas 5 dan semua 4 manik bawah merapat.'
  },
  {
    id: 10,
    tag: 'Tantangan',
    title: 'Tantangan Sempoa Ceria',
    target: -1,
    targetState: null,
    bubble: 'Hebat! Sekarang coba buat angka tantangan di sempoa satuanmu!',
    say: 'Hebat! Sekarang coba buat angka tantangan di sempoa satuanmu!',
    finger: 'thumb',
    dir: 'up',
    fingerLabel: 'Bermain bebas',
    guideBead: null,
    guideText: 'Geser manik sesukamu atau selesaikan misi angka.'
  }
];

