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

const SALE_END = 'Monday, November 2 at 11:59 PM ET'; // Bernat: ends Monday Nov 2 (time assumed)

// HTML MODE (window.HTML_MODE): the same email with every button left out
// and each image slice marked (data-slice), so scripts/make-halloween-html.mjs
// can cut the slices and rebuild the buttons as live HTML between them.
const HTML_MODE = !!window.HTML_MODE;
const slice = (name) => (HTML_MODE ? { 'data-slice': name } : {});

// The lineup picture is 1333 x 2000, drawn 600 wide: 900 units.
const HERO_H = 900;

const SECTION_1_ALT =
  'Milonga. Trick or treat yourself. Up to 30% off sitewide. Shop the sale. ' +
  'The Milonga lineup on an orange Halloween backdrop with friendly ghosts and ' +
  'autumn leaves: the Lion’s Mane cans and the Social Mate 10mg cans in Citrus ' +
  'Mango, Peach Ginger and Açaí Mint around a pouch of Mate Latte.';

// Each mate: its can, a line on when, and its benefits as pill-shaped
// "buttons", an icon on each (Bernat). Benefits stay within the claim limits:
// energy, focus, calm, uplifting — the can's own words — never an effect
// promise.
const MATES = [
  { when: 'By day', name: 'Lion’s Mane Mate', can: '../public/product/can-citrus-mango-energy-packshot.png',
    line: 'For costume-making, pumpkin carving and getting ready.',
    pills: [['yerba-mate', '100mg natural caffeine', 'Clean, sustained energy'],
      ['lions-mane', '1,000mg Lion’s Mane', 'Focus & concentration'],
      ['l-theanine', '220mg L-Theanine', 'Calm & balance']] },
  { when: 'By night', name: 'Social Mate', can: '../public/product/can-citrus-mango-10mg-packshot.png',
    line: 'For when the party starts, no alcohol needed.',
    pills: [['THC', '10mg THC', 'An uplifting herbal experience'],
      ['CBD', '10mg CBD', 'Smooth & balanced'],
      ['yerba-mate', '110mg natural caffeine', 'Natural, steady energy'],
      ['l-theanine', '220mg L-Theanine', 'Calm & balance']] },
];
const TIERS = [
  { name: 'Party Pack', size: '24-pack', price: '$103.80', was: '$138.40', save: '25%',
    contents: ['12 cans of Lion’s Mane', '12 cans of Social Mate', '1 Milonga bucket hat'] },
  { name: 'Party Pack XL', size: '48-pack', price: '$167.72', was: '$239.60', save: '30%',
    contents: ['24 cans of Lion’s Mane', '24 cans of Social Mate', '2 Milonga bucket hats'], best: true },
];
// Section 3: four cards in the grid Bernat liked — badge, picture, name,
// headline price — each with every pack's price beneath and its own button.
// The variety packs are only discounted at 24; their 12s and 48s are shown
// at full price, as Shopify has them. The cannabis variety prices are the
// Regular 10mg ones; Light 5mg is noted on its own line.
const SALE = [
  { name: 'Lion’s Mane cans', img: '../public/product/can-peach-ginger-energy-packshot.png', upTo: '25%',
    price: '$60.48', was: '$75.60', per: '24-pack', href: 'https://milonga.life/products/lion-s-mane', cta: 'Shop Lion’s Mane',
    packs: [['12-pack', '15%', '$42.84', '$50.40'], ['24-pack', '20%', '$60.48', '$75.60'], ['48-pack', '25%', '$113.40', '$151.20']] },
  { name: 'Regular 10mg', img: '../public/product/can-acai-mint-10mg-packshot.png', upTo: '25%',
    price: '$213.75', was: '$285.00', per: '48-pack', href: 'https://milonga.life/products/cannabis-regular-10mg', cta: 'Shop Regular',
    packs: [['12-pack', '15%', '$66.30', '$78.00'], ['24-pack', '20%', '$119.20', '$149.00'], ['48-pack', '25%', '$213.75', '$285.00']] },
  { name: 'Sober October Lion’s Mane Variety Pack', box: '../public/product/variety-24-lions-mane.jpg', upTo: '25%',
    price: '$56.70', was: '$75.60', per: '24-pack, 8 of each flavor', href: 'https://milonga.life/products/lions-mane-variety-pack', cta: 'Shop variety',
    alt: 'A 24 variety pack of Milonga Lion’s Mane cans with ghosts and autumn leaves on green.',
    packs: [['12-pack', null, '$50.40'], ['24-pack', '25%', '$56.70', '$75.60'], ['48-pack', null, '$151.20']] },
  { name: 'Sober October Cannabis Variety Pack', box: '../public/product/variety-24-social-mate.jpg', upTo: '25%',
    price: '$111.75', was: '$149.00', per: 'Regular 10mg 24-pack, 8 of each flavor', href: 'https://milonga.life/products/variety', cta: 'Shop variety',
    alt: 'A 24 variety pack of Milonga Social Mate cans, 10mg THC and 10mg CBD, with ghosts and autumn leaves on cream.',
    packs: [['12-pack', null, '$78.00'], ['24-pack', '25%', '$111.75', '$149.00'], ['48-pack', null, '$285.00']],
    note: ['Also in Light 5mg: ', ...['12-pack $66.00', '24-pack $125.00', '48-pack $237.00'].flatMap((t, k) => [k ? ' · ' : null, h('span', { key: k, style: { whiteSpace: 'nowrap' } }, t)])] },
];
const LATTE = { name: 'The Mate Latte', img: '../public/product/pouch-mate-latte-vanilla-packshot.png', href: 'https://milonga.life/products/the-original-mate-latte',
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

// THC rises, CBD settles — the same glyphs as Sober October, cream on forest.
const GL = { fill: 'none', stroke: '#F0EFDF', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const GLYPHS = {
  THC: h('svg', { width: 18, height: 18, viewBox: '0 0 24 24' },
    h('path', { ...GL, d: 'M4 18 L10 12 L13.5 15 L19 8.5' }), h('path', { ...GL, d: 'M14.5 8 H19.5 V13' }),
    h('path', { ...GL, strokeWidth: 1.8, d: 'M6 4.5 V8 M4.25 6.25 H7.75' })),
  CBD: h('svg', { width: 18, height: 18, viewBox: '0 0 24 24' },
    h('path', { ...GL, d: 'M3 8 C6 5.5 8.5 5.5 12 8 S18 10.5 21 8' }),
    h('path', { ...GL, d: 'M3 13 C6 10.5 8.5 10.5 12 13 S18 15.5 21 13' }),
    h('path', { ...GL, d: 'M3 18 C6 15.5 8.5 15.5 12 18 S18 20.5 21 18' })),
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

// By Day / By Night: a white card per mate — its can and name, then each
// benefit in a pill with its icon.
function BenefitPill([icon, title, note], k) {
  return h('div', { key: k, style: { display: 'flex', alignItems: 'center', gap: 9, marginTop: k ? 8 : 0,
    background: 'rgba(0,77,39,0.07)', border: '1px solid rgba(0,77,39,0.14)', borderRadius: 999,
    padding: '6px 12px 6px 6px', textAlign: 'left' } },
    h('span', { style: { flex: 'none', width: 30, height: 30, borderRadius: 999, background: FOREST,
      display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      GLYPHS[icon] || h(M.BrandIcon, { mark: icon, ink: 'cream', size: 20, alt: '' })),
    h('div', null,
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12, lineHeight: 1.2, color: FOREST } }, title),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 11, lineHeight: 1.25, color: INK_SOFT, marginTop: 1 } }, note)));
}

