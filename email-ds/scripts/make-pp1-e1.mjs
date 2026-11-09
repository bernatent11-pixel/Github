// Post-purchase · one-time Mate Latte buyers · Email 1 · "Your first cup, done right"
//
// Sent when they place their FIRST Mate Latte order (Placed Order), one-time
// buyers who are not subscribers. Opens with a thank-you; job (flow plan): a great
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
export const PREHEADER = 'Thank you for your first order. Here’s how to make your first cup just right, hot or iced.';

const WALL = '#F2E1D4', TABLE = '#F2EADE'; // the scoop photo's cream wall; the warm beige its table fades into
const DRINK_W = 200, DRINK_H = 205; // the hot and iced cutouts share this canvas
const HERO_BG = '#B8A6A6'; // the photo's marble, behind it while it loads
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
  { n: '1', t: 'Scoop', d: `${nw('2.5 tablespoons')} of Mate Latte into your mug ${nw('or glass.')}` },
  { n: '2', t: 'Pour', d: `${nw('8oz of')} hot or cold water or milk. Milk makes it extra creamy.` },
  { n: '3', t: 'Stir or froth', d: `Stir it in, or froth it for a ${nw('café-style')} foam.` },
];

// when to enjoy it: three moments (Bernat's photos)
const MOMENTS = [
  { img: 'moment-morning.jpg', alt: 'Holding a Mate Latte and the pouch on a sunny balcony', when: 'First thing in the morning', title: 'Your new morning ritual',
    text: `Make it your first cup of the day, in place of your coffee. Smooth, steady energy that comes in easy and a clear head to start the day. ${nw('No jitters,')} ${nw('no crash.')}` },
  { img: 'moment-work.jpg', alt: 'A Mate Latte and the pouch beside a laptop', when: 'When it’s time to focus', title: 'Your deep-work partner',
    text: `A long work session ahead, or that early-afternoon slump? It brings calm focus that carries you through. It has ${nw('100mg of caffeine,')} about a cup of coffee, so treat it like one later in the day.` },
  { img: 'moment-friends.jpg', alt: 'Friends in running gear sharing cups of Mate Latte around a small table', when: 'With your people', title: 'Better shared',
    text: `After a morning run or a weekend catch-up, make a round for everyone. One bag makes ${nw('15 cups,')} ${nw('hot or iced.')}` },
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
    .hero { height:637px !important; background-size:cover !important; }
    .hero-top { padding:18px 24px 0 !important; }
    .hero-logo { width:57px !important; height:60px !important; }
    .hero-title { font-size:42px !important; line-height:44px !important; }
    .hero-title1 { padding-top:26px !important; }
    .hero-welcome { padding-top:4px !important; font-size:12px !important; line-height:16px !important; }
    .hero-gap { height:292px !important; line-height:292px !important; }
    .hero-lead { width:128px !important; }
    .hero-text { padding-right:16px !important; }
    .hero-eyebrow { font-size:9px !important; line-height:12px !important; letter-spacing:1.5px !important; }
    .hero-intro { padding-top:4px !important; font-size:11.5px !important; line-height:15px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .step { padding:0 4px !important; }
    .step-t { font-size:14px !important; }
    .step-d { font-size:12px !important; line-height:17px !important; }
    .drink-img { width:150px !important; height:154px !important; }
    .drink-text { font-size:12.5px !important; line-height:18px !important; }
    .m-img, .m-text { display:block !important; width:100% !important; }
    .m-photo { width:100% !important; height:auto !important; }
    .m-gap { display:none !important; }
    .m-text { padding-top:16px !important; }
    .m-title { font-size:26px !important; line-height:29px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-table { background-color:${TABLE} !important; }
    .bg-wall { background-color:${WALL} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
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

  // a drink on the open background: no box. Both images are cut out on the same
  // transparent canvas (DRINK_W x DRINK_H, standing on its bottom edge), so they match in size.
  const drink = (pad, image, alt, name, text) => `<td class="drink" width="50%" align="center" valign="top" style="width:50%;padding:${pad};font-family:${FONT};">
<img class="drink-img" src="${img(image)}" width="${DRINK_W}" height="${DRINK_H}" alt="${alt}" style="display:block;margin:0 auto;width:${DRINK_W}px;height:${DRINK_H}px;border:0;">
<div style="padding-top:16px;font-family:${SERIF};font-size:26px;line-height:30px;font-weight:700;font-style:italic;color:${FOREST};">${name}</div>
<div class="drink-text" style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${text}</div>
</td>`;

  // one moment: photo on one side, text on the other (flip = photo on the right)
  const moment = (m, flip) => `<tr><td class="pad-photo bg-forest" bgcolor="${FOREST}" style="background-color:${FOREST};padding:28px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${flip ? 'rtl' : 'ltr'}" style="table-layout:fixed;"><tr>
<td class="m-img" width="250" valign="middle" dir="ltr" style="width:250px;padding:0;"><img class="m-photo" src="${img(m.img)}" width="250" height="312" alt="${m.alt}" style="display:block;width:250px;height:312px;border:0;border-radius:18px;"></td>
<td class="m-gap" width="26" style="width:26px;font-size:0;line-height:0;">&nbsp;</td>
<td class="m-text" valign="middle" dir="ltr" style="text-align:left;font-family:${FONT};">
<div style="font-size:11px;line-height:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">${ent(m.when)}</div>
<div class="m-title" style="padding-top:8px;font-family:${SERIF};font-size:28px;line-height:31px;font-weight:700;font-style:italic;color:${BEIGE};">${ent(m.title)}</div>
<div style="padding-top:10px;font-size:14px;line-height:21px;font-weight:500;color:#DCE3D6;">${m.text}</div>
</td></tr></table>
</td></tr>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · YOUR FIRST CUP, DONE RIGHT (Bernat's photo is the section's background:
     the white logo centered at the top, the white title left-aligned on the
     darkened top, the thank-you and the brand promise on the marble under the bag) ── -->
<tr><td class="hero" align="left" valign="top" height="980" background="${img('hero-bg.jpg')}" bgcolor="${HERO_BG}" style="height:980px;background-color:${HERO_BG};background-image:url('${img('hero-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:980px;"><v:fill type="frame" src="${img('hero-bg.jpg')}" color="${HERO_BG}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="hero-top" style="padding:30px 40px 0;font-family:${FONT};">
<a href="${amp(L.home)}" target="_blank" style="display:block;text-align:center;"><img class="hero-logo" src="${img('logo-white.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div class="hero-title hero-title1" style="padding-top:42px;font-family:${SERIF};font-size:64px;line-height:66px;font-weight:400;color:#FFFFFF;">Your first cup,</div>
<div class="hero-title" style="font-family:${SERIF};font-size:64px;line-height:66px;font-weight:700;font-style:italic;color:#FFFFFF;">done right.</div>
<div class="hero-welcome" style="padding-top:14px;font-size:18px;line-height:23px;font-weight:500;color:#FFFFFF;">Welcome to better mornings.</div>
</div>
<div class="hero-gap" style="height:450px;line-height:450px;font-size:0;">&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
<td class="hero-lead" width="215" style="width:215px;font-size:0;line-height:0;">&nbsp;</td>
<td class="hero-text" valign="top" style="padding:0 32px 0 0;font-family:${FONT};text-align:left;">
<div class="hero-eyebrow" style="font-size:11px;line-height:15px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${GOLD};">Thank you for your order</div>
<div class="hero-intro" style="padding-top:8px;font-size:15px;line-height:22px;font-weight:500;color:#FFFFFF;">${ent('We’re so glad you’re here. The Mate Latte is clean energy, focus and calm in a cup that tastes like a treat. Here’s everything you need to make it the right way, and the best moments')} ${nw('to enjoy it.')}</div>
</td></tr></table>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · HOW TO MAKE IT (Bernat's scoop photo is the whole section: the title and
     the three steps sit on its cream wall colour, above the bag; its table blends
     into the hot/iced section below) ── -->
${row(WALL, 'pad bg-wall', 'padding:52px 40px 0;', `${eyebrow('How to make it')}
${title('Three steps,', 'thirty seconds.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-wall" bgcolor="${WALL}" style="background-color:${WALL};padding:30px 30px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${steps}
</tr></table>
</td></tr>
<tr><td class="bg-wall" bgcolor="${WALL}" style="background-color:${WALL};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('howto-bg.jpg')}" width="600" height="651" alt="A scoop of Mate Latte powder going into a glass mug beside the pouch" style="display:block;width:600px;height:651px;border:0;"></td></tr>

<!-- ── 3 · HOT OR ICED (on the light table colour of the scoop photo above) ── -->
${row(TABLE, 'pad bg-table', 'padding:20px 40px 0;', `${eyebrow('Your way')}
${title('Hot or iced,', 'it’s all yours.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-table" bgcolor="${TABLE}" style="background-color:${TABLE};padding:30px 30px 52px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${drink('0 10px 0 0', 'drink-hot.png', 'A hot Mate Latte in a glass mug', 'Hot', `Heat ${nw('8oz of milk')} or water, add ${nw('2.5 tablespoons')} and froth until smooth. Cozy and creamy.`)}
${drink('0 0 0 10px', 'drink-iced.png', 'An iced Mate Latte in a tall glass', 'Iced', `Mix ${nw('2.5 tablespoons')} into ${nw('8oz of cold')} milk or water, then pour it over ice. Cold and refreshing.`)}
</tr></table>
</td></tr>

<!-- ── 4 · WHEN TO ENJOY IT: three moments, photo and text alternating sides
     (dir="rtl" swaps the middle row on desktop; phones stack photo above text) ── -->
${row(FOREST, 'pad bg-forest', 'padding:56px 40px 0;', `${eyebrow('When to enjoy it', GOLD)}
${title('Your first week', 'with Mate Latte.', 'h-sec', 40, BEIGE)}`)}
${MOMENTS.map((m, i) => moment(m, i % 2 === 1)).join('\n')}

<tr><td class="bg-forest" bgcolor="${FOREST}" height="56" style="height:56px;line-height:56px;font-size:0;background-color:${FOREST};">&nbsp;</td></tr>

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
  Send: right after their first Mate Latte order (Placed Order); one-time buyers, not subscribers.
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
