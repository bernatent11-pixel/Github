// Welcome flow · Email 3 · Day 3 · "Your 15% is still waiting" — the close.
//
// The flows PDF planned "Last call on your mystery offer" with a deadline;
// WELCOME15 never expires, so this is a warm reminder instead: no countdown,
// no "ends tonight". One main button (the PDF's rule for this email).
// Same type as E1: titles in Times New Roman, everything else Montserrat
// bold/medium. Live text throughout; images: logo, the counter photo.
//
// Writes exports/klaviyo/welcome-e3/{welcome-e3.html, img/}, refine/welcome-e3.html
// Usage: node scripts/make-welcome-e3.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/welcome-e3';
fs.mkdirSync(`${OUT}/img`, { recursive: true });
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
// Already on Klaviyo's CDN from E1 and every other footer.
hosted['logo-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/b6a03046-605a-4e87-b22f-a530be1633e3.png';
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';

export const SUBJECT = 'Your 15% Is Still Waiting ☕';
export const PREHEADER = 'Same morning, better cup. Your code still works whenever you’re ready.';

// ── art ──────────────────────────────────────────────────────────────────
// The counter shot (pouch, a hot and an iced Mate Latte), cropped square
// around the products.
await sharp('public/product/latte-counter.jpg').extract({ left: 0, top: 390, width: 1400, height: 1400 })
  .resize(1104, 1104).jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}/img/hero-counter.jpg`);
for (const f of ['logo-green.png', 'mark-green.png']) fs.copyFileSync('public/logo/lockup-milonga-green.png', `${OUT}/img/${f}`);

// ── tokens ───────────────────────────────────────────────────────────────
const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', TAG = '#FBF1DC';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";

const SITE = 'https://milonga.life';
const PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=welcome_mystery_offer&utm_content=${slot}`;
const L = {
  photo: `${SITE}/discount/WELCOME15?redirect=${encodeURIComponent(PDP)}&${utm('e3_photo')}`,
  claim: `${SITE}/discount/WELCOME15?redirect=${encodeURIComponent(PDP)}&${utm('e3_button')}`,
  subscribe: `${SITE}${PDP}?${utm('e3_subscribe_link')}`,
  home: `${SITE}/?${utm('e3_logo')}`,
};
const ALT = {
  logo: 'Milonga',
  hero: 'A pouch of Milonga Mate Latte on a sunny kitchen counter with a hot Mate Latte in a ceramic cup, an iced one in a tall glass and a scoop of the powder.',
};

const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const keep = (s) => s.replace(/ (\S+)$/, '&nbsp;$1');

const button = (href, label, bg, ink, width) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${bg === FOREST ? DEEP : '#C9A24E'};">${label}</a><!--<![endif]-->`;

const codeTag = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr>
<td align="center" bgcolor="${TAG}" style="background-color:${TAG};border:2px dashed ${FOREST};border-radius:16px;padding:12px 36px 14px;font-family:${FONT};">
<div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${SOFT};">Your code</div>
<div class="code" style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:6px;color:${FOREST};">WELCOME15</div>
</td></tr></table>`;

// Mate Latte vs coffee. Coffee's side is the product page's own framing
// (jitters, acidity, the 2pm crash); Lion's Mane has no coffee counterpart,
// so that cell is an em dash rather than a made-up figure.
const COMPARE = [
  ['Energy', '100mg natural caffeine, clean and steady', 'A spike, then the 2pm crash'],
  ['Jitters', 'None. L-theanine keeps it calm', 'Often'],
  ['Focus', '500mg Lion’s Mane', '—'],
  ['Acidity', 'None', 'Acidic'],
  ['Taste', 'A creamy vanilla latte', 'Bitter'],
];

function email(img) {
  const rows = COMPARE.map(([label, ours, theirs], i) => `<tr><td colspan="3" style="padding:${i ? 20 : 0}px 0 8px;font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">${label}</td></tr>
<tr>
<td class="cmp" width="49%" valign="middle" bgcolor="${GOLD}" style="width:49%;background-color:${GOLD};border-radius:16px;padding:14px 16px;font-family:${FONT};font-size:16px;line-height:22px;font-weight:700;color:${FOREST};">${ent(ours)}</td>
<td width="2%" style="width:2%;font-size:0;line-height:0;">&nbsp;</td>
<td class="cmp" width="49%" valign="middle" style="width:49%;border:1.5px solid rgba(255,255,255,.45);border-radius:16px;padding:14px 16px;font-family:${FONT};font-size:16px;line-height:22px;font-weight:500;color:#FFFFFF;">${ent(theirs)}</td>
</tr>`).join('\n');

  return `<!--
  WELCOME FLOW · EMAIL 3 · DAY 3 · "${SUBJECT}"
  Preview text: ${PREHEADER}
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
    .h-hero { font-size:44px !important; line-height:46px !important; }
    .h-sec { font-size:34px !important; line-height:38px !important; }
    .code { font-size:24px !important; letter-spacing:4px !important; }
    .btn { padding:19px 28px !important; }
    .cmp { font-size:15px !important; line-height:20px !important; padding:12px 12px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color:${BEIGE} !important; }
    .bg-band { background-color:${FOREST} !important; }
  }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BEIGE}" class="bg-page" style="background-color:${BEIGE};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · THE REMINDER (beige) ─────────────────────────────────────── -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:36px 40px 0;font-family:${FONT};color:${FOREST};">