function MateCard(m, i) {
  return h('div', { key: i, style: { flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '20px 14px 18px',
    textAlign: 'center', boxShadow: '0 16px 30px rgba(90,25,0,0.25), 0 3px 8px rgba(90,25,0,0.15)' } },
    h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, background: FOREST, borderRadius: 999,
      padding: '6px 12px', fontFamily: FONT, fontWeight: 900, fontSize: 11, letterSpacing: '0.16em',
      textTransform: 'uppercase', color: GOLD } },
      h('span', { style: { display: 'inline-flex', transform: 'scale(0.75)', margin: '-4px -2px' } }, ICONS[i ? 'moon' : 'sun']), m.when),
    h('img', { src: m.can, alt: '', style: { height: 180, width: 'auto', display: 'block', margin: '14px auto 0',
      filter: 'drop-shadow(0 12px 12px rgba(0,53,27,0.25))' } }),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 17, textTransform: 'uppercase', color: FOREST, marginTop: 14 } }, m.name),
    h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 13, lineHeight: 1.4, color: INK, marginTop: 6, minHeight: 36 } }, m.line),
    h('div', { style: { marginTop: 12 } }, m.pills.map(BenefitPill)));
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
function PriceRow([pack, save, price, was], k) {
  return h('div', { key: k, style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6,
    padding: '9px 0', borderTop: k ? '1px solid rgba(0,77,39,0.10)' : 'none' } },
    h('div', { style: { fontFamily: FONT, fontWeight: 800, fontSize: 13, color: FOREST } },
      pack.split(' ').flatMap((w, j) => [j ? ' ' : null, h('span', { key: j, style: { whiteSpace: 'nowrap' } }, w)]),
      save ? h('span', { style: { fontWeight: 700, fontSize: 11, color: INK_SOFT, marginLeft: 5 } }, '−' + save) : null),
    h('div', { style: { fontFamily: FONT, fontSize: 12, whiteSpace: 'nowrap' } }, was ? strike(was, INK_SOFT) : null,
      h('span', { style: { fontWeight: 900, fontSize: 15, color: FOREST, marginLeft: 6 } }, price)));
}

