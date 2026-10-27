// LUZ packaging flats — PLACEHOLDER DIELINE (see regulatory-flags.md + dieline note).
// Tin assumed Ø99mm × H142mm → wrap 311×120mm label area, built at 10 units/mm.
import { writeFileSync, mkdirSync } from 'node:fs';
import { wordmark, sunMark, landscapeBand, COLORS as C } from '../../02_system/logo/geometry.mjs';

mkdirSync('svg', { recursive: true });
const save = (n, s) => { writeFileSync(`svg/${n}.svg`, s); console.log('svg/' + n + '.svg'); };
const BODONI = `Bodoni Moda, Didot, serif`, HANKEN = `Hanken Grotesk, Arial, sans-serif`;

const W = 3110, H = 1200;            // full wrap
const PW = W / 3;                    // panel width (front = center)
const FX = PW;                       // front panel x-origin

/* ------------------------------- full wrap ------------------------------- */
{
  const wm = wordmark(C.forest);
  const wmW = 560;                                  // front wordmark width
  const wmS = wmW / wm.w;
  const bandY = 640, bandH = 360;                   // monte band
  const parts = [];

  // ground: gold field + forest base; flat gold stands in for PMS 871 metallic
  parts.push(`<rect width="${W}" height="${H}" fill="${C.gold}"/>`);
  parts.push(`<g transform="translate(0,${bandY})">${landscapeBand(W, bandH, { sun: null })}</g>`);
  parts.push(`<rect y="${bandY + bandH - 4}" width="${W}" height="${H - bandY - bandH + 4}" fill="${C.forest}"/>`);

  // FRONT (center panel)
  const fc = FX + PW / 2;
  parts.push(`<g transform="translate(${fc - wmW / 2},150) scale(${wmS})">${wm.content}</g>`);
  parts.push(`<text x="${fc}" y="408" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="46" letter-spacing="16" fill="${C.forest}">YERBA MATE LATTE</text>`);
  parts.push(`<line x1="${fc - 330}" y1="470" x2="${fc + 330}" y2="470" stroke="${C.forest}" stroke-width="3"/>`);
  parts.push(`<text x="${fc}" y="528" text-anchor="middle" font-family="${HANKEN}" font-weight="700" font-size="25" letter-spacing="2.5" fill="${C.forest}">500 MG LION’S MANE · 200 MG L-THEANINE · 100 MG NATURAL CAFFEINE</text>`);
  parts.push(`<line x1="${fc - 330}" y1="572" x2="${fc + 330}" y2="572" stroke="${C.forest}" stroke-width="3"/>`);
  parts.push(`<text x="${fc}" y="1065" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="52" letter-spacing="22" fill="${C.gold}">VANILLA</text>`);
  parts.push(`<circle cx="${fc}" cy="1098" r="6" fill="${C.gold}"/>`);
  parts.push(`<text x="${fc}" y="1150" text-anchor="middle" font-family="${HANKEN}" font-weight="400" font-size="36" letter-spacing="10" fill="${C.beige}">15 SERVINGS · NET WT 9 OZ (255 g)*</text>`);

  // BACK (left panel) — regulatory placeholders
  const bc = PW / 2;
  const ph = (x, y, w2, h2, label) => `<rect x="${x}" y="${y}" width="${w2}" height="${h2}" fill="${C.beige}" stroke="${C.forest}" stroke-width="3"/>
    <text x="${x + w2 / 2}" y="${y + 40}" text-anchor="middle" font-family="${HANKEN}" font-weight="700" font-size="26" fill="${C.forest}">${label}</text>`;
  parts.push(ph(bc - 420, 110, 520, 400, '[ SUPPLEMENT FACTS — PENDING ]'));
  parts.push(ph(bc - 420, 540, 520, 130, '[ INGREDIENTS — PENDING ]'));
  parts.push(`<text x="${bc - 420}" y="712" font-family="${HANKEN}" font-size="21" fill="${C.forest}">[ ALLERGEN: CONTAINS COCONUT (TREE NUT). ]</text>
    <text x="${bc - 420}" y="744" font-family="${HANKEN}" font-size="21" fill="${C.forest}">[ CONTAINS HONEY — NOT FOR INFANTS UNDER 1. ]</text>`);
  parts.push(ph(bc + 160, 110, 230, 290, '[ UPC ]'));
  parts.push(ph(bc + 160, 430, 230, 190, '[ QR ]'));
  parts.push(`<text x="${bc + 160}" y="672" font-family="${HANKEN}" font-size="21" fill="${C.forest}">[ Distributed by Milonga Life Corp ]</text>
    <text x="${bc + 160}" y="702" font-family="${HANKEN}" font-size="21" fill="${C.forest}">[ 6108 NW 113 Pl, Doral, FL 33178 ]</text>
    <text x="${bc + 160}" y="732" font-family="${HANKEN}" font-size="21" fill="${C.forest}">[ drinkluz.com — placeholder ]</text>`);

  // SIDE (right panel) — ritual: how to cebar
  const sc = 2 * PW + PW / 2;
  parts.push(`<text x="${sc}" y="190" text-anchor="middle" font-family="${BODONI}" font-size="64" fill="${C.forest}">La preparación</text>`);
  const steps = [
    ['1', 'One scoop into your cup.'],
    ['2', 'Hot: a splash of hot water, whisk, top with milk.'],
    ['3', 'Iced: dissolve hot first, then ice and milk.'],
    ['4', 'Thirty seconds. Golden Clarity.'],
  ];
  steps.forEach(([n, t], i) => {
    parts.push(`<circle cx="${sc - 330}" cy="${280 + i * 90}" r="26" fill="${C.forest}"/>
      <text x="${sc - 330}" y="${290 + i * 90}" text-anchor="middle" font-family="${HANKEN}" font-weight="700" font-size="30" fill="${C.gold}">${n}</text>
      <text x="${sc - 280}" y="${290 + i * 90}" font-family="${HANKEN}" font-size="30" fill="${C.forest}">${t}</text>`);
  });
  parts.push(`<text x="${sc}" y="${1150}" text-anchor="middle" font-family="${HANKEN}" font-size="24" letter-spacing="6" fill="${C.beige}">*ALL PANEL VALUES PLACEHOLDER — FINAL DIELINE FROM PRINTER</text>`);

  // dieline frame + panel folds (non-print guide layer)
  parts.push(`<g stroke="#FF00AA" stroke-width="2" stroke-dasharray="14 10" fill="none">
    <rect x="1" y="1" width="${W - 2}" height="${H - 2}"/>
    <line x1="${PW}" y1="0" x2="${PW}" y2="${H}"/><line x1="${2 * PW}" y1="0" x2="${2 * PW}" y2="${H}"/></g>
    <text x="20" y="${H - 20}" font-family="${HANKEN}" font-size="26" fill="#FF00AA">PLACEHOLDER DIELINE — tin Ø99×H142 mm assumed · wrap 311×120 mm · request real dieline from tin printer</text>`);

  save('tin-wrap-flat', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${parts.join('\n')}</svg>`);
}

/* ------------------------------- lid band ------------------------------- */
{
  const w2 = 1200, h2 = 160;
  save('tin-lid-band', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w2} ${h2}">
    <rect width="${w2}" height="${h2}" fill="${C.gold}"/>
    <text x="${w2 / 2}" y="${h2 / 2 + 16}" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="52" letter-spacing="26" fill="${C.forest}">GOLDEN CLARITY</text>`+
    `</svg>`);
}

