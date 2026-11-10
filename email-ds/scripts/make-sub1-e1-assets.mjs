// Art for post-purchase SUBSCRIBERS email 1, "Welcome to your morning upgrade".
//
//   hero.jpg      the studio still life (mug, pouch, frother on deep green), cropped from just above
//                 the mug; its top and bottom fade into the flat greens of the rows around it, so the
//                 title row above and the button row below read as one photo. 1200x1324 (600x662).
//   bags.png      the three pouches (transparent), for "a fresh supply every month". 760 wide (380).
//   colors.json   the flat greens the photo fades into
//
// Usage: node scripts/make-sub1-e1-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/sub1-e1/img';
fs.mkdirSync(OUT, { recursive: true });
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
function rowMean(data, w, y0, y1) {
  const s = [0, 0, 0]; let n = 0;
  for (let y = y0; y < y1; y++) for (let x = 0; x < w; x++) { for (let c = 0; c < 3; c++) s[c] += data[(y * w + x) * 3 + c]; n++; }
  return s.map((v) => v / n);
}
function fade(data, w, y0, y1, col, toward) {
  for (let y = y0; y < y1; y++) {
    let t = (y - y0) / (y1 - y0); if (!toward) t = 1 - t;
    const k = t * t * (3 - 2 * t);
    for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) { const i = (y * w + x) * 3 + c; data[i] = Math.round(data[i] * (1 - k) + col[c] * k); }
  }
}

const colors = {};
{
  const { data, info } = await sharp('public/product/vs-stilllife.jpg').extract({ left: 0, top: 330, width: 832, height: 918 })
    .resize({ width: 1200, height: 1324, kernel: 'lanczos3' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const top = rowMean(data, w, 0, 10), bot = rowMean(data, w, h - 10, h);
  fade(data, w, 0, Math.round(h * 0.14), top, false);
  fade(data, w, h - Math.round(h * 0.12), h, bot, true);
  await sharp(data, { raw: info }).sharpen({ sigma: 0.6 }).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero.jpg`);
  colors.heroTop = hex(top); colors.heroBottom = hex(bot); colors.heroH = h / 2;
}
await sharp('public/product/three-bags.png').trim().resize({ width: 760 }).png().toFile(`${OUT}/bags.png`);
{ const m = await sharp(`${OUT}/bags.png`).metadata(); colors.bagsH = Math.round(m.height / 2); }
fs.writeFileSync('exports/klaviyo/sub1-e1/colors.json', JSON.stringify(colors, null, 2) + '\n');
console.log(colors);
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
