// Campaign: "Everything your mornings need" — the ingredient education email.
// The flat-lay photo is the hero and its cream carries on as the email's
// background, so the picture never looks pasted onto a different colour.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (offer, urgency).
// Specs from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  mindBody: '../public/product/mind-body-connected.jpg',
  mate: '../public/product/ing-yerba-mate.png',
  lionsMane: '../public/product/ing-lions-mane.png',
  theanine: '../public/product/ing-theanine.png',
};

// The page is the hero photograph's own cream. The photo carries a vignette
// that darkens over its last quarter, so the image is faded back up to this
// colour at the bottom — matching only the darkest corner made the whole body
// of the email read as a different, muddier colour than the picture above it.
const PAGE = '#EEE2D4';

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

const GOLD = '#E3BC62';
const FOREST = '#004D27';
const WHITE = '#FFFFFF';

// The education act inverts the email: dark green ground, gold titles, white
// pills. `INK` is that band's background, so every block inside it reads the
// contrast map for dark green rather than for the cream page.
const INK = 'forest';

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
        d: arrow.d, fill: 'none', stroke: '#FFFFFF', strokeWidth: 2.4,
        strokeLinecap: 'round',
        // A white line vanishes on cream, so it carries its own soft shadow.
        style: { filter: 'drop-shadow(0 1px 2px rgba(60,44,20,0.45))' },
      }),
      h('circle', {
        cx: arrow.tip[0], cy: arrow.tip[1], r: 3.6, fill: '#FFFFFF',
        style: { filter: 'drop-shadow(0 1px 2px rgba(60,44,20,0.45))' },
      })
    ) : null,
    h('div', { style: {
      position: 'relative', zIndex: 2,
      display: 'inline-flex', alignItems: 'center', gap: 9,
      background: 'rgba(255,253,247,0.94)',
      borderRadius: 999, padding: '4px 13px 4px 4px',
      boxShadow: '0 3px 14px rgba(60,44,20,0.20)',
    } },
      h(M.IconBadge, { mark, bg, size: 34, fill: GOLD, ink: 'forest' }),
      h('span', { style: {
        fontFamily: M.fontStack, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: FOREST, lineHeight: 1.2, whiteSpace: 'nowrap',
      } }, label)
    )
  );
}

// One ingredient: photograph on the left, the case for it on the right.
// The education act runs on dark green — the inverse of the cream the rest of
// the email sits on — so the three ingredients read as one chapter rather than
// as more of the same page. Titles white, benefit pills gold: gold then means
// one thing everywhere in the email, matching the spec pills in the closing act.
function Ingredient({ bg, src, line1, line2, bullets }) {
  return h(M.Section, { bg, pad: 'lg' },
    h('div', { style: { display: 'flex', gap: 20, alignItems: 'flex-start' } },
      h('div', { style: { flex: '0 0 34%', width: '34%' } },
        h(M.ImageSlot, { bg, src, cutout: true, ratio: 'square', alt: line1 })
      ),
      h('div', { style: { flex: 1 } },
        h(M.Headline, { bg, line1, line2, size: 22, align: 'left', color: WHITE }),
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
        // The title drops until the air above it (logo) and below it (the bark)
        // measure the same — the stack has to read as one centred group, not as
        // a title that drifted up toward the logo.
        h('div', { style: { height: 32 } }),
        h(M.Headline, { bg, line1: 'Everything your', line2: 'mornings need.', size: 38, align: 'left' })
      ),

      // Each callout sits in clear cream; the arrow does the pointing.
      h(Callout, {
        bg, mark: 'yerba-mate', label: '100mg Yerba Mate',
        at: { top: '30%', right: '3%' },
        arrow: { w: 46, h: 46, at: { right: 158, top: 24 }, d: 'M46 2 C 30 10, 16 24, 3 42', tip: [3, 42] },
      }),
      h(Callout, {
        bg, mark: 'l-theanine', label: '200mg L-Theanine',
        at: { top: '45%', left: '3%' },
        arrow: { w: 40, h: 26, at: { left: 158, top: 20 }, d: 'M0 2 C 14 2, 26 9, 38 23', tip: [38, 23] },
      }),
      h(Callout, {
        bg, mark: 'lions-mane', label: '500mg Lion’s Mane',
        at: { top: '63%', right: '3%' },
        arrow: { w: 44, h: 40, at: { right: 158, top: -14 }, d: 'M44 38 C 30 32, 16 20, 3 3', tip: [3, 3] },
      }),

      // The photograph leaves a clear band of cream under the last leaf —
      // the ask goes there rather than after the picture, so it is seen while
      // the product still is. Gold: on a photograph it reads as the one thing
      // to press, where green would sink into the leaves.
      h('div', { style: { position: 'absolute', top: '79.5%', left: 0, right: 0, textAlign: 'center' } },
        h(M.Button, { bg: 'forest', label: 'Experience it', href: shopHref, size: 'md' })
      )
    ),

    // ═══ ACT 2 · BODY — one block per ingredient, photo on the left ═══
    // The band is dark green from the first ingredient through the CTA that
    // closes them. Both of its edges land where the cream is already flat, so
    // the colour change reads as the chapter break it is — and it is also
    // exactly where the Klaviyo export is cut.
    h(Ingredient, {
      bg: INK, src: IMG.mate,
      line1: 'Yerba mate,', line2: 'the foundation.',
      bullets: [
        'Clean sustained energy',
        'No jitters, no crash',
        'Mental clarity',
        'Rich in antioxidants',
      ],
    }),

    h(Ingredient, {
      bg: INK, src: IMG.lionsMane,
      line1: 'Lion’s Mane,', line2: 'for a clear head.',
      bullets: [
        'Focus',
        'Concentration',
        'Memory',
        'Cognitive support',
      ],
    }),

    h(Ingredient, {
      bg: INK, src: IMG.theanine,
      line1: 'L-Theanine,', line2: 'what balances it all.',
      bullets: [
        'Balanced and calm',
        'Balances the whole experience',
        'Smooth',
      ],
    }),

    // Having read all three, the reader is ready for a second ask. The padding
    // is deliberately lopsided — the button belongs to the ingredients above it,
    // so it sits tight under them and keeps its distance from the photo below.
    h('div', { style: { background: FOREST, padding: '4px 30px 40px', textAlign: 'center' } },
      h(M.Button, { bg: INK, label: 'Discover more', href: shopHref, size: 'md' })
    ),

    h('img', {
      src: IMG.mindBody,
      alt: 'A Milonga stick poured into a glass of Mate Latte — mind and body connected',
      style: { display: 'block', width: '100%', height: 'auto', border: 0 },
    }),

    // ═══ ACT 3 · CTA ═══
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.SpecPills, { bg, variant: 'gold', align: 'center', items: [
        '90 cal', '3g sugar', 'Dairy-free', 'Ready in 30 seconds',
      ]}),
      h('div', { style: { height: 26 } }),
      h(M.Button, { bg, label: 'Shop now', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg, social: SOCIAL, rule: false })
  );
}
