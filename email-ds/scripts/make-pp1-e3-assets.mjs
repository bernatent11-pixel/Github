// Art for post-purchase (one-time buyers) email 3, "Your bag's almost empty".
//
//   hero-bg.jpg   Bernat's pantry photo (the pouch going onto a shelf): the opening section's background
//   logo-beige.png the Milonga lockup in beige, for the green hero
//   bar-15.png    a month of mornings (30 day segments): the 15-serving bag covers half
//   bar-30.png    ... and the 30-serving bag covers all of it, for "15 servings vs 30"
//   step-*.png    forest discs with a gold line icon, for "how the club works" (on gold)
//   final.jpg     Bernat's windowsill shot (a hand on the pouch in the sun); its bottom fades
//                 into the cream of the closing text
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

// hero-bg.jpg: Bernat's pantry shot (src-hero-100.webp: a hand placing the pouch on a pantry
// shelf) as the opening section's BACKGROUND, 1200x1808 (600x904; 390x588 on phones). The live
// text sits on it: logo and title on a soft dark fade over the top, the line and the button on a
// dark fade over the bottom jars.
{
  const { data, info } = await sharp('exports/klaviyo/pp1-e3/src-hero-100.webp').resize({ width: 1200, height: 1808, fit: 'cover' })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const shade = (y, a) => { for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { const i = (y * W + x) * 3 + c; data[i] = Math.round(data[i] * (1 - a)); } };
  const T = Math.round(H * 0.4);
  for (let y = 0; y < T; y++) shade(y, 0.66 * Math.pow(1 - y / T, 1.1));
  const B = Math.round(H * 0.36);
  for (let y = H - B; y < H; y++) shade(y, 0.72 * Math.pow((y - (H - B)) / B, 0.9));
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/hero-bg.jpg`);
  fs.rmSync(`${OUT}/hero.jpg`, { force: true });
  colors.heroH = H / 2;
}
await sharp('public/logo/lockup-milonga-beige.png').resize({ height: 180 }).png().toFile(`${OUT}/logo-beige.png`);

// closing photo: Bernat's windowsill shot (src-final-101.webp: a hand on the pouch in morning sun,
// a green pitcher, limes), 1200x1220 (600x610); its bottom fades into the cream of the text
{
  const { data, info } = await sharp('exports/klaviyo/pp1-e3/src-final-101.webp')
    .extract({ left: 0, top: 430, width: 1328, height: 1350 }).resize({ width: 1200, height: 1220 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  fade(data, w, h - Math.round(h * 0.16), h, CREAM, true);
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/final.jpg`);
  colors.finalH = h / 2;
}

// a month of mornings, one segment a day (30): the 15-serving bag fills half, the 30-serving
// bag the whole month. 1040x40 (520x20 in the email; shown at the card's width).
{
  const N = 30, W = 1040, H = 40, SEG = 28, GAP = (W - N * SEG) / (N - 1);
  const bar = (filled, fill) => {
    let r = '';
    for (let i = 0; i < N; i++) r += `<rect x="${(i * (SEG + GAP)).toFixed(2)}" y="0" width="${SEG}" height="${H}" rx="7" fill="${i < filled ? fill : '#E4E0CC'}"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${r}</svg>`;
  };
  await sharp(Buffer.from(bar(15, '#C9A46E'))).png().toFile(`${OUT}/bar-15.png`);
  await sharp(Buffer.from(bar(30, '#004D27'))).png().toFile(`${OUT}/bar-30.png`);
  fs.rmSync(`${OUT}/cups.png`, { force: true });
  colors.barW = W / 2; colors.barH = H / 2;
}

// how the club works: forest line icons on gold discs (112px = 56 in the email)
const stroke = 'fill="none" stroke="#E3BC62" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const STEPS = {
  // save 30% on every order: a percent sign in a badge
  save: `<circle cx="12" cy="12" r="8.5" ${stroke}/><path d="M9 15l6-6" ${stroke}/><circle cx="9.3" cy="9.3" r="1.3" ${stroke}/><circle cx="14.7" cy="14.7" r="1.3" ${stroke}/>`,
  // a fresh supply every month: a box
  monthly: `<path d="M3.5 7.5l8.5-4 8.5 4v9l-8.5 4-8.5-4z" ${stroke}/><path d="M3.5 7.5l8.5 4 8.5-4M12 11.5v9" ${stroke}/>`,
  // you're in control: pause
  control: `<circle cx="12" cy="12" r="8.5" ${stroke}/><path d="M10 8.8v6.4M14 8.8v6.4" ${stroke}/>`,
};
for (const f of fs.readdirSync(OUT)) if (f.startsWith('step-')) fs.rmSync(`${OUT}/${f}`);
for (const [k, d] of Object.entries(STEPS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112"><circle cx="56" cy="56" r="56" fill="#004D27"/><g transform="translate(28 28) scale(2.333)">${d}</g></svg>`)).png().toFile(`${OUT}/step-${k}.png`);
}

fs.writeFileSync('exports/klaviyo/pp1-e3/colors.json', JSON.stringify(colors, null, 2) + '\n');
console.log(colors);
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height, m.hasAlpha ? 'alpha' : ''); }
