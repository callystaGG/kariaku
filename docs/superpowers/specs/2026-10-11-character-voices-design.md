# Suara Karakter Karia Ku: Desain

Tanggal: 2026-10-11
Status: menunggu tinjauan pemilik. Belum ada kode aplikasi yang diubah.
Mockup: https://claude.ai/artifact/HA8r3U6saZxuNqNbs4wpTW

## 1. Tujuan

1. Setiap karakter punya suara yang jelas berbeda dan sesuai kepribadiannya.
2. Suara terdengar seperti manusia dan seperti anak-anak, bukan suara robot browser.
3. Karakter yang dipilih anak menjadi pemandu belajar di seluruh aplikasi, bukan hanya di halaman depan.
4. Fungsi aplikasi yang rusak atau tidak berjalan diperiksa dan diperbaiki (bagian 9).

Kriteria berhasil:
- Anak yang memilih Leo mendengar suara Leo saat sapaan, jawaban benar, jawaban salah, dan petunjuk di kuis, modul, tracing, dan sempoa.
- Dua karakter berbeda tidak pernah memakai file suara yang sama.
- Aplikasi tetap bersuara (suara browser) bila file rekaman tidak ada, gagal dimuat, atau perangkat offline.
- Tidak ada profil anak yang kehilangan avatar setelah migrasi.

## 2. Keputusan pemilik yang sudah dikunci

| Keputusan | Pilihan |
|---|---|
| Sumber suara | Hibrida: rekaman AI untuk kalimat tetap, suara browser sebagai cadangan |
| Model audio | Qwen Audio 3.0 TTS Flash di Higgsfield. Ketujuh sampel sapaan sudah didengar dan disetujui |
| Hubungan karakter dan avatar | Satu daftar karakter. Karakter pilihan anak menjadi pemandu belajar |
| Soal kurasi | Direkam sebelumnya dengan suara karakter |
| Soal acak (dibuat program) | Bertahap: fase 1 tetap suara browser, fase 2 diselidiki TTS di server dengan cache |
| Aturan Firestore | Tidak diubah sebelum pemilik memutuskan model login |

## 3. Kondisi sekarang (hasil membaca kode)

- `src/utils/audio.ts` `speakCharacter` hanya memilih satu suara "pria" dan satu "wanita" dari browser. Perbedaan antarkarakter hanya pitch 1.22 sampai 1.40 dan tempo 0.98 sampai 1.04.
- Tiga daftar karakter yang tidak sinkron: `src/data/avatars.ts` (8 avatar tanpa suara), `DISNEY_CHARACTERS` di `src/components/DisneyMascotScene.tsx` (6 maskot), `CHARACTER_AUDIO_CONFIGS` di `audio.ts` (6 profil suara).
- `speakCharacter` hanya dipanggil dari `DisneyHeroBackground.tsx` dan `DisneyMascotScene.tsx`. Kuis, modul, tracing, sempoa, dan kosakata memakai narator generik lewat `speakSmart`, `speakIndonesian`, dan `speakEnglish`.
- Avatar `singa` dan `rusa` dipakai di `AppContext.tsx`, `adminSeedData.ts`, dan `AdminPortal.tsx`, tetapi tidak ada di daftar avatar. `getAvatarById` diam-diam mengembalikan Kancil.
- Bank soal kurasi berisi 45 butir (`src/data/questionBank.ts`). Selebihnya dibuat acak oleh `src/utils/proceduralGenerators.ts` dengan nama, benda, dan angka yang berganti. Angka "500+" dan "1.000+" di `dynamicCurriculumEngine.ts` adalah teks tetap.

## 4. Desain

### 4.1 Satu daftar karakter

Berkas baru `src/data/characters.ts` menjadi satu-satunya sumber data karakter dan menggantikan `AVATARS`, `DISNEY_CHARACTERS`, dan `CHARACTER_AUDIO_CONFIGS`.

