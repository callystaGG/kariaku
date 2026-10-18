/* Aset gambar: ikon benda, bentuk, dan tiga karakter orisinal (Awan, Bintang, Bulan). */
const INK = '#4A3B6B';
const STAR_PTS = '0,-30 7.05,-9.71 28.53,-9.27 11.41,3.71 17.63,24.27 0,12 -17.63,24.27 -11.41,3.71 -28.53,-9.27 -7.05,-9.71';
const GATTR = 'stroke="#4A3B6B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';

const ICONS = {
  apple: '<path d="M32 20c-6-5-20-2-20 14 0 12 8 22 14 22 3 0 4-1 6-1s3 1 6 1c6 0 14-10 14-22 0-16-14-19-20-14z" fill="#FF6B6B"/><path d="M32 20c0-6 2-10 6-12" fill="none"/><path d="M36 12c4-4 10-3 11-1-3 4-8 4-11 1z" fill="#6FE0B8"/>',
  ball: '<circle cx="32" cy="32" r="22" fill="#FFD95A"/><path d="M12 24c10 4 30 4 40 0M12 40c10-4 30-4 40 0M32 10v44" fill="none"/>',
  banana: '<path d="M10 22C12 44 28 56 52 48C46 58 30 62 20 54C10 46 6 34 10 22Z" fill="#FFE066"/><path d="M10 22c2-5 6-6 9-4" fill="none"/>',
  orange: '<circle cx="32" cy="36" r="20" fill="#FFA533"/><path d="M32 16c0-5 3-8 7-9" fill="none"/><path d="M34 14c5-5 11-3 12-1-4 4-9 4-12 1z" fill="#6FE0B8"/>',
  star: `<polygon transform="translate(32,34) scale(1.05)" points="${STAR_PTS}" fill="#FFD95A"/>`,
  sun: '<circle cx="32" cy="32" r="13" fill="#FFB84D"/><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7" fill="none"/>',
  moon: '<path d="M42 8A24 24 0 1 0 56 44 18 18 0 0 1 42 8z" fill="#FFE066"/>',
  heart: '<path d="M32 56C10 40 6 28 6 20 6 12 12 8 18 8c6 0 10 4 14 8 4-4 8-8 14-8 6 0 12 4 12 12 0 8-4 20-26 36z" fill="#FF8FB8"/>',
  flower: '<path d="M32 40v20" fill="none"/><circle cx="32" cy="16" r="10" fill="#FF8FB8"/><circle cx="48" cy="28" r="10" fill="#FF8FB8"/><circle cx="42" cy="46" r="10" fill="#FF8FB8" transform="translate(-4 -6)"/><circle cx="22" cy="46" r="10" fill="#FF8FB8" transform="translate(4 -6)"/><circle cx="16" cy="28" r="10" fill="#FF8FB8"/><circle cx="32" cy="32" r="8" fill="#FFD95A"/>',
  tree: '<rect x="28" y="38" width="8" height="20" rx="2" fill="#B07A4A"/><circle cx="32" cy="24" r="16" fill="#6FD08C"/><circle cx="20" cy="34" r="12" fill="#6FD08C"/><circle cx="44" cy="34" r="12" fill="#6FD08C"/>',
  house: '<rect x="12" y="30" width="40" height="28" fill="#FFD0A0"/><polygon points="8,32 32,10 56,32" fill="#FF8F8F"/><rect x="27" y="42" width="10" height="16" fill="#B07A4A"/><rect x="16" y="36" width="8" height="8" fill="#CFEFFF"/>',
  fish: '<ellipse cx="28" cy="32" rx="20" ry="13" fill="#7CC8FF"/><polygon points="46,32 60,20 60,44" fill="#7CC8FF"/><circle cx="18" cy="29" r="2.5" fill="#4A3B6B"/>',
  balloon: '<ellipse cx="32" cy="26" rx="16" ry="20" fill="#FF8FB8"/><polygon points="28,47 36,47 32,52" fill="#FF8FB8"/><path d="M32 52c-5 4 5 6 0 11" fill="none"/>',
  cup: '<rect x="14" y="20" width="30" height="34" rx="6" fill="#B79CFF"/><path d="M44 28h6a6 6 0 0 1 0 14h-6" fill="none"/>',
  book: '<rect x="12" y="10" width="40" height="46" rx="4" fill="#7CC8FF"/><path d="M20 10v46M28 22h16M28 30h16" fill="none"/>',
  cat: '<polygon points="14,26 16,6 30,18" fill="#FFB067"/><polygon points="50,26 48,6 34,18" fill="#FFB067"/><circle cx="32" cy="36" r="20" fill="#FFB067"/><ellipse cx="24" cy="34" rx="2.5" ry="3.5" fill="#4A3B6B"/><ellipse cx="40" cy="34" rx="2.5" ry="3.5" fill="#4A3B6B"/><polygon points="29,41 35,41 32,45" fill="#FF8FB8"/>',
  dog: '<ellipse cx="12" cy="30" rx="7" ry="14" fill="#8B5E3C" transform="rotate(12 12 30)"/><ellipse cx="52" cy="30" rx="7" ry="14" fill="#8B5E3C" transform="rotate(-12 52 30)"/><circle cx="32" cy="34" r="19" fill="#D9A066"/><ellipse cx="32" cy="42" rx="10" ry="8" fill="#FFE8CC"/><ellipse cx="32" cy="39" rx="4.5" ry="3" fill="#4A3B6B"/><circle cx="24" cy="30" r="2.5" fill="#4A3B6B"/><circle cx="40" cy="30" r="2.5" fill="#4A3B6B"/>',
  bird: '<polygon points="14,34 4,24 6,42" fill="#7CC8FF"/><ellipse cx="30" cy="34" rx="18" ry="16" fill="#7CC8FF"/><polygon points="46,32 58,36 46,40" fill="#FFA533"/><circle cx="38" cy="30" r="2.5" fill="#4A3B6B"/><path d="M20 36c6 8 14 6 18 0" fill="none"/>',
  car: '<rect x="6" y="32" width="52" height="16" rx="5" fill="#FF6B6B"/><path d="M16 32l6-14h20l8 14z" fill="#FF8F8F"/><circle cx="18" cy="50" r="7" fill="#4A3B6B"/><circle cx="46" cy="50" r="7" fill="#4A3B6B"/><circle cx="18" cy="50" r="2.5" fill="#fff" stroke="none"/><circle cx="46" cy="50" r="2.5" fill="#fff" stroke="none"/>',
  bus: '<rect x="6" y="14" width="52" height="36" rx="6" fill="#FFD95A"/><rect x="10" y="20" width="12" height="10" fill="#CFEFFF"/><rect x="26" y="20" width="12" height="10" fill="#CFEFFF"/><rect x="42" y="20" width="12" height="10" fill="#CFEFFF"/><circle cx="18" cy="52" r="6" fill="#4A3B6B"/><circle cx="46" cy="52" r="6" fill="#4A3B6B"/>',
  plane: '<polygon points="6,30 58,8 34,56 28,36" fill="#7CC8FF"/><path d="M28 36L58 8" fill="none"/>',
  boat: '<path d="M8 38h48l-8 14H16z" fill="#FF8F8F"/><path d="M32 10v28" fill="none"/><polygon points="34,12 54,34 34,34" fill="#ffffff"/>',
  /* ikon antarmuka */
  pencil: '<polygon points="12,52 16,40 44,12 52,20 24,48" fill="#FFD95A"/><polygon points="12,52 16,40 24,48" fill="#FFD0A0"/><path d="M40 16l8 8" fill="none"/>',
  puzzle: '<path d="M10 20h14a6 6 0 1 1 12 0h14v14a6 6 0 1 0 0 12v10H36a6 6 0 1 0-12 0H10z" fill="#B79CFF"/>',
  plus: '<circle cx="32" cy="32" r="24" fill="#FFD95A"/><path d="M32 18v28M18 32h28" fill="none" stroke-width="6"/>',
  abc: '<rect x="6" y="14" width="52" height="36" rx="8" fill="#6FE0B8"/><text x="32" y="40" text-anchor="middle" font-family="Fredoka,Arial,sans-serif" font-weight="700" font-size="20" fill="#4A3B6B" stroke="none">ABC</text>',
  bolt: '<polygon points="36,6 14,36 28,36 24,58 50,26 34,26" fill="#FFB067"/>',
  abacus: '<rect x="8" y="10" width="48" height="44" rx="6" fill="#FF8F8F"/><path d="M8 28h48M22 10v44M42 10v44" fill="none"/><circle cx="22" cy="20" r="4.5" fill="#FFD95A"/><circle cx="42" cy="36" r="4.5" fill="#FFD95A"/><circle cx="42" cy="44" r="4.5" fill="#FFD95A"/><circle cx="22" cy="44" r="4.5" fill="#FFD95A"/>',
  sound: '<path d="M10 24v16h10l14 12V12L20 24z" fill="#7CC8FF"/><path d="M42 24a10 10 0 0 1 0 16M48 18a18 18 0 0 1 0 28" fill="none"/>',
  soundoff: '<path d="M10 24v16h10l14 12V12L20 24z" fill="#C9C2DA"/><path d="M42 24l14 16M56 24L42 40" fill="none"/>',
  back: '<path d="M44 32H18M30 18L16 32l14 14" fill="none" stroke-width="6"/>',
  home: '<polygon points="8,32 32,10 56,32" fill="#FF8F8F"/><rect x="14" y="30" width="36" height="24" fill="#FFD0A0"/><rect x="27" y="40" width="10" height="14" fill="#B07A4A"/>',
  medal: '<polygon points="18,6 30,6 34,26 22,26" fill="#FF8FB8"/><polygon points="46,6 34,6 30,26 42,26" fill="#7CC8FF"/><circle cx="32" cy="40" r="16" fill="#FFD95A"/><polygon transform="translate(32,40) scale(0.45)" points="' + STAR_PTS + '" fill="#fff"/>',
  lock: '<rect x="14" y="28" width="36" height="28" rx="6" fill="#C9C2DA"/><path d="M22 28v-8a10 10 0 0 1 20 0v8" fill="none"/>'
};

