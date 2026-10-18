#!/usr/bin/env python3
"""Membuat rekaman suara untuk game Kawan Belajar, satu suara untuk tiap karakter.

Awan, Bintang, dan Bulan masing-masing punya suara sendiri. Klip disimpan di
audio/<karakter>/ sesuai daftar di tools/manifest.json (dibuat oleh `node tools/check.js --manifest`).

Mesin:
  voicestudio (bawaan)  VoiceStudio yang berjalan di komputer ini (http://localhost:3900).
                        Petakan nama suara tiap karakter di tools/suara.json. Lihat tools/SUARA.md.
  edge                  Suara saraf Microsoft lewat paket `edge-tts` (pip install edge-tts). Butuh internet.

Contoh:
  python buat_suara.py --cek                 periksa VoiceStudio dan tampilkan daftar suaranya
  python buat_suara.py --batas 10            coba buat 10 klip dulu
  python buat_suara.py                       buat semuanya (yang sudah ada dilewati)
  python buat_suara.py --mesin edge          pakai Edge TTS
"""
import argparse, asyncio, json, os, shutil, subprocess, sys, tempfile, urllib.error, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
MIN_BYTES = 500


def baca_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def sudah_ada(path):
    return os.path.exists(path) and os.path.getsize(path) > MIN_BYTES


def antrean(manifest, keluar, batas):
    """Klip yang belum ada, urut per karakter agar hasilnya mudah dipantau."""
    todo = [it for it in manifest if not sudah_ada(os.path.join(keluar, it["file"]))]
    todo.sort(key=lambda it: (it["v"], it["file"]))
    return todo[:batas] if batas else todo


# ---------------------------------------------------------------- VoiceStudio

def minta_json(url, data=None, timeout=60):
    req = urllib.request.Request(url, data=None if data is None else json.dumps(data).encode("utf-8"),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8"))


def nama_suara(data):
    """Daftar suara bisa berupa list, atau objek berisi voices/data/items; tiap isi string atau objek."""
    items = data if isinstance(data, list) else (data.get("voices") or data.get("data") or data.get("items") or [])
    nama = []
    for it in items:
        if isinstance(it, str):
            nama.append(it)
        elif isinstance(it, dict):
            n = it.get("id") or it.get("voice_id") or it.get("name")
            if n:
                nama.append(str(n))
    return nama


def tak_terjangkau(server, e):
    print(f"Tidak bisa menghubungi VoiceStudio di {server} ({e}).")
    print("Pastikan aplikasi VoiceStudio sedang berjalan, lalu coba lagi. Lihat tools/SUARA.md.")
    sys.exit(1)


def cek(server, cfg):
    try:
        sehat = minta_json(server + "/health", timeout=10)
        print(f"VoiceStudio aktif di {server}: {json.dumps(sehat, ensure_ascii=False)}")
        daftar = nama_suara(minta_json(server + "/v1/audio/voices", timeout=30))
    except (urllib.error.URLError, OSError) as e:
        tak_terjangkau(server, getattr(e, "reason", e))
    print("Suara yang tersedia:" if daftar else "VoiceStudio belum punya suara.")
    for n in daftar:
        print("  -", n)
    print("\nPemetaan di tools/suara.json:")
    for v, n in cfg["voices"].items():
        tanda = "ok" if n and (not daftar or n in daftar) else ("TIDAK ADA di VoiceStudio" if n else "belum diisi")
        print(f"  {v:8s} -> {n or '-'}  [{tanda}]")


def ke_mp3(data, keluar_path):
    """Jawaban WAV diubah ke mp3 dengan ffmpeg, karena game memutar berkas .mp3."""
    if not shutil.which("ffmpeg"):
        raise RuntimeError("VoiceStudio mengirim WAV dan ffmpeg tidak ditemukan. Pasang ffmpeg, atau pilih format mp3 di tools/suara.json.")
    with tempfile.TemporaryDirectory() as d:
        src = os.path.join(d, "in.wav")
        with open(src, "wb") as f:
            f.write(data)
        r = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-codec:a", "libmp3lame", "-q:a", "4", keluar_path],
                           capture_output=True, text=True)
        if r.returncode != 0:
            raise RuntimeError("ffmpeg gagal: " + r.stderr.strip()[:200])


