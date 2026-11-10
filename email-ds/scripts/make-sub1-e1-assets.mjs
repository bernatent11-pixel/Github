// Art for post-purchase SUBSCRIBERS email 1, "Welcome to your morning upgrade".
//
//   hero.jpg      Bernat's shot of two pouches, Lion's Mane, vanilla and a frothed latte on warm cream
//                 (src-hero-106.webp); top and bottom fade into the flat creams of the title row above
//                 and the button row below. 1200x1020 (600x510).
//   howto.jpg     Bernat's shot of milk poured into an iced Mate Latte beside the pouch, gold wall and
//                 white table (src-howto-107.webp): the "three steps" section's background. Its top
//                 fades into the gold wall the title and steps sit on, its bottom into the table colour
//                 the hot/iced section continues on. 1200x1140 (600x570).
//   step-*.png    forest discs with a gold line icon: scoop, pour, froth (112px = 56 in the email)
//   bags.jpg      Bernat's three pouches, their white turned into the section's cream. 760 wide (380).
//   colors.json   the flat colours the photos fade into
//
// Usage: node scripts/make-sub1-e1-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/sub1-e1/img';
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
async function faded(src, crop, W, H, topK, botK, file) {
  const { data, info } = await sharp(src).extract(crop).resize({ width: W, height: H }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const top = rowMean(data, W, 0, 10), bot = rowMean(data, W, H - 10, H);
  fade(data, W, 0, Math.round(H * topK), top, false);
  fade(data, W, H - Math.round(H * botK), H, bot, true);
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/${file}`);
  return { top: hex(top), bot: hex(bot), h: H / 2 };
}

for (const f of ['hero.jpg', 'bags.png', 'step-1.png']) fs.rmSync(`${OUT}/${f}`, { force: true });
const colors = {};
{
  const r = await faded('exports/klaviyo/sub1-e1/src-hero-106.webp', { left: 0, top: 240, width: 2000, height: 1700 }, 1200, 1020, 0.14, 0.12, 'hero.jpg');
  colors.heroTop = r.top; colors.heroBottom = r.bot; colors.heroH = r.h;
}
{
  const r = await faded('exports/klaviyo/sub1-e1/src-howto-107.webp', { left: 0, top: 0, width: 2000, height: 1900 }, 1200, 1140, 0.1, 0.12, 'howto.jpg');
  colors.wall = r.top; colors.table = r.bot; colors.howtoH = r.h;
}
// Bernat's three-pouch shot on white (src-bags-108.jpg): trimmed, then multiplied by the section's
// cream so the white becomes exactly that cream (no box) and the pouches barely shift.
{
  const { data, info } = await sharp('exports/klaviyo/sub1-e1/src-bags-108.jpg').trim({ threshold: 12 }).resize({ width: 760 })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const CR = [0xF7, 0xF4, 0xEA];
  for (let i = 0; i < data.length; i++) data[i] = Math.round(data[i] * CR[i % 3] / 255);
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/bags.jpg`);
}
{ const m = await sharp(`${OUT}/bags.jpg`).metadata(); colors.bagsH = Math.round(m.height / 2); }

const stroke = 'fill="none" stroke="#E3BC62" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const STEPS = {
  // scoop: a measuring spoon with a heap
  scoop: `<path d="M3.5 13.5h10a5 5 0 01-10 0z" ${stroke}/><path d="M13.5 13.5l7-5.5" ${stroke}/><path d="M5.5 13.5c.6-2 2-3 3.5-3s2.9 1 3.5 3" ${stroke}/>`,
  // pour: a drop of milk
  pour: `<path d="M12 3.5c3.2 4.2 5.2 7 5.2 9.6a5.2 5.2 0 01-10.4 0c0-2.6 2-5.4 5.2-9.6z" ${stroke}/><path d="M9.6 13.6a2.5 2.5 0 002.4 2.3" ${stroke}/>`,
  // stir or froth: a handheld frother
  froth: `<path d="M12 2.8v9.4" ${stroke}/><path d="M10.4 2.8h3.2" ${stroke}/><circle cx="12" cy="16.2" r="4" ${stroke}/><path d="M9.8 16.2c.7-1.3 1.4-1.3 2.2 0s1.5 1.3 2.2 0" ${stroke}/>`,
};
for (const [k, d] of Object.entries(STEPS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112"><circle cx="56" cy="56" r="56" fill="#004D27"/><g transform="translate(28 28) scale(2.333)">${d}</g></svg>`)).png().toFile(`${OUT}/step-${k}.png`);
}
fs.writeFileSync('exports/klaviyo/sub1-e1/colors.json', JSON.stringify(colors, null, 2) + '\n');
console.log(colors);
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
