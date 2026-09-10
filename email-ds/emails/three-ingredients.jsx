// Campaign: "Three ingredients, one clear morning" — the ingredient education
// email. One section per ingredient, then the section that explains why the
// three together are the actual product.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (offer, urgency).
// Dark green, textured end to end. Specs from .design-sync/brand/milonga-product.md.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  botanical: '../public/product/pouch-botanical.png',
  handPour: '../public/product/pouch-hand-pour-big.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

// One ingredient: the mark in a disc, the dose, the two-line title, the story.
function Ingredient({ bg, mark, dose, line1, line2, text, rule }) {
  return h(M.Section, { bg, pad: 'lg', rule },
    h('div', { style: { textAlign: 'center' } },
      h(M.IconBadge, { mark, bg, size: 76 })
    ),
    h('div', { style: { height: 18 } }),
    h('div', { style: {
      fontFamily: M.fontStack, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em',
      textTransform: 'uppercase', color: M.onBg[bg].accent, textAlign: 'center',
    } }, dose),
    h('div', { style: { height: 10 } }),
    h(M.Headline, { bg, line1, line2, size: 30, align: 'center' }),
    h('div', { style: { height: 16 } }),
    h('p', { style: {
      fontFamily: M.fontStack, fontSize: 14, lineHeight: 1.75, margin: '0 auto',
      maxWidth: 430, textAlign: 'center', color: M.onBg[bg].body,
    } }, text)
  );
}

function ThreeIngredients({ shopHref = '#' }) {
  const bg = 'forest';

  return h(M.EmailShell, { bg, textured: true },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h('div', { style: {
        fontFamily: M.fontStack, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: M.onBg[bg].accent,
      } }, 'What’s in the cup'),
      h('div', { style: { height: 14 } }),
      h(M.Headline, { bg, line1: 'Three ingredients,', line2: 'one clear morning.', size: 40, align: 'center' }),
      h('div', { style: { height: 18 } }),
      h('p', { style: {
        fontFamily: M.fontStack, fontSize: 15, lineHeight: 1.7, margin: '0 auto',
        maxWidth: 440, textAlign: 'center', color: '#FFFFFF',
      } }, 'The Mate Latte isn’t a long list of things you can’t pronounce. It’s three functional ingredients, each doing one job — and a vanilla latte built around them.')
    ),

    // The product, straight away.
    h(M.Section, { bg, pad: 'sm' },
      h(M.ImageSlot, { bg, src: IMG.botanical, alt: 'The Milonga Mate Latte pouch with vanilla and yerba mate', cutout: true, ratio: 'wide' })
    ),
    h(M.Section, { bg, pad: 'sm', align: 'center' },
      h(M.SpecPills, { bg, items: [
        '100mg natural caffeine',
        '500mg Lion’s Mane',
        '200mg L-Theanine',
      ]})
    ),

    // ═══ ACT 2 · BODY — one section per ingredient ═══

    h(Ingredient, {
      bg, rule: true, mark: 'yerba-mate', dose: '100mg natural caffeine',
      line1: 'Yerba mate,', line2: 'the leaf it starts with.',
      text: 'A holly leaf from the forests of South America, dried and steeped there for centuries — long before anyone called it a wellness drink. It carries caffeine, but releases it gradually, which is why a mate morning climbs instead of spiking. It’s rich in antioxidants too. Ours is organic, and it’s the base of the whole cup.',
    }),

    h(Ingredient, {
      bg, rule: true, mark: 'lions-mane', dose: '500mg per serving',
      line1: 'Lion’s Mane,', line2: 'for the thinking part.',
      text: 'A white, shaggy mushroom that grows on hardwood trees, long used in East Asian cooking and herbal tradition. It’s here for cognitive support — focus and mental clarity through a long morning. 500mg is a full dose, not the pinch most labels use just to earn the name on the front.',
    }),

    h(Ingredient, {
      bg, rule: true, mark: 'l-theanine', dose: '200mg per serving',
      line1: 'L-Theanine,', line2: 'the one that steadies it.',
      text: 'An amino acid found naturally in tea leaves. It’s the reason a cup of tea can feel calm despite the caffeine in it — it takes the edge off, so the lift arrives even instead of sharp. We add 200mg, paired deliberately with the mate’s 100mg of caffeine.',
    }),

    // How they come together.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.Headline, { bg, line1: 'Separately, ingredients.', line2: 'Together, the point.', size: 28, align: 'center' }),
      h('div', { style: { height: 24 } }),
      h(M.IconRow, { bg, marks: M.INGREDIENTS, size: 60 }),
      h('div', { style: { height: 26 } }),
      h('p', { style: {
        fontFamily: M.fontStack, fontSize: 14.5, lineHeight: 1.75, margin: '0 auto',
        maxWidth: 450, textAlign: 'center', color: '#FFFFFF',
      } }, 'The mate lifts. The L-Theanine keeps the lift even. The Lion’s Mane is there for the part of the morning that actually asks you to think. That combination is the whole reason the Mate Latte feels different from a coffee — and why it tastes like a vanilla latte rather than something you have to get through.')
    ),

    // ═══ ACT 3 · CTA ═══
    h(M.BleedImage, {
      bg, src: IMG.handPour, side: 'right', width: 0.94, overhang: 20,
      alt: 'A scoop of Milonga poured into a glass',
      overlayAt: { top: '9%', left: '40%' },
      overlay: h(M.Badge, { bg, label: '90 cal, 3g sugar', sub: 'Per serving' }),
    }),
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Headline, { bg, line1: 'Taste the three.', line2: 'Fifteen mornings a bag.', size: 26, align: 'center' }),
      h('div', { style: { height: 22 } }),
      h(M.Button, { bg, label: 'Try it now', href: shopHref, size: 'lg' }),
      h('div', { style: {
        fontFamily: M.fontStack, fontWeight: 700, fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: M.onBg[bg].accent, marginTop: 16,
      } }, '$29.99 · $2.00 a serving')
    ),

    h(M.Footer, { bg, social: SOCIAL, rule: false })
  );
}
