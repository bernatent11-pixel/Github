// WHY MATE IS MEANT TO BE SHARED — feed carousel.
//
// The email's two long paragraphs become four beats. The closing still life
// uses the CLEAN crop: the file the email shipped has an acai-mint can whose
// label reads "10mg THC | 10mg CBD", and a feed post is more public than an
// email, not less.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const IMG = {
  passed: '../public/product/mate-passed.jpg',
  circle: '../public/product/mate-circle.jpg',
  family: '../public/product/milonga-family-clean.jpg',
};

function CarouselMateRitual() {
  return h('div', null,

    S({ src: IMG.passed, focus: 'center 28%', logo: true, logoTone: 'white', logoHeight: 56,
        scrim: 0.46, scrimAt: 'bottom', align: 'bottom', padX: 46, padY: 54, index: '1/5' },
      h(M.SlideEyebrow, { text: 'The mate circle' }),
      h(M.SlideTitle, { line1: 'Why mate is meant', line2: 'to be shared.',
        size: 46, lead: 0.98, color: '#FFFFFF', onPhoto: true }),
    ),

    S({ bg: 'forest', textured: true, align: 'center', padX: 54, index: '2/5' },
      h(M.SlideTitle, { line1: 'One gourd.', line2: 'One straw.\nEveryone drinks.',
        size: 46, lead: 0.98, color: '#F0EFDF', color2: '#E3BC62' }),
      h(M.SlideBody, { text: 'Mate is more than a drink. It is a ritual built around sharing, connection and being present — one person prepares it, and passes it around the circle.',
        size: 23, measure: 470, top: 28 }),
    ),

    S({ src: IMG.circle, focus: 'center 48%', scrim: 0.34, scrimAt: 'bottom',
        align: 'bottom', padX: 46, padY: 54, index: '3/5' },
      h(M.SlideTitle, { line1: 'More than what’s', line2: 'in the cup.',
        size: 46, lead: 0.98, color: '#FFFFFF', onPhoto: true }),
      h(M.SlideBody, { text: 'Sharing mate creates a pause from everything else — a reason to stay, talk and be present with one another.',
        size: 20, measure: 440, onPhoto: true, top: 20 }),
    ),

    S({ bg: 'beige', textured: true, align: 'center', padX: 54, index: '4/5' },
      h(M.SlideTitle, { line1: 'It’s not just', line2: 'about the energy.',
        size: 54, lead: 0.94, color: '#004D27', color2: '#004D27' }),
      h(M.SlideBody, { text: 'It’s about slowing down, sharing stories, and enjoying the people around you.',
        size: 26, color: '#000000', measure: 460, top: 26 }),
    ),

    S({ src: IMG.family, scrim: 0.24, scrimAt: 'middle', align: 'center', padX: 52,
        logo: true, logoTone: 'white', logoHeight: 58, index: '5/5' },
      h(M.SlideTitle, { line1: 'Bringing the ritual', line2: 'to the world.',
        size: 36, lead: 0.98, align: 'center', color: '#FFFFFF', color2: '#E3BC62', onPhoto: true }),
      h(M.SlideBody, { text: 'Our mission is to share the ritual of mate with the world.',
        size: 20, align: 'center', measure: 400, onPhoto: true, top: 22 }),
      h(M.SlideCta, { label: 'Explore Milonga', align: 'center', onPhoto: true }),
    ),
  );
}
