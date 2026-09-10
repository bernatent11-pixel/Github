// Campaign: "Everything your mornings need" — the ingredient education email.
// The flat-lay photo is the hero and its cream carries on as the email's
// background, so the picture never looks pasted onto a different colour.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (offer, urgency).
// Specs from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  handPour: '../public/product/pouch-hand-pour-big.png',
  mate: '../public/product/ing-yerba-mate.png',
  lionsMane: '../public/product/ing-lions-mane.png',
  theanine: '../public/product/ing-theanine.png',
};

// The page colour is sampled from the bottom edge of the hero photograph, so
// the picture ends and the email carries on in the same cream with no seam.
const PAGE = '#E0CFBC';

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

const GOLD = '#E3BC62';
const FOREST = '#004D27';

// A callout pinned over the hero: the mark and its dose ride in a cream pill
// with a hairline arrow running back toward the product. The pill matters —
// a label sitting straight on a photograph is legible over cream and invisible
// over a leaf, and you cannot control which one a crop lands on.
function Callout({ bg, mark, label, at, arrow }) {
  return h('div', { style: { position: 'absolute', ...at } },
    arrow ? h('svg', {
      width: arrow.w, height: arrow.h, viewBox: `0 0 ${arrow.w} ${arrow.h}`,
      style: { position: 'absolute', ...arrow.at, overflow: 'visible' },
    },
      h('path', {
        d: arrow.d, fill: 'none', stroke: FOREST, strokeWidth: 1.6,
        strokeLinecap: 'round', opacity: 0.8,
      }),
      h('circle', { cx: arrow.tip[0], cy: arrow.tip[1], r: 3.4, fill: FOREST, opacity: 0.8 })
    ) : null,
    h('div', { style: {
      display: 'inline-flex', alignItems: 'center', gap: 9,
      background: 'rgba(255,253,247,0.94)',
      borderRadius: 999, padding: '5px 15px 5px 5px',
      boxShadow: '0 3px 14px rgba(60,44,20,0.20)',
    } },
      h(M.IconBadge, { mark, bg, size: 38, fill: GOLD, ink: 'forest', halo: true }),
      h('span', { style: {
        fontFamily: M.fontStack, fontWeight: 900, fontSize: 11, letterSpacing: '0.07em',
        textTransform: 'uppercase', color: FOREST, lineHeight: 1.2, whiteSpace: 'nowrap',
      } }, label)
    )
  );
}

// One ingredient: photograph on the left, the case for it on the right.
function Ingredient({ bg, src, line1, line2, bullets }) {
  return h(M.Section, { bg, pad: 'lg' },
    h('div', { style: { display: 'flex', gap: 20, alignItems: 'flex-start' } },
      h('div', { style: { flex: '0 0 34%', width: '34%' } },
        h(M.ImageSlot, { bg, src, cutout: true, ratio: 'square', alt: line1 })
      ),
      h('div', { style: { flex: 1 } },
        h(M.Headline, { bg, line1, line2, size: 22, align: 'left' }),
        h('div', { style: { height: 16 } }),
        h(M.SpecPills, { bg, items: bullets, variant: 'gold', align: 'left', size: 11 })
      )
    )
  );
}

