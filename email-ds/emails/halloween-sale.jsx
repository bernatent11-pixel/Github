// TRICK OR TREAT YOURSELF — the Halloween sale: everything up to 25% off,
// the limited Halloween Party Pack up to 30% off, and a timer to the end.
//
// Every price is Shopify's, read 2026-10-25 (price vs compare-at):
//   Halloween Party Pack 24  $103.80 / $138.40  (25% off)
//   Halloween Party Pack 48  $167.72 / $239.60  (30% off)
//   Lion's Mane       12 $42.84/$50.40 (15%) · 24 $60.48/$75.60 (20%) · 48 25%
//   Regular 10mg      12 $66.30/$78.00 (15%) · 24 $119.20/$149.00 (20%) · 48 $213.75/$285.00 (25%)
//   Variety 24-packs  Lion's Mane $56.70/$75.60 · Regular $111.75/$149.00 (25%)
//   Mate Latte        30 servings $62.98/$69.98 (10%) · 60 $118.96/$139.96 (15%)
// The Lion's Mane 48-pack shows $113.40 in Açaí Mint and $113.48 in the
// other two flavours, so the card gives its percentage, not a price. The
// Party Pack's contents and specs are the product page's.
//
// The opener's picture is the website's Halloween hero (hero/halloween/,
// the email cut), so the email and the site read as one campaign; its
// line, "Trick or treat yourself", is the site's too.
//
// THE TIMER IS A STAND-IN. The digits are drawn for the layout only; in
// Klaviyo the band is replaced by a live countdown to the sale's end.
//
// THC AND CBD ARE NAMED (the Party Pack and the Regular cans are infused),
// so this goes only to the audience cleared for the infused line, with the
// disclosures in the footer.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const NIGHT = '#002D17';
const DEEP = '#00351B';
const GOLD = '#E3BC62';
const INK = '#12331F';
const INK_SOFT = '#3B5344';
const FONT = 'Gotham, Montserrat, sans-serif';
const GOLD_FILL = 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)';

const SALE_END = 'October 31 at 11:59 PM ET'; // TO CONFIRM with Bernat

const SECTION_1_ALT =
  'Milonga. Ends Halloween night. Trick or treat yourself. Up to 30% off. ' +
  'Finish October strong: everything on the site is up to 25% off, and the ' +
  'limited Halloween Party Pack is up to 30% off. Stock up now, so Halloween is ' +
  'ready before the doorbell rings. Shop the sale.';
const SECTION_1_PHOTO_ALT =
  'The Milonga lineup on an orange Halloween backdrop with friendly ghosts: ' +
  'the Lion’s Mane cans and the 10mg cans in Citrus Mango, Peach Ginger and ' +
  'Açaí Mint around a pouch of Mate Latte.';

const PACK = {
  tiers: [
    { name: 'Party Pack', size: '24-pack', price: '$103.80', was: '$138.40', save: '25%',
      contents: '12 Lion’s Mane + 12 Social Mate + 1 bucket hat' },
    { name: 'Party Pack XL', size: '48-pack', price: '$167.72', was: '$239.60', save: '30%',
      contents: '24 Lion’s Mane + 24 Social Mate + 2 bucket hats', best: true },
  ],
  mates: [
    { when: 'By day', name: 'Lion’s Mane Mate', can: '../public/product/can-citrus-mango-energy-packshot.png',
      spec: '100mg natural caffeine · 1,000mg Lion’s Mane · 220mg L-Theanine',
      line: 'For costume-making, pumpkin carving and getting ready.' },
    { when: 'By night', name: 'Social Mate', can: '../public/product/can-citrus-mango-10mg-packshot.png',
      spec: ['10mg THC + 10mg CBD ', h('span', { key: 'h', style: { whiteSpace: 'nowrap' } }, '(hemp-derived)'), ' · 110mg natural caffeine · 220mg L-Theanine'],
      line: 'For when the party starts.' },
  ],
};

