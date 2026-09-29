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
    // One benefit per line, centred and in caps. A row separated by dots has
    // to wrap wherever it runs out of width, which is never where the sense
    // breaks; a stack puts every item on its own line by construction and the
    // three of them read as a list rather than as a sentence. Caps and a
    // little tracking keep short lines from looking like leftover body copy.
    h('div', { style: { marginTop: 26, textAlign: 'center' } },
      benefits.map((b, i) => h('div', { key: i,
        style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
          fontSize: 21, letterSpacing: '0.06em', textTransform: 'uppercase',
          lineHeight: 1.62, color: '#F0EFDF' } }, b)),
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
    // THE TITLE GIVES GROUND BACK TO THE PICTURE. The paragraph is gone, and
    // the headline drops 50 -> 44, at which "EVERYTHING YOUR" fits the 508
    // units between the margins and the stack is two lines instead of three.
    // Between them that frees about 110 units at the head of the frame.
    //
    // The arrangement then moves up into it and grows. Cover is the smallest
    // scale that fills a frame, so a picture that already fills it has no
    // crop left to give — the only way to make the subject bigger is to go
    // PAST cover, which zoom does, at the cost of the edges. 1.16 with the
    // focus a third down spends that cost on the empty cream at the foot.
    S({ src: '../public/product/flatlay-ingredients.jpg', focus: 'center 32%',
        zoom: 1.16, align: 'top', padX: 46, padY: 46 },
      h(M.SlideTitle, { line1: 'Everything your', line2: 'mornings need.',
        size: 44, lead: 0.98, color: FOREST, color2: FOREST }),
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
    // 5 · THE ASK, on the photograph. White over gold and a halo behind the
    // letters, the way the rest of the account's photo slides run — no scrim,
    // so the picture keeps its light. The spec line goes to caps and picks up
    // the gold, which is how a fact reads as a fact rather than as a caption.
    S({ src: '../public/product/latte-iced-table.jpg', focus: 'center top',
        align: 'top', padX: 48, padY: 50 },
      h(M.SlideTitle, { line1: 'One scoop.', line2: 'Thirty seconds.',
        size: 46, lead: 0.98, color: '#FFFFFF', color2: '#E3BC62', halo: 'hold' }),
      h('div', { style: { marginTop: 24 } },
        ['15 servings · 90 cal · 3g sugar', 'Dairy-free · Hot or iced'].map((t, i) =>
          h('div', { key: i,
            style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 19, letterSpacing: '0.07em', textTransform: 'uppercase',
              lineHeight: 1.6, color: '#FFFFFF',
              textShadow: '0 0 3px rgba(0,26,13,0.9), 0 1px 4px rgba(0,26,13,0.85), 0 3px 14px rgba(0,26,13,0.7), 0 8px 30px rgba(0,26,13,0.5)' } }, t)),
      ),
      // The button stays. It sits on the clear wall between the spec lines
      // and the glass, and this is the one carousel in the set whose job is
      // the sale rather than the story.
      h(M.SlideCta, { label: 'Experience it', align: 'left', onPhoto: true }),
    ),
  );
}
