// Art for cart abandonment email 1 ("Your Mate Latte is waiting").
//
//   hero-photo.jpg  the iced Mate Latte beside its pouch (public/product/
//                   latte-iced-table.jpg), cropped below the branches so the
//                   glass, the pouch and the hand fill the frame. Shows at 540 wide.
//   cart-pouch.png  pouch packshot for the preview's sample cart row only
//
// Usage: node scripts/make-cart-e1-assets.mjs
import sharp from 'sharp';

const OUT = 'exports/klaviyo/cart-e1/img';
await sharp('public/product/latte-iced-table.jpg')
  .extract({ left: 0, top: 600, width: 1333, height: 1400 })
  .resize({ width: 1080 })
  .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(`${OUT}/hero-photo.jpg`);
console.log('hero-photo.jpg', 1080 + 'x' + Math.round(1400 * 1080 / 1333), '(shows at 540 wide)');
await sharp('public/product/pouch-mate-latte-vanilla-packshot-corrected.png').resize({ height: 192 }).png().toFile(`${OUT}/cart-pouch.png`);
console.log('cart-pouch.png (preview only)');
