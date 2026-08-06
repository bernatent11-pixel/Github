// Generate Milonga logo assets in the new brand palette from the green source.
// Recolors the two source greens to a target palette, drops the white ground to
// transparency, saves a trimmed lockup, and crops the hand mark out of the
// UNTRIMMED art (whose geometry is stable at 1080x1080).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'public/logo/milonga-logo-green-source.png';
const OUT = 'public/logo';
mkdirSync(OUT, { recursive: true });

const clamp = (n) => (n < 0 ? 0 : n > 255 ? 255 : n);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

// Tint the source: white -> transparent, dark green -> `dark`, light green -> `light`.
// Returns the UNTRIMMED rgba buffer + dims so the mark crop stays geometry-stable.
async function tint(dark, light) {
  const [dr, dg, db] = hex(dark);
  const [lr, lg, lb] = hex(light);
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let p = 0; p < width * height; p++) {
    const i = p * channels;
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    const m = Math.min(r, g, b);
    let cov = clamp(Math.round((255 - m) * 1.4)); // distance from white -> coverage
    if (a < 255) cov = Math.round((cov * a) / 255);
    const L = (r + g + b) / 3;
    const useLight = L >= 95 && g > r; // lighter green crown
    const o = p * 4;
    out[o] = useLight ? lr : dr;
    out[o + 1] = useLight ? lg : dg;
    out[o + 2] = useLight ? lb : db;
    out[o + 3] = cov;
  }
  return { buf: out, width, height };
}

const raw = ({ buf, width, height }) => sharp(buf, { raw: { width, height, channels: 4 } });

/** Save the full lockup, trimmed so a rendered `height` maps to the real artwork. */
async function saveLockup(t, outfile) {
  const png = await raw(t).png().toBuffer();
  await sharp(png).trim({ threshold: 1 }).png().toFile(`${OUT}/${outfile}`);
}

/** Crop the crown+hand mark out of the untrimmed art, excluding the arced wordmark. */
async function saveMark(t, outfile) {
  const left = Math.round(t.width * 0.305);
  const width = Math.round(t.width * 0.39);
  const top = Math.round(t.height * 0.385);
  const h = Math.round(t.height * 0.47);
  const png = await raw(t).png().toBuffer();
  const extracted = await sharp(png).extract({ left, top, width, height: h }).png().toBuffer();
  const trimmed = await sharp(extracted).trim({ threshold: 1 }).png().toBuffer();
  // Erase stray arc-tip specks in the extreme top corners (crown is centered).
  const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: hh, channels } = info;
  const topBand = Math.round(hh * 0.07);
  for (let y = 0; y < topBand; y++) {
    for (let x = 0; x < w; x++) {
      if (x < w * 0.22 || x > w * 0.78) data[(y * w + x) * channels + 3] = 0;
    }
  }
  const cleaned = await sharp(data, { raw: { width: w, height: hh, channels } }).png().toBuffer();
  await sharp(cleaned).trim({ threshold: 1 }).png().toFile(`${OUT}/${outfile}`);
}

const TREATMENTS = [
  ['#E3BC62', '#EFD9A0', 'gold'],   // gold two-tone — for dark green backgrounds
  ['#004D27', '#057441', 'green'],  // brand greens — for beige backgrounds
  ['#F0EFDF', '#F0EFDF', 'beige'],  // cream — for gold and dark backgrounds
  ['#FFFFFF', '#FFFFFF', 'white'],
];

for (const [dark, light, name] of TREATMENTS) {
  const t = await tint(dark, light);
  await saveLockup(t, `lockup-milonga-${name}.png`);
  await saveMark(t, `mark-${name}.png`);
}

console.log('logos: wrote lockup-* and mark-* to', OUT);
