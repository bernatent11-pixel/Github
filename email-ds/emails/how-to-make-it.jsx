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
    // Beige, textured, and it carries the whole second half: the drink's
    // name, what goes in it, and how to make it.
    //
    // ON BEIGE THE INK IS ONE DARK GREEN. Gold measures about 1.5:1 here, so
    // it is a fill and never type — which is why the bullets are the GREEN
    // mark rather than the gold one the photographic slides use.
    h('div', { style: { ...M.bgStyle('beige', M.bgFill.beige, true), padding: '56px 30px 60px' } },

      h('div', { style: { textAlign: 'center' } },
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
          fontSize: 36, letterSpacing: '0.01em', textTransform: 'uppercase',
          lineHeight: 1.02, color: '#004D27' } }, 'Golden Vanilla Mate'),
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
          fontSize: 17, lineHeight: 1.5, color: '#1A1A1A', maxWidth: 440,
          margin: '20px auto 0' } },
          'Creamy vanilla, a touch of honey, and a refreshing twist on your daily Mate Latte.'),
      ),

      // THE INGREDIENTS ROW. The list is fixed at 300 units and the picture
      // takes what is left plus 30 more, running off the right edge — the
      // same bleed the gourd and the pouch use elsewhere. A cutout with air
      // on all four sides is a sticker; the same object crossing the edge is
      // a photograph.
      //
      // 336 is measured, not chosen, and the picture was sized to leave it.
      // The longest line — "Optional: cinnamon stick for garnish" — is 36
      // characters, and at 16, the body floor, this face runs about 7.6 units
      // a character: 273, plus the 21 the bullet and its gap take. At 300 two
      // ingredients wrapped and at 310 one still did, which on a list of
      // eight reads as a mistake rather than as a measure. The jar gives the
      // width up rather than the list, because a list that wraps looks wrong
      // and a picture 20 units narrower does not.
      h('div', { style: { position: 'relative', marginTop: 40, minHeight: 250 } },
        h('div', { style: { width: 336 } },
          h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
            fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#004D27', marginBottom: 16 } }, 'What you’ll need'),
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
            h('img', { src: '../public/logo/mark-green.png', alt: '',
              style: { height: 13, width: 'auto', flex: 'none', display: 'block', marginTop: 4 } }),
            h('span', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 16, lineHeight: 1.45, color: '#1A1A1A' } }, t),
          )),
        ),
        h('img', { src: '../public/product/jar-in-hand.png',
          alt: 'A hand holding a tall glass jar of iced Milonga Mate Latte, embossed with the Milonga hand.',
          style: { position: 'absolute', right: -36, top: 8, width: 228,
                   height: 'auto', display: 'block' } }),
      ),

      // THE METHOD. Four steps, numbered, set left — an ordered process is
      // the one place where a step's position matters as much as its name.
      h('div', { style: { marginTop: 46, textAlign: 'left' } },
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
          fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#004D27', marginBottom: 22 } }, 'How to make it'),
        [
          ['01', 'Make the Mate', 'Add 2.5 tbsp Milonga Mate Latte to 2 oz hot water. Stir until completely dissolved.'],
          ['02', 'Make it Creamy', 'Add 1 tsp honey, ¼ tsp vanilla, and a pinch of cinnamon. Stir well.'],
          ['03', 'Pour Over Ice', 'Fill a glass with ice and pour in 6 oz of your favorite milk.'],
          ['04', 'Finish', 'Pour the Mate Latte over the milk. Give it a gentle stir and top with a light dusting of cinnamon.'],
        ].map(([n, title, text], i) => h('div', { key: i,
          style: { display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 22 } },
          h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
            fontSize: 30, lineHeight: 1, color: 'rgba(0,77,39,0.34)', flex: 'none',
            width: 48 } }, n),
          h('div', null,
            h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
              fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#004D27', marginBottom: 7 } }, title),
            h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 16, lineHeight: 1.45, color: '#1A1A1A' } }, text),
          ),
        )),
      ),

      h('div', { style: { marginTop: 14, textAlign: 'center' } },
        h(M.Button, { label: 'Shop the Mate Latte', href: '#shop', bg: 'beige' }),
      ),
    ),
  );
}
