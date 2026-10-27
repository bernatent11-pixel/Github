// LUZ brand geometry — single source of truth for every logo asset.
// Didone-informed custom caps: vertical stems thick, horizontals thin,
// sharp slab serifs with slight brackets. Cap height 400u, baseline y=0
// (SVG y flipped at render: we emit in y-down with cap at 0, baseline 400).

const T = 66;   // stem weight
const H = 20;   // hairline / thin stroke
const S = 15;   // serif slab thickness
const O = 34;   // serif overhang each side of stem
const CAP = 400;

// serif: solid slab + bracket trapezoid flowing into the stem (one shape, no notches)
function topSerif(x0) {
  const l = x0 - O, r = x0 + T + O;
  return `M${l},0 L${r},0 L${r},${S} L${x0 + T + 10},${S} Q${x0 + T + 2},${S} ${x0 + T},${S + 18}
          L${x0},${S + 18} Q${x0 - 2},${S} ${x0 - 10},${S} L${l},${S} Z`;
}
function botSerif(x0) {
  // wound clockwise (matches topSerif) so nonzero fill unions with stem + arm
  const l = x0 - O, r = x0 + T + O, b = CAP;
  return `M${l},${b} L${l},${b - S} L${x0 - 10},${b - S} Q${x0 - 2},${b - S} ${x0},${b - S - 18}
          L${x0 + T},${b - S - 18} Q${x0 + T + 2},${b - S} ${x0 + T + 10},${b - S} L${r},${b - S} L${r},${b} Z`;
}
const stem = x0 => `M${x0},${S} h${T} v${CAP - 2 * S} h-${T} Z`;

/* ---- L : stem + thin baseline arm + tall terminal serif at arm end ---- */
export function letterL() {
  const x0 = O;                    // stem left edge
  const armLen = 186;              // arm beyond stem
  const armR = x0 + T + armLen;    // arm right edge
  const armH = 30;                 // arm thickness at baseline
  // arm + terminal drawn as one shape: baseline slab rising into a wedge serif
  const arm = `M${x0 + T},${CAP} L${x0 + T},${CAP - armH}
     L${armR - 34},${CAP - armH} Q${armR - 10},${CAP - armH - 4} ${armR - 6},${CAP - 112}
     Q${armR + 1},${CAP - 120} ${armR},${CAP} Z`;
  return { d: [topSerif(x0), stem(x0), botSerif(x0), arm].join(' '), adv: armR + 6 };
}

/* ---- U : two serifed stems, bowl thin at bottom (vertical contrast axis) ---- */
export function letterU() {
  const xL = O, xR = O + 232;            // stems' left edges
  const bowlTop = 236;                   // y where bowl takes over
  const outerRX = (xR + T - xL) / 2;     // 145
  const cx = xL + outerRX;
  const innerRX = (xR - (xL + T)) / 2;   // 87
  const d = `
   ${topSerif(xL)} ${topSerif(xR)}
   M${xL},${S} h${T} v${bowlTop - S} h-${T} Z
   M${xR},${S} h${T} v${bowlTop - S} h-${T} Z
   M${xL},${bowlTop} A${outerRX},${CAP - bowlTop} 0 0 0 ${xR + T},${bowlTop}
   L${xR},${bowlTop} A${innerRX},${CAP - bowlTop - H} 0 0 1 ${xL + T},${bowlTop} Z`;
  return { d, adv: xR + T + O + 6, cx };
}

/* ---- Z : thin bars with beak serifs, thick diagonal ---- */
export function letterZ() {
  const w = 272, barH = 38;
  const diag = 86; // horizontal thickness of diagonal
  // clean transitional Z: flat bars, sheared bar ends, sturdy diagonal
  const d = `
   M6,0 L${w},0 L${w},${barH} L${diag},${CAP - barH} L${w - 6},${CAP - barH}
   L${w - 6},${CAP - barH - 70} L${w + 14},${CAP - barH - 70} L${w + 14},${CAP}
   L0,${CAP} L0,${CAP - barH} L${w - diag},${barH} L6,${barH}
   L6,${barH + 70} L${-14},${barH + 70} L${-14},0 Z`;
  return { d, adv: w + 18, lead: 14 };
}

