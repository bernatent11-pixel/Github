// Review request · Mate Latte · first-time buyers (one order, never reviewed) · Email 1 · "So, what do you think?"
//
// A plain letter from Shadi. Klaviyo flow "Review Request - Mate Latte (Never Reviewed)", the
// first-time branch, message "First-time #1". Job: one ask, a review. No selling.
// Sister letter: scripts/make-review-repeat-e1.mjs (repeat buyers). Same link, same reward line.
//
// What the copy is built on (checked 2026-11-10, see the README this script writes):
//   - Short, about 120 words (Bernat, 2026-11-10, on the repeat letter: "Keep the email short",
//     "more emotional"). No "It's Shadi" line, so the From name has to be "Shadi from Milonga".
//   - Written the way Shadi talks (Bernat, 2026-11-10: "more human-like, and how Corbin does the
//     text-written emails" = Corbin from BREZ's plain-text sends). What that means here: open with
//     something about the writer, one thought per paragraph, spoken phrasing, a no-pressure ask.
//     The method is borrowed, not the mannerisms: no "Heyo!", "peeps" or "Much love". The tics are
//     Shadi's own, from the live letters: "Hey ...!", "LOL", "Gracias".
//   - "The drink I wished existed" is Shadi's line from the welcome letter. "I get a little nervous"
//     is a feeling written for Shadi: confirm it is true before this sends.
//   - The angle only a first-time buyer has: a few weeks ago they were the person deciding whether
//     to try it, so their review is what the next person in that spot reads.
//   - Nothing assumes they like it. "So... how is it?" and "the honest version, good or bad" leave
//     the verdict to them, which the 15% needs.
//   - "For a bit now", not "a couple of weeks": the send is 5 days after someone enters the segment,
//     and the segment only needs 12+ days since the last order, so the real gap varies.
//   - No "how it makes you feel" prompt: it invites health claims in reviews.
//   - The 15% is sent by the "Review" flow the moment Judge.me records a review, any rating. So the
//     letter says "as soon as you submit it", never "once it's posted".
//   - The P.S. is about the order (something went wrong), not the opinion. Worded as "if something
//     wasn't right, hit reply" it reads as "send complaints here instead of reviewing".
//
// Writes exports/klaviyo/review-first-e1/review-first-e1.html (full document, for a code template)
// + .txt + README.txt, preview in refine/.
// Usage: node scripts/make-review-first-e1.mjs
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

const NAME = 'review-first-e1';
const OUT = `exports/klaviyo/${NAME}`;
fs.mkdirSync(OUT, { recursive: true });
export const SUBJECT = 'So, what do you think?';
// The 15% leads the preview (Bernat, 2026-11-10: "incentivize the 15% off"), early enough to survive a
// one-line phone preview. "Whatever you think of it" says the reward is for any verdict.
export const PREHEADER = 'I’ll thank you with 15% off your next order, whatever you think of it.';
// Lands ON the reviews block, with "Write a review" in view. The id is judgeme_product_reviews:
// "#judgeme" matches nothing on the page and leaves people at the top, 2,859px above the form on a phone.
// No UTMs here: the flow message has Klaviyo's own tracking parameters switched on.
const REVIEW = 'https://milonga.life/products/the-original-mate-latte?judgeme_review_source=shareable-link#judgeme_product_reviews';

// [kind, text]. Plain text only; ent() makes it HTML.
const LETTER = [
  ['p', 'Hey {{ person.first_name|default:\'there\' }}!'],
  ['p', 'I made the Mate Latte because it’s the drink I wished existed. So when someone tries it for the first time, I get a little nervous LOL.'],
  ['p', 'You’ve had yours for a bit now. So... how is it?'],
  ['p', 'Would you tell me in a quick review? Two lines is plenty, and I want the honest version, good or bad.'],
  ['p', 'We’re a small team, and your review is what the next person reads before giving mate a shot. Not long ago that was you!'],
  ['link', 'Leave a quick review →'],
  ['p', 'To say thanks, I’ll send you 15% off your next order as soon as you submit it.'],
  ['sign', 'Gracias,', 'Shadi'],
  ['ps', 'P.S. Something wrong with your order? Just hit reply. I read every one.'],
];

const ent = (s) => s.replace(/&/g, '&amp;').replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;').replace(/…/g, '&hellip;').replace(/→/g, '&rarr;');
const P = (inner, last) => `<p style="margin:0 0 ${last ? 0 : 18}px;">${inner}</p>`;

