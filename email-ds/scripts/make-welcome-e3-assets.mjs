// Art for Welcome flow email 3 ("Last call: your 15% ends in 12 hours").
//
//   hero-bg.jpg    the opening section's background: Bernat's studio shot of
//                  the pouch and the glass on green (the same photo as E1's
//                  section 2). The empty green above the products is
//                  stretched a little so the last-call copy fits there, and
//                  the empty green below is trimmed.
//   logo-gold.png  the Milonga lockup in gold, for the dark green ground
//
// Usage: node scripts/make-welcome-e3-assets.mjs
import sharp from 'sharp';

const OUT = 'exports/klaviyo/welcome-e3/img';
const SRC = 'exports/klaviyo/welcome-e3/src-hero-83.webp'; // 1116x2000
const W = 1200;
const base = await sharp(SRC).resize({ width: W }).removeAlpha().png().toBuffer();
const { height: H0 } = await sharp(base).metadata(); // 2151
// rows 250–700 are plain green (no product, no shadow): stretch them by ADD
const A = 250, B = 700, ADD = 320, KEEP_BELOW = 1829 + 120 + 120; // glass base ~1829 after the stretch
const top = await sharp(base).extract({ left: 0, top: 0, width: W, height: A }).toBuffer();
const band = await sharp(base).extract({ left: 0, top: A, width: W, height: B - A }).resize({ width: W, height: B - A + ADD, fit: 'fill', kernel: 'cubic' }).toBuffer();
const bottom = await sharp(base).extract({ left: 0, top: B, width: W, height: H0 - B }).toBuffer();
const full = await sharp({ create: { width: W, height: H0 + ADD, channels: 3, background: '#025A41' } })
  .composite([{ input: top, left: 0, top: 0 }, { input: band, left: 0, top: A }, { input: bottom, left: 0, top: B + ADD }]).png().toBuffer();
const H = Math.min(KEEP_BELOW, H0 + ADD) & ~1; // even, so it halves cleanly
await sharp(full).extract({ left: 0, top: 0, width: W, height: H }).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-bg.jpg`);
console.log('hero-bg.jpg', W + 'x' + H, '(shows at 600x' + H / 2 + ')');
