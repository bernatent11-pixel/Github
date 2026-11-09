// Art for post-purchase (one-time buyers) email 1, "Your first cup, done right".
//
//   hero.jpg      Bernat's photo: the pouch in hand over marble, a latte beside it,
//                 fading into light marble at the bottom (the title sits there)
//   scoop.png     a hand scooping into a glass beside the pouch (cutout), for the steps
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

// hero: Bernat's photo (src-hero-95.webp: a hand holding the pouch over marble, a
// latte beside it). Its bottom fades into light marble (#F3F0EF) so the logo,
// the title and the intro sit on the same background, in rows below it.
{
  const MARBLE = [0xF3, 0xF0, 0xEF];
  const { data, info } = await sharp('exports/klaviyo/pp1-e1/src-hero-95.webp').extract({ left: 0, top: 260, width: 1116, height: 1488 }).resize({ width: 1200 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, F = Math.round(h * 0.3);
  for (let y = h - F; y < h; y++) {
    const t = (y - (h - F)) / F, k = Math.pow(t * t * (3 - 2 * t), 0.9);
    for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) { const i = (y * w + x) * 3 + c; data[i] = Math.round(data[i] * (1 - k) + MARBLE[c] * k); }
  }
  await sharp(data, { raw: info }).jpeg(jpg).toFile(`${OUT}/hero.jpg`);
}
await sharp('public/product/pouch-hand-pour-big.png').resize({ width: 1000 }).png().toFile(`${OUT}/scoop.png`);
await sharp('public/product/latte-cup-top.png').resize({ width: 400 }).png().toFile(`${OUT}/hot.png`);
await sharp('public/product/iced-in-hand.jpg').extract({ left: 150, top: 450, width: 1100, height: 1100 }).resize({ width: 400 }).jpeg(jpg).toFile(`${OUT}/iced.jpg`);

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