const SALE = [
  { name: 'Lion’s Mane cans', img: '../public/product/can-peach-ginger-energy-packshot.png', imgH: 150, upTo: '25%',
    price: '$60.48', was: '$75.60', per: '24-pack',
    ladder: '12-pack 15% · 24-pack 20% · 48-pack 25% off' },
  { name: 'Regular 10mg', img: '../public/product/can-acai-mint-10mg-packshot.png', imgH: 150, upTo: '25%',
    price: '$213.75', was: '$285.00', per: '48-pack',
    ladder: '12-pack 15% · 24-pack 20% · 48-pack 25% off' },
  { name: 'Variety packs', imgs: ['../public/product/can-peach-ginger-10mg-packshot.png',
      '../public/product/can-citrus-mango-energy-packshot.png', '../public/product/can-acai-mint-10mg-packshot.png'],
    imgH: 140, upTo: '25%', price: '$56.70', was: '$75.60', per: 'Lion’s Mane 24-pack',
    ladder: 'Regular 10mg 24-pack: $111.75, was $149.00' },
  { name: 'The Mate Latte', img: '../public/product/pouch-mate-latte-vanilla-packshot.png', imgH: 150, upTo: '15%',
    price: '$118.96', was: '$139.96', per: '60 servings',
    ladder: '30 servings 10% · 60 servings 15% off' },
];

const COMPLIANCE =
  'DRAFT — confirm with counsel before sending. Sale prices as marked on ' +
  'milonga.life until ' + SALE_END + ', while supplies last. Social Mate and ' +
  'Regular 10mg are for 21+ only. Hemp-derived; contains less than 0.3% ' +
  'delta-9 THC on a dry-weight basis. Contains THC. Contains caffeine. Do not ' +
  'drive or operate machinery after consuming. Keep out of reach of children ' +
  'and pets. Not for use if pregnant or nursing. These statements have not ' +
  'been evaluated by the Food and Drug Administration.';

const eyebrow = (t, color, mb = 14) => h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
  letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: mb } }, t);
const para = (t, color, max = 470) => h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
  lineHeight: 1.5, color, maxWidth: max, margin: '16px auto 0' } }, t);
const strike = (t, color) => h('span', { style: { textDecoration: 'line-through', fontWeight: 600, color, opacity: 0.75 } }, t);

// The countdown, as drawn for the layout: four gold-edged tiles.
function Timer() {
  const units = [['06', 'Days'], ['12', 'Hours'], ['00', 'Mins'], ['00', 'Secs']];
  return h('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 10 } },
    units.map(([n, u], i) => [
      i ? h('div', { key: 'c' + i, style: { fontFamily: FONT, fontWeight: 900, fontSize: 34, color: GOLD,
        lineHeight: '70px', opacity: 0.7 } }, ':') : null,
      h('div', { key: i, style: { textAlign: 'center' } },
        h('div', { style: { width: 84, height: 74, borderRadius: 16, background: DEEP, boxSizing: 'border-box',
          border: '1.5px solid rgba(227,188,98,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 18px rgba(0,0,0,0.3)',
          fontFamily: FONT, fontWeight: 900, fontSize: 38, color: '#FFFFFF', letterSpacing: '0.02em' } }, n),
        h('div', { style: { fontFamily: FONT, fontWeight: 800, fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: GOLD, marginTop: 8 } }, u)),
    ]));
}

function MateCard(m, i) {
  return h('div', { key: i, style: { flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '20px 16px 20px',
    textAlign: 'center', border: '1px solid rgba(0,77,39,0.12)',
    boxShadow: '0 14px 28px rgba(0,53,27,0.10), 0 2px 6px rgba(0,53,27,0.07)' } },
    eyebrow(m.when, FOREST, 10),
    h('img', { src: m.can, alt: '', style: { height: 170, width: 'auto', display: 'block', margin: '0 auto',
      filter: 'drop-shadow(0 12px 12px rgba(0,53,27,0.25))' } }),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 17, textTransform: 'uppercase', color: FOREST,
      marginTop: 14 } }, m.name),
    h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 12, lineHeight: 1.45, color: FOREST, marginTop: 8 } }, m.spec),
    h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 13.5, lineHeight: 1.45, color: INK, marginTop: 8 } }, m.line));
}

