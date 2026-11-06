// Art for Welcome flow email 1 ("Your mystery offer is inside").
//
//   hero-art.jpg   the pouch on the pop-up's gold silk, cropped from the
//                  portrait pop-up image BELOW the cans (no infused cans in a
//                  Mate Latte email), its top faded into one flat gold so the
//                  live-text hero above it can sit on a plain bgcolor
//   disc-*.png     the three ingredient marks, cream glyph in a forest disc
//
// Prints the flat gold the hero section must use as its bgcolor.
// Usage: node scripts/make-welcome-e1-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/welcome-e1/img';
fs.mkdirSync(OUT, { recursive: true });

// ── hero art ─────────────────────────────────────────────────────────────
const SRC = 'popups/mate-latte-mystery/img/bg-mobile.jpg'; // 1080x1620
const TOP = 880, W = 1200;
const crop = await sharp(SRC).extract({ left: 0, top: TOP, width: 1080, height: 1620 - TOP }).resize({ width: W }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { data, info } = crop;
const H = info.height;
// the flat gold: the average of the crop's first rows
let r = 0, g = 0, b = 0, n = 0;
for (let y = 0; y < 6; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 3; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
const flat = [r / n, g / n, b / n].map(Math.round);
const hex = '#' + flat.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
// fade: fully flat at the top, the photograph by 30% of the height
const FADE = Math.round(H * 0.3);
for (let y = 0; y < FADE; y++) {
  const t = y / FADE, k = 1 - t * t * (3 - 2 * t); // smoothstep, 1 → 0
  for (let x = 0; x < W; x++) { const i = (y * W + x) * 3; for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] * (1 - k) + flat[c] * k); }
}
await sharp(data, { raw: info }).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-art.jpg`);
console.log('hero-art.jpg', W + 'x' + H, 'flat gold', hex);

// ── ingredient discs ────────────────────────────────────────────────────
const D = 112, G = 72; // 2x: a 56px disc with a 36px glyph
for (const name of ['yerba-mate', 'l-theanine', 'lions-mane']) {
  const glyph = await sharp(`public/brand/icons/${name}-cream.png`).resize({ width: G, height: G, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const disc = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="#004D27"/></svg>`);
  await sharp(disc).composite([{ input: glyph, left: (D - G) / 2, top: (D - G) / 2 }]).png().toFile(`${OUT}/disc-${name}.png`);
  console.log(`disc-${name}.png`);
}
fs.copyFileSync('public/logo/lockup-milonga-green.png', `${OUT}/logo-green.png`);
console.log('logo-green.png', (await sharp(`${OUT}/logo-green.png`).metadata()).width + 'x' + (await sharp(`${OUT}/logo-green.png`).metadata()).height);
