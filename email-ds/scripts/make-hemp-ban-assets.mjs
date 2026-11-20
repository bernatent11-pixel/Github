// Art for the "Stock up before the hemp ban" campaign (Infused cans, 21+).
//
//   hero.jpg      Bernat's van photo (src-van.webp, 1333x2000): friends opening Infused cans, a cooler of cans
//                 below. Cropped from the people down (rows 470-2000), 1200 wide (600 in the email).
//   can-10.png    Infused Regular 10mg studio can (public/product/can-infused-10mg-studio.png), 2x
//   can-5.png     Infused Light 5mg studio can (public/product/can-infused-5mg-studio.png), 2x
//
// Usage: node scripts/make-hemp-ban-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const DIR = 'exports/klaviyo/hemp-ban';
const OUT = `${DIR}/img`;
fs.mkdirSync(OUT, { recursive: true });
const jpg = { quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' };

const hero = await sharp(`${DIR}/src-van.webp`).extract({ left: 0, top: 470, width: 1333, height: 1530 }).resize({ width: 1200 }).jpeg(jpg).toFile(`${OUT}/hero.jpg`);
console.log('hero.jpg', hero.width + 'x' + hero.height, '(shows at ' + hero.width / 2 + 'x' + Math.round(hero.height / 2) + ')');
for (const [src, file] of [['can-infused-10mg-studio.png', 'can-10.png'], ['can-infused-5mg-studio.png', 'can-5.png']]) {
  const r = await sharp(`public/product/${src}`).trim({ threshold: 2 }).resize({ height: 460 }).png({ compressionLevel: 9 }).toFile(`${OUT}/${file}`);
  console.log(file, r.width + 'x' + r.height);
}
