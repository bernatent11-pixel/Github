// IT'S HALLOWEEN WEEKEND — the last push of the Halloween sale: the Party Pack
// (up to 30% off) and the two Sober October variety packs (25% off the
// 24-pack), all ending Monday, November 2 at 11:59 PM ET.
//
// Every price is Shopify's, read 2026-10-30 (price vs compare-at):
//   Halloween Party Pack 24  $103.80 / $138.40  (25% off)
//   Halloween Party Pack 48  $167.72 / $239.60  (30% off)
//   Lion's Mane variety      12 $50.40 · 24 $56.70 / $75.60 (25%) · 48 $151.20
//   Cannabis variety Regular 12 $78.00 · 24 $111.75 / $149.00 (25%) · 48 $285.00
// The Light 5mg variety packs are sold out, so they are left out.
//
// Look is Bernat's: the purple night of the Party Pack picture, its witches
// and ghosts, and every product. The hero is composited — the moon, the
// witches, the leaves and the jack-o'-lanterns are cut from that picture
// (scripts/make-halloween-weekend-assets.mjs), the ghosts are the Halloween
// hero's sprites, and every product is its real packshot, never redrawn.
//
// THC AND CBD ARE NAMED (Social Mate is the 10mg infused can), so this goes
// only to the audience cleared for the infused line, with the disclosures.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const INK = '#12331F';
const INK_SOFT = '#3B5344';
const FONT = 'Gotham, Montserrat, sans-serif';
const GOLD_FILL = 'linear-gradient(180deg, #EBCB7E 0%, #E3BC62 55%, #D8AE52 100%)';
// The Party Pack picture's open sky, sampled; NIGHT is the deeper purple of
// the timer box.
const PURPLE = '#3A1F55';
const NIGHT = '#2C1743';
// The last section is on the peach-ginger orange of the Halloween sale's
// lineup (Bernat). Gold does not read on it, so its type is white.
const ORANGE = '#DA5813';
const ORANGE_SHADOW = '0 3px 14px rgba(90,25,0,0.45), 0 1px 3px rgba(90,25,0,0.35)';

const SALE_END = 'Monday, November 2 at 11:59 PM ET';

// HTML MODE (window.HTML_MODE): buttons left out, slices marked, for
// scripts/make-halloween-weekend-html.mjs.
const HTML_MODE = !!window.HTML_MODE;
const slice = (name) => (HTML_MODE ? { 'data-slice': name } : {});

const P = '../public/product/';
const W = P + 'halloween-weekend/';
const S = '../hero/halloween/source/sprites/';

const HERO_H = 1060;
const TITLE_SHADOW = '0 3px 16px rgba(20,6,38,0.6), 0 1px 3px rgba(20,6,38,0.45)';
const CARD_SHADOW = '0 16px 30px rgba(16,4,30,0.45), 0 3px 8px rgba(16,4,30,0.3)';

const eyebrow = (t, color, mb = 14) => h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
  letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: mb } }, t);
const para = (t, color, max = 470) => h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
  lineHeight: 1.5, color, maxWidth: max, margin: '16px auto 0' } }, t);
const strike = (t, color) => h('span', { style: { textDecoration: 'line-through', fontWeight: 600, color, opacity: 0.7 } }, t);
const units = (t) => t.split(/(\d+mg)/).map((x, k) => k % 2 ? h('span', { key: k, style: { textTransform: 'none' } }, x) : x);

