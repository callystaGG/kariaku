#!/usr/bin/env python3
"""Uji garis panduan menulis (3 garis: atas, tengah putus-putus, dasar tebal) pada kertas menjiplak.
Membaca piksel kanvas sungguhan di peramban. Jalankan:  python tools/uji_garis_panduan.py  (butuh: pip install playwright)"""
import http.server, os, socketserver, sys, threading
from playwright.sync_api import sync_playwright

ROOT = os.environ.get('APP_ROOT') or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8124

class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.TCPServer(('127.0.0.1', PORT), Q)
threading.Thread(target=srv.serve_forever, daemon=True).start()

# Memasang soal menjiplak di halaman, lalu membaca piksel kanvas.
ANALISIS = """(q) => {
  const host = document.createElement('div'); host.style.width = '420px'; document.body.appendChild(host);
  Q.types.trace(q, host, { react: async () => {}, done() {} });
  return new Promise((resolve) => setTimeout(() => { try {
    const cv = host.querySelector('canvas'), W = cv.width, H = cv.height;
    const d = cv.getContext('2d').getImageData(0, 0, W, H).data;
    const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const near = (i, c) => Math.abs(d[i] - c[0]) < 16 && Math.abs(d[i + 1] - c[1]) < 16 && Math.abs(d[i + 2] - c[2]) < 16;
    const C = { top: rgb(TRACE_GUIDE.top), mid: rgb(TRACE_GUIDE.mid), base: rgb(TRACE_GUIDE.base) }, FILL = [0xEF, 0xE9, 0xFF];
    const rows = { top: [], mid: [], base: [] }, trans = {};
    let gTop = -1, gBot = -1;
    for (let y = 0; y < H; y++) {
      const cnt = { top: 0, mid: 0, base: 0 }; let fill = 0, t = 0, prev = false;
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        for (const k of ['top', 'mid', 'base']) if (near(i, C[k])) cnt[k]++;
        if (near(i, FILL)) fill++;
        const m = near(i, C.mid); if (m !== prev) t++; prev = m;
      }
      for (const k of ['top', 'mid', 'base']) if (cnt[k] > W * (k === 'mid' ? 0.15 : 0.5)) rows[k].push(y);
      if (cnt.mid > W * 0.15) trans[y] = t;
      if (fill > 0) { if (gTop < 0) gTop = y; gBot = y; }
    }
    resolve({ W, H, rows, trans, gTop, gBot });
  } catch (e) { resolve({ error: String(e.message || e) }); } }, 150));
}"""

def check(page, name, q, expect_guides=True, check_bottom=False):
    r = page.evaluate(ANALISIS, q)
    if 'error' in r: return [r['error']]
    W, H, rows = r['W'], r['H'], r['rows']
    errs = []
    if not expect_guides:
        if any(rows[k] for k in rows): errs.append('bentuk non-huruf tidak boleh punya garis panduan')
        return errs
    for k in ('top', 'mid', 'base'):
        if not rows[k]: errs.append(f'garis {k} tidak ada')
    if errs: return errs
    t, m, b = rows['top'][0], rows['mid'][0], rows['base'][0]
    if not (t < m < b): errs.append(f'urutan garis salah: atas={t} tengah={m} dasar={b}')
    if len(rows['base']) < 3: errs.append('garis dasar harus lebih tebal (>= 3 piksel)')
    if max(r['trans'].get(str(y), 0) for y in rows['mid']) < 8: errs.append('garis tengah harus putus-putus')
    if check_bottom and abs(r['gBot'] - (rows['base'][-1])) > H * 0.05: errs.append(f"dasar huruf {r['gBot']} jauh dari garis dasar {rows['base'][-1]}")
    if check_bottom and not (t - H * 0.06 <= r['gTop'] <= m): errs.append(f"puncak huruf {r['gTop']} di luar garis atas {t} dan tengah {m}")
    return errs

CASES = [
    ('angka 4',          {'type': 'trace', 'key': 'g1', 'prompt': 'x', 'mode': 'text', 'text': '4'}, True, True),
    ('huruf A',          {'type': 'trace', 'key': 'g2', 'prompt': 'x', 'mode': 'text', 'text': 'A'}, True, True),
    ('huruf b',          {'type': 'trace', 'key': 'g3', 'prompt': 'x', 'mode': 'text', 'text': 'b'}, True, False),
    ('huruf p (ekor)',   {'type': 'trace', 'key': 'g4', 'prompt': 'x', 'mode': 'text', 'text': 'p'}, True, False),
    ('kata bola',        {'type': 'trace', 'key': 'g5', 'prompt': 'x', 'mode': 'text', 'text': 'bola'}, True, False),
    ('bentuk (garis)',   {'type': 'trace', 'key': 'g6', 'prompt': 'x', 'mode': 'shape', 'pts': [[[0.2, 0.2], [0.8, 0.8]]]}, False, False),
]

def main():
    gagal = 0
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 900, 'height': 800})
        errs_page = []
        page.on('pageerror', lambda e: errs_page.append(str(e)))
        page.route('**/fonts.g*/**', lambda r: r.abort())
        page.goto(f'http://127.0.0.1:{PORT}/index.html'); page.wait_for_selector('.logo')
        page.evaluate("document.fonts.ready")
        for name, q, guides, bottom in CASES:
            try:
                errs = check(page, name, q, guides, bottom)
            except Exception as e:
                errs = [str(e).split('\n')[0]]
            print(('OK    ' if not errs else 'GAGAL ') + name + ('' if not errs else ' -> ' + '; '.join(errs)))
            gagal += bool(errs)
        b.close()
    if errs_page: print('Galat halaman:', errs_page[:3]); gagal += 1
    sys.exit(1 if gagal else 0)

if __name__ == '__main__':
    main()
