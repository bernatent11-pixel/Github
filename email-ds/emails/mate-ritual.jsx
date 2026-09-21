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
  family: '../public/product/milonga-family.jpg',
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
      // The button goes back ON the picture, so the frame has to make room for
      // it. Raising the ratio is what does that: the copy block's height is
      // fixed and anchored at the top, so a taller frame pushes the gourd and
      // the hands further down in absolute terms and opens a clear gap between
      // the last line of copy and the top of the gourd. The measure goes wide
      // at the same time, which saves the copy a line.
      ratio: 1.80,
      focus: 'center 50%',
      size: 37,
      top: 28,
      measure: 500,
      cta: { label: 'Discover why we started', href: '#about', arrow: true },
      at: '40%',
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
    // The product still life. Its ground is already Milonga forest, so the
    // section still reads as the colour change that closes the email — the
    // products just arrive inside it instead of after it.
    //
    // The art is cropped 190px off the left of the supplied file, which
    // removes the acai-mint can whose label reads '10mg THC | 10mg CBD'.
    h(M.T9Story, {
      src: IMG.family,
      alt: 'Milonga yerba mate latte pouch, a peach ginger can and a mate gourd among leaves on a deep green ground',
      eyebrow: 'Old tradition, new form',
      line1: 'Bringing the',
      line2: 'ritual forward',
      lead: 'Milonga takes the spirit of mate and reimagines it for today.',
      paras: [
        'We keep what makes mate special — its natural energy, connection, and culture — and bring it into innovative products made for modern moments. From sparkling yerba mate to our Mate Latte, Milonga is a new way to experience an old tradition.',
      ],
      cta: { label: 'Explore Milonga', href: '#', arrow: true },
      at: '47%',
      ratio: 1.84,
      size: 37,
      top: 110,
      measure: 380,
      // The still life stacks its products down the right — pouch high, can
      // low — so the copy space it left is on the LEFT. Centred type ran
      // straight across the pack; this slides the whole column into the gap.
      padRight: 175,
      // The ground is already near-black green, so the scrim only has to lift
      // the type off the leaves — not darken a picture that is already dark.
      scrim: 0.45,
    })
  );
}
