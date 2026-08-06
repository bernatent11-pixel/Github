// Campaign: Mate Latte launch — "It's here"
// Facts are from .design-sync/brand/milonga-product.md. Do not edit specs here.
const M = window.MilongaEmailDS;
const h = React.createElement;

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function LaunchMateLatte({ shopHref = '#' }) {
  return h(M.EmailShell, { bg: 'gold', textured: true },
    h(M.Header, { bg: 'gold' }),

    // ---- the announcement ----
    h(M.Hero, {
      bg: 'gold',
      eyebrow: 'It’s here',
      title: 'Meet the Mate Latte',
      titleAccentPart: 'Mate Latte',
      body: 'Yerba mate, Lion’s Mane and L-Theanine in a creamy vanilla latte. Pour, stir, and it’s ready in 30 seconds — hot or iced.',
      image: { kind: 'product', cutout: true },
      cta: { label: 'Shop the Mate Latte', href: shopHref },
    }),

    // ---- the three, with the real doses ----
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

    // ---- scene: gold hands off to dark green ----
    h(M.ForestScene, { from: 'gold', to: 'forest' }),

    // ---- why it exists ----
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

    // ---- the felt difference ----
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

    // ---- the product ----
    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'The drop', title: 'Mate Latte · Vanilla' }),
      h('div', { style: { height: 20 } }),
      h(M.ProductCard, {
        bg: 'forest',
        name: 'Mate Latte',
        variant: 'Vanilla · 15 servings',
        description: 'Oat milk and coconut make it creamy. Honey and real monk fruit make it sweet. 90 calories and 3g of sugar a scoop.',
        specs: ['Organic', 'Gluten & dairy-free', 'No artificial sweeteners'],
        price: '$29.99',
        cta: { label: 'Add to cart', href: shopHref },
      })
    ),

    // ---- how to make it ----
    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Hot or iced', title: 'Ready in 30 seconds', align: 'center' }),
      h('div', { style: { height: 24 } }),
      h(M.Steps, { bg: 'forest', variant: 'discs', items: [
        { title: 'One scoop', text: 'Into your favourite cup.' },
        { title: 'Pour and stir', text: 'Hot water or over ice.' },
        { title: 'That’s it', text: 'A creamy latte, no machine.' },
      ]})
    ),

    // ---- the offer ----
    h(M.Section, { bg: 'forest', pad: 'md', rule: true, align: 'center' },
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
