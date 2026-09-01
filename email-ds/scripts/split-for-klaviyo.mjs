// Export a rendered email as two stacked images for Klaviyo.
//
// Email clients scale a single very tall image badly, and Klaviyo's editor is
// happier with two blocks than one enormous one. The seam has to be invisible,
// so we do not cut at the midpoint — we look for the flattest row near it (one
// where every pixel across the width is nearly identical, i.e. plain
// background) and cut there.
//
// Usage: node scripts/split-for-klaviyo.mjs <in.png> <out-prefix> [format]
import sharp from 'sharp';

const [, , src, prefix, format = 'jpeg'] = process.argv;
if (!src || !prefix) {
  console.error('usage: split-for-klaviyo.mjs <in.png> <out-prefix> [jpeg|png]');
  process.exit(1);
}

const img = sharp(src);
const { width, height } = await img.metadata();
const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels;

// Score each row by how much it varies across its width. A row running through
// type or artwork scores high; a row of plain background scores near zero.
function rowVariance(y) {
  let sum = 0;
  let sq = 0;
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * ch;
    const v = (data[i] + data[i + 1] + data[i + 2]) / 3;
    sum += v;
    sq += v * v;
  }
  const mean = sum / width;
  return sq / width - mean * mean;
}

// Search a wide middle band. Rows that cross a card or a photo can never be
// flat (dark background | light card | dark background), so the flattest row
// is naturally one in open background — which is exactly where a seam hides.
// That matters more than splitting the height evenly.
const lo = Math.round(height * 0.40);
const hi = Math.round(height * 0.85);
let best = { y: Math.round(height / 2), v: Infinity };
for (let y = lo; y <= hi; y++) {
  const v = rowVariance(y);
  if (v < best.v) best = { y, v };
}

const cut = best.y;
const parts = [
  { top: 0, h: cut, name: `${prefix}-1` },
  { top: cut, h: height - cut, name: `${prefix}-2` },
];

for (const p of parts) {
  const out = `${p.name}.${format === 'png' ? 'png' : 'jpg'}`;
  let pipe = sharp(src).extract({ left: 0, top: p.top, width, height: p.h });
  pipe = format === 'png' ? pipe.png({ compressionLevel: 9 }) : pipe.jpeg({ quality: 86, chromaSubsampling: '4:4:4' });
  await pipe.toFile(out);
  const { size } = await import('node:fs').then((f) => f.statSync(out));
  console.log(out, `${width}x${p.h}`, Math.round(size / 1024) + 'KB');
}
console.log(`seam at y=${cut} of ${height} (variance ${best.v.toFixed(2)})`);
