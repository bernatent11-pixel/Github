// Campaign · Coffee vs Mate Latte
//
// Job (Bernat, 2026-11-18): a campaign about coffee vs the Mate Latte. No build record; ad hoc.
// Story: keep the coffee ritual, swap what's inside. Hero on Bernat's gold Mate Latte scene (the clean
// version from sub1-e3), then the head-to-head comparison (memory: our column filled gold, theirs a hairline
// outline, an em dash where coffee has no figure), what's in every cup on forest green with the Starter Kit
// offer, footer.
//
// Facts used
//   Comparison rows as shipped in welcome-e3 (coffee ~95mg, spike then crash, bitter & acidic, crashing three
//   hours later), minus its focus / calm wording. Doses 100mg natural caffeine, 200mg L-theanine, 500mg
//   Lion's Mane (product page). Ready in 30 seconds, hot or iced. Starter Kit (Shopify, 2026-11-18): plan
//   8837562678, 40% off the first box then 30% monthly; 30 servings $62.98 -> $37.79 ($1.26 a cup); frother
//   and scooper free with 30 and 60 servings; cancel anytime. Claims: only "steady energy without the jitters
//   or the crash" style wording; no focus, calm or other function claims.
//
// Writes exports/klaviyo/coffee-vs/coffee-vs.html (full document, Klaviyo code template), preview in refine/.
// Usage: node scripts/make-coffee-vs.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/coffee-vs';
fs.mkdirSync(OUT, { recursive: true });
const K = 'https://cdn.klaviyomail.com/company/TwvSnK/images/';
const X = '../exports/klaviyo/';
const IMG = {
  'logo-green.png': [`${K}b6a03046-605a-4e87-b22f-a530be1633e3.png`, `${X}welcome-e1/img/logo-green.png`],
  'mark-green.png': [`${K}0e781634-6907-42f6-b101-3c2c15371a99.png`, '../public/logo/mark-green.png'],
  'plans-bg.jpg': [`${K}4df20a78-291a-4b9a-aed0-3d3a7300a639.jpeg`, `${X}sub1-e3/img/plans-bg.jpg`],
  'cmp-pouch.png': [`${K}42ccdf16-bbbc-4246-ab82-8d5573d6f6f5.png`, `${X}welcome-e3/img/cmp-pouch.png`],
  'cmp-coffee.png': [`${K}31afe900-12dd-4189-9834-e73964cb59d7.png`, `${X}welcome-e3/img/cmp-coffee.png`],
  'disc-yerba.png': [`${K}8946052a-344d-4b12-a683-baa644589a0b.png`, `${X}ml101/img/disc-beige-yerba-mate.png`],
  'disc-theanine.png': [`${K}d01f925e-e7a9-4ca8-bbbc-3e8061a0a209.png`, `${X}ml101/img/disc-beige-l-theanine.png`],
  'disc-lions.png': [`${K}a6756a94-47d0-43a0-9715-5dcb5df67198.png`, `${X}ml101/img/disc-beige-lions-mane.png`],
  'bags-30.png': [`${K}7b6e7cd1-ea70-4c06-80c6-dc8d8365da27.png`, `${X}bf-2026/img/bags-30.png`],
};

export const SUBJECT = 'Your coffee vs. the Mate Latte ☕';
export const PREHEADER = 'Same morning ritual. Smoother energy, and no afternoon crash.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const SCENE = '#C99253';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=coffee_vs_mate_latte&utm_content=${slot}`;
const KIT = (slot) => `${SITE}/products/the-original-mate-latte?selling_plan=8837562678&variant=54302750245174&${utm(slot)}`;
const HOME = `${SITE}/?${utm('logo')}`;

