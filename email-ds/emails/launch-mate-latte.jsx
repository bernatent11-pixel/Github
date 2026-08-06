// Campaign: Mate Latte launch.
// Structure — the house rule, in order:
//   ACT 1 HEADER : loud, a statement, curiosity. No price.
//   ACT 2 BODY   : value, information, education. No price.
//   ACT 3 CTA    : price, offer, call to action, urgency.
// Facts come from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function LaunchMateLatte({ shopHref = '#' }) {
  return h(M.EmailShell, { bg: 'gold', textured: true },

    // ═══ ACT 1 · HEADER — loud, statement, curiosity ═══
    h(M.Header, { bg: 'gold' }),
    h(M.Hero, {
      bg: 'gold',
      eyebrow: 'It’s here',
      title: 'Energy that thinks. Now in a latte.',
      titleAccentPart: 'Now in a latte.',
      titleSize: 40,
      body: 'One scoop. Thirty seconds. The coffee alternative that finally tastes like something you’d order.',
      image: { kind: 'product', cutout: true },
      cta: { label: 'Shop the Mate Latte', href: shopHref },
    }),

    // ═══ ACT 2 · BODY — value, information, education ═══
    h(M.Section, { bg: 'gold', pad: 'md', rule: true, align: 'center' },
      h(M.SectionHeading, {
        bg: 'gold',
        eyebrow: 'In every scoop',
        title: 'Three ingredients doing the work',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.IconRow, { bg: 'gold', marks: M.INGREDIENTS, size: 58 }),
      h('div', { style: { height: 26 } }),
      h(M.Stats, { bg: 'gold', items: [
        { value: '100mg', label: 'Natural caffeine' },
        { value: '500mg', label: 'Lion’s Mane' },
        { value: '200mg', label: 'L-Theanine' },
      ]})
    ),

    h(M.ForestScene, { from: 'gold', to: 'forest' }),

    h(M.Section, { bg: 'forest', pad: 'lg' },
      h(M.SectionHeading, {
        bg: 'forest',
        eyebrow: 'Why we made it',
        title: 'The best of every cup you’ve tried',
        intro: 'Coffee gives you the jitters and drops you. Matcha never quite wakes you up. Mushroom coffee barely has caffeine — and you can taste it. Milonga takes what works from each and leaves the rest.',
      }),
      h('div', { style: { height: 22 } }),
      h(M.VersusBlock, {
        bg: 'forest',
        left: {
          label: 'Your usual cup',
          points: ['Spike, then the crash', 'Jitters and restlessness', 'Sleep that pays for it later'],
        },
        right: {
          icon: 'yerba-mate',
          label: 'Milonga',
          points: ['Clean energy that stays level', 'Focus without the edge', 'Calm, balanced, delicious'],
        },
      })
    ),

    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'The difference you feel', title: 'Lift without the crash' }),
      h('div', { style: { height: 22 } }),
      h(M.EnergyCurve, {
        bg: 'forest',
        xLabels: ['8am', '11am', '2pm', '5pm', '8pm'],
        series: [
          { label: 'Coffee', points: [20, 95, 40, 18, 10] },
          { label: 'Milonga', points: [22, 70, 72, 60, 32], highlight: true },
        ],
      })
    ),

    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'What’s in the bag', title: 'Nothing you’d rather leave out' }),
      h('div', { style: { height: 18 } }),
      h(M.BenefitsGrid, { bg: 'forest', columns: 2, items: [
        { icon: 'yerba-mate', title: 'Organic yerba mate', text: 'Whole-leaf extract — the base of the whole thing.' },
        { icon: 'no-cane-sugar', title: 'No cane sugar', text: 'Sweetened with honey and real monk fruit.' },
        { icon: 'gluten-dairy-free', title: 'Gluten & dairy-free', text: 'Creamy from oat milk and coconut, not milk.' },
        { icon: 'l-theanine', title: '90 calories', text: 'And 3g of sugar a scoop. No artificial sweeteners.' },
      ]})
    ),

    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Hot or iced', title: 'Ready in 30 seconds', align: 'center' }),
      h('div', { style: { height: 24 } }),
      h(M.Steps, { bg: 'forest', variant: 'discs', items: [
        { title: 'One scoop', text: 'Into your favourite cup.' },
        { title: 'Pour and stir', text: 'Hot water or over ice.' },
        { title: 'That’s it', text: 'A creamy latte, no machine.' },
      ]})
    ),

    // ═══ ACT 3 · CTA — price, offer, urgency ═══
    h(M.Section, { bg: 'forest', pad: 'lg', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Start here', title: 'Mate Latte · Vanilla', align: 'center' }),
      h('div', { style: { height: 20 } }),
      h(M.ProductCard, {
        bg: 'forest',
        name: 'Mate Latte',
        variant: 'Vanilla · 15 servings',
        description: 'Oat milk and coconut make it creamy. Honey and real monk fruit make it sweet.',
        specs: ['Organic', 'Gluten & dairy-free', 'No artificial sweeteners'],
        price: '$29.99',
        cta: { label: 'Add to cart', href: shopHref },
      })
    ),

    h(M.Section, { bg: 'forest', pad: 'md', align: 'center' },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Stock up', title: 'The more you take, the less you pay', align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.Stats, { bg: 'forest', items: [
        { value: '$29.99', label: 'One bag' },
        { value: '10% off', label: 'Two bags' },
        { value: '15% off', label: 'Three bags' },
      ]}),
      h('div', { style: { height: 22 } }),
      h(M.Callout, { bg: 'forest', text: 'Subscribe and take another 15% off', attribution: 'Cancel any time' })
    ),

    h(M.Section, { bg: 'forest', pad: 'sm', align: 'center' },
      h(M.Button, { bg: 'forest', label: 'Start your ritual', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg: 'forest', social: SOCIAL })
  );
}
