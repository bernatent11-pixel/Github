// Campaign: "The Original Mate Latte" — the landing page, turned into an email.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (price/offer).
// Specs from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

// Campaign art. Real product cutouts (transparent PNGs) — they sit straight on
// the flat background. Swap these paths for hosted URLs when the email ships.
const IMG = {
  botanical: '../public/product/pouch-botanical.png',
  handPour: '../public/product/pouch-hand-pour.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function OriginalMateLatte({ shopHref = '#' }) {
  const bg = 'forest';

  return h(M.EmailShell, { bg, textured: true },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Hero, {
      bg,
      title: 'The Original Mate Latte',
      titleAccentPart: 'Mate Latte',
      titleSize: 40,
      eyebrow: 'Energy that thinks',
      body: 'Meet Milonga’s Mate Latte, a clean coffee alternative crafted with organic yerba mate, Lion’s Mane and L-Theanine to deliver smooth, long-lasting energy and focus without the crash. With only 90 calories, 3g of sugar and a rich, creamy taste, it’s the perfect way to elevate your morning ritual.',
      image: { src: IMG.botanical, alt: 'Milonga Mate Latte with vanilla and yerba mate', cutout: true },
      cta: { label: 'Shop the Mate Latte', href: shopHref },
    }),

    // ═══ ACT 2 · BODY ═══

    // Elevate your morning ritual
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Elevate your morning ritual',
        subtitle: 'Everything your mornings need',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.BenefitList, { bg, items: [
        { mark: 'yerba-mate', title: 'Clean, sustained energy' },
        { mark: 'lions-mane', title: 'Mental focus' },
        { mark: 'l-theanine', title: 'Calm, no jitters' },
        { mark: 'no-cane-sugar', title: 'No synthetic sweeteners' },
        { mark: 'gluten-dairy-free', title: 'Antioxidant-rich' },
      ]})
    ),

    // Three main ingredients
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Three main ingredients',
        subtitle: 'One unique experience',
      }),
      h('div', { style: { height: 22 } }),
      h(M.BenefitList, { bg, badgeSize: 52, size: 19, twoTone: false, items: [
        { mark: 'yerba-mate', title: '100mg Yerba Mate', text: 'Clean, sustained energy & rich antioxidants.' },
        { mark: 'lions-mane', title: '500mg Lion’s Mane', text: 'Focus and memory.' },
        { mark: 'l-theanine', title: '200mg L-Theanine', text: 'Balanced calm.' },
      ]}),
      h('div', { style: { height: 24 } }),
      h(M.ImageSlot, { bg, src: IMG.handPour, alt: 'A scoop of Milonga poured into a glass', cutout: true, ratio: 'wide' }),
      h('div', { style: { height: 18, textAlign: 'center' } }),
      h('div', { style: { textAlign: 'center' } },
        h(M.Button, { bg, label: '90 cal · 3g sugar per serving', href: shopHref, variant: 'outline', size: 'sm' })
      )
    ),

    // Hot or iced, in 30 seconds
    h(M.Section, { bg, pad: 'md', rule: true, align: 'center' },
      h(M.SectionHeading, { bg, eyebrow: 'Ready in 30 seconds', title: 'Hot or iced', align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.IconRow, { bg, marks: M.SERVE, size: 58 })
    ),

    // Why upgrade
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Why upgrade to the Mate Latte?',
        subtitle: 'Is that even a question?',
        align: 'center',
      }),
      h('div', { style: { height: 22 } }),
      h(M.ComparisonTable, {
        bg,
        style: 'lane',
        highlight: 1,
        columns: ['', 'Mate Latte', 'Matcha', 'Coffee', 'Mushroom coffee'],
        rows: [
          { label: 'Smooth caffeine', note: 'No jitters or crash', cells: [
            { v: true, note: '100mg from yerba mate' },
            { v: true, note: '~70mg' },
            { v: false, note: 'Spikes + crashes' },
            { v: 'Varies', note: 'Still coffee-based' },
          ]},
          { label: 'L-Theanine', note: 'Calm focus, no anxiety', cells: [
            { v: true, note: '200mg added' },
            { v: 'Trace', note: '~25mg natural' },
            false,
            { v: false, note: 'Most brands omit' },
          ]},
          { label: 'Lion’s Mane', note: 'Cognitive support', cells: [
            { v: true, note: '500mg full dose' },
            false,
            false,
            { v: true, note: 'Varies by brand' },
          ]},
          { label: 'Dairy-free latte', note: 'Just add water', cells: [
            { v: true, note: 'Oat + coconut built in' },
            { v: false, note: 'Needs milk/creamer' },
            { v: false, note: 'Needs creamer' },
            { v: false, note: 'Needs creamer' },
          ]},
        ],
      })
    ),

    // ═══ ACT 3 · CTA ═══
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Get yours before it runs out',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.PriceBlock, {
        bg,
        tabs: [
          { label: 'Buy 1', active: true, href: shopHref },
          { label: 'Buy 2 · Save 10%', href: shopHref },
          { label: 'Buy 3 · Save 15%', href: shopHref },
        ],
        options: [
          {
            label: 'One-time',
            price: '$29.99',
            detail: '15 servings',
            unit: '$2.00 per serving',
            cta: { label: 'Buy now', href: shopHref },
          },
          {
            label: 'Subscribe & Save',
            was: '$29.99',
            price: '$25.49',
            suffix: '/mo',
            detail: '15 servings monthly · cancel anytime',
            unit: '$1.70 per serving',
            badge: 'Save 15%',
            featured: true,
            cta: { label: 'Subscribe & Save', href: shopHref },
          },
        ],
      })
    ),

    h(M.Footer, { bg, social: SOCIAL })
  );
}
