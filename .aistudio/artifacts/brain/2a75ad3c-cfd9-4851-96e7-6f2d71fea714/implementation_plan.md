# Pembaruan Metode Belajar Menulis: Guided Stroke Tracing (Garis Putus-Putus Berurutan)

Mengubah mekanisme belajar menulis (`Menulis`) dari sekadar mewarnai area bentuk huruf menjadi **metode *tracing* terpandu langkah demi langkah**. Anak akan mengikuti instruksi garis putus-putus (*center-line dotted strokes*) yang berada tepat di bagian dalam tubuh huruf, angka, maupun bentuk dasar, lengkap dengan titik awal bernomor, panah arah tarikan, serta kemajuan otomatis begitu jari mencapai ujung tarikan.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Rencana ini disusun berdasarkan preferensi yang telah Anda konfirmasi agar pengalaman belajar menulis menjadi sangat intuitif bagi anak:

- **Panduan Tarikan Langkah demi Langkah Bernomor & Panah Arah**: Setiap huruf (`A–Z`, `a–z`), angka (`0–9`), dan bentuk garis memiliki urutan tarikan (*stroke order*) standar. Di dalam tubuh huruf yang tebal, tampil garis putus-putus di tengah alur disertai lingkaran titik mulai bernomor (`1`, `2`, `3`...) dan panah penunjuk arah gerakan jari.
- **Penyelesaian Tarikan Otomatis (*Auto-Advance Stroke*)**: Anak tidak perlu menekan tombol "Selesai" setiap kali selesai menulis. Saat jari anak menyentuh titik awal dan menelusuri jalur garis putus-putus hingga mencapai titik akhir tarikan, tarikan tersebut langsung terkunci rapi dengan warna cerah dan otomatis berpindah ke tarikan berikutnya (atau langsung merayakan keberhasilan jika seluruh tarikan huruf/angka telah selesai).
- **Fokus Satu Karakter Besar yang Jelas**: Pada seluruh jenjang (KB, TK A, TK B, hingga SD), sesi *tracing* menampilkan satu huruf atau angka berukuran besar dan proporsional di tengah kertas bergaris agar jalur putus-putus dan instruksi panah di dalam huruf terlihat sangat jelas serta ramah bagi jari anak di layar sentuh.

---

## 1. Overview & Core Concept

