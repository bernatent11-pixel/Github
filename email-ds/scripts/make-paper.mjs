// Build a cream paper-fibre tile. Real paper is not a flat fill: it has short
// fibres running through it and a faint mottle. This generates that at a very
// low amplitude and colour-corrects the mean to the brand cream, so a sheet
// gains texture without shifting colour.
import sharp from 'sharp';

const N = 320;
const CREAM = [240, 239, 223]; // #F0EFDF
const AMP = 5.5; // ± value range of the grain — deliberately subtle

// Deterministic noise, so the tile is reproducible between builds.
let seed = 20260901;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

// Fibres: each pixel is noise, then averaged with its horizontal neighbours so
// the grain stretches sideways the way pressed pulp does. Wrapping the
// neighbour index keeps the tile seamless.
const noise = new Float32Array(N * N);
for (let i = 0; i < N * N; i++) noise[i] = rnd() * 2 - 1;

const fibre = new Float32Array(N * N);
const RUN = 7;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    let sum = 0;
    for (let k = -RUN; k <= RUN; k++) sum += noise[y * N + ((x + k + N) % N)];
    fibre[y * N + x] = sum / (RUN * 2 + 1);
  }
}

// A slow mottle on top, so the sheet is not perfectly even across its width.
const mottle = new Float32Array(N * N);
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    mottle[y * N + x] =
      Math.sin((x / N) * Math.PI * 2) * 0.5 + Math.sin((y / N) * Math.PI * 2 + 1.3) * 0.5;
  }
}

const buf = Buffer.alloc(N * N * 3);
for (let p = 0; p < N * N; p++) {
  // fibre carries most of it; the mottle is a whisper underneath
  const v = fibre[p] * 3.2 + mottle[p] * 0.28;
  for (let c = 0; c < 3; c++) {
    const val = CREAM[c] + v * AMP;
    buf[p * 3 + c] = val < 0 ? 0 : val > 255 ? 255 : val;
  }
}

await sharp(buf, { raw: { width: N, height: N, channels: 3 } })
  .jpeg({ quality: 92 })
  .toFile('public/brand/textures/tile-paper.jpg');

console.log('wrote public/brand/textures/tile-paper.jpg', N + 'x' + N);
