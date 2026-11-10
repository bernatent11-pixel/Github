// Art for the "Mate Latte 101" campaign (everything else is reused from approved emails).
//
//   disc-gold-*.png    the three ingredient marks (brand icons, forest glyph) in shiny metallic-gold
//                      discs, for the first section, which sits on the pouring photo's gold wall.
//                      112px (56 in email)
//   ico-*.png          small line icons in near-black for the website-style purchase box:
//                      percent, truck, pause. 36px (18 in email)
//
// Usage: node scripts/make-ml101-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const OUT = 'exports/klaviyo/ml101/img';
fs.mkdirSync(OUT, { recursive: true });
// Metallic gold: a bright highlight top-left falling to deep old gold bottom-right, a darker rim,
// a thin light inner bevel and a soft sheen across the top half.
const D = 112, G = 66, R = D / 2;
const goldDisc = `<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}">
<defs>
  <linearGradient id="g" x1="0.15" y1="0.05" x2="0.85" y2="0.95">
    <stop offset="0" stop-color="#FFF1B8"/><stop offset="0.28" stop-color="#F2CF6B"/>
    <stop offset="0.55" stop-color="#D9A93A"/><stop offset="0.8" stop-color="#B9852A"/><stop offset="1" stop-color="#E2B54E"/>
  </linearGradient>
  <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FBE6A0"/><stop offset="0.5" stop-color="#A8771F"/><stop offset="1" stop-color="#8A5F14"/>
  </linearGradient>
  <radialGradient id="sheen" cx="0.35" cy="0.25" r="0.55">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.7"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>
</defs>
<circle cx="${R}" cy="${R}" r="${R}" fill="url(#rim)"/>
<circle cx="${R}" cy="${R}" r="${R - 3}" fill="url(#g)"/>
<circle cx="${R}" cy="${R}" r="${R - 3.5}" fill="none" stroke="#FFF4C8" stroke-opacity="0.55" stroke-width="1"/>
<ellipse cx="${R * 0.8}" cy="${R * 0.62}" rx="${R * 0.62}" ry="${R * 0.4}" fill="url(#sheen)"/>
</svg>`;
for (const name of ['yerba-mate', 'l-theanine', 'lions-mane']) {
  const glyph = await sharp(`public/brand/icons/${name}-forest.png`).resize({ width: G, height: G, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp(Buffer.from(goldDisc)).composite([{ input: glyph, left: (D - G) / 2, top: (D - G) / 2 }]).png().toFile(`${OUT}/disc-gold-${name}.png`);
  fs.rmSync(`${OUT}/disc-beige-${name}.png`, { force: true });
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
