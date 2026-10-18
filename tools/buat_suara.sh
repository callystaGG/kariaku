#!/bin/sh
# Pembuat suara Kawan Belajar. Opsi diteruskan ke buat_suara.py (contoh: sh buat_suara.sh --cek)
cd "$(dirname "$0")" || exit 1
python3 buat_suara.py "$@"
