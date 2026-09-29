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
  gourd: '../public/product/mate-gourd.png',
};

function CarouselMateRitual() {
  return h('div', null,

    // 1 · THE HOOK. Sunlit grass runs 130-plus luminance, which cream type
    // cannot hold on its own, so the foot of the frame carries a real scrim
    // rather than the token one it had. The stack is also a column now: at 46
    // across the full width "WHY MATE IS MEANT" broke after "IS" and left
    // "MEANT" stranded on a line of its own.
    S({ src: IMG.passed, focus: 'center 28%', scrim: 0.66, scrimAt: 'bottom',
        align: 'bottom', padX: 46, padY: 52 },
      h('div', { style: { maxWidth: 360 } },
        h(M.SlideEyebrow, { text: 'The mate circle' }),
        h(M.SlideTitle, { line1: 'Why mate is', line2: 'meant to\nbe shared.',
          size: 30, size2: 54, lead: 0.95, color: '#FFFFFF', onPhoto: true }),
      ),
    ),

    // 2 · WHAT IT IS. The type moves to the top and the gourd comes in off the
    // bottom-right corner. It bleeds on purpose: a cutout with air on all four
    // sides is a sticker, and the same object crossing the edge is a picture.
    S({ bg: 'forest', textured: true, align: 'top', padX: 54, padY: 74 },
      h(M.SlideTitle, { line1: 'One gourd.', line2: 'One straw.\nEveryone drinks.',
        size: 46, lead: 0.98, color: '#F0EFDF', color2: '#E3BC62' }),
      h(M.SlideBody, { text: 'Mate is more than a drink. It is a ritual built around sharing, connection and being present — one person prepares it, and passes it around the circle.',
        size: 22, measure: 450, top: 26 }),
      h('img', { src: IMG.gourd, alt: 'A mate gourd with a bombilla',
        style: { position: 'absolute', right: -104, bottom: -86, width: 470,
                 height: 'auto', display: 'block' } }),
    ),

    // 3 · WHY IT MATTERS. Same correction as slide 1: the sunlit backs at the
    // foot of this shot measured 67 with the type itself included, so the
    // ground under the body copy was brighter than that.
    S({ src: IMG.circle, focus: 'center 48%', scrim: 0.58, scrimAt: 'bottom',
        align: 'bottom', padX: 46, padY: 52 },
      h(M.SlideTitle, { line1: 'More than what’s', line2: 'in the cup.',
        size: 44, lead: 0.98, color: '#FFFFFF', onPhoto: true }),
      h(M.SlideBody, { text: 'Sharing mate creates a pause from everything else — a reason to stay, talk and be present with one another.',
        size: 20, measure: 440, onPhoto: true, top: 20 }),
    ),

    // 4 · THE TURN. The one slide in the set that is deliberately quiet — a
    // reader has just come off two crowded photographs and the argument here
    // is about slowing down. A short rule holds the block so the air around
    // it reads as framing rather than as a gap.
    S({ bg: 'beige', textured: true, align: 'center', padX: 54 },
      h('div', { style: { borderTop: '3px solid #004D27', width: 76, marginBottom: 34 } }),
      h(M.SlideTitle, { line1: 'It’s not just', line2: 'about the energy.',
        size: 56, lead: 0.94, color: '#004D27', color2: '#004D27' }),
      h(M.SlideBody, { text: 'It’s about slowing down, sharing stories, and enjoying the people around you.',
        size: 27, color: '#000000', measure: 470, top: 28 }),
    ),

    // 5 · THE ASK. Title steps down to 33 — at 36 "BRINGING THE RITUAL" ran to
    // the frame edge and collided with the pouch.
    S({ src: IMG.family, scrim: 0.24, scrimAt: 'middle', align: 'center', padX: 52 },
      h(M.SlideTitle, { line1: 'Bringing the ritual', line2: 'to the world.',
        size: 33, size2: 40, lead: 1.0, align: 'center',
        color: '#FFFFFF', color2: '#E3BC62', onPhoto: true }),
      h(M.SlideBody, { text: 'Our mission is to share the ritual of mate with the world.',
        size: 20, align: 'center', measure: 400, onPhoto: true, top: 22 }),
      h(M.SlideCta, { label: 'Explore Milonga', align: 'center', onPhoto: true }),
    ),
  );
}