- **What It Does**: Menghadirkan kanvas latihan menulis interaktif bergaya buku tulis anak dengan siluet huruf/angka berongga lebar (*hollow letter track*). Di bagian tengah tubuh huruf terdapat jalur garis putus-putus dengan indikator titik awal bernomor, titik akhir, dan panah arah. Saat jari anak bergerak mengikuti garis putus-putus, tinta magnetis (*guided path snapping*) mengisi jalur secara mulus mengikuti lekukan huruf.
- **Target Audience / Persona**: Anak usia dini hingga sekolah dasar (KB, TK A, TK B, SD) yang sedang belajar motorik halus dan cara penulisan huruf serta angka dengan urutan tarikan (*stroke order*) yang benar.
- **Key Value**: Mencegah anak sekadar mencoret-coret acak untuk memenuhi piksel huruf. Anak benar-benar belajar **dari mana memulai tarikan** dan **ke arah mana menggerakkan jari** untuk membentuk setiap huruf dan angka.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Tampilan Awal Karakter**: Kanvas menampilkan garis bantu buku tulis (garis atas, garis tengah putus-putus, garis dasar tebal) beserta bentuk tubuh huruf/angka yang tebal berwarna ungu pastel lembut (`#EFE9FF`) dengan tepi luar yang jelas.
  2. **Instruksi Tarikan Aktif**:
     - Di bagian dalam tubuh huruf/angka, seluruh jalur tarikan ditandai dengan garis putus-putus.
     - Tarikan yang sedang aktif (misalnya tarikan ke-1 pada huruf `A`) menampilkan **garis putus-putus kontras**, **panah-panah arah di sepanjang jalur**, **lingkaran hijau berdenyut bertuliskan angka urutan (`1`)** di titik awal, dan **lingkaran target berbintang/titik akhir** di ujung jalur.
     - Indikator langkah di bagian atas/bawah kanvas menampilkan progres tarikan (misalnya: `Tarikan 1 dari 3`) disertai tombol **Ulangi** jika anak ingin mengulang dari awal.
  3. **Interaksi Menelusuri Garis (*Tracing*)**:
     - Anak menyentuh titik awal bernomor (`1`) dan menggeser jarinya mengikuti garis putus-putus dan panah arah.
     - Selama jari berada di dalam koridor toleransi huruf, garis tinta berwarna merah muda cerah (`#FF6FA5`) tertarik rapi mengikuti jalur huruf disertai kursor penuntun yang bergerak di ujung jari.
     - Jika jari anak terlepas di tengah jalan, progres pada tarikan tersebut tetap tersimpan sehingga anak cukup melanjutkan dari posisi terakhir menuju titik ujung.
  4. **Peralihan Otomatis & Perayaan**:
     - Begitu jari mencapai titik akhir tarikan ke-1, terdengar efek suara lembut, tarikan ke-1 berubah menjadi garis utuh permanen yang rapi, dan instruksi **Tarikan ke-2** langsung muncul secara otomatis.
     - Saat tarikan terakhir selesai, seluruh huruf bersinar penuh, maskot memberikan pujian suara, dan aplikasi otomatis lanjut ke soal berikutnya.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Buku latihan menulis anak yang hangat, bersih, dan taktil (*Tactile Early-Childhood Workbook*), selaras dengan palet warna ceria aplikasi **Kawan Belajar**.
  - *Color Palette & Mood*:
    - Kanvas Kertas: Putih bersih (`#FFFFFF`) dengan garis bantu buku tulis biru langit (`#7FA6E8`), merah muda lembut (`#F2799F`), dan garis dasar biru tegas (`#5B86D6`).
    - Koridor Tubuh Huruf: Ungu pastel lembut (`#EFE9FF`) dengan garis tepi ungu muda (`#D5C8FA`) sebagai jalur batas dalam huruf.
    - Garis Putus-Putus & Panah Instruksi: Biru tua tegas (`#24324A`) untuk tarikan aktif, dan abu-abu kebiruan lembut (`#94A3B8`) untuk tarikan berikutnya yang menunggu giliran.
    - Titik Mulai (*Start Badge*): Hijau zamrud cerah (`#4FD6A0`) dengan angka urutan putih dan animasi denyut halus (*pulse*).
    - Titik Akhir (*End Target*): Kuning emas hangat (`#FFD447`) sebagai penanda ujung tarikan.
    - Tinta Tarikan Selesai & Aktif: Merah muda cerah (`#FF6FA5`) untuk tarikan yang sedang digambar dan hijau mint/merah muda solid yang terkunci rapi untuk tarikan yang telah tuntas.
  - *Typography & Hierarchy*: Menggunakan font bulat ramah anak (`Fredoka` & `Nunito`) untuk label instruksi tarikan dan nomor titik mulai.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Vektor Alur Tarikan (*Center-Line Stroke Paths*) untuk Huruf, Angka, dan Bentuk**
  - *Chosen Approach*: Menyediakan definisi koordinat alur tarikan terstruktur (*multi-stroke vector polylines / curves*) untuk seluruh huruf besar (`A–Z`), huruf kecil (`a–z`), angka (`0–9`), serta bentuk geometri dasar.
  - *Why*: Font biasa (`fillText` / `strokeText`) hanya mengenal garis tepi luar huruf (*outline*) dan tidak memiliki informasi urutan tarikan tengah (*center-line stroke order*) maupun arah penulisan. Dengan data alur tarikan di tengah tubuh huruf, garis putus-putus dan panah arah dapat digambar persis di bagian dalam huruf dan divalidasi secara berurutan dari titik awal ke titik akhir.
  - *Alternatives Considered*: Validasi berbasis kemiripan piksel (*pixel coverage*) seperti sebelumnya — ditolak karena tidak mengajarkan arah tarikan dan mengharuskan anak menekan tombol "Selesai" secara manual.

- **Decision 2: *Guided Path Tracking* yang Ramah Jari Anak (*Child-Friendly Tolerance*)**
  - *Chosen Approach*: Menggunakan proyeksi progres sepanjang kurva tarikan (*monotonic arc-length progress tracking*) dengan radius toleransi yang nyaman untuk motorik anak.
  - *Why*: Anak kecil sering sedikit bergoyang saat menggeser jari di layar sentuh. Dengan melacak posisi kemajuan jari di sepanjang garis putus-putus dari titik `0%` hingga `100%` (dan menahan agar tidak melompat langsung ke ujung tanpa melewati bagian tengah), anak merasakan pengalaman menulis yang sangat responsif dan tidak mudah gagal karena keluar sedikit dari garis.

