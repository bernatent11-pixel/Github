// MATE RITUAL — three sections on why mate is shared.
//
// The arc: two full-bleed photographs of the ritual itself, then a flat forest
// close that brings it to Milonga. Both photographs were chosen for the same
// reason — a large quiet top (sky, then canopy) with every person and the
// product in the lower half — which is what lets long copy sit on them without
// covering the picture.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  passed: '../public/product/mate-passed.jpg',
  circle: '../public/product/mate-circle.jpg',
};

function MateRitual() {
  return h(M.EmailShell, { bg: 'forest' },

    // ── 1 · THE RITUAL ────────────────────────────────────────────────────
    // Ratio 1.72 against art that is natively 1.50: the frame is made taller
    // than the picture so the hands and the gourd fall BELOW where the copy
    // ends, rather than the copy being cut down to clear them.
    h(M.T9Story, {
      src: IMG.passed,
      alt: 'One hand passing a mate gourd to another across a picnic table, with a Milonga yerba mate pouch and a thermos below',
      logo: true,
      logoHeight: 70,
      eyebrow: 'The mate circle',
      line1: 'Why mate is meant',
      line2: 'to be shared 🧉',
      paras: [
        'For generations, friends and families have gathered around a single mate. One person prepares it — the cebador — and passes it around the circle, one person at a time. You take a sip, pass it on, and keep the conversation going.',
        'There’s no rush. The mate gives everyone a reason to stay, talk, laugh, and be present with one another. That simple ritual has made mate an everyday symbol of friendship, family, and connection across Argentina.',
      ],
      ratio: 1.72,
      focus: 'center 50%',
      size: 37,
      top: 28,
      measure: 460,
    }),

    // ── 2 · WHAT IT'S REALLY FOR ──────────────────────────────────────────
    // The canopy above the group is the quiet band here, and it is shallower
    // than the sky in section 1 — so this frame is taller again and the type
    // is tighter, to finish before the first face.
    h(M.T9Story, {
      src: IMG.circle,
      alt: 'Eight friends sitting in a circle on the grass at golden hour, passing a mate between them, with a Milonga yerba mate pouch in the foreground',
      eyebrow: 'More than a drink',
      line1: 'More than what’s',
      line2: 'in the cup',
      paras: [
        'Mate brings people into the same moment.',
        'Whether it’s friends catching up, family spending an afternoon together, or a conversation that lasts longer than expected, sharing mate creates a pause from everything else.',
        'It’s not just about the natural energy of yerba mate. It’s about slowing down, sharing stories, and enjoying the people around you.',
      ],
      cta: { label: 'Discover the Mate Ritual', href: '#', arrow: true },
      at: '87%',
      ratio: 1.82,
      focus: 'center 52%',
      size: 37,
      top: 34,
      measure: 460,
    }),

    // ── 3 · THE CLOSE ─────────────────────────────────────────────────────
    // No photograph. After two full-bleed pictures the flat forest field is
    // the punctuation — it is where the email stops being a story and becomes
    // an offer.
    h(M.T10Close, {
      bg: 'forest',
      eyebrow: 'Old tradition, new form',
      line1: 'Bringing the',
      line2: 'ritual forward',
      lead: 'Milonga takes the spirit of mate and reimagines it for today.',
      paras: [
        'We keep what makes mate special — its natural energy, connection, and culture — and bring it into innovative products made for modern moments. From sparkling yerba mate to our Mate Latte, Milonga is a new way to experience an old tradition.',
      ],
      cta: { label: 'Explore Milonga', href: '#', arrow: true },
      size: 38,
      pad: 62,
    })
  );
}
