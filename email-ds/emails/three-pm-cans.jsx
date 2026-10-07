// YOUR 3PM WITHOUT THE CRASH — the canned Lion's Mane yerba mate.
//
// Subject: Your 3PM Without The Crash ☀️🧊
// Preview: Brewed yerba mate and Lion's Mane, cold and ready by 2:59.
//
// FIRST LAYOUT, BUILT AHEAD OF THE FACTS. The product file covers the Mate
// Latte bag only, so every number this email needs for the cans — caffeine,
// Lion's Mane dose, calories, sugar, can size, price, pack, flavours — is a
// visible "___" rather than a plausible figure. Fill them from the can's own
// label before this goes anywhere near a send.
//
// THE ONLY CAN ART IN THE REPO is the Peach Ginger can inside the product
// family composite, so both photographs here are crops of that one file.
// They hold the layout; real can photography replaces them.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const BEIGE = '#F0EFDF';
const FONT = 'Gotham, Montserrat, sans-serif';

// A blank waiting for a real figure. Kept as a constant so a search for it
// finds every hole in the email at once.
const TBD = '___';

const SECTION_1_ALT =
  'Milonga. Functional herbal energy. Your 3PM, without the crash. Skip the ' +
  'second coffee: brewed yerba mate and Lion’s Mane, cold in a can and ready the ' +
  'moment you open it. A can of Milonga Yerba Mate in Peach Ginger rests on a ' +
  'mossy stone beside a slice of peach and a knob of ginger, water droplets ' +
  'catching the light against a deep green background. Shop the cans.';

