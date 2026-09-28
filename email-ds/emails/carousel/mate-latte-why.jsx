// WHY WE TURNED MATE INTO A LATTE — feed carousel.
//
// The email runs four sections and about 120 words. A carousel cannot: five
// slides, one idea each, and the paragraph that carried the argument in the
// email is split across two of them.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const IMG = {
  man: '../public/product/mate-pouch-man.jpg',
  counter: '../public/product/latte-counter.jpg',
};

function CarouselMateLatteWhy() {
  return h('div', null,

    // 1 · THE HOOK. The email's opener, reflowed: same photograph, same
    // stacked tagline, but the frame is 4:5 now so the type sits lower and
    // tighter and the wordmark comes down to slide scale.
    S({ src: IMG.man, logo: true, logoTone: 'white', logoHeight: 58,
        scrim: 0.34, scrimAt: 'bottom', align: 'bottom', padX: 46, padY: 54, index: '1/5' },
      h(M.SlideTitle, { line1: 'We turned mate', line2: 'into your new\nmorning ritual.',
        size: 50, lead: 0.98, color: '#FFFFFF', onPhoto: true }),
    ),

    // 2 · THE QUESTION. Flat beige, the headline in the email's own treatment.
    S({ bg: 'beige', textured: true, align: 'center', padX: 52, index: '2/5' },
      h(M.SlideEyebrow, { text: 'Why a latte', color: '#004D27' }),
      h(M.SlideTitle, { line1: 'So why turn it', line2: 'into a latte?',
        size: 54, lead: 0.94, color: '#004D27', color2: '#004D27' }),
      h(M.SlideBody, { text: 'We wanted to make mate simple, creamy, comforting and easy to enjoy — just like your favorite morning latte.',
        size: 25, color: '#000000', measure: 470, top: 26 }),
    ),

    // 3 · THE EQUATION. The diagram is the one thing that translates to the
    // feed unchanged — it was always a visual argument rather than a
    // paragraph. Discs come down from 170 to 92 to fit the fixed height.
    S({ bg: 'beige', textured: true, align: 'center', padX: 46, padY: 44, index: '3/5' },
      h(M.T11Equation, {
        bg: 'beige',
        terms: [
          { src: '../public/product/ing-yerba-mate.png', label: 'Yerba mate', note: 'Natural energy + antioxidants' },
          { src: '../public/product/ing-lions-mane.png', label: 'Functional ingredients', note: 'Lion’s Mane + L-Theanine' },
          { src: '../public/product/ing-vanilla.png', label: 'Creamy vanilla', note: 'Smooth, creamy & genuinely enjoyable' },
        ],
        result: { src: '../public/product/pouch-floating.png', label: 'Mate Latte', note: 'Ready in 30 seconds.' },
        circle: 92, labelSize: 19, pad: 0, padX: 0, textured: false,
        discShadow: '0 8px 20px rgba(0,77,39,0.16), 0 2px 5px rgba(0,77,39,0.10)',
      }),
    ),

    // 4 · HOT OR ICED. The counter still life with both labels, which is the
    // email's section 4 with the copy stripped back to what a swipe can hold.
    S({ src: IMG.counter, scrim: 0.3, scrimAt: 'bottom', align: 'bottom',
        padX: 46, padY: 52, index: '4/5' },
      h(M.SlideTitle, { line1: 'Your morning,', line2: 'reimagined.',
        size: 50, lead: 0.96, color: '#FFFFFF', onPhoto: true }),
      h(M.SlideBody, { text: 'Hot and cozy, or iced and refreshing. Same mate, a whole new way to enjoy it.',
        size: 21, measure: 430, onPhoto: true, top: 20 }),
    ),

    // 5 · THE ASK. A carousel's last slide is the only one a reader reaches
    // deliberately, so it is the one that gets to be an offer.
    S({ bg: 'forest', textured: true, align: 'center', padX: 56, logo: true,
        logoTone: 'gold', logoHeight: 62, index: '5/5' },
      h(M.SlideTitle, { line1: 'Everything you love\nabout mate,', line2: 'and more.',
        size: 42, lead: 1.0, align: 'center', color: '#F0EFDF', color2: '#E3BC62' }),
      h(M.SlideBody, { text: '100mg natural caffeine\nLion’s Mane + L-Theanine\n15 servings · 90 cal · 3g sugar',
        size: 19, align: 'center', measure: 460, top: 26 }),
      h(M.SlideCta, { label: 'Try it now', bg: 'forest', align: 'center' }),
    ),
  );
}