// ── The hero's layers, in 600-wide units. A can: packshot, centre, height,
// tilt. Every can is the same height so the two lines read as one range.
const CAN_H = 210;
const CANS = [
  { src: 'can-citrus-mango-energy-packshot.png', cx: 140, cy: 480, rot: 11 },
  { src: 'can-peach-ginger-energy-packshot.png', cx: 78, cy: 702, rot: -4 },
  { src: 'can-acai-mint-energy-packshot.png', cx: 150, cy: 912, rot: 8 },
  { src: 'can-citrus-mango-10mg-packshot.png', cx: 458, cy: 480, rot: -10 },
  { src: 'can-peach-ginger-10mg-packshot.png', cx: 528, cy: 702, rot: 4 },
  { src: 'can-acai-mint-10mg-packshot.png', cx: 450, cy: 912, rot: -7 },
];
// Decoration: [src, left, top, width, rotation, z]. Ghosts with a sliced side
// sit behind a can so the cut never shows.
const DECOR = [
  [S + 'ghost-left.png', 58, 392, 62, -6, 1],
  [S + 'ghost-top-centre.png', 478, 384, 64, 4, 1],
  [S + 'ghost-centre.png', 212, 440, 58, -4, 3],
  [S + 'ghost-gourd.png', 488, 890, 78, 0, 3],
  [S + 'ghost-bottom-left.png', 96, 868, 68, 0, 1],
  [W + 'leaf-a.png', 22, 586, 36, -20, 3],
  [W + 'leaf-c.png', 556, 594, 40, 30, 3],
  [W + 'leaf-d.png', 340, 400, 32, 10, 3],
  [W + 'leaf-e.png', 540, 1000, 44, -10, 3],
  [W + 'leaf-f.png', 4, 1000, 54, 15, 3],
  [W + 'leaf-b.png', 232, 832, 32, -30, 3],
  [W + 'pumpkins.png', 226, 866, 148, 0, 4],
];

function Stars() {
  const pts = [[200, 40, 7], [420, 30, 5], [560, 140, 6], [40, 210, 5], [330, 116, 4], [580, 290, 5], [20, 330, 6], [250, 300, 4]];
  return pts.map(([x, y, r], k) => h('svg', { key: k, width: r * 2, height: r * 2, viewBox: '-10 -10 20 20',
    style: { position: 'absolute', left: x - r, top: y - r, opacity: 0.85 } },
    h('path', { d: 'M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10Z', fill: '#F6E7B8' })));
}

function Hero() {
  const img = (src, style, k) => h('img', { key: k, src, alt: '', style: { position: 'absolute', display: 'block', ...style } });
  return h('div', { ...slice('s1-hero'), style: { position: 'relative', height: HERO_H, overflow: 'hidden',
    background: `radial-gradient(circle at 96px 92px, rgba(255,226,170,0.16) 0, rgba(255,226,170,0) 190px), ` +
      `radial-gradient(ellipse 420px 380px at 300px 700px, rgba(122,70,170,0.35) 0, rgba(122,70,170,0) 100%), ${PURPLE}` } },
    Stars(),
    img(W + 'moon.png', { left: -12, top: -6, width: 212, height: 'auto' }, 'moon'),
    img(W + 'witches.png', { right: -18, top: 0, width: 270, height: 'auto' }, 'witches'),

    // Copy in the open sky between the moon and the witches.
    h('div', { style: { position: 'absolute', top: 120, left: 20, right: 20, textAlign: 'center', zIndex: 5 } },
      h(M.Logo, { tone: 'white', variant: 'primary', height: 70 }),
      h('div', { style: { marginTop: 14, textShadow: TITLE_SHADOW, fontFamily: FONT, fontWeight: 900, fontSize: 54,
        lineHeight: 0.98, textTransform: 'uppercase', color: '#FFFFFF' } },
        h('div', null, 'It’s Halloween'),
        h('div', { style: { fontStyle: 'italic', fontWeight: 800, marginTop: 4, color: GOLD } }, 'weekend.')),
      h('div', { style: { display: 'inline-block', marginTop: 16, background: FOREST, borderRadius: 999, padding: '9px 20px',
        fontFamily: FONT, fontWeight: 900, fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD,
        boxShadow: '0 8px 18px rgba(16,4,30,0.45)' } }, 'Party Pack up to 30% off · ends Monday')),

    DECOR.map(([src, left, top, width, rot, z], k) => img(src, { left, top, width, height: 'auto', zIndex: z,
      transform: `rotate(${rot}deg)` }, 'd' + k)),
    CANS.map((c, k) => img(P + c.src, { left: c.cx, top: c.cy, height: CAN_H, width: 'auto', zIndex: 2,
      transform: `translate(-50%, -50%) rotate(${c.rot}deg)`,
      filter: 'drop-shadow(0 16px 16px rgba(14,3,28,0.55)) drop-shadow(0 0 10px rgba(255,220,170,0.12))' }, 'c' + k)),
    img(P + 'pouch-mate-latte-vanilla-packshot-corrected.png', { left: 300, top: 690, height: 290, width: 'auto', zIndex: 2,
      transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 18px 18px rgba(14,3,28,0.55))' }, 'pouch'),
    h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, zIndex: 6,
      background: `linear-gradient(180deg, rgba(58,31,85,0) 0%, ${PURPLE} 100%)` } }));
}

