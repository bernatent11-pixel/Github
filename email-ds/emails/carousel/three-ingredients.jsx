// EVERYTHING YOUR MORNINGS NEED — feed carousel.
//
// The email gave each ingredient a section; the feed gives each one a slide,
// which is the rare case where the format costs nothing — the content was
// already three parallel units.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

function Ingredient(src, eyebrow, line1, line2, benefits, idx) {
  return h(M.Slide, { bg: 'forest', textured: true, align: 'center', padX: 52, index: idx },
    h('div', { style: { textAlign: 'center' } },
      h('img', { src, alt: '', style: { width: 168, height: 168, objectFit: 'contain', display: 'inline-block' } }),
    ),
    h('div', { style: { height: 22 } }),
    h(M.SlideEyebrow, { text: eyebrow, align: 'center' }),
    h(M.SlideTitle, { line1, line2, size: 40, lead: 1.0, align: 'center',
      color: '#F0EFDF', color2: '#E3BC62' }),
    h(M.SlideBody, { text: benefits.join('\n'), size: 23, align: 'center', measure: 440, top: 26 }),
  );
}

function CarouselThreeIngredients() {
  return h('div', null,

    S({ src: '../public/product/flatlay-ingredients.jpg', logo: true, logoTone: 'white', logoHeight: 58,
        scrim: 0.44, scrimAt: 'bottom', align: 'bottom', padX: 46, padY: 54, index: '1/5' },
      h(M.SlideTitle, { line1: 'Everything your', line2: 'mornings need.',
        size: 50, lead: 0.96, color: '#FFFFFF', onPhoto: true }),
      h(M.SlideBody, { text: 'Three functional ingredients.\nOne 30-second ritual.',
        size: 22, measure: 440, onPhoto: true, top: 18 }),
    ),

    Ingredient('../public/product/ing-yerba-mate.png', '100mg yerba mate',
      'Yerba mate,', 'the foundation.',
      ['Clean sustained energy', 'No jitters, no crash', 'Rich in antioxidants'], '2/5'),

    Ingredient('../public/product/ing-lions-mane.png', '500mg Lion’s Mane',
      'Lion’s Mane,', 'for a clear head.',
      ['Mental clarity', 'Concentration', 'Memory'], '3/5'),

    Ingredient('../public/product/ing-theanine.png', '200mg L-Theanine',
      'L-Theanine,', 'what balances it all.',
      ['Balanced and calm', 'Balances the whole experience'], '4/5'),

    S({ bg: 'beige', textured: true, align: 'center', padX: 54, logo: true, logoHeight: 60, index: '5/5' },
      h(M.SlideTitle, { line1: 'One scoop.', line2: 'Thirty seconds.',
        size: 48, lead: 0.96, align: 'center', color: '#004D27', color2: '#004D27' }),
      h(M.SlideBody, { text: '15 servings · 90 cal · 3g sugar\nDairy-free · Hot or iced',
        size: 21, color: '#000000', align: 'center', measure: 440, top: 24 }),
      h(M.SlideCta, { label: 'Experience it', bg: 'beige', align: 'center' }),
    ),
  );
}