def buat_voicestudio(server, cfg, todo, keluar):
    selesai = gagal = 0
    for i, it in enumerate(todo, 1):
        body = {"model": cfg.get("model", "tts-1"), "voice": cfg["voices"][it["v"]], "input": it["t"],
                "response_format": cfg.get("format", "mp3")}
        body.update(cfg.get("extra") or {})
        out = os.path.join(keluar, it["file"])
        os.makedirs(os.path.dirname(out), exist_ok=True)
        galat = None
        for percobaan in range(3):
            try:
                req = urllib.request.Request(server + "/v1/audio/speech", data=json.dumps(body).encode("utf-8"),
                                             headers={"Content-Type": "application/json"})
                with urllib.request.urlopen(req, timeout=300) as r:
                    data = r.read()
                if data[:1] == b"{":
                    raise RuntimeError("server menjawab galat: " + data[:200].decode("utf-8", "replace"))
                if data[:4] == b"RIFF":
                    ke_mp3(data, out)
                else:
                    with open(out, "wb") as f:
                        f.write(data)
                if not sudah_ada(out):
                    raise RuntimeError("hasil terlalu kecil, kemungkinan kosong")
                selesai += 1
                galat = None
                break
            except urllib.error.URLError as e:
                tak_terjangkau(server, getattr(e, "reason", e))
            except Exception as e:  # coba lagi
                galat = e
        if galat is not None:
            gagal += 1
            print(f"  gagal [{it['v']}]: {it['t'][:50]} -> {galat}")
        if i % 25 == 0:
            print(f"  {i}/{len(todo)} diproses...")
    return selesai, gagal


# ------------------------------------------------------------------ Edge TTS

def buat_edge(cfg, todo, keluar):
    try:
        import edge_tts
    except ImportError:
        print("Paket edge-tts belum ada. Jalankan:  pip install edge-tts")
        sys.exit(1)

    async def satu(sem, it, hitung):
        pilihan = cfg[it["l"]][it["v"]]
        suara, nada = (pilihan, "+0Hz") if isinstance(pilihan, str) else (pilihan["voice"], pilihan.get("pitch", "+0Hz"))
        out = os.path.join(keluar, it["file"])
        async with sem:
            galat = None
            for percobaan in range(4):
                try:
                    os.makedirs(os.path.dirname(out), exist_ok=True)
                    await edge_tts.Communicate(it["t"], suara, rate=cfg.get("rate", "-8%"), pitch=nada).save(out)
                    hitung["selesai"] += 1
                    return
                except Exception as e:  # jaringan putus, coba lagi
                    galat = e
                    await asyncio.sleep(1.5 * (percobaan + 1))
            hitung["gagal"] += 1
            print(f"  gagal [{it['v']}]: {it['t'][:50]} -> {galat}")

    async def semua():
        sem = asyncio.Semaphore(cfg.get("paralel", 4))
        hitung = {"selesai": 0, "gagal": 0}
        await asyncio.gather(*(satu(sem, it, hitung) for it in todo))
        return hitung["selesai"], hitung["gagal"]

    return asyncio.run(semua())


# ----------------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description="Pembuat suara Kawan Belajar (satu suara per karakter)")
    ap.add_argument("--mesin", choices=["voicestudio", "edge"], default="voicestudio")
    ap.add_argument("--server", default="http://localhost:3900", help="alamat VoiceStudio")
    ap.add_argument("--cek", action="store_true", help="periksa VoiceStudio dan pemetaan suara, lalu berhenti")
    ap.add_argument("--batas", type=int, default=0, help="hanya buat N klip pertama yang belum ada")
    ap.add_argument("--manifest", default=os.path.join(HERE, "manifest.json"))
    ap.add_argument("--suara", default=os.path.join(HERE, "suara.json"))
    ap.add_argument("--keluar", default=ROOT, help="folder tujuan (berisi folder audio)")
    a = ap.parse_args()

    pengaturan = baca_json(a.suara)
    cfg = pengaturan[a.mesin]
    server = a.server.rstrip("/")

    if a.cek:
        if a.mesin != "voicestudio":
            print("--cek hanya untuk VoiceStudio.")
            sys.exit(1)
        cek(server, cfg)
        return

    manifest = baca_json(a.manifest)
    dipakai = sorted({it["v"] for it in manifest})
    if a.mesin == "voicestudio":
        kosong = [v for v in dipakai if not (cfg.get("voices") or {}).get(v)]
        if kosong:
            print("Suara untuk karakter berikut belum dipetakan di tools/suara.json: " + ", ".join(kosong))
            print("Jalankan  python buat_suara.py --cek  untuk melihat daftar suara, lalu isi namanya.")
            sys.exit(2)

    todo = antrean(manifest, a.keluar, a.batas)
    print(f"Total {len(manifest)} klip, {len(todo)} yang akan dibuat sekarang (yang sudah ada dilewati).")
    if not todo:
        print("Tidak ada yang perlu dibuat.")
        return
    if a.mesin == "voicestudio":
        try:
            minta_json(server + "/health", timeout=10)
        except (urllib.error.URLError, OSError) as e:
            tak_terjangkau(server, getattr(e, "reason", e))
        selesai, gagal = buat_voicestudio(server, cfg, todo, a.keluar)
    else:
        selesai, gagal = buat_edge(cfg, todo, a.keluar)
    print(f"Selesai: {selesai} baru, {gagal} gagal.")
    if gagal:
        print("Jalankan skrip ini sekali lagi untuk mengulang yang gagal.")
        sys.exit(1)


if __name__ == "__main__":
    main()
