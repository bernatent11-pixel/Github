// TRICK OR TREAT YOURSELF — the Halloween sale: up to 30% off sitewide (the
// Party Pack XL is the 30%; everything else is up to 25%), with a timer.
//
// Every price is Shopify's, read 2026-10-25 (price vs compare-at):
//   Halloween Party Pack 24  $103.80 / $138.40  (25% off)
//   Halloween Party Pack 48  $167.72 / $239.60  (30% off)
//   Lion's Mane       12 $42.84/$50.40 (15%) · 24 $60.48/$75.60 (20%) · 48 $113.40/$151.20 (25%)
//   Regular 10mg      12 $66.30/$78.00 (15%) · 24 $119.20/$149.00 (20%) · 48 $213.75/$285.00 (25%)
//   Variety 24-packs  Lion's Mane $56.70/$75.60 · Regular $111.75/$149.00 (25%)
//   Mate Latte        30 servings $62.98/$69.98 (10%) · 60 $118.96/$139.96 (15%)
// The Lion's Mane 48-pack is $113.40 in Açaí Mint and $113.48 in the other
// two flavours; the card shows $113.40 until Shopify is made consistent.
// The Party Pack's contents and specs are its product page's.
//
// Layout is Bernat's: section 1 his orange lineup picture with the white
// logo, title, offer and button over its open head; section 2 the same
// orange, the Party Pack box, a By Day / By Night pill for each mate and
// the two tiers; section 3 the two variety-pack boxes, each card with its
// price ladder, every pack's price, and its own button.
//
// THE TIMER IS A STAND-IN. The digits are drawn for the layout only; in
// Klaviyo the band is replaced by a live countdown to the sale's end.
//
// THC AND CBD ARE NAMED (Social Mate is the 10mg infused can), so this goes
// only to the audience cleared for the infused line, with the disclosures.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const DEEP = '#00351B';
const GOLD = '#E3BC62';
const INK = '#12331F';
const INK_SOFT = '#3B5344';
const FONT = 'Gotham, Montserrat, sans-serif';
const GOLD_FILL = 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)';
// The orange of the lineup picture's foot, measured from its last rows, so
// section 2 carries straight on from it.
const ORANGE = '#DA5813';

const SALE_END = 'October 31 at 11:59 PM ET'; // TO CONFIRM with Bernat

// The lineup picture is 1333 x 2000, drawn 600 wide: 900 units.
const HERO_H = 900;

const SECTION_1_ALT =
  'Milonga. Trick or treat yourself. Up to 30% off sitewide. Shop the sale. ' +
  'The Milonga lineup on an orange Halloween backdrop with friendly ghosts and ' +
  'autumn leaves: the Lion’s Mane cans and the Social Mate 10mg cans in Citrus ' +
  'Mango, Peach Ginger and Açaí Mint around a pouch of Mate Latte.';

