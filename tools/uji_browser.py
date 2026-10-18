#!/usr/bin/env python3
"""Uji otomatis di browser: memainkan setiap jenjang x pelajaran sampai layar hasil.
Menjalankan server lokal, menjawab benar lewat antarmuka sungguhan (klik, ketik, gambar)."""
import http.server, socketserver, threading, os, sys, json, time
from playwright.sync_api import sync_playwright

ROOT = os.environ.get('APP_ROOT') or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UJI_AUDIO = os.environ.get('UJI_AUDIO') == '1'  # 1 = folder audio sudah terisi: periksa suara tiap karakter dan klip yang hilang
PORT = 8123
SHOTS = os.path.join(os.environ.get('SHOTS', '/tmp/kawan-shots'))
os.makedirs(SHOTS, exist_ok=True)

class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.TCPServer(('127.0.0.1', PORT), Q)
threading.Thread(target=srv.serve_forever, daemon=True).start()

SPEED = """
const st = window.setTimeout.bind(window);
window.setTimeout = (f, ms, ...a) => st(f, ms > 60 ? ms / 10 : ms, ...a);
"""

SEGS_JS = """() => {
  const cv = document.querySelector('.trace-wrap canvas'); const g = cv.getContext('2d');
  const W = cv.width, H = cv.height, d = g.getImageData(0, 0, W, H).data, r = cv.getBoundingClientRect();
  const sx = r.width / W, sy = r.height / H, step = Math.max(6, Math.round(W * 0.03)), out = [];
  for (let y = step; y < H; y += step) {
    let start = -1;
    for (let x = 0; x <= W; x++) {
      const i = (y * W + x) * 4, on = x < W && Math.abs(d[i] - 239) < 6 && Math.abs(d[i + 1] - 233) < 6 && Math.abs(d[i + 2] - 255) < 6;
      if (on && start < 0) start = x;
      if (!on && start >= 0) { out.push([r.left + start * sx, r.top + y * sy, r.left + (x - 1) * sx]); start = -1; }
    }
  }
  return out;
}"""

def act(page, q):
    t = q['type']
    if t == 'choice':
        idx = [i for i, o in enumerate(q['opts']) if str(o['v']) == str(q['answer'])][0]
        page.click(f'.opt[data-i="{idx}"]')
    elif t == 'keypad':
        press_keypad(page, q['answer'])
    elif t == 'tiles':
        for tok in q['answer']:
            page.evaluate("""(tok) => { const b=[...document.querySelectorAll('.tile-bank .tile')].find(x=>!x.disabled && x.textContent===tok); b.click(); }""", tok)
        page.click('[data-t="check"]')
    elif t == 'trace':
        segs = page.evaluate(SEGS_JS)
        for (x0, y, x1) in segs:
            page.mouse.move(x0, y); page.mouse.down(); page.mouse.move(x1, y, steps=4); page.mouse.up()
        page.click('[data-t="check"]')
    elif t == 'abacus':
        rods = q['rods']; digits = [int(c) for c in str(q['target']).zfill(rods)]
        for r, d in enumerate(digits):
            if d >= 5: page.evaluate(f"document.querySelector('.bead[data-r=\"{r}\"][data-b=\"u\"]').dispatchEvent(new MouseEvent('click',{{bubbles:true}}))")
            low = d % 5
            if low: page.evaluate(f"document.querySelector('.bead[data-r=\"{r}\"][data-b=\"{low}\"]').dispatchEvent(new MouseEvent('click',{{bubbles:true}}))")
        page.click('[data-t="check"]')
    elif t in ('flash', 'memory'):
        page.wait_for_selector('.kp-area:not([hidden]) .kp', timeout=15000)
        press_keypad(page, q['answer'])
    else:
        raise RuntimeError('tipe tak dikenal ' + t)

def press_keypad(page, ans):
    s = str(ans).replace('.', ',')
    for ch in s:
        page.click(f'.kp[data-k="{ch}"]')
    page.click('.kp[data-k="ok"]')

def play(page, level, subj, wrong_first=False, shot=None):
    page.evaluate(f"() => {{ S.level='{level}'; startSession('{subj}'); }}")
    n = page.evaluate("SES.n"); handled = 0; t0 = time.time(); did_wrong = False
    while True:
        if time.time() - t0 > 240: raise RuntimeError('waktu habis')
        st = page.evaluate("() => SES ? (SES.cur ? {q: JSON.parse(JSON.stringify(SES.cur)), asked: SES.asked} : {wait: 1}) : {done: 1}")
        if st.get('done'): break
        if st.get('wait'): page.wait_for_timeout(40); continue
        q = st['q']
        page.evaluate("() => { window.__act = SES.cur; }")
        page.wait_for_timeout(120)
        if shot and handled == 1:
            page.screenshot(path=os.path.join(SHOTS, shot))
        if wrong_first and not did_wrong and q['type'] == 'choice':
            did_wrong = True
            bad = [i for i, o in enumerate(q['opts']) if str(o['v']) != str(q['answer'])]
            page.click(f'.opt[data-i="{bad[0]}"]')
            page.wait_for_timeout(150)
            if len(bad) > 1 and len(q['opts']) > 2:
                page.click(f'.opt[data-i="{bad[1]}"]')
            else:
                pass
            page.wait_for_function("() => !SES || SES.cur !== window.__act", timeout=15000)
            handled += 1; continue
        act(page, q)
        page.wait_for_function("() => !SES || SES.cur !== window.__act", timeout=15000)
        handled += 1
    page.wait_for_selector('.res-stars')
    stars = page.evaluate("document.querySelectorAll('.res-stars .star.pop').length")
    return handled, stars

