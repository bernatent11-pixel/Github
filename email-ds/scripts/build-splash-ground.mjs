import sharp from 'sharp';

// Slide 5's ground, built in two moves.
//
// 1 · FLATTEN THE VIGNETTE. The native still life is lit like a studio shot:
//    its background runs (2,43,38) in the middle and (0,5,6) in the corners —
//    nearly black. Scaled down inside a 4:5 frame that reads as a dark border
//    around a brighter picture. So the vignette comes out FIRST, and the
//    correction is ADDITIVE, not a gain: a corner needs about 10x to reach the
//    middle's value, and multiplying by 10 amplifies the JPEG noise with it.
//    Subtracting the background field and adding a flat one back leaves the
//    noise at its own amplitude and the subject at its own contrast.
//
//    The field itself is a normalized convolution — blur(I·M)/blur(M) with the
//    bright subject masked out — so the estimate is built from background
//    pixels only and filled in underneath the pouch from the ring around it.
//    A plain blur would bulge upward under the splash and punch a dark hole
//    there instead.
//
// 2 · PLACE IT BY ITS CONTENT. Measured on the source (1500 x 2003): the
//    composition — topmost mate leaf down to the LION'S MANE label — runs
//    y 280 to 1700. Placing by content rather than by the picture's edges puts
//    that band at 157-645 of the 750-unit slide, which leaves 41 units of air
//    above it for the title and 44 below for the spec line.
const SRC = 'public/product/ingredient-splash.jpg';   // run from the repo root
// Built at 3.6x the 600 x 750 design units rather than the 1.8x a feed slide
// needs, so the 4K export resamples this once instead of stretching a 1080px
// file almost threefold.
const U = 3.6, W = Math.round(600 * U), H = Math.round(750 * U);
const CONTENT_TOP = 280, CONTENT_BOT = 1700;
const BAND_TOP = Math.round(157 * U), BAND_BOT = Math.round(645 * U);
const SW = 375, SH = 501, SIGMA = 25;       // field is modelled at quarter size
const BG_MAX = 45;                          // luminance above this is subject
const GROW = 5;                             // and its halo, grown at 1/4 size
const SHADOW = 0.45;                        // how much of a dark rim survives
const FADE = 26;                            // how far above its local ground a
                                            // pixel has to sit to count as art
// The flat ground. The middle of the native background measures (2,43,38);
// this is that colour lifted about a third, which is far brighter than the
// (0,5,6) corners it replaces while still being the photograph's own green.
const TARGET = [4, 57, 50];

const src = sharp(SRC);
const { width: FW, height: FH } = await src.metadata();

/* ── the background field ─────────────────────────────────────────────────── */
const small = await sharp(SRC).resize(SW, SH).removeAlpha().raw().toBuffer();
// The subject is grown before it is excluded. Every bright object on this
// picture carries a glow a few pixels wide, and background samples taken
// inside that glow pull the field up — which then over-subtracts and leaves a
// dark bruise under the composition. Blurring the subject mask and
// re-thresholding it low dilates the subject so the glow goes with it.
const raw3 = { raw: { width: SW, height: SH, channels: 3 } };
const raw1 = { raw: { width: SW, height: SH, channels: 1 } };
const subj = Buffer.alloc(SW * SH);
for (let i = 0, p = 0; p < SW * SH; p++, i += 3) {
  const lum = 0.299 * small[i] + 0.587 * small[i + 1] + 0.114 * small[i + 2];
  if (lum >= BG_MAX) subj[p] = 255;
}
const grown = await sharp(subj, raw1).blur(GROW).raw().toBuffer();

const masked = Buffer.alloc(SW * SH * 3);
const mask = Buffer.alloc(SW * SH);
for (let i = 0, p = 0; p < SW * SH; p++, i += 3) {
  if (grown[p] < 12) {
    mask[p] = 255;
    masked[i] = small[i]; masked[i + 1] = small[i + 1]; masked[i + 2] = small[i + 2];
  }
}
const A = await sharp(masked, raw3).blur(SIGMA).raw().toBuffer();
const B = await sharp(mask, raw1).blur(SIGMA).raw().toBuffer();

const field = Buffer.alloc(SW * SH * 3);
for (let i = 0, p = 0; p < SW * SH; p++, i += 3) {
  const w = Math.max(B[p], 1) / 255;
  for (let c = 0; c < 3; c++) field[i + c] = Math.min(255, Math.round(A[i + c] / w));
}
const fieldFull = await sharp(field, raw3).resize(FW, FH).blur(6).raw().toBuffer();

console.log('flat ground rgb(' + TARGET.join(',') + ')');

/* ── flatten ──────────────────────────────────────────────────────────────── */
const full = await sharp(SRC).removeAlpha().raw().toBuffer();
// Only the GROUND is rewritten. Shifting every pixel by (TARGET - field) puts
// the same +50 into the green and blue of the pouch and the milk splash as it
// does into the background, and the whole still life turns mint. So the shift
// is weighted by how close a pixel sits to its own local background: a pixel
// at or below the field is ground and moves the whole way, one more than 26
// above it is art and does not move at all.
// A plain shift keeps every difference intact, which means the dark rim each
// cut-out object carries — 15 or so below its own local ground — is still 15
// below a ground that is now half again as bright, and it reads as a black
// halo. Residuals on the shadow side are compressed to 45% so the rim stays a
// rim instead of becoming an outline.
const flat = Buffer.alloc(full.length);
for (let i = 0; i < full.length; i += 3) {
  const d =
    (0.299 * full[i] + 0.587 * full[i + 1] + 0.114 * full[i + 2]) -
    (0.299 * fieldFull[i] + 0.587 * fieldFull[i + 1] + 0.114 * fieldFull[i + 2]);
  const w = d <= 0 ? 1 : d >= FADE ? 0 : 1 - d / FADE;
  const k = d <= 0 ? SHADOW : 1;
  for (let c = 0; c < 3; c++) {
    const lifted = TARGET[c] + (full[i + c] - fieldFull[i + c]) * k;
    flat[i + c] = Math.max(0, Math.min(255,
      Math.round(full[i + c] * (1 - w) + lifted * w)));
  }
}

/* ── place ────────────────────────────────────────────────────────────────── */
const scale = (BAND_BOT - BAND_TOP) / (CONTENT_BOT - CONTENT_TOP);
const IW = Math.round(FW * scale), IH = Math.round(FH * scale);
let top = Math.round(BAND_TOP - CONTENT_TOP * scale);
if (top + IH > H) top = H - IH;
const left = Math.round((W - IW) / 2);

const pic = await sharp(flat, { raw: { width: FW, height: FH, channels: 3 } })
  .resize(IW, IH).png().toBuffer();

await sharp({ create: { width: W, height: H, channels: 3, background: { r: TARGET[0], g: TARGET[1], b: TARGET[2] } } })
  .composite([{ input: pic, left, top }])
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toFile('public/product/ingredient-splash-45.jpg');

console.log(`picture ${IW}x${IH} at ${left},${top}`);
console.log(`ground ${W}x${H}, content band ${Math.round((top + CONTENT_TOP * scale) / U)} -> ${Math.round((top + CONTENT_BOT * scale) / U)} design units`);
