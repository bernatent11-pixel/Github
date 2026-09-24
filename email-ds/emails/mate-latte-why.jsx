// WHY WE TURNED MATE INTO A LATTE
//
// Subject: Why We Turned Mate Into a Latte 🧉☕
// Preview: All the energy of mate, now in a creamy, comforting morning ritual...
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  // The supplied photograph with its out-of-focus backdrop grown left and up.
  // The original put the subject's closest approach at 35% of the width, which
  // left about 180px for a headline at email size — a ribbon, not a title.
  why: '../public/product/mate-latte-why.jpg',
};

function MateLatteWhy() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · WHY ───────────────────────────────────────────────────────────
    // Wordmark centred on the frame, copy in the column beside him.
    //
    // DARK INK, measured not guessed: that column reads at luminance 152 and
    // the logo band at 184 — both light. Cream type and a beige wordmark would
    // have dissolved into the sky. So the type is forest, the wordmark is the
    // green lockup, and the scrim lifts in cream instead of darkening, which
    // is the only treatment where dark type and a bright photograph both live.
    h(M.T9Story, {
      src: IMG.why,
      alt: 'Why we turned mate into a latte. A man outdoors holds a mate gourd and metal straw up to his face, framed by out-of-focus green trees. Mate is South America’s everyday ritual, and Milonga carries it into a creamy vanilla latte.',
      logo: true,
      logoHeight: 78,
      align: 'left',
      ink: 'dark',
      line1: 'Why we turned',
      line2: 'mate into a latte',
      paras: [
        'Mate is South America’s everyday ritual: yerba mate steeped in a shared gourd, passed around a circle, and valued as much for the conversation as for the drink. We started Milonga to carry that ritual somewhere new — the same natural energy, in a creamy vanilla latte that takes thirty seconds.',
      ],
      ratio: 1.243,
      size: 32,
      top: 34,
      // The column stops at 330px of 600. He reaches in to 59% of this frame,
      // so this clears him by about 20px at his closest.
      padLeft: 34,
      padRight: 250,
      measure: 316,
      // Weighted through the middle, because that is where the copy is and
      // where the backdrop turns greener and starts fighting it.
      scrimAt: 'middle',
      scrim: 0.52,
    })
  );
}
