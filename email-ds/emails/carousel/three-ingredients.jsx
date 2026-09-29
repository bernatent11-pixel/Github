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
    // The benefits are set as one line, but each one is nowrap and the dots
    // between them are the only break points. Left to wrap on its own the row
    // split inside an item — "No jitters, no / crash" — which reads as two
    // benefits rather than one. The dots are gold, so the row also picks up
    // the accent the headline uses.
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
      fontSize: 22, lineHeight: 1.4, color: '#F0EFDF', textAlign: 'center',
      maxWidth: 492, margin: '24px auto 0' } },
      // Each item carries its own trailing dot INSIDE its nowrap span, and the
      // only plain whitespace is between the spans. That is what decides where
      // the row is allowed to break: padding is not a break opportunity at all
      // (the row simply ran off the right edge), and a separator that sits
      // between the spans wraps down with the item after it and reads as a
      // bullet at the head of the second line.
      benefits.flatMap((b, i) => [
        h('span', { key: i, style: { whiteSpace: 'nowrap' } }, b,
          i < benefits.length - 1 ? h('span', { style: { color: '#E3BC62' } }, '  ·') : null),
        i < benefits.length - 1 ? ' ' : null,
      ]).filter(Boolean),
    ),
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
      '200mg L-Theanine', 'L-Theanine,', 'what balances\nit all.',
      // One phrase, not two: "Balanced and calm" and "Balances the whole
      // experience" were the same claim said twice, and the repeat of the
      // word was the first thing the eye caught.
      ['Balanced and calm']),

    // 5 · THE ASK. This was the weakest slide in the set — a closing frame
    // carrying nothing but type, on a carousel whose whole argument is what
    // is in the pouch. The scoop shot is the sentence "one scoop, thirty
    // seconds" drawn rather than written, so it goes in and takes the foot of
    // the frame, bleeding past both edges the way the gourd and the jar do
    // elsewhere in the set.
    //
    // The title steps 52 -> 46 to buy the room: at 52 "THIRTY SECONDS." broke
    // in two and the block ran three lines deep.
    S({ bg: 'beige', textured: true, align: 'top', padX: 54, padY: 58 },
      h(M.SlideTitle, { line1: 'One scoop.', line2: 'Thirty seconds.',
        size: 46, lead: 0.98, align: 'center', color: FOREST, color2: FOREST }),
      h(M.SlideBody, { text: '15 servings · 90 cal · 3g sugar\nDairy-free · Hot or iced',
        size: 21, color: '#000000', align: 'center', measure: 440, top: 24 }),
      h(M.SlideCta, { label: 'Experience it', bg: 'beige', align: 'center' }),
      h('img', { src: '../public/product/pouch-hand-pour-big.png',
        alt: 'A scoop of Milonga Mate Latte powder being poured into a glass beside the pouch',
        // Flush left rather than bled left: the pouch already touches the
        // edge of its own file, so any negative offset slices its front face
        // off. It bleeds on the right instead, where the arm runs out of
        // frame and reads as reaching in.
        style: { position: 'absolute', left: 0, bottom: 0, width: 656,
                 height: 'auto', display: 'block' } }),
    ),
  );
}
