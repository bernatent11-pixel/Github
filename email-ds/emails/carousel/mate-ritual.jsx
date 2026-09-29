// WHY MATE IS MEANT TO BE SHARED — feed carousel.
//
// ONE TREATMENT, FIVE SLIDES. Every slide is now a photograph with the title
// at the head of the frame and its paragraph directly under it, cream over
// gold, body at 20 throughout. The only things that move are the alignment —
// the hook sits right, the close sits centre, the middle three sit left — and
// how hard each picture has to be held down for the type to read.
//
// THE SCRIM IS PER PICTURE, MEASURED. These five shots have nothing in common
// at the top of the frame: open sky on two of them, weathered grey planks on
// another, a garden in shade on a fourth. The type band is sampled on each and
// the gradient set so it lands under about 95 — enough for cream, and weighted
// to the top so the half of the picture that carries the subject is untouched.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const IMG = {
  passed: '../public/product/mate-passed.jpg',
  park: '../public/product/mate-park.jpg',
  circle: '../public/product/mate-circle.jpg',
  porch: '../public/product/mate-porch.jpg',
  table: '../public/product/mate-table.jpg',
};

const WHITE = '#FFFFFF';
const GOLD = '#E3BC62';
// One size for every paragraph in the set. Small on purpose: these slides are
// photographs first, and 16 is the size at which a block of copy still reads
// at arm's length without taking a third of the picture to do it.
const BODY = 16;

function CarouselMateRitual() {
  return h('div', null,

    // 1 · THE HOOK. Top left, and left-aligned, which also puts it in step
    // with slides 2, 3 and 4. The frame still reads: the gourd handoff sits
    // low and centre, so the head of the picture is free either side.
    S({ src: IMG.passed, focus: 'center 28%', scrim: 0.62, scrimAt: 'top',
        align: 'top', padX: 46, padY: 54 },
      h('div', { style: { maxWidth: 360 } },
        h(M.SlideEyebrow, { text: 'The mate circle' }),
        h(M.SlideTitle, { line1: 'Why mate is', line2: 'meant to\nbe shared.',
          size: 30, size2: 54, lead: 0.95,
          color: WHITE, color2: GOLD, onPhoto: true }),
      ),
    ),

    // 2 · THE INVITATION. A park bench in Buenos Aires — the gourd, the
    // thermos and the pouch, which is the whole ritual in one frame. The
    // subject sits low and the sky fills the top, so the type takes the sky.
    S({ src: IMG.park, focus: 'center 34%', scrim: 0.66, scrimAt: 'top',
        align: 'top', padX: 46, padY: 54 },
      h(M.SlideTitle, { line1: 'Mate gives us', line2: 'a reason to\nslow down.',
        size: 30, size2: 48, lead: 0.96, color: WHITE, color2: GOLD, onPhoto: true }),
      // The opening lines run as one paragraph rather than one per line. Five
      // stacked fragments read as a list and, at 750 units tall, a list is
      // what pushes the copy down over the gourd — set as prose it is three
      // lines instead of six and the photograph is clear below it.
      h(M.SlideBody, { text: 'Mate is an invitation to pause from everything else. To put the phone down. To slow down. To stay a little longer. To be fully present with the people around you.\n\nMate isn’t about rushing through a drink. It’s about making space for the moment.',
        size: BODY, measure: 440, onPhoto: true, top: 22 }),
    ),

    // 3 · THE CIRCLE. Title moved to the head of the frame, where the garden
    // behind the group is in shade and takes type far better than the sunlit
    // backs at the foot ever did. The crop is anchored to the very top, which
    // spends all 150 units of a 2:3 source's overflow at the foot and drops
    // the group clear of the paragraph instead of pushing it up into it.
    S({ src: IMG.circle, focus: 'center top', scrim: 0.58, scrimAt: 'top',
        align: 'top', padX: 46, padY: 54 },
      h(M.SlideTitle, { line1: 'One mate.', line2: 'One circle.',
        size: 48, lead: 0.98, color: WHITE, color2: GOLD, onPhoto: true }),
      h(M.SlideBody, { text: 'Everyone shares the mate, one sip at a time. As it makes its way around the circle, people slow down, stay present, and share the moment together.',
        size: BODY, measure: 440, onPhoto: true, top: 22 }),
    ),

    // 4 · THE POINT. Two people on a porch, one of them laughing — the
    // argument of this slide is the photograph. The planks behind them are a
    // pale weathered grey, so this frame needs the heaviest hand of the five.
    S({ src: IMG.porch, focus: 'center top', scrim: 0.7, scrimAt: 'top',
        align: 'top', padX: 46, padY: 54 },
      h(M.SlideTitle, { line1: 'The point was', line2: 'never the energy.',
        size: 34, size2: 44, lead: 0.98, color: WHITE, color2: GOLD, onPhoto: true }),
      // Same move as slide 2, and it matters more here: six stacked lines put
      // the copy straight across the laughing face this slide exists for.
      h(M.SlideBody, { text: 'Mate gives people a reason to stay. To talk. To listen. To laugh. To disagree. To share stories.\n\nDifferent people, different perspectives, one shared ritual.\n\nBecause the real energy isn’t what’s in the cup. It’s what happens around it.',
        size: BODY, measure: 440, onPhoto: true, top: 22 }),
    ),

    // 5 · THE CLOSE. No button — the block sits on the slide's own middle,
    // centred both ways, and the scrim moves with it: weighted to the middle
    // rather than the top, so the type has its ground and the table keeps its
    // corners.
    S({ src: IMG.table, focus: 'center bottom', scrim: 0.6, scrimAt: 'middle',
        align: 'center', padX: 50, padY: 52 },
      h(M.SlideTitle, { line1: 'Bringing the ritual', line2: 'to the world.',
        size: 33, size2: 40, lead: 1.0, align: 'center',
        color: WHITE, color2: GOLD, onPhoto: true }),
      h(M.SlideBody, { text: 'Our mission is to share the ritual of mate with the world in new and innovative ways.',
        size: BODY, align: 'center', measure: 400, onPhoto: true, top: 22 }),
    ),
  );
}
