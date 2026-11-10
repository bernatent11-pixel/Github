// Post-purchase · Mate Mornings Club SUBSCRIBERS · Email 1 · "Welcome to your morning upgrade"
//
// Sent when their first club order is delivered (flow plan, Flow 5). Welcomes them to the club,
// makes the first cup easy (three steps, then hot or iced), lists what membership means (prices and terms from Shopify's selling
// plans) and shows where to manage the subscription (Appstle, inside their Shopify account).
//
// Writes:
//   exports/klaviyo/sub1-e1/sub1-e1.html   ONE complete HTML email (Klaviyo code template)
//   refine/sub1-e1.html                    preview under an inbox row
// Usage: node scripts/make-sub1-e1-assets.mjs && node scripts/make-sub1-e1.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/sub1-e1';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const SHARED = {
  'logo-green.png': [`${K}b6a03046-605a-4e87-b22f-a530be1633e3.png`, '../exports/klaviyo/welcome-e1/img/logo-green.png'],
  'drink-hot.png': [`${K}eb720e35-e441-496a-a96c-5f30dc637591.png`, '../exports/klaviyo/pp1-e1/img/drink-hot.png'],
  'drink-iced.png': [`${K}93430b07-73ca-42d5-947b-2da6b2c4fdd7.png`, '../exports/klaviyo/pp1-e1/img/drink-iced.png'],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'step-save.png': [`${K}a4357407-20fc-49b1-8769-bf58002d7677.png`, '../exports/klaviyo/pp1-e3/img/step-save.png'],
  'step-monthly.png': [`${K}24d6f5de-8675-4686-a18f-c65ec7fb0136.png`, '../exports/klaviyo/pp1-e3/img/step-monthly.png'],
  'step-control.png': [`${K}037dde01-7474-4b70-b60e-0f9c4ca62916.png`, '../exports/klaviyo/pp1-e3/img/step-control.png'],
};
for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;
const C = JSON.parse(fs.readFileSync(`${OUT}/colors.json`, 'utf8'));

export const SUBJECT = 'Welcome to your morning upgrade ☕';
export const PREHEADER = 'Your first club bag is here. Here’s everything you need to know.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const MINT = '#CFE0D4';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=post_purchase_subscribers&utm_content=${slot}`;
// Appstle's subscription portal on the store (milonga.life/apps/subscriptions, "My Account"): it
// opens their subscriptions, or asks for their email and sends a sign-in magic link.
const PORTAL = 'https://milonga.life/apps/subscriptions';
const L = { home: `${SITE}/?${utm('sub1_logo')}` };
const HELP = 'orders@milongamate.com';

