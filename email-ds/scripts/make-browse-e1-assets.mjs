// Art for browse abandonment email 1: the first section's BACKGROUND.
//
// Bernat's photo (the pouch beside an iced Mate Latte, milk pouring in),
// extended both ways so it can carry the whole first section:
//   top    the gold wall continues up so the title sits on it. The hand that
//          pours touches the photo's top edge, so the forearm is continued up
//          and to the right (leaving the frame), not smeared straight up
//   bottom the cream table continues down and fades into the email's beige,
//          so the rest of the email carries on from the table
// plus three short hand-drawn arrows coming out of the cup.
//
//   hero-bg.jpg          desktop (600 wide)
//   hero-bg-mobile.jpg   phones (390 wide): taller top, so the title fits
//
// Usage: node scripts/make-browse-e1-assets.mjs
import sharp from 'sharp';

const OUT = 'exports/klaviyo/browse-e1/img';
const SRC = 'exports/klaviyo/browse-e1/src-86.webp'; // 2000x2000
const BEIGE = [0xF0, 0xEF, 0xDF];

async function compose({ W, T, B, lean, arrows, file }) {
  // W: output width (2x); T/B: rows added above/below (2x); photo is W x W
  const { data: ph } = await sharp(SRC).resize({ width: W }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const P = W, H = T + P + B;
  const out = Buffer.alloc(W * H * 3);
  ph.copy(out, T * W * 3);

  // ── top: wall + forearm ───────────────────────────────────────────────
  const top = new Float64Array(W * 3);
  for (let y = 0; y < 4; y++) for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) top[x * 3 + c] += ph[(y * W + x) * 3 + c] / 4;
  // wall colour from the left half (no hand there); arm = pixels far from it
  const wall = [0, 0, 0]; let n = 0;
  for (let x = 0; x < W * 0.6; x++) { for (let c = 0; c < 3; c++) wall[c] += top[x * 3 + c]; n++; }
  for (let c = 0; c < 3; c++) wall[c] /= n;
  const dist = (x) => Math.hypot(top[x * 3] - wall[0], top[x * 3 + 1] - wall[1], top[x * 3 + 2] - wall[2]);
  const arm = new Float64Array(W); // 0 = wall, 1 = arm, soft edge
  for (let x = 0; x < W; x++) arm[x] = Math.max(0, Math.min(1, (dist(x) - 14) / 16));
  // the wall's own horizontal light falloff, read from row 0 where it is wall, else the mean
  const wallRow = new Float64Array(W * 3);
  for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) wallRow[x * 3 + c] = arm[x] < 0.05 ? top[x * 3 + c] : wall[c];
  for (let pass = 0; pass < 3; pass++) { // smooth it
    const tmp = Float64Array.from(wallRow);
    for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { let s = 0, k = 0; for (let d = -30; d <= 30; d++) { const xx = Math.min(W - 1, Math.max(0, x + d)); s += tmp[xx * 3 + c]; k++; } wallRow[x * 3 + c] = s / k; }
  }
  for (let d = 1; d <= T; d++) {
    const y = T - d; // rows going up
    const shift = d * lean; // the forearm leans up and to the right
    const fade = Math.min(1, d / 40); // first rows: continue the photo's own top row exactly
    for (let x = 0; x < W; x++) {
      const sx = x - shift, x0 = Math.floor(sx), t = sx - x0;
      const pick = (xx, c) => (xx < 0 ? wallRow[c] : xx >= W ? wallRow[(W - 1) * 3 + c] : top[xx * 3 + c]);
      const am = sx < 0 || sx >= W - 1 ? 0 : arm[x0] * (1 - t) + arm[x0 + 1] * t;
      for (let c = 0; c < 3; c++) {
        const skin = pick(x0, c) * (1 - t) + pick(x0 + 1, c) * t;
        // a touch of shade as the forearm rises, so it reads round, not flat
        const shade = 1 - 0.06 * Math.min(1, d / 300);
        const v = am * skin * shade + (1 - am) * wallRow[x * 3 + c];
        const photoTop = top[x * 3 + c];
        out[(y * W + x) * 3 + c] = Math.round(fade < 1 ? photoTop * (1 - fade) + v * fade : v);
      }
    }
  }

  // ── bottom: table -> beige ────────────────────────────────────────────
  const col = new Float64Array(W * 3);
  for (let y = P - 12; y < P; y++) for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) col[x * 3 + c] += ph[(y * W + x) * 3 + c] / 12;
  const sm = new Float64Array(W * 3);
  for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { let s = 0, k = 0; for (let d = -40; d <= 40; d++) { const xx = Math.min(W - 1, Math.max(0, x + d)); s += col[xx * 3 + c]; k++; } sm[x * 3 + c] = s / k; }
  for (let y = 0; y < B; y++) {
    const t = y / (B - 1), k = t * t * (3 - 2 * t);
    for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) out[((T + P + y) * W + x) * 3 + c] = Math.round(sm[x * 3 + c] * (1 - k) + BEIGE[c] * k);
  }

  // soften the made-up part of the top (repeating a single row leaves faint
  // streaks in the forearm); the last 40 rows blend into the real photo
  const ext = await sharp(out, { raw: { width: W, height: H, channels: 3 } }).extract({ left: 0, top: 0, width: W, height: T - 40 }).blur(3.2).raw().toBuffer();
  ext.copy(out, 0);

  // ── arrows: tapered, hand-drawn, out of the cup ───────────────────────
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${arrows(T, W).join('')}</svg>`;
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).composite([{ input: Buffer.from(svg) }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`${OUT}/${file}`);
  console.log(file, W + 'x' + H, '(shows at ' + W / 2 + 'x' + H / 2 + ')');
}

// One hand-drawn arrow along a quadratic curve p0 -> c -> p1 (2x pixels):
// a body that swells and tapers, and an open two-stroke head, all filled shapes.
function arrow([x0, y0], [cx, cy], [x1, y1], w = 8, head = 28, color = '#004D27') {
  const N = 40, L = [], R = [];
  const pt = (t) => [(1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1];
  for (let i = 0; i <= N; i++) {
    const t = i / N, [x, y] = pt(t), [xa, ya] = pt(Math.max(0, t - 0.01)), [xb, yb] = pt(Math.min(1, t + 0.01));
    const dx = xb - xa, dy = yb - ya, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    const half = (w / 2) * (0.25 + 0.95 * Math.sin(Math.PI * Math.min(1, t * 1.15)) ** 0.7) * (t > 0.85 ? 0.85 : 1);
    L.push(`${(x + nx * half).toFixed(1)},${(y + ny * half).toFixed(1)}`);
    R.unshift(`${(x - nx * half).toFixed(1)},${(y - ny * half).toFixed(1)}`);
  }
  // head: two tapered strokes back from the tip
  const [ex, ey] = pt(1), [px, py] = pt(0.94), a = Math.atan2(ey - py, ex - px);
  const wing = (s) => {
    const b = a + Math.PI + s * 0.62, tx = ex + Math.cos(b) * head, ty = ey + Math.sin(b) * head;
    const nx = -Math.sin(b), ny = Math.cos(b), hw = w * 0.42;
    return `<path d="M${(ex + nx * hw).toFixed(1)},${(ey + ny * hw).toFixed(1)} L${(ex - nx * hw).toFixed(1)},${(ey - ny * hw).toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)} Z" fill="${color}" stroke="${color}" stroke-width="${(w * 0.25).toFixed(1)}" stroke-linejoin="round"/>`;
  };
  return `<path d="M${L.join(' L')} L${R.join(' L')} Z" fill="${color}"/>${wing(1)}${wing(-1)}<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(w * 0.45).toFixed(1)}" fill="${color}"/>`;
}

