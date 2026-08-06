// Campaign: "What's inside" — the ingredients email. Educational: read the
// back of the bag with us, line by line.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (price/offer).
// Dark green, textured end to end. Every spec from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  handHolding: '../public/product/hand-holding.png',
  icedBotanical: '../public/product/pouch-iced-botanical.png',
  handPour: '../public/product/pouch-hand-pour-big.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function WhatsInside({ shopHref = '#' }) {
  const bg = 'forest';

  return h(M.EmailShell, { bg, textured: true },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Hero, {
      bg,
      eyebrow: 'Read the back of the bag',
      title: 'Functional ingredients. Nothing to hide.',
      titleAccentPart: 'Nothing to hide.',
      titleSize: 36,
      body: 'Most coffee alternatives keep the interesting part in small print. Ours fits in one paragraph — so here it is, line by line, with what each thing is actually doing in your cup.',
    }),

    // The pouch comes in from the left edge, outside any Section padding.
    h(M.BleedImage, { bg, src: IMG.handHolding, side: 'left', width: 0.82, overhang: 26,
      alt: 'A hand holding the Milonga Mate Latte pouch' }),

    // ═══ ACT 2 · BODY ═══

    // The three that do the work.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'The ingredients behind the feeling',
        subtitle: 'Selected with purpose',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.BenefitList, { bg, badgeSize: 54, size: 19, twoTone: false, items: [
        { mark: 'yerba-mate', title: '100mg natural caffeine', text: 'From organic yerba mate — the leaf South America has been drinking for centuries. It releases its caffeine slowly instead of all at once, so the lift arrives and stays, antioxidants included.' },
        { mark: 'lions-mane', title: "500mg Lion’s Mane", text: 'A full 500mg of the mushroom extract, not the pinch most brands put on the label to earn the name. It is here for focus and mental clarity through a long morning.' },
        { mark: 'l-theanine', title: '200mg L-Theanine', text: 'The amino acid found in tea leaves, added at 200mg. It is what takes the edge off caffeine — the same energy, arriving calm and even instead of sharp.' },
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
      h(M.ImageSlot, { bg, src: IMG.icedBotanical, alt: 'The Mate Latte served over ice, with vanilla and yerba mate', cutout: true, ratio: 'wide' })
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
        subtitle: 'What’s really inside the Mate Latte?',
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
      )
    ),

    // ═══ ACT 3 · CTA ═══
    // One uninterrupted block: the pour, the fact, the ask. No rules between.
    // The pour comes in from the right, with the fact stamped between the
    // bag and the hand — the way it reads on the landing page.
    h(M.BleedImage, {
      bg, src: IMG.handPour, side: 'right', width: 0.94, overhang: 20,
      alt: 'A scoop of Milonga poured into a glass',
      overlayAt: { top: '9%', left: '40%' },
      overlay: h(M.Badge, { bg, label: '90 cal, 3g sugar', sub: 'Per serving' }),
    }),
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Button, { bg, label: 'Try it now', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg, social: SOCIAL })
  );
}
