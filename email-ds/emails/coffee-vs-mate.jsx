// Campaign: "Meet Your Coffee's Competition" — comparison, then reviews.
// Two acts only. ACT 1 makes the argument against coffee; ACT 2 hands the
// argument to customers and gets out of the way.
//
// Cream ground. On beige the contrast map allows exactly one typographic
// colour — dark green — so every title, eyebrow and label here is forest.
// Gold survives as a FILL only: a gold cell or card with dark green type on it
// is the loudest thing on the page, where gold TYPE on cream measures about
// 1.5:1 and disappears.
//
// NOTE ON EXPORT: the review cards must ship as LIVE TEXT, not baked into the
// image. See exports/coffee-vs-mate-reviews.html and the note in ReviewCard.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  pouch: '../public/product/pouch-botanical.png',
  coffee: '../public/product/coffee-cup.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

// Both sides carry a caffeine figure now, which makes the row the sharpest in
// the table: same caffeine, opposite feeling. Note that 100mg is a typical
// 8oz brewed cup, not a fixed quantity — coffee varies by bean, roast and
// pour in a way our own dose does not.
const ROWS = [
  { label: 'Caffeine', ours: '100mg, natural from yerba mate', theirs: '100mg, from coffee beans' },
  { label: 'Focus', ours: '500mg Lion’s Mane', theirs: '—' },
  { label: 'Calm', ours: '200mg L-Theanine', theirs: '—' },
  { label: 'The feeling', ours: 'Smooth, sustained. No jitters, no crash', theirs: 'Big spike, jitters, then crash' },
  { label: 'Taste', ours: 'Creamy vanilla latte', theirs: 'Bitter and acidic' },
  { label: 'Health supportive', ours: 'Antioxidant-rich', theirs: '—' },
  { label: 'Also', ours: 'Dairy-free, no artificial sweeteners, 90 cal, 3g sugar', theirs: '—' },
];

// The reviews live in coffee-vs-mate-reviews.js — one source of truth shared
// with the live-text Klaviyo export. See that file for what was trimmed.
const REVIEWS = window.COFFEE_VS_MATE_REVIEWS;

function CoffeeVsMate({ shopHref = '#' }) {
  const bg = 'beige';

  // The one typographic colour on cream.
  const INK = '#004D27';

  const eyebrow = {
    fontFamily: M.fontStack, fontWeight: 900, fontSize: 11.5, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: INK, lineHeight: 1.4,
  };
  const para = {
    fontFamily: M.fontStack, fontWeight: 400, fontSize: 13.5, lineHeight: 1.65,
    color: '#1A1A1A', maxWidth: 440, margin: '0 auto',
  };

  return h(M.EmailShell, { bg },

    // ═══ MASTHEAD ═══
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Logo, { tone: 'green', variant: 'primary', size: 54 })
    ),

    // ═══ ACT 1 · THE COMPARISON ═══
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Headline, { bg, line1: 'Meet your coffee’s', line2: 'competition.', size: 38, align: 'center' }),
      h('div', { style: { height: 14 } }),
      h('div', { style: eyebrow }, 'Same morning ritual. A better feeling after.'),
      h('div', { style: { height: 16 } }),
      h('div', { style: para }, 'Coffee gets you up. It also brings the jitters and the 3pm crash. The Mate Latte keeps your ritual and upgrades how it feels, in 30 seconds, hot or iced.')
    ),

    h(M.Section, { bg, pad: 'md' },
      h(M.CompareRows, {
        bg, rows: ROWS,
        ourName: 'Mate Latte', theirName: 'Coffee',
        // Both shots run whole — nothing cropped, so neither looks cut off.
        // The boxes are deliberately NOT the same number. The pouch arrives in
        // a botanical composition where the product is under half the frame's
        // width, while the cup is trimmed to its own edges; at an equal box the
        // competitor's product looked bigger than ours. Sizing to make the two
        // PRODUCTS match is the fair comparison, not sizing the two files.
        ourArt: h('img', {
          src: IMG.pouch, alt: '',
          style: { display: 'block', width: 232, height: 232, objectFit: 'contain', margin: '0 auto' },
        }),
        theirArt: h('img', {
          src: IMG.coffee, alt: '',
          style: { display: 'block', width: 204, height: 204, objectFit: 'contain', margin: '0 auto' },
        }),
      })
    ),

    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Button, { bg, label: 'Upgrade my morning cup', href: shopHref, size: 'lg' })
    ),

    // ═══ ACT 2 · THE REVIEWS ═══
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Headline, { bg, line1: 'Don’t take it from us.', line2: 'Take it from them.', size: 30, align: 'center' }),
      h('div', { style: { height: 14 } }),
      h('div', { style: eyebrow }, 'Every review so far is five stars.'),
      h('div', { style: { height: 14 } }),
      h('div', { style: para }, 'Real reviews from real customers, straight from our product page.'),
      h('div', { style: { height: 26 } }),
      h('div', { style: { textAlign: 'left' } },
        h(M.Reviews, { bg, reviews: REVIEWS, layout: 'grid', gap: 14 })
      ),
      h('div', { style: { height: 30 } }),
      h(M.Button, { bg, label: 'Get my better morning', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg, social: SOCIAL })
  );
}
