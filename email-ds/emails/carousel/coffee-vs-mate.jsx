// MEET YOUR COFFEE'S COMPETITION — feed carousel.
//
// The email's comparison table is the piece that needed the most rethinking.
// A six-row table is a reference document; a slide is a glance. So the table
// becomes three slides of one contrast each, which is also how the argument
// actually lands in conversation.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const FOREST = '#004D27';
const CREAM = '#F0EFDF';
const GOLD = '#E3BC62';

// One contrast, at the size a comparison has to be read at.
//
// THE SPLIT IS HORIZONTAL, and that is the whole fix. The first pass put two
// columns side by side, which is how a table reads on a wide screen — but a
// slide is 4:5, so each column got 250 units of width, every answer wrapped
// after three words, and the type could not go past 27 without breaking. Half
// the slide sat empty above and below it.
//
// Stacked, each answer gets the full 508 units and runs on one or two lines at
// 40, and the rule between them is the length of the frame. The order is the
// argument: coffee first and dimmed, the Mate Latte second, brighter and a
// size larger, because the last thing read is the thing remembered.
function Versus(label, coffee, mate) {
  const block = (who, text, ink, body, size) => h('div', null,
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900, fontSize: 18,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: ink, marginBottom: 16 } }, who),
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500, fontSize: size,
      lineHeight: 1.2, color: body } }, text),
  );
  // The subject sits at the head of the frame like every other title in the
  // set, and the two answers take everything under it. Centring the whole
  // block instead left the top third and the bottom third empty at once —
  // the stack is only about 360 units tall and the frame is 750.
  return h(M.Slide, { bg: 'forest', textured: true, align: 'top', padX: 50, padY: 62 },
    h(M.SlideTitle, { line1: label, size: 54, lead: 1.0, color: CREAM }),
    h('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
      block('Coffee', coffee, 'rgba(240,239,223,0.42)', 'rgba(240,239,223,0.58)', 38),
      h('div', { style: { height: 52, borderBottom: '1px solid rgba(227,188,98,0.34)', marginBottom: 52 } }),
      block('Mate Latte', mate, GOLD, CREAM, 44),
    ),
  );
}

function CarouselCoffeeVsMate() {
  return h('div', null,

    // 1 · THE HOOK, on the product. This was type alone on an empty beige
    // field, which is the one thing a feed will not stop for. The jar shot
    // has the whole upper half of its frame as plain warm wall, so the type
    // takes that and the jar keeps the foot.
    //
    // Forest green, no scrim. That wall measures around 200 — far too light
    // for cream — and on a light ground the contrast map sends the ink dark
    // rather than sending a wash over the picture.
    //
    // The source is 1200 x 1440 against a 600 x 750 frame, so height binds
    // and only 25 design units of width are lost. There is no crop to tune
    // here; the picture is very nearly all there.
    S({ src: '../public/product/iced-callout-bg.jpg', align: 'top', padX: 44, padY: 50 },
      h(M.SlideTitle, { line1: 'Meet your coffee’s', line2: 'competition.',
        size: 34, size2: 54, lead: 0.98, color: FOREST, color2: FOREST }),
      h(M.SlideBody, { text: 'Same morning cup.\nA completely different afternoon.',
        size: 18, color: '#1A1A1A', measure: 440, top: 20 }),
    ),

    Versus('The feeling', 'A spike, then a crash', 'Steady, even energy'),
    Versus('Focus', 'Sharp, then scattered', 'Clear and sustained'),
    Versus('Calm', 'Jittery on an empty stomach', 'L-Theanine balances it'),

    // 5 · THE ASK. Title, the three facts as a bulleted list under the gold
    // Milonga hand — the same bullet the site and the other closers use — and
    // the scoop shot taking the foot of the frame so the slide ends on the
    // product rather than on a colour.
    S({ bg: 'forest', textured: true, align: 'top', padX: 50, padY: 54 },
      h(M.SlideTitle, { line1: 'Upgrade your', line2: 'morning cup.',
        size: 46, lead: 0.98, color: CREAM, color2: GOLD }),
      h('div', { style: { marginTop: 22 } },
        ['100mg natural caffeine', 'Lion’s Mane + L-Theanine', 'Ready in 30 seconds'].map((t, i) =>
          h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 } },
            h('img', { src: '../public/logo/mark-gold.png', alt: '',
              style: { height: 23, width: 'auto', flex: 'none', display: 'block' } }),
            h('span', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 17, letterSpacing: '0.08em', textTransform: 'uppercase',
              lineHeight: 1.2, color: CREAM } }, t),
          )),
      ),
      h(M.SlideCta, { label: 'Shop the Mate Latte', bg: 'forest', align: 'left' }),
      h('img', { src: '../public/product/pouch-hand-pour-big.png',
        alt: 'A scoop of Milonga Mate Latte powder being poured into a glass beside the pouch',
        // Flush left, bleeding right: the pouch touches the edge of its own
        // file, so a negative offset would slice its front face off.
        style: { position: 'absolute', left: 0, bottom: 0, width: 620,
                 height: 'auto', display: 'block' } }),
    ),
  );
}
