// Art for post-purchase (one-time buyers) email 1, "Your first cup, done right".
//
//   hero-bg.jpg   Bernat's photo as the opening section's background (text on it)
//   logo-white.png the Milonga lockup in white, for the dark top of the photo
//   howto-bg.jpg  Bernat's scoop photo, full width: the how-to section's background
//   hot.png       a hot Mate Latte from above (cutout), for the hot card
//   iced.jpg      an iced Mate Latte in hand, square crop, for the iced card
//   icon-*.png    line icons (forest, 2x) for "when to drink it" and "what to expect"
//
// Usage: node scripts/make-pp1-e1-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/pp1-e1/img';
fs.mkdirSync(OUT, { recursive: true });
const jpg = { quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' };

// hero-bg.jpg: Bernat's photo (src-hero-95.webp: the pouch in hand over marble, a
// latte beside it) as the opening section's BACKGROUND. The live text sits on it:
// the white logo centered at the top and the white title left-aligned (a soft dark
// fade over the top half keeps them readable), the intro on the marble under the bag.
// 1200x1960 = 600x980 on desktop; phones show the same image at 390x637.
{
  const W = 1200, H = 1960;
  const { data, info } = await sharp('exports/klaviyo/pp1-e1/src-hero-95.webp').extract({ left: 0, top: 0, width: 1116, height: 1823 }).resize({ width: W, height: H, fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const S = Math.round(H * 0.5);
  for (let y = 0; y < S; y++) {
    const a = 0.62 * Math.pow(1 - y / S, 1.3);
    for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { const i = (y * W + x) * 3 + c; data[i] = Math.round(data[i] * (1 - a)); }
  }
  // and a soft dark fade over the bottom third, so the white thank-you text reads there
  const Bt = Math.round(H * 0.34);
  for (let y = H - Bt; y < H; y++) {
    const a = 0.6 * Math.pow((y - (H - Bt)) / Bt, 1.2);
    for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { const i = (y * W + x) * 3 + c; data[i] = Math.round(data[i] * (1 - a)); }
  }
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/hero-bg.jpg`);
}
await sharp('public/logo/lockup-milonga-white.png').resize({ height: 180 }).png().toFile(`${OUT}/logo-white.png`);
// how-to photo: Bernat's shot of a scoop going into a glass mug beside the pouch,
// full width as the how-to section's background. Its cream wall (#F2E1D4) and
// white table (#EBE5E7) are flat at the edges, so the title row above and the
// steps row below use those colours and the section reads as one photo.
{
  const WALL = [0xF2, 0xE1, 0xD4];
  const { data, info } = await sharp('exports/klaviyo/pp1-e1/src-scoop-96.webp').extract({ left: 0, top: 380, width: 1493, height: 1620 }).resize({ width: 1200, height: 1302, fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, F = Math.round(info.height * 0.12); // soften the top edge into the flat wall colour
  for (let y = 0; y < F; y++) { const t = y / F, k = 1 - t * t * (3 - 2 * t); for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) { const i = (y * w + x) * 3 + c; data[i] = Math.round(data[i] * (1 - k) + WALL[c] * k); } }
  // and the bottom into the warm beige of the hot/iced section, so it continues it exactly
  const TABLE = [0xF2, 0xEA, 0xDE], h = info.height, B = Math.round(h * 0.12); // warm beige for hot/iced
  for (let y = h - B; y < h; y++) { const t = (y - (h - B)) / B, k = t * t * (3 - 2 * t); for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) { const i = (y * w + x) * 3 + c; data[i] = Math.round(data[i] * (1 - k) + TABLE[c] * k); } }
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/howto-bg.jpg`);
}
await sharp('public/product/latte-cup-top.png').resize({ width: 400 }).png().toFile(`${OUT}/hot.png`);
await sharp('public/product/iced-in-hand.jpg').extract({ left: 150, top: 450, width: 1100, height: 1100 }).resize({ width: 400 }).jpeg(jpg).toFile(`${OUT}/iced.jpg`);

// hot and iced drinks: cutouts placed on one 400x410 transparent canvas each,
// standing on the bottom edge, so both show at the same size (200x205).
// Sources: Bernat's hot mug and iced glass photos (src-hot.jpg, src-iced.jpg), with the
// background removed in Higgsfield (the small hot photo upscaled first): drink-*-cutout.png.
// Both fit the same 380x400 box, so they show at the same height.
async function onCanvas(src, out, maxW, maxH) {
  const W = 400, H = 410;
  const fg = await sharp(src).trim().resize({ width: maxW, height: maxH, fit: 'inside' }).png().toBuffer();
  const m = await sharp(fg).metadata();
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: fg, left: Math.round((W - m.width) / 2), top: H - m.height }]).png().toFile(out);
}
const pick = (a, b) => (fs.existsSync(a) ? a : b);
await onCanvas(pick('exports/klaviyo/pp1-e1/drink-hot-cutout.png', 'public/product/latte-cup-top.png'), `${OUT}/drink-hot.png`, 380, 400);
await onCanvas(pick('exports/klaviyo/pp1-e1/drink-iced-cutout.png', 'public/product/iced-hand-cutout.png'), `${OUT}/drink-iced.png`, 380, 400);

// "when to enjoy it" photos (Bernat): morning on the balcony, focus at the laptop,
// a round for friends. 4:5 crops, 520x650 = 260x325 in the email.
for (const [name, src, x, y] of [['morning', 'src-moment-morning-97.webp', 220, 700], ['work', 'src-moment-work-99.webp', 40, 470], ['friends', 'src-moment-friends-98.webp', 260, 480]]) {
  await sharp(`exports/klaviyo/pp1-e1/${src}`).extract({ left: x, top: y, width: 900, height: 1125 }).resize({ width: 520 }).jpeg(jpg).toFile(`${OUT}/moment-${name}.jpg`);
}

const stroke = 'fill="none" stroke="#004D27" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  // when to drink it: a sun coming up
  sun: `<path d="M4 17h16" ${stroke}/><path d="M7.5 17a4.5 4.5 0 019 0" ${stroke}/><path d="M12 6.5v2.5M5.6 9.6l1.7 1.7M18.4 9.6l-1.7 1.7M3 13.5h2M19 13.5h2" ${stroke}/>`,
  // what to expect: a sparkle
  sparkle: `<path d="M12 3.5l1.9 5.2 5.2 1.9-5.2 1.9-1.9 5.2-1.9-5.2-5.2-1.9 5.2-1.9z" ${stroke}/><path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" ${stroke}/>`,
};
for (const [k, d] of Object.entries(ICONS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24">${d}</svg>`)).png().toFile(`${OUT}/icon-${k}.png`);
}
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height, m.hasAlpha ? 'alpha' : ''); }