/* ------------------------- stick pack (trial) --------------------------- */
{
  const w2 = 380, h2 = 1300; // 38×130mm flat, front face
  const wm = wordmark(C.forest); const s = 230 / wm.w;
  save('stick-pack-front', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w2} ${h2}">
    <rect width="${w2}" height="${h2}" fill="${C.gold}"/>
    <g transform="translate(${(w2 - 230) / 2},120) scale(${s})">${wm.content}</g>
    <text x="${w2 / 2}" y="280" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="22" letter-spacing="6" fill="${C.forest}">YERBA MATE LATTE</text>
    <g transform="translate(0,760)">${landscapeBand(w2, 280, { sun: C.gold, sunPos: 0.5 })}</g>
    <rect y="1036" width="${w2}" height="${h2 - 1036}" fill="${C.forest}"/>
    <text x="${w2 / 2}" y="1110" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="28" letter-spacing="10" fill="${C.gold}">VANILLA</text>
    <text x="${w2 / 2}" y="1160" text-anchor="middle" font-family="${HANKEN}" font-size="20" letter-spacing="4" fill="${C.beige}">1 SERVING · 17 g*</text>
    <text x="${w2 / 2}" y="1250" text-anchor="middle" font-family="${HANKEN}" font-size="14" fill="${C.beige}">[ placeholder dieline — single-serve stick ]</text>
    <g transform="translate(${w2 / 2},480) scale(0.5)">${sunMark(C.forest).content}</g>
  </svg>`);
}

/* --------------------------- shipping mailer ---------------------------- */
{
  const w2 = 1600, h2 = 1000;
  const wm = wordmark(C.gold); const s = 500 / wm.w;
  save('mailer-top', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w2} ${h2}">
    <rect width="${w2}" height="${h2}" fill="${C.forest}"/>
    <g opacity=".16"><g transform="scale(2.2)">${''}</g></g>
    <g transform="translate(${(w2 - 500) / 2},${h2 / 2 - 130}) scale(${s})">${wm.content}</g>
    <text x="${w2 / 2}" y="${h2 / 2 + 180}" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="34" letter-spacing="18" fill="${C.gold}">GOLDEN CLARITY</text>
    <g transform="translate(130,${h2 - 150}) scale(0.42)">${sunMark(C.gold, { rise: true }).content}</g>
    <text x="${w2 - 60}" y="${h2 - 60}" text-anchor="end" font-family="${HANKEN}" font-size="22" fill="${C.beige}">[ interior: pattern-rayos tile + “La ronda starts here. Pass it on.” ]</text>
  </svg>`);
}
console.log('packaging flats done');
