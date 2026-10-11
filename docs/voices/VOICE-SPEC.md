# Spesifikasi suara karakter

Dokumen ini mencatat pengaturan Higgsfield tiap suara supaya klip yang dibuat belakangan terdengar sama dengan sampel sapaan yang sudah disetujui. Kolom bertanda **(pemilik)** hanya diketahui pemilik dan diisi dari riwayat generasi di Higgsfield.

## Aturan produksi

- Model: **Qwen Audio 3.0 TTS Flash** (`qwen_audio_tts`), bahasa `id`, format `mp3`, sample rate 24000.
- Satu klip per baris di `lines.csv` dan `questions.csv`. Teks persis seperti di CSV.
- Buat **berurutan sesuai urutan baris CSV**, satu suara demi satu suara. Riwayat Higgsfield hanya mencatat waktu pembuatan, jadi urutan itulah yang dipakai untuk mencocokkan file dengan nama berkasnya.
- Pakai suara bawaan, `pitch_rate`, `speech_rate`, dan `instruction` yang sama untuk semua klip satu suara. Ubah `seed` hanya bila hasil terdengar janggal, lalu catat di kolom seed.
- Simpan hasil sebagai `public/audio/<file>` sesuai kolom `file`, lalu jalankan `bun run voices:manifest`.
- Soal acak tidak direkam (lihat spesifikasi desain bagian 6).
- Sebelum dipakai di aplikasi yang dibagikan, baca syarat lisensi komersial Higgsfield dan Qwen untuk audio hasil generasi.

## Pengaturan per suara

Kolom `instruction` berisi usulan awal untuk dicocokkan dengan yang benar-benar Anda pakai.

| Suara | Karakter | instruction (usulan awal) | Suara bawaan (pemilik) | pitch_rate (pemilik) | speech_rate (pemilik) | seed (pemilik) |
|---|---|---|---|---|---|---|
| `leo` | Leo si Singa Juara | Brave, cheerful 8-year-old boy, bold and confident, energetic, sounds like a child, not an adult | | | | |
| `ciko` | Ciko si Kelinci Ceria | Hyper, giggly 7-year-old child, very high energy, playful, fast | | | | |
| `owi` | Profesor Owi | Curious, thoughtful 9-year-old boy, calm and slow, careful like a young scientist | | | | |
| `mimi` | Mimi si Panda Pelangi | Gentle, sweet 7-year-old girl, soft and warm, slow and soothing | | | | |
| `dino` | Dino si Penjelajah | Adventurous 8-year-old boy, excited like a space captain, punchy | | | | |
| `budi` | Budi (Budi & Callysta) | Friendly, diligent 8-year-old boy, clear and upbeat | | | | |
| `callysta` | Callysta (Budi & Callysta) | Bright, cheerful 8-year-old girl, lively and warm | | | | |

## Menambah klip baru

1. Tambahkan baris di `lines.csv` dengan nomor berikutnya (misalnya `leo/benar-06.mp3`) dan sesuaikan jumlah di `scripts/voice-scripts.test.ts`.
2. Buat klip dengan pengaturan suara di tabel di atas.
3. Simpan di `public/audio/`, jalankan `bun run voices:manifest`, lalu komit audio dan manifest bersama-sama.
