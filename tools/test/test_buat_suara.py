#!/usr/bin/env python3
"""Uji skrip pembuat suara terhadap server VoiceStudio tiruan (tanpa model sungguhan).
Jalankan:  python3 tools/test/test_buat_suara.py"""
import http.server, io, json, os, shutil, struct, subprocess, sys, tempfile, threading, unittest, wave

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(os.path.dirname(HERE), "buat_suara.py")

MP3 = b"ID3\x03\x00\x00\x00\x00\x00\x00" + b"\xff\xfb\x90\x00" + b"\x00" * 900


EDGE = {"rate": "-8%", "paralel": 2,
        "id": {"awan": {"voice": "id-A", "pitch": "+0Hz"}, "bintang": {"voice": "id-A", "pitch": "+30Hz"}, "bulan": {"voice": "id-B", "pitch": "+0Hz"}},
        "en": {"awan": "en-A", "bintang": "en-C", "bulan": "en-B"}}


def tulis(path, obj):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f)


def silent_wav():
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(16000)
        w.writeframes(struct.pack("<h", 0) * 3200)
    return buf.getvalue()


class Mock(http.server.BaseHTTPRequestHandler):
    requests = []
    answer = "mp3"            # "mp3" atau "wav"
    voices_shape = "dict"

    def log_message(self, *a): pass

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)

    def do_GET(self):
        if self.path == "/health": return self._json({"status": "ok"})
        if self.path == "/v1/audio/voices":
            if Mock.voices_shape == "dict":
                return self._json({"voices": [{"id": "suara-awan", "name": "Awan kecil"}, {"id": "suara-bintang"}, {"id": "suara-bulan"}]})
            return self._json(["suara-awan", "suara-bintang", "suara-bulan"])
        self._json({"error": "tidak ada"}, 404)

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0)); body = json.loads(self.rfile.read(n) or b"{}")
        Mock.requests.append((self.path, body))
        if self.path != "/v1/audio/speech": return self._json({"error": "tidak ada"}, 404)
        data = silent_wav() if Mock.answer == "wav" else MP3
        ctype = "audio/wav" if Mock.answer == "wav" else "audio/mpeg"
        self.send_response(200); self.send_header("Content-Type", ctype); self.send_header("Content-Length", str(len(data)))
        self.end_headers(); self.wfile.write(data)


