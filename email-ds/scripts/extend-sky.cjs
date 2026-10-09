// Extend a photograph's sky upward by continuing its own gradient. Takes the
// top row as the starting colour for every column and keeps darkening at the
// rate the first 300 rows already darken at, with a little grain so the
// extension does not read as a flat plastic band.
// Usage: node scripts/extend-sky.cjs <in> <out.jpg> <extra px>
const s = require('sharp');
(async () => {
  const [inp, out, ext] = process.argv.slice(2);
  const EXT = +ext;
  const { data, info } = await s(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  // per-channel darkening rate per row, measured between rows 0 and 300
  const mean = (y, k) => { let t = 0; for (let x = 0; x < W; x++) t += data[(y * W + x) * C + k]; return t / W; };
  const rate = [0, 1, 2].map((k) => (mean(300, k) - mean(0, k)) / 300);
  const top = Buffer.alloc(W * EXT * 3);
  for (let y = 0; y < EXT; y++) {
    const d = EXT - y; // rows above the photo's first row
    for (let x = 0; x < W; x++) {
      // soften the top row horizontally so its noise is not stretched into streaks
      let acc = [0, 0, 0], n = 0;
      for (let dx = -12; dx <= 12; dx++) { const xx = Math.min(W - 1, Math.max(0, x + dx)); for (let k = 0; k < 3; k++) acc[k] += data[(0 * W + xx) * C + k]; n++; }
      for (let k = 0; k < 3; k++) {
        const v = acc[k] / n - rate[k] * d * 0.85 + (Math.random() - 0.5) * 3;
        top[(y * W + x) * 3 + k] = Math.max(0, Math.min(255, Math.round(v)));
      }
    }
  }
  const band = await s(top, { raw: { width: W, height: EXT, channels: 3 } }).png().toBuffer();
  const photo = await s(inp).removeAlpha().png().toBuffer();
  await s({ create: { width: W, height: H + EXT, channels: 3, background: '#000' } })
    .composite([{ input: band, top: 0, left: 0 }, { input: photo, top: EXT, left: 0 }])
    .jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  console.log(out, W, H + EXT, 'rate', rate.map((r) => r.toFixed(3)).join(','));
})();
