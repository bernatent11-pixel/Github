// Art for the shipping confirmation email ("Your Mate Latte is on its way").
//
//   hero.jpg   Bernat's windowsill shot (a hand on the pouch in the morning sun), landscape crop,
//              shown framed with rounded corners on the green hero. 1040x800 (520x400).
// The step icons, logo, footer mark and pouch thumbnail are already hosted for other emails.
//
// Usage: node scripts/make-ship-confirm-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/ship-confirm/img';
fs.mkdirSync(OUT, { recursive: true });
await sharp('exports/klaviyo/pp1-e3/src-final-101.webp').extract({ left: 0, top: 560, width: 1328, height: 1022 })
  .resize({ width: 1040, height: 800 }).removeAlpha().jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero.jpg`);
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
