// SET THE TONE FOR YOUR DAY — the email's two sections as FEED POSTS.
//
// Not a carousel. Two standalone 4:5 frames, one per email section, each
// complete on its own because nobody swipes to a second image that is not
// there. Shot through the same harness, so they come out 1080 x 1350.
//
// WHY THIS IS NOT THE CAROUSEL AGAIN. The carousel took the same email and
// split it into five beats, which is what a carousel is for. A feed post has
// to hold one whole idea in one frame — so section one keeps its subtitle and
// its spec line rather than handing them to slides 2 and 5, and section two
// keeps all five benefits rather than promoting two of them.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const FOREST = '#004D27';

function SetTheTonePosts() {
  return h('div', null,

    // ── POST 1 · THE HOOK ─────────────────────────────────────────────────
    // The crop drops to the foot, which spends the 150 design units a 2:3
    // source overflows inside a 4:5 frame on the counter rather than on the
    // window, and buys a clean marble band for the whole block. Marble at 150
    // carries forest green; it does not carry cream, which is why nothing
    // here is washed or darkened.
    S({ src: '../public/product/kitchen-morning.jpg', focus: 'center bottom',
        align: 'bottom', padX: 46, padY: 46 },
      // A CREAM LIFT, NOT A SCRIM. The carousel's version of this slide put
      // only an eyebrow and a title on the marble and needed nothing; a feed
      // post has to carry the paragraph and the facts too, and that block is
      // about 270 units against the 200 of clean counter available. It runs
      // up onto the pouch and the lemons, where forest green stops reading.
      //
      // So the band is lifted toward cream rather than darkened. That is the
      // direction this photograph wants: it is a bright morning shot, and a
      // dark wash on it would cost exactly the thing it was chosen for. The
      // gradient is out by 46% of the frame, so the pouch, the hand and the
      // window keep their own light.
      h('div', { style: { position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(243,241,228,0.94) 0%, rgba(243,241,228,0.86) 20%, rgba(243,241,228,0.5) 34%, rgba(243,241,228,0) 48%)' } }),
      // The block takes its own stacking order. The lift is an absolutely
      // positioned element, so without this the type — ordinary blocks —
      // paints UNDER it and the whole reading comes out washed to 40%.
      h('div', { style: { position: 'relative', zIndex: 1 } },
        h(M.SlideEyebrow, { text: 'Energy that thinks', color: FOREST }),
        h(M.SlideTitle, { line1: 'Set the tone', line2: 'for your day.',
          size: 50, lead: 0.96, color: FOREST, color2: FOREST }),
        h(M.SlideBody, { text: 'Before the day gets busy, take a moment to slow down. Clean caffeine, a clear head and a calm start, in thirty seconds, hot or iced.',
          size: 17, color: '#1A1A1A', measure: 430, top: 18 }),
        // The spec line the email carries as legal type. On a feed it is the
        // only place the facts appear at all, so it runs as a caps row rather
        // than as fine print.
        h('div', { style: { marginTop: 16, fontFamily: 'Gotham, Montserrat, sans-serif',
          fontWeight: 900, fontSize: 13, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: FOREST } },
          '15 servings · 90 cal · 3g sugar'),
      ),
    ),

    // ── POST 2 · THE CALLOUT DIAGRAM ──────────────────────────────────────
    // The email section almost fits a feed post untouched: it is built at
    // ratio 1.2, which is 600 x 720 against the 600 x 750 a 4:5 frame wants.
    // So it goes in as itself, at 1.25, rather than being redrawn — the
    // hairlines still reach the glass and the five benefits stay five.
    h('div', { style: { width: 600, height: 750, overflow: 'hidden' } },
      h(M.T8Callouts, {
        src: '../public/product/iced-callout-flat.jpg',
        alt: 'For everything your day throws at you. A hand holding a jar of iced Milonga Mate Latte, with five benefits listed alongside: clean sustained energy, mental clarity and focus, balanced calm, no jitters and no crash, and antioxidant-rich.',
        eyebrow: 'Made to keep up',
        line1: 'For everything your', line2: 'day throws at you.',
        intro: 'Work, errands, workouts, and whatever comes next.',
        // 1.5, not the email's 1.2. At 1.2 the picture finished 145 units
        // above the foot of the frame and left a band of bare beige under it;
        // a taller frame fills down to the edge, and the crop it costs comes
        // off the bottom of the jar, which the hand is holding anyway.
        //
        // THE LINES HAD TO GROW WITH IT, and not by the same amount. A taller
        // frame moves the glass right and down, and the jar narrows toward its
        // base, so every connector was stopping short in open space by a
        // different margin — which reads as decoration rather than as a
        // diagram. Each line is now measured to its own row: 124, 128, 128,
        // 124 and 143, the last one longest because the hand curves furthest
        // in at the bottom.
        ratio: 1.5,
        items: [
          { mark: 'yerba-mate', label: 'Clean, sustained energy', note: 'For walking into work already on your second gear.', line: 124 },
          { mark: 'lions-mane', label: 'Mental clarity & focus', note: 'For when your brain clocks in before you do.', line: 128 },
          { mark: 'l-theanine', label: 'Balanced calm', note: 'For keeping your cool when your boss starts the day with “Got a minute?”', line: 128 },
          { mark: 'check', label: 'No jitters, no crash', note: 'For when your inbox is already testing you at 8:47 AM.', line: 124 },
          { mark: 'leaf', label: 'Antioxidant-rich', note: 'For giving your morning routine a little extra goodness.', line: 143 },
        ],
      }),
    ),
  );
}
