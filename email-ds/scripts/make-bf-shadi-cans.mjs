// Campaign · Black Friday 2026 · plain letters from Shadi about the cans (Lion's Mane and Infused)
//
// Two versions (Bernat, 2026-11-12):
//   cans-new     never bought the cans: try them, 30% off your first box when you join the monthly club
//   cans-buyers  bought the cans, not subscribed to them: join the club at the year's biggest can discount
// Facts used (Shopify, 2026-11-12): cans plan 6832750902 ("Milonga Products Monthly Subscription"), 30% off
// the first box, then 20% off every monthly box. Lion's Mane 24 cans $75.60 -> $52.92 first box; Infused 24
// cans $149.00 -> $104.30. Flavors Açaí Mint, Peach Ginger, Citrus Mango. Copy uses only approved wording
// ("steady energy without the jitters or the crash"); the product pages' focus / calm / mood claims are left
// out. The infused cans are only "Infused" (21+); never THC, CBD or cannabis in the copy.
//
// Writes exports/klaviyo/bf-shadi-<v>/bf-shadi-<v>.html + .txt, preview in refine/.
// Usage: node scripts/make-bf-shadi-cans.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const utm = (slot) => `utm_source=klaviyo&utm_medium=email&utm_campaign=black_friday_2026&utm_content=${slot}`;
const CAN = (handle, variant, slot) => `https://milonga.life/products/${handle}?selling_plan=6832750902&variant=${variant}&${utm(slot)}`;
const LM = (slot) => CAN('lion-s-mane', '53053588701494', slot);
const INF = (slot) => CAN('cannabis-regular-10mg', '52759098196278', slot);

// [kind, ...]. 'p' text · 'l' [before, link text, after, href] · 'sign'
const VERSIONS = [
  {
    v: 'cans-new',
    subject: 'have you tried our cans yet? 🥤',
    preheader: 'Your first box is 30% off this Black Friday, on me.',
    audience: 'never bought the cans',
    letter: [
      ['p', 'Hey {{ person.first_name|default:\'there\' }}!'],
      ['p', 'Shadi here. Have you tried our cans yet? If not, Black Friday is the perfect time. 🥤'],
      ['p', 'They’re real yerba mate, ready to grab on the go: steady energy without the jitters or the crash. And they come in three flavors: Açaí Mint, Peach Ginger and Citrus Mango.'],
      ['p', 'So here’s my gift: 30% off your first box when you join our monthly club. That’s $52.92 for your first 24 Lion’s Mane cans, instead of $75.60.'],
      ['l', '', 'Try the Lion’s Mane cans', '', LM('shadi_cans_new_lm')],
      ['p', 'If you’re 21 or older, our Infused cans are 30% off your first box too.'],
      ['l', '', 'Try the Infused cans', '', INF('shadi_cans_new_infused')],
      ['p', 'After that, you still save 20% on every box, and you can skip, pause or cancel anytime.'],
      ['p', 'Tell me which flavor you like best. Just hit reply.'],
      ['sign', 'Un abrazo,', 'Shadi'],
    ],
  },
  {
    v: 'cans-buyers',
    subject: 'your cans, 30% off 🥤',
    preheader: 'Join the club this Black Friday and save on every box after.',
    audience: 'bought the cans, not subscribed to them',
    letter: [
      ['p', 'Hey {{ person.first_name|default:\'there\' }}!'],
      ['p', 'Shadi here. You’ve already tried our cans, so first of all, thank you. It really means a lot. 💛'],
      ['p', 'If you keep reordering them (or running out right when you need one 😄), this is the best time to join the club. For Black Friday, your first box is 30% off. That’s $52.92 for 24 Lion’s Mane cans, instead of $75.60.'],
      ['l', '', 'Get 30% off Lion’s Mane', '', LM('shadi_cans_buyers_lm')],
      ['l', '', 'Get 30% off Infused (21+)', '', INF('shadi_cans_buyers_infused')],
      ['p', 'After that, you still save 20% on every box. They show up at your door every month, and you can skip, pause or cancel anytime.'],
      ['p', 'Any questions? Just hit reply. I read every one.'],
      ['sign', 'Un abrazo,', 'Shadi'],
    ],
  },
];

const ent = (s) => s.replace(/&/g, '&amp;').replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/—/g, '&mdash;').replace(/–/g, '&ndash;');
const P = (inner, last) => `<p style="margin:0 0 ${last ? 0 : 18}px;">${inner}</p>`;
const A = (href, text) => `<a href="${href.replace(/&/g, '&amp;')}" target="_blank" style="color:#004D27;font-weight:bold;text-decoration:underline;">${ent(text)}</a>`;

function html(V) {
  const { subject: SUBJECT, preheader: PREHEADER, letter: LETTER } = V;
  const rows = LETTER.map(([k, a, b, c, d], i) => {
    if (k === 'l') return P(`${ent(a)}👉 ${A(d, b)}${ent(c)}`);
    if (k === 'ul') return `<ul style="margin:0 0 18px;padding-left:22px;">${a.map((t) => `<li style="margin:0 0 4px;">${ent(t)}</li>`).join('')}</ul>`;
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
  CAMPAIGN · BLACK FRIDAY 2026 · A LETTER FROM SHADI ABOUT THE CANS · "${SUBJECT}"
  Preview text: ${PREHEADER}
  From: Shadi from Milonga · reply-to: an inbox Shadi reads · audience: ${V.audience}
  A plain letter: no images. Full document for a Klaviyo code template. GENERATED by scripts/make-bf-shadi-cans.mjs.
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

function text(V) {
  const { subject: SUBJECT, preheader: PREHEADER, letter: LETTER } = V;
  const out = [`SUBJECT: ${SUBJECT}`, `PREVIEW: ${PREHEADER}`, 'FROM: Shadi from Milonga', ''];
  for (const [k, a, b, c, d] of LETTER) {
    if (k === 'l') out.push(`${b}: ${d}`, '');
    else if (k === 'ul') out.push(...a.map((t) => `• ${t}`), '');
    else if (k === 'sign') out.push(a, b, '');
    else if (k === 'ps') out.push(`${a}${b}${c} (${d})`);
    else out.push(a, '');
  }
  return out.join('\n');
}

for (const V of VERSIONS) {
  const OUT = `exports/klaviyo/bf-shadi-${V.v}`, name = `bf-shadi-${V.v}`;
  fs.mkdirSync(OUT, { recursive: true });
  const h = html(V), problems = validate(h).filter((p) => p.rule !== 'fragment-only');
  if (problems.length) { console.error(V.v, problems); process.exit(1); }
  fs.writeFileSync(`${OUT}/${name}.html`, h);
  fs.writeFileSync(`${OUT}/${name}.txt`, text(V));
  fs.writeFileSync(`refine/${name}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#2B3A31;padding:28px 0 60px}.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Helvetica,Arial,sans-serif}.lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}.row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}.av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}.from{font-weight:700;font-size:13px;color:#12331F}.sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sub span{color:#6b6b6b}</style></head><body><div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">S</div><div class="from">Shadi from Milonga</div><div class="sub"><b>${ent(V.subject)}</b> <span>&mdash; ${ent(V.preheader)}</span></div></div></div>${h.slice(h.indexOf('<style>'), h.indexOf('</style>') + 8)}${h.slice(h.indexOf('<table'), h.lastIndexOf('</table>') + 8)}</body></html>`);
  console.log(`wrote ${name}.html/.txt (validator: pass,`, h.length, 'bytes)');
}
