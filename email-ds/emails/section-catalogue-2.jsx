// SECTION CATALOGUE · PART TWO — the chrome, the imagery, the offer, the
// text shapes a paragraph can't do. Same rules as part one: labelled, in our
// palette, built to be looked at and picked from.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  pour: '../public/product/mind-body-connected.jpg',
  hand: '../public/product/pouch-hand-pour-big.png',
  iced: '../public/product/pouch-iced-botanical.png',
  pouch: '../public/product/pouch-botanical.png',
  mate: '../public/product/ing-yerba-mate.png',
  lions: '../public/product/ing-lions-mane.png',
  thea: '../public/product/ing-theanine.png',
};

function Tag(id, name, note) {
  return h('div', { style: { background: '#004D27', padding: '14px 30px', borderTop: '2px solid #E3BC62' } },
    h('div', { style: { fontFamily: M.fontStack, fontWeight: 900, fontSize: 12, letterSpacing: '0.16em',
      textTransform: 'uppercase', color: '#E3BC62', lineHeight: 1.3 } }, id + ' · ' + name),
    h('div', { style: { fontFamily: M.fontStack, fontSize: 12.5, lineHeight: 1.5, color: '#FFFFFF',
      opacity: 0.82, marginTop: 5 } }, note));
}
function Gap(n) { return h('div', { style: { height: n, lineHeight: 0, fontSize: 0 } }); }

function SectionCatalogue2() {
  const bg = 'beige';

  return h(M.EmailShell, { bg, preset: 'systematic' },

    Tag('S7', 'Announcement Bar', 'The first 40px are read by everyone, including people who read nothing else. One fact, never two.'),
    h(M.AnnouncementBar, { bg, text: 'Free shipping on orders over $50', filled: true }),
    Gap(8),
    h(M.AnnouncementBar, { bg, text: 'New: the vanilla Mate Latte', filled: false }),
    Gap(36),

    Tag('S8', 'Nav Strip', 'Gives a reader who does not want today’s message somewhere to go other than delete.'),
    Gap(8),
    h(M.NavStrip, { bg, links: [
      { label: 'Shop', href: '#' }, { label: 'Our story', href: '#' }, { label: 'How to make it', href: '#' },
    ]}),
    Gap(36),

    Tag('S9a', 'Collage — row, seamless', 'Three photographs as one moment. At gap 0 they butt into a mosaic.'),
    h(M.Collage, { bg, layout: 'row', gap: 0, images: [
      { src: IMG.mate, alt: 'Yerba mate' }, { src: IMG.lions, alt: 'Lion’s Mane' }, { src: IMG.thea, alt: 'L-Theanine' },
    ]}),
    Gap(36),

    Tag('S9b', 'Collage — feature', 'One picture is stronger than the others. Give it the full width.'),
    h(M.Collage, { bg, layout: 'feature', gap: 6, rounded: true,
      caption: 'Bark, leaf and powder — the whole formula before it becomes a latte.',
      images: [
        { src: IMG.flatlay, alt: 'Flat-lay of the Mate Latte' },
        { src: IMG.iced, alt: 'Iced Mate Latte' },
        { src: IMG.pour, alt: 'Pouring a stick into a glass' },
      ]}),
    Gap(36),

    Tag('S10', 'Offer Band', 'The dashed box is the convention for “this is a thing you copy”. Only state an expiry that is true.'),
    Gap(32),
    h(M.OfferBand, { bg,
      headline: '15% off', detail: 'On your first three bags. One scoop, 30 seconds, hot or iced.',
      code: 'MORNINGS', expiry: 'Ends Sunday',
      cta: { label: 'Claim it', href: '#' },
    }),
    Gap(36),

    Tag('S11', 'FAQ List', 'A different shape from a paragraph, and read far faster. Three or four pairs, not a help centre.'),
    Gap(28),
    h(M.FaqList, { bg, items: [
      { q: 'Does it taste like yerba mate?', a: 'It tastes like a vanilla latte. The mate is the energy underneath, not the flavour on top.' },
      { q: 'Hot or iced?', a: 'Both. Same scoop, same 30 seconds — cold water and ice for iced.' },
      { q: 'How many servings in a bag?', a: 'Fifteen.' },
    ]}),
    Gap(36),

    Tag('S12', 'Quote With Image', 'A single voice with a moment attached. Don’t put it next to the review grid.'),
    Gap(28),
    h(M.QuoteWithImage, { bg, side: 'left', stars: 5,
      src: IMG.pour, alt: 'Pouring the Mate Latte',
      quote: '“A coffee latte without the acidity from coffee.”',
      attribution: 'Priscilla',
    }),
    Gap(36),

    Tag('S13', 'Check List', 'The free-from version answers the objection a benefit list can’t.'),
    Gap(28),
    h(M.CheckList, { bg, mark: 'check', columns: 2, items: [
      'No cane sugar', 'No erythritol', 'No artificial sweeteners', 'Gluten-free', 'Dairy-free', 'Organic ingredients',
    ]}),
    Gap(36),

    h(M.Footer, { bg, social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
