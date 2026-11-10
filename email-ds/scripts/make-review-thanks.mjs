// Review Reward · the thank-you for leaving a review, with the 15% off (code REVIEW15)
//
// One section: Bernat's gold product scene is the background, the thank-you and the code sit in
// its empty middle. Then the footer.
// Two versions, one per Klaviyo flow (both triggered by Judge.me "SubmittedReview"):
//   review-thanks-ml     flow "Review Reward - Mate Latte" (live, V7GezY)      the Mate Latte scene
//   review-thanks-cans   flow "Review Reward - Other Products" (draft, SNXWgD)  the cans scene with
//                        three Lion's Mane cans where the Mate Latte pouch was
//
// The code (Shopify, checked 2026-11-10): REVIEW15, active, no end date, 15% off all items, one use
// per customer, one-time purchases only (not subscriptions), combines with no other discount.
// The button opens milonga.life/discount/REVIEW15, which puts the code in the cart, then the page.
// No UTMs: the flow messages add Klaviyo's tracking parameters.
// The reward is for any honest review: the copy never ties it to a good rating.
//
// Writes exports/klaviyo/review-thanks-{ml,cans}/review-thanks-{ml,cans}.html (ONE complete HTML
// email each, for a Klaviyo code template) + previews in refine/.
// Usage: node scripts/make-review-thanks-assets.mjs && node scripts/make-review-thanks.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const SHARED = {
  'mark-green.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png', '../public/logo/mark-green.png'],
};

export const SUBJECT = 'Thanks for your review, here’s 15% off ✨';
export const PREHEADER = 'A small thank-you for sharing. Your code is inside.';

const FOREST = '#004D27', DEEP = '#00351B', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', CREAM = '#F7F4EA';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const CODE = 'REVIEW15';
const shop = (path) => `${SITE}/discount/${CODE}?redirect=${encodeURIComponent(path)}`;

// h: section height on desktop (the image at 600 wide) and on phones (cover, sides cropped a little);
// top: where the copy starts, so it sits in the scene's empty middle.
const VERSIONS = [
  {
    key: 'ml', name: 'review-thanks-ml', out: 'exports/klaviyo/review-thanks-ml', flow: 'Review Reward - Mate Latte',
    bg: '#F5DDAF', h: 804, top: 108, mh: 600, mtop: 80,
    alt: 'Two Mate Latte pouches and a frothy Mate Latte on gold',
    button: 'Use my 15% off', href: shop('/products/the-original-mate-latte'),
  },
  {
    key: 'cans', name: 'review-thanks-cans', out: 'exports/klaviyo/review-thanks-cans', flow: 'Review Reward - Other Products',
    bg: '#F5DCAB', h: 900, top: 252, mh: 675, mtop: 190,
    alt: 'Milonga yerba mate cans on gold',
    button: 'Use my 15% off', href: shop('/collections/drinks'),
  },
];

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const style = (V) => `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:#004D27 !important; text-decoration:none !important; }
  .web-view-line a { color:#3B5344 !important; }
  @media only screen and (max-width:480px) {
    .wrap { width:100% !important; }
    .scene { height:${V.mh}px !important; background-size:cover !important; }
    .scene-gap { height:${V.mtop}px !important; line-height:${V.mtop}px !important; }
    .scene-copy { padding:0 34px !important; }
    .s-eyebrow { font-size:10px !important; line-height:13px !important; letter-spacing:2.5px !important; }
    .s-title { font-size:31px !important; line-height:33px !important; }
    .s-title1 { padding-top:8px !important; }
    .s-lead { padding-top:10px !important; font-size:12.5px !important; line-height:18px !important; }
    .s-code-wrap { padding-top:14px !important; }
    .s-code { padding:9px 16px !important; font-size:13px !important; letter-spacing:2.5px !important; }
    .s-cta { padding-top:14px !important; }
    .btn { padding:14px 26px !important; font-size:13px !important; letter-spacing:1.5px !important; }
    .foot { padding-left:24px !important; padding-right:24px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
  }
</style>`;