const MATES = [
  { when: 'By day', icon: 'sun', name: 'Lion’s Mane Mate', benefit: 'Clean energy, focus and calm for costume-making, pumpkin carving and getting ready.',
    spec: '100mg natural caffeine · 1,000mg Lion’s Mane · 220mg L-Theanine' },
  { when: 'By night', icon: 'moon', name: 'Social Mate', benefit: 'An uplifting herbal experience for when the party starts, no alcohol needed.',
    spec: ['10mg THC + 10mg CBD ', h('span', { key: 'h', style: { whiteSpace: 'nowrap' } }, '(hemp-derived)'), ' · 110mg natural caffeine · 220mg L-Theanine'] },
];
const TIERS = [
  { name: 'Party Pack', size: '24-pack', price: '$103.80', was: '$138.40', save: '25%',
    contents: ['12 cans of Lion’s Mane', '12 cans of Social Mate', '1 Milonga bucket hat'] },
  { name: 'Party Pack XL', size: '48-pack', price: '$167.72', was: '$239.60', save: '30%',
    contents: ['24 cans of Lion’s Mane', '24 cans of Social Mate', '2 Milonga bucket hats'], best: true },
];
const LINES = [
  { name: 'Lion’s Mane Mate', img: '../public/product/variety-24-lions-mane.jpg', href: '#lions-mane', cta: 'Shop Lion’s Mane',
    alt: 'A 24 variety pack of Milonga Lion’s Mane cans in Açaí Mint, Peach Ginger and Citrus Mango, with ghosts and autumn leaves on green.',
    packs: [['12-pack', '15%', '$42.84', '$50.40'], ['24-pack', '20%', '$60.48', '$75.60'], ['48-pack', '25%', '$113.40', '$151.20']],
    variety: ['Variety 24-pack', '25%', '$56.70', '$75.60'] },
  { name: 'Social Mate 10mg', img: '../public/product/variety-24-social-mate.jpg', href: '#social-mate', cta: 'Shop Social Mate',
    alt: 'A 24 variety pack of Milonga Social Mate cans, 10mg THC and 10mg CBD, in Açaí Mint, Peach Ginger and Citrus Mango, with ghosts and autumn leaves on cream.',
    packs: [['12-pack', '15%', '$66.30', '$78.00'], ['24-pack', '20%', '$119.20', '$149.00'], ['48-pack', '25%', '$213.75', '$285.00']],
    variety: ['Variety 24-pack', '25%', '$111.75', '$149.00'] },
];
const LATTE = { name: 'The Mate Latte', img: '../public/product/pouch-mate-latte-vanilla-packshot.png', href: '#mate-latte',
  packs: [['30 servings', '10%', '$62.98', '$69.98'], ['60 servings', '15%', '$118.96', '$139.96']] };

const COMPLIANCE =
  'DRAFT — confirm with counsel before sending. Sale prices as marked on ' +
  'milonga.life until ' + SALE_END + ', while supplies last. Up to 30% off ' +
  'applies to the Halloween Party Pack XL; other products are up to 25% off. ' +
  'Social Mate is for 21+ only. Hemp-derived; contains less than 0.3% delta-9 ' +
  'THC on a dry-weight basis. Contains THC. Contains caffeine. Do not drive or ' +
  'operate machinery after consuming. Keep out of reach of children and pets. ' +
  'Not for use if pregnant or nursing. These statements have not been evaluated ' +
  'by the Food and Drug Administration.';

const eyebrow = (t, color, mb = 14) => h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
  letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: mb } }, t);
const para = (t, color, max = 470) => h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
  lineHeight: 1.5, color, maxWidth: max, margin: '16px auto 0' } }, t);
const strike = (t, color) => h('span', { style: { textDecoration: 'line-through', fontWeight: 600, color, opacity: 0.7 } }, t);
// Units stay lower case: "10mg", never "10MG".
const units = (t) => t.split(/(\d+mg)/).map((x, k) => k % 2 ? h('span', { key: k, style: { textTransform: 'none' } }, x) : x);
const TITLE_SHADOW = '0 3px 14px rgba(90,25,0,0.45), 0 1px 3px rgba(90,25,0,0.35)';

const ICONS = {
  sun: h('svg', { width: 22, height: 22, viewBox: '0 0 24 24' },
    h('circle', { cx: 12, cy: 12, r: 4.2, fill: GOLD }),
    h('path', { d: 'M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8',
      stroke: GOLD, strokeWidth: 2, strokeLinecap: 'round' })),
  moon: h('svg', { width: 22, height: 22, viewBox: '0 0 24 24' },
    h('path', { d: 'M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z', fill: GOLD }),
    h('path', { d: 'M17.5 3.5v2.4M16.3 4.7h2.4', stroke: GOLD, strokeWidth: 1.6, strokeLinecap: 'round' })),
};

