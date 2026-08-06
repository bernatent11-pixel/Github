// Build tileable grain textures from the uploaded background art, colour-corrected
// so each tile AVERAGES exactly to the brand hex — the grain adds tactility
// without shifting the brand colour.
import sharp from 'sharp';

const TARGETS = {
  forest: { src: 'public/brand/textures/texture-forest.jpg', out: 'public/brand/textures/tile-forest.jpg', rgb: [0, 77, 39] },
  gold:   { src: 'public/brand/textures/texture-gold.jpg',   out: 'public/brand/textures/tile-gold.jpg',   rgb: [227, 188, 98] },
};

for (const [name, { src, out, rgb }] of Object.entries(TARGETS)) {
  const crop = await sharp(src).extract({ left: 100, top: 400, width: 600, height: 600 }).resize(320, 320).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = crop;
  // current average
  let a = [0, 0, 0];
  const px = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) { a[0] += data[i]; a[1] += data[i + 1]; a[2] += data[i + 2]; }
  a = a.map((v) => v / px);
  // shift every pixel by the delta so the mean matches the brand colour
  const out8 = Buffer.alloc(px * 3);
  for (let p = 0; p < px; p++) {
    const i = p * info.channels;
    for (let c = 0; c < 3; c++) {
      const v = data[i + c] + (rgb[c] - a[c]);
      out8[p * 3 + c] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
  }
  await sharp(out8, { raw: { width: info.width, height: info.height, channels: 3 } })
    .jpeg({ quality: 86 })
    .toFile(out);
  console.log(name, 'was', a.map(Math.round).join(','), '→', rgb.join(','));
}