<a href="${amp(L.home)}" target="_blank"><img src="${img('logo-green.png')}" width="57" height="60" alt="${ALT.logo}" style="display:block;margin:0 auto;width:57px;height:60px;border:0;"></a>
<div style="padding-top:28px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">Still thinking about it?</div>
<div class="h-hero" style="padding-top:10px;font-family:${SERIF};font-size:56px;line-height:56px;font-weight:400;color:${FOREST};">Your 15% is</div>
<div class="h-hero" style="font-family:${SERIF};font-size:56px;line-height:60px;font-weight:700;font-style:italic;color:${FOREST};">still waiting.</div>
<div style="padding-top:14px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${keep(ent('Your code WELCOME15 still takes 15% off your first order. Here’s what tomorrow morning could look like.'))}</div>
</td></tr>
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:28px 24px 0;">
<a href="${amp(L.photo)}" target="_blank"><img src="${img('hero-counter.jpg')}" width="552" alt="${ent(ALT.hero)}" style="display:block;width:100%;max-width:552px;height:auto;border:0;border-radius:24px;"></a>
</td></tr>

<!-- ── 2 · SAME MORNING, BETTER CUP (forest band) ───────────────────── -->
<tr><td class="bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};height:56px;line-height:56px;font-size:0;">&nbsp;</td></tr>
<tr><td class="pad bg-band" align="center" bgcolor="${FOREST}" style="background-color:${FOREST};padding:56px 40px 56px;font-family:${FONT};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">Mate Latte vs your usual coffee</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:#FFFFFF;">Same morning,</div>
<div class="h-sec" style="font-family:${SERIF};font-size:40px;line-height:46px;font-weight:700;font-style:italic;color:#FFFFFF;">better cup.</div>
<div style="padding-top:32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
<tr>
<td width="49%" align="center" style="width:49%;padding-bottom:8px;font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">Mate Latte</td>
<td width="2%" style="width:2%;">&nbsp;</td>
<td width="49%" align="center" style="width:49%;padding-bottom:8px;font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.75);">Your usual coffee</td>
</tr>
${rows}
</table>
</div>
</td></tr>

<!-- ── 3 · THE OFFER, ONE BUTTON (beige) ────────────────────────────── -->
<tr><td class="pad bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:56px 40px 0;font-family:${FONT};color:${FOREST};">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">Ready when you are</div>
<div class="h-sec" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:${FOREST};">Your new morning ritual</div>
<div class="h-sec" style="font-family:${SERIF};font-size:40px;line-height:46px;font-weight:700;font-style:italic;color:${FOREST};">is one click away.</div>
<div style="padding:16px 0 24px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${keep(ent('Creamy vanilla, 100mg of natural caffeine, ready in 30 seconds, hot or iced.'))}</div>
${codeTag}
<div style="padding-top:24px;">${button(L.claim, 'Claim my 15% off', FOREST, BEIGE, 300)}</div>
<div style="padding-top:16px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">&#10003;&nbsp; 30-day money-back guarantee</div>
<div style="padding-top:28px;font-size:15px;line-height:22px;font-weight:500;color:${INK};">${ent('Planning on a cup every day? Subscribe to 30 or 60 servings and')} <strong style="font-weight:700;color:${FOREST};">save 30%</strong>${ent(', with a')} <strong style="font-weight:700;color:${FOREST};">free milk frother</strong> ${ent('in your first box. Skip, pause or cancel')}&nbsp;anytime.</div>
<div style="padding-top:10px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;"><a href="${amp(L.subscribe)}" target="_blank" style="color:${FOREST};text-decoration:underline;">${ent('See subscription options →')}</a></div>
</td></tr>

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td class="bg-page" align="center" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:56px 30px 40px;font-family:${FONT};color:${FOREST};">
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

const missing = new Set();
const live = email((f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; });
if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
else {
  const problems = validate(live);
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/welcome-e3.html`, live);
  console.log('wrote', `${OUT}/welcome-e3.html`, '(validator: pass)');
}

const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/welcome-e3.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome E3 · preview</title><style>
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
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${ent(PREHEADER)}</span></div></div></div>
${email((f) => `../${OUT}/img/${f}`)}
</body></html>`);
console.log('wrote refine/welcome-e3.html');
