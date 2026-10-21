// UNWIND — the infused cans for the evening at home: dinner, the easy hours
// after, a Citrus Mango mocktail, and the two strengths side by side.
//
// THC AND CBD ARE NAMED, as in Sober October: this email is about the
// infused line, and its disclosures cannot be written without them. Every
// other Milonga email still never mentions them.
//
// Facts are Shopify's (read 2026-10-13): Cannabis Light 5mg THC + 5mg CBD,
// Cannabis Regular 10mg THC + 10mg CBD, both with 110mg of naturally
// occurring caffeine from yerba mate and L-Theanine, in Açaí Mint, Citrus
// Mango and Peach Ginger. Because of the caffeine the copy says "evening",
// never "before bed".
//
// All copy is Claude's first draft from Bernat's brief. No build record yet.
// Photographs: Bernat's dinner table (section 1) and mocktail (section 2).
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const CREAM = '#FBF8EF';
const INK = '#12331F';
const FONT = 'Gotham, Montserrat, sans-serif';

const FOREST_PAPER = {
  backgroundColor: FOREST,
  backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
  backgroundSize: '320px 320px',
};

// A photograph still to be shot or chosen: a dashed frame that says what
// goes in it, so the layout can be judged before the picture exists.
function PhotoSlot({ w, h: hh, brief, dark, radius = 0 }) {
  return h('div', { style: { width: w, height: hh, boxSizing: 'border-box', borderRadius: radius,
    border: `1.5px dashed ${dark ? 'rgba(227,188,98,0.55)' : 'rgba(0,77,39,0.45)'}`,
    background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,77,39,0.04)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 22 } },
    h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 12, lineHeight: 1.45, letterSpacing: '0.06em',
      textTransform: 'uppercase', color: dark ? GOLD : FOREST, opacity: 0.85, maxWidth: 320 } }, brief));
}

// ── The mocktail ─────────────────────────────────────────────────────────
// One can per glass, so each mocktail carries exactly the dose on the can's
// label; no alcohol in the recipe.
// THE RECIPE FOLLOWS THE PHOTOGRAPH Bernat sent: a wine glass over ice, an
// orange wheel on the rim, mango and lime beside it.
const RECIPE = {
  name: ['Citrus Mango', 'Sunset Spritz'],
  intro: 'Mango, a squeeze of lime and an orange wheel, poured over ice. Five minutes, one can.',
  ingredients: [
    '1 can Milonga Citrus Mango, 5mg or 10mg, chilled',
    '2 oz mango nectar',
    '½ oz fresh lime juice',
    'Plenty of ice',
    'An orange wheel, to garnish',
  ],
  steps: [
    ['Chill', 'Fill a wine glass to the top with ice.'],
    ['Build', 'Add the mango nectar and the lime juice.'],
    ['Top', 'Pour in the Milonga, stir gently and add the orange wheel.'],
  ],
  note: 'One can per glass, so every mocktail carries exactly the dose on the label.',
};

// ── The two strengths ────────────────────────────────────────────────────
// The cans pictured are the Peach Ginger studio shots until Citrus Mango
// 5mg and 10mg cutouts exist, so the copy says every flavor comes in both.
const STRENGTHS = [
  { name: 'Light', dose: '5mg', label: '5mg THC · 5mg CBD', level: 1,
    line: 'A gentle unwind. For dinner, good conversation, and anyone new to infused drinks.',
    can: '../public/product/can-infused-5mg-studio.png', href: '#shop-5mg', cta: 'Shop Light' },
  { name: 'Regular', dose: '10mg', label: '10mg THC · 10mg CBD', level: 2,
    line: 'A fuller wind-down. For when you know how you take it and want a little more.',
    can: '../public/product/can-infused-10mg-studio.png', href: '#shop-10mg', cta: 'Shop Regular' },
];

// The dinner photograph: 1333 x 2000 plus 444px of extended head, drawn 600
// wide = 1100 units; the section keeps the first HERO_H of it.
const HERO_H = 960;
// The can's foot in the photograph sits about 755 units down.
const CTA_TOP = 812;

const SECTION_1_ALT =
  'Milonga. After hours. Home at last, time to unwind. The laptop’s closed and ' +
  'dinner’s on the table. Milonga Citrus Mango brings hemp-derived THC and CBD ' +
  'to a cold can of yerba mate, made for slow dinners and easy evenings at ' +
  'home. Two hands pass a can of Milonga Citrus Mango, 10mg THC and 10mg CBD, ' +
  'across a candlelit dinner table. Shop Citrus Mango.';
