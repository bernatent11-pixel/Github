// Generates the complete LUZ logo suite (SVG) from geometry.mjs.
import { writeFileSync, mkdirSync } from 'node:fs';
import { wordmark, sunMark, landscapeBand, COLORS as C } from './geometry.mjs';

mkdirSync('svg', { recursive: true });
const save = (name, svg) => { writeFileSync(`svg/${name}.svg`, svg); console.log('svg/' + name + '.svg'); };
const SVG = (vb, inner, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${extra}>${inner}</svg>`;

const PAD = 60;
const wm = c => wordmark(c);
const W = wm().w;

/* 1 · primary wordmark (4 colorways) */
for (const [suffix, color] of [['forest', C.forest], ['gold', C.gold], ['black', '#000000'], ['white', '#FFFFFF']]) {
  save(`luz-wordmark-${suffix}`, SVG(`${-PAD} ${-PAD} ${W + 2 * PAD} ${400 + 2 * PAD}`, wm(color).content));
}

/* 2 · symbol — el Sol de LUZ (full) + rising variant */
const sun = c => sunMark(c).content;
const sunR = sunMark(C.gold).r; // 166
for (const [suffix, color] of [['gold', C.gold], ['forest', C.forest], ['black', '#000'], ['white', '#fff']]) {
  save(`luz-sol-${suffix}`, SVG(`-190 -190 380 380`, sun(color)));
}
const rise = sunMark(C.gold, { rise: true });
save('luz-sol-rising-gold', SVG('-190 -190 380 210', rise.content));

/* 3 · horizontal lockup: sol + wordmark, optically aligned */
function horizontal(colorWm, colorSun) {
  const s = 400 / (2 * sunR) * 0.78;             // sun height ≈ 78% of cap height
  const sunW = 2 * sunR * s;
  const gap = 70;
  const inner = `<g transform="translate(${sunR * s},${200}) scale(${s})">${sunMark(colorSun).content}</g>
    <g transform="translate(${sunW + gap},0)">${wm(colorWm).content}</g>`;
  return { inner, w: sunW + gap + W };
}
{
  const h1 = horizontal(C.forest, C.gold);
  save('luz-lockup-horizontal', SVG(`${-PAD} ${-PAD} ${h1.w + 2 * PAD} ${400 + 2 * PAD}`, h1.inner));
  const h2 = horizontal(C.gold, C.gold);
  save('luz-lockup-horizontal-gold', SVG(`${-PAD} ${-PAD} ${h2.w + 2 * PAD} ${400 + 2 * PAD}`, h2.inner));
  const h3 = horizontal('#000', '#000');
  save('luz-lockup-horizontal-black', SVG(`${-PAD} ${-PAD} ${h3.w + 2 * PAD} ${400 + 2 * PAD}`, h3.inner));
  const h4 = horizontal('#fff', '#fff');
  save('luz-lockup-horizontal-white', SVG(`${-PAD} ${-PAD} ${h4.w + 2 * PAD} ${400 + 2 * PAD}`, h4.inner));
}

/* 4 · stacked lockup: rising sol above wordmark (sun centered on the U) */
{
  const s = 0.62;
  const m = wm(C.forest);
  const inner = `<g transform="translate(${m.sunCx},-8) scale(${s})">${sunMark(C.gold, { rise: true }).content}</g>
     <g transform="translate(0,72)">${m.content}</g>`;
  save('luz-lockup-stacked', SVG(`${-PAD} ${-175} ${W + 2 * PAD} ${700}`, inner));
}

/* 5 · tagline lockup (Bodoni Moda via webfont/text; PNG exports are canonical) */
{
  const m = wm(C.forest);
  const inner = `${m.content}
   <text x="${W / 2 + 13}" y="548" text-anchor="middle" font-family="Bodoni Moda, Didot, 'Bodoni MT', serif"
     font-size="68" letter-spacing="26" fill="${C.gold}">GOLDEN CLARITY</text>`;
  save('luz-lockup-tagline', SVG(`${-PAD} ${-PAD} ${W + 2 * PAD} ${700}`, inner));
}

/* 6 · favicon / app icon: gold sol on forest, rounded square */
{
  const inner = `<rect width="512" height="512" rx="108" fill="${C.forest}"/>
    <g transform="translate(256,256) scale(1.28)">${sun(C.gold)}</g>`;
  save('luz-appicon', SVG('0 0 512 512', inner));
  save('luz-favicon', SVG('0 0 512 512', inner)); // same art; favicon.ico derived at build
}

/* 7 · social avatar: circle crop safety */
{
  const inner = `<circle cx="256" cy="256" r="256" fill="${C.forest}"/>
    <g transform="translate(256,256) scale(1.22)">${sun(C.gold)}</g>`;
  save('luz-avatar', SVG('0 0 512 512', inner));
}

/* 8 · watermark for creator/UGC: white horizontal lockup @ 38% opacity */
{
  const h = horizontal('#fff', '#fff');
  save('luz-watermark', SVG(`${-PAD} ${-PAD} ${h.w + 2 * PAD} ${400 + 2 * PAD}`,
    `<g opacity="0.38">${h.inner}</g>`));
}

/* 9 · landscape band master (wide) + square */
save('luz-landscape-band', SVG('0 0 1600 420', landscapeBand(1600, 420, { sky: C.goldSoft })));
save('luz-landscape-square', SVG('0 0 800 800',
  `<rect width="800" height="800" fill="${C.goldSoft}"/><g transform="translate(0,380)">${landscapeBand(800, 420, {})}</g>`));

/* 10 · clear space + minimum size + misuse sheet */
{
  const m = wm(C.forest);
  const u = 400; // clear space unit = cap height of the U... use full cap height
  const cs = `<g>
    <rect x="${-u / 2}" y="${-u / 2}" width="${W + u}" height="${400 + u}" fill="none" stroke="${C.leaf}" stroke-dasharray="18 14" stroke-width="4"/>
    ${m.content}
    <text x="${W / 2}" y="${400 + u / 2 + 70}" text-anchor="middle" font-family="Hanken Grotesk, Arial, sans-serif" font-size="44" fill="${C.ink}">Clear space = ½ cap height ("the half-sun rule") on all sides. Minimum width: 96 px digital · 22 mm print. Sol alone below that.</text>`;
  save('luz-clearspace', SVG(`${-u} ${-u} ${W + 2 * u} ${400 + u * 2.2}`, cs));
}

console.log('done');
