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
// The hand and its can end near 570; the button's pool starts just under.
const CTA_TOP = 572;

const VERSIONS = [
  {
    name: 'Milonga Light',
    dose: '5mg',
    tag: 'The beer at the game',
    rows: [['THC', '5mg THC'], ['CBD', '5mg CBD'], ['mate', 'Natural caffeine'], ['theanine', 'L-Theanine']],
    can: { src: '../public/product/can-infused-5mg-studio.png',
      alt: 'A can of Milonga Yerba Mate, Peach Ginger, 5mg THC and 5mg CBD' },
  },
  {
    name: 'Milonga Regular',
    dose: '10mg',
    tag: 'The cocktail at the party',
    rows: [['THC', '10mg THC'], ['CBD', '10mg CBD'], ['mate', 'Natural caffeine'], ['theanine', 'L-Theanine']],
    can: { src: '../public/product/can-infused-10mg-studio.png',
      alt: 'A can of Milonga Yerba Mate, Peach Ginger, 10mg THC and 10mg CBD' },
  },
];

const SECTION_1_ALT =
  'Milonga. Sober October, your way. Taking a break from alcohol doesn’t mean ' +
  'taking a break from the fun. Keep your plans, skip the booze, and enjoy a ' +
  'refreshing can of yerba mate. Made for game nights, dinner parties, and every ' +
  'moment in between, without sacrificing how you feel the next day. A hand ' +
  'pulls a can of Milonga Citrus Mango from a fridge shelf stocked with Peach ' +
  'Ginger, Citrus Mango and Açaí Mint. Shop the cans.';

// The bundle builder's savings ladder and the box Bernat built on the site
// (see section 3).
const LADDER = [
  { reward: 'Free ship', spend: '$45', reached: true },
  { reward: '$15', spend: '$120', reached: true },
  { reward: '$30', spend: '$200', reached: true },
  { reward: '$100', spend: '$500' },
];
const BOX = [
  { name: 'Cannabis Regular 10mg', variant: '12-pack · Açaí Mint', price: 78.00,
    img: '../public/product/bundle-acai-mint-10mg.jpg' },
  { name: 'Cannabis Regular 10mg', variant: '24-pack · Citrus Mango', price: 149.00,
    img: '../public/product/bundle-citrus-mango-10mg.jpg' },
];
// $78.00 + $149.00 = $227.00: past the $30 rung at $200, 27 of the 300 to $500.
const SUBTOTAL = BOX.reduce((a, it) => a + it.price, 0);
const LADDER_FILL = (2 + (SUBTOTAL - 200) / (500 - 200)) / (LADDER.length - 1);
const TIER_OFF = 30;
// One-time: $227.00 less the $30 rung = $197.00.
const ONE_TIME = SUBTOTAL - TIER_OFF;
// Subscribe & save: 20% off the box ($181.60), then the same $30 rung, which
// the builder awards on the box's value before the subscription discount =
// $151.60, $75.40 saved. CONFIRM with the app that the rung is measured
// before the 20%; measured after it, $181.60 sits on the $15 rung ($166.60).
const SUBSCRIBE = SUBTOTAL * 0.8 - TIER_OFF;
const usd = (n) => '$' + n.toFixed(2);

const COMPLIANCE =
  'DRAFT — confirm with counsel before sending. Must be 21+ to purchase. ' +
  'Hemp-derived; contains less than 0.3% delta-9 THC on a dry-weight basis. ' +
  'Contains THC. Do not drive or operate machinery after consuming. Keep out ' +
  'of reach of children and pets. Not for use if pregnant or nursing. These ' +
  'statements have not been evaluated by the Food and Drug Administration.';