function ThreeIngredients({ shopHref = '#' }) {
  // The email is cream because the hero photograph is — the picture ends and
  // the page keeps going in the same colour.
  const bg = 'beige';

  return h(M.EmailShell, { bg, fill: PAGE },

    // ═══ ACT 1 · HEADER — logo, title and copy over the flat-lay ═══
    h('div', { style: { position: 'relative' } },
      h('img', {
        src: IMG.flatlay,
        alt: 'The Milonga Mate Latte with yerba mate, Lion’s Mane and bark',
        style: { display: 'block', width: '100%', height: 'auto', border: 0 },
      }),

      // Everything above the product sits in the photo's empty top third.
      h('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, padding: '22px 34px 0' } },
        h('div', { style: { textAlign: 'center' } },
          h(M.Logo, { tone: 'green', variant: 'primary', size: 54 })
        ),
        h('div', { style: { height: 18 } }),
        h('div', { style: {
          fontFamily: M.fontStack, fontWeight: 700, fontSize: 11.5, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: FOREST, textAlign: 'left',
        } }, 'Three functional ingredients'),
        h('div', { style: { height: 12 } }),
        h(M.Headline, { bg, line1: 'Everything your', line2: 'mornings need.', size: 36, align: 'left' }),
        h('div', { style: { height: 12 } }),
        h('p', { style: {
          fontFamily: M.fontStack, fontSize: 13.5, lineHeight: 1.65, margin: 0,
          maxWidth: 300, textAlign: 'left', color: '#000000',
        } }, 'Three ingredients, each doing one job, inside a creamy vanilla latte.')
      ),

      // Each callout sits in clear cream; the arrow does the pointing.
      h(Callout, {
        bg, mark: 'yerba-mate', label: '100mg Yerba Mate',
        at: { top: '31%', right: '5%' },
        arrow: { w: 70, h: 46, at: { right: 150, top: 26 }, d: 'M70 4 C 40 8, 24 22, 2 40', tip: [2, 40] },
      }),
      h(Callout, {
        bg, mark: 'l-theanine', label: '200mg L-Theanine',
        at: { top: '45%', left: '4%' },
        arrow: { w: 74, h: 40, at: { left: 168, top: 22 }, d: 'M0 6 C 30 6, 48 16, 72 30', tip: [72, 30] },
      }),
      h(Callout, {
        bg, mark: 'lions-mane', label: '500mg Lion’s Mane',
        at: { top: '62%', right: '5%' },
        arrow: { w: 60, h: 40, at: { right: 152, top: 12 }, d: 'M60 24 C 38 21, 22 14, 2 5', tip: [2, 5] },
      })
    ),

    // ═══ ACT 2 · BODY — one block per ingredient, photo on the left ═══
    h(Ingredient, {
      bg, src: IMG.mate,
      line1: 'Yerba mate,', line2: 'the leaf it starts with.',
      bullets: [
        'Clean, sustained energy',
        'No spike, no crash',
        'Rich in antioxidants',
        'Certified organic',
      ],
    }),

    h(Ingredient, {
      bg, src: IMG.lionsMane,
      line1: 'Lion’s Mane,', line2: 'for the thinking part.',
      bullets: [
        'Focus and mental clarity',
        'Cognitive support',
        'A full 500mg dose',
      ],
    }),

    h(Ingredient, {
      bg, src: IMG.theanine,
      line1: 'L-Theanine,', line2: 'the one that steadies it.',
      bullets: [
        'No jitters',
        'A calm, balanced lift',
        'Smooths out the caffeine',
        'Found naturally in tea leaves',
      ],
    }),

    // How the three come together.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.Headline, { bg, line1: 'Separately, ingredients.', line2: 'Together, the point.', size: 26, align: 'left' }),
      h('div', { style: { height: 18 } }),
      h('p', { style: {
        fontFamily: M.fontStack, fontSize: 14, lineHeight: 1.75, margin: 0, color: '#000000',
      } }, 'The mate lifts. The L-Theanine keeps the lift even. The Lion’s Mane is there for the part of the morning that actually asks you to think. And it all tastes like a vanilla latte.'),
      h('div', { style: { height: 22 } }),
      h(M.SpecPills, { bg, variant: 'gold', align: 'left', items: [
        '90 cal', '3g sugar', 'Dairy-free', 'Ready in 30 seconds',
      ]})
    ),

    // ═══ ACT 3 · CTA ═══
    h(M.BleedImage, {
      bg, src: IMG.handPour, side: 'right', width: 0.94, overhang: 20,
      alt: 'A scoop of Milonga poured into a glass',
    }),
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Headline, { bg, line1: 'Taste the three.', line2: 'Fifteen mornings a bag.', size: 26, align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.Button, { bg, label: 'Try it now', href: shopHref, size: 'lg' }),
      h('div', { style: {
        fontFamily: M.fontStack, fontWeight: 700, fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: M.onBg[bg].accent, marginTop: 16,
      } }, '$29.99 · $2.00 a serving')
    ),

    h(M.Footer, { bg, social: SOCIAL, rule: false })
  );
}
