// Art for the two review thank-you emails (the "Review Reward" flows).
//
//   review-thanks-ml/img/bg.jpg     Bernat's gold Mate Latte scene (src-bg-110.jpg) as is: the pouch top
//                                   right, the pouch and a latte bottom, the copy in the empty middle.
//   review-thanks-cans/img/bg.jpg   Bernat's gold cans scene (src-bg-111.jpg) with the Mate Latte pouch
//                                   (bottom left) taken out and three Lion's Mane cans (Acai Mint,
//                                   Citrus Mango, Peach Ginger) put in its place, tilted like the cans
//                                   at the top, with a soft shadow.
// 1200px wide (600 in email).
// Usage: node scripts/make-review-thanks-assets.mjs
import sharp from 'sharp';

const JPG = { quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' };

// ── Mate Latte ──
await sharp('exports/klaviyo/review-thanks-ml/src-bg-110.jpg').resize({ width: 1200 }).jpeg(JPG).toFile('exports/klaviyo/review-thanks-ml/img/bg.jpg');

// ── cans: take the pouch out (a smooth fill from the surrounding gold), put the cans in ──
const SRC = 'exports/klaviyo/review-thanks-cans/src-bg-111.jpg';
const W = 1080, H = 1620;
// the pouch, generously (source pixels)
const BAG = [[0, 1050], [135, 1062], [545, 1180], [545, 1270], [455, 1620], [0, 1620]];
const inside = (x, y) => { let c = false; for (let i = 0, j = BAG.length - 1; i < BAG.length; j = i++) { const [xi, yi] = BAG[i], [xj, yj] = BAG[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
// fill at quarter size by relaxation (Laplace), then blend the fill back at full size
const q = 4, w = W / q, h = H / q;
const small = await sharp(SRC).resize(w, h).removeAlpha().raw().toBuffer();
const f = Float32Array.from(small);
const m = new Uint8Array(w * h);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) m[y * w + x] = inside(x * q + q / 2, y * q + q / 2) ? 1 : 0;
for (let i = 0; i < w * h; i++) if (m[i]) for (let c = 0; c < 3; c++) f[i * 3 + c] = 200;
for (let it = 0; it < 4000; it++) {
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!m[i]) continue;
    const nb = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < w && b < h).map(([a, b]) => b * w + a);
    for (let c = 0; c < 3; c++) { let s = 0; for (const n of nb) s += f[n * 3 + c]; f[i * 3 + c] = s / nb.length; }
  }
}
const fill = await sharp(Buffer.from(Uint8Array.from(f)), { raw: { width: w, height: h, channels: 3 } }).resize(W, H, { kernel: 'cubic' }).blur(6).raw().toBuffer();
const full = await sharp(SRC).removeAlpha().raw().toBuffer();
// soft-edged mask at full size
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><polygon points="${BAG.map((p) => p.join(',')).join(' ')}" fill="#fff"/></svg>`;
const mask = await sharp({ create: { width: W, height: H, channels: 3, background: '#000' } }).composite([{ input: Buffer.from(maskSvg) }]).blur(10).greyscale().raw().toBuffer();
const out = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H; i++) { const a = mask[i] / 255; for (let c = 0; c < 3; c++) out[i * 3 + c] = Math.round(full[i * 3 + c] * (1 - a) + fill[i * 3 + c] * a); }
let base = sharp(out, { raw: { width: W, height: H, channels: 3 } });

// the cans: [file, height, left, top, rotation]
const CANS = [
  ['can-acai-mint-energy-packshot.png', 500, -30, 1095, -6],
  ['can-citrus-mango-energy-packshot.png', 530, 150, 1055, 0],
  ['can-peach-ginger-energy-packshot.png', 500, 330, 1105, 7],
];
const layers = [];
for (const [file, ch, left, top, rot] of CANS) {
  const can = await sharp(`public/product/${file}`).resize({ height: ch }).rotate(rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .linear([1.0, 0.97, 0.9, 1], [4, 2, 0, 0]).png().toBuffer(); // a touch warmer, to sit in the gold light
  const cm = await sharp(can).metadata();
  const alpha = await sharp(can).extractChannel('alpha').raw().toBuffer();
  const shadowRaw = Buffer.alloc(cm.width * cm.height * 4);
  for (let i = 0; i < cm.width * cm.height; i++) { shadowRaw[i * 4] = 92; shadowRaw[i * 4 + 1] = 58; shadowRaw[i * 4 + 2] = 22; shadowRaw[i * 4 + 3] = Math.round(alpha[i] * 0.42); }
  const shadow = await sharp(shadowRaw, { raw: { width: cm.width, height: cm.height, channels: 4 } }).blur(16).png().toBuffer();
  const clip = async (buf, x, y) => { // keep layers inside the frame
    const l = Math.max(0, -x), t = Math.max(0, -y);
    const ww = Math.min(cm.width - l, W - Math.max(0, x)), hh = Math.min(cm.height - t, H - Math.max(0, y));
    return { input: await sharp(buf).extract({ left: l, top: t, width: ww, height: hh }).toBuffer(), left: Math.max(0, x), top: Math.max(0, y) };
  };
  layers.push({ shadow: await clip(shadow, left + 22, top + 26), can: await clip(can, left, top) });
}
const comp = [...layers.map((l) => l.shadow), ...layers.map((l) => l.can)];
const done = await sharp(await base.png().toBuffer()).composite(comp).toBuffer();
await sharp(done).resize({ width: 1200 }).jpeg(JPG).toFile('exports/klaviyo/review-thanks-cans/img/bg.jpg');
for (const p of ['exports/klaviyo/review-thanks-ml/img/bg.jpg', 'exports/klaviyo/review-thanks-cans/img/bg.jpg']) {
  const mm = await sharp(p).metadata(); console.log(p, mm.width + 'x' + mm.height);
}
