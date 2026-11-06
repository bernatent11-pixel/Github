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
// middle. At 600px that middle is ~255px tall and the reveal needs ~350, so
// one plain band of the gradient (rows 530–650, no product, no bubble) is
// stretched by 200 rows. The products and the silk around them are untouched.
const SRC = 'exports/klaviyo/welcome-e1/src-hero-82.jpg';
const A = 530, B = 650, ADD = 201; // 1808 tall: an even 904 at 600px
const W = 1200, H0 = 1607;
const top = await sharp(SRC).extract({ left: 0, top: 0, width: W, height: A }).toBuffer();
const band = await sharp(SRC).extract({ left: 0, top: A, width: W, height: B - A }).resize({ width: W, height: B - A + ADD, fit: 'fill', kernel: 'cubic' }).toBuffer();
const bottom = await sharp(SRC).extract({ left: 0, top: B, width: W, height: H0 - B }).toBuffer();
const H = H0 + ADD;
await sharp({ create: { width: W, height: H, channels: 3, background: '#F6DFAE' } })
  .composite([{ input: top, left: 0, top: 0 }, { input: band, left: 0, top: A }, { input: bottom, left: 0, top: B + ADD }])
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-bg.jpg`);
console.log('hero-bg.jpg', W + 'x' + H, '(shows at 600x' + H / 2 + ')');

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
