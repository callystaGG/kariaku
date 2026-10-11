# Suara Karakter Karia Ku Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Satu daftar karakter pemandu belajar dengan pemutar suara berlapis (file rekaman, suara browser, senyap), dipasang di seluruh layar belajar, plus audit fungsi aplikasi.

**Architecture:** `src/data/characters.ts` menjadi sumber data tunggal. `src/audio/` berisi katalog klip (manifest), pemutar yang dependensinya disuntik (mudah diuji), dan singleton yang menyambungkannya ke `SoundEngine` yang sudah ada. Komponen memanggil `voice.playLine` / `voice.playQuestion`; klip belum ada berarti cadangan otomatis.

**Tech Stack:** React 19, TypeScript, Vite 6, Web Audio / Web Speech yang sudah ada, vitest (baru, hanya untuk logika murni).

**Spec:** `docs/superpowers/specs/2026-10-11-character-voices-design.md`

## Global Constraints

- Situasi suara persis enam: `sapa`, `benar`, `salah`, `petunjuk`, `semangat`, `bintang`.
- Tata letak audio: `public/audio/<voiceId>/<situasi>-<nn>.mp3` dan `public/audio/<voiceId>/q/<questionId>.mp3`; manifest di `src/data/voiceManifest.json`.
- Urutan cadangan: file rekaman, lalu suara browser dengan pitch dan tempo karakter, lalu senyap tanpa error.
- Tidak ada pemutaran otomatis saat halaman dimuat; ucapan dimulai dari interaksi anak atau perubahan soal yang sudah ada.
- Sakelar suara (`speechEnabled` / `sound.isSpeechEnabled()`) mematikan klip juga.
- `speakEnglish`, `speakEnglishSlow`, `speakEnglishSpelling`, `speakEnglishSyllables` tidak berubah.
- `firestore.rules` tidak diubah.
- Soal acak (`proceduralGenerators.ts`) tetap lewat `sound.speakSmart`.
- Satu komit kecil per tugas. Pesan komit diakhiri dua baris: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` dan `Claude-Session: https://claude.ai/code/session_017JSWXbmRdetibJmpTF8DbH`.
- Branch kerja: `claude/awesome-fermi-gac7t0`. Jangan push ke branch lain.

## Review Focus

1. Data anak tersimpan dengan `avatarId` tak dikenal (`rusa`, kosong, `undefined`): tidak crash, jadi `leo`, dan ada peringatan di konsol. (Tugas 3)
2. Manifest kosong `{}` (keadaan awal, belum ada audio): semua pemanggilan jatuh ke cadangan tanpa melempar error. (Tugas 5)
3. Browser menolak `play()` (`NotAllowedError`): jatuh ke suara browser, tanpa `unhandledrejection`. (Tugas 5)
4. Dua ucapan hampir bersamaan (anak mengetuk cepat): ucapan lama berhenti, hanya satu yang berbunyi. (Tugas 5)
5. Karakter `kids` (dua suara): selalu memilih `budi` atau `callysta`, tidak pernah `undefined`, dan klip tidak berulang dua kali berturut-turut. (Tugas 2 dan 4)

---

### Task 1: Dependensi, vitest, dan baseline

**Files:**
- Modify: `package.json` (devDependency `vitest`, skrip `test`)
- Modify: `vite.config.ts` (blok `test: { environment: 'node' }`)
- Create: `docs/audit/2026-10-11-baseline.md`

**Interfaces:**
- Produces: perintah `bun run test` (vitest run), `bun run lint` (tsc), `bun run build`.

- [ ] **Step 1: Pasang dependensi** dengan `bun install` (ada `bun.lock`). Jika `bun` tidak ada, `npm install --no-package-lock`.
- [ ] **Step 2: Tambah vitest** (`bun add -d vitest`), skrip `"test": "vitest run"`, dan `test: { environment: 'node' }` di dalam objek yang dikembalikan `vite.config.ts` tanpa menyentuh blok `server`.
- [ ] **Step 3: Rekam baseline.** Jalankan `bun run lint` dan `bun run build`; salin hasil (jumlah dan isi galat tipe, ukuran bundle, peringatan) ke `docs/audit/2026-10-11-baseline.md`. Perbaiki hanya galat yang membuat `build` gagal; sisanya dicatat untuk Tugas 10.
- [ ] **Step 4: Verifikasi** `bun run test` keluar dengan "No test files found" (kode 1 tidak apa-apa pada tahap ini), dan `bun run build` sukses.
- [ ] **Step 5: Komit** `chore: add vitest and record lint/build baseline`.