function icon(name, px = 48, cls = '') {
  const label = (typeof OBJ !== 'undefined' && OBJ[name]) ? OBJ[name].id : name;
  return `<svg class="ico ${cls}" viewBox="0 0 64 64" width="${px}" height="${px}" ${GATTR} role="img" aria-label="${label}">${ICONS[name] || ''}</svg>`;
}

function starSVG(px = 30, fill = '#FFD95A', cls = '') {
  return `<svg class="star ${cls}" viewBox="-32 -32 64 64" width="${px}" height="${px}" aria-hidden="true"><polygon points="${STAR_PTS}" fill="${fill}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`;
}

/* Bentuk geometri untuk soal logika */
const SHAPE_KINDS = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
const SHAPE_COLORS = { merah: '#FF6B6B', biru: '#5BB5FF', kuning: '#FFD95A', hijau: '#4FD6A0', ungu: '#B79CFF', jingga: '#FFA533' };
function shapeSVG(kind, color, px = 56) {
  const c = SHAPE_COLORS[color] || color;
  let inner = '';
  if (kind === 'circle') inner = `<circle cx="32" cy="32" r="22" fill="${c}"/>`;
  if (kind === 'square') inner = `<rect x="10" y="10" width="44" height="44" rx="6" fill="${c}"/>`;
  if (kind === 'triangle') inner = `<polygon points="32,8 56,54 8,54" fill="${c}"/>`;
  if (kind === 'star') inner = `<polygon transform="translate(32,34) scale(1.1)" points="${STAR_PTS}" fill="${c}"/>`;
  if (kind === 'heart') inner = `<path d="M32 56C10 40 6 28 6 20 6 12 12 8 18 8c6 0 10 4 14 8 4-4 8-8 14-8 6 0 12 4 12 12 0 8-4 20-26 36z" fill="${c}"/>`;
  if (kind === 'diamond') inner = `<polygon points="32,6 56,32 32,58 8,32" fill="${c}"/>`;
  return `<svg class="shape" viewBox="0 0 64 64" width="${px}" height="${px}" ${GATTR} aria-hidden="true">${inner}</svg>`;
}

