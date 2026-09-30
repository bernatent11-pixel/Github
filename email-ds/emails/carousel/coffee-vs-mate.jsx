// MEET YOUR COFFEE'S COMPETITION — feed carousel.
//
// The email's comparison table is the piece that needed the most rethinking.
// A six-row table is a reference document; a slide is a glance. So the table
// becomes three slides of one contrast each, which is also how the argument
// actually lands in conversation.
//
// EVERY SLIDE IS A PHOTOGRAPH NOW, and that changes what the comparison can
// be. It was a block of type filling a green field; on a picture it has to be
// a caption — small, at the head of the frame, with the photograph carrying
// the rest. The order is still the argument: coffee first and dimmed, the
// Mate Latte second and brighter, because the last thing read is the thing
// remembered.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const CREAM = '#F0EFDF';
const GOLD = '#E3BC62';
const HALO = '0 0 3px rgba(0,26,13,0.9), 0 1px 4px rgba(0,26,13,0.85), 0 3px 14px rgba(0,26,13,0.7), 0 8px 30px rgba(0,26,13,0.5)';

const IMG = {
  still: '../public/product/vs-stilllife.jpg',
  cafe: '../public/product/vs-cafe-table.jpg',
  laptop: '../public/product/vs-laptop.jpg',
  balcony: '../public/product/vs-balcony.jpg',
  courtyard: '../public/product/vs-courtyard.jpg',
};

// One contrast, as a caption on a photograph.
//
// The block runs at a third of the size it did on the flat slides — label 15,
// answers 25 and 27 against 18, 38 and 44 — because it is no longer the slide.
// It sits directly under the title and stops at about 40% of the frame, so
// the lower two thirds are photograph and nothing else.
function Versus(src, focus, scrim, label, coffee, mate) {
  const block = (who, text, ink, body, size) => h('div', null,
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900, fontSize: 15,
      letterSpacing: '0.2em', textTransform: 'uppercase', color: ink, marginBottom: 9,
      textShadow: HALO } }, who),
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500, fontSize: size,
      lineHeight: 1.22, color: body, maxWidth: 420, textShadow: HALO } }, text),
  );
  return h(M.Slide, { src, focus, scrim, scrimAt: 'top', align: 'top', padX: 46, padY: 52 },
    h(M.SlideTitle, { line1: label, size: 54, lead: 1.0, color: CREAM, halo: 'hold' }),
    h('div', { style: { height: 26 } }),
    block('Coffee', coffee, 'rgba(240,239,223,0.6)', 'rgba(240,239,223,0.72)', 25),
    h('div', { style: { height: 20, borderBottom: '1px solid rgba(227,188,98,0.45)', marginBottom: 20, maxWidth: 420 } }),
    block('Mate Latte', mate, GOLD, CREAM, 27),
  );
}

function CarouselCoffeeVsMate() {
  return h('div', null,

    // 1 · THE HOOK. The wider framing of the studio still life, which needs no
    // rebuilding: measured, the first row that is not flat backdrop is 31.7%
    // down the file, so at a top crop the composition starts 285 design units
    // in and the title and its paragraph have all the room they need.
    S({ src: IMG.still, focus: 'center top', align: 'top', padX: 46, padY: 54 },
      h(M.SlideTitle, { line1: 'Meet your coffee’s', line2: 'competition.',
        size: 34, size2: 54, lead: 0.98, color: CREAM, color2: GOLD, halo: 'hold' }),
      h(M.SlideBody, { text: 'Turn your everyday morning cup into a better start to your day.',
        size: 19, color: '#FFFFFF', measure: 400, top: 22, halo: 'strong' }),
    ),

    Versus(IMG.cafe, 'center top', 0.34, 'Energy',
      'A spike, then a crash', 'Smooth, sustained energy'),
    Versus(IMG.laptop, 'center 22%', 0.34, 'Focus',
      'Awake, then scattered', 'Clear-headed & focused'),
    Versus(IMG.balcony, 'center top', 0.34, 'Calm',
      'Jittery, anxious, unsteady', 'Balanced, calm, and steady'),

    // 5 · THE CLOSE, on the photograph. No bullets and no button: the four
    // slides before this one have already made every point, and the last
    // frame's job is to leave the reader with the feeling rather than a spec
    // sheet.
    //
    // This frame needs the heaviest hand in the set at 0.42. The others put
    // their type on one kind of ground; here the head of the picture is white
    // stucco on the left and tree canopy on the right, so cream has to hold
    // across a 200 and a 60 in the same line, and a halo alone will not do it.
    S({ src: IMG.courtyard, focus: 'center top', scrim: 0.42, scrimAt: 'top',
        align: 'top', padX: 46, padY: 52 },
      h(M.SlideTitle, { line1: 'Everything your', line2: 'mornings need.',
        size: 34, size2: 50, lead: 0.98, color: CREAM, color2: GOLD, halo: 'hold' }),
      // Two blocks rather than one with a blank line between them. A blank
      // line is a whole 27-unit row at this leading, which read as a gap
      // between two ideas; 13 reads as a breath inside one.
      h(M.SlideBody, { text: 'Don’t you think it’s time to make an upgrade? Think about it…',
        size: 19, color: '#FFFFFF', measure: 450, top: 22, halo: 'strong' }),
      h(M.SlideBody, { text: 'Clean sustained energy, clear headed and focused, while staying calm and steady.',
        size: 19, color: '#FFFFFF', measure: 450, top: 13, halo: 'strong' }),
    ),
  );
}
