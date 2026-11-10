// Campaign · "Mate Latte 101": what it is, what's inside, how it compares, how to make it, when to
// enjoy it, and the prices (one-time or the Mate Mornings Club) for every size.
//
// Built from sections already approved in other emails, with their hosted images:
//   hero        the studio pouch on green (order confirmation)
//   inside      the ingredient discs (welcome / cart emails) + the product page's approved wording
//   compares    the Mate Latte vs coffee / mushroom coffee / matcha table (welcome E3), copied from
//               its generated HTML so it stays identical
//   make it     three steps on the pouring photo's gold wall + hot or iced (subscribers E1)
//   enjoy it    the three moments on green (post-purchase E1)
//   prices      15 / 30 / 60 servings, club or one-time (Shopify, checked 2026-11-09)
//   perks       the club's three perks on gold (subscribers E1)
//
// Writes:
//   exports/klaviyo/ml101/ml101.html   ONE complete HTML email (Klaviyo code template)
//   refine/ml101.html                  preview under an inbox row
// Usage: node scripts/make-ml101.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/ml101';
fs.mkdirSync(OUT, { recursive: true });
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const X = '../exports/klaviyo/';
// [hosted URL, local file for the preview]
const IMG = {
  'logo-beige.png': [`${K}c267d1bd-4e34-4ee1-b901-eac7bc60b87d.png`, `${X}pp1-e3/img/logo-beige.png`],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'hero.jpg': [`${K}58d19159-6707-48f9-8ad5-5dc1ccaa964f.jpeg`, `${X}order-confirm/img/hero.jpg`],
  'disc-gold-yerba-mate.png': [`${K}3f6c2de8-85cb-4fe0-9a93-38b08cff2575.png`, `${X}welcome-e1/img/disc-gold-yerba-mate.png`],
  'disc-gold-l-theanine.png': [`${K}6f3cd229-74f8-4c52-b6fb-93d10911e05f.png`, `${X}welcome-e1/img/disc-gold-l-theanine.png`],
  'disc-gold-lions-mane.png': [`${K}58b029ea-6b1e-4537-95d9-10aa3155bbde.png`, `${X}welcome-e1/img/disc-gold-lions-mane.png`],
  'cmp-pouch.png': [`${K}42ccdf16-bbbc-4246-ab82-8d5573d6f6f5.png`, `${X}welcome-e3/img/cmp-pouch.png`],
  'cmp-vs.png': [`${K}f6eca6ee-af15-4ad7-9f8d-ceb0d4be7327.png`, `${X}welcome-e3/img/cmp-vs.png`],
  'cmp-coffee.png': [`${K}31afe900-12dd-4189-9834-e73964cb59d7.png`, `${X}welcome-e3/img/cmp-coffee.png`],
  'cmp-mushroom.png': [`${K}360d5802-9142-4375-a4b2-452fba70c028.png`, `${X}welcome-e3/img/cmp-mushroom.png`],
  'cmp-matcha.png': [`${K}e181ee6e-beb9-4f5c-92e1-62128d59581f.png`, `${X}welcome-e3/img/cmp-matcha.png`],
  'step-scoop.png': [`${K}81d6cb7d-7cdb-44f6-bf63-434b7a35a942.png`, `${X}sub1-e1/img/step-scoop.png`],
  'step-pour.png': [`${K}87c88a92-6119-41be-86c2-ac738e2e003d.png`, `${X}sub1-e1/img/step-pour.png`],
  'step-froth.png': [`${K}7e508d45-40cb-4cbf-88fc-18aadaccbf53.png`, `${X}sub1-e1/img/step-froth.png`],
  'howto.jpg': [`${K}b18e2a97-e510-421d-a1ec-d2a4da54e2f4.jpeg`, `${X}sub1-e1/img/howto.jpg`],
  'drink-hot.png': [`${K}eb720e35-e441-496a-a96c-5f30dc637591.png`, `${X}pp1-e1/img/drink-hot.png`],
  'drink-iced.png': [`${K}93430b07-73ca-42d5-947b-2da6b2c4fdd7.png`, `${X}pp1-e1/img/drink-iced.png`],
  'moment-morning.jpg': [`${K}5ad0825c-ada6-410f-b3e3-b24bc1249c06.jpeg`, `${X}pp1-e1/img/moment-morning.jpg`],
  'moment-work.jpg': [`${K}b3fd1cc5-460e-4fe2-b311-68e0645e5a6e.jpeg`, `${X}pp1-e1/img/moment-work.jpg`],
  'moment-friends.jpg': [`${K}61ce5b04-698e-4ffb-94fa-fbd0377217c1.jpeg`, `${X}pp1-e1/img/moment-friends.jpg`],
  'step-save.png': [`${K}a4357407-20fc-49b1-8769-bf58002d7677.png`, `${X}pp1-e3/img/step-save.png`],
  'step-monthly.png': [`${K}24d6f5de-8675-4686-a18f-c65ec7fb0136.png`, `${X}pp1-e3/img/step-monthly.png`],
  'step-control.png': [`${K}037dde01-7474-4b70-b60e-0f9c4ca62916.png`, `${X}pp1-e3/img/step-control.png`],
};
const HERO = { top: '#104F38', bottom: '#156747', h: 544 };   // order-confirm colors.json
const HOWTO = { wall: '#E4B77D', table: '#EDE5D9', h: 570 };  // sub1-e1 colors.json

