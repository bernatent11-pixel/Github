// Art for Welcome flow email 1 ("Your mystery offer is inside").
//
//   hero-bg.jpg    the first section's background (live text sits on it)
//   disc-*.png     the three ingredient marks, cream glyph in a forest disc
// Usage: node scripts/make-welcome-e1-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/welcome-e1/img';
fs.mkdirSync(OUT, { recursive: true });

// ── hero background ─────────────────────────────────────────────────────
// Bernat's art (src-hero-82.jpg, 1200x1607): a 15-serving pouch top-right,
// the pouch and a mug of Mate Latte at the bottom, gold silk around an open
// middle. At 600px that middle is ~255px tall and the reveal needs ~500, so
// one plain band of the gradient (rows 530–650, no product, no bubble) is
// stretched by ADD rows. The products and the silk around them are untouched.
const SRC = 'exports/klaviyo/welcome-e1/src-hero-82.jpg';
const A = 530, B = 650, ADD = 491; // 2098 tall: an even 1049 at 600px
const W = 1200, H0 = 1607;
const top = await sharp(SRC).extract({ left: 0, top: 0, width: W, height: A }).toBuffer();
const band = await sharp(SRC).extract({ left: 0, top: A, width: W, height: B - A }).resize({ width: W, height: B - A + ADD, fit: 'fill', kernel: 'cubic' }).toBuffer();
const bottom = await sharp(SRC).extract({ left: 0, top: B, width: W, height: H0 - B }).toBuffer();
const H = H0 + ADD;
await sharp({ create: { width: W, height: H, channels: 3, background: '#F6DFAE' } })
  .composite([{ input: top, left: 0, top: 0 }, { input: band, left: 0, top: A }, { input: bottom, left: 0, top: B + ADD }])
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-bg.jpg`);
console.log('hero-bg.jpg', W + 'x' + H, '(shows at 600x' + H / 2 + ')');

// ── section 2: the pouch and the glass on green ──────────────────────────
// Bernat's studio shot (src-s2-83.webp, 1116x2000): the products sit in the
// middle of a flat green backdrop. The crop keeps the products; its top and
// bottom fade into the two flat greens the live-text rows above and below it
// use, so the section reads as one piece of green.
{
  const S2 = 'exports/klaviyo/welcome-e1/src-s2-83.webp';
  const Y0 = 700, Y1 = 1640, W2 = 1200;
  const { data, info } = await sharp(S2).extract({ left: 0, top: Y0, width: 1116, height: Y1 - Y0 }).resize({ width: W2 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const h = info.height;
  const rowAvg = (y) => { let c = [0, 0, 0]; for (let x = 0; x < W2; x++) for (let k = 0; k < 3; k++) c[k] += data[(y * W2 + x) * 3 + k]; return c.map((v) => Math.round(v / W2)); };
  const avgRows = (a, b) => { const acc = [0, 0, 0]; for (let y = a; y < b; y++) rowAvg(y).forEach((v, k) => (acc[k] += v)); return acc.map((v) => Math.round(v / (b - a))); };
  const topC = avgRows(0, 6), botC = avgRows(h - 6, h);
  const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
  const fade = (from, to, flat, up) => { for (let y = from; y < to; y++) { const t = (y - from) / (to - from); const k = up ? 1 - t * t * (3 - 2 * t) : t * t * (3 - 2 * t); for (let x = 0; x < W2; x++) { const i = (y * W2 + x) * 3; for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] * (1 - k) + flat[c] * k); } } };
  fade(0, Math.round(h * 0.12), topC, true);
  fade(Math.round(h * 0.9), h, botC, false);
  await sharp(data, { raw: info }).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/s2-product.jpg`);
  console.log('s2-product.jpg', W2 + 'x' + h, 'top green', hex(topC), 'bottom green', hex(botC));
}

// ── section 2: gold ingredient discs and the benefit glyphs ──────────────
for (const name of ['yerba-mate', 'l-theanine', 'lions-mane']) {
  const D = 112, G = 72;
  const glyph = await sharp(`public/brand/icons/${name}-forest.png`).resize({ width: G, height: G, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const disc = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="#E3BC62"/></svg>`);
  await sharp(disc).composite([{ input: glyph, left: (D - G) / 2, top: (D - G) / 2 }]).png().toFile(`${OUT}/disc-gold-${name}.png`);
}
// Simple line glyphs in forest, 2x for a 24px icon inside a gold pill.
const GLYPHS = {
  // antioxidants & vitamins: a leaf with a sparkle
  antioxidants: '<path d="M12 36c0-14 10-24 26-26-1 16-11 26-25 26z" fill="none" stroke="#004D27" stroke-width="3.4" stroke-linejoin="round"/><path d="M12 36l14-14" stroke="#004D27" stroke-width="3.4" stroke-linecap="round"/><path d="M36 28v8M32 32h8" stroke="#004D27" stroke-width="3" stroke-linecap="round"/>',
  // gut & immune support: a shield with a check
  immune: '<path d="M24 6l15 6v11c0 9-6.5 16-15 19-8.5-3-15-10-15-19V12z" fill="none" stroke="#004D27" stroke-width="3.4" stroke-linejoin="round"/><path d="M17 24l5 5 9-10" fill="none" stroke="#004D27" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',
  // metabolism support: a flame
  metabolism: '<path d="M24 42c-8 0-13-5.5-13-12.5 0-8 7-11 8-19 5 3 7 8 6.5 12 2-1.5 3.5-4 3.5-6.5 4.5 3.5 8 8.5 8 14 0 7-5 12-13 12z" fill="none" stroke="#004D27" stroke-width="3.4" stroke-linejoin="round"/><path d="M24 42c-3.5 0-5.5-2.5-5.5-5.5 0-3.5 3-5 3.5-8.5 3 2 5.5 5 5.5 8.5 0 3-1.5 5.5-3.5 5.5z" fill="none" stroke="#004D27" stroke-width="3" stroke-linejoin="round"/>',
};
for (const [k, d] of Object.entries(GLYPHS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">${d}</svg>`)).png().toFile(`${OUT}/glyph-${k}.png`);
}
console.log('gold discs + 3 benefit glyphs');

fs.copyFileSync('public/logo/lockup-milonga-green.png', `${OUT}/logo-green.png`);
console.log('logo-green.png', (await sharp(`${OUT}/logo-green.png`).metadata()).width + 'x' + (await sharp(`${OUT}/logo-green.png`).metadata()).height);
