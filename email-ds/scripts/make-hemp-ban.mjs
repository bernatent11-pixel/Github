// Campaign · Infused cans (21+) · "Stock up before the hemp ban"
//
// Bernat, 2026-11-20: announce the federal hemp ban (Dec 11) and the stock-up sale.
//   0  countdown banner (a third-party timer image: Klaviyo has no native countdown, see TIMER below)
//   1  logo, "Stock up now, before the ban.", UP TO 30% OFF, the announcement, the van photo
//   2  the two cans, Regular 10mg and Light 5mg, nothing but the can, its name and a button (Bernat:
//      "don't put anything on products"), on a forest gradient, after BREZ's stacked product cards
//   3  Buy more, save more: the bundle builder's progress-bar tiers, after BREZ's tier boxes
// Wording: v2, Bernat asked for "the THC ban" and "10mg THC / 10mg CBD" in THIS email, an exception to his
// standing rule (no THC / CBD / cannabis / weed). Every other email keeps the rule. Never "cannabis" / "weed".
// v2 (Bernat, 2026-11-20): the van photo is the background of the whole first section; a live countdown (days,
// hours, minutes, seconds) next to "The THC ban is coming soon."; each can card lists what's in it with
// icons, what it's for, its strength and what it feels like next to a drink (Bernat's comparison:
// Regular 10mg ~ a hard seltzer, Light 5mg ~ a light beer).
// Facts (milonga.life, 2026-11-20): bundle builder tiers $45+ free shipping, $120+ $15 off, $200+ $30 off,
// $500+ $100 off. Products: Infused Regular 10mg (cannabis-regular-10mg), Infused Light 5mg (acai-mint-thc-cbd-5mg).
// "Up to 30% off" is Bernat's offer for this campaign (its mechanics live in Shopify, not here).
//
// Writes:
//   exports/klaviyo/hemp-ban/hemp-ban.html   ONE complete HTML email (Klaviyo code template)
//   refine/hemp-ban.html                     preview under an inbox row
// Usage: node scripts/make-hemp-ban.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/hemp-ban';
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
hosted['logo-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/b6a03046-605a-4e87-b22f-a530be1633e3.png';
hosted['logo-white.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/49619f06-6898-4fee-a4f2-8e0b6387ea5b.png';
hosted['mark-green.png'] ??= 'https://cdn.klaviyomail.com/company/TwvSnK/images/0e781634-6907-42f6-b101-3c2c15371a99.png';
const LOCAL = { 'logo-white.png': '../exports/klaviyo/pp1-e1/img/logo-white.png', 'logo-green.png': '../exports/klaviyo/welcome-e1/img/logo-green.png', 'mark-green.png': '../public/logo/mark-green.png' };

export const SUBJECT = 'The THC ban is coming ⏳';
export const PREHEADER = 'Dec 11 is almost here. Up to 30% off our Infused cans until then.';

// the countdown: a LIVE timer image from a third-party generator (Sendtric / MailTimers; Klaviyo has none),
// drawn fresh at every open, counting down to Dec 11, 2026. Until its URL is in hosted.json as "timer", the
// email shows "Dec 11" in its place; the preview shows timer-mock.png so the layout can be judged.
const TIMER = hosted.timer || null;
const TIMER_W = 300;

const FOREST = '#004D27', DEEP = '#00351B', LEAF = '#057441', GOLD = '#E3BC62', BEIGE = '#F0EFDF', CREAM = '#F7F4EA', PAPER = '#FBF8EF', INK = '#12331F', SOFT = '#3B5344';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Times New Roman',Times,Georgia,serif";
const SITE = 'https://milonga.life';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=hemp_ban_stockup&utm_content=${slot}`;
const L = {
  home: `${SITE}/?${utm('logo')}`,
  shop: `${SITE}/collections/cannabis-infused-yerba-mate?${utm('hero_button')}`,
  regular: `${SITE}/products/cannabis-regular-10mg?${utm('can_regular_10mg')}`,
  light: `${SITE}/products/acai-mint-thc-cbd-5mg?${utm('can_light_5mg')}`,
  bundle: `${SITE}/pages/bundle-builder?${utm('bundle_button')}`,
};

const ent = (s) => s.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const amp = (s) => s.replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const nw = (s) => `<span style="white-space:nowrap;">${s}</span>`;

const CANS = [
  { img: 'can-10.png', name: 'Infused Regular', dose: '10mg', href: L.regular, alt: 'Milonga Infused Regular 10mg can',
    line: 'Our full-strength can, for when you know your tolerance. Swap it in for your usual drink.', feels: 'a hard seltzer', note: 'New to it? Start with half a can.',
    has: [['thc', '10mg THC'], ['cbd', '10mg CBD'], ['theanine', 'L-theanine'], ['caffeine', 'Natural caffeine'], ['organic', 'Organic']] },
  { img: 'can-5.png', name: 'Infused Light', dose: '5mg', href: L.light, alt: 'Milonga Infused Light 5mg can',
    line: 'Easygoing and social, for a sunny afternoon, dinner with friends or your first can.', feels: 'a light beer',
    has: [['thc', '5mg THC'], ['cbd', '5mg CBD'], ['theanine', 'L-theanine'], ['caffeine', 'Natural caffeine'], ['organic', 'Organic']] },
];
const TIERS = [['$45+', 'Free shipping'], ['$120+', '$15 off'], ['$200+', '$30 off'], ['$500+', '$100 off']];

const STYLE = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:${FOREST} !important; text-decoration:none !important; }
  .web-view-line a { color:${SOFT} !important; }
  @media only screen and (max-width:480px) {
    .pad { padding-left:22px !important; padding-right:22px !important; }
    .pad-cards { padding-left:14px !important; padding-right:14px !important; }
    .full { width:100% !important; height:auto !important; }
    .hero-logo { width:68px !important; height:72px !important; }
    .h-hero { font-size:40px !important; line-height:43px !important; }
    .h-sec { font-size:32px !important; line-height:36px !important; }
    .lead { font-size:15px !important; line-height:23px !important; }
    .offer-big { font-size:58px !important; line-height:60px !important; }
    .ban-col { width:100% !important; max-width:100% !important; }
    .ban-t { font-size:28px !important; line-height:31px !important; text-align:center !important; }
    .ban-in { padding:0 0 12px !important; text-align:center !important; }
    .timer { width:100% !important; max-width:300px !important; height:auto !important; }
    .hero { height:940px !important; background-size:cover !important; background-position:center bottom !important; }
    .can-td { width:92px !important; padding:18px 0 0 14px !important; }
    .can-img { width:76px !important; height:199px !important; }
    .can-text { padding:18px 14px 0 12px !important; }
    .can-dose { font-size:40px !important; line-height:42px !important; }
    .can-line { font-size:13px !important; line-height:19px !important; }
    .has { padding:16px 8px 18px !important; }
    .has-t { font-size:9.5px !important; line-height:12px !important; }
    .has-i { width:30px !important; height:30px !important; }
    .tier-col { width:50% !important; max-width:50% !important; }
    .tier-in { padding:0 5px 10px !important; }
    .btn { padding:17px 28px !important; font-size:14px !important; letter-spacing:1.6px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .bg-white { background-color:#FFFFFF !important; }
    .bg-cream { background-color:${CREAM} !important; }
    .bg-forest { background-color:${FOREST} !important; }
    .bg-gold { background-color:${GOLD} !important; }
  }
</style>`;

const button = (href, label, width, bg = FOREST, ink = BEIGE, shadow = DEEP) => `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${amp(href)}" style="height:56px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:2px;">${label}</center></v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a href="${amp(href)}" target="_blank" class="btn" style="display:inline-block;background-color:${bg};border-radius:999px;padding:20px 40px;font-family:${FONT};font-size:16px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;color:${ink};text-decoration:none;box-shadow:0 4px 0 ${shadow};">${label}</a><!--<![endif]-->`;
const eyebrow = (t, color = FOREST) => `<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${ent(t)}</div>`;
const title = ([a, b], cls, size, color = FOREST, pad = 12) => `<div class="${cls}" style="padding-top:${pad}px;font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:400;color:${color};">${ent(a)}</div>
<div class="${cls}" style="font-family:${SERIF};font-size:${size}px;line-height:${size + 4}px;font-weight:700;font-style:italic;color:${color};">${ent(b)}</div>`;
const row = (bg, cls, style, inner, extra = '') => `<tr><td class="${cls}" align="center" bgcolor="${bg}" style="background-color:${bg};${extra}${style}font-family:${FONT};">
${inner}
</td></tr>`;

// one can card: the can, its name and strength, what it's for, what it feels like next to a drink and a button;
// below, what's in it (gold line icons)
const has = ([k, t], img) => `<td class="has-c" width="20%" align="center" valign="top" style="width:20%;padding:0 2px;font-family:${FONT};">
<img class="has-i" src="${img(`ico-${k}.png`)}" width="36" height="36" alt="" role="presentation" style="display:block;margin:0 auto;width:36px;height:36px;border:0;">
<div class="has-t" style="padding-top:7px;font-size:10.5px;line-height:13px;font-weight:700;color:${BEIGE};">${t}</div></td>`;
const canCard = (c, img) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 0 18px;"><tr><td style="background-color:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.24);border-radius:22px;padding:0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="can-td" width="128" align="center" valign="top" style="width:128px;padding:24px 0 0 20px;"><a href="${amp(c.href)}" target="_blank"><img class="can-img" src="${img(c.img)}" width="111" height="290" alt="${c.alt}" style="display:block;margin:0 auto;width:111px;height:290px;border:0;"></a></td>
<td class="can-text" valign="top" align="left" style="padding:26px 20px 0 16px;font-family:${FONT};text-align:left;">
<div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${GOLD};">${c.name}</div>
<div class="can-dose" style="padding-top:4px;font-family:${SERIF};font-size:52px;line-height:54px;font-weight:700;font-style:italic;color:#FFFFFF;">${c.dose}</div>
<div class="can-line" style="padding-top:8px;font-size:14px;line-height:21px;font-weight:500;color:#DCE8DD;">${ent(c.line)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 0;border-collapse:separate;"><tr><td style="border:1px solid ${GOLD};border-radius:999px;padding:6px 12px;font-family:${FONT};font-size:12px;line-height:15px;font-weight:700;color:${GOLD};">Feels like ${c.feels}</td></tr></table>
${c.note ? `<div style="padding-top:8px;font-size:12px;line-height:17px;font-weight:500;font-style:italic;color:#BFD3C3;">${ent(c.note)}</div>` : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0 0;border-collapse:separate;"><tr><td bgcolor="${GOLD}" style="background-color:${GOLD};border-radius:999px;font-family:${FONT};font-size:13px;line-height:15px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;white-space:nowrap;"><a href="${amp(c.href)}" target="_blank" style="display:inline-block;padding:12px 18px;color:${FOREST};text-decoration:none;">Shop now &rarr;</a></td></tr></table>
</td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="has" style="padding:20px 8px 22px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(255,255,255,.18);"><tr><td style="padding-top:18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>
${c.has.map((x) => has(x, img)).join('\n')}
</tr></table></td></tr></table></td></tr></table>
</td></tr></table>`;

// one bundle tier: hybrid column, 4 across on desktop, 2 x 2 on phones (and in inboxes without media queries)
const tier = ([spend, reward]) => `<div class="tier-col" style="display:inline-block;vertical-align:top;width:100%;max-width:130px;">
<div class="tier-in" style="padding:0 6px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" bgcolor="${PAPER}" style="background-color:${PAPER};border-radius:16px;padding:14px 6px;font-family:${FONT};box-shadow:0 6px 14px rgba(90,60,10,.16);">
<div style="font-size:12px;line-height:16px;font-weight:500;color:${SOFT};">${spend}</div>
<div style="padding-top:2px;font-size:15px;line-height:19px;font-weight:700;color:${FOREST};white-space:nowrap;">${reward}</div>
</td></tr></table>
</div></div>`;

function body(img) {
  // the countdown sits next to "The THC ban is coming soon." (hybrid columns: side by side on desktop,
  // stacked and centred on phones and in inboxes under ~560px)
  const clock = img.preview
    ? `<img class="timer" src="${img('timer-mock.png')}" width="${TIMER_W}" height="69" alt="Countdown to December 11" style="display:block;margin:0 auto;width:${TIMER_W}px;height:auto;border:0;">`
    : TIMER
      ? `<img class="timer" src="${TIMER}" width="${TIMER_W}" alt="Countdown to December 11" style="display:block;margin:0 auto;width:${TIMER_W}px;max-width:100%;height:auto;border:0;">`
      : `<div style="font-family:${SERIF};font-size:48px;line-height:50px;font-weight:700;font-style:italic;color:${GOLD};">Dec 11</div><div style="padding-top:4px;font-size:11px;line-height:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BEIGE};">Up to 30% off until then</div>`;
  const banner = `<div style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="540" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td width="230" valign="middle"><![endif]-->
<div class="ban-col" style="display:inline-block;vertical-align:middle;width:100%;max-width:230px;">
<div class="ban-in" style="padding:0 10px 0 0;text-align:left;font-family:${FONT};">
<div class="ban-t" style="font-family:${SERIF};font-size:30px;line-height:33px;font-weight:400;color:#FFFFFF;text-align:left;">The THC ban</div>
<div class="ban-t" style="font-family:${SERIF};font-size:30px;line-height:33px;font-weight:700;font-style:italic;color:${GOLD};text-align:left;">is coming soon.</div>
</div></div>
<!--[if mso]></td><td width="310" valign="middle"><![endif]-->
<div class="ban-col" style="display:inline-block;vertical-align:middle;width:100%;max-width:310px;text-align:center;font-family:${FONT};">
${clock}
</div>
<!--[if mso]></td></tr></table><![endif]-->
</div>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" class="bg-white" style="background-color:#FFFFFF;">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;">

<!-- ── 0 · THE THC BAN IS COMING SOON + LIVE COUNTDOWN ── -->
${row(FOREST, 'pad bg-forest', 'padding:22px 30px 22px;', banner)}

<!-- ── 1 · STOCK UP NOW, on the van photo (its top darkened into forest night for the white type) ── -->
<tr><td class="hero" align="center" valign="top" height="1060" background="${img('hero-bg.jpg')}" bgcolor="#1E2A22" style="height:1060px;background-color:#1E2A22;background-image:url('${img('hero-bg.jpg')}');background-size:cover;background-position:center bottom;background-repeat:no-repeat;padding:0;">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:1060px;"><v:fill type="frame" src="${img('hero-bg.jpg')}" color="#1E2A22" /><v:textbox inset="0,0,0,0"><![endif]-->
<div class="pad" style="padding:34px 24px 0;font-family:${FONT};text-align:center;">
<a href="${amp(L.home)}" target="_blank" style="display:block;"><img class="hero-logo" src="${img('logo-white.png')}" width="85" height="90" alt="Milonga" style="display:block;margin:0 auto;width:85px;height:90px;border:0;"></a>
<div style="padding-top:26px;">${eyebrow('Last call before the ban', GOLD)}</div>
${title(['Stock up now,', 'before the ban.'], 'h-hero', 52, '#FFFFFF', 10)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:24px auto 0;border-collapse:separate;"><tr><td align="center" bgcolor="${GOLD}" style="background-color:${GOLD};border-radius:22px;padding:16px 26px 18px;font-family:${FONT};box-shadow:0 10px 26px rgba(0,0,0,.35);">
<div style="font-size:13px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${FOREST};">Up to</div>
<div class="offer-big" style="padding-top:2px;font-family:${SERIF};font-size:66px;line-height:68px;font-weight:700;font-style:italic;color:${FOREST};white-space:nowrap;">30% off</div>
<div style="padding-top:2px;font-size:13px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">Our Infused cans</div>
</td></tr></table>
<div style="max-width:460px;margin:0 auto;"><div class="lead" style="padding-top:22px;font-size:16px;line-height:24px;font-weight:500;color:#FFFFFF;text-shadow:0 1px 8px rgba(0,0,0,.45);">${ent('The federal THC ban takes effect on December 11, and our Infused cans may not be available after that. So we’re taking up to 30% off to help you stock up while you')} ${nw('still can.')}</div></div>
<div style="padding:24px 0 0;">${button(L.shop, 'Stock up now', 300, GOLD, FOREST, '#A8822F')}</div>
</div>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- ── 2 · THE CANS (forest gradient; flat forest in Outlook) ── -->
${row(FOREST, 'pad bg-forest', 'padding:54px 40px 0;', `${eyebrow('Pick your can', GOLD)}
${title(['Swap the drink,', 'keep the good times.'], 'h-sec', 40, '#FFFFFF')}`, `background-image:linear-gradient(180deg,${FOREST} 0%,${FOREST} 20%,#035F35 100%);`)}
<tr><td class="pad-cards bg-forest" bgcolor="#035F35" style="background-color:#035F35;background-image:linear-gradient(180deg,#035F35 0%,${LEAF} 100%);padding:30px 20px 40px;">
${CANS.map((c) => canCard(c, img)).join('\n')}
</td></tr>

<!-- ── 3 · BUY MORE, SAVE MORE (the bundle builder's tiers) ── -->
${row(GOLD, 'pad bg-gold', 'padding:52px 40px 0;', `${eyebrow('Bundle & save')}
${title(['Buy more,', 'save more.'], 'h-sec', 40)}
<div style="max-width:440px;margin:0 auto;"><div class="lead" style="padding-top:14px;font-size:16px;line-height:24px;font-weight:500;color:${INK};">${ent('Build your own bundle with any of our drinks. The more you add, the more')} ${nw('you save.')}</div></div>`)}
<tr><td class="pad-cards bg-gold" align="center" bgcolor="${GOLD}" style="background-color:${GOLD};padding:28px 34px 4px;">
<div style="font-size:0;line-height:0;text-align:center;">
<!--[if mso]><table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td width="130" valign="top"><![endif]-->
${TIERS.map(tier).join('\n<!--[if mso]></td><td width="130" valign="top"><![endif]-->\n')}
<!--[if mso]></td></tr></table><![endif]-->
</div>
</td></tr>
${row(GOLD, 'pad bg-gold', 'padding:24px 40px 56px;', button(L.bundle, 'Build my bundle', 320))}

<!-- ── FOOTER ── -->
<tr><td class="bg-cream" align="center" bgcolor="${CREAM}" style="background-color:${CREAM};padding:48px 30px 40px;font-family:${FONT};color:${FOREST};">
<a href="${amp(L.home)}" target="_blank"><img src="${img('mark-green.png')}" width="61" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;"><a href="${amp(L.home)}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;border-collapse:separate;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:500;color:${SOFT};">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:700;color:${SOFT};">Infused cans are for adults 21+ only. Please enjoy responsibly.</div>
<div style="padding-top:8px;font-size:11px;line-height:1.55;font-weight:500;color:${SOFT};">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
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
  CAMPAIGN · INFUSED CANS (21+) · "${SUBJECT}"
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-hemp-ban.mjs. Edit the script, not this file.
-->
${STYLE}
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
${body(img)}
</body>
</html>
`;

fs.mkdirSync(OUT, { recursive: true });
const missing = new Set();
const h = (f) => { if (!hosted[f]) missing.add(f); return hosted[f] || `MISSING:${f}`; };
const full = doc(h);
if (missing.size) console.log('not hosted yet:', [...missing].join(', '), '(paste-ready file not written)');
else {
  const problems = validate(full).filter((p) => p.rule !== 'fragment-only');
  if (problems.length) { console.error(problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/hemp-ban.html`, full);
  console.log('wrote', `${OUT}/hemp-ban.html`, '(validator: pass)');
}
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
const loc = Object.assign((f) => LOCAL[f] || `../${OUT}/img/${f}`, { preview: true });
fs.writeFileSync('refine/hemp-ban.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hemp ban stock-up · preview</title><style>
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
<div class="sub"><b>${SUBJECT}</b> <span>&mdash; ${ent(PREHEADER)}</span></div></div></div>
${body(loc)}
</body></html>`);
console.log('wrote refine/hemp-ban.html');
