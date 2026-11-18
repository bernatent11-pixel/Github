// Welcome · new newsletter subscribers · one short email
//
// Job (Bernat, 2026-11-18): a short welcome for people who just joined the newsletter. Three beats: welcome
// (on Bernat's blue-sky photo, the two hands raising Mate Latte pouches), why we made Milonga (the one-liner
// written the same day), and a welcome gift: WELCOME15 with one button. One line on what lands in their inbox.
//
// Facts used: WELCOME15 = 15% off one-time purchases on the first order, one use per customer, not valid on
// subscriptions, no end date (Shopify; the welcome flow's footer). The /discount/ link applies it. Claims:
// "smooth, steady energy without the jitters or the crash" only.
//
// Writes exports/klaviyo/welcome-news/welcome-news.html (full document, Klaviyo code template), preview in refine/.
// Usage: node scripts/make-welcome-news.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/welcome-news';
fs.mkdirSync(OUT, { recursive: true });
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const X = '../exports/klaviyo/';
const IMG = {
  'hero-sky.jpg': [`${K}af94589d-3579-4bf5-8a99-bfe1cb5f2e19.jpeg`, `${X}sub1-e3/img/hero-sky.jpg`],
  'logo-beige.png': [`${K}c267d1bd-4e34-4ee1-b901-eac7bc60b87d.png`, `${X}pp1-e3/img/logo-beige.png`],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
};

export const SUBJECT = 'Welcome to Milonga ☕';
export const PREHEADER = 'Glad you’re here. A little welcome gift is inside.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const SKY = '#1A74C7';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=welcome_newsletter&utm_content=${slot}`;
const L = {
  claim: `${SITE}/discount/WELCOME15?redirect=${encodeURIComponent(PDP)}&${utm('claim_button')}`,
  home: `${SITE}/?${utm('logo')}`,
};

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
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
    .pad { padding-left:24px !important; padding-right:24px !important; }
    .sky-in { padding:30px 22px 480px !important; }
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:42px !important; line-height:45px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .code { font-size:24px !important; letter-spacing:4px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media only screen and (max-width:360px) {
    .btn { padding:16px 18px !important; font-size:13px !important; letter-spacing:.8px !important; }
    .code { font-size:21px !important; letter-spacing:3px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .sky { background-color:${SKY} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 28px;font-family:${FONT};font-size:16px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST, shadow = '') => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};${shadow}">${ent(t)}</div>`;
const title = ([a, b], cls, size, color = FOREST, pad = 12, shadow = '') => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};${shadow}">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};${shadow}">${ent(b)}</div>`;
const lead = (t, color = INK, extra = '') => `<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${t}</div>`;

function body(img) {
  const SH = 'text-shadow:0 2px 14px rgba(0,40,90,.35);';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;">

<!-- ── 1 · WELCOME · Bernat's blue-sky photo (the sky carried higher for the headline, from sub1-e3) ── -->
<tr><td class="sky" align="center" valign="top" background="${img('hero-sky.jpg')}" bgcolor="${SKY}" style="background-color:${SKY};background-image:url('${img('hero-sky.jpg')}');background-size:cover;background-position:center bottom;background-repeat:no-repeat;padding:0;font-family:${FONT};">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:1053px;"><v:fill type="frame" src="${img('hero-sky.jpg')}" color="${SKY}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="sky-in" style="padding:40px 40px 640px;">
<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-beige.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:28px;">${eyebrow('Welcome to Milonga', '#FFFFFF', 'text-shadow:0 1px 8px rgba(0,40,90,.35);')}</div>
${title(['Glad you’re', 'here.'], 'h-hero', 54, '#FFFFFF', 10, SH)}
<div style="max-width:420px;margin:0 auto;">${lead(`Welcome to the club. Your mornings are about to ${nw('get better.')}`, '#FFFFFF', 'text-shadow:0 1px 10px rgba(0,40,90,.45);')}</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · WHY WE MADE IT + THE WELCOME GIFT ── -->
<tr><td class="pad bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:56px 28px 0;font-family:${FONT};">
${eyebrow('Why we made Milonga')}
${title(['A better', 'morning cup.'], 'h-sec', 40)}
<div style="max-width:450px;margin:0 auto;">${lead(`We love the morning ritual, just not what coffee does to us. So we made the Mate Latte: real yerba mate in a creamy vanilla latte, for smooth, steady energy without the jitters or ${nw('the crash.')} Ready in 30 seconds, ${nw('hot or iced.')}`)}</div>
</td></tr>
<tr><td class="pad bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:40px 28px 0;font-family:${FONT};">
<div style="margin:0 auto 36px;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
${eyebrow('A little welcome gift')}
<div style="padding-top:10px;font-family:${SERIF};font-size:30px;line-height:34px;font-weight:700;font-style:italic;color:${FOREST};">15% off your first order</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:22px auto 0;border-collapse:separate;"><tr>
<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px dashed ${FOREST};border-radius:16px;padding:12px 26px 14px;font-family:${FONT};">
<div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${SOFT};">Your code</div>
<div class="code" style="font-size:26px;line-height:34px;font-weight:700;letter-spacing:4px;color:${FOREST};">WELCOME15</div>
</td></tr></table>
<div style="padding-top:24px;">${button(L.claim, 'Claim my 15% off', 320)}</div>
<div style="padding-top:12px;font-size:13px;line-height:19px;font-weight:500;color:${SOFT};">The button adds the code for you.</div>
</td></tr>

<!-- ── 3 · WHAT'S NEXT, one line ── -->
<tr><td class="pad bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:44px 28px 0;font-family:${FONT};">
<div style="max-width:430px;margin:0 auto;font-size:15px;line-height:23px;font-weight:500;color:${INK};">${ent('Coming up in your inbox: easy latte recipes, stories from Argentina, and first word on new drops. And if you ever have a question, just hit reply.')}</div>
</td></tr>

<!-- ── FOOTER ── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:48px 30px 40px;font-family:${FONT};color:${FOREST};">
<div style="margin:0 auto 40px;width:60px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">WELCOME15: 15% off one-time purchases on your first order. One use per customer. Not valid on subscriptions.</div>
<div style="padding-top:8px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
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
  WELCOME · NEW NEWSLETTER SUBSCRIBERS · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-welcome-news.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

const full = doc((f) => IMG[f][0]);
const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
if (problems.length) { console.error(problems); process.exit(1); }
fs.writeFileSync(`${OUT}/welcome-news.html`, full);
console.log('wrote', `${OUT}/welcome-news.html`, '(validator: pass)');

const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/welcome-news.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome · newsletter · preview</title><style>
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
${body((f) => IMG[f][1])}
</body></html>`);
console.log('wrote refine/welcome-news.html');