export const SUBJECT = 'Mate Latte 101 ☕';
export const PREHEADER = 'What’s inside, how to make it, and the best way to save on every bag.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const MINT = '#CFE0D4';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life', PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=mate_latte_101&utm_content=${slot}`;
// variants and the club's selling plans (Shopify): 30% off 30/60, 15% off 15
const VARIANT = { 15: '54302750212406', 30: '54302750245174', 60: '54302750277942' };
const PLAN = { 15: '9479323958', 30: '8837562678', 60: '8837562678' };
const L = {
  shop: (slot) => `${SITE}${PDP}?${utm(slot)}`,
  club: (n) => `${SITE}${PDP}?selling_plan=${PLAN[n]}&variant=${VARIANT[n]}&${utm(`ml_club_${n}`)}`,
  once: (n) => `${SITE}${PDP}?variant=${VARIANT[n]}&${utm(`ml_onetime_${n}`)}`,
  home: `${SITE}/?${utm('ml_logo')}`,
};

const INSIDE = [
  { disc: 'disc-gold-yerba-mate.png', dose: '100mg', name: 'natural caffeine', line: 'Coffee-level energy from yerba mate, <span style="white-space:nowrap;">no jitters.</span>' },
  { disc: 'disc-gold-l-theanine.png', dose: '200mg', name: 'L-theanine', line: 'Keeps the energy smooth, calm and focused.' },
  { disc: 'disc-gold-lions-mane.png', dose: '500mg', name: 'Lion’s Mane', line: 'The functional mushroom, for <span style="white-space:nowrap;">clear-headed</span> mornings.' },
];
const STEPS = [
  { img: 'step-scoop.png', t: 'Scoop', d: '2.5 tablespoons into your mug <span style="white-space:nowrap;">or glass.</span>' },
  { img: 'step-pour.png', t: 'Pour', d: '8oz of hot or cold milk <span style="white-space:nowrap;">or water.</span>' },
  { img: 'step-froth.png', t: 'Stir or froth', d: 'Ready in 30 seconds, <span style="white-space:nowrap;">hot or iced.</span>' },
];
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;
const MOMENTS = [
  { img: 'moment-morning.jpg', alt: 'Holding a Mate Latte and the pouch on a sunny balcony', when: 'First thing in the morning', title: 'Your new morning ritual',
    text: `Make it your first cup of the day, in place of your coffee. Smooth, steady energy that comes in easy and a clear head to start the day. ${nw('No jitters,')} ${nw('no crash.')}` },
  { img: 'moment-work.jpg', alt: 'A Mate Latte and the pouch beside a laptop', when: 'When it’s time to focus', title: 'Your deep-work partner',
    text: `A long work session ahead, or that early-afternoon slump? Make a cup and settle in: steady energy and calm focus that stay with you until the last task is done. It has ${nw('100mg of caffeine,')} about a cup of coffee, so treat it like one later in the day.` },
  { img: 'moment-friends.jpg', alt: 'Friends in running gear sharing cups of Mate Latte around a small table', when: 'With your people', title: 'Better shared',
    text: `After a morning run or a weekend catch-up, make a round ${nw('for everyone.')}` },
];
// Shopify prices (one-time) and the club's: 15 at 15% off, 30 and 60 at 30% off
const SIZES = [
  { n: 15, lasts: 'About two weeks of mornings', club: '29.74', once: '34.99', off: '15%', cupClub: '1.98', cupOnce: '2.33' },
  { n: 30, lasts: 'About a month of mornings', club: '48.99', once: '69.98', off: '30%', cupClub: '1.63', cupOnce: '2.33' },
  { n: 60, lasts: 'Two months, or a month at two a day', club: '97.97', once: '139.96', off: '30%', cupClub: '1.63', cupOnce: '2.33' },
];
const PERKS = [
  { img: 'step-save.png', t: 'Save on every order', d: '30% off 30 or 60 servings, <span style="white-space:nowrap;">15% off 15.</span>' },
  { img: 'step-monthly.png', t: 'A fresh supply, monthly', d: 'At your door every month. <span style="white-space:nowrap;">No reordering.</span>' },
  { img: 'step-control.png', t: 'You’re in control', d: 'Skip, pause or cancel <span style="white-space:nowrap;">anytime.</span>' },
];

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');

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
    .h-hero { font-size:42px !important; line-height:44px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .how { padding:0 4px !important; }
    .how-img { width:48px !important; height:48px !important; }
    .how-t { font-size:13px !important; line-height:17px !important; }
    .how-d { font-size:11.5px !important; line-height:16px !important; }
    .edge-dose { font-size:24px !important; line-height:26px !important; }
    .drink-img { width:150px !important; height:154px !important; }
    .drink-text { font-size:12.5px !important; line-height:18px !important; }
    .m-img, .m-text { display:block !important; width:100% !important; }
    .m-photo { width:100% !important; height:auto !important; }
    .m-gap { display:none !important; }
    .m-text { padding-top:16px !important; }
    .m-title { font-size:26px !important; line-height:29px !important; }
    .pad-cmp { padding-left:10px !important; padding-right:10px !important; }
    .cmp-mil { padding-left:6px !important; padding-right:6px !important; }
    .cmp-ours { font-size:12px !important; line-height:16px !important; }
    .cmp-label { font-size:9px !important; letter-spacing:1.4px !important; }
    .cmp-cell { font-size:11px !important; line-height:14px !important; padding:10px 3px !important; }
    .cmp-name { font-size:9px !important; letter-spacing:.8px !important; line-height:12px !important; }
    .cmp-brand { font-size:15px !important; letter-spacing:2px !important; }
    .cmp-vs { width:32px !important; height:32px !important; }
    .cmp-vs-gap { height:38px !important; line-height:38px !important; }
    .size-card { padding:20px 16px !important; }
    .size-n { font-size:26px !important; line-height:30px !important; }
    .price-club { font-size:30px !important; line-height:32px !important; }
    .size-btn a { padding:13px 14px !important; font-size:11.5px !important; letter-spacing:1px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-hero-top { background-color:${HERO.top} !important; }
    .bg-hero { background-color:${HERO.bottom} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-wall { background-color:${HOWTO.wall} !important; }
    .bg-table { background-color:${HOWTO.table} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-gold { background-color:${GOLD} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
// a small pill button (a padded table cell, so Outlook keeps the colour)
const pill = (href, label, bg, ink, border) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;width:100%;"><tr>
<td class="size-btn" align="center" bgcolor="${bg}" style="background-color:${bg};border:2px solid ${border};border-radius:999px;"><a href="${amp(href)}" target="_blank" style="display:block;padding:13px 16px;font-family:${FONT};font-size:12.5px;line-height:15px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;">${label}</a></td>
</tr></table>`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = (a, b, cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const lead = (t, color, extra = '') => `<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${t}</div>`;

// the welcome E3 comparison table, copied from its generated HTML (images re-pointed through img())
const W3 = fs.readFileSync('exports/klaviyo/welcome-e3/welcome-e3.html', 'utf8');
const CMP = (() => {
  const a = W3.indexOf('<tr><td class="pad-cmp bg-page"');
  const b = W3.indexOf('</table>\n</td></tr>', a) + '</table>\n</td></tr>'.length;
  if (a < 0 || b < a) throw new Error('comparison table not found in welcome-e3.html');
  return W3.slice(a, b);
})();

function body(img) {
  const three = (items, cell) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${items.map(cell).join('\n')}
</tr></table>`;
  const iconCell = (s) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(s.img)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="how-t" style="padding-top:14px;font-size:15px;line-height:19px;font-weight:700;color:${FOREST};">${ent(s.t)}</div>
<div class="how-d" style="padding-top:6px;font-size:13px;line-height:19px;font-weight:500;color:${INK};">${ent(s.d)}</div>
</td>`;
  const insideCell = (e) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(e.disc)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="edge-dose" style="padding-top:12px;font-family:${SERIF};font-size:30px;line-height:32px;font-weight:700;color:${FOREST};">${e.dose}</div>
<div class="how-t" style="padding-top:4px;font-size:14px;line-height:18px;font-weight:700;color:${FOREST};">${ent(e.name)}</div>
<div class="how-d" style="padding-top:6px;font-size:13px;line-height:18px;font-weight:500;color:${INK};">${ent(e.line)}</div>
</td>`;
  const drink = (pad, image, alt, name, text) => `<td class="drink" width="50%" align="center" valign="top" style="width:50%;padding:${pad};font-family:${FONT};">
<img class="drink-img" src="${img(image)}" width="200" height="205" alt="${alt}" style="display:block;margin:0 auto;width:200px;height:205px;border:0;">
<div style="padding-top:16px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">${name}</div>
<div class="drink-text" style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${text}</div>
</td>`;
  const moment = (m, flip) => `<tr><td class="pad-photo bg-forest" bgcolor="${FOREST}" style="background-color:${FOREST};padding:28px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${flip ? 'rtl' : 'ltr'}" style="table-layout:fixed;"><tr>
<td class="m-img" width="250" valign="middle" dir="ltr" style="width:250px;padding:0;"><img class="m-photo" src="${img(m.img)}" width="250" height="312" alt="${m.alt}" style="display:block;width:250px;height:312px;border:0;border-radius:18px;"></td>
<td class="m-gap" width="26" style="width:26px;font-size:0;line-height:0;">&nbsp;</td>
<td class="m-text" valign="middle" dir="ltr" style="text-align:left;font-family:${FONT};">
<div style="font-size:11px;line-height:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">${ent(m.when)}</div>
<div class="m-title" style="padding-top:8px;font-family:${SERIF};font-size:28px;line-height:31px;font-weight:700;font-style:italic;color:${BEIGE};">${ent(m.title)}</div>
<div style="padding-top:10px;font-size:14px;line-height:21px;font-weight:500;color:#DCE3D6;">${ent(m.text)}</div>
</td></tr></table>
</td></tr>`;
  // one size: club price up front, one-time beside it, two buttons
  const size = (z) => `<tr><td class="pad-photo bg-cream" bgcolor="${CREAM}" style="background-color:${CREAM};padding:0 30px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="size-card" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px solid ${z.n === 30 ? GOLD : LINE};border-radius:22px;padding:22px 24px;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
<td valign="top" align="left" style="font-family:${FONT};">
<div class="size-n" style="font-family:${SERIF};font-size:30px;line-height:32px;font-weight:700;color:${FOREST};">${z.n} servings</div>
<div style="padding-top:4px;font-size:13px;line-height:18px;font-weight:500;color:${SOFT};">${ent(z.lasts)}</div>
</td>
<td valign="top" align="right" width="150" style="width:150px;font-family:${FONT};">
<div class="price-club" style="font-family:${SERIF};font-size:34px;line-height:34px;font-weight:700;color:${FOREST};">$${z.club}</div>
<div style="padding-top:4px;font-size:12px;line-height:16px;font-weight:700;color:${SOFT};">in the club &middot; $${z.cupClub}/cup</div>
</td>
</tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;margin-top:16px;"><tr>
<td width="50%" style="width:50%;padding-right:5px;">${pill(L.club(z.n), `Join &middot; save ${z.off}`, FOREST, BEIGE, FOREST)}</td>
<td width="50%" style="width:50%;padding-left:5px;">${pill(L.once(z.n), `One-time $${z.once}`, '#FFFFFF', FOREST, FOREST)}</td>
</tr></table>
</td></tr></table>
</td></tr>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · MEET THE MATE LATTE (the studio pouch on green; its edges fade into the flat greens) ── -->
${row(HERO.top, 'pad bg-hero-top', 'padding:34px 40px 8px;', `<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-beige.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:30px;">${eyebrow('Mate Latte 101', GOLD)}</div>
${title('Meet your new', 'morning ritual.', 'h-hero', 54, BEIGE, 10)}
${lead(`${ent('A creamy vanilla latte made with organic South American yerba mate, Lion’s Mane and L-theanine. Clean energy, focus and calm in a cup that tastes like a treat,')} ${nw('ready in 30 seconds.')}`, MINT)}`)}
<tr><td class="bg-hero-top" bgcolor="${HERO.top}" style="background-color:${HERO.top};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('hero.jpg')}" width="600" height="${HERO.h}" alt="The Mate Latte pouch on deep green" style="display:block;width:600px;height:${HERO.h}px;border:0;"></td></tr>
${row(HERO.bottom, 'pad bg-hero', 'padding:0 40px 52px;', `${button(L.shop('ml_hero_button'), 'Shop the Mate Latte', 320, GOLD, FOREST, '#B8913A')}
<div style="padding-top:18px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BEIGE};">${nw('30-day money-back guarantee')}</div>`)}

<!-- ── 2 · WHAT'S INSIDE (doses from the pouch; benefits in the product page's wording) ── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `${eyebrow('What’s inside')}
${title('One cup,', 'everything you need.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-cream" bgcolor="${CREAM}" style="background-color:${CREAM};padding:32px 30px 0;">
${three(INSIDE, insideCell)}
</td></tr>
${row(CREAM, 'pad bg-cream', 'padding:26px 40px 56px;', `<div style="font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Plus yerba mate’s antioxidants and vitamins, which support a healthy gut, your immune system and your metabolism.')}</div>
<div style="padding-top:16px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${SOFT};">${nw('90 calories')} &middot; ${nw('3g sugar')} &middot; ${nw('Dairy-free')} &middot; ${nw('No artificial sweeteners')}</div>`)}

<!-- ── 3 · HOW IT COMPARES (the welcome E3 table) ── -->
${row(BEIGE, 'pad bg-page', 'padding:56px 40px 0;', `${eyebrow('How it compares')}
${title('Not all morning cups', 'are created equal.', 'h-sec', 40)}`)}
${CMP.replace(/https:\/\/cdn\.klaviyomail\.com\/company\/TwvSnK\/images\/[0-9a-f-]+\.png/g, (u) => img(Object.keys(IMG).find((k) => IMG[k][0] === u)))}
${row(BEIGE, 'pad bg-page', 'padding:0 40px 56px;', '&nbsp;')}

<!-- ── 4 · HOW TO MAKE IT (the pouring photo is the background: steps on its gold wall,
     its table carries on into hot or iced) ── -->
${row(HOWTO.wall, 'pad bg-wall', 'padding:52px 40px 0;', `${eyebrow('How to make it')}
${title('Three steps,', 'thirty seconds.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-wall" bgcolor="${HOWTO.wall}" style="background-color:${HOWTO.wall};padding:32px 30px 8px;">
${three(STEPS, iconCell)}
</td></tr>
<tr><td class="bg-wall" bgcolor="${HOWTO.wall}" style="background-color:${HOWTO.wall};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('howto.jpg')}" width="600" height="${HOWTO.h}" alt="Milk poured into an iced Mate Latte beside the pouch" style="display:block;width:600px;height:${HOWTO.h}px;border:0;"></td></tr>
${row(HOWTO.table, 'pad bg-table', 'padding:16px 40px 0;', `${eyebrow('Your way')}
${title('Hot or iced,', 'it’s all yours.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-table" bgcolor="${HOWTO.table}" style="background-color:${HOWTO.table};padding:30px 30px 56px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${drink('0 10px 0 0', 'drink-hot.png', 'A hot Mate Latte in a glass mug', 'Hot', `Heat ${nw('8oz of milk')} or water, add ${nw('2.5 tablespoons')} and froth until smooth. Cozy and creamy.`)}
${drink('0 0 0 10px', 'drink-iced.png', 'An iced Mate Latte in a tall glass', 'Iced', `Mix ${nw('2.5 tablespoons')} into ${nw('8oz of cold')} milk or water, then pour it over ice. Cold and refreshing.`)}
</tr></table>
</td></tr>

<!-- ── 5 · WHEN TO ENJOY IT (the three moments, on green) ── -->
${row(FOREST, 'pad bg-forest', 'padding:56px 40px 0;', `${eyebrow('When to enjoy it', GOLD)}
${title('A cup for every', 'part of your day.', 'h-sec', 40, BEIGE)}`)}
${MOMENTS.map((m, i) => moment(m, i % 2 === 1)).join('\n')}
${row(FOREST, 'pad bg-forest', 'padding:0 40px 56px;', '&nbsp;')}

<!-- ── 6 · PRICES: every size, in the club or one-time ── -->
${row(CREAM, 'pad bg-cream', 'padding:56px 40px 0;', `${eyebrow('Pick your size')}
${title('Try it once,', 'or join the club.', 'h-sec', 40)}
${lead(`${ent('Every bag is the same Mate Latte. In the Mate Mornings Club it costs less and shows up every month. Skip, pause or cancel')} ${nw('anytime.')}`, INK)}`)}
${row(CREAM, 'pad bg-cream', 'padding:28px 40px 0;', '')}
${SIZES.map(size).join('\n')}

<!-- ── 7 · WHY JOIN THE CLUB (on gold) ── -->
${row(GOLD, 'pad bg-gold', 'padding:56px 40px 0;', `${eyebrow('The Mate Mornings Club')}
${title('Being a member', 'has its perks.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-gold" bgcolor="${GOLD}" style="background-color:${GOLD};padding:34px 30px 60px;">
${three(PERKS, iconCell)}
</td></tr>

<!-- ── 8 · CLOSING ── -->
${row(CREAM, 'pad bg-cream', 'padding:56px 40px 0;', `${title('Your new morning ritual', 'starts here.', 'h-sec', 40, FOREST, 0)}
<div style="padding-top:28px;">${button(L.shop('ml_final_button'), 'Shop the Mate Latte', 320)}</div>
<div style="padding-top:18px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">${nw('30-day money-back guarantee')}</div>`)}

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
  CAMPAIGN · MATE LATTE 101 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  What it is, what's inside, how it compares, how to make it, when to enjoy it, prices.
  GENERATED by scripts/make-ml101.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

{
  const full = doc((f) => IMG[f][0]);
  const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/ml101.html`, full);
  console.log('wrote', `${OUT}/ml101.html`, '(validator: pass)');
}

const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/ml101.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mate Latte 101 · preview</title><style>
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
console.log('wrote refine/ml101.html');
