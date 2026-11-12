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
//   $29.74/mo ($1.98 a serving). 30 servings $62.98 and 60 servings $118.96 (Shopify, 2026-11-12), plan 8837562678: 30% off every
//   order after the first -> $44.09/mo ($1.47) and $83.27/mo ($1.39). 1 / 2 / 4 pouches (the bags art).
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
  'kit-percent.png': [`${K}298dca91-c865-4fbd-a20a-7eef59dfd2a5.png`, '../exports/klaviyo/bf-2026/img/kit-percent.png'],
  'kit-gift.png': [`${K}6ea66d49-d17e-4842-b7ef-51cfed05a0a5.png`, '../exports/klaviyo/bf-2026/img/kit-gift.png'],
  'kit-truck.png': [`${K}abfab9c8-eb93-4d4a-8f54-6b63d7238e4b.png`, '../exports/klaviyo/bf-2026/img/kit-truck.png'],
  'kit-pause.png': [`${K}a3e19542-83f1-4b00-952a-896da5e3ea72.png`, '../exports/klaviyo/bf-2026/img/kit-pause.png'],
  'kit-card.png': [`${K}7355a182-9dee-4eac-bff7-61d1b47c5bd6.png`, '../exports/klaviyo/bf-2026/img/kit-card.png'],
};
for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;

const PLANS_TOP = '#C99253', PLANS_LOW = '#BE8546', COCOA = '#5A3A1E';
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
const mailto = (from, to, extra = '') => `mailto:${HELP}?subject=${encodeURIComponent(`Switch my subscription to ${to} servings`)}&body=${encodeURIComponent(`Hi! Please switch my Mate Latte subscription from ${from} to ${to} servings, starting with my next order${extra}. Thank you!`)}`;

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const PLAN = {
  15: { size: '15 Servings', img: 'bags-15.png', alt: 'One Mate Latte pouch', price: '$29.74', unit: '$1.98 / serving', off: '15% off every order' },
  30: { size: '30 Servings', img: 'bags-30.png', alt: 'Two Mate Latte pouches', price: '$44.09', unit: '$1.47 / serving', off: '30% off every order' },
  60: { size: '60 Servings', img: 'bags-60.png', alt: 'Four Mate Latte pouches', price: '$83.27', unit: '$1.39 / serving', off: '30% off every order' },
};

