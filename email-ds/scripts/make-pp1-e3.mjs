// Post-purchase · one-time Mate Latte buyers · Email 3 · "Your bag's almost empty"
//
// Day 11 after their first order. Job (flow plan): the subscription before day 15,
// when a 15-cup bag runs out. Subscribe and save so the ritual doesn't stop; skip,
// pause or cancel anytime.
//
// Sections: 1 running low (the pouch on green) · 2 one bag, 15 cups (cup row) ·
// 3 one-time vs the Mate Mornings Club (the cards from cart E1) · 4 how the club works ·
// 5 never run out of good mornings (the kitchen counter, a nearly empty scoop) · footer.
//
// Writes:
//   exports/klaviyo/pp1-e3/pp1-e3.html   ONE complete HTML email (Klaviyo code template)
//   refine/pp1-e3.html                   preview under an inbox row
// Usage: node scripts/make-pp1-e3-assets.mjs && node scripts/make-pp1-e3.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/pp1-e3';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
// already hosted for other emails
const SHARED = {
  'mark-green.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png', '../public/logo/mark-green.png'],
  'icon-save.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/2058c0f3-73b7-4672-8199-a8d73471d03b.png', '../exports/klaviyo/cart-e1/img/icon-save.png'],
  'icon-delivery.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/98d0b468-317e-49a6-81ae-ac18b40a2f35.png', '../exports/klaviyo/cart-e1/img/icon-delivery.png'],
  'icon-pause.png': ['https://cdn.klaviyomail.com/company/TwvSnK/images/91e2b48f-9822-4394-9e33-88182ba8f17c.png', '../exports/klaviyo/cart-e1/img/icon-pause.png'],
};
for (const [f, [url]] of Object.entries(SHARED)) hosted[f] ??= url;
const C = JSON.parse(fs.readFileSync(`${OUT}/colors.json`, 'utf8'));

export const SUBJECT = 'Your bag’s almost empty';
export const PREHEADER = 'Keep your mornings going with the Mate Mornings Club. Save 30%, skip or pause anytime.';

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', BEIGE = '#F0EFDF', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE', CREAM = '#F7F4EA';
const MINT = '#CFE0D4'; // soft text on green
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life', PDP = '/products/the-original-mate-latte';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=post_purchase_mate_latte&utm_content=${slot}`;
const L = {
  hero: `${SITE}${PDP}?${utm('pp3_hero_button')}`,
  photo: `${SITE}${PDP}?${utm('pp3_hero_photo')}`,
  onetime: `${SITE}${PDP}?${utm('pp3_onetime_link')}`,
  club: `${SITE}${PDP}?${utm('pp3_club_card')}`,
  final: `${SITE}${PDP}?${utm('pp3_final_button')}`,
  home: `${SITE}/?${utm('pp3_logo')}`,
};