### Task 2: Daftar karakter tunggal

**Files:**
- Create: `src/data/characters.ts`
- Modify: `src/data/avatars.ts` (menjadi re-export tipis)
- Modify: `src/types.ts` (hanya jika `Character extends AvatarItem` butuh penyesuaian)
- Test: `src/data/characters.test.ts`

**Interfaces:**
- Produces:
  - `type CharacterId = 'leo' | 'ciko' | 'owi' | 'mimi' | 'dino' | 'kids'`
  - `type VoiceId = 'leo' | 'ciko' | 'owi' | 'mimi' | 'dino' | 'budi' | 'callysta'`
  - `type Situation = 'sapa' | 'benar' | 'salah' | 'petunjuk' | 'semangat' | 'bintang'`
  - `interface CharacterVoice { id: VoiceId; label: string; fallback: { pitch: number; rate: number } }`
  - `interface Character extends AvatarItem { id: CharacterId; age: number; role: string; subject: string; personality: string; greeting: string; soundEffect: 'lion' | 'bunny' | 'owl' | 'panda' | 'dino' | 'kids'; voices: CharacterVoice[] }` ditambah semua kolom tampilan yang kini ada di `DISNEY_CHARACTERS` (`badge`, `voiceStyle`, `soundEffectName`, `border`, `bgGrad`, `description`, `favoriteFood`, `color`).
  - `const CHARACTERS: Character[]`, `getCharacterById(id: string): Character` (id tak dikenal mengembalikan `leo`).
  - `src/data/avatars.ts`: `export const AVATARS = CHARACTERS; export const getAvatarById = getCharacterById;`

- [ ] **Step 1: Tulis tes** di `characters.test.ts`:
  - `has exactly six characters with unique ids`
  - `every voice id is unique across all characters` (tujuh suara)
  - `kids has voices budi and callysta; every other character has exactly one voice with its own id`
  - `fallback pitch within 0.5..2 and rate within 0.5..2 for every voice`
  - `getCharacterById('rusa').id === 'leo'`
- [ ] **Step 2: Jalankan, pastikan gagal** (`bun run test src/data/characters.test.ts`, "Cannot find module").
- [ ] **Step 3: Implementasi `characters.ts`.** Salin data tampilan dan teks dari `DISNEY_CHARACTERS` dan `avatars.ts` (nama, emoji, sapaan, kepribadian). Nilai cadangan: leo 1.28/1.02, ciko 1.38/1.04, owi 1.22/0.98, mimi 1.40/1.02, dino 1.26/1.02, budi 1.26/1.04, callysta 1.40/1.04. `bgGradient` dan `accentColor` diambil dari avatar lama yang paling dekat (Leo dari harimau, Owi dari gajah, dan seterusnya).
- [ ] **Step 4: Ubah `avatars.ts`** menjadi re-export dua baris di atas. Jalankan `bun run lint`; perbaiki setiap pemakai `AvatarItem` yang gagal tipe.
- [ ] **Step 5: Jalankan tes sampai lolos**, lalu komit `feat: single character roster`.

### Task 3: Migrasi avatar anak lama

**Files:**
- Create: `src/utils/avatarMigration.ts`
- Modify: `src/context/AppContext.tsx` (dua inisialisasi `useState` untuk `usersList` dan `parentUser`; semua literal `'singa'` dan `'kancil'`)
- Modify: `src/data/adminSeedData.ts`, `src/components/AdminPortal.tsx`, `src/components/AddChildModal.tsx` (literal avatar bawaan)
- Test: `src/utils/avatarMigration.test.ts`

