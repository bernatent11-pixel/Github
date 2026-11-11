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
  // the top 200px melt into one flat colour (#723A2D), which the strip under the hero ends on: no seam
  // whatever the crop (the cell shows this image as cover)
  const FLAT = [114, 58, 45];
  for (let y = 0; y < 200; y++) { const t = Math.pow(1 - y / 200, 1.4); for (let x = 0; x < W; x++) { const i = (y * W + x) * 3; for (let c = 0; c < 3; c++) d[i + c] = Math.round(d[i + c] * (1 - t) + FLAT[c] * t); } }
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

// ── the hero (Bernat, 2026-11-11): his finished Black Friday poster (src-hero-115.webp, 1333x2000, the
// copy baked in) replaces the band + scene as section 1.
//   hero.jpg     the poster, 1200x1800 (600x900 in email)
//   cta-bg.jpg   the strip under it for the button: each column starts as the poster's bottom row and
//                deepens into the top of the offers' background (#723A2D), so the poster flows into section 2.
//                Shown at 100% x 100%, so its columns line up with the poster's at any width.
await sharp('exports/klaviyo/bf-2026/src-hero-115.webp').resize(1200, 1800).jpeg(JPG).toFile(`${OUT}/hero.jpg`);
{
  const bottom = await sharp(`${OUT}/hero.jpg`).extract({ left: 0, top: 1797, width: 1200, height: 3 })
    .resize(40, 1).resize(1200, 1, { kernel: 'cubic' }).removeAlpha().raw().toBuffer(); // softened, so no streaks
  const CH = [114, 58, 45], SHH = 240, strip = Buffer.alloc(1200 * SHH * 3);
  for (let y = 0; y < SHH; y++) {
    const t = Math.pow(y / (SHH - 1), 0.9);
    for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) strip[(y * 1200 + x) * 3 + c] = Math.round(bottom[x * 3 + c] * (1 - t) + CH[c] * t);
  }
  await sharp(strip, { raw: { width: 1200, height: SHH, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/cta-bg.jpg`);
  // and the poster's last 50px ease into that same softened row, so the edge between them disappears
  const hero = await sharp('exports/klaviyo/bf-2026/src-hero-115.webp').resize(1200, 1800).removeAlpha().raw().toBuffer();
  for (let y = 1750; y < 1800; y++) { const t = Math.pow((y - 1750) / 49, 1.5); for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) { const i = (y * 1200 + x) * 3 + c; hero[i] = Math.round(hero[i] * (1 - t) + bottom[x * 3 + c] * t); } }
  await sharp(hero, { raw: { width: 1200, height: 1800, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/hero.jpg`);
}
for (const f of ['hero.jpg', 'cta-bg.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }

// ── v3 (2026-11-11): product art for the price cards, the Starter Kit list ──
//   bags-30.png / bags-60.png  2 and 4 Mate Latte pouches (transparent), between the struck price and "Save"
//   cans-lm.png / cans-inf.png three Lion's Mane / three infused cans (transparent), for the 24-pack cards
//   kit-*.png                  gold line icons for the Starter Kit list (percent, gift, truck, pause, card)
//   kit-tools.jpg              the frother and the scooper, cropped from Bernat's scene (src-scene-113.jpg)
{
  const CW2 = 480, CH2 = 320; // 240x160 in email
  const shadowOf = async (buf, op = 0.35, blur = 10) => {
    const m = await sharp(buf).metadata(), a = await sharp(buf).extractChannel('alpha').raw().toBuffer();
    const s = Buffer.alloc(m.width * m.height * 4);
    for (let i = 0; i < m.width * m.height; i++) { s[i * 4] = 70; s[i * 4 + 1] = 40; s[i * 4 + 2] = 20; s[i * 4 + 3] = Math.round(a[i] * op); }
    return sharp(s, { raw: { width: m.width, height: m.height, channels: 4 } }).blur(blur).png().toBuffer();
  };
  const group = async (items, out) => {
    // the products, then one soft shadow built from all of them on the full canvas (so it is never clipped)
    const ims = [];
    for (const [file, h, x, y, rot] of items) ims.push({ input: await sharp(`public/product/${file}`).resize({ height: h }).rotate(rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(), left: x, top: y });
    const blank = { create: { width: CW2, height: CH2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } };
    const prod = await sharp(blank).composite(ims).png().toBuffer();
    const a = await sharp(prod).extractChannel('alpha').raw().toBuffer();
    const sh = Buffer.alloc(CW2 * CH2 * 4);
    for (let y = 0; y < CH2; y++) for (let x = 0; x < CW2; x++) {
      const sx = x - 6, sy = y - 9, v = sx >= 0 && sy >= 0 ? a[sy * CW2 + sx] : 0, i = (y * CW2 + x) * 4;
      sh[i] = 70; sh[i + 1] = 40; sh[i + 2] = 20; sh[i + 3] = Math.round(v * 0.32);
    }
    const shadow = await sharp(sh, { raw: { width: CW2, height: CH2, channels: 4 } }).blur(9).png().toBuffer();
    await sharp(await sharp(shadow).composite([{ input: prod }]).png().toBuffer()).png({ palette: true, quality: 90, effort: 10 }).toFile(`${OUT}/${out}`);
  };
  const P = 'pouch-mate-latte-vanilla-packshot-corrected.png';
  await group([[P, 270, 92, 22, -6], [P, 280, 196, 18, 5]], 'bags-30.png');
  await group([[P, 236, 30, 20, -9], [P, 246, 118, 8, -3], [P, 246, 206, 8, 3], [P, 236, 286, 20, 9]], 'bags-60.png');
  await group([['can-acai-mint-energy-packshot.png', 250, 88, 40, -2], ['can-peach-ginger-energy-packshot.png', 250, 248, 40, 2], ['can-citrus-mango-energy-packshot.png', 270, 162, 22, 0]], 'cans-lm.png');
  await group([['can-acai-mint-10mg-packshot.png', 250, 112, 40, -7], ['can-peach-ginger-10mg-packshot.png', 250, 262, 40, 7], ['can-citrus-mango-10mg-packshot.png', 272, 184, 22, 0]], 'cans-inf.png');

  const st = 'fill="none" stroke="#B8862A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    percent: `<path d="M6 18L18 6" ${st}/><circle cx="7.5" cy="7.5" r="2.3" ${st}/><circle cx="16.5" cy="16.5" r="2.3" ${st}/>`,
    gift: `<rect x="3.5" y="8.5" width="17" height="4" rx="1" ${st}/><path d="M5 12.5v8h14v-8M12 8.5v12" ${st}/><path d="M12 8.5c-1.5-3.5-5.5-4-5.5-1.5S10 8.5 12 8.5zM12 8.5c1.5-3.5 5.5-4 5.5-1.5S14 8.5 12 8.5z" ${st}/>`,
    truck: `<path d="M2.8 7h10.4v8.6H2.8z" ${st}/><path d="M13.2 10h3.9l3.1 3.1v2.5h-7" ${st}/><circle cx="6.6" cy="16.8" r="1.7" ${st}/><circle cx="16.4" cy="16.8" r="1.7" ${st}/>`,
    pause: `<circle cx="12" cy="12" r="8.5" ${st}/><path d="M10 8.8v6.4M14 8.8v6.4" ${st}/>`,
    card: `<rect x="3" y="6" width="18" height="12.5" rx="2" ${st}/><path d="M3 10h18M6.5 15h4" ${st}/>`,
  };
  for (const [k, d] of Object.entries(ICONS)) await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">${d}</svg>`)).png().toFile(`${OUT}/kit-${k}.png`);
  await sharp('exports/klaviyo/bf-2026/src-scene-113.jpg').extract({ left: 730, top: 615, width: 530, height: 230 }).resize(1040, 451).jpeg(JPG).toFile(`${OUT}/kit-tools.jpg`);
}
for (const f of ['bags-30.png', 'bags-60.png', 'cans-lm.png', 'cans-inf.png', 'kit-tools.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }

// ── v3: section 2's background, from the gold Mate Latte scene with its liquid turned dark chocolate
// (src-gold-dark-hf.png: Higgsfield GPT Image 2.6 edit of src-gold-110.jpg, 2026-11-11), at 1200x1607:
//   ml-bg.jpg      rows 0-720 (the pouch top right, the dark liquid), its top 160 rows easing into the
//                  flat F the hero strip ends on, then row 720 repeated down to 3600 rows, so the cell can
//                  be as tall as the copy and cards need (shown 100% auto, top)
//   ml-bottom.jpg  rows 720-1607: the pouch and the latte, closing the section; its top row is row 720,
//                  so it continues the background seamlessly
//   cta-bg.jpg     (rebuilt) the strip under the hero now runs from the poster's bottom row into F
{
  const F = [190, 140, 85], J = 720, TALL = 3600;
  const src = await sharp('exports/klaviyo/bf-2026/src-gold-dark-hf.png').resize(1200, 1607).removeAlpha().raw().toBuffer();
  // R: row J softened sideways (no bubble or edge detail to smear into a vertical streak). The
  // extension eases from the real row J into R over 120 rows; ml-bottom eases from R back into the
  // real image over its first 120 rows, so the two meet on R exactly.
  const R = await sharp(src, { raw: { width: 1200, height: 1607, channels: 3 } }).extract({ left: 0, top: J - 10, width: 1200, height: 20 })
    .resize(24, 1).resize(1200, 1, { kernel: 'cubic' }).raw().toBuffer();
  // the bubble on the right edge near row J: carry the colour at x 1060 out to the edge, darkening
  // slightly like the scene's vignette
  for (let x = 1060; x < 1200; x++) for (let c = 0; c < 3; c++) R[x * 3 + c] = Math.round(R[1060 * 3 + c] * (1 - 0.12 * (x - 1060) / 140));
  const E = 120;
  const bg = Buffer.alloc(1200 * TALL * 3);
  for (let y = 0; y < TALL; y++) {
    // v4 (Bernat): no scene at the top any more (the pouch and the liquid pushed the title down): the
    // background is the softened row R from the start, its top 160 rows easing out of F
    const sy = J, t = y < 160 ? Math.pow(1 - y / 160, 1.4) : 0, u = 1;
    for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) {
      const v = src[(sy * 1200 + x) * 3 + c] * (1 - u) + R[x * 3 + c] * u;
      bg[(y * 1200 + x) * 3 + c] = Math.round(v * (1 - t) + F[c] * t);
    }
  }
  await sharp(bg, { raw: { width: 1200, height: TALL, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/ml-bg.jpg`);
  const lowH = 1607 - J, low = Buffer.alloc(1200 * lowH * 3);
  for (let y = 0; y < lowH; y++) {
    const u = y < E ? Math.pow(1 - y / E, 1.2) : 0;
    for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) low[(y * 1200 + x) * 3 + c] = Math.round(src[((J + y) * 1200 + x) * 3 + c] * (1 - u) + R[x * 3 + c] * u);
  }
  await sharp(low, { raw: { width: 1200, height: lowH, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/ml-bottom.jpg`);
  const bottom = await sharp(`${OUT}/hero.jpg`).extract({ left: 0, top: 1797, width: 1200, height: 3 }).resize(40, 1).resize(1200, 1, { kernel: 'cubic' }).removeAlpha().raw().toBuffer();
  const SHH = 240, strip = Buffer.alloc(1200 * SHH * 3);
  for (let y = 0; y < SHH; y++) { const t = Math.pow(y / (SHH - 1), 0.9); for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) strip[(y * 1200 + x) * 3 + c] = Math.round(bottom[x * 3 + c] * (1 - t) + F[c] * t); }
  await sharp(strip, { raw: { width: 1200, height: SHH, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/cta-bg.jpg`);
}
for (const f of ['ml-bg.jpg', 'ml-bottom.jpg', 'cta-bg.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }

// ── v5 (2026-11-11) ──
//   ml-scene.jpg  section 2's background: Bernat's gold scene as it is (src-gold-110.jpg), 1200 wide,
//                 shown as cover, never stretched
//   card-bg.jpg   the price cards: bronze with the plum ribbon, like the poster and the website's Starter
//                 Kit box (the scene's left side, src-scene-113.jpg x 0-700, y 300-858, a little darker)
await sharp('exports/klaviyo/bf-2026/src-gold-110.jpg').resize({ width: 1200 }).jpeg(JPG).toFile(`${OUT}/ml-scene.jpg`);
{
  const { data, info } = await sharp(SRC).extract({ left: 0, top: 260, width: 640, height: 598 }).resize(560, 840, { fit: 'cover' }).raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) { data[i] = Math.round(data[i] * 0.74); data[i + 1] = Math.round(data[i + 1] * 0.64); data[i + 2] = Math.round(data[i + 2] * 0.62); }
  await sharp(data, { raw: info }).jpeg(JPG).toFile(`${OUT}/card-bg.jpg`);
}
for (const f of ['ml-scene.jpg', 'card-bg.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }

// ── v6 (2026-11-11): the poster without its baked-in words (src-hero-clean-hf.png, Higgsfield edit), so the
// email sets the headline live: Black Friday / Our biggest sale of the year. / Up to 40% off site-wide.
//   hero-clean.jpg  1200x1800, section 1's background; its last 50 rows ease into a softened bottom row
//   cta-bg.jpg      (rebuilt) from that softened bottom row into F (section 2's top)
{
  const F = [190, 140, 85];
  const raw = await sharp('exports/klaviyo/bf-2026/src-hero-clean-hf.png').resize(1200, 1800, { fit: 'cover' }).removeAlpha().raw().toBuffer();
  const bottom = await sharp(raw, { raw: { width: 1200, height: 1800, channels: 3 } }).extract({ left: 0, top: 1797, width: 1200, height: 3 })
    .resize(40, 1).resize(1200, 1, { kernel: 'cubic' }).raw().toBuffer();
  for (let y = 1750; y < 1800; y++) { const t = Math.pow((y - 1750) / 49, 1.5); for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) { const i = (y * 1200 + x) * 3 + c; raw[i] = Math.round(raw[i] * (1 - t) + bottom[x * 3 + c] * t); } }
  await sharp(raw, { raw: { width: 1200, height: 1800, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/hero-clean.jpg`);
  const SHH = 240, strip = Buffer.alloc(1200 * SHH * 3);
  for (let y = 0; y < SHH; y++) { const t = Math.pow(y / (SHH - 1), 0.9); for (let x = 0; x < 1200; x++) for (let c = 0; c < 3; c++) strip[(y * 1200 + x) * 3 + c] = Math.round(bottom[x * 3 + c] * (1 - t) + F[c] * t); }
  await sharp(strip, { raw: { width: 1200, height: SHH, channels: 3 } }).jpeg(JPG).toFile(`${OUT}/cta-bg.jpg`);
}
for (const f of ['hero-clean.jpg', 'cta-bg.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height); }
