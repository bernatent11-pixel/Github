// Generate Milonga logo assets in the new brand palette from the green source.
// Recolors the two source greens to a target palette, drops the white ground to
// transparency, and crops the hand mark out of the full lockup.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'public/logo/milonga-logo-green-source.png';
const OUT = 'public/logo';
mkdirSync(OUT, { recursive: true });

const clamp = (n) => (n < 0 ? 0 : n > 255 ? 255 : n);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

// Tint the source: white -> transparent, dark green -> `dark`, light green -> `light`.
async function tint(dark, light, outfile) {
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
  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(`${OUT}/${outfile}`);
  return { width, height };
}

// Crop the hand mark (crown + hand) out of a tinted full lockup, then trim.
async function crop(infile, outfile) {
  const meta = await sharp(`${OUT}/${infile}`).metadata();
  // Centered box around the crown+hand mark, excluding the arced wordmark that
  // dips into the top corners.
  const left = Math.round(meta.width * 0.305);
  const width = Math.round(meta.width * 0.39);
  const top = Math.round(meta.height * 0.385);
  const h = Math.round(meta.height * 0.47);
  const extracted = await sharp(`${OUT}/${infile}`)
    .extract({ left, top, width, height: h })
    .png()
    .toBuffer();
  const trimmed = await sharp(extracted).trim({ threshold: 1 }).png().toBuffer();
  // Erase stray arc-tip specks that survive in the top corners (crown is centered,
  // so the outer thirds of the top band are always safe to clear).
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

// Full lockups (hand + MILONGA) in each brand treatment.
await tint('#E3BC62', '#EFD9A0', 'lockup-milonga-gold.png');   // gold, two-tone
await tint('#004D27', '#057441', 'lockup-milonga-green.png');  // brand greens
await tint('#F0EFDF', '#F0EFDF', 'lockup-milonga-beige.png');  // for dark backgrounds
await tint('#FFFFFF', '#FFFFFF', 'lockup-milonga-white.png');

// Hand-only marks, cropped from each treatment.
await crop('lockup-milonga-gold.png', 'mark-gold.png');
await crop('lockup-milonga-green.png', 'mark-green.png');
await crop('lockup-milonga-beige.png', 'mark-beige.png');
await crop('lockup-milonga-white.png', 'mark-white.png');

console.log('logos: wrote lockup-* and mark-* to', OUT);
