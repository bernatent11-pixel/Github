// Campaign: "Why we made it" — the educational follow-up to the Mate Latte
// launch. Short, inspirational, one problem stated plainly.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (price/offer).
// Beige email that resolves into dark green for the close, via the canopy.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  handHolding: '../public/product/hand-holding.png',
  handPour: '../public/product/pouch-hand-pour.png',
  botanical: '../public/product/pouch-botanical.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function WhyWeMadeIt({ shopHref = '#' }) {
  const bg = 'beige';
  const close = 'forest';

  return h(M.EmailShell, { bg },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Hero, {
      bg,
      eyebrow: 'Why we made it',
      title: 'Your first choice of the day shapes every one that follows',
      titleAccentPart: 'shapes every one that follows',
      titleSize: 34,
      body: 'Every morning came down to the same trade: enough caffeine to actually wake up, or few enough jitters to think straight. Never both. We wanted a third option — so we made one.',
    }),

    // The cutout enters from the left edge, outside any Section padding.
    h(M.BleedImage, { bg, src: IMG.handHolding, side: 'left', width: 0.74, overhang: 22,
      alt: 'A hand holding the Milonga Mate Latte' }),

    // ═══ ACT 2 · BODY ═══

    // The problem, side by side.
    h(M.Section, { bg, pad: 'lg' },
      h(M.SectionHeading, {
        bg,
        title: 'Morning spike vs morning flow',
        size: 25,
        flatTitle: true,
        subtitle: 'It was never the coffee’s fault',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.VersusBlock, {
        bg,
        left: {
          label: 'The old way',
          icon: 'clock',
          points: [
            'Big caffeine spike',
            'Anxiety',
            'Crashed by 2pm',
            'Repeat cycle',
          ],
        },
        right: {
          label: 'The Milonga way',
          icon: 'leaf',
          points: [
            'Smooth, clean energy',
            'Mental clarity & focus',
            'Balanced & calm',
            'Mind and body in sync',
            'Sustained for the whole day',
          ],
        },
      })
    ),

    // Four reasons — the education block.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Why we made it?',
        flatTitle: true,
        subtitle: 'Four things we refused to compromise',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.BenefitsGrid, { bg, columns: 2, items: [
        {
          icon: 'yerba-mate',
          title: 'Clean, sustained energy',
          text: 'Coffee gives you the whole hit at once — jitters, a crash by mid-afternoon, and another cup to fix it. Yerba mate releases its caffeine gently, so the morning holds instead of spiking.',
        },
        {
          icon: 'lions-mane',
          title: 'A functional formula',
          text: '100mg of natural caffeine — more than matcha, more than most mushroom coffees — plus 500mg of Lion’s Mane and 200mg of L-Theanine. No artificial sweeteners, no dairy.',
        },
        {
          icon: 'hot',
          title: 'Creamy vanilla taste',
          text: 'Most coffee alternatives ask you to put up with the flavour. Ours is a real vanilla latte — oat and coconut already in the bag, creamy hot or over ice.',
        },
        {
          icon: 'gluten-dairy-free',
          title: 'Light by design',
          text: 'Antioxidant-rich, 90 calories and 3g of sugar a serving. Better mornings shouldn’t cost you anything you’d rather not drink.',
        },
      ]}),
      h('div', { style: { height: 26 } }),
      h('p', { style: { fontSize: 13.5, lineHeight: 1.75, margin: 0, textAlign: 'center' } },
        'Milonga is named after the dance our grandparents met on — live music, late nights, nobody leaving early. We did not set out to sell a powder. We set out to give the morning back the feeling of that room: awake, warm, unhurried, in good company. Every choice inside the bag answers to it.'
      )
    ),

    // The ritual.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'A ritual worth enjoying… in 30 seconds',
        titleAccentPart: 'in 30 seconds',
        align: 'center',
        size: 26,
      }),
      h('div', { style: { height: 26 } }),
      h(M.Steps, { bg, variant: 'discs', items: [
        { title: 'Pour', text: 'One scoop into your glass or mug.', icons: ['scoop'] },
        { title: 'Whisk', text: 'Add water or milk and stir it smooth.', icons: ['whisk'] },
        { title: 'Enjoy hot or iced', text: 'However the morning is going.', icons: ['hot', 'iced'] },
      ]})
    ),

    // The colour change reads as a scene, not an edge.
    h(M.ForestScene, { from: bg, to: close }),

    // ═══ ACT 3 · CTA ═══
    h(M.Section, { bg: close, pad: 'lg' },
      h(M.SectionHeading, {
        bg: close,
        title: 'Start tomorrow morning',
        subtitle: 'The more you take, the less you pay',
        align: 'center',
      }),
      h('div', { style: { height: 22 } }),
      h(M.BundleOffer, {
        bg: close,
        image: { src: IMG.botanical, alt: 'The Milonga Mate Latte pouch' },
        tiers: [
          { label: 'Buy 1', price: '$29.99', detail: '15 servings', unit: '$2.00 / serving', href: shopHref },
          { label: 'Buy 2', was: '$59.98', price: '$53.98', detail: '30 servings', unit: '$1.80 / serving', badge: 'Save 10%', href: shopHref },
          { label: 'Buy 3', was: '$89.97', price: '$76.47', detail: '45 servings', unit: '$1.70 / serving', badge: 'Save 15%', featured: true, href: shopHref },
        ],
      })
    ),

    h(M.Footer, { bg: close, social: SOCIAL })
  );
}
