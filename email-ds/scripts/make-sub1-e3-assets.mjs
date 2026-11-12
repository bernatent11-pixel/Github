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

// v2 (Bernat, 2026-11-12): the plan cards sit on his gold Mate Latte scene (src-gold-123.jpg), with the
// top-right pouch removed so the cards have room (src-gold-clean-hf.png: Higgsfield GPT Image 2.6 edit).
// The pouch and the latte close the section at the bottom.
await sharp('exports/klaviyo/sub1-e3/src-gold-clean-hf.png').resize(1200, 1607).jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/plans-bg.jpg`);
{
  const { data } = await sharp(`${OUT}/plans-bg.jpg`).extract({ left: 0, top: 0, width: 1200, height: 40 }).resize(1, 1).raw().toBuffer({ resolveWithObject: true });
  const { data: d2 } = await sharp(`${OUT}/plans-bg.jpg`).extract({ left: 0, top: 1560, width: 1200, height: 47 }).resize(1, 1).raw().toBuffer({ resolveWithObject: true });
  const hex = (d) => '#' + [...d].slice(0, 3).map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
  console.log('plans-bg.jpg top', hex(data), 'bottom', hex(d2));
}

// v3 (Bernat, 2026-11-12): the 15 -> 30 email's cards show his photos instead of the pouch cutouts:
//   plan-15.jpg  one pouch and milk poured into an iced latte (src-plan-15-124.jpg)
//   plan-30.jpg  the 30 servings shot: "Best seller", "30 servings, free frother + scoop" (src-plan-30-125.jpg)
// 440x440, shown at up to 210px.
for (const [src, out] of [['src-plan-15-124.jpg', 'plan-15.jpg'], ['src-plan-30-125.jpg', 'plan-30.jpg']]) {
  await sharp(`exports/klaviyo/sub1-e3/${src}`).resize(440, 440).jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}/${out}`);
  console.log(out, (await sharp(`${OUT}/${out}`).metadata()).size ?? '');
}
