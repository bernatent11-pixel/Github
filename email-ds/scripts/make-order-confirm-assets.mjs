// Art for the order confirmation email.
//
//   hero.jpg       the Mate Latte pouch on deep green (studio shot), top and bottom faded
//                  into flat greens so the rows above and below read as one photo
//   step-*.png     forest discs with a gold line icon (on the gold section): confirmed, shipped, delivered
//   colors.json    the flat greens the photo fades into
//
// Usage: node scripts/make-order-confirm-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/order-confirm/img';
fs.mkdirSync(OUT, { recursive: true });
const jpg = { quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' };
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
  const { data, info } = await sharp('public/product/pouch-studio-green.png').removeAlpha()
    .extract({ left: 250, top: 290, width: 1500, height: 1360 }).resize({ width: 1200, height: 1088 }).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const top = rowMean(data, w, 0, 12), bot = rowMean(data, w, h - 12, h);
  fade(data, w, 0, Math.round(h * 0.18), top, false);
  fade(data, w, h - Math.round(h * 0.1), h, bot, true);
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/hero.jpg`);
  colors.heroTop = hex(top); colors.heroBottom = hex(bot); colors.heroH = h / 2;
}

const stroke = 'fill="none" stroke="#E3BC62" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const STEPS = {
  // order confirmed: a check in a circle
  confirmed: `<circle cx="12" cy="12" r="8.5" ${stroke}/><path d="M8.3 12.3l2.5 2.5 4.9-5.2" ${stroke}/>`,
  // packed and shipped: a delivery truck
  shipped: `<path d="M2.8 7h10.4v8.6H2.8z" ${stroke}/><path d="M13.2 10h3.9l3.1 3.1v2.5h-7" ${stroke}/><circle cx="6.6" cy="16.8" r="1.7" ${stroke}/><circle cx="16.4" cy="16.8" r="1.7" ${stroke}/>`,
  // at your door: a house
  delivered: `<path d="M4 11.2L12 4.5l8 6.7" ${stroke}/><path d="M6.2 9.6v9.4h11.6V9.6" ${stroke}/><path d="M10.2 19v-5h3.6v5" ${stroke}/>`,
};
for (const [k, d] of Object.entries(STEPS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112"><circle cx="56" cy="56" r="56" fill="#004D27"/><g transform="translate(28 28) scale(2.333)">${d}</g></svg>`)).png().toFile(`${OUT}/step-${k}.png`);
}
fs.writeFileSync('exports/klaviyo/order-confirm/colors.json', JSON.stringify(colors, null, 2) + '\n');
console.log(colors);
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
