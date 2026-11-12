// Post-purchase · Mate Mornings Club SUBSCRIBERS · Email 3 · before their THIRD order
//
// Job (Bernat, 2026-11-12): before the third order of their subscription, upsell the size they order.
//   15 servings -> move them to 30 servings (15 servings on a monthly delivery is about two weeks of lattes)
//   30 servings -> move them to 60, if they drink more than one latte a day
//   60 servings -> no upsell, give them some value
// One version per branch of the flow's "Serving Size Split" (flow TDEpRY, after Email 2).
//
// Facts used (milonga.life / Shopify, 2026-11-11)
//   Mate Latte, monthly only. 15 servings $34.99, plan 9479323958: 15% off every order after the first ->
//   $29.74/mo ($1.98 a serving). 30 servings $66.48 and 60 servings $125.98, plan 8837562678: 30% off every
//   order after the first -> $46.54/mo ($1.55) and $88.19/mo ($1.47). 1 / 2 / 4 pouches (the bags art).
//   How to switch: the 15 and the 30 & 60 servings sit in different selling plan groups, and we have not
//   verified that Appstle's portal can swap sizes, so the switch is a pre-written email to the team
//   (mailto, orders@milongamate.com) or a reply. The personal portal link is Appstle's
//   {{ event.manageSubscriptionLink }} (render-tested in sub1-e2).
//
// Writes, per version (15, 30, 60):
//   exports/klaviyo/sub1-e3-<v>/sub1-e3-<v>.html   ONE complete HTML email (Klaviyo code template)
//   refine/sub1-e3-<v>.html                        preview under an inbox row
// Usage: node scripts/make-sub1-e3-assets.mjs && node scripts/make-sub1-e3.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const OWN = 'exports/klaviyo/sub1-e3';
const hostedPath = `${OWN}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const SHARED = {
  'logo-green.png': [`${K}b6a03046-605a-4e87-b22f-a530be1633e3.png`, '../exports/klaviyo/welcome-e1/img/logo-green.png'],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'bags-30.png': [`${K}7b6e7cd1-ea70-4c06-80c6-dc8d8365da27.png`, '../exports/klaviyo/bf-2026/img/bags-30.png'],
  'bags-60.png': [`${K}cb792bc0-a51c-4dee-8953-5c1e406d2ee3.png`, '../exports/klaviyo/bf-2026/img/bags-60.png'],
  'drink-hot.png': [`${K}eb720e35-e441-496a-a96c-5f30dc637591.png`, '../exports/klaviyo/pp1-e1/img/drink-hot.png'],
  'drink-iced.png': [`${K}93430b07-73ca-42d5-947b-2da6b2c4fdd7.png`, '../exports/klaviyo/pp1-e1/img/drink-iced.png'],
};
for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SHINE = 'background-color:#D2A346;background-image:linear-gradient(135deg,#F8E79A 0%,#E6BE5A 28%,#C48F2C 55%,#EFD27C 80%,#D5A84A 100%);';
const SHINE_INK = 'color:#FFFFFF;text-shadow:0 1px 1px rgba(90,55,10,.55);';
const SITE = 'https://milonga.life';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=post_purchase_subscribers&utm_content=${slot}`;
const PORTAL = "{{ event.manageSubscriptionLink|default:'https://milonga.life/apps/subscriptions' }}";
const HELP = 'orders@milongamate.com';
const HOME = `${SITE}/?${utm('sub1_e3_logo')}`;
const mailto = (from, to) => `mailto:${HELP}?subject=${encodeURIComponent(`Switch my subscription to ${to} servings`)}&body=${encodeURIComponent(`Hi! Please switch my Mate Latte subscription from ${from} to ${to} servings, starting with my next order. Thank you!`)}`;

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const PLAN = {
  15: { size: '15 Servings', img: 'bags-15.png', alt: 'One Mate Latte pouch', price: '$29.74', unit: '$1.98 / serving', off: '15% off every order' },
  30: { size: '30 Servings', img: 'bags-30.png', alt: 'Two Mate Latte pouches', price: '$46.54', unit: '$1.55 / serving', off: '30% off every order' },
  60: { size: '60 Servings', img: 'bags-60.png', alt: 'Four Mate Latte pouches', price: '$88.19', unit: '$1.47 / serving', off: '30% off every order' },
};

