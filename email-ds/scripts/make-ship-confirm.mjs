// Shipping confirmation · Mate Latte · "Your Mate Latte is on its way 📦"
//
// Trigger: Confirmed Shipment (Shopify, metric RMTv2i). Every value comes from that event
// (checked on a real UPS shipment 2026-11-09, render-checked in Klaviyo):
//   event.extra.fulfillment.tracking_company   carrier, e.g. UPS
//   event.extra.fulfillment.tracking_number    tracking number
//   event.extra.fulfillment.tracking_url       the carrier's tracking page
//   event.extra.fulfillment.line_items         what is in this package
//   event.extra.order.name / .orderStatusUrl   order number / Shopify order page (no login)
// The package list loops over the shipment's lines and prints only the Mate Latte ones
// ({% for %} + {% if 'Mate Latte' in item.title %}, approved by Bernat 2026-11-09).
//
// Writes:
//   exports/klaviyo/ship-confirm/ship-confirm.html   ONE complete HTML email (code template)
//   refine/ship-confirm.html                         preview under an inbox row (sample shipment)
// Usage: node scripts/make-ship-confirm-assets.mjs && node scripts/make-ship-confirm.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/ship-confirm';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const OC = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const SHARED = {
  'logo-beige.png': [`${OC}c267d1bd-4e34-4ee1-b901-eac7bc60b87d.png`, '../exports/klaviyo/pp1-e3/img/logo-beige.png'],
  'mark-green.png': [`${OC}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'cart-pouch.png': [`${OC}dd3e85e8-9b20-404f-99b8-4c8516057d55.png`, '../exports/klaviyo/cart-e1/img/cart-pouch.png'],
  'step-confirmed.png': [`${OC}8693bc27-1184-4016-a092-ce21f3f2b25f.png`, '../exports/klaviyo/order-confirm/img/step-confirmed.png'],
  'step-shipped.png': [`${OC}9a9ff44e-0e0e-4c08-a73c-f9c8fa7eff5f.png`, '../exports/klaviyo/order-confirm/img/step-shipped.png'],
  'step-delivered.png': [`${OC}5c7425af-2014-4fc1-9f75-064a5074a0cd.png`, '../exports/klaviyo/order-confirm/img/step-delivered.png'],
};
for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;

export const SUBJECT = 'Your Mate Latte is on its way 📦';
export const PREHEADER = 'Here’s your tracking number. Good mornings are on the way.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const MINT = '#CFE0D4';
const HERO_BG = '#3C82D2'; // the photo's sky, behind it while it loads
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=shipping_confirmation&utm_content=${slot}`;
const T = {
  name: "{{ first_name|default:'there' }}",
  order: "{{ event.extra.order.name|default:'' }}",
  carrier: "{{ event.extra.fulfillment.tracking_company|default:'Your carrier' }}",
  number: "{{ event.extra.fulfillment.tracking_number|default:'On your order page' }}",
  track: "{{ event.extra.fulfillment.tracking_url|default:'https://milonga.life/account' }}",
  page: "{{ event.extra.order.orderStatusUrl|default:'https://milonga.life/account' }}",
};
const ITEMS_OPEN = "{% for item in event.extra.fulfillment.line_items %}{% if 'Mate Latte' in item.title %}";
const ITEMS_CLOSE = '{% endif %}{% endfor %}';
const ITEM = {
  title: "{{ item.title|default:'The Original Mate Latte - Vanilla' }}",
  size: "{{ item.variant_title|default:'' }}",
  qty: "{{ item.quantity|default:'1' }}",
};
const L = { home: `${SITE}/?${utm('sc_logo')}` };
const HELP = 'orders@milongamate.com';

const STEPS = [
  { img: 'step-confirmed.png', t: 'Order confirmed', s: 'Done', c: '#5E4A1C' },
  { img: 'step-shipped.png', t: 'Shipped', s: 'On its way now', c: '#FFFFFF' },
  { img: 'step-delivered.png', t: 'At your door', s: 'Coming soon', c: '#5E4A1C' },
];

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
    .pad-photo { padding-left:16px !important; padding-right:16px !important; }
    .full { width:100% !important; height:auto !important; }
    .hero { height:588px !important; background-size:cover !important; }
    .hero-top { padding:18px 24px 0 !important; }
    .hero-logo { width:57px !important; height:60px !important; }
    .hero-eyebrow { padding-top:12px !important; font-size:10px !important; line-height:13px !important; letter-spacing:2px !important; }
    .hero-title { font-size:32px !important; line-height:34px !important; }
    .hero-title1 { padding-top:4px !important; }
    .hero-gap { height:268px !important; line-height:268px !important; }
    .hero-bottom { padding:0 22px !important; }
    .hero-intro { font-size:11.5px !important; line-height:15px !important; }
    .hero-cta { padding-top:12px !important; }
    .hero .btn { padding:12px 22px !important; font-size:12px !important; letter-spacing:1px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .card { padding:22px 18px !important; }
    .card-k { font-size:11px !important; letter-spacing:1px !important; }
    .card-v { font-size:17px !important; line-height:22px !important; }
    .item-img { width:60px !important; }
    .item-title { font-size:14px !important; line-height:18px !important; }
    .how { padding:0 4px !important; }
    .how-img { width:48px !important; height:48px !important; }
    .how-t { font-size:13px !important; line-height:17px !important; }
    .how-d { font-size:11.5px !important; line-height:16px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-gold { background-color:${GOLD} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = (a, b, cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const lead = (t, color, extra = '') => `<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${t}</div>`;

function itemRow(img, v) {
  return `<tr><td colspan="2" style="padding:0 0 14px;border-bottom:1px solid ${LINE};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
<td class="item-img" width="68" valign="middle" style="width:68px;padding:14px 0 0;"><img src="${img('cart-pouch.png')}" width="56" height="56" alt="The Mate Latte pouch" style="display:block;width:56px;height:56px;border:0;border-radius:12px;"></td>
<td valign="middle" style="padding:14px 0 0 4px;font-family:${FONT};word-break:break-word;overflow-wrap:anywhere;">
<div class="item-title" style="font-size:15px;line-height:20px;font-weight:700;color:${INK};">${v.title}</div>
<div style="padding-top:3px;font-size:13px;line-height:18px;font-weight:500;color:${SOFT};">${v.size} &middot; Qty ${v.qty}</div>
</td>
</tr></table>
</td></tr>`;
}
let ITEM_ROWS = (img) => `${ITEMS_OPEN}${itemRow(img, ITEM)}${ITEMS_CLOSE}`;

function body(img) {
  const kv = (k, v, last) => `<tr>
<td class="card-k" align="left" valign="middle" style="padding:14px 0;${last ? '' : `border-bottom:1px solid ${LINE};`}font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${SOFT};">${k}</td>
<td class="card-v" align="right" valign="middle" style="padding:14px 0;${last ? '' : `border-bottom:1px solid ${LINE};`}font-family:${SERIF};font-size:21px;line-height:26px;font-weight:700;color:${FOREST};word-break:break-all;">${v}</td>
</tr>`;
  const steps = STEPS.map((s) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(s.img)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="how-t" style="padding-top:14px;font-size:15px;line-height:19px;font-weight:700;color:${FOREST};">${ent(s.t)}</div>
<div class="how-d" style="padding-top:5px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${s.c};">${ent(s.s)}</div>
</td>`).join('\n');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · IT'S ON ITS WAY: Bernat's photo (two pouches held up to a blue sky) is the
     section's background; logo and title on the sky, the line and the button on the
     darkened bottom ── -->
<tr><td class="hero" align="center" valign="top" height="904" background="${img('hero-bg.jpg')}" bgcolor="${HERO_BG}" style="height:904px;background-color:${HERO_BG};background-image:url('${img('hero-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:904px;"><v:fill type="frame" src="${img('hero-bg.jpg')}" color="${HERO_BG}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="hero-top" style="padding:30px 40px 0;font-family:${FONT};text-align:center;">
<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-beige.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div class="hero-eyebrow" style="padding-top:22px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">Shipped</div>
<div class="hero-title hero-title1" style="padding-top:8px;font-family:${SERIF};font-size:48px;line-height:50px;font-weight:400;color:#FFFFFF;">Your Mate Latte</div>
<div class="hero-title" style="font-family:${SERIF};font-size:48px;line-height:50px;font-weight:700;font-style:italic;color:#FFFFFF;">is on its way.</div>
</div>
<div class="hero-gap" style="height:420px;line-height:420px;font-size:0;">&nbsp;</div>
<div class="hero-bottom" style="padding:0 44px;font-family:${FONT};text-align:center;">
<div class="hero-intro" style="font-size:15px;line-height:22px;font-weight:500;color:#FFFFFF;">${ent('Good news,')} ${T.name}! ${ent('Your order')} ${T.order} ${ent('just left us and it’s headed your way. Here’s how to follow it')} ${nw('to your door.')}</div>
<div class="hero-cta" style="padding-top:22px;">${button(T.track, 'Track my package', 320, GOLD, FOREST, '#B8913A')}</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · YOUR SHIPMENT: what's in the box (Mate Latte lines only), carrier,
     tracking number, order number ── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `${eyebrow('Your shipment')}
${title('Everything you need', 'to follow it.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-cream" bgcolor="${CREAM}" style="background-color:${CREAM};padding:28px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="card" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px solid ${LINE};border-radius:22px;padding:22px 28px;">
<div class="card-k" style="font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${SOFT};">In this package</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
${ITEM_ROWS(img)}
${kv('Carrier', T.carrier)}
${kv('Tracking number', T.number)}
${kv('Order', T.order, true)}
</table>
</td></tr></table>
</td></tr>
${row(CREAM, 'pad bg-cream', 'padding:22px 40px 56px;', `<div style="font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('“Track my package” opens the carrier’s live tracking. Your order page has your receipt and every update too.')}</div>
<div style="padding-top:24px;">${button(T.page, 'View my order', 280)}</div>`)}

<!-- ── 3 · WHERE IT IS NOW ── -->
${row(GOLD, 'pad bg-gold', 'padding:52px 40px 0;', `${eyebrow('Where it is now')}
${title('Packed, shipped', 'and almost there.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-gold" bgcolor="${GOLD}" style="background-color:${GOLD};padding:34px 30px 56px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${steps}
</tr></table>
</td></tr>

<!-- ── 4 · NEED HELP? ── -->
${row(CREAM, 'pad bg-cream', 'padding:48px 40px 0;', `<div style="margin:0 auto;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div style="padding-top:28px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">Questions about your delivery?</div>
<div style="padding-top:10px;font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Just reply to this email, or write to us at')} <a href="mailto:${HELP}" style="color:${FOREST};font-weight:700;text-decoration:underline;">${HELP}</a>. ${ent('We’re happy to help.')}</div>`)}

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
  SHIPPING CONFIRMATION · MATE LATTE · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: on Confirmed Shipment (Shopify). Tracking from the shipment event.
  GENERATED by scripts/make-ship-confirm.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

{
  const missing = new Set();
  const h = (f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; };
  const full = doc(h);
  if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
  else {
    const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
    if (problems.length) { console.error(problems); process.exit(1); }
    fs.writeFileSync(`${OUT}/ship-confirm.html`, full);
    console.log('wrote', `${OUT}/ship-confirm.html`, '(validator: pass)');
  }
}

// preview: a sample shipment in place of the tags
ITEM_ROWS = (img) => [{ title: 'The Original Mate Latte - Vanilla', size: '30 Servings', qty: '1' }].map((v) => itemRow(img, v)).join('\n');
const SAMPLE = { [T.name]: 'Bernat', [T.order]: '#3345', [T.carrier]: 'UPS', [T.number]: '1Z16D13WYW91352394', [T.track]: '#', [T.page]: '#' };
const sample = (h) => Object.entries(SAMPLE).reduce((s, [k, v]) => s.split(k).join(v), h);
const loc = (f) => SHARED[f]?.[1] || `../${OUT}/img/${f}`;
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/ship-confirm.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Shipping confirmation · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
body{margin:0;background:#FFFFFF;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8A8A8A;margin-bottom:8px}
.inbox .row{background:#fff;border:1px solid #E2E2E2;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style>${STYLE}</head><body>
<div class="inbox"><div class="lab">Inbox preview · sample shipment</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${sample(body(loc))}
</body></html>`);
console.log('wrote refine/ship-confirm.html');
