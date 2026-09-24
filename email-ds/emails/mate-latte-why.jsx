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
    // Poster type and nothing else, on the reference's terms.
    //
    // WHAT THE REFERENCE IS ACTUALLY DOING — four things, all structural:
    //   · one or two words per line, so each line is a beat and the block is a
    //     column of words rather than a wrapped sentence;
    //   · leading near 0.9, so the lines almost touch and read as one mass;
    //   · a two-tone split that puts the accent on the payoff, not the setup;
    //   · no body copy at all. The type IS the section.
    //
    // WHERE IT SITS. The stack starts level with the top of the pack and runs
    // past his shoulder. That is not a free choice: 8 lines at 45px with 0.9
    // leading is 324px, which is 36% of this frame, so the block's height is
    // fixed by its width and only its position is left to set. Starting at 31%
    // — the top of the pack — is what lands the last line below the shoulder.
    //
    // WHY 45px. He reaches in to about 40% of the width through this band,
    // leaving a 238px column. "MORNING" is the longest word and measures 230px
    // at 45px, so this is the size the photograph allows. The two longest lines
    // graze his sweater by a few pixels, which is what the reference does too.
    h(M.T9Story, {
      src: IMG.why,
      alt: 'We turned mate into your new morning ritual. A man outdoors holds up a Milonga Yerba Mate Latte pouch in front of his face, framed by out-of-focus green trees. Try it now.',
      logo: true,
      logoTone: 'white',
      logoHeight: 78,
      // The wordmark belongs at the top of the frame; the stack is placed
      // against the photograph, so the two are positioned separately.
      logoTop: 30,
      align: 'left',
      // Five lines cream, three gold — the accent carries "new morning ritual".
      line1: 'We turned mate into your',
      line2: 'new morning ritual.',
      cta: { label: 'Try it now', href: '#shop', arrow: true },
      ctaInline: true,
      ratio: 1.501,
      size: 45,
      titleLead: 0.9,
      top: '31%',
      padLeft: 26,
      padRight: 336,
      measure: 238,
    })
  );
}
