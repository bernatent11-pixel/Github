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
  passed: '../public/product/mate-passed-tall.jpg',
  circle: '../public/product/mate-circle.jpg',
  family: '../public/product/milonga-family-full.jpg',
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
        'Mate is more than a drink. It is a ritual built around sharing, connection, and being present. In Argentina, people gather around one mate, passing it from person to person while stories, laughter, and conversations flow. It is a simple tradition that brings people closer and creates a reason to slow down and enjoy the moment together.',
      ],
      // One paragraph instead of two, so the frame comes down with it — leaving
      // the old 1.72 would open a dead gap between the copy and the hands.
      // The CTA sits at the foot of the section, level with section 2's.
      // The photograph had no room for it — the pouch ran to within a few
      // pixels of the bottom edge — so the art is the version whose picnic
      // table is extended downward into shadow, which is where the pill sits.
      ratio: 1.80,
      focus: 'center 50%',
      size: 37,
      top: 28,
      measure: 500,
      cta: { label: 'Discover why we started', href: '#about', arrow: true },
      at: '88%',
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
      ],
      // The last paragraph rides down with the button instead of stacking
      // under the title — that is what opens the clear window over the circle.
      tailParas: [
        'It’s not just about the natural energy of yerba mate. It’s about slowing down, sharing stories, and enjoying the people around you.',
      ],
      cta: { label: 'Discover the Mate Ritual', href: '#', arrow: true },
      at: '79%',
      ratio: 1.82,
      focus: 'center 52%',
      size: 37,
      top: 34,
      measure: 460,
    }),

    // ── 3 · THE CLOSE ─────────────────────────────────────────────────────
    // The supplied still life, full bleed and uncropped, with the type in its
    // middle — the same treatment as the two photographs above it.
    //
    // The art is a border composition: products in all four corners, clear
    // ground through the centre. Measured, that clear band runs 40%-68% of the
    // height, and this copy needs more than 28% of a frame, so the stack
    // reaches a little into the pouch above and the can below. The scrim is
    // therefore weighted through the MIDDLE rather than the top, which is
    // where the type is and where the picture has least to lose.
    h(M.T9Story, {
      src: IMG.family,
      alt: 'Milonga yerba mate cans, the latte pouch and a mate gourd among leaves and fruit on a deep green ground',
      line1: 'Bringing the ritual',
      line2: 'to the world',
      lead: 'Our mission is to share the ritual of mate with the world.',
      paras: [
        'We\u2019re reimagining this timeless tradition through innovative mate products made for modern life, bringing the natural energy, culture, and spirit of connection behind mate into new ways of enjoying it, wherever you are.',
      ],
      cta: { label: 'Explore Milonga', href: '#', arrow: true },
      // Title, copy and button read as one centred group, so the button rides
      // in the stack instead of being pinned to the foot of the frame.
      ctaInline: true,
      scrimAt: 'middle',
      top: '25%',
      ratio: 1.58,
      size: 35,
      measure: 440,
      leadMeasure: 345,
    })
  );
}
