// Campaign · Black Friday 2026 · the announcement
//
// Job: announce the Black Friday sale, led by the Monthly Starter Kits (subscriptions).
//   1 Bernat's Black Friday poster (Black Friday / Up to 40% off site-wide. / Our biggest sale of the year.),
//     then "Shop the sale" on a strip easing from the poster's bottom into section 2's gold
//   2 Mate Latte on the gold scene with its liquid turned dark chocolate (Higgsfield edit): "Mate Latte"
//     pill, Up to 40% off your Monthly Starter Kit, two price cards (30 Best seller, 60 Best value) with
//     2 / 4 pouches between the struck price and the shiny gold "Save 40%", the note, "Shop the Mate Latte";
//     the scene's pouch and latte close the section
//   3 the Starter Kit on cream: what's included, for 30 and 60 servings only (the website's list), with the
//     frother and scooper photo, "Get my Starter Kit"
//   4 the cans on the darkened ribbons: 30% off your Monthly Starter Kit, two 24-pack cards (Lion's Mane,
//     infused) with three cans each, "Shop the cans"
//   footer on cream
//
// Facts (milonga.life/products/*.js, 2026-11-11, after Bernat's website update):
//   Mate Latte Starter Kit, plan 8837562678 (30 and 60): first order 40% off, then 30% off monthly.
//     30 servings $66.48 -> $39.89 ($1.33 a serving), then $46.54/mo.
//     60 servings $125.98 -> $75.59 ($1.26 a serving), then $88.19/mo. 60 is the better value per serving.
//   Starter Kit list (website): Save 40% off your first order · FREE Frother + FREE Scooper · Delivered to
//     your door every month · Adjust shipments or cancel anytime · 30-day money back guarantee.
//   Cans Starter Kit, plan 6832750902: first box 30% off, then 20% off. 24 cans: Lion's Mane $75.60 ->
//     $52.92 ($2.21 a can), then $60.48/mo; infused 10mg $149.00 -> $104.30 ($4.35 a can), then $119.20/mo.
//   "Up to 40% off site-wide", "Our biggest sale of the year": Bernat's line. No sale dates (not set).
//   "Best seller" on 30 servings: Bernat's label (website).
// The infused cans are "infused" in the copy, never cannabis/THC/CBD; their labels show in the art.
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
  'ml-bg.jpg': ['', `../${OUT}/img/ml-bg.jpg`],
  'ml-bottom.jpg': ['', `../${OUT}/img/ml-bottom.jpg`],
  'bags-30.png': ['', `../${OUT}/img/bags-30.png`],
  'bags-60.png': ['', `../${OUT}/img/bags-60.png`],
  'cans-lm.png': ['', `../${OUT}/img/cans-lm.png`],
  'cans-inf.png': ['', `../${OUT}/img/cans-inf.png`],
  'kit-percent.png': ['', `../${OUT}/img/kit-percent.png`],
  'kit-gift.png': ['', `../${OUT}/img/kit-gift.png`],
  'kit-truck.png': ['', `../${OUT}/img/kit-truck.png`],
  'kit-pause.png': ['', `../${OUT}/img/kit-pause.png`],
  'kit-card.png': ['', `../${OUT}/img/kit-card.png`],
};
for (const [f, v] of Object.entries(IMG)) if (!v[0] && hosted[f]) v[0] = hosted[f];

