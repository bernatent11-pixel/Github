// Campaign: presenting the Mate Latte — built on the landing page's own copy.
// Structure: ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (price/offer).
// Specs from .design-sync/brand/milonga-product.md; copy from the landing page.
const M = window.MilongaEmailDS;
const h = React.createElement;

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function ProductMateLatte({ shopHref = '#' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ═══ ACT 1 · HEADER — loud statement, curiosity ═══
    h(M.Header, { bg: 'beige' }),
    h(M.Hero, {
      bg: 'beige',
      eyebrow: 'Now available',
      title: 'Energy that thinks with you.',
      titleAccentPart: 'thinks with you.',
      titleSize: 40,
      body: 'Milonga is a yerba mate latte engineered for clean, calm focus — the lift of mate and Lion’s Mane, smoothed out by L-Theanine. No jitters. No crash. Just clarity.',
      image: { kind: 'product', cutout: true },
      cta: { label: 'Shop the Mate Latte', href: shopHref },
    }),

    // ═══ ACT 2 · BODY — value, information, education ═══

    // One scoop, three kinds of clean energy — the landing page's 01/02/03.
    h(M.Section, { bg: 'beige', pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg: 'beige',
        eyebrow: 'One scoop',
        title: 'Three kinds of clean energy',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.Steps, { bg: 'beige', variant: 'numerals', items: [
        { title: 'Lift', text: '100mg of natural caffeine from yerba mate — a smooth wave of awake, never a spike.' },
        { title: 'Focus', text: '500mg of Lion’s Mane, the mushroom prized for clarity and deep, sustained concentration.' },
        { title: 'Calm', text: '200mg of L-Theanine rounds the edges off the caffeine — focused, but never wired.' },
      ]})
    ),

    // The three marks, together.
    h(M.Section, { bg: 'beige', pad: 'md', rule: true, align: 'center' },
      h(M.IconRow, { bg: 'beige', marks: M.INGREDIENTS, size: 56 })
    ),

    // Scene: beige resolves into the dark green half.
    h(M.ForestScene, { from: 'beige', to: 'forest' }),

    // Why Milonga.
    h(M.Section, { bg: 'forest', pad: 'lg' },
      h(M.SectionHeading, {
        bg: 'forest',
        eyebrow: 'Why Milonga',
        title: 'Made the slow way, for the fast days.',
        intro: 'Real ingredients, honest amounts, and a taste worth slowing down for.',
      }),
      h('div', { style: { height: 22 } }),
      h(M.BenefitsGrid, { bg: 'forest', columns: 1, items: [
        { icon: 'yerba-mate', title: 'Honestly sourced', text: 'Shade-grown yerba mate and functional mushrooms — traceable, clean, chosen for flavour first.' },
        { icon: 'no-cane-sugar', title: 'No crash, no junk', text: 'No artificial sweeteners, no fillers, no mystery “energy blend”. Just what’s on the tin.' },
        { icon: 'hot', title: 'A 10-second ritual', text: 'One scoop, hot water or milk, stir. A creamy vanilla latte that loves you back.' },
      ]})
    ),

    // Every number, on the front of the tin.
    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, {
        bg: 'forest',
        eyebrow: 'What’s inside',
        title: 'Every number, on the front of the tin.',
      }),
      h('div', { style: { height: 16 } }),
      h(M.Panel, { bg: 'forest', pad: 16 },
        h(M.IngredientList, { bg: 'forest', items: [
          { icon: 'lions-mane', name: 'Lion’s Mane', amount: '500mg', note: 'Long used for focus, memory and mental clarity' },
          { icon: 'yerba-mate', name: 'Natural caffeine', amount: '100mg', note: 'From yerba mate — a far gentler curve' },
          { icon: 'l-theanine', name: 'L-Theanine', amount: '200mg', note: 'Takes the jitter out of caffeine' },
        ]})
      )
    ),

    // Hot or iced.
    h(M.Section, { bg: 'forest', pad: 'md', rule: true, align: 'center' },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'However you like it', title: 'Hot or iced', align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.IconRow, { bg: 'forest', marks: M.SERVE, size: 50 })
    ),

    // ═══ ACT 3 · CTA — price, offer, call to action ═══
    h(M.Section, { bg: 'forest', pad: 'lg', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Start here', title: 'Mate Latte · Vanilla', align: 'center' }),
      h('div', { style: { height: 20 } }),
      h(M.ProductCard, {
        bg: 'forest',
        name: 'Mate Latte',
        variant: 'Vanilla · 15 servings per tin',
        description: 'Oat milk and coconut make it creamy. Honey and real monk fruit make it sweet. 90 calories and 3g of sugar a scoop.',
        specs: ['Organic', 'Gluten & dairy-free', 'No artificial sweeteners'],
        price: '$29.99',
        cta: { label: 'Add to cart', href: shopHref },
      })
    ),

    h(M.Section, { bg: 'forest', pad: 'md', align: 'center' },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Stock up', title: 'The more you take, the less you pay', align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.Stats, { bg: 'forest', items: [
        { value: '$29.99', label: 'One tin' },
        { value: '10% off', label: 'Two tins' },
        { value: '15% off', label: 'Three tins' },
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
