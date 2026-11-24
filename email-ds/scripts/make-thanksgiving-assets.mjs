// Art for the Thanksgiving 2026 campaign.
//   hero.jpg      a Thanksgiving table with lattes, pie and leaves (Higgsfield, gpt_image_2_6, styled on Bernat's
//                 shared-lattes photo; src-table-hf.png 1792x2240). 1200x1500 (600x750); its top fades into the
//                 wall's own colour, which the headline rows above sit on (as in cart-e1).
//   m-kitchen.jpg Bernat's kitchen-morning shot, 4:5, 520x650 (260x325 in the email, like pp1-e1's moments)
//   m-iced.jpg    Bernat's iced-in-hand shot, 4:5, 520x650
//   colors.json   the wall colour
// Usage: node scripts/make-thanksgiving-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const DIR = 'exports/klaviyo/thanksgiving', OUT = `${DIR}/img`;
fs.mkdirSync(OUT, { recursive: true });
const jpg = { quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' };
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

{
  // v2: the photo's empty wall is trimmed (top 330 of 2240 rows) so the table sits closer to the headline
  const W = 1200, H = 1280;
  const { data } = await sharp(`${DIR}/src-table-hf.png`).extract({ left: 0, top: 330, width: 1792, height: 1910 }).resize({ width: W, height: H }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // the wall's colour: the band just below the top, across the middle (light patches avoided by averaging wide)
  const c = [0, 0, 0]; let n = 0;
  for (let y = 20; y < 90; y++) for (let x = 0; x < W; x++) { for (let k = 0; k < 3; k++) c[k] += data[(y * W + x) * 3 + k]; n++; }
  const wall = c.map((v) => v / n);
  const F = Math.round(H * 0.16);
  for (let y = 0; y < F; y++) { const t = y / F, k = 1 - t * t * (3 - 2 * t); for (let x = 0; x < W; x++) for (let j = 0; j < 3; j++) { const i = (y * W + x) * 3 + j; data[i] = Math.round(data[i] * (1 - k) + wall[j] * k); } }
  await sharp(data, { raw: { width: W, height: H, channels: 3 } }).jpeg(jpg).toFile(`${OUT}/hero.jpg`);
  fs.writeFileSync(`${DIR}/colors.json`, JSON.stringify({ wall: hex(wall) }, null, 2) + '\n');
  console.log('hero.jpg 1200x1280 (600x640), wall', hex(wall));
}
for (const [src, file, top] of [['public/product/kitchen-morning.jpg', 'm-kitchen.jpg', 0.25], ['public/product/iced-in-hand.jpg', 'm-iced.jpg', 0.35]]) {
  const m = await sharp(src).metadata();
  const h = Math.round(m.width * 1.25), y = Math.round((m.height - h) * top);
  await sharp(src).extract({ left: 0, top: y, width: m.width, height: h }).resize(520, 650).jpeg(jpg).toFile(`${OUT}/${file}`);
  console.log(file, '520x650');
}
