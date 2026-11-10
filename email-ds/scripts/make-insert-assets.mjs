// Package insert cards (4 x 6 in, print) · art
//
// Cuts the three how-to step photos, sizes the forest canopy for the front, and draws the QR
// codes as vector SVG. Everything lands in exports/print/inserts/img, which
// scripts/make-insert-cards.mjs lays out into the print PDFs.
//
// Usage: node scripts/make-insert-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import QRCode from 'qrcode';

const OUT = 'exports/print/inserts/img';
fs.mkdirSync(OUT, { recursive: true });

// ── step photos ────────────────────────────────────────────────────────────────────────
// Crops of photos already approved in the post-purchase emails, one per step, cut to the tile's
// own aspect (224 x 180 at 3x). A tile prints about 1.04 in wide, so every crop lands near 600 dpi,
// and none is upscaled.
const TILE = { w: 672, h: 540 };
const STEPS = {
  'step-scoop.jpg': ['exports/klaviyo/pp1-e1/src-scoop-96.webp', { left: 862, top: 812, width: 631, height: 507 }],
  'step-pour.jpg': ['exports/klaviyo/sub1-e1/src-howto-107.webp', { left: 1180, top: 330, width: 820, height: 659 }],
  'step-froth.jpg': ['exports/klaviyo/sub1-e1/src-hero-106.webp', { left: 1380, top: 1085, width: 620, height: 498 }],
};
for (const [name, [src, region]] of Object.entries(STEPS)) {
  await sharp(src).extract(region).resize(TILE.w, TILE.h, { fit: 'cover', withoutEnlargement: true }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/${name}`);
  console.log('wrote', `${OUT}/${name}`);
}

// ── front: the forest canopy ───────────────────────────────────────────────────────────
// The pouch's own illustrated forest (canopy-band.png, already on the core greens, ground
// #004D27). The card is 4.25 in wide with bleed = 1275 px at 300 dpi; the source is 1080, so it
// goes up 1.18x. Flat cut-paper shapes take that without visible softening.
await sharp('public/brand/scene/canopy-band.png').resize(1275, null, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(`${OUT}/canopy.png`);
console.log('wrote', `${OUT}/canopy.png`);

// ── QR codes ───────────────────────────────────────────────────────────────────────────
// Short vanity paths on the store, NOT deep links: a printed code can't be edited, so each one
// points at a Shopify URL redirect (Online Store > Navigation > URL redirects) that can be
// re-aimed any time. Short URLs also keep the code at version 3 (29 x 29 modules), which is what
// lets it scan reliably at 0.75 in.
export const QR = {
  'qr-first-cup.svg': 'https://milonga.life/first-cup',
  'qr-review.svg': 'https://milonga.life/review',
};
for (const [name, url] of Object.entries(QR)) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  // one path, one module = one unit, no quiet zone (the layout adds it as padding)
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.modules.get(y, x)) d += `M${x} ${y}h1v1h-1z`;
  fs.writeFileSync(`${OUT}/${name}`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path fill="#004D27" d="${d}"/></svg>\n`);
  console.log('wrote', `${OUT}/${name}`, `(${url}, version ${qr.version}, ${n} modules)`);
}
