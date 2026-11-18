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
  'kit-percent.png': [`${K}298dca91-c865-4fbd-a20a-7eef59dfd2a5.png`, `${X}bf-2026/img/kit-percent.png`],
  'kit-gift.png': [`${K}6ea66d49-d17e-4842-b7ef-51cfed05a0a5.png`, `${X}bf-2026/img/kit-gift.png`],
  'kit-truck.png': [`${K}abfab9c8-eb93-4d4a-8f54-6b63d7238e4b.png`, `${X}bf-2026/img/kit-truck.png`],
  'kit-pause.png': [`${K}a3e19542-83f1-4b00-952a-896da5e3ea72.png`, `${X}bf-2026/img/kit-pause.png`],
  'kit-card.png': [`${K}7355a182-9dee-4eac-bff7-61d1b47c5bd6.png`, `${X}bf-2026/img/kit-card.png`],
  'hero-poster.jpg': ['', `${X}coffee-vs/img/hero-poster.jpg`],
  'kit-photo.jpg': ['', `${X}coffee-vs/img/kit-photo.jpg`],
  'cmp-coffee-beige.png': ['', `${X}coffee-vs/img/cmp-coffee-beige.png`],
};
const hostedPath = `${OUT}/hosted.json`;
if (fs.existsSync(hostedPath)) for (const [f, u] of Object.entries(JSON.parse(fs.readFileSync(hostedPath, 'utf8')))) if (IMG[f]) IMG[f][0] = u;

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
// the Starter Kit as the website lists it (milonga.life, 2026-11-18)
const KIT_LIST = [
  ['kit-percent.png', 'Save 40% on your first order'],
  ['kit-gift.png', 'Free frother + free scooper'],
  ['kit-truck.png', 'Delivered to your door every month'],
  ['kit-pause.png', 'Adjust shipments or cancel anytime'],
  ['kit-card.png', '30-day money-back guarantee'],
];
const SHINE = 'background-color:#D2A346;background-image:linear-gradient(135deg,#F8E79A 0%,#E6BE5A 28%,#C48F2C 55%,#EFD27C 80%,#D5A84A 100%);';
const SHINE_INK = 'color:#FFFFFF;text-shadow:0 1px 1px rgba(90,55,10,.55);';
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
    .kit-wrap { padding:24px 16px 48px !important; }
    .kit-in { padding:22px 20px 26px !important; }
    .price { font-size:44px !important; line-height:46px !important; }
    .btn { padding:17px 28px !important; font-size:14px !important; letter-spacing:1.4px !important; }
  }
  @media only screen and (max-width:360px) {
    .kit-name { font-size:15px !important; padding-right:8px !important; }
    .kit-pill { font-size:11px !important; padding:5px 10px !important; }
    .kit-in { padding:20px 14px 24px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-scene { background-color:${SCENE} !important; }
    .bg-gold { background-color:${GOLD} !important; }
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
  const HAIR = 'rgba(240,239,223,.35)';
  const theirs = (i) => `border-left:1px solid ${HAIR};border-right:1px solid ${HAIR};${i === last ? `border-bottom:1px solid ${HAIR};border-radius:0 0 18px 18px;` : ''}`;
  const head = `<tr>
<td width="50%" align="center" valign="bottom" bgcolor="${GOLD}" style="width:50%;background-color:${GOLD};border-radius:18px 18px 0 0;padding:20px 8px 12px;font-family:${FONT};">
<img src="${img('cmp-pouch.png')}" width="38" height="61" alt="" role="presentation" style="display:block;margin:0 auto;width:38px;height:61px;border:0;">
<div class="cmp-head-name" style="padding-top:10px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">Mate Latte</div>
</td>
<td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
<td width="50%" align="center" valign="bottom" style="width:50%;border:1px solid ${HAIR};border-bottom:0;border-radius:18px 18px 0 0;padding:20px 8px 12px;font-family:${FONT};">
<img src="${img('cmp-coffee-beige.png')}" width="48" height="48" alt="" role="presentation" style="display:block;margin:0 auto;width:48px;height:48px;border:0;">
<div class="cmp-head-name" style="padding-top:23px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BEIGE};">Coffee</div>
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
<div style="border-top:1px solid ${HAIR};padding:14px 0 ${i === last ? 20 : 14}px;">
<div class="cmp-label" style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BEIGE};opacity:.7;">${ent(label)}</div>
<div class="cmp-theirs" style="padding-top:4px;font-size:15px;line-height:20px;font-weight:500;color:${BEIGE};">${ent(b)}</div>
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
<div style="padding-top:14px;font-family:${SERIF};font-size:30px;line-height:32px;font-weight:700;color:${FOREST};">${s.dose}</div>
<div style="padding-top:4px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">${ent(s.name)}</div>
<div style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:${INK};">${ent(s.line)}</div>
</td>`).join('\n');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;">

<!-- ── 1 · CLEAN ENERGY · Bernat's poster (its words are in the image; the alt text repeats them) with the
     Milonga logo set into its cream top; the whole picture opens the Starter Kit ── -->
<tr><td class="bg-cream" align="center" bgcolor="#F6F2E8" style="background-color:#F6F2E8;padding:0;font-size:0;line-height:0;"><a href="${amp(KIT('hero_image'))}" target="_blank" style="display:block;"><img src="${img('hero-poster.jpg')}" width="600" height="1067" alt="Milonga. Clean energy, sharp focus (and skip the coffee jitters). The Mate Latte: 100mg caffeine from yerba mate, L-theanine for no jitters, Lion’s Mane, naturally sweetened with honey, vanilla and monk fruit." style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a></td></tr>

<!-- ── 2 · SIDE BY SIDE · dark green: our column gold, coffee a beige hairline outline ── -->
${row(FOREST, 'pad bg-forest', 'padding:56px 40px 0;', `${eyebrow('Side by side', GOLD)}
${title(['Your coffee vs.', 'the Mate Latte.'], 'h-sec', 40, '#FFFFFF')}`)}
<tr><td class="cmp-wrap bg-forest" align="center" bgcolor="${FOREST}" style="background-color:${FOREST};padding:32px 40px 0;">
${compare(img)}
</td></tr>
${row(FOREST, 'pad bg-forest', 'padding:34px 40px 56px;', `${button(KIT('compare_button'), 'Make the switch', 300, GOLD, FOREST, '#B58E3A')}`)}

<!-- ── 3 · WHAT'S IN EVERY CUP + THE STARTER KIT · gold; the kit as the website lists it, on a white card ── -->
${row(GOLD, 'pad bg-gold', 'padding:56px 40px 0;', `${eyebrow('What’s in every cup')}
${title(['Real yerba mate,', 'and a little more.'], 'h-sec', 40)}`)}
<tr><td class="pad bg-gold" bgcolor="${GOLD}" style="background-color:${GOLD};padding:34px 26px 14px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${inside}
</tr></table>
</td></tr>
<tr><td class="kit-wrap bg-gold" align="center" bgcolor="${GOLD}" style="background-color:${GOLD};padding:30px 50px 60px;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:500px;border-collapse:separate;"><tr><td bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:22px;overflow:hidden;box-shadow:0 14px 34px rgba(90,60,10,.25);font-family:${FONT};">
<a href="${amp(KIT('kit_image'))}" target="_blank" style="display:block;"><img src="${img('kit-photo.jpg')}" width="500" height="500" alt="Two Mate Latte pouches with Lion’s Mane, vanilla and a frother frothing a latte" style="display:block;width:100%;max-width:500px;height:auto;border:0;border-radius:22px 22px 0 0;"></a>
<div class="kit-in" style="padding:26px 30px 30px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr>
<td class="kit-name" valign="middle" style="padding-right:12px;font-family:${FONT};font-size:19px;line-height:24px;font-weight:700;color:${FOREST};white-space:nowrap;">Monthly Starter Kit</td>
<td class="kit-pill" valign="middle" bgcolor="#D2A346" style="${SHINE}${SHINE_INK}border-radius:999px;padding:6px 16px;font-family:${FONT};font-size:13px;line-height:16px;font-weight:700;white-space:nowrap;">Save 40%</td>
</tr></table>
<div style="padding-top:14px;text-align:center;"><span class="price" style="font-family:${SERIF};font-size:46px;line-height:48px;font-weight:700;color:${FOREST};">$37.79</span> <span style="font-family:${FONT};font-size:18px;line-height:24px;font-weight:700;color:#8A8F86;text-decoration:line-through;">$62.98</span></div>
<div style="padding-top:4px;text-align:center;font-size:14px;line-height:20px;font-weight:700;color:${SOFT};">30 servings &middot; $1.26 per serving</div>
<div style="margin:22px 0 6px;border-top:1px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div style="padding-top:10px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">Starter Kit:</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">
${KIT_LIST.map(([icon, t]) => `<tr><td width="36" valign="middle" style="width:36px;padding:8px 0;"><img src="${img(icon)}" width="24" height="24" alt="" role="presentation" style="display:block;width:24px;height:24px;border:0;"></td><td valign="middle" style="padding:8px 0;font-family:${FONT};font-size:16px;line-height:22px;font-weight:700;color:${INK};">${ent(t)}</td></tr>`).join('\n')}
</table>
<div style="padding-top:24px;text-align:center;">${button(KIT('kit_button'), 'Get my Starter Kit', 330)}</div>
</div>
</td></tr></table>
</td></tr>

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

const missing = Object.entries(IMG).filter(([, [u]]) => !u).map(([f]) => f);
const full = doc((f) => IMG[f][0] || `MISSING:${f}`);
const problems = missing.length ? [] : validate(full).filter((p) => p.rule !== 'fragment-only');
if (missing.length) console.log('not hosted yet:', missing.join(', '), '(paste-ready file not written)');
else if (problems.length) { console.error(problems); process.exit(1); }
else { fs.writeFileSync(`${OUT}/coffee-vs.html`, full); console.log('wrote', `${OUT}/coffee-vs.html`, '(validator: pass)'); }

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