/* ===== Karakter orisinal ===== */
const CHAR = {
  awan: {
    name: 'Awan',
    eyes: [[78, 112], [122, 112]], er: [6, 8.5],
    body: `<g fill="#4A3B6B" stroke="#4A3B6B" stroke-width="9" stroke-linejoin="round"><polygon points="58,86 66,30 108,66"/><polygon points="92,66 134,30 142,86"/><circle cx="100" cy="116" r="54"/><circle cx="52" cy="132" r="30"/><circle cx="148" cy="132" r="30"/><circle cx="76" cy="154" r="28"/><circle cx="124" cy="154" r="28"/></g><g fill="#FFFFFF"><polygon points="58,86 66,30 108,66"/><polygon points="92,66 134,30 142,86"/><circle cx="100" cy="116" r="54"/><circle cx="52" cy="132" r="30"/><circle cx="148" cy="132" r="30"/><circle cx="76" cy="154" r="28"/><circle cx="124" cy="154" r="28"/></g><polygon points="69,68 68,46 90,63" fill="#FF9EC0"/><polygon points="110,63 132,46 131,68" fill="#FF9EC0"/>`,
    stat: `<ellipse cx="62" cy="128" rx="10" ry="6.5" fill="#FF9EC0" opacity="0.75"/><ellipse cx="138" cy="128" rx="10" ry="6.5" fill="#FF9EC0" opacity="0.75"/><g transform="translate(100,86) scale(0.3)"><polygon points="${STAR_PTS}" fill="#FFD95A" stroke="#4A3B6B" stroke-width="10" stroke-linejoin="round"/></g>`,
    mouth: {
      normal: '<path d="M92 124 q4 6 8 0 q4 6 8 0" fill="none" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
      happy: '<path d="M91 121 q9 16 18 0z" fill="#FF7FA8" stroke="#4A3B6B" stroke-width="3" stroke-linejoin="round"/>',
      oops: '<ellipse cx="100" cy="127" rx="4" ry="5" fill="#4A3B6B"/>',
      think: '<path d="M94 126 h12" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round"/>'
    }
  },
  bintang: {
    name: 'Bintang',
    eyes: [[80, 108], [120, 108]], er: [5.5, 8],
    body: `<g fill="#4A3B6B" stroke="#4A3B6B" stroke-width="9" stroke-linejoin="round"><ellipse cx="74" cy="46" rx="15" ry="38" transform="rotate(-8 74 46)"/><ellipse cx="126" cy="46" rx="15" ry="38" transform="rotate(8 126 46)"/><ellipse cx="100" cy="170" rx="38" ry="26"/><circle cx="100" cy="112" r="52"/></g><g fill="#FFD95A"><ellipse cx="74" cy="46" rx="15" ry="38" transform="rotate(-8 74 46)"/><ellipse cx="126" cy="46" rx="15" ry="38" transform="rotate(8 126 46)"/><ellipse cx="100" cy="170" rx="38" ry="26"/><circle cx="100" cy="112" r="52"/></g><ellipse cx="74" cy="48" rx="7" ry="26" fill="#FF9EC0" transform="rotate(-8 74 46)"/><ellipse cx="126" cy="48" rx="7" ry="26" fill="#FF9EC0" transform="rotate(8 126 46)"/><g transform="translate(100,178) scale(0.5)"><polygon points="${STAR_PTS}" fill="#ffffff" stroke="#4A3B6B" stroke-width="6" stroke-linejoin="round"/></g>`,
    stat: '<ellipse cx="66" cy="124" rx="9" ry="6" fill="#FF9EC0" opacity="0.7"/><ellipse cx="134" cy="124" rx="9" ry="6" fill="#FF9EC0" opacity="0.7"/><ellipse cx="100" cy="120" rx="5" ry="3.5" fill="#FF7FA8"/>',
    mouth: {
      normal: '<path d="M100 123.5 v4 M100 127.5 q-5 5 -10 1 M100 127.5 q5 5 10 1" fill="none" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
      happy: '<path d="M91 126 q9 15 18 0z" fill="#FF7FA8" stroke="#4A3B6B" stroke-width="3" stroke-linejoin="round"/>',
      oops: '<path d="M92 133 q8 -8 16 0" fill="none" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round"/>',
      think: '<path d="M94 129 h12" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round"/>'
    }
  },
  bulan: {
    name: 'Bulan',
    eyes: [[79, 108], [121, 108]], er: [5.5, 8],
    body: `<g fill="#4A3B6B" stroke="#4A3B6B" stroke-width="9" stroke-linejoin="round"><circle cx="58" cy="66" r="19"/><circle cx="142" cy="66" r="19"/><ellipse cx="100" cy="172" rx="40" ry="26"/><circle cx="100" cy="112" r="52"/></g><g fill="#B79CFF"><circle cx="58" cy="66" r="19"/><circle cx="142" cy="66" r="19"/><ellipse cx="100" cy="172" rx="40" ry="26"/><circle cx="100" cy="112" r="52"/></g><circle cx="58" cy="68" r="9" fill="#E6DBFF"/><circle cx="142" cy="68" r="9" fill="#E6DBFF"/><ellipse cx="100" cy="178" rx="20" ry="14" fill="#F1EAFF"/><ellipse cx="100" cy="130" rx="22" ry="14" fill="#F1EAFF"/><circle cx="100" cy="78" r="11" fill="#FFD95A"/><circle cx="104.5" cy="75" r="9.5" fill="#B79CFF"/>`,
    stat: '<ellipse cx="62" cy="126" rx="9" ry="6" fill="#FF9EC0" opacity="0.7"/><ellipse cx="138" cy="126" rx="9" ry="6" fill="#FF9EC0" opacity="0.7"/><ellipse cx="100" cy="123" rx="6" ry="4" fill="#4A3B6B"/>',
    mouth: {
      normal: '<path d="M100 127 v4 M100 131 q-5 4 -9 0 M100 131 q5 4 9 0" fill="none" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
      happy: '<path d="M91 130 q9 14 18 0z" fill="#FF7FA8" stroke="#4A3B6B" stroke-width="3" stroke-linejoin="round"/>',
      oops: '<path d="M92 136 q8 -8 16 0" fill="none" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round"/>',
      think: '<path d="M94 132 h12" stroke="#4A3B6B" stroke-width="3" stroke-linecap="round"/>'
    }
  }
};

