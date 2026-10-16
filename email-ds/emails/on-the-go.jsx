// CLEAR MIND, CLEAN ENERGY, ON THE GO — the Lion's Mane cans, a lifestyle
// email about drinking them on the move.
//
// Copy is Bernat's, word for word (title, paragraph, button). No build
// record yet. Further sections to follow; for now the opener and the footer.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const FONT = 'Gotham, Montserrat, sans-serif';

// The fridge photograph is 1333 x 2000, drawn 600 wide: 900 units tall.
const PHOTO_H = 900;
// Room above the photograph. The hand enters the frame about 170 units
// down and the type needs about 330, so the fridge is extended HEAD units
// upward from its own top rows (can-acai-mint-fridge-tall.jpg) and a dark
// grade in the photograph's own warm near-black — not green (Bernat) —
// holds the type and lets go above the hand.
const HEAD = 190;
// The button: under the can, on the glass of the shelf it was lifted from.
const CTA_TOP = HEAD + 790;

const SECTION_1_ALT =
  'Milonga. Clear mind, clean energy, on the go. Find your flow and feel ready ' +
  'for whatever the day brings. Smooth, balanced energy to help you feel ' +
  'focused, clear-headed, and in your element. A hand lifts a can of Milonga ' +
  'Yerba Mate in Açaí Mint from a fridge shelf between other cans. Get it now.';


// ── Section 2 · what is in the can ─────────────────────────────────────────
// The tilted Peach Ginger can (can-peach-ginger-lm-tilt.png, trimmed to
// 474 x 886) stands in the middle, CAN_H tall. Its top leans right, so the
// open ground is upper-left and lower-right: the four callouts zig-zag —
// left, right, left, right — so every arrow has room to run.
//
// THE ARROWS TOUCH THE CAN (design memory, T8). Each starts on the can's own
// silhouette at its card's height; SILHOUETTE is the can's left and right
// edge, in file pixels, measured from the PNG's alpha every 5% of its height.
const CAN = { w: 474, h: 886 };
const CAN_H = 520;
const CAN_K = CAN_H / CAN.h;
const CAN_LEFT = 300 - (CAN.w * CAN_K) / 2;
const SILHOUETTE = [[156, 422], [156, 422], [140, 472], [131, 467], [122, 459], [113, 449], [103, 439], [94, 429],
  [85, 419], [76, 409], [67, 399], [58, 389], [49, 379], [40, 369], [30, 359], [21, 349], [13, 339], [3, 329],
  [11, 319], [48, 306], [48, 306]];
// The can's edge, in design units from the diagram's left, at a fraction f
// of its height.
function canEdge(f, side) {
  const i = Math.min(19, Math.floor(f * 20)), t = f * 20 - i;
  const v = SILHOUETTE[i][side] + (SILHOUETTE[i + 1][side] - SILHOUETTE[i][side]) * t;
  return CAN_LEFT + v * CAN_K;
}
// THE CARDS ARE WIDE ENOUGH TO READ ON A PHONE (Klaviyo scales the image to
// about 0.6), which a 600 frame with a tilted can only allows if the outer
// two sit beyond the can's ends: Yerba Mate above its top-left shoulder,
// Clean ingredients below its foot on the right. Each callout gives its card
// centre (cy, units from the can's top) and where its arrow leaves the can
// (f, a fraction of the can's height, on the card's side).
// BENEFIT LINES are Bernat's except four, swapped under the standing
// no-health-claims rule (his to reverse): "healthy gut, immune system" and
// "boost metabolism" (Yerba Mate) give way to "No jitters, no crash", from
// the product file; "antioxidants and vitamins" narrows to "Natural
// antioxidants"; "mood support" (Lion's Mane) becomes "Mental clarity", also
// the product file's; "relaxation and stress support" (L-Theanine) becomes
// "Relaxed, steady focus".
const CAN_TOP = 150; // room above the can for the first card
const CARD_W = 168;
const CARD_X = 10;
const CALLOUTS = [
  { side: 'left', cy: -60, f: 0.06, mark: 'yerba-mate', name: 'Yerba Mate',
    lines: ['Clean, sustained energy', 'Natural antioxidants', 'No jitters, no crash'] },
  { side: 'left', cy: 150, f: 0.29, mark: 'l-theanine', name: 'L-Theanine',
    lines: ['Calm & balance', 'Relaxed, steady focus'] },
  { side: 'right', cy: 360, f: 0.69, mark: 'lions-mane', name: 'Lion’s Mane',
    lines: ['Focus & concentration', 'Cognitive support', 'Mental clarity'] },
  { side: 'right', cy: 580, f: 0.9, mark: 'clean', name: 'Clean ingredients',
    lines: ['Organic, plant-based', 'Non-GMO', 'No artificial sweeteners'] },
];
const DIAGRAM_H = CAN_TOP + 580 + 95;

