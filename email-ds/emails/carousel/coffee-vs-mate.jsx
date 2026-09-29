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
  return h(M.Slide, { bg: 'forest', textured: true, align: 'center', padX: 50 },
    h(M.SlideTitle, { line1: label, size: 54, lead: 1.0, color: CREAM }),
    h('div', { style: { height: 58 } }),
    block('Coffee', coffee, 'rgba(240,239,223,0.42)', 'rgba(240,239,223,0.58)', 36),
    h('div', { style: { height: 40, borderBottom: '1px solid rgba(227,188,98,0.34)', marginBottom: 40 } }),
    block('Mate Latte', mate, GOLD, CREAM, 40),
  );
}

function CarouselCoffeeVsMate() {
  return h('div', null,

    S({ bg: 'beige', textured: true, align: 'center', padX: 52 },
      h(M.SlideTitle, { line1: 'Meet your coffee’s', line2: 'competition.',
        size: 50, lead: 0.94, align: 'center', color: FOREST, color2: FOREST }),
      h(M.SlideBody, { text: 'Same morning cup.\nA completely different afternoon.',
        size: 23, color: '#000000', align: 'center', measure: 460, top: 26 }),
    ),

    Versus('The feeling', 'A spike, then a crash', 'Steady, even energy'),
    Versus('Focus', 'Sharp, then scattered', 'Clear and sustained'),
    Versus('Calm', 'Jittery on an empty stomach', 'L-Theanine balances it'),

    S({ bg: 'forest', textured: true, align: 'center', padX: 54 },
      h(M.SlideTitle, { line1: 'Upgrade your', line2: 'morning cup.',
        size: 50, lead: 0.96, align: 'center', color: CREAM, color2: GOLD }),
      h(M.SlideBody, { text: '100mg natural caffeine\nLion’s Mane + L-Theanine\nReady in 30 seconds',
        size: 21, align: 'center', measure: 420, top: 26 }),
      h(M.SlideCta, { label: 'Shop the Mate Latte', bg: 'forest', align: 'center' }),
    ),
  );
}
