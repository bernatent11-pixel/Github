// Art for the "Mate Latte 101" campaign (everything else is reused from approved emails).
//
//   disc-forest-*.png  the three ingredient marks (brand icons, gold glyph) in forest discs, for the
//                      first section, which sits on the pouring photo's gold wall. 112px (56 in email)
//   ico-*.png          small line icons in near-black for the website-style purchase box:
//                      percent, truck, pause. 36px (18 in email)
//
// Usage: node scripts/make-ml101-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/ml101/img';
fs.mkdirSync(OUT, { recursive: true });
for (const name of ['yerba-mate', 'l-theanine', 'lions-mane']) {
  const D = 112, G = 72;
  const glyph = await sharp(`public/brand/icons/${name}-gold.png`).resize({ width: G, height: G, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const disc = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="#004D27"/></svg>`);
  await sharp(disc).composite([{ input: glyph, left: (D - G) / 2, top: (D - G) / 2 }]).png().toFile(`${OUT}/disc-forest-${name}.png`);
}
const st = 'fill="none" stroke="#1E1E1E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  percent: `<path d="M6 18L18 6" ${st}/><circle cx="7.5" cy="7.5" r="2.3" ${st}/><circle cx="16.5" cy="16.5" r="2.3" ${st}/>`,
  truck: `<path d="M2.8 7h10.4v8.6H2.8z" ${st}/><path d="M13.2 10h3.9l3.1 3.1v2.5h-7" ${st}/><circle cx="6.6" cy="16.8" r="1.7" ${st}/><circle cx="16.4" cy="16.8" r="1.7" ${st}/>`,
  pause: `<circle cx="12" cy="12" r="8.5" ${st}/><path d="M10 8.8v6.4M14 8.8v6.4" ${st}/>`,
};
for (const [k, d] of Object.entries(ICONS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">${d}</svg>`)).png().toFile(`${OUT}/ico-${k}.png`);
}
for (const f of fs.readdirSync(OUT)) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
