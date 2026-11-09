// Art for the shipping confirmation email ("Your Mate Latte is on its way").
//
//   hero-bg.jpg  Bernat's shot of two pouches held up against a blue sky (src-hero-105.webp) as the
//                opening section's BACKGROUND, 1200x1808 (600x904; 390x588 on phones). The logo and
//                title sit on the open sky (a light shade over the top keeps them crisp); the line
//                and the button sit on a dark fade over the arms at the bottom.
// The step icons, logo, footer mark and pouch thumbnail are already hosted for other emails.
//
// Usage: node scripts/make-ship-confirm-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/ship-confirm/img';
fs.mkdirSync(OUT, { recursive: true });
{
  const { data, info } = await sharp('exports/klaviyo/ship-confirm/src-hero-105.webp').resize({ width: 1200, height: 1808, fit: 'cover' })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const shade = (y, a) => { for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { const i = (y * W + x) * 3 + c; data[i] = Math.round(data[i] * (1 - a)); } };
  const T = Math.round(H * 0.32);
  for (let y = 0; y < T; y++) shade(y, 0.3 * Math.pow(1 - y / T, 1.2));
  const B = Math.round(H * 0.34);
  for (let y = H - B; y < H; y++) shade(y, 0.74 * Math.pow((y - (H - B)) / B, 0.85));
  await sharp(data, { raw: info }).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-bg.jpg`);
}
fs.rmSync(`${OUT}/hero.jpg`, { force: true });
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
