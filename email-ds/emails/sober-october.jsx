// SOBER OCTOBER — the infused cans, Light 5mg and Regular 10mg.
//
// Subject: Sober October, Minus The Boring Part 🌿
// Preview: Alcohol-free THC + CBD yerba mate in 5mg and 10mg, and up to $100 off when you build your own bundle.
//
// THE STANDING RULE IS SET ASIDE FOR THIS CAMPAIGN ONLY, at Bernat's
// request: every other Milonga email still never mentions THC, CBD, cannabis
// or weed. This one is about the infused line, so it has to.
//
// Facts are Shopify's (read 2026-10-13): Cannabis Light — 5mg THC, 5mg CBD;
// Cannabis Regular — 10mg THC, 10mg CBD; both with 110mg of naturally
// occurring caffeine from yerba mate and L-Theanine, in Açaí Mint, Citrus
// Mango and Peach Ginger. Shopify's own copy calls L-Theanine "for stress
// relief"; that is a health claim and is not repeated here.
//
// Three acts, after the BRÉZ section Bernat sent: the shelf photograph with
// the wordmark, title, paragraph and button over its head; the photo fading
// into forest, where the two versions ride up over it as glass cards listing
// what each can holds; then the bundle builder, drawn as the site's "My
// Bundle" panel, on beige; and a footer with the 21+ and hemp disclosures.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const CREAM = '#F0EFDF';
const FONT = 'Gotham, Montserrat, sans-serif';

const FOREST_PAPER = {
  backgroundColor: FOREST,
  backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
  backgroundSize: '320px 320px',
};

// The shelf photograph is 1333 x 2000, drawn 600 wide: 900 units tall.
const HERO_H = 900;
// How far the first card rises into the photo's foot. Kept short so the
// shelf gets most of its own height before the cards begin (Bernat).
const CARD_RISE = 40;

const VERSIONS = [
  {
    name: 'Milonga Light',
    dose: '5mg',
    tag: 'The beer at the game',
    rows: [['THC', '5mg THC'], ['CBD', '5mg CBD'], ['mate', 'Natural caffeine + L-Theanine']],
    can: null, // no 5mg can art yet — a slot, never the 10mg can relabelled
  },
  {
    name: 'Milonga Regular',
    dose: '10mg',
    tag: 'The cocktail at the party',
    rows: [['THC', '10mg THC'], ['CBD', '10mg CBD'], ['mate', 'Natural caffeine + L-Theanine']],
    can: { src: '../public/product/can-infused-10mg-peach-cutout.png',
      alt: 'A can of Milonga Yerba Mate, Peach Ginger, 10mg THC and 10mg CBD' },
  },
];

const SECTION_1_ALT =
  'Milonga. Sober October, your way. Taking a month off alcohol doesn’t mean ' +
  'taking a month off your plans. Alcohol-free, hemp-derived THC and CBD in a ' +
  'cold can of yerba mate, made for game nights, dinners and everything in ' +
  'between. A hand pulls a can of Milonga Citrus Mango from a fridge shelf ' +
  'stocked with Peach Ginger, Citrus Mango and Açaí Mint. Shop the cans.';

// The bundle builder's savings ladder and a sample box (see section 3).
const LADDER = [
  { reward: 'Free ship', spend: '$45', reached: true },
  { reward: '$15', spend: '$120' },
  { reward: '$30', spend: '$200' },
  { reward: '$100', spend: '$500' },
];
// $75.79 sits between the first two discs: past $45, 31.79 of the 75 to $120.
const LADDER_FILL = (0 + (75.79 - 45) / (120 - 45)) / (LADDER.length - 1);
const BOX = [
  { name: 'Cannabis Regular 10mg', variant: '6 / Peach Ginger', price: '$40.80',
    img: '../public/product/can-infused-10mg-peach-cutout.png', imgH: 66, tile: FOREST },
  { name: 'The Original Mate Latte', variant: '1 bag', price: '$34.99',
    img: '../public/product/pouch-floating.png', imgH: 70, tile: GOLD },
];

const COMPLIANCE =
  'DRAFT — confirm with counsel before sending. Must be 21+ to purchase. ' +
  'Hemp-derived; contains less than 0.3% delta-9 THC on a dry-weight basis. ' +
  'Contains THC. Do not drive or operate machinery after consuming. Keep out ' +
  'of reach of children and pets. Not for use if pregnant or nursing. These ' +
  'statements have not been evaluated by the Food and Drug Administration.';

// A round badge for a row: THC and CBD are spelled out in the disc, the
// caffeine row takes the yerba mate brand mark.
function Badge(kind) {
  // On the gold cards the discs are forest with the glyph in cream — a filled
  // disc, glyph in the opposite colour, as the system's icon rule asks.
  const disc = { flex: 'none', width: 40, height: 40, borderRadius: 999, background: FOREST,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,53,27,0.25)' };
  if (kind === 'mate') return h('span', { style: disc }, h(M.BrandIcon, { mark: 'yerba-mate', ink: 'cream', size: 26, alt: '' }));
  return h('span', { style: { ...disc, fontFamily: FONT, fontWeight: 900, fontSize: 10.5,
    letterSpacing: '0.04em', color: CREAM } }, kind);
}