**Interfaces:**
- Consumes: `CharacterId` dari Tugas 2.
- Produces:
  - `migrateAvatarId(id: unknown): CharacterId` — peta spesifikasi bagian 4.2; id baru lolos; sisanya `leo` dengan `console.warn`.
  - `migrateParentAvatars<T extends { children?: Array<{ avatarId: string }> }>(user: T): T` — mengembalikan salinan dengan `avatarId` dimigrasi, tidak mengubah objek asli.

- [ ] **Step 1: Tulis tes:**
  - `maps every legacy id per spec table` (10 pasangan: singa→leo, harimau→leo, kancil→owi, gajah→owi, astronot→dino, dino→dino, kucing→mimi, panda→mimi, burung→ciko, rusa→ciko)
  - `passes through the six new ids unchanged`
  - `unknown, empty, undefined and non-string ids become leo and warn once each`
  - `migrateParentAvatars does not mutate its input and handles a missing children array`
- [ ] **Step 2: Jalankan, pastikan gagal.**
- [ ] **Step 3: Implementasi** kedua fungsi (peta berupa objek konstan).
- [ ] **Step 4: Pasang di `AppContext`:** bungkus hasil `JSON.parse` di kedua `useState` dengan `migrateParentAvatars` (untuk `usersList`, per elemen). Ganti literal bawaan: `'singa'`→`'leo'`, `'kancil'`→`'leo'`, seed `'kucing'`→`'mimi'`, seed `'rusa'`→`'ciko'`; nilai awal `selectedAvatarId` di `AddChildModal` menjadi `'leo'`.
- [ ] **Step 5: Verifikasi:** `bun run test` lolos, `bun run lint` tidak menambah galat dari baseline, `bun run build` sukses. Komit `feat: migrate legacy avatar ids to character roster`.

### Task 4: Katalog klip dan pembuat manifest

**Files:**
- Create: `scripts/build-voice-manifest.mjs`, `src/audio/voiceCatalog.ts`, `src/data/voiceManifest.json` (isi awal `{}`)
- Modify: `package.json` (skrip `voices:manifest`; `build` menjalankan manifest dulu)
- Test: `scripts/build-voice-manifest.test.ts`, `src/audio/voiceCatalog.test.ts`

**Interfaces:**
- Produces:
  - `scripts/build-voice-manifest.mjs`: `buildManifest(relativePaths: string[]): Manifest` (jalur seperti `leo/sapa-01.mp3`, `leo/q/bank-mat-paud-1.mp3`; jalur yang tidak cocok diabaikan) dan eksekusi CLI yang memindai `public/audio` dan menulis `src/data/voiceManifest.json`.
  - `type Manifest = Record<string, Partial<Record<Situation, string[]>> & { questions?: Record<string, string> }>` (URL berawalan `/audio/`).
  - `pickClip(m: Manifest, voice: VoiceId, s: Situation, last: string | null, random: () => number): string | null`
  - `questionClip(m: Manifest, voice: VoiceId, questionId: string): string | null`
  - `pickVoice(c: Character, random: () => number): VoiceId`

- [ ] **Step 1: Tulis tes** manifest: `groups clips by voice and situation sorted by number`, `maps q/ files to questions by id`, `ignores files that do not match the layout (README, .DS_Store, wrong situation)`, `returns {} for empty input`.
- [ ] **Step 2: Tulis tes** katalog: `pickClip returns null for empty manifest and missing situation`, `pickClip never returns last when more than one clip exists (loop 200 times)`, `pickClip returns the single clip even if it equals last`, `questionClip returns null when missing`, `pickVoice for kids returns budi or callysta, for others the only voice`.
- [ ] **Step 3: Jalankan, pastikan gagal.**
- [ ] **Step 4: Implementasi** skrip dan katalog. CLI skrip aman bila `public/audio` belum ada (menulis `{}`).
- [ ] **Step 5: Verifikasi:** tes lolos; `bun run voices:manifest` menulis `{}`; `bun run build` sukses. Komit `feat: voice clip catalog and manifest builder`.

### Task 5: Inti pemutar suara

**Files:**
- Create: `src/audio/fallbackLines.ts`, `src/audio/voicePlayer.ts`
- Test: `src/audio/voicePlayer.test.ts`