function ThreePmCans() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    // The crop is taken from the foot of the family composite, where the
    // backdrop is empty forest green on the left and the can, the peach and
    // the ginger fill the right. That gives the type a dark, clear column of
    // its own, so the ink is cream and gold and the scrim stays light.
    //
    // Everything reads in one group at the head — wordmark, title, line,
    // button — because the bottom-left of this picture is rock, and a button
    // on a rock is a button nobody finds.
    h(M.T9Story, {
      src: '../public/product/can-peach-ginger-hero.jpg',
      alt: SECTION_1_ALT,
      logo: true,
      logoTone: 'gold',
      logoHeight: 72,
      logoAlign: 'left',
      align: 'left',
      eyebrow: 'Functional herbal energy',
      line1: 'Your 3PM,',
      line2: 'without\nthe crash.',
      line1Color: BEIGE,
      line2Color: GOLD,
      paras: ['Skip the second coffee. Brewed yerba mate and Lion’s Mane, cold in a can and ready the moment you crack it.'],
      cta: { label: 'Shop the cans', href: '#shop', arrow: true },
      ctaInline: true,
      ratio: 1328 / 1100,
      size: 40,
      size2: 42,
      titleLead: 1.0,
      top: 34,
      padLeft: 34,
      padRight: 262,
      measure: 300,
      ink: 'light',
      scrim: 0.25,
      scrimAt: 'top',
      halo: 'soft',
    }),

    // ── 2 · THE SLUMP, AND WHAT CHANGES IT ───────────────────────────────
    // The education act inverts the page: the forest paper grain from the
    // Golden Vanilla email, so the opener's dark green carries straight on
    // into the band and the only colour change in the email is the beige
    // close below. On dark green the title is white and gold means one thing
    // — the comparison column — so it matches the gold button at the foot.
    h('div', { style: {
      backgroundColor: FOREST,
      backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
      backgroundSize: '320px 320px',
      padding: '56px 32px 56px',
      position: 'relative', overflow: 'hidden' } },

      h('div', { style: { textAlign: 'center' } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD,
          marginBottom: 14 } }, 'The afternoon dip'),
        h(M.Headline, { line1: 'Same slump,', line2: 'new answer.', bg: 'forest',
          size: 40, align: 'center', color: '#FFFFFF', line2Color: '#FFFFFF', italic: true }),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
          lineHeight: 1.5, color: '#FFFFFF', maxWidth: 460, margin: '20px auto 0' } },
          'A 3PM coffee hits fast, then leaves you lower than where you started. ' +
          'A Milonga can is brewed from yerba mate, so the natural caffeine comes on ' +
          'smooth and stays steady, with Lion’s Mane alongside for focus.'),
      ),

      // Ring rows with the dose in the title — the copy is doing the work
      // here, so the quiet variant. Doses are blanks until the label is in.
      h('div', { style: { marginTop: 36 } },
        h(M.BenefitList, { bg: 'forest', variant: 'ring', twoTone: false, items: [
          { mark: 'yerba-mate', title: 'Natural caffeine', dose: `${TBD}MG`,
            text: 'Brewed from real yerba mate. Clean, sustained energy, no jitters.' },
          { mark: 'lions-mane', title: 'Lion’s Mane', dose: `${TBD}MG`,
            text: 'The functional mushroom behind focus and mental clarity.' },
        ] }),
      ),

      // The comparison. Our column is gold, theirs a hairline — the stripe
      // makes the point before a word is read. Where coffee's figure can't
      // be sourced it is an em dash, never a number that looks right.
      h('div', { style: { marginTop: 40 } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD,
          textAlign: 'center', marginBottom: 18 } }, 'Your 3PM, two ways'),
        h(M.CompareRows, { bg: 'forest', ourName: 'Milonga can', theirName: '3PM coffee',
          rows: [
            { label: 'Caffeine', ours: `${TBD}mg, brewed from mate`, theirs: '—' },
            { label: 'Lion’s Mane', ours: `${TBD}mg`, theirs: '—' },
            { label: 'Come-down', ours: 'Steady, no crash', theirs: 'The 4PM dip' },
            { label: 'Ready', ours: 'Cold, crack and go', theirs: 'Brew it or queue' },
          ] }),
      ),

      h('div', { style: { marginTop: 36, textAlign: 'center' } },
        h(M.Button, { label: 'Find your flavor', href: '#shop', bg: 'forest' }),
      ),
    ),

    // ── 3 · THE CLOSE ─────────────────────────────────────────────────────
    // Beige, dark green type only. The can on the left as an inset photograph
    // (rounded, because it is a photo with its own backdrop rather than a
    // cutout), the facts on the right, then the offer and one button.
    h('div', { style: { padding: '56px 32px 48px' } },
      h('div', { style: { textAlign: 'center' } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: FOREST,
          marginBottom: 14 } }, 'Stock the fridge'),
        h(M.Headline, { line1: 'Crack one', line2: 'at 2:59.', bg: 'beige',
          size: 40, align: 'center', italic: true }),
      ),

      h('div', { style: { display: 'flex', gap: 24, alignItems: 'center', marginTop: 36 } },
        h('div', { style: { flex: '0 0 220px', width: 220, borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 10px 26px rgba(0,53,27,0.22), 0 2px 6px rgba(0,53,27,0.14)' } },
          h('img', { src: '../public/product/can-peach-ginger-close.jpg',
            alt: 'A can of Milonga Yerba Mate in Peach Ginger beside a slice of peach and fresh ginger.',
            style: { width: '100%', height: 'auto', display: 'block' } }),
        ),
        h('div', { style: { flex: 1 } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 24,
            textTransform: 'uppercase', color: FOREST, lineHeight: 1.05 } }, 'Peach Ginger'),
          h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
            lineHeight: 1.45, color: '#000000', margin: '10px 0 18px' } },
            `More flavors: ${TBD}`),
          h(M.SpecPills, { bg: 'beige', align: 'left', size: 11, items: [
            `${TBD}mg natural caffeine`,
            `${TBD}mg Lion’s Mane`,
            `${TBD} cal`,
            `${TBD}g sugar`,
            `${TBD} fl oz`,
          ] }),
        ),
      ),

      // The offer as a gold cell with dark green type — on cream, gold is a
      // fill and never type. Price and pack are blanks until confirmed.
      h('div', { style: { marginTop: 36, background: GOLD, borderRadius: 18,
        padding: '22px 24px', textAlign: 'center',
        boxShadow: '0 8px 22px rgba(0,53,27,0.16)' } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 20,
          textTransform: 'uppercase', color: FOREST, letterSpacing: '0.04em' } },
          `${TBD}-pack · $${TBD}`),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
          color: FOREST, marginTop: 6 } }, `Offer: ${TBD}`),
      ),

      h('div', { style: { marginTop: 28, textAlign: 'center' } },
        h(M.Button, { label: 'Shop the cans', href: '#shop', bg: 'beige', size: 'lg' }),
      ),
    ),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