const SECTION_2_ALT =
  'A can of Milonga Yerba Mate in Peach Ginger. Yerba mate: clean, sustained ' +
  'energy, natural antioxidants, no jitters, no crash. Lion’s Mane: focus and ' +
  'concentration, cognitive support, mental clarity. L-Theanine: calm and ' +
  'balance, relaxed, steady focus. Clean ingredients: organic, plant-based, ' +
  'non-GMO, no artificial sweeteners.';

// A sprout for "clean ingredients", drawn in cream for the forest disc — the
// brand set has no mark for it.
const SPROUT = h('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
  h('path', { d: 'M12 21 V11', fill: 'none', stroke: '#F0EFDF', strokeWidth: 2, strokeLinecap: 'round' }),
  h('path', { d: 'M12 12 C12 7.5 9 5 4.5 5 C4.5 9.5 7.5 12 12 12 Z', fill: '#F0EFDF' }),
  h('path', { d: 'M12 14.5 C12 10.5 14.8 8.5 19.5 8.5 C19.5 12.5 16.5 14.5 12 14.5 Z', fill: '#F0EFDF' }));

function Callout(c, i) {
  const left = c.side === 'left';
  return h('div', { key: i, style: { position: 'absolute', top: CAN_TOP + c.cy,
    [left ? 'left' : 'right']: CARD_X, width: CARD_W, transform: 'translateY(-50%)', boxSizing: 'border-box',
    background: '#FFFFFF', borderRadius: 20, padding: '15px 14px 15px',
    border: '1px solid rgba(0,77,39,0.10)', boxShadow: '0 10px 22px rgba(0,53,27,0.10), 0 2px 5px rgba(0,53,27,0.07)' } },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      h('span', { style: { flex: 'none', width: 34, height: 34, borderRadius: 999, background: FOREST,
        display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        c.mark === 'clean' ? SPROUT : h(M.BrandIcon, { mark: c.mark, ink: 'cream', size: 23, alt: '' })),
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 13.5, lineHeight: 1.1,
        letterSpacing: '0.04em', textTransform: 'uppercase', color: FOREST } },
        // Never broken at a hyphen: L-Theanine stays whole.
        c.name.split(' ').flatMap((w, k) => [k ? ' ' : null, h('span', { key: k, style: { whiteSpace: 'nowrap' } }, w)]))),
    h('div', { style: { marginTop: 9 } },
      c.lines.map((t, j) => h('div', { key: j, style: { display: 'flex', gap: 7, alignItems: 'baseline',
        marginTop: j ? 6 : 0, fontFamily: FONT, fontWeight: 600, fontSize: 13.5, lineHeight: 1.3, color: FOREST } },
        h('span', { style: { flex: 'none', width: 6, height: 6, borderRadius: 999, background: GOLD,
          transform: 'translateY(-2px)' } }), t))),
  );
}

