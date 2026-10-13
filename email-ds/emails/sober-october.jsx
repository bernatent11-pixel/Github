// SOBER OCTOBER — the infused cans, Light 5mg and Regular 10mg.
//
// Subject: Sober October, Minus The Boring Part 🌿
// Preview: Alcohol-free THC + CBD yerba mate in 5mg and 10mg — or build your own 6-pack.
//
// THE STANDING RULE IS SET ASIDE FOR THIS CAMPAIGN ONLY, at Bernat's
// request: every other Milonga email still never mentions THC, CBD, cannabis
// or weed. This one is about the infused line, so it has to.
//
// Facts are Shopify's (read 2026-10-13): Cannabis Light — 5mg THC, 5mg CBD;
// Cannabis Regular — 10mg THC, 10mg CBD; both with 110mg of naturally
// occurring caffeine from yerba mate and L-Theanine, in Açaí Mint, Citrus
// Mango and Peach Ginger. 6-packs $34.80 (Light) and $40.80 (Regular). The
// Bundle Builder's 6-pack is $42 (its placeholder product). Shopify's own
// copy calls L-Theanine "for stress relief"; that is a health claim and is
// not repeated here.
//
// Three acts, after the BRÉZ section Bernat sent: the shelf photograph with
// the wordmark, title, paragraph and button over its head; the photo fading
// into forest, where the two versions ride up over it as glass cards listing
// what each can holds; then the bundle builder on beige, and a footer with
// the 21+ and hemp disclosures.
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
const CARD_RISE = 150;

