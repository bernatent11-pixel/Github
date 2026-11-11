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

// ── the offers (sections 2 and 3) ──
//   offers-bg.jpg  the scene's left side (plum ribbons on bronze), darkened so white and gold type
//                  read on it, like the website's Black Friday block. 1200 wide, CSS background (cover)
//   ml-photo.jpg   the Mate Latte pouch and a latte: the bottom of Bernat's gold scene (src-gold-110.jpg)
//   cans-photo.jpg the cans: three Lion's Mane (tilted, as shot) and three infused 10mg cans, on a warm
//                  gold glow, with soft shadows. Same size as ml-photo
{
  const left = await sharp(SRC).extract({ left: 0, top: 0, width: 760, height: H }).resize({ width: W }).raw().toBuffer({ resolveWithObject: true });
  const d = left.data;
  for (let i = 0; i < d.length; i += 3) { d[i] = Math.round(d[i] * 0.52 + 10); d[i + 1] = Math.round(d[i + 1] * 0.42 + 4); d[i + 2] = Math.round(d[i + 2] * 0.40 + 6); }
  await sharp(d, { raw: left.info }).jpeg(JPG).toFile(`${OUT}/offers-bg.jpg`);
}
const PW = 1040, PH = 620;
await sharp('exports/klaviyo/bf-2026/src-gold-110.jpg').extract({ left: 0, top: 1607 - 700, width: 1200, height: 700 })
  .resize(PW, PH, { fit: 'cover', position: 'bottom' }).jpeg(JPG).toFile(`${OUT}/ml-photo.jpg`);
{
  // warm glow
  const g = Buffer.alloc(PW * PH * 3);
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) {
    const dx = (x - PW / 2) / (PW * 0.62), dy = (y - PH * 0.42) / (PH * 0.9), t = Math.min(1, Math.sqrt(dx * dx + dy * dy));
    const a = [250, 224, 182], b = [214, 152, 92]; g.set(a.map((v, c) => Math.round(v + (b[c] - v) * t)), (y * PW + x) * 3);
  }
  const CANS = [
    ['can-acai-mint-energy-packshot.png', 390, 40, 120, -4], ['can-citrus-mango-energy-packshot.png', 410, 160, 92, 0], ['can-peach-ginger-energy-packshot.png', 390, 282, 124, 5],
    ['can-acai-mint-10mg-packshot.png', 380, 590, 118, -6], ['can-citrus-mango-10mg-packshot.png', 400, 715, 90, 0], ['can-peach-ginger-10mg-packshot.png', 380, 845, 120, 6],
  ];
  const comp = [], top = [];
  for (const [file, ch, left, tp, rot] of CANS) {
    const can = await sharp(`public/product/${file}`).resize({ height: ch }).rotate(rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const m = await sharp(can).metadata();
    const a = await sharp(can).extractChannel('alpha').raw().toBuffer();
    const sh = Buffer.alloc(m.width * m.height * 4);
    for (let i = 0; i < m.width * m.height; i++) { sh[i * 4] = 110; sh[i * 4 + 1] = 62; sh[i * 4 + 2] = 20; sh[i * 4 + 3] = Math.round(a[i] * 0.38); }
    const shadow = await sharp(sh, { raw: { width: m.width, height: m.height, channels: 4 } }).blur(14).png().toBuffer();
    const clip = async (buf, x, y) => {
      const l = Math.max(0, -x), t = Math.max(0, -y), ww = Math.min(m.width - l, PW - Math.max(0, x)), hh = Math.min(m.height - t, PH - Math.max(0, y));
      return { input: await sharp(buf).extract({ left: l, top: t, width: ww, height: hh }).toBuffer(), left: Math.max(0, x), top: Math.max(0, y) };
    };
    comp.push(await clip(shadow, left + 18, tp + 22)); top.push(await clip(can, left, tp));
  }
  await sharp(g, { raw: { width: PW, height: PH, channels: 3 } }).composite([...comp, ...top]).jpeg(JPG).toFile(`${OUT}/cans-photo.jpg`);
}
for (const f of ['offers-bg.jpg', 'ml-photo.jpg', 'cans-photo.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