// Prices from Shopify (2026-11-07): 15 $34.99 · 30 $69.98 · 60 $139.96.
// Mate Mornings Club: 30% off 30 and 60 servings, monthly. Both cards show 30 servings.
const CLUB = [
  { icon: 'icon-save.png', text: 'Save 30% on every order <span style="white-space:nowrap;">(30 or 60 servings)</span>' },
  { icon: 'icon-delivery.png', text: 'Delivered to your door <span style="white-space:nowrap;">every month</span>' },
  { icon: 'icon-pause.png', text: 'Skip, pause or cancel anytime' },
];
const HOW = [
  { img: 'step-size.png', t: 'Pick your size', d: '30 or 60 servings, with 30% off <span style="white-space:nowrap;">every order.</span>' },
  { img: 'step-monthly.png', t: 'It shows up monthly', d: 'A fresh bag at your door every month. <span style="white-space:nowrap;">No reordering.</span>' },
  { img: 'step-control.png', t: 'You’re in control', d: 'Skip, pause or cancel anytime. <span style="white-space:nowrap;">No surprises.</span>' },
];

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
    .pad-photo { padding-left:16px !important; padding-right:16px !important; }
    .full { width:100% !important; height:auto !important; }
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:44px !important; line-height:46px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .cups { width:100% !important; height:auto !important; }
    .cmp-l { padding-right:4px !important; }
    .cmp-r { padding-left:4px !important; }
    .cmp-card { padding:18px 10px 18px !important; }
    .cmp-price { font-size:32px !important; line-height:34px !important; }
    .cmp-text { font-size:12px !important; line-height:17px !important; }
    .club-ico { width:16px !important; padding-right:6px !important; }
    .how { padding:0 4px !important; }
    .how-img { width:48px !important; height:48px !important; }
    .how-t { font-size:13px !important; line-height:17px !important; }
    .how-d { font-size:11.5px !important; line-height:16px !important; }
    .pill a { padding:10px 14px !important; font-size:11px !important; letter-spacing:1px !important; }
    .btn { padding:18px 26px !important; font-size:15px !important; letter-spacing:1.2px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-hero-top { background-color:${C.heroTop} !important; }
    .bg-hero { background-color:${C.heroBottom} !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-page { background-color:${BEIGE} !important; }
    .bg-forest { background-color:${FOREST} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const pill = (href, label, bg, ink) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:separate;"><tr>
<td class="pill" align="center" bgcolor="${bg}" style="background-color:${bg};border-radius:999px;"><a href="${amp(href)}" target="_blank" style="display:inline-block;padding:11px 20px;font-family:${FONT};font-size:12px;line-height:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;">${label}</a></td>
</tr></table>`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = (a, b, cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner) => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${style}font-family:${FONT};">
${inner}
</td></tr>`;
const lead = (t, color, extra = '') => `<div class="lead" style="padding-top:16px;font-size:16px;line-height:24px;font-weight:500;color:${color};${extra}">${t}</div>`;
const trust = (color = FOREST) => `<div style="padding-top:18px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${color};">${nw('Free shipping over $45')} &middot; ${nw('30-day money-back guarantee')}</div>`;

function body(img) {
  const card = (side, inner, style) => `<td class="${side === 'l' ? 'cmp-l' : 'cmp-r'}" width="50%" valign="top" style="width:50%;padding:${side === 'l' ? '0 6px 0 0' : '0 0 0 6px'};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
<td class="cmp-card" align="center" valign="top" ${style} padding:24px 16px 22px;font-family:${FONT};">
${inner}
</td></tr></table>
</td>`;
  const oneTime = card('l', `<div style="font-size:11px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">One-time</div>
<div class="cmp-price" style="padding-top:12px;font-family:${SERIF};font-size:40px;line-height:42px;font-weight:700;color:${FOREST};">$69.98</div>
<div class="cmp-text" style="padding-top:6px;font-size:14px;line-height:18px;font-weight:700;color:${INK};">30 servings</div>
<div class="cmp-text" style="padding-top:2px;font-size:13px;line-height:18px;font-weight:500;color:${SOFT};">$2.33 a cup</div>
<div style="margin:16px auto 0;width:40px;border-top:2px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div>
<div class="cmp-text" style="padding-top:8px;font-size:13px;line-height:18px;font-weight:500;color:${INK};">Reorder yourself each time ${nw('you run out')}</div>
<div style="padding-top:18px;">${pill(L.onetime, 'Buy one-time', FOREST, BEIGE)}</div>`,
    `bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px solid ${LINE};border-radius:22px;`);
  const club = CLUB.map((c) => `<tr><td class="club-ico" width="20" valign="top" style="width:20px;padding:9px 8px 0 0;"><img src="${img(c.icon)}" width="18" height="18" alt="" role="presentation" style="display:block;width:18px;height:18px;border:0;"></td>
<td class="cmp-text" valign="top" style="padding:8px 0 0;font-family:${FONT};font-size:13px;line-height:18px;font-weight:500;color:#FFFFFF;text-align:left;">${c.text}</td></tr>`).join('\n');
  const subscribe = card('r', `<div style="display:inline-block;background-color:${GOLD};border-radius:999px;padding:5px 12px;font-size:10px;line-height:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${FOREST};">Best value</div>
<div style="padding-top:10px;font-family:${SERIF};font-size:20px;line-height:22px;font-weight:700;font-style:italic;color:${GOLD};">Mate Mornings Club</div>
<div class="cmp-price" style="padding-top:8px;font-family:${SERIF};font-size:40px;line-height:42px;font-weight:700;color:#FFFFFF;">$48.99</div>
<div class="cmp-text" style="padding-top:6px;font-size:14px;line-height:18px;font-weight:700;color:#FFFFFF;">30 servings <span style="font-weight:500;color:${MINT};text-decoration:line-through;">$69.98</span></div>
<div class="cmp-text" style="padding-top:2px;font-size:13px;line-height:18px;font-weight:500;color:${MINT};">$1.63 a cup</div>
<div style="margin:16px auto 6px;width:40px;border-top:2px solid rgba(227,188,98,.6);font-size:0;line-height:0;">&nbsp;</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
${club}
</table>
<div class="cmp-text" style="padding-top:12px;font-size:13px;line-height:18px;font-weight:700;color:${GOLD};">${ent('Your Mate Latte every morning,')} ${nw('all month long.')}</div>
<div style="padding-top:16px;">${pill(L.club, 'Join the club', GOLD, FOREST)}</div>`,
    `bgcolor="${FOREST}" style="background-color:${FOREST};border:3px solid ${GOLD};border-radius:22px;`);

  const how = HOW.map((s) => `<td class="how" width="33%" align="center" valign="top" style="width:33%;padding:0 8px;font-family:${FONT};">
<img class="how-img" src="${img(s.img)}" width="56" height="56" alt="" role="presentation" style="display:block;margin:0 auto;width:56px;height:56px;border:0;">
<div class="how-t" style="padding-top:14px;font-size:15px;line-height:19px;font-weight:700;color:${BEIGE};">${ent(s.t)}</div>
<div class="how-d" style="padding-top:6px;font-size:13px;line-height:19px;font-weight:500;color:${MINT};">${ent(s.d)}</div>
</td>`).join('\n');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

<!-- ── 1 · RUNNING LOW? The pouch on green: the photo's top and bottom fade
     into the flat greens of the title row above and the button row below ── -->
${row(C.heroTop, 'pad bg-hero-top', 'padding:34px 40px 8px;', `<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-beige.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:30px;">${eyebrow('Running low?', GOLD)}</div>
${title('Your bag’s', 'almost empty.', 'h-hero', 54, BEIGE, 10)}
${lead(`${ent('15 cups go fast when they’re your morning ritual. Join the Mate Mornings Club and a fresh bag shows up every month, so your mornings')} ${nw('never skip a beat.')}`, MINT)}`)}
<tr><td class="bg-hero-top" bgcolor="${C.heroTop}" style="background-color:${C.heroTop};padding:0;font-size:0;line-height:0;"><a href="${amp(L.photo)}" target="_blank"><img class="full" src="${img('hero.jpg')}" width="600" height="${C.heroH}" alt="The Mate Latte pouch on deep green" style="display:block;width:600px;height:${C.heroH}px;border:0;"></a></td></tr>
${row(C.heroBottom, 'pad bg-hero', 'padding:0 40px 52px;', `${button(L.hero, 'Join the club', 280, GOLD, FOREST, '#B8913A')}
${trust(BEIGE)}`)}

<!-- ── 2 · ONE BAG, 15 CUPS: the cups already had, and the last few ── -->
${row(CREAM, 'pad bg-cream', 'padding:52px 40px 0;', `${eyebrow('Your bag, cup by cup')}
${title('One bag, 15 cups.', 'They go fast.', 'h-sec', 40)}`)}
${row(CREAM, 'pad bg-cream', 'padding:30px 48px 0;', `<img class="cups" src="${img('cups.png')}" width="${C.cupsW}" height="${C.cupsH}" alt="Fifteen cups: most of them already had, the last four still full" style="display:block;margin:0 auto;width:${C.cupsW}px;height:${C.cupsH}px;border:0;">`)}
${row(CREAM, 'pad bg-cream', 'padding:0 40px 56px;', lead(`${ent('That’s about two weeks of mornings. If you’ve had one most days, you’re down to')} ${nw('your last few cups.')}`, INK))}

<!-- ── 3 · ONE-TIME OR THE CLUB, SIDE BY SIDE (the cards from cart E1) ── -->
${row(BEIGE, 'pad bg-page', 'padding:52px 40px 0;', `${eyebrow('Keep it going for less')}
${title('Same Mate Latte,', '30% less.', 'h-sec', 40)}`)}
<tr><td class="pad-photo bg-page" bgcolor="${BEIGE}" style="background-color:${BEIGE};padding:28px 30px 56px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
${oneTime}
${subscribe}
</tr></table>
</td></tr>

<!-- ── 4 · HOW THE CLUB WORKS ─────────────────────────────────────── -->
${row(FOREST, 'pad bg-forest', 'padding:56px 40px 0;', `${eyebrow('How the club works', GOLD)}
${title('Easy to start,', 'easy to change.', 'h-sec', 40, BEIGE)}`)}
<tr><td class="pad-photo bg-forest" bgcolor="${FOREST}" style="background-color:${FOREST};padding:34px 30px 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${how}
</tr></table>
</td></tr>

<!-- ── 5 · NEVER RUN OUT (the kitchen counter, a nearly empty scoop; the
     photo's bottom fades into the cream of the text) ── -->
<tr><td class="bg-cream" bgcolor="${CREAM}" style="background-color:${CREAM};padding:0;font-size:0;line-height:0;"><img class="full" src="${img('final.jpg')}" width="600" height="${C.finalH}" alt="A hot and an iced Mate Latte on a kitchen counter beside the pouch and a nearly empty scoop" style="display:block;width:600px;height:${C.finalH}px;border:0;"></td></tr>
${row(CREAM, 'pad bg-cream', 'padding:8px 40px 0;', `${title('Never run out of', 'good mornings.', 'h-sec', 40, FOREST, 0)}
${lead(`${ent('Join the Mate Mornings Club and your next bag is on its way, then')} ${nw('every month after that.')}`, INK)}
<div style="padding-top:28px;">${button(L.final, 'Join the club', 280)}</div>
${trust(FOREST)}`)}

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
  POST-PURCHASE · ONE-TIME MATE LATTE BUYERS · EMAIL 3 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  Send: day 11 after their first Mate Latte order; exits when they start a subscription.
  GENERATED by scripts/make-pp1-e3.mjs. Edit the script, not this file.
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
    fs.writeFileSync(`${OUT}/pp1-e3.html`, full);
    console.log('wrote', `${OUT}/pp1-e3.html`, '(validator: pass)');
  }
}

const loc = (f) => SHARED[f]?.[1] || `../${OUT}/img/${f}`;
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
fs.writeFileSync('refine/pp1-e3.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Post-purchase E3 · preview</title><style>
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
console.log('wrote refine/pp1-e3.html');