const VERSIONS = [
  {
    name: 'Milonga Light',
    dose: '5mg',
    tag: 'The beer at the game',
    rows: [['THC', '5mg THC'], ['CBD', '5mg CBD'], ['mate', 'Natural caffeine + L-Theanine']],
    price: '6-pack · $34.80',
    can: null, // no 5mg can art yet — a slot, never the 10mg can relabelled
  },
  {
    name: 'Milonga Regular',
    dose: '10mg',
    tag: 'The cocktail at the party',
    rows: [['THC', '10mg THC'], ['CBD', '10mg CBD'], ['mate', 'Natural caffeine + L-Theanine']],
    price: '6-pack · $40.80',
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

const COMPLIANCE =
  'DRAFT — confirm with counsel before sending. Must be 21+ to purchase. ' +
  'Hemp-derived; contains less than 0.3% delta-9 THC on a dry-weight basis. ' +
  'Contains THC. Do not drive or operate machinery after consuming. Keep out ' +
  'of reach of children and pets. Not for use if pregnant or nursing. These ' +
  'statements have not been evaluated by the Food and Drug Administration.';

// A round badge for a row: THC and CBD are spelled out in the disc, the
// caffeine row takes the yerba mate brand mark.
function Badge(kind) {
  const disc = { flex: 'none', width: 40, height: 40, borderRadius: 999, background: CREAM,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 6px rgba(0,26,13,0.25)' };
  if (kind === 'mate') return h('span', { style: disc }, h(M.BrandIcon, { mark: 'yerba-mate', ink: 'forest', size: 26, alt: '' }));
  return h('span', { style: { ...disc, fontFamily: FONT, fontWeight: 900, fontSize: 10.5,
    letterSpacing: '0.04em', color: FOREST } }, kind);
}

function VersionCard(v, i) {
  return h('div', { key: i, style: {
    position: 'relative', marginTop: i ? 22 : 0, borderRadius: 30, padding: '26px 24px 26px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.10) 100%)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.30)', borderTopColor: 'rgba(255,255,255,0.55)',
    boxShadow: '0 22px 40px rgba(0,26,13,0.38), 0 3px 8px rgba(0,26,13,0.22)' } },
    h('div', { style: { textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 30, lineHeight: 1,
        color: '#FFFFFF', letterSpacing: '0.01em' } },
        v.name.split(' ')[1].toUpperCase(),
        h('span', { style: { fontWeight: 700, fontStyle: 'italic', color: GOLD, fontSize: 22, marginLeft: 8 } }, v.dose)),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, color: '#FFFFFF',
        opacity: 0.88, marginTop: 8 } }, v.tag),
    ),
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 } },
      h('div', { style: { flex: 1 } },
        v.rows.map(([k, t], j) => h('div', { key: j, style: { display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 12 } }, Badge(k),
          h('span', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 15, lineHeight: 1.25,
            color: '#FFFFFF' } }, t))),
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 13, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: GOLD, margin: '6px 0 14px' } }, v.price),
        h(M.Button, { label: 'Shop now', href: '#shop-' + v.dose, bg: 'forest', size: 'md' }),
      ),
      h('div', { style: { flex: '0 0 120px', width: 120, display: 'flex', justifyContent: 'center' } },
        v.can
          ? h('img', { src: v.can.src, alt: v.can.alt, style: { height: 300, width: 'auto', display: 'block',
              filter: 'drop-shadow(0 18px 18px rgba(0,26,13,0.45))' } })
          : h('div', { style: { width: 100, height: 300, borderRadius: 18, border: '1.5px dashed rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#FFFFFF', opacity: 0.75, padding: 10, boxSizing: 'border-box' } },
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
        background: 'linear-gradient(180deg, rgba(0,53,27,0.94) 0%, rgba(0,53,27,0.9) 30%, rgba(0,53,27,0.55) 42%, rgba(0,53,27,0) 54%, rgba(0,77,39,0) 70%, rgba(0,77,39,0.75) 88%, #004D27 100%)' } }),
      h('div', { style: { position: 'absolute', top: 30, left: 40, right: 40, textAlign: 'center' } },
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
    // Beige, forest type, one gold card: build your own 6-pack from any of
    // the three flavors. The flavor chips carry each can's own band colour.
    h('div', { style: { padding: '60px 28px 52px', textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: FOREST, marginBottom: 14 } }, 'Bundle builder'),
      h(M.Headline, { line1: 'Build your', line2: 'own 6-pack.', bg: 'beige', size: 40, align: 'center', italic: true }),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
        color: '#12331F', maxWidth: 440, margin: '16px auto 0' } },
        'Can’t pick a favorite? Mix Peach Ginger, Citrus Mango and Açaí Mint in one box, any way you like.'),
      h('div', { style: { marginTop: 30, borderRadius: 28, padding: '28px 24px 30px',
        background: 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)',
        boxShadow: '0 18px 34px rgba(0,53,27,0.22), 0 3px 8px rgba(0,53,27,0.14), inset 0 1px 0 rgba(255,246,214,0.8)' } },
        h('div', { style: { display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' } },
          [['Peach Ginger', '#E8873A'], ['Citrus Mango', '#F2B233'], ['Açaí Mint', '#6E3D8F']].map(([t, c], i) =>
            h('span', { key: i, style: { display: 'inline-flex', alignItems: 'center', gap: 8,
              background: CREAM, borderRadius: 999, padding: '8px 14px 8px 10px',
              fontFamily: FONT, fontWeight: 900, fontSize: 11.5, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: FOREST, boxShadow: '0 2px 6px rgba(0,53,27,0.14)' } },
              h('span', { style: { width: 12, height: 12, borderRadius: 999, background: c } }), t))),
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 44, lineHeight: 1,
          color: FOREST, marginTop: 22 } }, '$42',
          h('span', { style: { fontSize: 16, fontWeight: 700, marginLeft: 8 } }, 'for 6 cans')),
        h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 14, color: FOREST, marginTop: 8 } },
          'Any mix of the three flavors'),
        h('div', { style: { marginTop: 22 } },
          h(M.Button, { label: 'Build my 6-pack', href: '#bundle', bg: 'beige', size: 'lg' })),
      ),
    ),

    h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
