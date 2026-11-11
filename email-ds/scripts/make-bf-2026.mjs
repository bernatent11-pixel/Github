// Campaign · Black Friday 2026 · the announcement
//
// Job: announce the Black Friday sale and push the Mate Mornings Club: the sale ends, the club's
// savings don't.
//   1 the announcement on a bronze band (Bernat's scene's colours): logo, "Black Friday",
//     Up to 30% off / site-wide., "Our biggest sale of the year.", "Shop the sale";
//     then the scene (pouch, Lion's Mane cans, gourd, latte), the band's gradient fading into it
//   2 the club on forest: Black Friday ends. / Your savings don't. The club price, the three perks,
//     "Join the club", the guarantee
//   footer on cream
//
// Facts: "Up to 30% off site-wide" and "Our biggest sale of the year" are Bernat's Black Friday line
// (the website hero, 2026-11-09). No dates and no per-product discounts: not set in Shopify yet
// (2026-11-11: only expired test discounts "blackfridayy5..30"). Club (Shopify / Appstle, 2026-11-10):
// 30% off 30 and 60 servings ($48.99 / $97.97), 15% off 15 ($29.74), monthly, skip, pause or cancel
// anytime. One-time 30 servings $69.98.
//
// Writes exports/klaviyo/bf-2026/bf-2026.html (ONE complete HTML email, Klaviyo code template) +
// refine/bf-2026.html. Usage: node scripts/make-bf-2026-assets.mjs && node scripts/make-bf-2026.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/bf-2026';
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const hosted = fs.existsSync(`${OUT}/hosted.json`) ? JSON.parse(fs.readFileSync(`${OUT}/hosted.json`, 'utf8')) : {};
const IMG = {
  'logo-green.png': [`${K}b6a03046-605a-4e87-b22f-a530be1633e3.png`, '../exports/klaviyo/welcome-e1/img/logo-green.png'],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'band.jpg': ['', `../${OUT}/img/band.jpg`],
  'scene.jpg': ['', `../${OUT}/img/scene.jpg`],
};
for (const [f, v] of Object.entries(IMG)) if (!v[0] && hosted[f]) v[0] = hosted[f];

