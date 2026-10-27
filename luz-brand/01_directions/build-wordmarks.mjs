// LUZ draft wordmarks — three territories, hand-built geometry.
// Optical corrections applied: bowl overshoot below baseline, diagonal strokes
// drawn wider than verticals, horizontals drawn thinner than verticals,
// asymmetric letter-spacing (Z opens left, so U–Z is tighter than L–U).
import { writeFileSync } from 'node:fs';

const CREAM = '#F7EFE0', ESPRESSO = '#2B1F14', ORO_A = '#D9A441';
const INK_B = '#27221B', ORO_B = '#DCA94E', TERRA = '#C65A33';
const NIGHT = '#1D1710', ORO_C = '#E0A33B', CREAM_C = '#F5EBD8';

const svg = (w, h, inner, bg = null) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${inner}</svg>`;

/* ---------- A · HORA DORADA — flared semi-serif, sun held in the U ---------- */
// Flared vertical stem: concave sides, waist narrower than ends.
function flaredStem(xc, yT, yB, wEnd, wWaist) {
  const he = wEnd / 2, hw = wWaist / 2, ym = (yT + yB) / 2;
  return `M${xc - he},${yT} C${xc - hw},${yT + 40} ${xc - hw},${ym} ${xc - hw},${ym}
          C${xc - hw},${ym} ${xc - hw},${yB - 40} ${xc - he},${yB}
          L${xc + he},${yB} C${xc + hw},${yB - 40} ${xc + hw},${ym} ${xc + hw},${ym}
          C${xc + hw},${ym} ${xc + hw},${yT + 40} ${xc + he},${yT} Z`;
}
function buildA() {
  const yT = 60, yB = 220, stemW = 40, waist = 32;
  const barH = 30, barWaist = 24; // horizontals optically thinner
  const parts = [];
  // L — stem + flared bottom arm with a gently splayed terminal
  const Lx = 72;
  parts.push(`<path d="${flaredStem(Lx, yT, yB, stemW, waist)}" fill="${ESPRESSO}"/>`);
  parts.push(`<path d="M${Lx},${yB} L${Lx},${yB - barH}
    L${Lx + 112},${yB - barH - 4} L${Lx + 126},${yB} Z" fill="${ESPRESSO}"/>`);
  // U — outer silhouette with 6px overshoot below baseline, inner counter
  const Ux = 248, Uw = 150, r = Uw / 2, ri = r - stemW + 4, os = 6;
  const uL = Ux, uR = Ux + Uw, cx = Ux + r, cy = yB - r;
  parts.push(`<path d="M${uL},${yT} L${uL + stemW - 4},${yT} L${uL + stemW - 4},${cy}
    A${ri},${ri + os} 0 0 0 ${uR - stemW + 4},${cy} L${uR - stemW + 4},${yT} L${uR},${yT}
    L${uR},${cy} A${r},${r + os} 0 0 1 ${uL},${cy} Z" fill="${ESPRESSO}" fill-rule="evenodd"/>`);
  // the sun — gold disc floating in the U's counter (also the standalone symbol seed)
  parts.push(`<circle cx="${cx}" cy="${yT + 52}" r="23" fill="${ORO_A}"/>`);
  // Z — top bar, wide diagonal (diagonals need extra weight), bottom bar
  const Zx = 452, Zw = 138, diag = 46;
  parts.push(`<path d="M${Zx},${yT} L${Zx + Zw},${yT} L${Zx + Zw},${yT + barWaist}
    L${Zx + diag},${yB - barH} L${Zx + Zw},${yB - barH} L${Zx + Zw},${yB}
    L${Zx},${yB} L${Zx},${yB - barWaist} L${Zx + Zw - diag},${yT + barH} L${Zx},${yT + barH} Z"
    fill="${ESPRESSO}" fill-rule="evenodd"/>`);
  return svg(660, 280, parts.join('\n'));
}

/* ---------- B · LA RONDA — round mono-stroke geometry + ronda ring ---------- */
function buildB() {
  const sw = 36, yT = 64, yB = 216;
  const s = (d, color = INK_B) =>
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const parts = [];
  // ronda ring — three arcs, three people round the gourd; gap = the open seat
  const rc = { x: 86, y: 140, r: 44 };
  const arc = (a0, a1, color) => {
    const p = a => [rc.x + rc.r * Math.cos(a), rc.y + rc.r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${rc.r},${rc.r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}"
      fill="none" stroke="${color}" stroke-width="13" stroke-linecap="round"/>`;
  };
  const T = Math.PI / 180;
  parts.push(arc(-80 * T, 25 * T, ORO_B), arc(45 * T, 150 * T, TERRA), arc(170 * T, 255 * T, INK_B));
  // L
  parts.push(s(`M196,${yT} L196,${yB} L300,${yB}`));
  // U — full half-circle bowl (the vessel), 5px optical overshoot
  parts.push(s(`M362,${yT} L362,148 A62,67 0 0 0 486,148 L486,${yT}`));
  // Z — rounded joins; horizontal bars pulled in 2px so weight reads even
  parts.push(s(`M560,${yT + 2} L688,${yT + 2} L560,${yB - 2} L688,${yB - 2}`));
  return svg(760, 280, parts.join('\n'));
}

/* ---------- C · LUZ DE ORO — condensed heavy caps, beam cut ---------- */
function buildC() {
  const yT = 48, yB = 232, st = 38, w = 104, gap = 28;
  let x = 70;
  const letters = [];
  // L
  letters.push(`M${x},${yT} h${st} v${yB - yT - st} h${w - st} v${st} h-${w} Z`);
  x += w + gap;
  // U — squared, rounded bottom corners, 5px overshoot; counter cut via evenodd
  const R = 30, uB = yB + 5, cw = w - 2 * st, ri = Math.min(12, cw / 2 - 1);
  letters.push(`M${x},${yT} h${w} v${uB - yT - R} q0,${R} -${R},${R} h-${w - 2 * R} q-${R},0 -${R},-${R} Z
    M${x + st},${yT} h${cw} v${uB - yT - st - ri} q0,${ri} -${ri},${ri} h-${cw - 2 * ri} q-${ri},0 -${ri},-${ri} Z`);
  x += w + gap;
  // Z — diagonal drawn slightly wider than stems (optical), bars thinner
  const zw = 112, bar = st - 6, d = st + 4, zB = yB;
  letters.push(`M${x},${yT} h${zw} v${bar} l-${zw - d},${zB - yT - 2 * bar} h${zw - d} v${bar} h-${zw} v-${bar} l${zw - d},-${zB - yT - 2 * bar} h-${zw - d} Z`);
  const zCx = x + zw / 2;
  return svg(560, 280, `
  <defs><mask id="beam"><rect width="560" height="280" fill="#fff"/>
    <g transform="rotate(20 ${zCx} 140)"><rect x="${zCx - 7}" y="-60" width="14" height="400" fill="#000"/></g>
  </mask></defs>
  <g mask="url(#beam)" fill="${ORO_C}">${letters.map(d2 => `<path d="${d2}" fill-rule="evenodd"/>`).join('')}</g>`,
  NIGHT);
}

writeFileSync('wordmark-A-hora-dorada.svg', buildA());
writeFileSync('wordmark-B-la-ronda.svg', buildB());
writeFileSync('wordmark-C-luz-de-oro.svg', buildC());
console.log('wrote 3 wordmarks');
