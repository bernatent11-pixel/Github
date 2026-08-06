// Campaign: Vanilla Latte launch — "IT'S HERE"
// Background: textured gold masthead → dark green body (the scene transition).
const M = window.MilongaEmailDS;
const h = React.createElement;

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function LaunchVanillaLatte({ shopHref = '#' }) {
  return h(M.EmailShell, { bg: 'gold', textured: true },
    // ---- masthead + the announcement ----
    h(M.Header, { bg: 'gold' }),
    h(M.Hero, {
      bg: 'gold',
      eyebrow: 'It’s here · Launch day',
      title: 'Meet Milonga Vanilla Latte',
      titleAccentPart: 'Vanilla Latte',
      body: 'Our first flavour. Whole-leaf yerba mate, Lion’s Mane and L-Theanine in a smooth vanilla latte you make in 30 seconds.',
      image: { kind: 'product', cutout: true },
      cta: { label: 'Shop the launch', href: shopHref },
    }),

    // ---- what's in it, as icons ----
    h(M.Section, { bg: 'gold', pad: 'md', rule: true, align: 'center' },
      h(M.SectionHeading, { bg: 'gold', eyebrow: 'What’s inside', title: 'Three functional ingredients', align: 'center' }),
      h('div', { style: { height: 24 } }),
      h(M.IconRow, { bg: 'gold', marks: M.INGREDIENTS, size: 58 }),
      h('div', { style: { height: 26 } }),
      h(M.Stats, { bg: 'gold', items: [
        { value: '100mg', label: 'Natural caffeine' },
        { value: '300mg', label: 'Lion’s Mane' },
        { value: '15', label: 'Servings' },
      ]})
    ),

    // ---- the scene handing off to dark green ----
    h(M.ForestScene, { from: 'gold', to: 'forest' }),

    // ---- the product ----
    h(M.Section, { bg: 'forest', pad: 'lg' },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'The drop', title: 'Vanilla Latte, 15 servings' }),
      h('div', { style: { height: 20 } }),
      h(M.ProductCard, {
        bg: 'forest',
        name: 'Vanilla Latte',
        variant: 'Yerba Mate Latte',
        description: 'Creamy vanilla over whole-leaf yerba mate, with functional mushrooms for all-day clarity.',
        specs: ['100mg caffeine', '300mg Lion’s Mane', 'No cane sugar'],
        price: '$29',
        cta: { label: 'Add to cart', href: shopHref },
      })
    ),

    // ---- why it's different ----
    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Why it’s different', title: 'Not your average energy drink' }),
      h('div', { style: { height: 20 } }),
      h(M.ComparisonTable, {
        bg: 'forest',
        style: 'rows',
        highlight: 1,
        columns: ['', 'Milonga', 'Coffee', 'Energy drink'],
        rows: [
          ['Clean caffeine', true, true, false],
          ['No sugar crash', true, false, false],
          ['Lion’s Mane focus', true, false, false],
          ['Added sugar', 'None', 'None', 'High'],
        ],
      })
    ),

    // ---- the energy story ----
    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'The difference you feel', title: 'Lift without the crash' }),
      h('div', { style: { height: 22 } }),
      h(M.EnergyCurve, { bg: 'forest', xLabels: ['8am', '11am', '2pm', '5pm', '8pm'], series: [
        { label: 'Coffee', points: [20, 95, 40, 18, 10] },
        { label: 'Milonga', points: [22, 70, 72, 60, 32], highlight: true },
      ]})
    ),

    // ---- how to make it ----
    h(M.Section, { bg: 'forest', pad: 'md', rule: true },
      h(M.SectionHeading, { bg: 'forest', eyebrow: 'Hot or iced', title: 'Ready in 30 seconds', align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.Steps, { bg: 'forest', variant: 'discs', items: [
        { title: 'One scoop', text: 'Add a scoop to your cup.' },
        { title: 'Hot or iced', text: 'Water or milk, your call.' },
        { title: 'Sip and focus', text: 'Four hours of clean energy.' },
      ]})
    ),

    // ---- urgency + close ----
    h(M.Section, { bg: 'forest', pad: 'md' },
      h(M.Callout, { bg: 'forest', text: 'First batch is limited — it ships this week.', attribution: 'Free shipping over $35' })
    ),
    h(M.Section, { bg: 'forest', pad: 'sm', align: 'center' },
      h(M.Button, { bg: 'forest', label: 'Get your first tin', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg: 'forest', social: SOCIAL })
  );
}
