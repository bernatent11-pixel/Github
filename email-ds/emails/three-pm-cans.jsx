// YOUR 3PM WITHOUT THE CRASH — the canned Lion's Mane yerba mate.
//
// Subject: Your 3PM Without The Crash ☀️🧊
// Preview: Brewed yerba mate and Lion's Mane, cold and ready by 2:59.
//
// CAN SPECS, as Bernat supplied them for this email (the product file covers
// the Mate Latte bag only): 100mg natural caffeine, 1000mg Lion's Mane,
// 200mg L-Theanine, 20 cal, 1g organic sugar, organic ingredients, 12 fl oz.
// The 20% subscription offer is his too.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const BEIGE = '#F0EFDF';
const FONT = 'Gotham, Montserrat, sans-serif';

// The close's gold pills: the face of a gold button, without the link.
const PILL = {
  background: 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)',
  boxShadow: '0 6px 14px rgba(0,53,27,0.16), 0 1px 3px rgba(0,53,27,0.14), inset 0 1px 0 rgba(255,246,214,0.7)',
};
const FORMULA = [
  ['100mg natural caffeine', 'Clean energy'],
  ['1000mg Lion’s Mane', 'Focus'],
  ['200mg L-Theanine', 'Calmness'],
];

// Section 1 geometry: photo pixels → design units, and the subscribe card.
const CAN = 600 / 1493;

// Section 2 figure. FRAME is the rounded photograph in 600-unit email
// coordinates; FX/FY map a pixel of the original desk file into it (the
// frame shows file x 200–1333, y 330–1420). The can's visible left edge is
// at file x 922, from its lid at y 662 down to the hand at about 870.
const FRAME = { x: 40, w: 520, h: Math.round(520 * 1090 / 1133) };
const FX = x => FRAME.x + (x - 200) * FRAME.w / 1133;
const FY = y => (y - 330) * FRAME.h / 1090;
const LABEL = { x: 14, w: 214 };
const CALLOUTS = [
  { title: 'Clean, sustained energy', note: 'No jitters, no crash', y: 92, ty: 690 },
  { title: 'Focus & mental clarity', y: 210, ty: 770 },
  { title: 'Balance & calm', note: 'Steady, not anxious', y: 312, ty: 850 },
].map(c => {
  const sy = c.y + 26, tx = FX(918) - 3, ty = FY(c.ty);
  return { ...c, sy, tx, ty, cx: (LABEL.x + LABEL.w + tx) / 2, cy: Math.min(sy, ty) - 16 };
});
const CARD_H = 250;

const SECTION_1_ALT =
  'Milonga. Imagine… 3 PM feeling as good as 10 AM. Skip the second coffee. ' +
  'Clean, sustained energy, focus, and balance in a cold, refreshing can. Ready ' +
  'to carry you through the rest of your day. A hand in an orange sweatshirt ' +
  'lifts an open can of Milonga Yerba Mate in Citrus Mango from a blue leather ' +
  'armchair. Subscribe and save 20% on each order. Subscribe and save.';

