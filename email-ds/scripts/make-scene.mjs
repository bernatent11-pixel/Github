// Crop the treeline band out of the canopy illustration and shift its colours so
// the solid base matches the brand forest green exactly — the band can then sit
// directly above a forest section with no visible seam.
import sharp from 'sharp';

const SRC = 'public/brand/scene/forest-canopy.png';
const OUT = 'public/brand/scene/canopy-band.png';
const FOREST = [0, 77, 39];

const meta = await sharp(SRC).metadata();
// The treeline runs ~48%–86% of the artwork; above is transparent, below is flat base.
const top = Math.round(meta.height * 0.48);
const height = Math.round(meta.height * 0.38);
const band = await sharp(SRC).extract({ left: 0, top, width: meta.width, height }).png().toBuffer();

const { data, info } = await sharp(band).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
// Sample the base colour from the bottom row.
const base = [0, 0, 0];
let n = 0;
for (let x = 0; x < info.width; x += 3) {
  const i = ((info.height - 3) * info.width + x) * info.channels;
  base[0] += data[i]; base[1] += data[i + 1]; base[2] += data[i + 2]; n++;
}
const avg = base.map((v) => v / n);
const delta = FOREST.map((v, i) => v - avg[i]);

for (let p = 0; p < info.width * info.height; p++) {
  const i = p * info.channels;
  if (data[i + 3] === 0) continue;
  for (let c = 0; c < 3; c++) {
    const v = data[i + c] + delta[c];
    data[i + c] = v < 0 ? 0 : v > 255 ? 255 : v;
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png()
  .toFile(OUT);
console.log('canopy band:', info.width + 'x' + info.height, '| base', avg.map(Math.round).join(','), '→', FOREST.join(','));