function TierCard(t, i) {
  // The XL is the featured tier: gold fill, all type forest (on gold, gold is
  // never type).
  const gold = t.best;
  return h('div', { key: i, style: { flex: 1, position: 'relative', borderRadius: 24, padding: '24px 16px 22px',
    textAlign: 'center', background: gold ? GOLD_FILL : '#FFFFFF',
    border: gold ? '1px solid rgba(201,162,78,0.9)' : '1.5px solid ' + FOREST,
    boxShadow: gold ? '0 16px 30px rgba(0,53,27,0.18), inset 0 1px 0 rgba(255,246,214,0.8)' : 'none' } },
    h('span', { style: { position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
      background: FOREST, color: GOLD, borderRadius: 999, padding: '6px 12px', fontFamily: FONT, fontWeight: 900,
      fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' } }, 'Save ' + t.save),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 19, textTransform: 'uppercase', color: FOREST } }, t.name),
    h('div', { style: { fontFamily: FONT, fontWeight: 700, fontStyle: 'italic', fontSize: 14, color: FOREST, marginTop: 4 } }, t.size),
    h('div', { style: { marginTop: 12, fontFamily: FONT, fontSize: 14 } }, strike(t.was, FOREST)),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 32, lineHeight: 1.05, color: FOREST } }, t.price),
    h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 12.5, lineHeight: 1.4, color: FOREST,
      marginTop: 10, minHeight: 36 } }, t.contents));
}

function SaleCard(p, i) {
  return h('div', { key: i, style: { width: 'calc(50% - 7px)', boxSizing: 'border-box', background: '#FFFFFF',
    borderRadius: 22, padding: '18px 14px 18px', textAlign: 'center', position: 'relative',
    border: '1px solid rgba(0,77,39,0.12)', boxShadow: '0 12px 24px rgba(0,53,27,0.09), 0 2px 5px rgba(0,53,27,0.06)' } },
    h('span', { style: { position: 'absolute', top: 12, left: 12, background: FOREST, color: GOLD, borderRadius: 999,
      padding: '5px 9px', fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.1em',
      textTransform: 'uppercase' } }, 'Up to ' + p.upTo),
    h('div', { style: { height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 0 } },
      p.imgs
        ? p.imgs.map((src, k) => h('img', { key: k, src, alt: '', style: { height: p.imgH - (k === 1 ? 0 : 14), width: 'auto',
            display: 'block', margin: '0 -10px', position: 'relative', zIndex: k === 1 ? 1 : 0,
            filter: 'drop-shadow(0 10px 10px rgba(0,53,27,0.22))' } }))
        : h('img', { src: p.img, alt: '', style: { height: p.imgH, width: 'auto', display: 'block',
            filter: 'drop-shadow(0 10px 10px rgba(0,53,27,0.22))' } })),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: FOREST,
      marginTop: 12 } },
      // Units stay lower case: "10mg", never "10MG".
      p.name.split(/(\d+mg)/).map((t, k) => k % 2 ? h('span', { key: k, style: { textTransform: 'none' } }, t) : t)),
    h('div', { style: { fontFamily: FONT, fontSize: 13, marginTop: 8 } },
      strike(p.was, INK_SOFT), ' ',
      h('span', { style: { fontWeight: 900, fontSize: 19, color: FOREST, marginLeft: 4 } }, p.price)),
    h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 12, color: INK_SOFT, marginTop: 2 } }, p.per),
    h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 11.5, lineHeight: 1.4, color: FOREST,
      marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(0,77,39,0.12)' } }, p.ladder));
}