function SaleCard(p, i) {
  return h('div', { key: i, style: { width: HTML_MODE ? 'auto' : 'calc(50% - 7px)', flex: HTML_MODE ? 1 : 'none', boxSizing: 'border-box', background: '#FFFFFF',
    borderRadius: HTML_MODE ? '22px 22px 0 0' : 22, padding: HTML_MODE ? '16px 14px 6px' : '16px 14px 18px',
    textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column',
    boxShadow: HTML_MODE ? 'none' : '0 16px 30px rgba(0,26,13,0.30), 0 3px 8px rgba(0,26,13,0.2)' } },
    h('span', { style: { position: 'absolute', top: 12, left: 12, zIndex: 1, background: FOREST, color: GOLD, borderRadius: 999,
      padding: '5px 9px', fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.1em',
      textTransform: 'uppercase', boxShadow: '0 3px 8px rgba(0,26,13,0.25)' } }, 'Up to ' + p.upTo),
    p.box
      ? h('img', { src: p.box, alt: p.alt, style: { display: 'block', width: '100%', height: 'auto', borderRadius: 16 } })
      : h('div', { style: { height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' } },
          h('img', { src: p.img, alt: '', style: { height: 180, width: 'auto', display: 'block',
            filter: 'drop-shadow(0 10px 10px rgba(0,53,27,0.22))' } })),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 14.5, lineHeight: 1.2, textTransform: 'uppercase',
      color: FOREST, marginTop: 12, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      h('div', null, units(p.name))),
    h('div', { style: { fontFamily: FONT, fontSize: 13, marginTop: 6 } },
      strike(p.was, INK_SOFT), ' ',
      h('span', { style: { fontWeight: 900, fontSize: 20, color: FOREST, marginLeft: 4 } }, p.price)),
    h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 11.5, color: INK_SOFT, marginTop: 2 } }, p.per),
    h('div', { style: { marginTop: 10, borderTop: '1px solid rgba(0,77,39,0.12)', textAlign: 'left' } },
      p.packs.map((r, k) => PriceRow(r, k))),
    p.note ? h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 11, lineHeight: 1.4, color: INK_SOFT,
      marginTop: 4, textAlign: 'left' } }, p.note) : null,
    HTML_MODE ? null : h('div', { style: { marginTop: 'auto', paddingTop: 14 } }, h(M.Button, { label: p.cta, href: p.href, bg: 'beige', size: 'md' })));
}

