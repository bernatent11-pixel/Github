// Order confirmation · Mate Latte · sent right after Placed Order.
//
// Thanks them, confirms the order (number + total from the Placed Order event) and
// shows how to track it: Shopify's own order status page (event.extra.order_status_url,
// opens with no login, shows every item, the receipt and, once it ships, the carrier
// and live tracking) and their Milonga account (milonga.life/account) for all orders.
// The card lists the Mate Latte lines of the order only: a {% for %} over the order's
// line items with {% if 'Mate Latte' in item.title %} (approved by Bernat 2026-11-09), so
// other products in a mixed cart never print. Render-checked in Klaviyo.
//
// Writes:
//   exports/klaviyo/order-confirm/order-confirm.html   ONE complete HTML email (code template)
//   refine/order-confirm.html                          preview under an inbox row
// Usage: node scripts/make-order-confirm-assets.mjs && node scripts/make-order-confirm.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/order-confirm';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const SHARED = {
  'logo-beige.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/c267d1bd-4e34-4ee1-b901-eac7bc60b87d.png', '../exports/klaviyo/pp1-e3/img/logo-beige.png'],
  'mark-green.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png', '../public/logo/mark-green.png'],
  'cart-pouch.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/dd3e85e8-9b20-404f-99b8-4c8516057d55.png', '../exports/klaviyo/cart-e1/img/cart-pouch.png'],
};
for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;
const C = JSON.parse(fs.readFileSync(`${OUT}/colors.json`, 'utf8'));

export const SUBJECT = 'Your order is confirmed ✅';
export const PREHEADER = 'Thank you! Here’s your order number and how to track it.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const MINT = '#CFE0D4';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=order_confirmation&utm_content=${slot}`;
// Klaviyo tags (Placed Order event, Shopify). Render-checked in Klaviyo.
const T = {
  name: "{{ first_name|default:'there' }}",
  order: "{{ event.extra.name|default:'' }}",
  total: "{{ event.extra.total_price|default:'' }}",
  // Shopify's order status page for this order: no login needed; shows tracking once it ships
  track: "{{ event.extra.order_status_url|default:'https://milonga.life/account' }}",
};
// one row per Mate Latte line in the order (title, size, quantity, price per bag)
const ITEMS_OPEN = "{% for item in event.extra.line_items %}{% if 'Mate Latte' in item.title %}";
const ITEMS_CLOSE = '{% endif %}{% endfor %}';
const ITEM = {
  title: "{{ item.title|default:'The Original Mate Latte - Vanilla' }}",
  size: "{{ item.variant_title|default:'' }}",
  qty: "{{ item.quantity|default:'1' }}",
  price: "{{ item.price_set.presentment_money.amount|default:'' }}",
};
const L = { account: `${SITE}/account`, home: `${SITE}/?${utm('oc_logo')}` };
const HELP = 'orders@milongamate.com';