// The countdown, as drawn for the layout: four tiles on the orange.
function Timer() {
  const u = [['06', 'Days'], ['12', 'Hours'], ['00', 'Mins'], ['00', 'Secs']];
  return h('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 10 } },
    u.map(([n, l], i) => [
      i ? h('div', { key: 'c' + i, style: { fontFamily: FONT, fontWeight: 900, fontSize: 34, color: '#FFFFFF',
        lineHeight: '70px', opacity: 0.8 } }, ':') : null,
      h('div', { key: i, style: { textAlign: 'center' } },
        h('div', { style: { width: 84, height: 74, borderRadius: 16, background: DEEP, boxSizing: 'border-box',
          border: '1.5px solid rgba(227,188,98,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 20px rgba(90,25,0,0.35)', fontFamily: FONT, fontWeight: 900, fontSize: 38, color: '#FFFFFF' } }, n),
        h('div', { style: { fontFamily: FONT, fontWeight: 800, fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8 } }, l)),
    ]));
}

// By Day / By Night: a pill per mate — the icon chip, then what it does.
function MatePill(m, i) {
  return h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: i ? 12 : 0,
    background: '#FFFFFF', borderRadius: 999, padding: '12px 22px 12px 12px', textAlign: 'left',
    boxShadow: '0 12px 24px rgba(90,25,0,0.22), 0 2px 5px rgba(90,25,0,0.15)' } },
    h('div', { style: { flex: 'none', width: 108, height: 84, borderRadius: 999, background: FOREST,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 } },
      ICONS[m.icon],
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: GOLD } }, m.when)),
    h('div', { style: { flex: 1 } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: FOREST } }, m.name),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 13.5, lineHeight: 1.4, color: INK, marginTop: 4 } }, m.benefit),
      h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 11.5, lineHeight: 1.4, color: FOREST, marginTop: 5 } }, m.spec)));
}

function TierCard(t, i) {
  // The XL is the featured tier: gold fill, all type forest.
  const gold = t.best;
  return h('div', { key: i, style: { flex: 1, position: 'relative', borderRadius: 24, padding: '26px 16px 22px',
    textAlign: 'center', background: gold ? GOLD_FILL : '#FFFFFF',
    border: gold ? '1px solid rgba(201,162,78,0.9)' : 'none',
    boxShadow: '0 16px 30px rgba(90,25,0,0.25), 0 3px 8px rgba(90,25,0,0.15)' } },
    h('span', { style: { position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
      background: FOREST, color: GOLD, borderRadius: 999, padding: '6px 12px', fontFamily: FONT, fontWeight: 900,
      fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' } }, 'Save ' + t.save),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 19, textTransform: 'uppercase', color: FOREST } }, t.name),
    h('div', { style: { fontFamily: FONT, fontWeight: 700, fontStyle: 'italic', fontSize: 14, color: FOREST, marginTop: 4 } }, t.size),
    h('div', { style: { marginTop: 12, fontFamily: FONT, fontSize: 14 } }, strike(t.was, FOREST)),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 32, lineHeight: 1.05, color: FOREST } }, t.price),
    h('div', { style: { marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,77,39,0.18)' } },
      t.contents.map((c, k) => h('div', { key: k, style: { fontFamily: FONT, fontWeight: 700, fontSize: 13, lineHeight: 1.35,
        color: FOREST, marginTop: k ? 5 : 0 } }, c))));
}

// One price row: pack, saving, struck full price, sale price.
function PriceRow([pack, save, price, was], k, last) {
  return h('div', { key: k, style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6,
    padding: '9px 0', borderTop: k ? '1px solid rgba(0,77,39,0.10)' : 'none' } },
    h('div', { style: { fontFamily: FONT, fontWeight: 800, fontSize: 13, color: FOREST } },
      pack.split(' ').flatMap((w, j) => [j ? ' ' : null, h('span', { key: j, style: { whiteSpace: 'nowrap' } }, w)]),
      h('span', { style: { fontWeight: 700, fontSize: 11, color: INK_SOFT, marginLeft: 5 } }, '−' + save)),
    h('div', { style: { fontFamily: FONT, fontSize: 12, whiteSpace: 'nowrap' } }, strike(was, INK_SOFT),
      h('span', { style: { fontWeight: 900, fontSize: 15, color: FOREST, marginLeft: 6 } }, price)));
}