export const SUBJECT = 'Black Friday is here 🖤';
export const PREHEADER = 'Up to 40% off site-wide. The biggest savings of the year start with your first box.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', CREAM = '#F7F4EA';
const PLUM = '#3A1830'; // the scene's ribbons
const BAND = '#DDA27A'; // the band's middle, behind it while it loads
const CHOC = '#723A2D'; // the offers' darkened bronze, behind the ribbons while they load
const CARD = '#F6E6DC', PILL = '#E9C46A';
// the website's card: a soft blush-cream, lighter at the top
const CARD_BG = 'background-color:#F6E6DC;background-image:linear-gradient(180deg,#FCF4EE 0%,#F4E1D5 100%);';
const GOLDBG = '#BE8C55'; // section 2's flat top (the strip under the hero ends on it)
const GOLDLOW = '#E5C08F'; // section 2's background below the scene's row 720, behind it while it loads
const KITBG = '#FBF4EA', COCOA = '#2A1A14';
// the website's shiny gold (badges, "Save" tags): a gradient over a flat gold fallback, white type
const SHINE = 'background-color:#D2A346;background-image:linear-gradient(135deg,#F8E79A 0%,#E6BE5A 28%,#C48F2C 55%,#EFD27C 80%,#D5A84A 100%);';
const SHINE_INK = 'color:#FFFFFF;text-shadow:0 1px 1px rgba(90,55,10,.55);';
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
    .card-col { padding-left:4px !important; padding-right:4px !important; }
    .card { padding:16px 6px 16px !important; }
    .c-price { font-size:26px !important; line-height:30px !important; }
    .c-img { width:150px !important; height:100px !important; }
    .c-unit { font-size:12px !important; }
    .ml-sec { padding:44px 14px 30px !important; background-size:100% auto !important; }
    .kit { padding-left:22px !important; padding-right:22px !important; }
    .kit-list { width:100% !important; }
    .btn { padding:17px 30px !important; font-size:14px !important; letter-spacing:1.5px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-choc { background-color:${CHOC} !important; }
    .bg-kit { background-color:${KITBG} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const tag = (t, size = 13, pad = '7px 18px') => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td bgcolor="#D2A346" style="${SHINE}border-radius:999px;padding:${pad};font-family:${FONT};font-size:${size}px;line-height:16px;font-weight:700;letter-spacing:1px;${SHINE_INK}white-space:nowrap;">${t}</td></tr></table>`;
// a price card, like the website's: shiny badge, size, first-box price, struck price, the product,
// the shiny "Save X%", per unit, then
const card = (c, img) => `<td class="card-col" align="center" valign="top" width="50%" style="width:50%;padding:0 8px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td bgcolor="#D2A346" style="${SHINE}border-radius:9px 9px 0 0;padding:5px 14px;font-family:${FONT};font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;${SHINE_INK}white-space:nowrap;">${c.badge || '&nbsp;'}</td></tr></table>
<a href="${amp(c.href)}" target="_blank" style="text-decoration:none;display:block;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td class="card" align="center" bgcolor="${CARD}" style="${CARD_BG}border:1px solid #EBD3C4;border-radius:18px;padding:20px 10px 18px;font-family:${FONT};box-shadow:0 6px 18px rgba(60,30,10,.18);">
<div style="font-size:14px;line-height:18px;font-weight:700;color:#141414;">${ent(c.size)}</div>
<div class="c-price" style="padding-top:6px;font-size:34px;line-height:38px;font-weight:700;color:${COCOA};">${c.price}</div>
<div style="padding-top:2px;font-size:14px;line-height:18px;font-weight:700;color:#8A7A70;text-decoration:line-through;">${c.was}</div>
<img class="c-img" src="${img(c.img)}" width="210" height="140" alt="${c.alt}" style="display:block;margin:8px auto 4px;width:210px;height:140px;border:0;">
<div style="padding:2px 0 8px;font-size:11px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${COCOA};">Monthly Starter Kit</div>
${tag(`Save ${c.save}`)}
<div class="c-unit" style="padding-top:12px;font-size:14px;line-height:18px;font-weight:700;color:#141414;">${c.unit}</div>
<div style="padding-top:4px;font-size:12px;line-height:16px;font-weight:700;color:#5A4A42;">${c.then}</div>
</td></tr></table>
</a>
</td>`;
const cards = (list, img) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${list.map((c) => card(c, img)).join('\n')}
</tr></table>`;
const kitRow = (img, icon, text) => `<tr><td width="36" valign="middle" style="width:36px;padding:9px 0;"><img src="${img(icon)}" width="24" height="24" alt="" role="presentation" style="display:block;width:24px;height:24px;border:0;"></td><td valign="middle" style="padding:9px 0;font-family:${FONT};font-size:15px;line-height:21px;font-weight:700;color:${COCOA};border-bottom:1px solid #EFDFC6;">${text}</td></tr>`;

function body(img) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · BLACK FRIDAY · Bernat's poster (the copy is in the image; the alt text repeats it), then the
     button on a strip that carries the poster's bottom edge down into the offers' chocolate ── -->
<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${amp(L.sale('bf_hero_image'))}" target="_blank"><img class="full" src="${img('hero.jpg')}" width="600" height="900" alt="Black Friday. Up to 40% off site-wide. Our biggest sale of the year." style="display:block;width:600px;height:900px;border:0;font-family:${FONT};font-size:24px;line-height:32px;font-weight:700;color:#FFFFFF;text-align:center;background-color:${CHOC};"></a></td></tr>
<tr><td align="center" background="${img('cta-bg.jpg')}" bgcolor="${GOLDBG}" style="background-color:${GOLDBG};background-image:url('${img('cta-bg.jpg')}');background-size:100% 100%;background-repeat:no-repeat;padding:26px 40px 44px;font-family:${FONT};">
${button(L.sale('bf_hero_button'), 'Shop the sale', 280, PILL, '#2A1A14', '#B58E3A')}
</td></tr>

<!-- ── 2 · MATE LATTE · the gold scene with its liquid turned dark chocolate is the background; the scene's
     pouch and latte close the section ── -->
<tr><td class="ml-sec" align="center" valign="top" background="${img('ml-bg.jpg')}" bgcolor="${GOLDLOW}" style="background-color:${GOLDLOW};background-image:url('${img('ml-bg.jpg')}');background-size:100% auto;background-position:center top;background-repeat:no-repeat;padding:56px 22px 34px;font-family:${FONT};">
${tag('Mate Latte', 12, '7px 18px')}
<div class="h-offer" style="padding-top:16px;font-family:${SERIF};font-size:42px;line-height:46px;font-weight:700;color:${COCOA};">Up to <span style="color:${FOREST};font-style:italic;">40% off</span> ${nw('your Monthly')} ${nw('Starter Kit')}</div>
<div class="lead" style="padding-top:12px;font-size:15px;line-height:22px;font-weight:500;color:#3A2A22;">${ent('Biggest savings of the year on your first box.')} ${nw('Free frother + scooper')} ${nw('with 30 & 60 servings.')}</div>
<div style="padding-top:28px;">${cards([
  { badge: 'Best seller', size: '30 Servings', price: '$39.89', was: '$66.48', img: 'bags-30.png', alt: 'Two Mate Latte pouches', save: '40%', unit: '$1.33 / serving', then: 'then $46.54/mo', href: L.ml(30) },
  { badge: 'Best value', size: '60 Servings', price: '$75.59', was: '$125.98', img: 'bags-60.png', alt: 'Four Mate Latte pouches', save: '40%', unit: '$1.26 / serving', then: 'then $88.19/mo', href: L.ml(60) },
], img)}</div>
<div style="padding-top:16px;font-size:12px;line-height:18px;font-weight:600;color:#3A2A22;">First box price on the Monthly Starter Kit &middot; ${nw('Adjust shipments or cancel anytime')}</div>
<div style="padding-top:24px;">${button(L.ml(30), 'Shop the Mate Latte', 320)}</div>
</td></tr>
<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${amp(L.ml(30))}" target="_blank"><img class="full" src="${img('ml-bottom.jpg')}" width="600" height="444" alt="The Mate Latte pouch and a frothy Mate Latte" style="display:block;width:600px;height:444px;border:0;"></a></td></tr>

<!-- ── 3 · THE STARTER KIT (30 and 60 servings only), on cream ── -->
<tr><td class="kit bg-kit" align="center" bgcolor="${KITBG}" style="background-color:${KITBG};padding:56px 50px 58px;font-family:${FONT};">
${tag('Starter Kit', 12)}
<div class="h-offer" style="padding-top:16px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:${FOREST};">Everything in your</div>
<div class="h-offer" style="font-family:${SERIF};font-size:40px;line-height:44px;font-weight:700;font-style:italic;color:${FOREST};">Starter Kit.</div>
<div style="padding-top:12px;font-size:15px;line-height:22px;font-weight:500;color:#5A4A42;">With <b style="color:${COCOA};">30 &amp; 60 servings</b> of Mate Latte ${nw('on the Monthly Starter Kit only.')}</div>
<table role="presentation" class="kit-list" width="380" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:26px auto 0;width:380px;text-align:left;">
${kitRow(img, 'kit-percent.png', 'Save 40% off your first order')}
${kitRow(img, 'kit-gift.png', 'FREE Frother + FREE Scooper')}
${kitRow(img, 'kit-truck.png', 'Delivered to your door every month')}
${kitRow(img, 'kit-pause.png', 'Adjust shipments or cancel anytime')}
${kitRow(img, 'kit-card.png', '30-day money back guarantee')}
</table>
<div style="padding-top:30px;">${button(L.ml(30), 'Get my Starter Kit', 320)}</div>
</td></tr>

<!-- ── 4 · THE CANS, on the darkened ribbons ── -->
<tr><td class="offer bg-choc" align="center" valign="top" background="${img('offers-bg.jpg')}" bgcolor="${CHOC}" style="background-color:${CHOC};background-image:url('${img('offers-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:56px 22px 60px;font-family:${FONT};">
${tag('The cans', 12)}
<div class="h-offer" style="padding-top:16px;font-family:${SERIF};font-size:42px;line-height:46px;font-weight:700;color:#FFFFFF;"><span style="color:${GOLD};font-style:italic;">30% off</span> ${nw('your Monthly')} ${nw('Starter Kit')}</div>
<div class="lead" style="padding-top:12px;font-size:15px;line-height:22px;font-weight:500;color:#F6E7DA;">${ent('Our Lion’s Mane and infused cans: 30% off your first box,')} ${nw('then 20% off every month.')}</div>
<div style="padding-top:28px;">${cards([
  { badge: 'Lion’s Mane', size: '24 cans', price: '$52.92', was: '$75.60', img: 'cans-lm.png', alt: 'Lion’s Mane cans', save: '30%', unit: '$2.21 / can', then: 'then $60.48/mo', href: L.can('lion-s-mane', '53053588701494', 'bf_cans_lm') },
  { badge: 'Infused', size: '24 cans', price: '$104.30', was: '$149.00', img: 'cans-inf.png', alt: 'Infused yerba mate cans', save: '30%', unit: '$4.35 / can', then: 'then $119.20/mo', href: L.can('cannabis-regular-10mg', '52759098196278', 'bf_cans_infused') },
], img)}</div>
<div style="padding-top:16px;font-size:12px;line-height:18px;font-weight:500;color:#F6E7DA;">First box price on the Monthly Starter Kit &middot; ${nw('Adjust shipments or cancel anytime')}</div>
<div style="padding-top:24px;">${button(L.cans, 'Shop the cans', 300, PILL, COCOA, '#B58E3A')}</div>
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