function charSVG(name, mood = 'normal', px = 180) {
  const c = CHAR[name];
  let face = '';
  c.eyes.forEach(([x, y]) => {
    if (mood === 'happy') face += `<path d="M${x - 7} ${y + 3} q7 -11 14 0" fill="none" stroke="#4A3B6B" stroke-width="4" stroke-linecap="round"/>`;
    else face += `<ellipse cx="${x}" cy="${y}" rx="${c.er[0]}" ry="${c.er[1]}" fill="#4A3B6B"/><circle cx="${x + 2}" cy="${y - 3.5}" r="2.4" fill="#fff"/>`;
  });
  face += c.mouth[mood] || c.mouth.normal;
  return `<svg class="char" viewBox="0 0 200 200" width="${px}" height="${px}" role="img" aria-label="${c.name}">${c.body}${c.stat}${face}</svg>`;
}

/* ===== Sempoa (soroban): tiap batang punya 1 manik atas (=5) dan 4 manik bawah (=1) ===== */
function abacusState(value, rods) {
  const st = []; let v = value;
  for (let i = 0; i < rods; i++) { const d = v % 10; st.unshift({ up: d >= 5 ? 1 : 0, low: d % 5 }); v = Math.floor(v / 10); }
  return st;
}
function abacusValue(st) { return st.reduce((s, r) => s * 10 + r.up * 5 + r.low, 0); }
function abacusSVG(st, interactive) {
  const rods = st.length, W = Math.max(240, rods * 92 + 44), H = 270, bar = 98;
  const names = ['Satuan', 'Puluhan', 'Ratusan', 'Ribuan', 'Puluh ribuan'];
  let s = `<svg class="abacus${interactive ? ' live' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sempoa">`;
  s += `<rect x="4" y="4" width="${W - 8}" height="${H - 24}" rx="20" fill="#FF8F8F" stroke="#4A3B6B" stroke-width="4"/>`;
  s += `<rect x="16" y="16" width="${W - 32}" height="${H - 48}" rx="12" fill="#FFF3EC" stroke="#4A3B6B" stroke-width="3"/>`;
  const span = (W - 32) / rods;
  st.forEach((r, i) => {
    const cx = 16 + span * (i + 0.5);
    s += `<rect x="${cx - 3}" y="16" width="6" height="${H - 48}" fill="#B07A4A"/>`;
  });
  s += `<rect x="16" y="${bar - 5}" width="${W - 32}" height="10" fill="#4A3B6B"/>`;
  st.forEach((r, i) => {
    const cx = 16 + span * (i + 0.5), place = rods - 1 - i;
    const upY = r.up ? bar - 5 - 14 : 40;
    s += bead(cx, upY, r.up, '#FF8FB8', i, 'u', interactive);
    for (let b = 1; b <= 4; b++) {
      const on = b <= r.low, y = on ? bar + 5 + 14 + (b - 1) * 27 : (H - 30 - 14) - (4 - b) * 27;
      s += bead(cx, y, on, '#FFD95A', i, String(b), interactive);
    }
    s += `<text x="${cx}" y="${H - 6}" text-anchor="middle" font-family="Nunito,Arial,sans-serif" font-weight="800" font-size="13" fill="#4A3B6B">${names[place] || ''}</text>`;
  });
  return s + '</svg>';
}
function bead(cx, cy, on, color, r, b, interactive) {
  const attrs = interactive ? ` data-r="${r}" data-b="${b}"` : '';
  return `<g class="bead"${attrs}><ellipse cx="${cx}" cy="${cy}" rx="${Math.min(30, 36)}" ry="13" fill="${on ? color : '#FFF8D6'}" stroke="#4A3B6B" stroke-width="3"/>${interactive ? `<ellipse cx="${cx}" cy="${cy}" rx="34" ry="16" fill="transparent"/>` : ''}</g>`;
}
function abacusStatic(value, rods) { return `<div class="abacus-wrap">${abacusSVG(abacusState(value, rods), false)}</div>`; }

