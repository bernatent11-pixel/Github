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
// The Peach Ginger can stands in the middle, CAN_H tall, with two callouts
// on its left and two on its right, all four inside the can's own height —
// beside it, never above or below (Bernat). Bernat's render leans 12°, which
// leaves no room beside its lower-left and upper-right, so the can is stood
// upright (can-peach-ginger-lm-upright.png: the same render rotated -12° and
// trimmed, 334 x 888). Upright, its sides are straight: the left edge sits 3
// file px in, the right 328 — so every arrow is one straight hairline of the
// same length, from the can's edge to its card.
//
// THE ARROWS TOUCH THE CAN (design memory, T8): each one ends ON the
// silhouette, a dot on the can, an open chevron at the card.
const CAN = { w: 334, h: 888, edgeL: 3, edgeR: 328 };
const CAN_H = 490;
const CAN_K = CAN_H / CAN.h;
const CAN_LEFT = 300 - (CAN.w * CAN_K) / 2;
const CAN_EDGE_L = CAN_LEFT + CAN.edgeL * CAN_K + 2; // a touch inside the edge
const CAN_EDGE_R = CAN_LEFT + CAN.edgeR * CAN_K - 2;
// THE CARDS ARE WIDE ENOUGH TO READ ON A PHONE (Klaviyo scales the image to
// about 0.6) and the arrows still get room to run.
const CARD_W = 160;
const CARD_X = 12;
const ARROW_L = CAN_EDGE_L - (CARD_X + CARD_W);
const ARROW_R = (600 - CARD_X - CARD_W) - CAN_EDGE_R;
// BENEFIT LINES are Bernat's except three, swapped under the standing
// no-health-claims rule (his to reverse): "boost metabolism" (Yerba Mate)
// gives way to "No jitters, no crash", from the product file; "antioxidants
// and vitamins" narrows to "Natural antioxidants"; "mood support" (Lion's
// Mane) becomes "Mental clarity", also the product file's; "relaxation and
// stress support" (L-Theanine) becomes "Relaxed, steady focus". "Healthy
// gut, immune system" is Bernat's and STAYS: he confirmed on 2026-10-16 that
// he and the founder approve it for Yerba Mate. Not to be flagged again.
const LEFT = [
  { mark: 'yerba-mate', name: 'Yerba Mate',
    lines: ['Clean, sustained energy', 'Natural antioxidants', 'Healthy gut, immune system', 'No jitters, no crash'] },
  { mark: 'l-theanine', name: 'L-Theanine',
    lines: ['Calm & balance', 'Relaxed, steady focus'] },
];
const RIGHT = [
  { mark: 'lions-mane', name: 'Lion’s Mane',
    lines: ['Focus & concentration', 'Cognitive support', 'Mental clarity'] },
  { mark: 'clean', name: 'Clean ingredients',
    lines: ['Organic, plant-based', 'Non-GMO', 'No artificial sweeteners'] },
];

const SECTION_2_ALT =
  'Everything your body requires. Everything you need to feel your best, all ' +
  'in one can. Clean energy, sharper focus, a sense of calm, and plant-based ' +
  'ingredients to support your everyday well-being. ' +
  'A can of Milonga Yerba Mate in Peach Ginger. Yerba mate: clean, sustained ' +
  'energy, natural antioxidants, healthy gut, immune system, no jitters, no crash. Lion’s Mane: focus and ' +
  'concentration, cognitive support, mental clarity. L-Theanine: calm and ' +
  'balance, relaxed, steady focus. Clean ingredients: organic, plant-based, ' +
  'non-GMO, no artificial sweeteners.';

// A sprout for "clean ingredients", drawn in cream for the forest disc — the
// brand set has no mark for it.
const SPROUT = h('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
  h('path', { d: 'M12 21 V11', fill: 'none', stroke: '#F0EFDF', strokeWidth: 2, strokeLinecap: 'round' }),
  h('path', { d: 'M12 12 C12 7.5 9 5 4.5 5 C4.5 9.5 7.5 12 12 12 Z', fill: '#F0EFDF' }),
  h('path', { d: 'M12 14.5 C12 10.5 14.8 8.5 19.5 8.5 C19.5 12.5 16.5 14.5 12 14.5 Z', fill: '#F0EFDF' }));

// A callout card, carrying its own arrow: a straight hairline from the
// card's inner edge at its middle to the can's edge.
function Callout(c, i, side) {
  const left = side === 'left';
  const len = left ? ARROW_L : ARROW_R;
  return h('div', { key: i, style: { position: 'relative', width: CARD_W, boxSizing: 'border-box', textAlign: 'left',
    background: '#FFFFFF', borderRadius: 20, padding: '15px 14px 15px',
    border: '1px solid rgba(0,77,39,0.10)', boxShadow: '0 10px 22px rgba(0,53,27,0.10), 0 2px 5px rgba(0,53,27,0.07)' } },
    h('svg', { width: len, height: 14, viewBox: `0 0 ${len} 14`, style: { position: 'absolute', top: '50%',
      [left ? 'left' : 'right']: '100%', marginTop: -7, overflow: 'visible' } },
      left
        ? [h('path', { key: 'l', d: `M 7 7 H ${len}`, stroke: FOREST, strokeWidth: 1.6, strokeLinecap: 'round' }),
           h('path', { key: 'c', d: 'M 13 2 L 7 7 L 13 12', fill: 'none', stroke: FOREST, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }),
           h('circle', { key: 'd', cx: len, cy: 7, r: 3.4, fill: FOREST, stroke: '#FFFFFF', strokeWidth: 1.4 })]
        : [h('path', { key: 'l', d: `M 0 7 H ${len - 7}`, stroke: FOREST, strokeWidth: 1.6, strokeLinecap: 'round' }),
           h('path', { key: 'c', d: `M ${len - 13} 2 L ${len - 7} 7 L ${len - 13} 12`, fill: 'none', stroke: FOREST, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }),
           h('circle', { key: 'd', cx: 0, cy: 7, r: 3.4, fill: FOREST, stroke: '#FFFFFF', strokeWidth: 1.4 })]),
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

// A column of two callouts, spread over the can's height.
function Column(items, side) {
  return h('div', { style: { position: 'absolute', top: 0, height: CAN_H, [side]: CARD_X, width: CARD_W,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' } },
    items.map((c, i) => Callout(c, i, side)));
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
    // Beige. The section title in the campaign's anatomy — eyebrow, headline
    // with its second line set apart (by slant: beige takes no gold type),
    // paragraph — then the can in the middle with two callouts either side.
    h('div', { style: { padding: '56px 0 60px', textAlign: 'center' } },
      h('div', { style: { padding: '0 32px' } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: FOREST, marginBottom: 14 } }, 'Inside every can'),
        h(M.Headline, { line1: 'Everything your', line2: 'body requires', bg: 'beige', size: 40, align: 'center', italic: true }),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
          color: '#12331F', maxWidth: 480, margin: '16px auto 0' } },
          'Everything you need to feel your best, all in one can. Clean energy, sharper focus, a sense of calm, and plant-based ingredients to support your everyday well-being.')),
      h('div', { style: { position: 'relative', height: CAN_H, marginTop: 40 } },
        h('img', { src: '../public/product/can-peach-ginger-lm-upright.png', alt: SECTION_2_ALT,
          style: { position: 'absolute', top: 0, left: CAN_LEFT, height: CAN_H, width: 'auto', display: 'block',
            filter: 'drop-shadow(0 22px 22px rgba(0,53,27,0.22))' } }),
        Column(LEFT, 'left'),
        Column(RIGHT, 'right'),
      ),
    ),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