const STEPS = [
  { img: 'step-confirmed.png', t: 'Order confirmed', d: 'We’ve got it. You’re <span style="white-space:nowrap;">all set.</span>' },
  { img: 'step-shipped.png', t: 'Packed and shipped', d: 'We’ll email you the moment it’s on <span style="white-space:nowrap;">its way.</span>' },
  { img: 'step-delivered.png', t: 'At your door', d: 'Ready for your <span style="white-space:nowrap;">first cup.</span>' },
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
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:44px !important; line-height:46px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .card { padding:22px 18px !important; }
    .card-k { font-size:12px !important; }
    .card-v { font-size:20px !important; }
    .item-img { width:60px !important; }
    .item-title { font-size:14px !important; line-height:18px !important; }
    .item-price { width:76px !important; font-size:17px !important; }
    .how { padding:0 4px !important; }
    .how-img { width:48px !important; height:48px !important; }
    .how-t { font-size:13px !important; line-height:17px !important; }
    .how-d { font-size:11.5px !important; line-height:16px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-hero-top { background-color:${C.heroTop} !important; }
    .bg-hero { background-color:${C.heroBottom} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-gold { background-color:${GOLD} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const outline = (href, label) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr>
<td align="center" style="border:2px solid ${FOREST};border-radius:999px;"><a href="${amp(href)}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:13px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;color:${FOREST};text-decoration:none;">${label}</a></td>
</tr></table>`;
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
<td valign="middle" style="padding:14px 10px 0 4px;font-family:${FONT};word-break:break-word;overflow-wrap:anywhere;">
<div class="item-title" style="font-size:15px;line-height:20px;font-weight:700;color:${INK};">${v.title}</div>
<div style="padding-top:3px;font-size:13px;line-height:18px;font-weight:500;color:${SOFT};">${v.size} &middot; Qty ${v.qty}</div>
</td>
<td class="item-price" width="92" align="right" valign="middle" style="width:92px;padding:14px 0 0;font-family:${SERIF};font-size:20px;line-height:22px;font-weight:700;color:${FOREST};">$${v.price}<div style="font-family:${FONT};font-size:11px;line-height:14px;font-weight:500;color:${SOFT};">each</div></td>
</tr></table>
</td></tr>`;
}
// the paste-ready file loops over the order; the preview swaps in sample lines
let ITEM_ROWS = (img) => `${ITEMS_OPEN}${itemRow(img, ITEM)}${ITEMS_CLOSE}`;

function body(img) {
  const kv = (k, v, last) => `<tr>
<td class="card-k" align="left" valign="middle" style="padding:14px 0;${last ? '' : `border-bottom:1px solid ${LINE};`}font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${SOFT};">${k}</td>
<td class="card-v" align="right" valign="middle" style="padding:14px 0;${last ? '' : `border-bottom:1px solid ${LINE};`}font-family:${SERIF};font-size:24px;line-height:28px;font-weight:700;color:${FOREST};word-break:break-all;">${v}</td>
</tr>`;
  const how = STEPS.map((s) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(s.img)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="how-t" style="padding-top:14px;font-size:15px;line-height:19px;font-weight:700;color:${FOREST};">${ent(s.t)}</div>
<div class="how-d" style="padding-top:6px;font-size:13px;line-height:19px;font-weight:500;color:${INK};">${ent(s.d)}</div>
</td>`).join('\n');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · THANK YOU (the pouch on green; the photo's edges fade into the flat greens) ── -->
${row(C.heroTop, 'pad bg-hero-top', 'padding:34px 40px 8px;', `<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-beige.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:30px;">${eyebrow('Order confirmed', GOLD)}</div>
${title('Thank you for', 'your order.', 'h-hero', 54, BEIGE, 10)}
${lead(`Hey ${T.name}, ${ent('your Mate Latte is officially on its way to becoming your new morning ritual. We’re getting your order ready now, and we’ll email you')} ${nw(ent('the moment it ships.'))}`, MINT)}`)}
<tr><td class="bg-hero-top" bgcolor="${C.heroTop}" style="background-color:${C.heroTop};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('hero.jpg')}" width="600" height="${C.heroH}" alt="The Mate Latte pouch on deep green" style="display:block;width:600px;height:${C.heroH}px;border:0;"></td></tr>
${row(C.heroBottom, 'pad bg-hero', 'padding:0 40px 52px;', button(T.track, 'Track my order', 300, GOLD, FOREST, '#B8913A'))}

<!-- ── 2 · YOUR ORDER (number and total from the Placed Order event) ── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `${eyebrow('Your order')}
${title('All the details,', 'in one place.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-cream" bgcolor="${CREAM}" style="background-color:${CREAM};padding:28px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="card" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px solid ${LINE};border-radius:22px;padding:22px 28px;">
<div class="card-k" style="font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${SOFT};">Your Mate Latte</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
${ITEM_ROWS(img)}
${kv('Order number', T.order)}
${kv('Order total', `$${T.total}`, true)}
</table>
</td></tr></table>
</td></tr>
${row(CREAM, 'pad bg-cream', 'padding:22px 40px 56px;', `<div style="font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Your order page has everything: every item, your receipt, your shipping address and, once it ships, live tracking.')}</div>
<div style="padding-top:24px;">${button(T.track, 'View my order', 280)}</div>`)}

<!-- ── 3 · WHAT HAPPENS NEXT ── -->
${row(GOLD, 'pad bg-gold', 'padding:52px 40px 0;', `${eyebrow('What happens next')}
${title('From our hands', 'to your door.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-gold" bgcolor="${GOLD}" style="background-color:${GOLD};padding:34px 30px 56px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${how}
</tr></table>
</td></tr>

<!-- ── 4 · TRACK IT ANYTIME: the order page (no login) or their Milonga account ── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `${eyebrow('Track it anytime')}
${title('Where’s my order?', 'Two easy ways to check.', 'h-sec', 36)}
${lead(`<strong style="font-weight:700;color:${FOREST};">${ent('1. Tap “Track my order” in this email.')}</strong> ${ent('No login needed. Once your order ships, it shows the carrier, your tracking number and where your package is.')}`, INK, 'text-align:left;')}
${lead(`<strong style="font-weight:700;color:${FOREST};">${ent('2. Log in to your Milonga account.')}</strong> ${ent('See this order and every order after it, with tracking, in one place. Use the email you ordered with.')}`, INK, 'text-align:left;')}
<div style="padding-top:26px;">${outline(L.account, 'Log in to my account')}</div>`)}

<!-- ── 5 · NEED HELP? ── -->
${row(CREAM, 'pad bg-cream', 'padding:48px 40px 0;', `<div style="margin:0 auto;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div style="padding-top:28px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">Questions about your order?</div>
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
  ORDER CONFIRMATION · MATE LATTE · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: right after Placed Order. Tracking: Shopify's order status page (event.extra.order_status_url).
  GENERATED by scripts/make-order-confirm.mjs. Edit the script, not this file.
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
    fs.writeFileSync(`${OUT}/order-confirm.html`, full);
    console.log('wrote', `${OUT}/order-confirm.html`, '(validator: pass)');
  }
}

// preview: sample order values in place of the tags
const SAMPLE = { [T.name]: 'Bernat', [T.order]: '#3345', [T.total]: '69.98', [T.track]: 'https://milonga.life/account' };
ITEM_ROWS = (img) => [
  { title: 'The Original Mate Latte - Vanilla', size: '30 Servings', qty: '1', price: '69.98' },
].map((v) => itemRow(img, v)).join('\n');
const sample = (h) => Object.entries(SAMPLE).reduce((s, [k, v]) => s.split(k).join(v), h);
const loc = (f) => SHARED[f]?.[1] || `../${OUT}/img/${f}`;
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/order-confirm.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Order confirmation · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
body{margin:0;background:#FFFFFF;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8A8A8A;margin-bottom:8px}
.inbox .row{background:#fff;border:1px solid #E2E2E2;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style>${STYLE}</head><body>
<div class="inbox"><div class="lab">Inbox preview · sample order</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${sample(body(loc))}
</body></html>`);
console.log('wrote refine/order-confirm.html');
