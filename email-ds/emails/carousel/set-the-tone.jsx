// SET THE TONE FOR YOUR DAY — feed carousel.
//
// The email's callout diagram listed five benefits against one photograph.
// Five items is a slide too many to read at a swipe, so the strongest two
// carry their own slides and the rest go in the closing line.
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
const CREAM = '#F0EFDF';
const GOLD = '#E3BC62';

// A benefit, with a product cutout taking the foot of the frame.
//
// The type-only version of these slides put a centred block in the middle of
// an empty field and left the top third and the bottom third doing nothing.
// Anchoring the words at the head and giving the picture everything under
// them fills the frame and gives the pair the same shape as every other slide
// in the account.
//
// THE CUTOUTS ENTER FROM OPPOSITE EDGES, which is the house rhythm: a cutout
// with air on all four sides is a sticker, and alternating which edge it
// crosses is what stops two slides of the same construction reading as one
// slide shown twice.
function Benefit(line1, line2, note, img, alt, pos) {
  return h(M.Slide, { bg: 'beige', textured: true, align: 'top', padX: 50, padY: 58 },
    h(M.SlideTitle, { line1, line2, size: 40, size2: 56, lead: 0.96,
      color: FOREST, color2: FOREST }),
    h(M.SlideBody, { text: note, size: 21, color: '#1A1A1A', measure: 330, top: 24 }),
    h('img', { src: img, alt, style: { position: 'absolute', ...pos, display: 'block' } }),
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

    // 2 · THE INVITATION. It was two paragraphs floating in the middle of a
    // green field with no title at all — the only slide in the account
    // without the house anatomy. Eyebrow, two-line headline, paragraph, and
    // the cup taking the foot.
    S({ bg: 'forest', textured: true, align: 'top', padX: 52, padY: 64 },
      h(M.SlideEyebrow, { text: 'Thirty seconds' }),
      h(M.SlideTitle, { line1: 'Before the day', line2: 'gets busy.',
        size: 34, size2: 54, lead: 0.96, color: CREAM, color2: GOLD }),
      h(M.SlideBody, { text: 'Take a moment to slow down. Clean caffeine, a clear head and a calm start — hot or iced.',
        size: 20, color: '#FFFFFF', measure: 420, top: 24 }),
      h('img', { src: '../public/product/latte-cup-top.png',
        alt: 'A cup of Milonga Mate Latte seen from above',
        style: { position: 'absolute', left: '50%', bottom: -150, width: 520,
                 marginLeft: -260, display: 'block' } }),
    ),

    Benefit('Clean, sustained', 'energy.',
      'For walking into work already on your second gear.',
      '../public/product/jar-golden-vanilla.png',
      'A hand holding a glass jar of iced Milonga Mate Latte',
      { right: -120, bottom: -60, width: 560 }),

    Benefit('Mental clarity', '& focus.',
      'For when your brain clocks in before you do.',
      '../public/product/pouch-hand-float.png',
      'A hand holding out the Milonga Mate Latte pouch',
      { left: -140, bottom: -20, width: 660 }),

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
