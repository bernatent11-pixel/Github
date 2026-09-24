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
    // past his shoulder, and at 55px with 1.02 leading that block is 449px —
    // half this frame — so it now reaches almost to the foot of the section.
    //
    // IT CROSSES HIM, DELIBERATELY. "MORNING" and "RITUAL." measure 281px
    // against the roughly 215px of clear ground left at that height, so the
    // two longest lines run about 70px onto his sweater. That is the trade for
    // 55px type: the sweater there is flat mid-teal, the cream and gold hold
    // against it, and type crossing a subject is what the reference does. The
    // alternative is 45px, which clears him completely.
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
      size: 55,
      titleLead: 1.02,
      top: '31%',
      padLeft: 26,
      padRight: 289,
      measure: 285,
    })
  );
}
