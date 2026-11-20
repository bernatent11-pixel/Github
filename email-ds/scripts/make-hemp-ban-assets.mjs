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
  const r = await sharp(`public/product/${src}`).trim({ threshold: 2 }).resize({ height: 580 }).png({ compressionLevel: 9 }).toFile(`${OUT}/${file}`);
  console.log(file, r.width + 'x' + r.height);
}

// ── v2 (Bernat, 2026-11-20) ──────────────────────────────────────────────────────────────────────────
// hero-bg.jpg  the van photo as the BACKGROUND of the whole first section: the full shot at 1200 wide
//              (600x1060), its top darkened into forest night so the logo, title, offer and text read on it
//              (type on a photo takes its ink from the photo: white on dark)
{
  // v2b: taller (600x1060) so the text ends above the cans, and the fade reaches down behind the paragraph
  const W = 1200, H = 2120;
  const base = await sharp(`${DIR}/src-van.webp`).extract({ left: 100, top: 0, width: 1132, height: 2000 }).resize({ width: W, height: H }).removeAlpha().raw().toBuffer();
  const N = [0x00, 0x2D, 0x17];
  for (let y = 0; y < H; y++) {
    const t = y / H; // 1 at the top -> 0 by 66%, eased
    const k = t >= 0.82 ? 0 : 0.93 * Math.pow(1 - t / 0.82, 0.9);
    if (!k) continue;
    for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { const i = (y * W + x) * 3 + c; base[i] = Math.round(base[i] * (1 - k) + N[c] * k); }
  }
  await sharp(base, { raw: { width: W, height: H, channels: 3 } }).jpeg(jpg).toFile(`${OUT}/hero-bg.jpg`);
  console.log('hero-bg.jpg 1200x2120 (600x1060)');
}
// what's in each can: gold line icons on the cards (72px = 36 in the email)
{
  const s = 'fill="none" stroke="#E3BC62" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const leaflet = (deg, ry) => `<ellipse cx="12" cy="${15 - ry}" rx="${(ry / 3.4).toFixed(2)}" ry="${ry}" transform="rotate(${deg} 12 15)" ${s}/>`;
  const ICONS = {
    thc: `${leaflet(0, 6.2)}${leaflet(-34, 5.2)}${leaflet(34, 5.2)}${leaflet(-72, 3.9)}${leaflet(72, 3.9)}<path d="M12 15v6" ${s}/>`,
    cbd: `<path d="M12 3.2c3.6 4.6 5.8 7.7 5.8 10.6a5.8 5.8 0 01-11.6 0c0-2.9 2.2-6 5.8-10.6z" ${s}/><path d="M9.3 14.2a2.8 2.8 0 002.6 2.6" ${s}/>`,
    theanine: `<path d="M12 4.5l5.2 3v6l-5.2 3-5.2-3v-6z" ${s}/><path d="M12 16.5v3.5M17.2 7.5l2.6-1.5" ${s}/><circle cx="12" cy="20.6" r=".9" ${s}/><circle cx="20.6" cy="5.6" r=".9" ${s}/>`,
    caffeine: `<path d="M13.2 2.8L6.4 13h5.1l-1.3 8.2L17.6 10.6h-5.2z" ${s}/>`,
    organic: `<path d="M12 21v-8.5" ${s}/><path d="M12 13.2C12 9 9.2 6.4 4.6 6.4c0 4.4 2.8 6.8 7.4 6.8z" ${s}/><path d="M12 11.4c0-3.8 2.6-6.2 7-6.2 0 4-2.6 6.2-7 6.2z" ${s}/>`,
  };
  for (const [k, d] of Object.entries(ICONS)) await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24">${d}</svg>`)).png().toFile(`${OUT}/ico-${k}.png`);
  console.log('icons: ico-thc, ico-cbd, ico-theanine, ico-caffeine, ico-organic');
}
// timer-mock.png: PREVIEW ONLY, how the live timer will look (21 days to Dec 11 from Nov 20). The email
// itself uses the real Sendtric timer (hosted.json "timer"); this file is never hosted.
{
  const box = (x, n, l) => `<rect x="${x}" y="0" width="128" height="128" rx="18" fill="#00351B" stroke="#E3BC62" stroke-opacity=".35" stroke-width="2"/>
<text x="${x + 64}" y="78" text-anchor="middle" font-family="Times New Roman, serif" font-weight="700" font-size="64" fill="#E3BC62">${n}</text>
<text x="${x + 64}" y="110" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="17" letter-spacing="2" fill="#F0EFDF">${l}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="128">${box(0, '21', 'DAYS')}${box(144, '08', 'HOURS')}${box(288, '42', 'MINS')}${box(432, '17', 'SECS')}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${OUT}/timer-mock.png`);
  console.log('timer-mock.png 560x128 (preview only)');
}
