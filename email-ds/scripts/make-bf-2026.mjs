// Campaign · Black Friday 2026 · the announcement
//
// Job: announce the Black Friday sale, led by the Monthly Starter Kits (subscriptions).
//   1 Bernat's Black Friday poster (Black Friday / Up to 40% off site-wide. / Our biggest sale of the year.,
//     the pouch, the Lion's Mane and infused cans, gourd, latte), then "Shop the sale" on a strip that
//     carries the poster's bottom edge into section 2's chocolate
//   2 Mate Latte, like the website's Black Friday block, on the scene's darkened ribbons:
//     Up to 40% off / your Monthly Starter Kit, the pouch and a latte, three price cards (15 / 30 / 60),
//     "Shop the Mate Latte"
//   3 the cans, same style: 30% off / your Monthly Starter Kit, Lion's Mane and infused cans, two cards,
//     "Shop the cans"
//   footer on cream
//
// Facts (milonga.life/products/*.js, 2026-11-11): the "Starter Kit" plans.
//   Mate Latte: 15 servings $34.99, first box 25% off $26.24 ($1.75 a serving), then 15% off $29.74/mo
//     (plan 9479323958). 30 servings $62.98, first box 40% off $37.79 ($1.26), then 30% off $44.09/mo;
//     60 servings $139.96, first box 40% off $83.98 ($1.40), then 30% off $97.97/mo (plan 8837562678).
//     Free frother + scooper with 30 and 60 servings (Bernat's website block).
//   Cans, plan 6832750902 for all can products: first box 30% off, then 20% off. Lion's Mane 6 cans
//     $25.20 -> $17.64 ($2.94 a can), then $20.16/mo. Infused 10mg 6 cans $40.80 -> $28.56 ($4.76), then
//     $32.64/mo.
//   "Up to 40% off site-wide" and "Our biggest sale of the year": Bernat's line. No sale dates (not set).
// The infused cans are named "infused" in the copy, never cannabis/THC/CBD; their labels show in the photo
// (Bernat asked for them in this campaign, 2026-11-11).
//
// Writes exports/klaviyo/bf-2026/bf-2026.html (ONE complete HTML email, Klaviyo code template) +
// refine/bf-2026.html. Usage: node scripts/make-bf-2026-assets.mjs && node scripts/make-bf-2026.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/bf-2026';
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const hosted = fs.existsSync(`${OUT}/hosted.json`) ? JSON.parse(fs.readFileSync(`${OUT}/hosted.json`, 'utf8')) : {};
const IMG = {
  'logo-green.png': [`${K}b6a03046-605a-4e87-b22f-a530be1633e3.png`, '../exports/klaviyo/welcome-e1/img/logo-green.png'],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'hero.jpg': ['', `../${OUT}/img/hero.jpg`],
  'cta-bg.jpg': ['', `../${OUT}/img/cta-bg.jpg`],
  'offers-bg.jpg': ['', `../${OUT}/img/offers-bg.jpg`],
  'ml-photo.jpg': ['', `../${OUT}/img/ml-photo.jpg`],
  'cans-photo.jpg': ['', `../${OUT}/img/cans-photo.jpg`],
};
for (const [f, v] of Object.entries(IMG)) if (!v[0] && hosted[f]) v[0] = hosted[f];

