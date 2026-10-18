const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// PNG encoder using built-in zlib
function createPNG(width, height, getPixel) {
  const rowSize = width * 4;
  const rawData = Buffer.alloc(height * (1 + rowSize));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, r)));
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, g)));
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, b)));
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, a)));
    }
  }
  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
      }
    }
    return ~c >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData), 0);
    return Buffer.concat([len, typeAndData, crc]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    header,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Distance helper functions
function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

// 5-point star distance field
function starDistance(x, y, cx, cy, rOuter, rInner) {
  const dx = x - cx;
  const dy = y - cy;
  let angle = Math.atan2(dy, dx) + Math.PI / 2;
  if (angle < 0) angle += Math.PI * 2;
  const sector = (Math.PI * 2) / 10;
  const i = Math.floor(angle / sector);
  const frac = (angle % sector) / sector;
  const r = (i % 2 === 0)
    ? rOuter * (1 - frac) + rInner * frac
    : rInner * (1 - frac) + rOuter * frac;
  const currentDist = Math.hypot(dx, dy);
  return currentDist - r;
}

// Icon renderer
function renderIconPixel(x, y, width, height, isMaskable) {
  // Normalized coords 0..1
  const u = x / width;
  const v = y / height;

  // Background: playful gradient from soft cyan #7CC8FF (top) to lavender #B79CFF (bottom)
  const bgR = 124 * (1 - v) + 183 * v;
  const bgG = 200 * (1 - v) + 156 * v;
  const bgB = 255 * (1 - v) + 255 * v;

  // If not maskable, we can give rounded corner squircle or transparent corners
  if (!isMaskable) {
    const cornerRadius = width * 0.22;
    const cl = cornerRadius;
    const cr = width - cornerRadius;
    const ct = cornerRadius;
    const cb = height - cornerRadius;
    let outside = false;
    if (x < cl && y < ct && dist(x, y, cl, ct) > cornerRadius) outside = true;
    if (x > cr && y < ct && dist(x, y, cr, ct) > cornerRadius) outside = true;
    if (x < cl && y > cb && dist(x, y, cl, cb) > cornerRadius) outside = true;
    if (x > cr && y > cb && dist(x, y, cr, cb) > cornerRadius) outside = true;
    if (outside) {
      return [0, 0, 0, 0];
    }
  }

  let r = bgR;
  let g = bgG;
  let b = bgB;
  let a = 255;

  // Subtle decorative dots/sparkles in background
  const sparkles = [
    [width * 0.2, height * 0.2, width * 0.035, [255, 255, 255]],
    [width * 0.8, height * 0.25, width * 0.04, [255, 240, 150]],
    [width * 0.82, height * 0.72, width * 0.03, [255, 255, 255]],
    [width * 0.18, height * 0.78, width * 0.03, [111, 224, 184]]
  ];
  for (const [sx, sy, sr, col] of sparkles) {
    const d = dist(x, y, sx, sy);
    if (d < sr) {
      const alpha = Math.min(1, Math.max(0, (sr - d) * 1.5));
      r = r * (1 - alpha) + col[0] * alpha;
      g = g * (1 - alpha) + col[1] * alpha;
      b = b * (1 - alpha) + col[2] * alpha;
    }
  }

  // Cloud (Awan) at bottom center
  const scale = isMaskable ? 0.76 : 0.88;
  const cx = width * 0.5;
  const cy = height * (isMaskable ? 0.5 : 0.48);

  // Cloud puffs at bottom
  const cloudPuffs = [
    [cx - width * 0.22 * scale, cy + height * 0.26 * scale, width * 0.16 * scale],
    [cx + width * 0.22 * scale, cy + height * 0.26 * scale, width * 0.16 * scale],
    [cx - width * 0.11 * scale, cy + height * 0.3 * scale, width * 0.18 * scale],
    [cx + width * 0.11 * scale, cy + height * 0.3 * scale, width * 0.18 * scale],
    [cx, cy + height * 0.25 * scale, width * 0.22 * scale]
  ];

  // Render cloud outline & body
  let minCloudDist = 999;
  for (const [px, py, pr] of cloudPuffs) {
    minCloudDist = Math.min(minCloudDist, dist(x, y, px, py) - pr);
  }

  if (minCloudDist <= 0) {
    // Inside cloud
    r = 255; g = 255; b = 255;
  } else if (minCloudDist < width * 0.02) {
    // Cloud dark outline #4A3B6B
    const t = 1 - minCloudDist / (width * 0.02);
    r = r * (1 - t) + 74 * t;
    g = g * (1 - t) + 59 * t;
    b = b * (1 - t) + 107 * t;
  }

  // Smiling Star (Bintang) in center
  const starR = width * 0.34 * scale;
  const starInner = starR * 0.48;
  const starD = starDistance(x, y, cx, cy - height * 0.02 * scale, starR, starInner);

  const starBorderW = width * 0.022;
  if (starD <= 0) {
    // Inside Star - Yellow #FFD95A
    let sr = 255, sg = 217, sb = 90;

    // Rosy cheeks #FF8FB8
    const cheekY = cy + height * 0.04 * scale;
    const leftCheekD = dist(x, y, cx - width * 0.11 * scale, cheekY);
    const rightCheekD = dist(x, y, cx + width * 0.11 * scale, cheekY);
    const cheekR = width * 0.045 * scale;
    if (leftCheekD < cheekR) {
      const t = Math.min(1, Math.max(0, (cheekR - leftCheekD) / cheekR));
      sr = sr * (1 - t * 0.8) + 255 * (t * 0.8);
      sg = sg * (1 - t * 0.8) + 143 * (t * 0.8);
      sb = sb * (1 - t * 0.8) + 184 * (t * 0.8);
    }
    if (rightCheekD < cheekR) {
      const t = Math.min(1, Math.max(0, (cheekR - rightCheekD) / cheekR));
      sr = sr * (1 - t * 0.8) + 255 * (t * 0.8);
      sg = sg * (1 - t * 0.8) + 143 * (t * 0.8);
      sb = sb * (1 - t * 0.8) + 184 * (t * 0.8);
    }

    // Eyes: two friendly dark ink ovals #4A3B6B with white sparkles
    const eyeY = cy - height * 0.01 * scale;
    const eyeRX = width * 0.025 * scale;
    const eyeRY = height * 0.038 * scale;
    const leftEyeD = Math.hypot((x - (cx - width * 0.075 * scale)) / eyeRX, (y - eyeY) / eyeRY);
    const rightEyeD = Math.hypot((x - (cx + width * 0.075 * scale)) / eyeRX, (y - eyeY) / eyeRY);

    if (leftEyeD <= 1.0 || rightEyeD <= 1.0) {
      sr = 74; sg = 59; sb = 107;
      // Pupil shine
      const shineLX = dist(x, y, cx - width * 0.065 * scale, eyeY - height * 0.012 * scale);
      const shineRX = dist(x, y, cx + width * 0.085 * scale, eyeY - height * 0.012 * scale);
      if (shineLX < width * 0.01 * scale || shineRX < width * 0.01 * scale) {
        sr = 255; sg = 255; sb = 255;
      }
    }

    // Smiling mouth: arc curving up
    const mouthY = cy + height * 0.065 * scale;
    const mouthW = width * 0.07 * scale;
    const mouthH = height * 0.045 * scale;
    if (Math.abs(x - cx) < mouthW && y >= mouthY - 2 && y <= mouthY + mouthH) {
      // Parabola mouth
      const normX = (x - cx) / mouthW;
      const expectedY = mouthY + (normX * normX) * mouthH;
      const mouthD = Math.abs(y - expectedY);
      if (mouthD < width * 0.012) {
        sr = 74; sg = 59; sb = 107;
      }
    }

    r = sr; g = sg; b = sb;
  } else if (starD < starBorderW) {
    // Star border #4A3B6B
    const t = 1 - starD / starBorderW;
    r = r * (1 - t) + 74 * t;
    g = g * (1 - t) + 59 * t;
    b = b * (1 - t) + 107 * t;
  }

  return [r, g, b, a];
}

console.log('Generating PNG icons for PWA and Android...');

const sizes = [
  { name: 'icon-192.png', width: 192, height: 192, maskable: false },
  { name: 'icon-512.png', width: 512, height: 512, maskable: false },
  { name: 'icon-maskable-512.png', width: 512, height: 512, maskable: true },
  { name: 'apple-touch-icon.png', width: 180, height: 180, maskable: false }
];

for (const s of sizes) {
  const buf = createPNG(s.width, s.height, (x, y, w, h) => renderIconPixel(x, y, w, h, s.maskable));
  fs.writeFileSync(path.join(__dirname, '..', s.name), buf);
  console.log(`Generated ${s.name} (${s.width}x${s.height}, ${buf.length} bytes)`);
}

// Generate SVG icon
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7CC8FF"/>
      <stop offset="100%" stop-color="#B79CFF"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#4A3B6B" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <!-- Sparkles -->
  <circle cx="100" cy="110" r="16" fill="#FFFFFF" opacity="0.85"/>
  <circle cx="410" cy="120" r="20" fill="#FFD95A" opacity="0.9"/>
  <circle cx="420" cy="380" r="15" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="90" cy="400" r="16" fill="#6FE0B8" opacity="0.85"/>
  
  <!-- Cloud at bottom -->
  <g fill="#FFFFFF" stroke="#4A3B6B" stroke-width="10" stroke-linejoin="round">
    <circle cx="150" cy="390" r="75"/>
    <circle cx="362" cy="390" r="75"/>
    <circle cx="210" cy="420" r="85"/>
    <circle cx="302" cy="420" r="85"/>
    <circle cx="256" cy="370" r="95"/>
  </g>

  <!-- Star Character (Bintang) -->
  <g filter="url(#shadow)">
    <!-- 5 point star -->
    <polygon points="256,70 292,175 403,178 316,243 348,350 256,285 164,350 196,243 109,178 220,175" fill="#FFD95A" stroke="#4A3B6B" stroke-width="12" stroke-linejoin="round"/>
    <!-- Cheeks -->
    <ellipse cx="206" cy="245" rx="22" ry="14" fill="#FF8FB8"/>
    <ellipse cx="306" cy="245" rx="22" ry="14" fill="#FF8FB8"/>
    <!-- Eyes -->
    <ellipse cx="216" cy="215" rx="13" ry="18" fill="#4A3B6B"/>
    <circle cx="220" cy="210" r="5" fill="#FFFFFF"/>
    <ellipse cx="296" cy="215" rx="13" ry="18" fill="#4A3B6B"/>
    <circle cx="300" cy="210" r="5" fill="#FFFFFF"/>
    <!-- Happy Smile -->
    <path d="M228 245 Q256 280 284 245" fill="none" stroke="#4A3B6B" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'icon.svg'), svg, 'utf8');
console.log('Generated icon.svg');