/* Hand guide and single-rod Soroban for beginner abacus learning */
function guideHandSVG(type = 'thumb', dir = 'up', px = 54) {
  let inner = '';
  if (type === 'thumb') {
    inner = `<g class="hand-anim ${dir === 'up' ? 'bounce-up' : 'bounce-down'}">
      <path d="M22 46 c-4 0 -8 -4 -8 -8 v-12 c0 -4 4 -8 8 -8 h6 v-10 c0 -4 3 -6 6 -6 s6 3 6 7 v9 h6 c4 0 7 3 7 7 v14 c0 4 -3 7 -7 7 z" fill="#FFD2A8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M26 26 h14 M26 32 h14 M26 38 h12" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <path d="${dir === 'up' ? 'M32 7 v-5 M26 5 l6 -5 l6 5' : 'M32 47 v6 M26 50 l6 5 l6 -5'}" fill="none" stroke="#FF5A8D" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  } else if (type === 'index') {
    inner = `<g class="hand-anim ${dir === 'down' ? 'bounce-down' : 'bounce-up'}">
      <path d="M28 8 c0 -4 3 -7 7 -7 s7 3 7 7 v18 h6 c4 0 7 3 7 7 v12 c0 5 -4 9 -9 9 h-14 c-5 0 -9 -4 -9 -9 v-14 c0 -3 2 -6 5 -7 v-16 z" fill="#FFD2A8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 32 h16 M30 38 h14" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <path d="${dir === 'down' ? 'M35 48 v6 M29 51 l6 5 l6 -5' : 'M35 8 v-6 M29 5 l6 -5 l6 5'}" fill="none" stroke="#5BB5FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  } else {
    inner = `<g class="hand-anim pinch-anim">
      <path d="M18 18 c0 -3 3 -6 6 -6 h12 c4 0 6 3 6 6 v6 c0 4 -3 6 -6 6 h-10 v4 h12 c4 0 6 3 6 6 v6 c0 4 -3 6 -6 6 h-14 c-4 0 -6 -3 -6 -6 z" fill="#FFD2A8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M46 18 l-6 6 M46 42 l-6 -6" fill="none" stroke="#FF5A8D" stroke-width="3.5" stroke-linecap="round"/>
    </g>`;
  }
  return `<svg class="hand-guide" viewBox="0 0 64 64" width="${px}" height="${px}" role="img" aria-label="Panduan Jari">${inner}</svg>`;
}