const VERSIONS = [
  {
    v: 15, to: 30,
    subject: '15 servings, 30 mornings 🤔',
    preheader: 'Here’s how to cover the whole month, for less per cup.',
    eyebrow: 'Your Mate Mornings Club',
    t: ['Running out', 'before the month does?'],
    lead: `Your plan brings 15 servings a month. If you have a Mate Latte most mornings, that’s about two weeks of lattes in a ${nw('30-day month.')} With 30 servings, every morning is covered, and every cup ${nw('costs less.')}`,
    badge: 'Every morning covered',
    note: `Tap the button and send the email, and we’ll switch your plan before your next order ships. Or simply reply ${nw('to this email.')}`,
    stay: ['Happy with 15?', 'You don’t need to do a thing. Your next order ships as usual.'],
  },
  {
    v: 30, to: 60,
    subject: 'Two lattes a day? 👀',
    preheader: 'Then 60 servings keeps both cups covered all month, for less per cup.',
    eyebrow: 'For the two-latte days',
    t: ['One a day', 'not enough?'],
    lead: `We get it. If you’ve been having two Mate Lattes a day, 30 servings lasts about two weeks. The 60 servings keeps both cups covered all month, and every cup costs ${nw('a little less.')}`,
    badge: 'Two a day, all month',
    note: `Tap the button and send the email, and we’ll switch your plan before your next order ships. Or simply reply ${nw('to this email.')}`,
    stay: ['One a day?', 'You’re all set. Nothing to change, your next order ships as usual.'],
  },
  {
    v: 60,
    subject: 'Thank you for every morning 💛',
    preheader: 'Your next box ships soon. A few ways to enjoy it.',
    eyebrow: 'Your Mate Mornings Club',
    t: ['Thank you for', 'every morning.'],
    lead: `Your next box ships soon, and we just wanted to say thanks for making the Mate Latte part of your day. Here are a few ways to keep it ${nw('feeling new.')}`,
  },
];

