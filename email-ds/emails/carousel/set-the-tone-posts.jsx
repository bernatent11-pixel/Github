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
const GOLD = '#E3BC62';

function SetTheTonePosts() {
  return h('div', null,

    // ── POST 1 · THE HOOK ─────────────────────────────────────────────────
    // The block moves to the HEAD of the frame, and the ink flips with it.
    // Cream over gold needs a dark ground, so the lift that used to brighten
    // the counter is gone and a scrim takes its place at the top — the
    // opposite control, in the opposite direction, for the opposite ink.
    //
    // The crop goes back to the middle. Anchoring to the foot was buying a
    // clean marble band for type that no longer sits there; from the centre
    // the pouch and the hand sit lower in the frame and the window, which is
    // what the type now covers, takes the top.
    S({ src: '../public/product/kitchen-morning.jpg', focus: 'center 40%',
        scrim: 0.6, scrimAt: 'top', align: 'top', padX: 46, padY: 46 },
      h('div', { style: { maxWidth: 440 } },
        h(M.SlideEyebrow, { text: 'Energy that thinks' }),
        h(M.SlideTitle, { line1: 'Set the tone', line2: 'for your day.',
          size: 50, lead: 0.96, color: '#FFFFFF', color2: GOLD, onPhoto: true }),
        h(M.SlideBody, { text: 'Before the day gets busy, take a moment to slow down. Clean caffeine, a clear head and a calm start, in thirty seconds, hot or iced.',
          size: 17, color: '#FFFFFF', measure: 420, top: 18, onPhoto: true }),
        h('div', { style: { marginTop: 16, fontFamily: 'Gotham, Montserrat, sans-serif',
          fontWeight: 900, fontSize: 13, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: GOLD,
          textShadow: '0 1px 4px rgba(0,26,13,0.45)' } },
          '15 servings · 90 cal · 3g sugar'),
      ),
    ),

    // ── POST 2 · THE CALLOUT DIAGRAM ──────────────────────────────────────
    // Rebuilt rather than borrowed. The email's T8Callouts is fixed at a 30px
    // title in one dark ink on its own beige, which cannot carry a cream-over-
    // gold headline at twice that size — so the section is redrawn here with
    // the pieces under control.
    //
    // ONE GROUND, ALL BEIGE. The head carried a dark band for a while so the
    // title could run cream over gold; on one beige neither colour is legal,
    // so the headline is one dark green and the second line is set apart by
    // slant instead.
    //
    // THE CARDS GAVE WIDTH TO THE PICTURE. At 260 rather than the email's 330
    // they still hold a label and a two-line note, and the 70 they release
    // lets the jar run at 360 with its left edge at 270 — half the frame,
    // against the third it had. The lines are short now because the gap is
    // short, which is the point: a connector is a measurement of the distance
    // between two objects, not a decoration of it.
    S({ bg: 'beige', textured: true, align: 'top', padX: 0, padY: 0 },

      // ONE BEIGE, AND THE INK FOLLOWS IT. The head of this post was a dark
      // band carrying cream over gold; on beige neither is available — gold
      // measures 1.56:1 here and cream is 1.1:1 — so the whole headline is
      // the one dark green the ground allows.
      //
      // The two-line split survives by changing instrument. Where the dark
      // band set the payoff apart by COLOUR, here it is set apart by SLANT,
      // which is the house two-line headline exactly as documented: the
      // contrast is weight and slant rather than colour, precisely so it
      // holds on a ground that rules the colour out.
      h('div', { style: { padding: '42px 30px 34px', textAlign: 'center' } },
        h(M.SlideEyebrow, { text: 'Made to keep up', color: FOREST, align: 'center' }),
        h(M.SlideTitle, { line1: 'For everything', line2: 'your day throws\nat you.',
          size: 30, size2: 48, lead: 0.98, align: 'center',
          color: FOREST, color2: FOREST }),
        h(M.SlideBody, { text: 'Work, errands, workouts, and whatever comes next.',
          size: 15, color: '#151515', align: 'center', measure: 400, top: 16 }),
      ),

      // The diagram, pushed to the top of what is left rather than centred in
      // it — the band above already owns the head of the frame, and a block
      // floating in the middle of the rest is the thing this whole set has
      // been correcting.
      h('div', { style: { position: 'relative', paddingTop: 26 } },
        h('img', { src: '../public/product/jar-in-hand.png',
          alt: 'A hand holding a tall glass jar of iced Milonga Mate Latte',
          style: { position: 'absolute', right: -34, top: 36, width: 360,
                   height: 'auto', display: 'block' } }),
        // The card stack lifts 26 to centre on the jar. Both start level at
        // the top of this block, but the stack is about 700 units tall
        // against the jar's 640, so starting them together leaves the cards
        // hanging 60 below the glass. Half the difference puts one on the
        // middle of the other.
        h('div', { style: { paddingLeft: 20, marginTop: -26, position: 'relative', zIndex: 1 } },
          [
            ['yerba-mate', 'Clean, sustained energy', 'For walking into work already on your second gear.'],
            ['lions-mane', 'Mental clarity & focus', 'For when your brain clocks in before you do.'],
            ['l-theanine', 'Balanced calm', 'For keeping your cool when your boss starts the day with “Got a minute?”'],
            ['check', 'No jitters, no crash', 'For when your inbox is already testing you at 8:47 AM.'],
            ['leaf', 'Antioxidant-rich', 'For giving your morning routine a little extra goodness.'],
          ].map(([mark, label, note], i) => h('div', { key: i,
            style: { display: 'flex', alignItems: 'center', marginBottom: 10 } },
            h('span', { style: { display: 'flex', alignItems: 'center', gap: 11,
              width: 260, boxSizing: 'border-box', background: '#FFFFFF',
              borderRadius: 999, padding: '10px 16px',
              boxShadow: '0 6px 18px rgba(0,77,39,0.13), 0 1px 3px rgba(0,77,39,0.10)' } },
              h('span', { style: { flex: 'none', width: 34, height: 34, borderRadius: 999,
                background: FOREST, display: 'flex', alignItems: 'center',
                justifyContent: 'center' } },
                // AnyIcon, not BrandIcon. 'check' and 'leaf' are Icon names rather
                // than brand marks, and BrandIcon only knows the seven marks —
                // reaching for it directly threw on the two rows that are not
                // ingredients.
                h(M.AnyIcon, { name: mark, bg: 'forest', size: 19 }),
              ),
              h('span', null,
                h('span', { style: { display: 'block', fontFamily: 'Gotham, Montserrat, sans-serif',
                  fontWeight: 900, fontSize: 11.5, letterSpacing: '0.07em',
                  textTransform: 'uppercase', color: FOREST, marginBottom: 3 } }, label),
                h('span', { style: { display: 'block', fontFamily: 'Gotham, Montserrat, sans-serif',
                  fontWeight: 500, fontSize: 11.5, lineHeight: 1.33, color: '#151515' } }, note),
              ),
            ),
            h('span', { style: { flex: 'none', width: 26, height: 1, background: 'rgba(0,77,39,0.5)' } }),
          )),
        ),
      ),
    ),
  );
}