const HERO_ALT =
  'Milonga. It’s Halloween weekend. Party Pack up to 30% off, ends Monday. The whole Milonga lineup on a purple ' +
  'Halloween night with a full moon, witches on broomsticks, friendly ghosts, autumn leaves and jack-o’-lanterns: ' +
  'the Lion’s Mane cans and the Social Mate 10mg cans in Citrus Mango, Peach Ginger and Açaí Mint around a pouch of Mate Latte.';

const TIERS = [
  { name: 'Party Pack', size: '24-pack', price: '$103.80', was: '$138.40', save: '25%',
    contents: ['12 cans of Lion’s Mane', '12 cans of Social Mate', '1 Milonga bucket hat'] },
  { name: 'Party Pack XL', size: '48-pack', price: '$167.72', was: '$239.60', save: '30%',
    contents: ['24 cans of Lion’s Mane', '24 cans of Social Mate', '2 Milonga bucket hats'], best: true },
];

function TierCard(t, i) {
  const gold = t.best;
  return h('div', { key: i, style: { flex: 1, position: 'relative', borderRadius: 24, padding: '26px 16px 22px',
    textAlign: 'center', background: gold ? GOLD_FILL : '#FFFFFF', border: gold ? '1px solid rgba(201,162,78,0.9)' : 'none',
    boxShadow: CARD_SHADOW } },
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

// By day / by night, kept to one line each: the Party Pack's two mates.
const DAYNIGHT = [
  ['By day', 'Lion’s Mane Mate', '100mg natural caffeine · 1,000mg Lion’s Mane · 220mg L-Theanine', 'can-citrus-mango-energy-packshot.png'],
  ['By night', 'Social Mate', '10mg THC · 10mg CBD · 110mg natural caffeine · 220mg L-Theanine', 'can-citrus-mango-10mg-packshot.png'],
];
function MateRow([when, name, spec, can], k) {
  return h('div', { key: k, style: { flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#FFFFFF',
    borderRadius: 20, padding: '12px 12px 12px 10px', textAlign: 'left', boxShadow: CARD_SHADOW } },
    h('img', { src: P + can, alt: '', style: { flex: 'none', height: 92, width: 'auto', display: 'block' } }),
    h('div', null,
      h('div', { style: { display: 'inline-block', background: FOREST, color: GOLD, borderRadius: 999, padding: '4px 9px',
        fontFamily: FONT, fontWeight: 900, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' } }, when),
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 14, textTransform: 'uppercase', color: FOREST, marginTop: 6 } }, name),
      h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 11.5, lineHeight: 1.35, color: INK_SOFT, marginTop: 3 } },
        spec.split(' · ').flatMap((t, j) => [j ? ' · ' : null, h('span', { key: j, style: { whiteSpace: 'nowrap' } }, units(t))]))));
}

// ── The Sober October variety packs ──
const VARIETY = [
  { name: 'Sober October Lion’s Mane Variety Pack', box: P + 'variety-24-lions-mane.jpg', price: '$56.70', was: '$75.60',
    per: '24-pack, 8 of each flavor', href: 'https://milonga.life/products/lions-mane-variety-pack', cta: 'Shop Lion’s Mane variety',
    alt: 'A 24 variety pack of Milonga Lion’s Mane cans with ghosts and autumn leaves on green.',
    packs: [['12-pack', null, '$50.40'], ['24-pack', '25%', '$56.70', '$75.60'], ['48-pack', null, '$151.20']] },
  { name: 'Sober October Cannabis Variety Pack', box: P + 'variety-24-social-mate.jpg', price: '$111.75', was: '$149.00',
    per: 'Regular 10mg 24-pack, 8 of each flavor', href: 'https://milonga.life/products/variety', cta: 'Shop cannabis variety',
    alt: 'A 24 variety pack of Milonga Social Mate cans, 10mg THC and 10mg CBD, with ghosts and autumn leaves on cream.',
    packs: [['12-pack', null, '$78.00'], ['24-pack', '25%', '$111.75', '$149.00'], ['48-pack', null, '$285.00']] },
];

