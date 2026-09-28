// SET THE TONE FOR YOUR DAY — feed carousel.
//
// The email's callout diagram listed five benefits against one photograph.
// Five items is a slide too many to read at a swipe, so the strongest three
// carry their own slides and the rest go in the closing spec line.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

function Benefit(line1, line2, note, idx) {
  return h(M.Slide, { bg: 'beige', textured: true, align: 'center', padX: 54, index: idx },
    h(M.SlideTitle, { line1, line2, size: 56, lead: 0.94, align: 'center',
      color: '#004D27', color2: '#004D27' }),
    h(M.SlideBody, { text: note, size: 25, color: '#000000', align: 'center', measure: 460, top: 30 }),
  );
}

function CarouselSetTheTone() {
  return h('div', null,

    S({ src: '../public/product/kitchen-morning.jpg', focus: 'center 38%',
        logo: true, logoTone: 'white', logoHeight: 58,
        scrim: 0.4, scrimAt: 'bottom', align: 'bottom', padX: 46, padY: 54, index: '1/5' },
      h(M.SlideEyebrow, { text: 'Energy that thinks' }),
      h(M.SlideTitle, { line1: 'Set the tone', line2: 'for your day.',
        size: 52, lead: 0.96, color: '#FFFFFF', onPhoto: true }),
    ),

    S({ bg: 'forest', textured: true, align: 'center', padX: 54, index: '2/5' },
      h(M.SlideBody, { text: 'Before the day gets busy,\ntake a moment to slow down.',
        size: 31, align: 'center', measure: 460, top: 0, color: '#E3BC62' }),
      h(M.SlideBody, { text: 'Clean caffeine, a clear head and a calm start — in thirty seconds, hot or iced.',
        size: 22, align: 'center', measure: 430, top: 28 }),
    ),

    Benefit('Clean, sustained', 'energy.', 'For walking into work already on your second gear.', '3/5'),
    Benefit('Mental clarity', '& focus.', 'For when your brain clocks in before you do.', '4/5'),

    S({ src: '../public/product/iced-in-hand.jpg', scrim: 0.56, scrimAt: 'bottom',
        align: 'bottom', padX: 46, padY: 52, index: '5/5' },
      h(M.SlideTitle, { line1: 'For everything', line2: 'your day throws\nat you.',
        size: 40, lead: 0.98, color: '#FFFFFF', onPhoto: true }),
      h(M.SlideBody, { text: 'Work, errands, workouts, and whatever comes next.',
        size: 20, measure: 420, onPhoto: true, top: 18 }),
      h(M.SlideCta, { label: 'Shop the Mate Latte', align: 'left', onPhoto: true }),
    ),
  );
}