// how to make it (product page: 2.5 tbsp in 8oz of hot or cold water or milk, 30 seconds)
const STEPS = [
  { img: 'step-scoop.png', t: 'Scoop', d: '2.5 tablespoons into your mug <span style="white-space:nowrap;">or glass.</span>' },
  { img: 'step-pour.png', t: 'Pour', d: '8oz of hot or cold milk <span style="white-space:nowrap;">or water.</span>' },
  { img: 'step-froth.png', t: 'Stir or froth', d: 'Ready in 30 seconds, <span style="white-space:nowrap;">hot or iced.</span>' },
];
const DRINK_W = 200, DRINK_H = 205; // the hot and iced cutouts (pp1-e1) share this canvas
// the club, as Shopify's selling plans set it: 30% off 30 and 60 servings, 15% off 15, monthly
const PERKS = [
  { img: 'step-save.png', t: 'Save on every order', d: '30% off 30 or 60 servings, <span style="white-space:nowrap;">15% off 15.</span>' },
  { img: 'step-monthly.png', t: 'A fresh supply, monthly', d: 'At your door every month. <span style="white-space:nowrap;">No reordering.</span>' },
  { img: 'step-control.png', t: 'You’re in control', d: 'Skip, pause or cancel <span style="white-space:nowrap;">anytime.</span>' },
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
    .h-hero { font-size:42px !important; line-height:44px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .how { padding:0 4px !important; }
    .how-img { width:48px !important; height:48px !important; }
    .how-t { font-size:13px !important; line-height:17px !important; }
    .how-d { font-size:11.5px !important; line-height:16px !important; }
    .bags { width:280px !important; height:auto !important; }
    .drink-img { width:150px !important; height:154px !important; }
    .drink-text { font-size:12.5px !important; line-height:18px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-hero-top { background-color:${C.heroTop} !important; }
    .bg-hero { background-color:${C.heroBottom} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-gold { background-color:${GOLD} !important; }
    .bg-wall { background-color:${C.wall} !important; }
    .bg-table { background-color:${C.table} !important; }
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

function body(img) {
  const steps = STEPS.map((s) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(s.img)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="how-t" style="padding-top:14px;font-size:15px;line-height:19px;font-weight:700;color:${FOREST};">${ent(s.t)}</div>
<div class="how-d" style="padding-top:6px;font-size:13px;line-height:19px;font-weight:500;color:${INK};">${ent(s.d)}</div>
</td>`).join('\n');
  const perks = PERKS.map((s) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(s.img)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="how-t" style="padding-top:14px;font-size:15px;line-height:19px;font-weight:700;color:${FOREST};">${ent(s.t)}</div>
<div class="how-d" style="padding-top:6px;font-size:13px;line-height:19px;font-weight:500;color:${INK};">${ent(s.d)}</div>
</td>`).join('\n');

  const drink = (pad, image, alt, name, text) => `<td class="drink" width="50%" align="center" valign="top" style="width:50%;padding:${pad};font-family:${FONT};">
<img class="drink-img" src="${img(image)}" width="${DRINK_W}" height="${DRINK_H}" alt="${alt}" style="display:block;margin:0 auto;width:${DRINK_W}px;height:${DRINK_H}px;border:0;">
<div style="padding-top:16px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">${name}</div>
<div class="drink-text" style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${text}</div>
</td>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · WELCOME TO THE CLUB (Bernat's photo: two pouches, Lion's Mane, vanilla and a frothed
     latte on warm cream; its top and bottom fade into the flat creams of the rows around it) ── -->
${row(C.heroTop, 'pad bg-hero-top', 'padding:34px 40px 6px;', `<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-green.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:28px;">${eyebrow('Welcome to the Mate Mornings Club', FOREST)}</div>
${title('Welcome to your', 'morning upgrade.', 'h-hero', 52, FOREST, 10)}`)}
<tr><td class="bg-hero-top" bgcolor="${C.heroTop}" style="background-color:${C.heroTop};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('hero.jpg')}" width="600" height="${C.heroH}" alt="Two Mate Latte pouches, Lion's Mane, vanilla and a frothed latte" style="display:block;width:600px;height:${C.heroH}px;border:0;"></td></tr>
${row(C.heroBottom, 'pad bg-hero', 'padding:4px 40px 56px;', `${lead(`${ent('Your first club bag is here, and you’re officially a member. From now on, a fresh supply shows up every month with your club savings on every order. Skip, pause or cancel')} ${nw('anytime.')}`, INK, 'padding-top:0;')}
<div style="padding-top:28px;">${button(PORTAL, 'Manage my subscription', 340)}</div>`)}

<!-- ── 2 · YOUR FIRST CLUB CUP (Bernat's pouring photo is the section's background: the title
     and the three steps sit on its gold wall, its white table carries on into hot / iced) ── -->
${row(C.wall, 'pad bg-wall', 'padding:52px 40px 0;', `${eyebrow('Your first club cup')}
${title('Three steps,', 'thirty seconds.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-wall" bgcolor="${C.wall}" style="background-color:${C.wall};padding:32px 30px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${steps}
</tr></table>
</td></tr>
<tr><td class="bg-wall" bgcolor="${C.wall}" style="background-color:${C.wall};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('howto.jpg')}" width="600" height="${C.howtoH}" alt="Milk poured into an iced Mate Latte beside the pouch" style="display:block;width:600px;height:${C.howtoH}px;border:0;"></td></tr>

<!-- ── 2b · HOT OR ICED (on the table colour of the photo above; the cutouts from pp1-e1) ── -->
${row(C.table, 'pad bg-table', 'padding:16px 40px 0;', `${eyebrow('Your way')}
${title('Hot or iced,', 'it’s all yours.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-table" bgcolor="${C.table}" style="background-color:${C.table};padding:30px 30px 56px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${drink('0 10px 0 0', 'drink-hot.png', 'A hot Mate Latte in a glass mug', 'Hot', `Heat ${nw('8oz of milk')} or water, add ${nw('2.5 tablespoons')} and froth until smooth. Cozy and creamy.`)}
${drink('0 0 0 10px', 'drink-iced.png', 'An iced Mate Latte in a tall glass', 'Iced', `Mix ${nw('2.5 tablespoons')} into ${nw('8oz of cold')} milk or water, then pour it over ice. Cold and refreshing.`)}
</tr></table>
</td></tr>

<!-- ── 3 · WHAT MEMBERSHIP MEANS (Shopify's selling plans) ── -->
${row(GOLD, 'pad bg-gold', 'padding:56px 40px 0;', `${eyebrow('Your club perks')}
${title('Being a member', 'has its perks.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-gold" bgcolor="${GOLD}" style="background-color:${GOLD};padding:34px 30px 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${perks}
</tr></table>
</td></tr>

<!-- ── 4 · YOUR CLUB, YOUR WAY: where to manage it ── -->
${row(CREAM, 'pad bg-cream', 'padding:56px 40px 0;', `${eyebrow('Your club, your way')}
${title('Taking a trip?', 'Skip a month.', 'h-sec', 40)}
${lead(`${ent('Your subscription works around your life. Skip a delivery, pause for a while or cancel, all from your subscription page. Not signed in? Enter the email you subscribed with and we’ll send you')} ${nw('a sign-in link.')}`, INK)}`)}
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:30px 40px 0;font-size:0;line-height:0;"><img class="bags" src="${img('bags.jpg')}" width="380" height="${C.bagsH}" alt="Three Mate Latte pouches" style="display:block;margin:0 auto;width:380px;height:${C.bagsH}px;border:0;"></td></tr>
${row(CREAM, 'pad bg-cream', 'padding:30px 40px 0;', button(PORTAL, 'Manage my subscription', 340))}

<!-- ── 5 · NEED HELP? ── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `<div style="margin:0 auto;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div style="padding-top:28px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">Questions about your subscription?</div>
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
  POST-PURCHASE · MATE MORNINGS CLUB SUBSCRIBERS · EMAIL 1 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: when their first club order is delivered (Delivered Shipment), once per subscriber.
  GENERATED by scripts/make-sub1-e1.mjs. Edit the script, not this file.
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
    fs.writeFileSync(`${OUT}/sub1-e1.html`, full);
    console.log('wrote', `${OUT}/sub1-e1.html`, '(validator: pass)');
  }
}

const loc = (f) => SHARED[f]?.[1] || `../${OUT}/img/${f}`;
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/sub1-e1.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Subscribers E1 · preview</title><style>
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
${body(loc)}
</body></html>`);
console.log('wrote refine/sub1-e1.html');