function LineCard(l, i) {
  return h('div', { key: i, style: { flex: 1, background: '#FFFFFF', borderRadius: 24, overflow: 'hidden', textAlign: 'center',
    boxShadow: '0 16px 30px rgba(0,26,13,0.30), 0 3px 8px rgba(0,26,13,0.2)' } },
    h('img', { src: l.img, alt: l.alt, style: { display: 'block', width: '100%', height: 'auto' } }),
    h('div', { style: { padding: '16px 14px 20px' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 16, textTransform: 'uppercase', color: FOREST } }, units(l.name)),
      h('div', { style: { display: 'inline-block', marginTop: 10, background: FOREST, color: GOLD, borderRadius: 999,
        padding: '6px 12px', fontFamily: FONT, fontWeight: 900, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' } },
        'Up to 25% off'),
      h('div', { style: { marginTop: 10, textAlign: 'left' } },
        l.packs.map((p, k) => PriceRow(p, k)),
        h('div', { style: { marginTop: 4, background: 'rgba(227,188,98,0.18)', borderRadius: 12, padding: '0 10px' } },
          PriceRow(l.variety, 0))),
      h('div', { style: { marginTop: 16 } }, h(M.Button, { label: l.cta, href: l.href, bg: 'beige', size: 'md' }))));
}

function HalloweenSale({ shopHref = '#shop', packHref = '#party-pack' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · TRICK OR TREAT YOURSELF ───────────────────────────────────────
    // Bernat's orange lineup. The products start about 340 units down, so
    // the white logo, the title, the offer and the button sit in its open
    // head; its foot fades into the flat ORANGE the next block continues.
    h('div', { style: { position: 'relative', height: HERO_H, overflow: 'hidden', background: ORANGE } },
      h('img', { src: '../public/product/halloween-orange-lineup.jpg', alt: SECTION_1_ALT,
        style: { position: 'absolute', top: 0, left: 0, width: 600, height: 'auto', display: 'block' } }),
      h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 60,
        background: `linear-gradient(180deg, rgba(218,88,19,0) 0%, ${ORANGE} 100%)` } }),
      h('div', { style: { position: 'absolute', top: 16, left: 30, right: 30, textAlign: 'center' } },
        h(M.Logo, { tone: 'white', variant: 'primary', height: 86 }),
        h('div', { style: { marginTop: 10, textShadow: TITLE_SHADOW, fontFamily: FONT, fontWeight: 900, fontSize: 46,
          lineHeight: 1.0, textTransform: 'uppercase', color: '#FFFFFF' } },
          h('div', null, 'Trick or'),
          h('div', { style: { fontStyle: 'italic', fontWeight: 800, marginTop: 3 } }, 'treat yourself')),
        h('div', { style: { display: 'inline-block', marginTop: 12, background: FOREST, borderRadius: 999, padding: '9px 20px',
          fontFamily: FONT, fontWeight: 900, fontSize: 17, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD,
          boxShadow: '0 8px 18px rgba(90,25,0,0.35)' } }, 'Up to 30% off sitewide'),
        h('div', { style: { marginTop: 10 } },
          h('div', { style: { display: 'inline-block', borderRadius: 999, boxShadow: '0 10px 22px rgba(90,25,0,0.4)' } },
            h(M.Button, { label: 'Shop the sale', href: shopHref, bg: 'forest', size: 'lg' })))),
    ),

    // The timer band: its own block, so Klaviyo's live countdown drops in.
    h('div', { style: { background: ORANGE, padding: '10px 20px 34px', textAlign: 'center' } },
      eyebrow('Sale ends in', '#FFFFFF', 14), Timer()),

    // ── 2 · THE HALLOWEEN PARTY PACK ──────────────────────────────────────
    // The same orange (Bernat). On it the type is white; everything that
    // carries detail sits on white or gold so it reads.
    h('div', { style: { background: ORANGE, padding: '26px 24px 56px', textAlign: 'center' } },
      h('div', { style: { height: 1, background: 'rgba(255,255,255,0.35)', margin: '0 40px 40px' } }),
      eyebrow('Limited edition', '#FFFFFF'),
      h('div', { style: { textShadow: TITLE_SHADOW, fontFamily: FONT, fontWeight: 900, fontSize: 40, lineHeight: 1.02,
        textTransform: 'uppercase', color: '#FFFFFF' } },
        h('div', null, 'The Halloween'),
        h('div', { style: { fontStyle: 'italic', fontWeight: 800, marginTop: 3 } }, 'Party Pack.')),
      para('Day to night, no alcohol needed. Our two mates in one box, plus the Milonga bucket hat.', '#FFFFFF', 440),
      h('img', { src: '../public/product/halloween-party-pack-24.jpg',
        alt: 'The Milonga Halloween Party Pack: 12 Lion’s Mane cans and 12 Social Mate cans in a Milonga box, with a cream Milonga bucket hat, jack-o’-lanterns, ghosts and witches under a full moon.',
        style: { display: 'block', width: 552, height: 'auto', borderRadius: 26, marginTop: 28,
          boxShadow: '0 20px 40px rgba(90,25,0,0.35), 0 4px 10px rgba(90,25,0,0.2)' } }),
      h('div', { style: { marginTop: 26 } }, MATES.map(MatePill)),
      h('div', { style: { display: 'flex', gap: 14, marginTop: 38 } }, TIERS.map(TierCard)),
      h('div', { style: { marginTop: 28 } },
        h('div', { style: { display: 'inline-block', borderRadius: 999, boxShadow: '0 10px 22px rgba(90,25,0,0.35)' } },
          h(M.Button, { label: 'Get the Party Pack', href: packHref, bg: 'beige', size: 'lg' }))),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginTop: 14 } },
        'Social Mate is 21+. New to it? Start with half a can.'),
    ),

    // ── 3 · EVERYTHING ELSE ───────────────────────────────────────────────
    // Forest paper: the two variety-pack boxes, each card its ladder, every
    // pack's price and its own button; the Mate Latte on a slim card below.
    h('div', { style: { backgroundColor: FOREST, backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
      backgroundSize: '320px 320px', padding: '58px 22px 54px', textAlign: 'center' } },
      eyebrow('Sitewide', GOLD),
      h(M.Headline, { line1: 'Everything else,', line2: 'up to 25% off.', bg: 'forest', size: 40, align: 'center',
        color: '#FFFFFF', line2Color: GOLD, italic: true }),
      para('The bigger the pack, the bigger the saving. Stock the fridge for Halloween and the month ahead.', '#FFFFFF', 440),
      h('div', { style: { display: 'flex', gap: 14, marginTop: 30, alignItems: 'stretch' } }, LINES.map(LineCard)),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, background: '#FFFFFF', borderRadius: 24,
        padding: '16px 18px', textAlign: 'left', boxShadow: '0 16px 30px rgba(0,26,13,0.30), 0 3px 8px rgba(0,26,13,0.2)' } },
        h('img', { src: LATTE.img, alt: 'A pouch of Milonga Mate Latte, Vanilla.', style: { flex: 'none', height: 120, width: 'auto', display: 'block' } }),
        h('div', { style: { flex: 1 } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 16, textTransform: 'uppercase', color: FOREST } }, LATTE.name),
          h('div', { style: { marginTop: 4 } }, LATTE.packs.map((p, k) => PriceRow(p, k))),
          h('div', { style: { marginTop: 8 } }, h(M.Button, { label: 'Shop Mate Latte', href: LATTE.href, bg: 'beige', size: 'md' })))),
      h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: GOLD, marginTop: 26 } }, 'Sale ends ' + SALE_END),
    ),

    h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