const STYLE = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:#004D27 !important; text-decoration:none !important; }
  .web-view-line a { color:#3B5344 !important; }
  @media only screen and (max-width:480px) {
    .pad { padding-left:22px !important; padding-right:22px !important; }
    .pad-cards { padding-left:12px !important; padding-right:12px !important; }
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:40px !important; line-height:43px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .card-col { width:50% !important; max-width:50% !important; }
    .card-col > div { padding:0 4px 14px !important; }
    .card { padding:16px 6px 16px !important; }
    .c-price { font-size:28px !important; line-height:32px !important; }
    .c-img { max-width:150px !important; }
    .c-tab { font-size:9px !important; letter-spacing:.8px !important; padding:5px 10px !important; }
    .c-unit { font-size:12px !important; }
    .c-off { font-size:10px !important; letter-spacing:.6px !important; }
    .big { font-size:52px !important; line-height:56px !important; }
    .drink-img { width:140px !important; height:144px !important; }
    .drink-text { font-size:12.5px !important; line-height:18px !important; }
    .btn { padding:17px 26px !important; font-size:14px !important; letter-spacing:1.4px !important; }
  }
  @media only screen and (max-width:360px) {
    .card { padding:14px 4px 14px !important; }
    .c-price { font-size:24px !important; line-height:28px !important; }
    .c-img { max-width:118px !important; }
    .c-tab { font-size:8px !important; padding:5px 7px !important; }
    .h-hero { font-size:36px !important; line-height:39px !important; }
    .btn { padding:15px 20px !important; font-size:13px !important; letter-spacing:1px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-gold { background-color:${GOLD} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 36px;font-family:${FONT};font-size:15px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = ([a, b], cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const lead = (t, color = INK, extra = '') => `<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${ent(t)}</div>`;
const pill = (t, style) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td class="c-tab" ${style} border-radius:9px 9px 0 0;padding:5px 14px;font-family:${FONT};font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;">${t}</td></tr></table>`;

// a plan card: a tab on top (where they are now, or the upgrade in shiny gold), the size, the monthly price,
// the pouches, per serving and the club discount. Hybrid columns: side by side when there is room,
// stacked in inboxes without media queries and less than 556px; phones with media queries keep two columns.
const card = (p, img, now, badge) => `<div class="card-col" style="display:inline-block;vertical-align:top;width:100%;max-width:262px;">
<div style="padding:0 8px 18px;font-size:14px;">
${now ? pill('Your plan now', `bgcolor="${BEIGE}" style="background-color:${BEIGE};color:${SOFT};`) : pill(badge, `bgcolor="#D2A346" style="${SHINE}${SHINE_INK}`)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td class="card" align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:${now ? `1px solid ${LINE}` : `2px solid ${FOREST}`};border-radius:18px;padding:20px 10px 18px;font-family:${FONT};box-shadow:0 8px 20px rgba(60,40,5,${now ? '.12' : '.24'});">
<div style="font-size:14px;line-height:18px;font-weight:700;color:${INK};">${p.size}</div>
<div class="c-price" style="padding-top:6px;font-size:34px;line-height:38px;font-weight:700;color:${now ? SOFT : FOREST};">${p.price}<span style="font-size:15px;font-weight:700;">/mo</span></div>
<img class="c-img" src="${img(p.img)}" width="210" height="140" alt="${p.alt}" style="display:block;margin:8px auto 6px;width:100%;max-width:210px;height:auto;border:0;${now ? 'opacity:.85;' : ''}">
<div class="c-unit" style="font-size:14px;line-height:18px;font-weight:700;color:${INK};">${p.unit}</div>
<div class="c-off" style="padding-top:6px;font-size:11px;line-height:15px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${now ? SOFT : FOREST};">${p.off}</div>
</td></tr></table>
</div>
</div>`;
const cards = (list) => `<div style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="524" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td width="262" valign="top"><![endif]-->
${list.join('\n<!--[if mso]></td><td width="262" valign="top"><![endif]-->\n')}
<!--[if mso]></td></tr></table><![endif]-->
</div>`;

const header = (V, img) => `<!-- ── 1 · THE QUESTION ── -->
${row(CREAM, 'pad bg-cream', 'padding:34px 40px 44px;', `<a href="${amp(HOME)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-green.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:28px;">${eyebrow(V.eyebrow)}</div>
${title(V.t, 'h-hero', 48, FOREST, 10)}
<div style="max-width:470px;margin:0 auto;">${lead(V.lead)}</div>`)}`;

const footer = (img) => `<!-- ── FOOTER ── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:48px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(HOME)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(HOME)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>`;

const help = `<div style="margin:0 auto;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div style="padding-top:26px;font-family:${SERIF};font-size:24px;line-height:28px;font-weight:700;font-style:italic;color:${FOREST};">Questions about your plan?</div>
<div style="padding-top:10px;font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Just reply to this email, or write to us at')} <a href="mailto:${HELP}" style="color:${FOREST};font-weight:700;text-decoration:underline;">${HELP}</a>.</div>`;

function upsell(V, img) {
  const from = PLAN[V.v], to = PLAN[V.to];
  return `${header(V, img)}

<!-- ── 2 · YOUR PLAN NOW vs THE SWITCH, then the switch button (a pre-written email to the team) ── -->
<tr><td class="pad-cards bg-gold" align="center" bgcolor="${GOLD}" style="background-color:${GOLD};padding:44px 26px 8px;font-family:${FONT};">
${cards([card(from, img, true), card(to, img, false, V.badge)])}
</td></tr>
${row(GOLD, 'pad bg-gold', 'padding:14px 40px 50px;', `${button(mailto(V.v, V.to), `Switch me to ${V.to} servings`, 380)}
<div style="max-width:420px;margin:0 auto;padding-top:20px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${ent(V.note)}</div>`)}

<!-- ── 3 · HAPPY AS YOU ARE? (no pressure) + where to manage it ── -->
${row(CREAM, 'pad bg-cream', 'padding:48px 40px 0;', `<div class="h-sec" style="font-family:${SERIF};font-size:34px;line-height:38px;font-weight:700;font-style:italic;color:${FOREST};">${ent(V.stay[0])}</div>
<div style="max-width:420px;margin:0 auto;padding-top:10px;font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent(V.stay[1])} Need to skip or pause? <a href="${PORTAL}" target="_blank" style="color:${FOREST};font-weight:700;text-decoration:underline;">Manage your subscription</a>.</div>
<div style="padding-top:44px;">${help}</div>`)}

${footer(img)}`;
}

const drink = (pad, image, alt, name, text, img) => `<td width="50%" align="center" valign="top" style="width:50%;padding:${pad};font-family:${FONT};">
<img class="drink-img" src="${img(image)}" width="200" height="205" alt="${alt}" style="display:block;margin:0 auto;width:200px;height:205px;border:0;">
<div style="padding-top:14px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">${name}</div>
<div class="drink-text" style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${text}</div>
</td>`;

function thanks(V, img) {
  const p = PLAN[60];
  return `${header(V, img)}

<!-- ── 2 · ALREADY OUR BEST VALUE ── -->
${row(GOLD, 'pad bg-gold', 'padding:46px 40px 50px;', `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td bgcolor="#D2A346" style="${SHINE}${SHINE_INK}border-radius:999px;padding:7px 18px;font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:1px;white-space:nowrap;">${ent('You’re on our best value')}</td></tr></table>
<div class="big" style="padding-top:16px;font-family:${SERIF};font-size:64px;line-height:66px;font-weight:700;color:${FOREST};">$1.47</div>
<div style="padding-top:2px;font-family:${SERIF};font-size:24px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">a cup</div>
<img class="c-img" src="${img(p.img)}" width="240" height="160" alt="${p.alt}" style="display:block;margin:14px auto 4px;width:240px;max-width:100%;height:auto;border:0;">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${FOREST};">60 servings &middot; 30% off every order</div>`)}

<!-- ── 3 · WAYS TO ENJOY IT (the hot and iced cutouts from pp1-e1) ── -->
${row('#FFFFFF', 'pad bg-white', 'padding:50px 40px 0;', `${eyebrow('Mix it up')}
${title(['Two cups a day,', 'two ways.'], 'h-sec', 38)}`)}
<tr><td class="pad bg-white" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:30px 30px 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${drink('0 10px 0 0', 'drink-hot.png', 'A hot Mate Latte in a glass mug', 'Hot', `Heat ${nw('8oz of milk')} or water, add ${nw('2.5 tablespoons')} and froth until smooth.`, img)}
${drink('0 0 0 10px', 'drink-iced.png', 'An iced Mate Latte in a tall glass', 'Iced', `Mix ${nw('2.5 tablespoons')} into ${nw('8oz of cold')} milk or water and pour it over ice.`, img)}
</tr></table>
</td></tr>
${row('#FFFFFF', 'pad bg-white', 'padding:14px 40px 52px;', `<div style="max-width:430px;margin:0 auto;font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Tip: try it with oat or almond milk, or a pinch of cinnamon on top. What’s your go-to? Hit reply and tell us. We read every one.')}</div>`)}

<!-- ── 4 · YOUR PLAN, YOUR PACE ── -->
${row(CREAM, 'pad bg-cream', 'padding:50px 40px 0;', `${eyebrow('Your plan, your pace')}
${title(['Running low?', 'Got extra?'], 'h-sec', 38)}
<div style="max-width:440px;margin:0 auto;">${lead(`Running low before your next box? Just reply and we’ll send it sooner. Got plenty left? Skip a month ${nw('in your account.')}`)}</div>
<div style="padding-top:28px;">${button(PORTAL, 'Manage my subscription', 340)}</div>
<div style="padding-top:48px;">${help}</div>`)}

${footer(img)}`;
}

const body = (V, img) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;">

${V.to ? upsell(V, img) : thanks(V, img)}

</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>`;

const doc = (V, img) => `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${V.subject}</title>
<!--
  POST-PURCHASE · MATE MORNINGS CLUB SUBSCRIBERS · EMAIL 3 · ${V.v} SERVINGS · "${V.subject}"
  Preview text: ${V.preheader}
  Flow: Post Purchase - First-Time Subscribers, "Serving Size Split" branch "${V.v} Servings",
  about a week before their third order. GENERATED by scripts/make-sub1-e3.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(V, img)}
</body>
</html>
`;

const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
for (const V of VERSIONS) {
  const OUT = `exports/klaviyo/sub1-e3-${V.v}`;
  fs.mkdirSync(OUT, { recursive: true });
  const missing = new Set();
  const h = (f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; };
  const full = doc(V, h);
  if (missing.size) console.log(`${V.v}: not hosted yet:`, [...missing].join(', '), '(paste-ready file not written)');
  else {
    const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
    if (problems.length) { console.error(V.v, problems); process.exit(1); }
    fs.writeFileSync(`${OUT}/sub1-e3-${V.v}.html`, full);
    console.log('wrote', `${OUT}/sub1-e3-${V.v}.html`, '(validator: pass)');
  }
  const loc = (f) => SHARED[f]?.[1] || `../${OWN}/img/${f}`;
  fs.writeFileSync(`refine/sub1-e3-${V.v}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Subscribers E3 · ${V.v} servings · preview</title><style>
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
<div class="sub"><b>${V.subject}</b> <span>&mdash; ${ent(V.preheader)}</span></div></div></div>
${body(V, loc).replaceAll(PORTAL, 'https://milonga.life/apps/subscriptions')}
</body></html>`);
  console.log('wrote', `refine/sub1-e3-${V.v}.html`);
}