function HalloweenSale({ shopHref = 'https://milonga.life', packHref = 'https://milonga.life/products/halloween-party-pack-bundle' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · TRICK OR TREAT YOURSELF ───────────────────────────────────────
    // Bernat's orange lineup. The products start about 340 units down, so
    // the white logo, the title, the offer and the button sit in its open
    // head; its foot fades into the flat ORANGE the next block continues.
    h('div', { ...slice('s1-hero'), style: { position: 'relative', height: HERO_H, overflow: 'hidden', background: ORANGE } },
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
          boxShadow: '0 8px 18px rgba(90,25,0,0.35)' } }, 'Up to 30% off sitewide')),
    ),

    // THE BUTTON SITS BETWEEN THE PICTURE AND THE TIMER (Bernat), on the
    // flat orange the picture's foot fades into.
    HTML_MODE ? null : h('div', { style: { background: ORANGE, padding: '4px 20px 26px', textAlign: 'center' } },
      h('div', { style: { display: 'inline-block', borderRadius: 999, boxShadow: '0 10px 22px rgba(90,25,0,0.4)' } },
        h(M.Button, { label: 'Shop the sale', href: shopHref, bg: 'forest', size: 'lg' }))),

    // The timer band: its own block, so a live countdown drops in.
    HTML_MODE ? null : h('div', { style: { background: ORANGE, padding: '10px 20px 34px', textAlign: 'center' } },
      eyebrow('Sale ends in', '#FFFFFF', 14), Timer()),

    // ── 2 · THE HALLOWEEN PARTY PACK ──────────────────────────────────────
    // The same orange (Bernat). On it the type is white; everything that
    // carries detail sits on white or gold so it reads.
    h('div', { style: { background: ORANGE, padding: HTML_MODE ? '0 24px 0' : '26px 24px 56px', textAlign: 'center' } },
     h('div', { ...slice('s2-head'), style: { padding: HTML_MODE ? '26px 0 0' : 0 } },
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
      h('div', { style: { height: 26 } })),
      h('div', { ...slice('s2-body') },
        h('div', { style: { display: 'flex', gap: 14, alignItems: 'stretch', paddingBottom: 38 } }, MATES.map(MateCard)),
        h('div', { style: { display: 'flex', gap: 14, paddingBottom: HTML_MODE ? 30 : 0 } }, TIERS.map(TierCard))),
      HTML_MODE ? null : h('div', { style: { marginTop: 28 } },
        h('div', { style: { display: 'inline-block', borderRadius: 999, boxShadow: '0 10px 22px rgba(90,25,0,0.35)' } },
          h(M.Button, { label: 'Get the Party Pack', href: packHref, bg: 'beige', size: 'lg' }))),
      HTML_MODE ? null : h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginTop: 14 } },
        'Social Mate is 21+. New to it? Start with half a can.'),
    ),

    // ── 3 · EVERYTHING ELSE ───────────────────────────────────────────────
    // Forest paper: the two variety-pack boxes, each card its ladder, every
    // pack's price and its own button; the Mate Latte on a slim card below.
    // In HTML mode the ground is flat forest: the live rows between the slices
    // are flat, and a paper grain would show a seam at every join.
    h('div', { style: { backgroundColor: FOREST, backgroundImage: HTML_MODE ? 'none' : 'url(../public/brand/textures/tile-paper-forest.jpg)',
      backgroundSize: '320px 320px', padding: HTML_MODE ? '0 22px 0' : '58px 22px 54px', textAlign: 'center' } },
     h('div', { ...slice('s3-head'), style: { padding: HTML_MODE ? '58px 0 30px' : 0 } },
      eyebrow('Sitewide', GOLD),
      h(M.Headline, { line1: 'Everything else,', line2: 'up to 25% off.', bg: 'forest', size: 40, align: 'center',
        color: '#FFFFFF', line2Color: GOLD, italic: true }),
      para('The bigger the pack, the bigger the saving. Stock the fridge for Halloween and the month ahead.', '#FFFFFF', 440)),
      HTML_MODE
        ? [0, 2].map((r) => h('div', { key: r, ...slice('s3-row-' + r / 2), style: { display: 'flex', gap: 14, alignItems: 'stretch' } },
            SALE.slice(r, r + 2).map((p, k) => SaleCard(p, r + k))))
        : h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 30, alignItems: 'stretch' } }, SALE.map(SaleCard)),
      h('div', { ...slice('s3-latte'), style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, background: '#FFFFFF',
        borderRadius: HTML_MODE ? '24px 24px 0 0' : 24,
        padding: HTML_MODE ? '16px 18px 4px' : '16px 18px', textAlign: 'left',
        boxShadow: HTML_MODE ? 'none' : '0 16px 30px rgba(0,26,13,0.30), 0 3px 8px rgba(0,26,13,0.2)' } },
        h('img', { src: LATTE.img, alt: 'A pouch of Milonga Mate Latte, Vanilla.', style: { flex: 'none', height: 120, width: 'auto', display: 'block' } }),
        h('div', { style: { flex: 1 } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 16, textTransform: 'uppercase', color: FOREST } }, LATTE.name),
          h('div', { style: { marginTop: 4 } }, LATTE.packs.map((p, k) => PriceRow(p, k))),
          HTML_MODE ? null : h('div', { style: { marginTop: 8 } }, h(M.Button, { label: 'Shop Mate Latte', href: LATTE.href, bg: 'beige', size: 'md' })))),
      HTML_MODE ? null : h('div', { style: { fontFamily: FONT, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: GOLD, marginTop: 26 } }, 'Sale ends ' + SALE_END),
    ),

    HTML_MODE ? null : h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