// Line glyphs for the two cannabinoid discs, drawn in cream on forest.
// THC rises — an arrow climbing out of a step, with a spark at its tip.
// CBD settles — three soft waves. Mood, not effect: neither says what the
// can does to you, so neither is a claim.
const GLYPH = { fill: 'none', stroke: CREAM, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const GLYPHS = {
  THC: h('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
    h('path', { ...GLYPH, d: 'M4 18 L10 12 L13.5 15 L19 8.5' }),
    h('path', { ...GLYPH, d: 'M14.5 8 H19.5 V13' }),
    h('path', { ...GLYPH, strokeWidth: 1.8, d: 'M6 4.5 V8 M4.25 6.25 H7.75' })),
  CBD: h('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
    h('path', { ...GLYPH, d: 'M3 8 C6 5.5 8.5 5.5 12 8 S18 10.5 21 8' }),
    h('path', { ...GLYPH, d: 'M3 13 C6 10.5 8.5 10.5 12 13 S18 15.5 21 13' }),
    h('path', { ...GLYPH, d: 'M3 18 C6 15.5 8.5 15.5 12 18 S18 20.5 21 18' })),
};

// A round badge for a row: a drawn glyph for THC and CBD, the brand marks
// for the caffeine (yerba mate) and the L-Theanine.
function Badge(kind) {
  // On the gold cards the discs are forest with the glyph in cream — a filled
  // disc, glyph in the opposite colour, as the system's icon rule asks.
  const disc = { flex: 'none', width: 40, height: 40, borderRadius: 999, background: FOREST,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,53,27,0.25)' };
  if (kind === 'mate') return h('span', { style: disc }, h(M.BrandIcon, { mark: 'yerba-mate', ink: 'cream', size: 26, alt: '' }));
  if (kind === 'theanine') return h('span', { style: disc }, h(M.BrandIcon, { mark: 'l-theanine', ink: 'cream', size: 26, alt: '' }));
  return h('span', { style: disc }, GLYPHS[kind]);
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
      h('div', { style: { flex: '0 0 130px', width: 130, display: 'flex', justifyContent: 'center' } },
        h('img', { src: v.can.src, alt: v.can.alt, style: { height: 320, width: 'auto', display: 'block',
          filter: 'drop-shadow(0 18px 18px rgba(0,53,27,0.4))' } }),
      ),
    ),
  );
}