Tiap karakter memuat: `id`, nama, emoji, umur, kepribadian (teks), mata pelajaran utama, warna, jenis efek bunyi, daftar `voices`, dan `fallback` (pitch dan tempo suara browser).

Karakter pilihan anak (6):

| id | Nama | Suara |
|---|---|---|
| `leo` | Leo si Singa Juara | `leo` |
| `ciko` | Ciko si Kelinci Ceria | `ciko` |
| `owi` | Profesor Owi | `owi` |
| `mimi` | Mimi si Panda Pelangi | `mimi` |
| `dino` | Dino si Penjelajah | `dino` |
| `kids` | Budi dan Callysta | `budi` dan `callysta` |

Karakter `kids` memiliki dua suara. Pemutar memilih acak di antara keduanya per ucapan, dan sapaan memuat satu klip untuk masing-masing.

`AvatarItem` di `src/types.ts` disesuaikan agar `getAvatarById` dan seluruh pemakainya (Navbar, ChildDashboard, ParentDashboard, BadgeShowcaseModal, AddChildModal) membaca daftar baru.

### 4.2 Migrasi data anak lama

Pemetaan ID lama ke ID baru, dijalankan saat data dimuat, dan ID lama tidak dihapus dari data tersimpan sampai pemilik setuju:

| ID lama | ID baru |
|---|---|
| `singa`, `harimau` | `leo` |
| `kancil`, `gajah` | `owi` |
| `astronot`, `dino` | `dino` |
| `kucing`, `panda` | `mimi` |
| `burung`, `rusa` | `ciko` |

ID yang tidak dikenal dipetakan ke `leo` dan dicatat di konsol, bukan diam-diam ke avatar lain. Pemetaan ini usulan dan dapat diubah pemilik pada tinjauan spesifikasi.

### 4.3 Pemutar suara

Modul baru `src/audio/voicePlayer.ts`.

Antarmuka:
- `playLine(characterId, situation)`. `situation` salah satu dari `sapa`, `benar`, `salah`, `petunjuk`, `semangat`, `bintang`. Memilih acak dari klip yang tersedia untuk situasi itu, dan tidak mengulang klip yang sama dua kali berturut-turut.
- `playQuestion(characterId, questionId)`. Memutar klip soal kurasi bila ada.
- `stop()`. Menghentikan klip dan suara browser.

Urutan cadangan untuk setiap pemanggilan:
1. File rekaman karakter di `public/audio/`.
2. Suara browser dengan pitch dan tempo `fallback` karakter.
3. Senyap tanpa error.

Aturan lain:
- Menghormati sakelar suara yang sudah ada (`setSpeechEnabled`).
- Satu ucapan aktif pada satu waktu. Ucapan baru menghentikan yang lama.
- Pemutar mengabarkan keadaan bicara lewat mekanisme `onSpeechStateChange` yang sudah dipakai komponen.
- Efek bunyi karakter (auman, boing, dan lainnya) tetap disintesis oleh Web Audio yang ada di `audio.ts`.

### 4.4 Tata letak berkas audio

```
public/audio/<characterId>/<situasi>-<nn>.mp3
public/audio/<characterId>/q/<questionId>.mp3
src/data/voiceManifest.json   (dibuat skrip dari isi public/audio)
```

Manifest memuat daftar klip yang benar-benar ada, jadi pemutar tidak menebak nama file dan tidak membuat permintaan ke file yang tidak ada. Skrip pembuat manifest dijalankan sebelum `build`.

### 4.5 Titik pemasangan

| Tempat | Situasi |
|---|---|
| `QuizPlayer.tsx` | mulai soal (`playQuestion`), `benar`, `salah`, `petunjuk`, `semangat` |
| `ModuleViewer.tsx` | sapa, petunjuk |
| `LetterTracingCanvas.tsx` dan `AbacusSimulator.tsx` | benar, salah, petunjuk |
| `ChildDashboard.tsx` dan `HomePanel.tsx` | sapa |
| `BadgeShowcaseModal.tsx` | bintang |
| `EnglishVocabularyCards.tsx` | tidak berubah: kata Inggris tetap lewat `speakEnglish` |