function VersionCard(v, i) {
  // Gold cards (Bernat): on gold, gold is never type, so everything on the
  // card is forest — the dose is set apart by slant, not colour.
  return h('div', { key: i, style: {
    position: 'relative', marginTop: i ? 22 : 0, borderRadius: 30, padding: '26px 24px 26px',
    background: 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)',
    border: '1px solid rgba(201,162,78,0.9)', borderTopColor: 'rgba(255,246,214,0.9)',
    boxShadow: '0 22px 40px rgba(0,26,13,0.38), 0 3px 8px rgba(0,26,13,0.22), inset 0 1px 0 rgba(255,246,214,0.8)' } },
    h('div', { style: { textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 30, lineHeight: 1,
        color: FOREST, letterSpacing: '0.01em' } },
        v.name.split(' ')[1].toUpperCase(),
        h('span', { style: { fontWeight: 700, fontStyle: 'italic', fontSize: 22, marginLeft: 8 } }, v.dose)),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 16, color: FOREST,
        marginTop: 8 } }, v.tag),
    ),
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 } },
      h('div', { style: { flex: 1 } },
        v.rows.map(([k, t], j) => h('div', { key: j, style: { display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 12 } }, Badge(k),
          h('span', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 15, lineHeight: 1.25,
            color: FOREST } }, t))),
        h('div', { style: { marginTop: 10 } },
          h(M.Button, { label: 'Shop now', href: '#shop-' + v.dose, bg: 'beige', size: 'md' })),
      ),
      h('div', { style: { flex: '0 0 120px', width: 120, display: 'flex', justifyContent: 'center' } },
        v.can
          ? h('img', { src: v.can.src, alt: v.can.alt, style: { height: 300, width: 'auto', display: 'block',
              filter: 'drop-shadow(0 18px 18px rgba(0,53,27,0.4))' } })
          : h('div', { style: { width: 100, height: 300, borderRadius: 18, border: '1.5px dashed rgba(0,77,39,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: FOREST, opacity: 0.8, padding: 10, boxSizing: 'border-box' } },
              'Light 5mg can cutout'),
      ),
    ),
  );
}