class T(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Mock)
        cls.url = "http://127.0.0.1:%d" % cls.srv.server_address[1]
        threading.Thread(target=cls.srv.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.srv.shutdown(); cls.srv.server_close()

    def setUp(self):
        Mock.requests.clear(); Mock.answer = "mp3"; Mock.voices_shape = "dict"
        self.tmp = tempfile.mkdtemp(prefix="suara-")
        self.manifest = os.path.join(self.tmp, "manifest.json")
        items = [
            {"file": "audio/awan/id_aaaa0001.mp3", "v": "awan", "l": "id", "t": "Halo teman"},
            {"file": "audio/awan/id_aaaa0002.mp3", "v": "awan", "l": "id", "t": "Hebat, benar sekali!"},
            {"file": "audio/bintang/id_bbbb0001.mp3", "v": "bintang", "l": "id", "t": "Ayo berhitung"},
            {"file": "audio/bulan/id_cccc0001.mp3", "v": "bulan", "l": "id", "t": "Mana yang sama?"},
            {"file": "audio/bulan/en_cccc0002.mp3", "v": "bulan", "l": "en", "t": "twenty"},
        ]
        tulis(self.manifest, items)
        self.suara = os.path.join(self.tmp, "suara.json")
        self.write_suara({"awan": "suara-awan", "bintang": "suara-bintang", "bulan": "suara-bulan"})
        self.out = os.path.join(self.tmp, "app"); os.makedirs(self.out)

    def tearDown(self): shutil.rmtree(self.tmp, ignore_errors=True)

    def write_suara(self, voices, extra=None):
        tulis(self.suara, {"voicestudio": {"model": "tts-1", "format": "mp3", "voices": voices, "extra": extra or {}},
                           "edge": EDGE})

    def run_script(self, *args):
        cmd = [sys.executable, SCRIPT, "--server", self.url, "--manifest", self.manifest, "--suara", self.suara, "--keluar", self.out, *args]
        return subprocess.run(cmd, capture_output=True, text=True, timeout=60)

    def test_cek_menampilkan_kesehatan_dan_daftar_suara(self):
        r = self.run_script("--cek")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        for s in ("suara-awan", "suara-bintang", "suara-bulan"): self.assertIn(s, r.stdout)

    def test_cek_menerima_daftar_suara_berupa_list(self):
        Mock.voices_shape = "list"
        r = self.run_script("--cek")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn("suara-bulan", r.stdout)

    def test_membuat_klip_dengan_suara_karakter_masing_masing(self):
        r = self.run_script()
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        with open(self.manifest, encoding="utf-8") as f:
            daftar = json.load(f)
        for it in daftar:
            path = os.path.join(self.out, it["file"])
            self.assertTrue(os.path.getsize(path) > 500, it["file"])
        pakai = {b["input"]: b["voice"] for p, b in Mock.requests}
        self.assertEqual(pakai["Halo teman"], "suara-awan")
        self.assertEqual(pakai["Ayo berhitung"], "suara-bintang")
        self.assertEqual(pakai["Mana yang sama?"], "suara-bulan")
        self.assertEqual(pakai["twenty"], "suara-bulan")
        self.assertTrue(all(b["response_format"] == "mp3" and b["model"] == "tts-1" for p, b in Mock.requests))

    def test_yang_sudah_ada_dilewati(self):
        self.run_script(); Mock.requests.clear()
        r = self.run_script()
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertEqual(Mock.requests, [])

    def test_batas_hanya_membuat_sebagian(self):
        r = self.run_script("--batas", "2")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertEqual(len(Mock.requests), 2)

    def test_bidang_tambahan_ikut_dikirim(self):
        self.write_suara({"awan": "suara-awan", "bintang": "suara-bintang", "bulan": "suara-bulan"}, {"language": "id"})
        self.run_script("--batas", "1")
        self.assertEqual(Mock.requests[0][1].get("language"), "id")

    def test_menolak_jika_suara_belum_dipetakan(self):
        self.write_suara({"awan": "suara-awan", "bintang": "", "bulan": "suara-bulan"})
        r = self.run_script()
        self.assertEqual(r.returncode, 2, r.stdout + r.stderr)
        self.assertIn("bintang", r.stdout + r.stderr)
        self.assertEqual(Mock.requests, [])

    def test_server_mati_memberi_pesan_jelas(self):
        cmd = [sys.executable, SCRIPT, "--server", "http://127.0.0.1:9", "--manifest", self.manifest, "--suara", self.suara, "--keluar", self.out, "--cek"]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        self.assertEqual(r.returncode, 1)
        self.assertIn("VoiceStudio", r.stdout + r.stderr)

    @unittest.skipUnless(shutil.which("ffmpeg"), "ffmpeg tidak ada")
    def test_jawaban_wav_diubah_ke_mp3_dengan_ffmpeg(self):
        Mock.answer = "wav"
        r = self.run_script("--batas", "1")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        with open(self.manifest, encoding="utf-8") as f:
            first = json.load(f)[0]["file"]
        with open(os.path.join(self.out, first), "rb") as f:
            head = f.read(4)
        self.assertNotEqual(head, b"RIFF")
        self.assertTrue(head[:3] == b"ID3" or head[0] == 0xFF, head)

    def test_mesin_edge_memakai_suara_dan_nada_per_karakter(self):
        stub = os.path.join(self.tmp, "stub"); os.makedirs(stub)
        catat = os.path.join(self.tmp, "edge.log")
        with open(os.path.join(stub, "edge_tts.py"), "w", encoding="utf-8") as f:
            f.write("import json, os\nclass Communicate:\n"
                    "    def __init__(self, text, voice, rate=None, pitch=None):\n"
                    "        self.a = (text, voice, rate, pitch)\n"
                    "    async def save(self, path):\n"
                    "        open(path, 'wb').write(b'ID3' + b'\\x00' * 900)\n"
                    "        open(os.environ['EDGE_LOG'], 'a').write(json.dumps(self.a) + '\\n')\n")
        env = dict(os.environ, PYTHONPATH=stub, EDGE_LOG=catat)
        cmd = [sys.executable, SCRIPT, "--mesin", "edge", "--manifest", self.manifest, "--suara", self.suara, "--keluar", self.out]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60, env=env)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        with open(catat, encoding="utf-8") as f:
            dipakai = {json.loads(l)[0]: json.loads(l)[1:] for l in f}
        self.assertEqual(dipakai["Halo teman"], ["id-A", "-8%", "+0Hz"])
        self.assertEqual(dipakai["Ayo berhitung"], ["id-A", "-8%", "+30Hz"])
        self.assertEqual(dipakai["Mana yang sama?"], ["id-B", "-8%", "+0Hz"])
        self.assertEqual(dipakai["twenty"], ["en-B", "-8%", "+0Hz"])
        for it in daftar_klip(self.manifest):
            self.assertTrue(os.path.getsize(os.path.join(self.out, it["file"])) > 500)


def daftar_klip(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


if __name__ == "__main__":
    unittest.main(verbosity=2)
