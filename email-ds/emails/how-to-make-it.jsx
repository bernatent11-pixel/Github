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
  return h(M.EmailShell, { bg: 'forest' },

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
      alt: 'Cold, creamy and ready in 30 seconds. A tall glass of iced Milonga Mate Latte on a table in morning light, a hand stirring it with a straw, the vanilla Mate Latte pouch behind it and a branch of white blossom above. Try it iced.',
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
      cta: { label: 'Try it iced', href: '#shop', arrow: true },
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

    // ── 2 · THE PROCESS ───────────────────────────────────────────────────
    h(M.Section, { bg: 'forest', pad: 'lg', align: 'center' },

      h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
        fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#E3BC62', marginBottom: 14 } }, 'Ready in 30 seconds'),

      h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
        fontSize: 44, letterSpacing: '0.01em', textTransform: 'uppercase',
        lineHeight: 1.0, color: '#F0EFDF' } }, 'Scoop, whisk,'),
      h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
        fontSize: 44, letterSpacing: '0.01em', textTransform: 'uppercase',
        lineHeight: 1.0, color: '#E3BC62' } }, 'enjoy.'),

      h('div', { style: { height: 26 } }),
      h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
        fontSize: 17, lineHeight: 1.5, color: '#FFFFFF', maxWidth: 420, margin: '0 auto' } },
        'Three steps between the pouch and the cup. That is the whole recipe.'),
    ),

    // The scoop shot sits between the headline and the steps because it IS
    // step one — a picture of the instruction rather than an illustration
    // beside it. Full bleed, so it reads as part of the section and not as a
    // card dropped into it.
    h('div', { style: { background: '#004D27', lineHeight: 0 } },
      h('img', {
        src: '../public/product/pouch-hand-pour-big.png',
        alt: 'A measuring scoop of Milonga Mate Latte powder being poured into a ribbed glass, beside the vanilla Mate Latte pouch.',
        style: { width: '100%', height: 'auto', display: 'block', border: 0 },
      }),
    ),

    h(M.Section, { bg: 'forest', pad: 'md', align: 'center' },

      // Numerals rather than icon discs. The numbers ARE the content here —
      // an ordered process is the one place where a step's position matters
      // as much as its name, and a row of discs flattens that into a menu.
      //
      // Set LEFT inside a centred section. Steps are read in order and each
      // one starts at its numeral; centring them ragged both edges of every
      // row and the sequence stopped looking like a sequence.
      h('div', { style: { textAlign: 'left' } },
      h(M.Steps, {
        bg: 'forest',
        variant: 'numerals',
        items: [
          { title: 'Scoop', text: 'One scoop of Mate Latte into your cup.' },
          { title: 'Whisk', text: 'Add your milk or water and froth it smooth.' },
          { title: 'Enjoy', text: 'Hot in a mug, or poured straight over ice.' },
        ],
      }),
      ),

      h('div', { style: { height: 10 } }),
      h(M.Divider, { bg: 'forest' }),
      h('div', { style: { height: 26 } }),

      // The two serves, as the brand's own marks rather than as another line
      // of copy. It is the one fact in this email that is a choice rather
      // than an instruction, so it gets its own shape.
      h(M.IconRow, { marks: ['hot', 'iced'], bg: 'forest', size: 56, labels: true }),

      h('div', { style: { height: 34 } }),
      h(M.Button, { label: 'Shop the Mate Latte', href: '#shop', bg: 'forest' }),
    ),
  );
}
