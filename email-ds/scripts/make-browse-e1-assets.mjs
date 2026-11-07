// Art for browse abandonment email 1: Bernat's photo (the pouch beside an iced
// Mate Latte, milk pouring) with three arrows coming out of the cup.
//
// The arrows run down into an extension of the photo's own cream table (made
// from the photo's bottom rows, fading to the email's beige), and end at the
// image's bottom edge at x = 100, 300, 500 (of 600): the centres of the three
// live-text callout cards that sit directly under the image. So the arrows
// touch the cards on any screen width.
//
// Usage: node scripts/make-browse-e1-assets.mjs
import sharp from 'sharp';

const OUT = 'exports/klaviyo/browse-e1/img';
const SRC = 'exports/klaviyo/browse-e1/src-86.webp'; // 2000x2000
const W = 1200, P = 1200, E = 300; // 2x: photo 1200x1200, extension 300 (150px at 600)
const BEIGE = [0xF0, 0xEF, 0xDF];

const photo = await sharp(SRC).resize({ width: W }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { data } = photo;
// table colour: average of the photo's last 12 rows, per column (keeps the light falloff)
const col = new Float64Array(W * 3);
for (let y = P - 12; y < P; y++) for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) col[x * 3 + c] += data[(y * W + x) * 3 + c] / 12;
// soften it sideways so the extension is smooth
const sm = new Float64Array(W * 3);
for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { let s = 0, n = 0; for (let k = -40; k <= 40; k++) { const xx = Math.min(W - 1, Math.max(0, x + k)); s += col[xx * 3 + c]; n++; } sm[x * 3 + c] = s / n; }
const H = P + E;
const out = Buffer.alloc(W * H * 3);
data.copy(out, 0, 0, W * P * 3);
for (let y = 0; y < E; y++) {
  const t = y / (E - 1), k = t * t * (3 - 2 * t); // table colour -> beige
  for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) out[((P + y) * W + x) * 3 + c] = Math.round(sm[x * 3 + c] * (1 - k) + BEIGE[c] * k);
}

// arrows, in 600px coordinates scaled by 2
const F = '#004D27';
const paths = [
  // caffeine: from the cup's left side, under the pouch, to x=100
  { d: 'M330 468 C 300 500, 230 545, 160 580 S 100 640, 100 742', start: [330, 468] },
  // L-theanine: from the cup's bottom-left to x=300
  { d: 'M352 524 C 345 580, 300 620, 300 742', start: [352, 524] },
  // Lion's Mane: from the cup's bottom-right to x=500
  { d: 'M468 524 C 480 580, 500 620, 500 742', start: [468, 524] },
];
const ends = [100, 300, 500];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 600 ${H / 2}">
${paths.map((p) => `<path d="${p.d}" fill="none" stroke="${F}" stroke-width="2.4" stroke-linecap="round"/>`).join('\n')}
${paths.map((p) => `<circle cx="${p.start[0]}" cy="${p.start[1]}" r="5.5" fill="#FFFFFF" stroke="${F}" stroke-width="2.4"/>`).join('\n')}
${ends.map((x) => `<path d="M${x - 7} ${H / 2 - 12} L${x} ${H / 2} L${x + 7} ${H / 2 - 12}" fill="none" stroke="${F}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`).join('\n')}
</svg>`;
await sharp(out, { raw: { width: W, height: H, channels: 3 } })
  .composite([{ input: Buffer.from(svg) }])
  .jpeg({ quality: 85, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-diagram.jpg`);
console.log('hero-diagram.jpg', W + 'x' + H, '(shows at 600x' + H / 2 + ')');
