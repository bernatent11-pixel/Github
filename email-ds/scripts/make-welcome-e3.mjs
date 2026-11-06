// Welcome flow · Email 3 · last call on WELCOME15.
//
// WELCOME15 has no end date, so this email never claims one. The pressure is
// all true: it is the last email about the offer, the code is one use, and
// the subscription saves more. Sent on day 3.
//
// Writes:
//   exports/klaviyo/welcome-e3/welcome-e3.html   paste-ready Klaviyo HTML block
//   refine/welcome-e3.html                       preview under an inbox row
//
// Usage: node scripts/make-welcome-e3-assets.mjs && node scripts/make-welcome-e3.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/welcome-e3';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';

const CODE = 'WELCOME15'; // the shared Shopify code: 15% off one-time purchases, once per customer, no end date

export const SUBJECT = 'Last Call On Your 15% Off ⏰';
export const PREHEADER = 'This is the last time we’ll bring it up. Your first cup is still 15% off.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344';
const GREEN = '#025A41'; // the studio photo's green, the hero's bgcolor while the image loads or is blocked
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";

const SITE = 'https://milonga.life';
const PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=welcome_mystery_offer&utm_content=${slot}`;

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;').replace(/¡/g, '&iexcl;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');

// The comparison, after Bernat's website chart: Milonga against coffee,
// mushroom coffee and matcha. Our facts from the pouch and the product page.
// Theirs are typical per-serving figures: coffee ~95mg (FDA: 80–100mg per
// 8 oz), mushroom coffee ~35–50mg (common blends), matcha ~40–70mg (a 1–2g
// serving). Kept short: on a phone the three right columns are ~75px wide.
const RIVALS = [['coffee', 'Coffee'], ['mushroom', 'Mushroom coffee'], ['matcha', 'Matcha']];
const COMPARE = [
  ['Sensation', 'Awake, focused & calm', ['Wired & jittery', 'Barely noticeable', 'Calm but subtle']],
  ['Ingredients', 'Yerba mate + Lion’s Mane + L-theanine', ['Coffee beans', 'Coffee + mushrooms', 'Green tea powder']],
  ['Caffeine', '100mg natural, smooth & steady', ['~95mg, spike then crash', '~35–50mg', '~40–70mg']],
  ['Taste', 'Creamy vanilla latte', ['Bitter & acidic', 'Earthy', 'Grassy & earthy']],
  ['3 hours later', 'Still going, no crash', ['Crashing', 'Need another cup', 'Fading']],
];

function email(img, code = CODE) {
  const L = {
    claim: `${SITE}/discount/${code}?redirect=${encodeURIComponent(PDP)}&${utm('e3_hero_button')}`,
    subscribe: `${SITE}${PDP}?${utm('e3_subscribe_link')}`,
    home: `${SITE}/?${utm('e3_logo')}`,
  };
  const button = (href, label, bg, ink, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${bg === FOREST ? DEEP : '#C9A24E'};">${label}</a><!--<![endif]-->`;

  const T = '#E6E4CF', LINE = '#D2D0B8', G = GOLD; // table ground, hairlines, Milonga frame
  const last = COMPARE.length - 1;
  const mil = (i) => `background-color:${FOREST};border-left:3px solid ${G};border-right:3px solid ${G};${i === last ? `border-bottom:3px solid ${G};border-radius:0 0 18px 18px;` : ''}`;
  const rival = (i, j) => `background-color:${T};border-top:1px solid ${LINE};${j ? `border-left:1px solid ${LINE};` : ''}${i === last && j === 2 ? 'border-radius:0 0 18px 0;' : ''}`;
  const head = `<tr>
<td class="cmp-mil" width="37%" align="center" valign="bottom" bgcolor="${FOREST}" style="width:37%;background-color:${FOREST};border:3px solid ${G};border-bottom:0;border-radius:18px 18px 0 0;padding:18px 8px 14px;font-family:${FONT};">
<img class="cmp-pouch" src="${img('cmp-pouch.png')}" width="47" height="76" alt="Milonga Mate Latte pouch" style="display:block;margin:0 auto;width:47px;height:76px;border:0;">
<div class="cmp-brand" style="padding-top:10px;font-size:18px;line-height:20px;font-weight:700;letter-spacing:3px;color:#FFFFFF;">MILONGA</div>
<div style="font-family:${SERIF};font-size:16px;line-height:20px;font-weight:700;font-style:italic;color:${G};">mate latte</div>
</td>
${RIVALS.map(([k, name], j) => `<td class="cmp-r" width="21%" align="center" valign="bottom" bgcolor="${T}" style="width:21%;background-color:${T};${j ? `border-left:1px solid ${LINE};` : ''}${j === 2 ? 'border-radius:0 18px 0 0;' : ''}padding:18px 4px 14px;font-family:${FONT};">
${j === 0 ? `<img class="cmp-vs" src="${img('cmp-vs.png')}" width="40" height="40" alt="versus" style="display:block;margin:0 auto 6px;width:40px;height:40px;border:0;">` : '<div class="cmp-vs-gap" style="height:46px;line-height:46px;font-size:0;">&nbsp;</div>'}
<img src="${img('cmp-' + k + '.png')}" width="34" height="34" alt="" role="presentation" style="display:block;margin:0 auto;width:34px;height:34px;border:0;">
<div class="cmp-name" style="padding-top:8px;font-size:11px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${FOREST};">${name}</div>
</td>`).join('\n')}
</tr>`;
  const rows = COMPARE.map(([label, ours, theirs], i) => `<tr>
<td class="cmp-mil" align="center" valign="middle" bgcolor="${FOREST}" style="${mil(i)}padding:0 10px;font-family:${FONT};">
<div style="border-top:1px solid rgba(255,255,255,.18);padding:14px 2px ${i === last ? 18 : 14}px;">
<div class="cmp-label" style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${G};">${ent(label)}</div>
<div class="cmp-ours" style="padding-top:4px;font-size:14px;line-height:19px;font-weight:700;color:#FFFFFF;">${ent(ours).replace(/(Lion&rsquo;s Mane|L-theanine|Yerba mate)/g, '<span style="white-space:nowrap;">$1</span>')}</div>
</div>
</td>
${theirs.map((t, j) => `<td class="cmp-r cmp-cell" align="center" valign="middle" bgcolor="${T}" style="${rival(i, j)}padding:12px 6px;font-family:${FONT};font-size:13px;line-height:17px;font-weight:700;color:${FOREST};">${ent(t)}</td>`).join('\n')}
</tr>`).join('\n');

  return `<!--
  WELCOME FLOW · EMAIL 3 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: day 3 after signup. WELCOME15 has no end date, so nothing here claims one.
  GENERATED by scripts/make-welcome-e3.mjs. Edit the script, not this file.
  Paste the whole file into one Klaviyo HTML block.
-->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:#004D27 !important; text-decoration:none !important; }
  .web-view-line a { color:#3B5344 !important; }
  @media only screen and (max-width:480px) {
    .wrap { width:100% !important; }
    .pad { padding-left:24px !important; padding-right:24px !important; }
    .hero-in { padding:24px 20px 0 !important; }
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:46px !important; line-height:48px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .code { font-size:20px !important; letter-spacing:2px !important; }
    .code-tag { padding:12px 20px 14px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
    .pad-cmp { padding-left:10px !important; padding-right:10px !important; }
    .cmp-mil { padding-left:6px !important; padding-right:6px !important; }
    .cmp-ours { font-size:12px !important; line-height:16px !important; }
    .cmp-label { font-size:9px !important; letter-spacing:1.4px !important; }
    .cmp-cell { font-size:11px !important; line-height:14px !important; padding:10px 3px !important; }
    .cmp-name { font-size:9px !important; letter-spacing:.8px !important; line-height:12px !important; }
    .cmp-brand { font-size:15px !important; letter-spacing:2px !important; }
    .cmp-vs { width:32px !important; height:32px !important; }
    .cmp-vs-gap { height:38px !important; line-height:38px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-hero { background-color:${GREEN} !important; }
    .bg-page { background-color:${BEIGE} !important; }
  }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BEIGE}" class="bg-page" style="background-color:${BEIGE};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · LAST CALL (the studio photo; copy in the green above the products) -->
<tr><td class="bg-hero" align="center" valign="top" height="1034" background="${img('hero-bg.jpg')}" bgcolor="${GREEN}" style="height:1034px;background-color:${GREEN};background-image:url('${img('hero-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:1034px;"><v:fill type="frame" src="${img('hero-bg.jpg')}" color="${GREEN}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="hero-in" style="padding:32px 40px 0;font-family:${FONT};text-align:center;">
<a href="${amp(L.home)}" target="_blank"><img class="hero-logo" src="${img('logo-gold.png')}" width="76" height="80" alt="Milonga" style="display:block;margin:0 auto;width:76px;height:80px;border:0;"></a>
<div style="padding-top:24px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">Last call</div>
<div class="h-hero" style="padding-top:8px;font-family:${SERIF};font-size:52px;line-height:54px;font-weight:400;color:#FFFFFF;">Your 15% off is</div>
<div class="h-hero" style="font-family:${SERIF};font-size:52px;line-height:56px;font-weight:700;font-style:italic;color:#FFFFFF;">still waiting.</div>
<div style="padding:14px 0 20px;font-size:16px;line-height:24px;font-weight:500;color:#FFFFFF;">${ent('This is the last email we’ll send about it. If the Mate Latte’s been on your mind,')} <span style="white-space:nowrap;">${ent('today’s the day.')}</span></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr>
<td class="code-tag" align="center" bgcolor="${GREEN}" style="background-color:${GREEN};border:2px dashed ${GOLD};border-radius:16px;padding:12px 32px 14px;font-family:${FONT};">
<div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${BEIGE};">Your code</div>
<div class="code" style="font-size:26px;line-height:34px;font-weight:700;letter-spacing:4px;white-space:nowrap;color:${GOLD};">${code}</div>
</td></tr></table>
<div style="padding-top:20px;">${button(L.claim, 'Use my 15% off', GOLD, FOREST, 280)}</div>
<div style="padding-top:16px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">&#10003;&nbsp; 30-day money-back guarantee</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · MATE LATTE VS. THE ALTERNATIVES (beige) ─────────────────── -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:56px 40px 0;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">${ent('In case you’re still deciding')}</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:${FOREST};">Not all morning cups</div>
<div class="h-sec" style="font-family:${SERIF};font-size:40px;line-height:44px;font-weight:700;font-style:italic;color:${FOREST};">are created equal.</div>
</td></tr>
<tr><td class="pad-cmp bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:28px 20px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;">
${head}
${rows}
</table>
</td></tr>
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:32px 48px 0;font-family:${FONT};">
<div style="font-size:16px;line-height:24px;font-weight:500;color:${INK};">${ent('Planning on a cup every morning? Subscribe and save 30% on 30 or 60 servings.')} <strong style="font-weight:700;color:${FOREST};">Skip, pause or cancel&nbsp;anytime.</strong></div>
<div style="padding-top:12px;font-size:14px;line-height:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;"><a href="${amp(L.subscribe)}" target="_blank" style="color:${FOREST};text-decoration:underline;">${ent('See subscription options →')}</a></div>
</td></tr>

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td class="bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:48px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">WELCOME15: 15% off one-time purchases on your first order. One use per customer. Not valid on subscriptions.</div>
<div style="padding-top:8px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>

</table>
</td></tr>
</table>
`;
}

// ── paste-ready block (hosted images) ─────────────────────────────────
{
  const missing = new Set();
  const live = email((f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; });
  if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
  else {
    const problems = validate(live);
    if (problems.length) { console.error(problems); process.exit(1); }
    fs.writeFileSync(`${OUT}/welcome-e3.html`, live);
    console.log('wrote', `${OUT}/welcome-e3.html`, '(validator: pass)');
  }
}

// ── preview under an inbox row (local images, sample code) ─────────────
const local = email((f) => `../${OUT}/img/${f}`);
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/welcome-e3.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome E3 · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
body{margin:0;background:#2B3A31;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}
.inbox .row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style></head><body>
<div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${local}
</body></html>`);
console.log('wrote refine/welcome-e3.html');