export const SUBJECT = 'Black Friday is here 🖤';
export const PREHEADER = 'Up to 30% off site-wide, and the deal that lasts all year.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', CREAM = '#F7F4EA';
const PLUM = '#3A1830'; // the scene's ribbons
const BAND = '#DDA27A'; // the band's middle, behind it while it loads
const MINT = '#CFE0D4';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life', PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=black_friday_2026&utm_content=${slot}`;
const L = {
  home: `${SITE}/?${utm('logo')}`,
  sale: (slot) => `${SITE}/collections/all?${utm(slot)}`,
  club: `${SITE}${PDP}?selling_plan=8837562678&variant=54302750245174&${utm('bf_club_button')}`,
};

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
    .full { width:100% !important; height:auto !important; }
    .band { padding:28px 20px 6px !important; background-size:100% auto !important; }
    .logo { width:66px !important; height:70px !important; }
    .h-hero { font-size:46px !important; line-height:46px !important; }
    .h-sec { font-size:34px !important; line-height:37px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .price { font-size:40px !important; line-height:42px !important; }
    .perk { display:block !important; width:100% !important; padding:6px 0 !important; }
    .btn { padding:17px 30px !important; font-size:14px !important; letter-spacing:1.5px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const perk = (t) => `<td class="perk" align="center" valign="top" width="33%" style="width:33%;padding:0 6px;font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;color:${BEIGE};"><span style="color:${GOLD};">&#10003;</span>&nbsp;${t}</td>`;

function body(img) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · BLACK FRIDAY · the copy on the bronze band, then the scene, which fades up into it ── -->
<tr><td class="band" align="center" valign="top" background="${img('band.jpg')}" bgcolor="${BAND}" style="background-color:${BAND};background-image:url('${img('band.jpg')}');background-size:100% auto;background-position:center top;background-repeat:no-repeat;padding:36px 40px 8px;font-family:${FONT};">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:420px;"><v:fill type="frame" src="${img('band.jpg')}" color="${BAND}" /><v:textbox inset="0,0,0,0"><![endif]-->
<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="logo" src="${img('logo-green.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:22px;font-size:13px;line-height:16px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:${PLUM};">Black Friday</div>
<div class="h-hero" style="padding-top:10px;font-family:${SERIF};font-size:60px;line-height:60px;font-weight:400;color:${FOREST};">${ent('Up to 30% off')}</div>
<div class="h-hero" style="font-family:${SERIF};font-size:60px;line-height:62px;font-weight:700;font-style:italic;color:${FOREST};">site-wide.</div>
<div class="lead" style="padding-top:14px;font-size:17px;line-height:25px;font-weight:500;color:${INK};">Our biggest sale of the year.</div>
<div style="padding-top:24px;">${button(L.sale('bf_hero_button'), 'Shop the sale', 280)}</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>
<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${amp(L.sale('bf_scene'))}" target="_blank"><img class="full" src="${img('scene.jpg')}" width="600" height="545" alt="The Mate Latte pouch, Lion’s Mane cans, a mate gourd and a Mate Latte" style="display:block;width:600px;height:545px;border:0;"></a></td></tr>

<!-- ── 2 · THE CLUB (on forest): the sale ends, the club's savings don't ── -->
${row(FOREST, 'pad bg-forest', 'padding:60px 40px 0;', `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">The best deal lasts all year</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:44px;line-height:48px;font-weight:400;color:#FFFFFF;">Black Friday ends.</div>
<div class="h-sec" style="font-family:${SERIF};font-size:44px;line-height:48px;font-weight:700;font-style:italic;color:${GOLD};">${ent('Your savings don’t.')}</div>
<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${MINT};">${ent('Join the Mate Mornings Club and save up to 30% on every Mate Latte order, every month.')} ${nw('Not just this weekend.')}</div>`)}
<tr><td class="pad bg-forest" align="center" bgcolor="${FOREST}" style="background-color:${FOREST};padding:28px 60px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};border-radius:20px;padding:24px 20px 22px;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${SOFT};">${ent('Mate Latte · 30 servings')}</div>
<div style="padding-top:8px;"><span class="price" style="font-family:${SERIF};font-size:48px;line-height:50px;font-weight:700;color:${FOREST};">$48.99</span>&nbsp;&nbsp;<span style="font-size:17px;line-height:20px;font-weight:500;color:${SOFT};text-decoration:line-through;">$69.98</span></div>
<div style="padding-top:6px;font-size:13px;line-height:18px;font-weight:700;color:${INK};">${ent('Every month in the club · 30% off')}</div>
</td></tr></table>
</td></tr>
<tr><td class="pad bg-forest" align="center" bgcolor="${FOREST}" style="background-color:${FOREST};padding:24px 34px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${perk(`${nw('Save every order')}`)}
${perk(`${nw('Delivered monthly')}`)}
${perk(`${nw('Skip or pause anytime')}`)}
</tr></table>
</td></tr>
${row(FOREST, 'pad bg-forest', 'padding:34px 40px 60px;', `${button(L.club, 'Join the club', 280, GOLD, FOREST, '#B8913A')}
<div style="padding-top:18px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">${nw('30-day money-back guarantee')}</div>`)}

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
  CAMPAIGN · BLACK FRIDAY 2026 · ANNOUNCEMENT · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-bf-2026.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

const missing = new Set();
const full = doc((f) => { if (!IMG[f]?.[0]) missing.add(f); return IMG[f]?.[0] || `MISSING:${f}`; });
if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
else {
  const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/bf-2026.html`, full);
  console.log('wrote', `${OUT}/bf-2026.html`, `(validator: pass, ${full.length} bytes)`);
}
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/bf-2026.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Black Friday 2026 · preview</title><style>
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
console.log('wrote refine/bf-2026.html');
