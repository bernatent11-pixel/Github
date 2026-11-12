// Post-purchase · Mate Mornings Club SUBSCRIBERS · Email 3 · product art
//   bags-15.png  one Mate Latte pouch (transparent, soft shadow), same canvas and style as bf-2026's
//                bags-30.png / bags-60.png (2 and 4 pouches), which E3 reuses as they are hosted.
// Usage: node scripts/make-sub1-e3-assets.mjs
import sharp from 'sharp';
const OUT = 'exports/klaviyo/sub1-e3/img';
const CW = 480, CH = 320;
const P = 'pouch-mate-latte-vanilla-packshot-corrected.png';
const ims = [{ input: await sharp(`public/product/${P}`).resize({ height: 284 }).rotate(-3, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(), left: 0, top: 16 }];
const pm = await sharp(ims[0].input).metadata();
ims[0].left = Math.round((CW - pm.width) / 2);
const blank = { create: { width: CW, height: CH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } };
const prod = await sharp(blank).composite(ims).png().toBuffer();
const a = await sharp(prod).extractChannel('alpha').raw().toBuffer();
const sh = Buffer.alloc(CW * CH * 4);
for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
  const sx = x - 6, sy = y - 9, v = sx >= 0 && sy >= 0 ? a[sy * CW + sx] : 0, i = (y * CW + x) * 4;
  sh[i] = 70; sh[i + 1] = 40; sh[i + 2] = 20; sh[i + 3] = Math.round(v * 0.32);
}
const shadow = await sharp(sh, { raw: { width: CW, height: CH, channels: 4 } }).blur(9).png().toBuffer();
await sharp(await sharp(shadow).composite([{ input: prod }]).png().toBuffer()).png({ palette: true, quality: 90, effort: 10 }).toFile(`${OUT}/bags-15.png`);
const m = await sharp(`${OUT}/bags-15.png`).metadata(); console.log('bags-15.png', m.width + 'x' + m.height);
