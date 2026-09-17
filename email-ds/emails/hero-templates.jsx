// FIVE HERO TEMPLATES — one per reference. Plug and play: every photograph
// sits in a fixed-ratio frame, so swapping the picture never moves the
// headline, the CTA or the spacing.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  pour: '../public/product/mind-body-connected.jpg',
  iced: '../public/product/pouch-iced-botanical.png',
  pouch: '../public/product/pouch-botanical.png',
  hand: '../public/product/pouch-hand-pour-big.png',
};

function Tag(id, name) {
  return h('div', { style: { background: '#00351B', padding: '13px 30px' } },
    h('div', { style: { fontFamily: M.fontStack, fontWeight: 900, fontSize: 11.5,
      letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E3BC62' } }, id + ' · ' + name));
}
function Gap(n) { return h('div', { style: { height: n, lineHeight: 0, fontSize: 0 } }); }

function HeroTemplates() {
  return h(M.EmailShell, { bg: 'beige' },

    Tag('T1', 'Photo + floating card'),
    h(M.T1PhotoCard, {
      src: IMG.flatlay, alt: 'The Milonga Mate Latte with yerba mate and Lion’s Mane',
      announcement: 'Free shipping over $50 · code MORNINGS',
      lead: 'The Mate Latte is up to',
      offerLine1: '20% off', offerLine2: 'right now',
      badge: 'Ends Sunday',
      cardLine1: 'This is your sign', cardLine2: 'to switch',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      legal: '15 servings · 90 cal · 3g sugar per scoop',
      ratio: 1.15,
    }),
    Gap(44),

    Tag('T2', 'Big number, product below'),
    h(M.T2BigNumber, {
      src: IMG.pour, alt: 'A Milonga stick poured into a glass of Mate Latte',
      lead: 'Made With', figure: '100mg', under: 'Natural Caffeine',
      body: 'From yerba mate, not from beans. With 500mg Lion’s Mane and 200mg L-Theanine, so the energy arrives smooth and stays that way.',
      cta: { label: 'Coffee drinkers, hear us out', href: '#' },
      ratio: 0.9,
    }),
    Gap(44),

    Tag('T3', 'Minimal — words, then picture'),
    h(M.T3Minimal, {
      src: IMG.iced, alt: 'Iced Mate Latte with the pouch',
      title: 'Iced vanilla mate latte',
      body: 'Same scoop, cold water, ice. A creamy latte in thirty seconds, with none of the acidity.',
      cta: { label: 'Shop the Mate Latte', href: '#', arrow: true },
      ratio: 0.78,
    }),
    Gap(44),

    Tag('T4', 'Pilot — eyebrow, headline, product, copy, CTA'),
    h(M.T4Pilot, {
      src: IMG.pouch, alt: 'The Milonga Mate Latte pouch',
      stamp: 'Small batch',
      eyebrow: 'First release',
      title: 'Energy that thinks',
      body: 'Yerba mate for clean, sustained energy. Lion’s Mane for a clear head. L-Theanine to keep the whole thing calm instead of sharp.',
      body2: 'Vanilla, creamy, ready in thirty seconds — hot or over ice. Fifteen servings a bag.',
      kicker: 'Try it. Tell us how we did.',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      ratio: 0.92,
    }),
    Gap(44),

    Tag('T5', 'Urgency — two-tone headline on a photograph'),
    h(M.T5Urgency, {
      // A tall file in a wide frame loses its edges — raise the ratio and aim
      // the crop rather than accepting the middle. This is the one prop to
      // reach for when a swapped picture looks wrong.
      src: IMG.hand, alt: 'Pouring the Mate Latte into a glass',
      line1: 'Last chance. 20% off', line2: 'ends tonight.',
      note: 'This is it. No extensions.',
      cta: { label: 'Save 20% before midnight', href: '#' },
      ratio: 0.95, focus: 'center 38%',
    }),
    Gap(48),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
