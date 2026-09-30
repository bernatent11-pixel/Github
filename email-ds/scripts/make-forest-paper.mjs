import sharp from 'sharp';

// The paper grain, in deep green.
//
// The band between the ingredients and the method has to feel like the same
// paper as the rest of the email, only darker — so it cannot use tile-forest,
// which is a different pattern altogether (the brand doodle). It has to be
// THIS tile, recoloured.
//
// Recolouring means carrying the grain across as a DEVIATION rather than as a
// colour. Each pixel's distance from the tile's own mean is measured, then
// applied to the dark target: a fibre that sits 4 above the paper's average
// sits 4 x GAIN above the green's. Mapping the pixel values directly would
// just produce a pale green sheet, and multiplying would flatten the grain to
// nothing, because the same relative variation is invisible once the ground
// is 40 instead of 240.
const SRC = 'public/brand/textures/tile-paper.jpg';
const BASE = [0, 77, 39];   // #004D27 — the core forest, a step up from forestDeep
const GAIN = 2.4;           // the grain, amplified for a dark ground

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const n = info.width * info.height;
let mean = 0;
for (let i = 0; i < data.length; i += 3) mean += (data[i] + data[i + 1] + data[i + 2]) / 3;
mean /= n;

const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 3) {
  const d = ((data[i] + data[i + 1] + data[i + 2]) / 3 - mean) * GAIN;
  for (let c = 0; c < 3; c++) out[i + c] = Math.max(0, Math.min(255, Math.round(BASE[c] + d)));
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
  .toFile('public/brand/textures/tile-paper-forest.jpg');

console.log(`${info.width}x${info.height}, paper mean ${mean.toFixed(1)} -> rgb(${BASE.join(',')}) at gain ${GAIN}`);