// [row label, Mate Latte, coffee]
const COMPARE = [
  ['Energy', 'Smooth & steady', 'Spike, then crash'],
  ['Caffeine', '100mg, from yerba mate', '~95mg a cup'],
  ['3 hours later', 'Still going, no crash', 'Crashing'],
  ['Taste', 'Creamy vanilla latte', 'Bitter & acidic'],
  ['Also in the cup', '200mg L-theanine + 500mg Lion’s Mane', '—'],
];
const INSIDE = [
  { disc: 'disc-yerba.png', dose: '100mg', name: 'natural caffeine', line: 'About a cup of coffee’s worth, from yerba mate.' },
  { disc: 'disc-theanine.png', dose: '200mg', name: 'L-theanine', line: 'Paired with the caffeine for smooth, steady energy.' },
  { disc: 'disc-lions.png', dose: '500mg', name: 'Lion’s Mane', line: 'The functional mushroom, in every cup.' },
];

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
    .pad { padding-left:22px !important; padding-right:22px !important; }
    .hero-in { padding:30px 22px 290px !important; }
    .hero-logo { width:56px !important; height:59px !important; }
    .h-hero { font-size:40px !important; line-height:43px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .cmp-wrap { padding-left:14px !important; padding-right:14px !important; }
    .cmp-label { font-size:9px !important; letter-spacing:1.2px !important; }
    .cmp-ours, .cmp-theirs { font-size:13px !important; line-height:17px !important; }
    .cmp-head-name { font-size:10px !important; letter-spacing:1px !important; }
    .in-col { display:block !important; width:100% !important; padding:0 0 26px !important; }
    .price { font-size:44px !important; line-height:46px !important; }
    .btn { padding:17px 28px !important; font-size:14px !important; letter-spacing:1.4px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-scene { background-color:${SCENE} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 38px;font-family:${FONT};font-size:16px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = ([a, b], cls, size, color = FOREST, pad = 12, shadow = '') => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};${shadow}">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};${shadow}">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const lead = (t, color = INK, extra = '') => `<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${t}</div>`;

// the comparison: a header row (the pouch / the coffee cup), then one row per attribute. Our column is one
// gold-filled rounded column; coffee's is a hairline outline.
function compare(img) {
  const last = COMPARE.length - 1;
  const ours = (i) => `background-color:${GOLD};${i === last ? 'border-radius:0 0 18px 18px;' : ''}`;
  const theirs = (i) => `border-left:1px solid ${LINE};border-right:1px solid ${LINE};${i === last ? `border-bottom:1px solid ${LINE};border-radius:0 0 18px 18px;` : ''}`;
  const head = `<tr>
<td width="50%" align="center" valign="bottom" bgcolor="${GOLD}" style="width:50%;background-color:${GOLD};border-radius:18px 18px 0 0;padding:20px 8px 12px;font-family:${FONT};">
<img src="${img('cmp-pouch.png')}" width="38" height="61" alt="" role="presentation" style="display:block;margin:0 auto;width:38px;height:61px;border:0;">
<div class="cmp-head-name" style="padding-top:10px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">Mate Latte</div>
</td>
<td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
<td width="50%" align="center" valign="bottom" style="width:50%;border:1px solid ${LINE};border-bottom:0;border-radius:18px 18px 0 0;padding:20px 8px 12px;font-family:${FONT};">
<img src="${img('cmp-coffee.png')}" width="48" height="48" alt="" role="presentation" style="display:block;margin:0 auto;width:48px;height:48px;border:0;">
<div class="cmp-head-name" style="padding-top:23px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${SOFT};">Coffee</div>
</td>
</tr>`;
  const rows = COMPARE.map(([label, a, b], i) => `<tr>
<td align="center" valign="top" bgcolor="${GOLD}" style="${ours(i)}padding:0 12px;font-family:${FONT};">
<div style="border-top:1px solid rgba(0,77,39,.18);padding:14px 0 ${i === last ? 20 : 14}px;">
<div class="cmp-label" style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};opacity:.75;">${ent(label)}</div>
<div class="cmp-ours" style="padding-top:4px;font-size:15px;line-height:20px;font-weight:700;color:${FOREST};">${ent(a).replace(/(\d+mg [A-Z][\w-]*(?:&rsquo;s Mane)?)/g, (m) => nw(m))}</div>
</div>
</td>
<td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
<td align="center" valign="top" style="${theirs(i)}padding:0 12px;font-family:${FONT};">
<div style="border-top:1px solid ${LINE};padding:14px 0 ${i === last ? 20 : 14}px;">
<div class="cmp-label" style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${SOFT};opacity:.75;">${ent(label)}</div>
<div class="cmp-theirs" style="padding-top:4px;font-size:15px;line-height:20px;font-weight:500;color:${SOFT};">${ent(b)}</div>
</div>
</td>
</tr>`).join('\n');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;table-layout:fixed;">
${head}
${rows}
</table>`;
}

function body(img) {
  const inside = INSIDE.map((s) => `<td class="in-col" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img src="${img(s.disc)}" width="64" height="64" alt="" role="presentation" style="display:block;margin:0 auto;width:64px;height:64px;border:0;">
<div style="padding-top:14px;font-family:${SERIF};font-size:30px;line-height:32px;font-weight:700;color:#FFFFFF;">${s.dose}</div>
<div style="padding-top:4px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">${ent(s.name)}</div>
<div style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${BEIGE};">${ent(s.line)}</div>
</td>`).join('\n');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;">

<!-- ── 1 · SAME RITUAL, BETTER CUP · Bernat's gold Mate Latte scene; the words in its light top, the pouch
     and the latte below them ── -->
<tr><td class="bg-scene" align="center" valign="top" background="${img('plans-bg.jpg')}" bgcolor="${SCENE}" style="background-color:${SCENE};background-image:url('${img('plans-bg.jpg')}');background-size:cover;background-position:center bottom;background-repeat:no-repeat;padding:0;font-family:${FONT};">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:803px;"><v:fill type="frame" src="${img('plans-bg.jpg')}" color="${SCENE}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="hero-in" style="padding:36px 44px 470px;">
<a href="${amp(HOME)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-green.png')}" width="64" height="68" alt="Milonga" style="display:block;margin:0 auto;width:64px;height:68px;border:0;"></a>
<div style="padding-top:22px;">${eyebrow('Coffee vs. Mate Latte')}</div>
${title(['Same ritual,', 'better cup.'], 'h-hero', 52, FOREST, 10)}
<div style="max-width:420px;margin:0 auto;">${lead(`Keep the warm mug and the five quiet minutes. Just swap ${nw('what’s inside.')}`)}</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · SIDE BY SIDE · our column gold, coffee a hairline outline ── -->
${row(CREAM, 'pad bg-cream', 'padding:56px 40px 0;', `${eyebrow('Side by side')}
${title(['Your coffee vs.', 'the Mate Latte.'], 'h-sec', 40)}`)}
<tr><td class="cmp-wrap bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:32px 40px 0;">
${compare(img)}
</td></tr>
${row(CREAM, 'pad bg-cream', 'padding:34px 40px 56px;', `${button(KIT('compare_button'), 'Make the switch', 300)}`)}

<!-- ── 3 · WHAT'S IN EVERY CUP + THE STARTER KIT · forest green, white titles, gold labels, beige body ── -->
${row(FOREST, 'pad bg-forest', 'padding:56px 40px 0;', `${eyebrow('What’s in every cup', GOLD)}
${title(['Real yerba mate,', 'and a little more.'], 'h-sec', 40, '#FFFFFF')}`)}
<tr><td class="pad bg-forest" bgcolor="${FOREST}" style="background-color:${FOREST};padding:34px 26px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${inside}
</tr></table>
</td></tr>
${row(FOREST, 'pad bg-forest', 'padding:30px 40px 58px;', `<div style="margin:0 auto;width:60px;border-top:2px solid rgba(227,188,98,.6);font-size:0;line-height:0;">&nbsp;</div>
<div style="padding-top:36px;">${eyebrow('Make the switch', GOLD)}</div>
${title(['Start with the', 'Starter Kit.'], 'h-sec', 40, '#FFFFFF')}
<img src="${img('bags-30.png')}" width="240" height="160" alt="Two Mate Latte pouches" style="display:block;margin:18px auto 0;width:240px;max-width:100%;height:auto;border:0;">
<div class="price" style="padding-top:6px;font-family:${SERIF};font-size:52px;line-height:54px;font-weight:700;color:#FFFFFF;">$37.79</div>
<div style="padding-top:6px;font-size:14px;line-height:20px;font-weight:700;color:${GOLD};">30 servings &middot; <span style="text-decoration:line-through;color:${BEIGE};opacity:.7;">$62.98</span> &middot; ${nw('$1.26 a cup')}</div>
<div style="max-width:430px;margin:0 auto;">${lead(`40% off your first box, then 30% off every month. With 30 or 60 servings, the frother and scooper are on us. Ready in 30 seconds, hot or iced. ${nw('Cancel anytime.')}`, BEIGE)}</div>
<div style="padding-top:30px;">${button(KIT('kit_button'), 'Get my Starter Kit', 330, GOLD, FOREST, '#B58E3A')}</div>`)}

<!-- ── FOOTER ── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:52px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(HOME)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(HOME)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. Coffee caffeine is an average for an 8oz brewed cup. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
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
  CAMPAIGN · COFFEE VS MATE LATTE · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-coffee-vs.mjs. Edit the script, not this file.
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
fs.writeFileSync(`${OUT}/coffee-vs.html`, full);
console.log('wrote', `${OUT}/coffee-vs.html`, '(validator: pass)');

const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/coffee-vs.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Coffee vs Mate Latte · preview</title><style>
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
console.log('wrote refine/coffee-vs.html');