function HalloweenSale({ shopHref = '#shop', packHref = '#party-pack' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · TRICK OR TREAT YOURSELF ───────────────────────────────────────
    // Type-led on forest night: the offer, the timer, the button; then the
    // website's Halloween cluster full-bleed as the one loud moment.
    h('div', { style: { background: `linear-gradient(180deg, ${NIGHT} 0%, ${DEEP} 100%)`, padding: '34px 30px 40px',
      textAlign: 'center' } },
      h(M.Logo, { tone: 'gold', variant: 'primary', height: 66 }),
      h('div', { style: { marginTop: 20 } }, eyebrow('Ends Halloween night', GOLD)),
      h(M.Headline, { line1: 'Trick or', line2: 'treat yourself.', bg: 'forest', size: 44, align: 'center',
        color: '#FFFFFF', line2Color: GOLD, italic: true }),
      h('div', { style: { display: 'inline-block', marginTop: 18, background: GOLD_FILL, borderRadius: 999,
        padding: '10px 22px', fontFamily: FONT, fontWeight: 900, fontSize: 20, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: FOREST, boxShadow: '0 10px 22px rgba(0,0,0,0.3)' } }, 'Up to 30% off'),
      para('Finish October strong: everything on the site is up to 25% off, and the limited Halloween Party Pack is up to 30% off. Stock up now, so Halloween is ready before the doorbell rings.', '#FFFFFF', 510),
    ),
    // The timer band: its own block, so Klaviyo's live countdown drops in.
    h('div', { style: { background: DEEP, padding: '4px 20px 30px', textAlign: 'center' } },
      eyebrow('Sale ends in', GOLD, 14),
      Timer(),
      h('div', { style: { marginTop: 26 } }, h(M.Button, { label: 'Shop the sale', href: shopHref, bg: 'forest', size: 'lg' }))),
    h('img', { src: '../hero/halloween/out/halloween-hero-email.jpg', alt: SECTION_1_PHOTO_ALT,
      style: { display: 'block', width: 600, height: 'auto' } }),

    // ── 2 · THE HALLOWEEN PARTY PACK ──────────────────────────────────────
    h('div', { style: { padding: '58px 26px 56px', textAlign: 'center' } },
      eyebrow('Limited edition', FOREST),
      h(M.Headline, { line1: 'The Halloween', line2: 'Party Pack.', bg: 'beige', size: 40, align: 'center', italic: true }),
      para('Day to night, no alcohol needed. Our two mates in one box: one to get you going, one to get the party going. Plus a Milonga bucket hat.', INK, 460),
      h('div', { style: { display: 'flex', gap: 14, marginTop: 30, textAlign: 'center' } }, PACK.mates.map(MateCard)),
      h('div', { style: { display: 'flex', gap: 14, marginTop: 34 } }, PACK.tiers.map(TierCard)),
      h('div', { style: { marginTop: 26 } }, h(M.Button, { label: 'Get the Party Pack', href: packHref, bg: 'beige', size: 'lg' })),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: INK_SOFT, marginTop: 14 } },
        'Social Mate is 21+. New to it? Start with half a can.'),
    ),

    // ── 3 · EVERYTHING ELSE ───────────────────────────────────────────────
    // A 2×2 grid on forest paper (the one other background change): each
    // card its best sale price, struck from the full one, and its ladder.
    h('div', { style: { backgroundColor: FOREST, backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
      backgroundSize: '320px 320px', padding: '58px 24px 56px', textAlign: 'center' } },
      eyebrow('Sitewide', GOLD),
      h(M.Headline, { line1: 'Everything else,', line2: 'up to 25% off.', bg: 'forest', size: 40, align: 'center',
        color: '#FFFFFF', line2Color: GOLD, italic: true }),
      para('The bigger the pack, the bigger the saving. Stock the fridge for the whole month ahead.', '#FFFFFF', 440),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 30 } }, SALE.map(SaleCard)),
      h('div', { style: { marginTop: 30 } }, h(M.Button, { label: 'Shop everything', href: shopHref, bg: 'forest', size: 'lg' })),
      h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: GOLD, marginTop: 16 } }, 'Ends ' + SALE_END),
    ),

    h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