// One way to pay for the box: title and note on the left, the full price
// struck through over what the order comes to, and the saving in a chip.
// The subscribe row is the featured one, filled gold; on gold all type is
// forest, and the chip flips to forest with gold type.
function PriceRow({ title, note, was, now, featured }) {
  return h('div', { style: { marginTop: 10, borderRadius: 18, padding: '14px 16px',
    background: featured ? 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 60%, #D8AE52 100%)' : '#FFFFFF',
    border: featured ? '1px solid rgba(201,162,78,0.9)' : '1.5px solid ' + FOREST,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 } },
    h('div', { style: { flex: 1 } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 15, color: FOREST } }, title),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 12.5, lineHeight: 1.35,
        color: featured ? FOREST : '#3B5344', marginTop: 3 } }, note),
      h('span', { style: { display: 'inline-block', marginTop: 8, borderRadius: 999, padding: '5px 10px',
        background: featured ? FOREST : 'rgba(0,77,39,0.10)', color: featured ? GOLD : FOREST,
        fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase' } },
        'You save ' + usd(was - now))),
    h('div', { style: { flex: 'none', textAlign: 'right' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: featured ? FOREST : '#3B5344',
        textDecoration: 'line-through', opacity: 0.75 } }, usd(was)),
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 24, lineHeight: 1.1, color: FOREST } }, usd(now))),
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
      h('div', { style: { position: 'absolute', top: 20, left: 36, right: 36, textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,26,13,0.7), 0 1px 2px rgba(0,26,13,0.6)' } },
        h(M.Logo, { tone: 'gold', variant: 'primary', height: 70 }),
        h('div', { style: { marginTop: 16 } },
          h(M.Headline, { line1: 'Sober October,', line2: 'your way.', bg: 'forest',
            size: 40, align: 'center', color: '#FFFFFF', line2Color: GOLD, italic: true })),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
          color: '#FFFFFF', margin: '12px auto 0', maxWidth: 500 } },
          'Taking a break from alcohol doesn’t mean taking a break from the fun. Keep your plans, skip the booze, and enjoy a refreshing can of yerba mate. Made for game nights, dinner parties, and every moment in between, without sacrificing how you feel the next day.'),
      ),
      // The button sits just under the hand and its can (Bernat), on the
      // shelf lip, so the eye runs title → hand → button. The cans behind it
      // are busy, so a soft forest pool sits under the button to seat it.
      h('div', { style: { position: 'absolute', top: CTA_TOP, left: 0, right: 0, height: 120,
        background: 'radial-gradient(ellipse 52% 50% at 50% 50%, rgba(0,38,19,0.72) 0%, rgba(0,38,19,0.45) 50%, rgba(0,38,19,0) 100%)' } }),
      h('div', { style: { position: 'absolute', top: CTA_TOP + 32, left: 0, right: 0, textAlign: 'center' } },
        h('div', { style: { display: 'inline-block', borderRadius: 999,
          boxShadow: '0 10px 24px rgba(0,26,13,0.55), 0 2px 6px rgba(0,26,13,0.45)' } },
          h(M.Button, { label: 'Shop the cans', href: shopHref, bg: 'forest', size: 'lg' }))),
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
    // $500. The box is the one Bernat built on the site: Regular 10mg, a
    // 12-pack of Açaí Mint ($78.00) and a 24-pack of Citrus Mango ($149.00) —
    // $227.00, $30 off unlocked, $273.00 short of $100 off. Under the box,
    // what the order costs one-time and on subscribe & save, and the saving.
    h('div', { style: { padding: '60px 28px 52px', textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: FOREST, marginBottom: 14 } }, 'Bundle builder'),
      h(M.Headline, { line1: 'Build your own', line2: 'bundle & save.', bg: 'beige', size: 40, align: 'center', italic: true }),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
        color: '#12331F', maxWidth: 460, margin: '16px auto 0' } },
        'Build your perfect Milonga bundle. Mix and match your favorite flavors and doses in one box. The more you add, the more you save, with free shipping on orders over $45 and up to $100 off.'),

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

        // The two items in the box, each marked added, as on the site.
        h('div', { style: { marginTop: 18 } },
          BOX.map((it, i) => h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px', marginTop: i ? 10 : 0, borderRadius: 18, border: '1px solid rgba(0,77,39,0.12)' } },
            h('img', { src: it.img, alt: '', style: { flex: 'none', width: 72, height: 72, borderRadius: 14,
              display: 'block', objectFit: 'cover' } }),
            h('div', { style: { flex: 1 } },
              h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 15, color: FOREST } }, it.name),
              h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: '#3B5344', marginTop: 3 } }, it.variant),
              h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 7,
                fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: FOREST } },
                h('svg', { width: 13, height: 13, viewBox: '0 0 14 14' },
                  h('circle', { cx: 7, cy: 7, r: 7, fill: FOREST }),
                  h('path', { d: 'M4 7.2 L6.1 9.2 L10 5', fill: 'none', stroke: GOLD, strokeWidth: 1.8,
                    strokeLinecap: 'round', strokeLinejoin: 'round' })),
                'Added')),
            h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 16, color: FOREST } }, usd(it.price)),
          ))),

        // Where the box stands on the ladder.
        h('div', { style: { marginTop: 16, borderRadius: 999, background: FOREST, padding: '12px 16px',
          textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 13, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: GOLD } },
          `$${TIER_OFF} off unlocked · ${usd(500 - SUBTOTAL)} away from $100 off`),

        // The order, two ways: one-time and subscribe & save, each struck
        // through from the box's full price, with what it saves.
        PriceRow({ title: 'One-time purchase', note: `Free shipping + $${TIER_OFF} bundle savings`,
          was: SUBTOTAL, now: ONE_TIME, featured: false }),
        PriceRow({ title: 'Subscribe & save', note: `20% off + $${TIER_OFF} bundle savings. Free shipping. Cancel anytime.`,
          was: SUBTOTAL, now: SUBSCRIBE, featured: true }),
        h('div', { style: { marginTop: 20, textAlign: 'center' } },
          h(M.Button, { label: 'Build my bundle', href: '#bundle', bg: 'beige', size: 'lg' })),
      ),
    ),

    h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