// Desktop: 600 wide, photo 600x600 starting at y=320, table extension 200.
// The cup sits at x 330–540, y 330–525 of the photo. Arrows (600px coords x2)
// leave the cup's base and point toward the three cards below it.
await compose({
  W: 1200, T: 640, B: 400, lean: 0.62, file: 'hero-bg.jpg',
  arrows: (T) => {
    const Y = (y) => T + y * 2, X = (x) => x * 2;
    return [
      // cards sit at x 72–600 in three 176px columns: centres 160, 336, 512
      arrow([X(334), Y(498)], [X(262), Y(520)], [X(214), Y(592)]), // caffeine, down-left
      arrow([X(392), Y(534)], [X(372), Y(566)], [X(352), Y(598)]), // L-theanine, down
      arrow([X(482), Y(530)], [X(506), Y(556)], [X(512), Y(598)]), // Lion's Mane, down
    ];
  },
});

// Phones: 390 wide, the gold wall taller (330) so the title fits above the
// pouch, the table longer (260) for the taller cards. Cards are three equal
// columns after a 4px lead: centres ~66, 190, 314 (of 375-390).
await compose({
  W: 780, T: 660, B: 520, lean: 0.62, file: 'hero-bg-mobile.jpg',
  arrows: (T) => {
    const Y = (y) => T + (y - 330) * 2, X = (x) => x * 2; // 1x phone coords, photo starts at 330
    return [
      arrow([X(217), Y(652)], [X(160), Y(662)], [X(92), Y(722)], 6.5, 22),  // caffeine
      arrow([X(255), Y(679)], [X(236), Y(700)], [X(205), Y(724)], 6.5, 22), // L-theanine
      arrow([X(313), Y(677)], [X(326), Y(700)], [X(318), Y(724)], 6.5, 22), // Lion's Mane
    ];
  },
});