function html() {
  const rows = LETTER.map(([k, a, b], i) => {
    if (k === 'link') return P(`<a href="${ent(REVIEW)}" target="_blank" style="color:#004D27;font-weight:bold;text-decoration:underline;">${ent(a)}</a>`);
    if (k === 'sign') return P(`${ent(a)}<br>${ent(b)}`, i === LETTER.length - 1);
    if (k === 'ps') return `<p style="margin:6px 0 0;">${ent(a)}</p>`;
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
  REVIEW REQUEST · MATE LATTE · FIRST-TIME BUYERS, NEVER REVIEWED · EMAIL 1 · "${SUBJECT}"
  Preview text: ${PREHEADER}
  From: Shadi from Milonga · reply-to: an inbox Shadi or the team reads (the P.S. asks for replies)
  A plain letter: no images, one link (the review). Full document for a Klaviyo code template. GENERATED by scripts/make-${NAME}.mjs.
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
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
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
  LETTER.forEach(([k, a, b]) => {
    if (k === 'link') out.push(`${a.replace(/\s*→$/, '')}: ${REVIEW}`, '');
    else if (k === 'sign') out.push(a, b, '');
    else out.push(a, '');
  });
  return out.join('\n');
}

const README = `REVIEW REQUEST · MATE LATTE · FIRST-TIME BUYERS, NEVER REVIEWED · EMAIL 1 · "${SUBJECT}"
=========================================================================================

Files (generated by scripts/make-${NAME}.mjs; validator: pass)
  ${NAME}.html   full document: paste into the Klaviyo code template, replacing everything
  ${NAME}.txt    the same letter as plain text (for the template's text version)

WHERE IT GOES IN KLAVIYO
  Flow "Review Request - Mate Latte (Never Reviewed)" (draft) -> the first-time branch (everyone who
  is not a repeat buyer) -> message "First-time #1 - Quick favor" (template "Mate Latte Review -
  First-time #1"). Replace the template's HTML and text.
  The template has its own hidden preview-text line at the top of the HTML; this file has none.
  Set the preview text on the flow message instead.

SUBJECT + PREVIEW
  ${SUBJECT} — ${PREHEADER}
  From name: Shadi from Milonga. REQUIRED: the message is set to "Milonga Yerba Mate", and the letter
    has no "It's Shadi" line, so without this nobody knows who is writing until the sign-off.
  Reply-to: an inbox someone reads. The P.S. asks for replies; the message has no reply-to set, so
    they go to the from address.

JOB
  One ask: a review, about 120 words. No selling, no club pitch.
  Written the way Shadi talks, after Corbin from BREZ's plain-text emails: it opens with something
  about the writer, keeps one thought per paragraph, and asks without pressure. The phrases are
  Shadi's own from the live letters ("LOL", "Hey ...!", "Gracias"), not BREZ's.
  The angle is the one only a first-time buyer has: not long ago they were the person deciding
  whether to try it, so their review is what the next person in that spot reads.
  The 15% is in the preview text and the last line, as a thank-you. Keep it out of the subject:
  the earlier review emails put it there ("Quick Review -> 15% Off Inside") and it is the loudest
  thing these people have already been sent.

LINK (one)
  ${REVIEW}
  Ends in #judgeme_product_reviews so it lands on the reviews block with "Write a review" in view.
  The template had "#judgeme", which matches nothing on the page: on a phone it left people at the
  top of the product page, 2,859px above the review form (checked in a browser, 2026-11-10).
  No UTMs in the link: the flow message adds Klaviyo's tracking parameters itself.

REVIEW REWARD (15% off the next order)
  Sent by the live "Review" flow when Judge.me records a review, whatever the rating. So the letter
  says "as soon as you submit it". Do not change it back to "once it's posted": new reviews are held
  before they publish, and a reward tied to publishing reads as "only if we approve it".
  Keep the reward for any honest review. Paying only for positive ones breaks the FTC's review rule.

FACTS USED (checked in Klaviyo, 2026-11-10)
  "The drink I wished existed": Shadi's own line, from the welcome letter.
  "I get a little nervous": a feeling written for Shadi. CONFIRM IT IS TRUE before this sends, or cut it.
  "For a bit now": the email goes 5 days after someone enters the segment, and the segment needs
    12+ days since the last Mate Latte order. That is about 17 days after a new order, but longer
    for anyone already in the segment, so the letter does not say "a couple of weeks".
  "Not long ago that was you": true of every first-time buyer; it says "the next person", not
    "the next coffee drinker", because not every buyer was one.
  The P.S. is about the order, on purpose. "If something wasn't right, hit reply" reads as "send
    complaints here instead of reviewing", next to a line that says good or bad is welcome.
  No "how it makes you feel" prompt: it invites health claims in reviews.

BEFORE THE FLOW GOES LIVE
  Stop the pile-up. By the time this arrives a first-time buyer has already had three review asks:
  post-purchase E2 on day 7, and two from the live "Review Request" flow (Delivered Shipment -> day 4
  -> day 7, Smart Sending off). This flow adds two more. Filter Mate Latte out of "Review Request",
  or switch it off.
`;

const h = html(), problems = validate(h).filter((p) => p.rule !== 'fragment-only');
if (problems.length) { console.error(problems); process.exit(1); }
fs.writeFileSync(`${OUT}/${NAME}.html`, h);
fs.writeFileSync(`${OUT}/${NAME}.txt`, text());
fs.writeFileSync(`${OUT}/README.txt`, README);
fs.writeFileSync(`refine/${NAME}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#2B3A31;padding:28px 0 60px}.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Helvetica,Arial,sans-serif}.lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}.row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}.av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}.from{font-weight:700;font-size:13px;color:#12331F}.sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sub span{color:#6b6b6b}</style></head><body><div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">S</div><div class="from">Shadi from Milonga</div><div class="sub"><b>${ent(SUBJECT)}</b> <span>&mdash; ${ent(PREHEADER)}</span></div></div></div>${h.slice(h.indexOf('<style>'), h.indexOf('</style>') + 8)}${h.slice(h.indexOf('<table'), h.lastIndexOf('</table>') + 8)}</body></html>`);
console.log(`wrote ${NAME}.html/.txt + README (validator: pass)`);
