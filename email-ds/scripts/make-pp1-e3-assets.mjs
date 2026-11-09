// Art for post-purchase (one-time buyers) email 3, "Your bag's almost empty".
//
//   hero.jpg      the pouch on deep green (studio shot); top and bottom fade into flat
//                 greens, so the title row above and the button row below read as one photo
//   logo-beige.png the Milonga lockup in beige, for the green hero
//   cups.png      15 cups in a row: the ones already had (empty outlines) and the last few
//                 still to go (full), for "15 cups go fast"
//   step-*.png    gold discs with a forest line icon, for "how the club works"
//   final.jpg     the kitchen counter: latte, iced latte, pouch and a nearly empty scoop;
//                 its bottom fades into the cream of the closing text
//   colors.json   the flat colours the photo edges fade into
//
// Usage: node scripts/make-pp1-e3-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/pp1-e3/img';
fs.mkdirSync(OUT, { recursive: true });
const jpg = { quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' };
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
const CREAM = [0xF7, 0xF4, 0xEA];

// mean colour of rows [y0, y1) of a raw RGB buffer
function rowMean(data, w, y0, y1) {
  const s = [0, 0, 0]; let n = 0;
  for (let y = y0; y < y1; y++) for (let x = 0; x < w; x++) { for (let c = 0; c < 3; c++) s[c] += data[(y * w + x) * 3 + c]; n++; }
  return s.map((v) => v / n);
}
// blend rows toward a flat colour: k goes 0 -> 1 across [y0, y1) (or 1 -> 0 when reversed)
function fade(data, w, y0, y1, col, toward) {
  for (let y = y0; y < y1; y++) {
    let t = (y - y0) / (y1 - y0); if (!toward) t = 1 - t;
    const k = t * t * (3 - 2 * t);
    for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) { const i = (y * w + x) * 3 + c; data[i] = Math.round(data[i] * (1 - k) + col[c] * k); }
  }
}

const colors = {};

// hero: the pouch on green, 1200x1200 (600x600 in the email)
{
  const { data, info } = await sharp('public/product/pouch-studio-green.png').removeAlpha()
    .extract({ left: 250, top: 290, width: 1500, height: 1500 }).resize({ width: 1200, height: 1200 }).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const top = rowMean(data, w, 0, 12), bot = rowMean(data, w, h - 12, h);
  fade(data, w, 0, Math.round(h * 0.18), top, false);
  fade(data, w, h - Math.round(h * 0.16), h, bot, true);
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/hero.jpg`);
  colors.heroTop = hex(top); colors.heroBottom = hex(bot); colors.heroH = h / 2;
}
await sharp('public/logo/lockup-milonga-beige.png').resize({ height: 180 }).png().toFile(`${OUT}/logo-beige.png`);

// closing photo: the kitchen counter, 1200x1020 (600x510), bottom fades into cream
{
  const { data, info } = await sharp('public/product/latte-counter.jpg')
    .extract({ left: 0, top: 560, width: 1400, height: 1190 }).resize({ width: 1200, height: 1020 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  fade(data, w, h - Math.round(h * 0.16), h, CREAM, true);
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/final.jpg`);
  colors.finalH = h / 2;
}

// 15 cups: 11 had (empty outlines), 4 still to go (full of latte). 2x for retina.
{
  const N = 15, HAD = 11, CW = 56, GAP = 12, W = N * CW + (N - 1) * GAP, H = 64;
  const cup = (x, full) => {
    const body = `M${x + 6} 14 h36 l-3 36 a6 6 0 0 1 -6 5.5 h-18 a6 6 0 0 1 -6 -5.5 z`;
    const handle = `M${x + 41.5} 22 h4 a7 7 0 0 1 0 14 h-5.2`;
    return full
      ? `<path d="${body}" fill="#D9B98C" stroke="#004D27" stroke-width="3" stroke-linejoin="round"/><path d="M${x + 7} 20 h34" stroke="#F3E6CF" stroke-width="5" stroke-linecap="round"/><path d="${handle}" fill="none" stroke="#004D27" stroke-width="3" stroke-linecap="round"/>`
      : `<path d="${body}" fill="none" stroke="#C9C5AE" stroke-width="3" stroke-linejoin="round"/><path d="${handle}" fill="none" stroke="#C9C5AE" stroke-width="3" stroke-linecap="round"/>`;
  };
  let svg = '';
  for (let i = 0; i < N; i++) svg += cup(i * (CW + GAP), i >= HAD);
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${svg}</svg>`)).png().toFile(`${OUT}/cups.png`);
  colors.cupsW = W / 2; colors.cupsH = H / 2;
}

// how the club works: forest line icons on gold discs (112px = 56 in the email)
const stroke = 'fill="none" stroke="#004D27" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const STEPS = {
  // pick your size: a tag with a percent
  size: `<path d="M3.5 12.2V5.5a2 2 0 012-2h6.7l8.3 8.3a2 2 0 010 2.8l-5.9 5.9a2 2 0 01-2.8 0z" ${stroke}/><circle cx="8" cy="8" r="1.3" ${stroke}/><path d="M10.5 15.5l5-5" ${stroke}/>`,
  // it shows up monthly: a box with a calendar loop arrow
  monthly: `<path d="M3.5 7.5l8.5-4 8.5 4v9l-8.5 4-8.5-4z" ${stroke}/><path d="M3.5 7.5l8.5 4 8.5-4M12 11.5v9" ${stroke}/>`,
  // you're in control: pause
  control: `<circle cx="12" cy="12" r="8.5" ${stroke}/><path d="M10 8.8v6.4M14 8.8v6.4" ${stroke}/>`,
};
for (const [k, d] of Object.entries(STEPS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112"><circle cx="56" cy="56" r="56" fill="#E3BC62"/><g transform="translate(28 28) scale(2.333)">${d}</g></svg>`)).png().toFile(`${OUT}/step-${k}.png`);
}

fs.writeFileSync('exports/klaviyo/pp1-e3/colors.json', JSON.stringify(colors, null, 2) + '\n');
console.log(colors);
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height, m.hasAlpha ? 'alpha' : ''); }