**Interfaces:**
- Consumes: `Manifest`, `pickClip`, `questionClip`, `pickVoice` (Tugas 4); `Character`, `Situation`, `VoiceId` (Tugas 2).
- Produces:
  - `FALLBACK_LINES: Record<Situation, string[]>` — kalimat Indonesia generik per situasi (salin kalimat pujian dan semangat dari `QuizPlayer.tsx` untuk `benar`, `salah`, `semangat`).
  - `interface VoicePlayerDeps { manifest: Manifest; playUrl(url: string): Promise<void>; stopUrl(): void; speakFallback(text: string, fb: { pitch: number; rate: number }): void; stopFallback(): void; speechEnabled(): boolean; random(): number }`
  - `createVoicePlayer(deps: VoicePlayerDeps): { playLine(c: Character, s: Situation, fallbackText?: string): Promise<'clip' | 'fallback' | 'silent'>; playQuestion(c: Character, questionId: string): Promise<boolean>; stop(): void }`

- [ ] **Step 1: Tulis tes** (dengan `deps` tiruan): 
  - `plays a clip and reports clip`
  - `empty manifest falls back to speech with the voice fallback pitch/rate and reports fallback`
  - `uses fallbackText when given, otherwise a random FALLBACK_LINES entry`
  - `playUrl rejecting (NotAllowedError) falls back to speech and does not throw`
  - `speechEnabled false returns silent and calls nothing`
  - `starting a new line stops the previous one first (stopUrl and stopFallback called before playUrl)`
  - `does not repeat the same clip twice in a row for the same voice and situation`
  - `playQuestion returns true when a question clip exists, false (and plays nothing) when it does not`
- [ ] **Step 2: Jalankan, pastikan gagal.**
- [ ] **Step 3: Implementasi.** Simpan klip terakhir per `voice:situasi` dalam closure; `playLine` memilih suara dengan `pickVoice`, memanggil `stop()` dulu, lalu mencoba klip, lalu cadangan, lalu senyap.
- [ ] **Step 4: Jalankan tes sampai lolos.** Komit `feat: layered voice player core`.

### Task 6: Penyambung ke SoundEngine dan hook pemandu

**Files:**
- Modify: `src/utils/audio.ts` (tiga metode publik baru pada `SoundEngine`; hapus `CHARACTER_AUDIO_CONFIGS`, `CharacterId`, dan `speakCharacter` pada Tugas 7, bukan di sini)
- Create: `src/audio/voice.ts`, `src/audio/useGuide.ts`

**Interfaces:**
- Produces di `SoundEngine`:
  - `speakWithProfile(text: string, profile: { pitch: number; rate: number }): void` — sama dengan `speakIndonesian` tetapi memakai pitch dan tempo dari argumen.
  - `reportExternalSpeech(speaking: boolean, text?: string): void` — memanggil `notifySpeechState` agar ikon bicara menyala saat klip diputar.
  - `playCharacterJingle(effect: Character['soundEffect']): void` — memilih salah satu `play*Jingle` yang sudah ada.
- Produces: `export const voice: ReturnType<typeof createVoicePlayer>` di `src/audio/voice.ts` (manifest dari `voiceManifest.json`, `playUrl` memakai satu elemen `Audio`, `speechEnabled` dari `sound.isSpeechEnabled()`, `random` = `Math.random`; `playUrl` memanggil `reportExternalSpeech` saat mulai dan selesai).
- Produces: `useGuide(): Character` di `src/audio/useGuide.ts` = `getCharacterById(useApp().activeChild.avatarId)`.

- [ ] **Step 1: Tambah tiga metode** ke `SoundEngine`; `speakWithProfile` memakai `formatKidPersonaText`, suara Indonesia yang sudah dipilih `initVoices`, dan notifikasi bicara yang sama dengan `speakIndonesian`.
- [ ] **Step 2: Tulis `voice.ts` dan `useGuide.ts`.**
- [ ] **Step 3: Verifikasi** `bun run lint` (tidak ada galat baru) dan `bun run test`. Komit `feat: wire voice player to sound engine`.

### Task 7: Halaman depan dan galeri maskot memakai pemutar

