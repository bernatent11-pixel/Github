// LUZ graphic language: icon chips, the rayos pattern tile, texture spec.
import { writeFileSync, mkdirSync } from 'node:fs';
import { sunMark, landscapeBand, COLORS as C } from '../logo/geometry.mjs';

mkdirSync('svg', { recursive: true });
const save = (n, s) => { writeFileSync(`svg/${n}.svg`, s); console.log('svg/' + n + '.svg'); };
const SVG = (vb, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${inner}</svg>`;

/* ---- icon chips: gold line art in a forest disc (Milonga convention kept) ---- */
const chip = inner => `<circle cx="60" cy="60" r="58" fill="${C.forest}"/>
  <g fill="none" stroke="${C.gold}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;

const ICONS = {
  // yerba mate leaf — pointed ellipse with midrib and serrated hint
  'icon-mate-leaf': chip(`<path d="M60,28 C84,40 88,70 60,92 C32,70 36,40 60,28 Z"/>
     <path d="M60,34 L60,86 M60,50 L72,42 M60,62 L74,55 M60,50 L48,42 M60,62 L46,55"/>`),
  // lion's mane — cap with falling strands
  'icon-lions-mane': chip(`<path d="M38,52 Q40,30 60,30 Q80,30 82,52"/>
     <path d="M38,52 L36,84 M49,54 L48,88 M60,55 L60,90 M71,54 L72,88 M82,52 L84,84"/>`),
  // L-theanine — calm: a level line over still water ripples
  'icon-calma': chip(`<circle cx="60" cy="48" r="12"/>
     <path d="M30,70 Q45,62 60,70 T90,70 M36,82 Q50,75 62,82 T86,82"/>`),
  // hot serve
  'icon-hot': chip(`<path d="M38,52 h40 v22 a14,14 0 0 1 -14,14 h-12 a14,14 0 0 1 -14,-14 Z M78,56 h6 a8,8 0 0 1 0,16 h-7"/>
     <path d="M50,42 q-4,-7 0,-13 M62,42 q-4,-7 0,-13"/>`),
  // iced serve
  'icon-iced': chip(`<path d="M42,34 h36 l-5,54 h-26 Z"/>
     <path d="M46,48 h29"/><rect x="51" y="58" width="9" height="9" rx="2"/><rect x="62" y="66" width="9" height="9" rx="2"/>`),
  // gourd & bombilla — heritage cue
  'icon-gourd': chip(`<path d="M48,50 q-10,14 0,26 q6,8 14,8 q8,0 14,-8 q10,-12 0,-26 q-4,-6 -4,-12 h-20 q0,6 -4,12 Z"/>
     <path d="M66,38 L82,20 M82,20 l4,4"/>`),
  // caffeine from mate — sun-spark in a cup
  'icon-energia': chip(`<path d="M40,58 h40 v16 a12,12 0 0 1 -12,12 h-16 a12,12 0 0 1 -12,-12 Z"/>
     <circle cx="60" cy="42" r="8" fill="${C.gold}" stroke="none"/>
     <path d="M60,28 v-6 M72,34 l5,-5 M48,34 l-5,-5 M74,46 h6 M40,46 h6"/>`),
};
for (const [n, inner] of Object.entries(ICONS)) save(n, SVG('0 0 120 120', inner));

/* ---- rayos tile: repeating sun-ray arcs, forestDeep on forest (tone on tone) ---- */
{
  const t = 240;
  let arcs = '';
  for (let r = 24; r <= 132; r += 36) arcs += `<circle cx="0" cy="${t}" r="${r}"/><circle cx="${t}" cy="0" r="${r}"/>`;
  save('pattern-rayos', SVG(`0 0 ${t} ${t}`,
    `<rect width="${t}" height="${t}" fill="${C.forest}"/>
     <g fill="none" stroke="${C.forestDeep}" stroke-width="10">${arcs}</g>`));
  // gold-on-forest loud variant for social moments
  save('pattern-rayos-gold', SVG(`0 0 ${t} ${t}`,
    `<rect width="${t}" height="${t}" fill="${C.forest}"/>
     <g fill="none" stroke="${C.gold}" stroke-width="8" opacity="0.5">${arcs}</g>`));
}

/* ---- monte divider: slim landscape strip for web/email section breaks ---- */
save('divider-monte', SVG('0 0 1200 140', landscapeBand(1200, 140, { sun: C.gold, sunPos: 0.82 })));

/* ---- texture: paper grain spec demo (SVG noise) ---- */
save('texture-grain', SVG('0 0 400 400', `
  <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.89 0 0 0 0 0.74 0 0 0 0 0.38 0 0 0 0.06 0"/></filter>
  <rect width="400" height="400" fill="${C.forest}"/><rect width="400" height="400" filter="url(#g)"/>`));

writeFileSync('graphics.md', `# LUZ Graphic Language

## El Sol (the symbol)
The sun disc with eight tapered rays. Full sol = avatar, favicon, stamps. Rising sol (half, on its horizon line) = section markers, stacked lockup, "morning" moments. Never redraw, rotate rays, or add a face — it must never drift toward the Argentine flag's sol de mayo.

## El Monte (the landscape)
The layered treeline with beige sierra and rising sun, generated from brand geometry (see logo/geometry.mjs). It is LUZ's "label band" on packaging, a divider strip on web/email, and a crop-able background. Big calm shapes — never busy jungle (that lane is Yerba Madre's), never palm trees, never a leaf motif that could read cannabis.

## Icon chips
Gold line icons inside a Forest disc (Milonga's filled-disc convention carried over): mate leaf, lion's mane, calma (L-theanine), energía (mate caffeine), hot & iced serves, gourd+bombilla. Rules: ingredients always travel together and in this order — mate · lion's mane · L-theanine. Run icons big in a disc; never split a group or recolor strokes.

## Pattern — Rayos
Quarter-circle ray arcs tiled corner-to-corner. Default: Forest Deep on Forest (tone-on-tone, for grounds and unboxing interiors). Loud: Gold on Forest at 50% (social frames, story backgrounds). Never on Beige.

## Texture
Paper grain (6% gold noise) on Forest or Gold grounds only — "nothing reads flat" (Milonga rule). Never on Beige, never over photos.
`);
console.log('graphics done');
