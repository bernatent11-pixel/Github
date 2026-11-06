// Welcome flow · Email 1 · "Your mystery offer is inside" — the reveal.
//
// Live text throughout (headlines, code, buttons, copy); images carry only the
// pouch on gold silk, the three ingredient discs and the logos. Writes:
//   exports/klaviyo/welcome-e1/welcome-e1.html   paste-ready Klaviyo HTML block
//   refine/welcome-e1.html                       preview under an inbox row
// Images come from exports/klaviyo/welcome-e1/hosted.json (file -> Klaviyo CDN
// URL) when present; the preview always uses the local files.
//
// Usage: node scripts/make-welcome-e1-assets.mjs && node scripts/make-welcome-e1.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/welcome-e1';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
// the footer mark is already on Klaviyo's CDN (same file as every other email's footer)
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';

export const SUBJECT = 'Your Mystery Offer Is Inside 🎁';
export const PREHEADER = 'We promised a surprise. Here it is, ready for your first cup.';

// ── colours (contrast map: forest type on the gold silk, beige page, forest card)
const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344';
const HERO = '#F2D9A6'; // the hero photo's mid gold: its bgcolor while the image loads or is blocked
const TAG = '#FBF1DC';  // the code tag's fill on the gold
// Type: titles in Times New Roman (regular, bold, bold italic); everything
// else in Montserrat, bold (700) and medium (500) only.
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";

// ── links: every one carries UTM tags; the buttons go through Shopify's
// discount link, so WELCOME15 is already applied when they reach checkout
const SITE = 'https://milonga.life';
const PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=welcome_mystery_offer&utm_content=${slot}`;
const L = {
  claim: `${SITE}/discount/WELCOME15?redirect=${encodeURIComponent(PDP)}&${utm('e1_hero_button')}`,
  shop: `${SITE}/discount/WELCOME15?redirect=${encodeURIComponent(PDP)}&${utm('e1_closing_button')}`,
  subscribe: `${SITE}${PDP}?${utm('e1_subscribe_link')}`,
  home: `${SITE}/?${utm('e1_logo')}`,
};

const ALT = {
  logo: 'Milonga',
  'disc-yerba-mate': 'Yerba mate',
  'disc-l-theanine': 'L-theanine',
  'disc-lions-mane': 'Lion’s Mane',
};

const keep = (s) => s.replace(/ (\S+)$/, '&nbsp;$1'); // join the last two words
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;').replace(/¡/g, '&iexcl;');

// A pill button with an Outlook (VML) fallback.
const button = (href, label, bg, ink, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${bg === FOREST ? DEEP : '#C9A24E'};">${label}</a><!--<![endif]-->`;

// The code, as a dashed coupon tag. Live text: long-press or select to copy.
const codeTag = (border, fill, ink, capInk) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr>
<td align="center" bgcolor="${fill}" style="background-color:${fill};border:2px dashed ${border};border-radius:16px;padding:12px 36px 14px;font-family:${FONT};">
<div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${capInk};">Your code</div>
<div class="code" style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:6px;color:${ink};">WELCOME15</div>
</td></tr></table>`;

// Doses as printed on the pouch and used in earlier approved Mate Latte emails.
const ROWS = [
  { disc: 'disc-yerba-mate', title: 'Yerba mate · 100mg caffeine', feel: 'Awake.', line: 'Natural caffeine from organic yerba mate. Coffee-level energy, from a leaf.' },
  { disc: 'disc-l-theanine', title: 'L-theanine · 200mg', feel: 'Calm.', line: 'Smooths the energy out so it feels steady. No spike, no crash, no jitters.' },
  { disc: 'disc-lions-mane', title: 'Lion’s Mane · 500mg', feel: 'Clear.', line: 'The mushroom we add for focused, clear-headed mornings.' },
];
const PILLS = ['100mg natural caffeine', '90 cal', '3g sugar', 'Dairy-free', 'No artificial sweeteners'];
const STEPS = [['2.5 tbsp', 'of Mate Latte'], ['8 oz', 'milk or water'], ['30 sec', 'stir or froth']];

function email(img) {
  const rows = ROWS.map((r, i) => `<tr><td style="padding:${i ? 20 : 0}px 0 20px;${i < ROWS.length - 1 ? `border-bottom:1px solid #CFCDB8;` : ''}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="56" valign="top" style="width:56px;"><img src="${img(r.disc + '.png')}" width="56" height="56" alt="${ent(ALT[r.disc])}" style="display:block;width:56px;height:56px;border:0;"></td>
