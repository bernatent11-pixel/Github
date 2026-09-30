// SCOOP, WHISK, ENJOY — a one-section email.
//
// Subject: Scoop, Whisk, Enjoy 🧉
// Preview: Thirty seconds from pouch to cup — hot or over ice.
//
// ONE SECTION IS A DIFFERENT BRIEF FROM A SHORT EMAIL. There is no second act
// to carry anything, so everything the reader needs has to sit in one frame
// and in one reading order: who it is from, what this is, the three steps,
// the two ways to serve it, and the button. Nothing decorative, because
// anything decorative here is competing with the instructions.
const M = window.MilongaEmailDS;
const h = React.createElement;

function HowToMakeIt() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER, ON THE PHOTOGRAPH ─────────────────────────────────
    // Wordmark centred at the head, the headline and its line under it, the
    // button below that — the whole reading in the top third, with the glass
    // and the pouch taking the rest of the frame untouched.
    //
    // THE PICTURE IS DARKENED AT THE HEAD, and the ink flips with it. Beige
    // type needs a dark ground, so the whole section changes hands at once:
    // ink 'light', a scrim weighted to the top, and the wordmark in gold.
    // Measured on the band the title occupies, the photograph averages
    // rgb(131,123,105) and spans 35 to 247 — at 0.55 that band lands near 60,
    // where beige reads about 9:1. The gradient is out by 78% of the frame,
    // so the glass, the pouch and the table keep their own light.
    //
    // THE FRAME IS TALLER THAN THE FILE, and that is what keeps the paragraph
    // off the bag. The source is 1333 x 2000, its own ratio 1.5; at 1.68 the
    // frame binds on HEIGHT instead, so the picture scales up from 0.450 to
    // 0.504 and every subject in it moves down. The pouch's top goes from 315
    // design units to 353, and the copy block — 92 of wordmark, 126 of title,
    // 50 of paragraph and the gaps between them — ends at 340. The cost is 36
    // units of width off each side, which this composition has to give.
    h(M.T9Story, {
      src: '../public/product/latte-iced-table.jpg',
      alt: 'Cold, creamy and ready in 30 seconds. A tall glass of iced Milonga Mate Latte on a table in morning light, a hand stirring it with a straw, the vanilla Mate Latte pouch behind it and a branch of white blossom above. Try it.',
      logo: true,
      logoTone: 'gold',
      logoHeight: 92,
      // No logoTop here. On a CENTRED stack the wordmark renders inside the
      // stack, so `top` is what moves it — logoTop only applies when the copy
      // is left-aligned and the mark comes out of the column to centre itself
      // on the frame.
      align: 'center',
      line1: 'Cold, creamy &',
      // The payoff breaks where the sense breaks, not where the column runs
      // out. At this size "READY IN 30 SECONDS." wraps on its own after "30"
      // and strands "SECONDS." — the explicit break gives two rows of 304 and
      // 418 units instead.
      line2: 'ready in\n30 seconds.',
      line1Color: '#F0EFDF',
      line2Color: '#F0EFDF',
      paras: ['Make it iced, keep it creamy, and enjoy steady energy without the coffee-shop routine.'],
      cta: { label: 'Try it', href: '#shop', arrow: true },
      // Pinned low, the way the full-image opener is meant to work: the mark
      // and the words are one thing to read at the head, the button is the
      // one thing to do at the foot, and the photograph fills the gap
      // between them. A single clump in the middle wastes the frame.
      at: '86%',
      ctaAlign: 'center',
      ratio: 1.68,
      size: 28,
      size2: 48,
      titleLead: 1.02,
      top: 20,
      padLeft: 26,
      padRight: 26,
      measure: 430,
      ink: 'light',
      scrim: 0.55,
      scrimAt: 'top',
      // One quiet shadow, not the dense halo. The scrim is already carrying
      // the separation; a four-layer stack behind 48px letters reads as an
      // effect rather than as clarity.
      halo: 'soft',
    }),

    // ── 2 · THE RECIPE ────────────────────────────────────────────────────
    // ONE GROUND FROM THE PHOTOGRAPH DOWN: this email's own paper grain,
    // recoloured to the core forest by scripts/make-forest-paper.mjs. It is
    // not tile-forest, which is a different pattern altogether (the brand
    // doodle); it is the SAME tile, its grain carried across as a deviation
    // from the paper's mean rather than as a colour, so the fibre reads
    // identically and only the hue moves.
    //
    // THE INK IS THE DARK-GROUND SET THROUGHOUT: cream titles, white body,
    // gold eyebrows, gold numerals, gold bullets. Gold finally has ground
    // under it — on the beige this section used to sit on it measured
    // 1.56:1, which is why every mark there had to be dark green instead.
    //
    // overflow hidden. The jar runs past the right edge on purpose, and
    // without a clip here that overflow widened the whole page: the export
    // came out 1300 wide instead of 1200, with 100 units of the page's own
    // forest showing down the right-hand side.
    h('div', { style: {
      backgroundColor: '#004D27',
      backgroundImage: 'linear-gradient(180deg, rgba(0,26,13,0.34) 0%, rgba(0,26,13,0) 96px), url(../public/brand/textures/tile-paper-forest.jpg)',
      backgroundSize: 'auto, 320px 320px',
      backgroundRepeat: 'no-repeat, repeat',
      padding: '56px 30px 56px',
      position: 'relative', overflow: 'hidden' } },

      h('div', { style: { textAlign: 'center' } },
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
          fontSize: 36, letterSpacing: '0.01em', textTransform: 'uppercase',
          lineHeight: 1.02, color: '#F0EFDF' } },
          h('span', { style: { color: '#E3BC62' } }, 'Golden'), ' Vanilla Mate'),
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
          fontSize: 17, lineHeight: 1.5, color: '#FFFFFF', maxWidth: 440,
          margin: '20px auto 0' } },
          'Creamy vanilla, a touch of honey, and a refreshing twist on your daily Mate Latte.'),
      ),

      // THE INGREDIENTS ROW. The list is fixed at 300 units and the picture
      // takes what is left plus 30 more, running off the right edge — the
      // same bleed the gourd and the pouch use elsewhere. A cutout with air
      // on all four sides is a sticker; the same object crossing the edge is
      // a photograph.
      //
      // THE BLEED AND THE TYPE SIZE BOTH PAY FOR THE PICTURE. Measured on the
      // render, this face runs about 8.15 units a character at 15, so the
      // longest line — "Optional: cinnamon stick for garnish", 36 characters
      // — needs 293 there and 254 at 13, plus the 16 the bullet and its gap
      // take. A 272 column holds it. The jar keeps running 80 units past the
      // right edge, where the crop comes off the SLEEVE and costs nothing,
      // and the two together take it to 330 against the 228 it started at.
      //
      // 15 is one step under the system's 16 body floor. Flagged rather than
      // taken quietly: it is a spec list of short phrases, not running copy,
      // and it is the only type in either email below the floor.
      h('div', { style: { position: 'relative', marginTop: 56, minHeight: 250 } },
        h('div', { style: { width: 272 } },
          h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
            fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#E3BC62', marginBottom: 16 } }, 'What you’ll need'),
          [
            '2.5 tbsp Milonga Vanilla Mate Latte',
            '2 oz hot water',
            '6 oz oat or almond milk',
            'Ice',
            '1 tsp honey',
            '¼ tsp vanilla extract',
            'Pinch of cinnamon',
            'Optional: cinnamon stick for garnish',
          ].map((t, i) => h('div', { key: i,
            style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7 } },
            h('img', { src: '../public/logo/mark-gold.png', alt: '',
              style: { height: 11, width: 'auto', flex: 'none', display: 'block', marginTop: 3 } }),
            h('span', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 13, lineHeight: 1.45, color: '#FFFFFF' } }, t),
          )),
        ),
        // The supplied cutout, trimmed to its own subject — the file carried
        // 74% empty pixels, and trimming them is free size.
        h('img', { src: '../public/product/jar-golden-vanilla.png',
          alt: 'A hand holding a glass jar of Golden Vanilla Mate, dusted with cinnamon and streaked with honey, embossed with the Milonga hand.',
          // zIndex 1 because the jar is 303 units tall in a 250-unit row, so
          // its base finishes exactly where the band begins and the two are
          // one pixel from fighting. It paints above, so the glass can never
          // be clipped by the strip it stands on. Nothing moves.
          style: { position: 'absolute', right: -80, top: -4, width: 330,
                   height: 'auto', display: 'block', zIndex: 1 } }),
      ),

      // THE METHOD. Four steps, numbered, set left — an ordered process is
      // the one place where a step's position matters as much as its name.
      h('div', { style: { marginTop: 52, textAlign: 'left' } },
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
          fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#E3BC62', marginBottom: 22 } }, 'How to make it'),
        [
          ['01', 'Make the Mate', 'Add 2.5 tbsp Milonga Mate Latte to 2 oz hot water. Stir until completely dissolved.'],
          ['02', 'Make it Creamy', 'Add 1 tsp honey, ¼ tsp vanilla, and a pinch of cinnamon. Stir well.'],
          ['03', 'Pour Over Ice', 'Fill a glass with ice and pour in 6 oz of your favorite milk.'],
          ['04', 'Finish', 'Pour the Mate Latte over the milk. Give it a gentle stir and top with a light dusting of cinnamon.'],
        ].map(([n, title, text], i) => h('div', { key: i,
          style: { display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 22 } },
          h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
            fontSize: 30, lineHeight: 1, color: '#E3BC62', flex: 'none',
            width: 48 } }, n),
          h('div', null,
            h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
              fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#F0EFDF', marginBottom: 7 } }, title),
            h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 16, lineHeight: 1.45, color: '#FFFFFF' } }, text),
          ),
        )),
      ),

      h('div', { style: { marginTop: 14, textAlign: 'center' } },
        h(M.Button, { label: 'Shop the Mate Latte', href: '#shop', bg: 'forest' }),
      ),
    ),
  );
}
