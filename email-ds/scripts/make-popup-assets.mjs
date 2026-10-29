// Images for the Halloween welcome pop-up (popups/halloween-welcome/), cut
// from the same lineup picture as the Halloween sale hero so the pop-up and
// the email read as one campaign.
//   lineup.jpg — the products, ghosts and leaves (lower part of the picture)
//   mark-white.png — the hand mark over the headline
import sharp from 'sharp';

const SRC = 'public/product/halloween-orange-lineup.jpg';
const OUT = 'popups/halloween-welcome/img';

await sharp(SRC).extract({ left: 0, top: 600, width: 1200, height: 1200 })
  .resize(900).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/lineup.jpg`);
await sharp('public/logo/mark-white.png').resize({ height: 120 }).png().toFile(`${OUT}/mark-white.png`);
console.log('wrote', OUT);