def main():
    only = sys.argv[1:]  # contoh: tka.mat sd34
    with sync_playwright() as p:
        b = p.chromium.launch()
        errs = []
        ctx = b.new_context(viewport={'width': 1024, 'height': 768}, has_touch=False)
        ctx.add_init_script(SPEED)
        page = ctx.new_page()
        page.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)))
        page.on('console', lambda m: errs.append('console.error: ' + m.text) if m.type == 'error' and 'Failed to load resource' not in m.text and 'fonts.g' not in m.text else None)
        page.route('**/fonts.g*/**', lambda r: r.abort())
        klip = []  # alamat klip suara yang diminta peramban
        page.on('request', lambda r: klip.append(r.url) if '/audio/' in r.url else None)
        tak_ada = []  # klip yang diminta tetapi tidak ada di server (404)
        page.on('response', lambda r: tak_ada.append(r.url) if '/audio/' in r.url and r.status >= 400 else None)
        def cek_suara(subj):
            if not UJI_AUDIO: return
            guide = page.evaluate(f"SUBJECTS['{subj}'].guide")
            salah = [u for u in klip if f'/audio/{guide}/' not in u]
            if not klip: raise RuntimeError('tidak ada klip suara yang diminta')
            if salah: raise RuntimeError(f'klip bukan suara {guide}: {salah[0]}')
        page.goto(f'http://127.0.0.1:{PORT}/index.html')
        page.wait_for_selector('.logo')
        page.screenshot(path=os.path.join(SHOTS, 'home.png'))
        levels = json.loads(page.evaluate("JSON.stringify(LEVELS.map(l=>[l.id, AVAIL[l.id]]))"))
        fails = []
        for lid, subs in levels:
            for s in subs:
                key = f'{lid}.{s}'
                if only and key not in only and lid not in only: continue
                try:
                    klip.clear()
                    h, stars = play(page, lid, s, shot=f'{key}.png')
                    cek_suara(s)
                    print(f'OK   {key:14s} {h} soal, {stars} bintang')
                except Exception as e:
                    fails.append(key); print(f'GAGAL {key}: {str(e)[:200]}')
                    page.screenshot(path=os.path.join(SHOTS, f'FAIL-{key}.png'))
        if not only:
            klip.clear()
            h, stars = play(page, 'tkb', 'mat', wrong_first=True)
            cek_suara('mat')
            print(f'OK   jalur salah-dulu tkb.mat {h} soal, {stars} bintang')
        if UJI_AUDIO:
            st = page.evaluate("A.played")
            print(f"Klip diputar sampai habis: {st}, klip tidak ada di server (404): {len(set(tak_ada))}")
            for u in sorted(set(tak_ada))[:8]: print('   hilang:', u.split('/audio/')[1])
            if tak_ada or not st: fails.append('klip-hilang')
        # tampilan tiap layar
        for name, js in [('levels', "screenLevels()"), ('subjects', "S.level='sd34'; screenSubjects()"), ('badges', "screenBadges()")]:
            page.evaluate(js); page.wait_for_timeout(100); page.screenshot(path=os.path.join(SHOTS, f'{name}.png'))
        # HP potret
        ctx2 = b.new_context(viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True)
        ctx2.add_init_script(SPEED)
        m = ctx2.new_page(); m.route('**/fonts.g*/**', lambda r: r.abort())
        m.on('pageerror', lambda e: errs.append('mobile pageerror: ' + str(e)))
        m.goto(f'http://127.0.0.1:{PORT}/index.html'); m.wait_for_selector('.logo'); m.screenshot(path=os.path.join(SHOTS, 'm-home.png'))
        m.evaluate("S.level='tka'; startSession('mat')"); m.wait_for_selector('.opt', timeout=8000); m.wait_for_timeout(300); m.screenshot(path=os.path.join(SHOTS, 'm-session.png'))
        m.evaluate("S.level='tkb'; startSession('tulis')"); m.wait_for_selector('.trace-wrap canvas', timeout=8000); m.wait_for_timeout(300); m.screenshot(path=os.path.join(SHOTS, 'm-trace.png'))
        m.evaluate("S.level='sd34'; startSession('sempoa')"); m.wait_for_timeout(1500); m.screenshot(path=os.path.join(SHOTS, 'm-sempoa.png'))
        b.close()
        print('\nGalat konsol/halaman:', len(errs)); [print('  ', e[:200]) for e in errs[:15]]
        print('Gagal:', fails or 'tidak ada')
        sys.exit(1 if (fails or errs) else 0)

main()
