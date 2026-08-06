// Campaign: "What's inside" — the ingredients email. Educational: read the
// back of the bag with us, line by line.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (price/offer).
// Gold, textured end to end. Every spec from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  botanical: '../public/product/pouch-botanical.png',
  handPour: '../public/product/pouch-hand-pour.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function WhatsInside({ shopHref = '#' }) {
  const bg = 'gold';

  return h(M.EmailShell, { bg, textured: true },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Hero, {
      bg,
      eyebrow: 'Read the back of the bag',
      title: 'Thirteen ingredients. Nothing to hide.',
      titleAccentPart: 'Nothing to hide.',
      titleSize: 36,
      body: 'Most coffee alternatives keep the interesting part in small print. Ours fits in one paragraph — so here it is, line by line, with what each thing is actually doing in your cup.',
      image: { src: IMG.botanical, alt: 'The Milonga Mate Latte pouch with vanilla and yerba mate', cutout: true },
    }),

    // ═══ ACT 2 · BODY ═══

    // The three that do the work.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'The three that do the work',
        subtitle: 'Every scoop, every time',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.BenefitList, { bg, badgeSize: 54, size: 19, twoTone: false, items: [
        { mark: 'yerba-mate', title: '100mg natural caffeine', text: 'From organic yerba mate extract — clean, sustained energy without the spike.' },
        { mark: 'lions-mane', title: "500mg Lion’s Mane", text: 'A full dose of the mushroom extract, for focus and mental clarity.' },
        { mark: 'l-theanine', title: '200mg L-Theanine', text: 'The amino acid that smooths the caffeine out and keeps it calm.' },
      ]})
    ),

    // What makes it a latte.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'What makes it creamy',
        subtitle: 'No dairy anywhere near it',
        align: 'center',
      }),
      h('div', { style: { height: 20 } }),
      h('p', { style: { fontSize: 13.5, lineHeight: 1.75, margin: 0, textAlign: 'center' } },
        'Four things do it, and none of them is milk: oat milk powder, coconut milk powder, coconut cream powder and MCT oil powder from coconut. That is why it froths into a real latte on water alone — no barista, no carton in the fridge.'
      ),
      h('div', { style: { height: 22 } }),
      h(M.ImageSlot, { bg, src: IMG.handPour, alt: 'A scoop of Milonga poured into a glass', cutout: true, ratio: 'wide' })
    ),

    // How it's sweetened.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Sweetened with honey and monk fruit',
        subtitle: '3g of sugar a serving',
        align: 'center',
      }),
      h('div', { style: { height: 20 } }),
      h('p', { style: { fontSize: 13.5, lineHeight: 1.75, margin: 0, textAlign: 'center' } },
        'Honey powder and real monk fruit extract, with a little coconut sugar and a pinch of pink Himalayan salt to round the vanilla. Nothing artificial, and nothing that leaves that cooling aftertaste.'
      ),
      h('div', { style: { height: 24 } }),
      h(M.IconRow, { bg, marks: M.FREE_FROM, size: 60 })
    ),

    // The whole list, in the open.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'The full list',
        subtitle: 'Exactly what is on the bag',
        align: 'center',
      }),
      h('div', { style: { height: 22 } }),
      h(M.Panel, { bg, pad: 22 },
        h(M.List, { bg, marker: 'leaf', items: [
          'Oat milk powder',
          'Coconut milk powder',
          'Coconut cream powder',
          'Honey powder',
          'Coconut sugar',
          'Acacia fiber',
          'Yerba mate extract',
          'MCT oil powder (from coconut)',
          'Vanilla flavour',
          "Lion’s Mane mushroom extract",
          'Monk fruit extract',
          'L-Theanine',
          'Pink Himalayan salt',
        ]})
      ),
      h('div', { style: { height: 22 } }),
      h('p', { style: { fontSize: 12.5, lineHeight: 1.7, margin: 0, textAlign: 'center' } },
        'Organic ingredients. No artificial sweeteners, no cane sugar, no erythritol. Gluten-free and dairy-free.'
      )
    ),

    // The numbers.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'What that adds up to',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.Stats, { bg, items: [
        { value: '90', label: 'Calories per serving' },
        { value: '3g', label: 'Sugar per serving' },
        { value: '15', label: 'Servings per bag' },
      ]})
    ),

    // ═══ ACT 3 · CTA ═══
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'Now taste the list',
        subtitle: 'The more you take, the less you pay',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.BundleOffer, {
        bg,
        tiers: [
          { label: 'Buy 1', price: '$29.99', detail: '15 servings', unit: '$2.00 / serving', href: shopHref },
          { label: 'Buy 2', price: '$53.98', detail: '30 servings', unit: '$1.80 / serving', badge: 'Save 10%', href: shopHref },
          { label: 'Buy 3', price: '$76.47', detail: '45 servings', unit: '$1.70 / serving', badge: 'Save 15%', featured: true, href: shopHref },
        ],
      })
    ),

    h(M.Footer, { bg, social: SOCIAL })
  );
}
