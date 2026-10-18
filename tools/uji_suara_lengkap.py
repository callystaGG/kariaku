#!/usr/bin/env python3
"""Uji menyeluruh suara per karakter, tanpa perlu membuat rekaman sungguhan.

Membuat salinan game di folder sementara, mengisi audio/<karakter>/ dengan klip hening untuk SETIAP
entri di tools/manifest.json, lalu menjalankan tools/uji_browser.py (UJI_AUDIO=1): semua jenjang x pelajaran
dimainkan, tiap klip yang diminta harus berasal dari folder pemandu pelajaran itu, dan tidak boleh ada klip hilang.

Butuh: python -m pip install playwright, ffmpeg, dan node (untuk membuat manifes terbaru).
Jalankan:  python tools/uji_suara_lengkap.py"""
import json, os, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)


def main():
    if not shutil.which("ffmpeg"):
        print("ffmpeg tidak ditemukan; dibutuhkan untuk membuat klip hening."); sys.exit(2)
    tmp = tempfile.mkdtemp(prefix="kawan-uji-")
    try:
        app = os.path.join(tmp, "app")
        os.makedirs(app)
        shutil.copy(os.path.join(ROOT, "index.html"), app)
        for nama in ("css", "js", "fonts"):
            shutil.copytree(os.path.join(ROOT, nama), os.path.join(app, nama))
        shutil.copytree(HERE, os.path.join(app, "tools"), ignore=shutil.ignore_patterns("test", "__pycache__"))
        # manifes terbaru dari isi game (bukan berkas lama)
        manifest = os.path.join(tmp, "manifest.json")
        r = subprocess.run(["node", os.path.join(ROOT, "tools", "check.js"), "--manifest", f"--manifest-out={manifest}"], capture_output=True, text=True, env=dict(os.environ))
        if r.returncode != 0:
            print(r.stdout + r.stderr); sys.exit(1)
        with open(manifest, encoding="utf-8") as f:
            daftar = json.load(f)
        hening = os.path.join(tmp, "hening.mp3")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono", "-t", "0.1", "-codec:a", "libmp3lame", "-q:a", "9", hening], check=True)
        for it in daftar:
            tujuan = os.path.join(app, it["file"])
            os.makedirs(os.path.dirname(tujuan), exist_ok=True)
            shutil.copy(hening, tujuan)
        print(f"{len(daftar)} klip hening dibuat di salinan sementara.")
        env = dict(os.environ, APP_ROOT=app, UJI_AUDIO="1", SHOTS=os.path.join(tmp, "foto"))
        sys.exit(subprocess.run([sys.executable, os.path.join(HERE, "uji_browser.py"), *sys.argv[1:]], env=env).returncode)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