function ThreePmCans() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    // The Citrus Mango can in hand, on a blue armchair. Wordmark centred at
    // the head, the title and its paragraph under it, the hand and the can
    // left clear below.
    //
    // THE WALL IS EXTENDED 440px UPWARD from the photograph's own top rows
    // (can-citrus-mango-tall.jpg). In the original the hand starts 22% down,
    // which left about 177 units above it for a block that needs 300; the
    // door frame and the wall are vertical surfaces, so stretching their top
    // edge reads as more of the same room rather than as a patch.
    //
    // THE TOP MEASURES MID-GREY — about 125 of 255 — which neither ink holds
    // on. So the same answer the Golden Vanilla opener took: a scrim weighted
    // to the top, beige and gold type, gold wordmark.
    //
    // THE BUTTON GOES UNDER THE PICTURE. The can stands at the bottom centre,
    // so a centred pill at the foot of the frame lands on the product; on the
    // forest band below it reads as the close of the opener and hands
    // straight into the forest of section 2.
    // THE SUBSCRIBE CARD, after the Cann opener Bernat sent. A gold card rides
    // over the foot of the photograph with the can standing IN FRONT of its
    // top edge, and the forest of section 2 starts behind the card's middle —
    // so photograph, card and next section overlap instead of stacking as
    // three bands.
    //
    // The can is in front because its base is cut out of the same photograph
    // (can-citrus-mango-base-cutout.png, masked to the cylinder and its
    // bevelled base) and laid back over the card exactly where it already
    // sits in the picture. CAN maps photo pixels to design units: the frame
    // is 600 wide and its ratio equals the file's, so one scale serves both
    // axes, and the tall file is the original plus 440px of wall on top.
    h('div', { style: { position: 'relative', zIndex: 0 } },
      h(M.T9Story, {
        src: '../public/product/can-citrus-mango-tall.jpg',
        alt: SECTION_1_ALT,
        logo: true,
        logoTone: 'gold',
        logoHeight: 76,
        align: 'center',
        line1: 'Imagine…',
        line2: '3 PM feeling as\ngood as 10 AM.',
        line1Color: BEIGE,
        line2Color: GOLD,
        paras: ['Skip the second coffee. Clean, sustained energy, focus, and balance in a cold, refreshing can. Ready to carry you through the rest of your day.'],
        ratio: 2440 / 1493,
        size: 30,
        size2: 40,
        titleLead: 1.02,
        top: 26,
        padLeft: 34,
        padRight: 34,
        measure: 470,
        ink: 'light',
        scrim: 0.62,
        scrimAt: 'top',
        halo: 'soft',
      }),

      // ── 2 · THE AFTERNOON ────────────────────────────────────────────────
      // Organised like the Cann section Bernat sent: the subscribe card's
      // lower half on the new ground, the title and line centred under it,
      // then one big rounded photograph. Forest replaces Cann's pink, so the
      // type is white and the card is pulled up by half its height — the
      // forest begins on the card's middle line.
      //
      // THE BENEFITS BREAK OUT OF THE FRAME. Each white label starts on the
      // green, crosses the frame's left edge and sends a forest arrow to the
      // can. The can stands right of centre with the hand over its lower
      // left, so the arrows land on its visible upper edge.
      h('div', { style: {
        // flow-root, or the card's negative margin collapses through this
        // band and drags the whole forest up over the opener with it.
        display: 'flow-root', position: 'relative',
        backgroundColor: FOREST,
        backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
        backgroundSize: '320px 320px',
        padding: '0 26px 0' } },
        // Pulled up by half its own height, so the photograph ends — and the
        // forest begins — on the card's middle line.
        h('div', { style: { position: 'relative', zIndex: 2, marginTop: -CARD_H / 2,
          height: CARD_H, boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)',
          // The can stands about 76 units into the card, so the type starts
          // below its base — the Cann card does the same.
          borderRadius: 26, padding: '92px 24px 0', textAlign: 'center',
          boxShadow: '0 18px 36px rgba(0,26,13,0.34), 0 3px 8px rgba(0,26,13,0.22), inset 0 1px 0 rgba(255,246,214,0.7)' } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 32, lineHeight: 1.0,
            textTransform: 'uppercase', color: FOREST, letterSpacing: '0.01em' } },
            'Subscribe & save 20%'),
          h('div', { style: { fontFamily: FONT, fontWeight: 700, fontStyle: 'italic', fontSize: 28,
            lineHeight: 1.05, textTransform: 'uppercase', color: FOREST, marginTop: 4 } },
            'on each order.'),
          h('div', { style: { marginTop: 22 } },
            h(M.Button, { label: 'Subscribe & save', href: '#subscribe', bg: 'gold', size: 'lg' }),
          ),
        ),


        h('div', { style: { position: 'relative', zIndex: 1, textAlign: 'center', marginTop: 44 } },
          h(M.Headline, { line1: 'Bye afternoon crashes', line2: 'welcome afternoon flow', bg: 'forest',
            size: 31, align: 'center', color: '#FFFFFF', line2Color: '#FFFFFF', italic: true }),
          h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
            lineHeight: 1.5, color: '#FFFFFF', maxWidth: 440, margin: '18px auto 0' } },
            'Keep the day moving, without letting your energy slow you down.'),
        ),

        // The figure, in the email's 600-unit width (it cancels the band's
        // 26 of padding). FRAME holds the crop of the desk photo —
        // can-citrus-mango-desk-frame.jpg, file x 200–1333, y 330–1420 — so
        // the can lands at a known place and each arrow is aimed at it.
        h('div', { style: { position: 'relative', margin: '40px -26px 0', height: FRAME.h + 8 } },
          h('div', { style: { position: 'absolute', left: FRAME.x, top: 0, width: FRAME.w, height: FRAME.h,
            borderRadius: 28, overflow: 'hidden',
            boxShadow: '0 18px 36px rgba(0,26,13,0.40), 0 3px 8px rgba(0,26,13,0.26)' } },
            h('img', { src: '../public/product/can-citrus-mango-desk-frame.jpg',
              alt: 'A woman in a linen suit rests her hand on a can of Milonga Yerba Mate in Citrus Mango, on a travertine side table beside her open laptop.',
              style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }),
          ),

          CALLOUTS.map((c, i) => h('div', { key: i, style: { position: 'absolute', zIndex: 1,
            left: LABEL.x, top: c.y, width: LABEL.w, boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)',
            borderRadius: 16, padding: '11px 14px',
            boxShadow: '0 10px 22px rgba(0,26,13,0.30), 0 2px 4px rgba(0,26,13,0.18), inset 0 1px 0 rgba(255,246,214,0.7)' } },
            h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12.5, lineHeight: 1.2,
              letterSpacing: '0.06em', textTransform: 'uppercase', color: FOREST } }, c.title),
            c.note ? h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 12.5,
              lineHeight: 1.35, color: FOREST, marginTop: 3 } }, c.note) : null,
          )),

          // The arrows: no shadow, a fine forest line, a small dot where it
          // leaves the label and an open chevron where it meets the can. A
          // cubic curve leaves the label level and arrives at the can level,
          // so each one reads as a drawn gesture rather than a straight rule.
          h('svg', { width: 600, height: FRAME.h, viewBox: `0 0 600 ${FRAME.h}`,
            style: { position: 'absolute', left: 0, top: 0, zIndex: 1, overflow: 'visible' } },
            h('defs', null,
              h('marker', { id: 'arrowhead', markerWidth: 12, markerHeight: 12, refX: 8, refY: 6,
                orient: 'auto', markerUnits: 'userSpaceOnUse' },
                h('path', { d: 'M2,2 L8,6 L2,10', fill: 'none', stroke: FOREST, strokeWidth: 1.8,
                  strokeLinecap: 'round', strokeLinejoin: 'round' })),
            ),
            CALLOUTS.map((c, i) => {
              const x0 = LABEL.x + LABEL.w + 9, dx = c.tx - x0;
              return h('g', { key: i },
                h('circle', { cx: x0, cy: c.sy, r: 3.2, fill: FOREST }),
                h('path', { d: `M ${x0} ${c.sy} C ${x0 + dx * 0.55} ${c.sy}, ${c.tx - dx * 0.45} ${c.ty}, ${c.tx} ${c.ty}`,
                  fill: 'none', stroke: FOREST, strokeWidth: 1.8, strokeLinecap: 'round',
                  markerEnd: 'url(#arrowhead)' }));
            }),
          ),
        ),
      ),

      // The can's base, in front of the card's top edge.
      h('img', { src: '../public/product/can-citrus-mango-base-cutout.png', alt: '',
        style: { position: 'absolute', zIndex: 3, display: 'block', height: 'auto',
          left: 578 * CAN, top: (1640 + 440) * CAN, width: 352 * CAN,
          filter: 'drop-shadow(0 6px 6px rgba(0,26,13,0.28))' } }),
    ),

    // ── 2b · THE COMPARISON ──────────────────────────────
    // The education act inverts the page: the forest paper grain from the
    // Golden Vanilla email, so the opener's dark green carries straight on
    // into the band and the only colour change in the email is the beige
    // close below. On dark green the title is white and gold means one thing
    // — the comparison column — so it matches the gold button at the foot.
    h('div', { style: {
      backgroundColor: FOREST,
      backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
      backgroundSize: '320px 320px',
      padding: '56px 32px 56px',
      position: 'relative', overflow: 'hidden' } },

      // The comparison. Our column is gold, theirs a hairline — the stripe
      // makes the point before a word is read. Where coffee's figure can't
      // be sourced it is an em dash, never a number that looks right.
      h('div', null,
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD,
          textAlign: 'center', marginBottom: 18 } }, 'Your 3PM, two ways'),
        // The two drinks as cutouts under their names, both sitting on one
        // baseline so the can and the cup read as a pair at the same scale.
        h(M.CompareRows, { bg: 'forest', ourName: 'Milonga can', theirName: '3PM coffee', artBelow: true,
          ourArt: h('img', { src: '../public/product/can-peach-ginger-cutout.png',
            alt: 'A can of Milonga Yerba Mate, Peach Ginger',
            style: { height: 150, width: 'auto', display: 'block', margin: '0 auto',
              filter: 'drop-shadow(0 10px 12px rgba(0,26,13,0.45))' } }),
          theirArt: h('div', { style: { height: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' } },
            h('img', { src: '../public/product/coffee-cup.png', alt: 'A cup of black coffee',
              style: { width: 132, height: 'auto', display: 'block',
                filter: 'drop-shadow(0 10px 12px rgba(0,26,13,0.45))' } })),
          // Four rows, in the order the afternoon happens: how the energy
          // feels, where the focus comes from, the overall sensation, and
          // what is left three hours on. Coffee's side is the positioning
          // already in the product file (spikes, jitters, the crash) — no
          // figures, so nothing here needs sourcing.
          rows: [
            { label: 'Energy', ours: 'Smooth and sustained', theirs: 'A fast spike, then a drop' },
            { label: 'Focus', ours: 'Clear, with Lion’s Mane', theirs: 'Wired, from caffeine alone' },
            { label: 'Overall feel', ours: 'Awake, focused, and calm', theirs: 'Jittery and on edge' },
            { label: '3 hours later', ours: 'Still sharp and ready', theirs: 'The crash' },
          ] }),
      ),

      h('div', { style: { marginTop: 36, textAlign: 'center' } },
        h(M.Button, { label: 'Try it now', href: '#shop', bg: 'forest' }),
      ),
    ),

    // ── 3 · THE CLOSE ─────────────────────────────────────────────────────
    // Beige, dark green type. Title, the formula as gold pills and the button
    // down the left; one big tilted can on the right whose top breaks up
    // through the edge into the forest above. That crossing is the 3D moment
    // of the email — the can stands in front of the page rather than on it.
    //
    // The section paints above the comparison (zIndex 1) so the can's top
    // covers the forest, and clips only its SIDES and foot: an unclipped
    // cutout running past the right edge widens the whole export.
    h('div', { style: { position: 'relative', zIndex: 1, padding: '64px 28px 56px',
      clipPath: 'inset(-400px 0 0 0)' } },
      h('img', { src: '../public/product/can-peach-ginger-tilt.png',
        alt: 'A can of Milonga Yerba Mate, Peach Ginger, 12 fl oz, tilted.',
        style: { position: 'absolute', right: 12, top: -126, height: 500, width: 'auto',
          display: 'block', filter: 'drop-shadow(0 22px 26px rgba(0,26,13,0.34)) drop-shadow(0 4px 6px rgba(0,26,13,0.2))' } }),

      h('div', { style: { width: 284, position: 'relative' } },
        h(M.Headline, { line1: 'Make the switch.', line2: 'Feel the difference', bg: 'beige',
          size: 23, align: 'left', italic: true }),

        // The functional three, each a gold pill with its dose and what it is
        // for. On beige gold is a fill and never type, so the type is forest.
        h('div', { style: { marginTop: 26 } },
          FORMULA.map(([dose, note], i) => h('div', { key: i, style: { ...PILL,
            padding: '11px 20px', marginBottom: 10, borderRadius: 999 } },
            h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 13.5,
              letterSpacing: '0.05em', textTransform: 'uppercase', color: FOREST, lineHeight: 1.15 } }, dose),
            h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 12.5,
              color: FOREST, opacity: 0.82, marginTop: 2 } }, note),
          )),
        ),

        h('div', { style: { height: 1, background: 'rgba(0,77,39,0.32)', margin: '18px 0 18px' } }),

        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          ['20 cal', '1g organic sugar', 'Organic ingredients'].map((t, i) => h('span', { key: i,
            style: { ...PILL, display: 'inline-block', borderRadius: 999, padding: '9px 16px',
              fontFamily: FONT, fontWeight: 900, fontSize: 12, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: FOREST } }, t)),
        ),

        h('div', { style: { marginTop: 30 } },
          h(M.Button, { label: 'Shop now', href: '#shop', bg: 'beige', size: 'lg' }),
        ),
      ),
    ),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
