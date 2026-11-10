// Package insert cards (4 x 6 in, print) · art
//
// Cuts the three how-to step photos, fits the front's background to the card, and draws the QR
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
// own aspect (70.67 x 52 pt). Framed loose enough to show the whole hand and what it holds, and
// stopped just short of the pouch's lettering, so no label is cut mid-word. A tile prints about
// 0.98 in wide, so every crop lands at 600 dpi or more, and none is upscaled.
const TILE = { w: 636, h: 468 };
const STEPS = {
  'step-scoop.jpg': ['exports/klaviyo/pp1-e1/src-scoop-96.webp', { left: 760, top: 770, width: 733, height: 539 }],
  'step-pour.jpg': ['exports/klaviyo/sub1-e1/src-howto-107.webp', { left: 1050, top: 190, width: 950, height: 699 }],
  'step-froth.jpg': ['exports/klaviyo/sub1-e1/src-hero-106.webp', { left: 1290, top: 1000, width: 710, height: 522 }],
};
for (const [name, [src, region]] of Object.entries(STEPS)) {
  await sharp(src).extract(region).resize(TILE.w, TILE.h, { fit: 'cover', withoutEnlargement: true }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/${name}`);
  console.log('wrote', `${OUT}/${name}`);
}

// ── front: Bernat's background ─────────────────────────────────────────────────────────
// src-front-bg.jpg (1200 x 1607: gold satin, two pouches, a latte) is wider than the card
// (4.25 x 6.25 in with bleed). Cropping it to fit would cut "15 SERVINGS" off the top pouch and
// push the lower pouch's lettering into the trim, so it is made TALLER instead: rows 612-652 are
// the one band with nothing in them but the gradient (no ribbon, bubble, leaf or product; checked
// row by row), and stretching only those rows adds the missing height without touching anything
// drawn. The copy area, where the headline goes, is what grows.
{
  const SRC = 'exports/print/inserts/src-front-bg.jpg';
  const { width: w, height: h } = await sharp(SRC).metadata();
  const [y0, y1] = [612, 652];
  const fullH = Math.round(w * 1875 / 1275);
  const bandH = y1 - y0 + (fullH - h);
  const top = await sharp(SRC).extract({ left: 0, top: 0, width: w, height: y0 }).toBuffer();
  // blurred first: the band is a plain gradient, and stretching its JPEG grain 5x would draw
  // faint vertical streaks through the copy area
  const band = await sharp(SRC).extract({ left: 0, top: y0, width: w, height: y1 - y0 }).blur(5).resize(w, bandH, { fit: 'fill', kernel: 'cubic' }).toBuffer();
  const bottom = await sharp(SRC).extract({ left: 0, top: y1, width: w, height: h - y1 }).toBuffer();
  const tall = await sharp({ create: { width: w, height: fullH, channels: 3, background: '#E3BC62' } })
    .composite([{ input: top, left: 0, top: 0 }, { input: band, left: 0, top: y0 }, { input: bottom, left: 0, top: y0 + bandH }]).png().toBuffer();
  // 1275 x 1875 = the card with bleed at 300 dpi (the source is 1200 wide, so it goes up 1.06x)
  await sharp(tall).resize(1275, 1875, { kernel: 'lanczos3' }).jpeg({ quality: 93, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/front-bg.jpg`);
  console.log('wrote', `${OUT}/front-bg.jpg`, `(${w} x ${h} -> ${w} x ${fullH}, +${fullH - h} rows in the empty band)`);
}

// ── QR codes ───────────────────────────────────────────────────────────────────────────
// The video and the review point at short vanity paths on the store, NOT deep links: a printed
// code can't be edited, so each is a Shopify URL redirect (Online Store > Navigation > URL
// redirects) that can be re-aimed any time. The club code goes straight to the Mate Latte page,
// which exists today and keeps its address (Shopify redirects a renamed product by itself); its
// UTM tags are what make scans show up in analytics as their own source.
export const QR = {
  'qr-first-cup.svg': 'https://milonga.life/first-cup',
  'qr-review.svg': 'https://milonga.life/review',
  'qr-shop-a.svg': 'https://milonga.life/products/the-original-mate-latte?utm_source=insert&utm_medium=qr&utm_campaign=card_a',
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