function abacusLearnRodSVG(st, opts = {}) {
  const W = 280, H = 340, bar = 120, cx = 140;
  const guideBead = opts.guideBead || null;
  const interactive = opts.interactive !== false;
  
  let s = `<svg class="abacus-single${interactive ? ' live' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sempoa Satuan">`;
  s += `<rect x="36" y="8" width="${W - 72}" height="${H - 24}" rx="22" fill="#FF8F8F" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="50" y="22" width="${W - 100}" height="${H - 52}" rx="14" fill="#FFF6EE" stroke="${INK}" stroke-width="3"/>`;
  s += `<rect x="${cx - 5}" y="22" width="10" height="${H - 52}" rx="3" fill="#B07A4A"/>`;
  s += `<rect x="50" y="${bar - 6}" width="${W - 100}" height="12" fill="${INK}" rx="3"/>`;
  s += `<circle cx="${cx}" cy="${bar}" r="3" fill="#FFF8D6"/>`;
  
  const upOn = !!st.up;
  const upY = upOn ? (bar - 6 - 20) : 52;
  const isUpGuide = guideBead === 'u';
  const upHighlight = isUpGuide ? ' highlight-bead' : '';
  s += `<g class="bead big-bead${upHighlight}" ${interactive ? 'data-b="u"' : ''}>
    <ellipse cx="${cx}" cy="${upY}" rx="46" ry="19" fill="${upOn ? '#FFD95A' : '#FFF9DE'}" stroke="${INK}" stroke-width="3.5"/>
    <text x="${cx}" y="${upY + 5}" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="14" fill="${INK}" pointer-events="none">5</text>
    ${interactive ? `<ellipse cx="${cx}" cy="${upY}" rx="50" ry="24" fill="transparent"/>` : ''}
  </g>`;

  for (let b = 1; b <= 4; b++) {
    const on = b <= st.low;
    const yActive = (bar + 6 + 20) + (b - 1) * 33;
    const yInactive = (H - 42 - 18) - (4 - b) * 33;
    const y = on ? yActive : yInactive;
    const isThisGuide = guideBead === ('b' + b);
    const lowHighlight = isThisGuide ? ' highlight-bead' : '';
    s += `<g class="bead big-bead${lowHighlight}" ${interactive ? `data-b="${b}"` : ''}>
      <ellipse cx="${cx}" cy="${y}" rx="46" ry="18" fill="${on ? '#5BB5FF' : '#E8F5FF'}" stroke="${INK}" stroke-width="3.5"/>
      <text x="${cx}" y="${y + 5}" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="13" fill="${INK}" pointer-events="none">1</text>
      ${interactive ? `<ellipse cx="${cx}" cy="${y}" rx="50" ry="22" fill="transparent"/>` : ''}
    </g>`;
  }

  s += `<text x="${cx}" y="${H - 6}" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="14" fill="${INK}">Tiang Satuan</text>`;
  s += `<text x="30" y="${bar + 4}" text-anchor="end" font-family="Fredoka,sans-serif" font-weight="600" font-size="11" fill="#7C6D9E">Garis Nilai</text>`;
  s += `<path d="M32 ${bar} h16" stroke="#7C6D9E" stroke-width="2" stroke-dasharray="3 3"/>`;

  s += '</svg>';
  return s;
}
