// S0 · HERO — the first section of any email, in its three variants.
// Anatomy taken from the five competitor heroes: announcement bar, logo,
// eyebrow, headline, feature figure, subtitle/body, CTA, photograph. What
// changes between variants is only where the photograph sits.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  pour: '../public/product/mind-body-connected.jpg',
  iced: '../public/product/pouch-iced-botanical.png',
  pouch: '../public/product/pouch-botanical.png',
};

function Tag(id, name, note) {
  return h('div', { style: { background: '#00351B', padding: '14px 30px' } },
    h('div', { style: { fontFamily: M.fontStack, fontWeight: 900, fontSize: 12, letterSpacing: '0.16em',
      textTransform: 'uppercase', color: '#E3BC62' } }, id + ' · ' + name),
    h('div', { style: { fontFamily: M.fontStack, fontSize: 12.5, lineHeight: 1.5, color: '#FFFFFF',
      opacity: 0.82, marginTop: 5 } }, note));
}
function Gap(n) { return h('div', { style: { height: n, lineHeight: 0, fontSize: 0 } }); }

function HeroVariants() {
  return h(M.EmailShell, { bg: 'beige', preset: 'systematic' },

    Tag('A', 'OVER — type on the photograph', 'The loudest. Needs a picture with a quiet third; the scrim protects the type where it hasn’t.'),
    h(M.HeroSection, {
      bg: 'beige', variant: 'over', anchor: 'bottom', scrim: true,
      src: IMG.flatlay, alt: 'The Mate Latte with yerba mate, Lion’s Mane and bark',
      announcement: 'Free shipping over $50',
      logo: true,
      eyebrow: 'Three functional ingredients',
      line1: 'Everything your', line2: 'mornings need.',
      subtitle: 'Hot or iced · ready in 30 seconds',
      cta: { label: 'Shop the Mate Latte', href: '#', style: 'solid', arrow: true },
      badge: 'New',
    }),
    Gap(40),

    Tag('B', 'FEATURE — one number worth shouting', 'Same variant, with a feature figure. The headline steps down to make room for it.'),
    h(M.HeroSection, {
      bg: 'beige', variant: 'over', anchor: 'bottom', scrim: true,
      src: IMG.pour, alt: 'A Milonga stick poured into a glass of Mate Latte',
      logo: true,
      eyebrow: 'This week only',
      line1: 'Your mornings are', feature: '15% off', line2: 'until Sunday.',
      cta: { label: 'Claim it', href: '#', style: 'solid' },
      legal: 'One use per customer. Ends Sunday at midnight.',
    }),
    Gap(40),

    Tag('C', 'STACK — words first, photograph under', 'The quiet, editorial one. Works with any picture and survives images-off best.'),
    h(M.HeroSection, {
      bg: 'beige', variant: 'stack',
      src: IMG.iced, alt: 'Iced Mate Latte with the pouch',
      logo: true,
      eyebrow: 'Iced season',
      line1: 'Thirty seconds,', line2: 'start to finish.',
      body: 'Same scoop, cold water, ice. It does not clump, and it does not need anything else.',
      cta: { label: 'Shop now', href: '#', style: 'outline', arrow: true },
    }),
    Gap(40),

    Tag('D', 'CARD — photograph with a card riding over its edge', 'The overlap is what makes it read as one object rather than two stacked bands.'),
    h(M.HeroSection, {
      bg: 'beige', variant: 'card',
      src: IMG.flatlay, alt: 'The Mate Latte flat-lay',
      logo: true,
      eyebrow: 'Energy that thinks',
      line1: 'This is your sign', line2: 'to switch.',
      cta: { label: 'Shop the Mate Latte', href: '#', style: 'outline' },
      legal: '15 servings · 90 cal · 3g sugar',
    }),
    Gap(48),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
