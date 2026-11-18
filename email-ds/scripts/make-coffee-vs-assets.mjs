// Campaign · Coffee vs Mate Latte · images (Bernat, 2026-11-18)
//   hero-poster.jpg  his poster (src-poster-131.webp: "Clean energy / Sharp focus", the cup with callouts),
//                    1200x2133, with the green Milonga logo set into its empty cream top (92px high in the email; Bernat asked for it bigger)
//   kit-photo.jpg    the two pouches, Lion's Mane, vanilla and the frother (src-kit-132.webp), 960x960
// Usage: node scripts/make-coffee-vs-assets.mjs
import sharp from 'sharp';
const D = 'exports/klaviyo/coffee-vs', OUT = `${D}/img`;
const logo = await sharp('exports/klaviyo/welcome-e1/img/logo-green.png').resize({ height: 184 }).png().toBuffer();
const lm = await sharp(logo).metadata();
await sharp(`${D}/src-poster-131.webp`).resize(1200, 2133).composite([{ input: logo, left: Math.round((1200 - lm.width) / 2), top: 40 }]).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/hero-poster.jpg`);
await sharp(`${D}/src-kit-132.webp`).resize(960, 960).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/kit-photo.jpg`);
for (const f of ['hero-poster.jpg', 'kit-photo.jpg']) { const m = await sharp(`${OUT}/${f}`).metadata(); console.log(f, m.width + 'x' + m.height, (await import('node:fs')).statSync(`${OUT}/${f}`).size); }

// the comparison's coffee-cup icon, recoloured beige for the dark green ground (welcome-e3's is forest)
{
  const src = sharp('exports/klaviyo/welcome-e3/img/cmp-coffee.png').ensureAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) { data[i] = 0xF0; data[i + 1] = 0xEF; data[i + 2] = 0xDF; }
  await sharp(data, { raw: info }).png().toFile(`${OUT}/cmp-coffee-beige.png`);
  console.log('cmp-coffee-beige.png');
}
