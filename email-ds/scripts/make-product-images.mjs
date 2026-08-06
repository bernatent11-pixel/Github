// Prepare the product cutouts for email: trim the transparent margin so the art
// fills its slot, then downscale to a sensible retina width for a 600px email.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
mkdirSync('public/product', { recursive: true });

const JOBS = [
  { src: '../c47e0fe8-14b1-4a7f-918b-b603638c1935.png', out: 'public/product/pouch-botanical.png', width: 900 },
  { src: '../hand-pour.png.png', out: 'public/product/pouch-hand-pour.png', width: 900 },
];

for (const { src, out, width } of JOBS) {
  const trimmed = await sharp(src).trim({ threshold: 1 }).png().toBuffer();
  await sharp(trimmed)
    .resize({ width, fit: 'inside', withoutEnlargement: true })
    // Quantise: these are illustrative product shots, not photography that needs
    // a full palette, and email images have to stay light.
    .png({ compressionLevel: 9, palette: true, quality: 78, effort: 10 })
    .toFile(out);
  const m = await sharp(out).metadata();
  const { size } = await import('node:fs').then((f) => f.statSync(out));
  console.log(out, m.width + 'x' + m.height, Math.round(size / 1024) + 'KB');
}