const SECTION_2_PHOTO_ALT =
  'The Citrus Mango Sunset Spritz in a wine glass over ice with an orange ' +
  'wheel, beside a can of Milonga Citrus Mango, 10mg THC and 10mg CBD, with ' +
  'fresh mango and lime.';

const COMPLIANCE =
  'DRAFT — confirm with counsel before sending. Must be 21+ to purchase. ' +
  'Hemp-derived; contains less than 0.3% delta-9 THC on a dry-weight basis. ' +
  'Contains THC. Contains caffeine. Do not drive or operate machinery after ' +
  'consuming. Keep out of reach of children and pets. Not for use if pregnant ' +
  'or nursing. These statements have not been evaluated by the Food and Drug ' +
  'Administration.';

const eyebrow = (t, color) => h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
  letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 14 } }, t);
const para = (t, color, max = 470) => h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
  lineHeight: 1.5, color, maxWidth: max, margin: '16px auto 0' } }, t);

// Two segments, filled to the can's strength.
function Meter(level) {
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 12 } },
    h('span', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.16em',
      textTransform: 'uppercase', color: FOREST } }, 'Strength'),
    [1, 2].map((n) => h('span', { key: n, style: { width: 34, height: 8, borderRadius: 999,
      background: n <= level ? FOREST : 'rgba(0,77,39,0.15)' } })));
}

function StrengthCard(s, i) {
  return h('div', { key: i, style: { flex: 1, background: CREAM, borderRadius: 26, padding: '22px 16px 22px',
    textAlign: 'center', border: '1px solid rgba(227,188,98,0.5)',
    boxShadow: '0 18px 34px rgba(0,26,13,0.35), 0 3px 8px rgba(0,26,13,0.2)' } },
    h('img', { src: s.can, alt: `A can of Milonga Yerba Mate, ${s.label}`,
      style: { height: 220, width: 'auto', display: 'block', margin: '0 auto',
        filter: 'drop-shadow(0 14px 14px rgba(0,53,27,0.3))' } }),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 26, lineHeight: 1, color: FOREST,
      textTransform: 'uppercase', marginTop: 18 } }, s.name,
      h('span', { style: { fontWeight: 700, fontStyle: 'italic', fontSize: 19, marginLeft: 7, textTransform: 'none' } }, s.dose)),
    h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 13, color: FOREST, marginTop: 8 } }, s.label),
    Meter(s.level),
    h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 14, lineHeight: 1.45, color: INK,
      marginTop: 14, minHeight: 82 } }, s.line),
    h('div', { style: { marginTop: 14 } }, h(M.Button, { label: s.cta, href: s.href, bg: 'beige', size: 'md' })),
  );
}

