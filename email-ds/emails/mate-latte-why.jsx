// WHY WE TURNED MATE INTO A LATTE
//
// Subject: Why We Turned Mate Into a Latte 🧉☕
// Preview: All the energy of mate, now in a creamy, comforting morning ritual...
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  // The photograph exactly as supplied. Native 1.5 ratio, so the frame shows
  // all of it — nothing outpainted, nothing cropped.
  why: '../public/product/mate-gourd-man.jpg',
};

function MateLatteWhy() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · WHY ───────────────────────────────────────────────────────────
    // White wordmark centred on top, the headline stacked big down the left,
    // a short paragraph and the button to the About page.
    //
    // THE SCRIM IS DOING ONE SPECIFIC JOB. Measured on the untouched picture,
    // the band behind the wordmark reads luminance 212 — near-white sky — and
    // the band behind the headline 187. White type and a white lockup would
    // have been invisible in both. So the wash is weighted hard to the TOP,
    // which is where the type is and where this photograph has nothing in it;
    // by 64% of the frame it is gone, and he, his hands and the gourd are all
    // below that line, untouched.
    h(M.T9Story, {
      src: IMG.why,
      alt: 'Why we turned mate. A man outdoors holds a mate gourd and metal straw up to his face, framed by out-of-focus green trees. Yerba mate is South America’s everyday ritual, shared from one gourd around a circle — and Milonga carries it into a creamy vanilla latte. Read our story.',
      logo: true,
      logoTone: 'white',
      logoHeight: 86,
      align: 'left',
      line1: 'Why we turned',
      line2: 'mate',
      paras: [
        'Yerba mate is South America’s everyday ritual — one gourd, shared around a circle. We started Milonga to carry it into a creamy vanilla latte.',
      ],
      cta: { label: 'Read our story', href: '#about', arrow: true },
      ctaInline: true,
      // Native ratio: the frame is the picture, uncropped.
      ratio: 1.501,
      size: 45,
      top: 30,
      // He reaches in to 43% of the width at the height the copy ends, so the
      // column stops at 260px of 600. The headline sets three lines deep in
      // that width, which is what makes it read big rather than wide — 48px
      // rather than 52 because "WHY WE" needs 213px at this size and breaking
      // a two-word phrase across two lines gains a step the stack does not need.
      padLeft: 34,
      padRight: 340,
      measure: 226,
    })
  );
}
