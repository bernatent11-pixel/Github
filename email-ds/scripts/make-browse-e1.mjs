// Browse abandonment · Mate Latte branch · Email 1 · "Still thinking about it?"
//
// For people who viewed the Mate Latte and left without adding it to the cart.
// Job (flow PDF): remind them what they looked at and why it's different.
// The edge, as three arrows out of the cup: 100mg natural caffeine, 200mg
// L-theanine, 500mg Lion’s Mane. Three quick
// proof points (real Judge.me reviews, whole sentences, never reworded) and one
// button. No discount: browse emails don't lead with one.
//
// Writes:
//   exports/klaviyo/browse-e1/browse-e1.html   paste-ready Klaviyo HTML block
//   refine/browse-e1.html                      preview under an inbox row
// Usage: node scripts/make-browse-e1.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/browse-e1';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
hosted['logo-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/b6a03046-605a-4e87-b22f-a530be1633e3.png';
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';

export const SUBJECT = 'Still thinking about it? 👀';
export const PREHEADER = 'The creamy vanilla latte you were checking out, and why people swap their coffee for it.';

const WALL = '#E7BE7A'; // the photo's gold wall: the hero's bgcolor while the image loads or is blocked
const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";

const SITE = 'https://milonga.life';
const PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=browse_abandon_mate_latte&utm_content=${slot}`;
const L = {
  // the exact product page this person viewed (from the Viewed Product event
  // that triggered the flow); the Mate Latte page if the event has no URL.
  // No UTM appended by hand: event.URL may already carry a query string, so
  // the flow message's own "Add UTM tracking" setting tags it instead.
  pdp: `{{ event.URL|default:'${SITE}${PDP}' }}`,
  photo: `${SITE}${PDP}?${utm('b1_photo')}`,
  home: `${SITE}/?${utm('b1_logo')}`,
};

// Real reviews (emails/mate-latte-reviews.js): one or two whole sentences each,
// verbatim. Still unverified word-for-word against Judge.me (design memory).
const REVIEWS = [
  { name: 'Bryant', title: 'I’m speechless with the mate latte', quote: 'The taste was what sold me first. It’s creamy, lightly sweet, and has a really nice vanilla flavor without tasting like an overly sugary coffee drink.' },
  { name: 'Manuela Jurado', title: 'So gooood!', quote: 'With the Mate Latte, I feel like I get a steady boost that carries me through what I’m doing without constantly thinking about my next caffeine fix.' },
  { name: 'Priscilla', title: 'Amazing!', quote: 'Not only is it the perfect substitute without making me jittery, but it also tastes so yummy!' },
];

// What's in the cup, left to right as the arrows land. Doses from the pouch.
const CALLOUTS = [
  { dose: '100mg', name: 'natural caffeine', line: 'Coffee-level energy, straight from yerba mate.' },
  { dose: '200mg', name: 'L-theanine', line: 'An amino acid found in tea leaves. It smooths the energy out: calm focus, no jitters.' },
  { dose: '500mg', name: 'Lion’s Mane', line: 'The functional mushroom we add for focused, clear-headed mornings.' },
];

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');

const button = (href, label, bg, ink, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${bg === FOREST ? DEEP : '#C9A24E'};">${label}</a><!--<![endif]-->`;

function email(img) {
  const reviews = REVIEWS.map((r, i) => `<tr><td style="padding:${i ? 14 : 0}px 0 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="card" align="center" bgcolor="${GOLD}" style="background-color:${GOLD};border-radius:24px;padding:26px 32px 24px;font-family:${FONT};box-shadow:0 4px 0 #C9A24E;">
<div style="font-size:15px;line-height:1;letter-spacing:4px;color:${FOREST};">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<div style="padding-top:12px;font-family:${SERIF};font-size:22px;line-height:26px;font-weight:700;color:${FOREST};">${ent(r.title)}</div>
<div style="padding-top:10px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">&ldquo;${ent(r.quote)}&rdquo;</div>
<div style="padding-top:12px;font-size:11px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">${ent(r.name)}</div>
</td></tr></table>
</td></tr>`).join('\n');

  return `<!--
  BROWSE ABANDONMENT · MATE LATTE BRANCH · EMAIL 1 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: 4 hours after Viewed Product (Name contains "Mate Latte").
  GENERATED by scripts/make-browse-e1.mjs. Edit the script, not this file.
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
    .pad-photo { padding-left:16px !important; padding-right:16px !important; }
    .h-hero { font-size:44px !important; line-height:46px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .hero { height:940px !important; background-image:url('${img('hero-bg-mobile.jpg')}') !important; background-size:cover !important; background-position:center top !important; }
    .hero-in { padding:28px 22px 0 !important; }
    .hero-logo { width:57px !important; height:60px !important; }
    .hero-intro { max-width:260px !important; font-size:15px !important; line-height:22px !important; }
    .hero-gap { height:440px !important; line-height:440px !important; }
    .co-lead { width:4px !important; }
    .co { width:33% !important; padding:0 4px !important; }
    .co-card { padding:14px 6px 14px !important; }
    .co-big { font-size:24px !important; line-height:26px !important; }
    .co-name { font-size:12px !important; line-height:15px !important; }
    .co-text { font-size:11.5px !important; line-height:15px !important; }
    .card { padding:24px 22px 22px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color:${BEIGE} !important; }
    .bg-hero { background-color:${WALL} !important; }

  }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BEIGE}" class="bg-page" style="background-color:${BEIGE};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · STILL THINKING ABOUT IT? (the photo is the section's background:
     title on the gold wall, three arrows out of the cup, cards on the table) ── -->
<tr><td class="bg-hero hero" align="left" valign="top" height="1120" background="${img('hero-bg.jpg')}" bgcolor="${WALL}" style="height:1120px;background-color:${WALL};background-image:url('${img('hero-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:1120px;"><v:fill type="frame" src="${img('hero-bg.jpg')}" color="${WALL}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="hero-in" style="padding:36px 40px 0;font-family:${FONT};">
<a href="${amp(L.home)}" target="_blank" style="display:block;text-align:center;"><img class="hero-logo" src="${img('logo-hero.png')}" width="72" height="76" alt="Milonga" style="display:block;margin:0 auto;width:72px;height:76px;border:0;"></a>
<div style="padding-top:22px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">The Mate Latte</div>
<div class="h-hero" style="padding-top:10px;font-family:${SERIF};font-size:54px;line-height:56px;font-weight:400;color:${FOREST};">Still thinking</div>
<div class="h-hero" style="font-family:${SERIF};font-size:54px;line-height:56px;font-weight:700;font-style:italic;color:${FOREST};">about it?</div>
<div class="hero-intro" style="padding-top:14px;max-width:340px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${ent('Totally fair. Here’s what’s inside the creamy vanilla Mate Latte you were')} <span style="white-space:nowrap;">${ent('just looking at.')}</span></div>
</div>
<div class="hero-gap" style="height:571px;line-height:571px;font-size:0;">&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="co-lead" width="72" style="width:72px;font-size:0;line-height:0;">&nbsp;</td>
${CALLOUTS.map((c) => `<td class="co" width="176" valign="top" style="width:176px;padding:0 6px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="co-card" align="center" valign="top" bgcolor="${FOREST}" style="background-color:${FOREST};border-radius:20px;padding:16px 10px 16px;font-family:${FONT};">
<div class="co-big" style="font-family:${SERIF};font-size:32px;line-height:34px;font-weight:700;color:${GOLD};">${c.dose}</div>
<div class="co-name" style="padding-top:4px;font-size:14px;line-height:18px;font-weight:700;color:#FFFFFF;">${ent(c.name)}</div>
<div class="co-text" style="padding-top:6px;font-size:13px;line-height:18px;font-weight:500;color:#FFFFFF;">${ent(c.line)}</div>
</td></tr></table>
</td>`).join('\n')}
</tr></table>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 3 · PROOF (real reviews) ───────────────────────────────────── -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:56px 44px 0;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">${ent('Don’t take our word for it')}</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:${FOREST};">Their mornings,</div>
<div class="h-sec" style="font-family:${SERIF};font-size:40px;line-height:44px;font-weight:700;font-style:italic;color:${FOREST};">in their words.</div>
</td></tr>
<tr><td class="pad-photo bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:28px 40px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${reviews}
</table>
</td></tr>

<!-- ── 4 · ONE BUTTON ─────────────────────────────────────────────── -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:44px 40px 0;font-family:${FONT};">
${button(L.pdp, 'Take another look', FOREST, BEIGE, 300)}
<div style="padding-top:20px;font-size:15px;line-height:22px;font-weight:500;color:${INK};">${ent('Ready in 30 seconds, hot or iced. Subscribe and save 30% on 30 or 60 servings')} <span style="white-space:nowrap;">(1 serving = 1&nbsp;cup).</span> <strong style="font-weight:700;color:${FOREST};">Skip, pause or cancel&nbsp;anytime.</strong></div>
<div style="padding-top:14px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};"><span style="white-space:nowrap;">Free shipping over $45</span> &middot; <span style="white-space:nowrap;">30-day money-back guarantee</span></div>
</td></tr>

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td class="bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:48px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
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
    fs.writeFileSync(`${OUT}/browse-e1.html`, live);
    console.log('wrote', `${OUT}/browse-e1.html`, '(validator: pass)');
  }
}

// ── preview under an inbox row (local images) ───────────────────────────
const local = email((f) => `../${OUT}/img/${f}`);
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/browse-e1.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Browse E1 · preview</title><style>
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
console.log('wrote refine/browse-e1.html');