function Unwind({ shopHref = '#shop' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · HOME AT LAST ──────────────────────────────────────────────────
    // The loud moment: Bernat's dinner photograph full-bleed — a Citrus Mango
    // 10mg passed across a candlelit table. Its head is busy (plates, a hand,
    // candles) and the can starts about 265 units down, so the photo is
    // extended 200 units upward from its own top rows (unwind-dinner-tall.jpg)
    // and a warm near-black grade holds the type there, clear by the can.
    // The button sits under the can, on a soft dark pool over the olives.
    h('div', { style: { position: 'relative', height: HERO_H, overflow: 'hidden', background: '#0D0B09' } },
      h('img', { src: '../public/product/unwind-dinner-tall.jpg', alt: SECTION_1_ALT,
        style: { position: 'absolute', top: 0, left: 0, width: 600, height: 'auto', display: 'block' } }),
      h('div', { style: { position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.88) 18%, rgba(13,11,9,0.68) 30%, rgba(13,11,9,0.3) 38%, rgba(13,11,9,0) 45%, rgba(13,11,9,0) 76%, rgba(13,11,9,0.5) 88%, rgba(13,11,9,0.82) 100%)' } }),
      h('div', { style: { position: 'absolute', top: 30, left: 36, right: 36, textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.45)' } },
        h(M.Logo, { tone: 'gold', variant: 'primary', height: 70 }),
        h('div', { style: { marginTop: 18 } }, eyebrow('After hours', GOLD)),
        h(M.Headline, { line1: 'Home at last,', line2: 'time to unwind.', bg: 'forest', size: 40, align: 'center',
          color: '#FFFFFF', line2Color: GOLD, italic: true }),
        para('The laptop’s closed and dinner’s on the table. Milonga Citrus Mango brings hemp-derived THC and CBD to a cold can of yerba mate, made for slow dinners and easy evenings at home.', '#FFFFFF')),
      h('div', { style: { position: 'absolute', top: CTA_TOP - 34, left: 0, right: 0, height: 120,
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(13,11,9,0.7) 0%, rgba(13,11,9,0.4) 55%, rgba(13,11,9,0) 100%)' } }),
      h('div', { style: { position: 'absolute', top: CTA_TOP, left: 0, right: 0, textAlign: 'center' } },
        h('div', { style: { display: 'inline-block', borderRadius: 999,
          boxShadow: '0 10px 24px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)' } },
          h(M.Button, { label: 'Shop Citrus Mango', href: shopHref, bg: 'forest', size: 'lg' }))),
    ),

    // ── 2 · THE MOCKTAIL ──────────────────────────────────────────────────
    // Off-centre on purpose (R2): the drink's photograph left, the recipe
    // card right, then the three steps across.
    h('div', { style: { padding: '60px 28px 56px' } },
      h('div', { style: { textAlign: 'center' } },
        eyebrow('Mocktail recipe', FOREST),
        h(M.Headline, { line1: RECIPE.name[0], line2: RECIPE.name[1], bg: 'beige', size: 40, align: 'center', italic: true }),
        para(RECIPE.intro, INK, 440)),
      h('div', { style: { display: 'flex', gap: 18, marginTop: 30, alignItems: 'stretch' } },
        h('div', { style: { flex: '0 0 236px' } },
          h('img', { src: '../public/product/mocktail-citrus-mango-10mg.jpg', alt: SECTION_2_PHOTO_ALT,
            style: { width: 236, height: 330, objectFit: 'cover', borderRadius: 24, display: 'block',
              boxShadow: '0 14px 28px rgba(0,53,27,0.14), 0 2px 6px rgba(0,53,27,0.08)' } })),
        h('div', { style: { flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '22px 20px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          border: '1px solid rgba(0,77,39,0.12)', boxShadow: '0 14px 28px rgba(0,53,27,0.10), 0 2px 6px rgba(0,53,27,0.07)' } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 13, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: FOREST } }, 'You’ll need'),
          RECIPE.ingredients.map((t, i) => h('div', { key: i, style: { display: 'flex', gap: 10, alignItems: 'baseline',
            marginTop: i ? 11 : 14, fontFamily: FONT, fontWeight: 600, fontSize: 14.5, lineHeight: 1.35, color: FOREST } },
            h('span', { style: { flex: 'none', width: 7, height: 7, borderRadius: 999, background: GOLD, transform: 'translateY(-2px)' } }), t)),
        ),
      ),
      // The three steps across (Process Strip).
      h('div', { style: { display: 'flex', gap: 14, marginTop: 30 } },
        RECIPE.steps.map(([label, line], i) => h('div', { key: i, style: { flex: 1, textAlign: 'center' } },
          h('div', { style: { width: 50, height: 50, borderRadius: 999, margin: '0 auto', background: FOREST,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900,
            fontSize: 22, color: GOLD } }, i + 1),
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 16, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: FOREST, marginTop: 12 } }, label),
          h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 14, lineHeight: 1.45, color: INK, marginTop: 6 } }, line)))),
      h('div', { style: { marginTop: 26, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 13.5,
        fontStyle: 'italic', color: FOREST } }, RECIPE.note),
    ),

    // ── 3 · PICK YOUR STRENGTH ────────────────────────────────────────────
    // The one background change: forest paper, the two strengths side by
    // side on cream cards, a strength meter on each.
    h('div', { style: { ...FOREST_PAPER, padding: '60px 24px 56px', textAlign: 'center' } },
      eyebrow('Pick your strength', GOLD),
      h(M.Headline, { line1: 'Same flavor,', line2: 'your strength.', bg: 'forest', size: 40, align: 'center',
        color: '#FFFFFF', line2Color: GOLD, italic: true }),
      para('Citrus Mango, and every other flavor, comes in both. The difference is the dose, so the evening goes the way you like it.', '#FFFFFF', 460),
      h('div', { style: { display: 'flex', gap: 14, marginTop: 32 } }, STRENGTHS.map(StrengthCard)),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 14, lineHeight: 1.5, color: '#FFFFFF',
        maxWidth: 440, margin: '26px auto 0' } },
        h('span', { style: { color: GOLD, fontWeight: 900 } }, 'New to THC? '),
        'Start with Light and give it time before reaching for another.'),
    ),

    h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
