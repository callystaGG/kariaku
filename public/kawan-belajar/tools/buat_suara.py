#!/usr/bin/env python3
"""Membuat semua rekaman suara natural untuk game Kawan Belajar (satu kali jalan).

Memakai suara saraf (neural) Microsoft lewat paket `edge-tts` (gratis, tanpa kunci API).
Butuh internet hanya saat membuat suara. Setelah selesai, game bisa dimainkan tanpa internet.

Cara pakai:   python buat_suara.py
Ganti suara:  ubah VOICE_ID / VOICE_EN di bawah. Daftar suara: python -m edge_tts --list-voices
"""
import asyncio, json, os, sys

try:
    import edge_tts
except ImportError:
    print("Paket edge-tts belum ada. Jalankan:  pip install edge-tts")
    sys.exit(1)

VOICE_ID = "id-ID-GadisNeural"   # suara perempuan Indonesia yang ramah (alternatif: id-ID-ArdiNeural)
VOICE_EN = "en-US-JennyNeural"   # suara Inggris yang natural (alternatif: en-US-AnaNeural, suara anak)
RATE = "-8%"                     # sedikit lebih pelan agar jelas untuk anak
PARALEL = 4

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
MANIFEST = os.path.join(HERE, "manifest.json")


async def buat(sem, item, hitung):
    out = os.path.join(ROOT, item["file"])
    if os.path.exists(out) and os.path.getsize(out) > 500:
        hitung["lewat"] += 1
        return
    suara = VOICE_EN if item["l"] == "en" else VOICE_ID
    async with sem:
        for percobaan in range(4):
            try:
                os.makedirs(os.path.dirname(out), exist_ok=True)
                await edge_tts.Communicate(item["t"], suara, rate=RATE).save(out)
                hitung["selesai"] += 1
                if hitung["selesai"] % 50 == 0:
                    print(f"  {hitung['selesai']} rekaman dibuat...")
                return
            except Exception as e:  # jaringan putus, coba lagi
                await asyncio.sleep(1.5 * (percobaan + 1))
                galat = e
        hitung["gagal"] += 1
        print("  gagal:", item["t"][:50], "->", galat)


async def main():
    with open(MANIFEST, encoding="utf-8") as f:
        daftar = json.load(f)
    print(f"Total {len(daftar)} potongan suara. Yang sudah ada akan dilewati.")
    sem = asyncio.Semaphore(PARALEL)
    hitung = {"selesai": 0, "lewat": 0, "gagal": 0}
    await asyncio.gather(*(buat(sem, it, hitung) for it in daftar))
    print(f"Selesai: {hitung['selesai']} baru, {hitung['lewat']} sudah ada, {hitung['gagal']} gagal.")
    if hitung["gagal"]:
        print("Jalankan skrip ini sekali lagi untuk mengulang yang gagal.")


asyncio.run(main())
