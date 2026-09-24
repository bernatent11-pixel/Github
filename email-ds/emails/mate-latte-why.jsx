// WHY WE TURNED MATE INTO A LATTE
//
// Subject: Why We Turned Mate Into a Latte 🧉☕
// Preview: All the energy of mate, now in a creamy, comforting morning ritual...
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  // The photograph exactly as supplied. Native 1.5 ratio, so the frame shows
  // all of it — nothing outpainted, nothing cropped.
  why: '../public/product/mate-pouch-man.jpg',
};

function MateLatteWhy() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE TAGLINE ───────────────────────────────────────────────────
    // White wordmark centred on top, the tagline stacked down the left in
    // Gotham Black, a short paragraph, and the button.
    //
    // SIZED TO THE COLUMN, NOT TO TASTE. He reaches in to 41% of the width
    // through the middle of the frame, which leaves a 250px column at email
    // size. In that column "WE TURNED" measures 243px at 35px and 257px at
    // 37px — so 35 is the largest size at which this tagline still sets two
    // words to a line. Going bigger means one word per line and an eight-step
    // stack that reads as a list rather than a sentence.
    //
    // The wash is weighted hard to the top: measured on the untouched file the
    // band behind the wordmark is luminance 212, near-white sky, so a white
    // lockup would vanish there. By 64% of the frame the wash is gone, and his
    // face, his hands and the pack are all below that line.
    h(M.T9Story, {
      src: IMG.why,
      alt: 'We turned mate into your new morning ritual. A man outdoors holds up a Milonga Yerba Mate Latte pouch in front of his face, framed by out-of-focus green trees. Yerba mate is South America’s everyday ritual, shared from one gourd around a circle. Try it now.',
      logo: true,
      logoTone: 'white',
      logoHeight: 82,
      align: 'left',
      // Two lines beige, three gold — the break puts the accent on the payoff
      // rather than on the setup.
      line1: 'We turned mate into',
      line2: 'your new morning ritual.',
      paras: [
        'Yerba mate is South America’s everyday ritual — one gourd, shared around a circle. We started Milonga to carry it into a creamy vanilla latte.',
      ],
      cta: { label: 'Try it now', href: '#shop', arrow: true },
      ctaInline: true,
      // Native ratio: the frame is the picture, uncropped.
      ratio: 1.501,
      size: 35,
      top: 28,
      padLeft: 30,
      padRight: 320,
      measure: 250,
    })
  );
}
