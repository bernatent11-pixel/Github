// Post-purchase · one-time Mate Latte buyers · Email 1 · "Your first cup, done right"
//
// Sent on delivery (Shopify "Delivered Shipment", Items contains "Mate Latte"),
// to people who bought one-time and are not subscribers. Job (flow plan): a great
// first cup. How to make it (scoop, pour, stir or froth), hot and iced, when to
// drink it and what to expect. One soft button: the Mate Mornings Club.
// Preparation from the product page: 2.5 tbsp in 8oz of hot or cold water or milk.
//
// Writes:
//   exports/klaviyo/pp1-e1/pp1-e1.html   ONE complete HTML email (Klaviyo code template)
//   refine/pp1-e1.html                   preview under an inbox row
// Usage: node scripts/make-pp1-e1.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/pp1-e1';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
hosted['logo-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/b6a03046-605a-4e87-b22f-a530be1633e3.png';
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';
const LOCAL = { 'logo-green.png': '../exports/klaviyo/welcome-e1/img/logo-green.png', 'mark-green.png': '../public/logo/mark-green.png' };

export const SUBJECT = 'Your first cup, done right ☕';
export const PREHEADER = 'Your Mate Latte is here. Here’s how to make it just right, hot or iced.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life', PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=post_purchase_mate_latte&utm_content=${slot}`;
const L = { club: `${SITE}${PDP}?${utm('pp1_club_button')}`, home: `${SITE}/?${utm('pp1_logo')}` };

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

// the three steps (a real sequence, so they are numbered)
const STEPS = [
  { n: '1', t: 'Scoop', d: `${nw('2.5 tablespoons')} of Mate Latte into your mug or glass.` },
  { n: '2', t: 'Pour', d: `${nw('8oz of')} hot or cold water or milk. Milk makes it extra creamy.` },
  { n: '3', t: 'Stir or froth', d: `Stir it in, or froth it for a ${nw('café-style')} foam.` },
];

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
    .scoop { width:300px !important; height:auto !important; }
    .step { padding:0 4px !important; }
    .step-t { font-size:14px !important; }
    .step-d { font-size:12px !important; line-height:17px !important; }
    .hi { display:block !important; width:100% !important; padding:0 0 12px 0 !important; }
    .know { display:block !important; width:100% !important; padding:0 0 12px 0 !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-cream { background-color:${CREAM} !important; }
  }
</style>`;

const button = (href, label, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${FOREST}"><w:anchorlock/><center style="color:${BEIGE};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${FOREST};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${BEIGE};text-decoration:none;box-shadow:0 4px 0 ${DEEP};">${label}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = (a, b, cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const para = (t, color = INK, extra = '') => `<div style="font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${t}</div>`;

function body(img) {
  const steps = STEPS.map((s) => `<td class="step" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td align="center" valign="middle" width="44" height="44" bgcolor="${GOLD}" style="width:44px;height:44px;border-radius:22px;background-color:${GOLD};font-family:${SERIF};font-size:24px;line-height:44px;font-weight:700;color:${FOREST};">${s.n}</td></tr></table>
<div class="step-t" style="padding-top:12px;font-size:16px;line-height:20px;font-weight:700;color:${FOREST};">${ent(s.t)}</div>
<div class="step-d" style="padding-top:6px;font-size:13px;line-height:19px;font-weight:500;color:${INK};">${ent(s.d)}</div>
</td>`).join('\n');

  const card = (cls, w, pad, image, alt, name, text) => `<td class="${cls}" width="50%" valign="top" style="width:50%;padding:${pad};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="border-collapse:separate;background-color:#FFFFFF;border-radius:20px;"><tr><td align="center" style="padding:20px 18px 22px;font-family:${FONT};">
<img src="${img(image)}" width="${w}" height="${w}" alt="${alt}" style="display:block;margin:0 auto;width:${w}px;height:${w}px;border:0;border-radius:${image === 'iced.jpg' ? 14 : 0}px;">
<div style="padding-top:14px;font-family:${SERIF};font-size:24px;line-height:28px;font-weight:700;font-style:italic;color:${FOREST};">${name}</div>
<div style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${text}</div>
</td></tr></table>
</td>`;

  const know = (cls, pad, icon, head, text) => `<td class="${cls}" width="50%" valign="top" style="width:50%;padding:${pad};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border:2px solid ${LINE};border-radius:20px;"><tr><td align="left" style="padding:22px 22px 22px;font-family:${FONT};">
<img src="${img(icon)}" width="28" height="28" alt="" role="presentation" style="display:block;width:28px;height:28px;border:0;">
<div style="padding-top:12px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">${head}</div>
<div style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${text}</div>
</td></tr></table>
</td>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · YOUR FIRST CUP, DONE RIGHT ──────────────────────────────── -->
${row(BEIGE, 'pad bg-page', 'padding:36px 40px 30px;', `<a href="${amp(L.home)}" target="_blank"><img class="hero-logo" src="${img('logo-green.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:26px;">${eyebrow('Your Mate Latte is here')}</div>
${title('Your first cup,', 'done right.', 'h-hero', 54, FOREST, 10)}
${para(`${ent('Welcome to better mornings. Here’s how to make your Mate Latte taste exactly')} ${nw(ent('how it should, hot or iced.'))}`, INK, 'padding-top:14px;')}`)}
<tr><td class="bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('hero.jpg')}" width="600" height="570" alt="A hot and an iced Mate Latte on a kitchen counter, beside the pouch and a scoop" style="display:block;width:600px;height:570px;border:0;"></td></tr>

<!-- ── 2 · HOW TO MAKE IT: THREE STEPS ─────────────────────────────── -->
${row(BEIGE, 'pad bg-page', 'padding:52px 40px 0;', `${eyebrow('How to make it')}
${title('Three steps,', 'thirty seconds.', 'h-sec', 40)}`)}
<tr><td class="bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:22px 30px 0;font-size:0;line-height:0;"><img class="scoop" src="${img('scoop.png')}" width="420" height="247" alt="A hand scooping Mate Latte powder into a glass beside the pouch" style="display:block;margin:0 auto;width:420px;height:247px;border:0;"></td></tr>
<tr><td class="pad-photo bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:26px 30px 52px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${steps}
</tr></table>
</td></tr>

<!-- ── 3 · HOT OR ICED ─────────────────────────────────────────────── -->
${row(FOREST, 'pad bg-forest', 'padding:52px 40px 0;', `${eyebrow('Your way', GOLD)}
${title('Hot or iced,', 'it’s all yours.', 'h-sec', 40, '#FFFFFF')}`)}
<tr><td class="pad-photo bg-forest" bgcolor="${FOREST}" style="background-color:${FOREST};padding:28px 30px 52px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
${card('hi', 150, '0 6px 0 0', 'hot.png', 'A hot Mate Latte from above', 'Hot', `Heat ${nw('8oz of milk')} or water, add ${nw('2.5 tablespoons')} and froth until smooth. Cozy and creamy.`)}
${card('hi', 150, '0 0 0 6px', 'iced.jpg', 'An iced Mate Latte in a glass jar', 'Iced', `Mix ${nw('2.5 tablespoons')} into ${nw('8oz of cold')} milk or water, then pour it over ice. Cold and refreshing.`)}
</tr></table>
</td></tr>

<!-- ── 4 · WHEN TO DRINK IT, WHAT TO EXPECT ────────────────────────── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `${eyebrow('Good to know')}
${title('Your first week', 'with Mate Latte.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-cream" bgcolor="${CREAM}" style="background-color:${CREAM};padding:28px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
${know('know', '0 6px 0 0', 'icon-sun.png', 'When to drink it', `In the morning, in place of your coffee, or early afternoon when you want a reset. It has ${nw('100mg of caffeine,')} about a cup of coffee, so treat it like one later in the day.`)}
${know('know', '0 0 0 6px', 'icon-sparkle.png', 'What to expect', `Smooth, steady energy that comes in easy, a clear head and calm focus that carries you through the morning. ${nw('No jitters,')} ${nw('no crash.')}`)}
</tr></table>
</td></tr>

<!-- ── 5 · ONE SOFT BUTTON: THE CLUB ───────────────────────────────── -->
${row(CREAM, 'pad bg-cream', 'padding:48px 40px 0;', `${title('Enjoy your first cup.', 'We’ll be here for the next one.', 'h-sec', 30, FOREST, 0)}
${para(`Loving it already? Join the Mate Mornings Club and your Mate Latte arrives every month. Save 30% on 30 or 60 servings. ${nw('Skip, pause or cancel anytime.')}`, INK, 'padding-top:16px;font-size:15px;line-height:23px;')}
<div style="padding-top:26px;">${button(L.club, 'Explore the club', 300)}</div>`)}

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:52px 30px 40px;font-family:${FONT};color:${FOREST};">
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
  POST-PURCHASE · ONE-TIME MATE LATTE BUYERS · EMAIL 1 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: on delivery (Delivered Shipment, Items contains "Mate Latte"); not subscribers.
  GENERATED by scripts/make-pp1-e1.mjs. Edit the script, not this file.
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
    fs.writeFileSync(`${OUT}/pp1-e1.html`, full);
    console.log('wrote', `${OUT}/pp1-e1.html`, '(validator: pass)');
  }
}

const loc = (f) => LOCAL[f] || `../${OUT}/img/${f}`;
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/pp1-e1.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Post-purchase E1 · preview</title><style>
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
console.log('wrote refine/pp1-e1.html');
