// Campaign · Thanksgiving 2026 (Thu Nov 26) · ways to share Milonga with the people you love, then Black Friday
//
//   0  strip: Black Friday is live, up to 40% off site-wide
//   1  Happy Thanksgiving: logo, "Grateful for you, and every cup.", a short thank-you, on the wall colour of
//      the Thanksgiving table photo below it (its top fades into that colour)
//   2  three ways to share a cup this week (forest; photo and text alternating, as in pp1-e1): Thanksgiving
//      morning (the kitchen crew), after the feast (a round with the pie), Black Friday morning (iced)
//   3  a festive recipe on gold: Pumpkin Spice Mate Latte (base recipe from the product page: 2.5 tbsp in 8oz
//      of milk; the spice, maple and cinnamon are our additions)
//   4  Black Friday on cream: the two Starter Kits (from bf-2026, same prices and links) and "Shop the sale"
//   footer on cream
// Claims: only approved ones ("steady energy without the jitters or the crash"). No infused cans here: this
// goes to the whole list. Black Friday facts are bf-2026's (Shopify, 2026-11-12); no sale end date is set.
//
// Writes exports/klaviyo/thanksgiving/thanksgiving.html (ONE complete HTML email, Klaviyo code template) and
// refine/thanksgiving.html. Usage: node scripts/make-thanksgiving-assets.mjs && node scripts/make-thanksgiving.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/thanksgiving';
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const hosted = fs.existsSync(`${OUT}/hosted.json`) ? JSON.parse(fs.readFileSync(`${OUT}/hosted.json`, 'utf8')) : {};
// shared art, already on Klaviyo: [hosted url, local path for the preview]
const SHARED = {
  'logo-green.png': [`${K}b6a03046-605a-4e87-b22f-a530be1633e3.png`, '../exports/klaviyo/welcome-e1/img/logo-green.png'],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'm-friends.jpg': [`${K}61ce5b04-698e-4ffb-94fa-fbd0377217c1.jpeg`, '../exports/klaviyo/pp1-e1/img/moment-friends.jpg'],
  'drink-hot.png': [`${K}eb720e35-e441-496a-a96c-5f30dc637591.png`, '../exports/klaviyo/pp1-e1/img/drink-hot.png'],
  'bags-30.png': [`${K}7b6e7cd1-ea70-4c06-80c6-dc8d8365da27.png`, '../exports/klaviyo/bf-2026/img/bags-30.png'],
  'cans-lm.png': [`${K}75cbdfff-bfb1-4106-a2c3-a65d9a4b90b3.png`, '../exports/klaviyo/bf-2026/img/cans-lm.png'],
};
const C = JSON.parse(fs.readFileSync(`${OUT}/colors.json`, 'utf8'));

