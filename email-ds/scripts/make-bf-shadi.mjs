// Campaign · Black Friday 2026 · a plain letter from Shadi
//
// For people who have not tried the Mate Latte yet (send to everyone who has never ordered it).
// Job: put a person and a feeling behind the sale. Black Friday is loud; this is the quiet note:
// the ritual Shadi found in Argentina, why he made the Mate Latte, and the one thing he would want
// them to try, at the lowest price of the year. Asks for a reply.
//
// Facts used
//   Shadi's story as he tells it (welcome-story, Bernat 2026-11-06): moved from South Florida to
//     Argentina at 19 to chase pro soccer; found mate there; the gourd passed around a circle, no phones.
//   Product: creamy vanilla latte made with yerba mate, ready in 30 seconds, hot or iced; steady energy
//     without the jitters or the crash, no bitterness, no acidity (milonga.life product page, approved).
//   Offer (milonga.life, 2026-11-11): Monthly Starter Kit, 30 servings $66.48 -> $39.89 first box
//     (40% off, $1.33 a serving), then 30% off monthly ($46.54); frother + scooper free with 30 and 60
//     servings; adjust shipments or cancel anytime; 30-day money back guarantee. Site: up to 40% off.
//   No sale dates (not set), so no deadline.
//
// Writes exports/klaviyo/bf-shadi/bf-shadi.html (full document, for a code template) + .txt, preview in refine/.
// Usage: node scripts/make-bf-shadi.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const OUT = 'exports/klaviyo/bf-shadi';
fs.mkdirSync(OUT, { recursive: true });
export const SUBJECT = 'the one thing i’d want you to try';
export const PREHEADER = 'Before the Black Friday noise, a quick note from me.';
const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=black_friday_2026&utm_content=${slot}`;
const KIT = `https://milonga.life/products/the-original-mate-latte?selling_plan=8837562678&variant=54302750245174&${utm('shadi_kit_link')}`;
const HOME = `https://milonga.life/?${utm('shadi_ps_link')}`;

// [kind, ...]. 'p' text · 'l' [before, link text, after, href] · 'sign' · 'ps' [before, link text, after, href]
const LETTER = [
  ['p', 'Hey {{ first_name|default:\'there\' }},'],
  ['p', 'It’s Shadi, the founder of Milonga.'],
  ['p', 'Black Friday is usually loud. Countdown timers, “last chance” emails, a hundred deals on things nobody really needs. So before all of that, I wanted to tell you about something small.'],
  ['p', 'When I was 19, I moved from South Florida to Argentina to chase pro soccer. What stayed with me most wasn’t a game. It was a gourd of mate passed around a circle of friends, and the way everyone slowed down for it. No phones. Just people, talking, actually there.'],
  ['p', 'That’s the feeling I built the Mate Latte around. It tastes like a creamy vanilla latte, made with yerba mate, ready in 30 seconds, hot or iced. Smooth, steady energy without the jitters or the crash. A few quiet minutes that are just yours.'],
  ['p', 'If you haven’t tried it yet, this is the moment I’ve been waiting for. For Black Friday, your first Monthly Starter Kit is 40% off: 30 servings for $39.89 instead of $66.48, about $1.33 a cup. And the frother and the scooper are on me.'],
  ['l', '', 'Try your first Mate Latte, 40% off', '', KIT],
  ['p', 'It’s a monthly subscription (after the first box, it’s 30% off every month), and you can adjust shipments or cancel anytime. There’s a 30-day money back guarantee too, so the only risk is looking forward to your mornings again.'],
  ['p', 'And if you try it and it’s not for you, hit reply and tell me. I read every one myself.'],
  ['sign', 'Un abrazo,', 'Shadi'],
  ['ps', 'P.S. ', 'The whole site', ' is up to 40% off right now, cans included. But if you only try one thing, make it the Mate Latte.', HOME],
];

const ent = (s) => s.replace(/&/g, '&amp;').replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const P = (inner, last) => `<p style="margin:0 0 ${last ? 0 : 18}px;">${inner}</p>`;
const A = (href, text) => `<a href="${href.replace(/&/g, '&amp;')}" target="_blank" style="color:#004D27;font-weight:bold;text-decoration:underline;">${ent(text)}</a>`;

function html() {
  const rows = LETTER.map(([k, a, b, c, d], i) => {
    if (k === 'l') return P(`${ent(a)}👉 ${A(d, b)}${ent(c)}`);
    if (k === 'sign') return P(`${ent(a)}<br>${ent(b)}`, LETTER[i + 1]?.[0] !== 'ps');
    if (k === 'ps') return `<p style="margin:6px 0 0;">${ent(a)}${A(d, b)}${ent(c)}</p>`;
    return P(ent(a));
  });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${SUBJECT}</title>
<!--
  CAMPAIGN · BLACK FRIDAY 2026 · A LETTER FROM SHADI · "${SUBJECT}"
  Preview text: ${PREHEADER}
  From: Shadi from Milonga · reply-to: an inbox Shadi reads · audience: never ordered the Mate Latte
  A plain letter: no images, two links. Full document for a Klaviyo code template. GENERATED by scripts/make-bf-shadi.mjs.
-->
<style>
  .unsub-pill a { color:#6B6B6B !important; text-decoration:underline !important; }
  .web-view-line a { color:#6B6B6B !important; }
  @media only screen and (max-width:620px) { .wrap { width:100% !important; } .pad { padding:28px 22px !important; } }
</style>
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="background:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
<tr><td class="pad" align="left" style="padding:36px 32px 28px;font-family:Helvetica, Arial, sans-serif;font-size:16px;line-height:1.6;color:#1E1E1E;">

${rows.join('\n')}

</td></tr>
<tr><td class="pad" align="left" style="padding:0 32px 32px;font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1.5;color:#6B6B6B;">
<div class="unsub-pill">Don&rsquo;t want these emails anymore? {% unsubscribe 'Unsubscribe' %}</div>
<div class="web-view-line" style="padding-top:6px;">{% web_view %}</div>
<div style="padding-top:10px;">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;
}

function text() {
  const out = [`SUBJECT: ${SUBJECT}`, `PREVIEW: ${PREHEADER}`, 'FROM: Shadi from Milonga', ''];
  for (const [k, a, b, c, d] of LETTER) {
    if (k === 'l') out.push(`${b}: ${d}`, '');
    else if (k === 'sign') out.push(a, b, '');
    else if (k === 'ps') out.push(`${a}${b}${c} (${d})`);
    else out.push(a, '');
  }
  return out.join('\n');
}

const h = html(), problems = validate(h).filter((p) => p.rule !== 'fragment-only');
if (problems.length) { console.error(problems); process.exit(1); }
fs.writeFileSync(`${OUT}/bf-shadi.html`, h);
fs.writeFileSync(`${OUT}/bf-shadi.txt`, text());
fs.writeFileSync('refine/bf-shadi.html', `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#2B3A31;padding:28px 0 60px}.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Helvetica,Arial,sans-serif}.lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}.row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}.av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}.from{font-weight:700;font-size:13px;color:#12331F}.sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sub span{color:#6b6b6b}</style></head><body><div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">S</div><div class="from">Shadi from Milonga</div><div class="sub"><b>${ent(SUBJECT)}</b> <span>&mdash; ${ent(PREHEADER)}</span></div></div></div>${h.slice(h.indexOf('<style>'), h.indexOf('</style>') + 8)}${h.slice(h.indexOf('<table'), h.lastIndexOf('</table>') + 8)}</body></html>`);
console.log('wrote bf-shadi.html/.txt (validator: pass,', h.length, 'bytes)');