- **Decision 3: Penyederhanaan Materi Menulis Fokus Karakter Tunggal Besar**
  - *Chosen Approach*: Mengarahkan soal-soal *tracing* pada jenjang KB, TK A, TK B, dan SD untuk menampilkan satu huruf (`A–Z`, `a–z`) atau satu angka (`0–9`) berukuran besar per layar *tracing*.
  - *Why*: Sesuai pilihan Anda, menampilkan satu huruf atau angka besar memastikan ruang di dalam tubuh huruf cukup lebar untuk memuat garis putus-putus, nomor urutan tarikan, dan panah arah tanpa terlihat sempit di layar ponsel maupun tablet.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Generator Soal Menulis (Gen)                        │
│  • Menghasilkan soal trace satu huruf besar/kecil (A-Z, a-z),           │
│    angka (0-9), atau bentuk dasar dengan definisi multi-stroke          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ Data Soal & Alur Tarikan (Strokes)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                Komponen Kanvas Tracing Interaktif (UI)                  │
│                                                                         │
│  ┌───────────────────────────────┐   ┌───────────────────────────────┐  │
│  │   Lapisan Visual & Panduan    │   │  Mesin Pelacak Jari (Tracker) │  │
│  │ • Garis bantu buku tulis      │   │ • Deteksi sentuhan di dekat   │  │
│  │ • Tubuh huruf berongga lebar  │◄──┤   titik progres aktif         │  │
│  │ • Garis putus-putus di dalam  │   │ • Hitung kemajuan (0% -> 100%)│  │
│  │ • Panah arah & Nomor urut (1) │   │ • Kunci tarikan & auto-next   │  │
│  └───────────────────────────────┘   └───────────────┬───────────────┘  │
└──────────────────────────────────────────────────────┼──────────────────┘
                                                       │ Semua Tarikan 100%
                                                       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 Penyelesaian Otomatis & Umpan Balik                     │
│  • Efek suara berhasil + Sorotan bentuk huruf utuh + Lanjut soal        │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - **Kamus Alur Tarikan (`CHAR_STROKES`)**: Memetakan setiap karakter (`A`–`Z`, `a`–`z`, `0`–`9`) dan bentuk dasar ke dalam daftar tarikan (`strokes: Array<Array<[x, y]>>`) dalam koordinat ternormalisasi (`0.0` – `1.0`) yang sudah dihaluskan (*interpolated smooth points*).
  - **Status Kanvas Tracing**:
    - `strokeIdx`: Indeks tarikan yang sedang aktif saat ini (`0` sampai `strokes.length - 1`).
    - `progressIdx`: Titik terjauh pada kurva tarikan aktif yang sudah berhasil dilewati jari anak secara berurutan.
    - `userTrail`: Jejak koordinat goresan jari anak pada tarikan aktif untuk dirender secara *real-time*.

- **Interactive Component & State Mapping**:
  - **Saat Jari Menyentuh (`pointerdown` / `pointermove`)**:
    - Sistem memeriksa jarak posisi jari terhadap titik progres saat ini pada tarikan aktif (`strokes[strokeIdx]`).
    - Jika jarak berada dalam radius toleransi koridor huruf, `progressIdx` maju mengikuti gerakan jari ke arah panah dan kanvas menggambar tinta mengikuti alur huruf.
  - **Saat Mencapai Titik Akhir Tarikan (`progressIdx >= akhir kurva`)**:
    - Memutar efek suara positif (`A.sfx('bead')` / `'tap'`), menandai tarikan `strokeIdx` selesai, dan langsung menaikkan `strokeIdx++`.
    - Jika masih ada tarikan berikutnya, kanvas langsung menyorot garis putus-putus dan nomor tarikan selanjutnya tanpa perlu klik tombol.
    - Jika seluruh tarikan pada huruf/angka tersebut selesai, kanvas terkunci (`locked = true`), menampilkan animasi keberhasilan huruf utuh, memicu reaksi suara maskot (`ctx.react('right')`), dan melanjutkan ke soal berikutnya (`ctx.done(true)`).
  - **Tombol Ulangi (`Hapus / Ulangi`)**:
    - Mengatur ulang tarikan pada huruf saat ini ke tarikan pertama (`strokeIdx = 0`, `progressIdx = 0`) jika anak ingin mengulang latihan dari awal.
