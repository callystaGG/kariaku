# Membuat suara tiap karakter dengan VoiceStudio

Awan, Bintang, dan Bulan masing-masing punya suara sendiri. Rekaman dibuat sekali di komputer Anda, disimpan di
`audio/awan/`, `audio/bintang/`, dan `audio/bulan/`, lalu game dimainkan tanpa internet.

Siapa yang bersuara: **Awan** membawakan beranda, pilih jenjang, Membaca, dan Menulis. **Bulan** membawakan pilih
pelajaran, Logika, dan Bahasa Inggris. **Bintang** membawakan Matematika, Hitung Cepat, dan Sempoa.
Jumlah rekaman sekitar 1.200 (Awan 303, Bintang 216, Bulan 685).

## 1. Pasang VoiceStudio

1. Buka halaman rilis https://github.com/debpalash/VoiceStudio/releases dan unduh berkas bernama `VoiceStudio-Electron-*`
   untuk sistem Anda (Windows `.exe`, macOS `.dmg`, Linux `.AppImage` atau `.deb`). Jangan pasang versi Tauri, sudah diarsipkan.
2. Jalankan aplikasinya. Pastikan `http://localhost:3900/health` menjawab di peramban.
3. Saat aplikasi menawarkan mengunduh model suara, **baca ukuran dan lisensi model itu dulu**. Aplikasi VoiceStudio
   berlisensi AGPL-3.0, sedangkan bobot model punya syarat sendiri. Kalau suara akan dibagikan atau dijual, pastikan
   syarat pemakaian komersialnya.
4. Tanpa GPU, VoiceStudio tetap bisa dipakai di CPU tetapi lebih lambat (butuh sekitar 5 GB ruang untuk PyTorch CPU).

## 2. Rancang tiga suara

Di ruang kerja voice design VoiceStudio, tulis deskripsi suara lalu simpan dengan nama yang mudah, misalnya
`awan`, `bintang`, dan `bulan`. Deskripsi di bawah hanya usulan awal. Anda yang menentukan karakter suaranya, silakan ubah.

| Karakter | Usulan deskripsi |
|---|---|
| Awan (kucing awan) | anak perempuan sekitar 7 tahun, lembut, tenang, dan ramah, bicara pelan dan jelas, bahasa Indonesia |
| Bintang (kelinci bintang) | anak laki-laki sekitar 8 tahun, riang dan bersemangat, bicara cepat tetapi jelas, bahasa Indonesia |
| Bulan (beruang bulan) | anak sekitar 9 tahun, hangat dan teliti, sedikit lebih dalam, bicara runtut, bahasa Indonesia dan Inggris |

Cobalah dengan beberapa kalimat dari game ("Ayo berhitung!", "Hebat, kamu benar!") dan dengarkan: apakah logat
Indonesianya wajar, apakah terdengar seperti anak, dan apakah ketiganya mudah dibedakan. Dokumentasi VoiceStudio tidak
menyebut bahasa apa saja yang didukung tiap modelnya, jadi dukungan bahasa Indonesia **harus Anda dengar sendiri**.
Jangan meniru suara orang (terlebih anak) tanpa izin orang itu atau walinya.

## 3. Hubungkan ke game

1. Pasang Python 3 (https://www.python.org/downloads/). Skrip ini tidak butuh paket tambahan untuk VoiceStudio.
2. Dari folder game, periksa koneksi dan lihat nama suara yang tersedia:

       python tools/buat_suara.py --cek

3. Buka `tools/suara.json` dan isi nama suara tiap karakter di bagian `voicestudio.voices`, sesuai daftar dari langkah 2:

       "voices": { "awan": "awan", "bintang": "bintang", "bulan": "bulan" }

   Jika VoiceStudio meminta pengaturan tambahan pada permintaannya (misalnya bahasa), tuliskan di `extra`, contoh
   `"extra": { "language": "id" }`. Nama bidangnya mengikuti dokumentasi API di `http://localhost:3900/openapi.json`.

## 4. Buat rekaman

Coba sedikit dulu, lalu dengarkan hasilnya di folder `audio`:

    python tools/buat_suara.py --batas 10

Kalau sudah cocok, buat semuanya. Klip yang sudah ada dilewati, jadi aman dihentikan dan dilanjutkan:

    python tools/buat_suara.py

Di Windows bisa juga klik dua kali `tools\buat_suara.bat`, di Mac/Linux `sh tools/buat_suara.sh`.
Opsi yang sama (`--cek`, `--batas`, `--mesin edge`) bisa ditambahkan di belakangnya.

Jika VoiceStudio hanya mengirim WAV, skrip mengubahnya ke mp3 dengan `ffmpeg` (https://ffmpeg.org). Pasang `ffmpeg`
bila ada pesan yang memintanya.

## 5. Main

    python -m http.server 8000

lalu buka `http://localhost:8000`. Di layar depan, pesan "Suara natural belum terpasang" hilang setelah rekaman ada.

## Cadangan: Edge TTS

Tanpa VoiceStudio, `python tools/buat_suara.py --mesin edge` memakai suara saraf Microsoft (`pip install edge-tts`,
butuh internet). Tiga karakter dibedakan lewat suara dan nada di `tools/suara.json`, bagian `edge`.

## Mengubah isi soal

Setelah mengubah teks yang diucapkan di `js/content.js` atau `js/gen.js`, buat ulang daftar rekaman, lalu jalankan
skrip pembuat suara lagi (hanya klip yang baru yang dibuat):

    node tools/check.js --manifest
    python tools/buat_suara.py

## Pengujian

    node --test tools/test/suara.test.js        jalur klip dan manifes per karakter
    python tools/test/test_buat_suara.py         skrip pembuat suara (server VoiceStudio tiruan)
    python tools/uji_browser.py                  memainkan semua jenjang x pelajaran (butuh: pip install playwright)
    python tools/uji_suara_lengkap.py            sama, dengan klip hening untuk tiap rekaman: memastikan setiap
                                                 karakter memakai foldernya sendiri dan tidak ada klip yang hilang

## Batasan yang perlu diketahui

- Rekaman dibuat dari contoh soal acak, jadi kalimat yang sangat jarang muncul bisa saja belum punya rekaman.
  Game tetap berjalan; bagian itu senyap. Jalankan ulang `node tools/check.js --manifest` lalu skrip pembuat suara
  untuk melengkapi.
- Soal Logika berbentuk perbandingan nama sengaja dibacakan per pernyataan ("Budi lebih tinggi dari Ani.") agar
  jumlah rekaman terbatas, sehingga ada jeda singkat antarpernyataan.
