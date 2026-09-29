// WHY WE TURNED MATE INTO A LATTE — feed carousel.
//
// No wordmark and no slide counters: the handle already sits above the post,
// and the dot row already tells a reader where they are.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const IMG = {
  man: '../public/product/mate-pouch-man.jpg',
  counter: '../public/product/latte-counter.jpg',
  gourd: '../public/product/mate-gourd.png',
  cup: '../public/product/latte-cup-top.png',
  splash: '../public/product/ingredient-splash.jpg',
  jar: '../public/product/jar-in-hand.png',
};

function CarouselMateLatteWhy() {
  return h('div', null,

    // 1 · THE HOOK. The stack sits against him rather than in the corner: his
    // hand comes in at 43% of the width and his sleeve at about 33%, so a
    // 310px column starting at 40 runs right up to that edge and the longest
    // gold lines graze the sleeve — which is flat teal there and holds cream.
    //
    // The payoff nearly doubles the setup, 58 against 32, so "NEW MORNING
    // RITUAL" is the thing read first and "we turned mate into your" reads as
    // the run-up to it.
    S({ src: IMG.man, focus: 'center 46%', scrim: 0.32, scrimAt: 'bottom',
        align: 'bottom', padX: 40, padY: 54 },
      h('div', { style: { maxWidth: 310 } },
        h(M.SlideTitle, { line1: 'We turned\nmate into your', line2: 'new\nmorning\nritual.',
          size: 32, size2: 58, lead: 0.95, color: '#FFFFFF', onPhoto: true }),
      ),
    ),

    // 2 · THE ANSWER. The jar is placed to run OFF the right edge, so the arm
    // reads as reaching into the frame rather than as a cutout floating in it.
    // That only works because it bleeds: a cutout with air on all four sides
    // is a sticker, and the same picture crossing the edge is a gesture.
    S({ bg: 'beige', textured: true, align: 'top', padX: 52, padY: 66 },
      h(M.SlideTitle, { line1: 'So why turn it', line2: 'into a latte?',
        size: 54, lead: 0.94, color: '#004D27', color2: '#004D27' }),
      h(M.SlideBody, { text: 'We wanted to make mate simple, creamy, comforting and easy to enjoy, just like your favorite morning latte.',
        size: 21, color: '#000000', measure: 450, top: 22 }),
      h('img', { src: IMG.jar, alt: 'A hand holding a jar of iced Milonga Mate Latte',
        style: { position: 'absolute', right: -58, bottom: 40, width: 442,
                 height: 'auto', display: 'block' } }),
    ),

    // 3 · WHAT IS IN IT. Title above, diagram below — the second line is the
    // one that matters, so it runs at nearly twice the first.
    S({ bg: 'beige', textured: true, align: 'top', padX: 44, padY: 56 },
      h(M.SlideTitle, { line1: 'Inside the', line2: 'Mate Latte',
        size: 34, size2: 62, lead: 0.98, align: 'center',
        color: '#004D27', color2: '#004D27' }),
      h('div', { style: { marginTop: 46 } },
        h(M.T11Equation, {
          bg: 'beige',
          terms: [
            { src: '../public/product/ing-yerba-mate.png', label: 'Yerba mate', note: 'Natural energy + antioxidants' },
            { src: '../public/product/ing-lions-mane.png', label: 'Functional ingredients', note: 'Lion’s Mane + L-Theanine' },
            { src: '../public/product/ing-vanilla.png', label: 'Creamy vanilla', note: 'Smooth, creamy & genuinely enjoyable' },
          ],
          result: { src: '../public/product/pouch-floating.png', label: 'Mate Latte', note: 'Ready in 30 seconds.' },
          circle: 86, labelSize: 18, pad: 0, padX: 0, textured: false,
          discShadow: '0 8px 20px rgba(0,77,39,0.16), 0 2px 5px rgba(0,77,39,0.10)',
        }),
      ),
    ),

    // 4 · HOT OR ICED. Title upper left, a label pinned to each cup exactly as
    // the email has them, and the line that ties them together centred at the
    // foot where a reader finishes.
    S({ src: IMG.counter, scrim: 0.46, scrimAt: 'bottom', align: 'top', padX: 44, padY: 48,
        labels: [
          { text: 'Iced', note: 'Creamy & refreshing', top: '40%', left: '4%', width: 170, size: 34 },
          { text: 'Hot', note: 'Smooth & cozy', top: '69%', left: '4%', width: 175, size: 34 },
        ] },
      h(M.SlideTitle, { line1: 'Your morning,', line2: 'reimagined.',
        size: 46, lead: 0.96, color: '#FFFFFF', onPhoto: true }),
      h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 22, padding: '0 44px' } },
        h(M.SlideBody, { text: 'Same mate.\nA whole new way to enjoy it.',
          size: 29, align: 'center', measure: 470, onPhoto: true, top: 0 }),
      ),
    ),

    // 5 · THE ASK. The ingredient still life carries the argument, so the only
    // type it needs is the promise and the facts. The spec line is set in the
    // same gold caps the photograph already labels itself with.
    S({ src: IMG.splash, align: 'top', padX: 48, padY: 52 },
      h(M.SlideTitle, { line1: 'Everything you love', line2: 'about mate, and more.',
        size: 32, lead: 1.0, align: 'center', color: '#FFFFFF', color2: '#E3BC62', onPhoto: true }),
      h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 30, padding: '0 40px', textAlign: 'center' } },
        h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900,
          fontSize: 19, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#E3BC62',
          lineHeight: 1.4, textShadow: '0 1px 6px rgba(0,26,13,0.6)' } },
          '15 servings · 90 cal · 3g sugar'),
      ),
    ),
  );
}
