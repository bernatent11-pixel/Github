// Art for the Black Friday 2026 announcement email.
//
// Source: Bernat's wide bronze scene (src-scene-113.jpg, 2000x858): the Mate Latte pouch, the Lion's Mane
// cans, a mate gourd, a latte, the frother and the scoop on green and cream pedestals, with plum ribbons.
//
//   band.jpg    the copy's background: a soft bronze gradient (light on the left, copper on the right,
//               sampled from the scene), 1200x1400, shown full width (background-size 100% auto) so its colours
//               line up with the scene's at every width; taller than the copy ever gets)
//   scene.jpg   the products, cropped to email proportions (source x 700-1645, all of the height). The
//               infused cans on the right are left out of the crop; the 40px sliver of the first one that
//               the crop would catch is painted over with the wall behind it. The top fades into the
//               band's gradient so the two read as one picture. 1200 wide.
// Usage: node scripts/make-bf-2026-assets.mjs
import sharp from 'sharp';

const SRC = 'exports/klaviyo/bf-2026/src-scene-113.jpg', OUT = 'exports/klaviyo/bf-2026/img';
const JPG = { quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' };
const CX = 700, CW = 945, H = 858, W = 1200, S = W / CW, SH = Math.round(H * S);
const L = [242, 194, 148], R = [196, 124, 88]; // left and right of the gradient
const grad = (x) => L.map((l, c) => Math.round(l + (R[c] - l) * Math.pow(x / (W - 1), 1.1)));

// band
const BH = 1400;
const band = Buffer.alloc(W * BH * 3);
for (let y = 0; y < BH; y++) for (let x = 0; x < W; x++) { const g = grad(x); band.set(g, (y * W + x) * 3); }
await sharp(band, { raw: { width: W, height: BH, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/band.jpg`);

// scene: paint over the infused can sliver (source x 1606-1645, y 290-574) by carrying the wall
// colour at x 1600 across each row, then crop, scale and fade the top into the gradient
const src = await sharp(SRC).removeAlpha().raw().toBuffer();
const SW = 2000;
for (let y = 290; y < 575; y++) {
  const k = (y * SW + 1600) * 3;
  for (let x = 1606; x < 1650; x++) { const i = (y * SW + x) * 3; for (let c = 0; c < 3; c++) src[i + c] = src[k + c]; }
}
const cropped = await sharp(src, { raw: { width: SW, height: H, channels: 3 } })
  .extract({ left: CX, top: 0, width: CW, height: H }).resize(W, SH).raw().toBuffer();
const F = 260; // fade height (1200 scale)
for (let y = 0; y < F; y++) {
  const t = Math.pow(1 - y / F, 1.6);
  for (let x = 0; x < W; x++) { const g = grad(x), i = (y * W + x) * 3; for (let c = 0; c < 3; c++) cropped[i + c] = Math.round(cropped[i + c] * (1 - t) + g[c] * t); }
}
await sharp(cropped, { raw: { width: W, height: SH, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/scene.jpg`);
for (const f of ['band.jpg', 'scene.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
