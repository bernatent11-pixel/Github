// EVERYTHING YOUR MORNINGS NEED — feed carousel.
//
// The email gave each ingredient a section; the feed gives each one a slide,
// which is the rare case where the format costs nothing — the content was
// already three parallel units.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const FOREST = '#004D27';

// One ingredient. The picture carries the slide, so it runs at 250 rather
// than the 168 it had — at 168 inside a 1080px frame it read as an icon
// sitting in a field of green instead of as the thing being introduced.
// The benefits go on one line separated by gold dots, which also closes the
// block up: three centred lines of 23 left a hole underneath them.
function Ingredient(src, alt, eyebrow, line1, line2, benefits) {
  return h(M.Slide, { bg: 'forest', textured: true, align: 'center', padX: 52 },
    h('div', { style: { textAlign: 'center' } },
      h('img', { src, alt, style: { width: 250, height: 250, objectFit: 'contain', display: 'inline-block' } }),
    ),
    h('div', { style: { height: 30 } }),
    h(M.SlideEyebrow, { text: eyebrow, align: 'center' }),
    h(M.SlideTitle, { line1, line2, size: 42, lead: 1.0, align: 'center',
      color: '#F0EFDF', color2: '#E3BC62' }),
    h(M.SlideBody, { text: benefits.join('  ·  '), size: 22, align: 'center', measure: 470, top: 24 }),
  );
}

function CarouselThreeIngredients() {
  return h('div', null,

    // 1 · THE HOOK. This still life is shot on cream — measured 118 at the
    // foot WITH the white type counted in, so the ground under it is lighter
    // still, and cream and gold had nothing to hold on to. Forest green on
    // the same picture, untouched, and no scrim.
    //
    // FOREST GREEN NEEDS CREAM TO SIT ON, THOUGH, and at the foot of this
    // frame it was landing on the dark leaf and the pouch. The source is
    // 1200 x 2150 against a 600 x 750 frame, so HEIGHT binds and 325 design
    // units overflow — by far the most latitude in the set. Anchoring the
    // crop to the top drops the whole arrangement 162 units and opens a clean
    // cream band across the head of the slide for the type to take.
    S({ src: '../public/product/flatlay-ingredients.jpg', focus: 'center top',
        align: 'top', padX: 46, padY: 48 },
      h(M.SlideTitle, { line1: 'Everything your', line2: 'mornings need.',
        size: 50, lead: 0.96, color: FOREST, color2: FOREST }),
      h(M.SlideBody, { text: 'Three functional ingredients.\nOne 30-second ritual.',
        size: 22, color: '#1A1A1A', measure: 440, top: 18 }),
    ),

    Ingredient('../public/product/ing-yerba-mate.png', 'Loose yerba mate leaf',
      '100mg yerba mate', 'Yerba mate,', 'the foundation.',
      ['Clean sustained energy', 'No jitters, no crash', 'Rich in antioxidants']),

    Ingredient('../public/product/ing-lions-mane.png', 'A lion’s mane mushroom',
      '500mg Lion’s Mane', 'Lion’s Mane,', 'for a clear head.',
      ['Mental clarity', 'Concentration', 'Memory']),

    Ingredient('../public/product/ing-theanine.png', 'L-Theanine powder',
      '200mg L-Theanine', 'L-Theanine,', 'what balances it all.',
      ['Balanced and calm', 'Balances the whole experience']),

    S({ bg: 'beige', textured: true, align: 'center', padX: 54 },
      h(M.SlideTitle, { line1: 'One scoop.', line2: 'Thirty seconds.',
        size: 52, lead: 0.96, align: 'center', color: FOREST, color2: FOREST }),
      h(M.SlideBody, { text: '15 servings · 90 cal · 3g sugar\nDairy-free · Hot or iced',
        size: 22, color: '#000000', align: 'center', measure: 440, top: 26 }),
      h(M.SlideCta, { label: 'Experience it', bg: 'beige', align: 'center' }),
    ),
  );
}