/* ---- assembled wordmark: returns {content, w, h} viewBox-ready group ---- */
export function wordmark(color = '#004D27') {
  const L = letterL(), U = letterU(), Z = letterZ();
  const gapLU = 58, gapUZ = 60;
  const xU = L.adv + gapLU;
  const xZ = xU + U.adv + gapUZ + Z.lead;
  const w = xZ + Z.adv - Z.lead;
  const content = `<g fill="${color}">
    <path d="${L.d}"/>
    <g transform="translate(${xU},0)"><path d="${U.d}"/></g>
    <g transform="translate(${xZ},0)"><path d="${Z.d}"/></g>
  </g>`;
  return { content, w, h: CAP, sunCx: xU + U.cx };
}

/* ---- el sol: 8 tapered rays + disc; `rise` clips to a rising half sun ---- */
export function sunMark(color = '#E3BC62', { rise = false } = {}) {
  const R = 86, ringGap = 26, rayLen = 54, rayW = 30;
  let rays = '';
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    const r0 = R + ringGap, r1 = R + ringGap + rayLen;
    const ca = Math.cos(a), sa = Math.sin(a);
    const px = -sa, py = ca; // perpendicular
    const wid0 = rayW / 2, wid1 = rayW * 0.14;
    rays += `M${(ca * r0 + px * wid0).toFixed(1)},${(sa * r0 + py * wid0).toFixed(1)}
      L${(ca * r1 + px * wid1).toFixed(1)},${(sa * r1 + py * wid1).toFixed(1)}
      L${(ca * r1 - px * wid1).toFixed(1)},${(sa * r1 - py * wid1).toFixed(1)}
      L${(ca * r0 - px * wid0).toFixed(1)},${(sa * r0 - py * wid0).toFixed(1)} Z `;
  }
  const full = `<g fill="${color}"><circle r="${R}"/><path d="${rays}"/></g>`;
  if (!rise) return { content: full, r: R + ringGap + rayLen };
  const E = R + ringGap + rayLen;
  return {
    content: `<g><defs><clipPath id="riseclip"><rect x="${-E}" y="${-E}" width="${2 * E}" height="${E}"/></clipPath></defs>
      <g clip-path="url(#riseclip)">${full}</g>
      <rect x="${-E}" y="-7" width="${2 * E}" height="14" fill="${color}"/></g>`,
    r: E,
  };
}

/* ---- landscape band: layered monte (rounded canopies), ownable & calm ----
   Distinct from busy jungle illustration: three quiet layers, big shapes. */
export function landscapeBand(w = 1000, h = 300, { far = '#9DBF8E', mid = '#057441', near = '#004D27', sky = null, sun = '#E3BC62', sunPos = 0.5 } = {}) {
  const rnd = (seed => () => (seed = (seed * 9301 + 49297) % 233280) / 233280)(7);
  // a ridge is a run of overlapping canopy arcs riding a gentle baseline —
  // the circles merge into the fill, reading as one treeline silhouette
  const layer = (base, amp, fill, n) => {
    let canopy = '';
    let x = -40;
    while (x < w + 40) {
      const r = (0.6 + rnd()) * amp;
      const y = base + (rnd() - 0.5) * amp * 0.7;
      canopy += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}"/>`;
      x += r * (0.9 + rnd() * 0.5);
    }
    return `<g fill="${fill}">${canopy}<rect x="0" y="${base}" width="${w}" height="${h - base}"/></g>`;
  };
  // distant beige mountain (from the approved tin), sun half-hidden by the far ridge
  const mountain = `<path d="M0,${h * 0.62} L${w * 0.18},${h * 0.34} L${w * 0.34},${h * 0.52}
     L${w * 0.52},${h * 0.28} L${w * 0.7},${h * 0.5} L${w * 0.86},${h * 0.38} L${w},${h * 0.56}
     L${w},${h} L0,${h} Z" fill="#F0EFDF" opacity=".9"/>`;
  const sunEl = sun ? `<circle cx="${w * sunPos}" cy="${h * 0.34}" r="${h * 0.22}" fill="${sun}"/>` : '';
  return `<g>${sky ? `<rect width="${w}" height="${h}" fill="${sky}"/>` : ''}${mountain}${sunEl}
    ${layer(h * 0.56, 30, far)}
    ${layer(h * 0.72, 34, mid)}
    ${layer(h * 0.88, 28, near)}
  </g>`;
}

export const COLORS = {
  forest: '#004D27', gold: '#E3BC62', leaf: '#057441', beige: '#F0EFDF', white: '#FFFFFF',
  forestDeep: '#00351B', goldSoft: '#EFD9A0', cream: '#FBF8EF', ink: '#12331F',
};
