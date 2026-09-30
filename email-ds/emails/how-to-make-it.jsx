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
    // THE WASH IS CREAM, NOT A SCRIM. Measured across the band the wordmark
    // occupies, this picture runs a mean of 120 with a minimum of 39: pale
    // wall and bright blossom, crossed by dark twigs. Forest green holds on
    // the wall and disappears on the twigs, which is the whole problem with
    // a mixed ground. Lifting that band toward cream — the same control as a
    // scrim, in the other direction — closes the range from underneath and
    // lets one dark ink hold across all of it, without dimming a morning
    // photograph to save a hundred letters.
    h(M.T9Story, {
      src: '../public/product/latte-iced-table.jpg',
      alt: 'Cold, creamy and ready in 30 seconds. A tall glass of iced Milonga Mate Latte on a table in morning light, a hand stirring it with a straw, the vanilla Mate Latte pouch behind it and a branch of white blossom above. Try it iced.',
      logo: true,
      logoTone: 'green',
      logoHeight: 56,
      logoTop: 28,
      align: 'center',
      line1: 'Cold, creamy &',
      line2: 'ready in 30 seconds.',
      line1Color: '#004D27',
      line2Color: '#004D27',
      paras: ['Make it iced, keep it creamy, and enjoy steady energy without the coffee-shop routine.'],
      cta: { label: 'Try it iced', href: '#shop', arrow: true },
      // Inline rather than pinned near the foot. The house pattern for a
      // full-image opener puts the button low and lets the picture fill the
      // gap — but the lower half of THIS picture is the product, and a
      // button centred there lands on the glass. Keeping the reading in one
      // block hands the whole lower frame to the photograph instead.
      ctaInline: true,
      ctaAlign: 'center',
      ratio: 1.5,
      size: 32,
      size2: 36,
      titleLead: 1.02,
      top: 132,
      padLeft: 26,
      padRight: 26,
      measure: 430,
      ink: 'dark',
      scrim: 0.5,
      scrimAt: 'top',
      halo: 'none',
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