const button = (href, label, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:52px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${FOREST}"><w:anchorlock/><center style="color:${BEIGE};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${FOREST};border-radius:999px;padding:18px 36px;font-family:${FONT};font-size:15px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${BEIGE};text-decoration:none;box-shadow:0 4px 0 ${DEEP};">${label}</a><!--<![endif]-->`;

function body(img, V) {
  const L = { home: SITE };
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── THANK YOU · the gold product scene is the section's background; the copy sits in its
     empty middle ── -->
<tr><td class="scene" align="center" valign="top" height="${V.h}" background="${img('bg.jpg')}" bgcolor="${V.bg}" title="${V.alt}" style="height:${V.h}px;background-color:${V.bg};background-image:url('${img('bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:${V.h}px;"><v:fill type="frame" src="${img('bg.jpg')}" color="${V.bg}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="scene-gap" style="height:${V.top}px;line-height:${V.top}px;font-size:0;">&nbsp;</div>
<div class="scene-copy" style="padding:0 120px;font-family:${FONT};text-align:center;">
<div class="s-eyebrow" style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">Thank you</div>
<div class="s-title s-title1" style="padding-top:10px;font-family:${SERIF};font-size:44px;line-height:46px;font-weight:400;color:${FOREST};">Your review</div>
<div class="s-title" style="font-family:${SERIF};font-size:44px;line-height:46px;font-weight:700;font-style:italic;color:${FOREST};">made our day.</div>
<div class="s-lead" style="padding-top:14px;font-size:15px;line-height:22px;font-weight:500;color:${INK};">${ent('It means a lot to a small brand like ours. Here’s')} ${nw('15% off your next order.')}</div>
<div class="s-code-wrap" style="padding-top:20px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr><td class="s-code" align="center" bgcolor="#FFFDF6" style="background-color:#FFFDF6;border:2px dashed ${FOREST};border-radius:12px;padding:11px 22px;font-family:${FONT};font-size:15px;line-height:18px;font-weight:700;letter-spacing:3px;color:${FOREST};white-space:nowrap;">CODE: ${CODE}</td></tr></table>
</div>
<div class="s-cta" style="padding-top:20px;">${button(V.href, V.button, 260)}</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── FOOTER ── -->
<tr><td class="bg-cream foot" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:56px 40px 40px;font-family:${FONT};color:${FOREST};">
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

const doc = (img, V) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${SUBJECT}</title>
<!--
  REVIEW REWARD · ${V.flow.toUpperCase()} · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: right after Judge.me records their review (flow "${V.flow}").
  GENERATED by scripts/make-review-thanks.mjs. Edit the script, not this file.
-->
${style(V)}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img, V)}
</body>
</html>
`;

const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
for (const V of VERSIONS) {
  const hostedPath = `${V.out}/hosted.json`;
  const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
  for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;
  const missing = new Set();
  const h = (f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; };
  const full = doc(h, V);
  if (missing.size) console.log(V.name, 'not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
  else {
    const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
    if (problems.length) { console.error(problems); process.exit(1); }
    fs.writeFileSync(`${V.out}/${V.name}.html`, full);
    console.log('wrote', `${V.out}/${V.name}.html`, `(validator: pass, ${full.length} bytes)`);
  }
  const loc = (f) => SHARED[f]?.[1] || `../${V.out}/img/${f}`;
  fs.writeFileSync(`refine/${V.name}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Review thank-you (${V.key}) · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
body{margin:0;background:#FFFFFF;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8A8A8A;margin-bottom:8px}
.inbox .row{background:#fff;border:1px solid #E2E2E2;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style>${style(V)}</head><body>
<div class="inbox"><div class="lab">Inbox preview · ${V.flow}</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${body(loc, V)}
</body></html>`);
  console.log('wrote', `refine/${V.name}.html`);
}
