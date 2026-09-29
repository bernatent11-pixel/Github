// SET THE TONE FOR YOUR DAY — feed carousel.
//
// The email's callout diagram listed five benefits against one photograph.
// Five items is a slide too many to read at a swipe, so the strongest three
// carry their own slides and the rest go in the closing spec line.
//
// BOTH PHOTOGRAPHS IN THIS SET ARE LIGHT. Measured at the foot of the frame
// they run 135 and 141 — brighter than the type sitting on them — and the fix
// the first pass reached for was a heavier scrim, which turns a warm morning
// shot into a grey one. The contrast map says the opposite: on a light ground
// the ink goes dark. So both of these carry forest green type on the
// photograph as shot, with no wash at all.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const FOREST = '#004D27';

function Benefit(line1, line2, note) {
  return h(M.Slide, { bg: 'beige', textured: true, align: 'center', padX: 54 },
    h(M.SlideTitle, { line1, line2, size: 56, lead: 0.94, align: 'center',
      color: FOREST, color2: FOREST }),
    h(M.SlideBody, { text: note, size: 25, color: '#000000', align: 'center', measure: 460, top: 30 }),
  );
}

function CarouselSetTheTone() {
  return h('div', null,

    // 1 · THE HOOK. The crop drops to the foot of the picture, which spends
    // the 150 design units of overflow a 2:3 source has inside a 4:5 frame on
    // the counter rather than on the window. That buys a clean marble band
    // for the type, and marble at 150 carries forest green far better than it
    // carried cream.
    S({ src: '../public/product/kitchen-morning.jpg', focus: 'center bottom',
        align: 'bottom', padX: 46, padY: 50 },
      h(M.SlideEyebrow, { text: 'Energy that thinks', color: FOREST }),
      h(M.SlideTitle, { line1: 'Set the tone', line2: 'for your day.',
        size: 52, lead: 0.96, color: FOREST, color2: FOREST }),
    ),

    S({ bg: 'forest', textured: true, align: 'center', padX: 54 },
      h(M.SlideBody, { text: 'Before the day gets busy,\ntake a moment to slow down.',
        size: 31, align: 'center', measure: 460, top: 0, color: '#E3BC62' }),
      h(M.SlideBody, { text: 'Clean caffeine, a clear head and a calm start — in thirty seconds, hot or iced.',
        size: 22, align: 'center', measure: 430, top: 28 }),
    ),

    Benefit('Clean, sustained', 'energy.', 'For walking into work already on your second gear.'),
    Benefit('Mental clarity', '& focus.', 'For when your brain clocks in before you do.'),

    // 5 · THE ASK. Crop to the top instead, because here the empty ground is
    // the wall ABOVE the jar. Everything moves down 75 units and the type
    // takes the clear band that opens up, in forest on warm beige, with the
    // button filled rather than outlined so the slide still ends on a shape.
    S({ src: '../public/product/iced-in-hand.jpg', focus: 'center top',
        align: 'top', padX: 46, padY: 48 },
      // Two lines, not three: at three the button landed on the rim of the
      // jar. 37 is the size at which the longer line still fits the 508 units
      // between the margins.
      h(M.SlideTitle, { line1: 'For everything your', line2: 'day throws at you.',
        size: 37, lead: 1.0, color: FOREST, color2: FOREST }),
      h(M.SlideBody, { text: 'Work, errands, workouts, and whatever comes next.',
        size: 20, color: '#1A1A1A', measure: 420, top: 18 }),
      h(M.SlideCta, { label: 'Shop the Mate Latte', bg: 'beige', align: 'left' }),
    ),
  );
}