<td valign="middle" style="padding-left:18px;font-family:${FONT};">
<div style="font-family:${SERIF};font-size:22px;line-height:26px;font-weight:700;color:${FOREST};">${ent(r.title)}</div>
<div style="padding-top:4px;font-size:16px;line-height:22px;font-weight:500;color:${INK};"><strong style="font-weight:700;color:${FOREST};">${r.feel}</strong> ${keep(ent(r.line))}</div>
</td></tr></table>
</td></tr>`).join('\n');

  const pills = PILLS.map((p) => `<span style="display:inline-block;margin:0 3px 8px;border:1.5px solid ${FOREST};border-radius:999px;padding:7px 13px;font-family:${FONT};font-size:11px;line-height:14px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${FOREST};white-space:nowrap;">${p}</span>`).join('');

  const steps = STEPS.map(([big, cap], i) => `<td class="step" width="33%" valign="top" align="center" style="width:33%;padding:0 ${i === 1 ? 6 : 0}px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${FOREST}" style="background-color:${FOREST};border-radius:20px;padding:18px 8px 16px;font-family:${FONT};">
<div class="step-big" style="font-family:${SERIF};font-size:30px;line-height:34px;font-weight:700;color:${GOLD};white-space:nowrap;">${big}</div>
<div class="step-cap" style="padding-top:6px;font-size:13px;line-height:17px;font-weight:500;color:#FFFFFF;">${ent(cap)}</div>
</td></tr></table></td>`).join('\n');

  return `<!--
  WELCOME FLOW · EMAIL 1 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-welcome-e1.mjs. Edit the script, not this file.
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
    .h-hero { font-size:72px !important; line-height:68px !important; }
    .h-turn { font-size:34px !important; line-height:38px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .hero-in { padding-left:20px !important; padding-right:20px !important; }
    .code { font-size:24px !important; letter-spacing:4px !important; }
    .btn { padding:19px 28px !important; }
    .card { padding:36px 22px !important; }
    .step { padding:0 3px !important; }
    .step-big { font-size:19px !important; line-height:24px !important; }
    .step-cap { font-size:12px !important; line-height:15px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-hero { background-color:${HERO} !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-card { background-color:${FOREST} !important; }
  }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BEIGE}" class="bg-page" style="background-color:${BEIGE};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · THE REVEAL (gold silk, forest type) ───────────────────────── -->
<tr><td class="bg-hero" align="center" valign="top" height="904" background="${img('hero-bg.jpg')}" bgcolor="${HERO}" style="height:904px;background-color:${HERO};background-image:url('${img('hero-bg.jpg')}');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:904px;"><v:fill type="frame" src="${img('hero-bg.jpg')}" color="${HERO}" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="hero-in" style="padding:32px 40px 0;font-family:${FONT};color:${FOREST};text-align:center;">
<a href="${amp(L.home)}" target="_blank"><img src="${img('logo-green.png')}" width="57" height="60" alt="${ALT.logo}" style="display:block;margin:0 auto;width:57px;height:60px;border:0;"></a>
<div style="height:152px;line-height:152px;font-size:0;">&nbsp;</div>
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">${ent('¡Listo! Your mystery offer is…')}</div>
<div class="h-hero" style="padding-top:8px;font-family:${SERIF};font-size:84px;line-height:78px;font-weight:700;letter-spacing:-1px;color:${FOREST};">15% off</div>
<div class="h-turn" style="font-family:${SERIF};font-size:38px;line-height:44px;font-weight:700;font-style:italic;color:${FOREST};">your first order.</div>
<div style="padding:12px 0 18px;font-size:16px;line-height:22px;font-weight:500;color:${INK};">${keep(ent('We promised a surprise. Here’s your code:'))}</div>
${codeTag(FOREST, TAG, FOREST, SOFT)}
<div style="padding-top:18px;">${button(L.claim, 'Claim my 15% off', FOREST, BEIGE, 300)}</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · WHAT YOU JUST UNLOCKED (beige, forest type) ──────────────── -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:56px 48px 0;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">Meet the Mate Latte</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:${FOREST};">Coffee-level energy,</div>
<div class="h-sec" style="font-family:${SERIF};font-size:40px;line-height:44px;font-weight:700;font-style:italic;color:${FOREST};">minus the jitters.</div>
<div style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${keep(ent('A creamy vanilla yerba mate latte made with organic yerba mate, Lion’s Mane and L-theanine. Not grassy, not bitter: it tastes like a vanilla latte. Ready in 30 seconds, hot or iced.'))}</div>
<div style="padding-top:20px;font-size:0;line-height:0;">${pills}</div>
</td></tr>
<tr><td class="pad bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:24px 48px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${rows}
</table>
</td></tr>

<!-- your first cup: 8 oz, always -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:40px 40px 0;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">Your first cup &middot; hot or iced</div>
<div style="padding:16px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
${steps}
</tr></table></div>
</td></tr>

<!-- ── 3 · THE OFFER, AGAIN (forest card on beige) ──────────────────── -->
<tr><td class="pad bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:48px 24px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="card bg-card" align="center" bgcolor="${FOREST}" style="background-color:${FOREST};border-radius:28px;padding:44px 40px 40px;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">${ent('It’s all yours')}</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:#FFFFFF;">15% off your</div>
<div class="h-sec" style="font-family:${SERIF};font-size:40px;line-height:44px;font-weight:700;font-style:italic;color:#FFFFFF;">first order.</div>
<div style="padding:24px 0;">${codeTag(GOLD, FOREST, GOLD, BEIGE)}</div>
${button(L.shop, 'Shop the Mate Latte', GOLD, FOREST, 300)}
<div style="padding-top:28px;font-size:16px;line-height:24px;font-weight:500;color:#FFFFFF;">${ent('Planning on a cup every morning? Subscribe instead and save 30% on 30 or 60 servings, on every order.')} <strong style="color:${GOLD};">Skip, pause or cancel&nbsp;anytime.</strong></div>
<div style="padding-top:12px;font-size:14px;line-height:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;"><a href="${amp(L.subscribe)}" target="_blank" style="color:${GOLD};text-decoration:underline;">${ent('See subscription options →')}</a></div>
<div style="padding-top:28px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">Free shipping over $45 &middot; 30-day money-back guarantee</div>
</td></tr></table>
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

// ── write the paste-ready block (hosted images) ─────────────────────────
const missing = new Set();
const live = email((f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; });
if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
else {
  const problems = validate(live);
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/welcome-e1.html`, live);
  console.log('wrote', `${OUT}/welcome-e1.html`, '(validator: pass)');
}

// ── preview under an inbox row (local images) ───────────────────────────
const local = email((f) => `../${OUT}/img/${f}`);
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/welcome-e1.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome E1 · preview</title><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:italic}
body{margin:0;background:#2B3A31;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Montserrat,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}
.inbox .row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:700;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}.inbox .from span{font-weight:400;color:#808080}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style></head><body>
<div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">M</div>
<div class="from">Milonga <span>&lt;connect@milonga.life&gt;</span></div>
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${local}
</body></html>`);
console.log('wrote refine/welcome-e1.html');
