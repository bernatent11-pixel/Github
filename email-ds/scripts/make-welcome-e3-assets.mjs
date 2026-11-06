// Art for Welcome flow email 3 ("Last call: your 15% ends in 12 hours").
//
//   hero-bg.jpg    the opening section's background: Bernat's studio shot of
//                  the pouch and the glass on green (the same photo as E1's
//                  section 2). The empty green above the products is
//                  stretched a little so the last-call copy fits there, and
//                  the empty green below is trimmed.
//   logo-gold.png  the Milonga lockup in gold, for the dark green ground
//
// Usage: node scripts/make-welcome-e3-assets.mjs
import sharp from 'sharp';

const OUT = 'exports/klaviyo/welcome-e3/img';
const SRC = 'exports/klaviyo/welcome-e3/src-hero-83.webp'; // 1116x2000
const W = 1200;
const base = await sharp(SRC).resize({ width: W }).removeAlpha().png().toBuffer();
const { height: H0 } = await sharp(base).metadata(); // 2151
// rows 250–700 are plain green (no product, no shadow): stretch them by ADD
const A = 250, B = 700, ADD = 320, KEEP_BELOW = 1829 + 120 + 120; // glass base ~1829 after the stretch
const top = await sharp(base).extract({ left: 0, top: 0, width: W, height: A }).toBuffer();
const band = await sharp(base).extract({ left: 0, top: A, width: W, height: B - A }).resize({ width: W, height: B - A + ADD, fit: 'fill', kernel: 'cubic' }).toBuffer();
const bottom = await sharp(base).extract({ left: 0, top: B, width: W, height: H0 - B }).toBuffer();
const full = await sharp({ create: { width: W, height: H0 + ADD, channels: 3, background: '#025A41' } })
  .composite([{ input: top, left: 0, top: 0 }, { input: band, left: 0, top: A }, { input: bottom, left: 0, top: B + ADD }]).png().toBuffer();
const H = Math.min(KEEP_BELOW, H0 + ADD) & ~1; // even, so it halves cleanly
await sharp(full).extract({ left: 0, top: 0, width: W, height: H }).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/hero-bg.jpg`);
console.log('hero-bg.jpg', W + 'x' + H, '(shows at 600x' + H / 2 + ')');

// ── comparison: the pouch for the Milonga column, the VS badge, and line
// icons for the three alternatives (forest, 2x) ───────────────────────────
await sharp('public/product/pouch-mate-latte-vanilla-packshot-corrected.png').resize({ height: 152 }).png().toFile(`${OUT}/cmp-pouch.png`);
const vs = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="45" fill="#004D27" stroke="#E3BC62" stroke-width="5"/><text x="48" y="60" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="34" fill="#FFFFFF" letter-spacing="1">VS</text></svg>`;
await sharp(Buffer.from(vs)).png().toFile(`${OUT}/cmp-vs.png`);
const stroke = 'fill="none" stroke="#004D27" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  // coffee: a mug with steam
  coffee: `<path d="M12 26h28v10c0 7-6 12-14 12s-14-5-14-12z" ${stroke}/><path d="M40 29h4a5 5 0 010 10h-4" ${stroke}/><path d="M9 52h34" ${stroke}/><path d="M20 20c-2-3 2-5 0-8M27 20c-2-3 2-5 0-8M34 20c-2-3 2-5 0-8" ${stroke}/>`,
  // mushroom coffee: a mug with a mushroom rising from it
  mushroom: `<path d="M12 30h28v8c0 6-6 11-14 11s-14-5-14-11z" ${stroke}/><path d="M40 32h4a5 5 0 010 10h-4" ${stroke}/><path d="M9 53h34" ${stroke}/><path d="M17 20c0-6 4-10 9-10s9 4 9 10z" ${stroke}/><path d="M23 20v10M29 20v10" ${stroke}/>`,
  // matcha: a bowl and a whisk
  matcha: `<path d="M8 30h36c0 10-8 17-18 17S8 40 8 30z" ${stroke}/><path d="M18 50h16" ${stroke}/><path d="M34 26l10-16M38 26l9-13M30 26l11-17" ${stroke}/><path d="M41 9l5 3" ${stroke}/>`,
};
for (const [k, d] of Object.entries(ICONS)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 56 56">${d}</svg>`)).png().toFile(`${OUT}/cmp-${k}.png`);
}
console.log('comparison: cmp-pouch, cmp-vs, cmp-coffee, cmp-mushroom, cmp-matcha');