// One arrow: from a dot on the can's edge, a soft S-curve out to the card's
// inner edge at its middle, ending in an open chevron just short of it.
function Arrow(c, i) {
  const left = c.side === 'left';
  const dir = left ? -1 : 1; // outward from the can
  const y0 = CAN_TOP + c.f * CAN_H;
  const x0 = canEdge(c.f, left ? 0 : 1) - dir * 3;
  const y1 = CAN_TOP + c.cy;
  const x1 = left ? CARD_X + CARD_W + 9 : 600 - CARD_X - CARD_W - 9;
  const k = Math.abs(x1 - x0) * 0.6;
  const d = `M ${x0} ${y0} C ${x0 + dir * k} ${y0}, ${x1 - dir * k} ${y1}, ${x1} ${y1}`;
  return h('g', { key: i },
    h('path', { d, fill: 'none', stroke: FOREST, strokeWidth: 1.6, strokeLinecap: 'round' }),
    h('circle', { cx: x0, cy: y0, r: 3.4, fill: FOREST, stroke: '#FFFFFF', strokeWidth: 1.4 }),
    h('path', { d: `M ${x1 - dir * 6} ${y1 - 5} L ${x1} ${y1} L ${x1 - dir * 6} ${y1 + 5}`, fill: 'none',
      stroke: FOREST, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

function OnTheGo({ shopHref = '#shop' }) {
  const title = { fontFamily: FONT, fontWeight: 900, fontSize: 44, lineHeight: 1.02,
    letterSpacing: '0.01em', textTransform: 'uppercase', color: '#FFFFFF' };
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    h('div', { style: { position: 'relative', height: HEAD + PHOTO_H, overflow: 'hidden', background: '#0D0B09' } },
      h('img', { src: '../public/product/can-acai-mint-fridge-tall.jpg', alt: SECTION_1_ALT,
        style: { position: 'absolute', top: 0, left: 0, display: 'block', width: 600, height: 'auto' } }),
      // The dark grade: the fridge's own warm near-black at the head, clear
      // by the hand. The foot still darkens so the button sits on dark glass.
      h('div', { style: { position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(13,11,9,0.94) 0%, rgba(13,11,9,0.86) 12%, rgba(13,11,9,0.66) 22%, rgba(13,11,9,0.32) 29%, rgba(13,11,9,0) 36%, rgba(0,53,27,0) 82%, rgba(0,53,27,0.55) 91%, rgba(0,45,23,0.85) 100%)' } }),
      h('div', { style: { position: 'absolute', top: 30, left: 36, right: 36, textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,26,13,0.6), 0 1px 2px rgba(0,26,13,0.5)' } },
        h(M.Logo, { tone: 'gold', variant: 'primary', height: 70 }),
        h('div', { style: { marginTop: 20 } },
          h('div', { style: title }, 'Clear mind'),
          h('div', { style: title }, 'Clean energy'),
          h('div', { style: { ...title, color: GOLD, fontStyle: 'italic', fontWeight: 800, marginTop: 2 } }, 'on the go')),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
          color: '#FFFFFF', margin: '14px auto 0', maxWidth: 480 } },
          'Find your flow and feel ready for whatever the day brings. Smooth, balanced energy to help you feel focused, ',
          h('span', { style: { whiteSpace: 'nowrap' } }, 'clear-headed,'), ' and in your element.'),
      ),
      h('div', { style: { position: 'absolute', top: CTA_TOP, left: 0, right: 0, textAlign: 'center' } },
        h('div', { style: { display: 'inline-block', borderRadius: 999,
          boxShadow: '0 10px 24px rgba(0,26,13,0.5), 0 2px 6px rgba(0,26,13,0.4)' } },
          h(M.Button, { label: 'Get it now', href: shopHref, bg: 'forest', size: 'lg' }))),
    ),

    // ── 2 · WHAT IS IN THE CAN ────────────────────────────────────────────
    // Beige, the can big in the middle, four white callouts with an arrow
    // from the can to each.
    h('div', { style: { position: 'relative', padding: '40px 0 40px' } },
      h('div', { style: { position: 'relative', height: DIAGRAM_H } },
        h('img', { src: '../public/product/can-peach-ginger-lm-tilt.png', alt: SECTION_2_ALT,
          style: { position: 'absolute', top: CAN_TOP, left: CAN_LEFT, height: CAN_H, width: 'auto', display: 'block',
            filter: 'drop-shadow(0 22px 22px rgba(0,53,27,0.22))' } }),
        h('svg', { width: 600, height: DIAGRAM_H, style: { position: 'absolute', top: 0, left: 0, overflow: 'visible' } },
          CALLOUTS.map(Arrow)),
        CALLOUTS.map(Callout),
      ),
    ),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
