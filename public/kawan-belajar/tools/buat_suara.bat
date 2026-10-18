@echo off
chcp 65001 >nul
echo === Pembuat suara Kawan Belajar ===
where python >nul 2>nul
if errorlevel 1 (
  echo Python belum terpasang. Pasang dari https://www.python.org/downloads/ lalu jalankan ulang.
  pause
  exit /b 1
)
python -m pip install --quiet edge-tts
python "%~dp0buat_suara.py"
echo.
echo Selesai. Buka index.html untuk bermain.
pause