## 5. Produksi audio

Konektor Higgsfield di sesi ini hanya membaca katalog, saldo, dan riwayat. Audio dibuat oleh pemilik di situs Higgsfield.

1. Saya menulis `docs/voices/lines.csv` berisi kolom: berkas, karakter, situasi, teks. Pemilik membuat audio berurutan sesuai baris CSV.
2. Saya menulis `docs/voices/VOICE-SPEC.md` berisi pengaturan tiap suara (lihat bagian 8). Dokumen ini mencatat suara bawaan, instruction, pitch, dan tempo supaya klip tambahan nanti terdengar sama.
3. Saya mengambil file dari riwayat Higgsfield dan menyimpannya sesuai bagian 4.4. Ini butuh izin jaringan ke `d8j0ntlcm91z4.cloudfront.net`.

Perkiraan fase 1 (belum final):

| Isi | Jumlah klip |
|---|---|
| Kalimat tetap: sapa 3, benar 5, salah 5, petunjuk 4, semangat 3, bintang 2 = 22 per suara, 7 suara | sekitar 154 |
| Soal kurasi: 45 soal, dibacakan karakter pilihan anak, 7 suara | 315 |

Soal kurasi dapat direkam bergelombang, dimulai dari mata pelajaran yang paling sering dipakai. Soal yang belum punya klip memakai cadangan.

## 6. Soal acak: fase 2 (di luar cakupan fase 1)

Soal dari `proceduralGenerators.ts` tetap dibacakan suara browser pada fase 1. Fase 2 menyelidiki layanan TTS di server dengan cache (satu teks dan satu suara dihasilkan sekali). Fase 2 belum didesain karena bergantung pada hasil penyelidikan:
- apakah suara Qwen dapat dipanggil lewat API publik,
- biaya per pemakaian,
- tempat menyimpan API key dengan aman.

## 7. Penanganan kesalahan

- File tidak ada, 404, atau tidak bisa diputar: lanjut ke suara browser, lalu senyap.
- Browser menolak pemutaran otomatis: ucapan hanya dimulai dari interaksi anak (ketuk jawaban, tombol suara).
- Tidak ada suara Indonesia di browser: cadangan memakai suara bawaan perangkat dan tidak mengeluarkan error.

## 8. Input dari pemilik sebelum produksi

Hal berikut hanya diketahui pemilik dan tidak bisa saya ambil lewat konektor:
- Suara bawaan Qwen yang dipakai untuk tiap karakter, serta nilai pitch, tempo, dan kalimat instruction-nya.
- Hasil pembacaan syarat lisensi Higgsfield dan Qwen: apakah audio hasil generasi boleh dipakai komersial di aplikasi paket langganan.

## 9. Audit fungsi aplikasi

Berjalan setelah spesifikasi disetujui, terpisah dari fitur suara:
1. Pasang dependensi, jalankan `tsc --noEmit` dan `vite build`.
2. Periksa alur: login dan pendaftaran, tambah anak, dasbor anak, modul, kuis, tracing huruf, sempoa, kosakata Inggris, langganan dan masa berlaku, dasbor orang tua, portal admin, bank soal.
3. Catat temuan beserta tingkat pasti atau dugaan. Perbaiki dalam komit kecil per temuan.
4. `firestore.rules` saat ini mengizinkan baca dan tulis untuk siapa saja (`allow read, write: if true`). Tidak diubah sebelum pemilik memutuskan model login.

## 10. Di luar cakupan

- Mengganti suara kata-kata Inggris (`speakEnglish`).
- Fase 2 soal acak.
- Mengubah desain visual halaman selain yang diperlukan untuk daftar karakter baru.
