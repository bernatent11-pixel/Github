// Pieces for the Halloween-weekend hero, all cut from Bernat's purple Party
// Pack picture (public/product/halloween-party-pack-24.jpg) so the hero shares
// its night: the moon and the witches as soft-edged crops (their sky is the
// hero's sky), and the leaves and jack-o'-lanterns keyed off the purple so
// they can be scattered between the real packshots.
//
// Usage: node scripts/make-halloween-weekend-assets.mjs
import sharp from 'sharp';

const SRC = 'public/product/halloween-party-pack-24.jpg';
const OUT = 'public/product/halloween-weekend';
const SKY = [0x3a, 0x1f, 0x55]; // the picture's purple, sampled across its open sky

// A crop whose edge fades out in an ellipse, so it sits on the same purple.
async function soft(name, { left, top, width, height }, inner = 0.62) {
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="${inner}" stop-color="#fff"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`);
  await sharp(SRC).extract({ left, top, width, height }).ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }]).png().toFile(`${OUT}/${name}.png`);
}

// A crop with the purple keyed out: alpha rises with distance from SKY.
async function keyed(name, { left, top, width, height }, lo = 28, hi = 80) {
  const { data, info } = await sharp(SRC).extract({ left, top, width, height }).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const d = Math.hypot(data[i] - SKY[0], data[i + 1] - SKY[1], data[i + 2] - SKY[2]);
    const a = Math.max(0, Math.min(1, (d - lo) / (hi - lo)));
    out[j] = data[i]; out[j + 1] = data[i + 1]; out[j + 2] = data[i + 2]; out[j + 3] = Math.round(a * 255);
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(`${OUT}/${name}.png`);
}

await soft('moon', { left: 60, top: 25, width: 350, height: 330 }, 0.7);
await soft('witches', { left: 585, top: 45, width: 470, height: 250 }, 0.72);
await keyed('leaf-a', { left: 470, top: 30, width: 70, height: 60 });
await keyed('leaf-b', { left: 40, top: 262, width: 70, height: 58 });
await keyed('leaf-c', { left: 38, top: 355, width: 82, height: 68 });
await keyed('leaf-d', { left: 988, top: 262, width: 70, height: 72 });
await keyed('leaf-e', { left: 952, top: 745, width: 88, height: 60 });
await keyed('leaf-f', { left: 668, top: 888, width: 102, height: 72 });
await keyed('pumpkins', { left: 814, top: 812, width: 236, height: 192 }, 30, 90);
console.log('wrote', OUT);