const VERSIONS = [
  {
    v: 15, to: 30,
    subject: '15 servings, 30 mornings 🤔',
    preheader: 'Every morning covered, less per cup, and a free frother on us.',
    eyebrow: 'Your Mate Mornings Club',
    t: ['Running out', 'before the month does?'],
    lead: `Your plan brings 15 servings a month. If you have a Mate Latte most mornings, that’s about two weeks of lattes in a ${nw('30-day month.')} With 30 servings, every morning is covered, every cup costs less, and we’ll gift you ${nw('a frother.')}`,
    badge: 'Every morning covered',
    gift: '+ Free frother, on us',
    photos: { 15: ['plan-15.jpg', 'A Mate Latte pouch and milk poured into an iced latte'], 30: ['plan-30.jpg', 'Two Mate Latte pouches and a frother frothing a latte: best seller, 30 servings, free frother and scoop'] },
    mailExtra: ', and add the free frother',
    perks: {
      t: ['More mornings,', 'more perks.'],
      list: [
        ['kit-percent.png', '30% off every order, up from 15%'],
        ['kit-gift.png', 'A free frother in your first 30-servings box'],
        ['kit-truck.png', 'A fresh supply at your door every month'],
        ['kit-pause.png', 'Skip, pause or cancel anytime'],
      ],
    },
    note: `Tap the button and send the email. We’ll switch your plan before your next order ships and add your free frother. Or simply reply ${nw('to this email.')}`,
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
    photos: { 30: ['plan-30.jpg', 'Two Mate Latte pouches and a frother frothing a latte: best seller, 30 servings'], 60: ['plan-60.jpg', 'Mate Latte pouches and a frother frothing a latte: best value, 60 servings'] },
    perks: {
      t: ['Two cups a day,', 'all month long.'],
      list: [
        ['kit-truck.png', '60 servings at your door every month'],
        ['kit-percent.png', '$1.39 a cup, our lowest price'],
        ['kit-card.png', 'Still 30% off every order'],
        ['kit-pause.png', 'Skip, pause or cancel anytime'],
      ],
    },
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
    .c-price { font-size:30px !important; line-height:34px !important; }
    .c-img { max-width:140px !important; }
    .c-size { font-size:10px !important; letter-spacing:1.2px !important; }
    .c-gift { font-size:10.5px !important; }
    .plans-in { padding:4px 12px 64px !important; }
    .c-photo { max-width:150px !important; }
    .c-btn { font-size:10px !important; letter-spacing:.6px !important; }
    .c-btn a { padding:9px 12px !important; }
    .perks { width:100% !important; }
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
    .c-price { font-size:25px !important; line-height:29px !important; }
    .c-img { max-width:112px !important; }
    .c-unit { font-size:11px !important; padding:5px 9px !important; }
    .c-off { font-size:9px !important; }
    .plans-in { padding-bottom:54px !important; }
    .c-photo { max-width:124px !important; }
    .c-btn a { padding:8px 9px !important; }
    .c-tab { font-size:8px !important; padding:5px 7px !important; }
    .h-hero { font-size:36px !important; line-height:39px !important; }
    .btn { padding:15px 20px !important; font-size:13px !important; letter-spacing:1px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-gold { background-color:${GOLD} !important; }
    .plans { background-color:${PLANS_TOP} !important; }
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

// a plan card: a tab on top ("Your plan now" in soft cream, the upgrade in shiny gold), the size, the
// monthly price in the serif, a thin gold rule, the pouches, per serving in a pill, the club discount and
// (15 -> 30) the free frother. The current plan is warm white and quieter, the upgrade is solid white with a
// forest border. Hybrid columns: side by side when there is room, stacked in inboxes without media queries
// under 556px; phones with media queries keep two columns.
// each card carries its own CTA: the current plan -> their portal ("Keep my plan"), the upgrade -> the
// pre-written switch email
const cardBtn = (href, label, now) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:16px auto 0;border-collapse:separate;"><tr><td class="c-btn" bgcolor="${now ? '#FFFFFF' : FOREST}" style="background-color:${now ? '#FFFFFF' : FOREST};border:1.5px solid ${FOREST};border-radius:999px;font-family:${FONT};font-size:12px;line-height:14px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;white-space:nowrap;"><a href="${amp(href)}" target="_blank" style="display:inline-block;padding:11px 20px;color:${now ? FOREST : BEIGE};text-decoration:none;">${label}</a></td></tr></table>`;
const card = (p, img, now, V, photo = V.photos?.[now ? V.v : V.to]) => `<div class="card-col" style="display:inline-block;vertical-align:top;width:100%;max-width:262px;">
<div style="padding:0 9px 18px;font-size:14px;">
${now ? pill('Your plan now', `bgcolor="${CREAM}" style="background-color:${CREAM};color:${SOFT};`) : pill(V.badge, `bgcolor="#D2A346" style="${SHINE}${SHINE_INK}`)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td class="card" align="center" bgcolor="#FFFFFF" style="background-color:${now ? '#FFFCF5' : '#FFFFFF'};border:${now ? '1px solid #FFFFFF' : `2px solid ${FOREST}`};border-radius:20px;padding:20px 12px 18px;font-family:${FONT};box-shadow:0 14px 30px rgba(70,40,10,${now ? '.18' : '.32'});">
<div class="c-size" style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${now ? SOFT : FOREST};">${p.size}</div>
<div class="c-price" style="padding-top:8px;font-family:${SERIF};font-size:42px;line-height:44px;font-weight:700;color:${now ? SOFT : FOREST};">${p.price}<span style="font-family:${FONT};font-size:13px;font-weight:700;">/mo</span></div>
<div style="margin:12px auto 0;width:44px;height:2px;line-height:2px;font-size:0;background-color:${GOLD};">&nbsp;</div>
${photo ? `<img class="c-photo" src="${img(photo[0])}" width="210" height="210" alt="${photo[1]}" style="display:block;margin:14px auto 12px;width:100%;max-width:210px;height:auto;border:0;border-radius:14px;">` : `<img class="c-img" src="${img(p.img)}" width="200" height="133" alt="${p.alt}" style="display:block;margin:6px auto 4px;width:100%;max-width:200px;height:auto;border:0;">`}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td class="c-unit" bgcolor="${now ? BEIGE : FOREST}" style="background-color:${now ? BEIGE : FOREST};border-radius:999px;padding:6px 14px;font-family:${FONT};font-size:13px;line-height:16px;font-weight:700;color:${now ? INK : BEIGE};white-space:nowrap;">${p.unit}</td></tr></table>
<div class="c-off" style="padding-top:10px;font-size:11px;line-height:15px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${now ? SOFT : FOREST};">${p.off}</div>
${V.gift ? `<div class="c-gift" style="padding-top:6px;font-size:12px;line-height:16px;font-weight:700;color:${now ? 'transparent' : '#A8741E'};">${now ? '&nbsp;' : ent(V.gift)}</div>` : ''}
${now ? cardBtn(PORTAL, 'Keep my plan', true) : cardBtn(mailto(V.v, V.to, V.mailExtra || ''), `Switch to ${V.to}`, false)}
</td></tr></table>
</div>
</div>`;
const cards = (list) => `<div style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="524" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td width="262" valign="top"><![endif]-->
${list.join('\n<!--[if mso]></td><td width="262" valign="top"><![endif]-->\n')}
<!--[if mso]></td></tr></table><![endif]-->
</div>`;
const perkRow = (img, icon, text) => `<tr><td width="40" valign="middle" style="width:40px;padding:11px 0;"><img src="${img(icon)}" width="26" height="26" alt="" role="presentation" style="display:block;width:26px;height:26px;border:0;"></td><td valign="middle" align="left" style="padding:11px 0;font-family:${FONT};font-size:15px;line-height:21px;font-weight:700;color:${INK};border-bottom:1px solid ${LINE};">${ent(text)}</td></tr>`;

const header = (V, img) => `<!-- ── 1 · THE QUESTION ── -->
${row(CREAM, 'pad bg-cream', `padding:34px 40px ${V.to ? 22 : 44}px;`, `<a href="${amp(HOME)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-green.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
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

<!-- ── 2 · YOUR PLAN NOW vs THE UPGRADE, on Bernat's gold Mate Latte scene (top-right pouch removed);
     the pouch and the latte close the section ── -->
<tr><td class="plans" align="center" valign="top" background="${img('plans-bg.jpg')}" bgcolor="${PLANS_TOP}" style="background-color:${PLANS_TOP};background-image:url('${img('plans-bg.jpg')}');background-size:cover;background-position:center bottom;background-repeat:no-repeat;padding:0;font-family:${FONT};">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:780px;"><v:fill type="frame" src="${img('plans-bg.jpg')}" color="${PLANS_TOP}" /><v:textbox inset="0,0,0,0"><![endif]-->
<img class="edge" src="${img('edge-top.png')}" width="600" height="90" alt="" role="presentation" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
<div class="plans-in" style="padding:6px 28px 70px;">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;text-shadow:0 1px 6px rgba(90,50,10,.45);">Your plan, upgraded</div>
<div style="padding-top:26px;">${cards([card(from, img, true, V), card(to, img, false, V)])}</div>
</div>
<img class="edge" src="${img('edge-bottom.png')}" width="600" height="90" alt="" role="presentation" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>
${V.perks ? `
<!-- ── 3 · WHAT YOU GET WITH 30 ── -->
${row(CREAM, 'pad bg-cream', 'padding:26px 40px 0;', `${eyebrow(`With ${V.to} servings`)}
${title(V.perks.t, 'h-sec', 38)}
<table role="presentation" class="perks" width="400" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:22px auto 0;width:400px;max-width:100%;">
${V.perks.list.map(([i, t]) => perkRow(img, i, t)).join('\n')}
</table>`)}` : ''}
${row(CREAM, 'pad bg-cream', `padding:${V.perks ? 36 : 26}px 40px 0;`, `${button(mailto(V.v, V.to, V.mailExtra || ''), `Switch me to ${V.to} servings`, 380)}
<div style="max-width:420px;margin:0 auto;padding-top:20px;font-size:14px;line-height:21px;font-weight:500;color:${SOFT};">${ent(V.note)}</div>`)}

<!-- ── 4 · HAPPY AS YOU ARE? (no pressure) + where to manage it ── -->
${row(CREAM, 'pad bg-cream', 'padding:48px 40px 0;', `<div style="margin:0 auto 40px;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div class="h-sec" style="font-family:${SERIF};font-size:34px;line-height:38px;font-weight:700;font-style:italic;color:${FOREST};">${ent(V.stay[0])}</div>
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
<div class="big" style="padding-top:16px;font-family:${SERIF};font-size:64px;line-height:66px;font-weight:700;color:${FOREST};">$1.39</div>
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
