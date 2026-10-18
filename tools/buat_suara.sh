#!/bin/sh
echo "=== Pembuat suara Kawan Belajar ==="
cd "$(dirname "$0")"
python3 -m pip install --quiet edge-tts || { echo "Gagal memasang edge-tts"; exit 1; }
python3 buat_suara.py
echo "Selesai. Buka index.html untuk bermain."