**Files:**
- Modify: `src/components/DisneyMascotScene.tsx` (hapus `DISNEY_CHARACTERS`, baca dari `CHARACTERS`; `handleSpeak` memanggil `sound.playCharacterJingle` lalu `voice.playLine(character, 'sapa', character.greeting)`)
- Modify: `src/components/DisneyHeroBackground.tsx` (`triggerMascot` memakai `voice.playLine(getCharacterById(charKey), 'sapa', phrase)`)
- Modify: `src/utils/audio.ts` (hapus `speakCharacter`, `CHARACTER_AUDIO_CONFIGS`, `CharacterId`, `CharacterAudioConfig`)

**Interfaces:**
- Consumes: `voice`, `CHARACTERS`, `getCharacterById`, `sound.playCharacterJingle`.

- [ ] **Step 1: Ganti pemakai** `DISNEY_CHARACTERS` dan `char.charKey` dengan `CHARACTERS` dan `char.id`; kartu karakter `kids` memakai nama gabungan yang sudah ada.
- [ ] **Step 2: Hapus kode lama** di `audio.ts` setelah `grep -rn "speakCharacter\|CHARACTER_AUDIO_CONFIGS\|DISNEY_CHARACTERS" src` kosong.
- [ ] **Step 3: Verifikasi** `bun run lint` dan `bun run build` sukses. Komit `refactor: showcase and hero use the voice player`.

### Task 8: Pemandu di layar belajar

**Files:**
- Modify: `src/components/QuizPlayer.tsx`, `src/components/ModuleViewer.tsx`, `src/components/LetterTracingCanvas.tsx`, `src/components/AbacusSimulator.tsx`, `src/components/ChildDashboard.tsx`, `src/components/BadgeShowcaseModal.tsx`

**Interfaces:**
- Consumes: `useGuide()`, `voice.playLine`, `voice.playQuestion`, `sound.speakSmart` (cadangan soal).

- [ ] **Step 1: QuizPlayer.** Pada efek pembacaan soal dan `handleSpeakQuestion`: `const played = await voice.playQuestion(guide, question.id); if (!played) sound.speakSmart(...)` (teks dan argumen mata pelajaran tetap yang sekarang). Jawaban benar memanggil `voice.playLine(guide, 'benar')`; salah memanggil `'salah'`; layar selesai memanggil `'semangat'`. Hapus daftar pujian tetap di komponen (dipindah ke `FALLBACK_LINES`, Tugas 5). Pastikan `stopSpeaking` yang ada juga memanggil `voice.stop()`.
- [ ] **Step 2: ModuleViewer.** Saat modul dibuka memanggil `voice.playLine(guide, 'sapa')` dari efek yang sudah dipicu interaksi pembukaan modul; tombol petunjuk (bila ada) memanggil `'petunjuk'`. Bacaan langkah tetap lewat `speakSmart`.
- [ ] **Step 3: LetterTracingCanvas dan AbacusSimulator.** Pujian setelah menulis atau menghitung benar memanggil `'benar'`; bacaan huruf dan panduan menulis (`speechGuide`, `phonicsSound`) tetap lewat `speakIndonesian`.
- [ ] **Step 4: ChildDashboard.** Emoji avatar menjadi tombol dengan label aksesibel "Dengar sapaan" yang memanggil `voice.playLine(guide, 'sapa')`. Tidak ada pemutaran otomatis.
- [ ] **Step 5: BadgeShowcaseModal.** Memanggil `'bintang'` saat modal dibuka oleh klik anak.
- [ ] **Step 6: Verifikasi** `bun run lint` tanpa galat baru dan `bun run build` sukses. Jalankan `bun run dev`, buka aplikasi dengan Chromium bawaan, dan konfirmasi di konsol bahwa mengetuk jawaban di kuis tidak menghasilkan galat serta suara browser terdengar sebagai cadangan (manifest masih kosong). Komit `feat: character guide in learning screens`.

### Task 9: Naskah audio

**Files:**
- Create: `docs/voices/lines.csv`, `docs/voices/questions.csv`, `docs/voices/VOICE-SPEC.md`, `scripts/export-question-lines.ts`
- Test: `scripts/voice-scripts.test.ts`