export const SUBJECT = 'A cup for everyone at the table 🦃';
export const PREHEADER = 'Three ways to share Milonga this Thanksgiving, plus Black Friday is live.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', CREAM = '#F7F4EA', PAPER = '#FBF8EF', INK = '#12331F', SOFT = '#3B5344';
const WALL = C.wall;
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life', PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=thanksgiving_2026&utm_content=${slot}`;
const L = {
  home: `${SITE}/?${utm('logo')}`,
  sale: (slot) => `${SITE}/?${utm(slot)}`,
  ml: (slot) => `${SITE}${PDP}?selling_plan=8837562678&variant=54302750245174&${utm(slot)}`,
  lm: (slot) => `${SITE}/products/lion-s-mane?selling_plan=6832750902&variant=53053588701494&${utm(slot)}`,
};

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const MOMENTS = [
  { img: 'm-kitchen.jpg', alt: 'A Mate Latte pouch on a sunny kitchen counter', when: 'Thanksgiving morning', title: 'Fuel the kitchen crew',
    text: `The turkey’s in and the house is waking up. Make a round of hot Mate Lattes for everyone helping out: 2.5 tablespoons in 8oz of warm milk, ${nw('frothed.')}` },
  { img: 'm-friends.jpg', alt: 'Friends sharing cups of Mate Latte around a small table', when: 'After the feast', title: 'A round with the pie',
    text: `Set out a tray of Mate Lattes with dessert and let everyone grab a cup. Creamy, cozy and ready in ${nw('30 seconds.')}` },
  { img: 'm-iced.jpg', alt: 'An iced Mate Latte in a glass jar', when: 'Black Friday morning', title: 'Deal-hunting fuel',
    text: `Up early for the deals? An iced Mate Latte gives you steady energy without the jitters or ${nw('the crash.')}` },
];
const RECIPE = ['2.5 tbsp Mate Latte', '8oz milk (oat is great)', '¼ tsp pumpkin pie spice', '1 tsp maple syrup', 'A pinch of cinnamon on top'];
const KITS = [
  { img: 'bags-30.png', alt: 'Two Mate Latte pouches', name: 'Mate Latte', save: '40% off', size: '30 servings', price: '$37.79', was: '$62.98', extra: 'Free frother + scooper', href: L.ml('tg_kit_ml'), cta: 'Shop Mate Latte' },
  { img: 'cans-lm.png', alt: 'Lion’s Mane cans', name: 'Lion’s Mane', save: '30% off', size: '24 cans', price: '$52.92', was: '$75.60', extra: 'Three flavors to pick from', href: L.lm('tg_kit_lm'), cta: 'Shop the cans' },
];