export const SUBJECT = 'Black Friday is here 🖤';
export const PREHEADER = 'Up to 40% off site-wide. The biggest savings of the year start with your first box.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', CREAM = '#F7F4EA';
const PLUM = '#3A1830'; // the scene's ribbons
const BAND = '#DDA27A'; // the band's middle, behind it while it loads
const CHOC = '#723A2D'; // the offers' darkened bronze, behind the ribbons while they load
const CARD = '#FBF3EA', PILL = '#E9C46A';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life', PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=black_friday_2026&utm_content=${slot}`;
const L = {
  home: `${SITE}/?${utm('logo')}`,
  sale: (slot) => `${SITE}/collections/all?${utm(slot)}`,
  ml: (n) => `${SITE}${PDP}?selling_plan=${n === 15 ? '9479323958' : '8837562678'}&variant=${{ 15: '54302750212406', 30: '54302750245174', 60: '54302750277942' }[n]}&${utm(`bf_ml_${n}`)}`,
  can: (handle, variant, slot) => `${SITE}/products/${handle}?selling_plan=6832750902&variant=${variant}&${utm(slot)}`,
  cans: `${SITE}/collections/drinks?${utm('bf_cans_button')}`,
};

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const STYLE = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:#004D27 !important; text-decoration:none !important; }
  .web-view-line a { color:#3B5344 !important; }
  @media only screen and (max-width:480px) {
    .wrap { width:100% !important; }
    .pad { padding-left:24px !important; padding-right:24px !important; }
    .full { width:100% !important; height:auto !important; }
    .band { padding:28px 20px 6px !important; background-size:100% auto !important; }
    .logo { width:66px !important; height:70px !important; }
    .h-hero { font-size:46px !important; line-height:46px !important; }
    .h-sec { font-size:34px !important; line-height:37px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .price { font-size:40px !important; line-height:42px !important; }
    .offer { padding-left:18px !important; padding-right:18px !important; }
    .photo { width:100% !important; height:auto !important; }
    .h-offer { font-size:34px !important; line-height:38px !important; }
    .card-col { display:block !important; width:100% !important; padding:0 0 22px !important; }
    .card { padding:22px 16px 20px !important; }
    .btn { padding:17px 30px !important; font-size:14px !important; letter-spacing:1.5px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-choc { background-color:${CHOC} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
// a price card, like the website's: badge, size, first-box price, struck price, "Save X%", per unit, then
const card = (c) => `<td class="card-col" align="center" valign="top" width="${c.w}%" style="width:${c.w}%;padding:${c.badge ? 0 : 22}px 6px 0;">
${c.badge ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td bgcolor="${FOREST}" style="background-color:${FOREST};border-radius:8px 8px 0 0;padding:4px 12px;font-family:${FONT};font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#FFFFFF;white-space:nowrap;">${c.badge}</td></tr></table>` : ''}
<a href="${amp(c.href)}" target="_blank" style="text-decoration:none;display:block;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td class="card" align="center" bgcolor="${CARD}" style="background-color:${CARD};border-radius:18px;padding:20px 8px 18px;font-family:${FONT};">
<div style="font-size:14px;line-height:18px;font-weight:700;color:${FOREST};">${ent(c.size)}</div>
<div style="padding-top:6px;font-size:32px;line-height:36px;font-weight:700;color:#2A1A14;">${c.price}</div>
<div style="padding-top:2px;font-size:14px;line-height:18px;font-weight:700;color:#8A7A70;text-decoration:line-through;">${c.was}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:12px auto 0;border-collapse:separate;"><tr><td bgcolor="${PILL}" style="background-color:${PILL};border-radius:999px;padding:7px 16px;font-family:${FONT};font-size:13px;line-height:16px;font-weight:700;color:#2A1A14;white-space:nowrap;">Save ${c.save}</td></tr></table>
<div style="padding-top:12px;font-size:14px;line-height:18px;font-weight:700;color:${FOREST};">${c.unit}</div>
<div style="padding-top:4px;font-size:12px;line-height:16px;font-weight:700;color:#5A4A42;">${c.then}</div>
</td></tr></table>
</a>
</td>`;
// an offer block (sections 2 and 3 share one cell, so the ribbons run behind both without a seam)
const offer = (o) => `<div style="padding-top:${o.padTop}px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td bgcolor="${PILL}" style="background-color:${PILL};border-radius:999px;padding:7px 16px;font-family:${FONT};font-size:12px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;white-space:nowrap;">${o.pill}</td></tr></table>
<div class="h-offer" style="padding-top:16px;font-family:${SERIF};font-size:42px;line-height:46px;font-weight:700;color:#FFFFFF;">${o.title}</div>
<div class="lead" style="padding-top:12px;font-size:15px;line-height:22px;font-weight:500;color:#F6E7DA;">${o.lead}</div>
<div style="padding-top:24px;"><a href="${amp(o.photoHref)}" target="_blank"><img class="photo" src="${o.photo}" width="520" height="310" alt="${o.alt}" style="display:block;margin:0 auto;width:520px;height:310px;border:0;border-radius:18px;"></a></div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;table-layout:fixed;"><tr>
${o.cards.map(card).join('\n')}
</tr></table>
<div style="padding-top:14px;font-size:12px;line-height:18px;font-weight:500;color:#F6E7DA;">${o.note}</div>
<div style="padding-top:24px;">${button(o.cta, o.ctaLabel, 300, PILL, '#2A1A14', '#B58E3A')}</div>
</div>`;

function body(img) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · BLACK FRIDAY · Bernat's poster (the copy is in the image; the alt text repeats it), then the
     button on a strip that carries the poster's bottom edge down into the offers' chocolate ── -->
<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${amp(L.sale('bf_hero_image'))}" target="_blank"><img class="full" src="${img('hero.jpg')}" width="600" height="900" alt="Black Friday. Up to 40% off site-wide. Our biggest sale of the year." style="display:block;width:600px;height:900px;border:0;font-family:${FONT};font-size:24px;line-height:32px;font-weight:700;color:#FFFFFF;text-align:center;background-color:${CHOC};"></a></td></tr>
<tr><td class="bg-choc" align="center" background="${img('cta-bg.jpg')}" bgcolor="${CHOC}" style="background-color:${CHOC};background-image:url('${img('cta-bg.jpg')}');background-size:100% 100%;background-repeat:no-repeat;padding:26px 40px 44px;font-family:${FONT};">
${button(L.sale('bf_hero_button'), 'Shop the sale', 280, PILL, '#2A1A14', '#B58E3A')}
</td></tr>

<!-- ── 2 + 3 · THE STARTER KITS (the website's Black Friday block, on the darkened ribbons) ── -->
<tr><td class="offer bg-choc" align="center" valign="top" background="${img('offers-bg.jpg')}" bgcolor="${CHOC}" style="background-color:${CHOC};background-image:url('${img('offers-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0 30px 60px;font-family:${FONT};">

<!-- 2 · Mate Latte -->
${offer({
  padTop: 56,
  pill: 'Mate Latte',
  title: `Up to <span style="color:${GOLD};font-style:italic;">40% off</span> ${nw('your Monthly')} ${nw('Starter Kit')}`,
  lead: `${ent('Biggest savings of the year on your first box of Mate Latte.')} ${nw('Free frother + scooper')} ${nw('with 30 & 60 servings.')}`,
  photo: img('ml-photo.jpg'), photoHref: L.ml(30), alt: 'The Mate Latte pouch and a frothy Mate Latte',
  cards: [
    { w: 33, size: '15 Servings', price: '$26.24', was: '$34.99', save: '25%', unit: '$1.75 / serving', then: 'then $29.74/mo', href: L.ml(15) },
    { w: 34, badge: 'Best value', size: '30 Servings', price: '$37.79', was: '$62.98', save: '40%', unit: '$1.26 / serving', then: 'then $44.09/mo', href: L.ml(30) },
    { w: 33, badge: 'Best seller', size: '60 Servings', price: '$83.98', was: '$139.96', save: '40%', unit: '$1.40 / serving', then: 'then $97.97/mo', href: L.ml(60) },
  ],
  note: `First box price on the Monthly Starter Kit &middot; ${nw('Skip, pause or cancel anytime')}`,
  cta: L.ml(30), ctaLabel: 'Shop the Mate Latte',
})}

<!-- 3 · the cans -->
<div style="padding-top:56px;font-size:0;line-height:0;"><div style="height:1px;line-height:1px;background-color:#B98A6A;font-size:0;">&nbsp;</div></div>
${offer({
  padTop: 50,
  pill: 'The cans',
  title: `<span style="color:${GOLD};font-style:italic;">30% off</span> ${nw('your Monthly')} ${nw('Starter Kit')}`,
  lead: `${ent('Our Lion’s Mane and infused cans: 30% off your first box,')} ${nw('then 20% off every month.')}`,
  photo: img('cans-photo.jpg'), photoHref: L.cans, alt: 'Milonga Lion’s Mane and infused yerba mate cans',
  cards: [
    { w: 50, size: 'Lion’s Mane · 6 cans', price: '$17.64', was: '$25.20', save: '30%', unit: '$2.94 / can', then: 'then $20.16/mo', href: L.can('lion-s-mane', '53053588504886', 'bf_cans_lm') },
    { w: 50, size: 'Infused · 6 cans', price: '$28.56', was: '$40.80', save: '30%', unit: '$4.76 / can', then: 'then $32.64/mo', href: L.can('cannabis-regular-10mg', '52759097999670', 'bf_cans_infused') },
  ],
  note: `First box price on the Monthly Starter Kit &middot; ${nw('Skip, pause or cancel anytime')}`,
  cta: L.cans, ctaLabel: 'Shop the cans',
})}
</td></tr>

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:56px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>

</table>
</td></tr>
</table>`;
}

const doc = (img) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${SUBJECT}</title>
<!--
  CAMPAIGN · BLACK FRIDAY 2026 · ANNOUNCEMENT · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-bf-2026.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

const missing = new Set();
const full = doc((f) => { if (!IMG[f]?.[0]) missing.add(f); return IMG[f]?.[0] || `MISSING:${f}`; });
if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
else {
  const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/bf-2026.html`, full);
  console.log('wrote', `${OUT}/bf-2026.html`, `(validator: pass, ${full.length} bytes)`);
}
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/bf-2026.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Black Friday 2026 · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
body{margin:0;background:#FFFFFF;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8A8A8A;margin-bottom:8px}
.inbox .row{background:#fff;border:1px solid #E2E2E2;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style>${STYLE}</head><body>
<div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${body((f) => IMG[f][1])}
</body></html>`);
console.log('wrote refine/bf-2026.html');