function PriceRow([pack, save, price, was], k) {
  return h('div', { key: k, style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6,
    padding: '9px 0', borderTop: k ? '1px solid rgba(0,77,39,0.10)' : 'none' } },
    h('div', { style: { fontFamily: FONT, fontWeight: 800, fontSize: 13, color: FOREST, whiteSpace: 'nowrap' } }, pack,
      save ? h('span', { style: { fontWeight: 700, fontSize: 11, color: INK_SOFT, marginLeft: 5 } }, '−' + save) : null),
    h('div', { style: { fontFamily: FONT, fontSize: 12, whiteSpace: 'nowrap' } }, was ? strike(was, INK_SOFT) : null,
      h('span', { style: { fontWeight: 900, fontSize: 15, color: FOREST, marginLeft: 6 } }, price)));
}

function VarietyCard(p, i) {
  return h('div', { key: i, style: { flex: 1, boxSizing: 'border-box', background: '#FFFFFF',
    borderRadius: HTML_MODE ? '22px 22px 0 0' : 22, padding: HTML_MODE ? '14px 14px 6px' : '14px 14px 18px',
    textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column',
    boxShadow: HTML_MODE ? 'none' : '0 16px 30px rgba(90,25,0,0.30), 0 3px 8px rgba(90,25,0,0.2)' } },
    h('span', { style: { position: 'absolute', top: 10, left: 10, zIndex: 1, background: FOREST, color: GOLD, borderRadius: 999,
      padding: '5px 9px', fontFamily: FONT, fontWeight: 900, fontSize: 10.5, letterSpacing: '0.1em',
      textTransform: 'uppercase', boxShadow: '0 3px 8px rgba(0,26,13,0.25)' } }, '25% off the 24'),
    h('img', { src: p.box, alt: p.alt, style: { display: 'block', width: '100%', height: 'auto', borderRadius: 16 } }),
    h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 14.5, lineHeight: 1.2, textTransform: 'uppercase',
      color: FOREST, marginTop: 12, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      h('div', null, p.name)),
    h('div', { style: { fontFamily: FONT, fontSize: 13, marginTop: 6 } }, strike(p.was, INK_SOFT), ' ',
      h('span', { style: { fontWeight: 900, fontSize: 20, color: FOREST, marginLeft: 4 } }, p.price)),
    h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 11.5, color: INK_SOFT, marginTop: 2 } }, units(p.per)),
    h('div', { style: { marginTop: 10, borderTop: '1px solid rgba(0,77,39,0.12)', textAlign: 'left' } }, p.packs.map(PriceRow)),
    HTML_MODE ? null : h('div', { style: { marginTop: 'auto', paddingTop: 12 } }, h(M.Button, { label: 'Shop variety', href: p.href, bg: 'beige', size: 'md' })));
}

const COMPLIANCE =
  'Sale prices as marked on milonga.life until ' + SALE_END + ', while supplies last. Up to 30% off applies to the ' +
  'Halloween Party Pack XL; the variety packs are 25% off the 24-pack. Social Mate is for 21+ only. Hemp-derived; ' +
  'contains less than 0.3% delta-9 THC on a dry-weight basis. Contains THC. Contains caffeine. Do not drive or operate ' +
  'machinery after consuming. Keep out of reach of children and pets. Not for use if pregnant or nursing. These ' +
  'statements have not been evaluated by the Food and Drug Administration.';