const STYLE = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:${FOREST} !important; text-decoration:none !important; }
  .web-view-line a { color:${SOFT} !important; }
  @media only screen and (max-width:480px) {
    .pad { padding-left:22px !important; padding-right:22px !important; }
    .pad-photo { padding-left:16px !important; padding-right:16px !important; }
    .full { width:100% !important; height:auto !important; }
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:40px !important; line-height:43px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .m-img, .m-text { max-width:100% !important; }
    .m-photo { max-width:100% !important; }
    .m-in { padding:16px 0 0 !important; }
    .m-title { font-size:26px !important; line-height:29px !important; }
    .r-img { width:150px !important; }
    .r-list { max-width:100% !important; }
    .r-in { padding:12px 0 0 !important; }
    .kit-col { width:100% !important; max-width:100% !important; }
    .btn { padding:17px 28px !important; font-size:14px !important; letter-spacing:1.6px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-wall { background-color:${WALL} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-gold { background-color:${GOLD} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${ent(label)}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = ([a, b], cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;

// one moment: photo on one side, text on the other (flip = photo on the right). Hybrid columns: side by side on
// desktop, stacked (photo first) on phones and in inboxes without media queries
const moment = (m, flip, img) => `<tr><td class="pad-photo bg-forest" bgcolor="${FOREST}" style="background-color:${FOREST};padding:28px 30px 0;">
<div dir="${flip ? 'rtl' : 'ltr'}" style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="540" cellpadding="0" cellspacing="0" border="0" dir="${flip ? 'rtl' : 'ltr'}"><tr><td width="250" valign="middle"><![endif]-->
<div class="m-img" dir="ltr" style="display:inline-block;vertical-align:middle;width:100%;max-width:250px;"><img class="m-photo" src="${img(m.img)}" width="250" height="312" alt="${m.alt}" style="display:block;margin:0 auto;width:100%;max-width:250px;height:auto;border:0;border-radius:18px;"></div>
<!--[if mso]></td><td width="290" valign="middle"><![endif]-->
<div class="m-text" dir="ltr" style="display:inline-block;vertical-align:middle;width:100%;max-width:290px;text-align:left;font-family:${FONT};">
<div class="m-in" style="padding:${flip ? '14px 26px 0 0' : '14px 0 0 26px'};">
<div style="font-size:11px;line-height:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">${ent(m.when)}</div>
<div class="m-title" style="padding-top:8px;font-family:${SERIF};font-size:28px;line-height:31px;font-weight:700;font-style:italic;color:${BEIGE};">${ent(m.title)}</div>
<div style="padding-top:10px;font-size:14px;line-height:21px;font-weight:500;color:#DCE3D6;">${ent(m.text)}</div>
</div></div>
<!--[if mso]></td></tr></table><![endif]-->
</div>
</td></tr>`;

// one Starter Kit card (hybrid columns: side by side on desktop, stacked on phones)
const kit = (k, img) => `<div class="kit-col" style="display:inline-block;vertical-align:top;width:100%;max-width:262px;">
<div style="padding:0 8px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1.5px solid ${FOREST};border-radius:20px;padding:20px 14px 20px;font-family:${FONT};box-shadow:0 10px 24px rgba(0,60,30,.10);">
<div style="font-size:11px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${SOFT};">${ent(k.name)} Starter Kit</div>
<div style="padding-top:6px;font-family:${SERIF};font-size:44px;line-height:46px;font-weight:700;font-style:italic;color:${FOREST};">${k.save}</div>
<div style="font-size:12px;line-height:16px;font-weight:700;color:${FOREST};">your first box</div>
<img src="${img(k.img)}" width="200" height="133" alt="${ent(k.alt)}" style="display:block;margin:10px auto 6px;width:200px;max-width:100%;height:auto;border:0;">
<div style="font-size:13px;line-height:19px;font-weight:500;color:${INK};">${k.size}: <b style="color:${FOREST};">${k.price}</b> <span style="text-decoration:line-through;color:#8A968C;">${k.was}</span></div>
<div style="padding-top:4px;font-size:12px;line-height:16px;font-weight:700;color:#A8741E;">${ent(k.extra)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:14px auto 0;border-collapse:separate;"><tr><td bgcolor="${FOREST}" style="background-color:${FOREST};border-radius:999px;font-family:${FONT};font-size:12px;line-height:14px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;white-space:nowrap;"><a href="${amp(k.href)}" target="_blank" style="display:inline-block;padding:11px 20px;color:${BEIGE};text-decoration:none;">${ent(k.cta)}</a></td></tr></table>
</td></tr></table>
</div></div>`;

function body(img) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;">

<!-- ── 0 · BLACK FRIDAY STRIP ── -->
${row(FOREST, 'pad bg-forest', 'padding:12px 20px;', `<a href="${amp(L.sale('tg_strip'))}" target="_blank" style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};text-decoration:none;">Black Friday is live &middot; <span style="color:${BEIGE};white-space:nowrap;">Up to 40% off &rarr;</span></a>`)}

<!-- ── 1 · HAPPY THANKSGIVING (on the table photo's wall colour; the photo's top fades into it) ── -->
${row(WALL, 'pad bg-wall', 'padding:34px 40px 0;', `<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-green.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:26px;">${eyebrow('Happy Thanksgiving')}</div>
${title(['Grateful for you,', 'and every cup.'], 'h-hero', 52, FOREST, 10)}
<div style="max-width:460px;margin:0 auto;"><div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${ent('Thank you for making Milonga part of your mornings this year. Here are a few ways to share a cup with the people you love')} ${nw('this week.')}</div></div>`)}
<tr><td class="bg-wall" bgcolor="${WALL}" style="background-color:${WALL};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('hero.jpg')}" width="600" height="640" alt="A Thanksgiving table with cups of Mate Latte, pumpkin pie and autumn leaves" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>

<!-- ── 2 · THREE WAYS TO SHARE A CUP ── -->
${row(FOREST, 'pad bg-forest', 'padding:56px 40px 0;', `${eyebrow('Ways to share', GOLD)}
${title(['A cup for everyone,', 'all week long.'], 'h-sec', 40, '#FFFFFF')}`)}
${MOMENTS.map((m, i) => moment(m, i % 2 === 1, img)).join('\n')}
<tr><td class="bg-forest" bgcolor="${FOREST}" height="56" style="height:56px;line-height:56px;font-size:0;background-color:${FOREST};">&nbsp;</td></tr>

<!-- ── 3 · MAKE IT FESTIVE: PUMPKIN SPICE MATE LATTE ── -->
${row(GOLD, 'pad bg-gold', 'padding:52px 40px 0;', `${eyebrow('Make it festive')}
${title(['Pumpkin spice', 'Mate Latte.'], 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-gold" align="center" bgcolor="${GOLD}" style="background-color:${GOLD};padding:26px 40px 0;">
<div style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0"><tr><td width="200" valign="middle"><![endif]-->
<div class="r-td" style="display:inline-block;vertical-align:middle;width:100%;max-width:200px;"><img class="r-img" src="${img('drink-hot.png')}" width="200" height="205" alt="A hot Mate Latte in a glass mug" style="display:block;margin:0 auto;width:200px;max-width:100%;height:auto;border:0;"></div>
<!--[if mso]></td><td width="320" valign="middle"><![endif]-->
<div class="r-list" style="display:inline-block;vertical-align:middle;width:100%;max-width:320px;text-align:left;font-family:${FONT};"><div class="r-in" style="padding:0 0 0 20px;">
${RECIPE.map((r) => `<div style="padding:7px 0;border-bottom:1px solid rgba(0,77,39,.22);font-size:14px;line-height:19px;font-weight:700;color:${FOREST};">${ent(r)}</div>`).join('\n')}
</div></div>
<!--[if mso]></td></tr></table><![endif]-->
</div>
</td></tr>
${row(GOLD, 'pad bg-gold', 'padding:20px 40px 54px;', `<div style="max-width:440px;margin:0 auto;font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Warm the milk with the spice and maple, stir in the Mate Latte, froth it and dust with cinnamon.')} ${nw('Pie optional.')}</div>`)}

<!-- ── 4 · BLACK FRIDAY ── -->
${row(CREAM, 'pad bg-cream', 'padding:54px 40px 0;', `${eyebrow('Black Friday is here')}
${title(['Our biggest sale', 'of the year.'], 'h-sec', 40)}
<div style="max-width:440px;margin:0 auto;"><div class="lead" style="padding-top:14px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${ent('Up to 40% off site-wide. Stock up for the holidays, or start your Monthly Starter Kit for')} ${nw('less than ever.')}</div></div>`)}
<tr><td class="pad-photo bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:28px 30px 0;">
<div style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="524" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td width="262" valign="top"><![endif]-->
${KITS.map((k) => kit(k, img)).join('\n<!--[if mso]></td><td width="262" valign="top"><![endif]-->\n')}
<!--[if mso]></td></tr></table><![endif]-->
</div>
</td></tr>
${row(CREAM, 'pad bg-cream', 'padding:10px 40px 52px;', `<div style="max-width:440px;margin:0 auto;font-size:12px;line-height:18px;font-weight:500;color:${SOFT};">${ent('Starter Kit prices are for your first box, then 30% off (Mate Latte) or 20% off (cans) every month. Skip, pause or cancel')} ${nw('anytime.')}</div>
<div style="padding-top:26px;">${button(L.sale('tg_sale_button'), 'Shop the sale', 300)}</div>`)}

<!-- ── FOOTER ── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:20px 30px 40px;font-family:${FONT};color:${FOREST};">
<div style="margin:0 auto 34px;width:60px;border-top:2px solid #D9D6BE;font-size:0;line-height:0;">&nbsp;</div>
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>

</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>`;
}

const doc = (img) => `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${SUBJECT}</title>
<!--
  CAMPAIGN · THANKSGIVING 2026 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-thanksgiving.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

const missing = new Set();
const h = (f) => SHARED[f]?.[0] || hosted[f] || (missing.add(f), `MISSING:${f}`);
const full = doc(h);
if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
else {
  const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/thanksgiving.html`, full);
  console.log('wrote', `${OUT}/thanksgiving.html`, '(validator: pass)');
}
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
const loc = (f) => SHARED[f]?.[1] || `../${OUT}/img/${f}`;
fs.writeFileSync('refine/thanksgiving.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Thanksgiving 2026 · preview</title><style>
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
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${ent(PREHEADER)}</span></div></div></div>
${body(loc)}
</body></html>`);
console.log('wrote refine/thanksgiving.html');
