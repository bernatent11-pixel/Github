import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';

const dir = 'ds-bundle/_screenshots/review';
const files = readdirSync(dir).filter((f) => f.endsWith('.png'));
const groups = {};
for (const f of files) {
  const g = f.split('__')[0];
  (groups[g] ||= []).push(f);
}
mkdirSync('/tmp/review', { recursive: true });
const COLW = 380, GAP = 14, PAD = 16, COLS = 2;

for (const [g, list] of Object.entries(groups)) {
  list.sort();
  // Resize each to COLW wide, cap height.
  const tiles = [];
  for (const f of list) {
    let img = sharp(`${dir}/${f}`).resize({ width: COLW, height: 900, fit: 'inside', withoutEnlargement: true });
    const buf = await img.png().toBuffer();
    const m = await sharp(buf).metadata();
    tiles.push({ buf, w: m.width, h: m.height, name: f.replace('.png', '') });
  }
  // Layout into COLS columns, packing shortest column.
  const colH = new Array(COLS).fill(PAD);
  const place = [];
  for (const t of tiles) {
    let c = colH.indexOf(Math.min(...colH));
    const x = PAD + c * (COLW + GAP);
    const y = colH[c];
    place.push({ input: t.buf, left: x, top: y });
    colH[c] = y + t.h + GAP;
  }
  const W = PAD * 2 + COLS * COLW + (COLS - 1) * GAP;
  const H = Math.max(...colH) + PAD;
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 245, g: 245, b: 240, alpha: 1 } } })
    .composite(place)
    .png()
    .toFile(`/tmp/review/${g}.png`);
  console.log('wrote /tmp/review/' + g + '.png', W + 'x' + H, `(${list.length} components)`);
}
