// Flatten the pieces email clients can't reliably draw (CSS circles, tinted
// glyphs) into plain PNGs, so the Klaviyo template only needs <img> tags.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
mkdirSync('public/klaviyo', { recursive: true });

const GOLD = { r: 227, g: 188, b: 98, alpha: 1 };
const D = 128; // disc diameter at 2x for a 64px slot

/** Gold disc with the dark-green glyph centred inside it. */
async function disc(mark, out) {
  const circle = Buffer.from(
    `<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="rgb(227,188,98)"/></svg>`,
  );
  const glyph = await sharp(`public/brand/icons/${mark}-forest.png`)
    .resize({ width: Math.round(D * 0.58), height: Math.round(D * 0.58), fit: 'inside' })
    .png()
    .toBuffer();
  await sharp(circle).composite([{ input: glyph, gravity: 'center' }]).png({ compressionLevel: 9 }).toFile(out);
}

for (const m of ['yerba-mate', 'lions-mane', 'l-theanine', 'no-cane-sugar', 'gluten-dairy-free']) {
  await disc(m, `public/klaviyo/disc-${m}.png`);
}

// Plain gold glyphs for the hot/iced row.
for (const m of ['hot', 'iced']) {
  await sharp(`public/brand/icons/${m}-gold.png`).resize({ height: 116 }).png({ compressionLevel: 9 })
    .toFile(`public/klaviyo/icon-${m}.png`);
}

// The logo, sized for the masthead at 2x.
await sharp('public/logo/lockup-milonga-gold.png').resize({ height: 184 }).png({ compressionLevel: 9 })
  .toFile('public/klaviyo/logo-gold.png');

console.log('klaviyo assets ready');