**Interfaces:**
- Consumes: `CHARACTERS`, `CURATED_QUESTION_BANK`.
- Produces: `lines.csv` kolom `file,voice,situation,text` (154 baris: tujuh suara, tiap suara sapa 3, benar 5, salah 5, petunjuk 4, semangat 3, bintang 2; `file` berbentuk `<voice>/<situasi>-<nn>.mp3`); `questions.csv` kolom `file,voice,questionId,text` (45 soal kurasi × 7 suara = 315 baris, teks dari `speechPrompt`, `file` berbentuk `<voice>/q/<questionId>.mp3`).

- [ ] **Step 1: Tulis tes:** `lines.csv has the header and 154 rows`, `every voice has the exact situation counts`, `file names are unique and match the layout regex`, `text is non-empty and at most 120 characters`, `questions.csv has 315 rows and one row per (voice, curated question id)`.
- [ ] **Step 2: Jalankan, pastikan gagal.**
- [ ] **Step 3: Tulis `lines.csv`** dengan kalimat sesuai kepribadian (Leo berani dan lantang, Ciko lincah dan berulang kata, Owi tenang dan menyelidik, Mimi lembut dan menenangkan, Dino kapten misi, Budi kalem, Callysta cerah). Salin sapaan dari mockup untuk klip `sapa-01` tiap suara. Jangan memuat kalimat yang menyalahkan anak.
- [ ] **Step 4: Tulis `export-question-lines.ts`** (dijalankan dengan `bunx tsx`) yang menghasilkan `questions.csv`. Teks yang berisi koma dikutip.
- [ ] **Step 5: Tulis `VOICE-SPEC.md`:** satu bagian per suara dengan kolom yang **diisi pemilik** (model, suara bawaan, instruction, pitch, tempo, seed) dan aturan produksi: dibuat berurutan sesuai CSV, format mp3, satu klip per baris.
- [ ] **Step 6: Jalankan tes sampai lolos.** Komit `docs: voice scripts and production spec`.

### Task 10: Audit fungsi dan perbaikan

**Files:**
- Create: `docs/audit/2026-10-11-findings.md`, `e2e/smoke.mjs`
- Modify: file mana pun yang temuannya terbukti rusak (satu komit per temuan)

**Interfaces:**
- Consumes: `bun run dev`, Chromium di `/opt/pw-browsers` (jangan jalankan `playwright install`), baseline Tugas 1.

- [ ] **Step 1: Tulis `e2e/smoke.mjs`** (Playwright) yang membuka `http://localhost:3000`, merekam galat konsol dan galat halaman, lalu melewati: panel depan, masuk sebagai tamu atau akun contoh, dasbor anak, membuka satu modul, menjawab satu kuis sampai selesai, membuka tracing huruf, membuka sempoa, dasbor orang tua (lewat gerbang orang tua), dan modal langganan. Keluaran: daftar langkah lulus atau gagal beserta galat konsol.
- [ ] **Step 2: Jalankan** dan catat setiap kegagalan di `findings.md` dengan kolom: alur, gejala, bukti (galat atau tangkapan layar), tingkat (pasti atau dugaan), tindakan.
- [ ] **Step 3: Perbaiki temuan yang pasti** satu per satu. Untuk setiap perbaikan: reproduksi kegagalan, perbaiki, jalankan ulang bagian smoke terkait sampai lulus, lalu komit `fix: <alur> <gejala>`.
- [ ] **Step 4: Temuan yang butuh keputusan pemilik** (aturan Firestore terbuka, model login, kebijakan langganan) dicatat di `findings.md` tanpa diubah.
- [ ] **Step 5: Jalankan** `bun run test`, `bun run lint`, `bun run build`, dan smoke penuh; ringkas hasilnya di bagian atas `findings.md`. Komit `docs: audit findings`.

---

## Setelah rencana ini (bukan tugas kode)

1. Pemilik mengisi `VOICE-SPEC.md` dan membuat audio di Higgsfield sesuai `lines.csv`.
2. Dengan izin jaringan ke `d8j0ntlcm91z4.cloudfront.net`, ambil file dari riwayat Higgsfield sesuai urutan CSV, simpan di `public/audio/`, jalankan `bun run voices:manifest`, lalu komit.
3. Gelombang berikutnya: `questions.csv`. Fase 2 (soal acak lewat TTS server) didesain terpisah.