function SoberOctober({ shopHref = '#shop' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE SHELF ─────────────────────────────────────────────────────
    // The fridge shelf is the whole opening section. Its head is crowded —
    // a full row of cans — so a forest scrim holds the type there and lets go
    // above the hand, which is the moment the picture is about. The foot
    // fades into forest so the cards can rise over it.
    h('div', { style: { position: 'relative', height: HERO_H, overflow: 'hidden', background: FOREST } },
      h('img', { src: '../public/product/sober-october-shelf.jpg', alt: SECTION_1_ALT,
        style: { display: 'block', width: 600, height: 'auto' } }),
      h('div', { style: { position: 'absolute', inset: 0,
        // Lighter than a solid band so the top shelf still shows through; the
        // type carries its own shadow for the rest. The foot fades only in
        // the last fifth, so the cards begin on photograph, not on green.
        background: 'linear-gradient(180deg, rgba(0,53,27,0.80) 0%, rgba(0,53,27,0.66) 26%, rgba(0,53,27,0.36) 40%, rgba(0,53,27,0) 52%, rgba(0,77,39,0) 80%, rgba(0,77,39,0.7) 93%, #004D27 100%)' } }),
      h('div', { style: { position: 'absolute', top: 30, left: 40, right: 40, textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,26,13,0.7), 0 1px 2px rgba(0,26,13,0.6)' } },
        h(M.Logo, { tone: 'gold', variant: 'primary', height: 70 }),
        h('div', { style: { marginTop: 22 } },
          h(M.Headline, { line1: 'Sober October,', line2: 'your way.', bg: 'forest',
            size: 40, align: 'center', color: '#FFFFFF', line2Color: GOLD, italic: true })),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
          color: '#FFFFFF', margin: '16px auto 0', maxWidth: 470 } },
          'Taking a month off alcohol doesn’t mean taking a month off your plans. Alcohol-free, hemp-derived THC and CBD in a cold can of yerba mate, made for game nights, dinners and everything in between.'),
        h('div', { style: { marginTop: 22 } },
          h(M.Button, { label: 'Shop the cans', href: shopHref, bg: 'forest', size: 'lg' })),
      ),
    ),

    // ── 2 · THE TWO VERSIONS ──────────────────────────────────────────────
    // Glass cards on the forest paper, the first pulled up CARD_RISE into the
    // shelf's faded foot — the BRÉZ move. Each says what is in the can before
    // anything else: the dose, the two cannabinoids, the caffeine.
    h('div', { style: { ...FOREST_PAPER, position: 'relative', zIndex: 1, display: 'flow-root',
      padding: '0 28px 60px' } },
      h('div', { style: { marginTop: -CARD_RISE } }, VERSIONS.map(VersionCard)),
    ),

    // ── 3 · THE BUNDLE BUILDER ────────────────────────────────────────────
    // A picture of the builder as it looks on the site — the "My Bundle"
    // panel — redrawn in Milonga's colours rather than the app's lime: the
    // savings ladder, two items in the box, how far the next reward is, and
    // the subscribe line. The tiers are the site's (screenshot, 2026-10-13):
    // free shipping at $45, $15 off at $120, $30 off at $200, $100 off at
    // $500. The sample box is real catalogue: a Regular 10mg 6-pack ($40.80)
    // and one bag of the Mate Latte ($34.99) = $75.79, $44.21 short of $15 off.
    h('div', { style: { padding: '60px 28px 52px', textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: FOREST, marginBottom: 14 } }, 'Bundle builder'),
      h(M.Headline, { line1: 'Build your own', line2: 'bundle & save.', bg: 'beige', size: 40, align: 'center', italic: true }),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
        color: '#12331F', maxWidth: 460, margin: '16px auto 0' } },
        'Mix the cans, the Mate Latte and the variety packs in one box. The more you add, the more you save: free shipping from $45 and up to $100 off.'),

      // The panel.
      h('div', { style: { marginTop: 30, textAlign: 'left', background: '#FFFFFF', borderRadius: 28,
        padding: '26px 22px 24px', border: '1px solid rgba(0,77,39,0.12)',
        boxShadow: '0 18px 34px rgba(0,53,27,0.16), 0 3px 8px rgba(0,53,27,0.10)' } },
        h('div', { style: { textAlign: 'center' } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 26, color: FOREST,
            textTransform: 'uppercase', letterSpacing: '0.01em' } }, 'My bundle'),
          h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 14, color: '#3B5344', marginTop: 4 } },
            'Build your own bundle and save')),

        // The savings ladder: a forest track filled in gold to the sample
        // total, a disc per reward, the spend under each.
        h('div', { style: { position: 'relative', margin: '30px 8px 0', height: 64 } },
          h('div', { style: { position: 'absolute', left: 18, right: 18, top: 16, height: 8, borderRadius: 999,
            background: 'rgba(0,77,39,0.12)' } }),
          h('div', { style: { position: 'absolute', left: 18, top: 16, height: 8, borderRadius: 999,
            width: `calc((100% - 36px) * ${LADDER_FILL})`,
            background: 'linear-gradient(90deg, #C9A24E, #E3BC62)' } }),
          LADDER.map((t, i) => h('div', { key: i, style: { position: 'absolute', top: 0,
            left: `calc(18px + (100% - 36px) * ${i / (LADDER.length - 1)})`, transform: 'translateX(-50%)',
            textAlign: 'center', width: 96 } },
            h('div', { style: { width: 40, height: 40, margin: '0 auto', borderRadius: 999,
              background: t.reached ? FOREST : '#FFFFFF', border: `2px solid ${t.reached ? FOREST : 'rgba(0,77,39,0.35)'}`,
              boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT, fontWeight: 900, fontSize: t.reward.length > 4 ? 8.5 : 11, lineHeight: 1.05,
              color: t.reached ? GOLD : FOREST, textAlign: 'center',
              boxShadow: t.reached ? '0 3px 8px rgba(0,53,27,0.25)' : 'none' } }, t.reward),
            h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 12, color: '#3B5344', marginTop: 6 } }, t.spend))),
        ),

        // Two items in the box.
        h('div', { style: { marginTop: 18 } },
          BOX.map((it, i) => h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px', marginTop: i ? 10 : 0, borderRadius: 18, border: '1px solid rgba(0,77,39,0.12)' } },
            h('div', { style: { flex: 'none', width: 72, height: 72, borderRadius: 14, background: it.tile,
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' } },
              h('img', { src: it.img, alt: '', style: { height: it.imgH, width: 'auto', display: 'block' } })),
            h('div', { style: { flex: 1 } },
              h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 15, color: FOREST } }, it.name),
              h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: '#3B5344', marginTop: 3 } }, it.variant)),
            h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 16, color: FOREST } }, it.price),
          ))),

        // The nudge, then the subscribe line, then the button.
        h('div', { style: { marginTop: 16, borderRadius: 999, background: FOREST, padding: '12px 16px',
          textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 13, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: GOLD } }, 'You’re $44.21 away from $15 off'),
        h('div', { style: { marginTop: 10, borderRadius: 18, border: '1.5px solid ' + FOREST, padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 } },
          h('div', null,
            h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 14, color: FOREST } }, 'Subscribe & save'),
            h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 12.5, color: '#3B5344', marginTop: 2 } },
              'Save 20%. Free shipping. Cancel anytime.')),
          h('span', { style: { flex: 'none', background: GOLD, color: FOREST, borderRadius: 999, padding: '6px 12px',
            fontFamily: FONT, fontWeight: 900, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' } }, '20% off')),
        h('div', { style: { marginTop: 20, textAlign: 'center' } },
          h(M.Button, { label: 'Build my bundle', href: '#bundle', bg: 'beige', size: 'lg' })),
      ),
    ),

    h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