function HalloweenWeekend({ shopHref = 'https://milonga.life', packHref = 'https://milonga.life/products/halloween-party-pack-bundle' }) {
  const btn = (label, href) => h('div', { style: { display: 'inline-block', borderRadius: 999, boxShadow: '0 10px 22px rgba(16,4,30,0.45)' } },
    h(M.Button, { label, href, bg: 'forest', size: 'lg' }));
  return h(M.EmailShell, { bg: 'beige' },
    // ── 1 · IT'S HALLOWEEN WEEKEND ──
    h(Hero),
    HTML_MODE ? null : h('div', { style: { background: PURPLE, padding: '0 20px 24px', textAlign: 'center' } }, btn('Shop the Halloween sale', shopHref)),
    HTML_MODE ? null : h('div', { style: { background: PURPLE, padding: '6px 20px 40px', textAlign: 'center' } },
      eyebrow('Sale ends in', '#FFFFFF', 12),
      h('div', { style: { display: 'inline-block', background: NIGHT, border: '1.5px solid ' + GOLD, borderRadius: 16, padding: '14px 22px',
        fontFamily: FONT, fontWeight: 900, fontSize: 18, color: '#FFFFFF', letterSpacing: '0.04em' } }, 'Ends ' + SALE_END)),

    // ── 2 · THE HALLOWEEN PARTY PACK ──
    h('div', { style: { background: PURPLE, padding: HTML_MODE ? '0 24px 24px' : '0 24px 56px', textAlign: 'center' } },
      h('div', { ...slice('s2-head'), style: { padding: HTML_MODE ? '18px 0 0' : '18px 0 0' } },
        h('div', { style: { height: 1, background: 'rgba(255,255,255,0.28)', margin: '0 40px 40px' } }),
        eyebrow('Limited edition · last weekend', GOLD),
        h('div', { style: { textShadow: TITLE_SHADOW, fontFamily: FONT, fontWeight: 900, fontSize: 40, lineHeight: 1.02,
          textTransform: 'uppercase', color: '#FFFFFF' } },
          h('div', null, 'The Halloween'),
          h('div', { style: { fontStyle: 'italic', fontWeight: 800, marginTop: 3, color: GOLD } }, 'Party Pack.')),
        para('Costumes by day, the party by night. Our two mates in one box, plus the Milonga bucket hat, up to 30% off until Monday.', '#FFFFFF', 450),
        h('img', { src: P + 'halloween-party-pack-24.jpg',
          alt: 'The Milonga Halloween Party Pack: 12 Lion’s Mane cans and 12 Social Mate cans in a Milonga box, with a cream Milonga bucket hat, jack-o’-lanterns, ghosts and witches under a full moon.',
          style: { display: 'block', width: 552, height: 'auto', borderRadius: 26, marginTop: 28,
            boxShadow: '0 20px 44px rgba(10,2,22,0.55), 0 0 0 1px rgba(255,255,255,0.08)' } }),
        h('div', { style: { height: 22 } })),
      h('div', { ...slice('s2-body') },
        h('div', { style: { display: 'flex', gap: 12, paddingBottom: 34 } }, DAYNIGHT.map(MateRow)),
        h('div', { style: { display: 'flex', gap: 14, paddingBottom: HTML_MODE ? 56 : 0 } }, TIERS.map(TierCard))),
      HTML_MODE ? null : h('div', { style: { marginTop: 28 } }, btn('Get the Party Pack', packHref)),
      HTML_MODE ? null : h('div', { style: { fontFamily: FONT, fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginTop: 14 } },
        'Social Mate is 21+. New to it? Start with half a can.')),

    // ── 3 · THE SOBER OCTOBER VARIETY PACKS ──
    h('div', { style: { background: ORANGE, padding: HTML_MODE ? '0 22px 24px' : '56px 22px 50px', textAlign: 'center' } },
      h('div', { ...slice('s3-head'), style: { padding: HTML_MODE ? '56px 0 28px' : '0 0 28px' } },
        eyebrow('Sober October, last call', '#FFFFFF'),
        h('div', { style: { textShadow: ORANGE_SHADOW, fontFamily: FONT, fontWeight: 900, fontSize: 38, lineHeight: 1.04,
          textTransform: 'uppercase', color: '#FFFFFF' } },
          h('div', null, 'Every flavor,'),
          h('div', { style: { fontStyle: 'italic', fontWeight: 800, marginTop: 3 } }, 'one box.')),
        para('The Sober October variety packs: 8 of each flavor in the 24-pack, 25% off until Monday. Find your favorite before the sale ends.', '#FFFFFF', 450)),
      h('div', { ...slice('s3-row'), style: { display: 'flex', gap: 14, alignItems: 'stretch' } }, VARIETY.map(VarietyCard)),
      HTML_MODE ? null : h('div', { style: { fontFamily: FONT, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: '#FFFFFF', marginTop: 30 } }, 'Halloween weekend ends ', h('span', { style: { whiteSpace: 'nowrap' } }, SALE_END)),
      HTML_MODE ? null : h('div', { style: { marginTop: 18 } }, h('div', { style: { display: 'inline-block', borderRadius: 999, boxShadow: '0 10px 22px rgba(90,25,0,0.35)' } },
        h(M.Button, { label: 'Shop the sale', href: shopHref, bg: 'beige', size: 'lg' })))),

    HTML_MODE ? null : h(M.Footer, { bg: 'beige', compliance: COMPLIANCE,
      social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
