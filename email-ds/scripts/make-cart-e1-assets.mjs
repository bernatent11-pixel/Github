// Art for cart abandonment email 1 ("Your Mate Latte is waiting").
//
//   hero.jpg        Bernat's top-down shot (src-hero-90.jpg: the pouch, loose
//                   yerba and a latte on a gold gradient) with the logo set
//                   into its top. Its bottom fades into a flat gold, so the
//                   HTML rows below (title, Klaviyo's cart block, button)
//                   continue the same background: one section.
//   final.jpg       Bernat's pour shot (src-final-92.webp: pouch + iced latte
//                   on a gold wall and a cream table). The bottom fades into the
//                   table colour, so the title and the benefits sit "on the
//                   table", below the cup.
//   icon-*.png      Mate Mornings Club benefit icons, gold line, 2x for 18px
//   cart-pouch.png  pouch packshot for the preview's sample cart row only
//   colors.json     the flat colours the generator uses for those rows
//
// Usage: node scripts/make-cart-e1-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const DIR = 'exports/klaviyo/cart-e1', OUT = `${DIR}/img`;
fs.mkdirSync(OUT, { recursive: true });
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

// crop -> resize to W -> fade top/bottom into the average colour of their edge rows
async function fadeCrop(src, { left, top, width, height }, W, topFade, botFade, file, overlay) {
  const { data, info } = await sharp(src).extract({ left, top, width, height }).resize({ width: W }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const avg = (a, b) => { const c = [0, 0, 0]; for (let y = a; y < b; y++) for (let x = 0; x < w; x++) for (let k = 0; k < 3; k++) c[k] += data[(y * w + x) * 3 + k]; return c.map((v) => v / ((b - a) * w)); };
  const topC = avg(0, 8), botC = avg(h - 8, h);
  const fade = (a, b, flat, up) => { for (let y = a; y < b; y++) { const t = (y - a) / (b - a); const k = up ? 1 - t * t * (3 - 2 * t) : t * t * (3 - 2 * t); for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) { const i = (y * w + x) * 3 + c; data[i] = Math.round(data[i] * (1 - k) + flat[c] * k); } } };
  if (topFade) fade(0, Math.round(h * topFade), topC, true);
  if (botFade) fade(h - Math.round(h * botFade), h, botC, false);
  let img = sharp(data, { raw: info });
  if (overlay) img = sharp(await img.png().toBuffer()).composite(await overlay(w, h));
  await img.jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/${file}`);
  console.log(file, w + 'x' + h, '(shows at ' + w / 2 + 'x' + h / 2 + ')', 'top', hex(topC), 'bottom', hex(botC));
  return { top: hex(topC), bottom: hex(botC), h: h / 2 };
}

// hero: rows 280–1717 of the 1116x2000 source (gold gradient, products, leaves),
// at 1200 wide, with the Milonga lockup set into the empty gold at the top
// (85x90 at 1x, like our other heroes), so the photo starts the email cleanly.
const logo = async (w) => { const L = await sharp('exports/klaviyo/welcome-e1/img/logo-green.png').resize({ height: 180 }).png().toBuffer(); const m = await sharp(L).metadata(); return [{ input: L, left: Math.round((w - m.width) / 2), top: 68 }]; };
const hero = await fadeCrop(`${DIR}/src-hero-90.jpg`, { left: 0, top: 280, width: 1116, height: 1438 }, 1200, 0, 0.16, 'hero.jpg', logo);
// final: the whole 2000x2000 pour shot at 1200 wide; its top is a clean edge,
// its bottom (the table) fades into flat cream for the title and benefits
const final = await fadeCrop(`${DIR}/src-final-92.webp`, { left: 0, top: 0, width: 2000, height: 2000 }, 1200, 0, 0.05, 'final.jpg');
fs.writeFileSync(`${DIR}/colors.json`, JSON.stringify({ heroTop: hero.top, heroBottom: hero.bottom, heroH: hero.h, finalTop: final.top, finalBottom: final.bottom, finalH: final.h }, null, 2));

// Mate Mornings Club icons (the product page's three), gold line on forest
const stroke = 'fill="none" stroke="#E3BC62" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  save: `<circle cx="7" cy="7" r="2.6" ${stroke}/><circle cx="17" cy="17" r="2.6" ${stroke}/><path d="M18.5 5.5L5.5 18.5" ${stroke}/>`,
  delivery: `<path d="M2.5 6.5h11v9h-11z" ${stroke}/><path d="M13.5 9.5h4l3.5 3.5v2.5h-7.5" ${stroke}/><circle cx="6.5" cy="17.5" r="1.8" ${stroke}/><circle cx="16.5" cy="17.5" r="1.8" ${stroke}/>`,
  pause: `<circle cx="12" cy="12" r="9" ${stroke}/><path d="M10 8.5v7M14 8.5v7" ${stroke}/>`,
};
for (const [k, d] of Object.entries(ICONS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">${d}</svg>`)).png().toFile(`${OUT}/icon-${k}.png`);
}
console.log('icons: icon-save, icon-delivery, icon-pause');

await sharp('public/product/pouch-mate-latte-vanilla-packshot-corrected.png').resize({ height: 192 }).png().toFile(`${OUT}/cart-pouch.png`);
console.log('cart-pouch.png (preview only)');
