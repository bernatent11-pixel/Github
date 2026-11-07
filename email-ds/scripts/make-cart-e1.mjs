// Cart abandonment · Mate Latte · Email 1 · "Your Mate Latte is waiting"
//
// For people who added the Mate Latte to their cart and left. Sent 1 hour
// after Added to Cart. Job (flow PDF): show them their cart, put subscribe
// and one-time side by side, remind them of the edge, one button back to the
// cart. No discount up front.
//
// The cart itself is Klaviyo's own Dynamic Table block, placed by hand
// between the two HTML blocks this script writes, so no loop tag is
// hand-written here (our allowlist has none).
//
// Writes:
//   exports/klaviyo/cart-e1/cart-e1-top.html     HTML block 1 (above the cart)
//   exports/klaviyo/cart-e1/cart-e1-bottom.html  HTML block 2 (below the cart)
//   refine/cart-e1.html                          preview, with a sample cart row
// Usage: node scripts/make-cart-e1.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/cart-e1';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
// shared marks already on Klaviyo's CDN (Welcome E1)
hosted['logo-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/b6a03046-605a-4e87-b22f-a530be1633e3.png';
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';
hosted['disc-gold-yerba-mate.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/3f6c2de8-85cb-4fe0-9a93-38b08cff2575.png';
hosted['disc-gold-l-theanine.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/6f3cd229-74f8-4c52-b6fb-93d10911e05f.png';
hosted['disc-gold-lions-mane.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/58b029ea-6b1e-4537-95d9-10aa3155bbde.png';
const LOCAL = { 'logo-green.png': '../exports/klaviyo/welcome-e1/img/logo-green.png', 'mark-green.png': '../public/logo/mark-green.png' };
for (const k of ['disc-gold-yerba-mate.png', 'disc-gold-l-theanine.png', 'disc-gold-lions-mane.png']) LOCAL[k] = `../exports/klaviyo/welcome-e1/img/${k}`;

export const SUBJECT = 'You left something good behind';
export const PREHEADER = 'We saved your cart. Your creamy vanilla mornings are one click away.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";

const SITE = 'https://milonga.life';
const PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=cart_abandon_mate_latte&utm_content=${slot}`;
const L = {
  cart: (slot) => `${SITE}/cart?${utm(slot)}`,
  subscribe: `${SITE}${PDP}?${utm('c1_subscribe_link')}`,
  home: `${SITE}/?${utm('c1_logo')}`,
};

// Prices from Shopify (2026-11-07): 15 $34.99 · 30 $69.98 · 60 $139.96.
// Mate Mornings Club: 30% off 30 and 60 servings, 15% off 15, monthly.
// Side by side, both 30 servings: one-time $69.98 ($2.33 a cup) vs subscribed $48.99 ($1.63 a cup).
const C = JSON.parse(fs.readFileSync(`${OUT}/colors.json`, 'utf8'));
const EDGE = [
  { disc: 'disc-gold-yerba-mate.png', dose: '100mg', name: 'natural caffeine', line: 'Coffee-level energy from yerba mate, <span style="white-space:nowrap;">no jitters.</span>' },
  { disc: 'disc-gold-l-theanine.png', dose: '200mg', name: 'L-theanine', line: 'Keeps the energy smooth, calm and focused.' },
  { disc: 'disc-gold-lions-mane.png', dose: '500mg', name: 'Lion’s Mane', line: 'The functional mushroom, for <span style="white-space:nowrap;">clear-headed</span> mornings.' },
];
// The Mate Mornings Club's benefits, as the product page words them.
const CLUB = [
  { icon: 'icon-save.png', text: 'Save 30% on every order <span style="white-space:nowrap;">(30 or 60 servings)</span>' },
  { icon: 'icon-delivery.png', text: 'Delivered to your door <span style="white-space:nowrap;">every month</span>' },
  { icon: 'icon-pause.png', text: 'Skip, pause or cancel anytime' },
];

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const button = (href, label, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${FOREST}"><w:anchorlock/><center style="color:${BEIGE};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${FOREST};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${BEIGE};text-decoration:none;box-shadow:0 4px 0 ${DEEP};">${label}</a><!--<![endif]-->`;

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
    .cmp-l { padding-right:4px !important; }
    .cmp-r { padding-left:4px !important; }
    .cmp-card { padding:18px 10px 18px !important; }
    .cmp-price { font-size:32px !important; line-height:34px !important; }
    .cmp-text { font-size:12px !important; line-height:17px !important; }
    .club-ico { width:16px !important; padding-right:6px !important; }
    .edge { padding:0 4px !important; }
    .edge-disc { width:48px !important; height:48px !important; }
    .edge-dose { font-size:24px !important; line-height:26px !important; }
    .edge-name { font-size:12px !important; line-height:15px !important; }
    .edge-text { font-size:11.5px !important; line-height:15px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color:${BEIGE} !important; }
    .bg-hero-top { background-color:${C.heroTop} !important; }
    .bg-hero { background-color:${C.heroBottom} !important; }
    .bg-wall { background-color:${C.finalTop} !important; }
    .bg-table { background-color:${C.finalBottom} !important; }
  }
</style>`;

const open = (bg, cls) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bg}" class="${cls}" style="background-color:${bg};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">`;
const close = `</table>
</td></tr>
</table>`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = (a, b, cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const trust = `<div style="padding-top:18px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">${nw('Free shipping over $45')} &middot; ${nw('30-day money-back guarantee')}</div>`;

function top(img) {
  return `<!--
  CART ABANDONMENT · MATE LATTE · EMAIL 1 · "${SUBJECT}" · HTML BLOCK 1 of 2 (above the cart)
  Preview text: ${PREHEADER}
  Send: 1 hour after Added to Cart (Mate Latte in the cart). No discount.
  Layout in Klaviyo: [this HTML block] -> [Klaviyo Dynamic Table block: the cart,
  background ${C.heroBottom}] -> [cart-e1-bottom.html]
  GENERATED by scripts/make-cart-e1.mjs. Edit the script, not this file.
-->
${STYLE}
${open(C.heroBottom, 'bg-hero')}

<!-- ── 1 · YOUR MATE LATTE IS WAITING (the photo is the section's background:
     its top and bottom fade into the flat golds of the rows around it, and the
     same gold carries on under Klaviyo's cart block and the button) ── -->
<tr><td class="bg-hero-top" bgcolor="${C.heroTop}" style="background-color:${C.heroTop};padding:0;font-size:0;line-height:0;"><a href="${amp(L.cart('c1_photo'))}" target="_blank"><img class="full" src="${img('hero.jpg')}" width="600" height="${C.heroH}" alt="Milonga. The Mate Latte pouch beside a latte, with loose yerba mate on a golden table" style="display:block;width:600px;height:${C.heroH}px;border:0;"></a></td></tr>
${row(C.heroBottom, 'pad bg-hero', 'padding:6px 40px 22px;', `${eyebrow('You left something good behind')}
${title('Your Mate Latte', 'is waiting.', 'h-hero', 54, FOREST, 10)}
<div style="padding-top:14px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${ent('We saved your cart, so it’s right where you left it.')} ${nw('Here’s what’s inside:'.replace('’', '&rsquo;'))}</div>`)}

${close}`;
}

function bottom(img) {
  const card = (side, inner, style) => `<td class="${side === 'l' ? 'cmp-l' : 'cmp-r'}" width="50%" valign="top" style="width:50%;padding:${side === 'l' ? '0 6px 0 0' : '0 0 0 6px'};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="cmp-card" align="center" valign="top" ${style} padding:24px 16px 22px;font-family:${FONT};">
${inner}
</td></tr></table>
</td>`;
  const bullet = (t, color) => `<div class="cmp-text" style="padding-top:8px;font-size:13px;line-height:18px;font-weight:500;color:${color};">${t}</div>`;
  const oneTime = card('l', `<div style="font-size:11px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">One-time</div>
<div class="cmp-price" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:42px;font-weight:700;color:${FOREST};">$69.98</div>
<div class="cmp-text" style="padding-top:6px;font-size:14px;line-height:18px;font-weight:700;color:${INK};">30 servings</div>
<div class="cmp-text" style="padding-top:2px;font-size:13px;line-height:18px;font-weight:500;color:${SOFT};">$2.33 a cup</div>
<div style="margin:16px auto 0;width:40px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
${bullet('Buy once, reorder when you <span style="white-space:nowrap;">run out</span>', INK)}
<div style="padding-top:16px;font-size:13px;line-height:18px;font-weight:700;"><a href="${amp(L.cart('c1_onetime_link'))}" target="_blank" style="color:${FOREST};text-decoration:underline;">Keep one-time&nbsp;&rarr;</a></div>`,
    `bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px solid ${LINE};border-radius:22px;`);
  const club = CLUB.map((c) => `<tr><td class="club-ico" width="20" valign="top" style="width:20px;padding:9px 8px 0 0;"><img src="${img(c.icon)}" width="18" height="18" alt="" role="presentation" style="display:block;width:18px;height:18px;border:0;"></td>
<td class="cmp-text" valign="top" style="padding:8px 0 0;font-family:${FONT};font-size:13px;line-height:18px;font-weight:500;color:#FFFFFF;text-align:left;">${c.text}</td></tr>`).join('\n');
  const subscribe = card('r', `<div style="display:inline-block;background-color:${GOLD};border-radius:999px;padding:5px 12px;font-size:10px;line-height:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${FOREST};">Best value</div>
<div style="padding-top:10px;font-family:${SERIF};font-size:20px;line-height:22px;font-weight:700;font-style:italic;color:${GOLD};">Mate Mornings Club</div>
<div class="cmp-price" style="padding-top:8px;font-family:${SERIF};font-size:40px;line-height:42px;font-weight:700;color:#FFFFFF;">$48.99</div>
<div class="cmp-text" style="padding-top:6px;font-size:14px;line-height:18px;font-weight:700;color:#FFFFFF;">30 servings <span style="font-weight:500;color:#CFE0D4;text-decoration:line-through;">$69.98</span></div>
<div class="cmp-text" style="padding-top:2px;font-size:13px;line-height:18px;font-weight:500;color:#CFE0D4;">$1.63 a cup</div>
<div style="margin:16px auto 6px;width:40px;border-top:2px solid rgba(227,188,98,.6);font-size:0;line-height:0;">&nbsp;</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
${club}
</table>
<div class="cmp-text" style="padding-top:12px;font-size:13px;line-height:18px;font-weight:700;color:${GOLD};">${ent('Your Mate Latte every morning,')} <span style="white-space:nowrap;">all month long.</span></div>
<div style="padding-top:14px;font-size:13px;line-height:18px;font-weight:700;"><a href="${amp(L.subscribe)}" target="_blank" style="color:${GOLD};text-decoration:underline;">Join the club&nbsp;&rarr;</a></div>`,
    `bgcolor="${FOREST}" style="background-color:${FOREST};border:3px solid ${GOLD};border-radius:22px;`);

  const edge = EDGE.map((e) => `<td class="edge" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="edge-disc" src="${img(e.disc)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="edge-dose" style="padding-top:12px;font-family:${SERIF};font-size:30px;line-height:32px;font-weight:700;color:${FOREST};">${e.dose}</div>
<div class="edge-name" style="padding-top:4px;font-size:14px;line-height:18px;font-weight:700;color:${FOREST};">${ent(e.name)}</div>
<div class="edge-text" style="padding-top:6px;font-size:13px;line-height:18px;font-weight:500;color:${INK};">${ent(e.line)}</div>
</td>`).join('\n');

  return `<!--
  CART ABANDONMENT · MATE LATTE · EMAIL 1 · "${SUBJECT}" · HTML BLOCK 2 of 2 (below the cart)
  GENERATED by scripts/make-cart-e1.mjs. Edit the script, not this file.
-->
${STYLE}
${open(BEIGE, 'bg-page')}

<!-- ── 1 (continued) · the button, on the same gold as the cart above ── -->
${row(C.heroBottom, 'pad bg-hero', 'padding:24px 40px 52px;', `${button(L.cart('c1_hero_button'), 'Back to my cart', 290)}
${trust}`)}

<!-- ── 2 · ONE-TIME OR THE MATE MORNINGS CLUB, SIDE BY SIDE ────────── -->
${row(BEIGE, 'pad bg-page', 'padding:52px 40px 0;', `${eyebrow('Pick what works for you')}
${title('One-time, or', 'join the club?', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:28px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
${oneTime}
${subscribe}
</tr></table>
</td></tr>
${row(BEIGE, 'pad bg-page', 'padding:14px 40px 56px;font-size:12px;line-height:18px;font-weight:500;color:' + SOFT + ';', `1 serving = 1 cup. Same creamy vanilla Mate Latte <span style="white-space:nowrap;">either way.</span>`)}

<!-- ── 3 · ONE CUP, EVERYTHING YOU NEED (the pour photo; the title and the
     benefits sit on its table, below the cup) ── -->
<tr><td class="bg-wall" bgcolor="${C.finalTop}" style="background-color:${C.finalTop};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('final.jpg')}" width="600" height="${C.finalH}" alt="Milk pouring into an iced Mate Latte beside the pouch" style="display:block;width:600px;height:${C.finalH}px;border:0;"></td></tr>
${row(C.finalBottom, 'pad bg-table', 'padding:6px 40px 30px;', `${eyebrow('Why it’s worth coming back for')}
${title('One cup,', 'everything you need.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-table" bgcolor="${C.finalBottom}" style="background-color:${C.finalBottom};padding:0 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
${edge}
</tr></table>
</td></tr>
${row(C.finalBottom, 'pad bg-table', 'padding:26px 40px 0;', `<div style="font-size:14px;line-height:21px;font-weight:500;color:${INK};">${ent('Plus yerba mate’s antioxidants and vitamins, which support a healthy gut, your immune system and your metabolism.')} <strong style="font-weight:700;color:${FOREST};">${nw('Ready in 30 seconds,')} ${nw('hot or iced.')}</strong></div>`)}
${row(C.finalBottom, 'pad bg-table', 'padding:44px 40px 0;', `${title('Your cart’s all set.', 'Ready when you are.', 'h-sec', 34, FOREST, 0)}
<div style="padding-top:26px;">${button(L.cart('c1_closing_button'), 'Complete my order', 320)}</div>
${trust}`)}

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td class="bg-table" align="center" bgcolor="${C.finalBottom}" style="background-color:${C.finalBottom};padding:48px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>

${close}`;
}

// A stand-in for Klaviyo's Dynamic Table block, for the preview only.
const sampleCart = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.heroBottom}" style="background-color:${C.heroBottom};"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;"><tr><td style="padding:0 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;background:#FFFFFF;border-radius:18px;outline:2px dashed #7A5320;outline-offset:4px;"><tr>
<td width="96" style="padding:16px;"><img src="../${OUT}/img/cart-pouch.png" width="64" height="96" alt="" style="display:block;width:64px;height:auto;"></td>
<td style="padding:16px 0;font-family:${FONT};"><div style="font-size:15px;font-weight:700;color:${INK};">The Original Mate Latte - Vanilla</div><div style="padding-top:4px;font-size:13px;font-weight:500;color:${SOFT};">30 Servings &middot; Qty 1</div></td>
<td align="right" style="padding:16px 20px;font-family:${FONT};font-size:15px;font-weight:700;color:${FOREST};">$69.98</td>
</tr></table>
<div style="padding:10px 0 0;font-family:${FONT};font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5A3A12;text-align:center;">Sample row &middot; Klaviyo&rsquo;s Dynamic Table block shows their real cart here</div>
</td></tr></table></td></tr></table>`;

// ── paste-ready blocks (hosted images) ─────────────────────────────────
{
  const missing = new Set();
  const h = (f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; };
  const T = top(h), B = bottom(h);
  if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready files not written)');
  else {
    const pTop = validate(T).filter((p) => p.rule !== 'no-unsubscribe'); // the unsubscribe is in block 2
    const pBot = validate(B), pAll = validate(T + B);
    if (pTop.length || pBot.length || pAll.length) { console.error({ pTop, pBot, pAll }); process.exit(1); }
    fs.writeFileSync(`${OUT}/cart-e1-top.html`, T);
    fs.writeFileSync(`${OUT}/cart-e1-bottom.html`, B);
    console.log('wrote cart-e1-top.html + cart-e1-bottom.html (validator: pass)');
  }
}

// ── preview under an inbox row (local images, sample cart row) ──────────
const loc = (f) => LOCAL[f] || `../${OUT}/img/${f}`;
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/cart-e1.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cart E1 · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
body{margin:0;background:#2B3A31;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}
.inbox .row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style></head><body>
<div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${top(loc)}
${sampleCart}
${bottom(loc)}
</body></html>`);
console.log('wrote refine/cart-e1.html');
