// Package insert cards · 4 x 6 in, printed both sides, one card in every Mate Latte box
//
// One FRONT shared by every cohort (the thank-you), and one BACK per cohort:
//   A  first-time buyer          teach the first cup · ask for the review · introduce the club
//   B  2+ orders, no club        thank them · sell the club (one-time vs club) · ask for the review
//   C  first club order          welcome them · what members get · how to sign in and manage it
// Every back is the same skeleton, so the three read as one set: title with a code top right,
// a feature row, ONE gold panel holding that cohort's main job with a code on its left, a quiet
// closing block with a code on its right, and the help line.
//
// The type system is the post-purchase emails' (serif two-line titles, regular then bold italic;
// Gotham for everything else), so the card and the email that lands the same week read as one.
//
// Print spec, same as the reference files: trim 4 x 6 in, 0.125 in bleed on every side, so each
// PDF page is 4.25 x 6.25 in (306 x 450 pt) with NO crop marks. Everything that must survive the
// cut sits 0.25 in inside the trim. All measurements below are points (72 pt = 1 in).
//
// Writes, in exports/print/inserts/:
//   insert-front.pdf · insert-card-<x>-back.pdf   vector masters for the printer (bleed included)
//   insert-card-<x>.pdf                           both sides in one file (page 1 front, page 2 back)
//   png/*.png                                     600 dpi flattened fallbacks + trimmed proofs
//   proof-card-<x>.jpg                            both sides side by side, trim and safe lines drawn
//   proof-set.jpg                                 every back side by side, as cut
// and refine/insert-front.html, refine/insert-card-<x>.html (open in a browser to edit by eye).
//
// Usage: node scripts/make-insert-assets.mjs && node scripts/make-insert-cards.mjs
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import jsQR from 'jsqr';

const OUT = 'exports/print/inserts';
fs.mkdirSync(`${OUT}/png`, { recursive: true });

const W = 306, H = 450, BLEED = 9, SAFE = 18; // pt
const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', CREAM = '#F7F4EA', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE';
const SANS = "'Gotham','Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
// Times New Roman where it is installed (a Mac), Liberation Serif here: same metrics, same layout
const SERIF = "'Times New Roman','Liberation Serif',Times,Georgia,serif";

// facts (Shopify, checked 2026-11-10): the product page recipe; the club's selling plans are 30% off
// 30 and 60 servings and 15% off 15, monthly; the review thank-you is the 15% the day-7 email promises
const HELP = 'orders@milongamate.com';
// CARD B PRINTS PRICES, for 30 servings (two 15-serving bags): one-time $69.98, $2.33 a cup; in
// the club at 30% off $48.99, $1.63 a cup. If a price or the club's discount changes, card B is
// wrong on paper: change PRICE and reprint.
const PRICE = { oneBag: '$69.98', clubBag: '$48.99', oneCup: '$2.33', clubCup: '$1.63' };

const FONTS = [['Gotham-Medium.otf', 500], ['Gotham-Bold.otf', 700]]
  .map(([f, w]) => `@font-face{font-family:Gotham;src:url(../public/fonts/${f}) format('opentype');font-weight:${w};font-style:normal}`).join('\n');

const STAR = '<svg viewBox="0 0 20 19" aria-hidden="true"><path d="M10 0l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L10 15.2 3.9 18.6l1.4-6.8L.2 7.1l6.9-.8z"/></svg>';
// perk icons, drawn as strokes so they print as vector at any size
const ICON = {
  percent: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7.5" cy="7.5" r="2.7"/><circle cx="16.5" cy="16.5" r="2.7"/><path d="M18 6L6 18"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z"/></svg>',
  tag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11.6V5a1.5 1.5 0 0 1 1.5-1.5h6.6a1.5 1.5 0 0 1 1.06.44l7.4 7.4a1.5 1.5 0 0 1 0 2.12l-6.6 6.6a1.5 1.5 0 0 1-2.12 0l-7.4-7.4a1.5 1.5 0 0 1-.44-1.06z"/><circle cx="8" cy="8" r="1.3"/></svg>',
};
const TICK = '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="6"/><path d="M3.2 6.2l1.9 1.9 3.7-4" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const BASE = `
@page { size: ${W}pt ${H}pt; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.card { position: relative; width: ${W}pt; height: ${H}pt; overflow: hidden; font-family: ${SANS}; color: ${INK}; }
.serif { font-family: ${SERIF}; font-weight: 400; color: ${FOREST}; }
.serif em { display: block; font-weight: 700; font-style: italic; }
.eyebrow { font-weight: 700; font-size: 6.4pt; line-height: 8pt; letter-spacing: .22em; text-transform: uppercase; color: ${FOREST}; }
img { display: block; }
`;

// ── FRONT · shared ──────────────────────────────────────────────────────────────────────
// Bernat's background (gold satin, two pouches, a latte) with the thank-you in the clear middle it
// was composed around. The ink is forest because that middle is light: measured, the ground
// behind the headline runs from rgb(253,232,189) at the centre to rgb(206,159,104) at the ends of
// the line, 8.3:1 down to 4.2:1 against #004D27 (large type needs 3:1). No offer and no cohort wording, so one print
// run of fronts serves all three cards.
const front = (img) => `<div class="card front">
<img class="bg" src="${img('front-bg.jpg')}" alt="">
<img class="lockup" src="${img('lockup-green.png')}" alt="Milonga">
<div class="thanks serif">Thank you<em>Here&rsquo;s to better mornings.</em></div>
</div>`;
const FRONT_CSS = `
.front { background: ${GOLD}; }
.front .bg { position: absolute; inset: 0; width: ${W}pt; height: ${H}pt; }
.front .lockup { position: absolute; left: 50%; top: 122pt; height: 46pt; width: auto; transform: translateX(-50%); }
.front .thanks { position: absolute; left: 0; right: 0; top: 168pt; text-align: center; font-size: 54pt; line-height: 55pt; letter-spacing: -.012em; }
.front .thanks em { margin-top: 3pt; font-size: 18pt; line-height: 21pt; letter-spacing: 0; }
`;

// ── BACKS · one per cohort ──────────────────────────────────────────────────────────────
// ONE QR code style, used for every code on every card: forest modules on a cream tile inside a
// forest outline, with a verb-first label under it. Same size, same density, same frame on the
// cream page and on the gold panel, so they read as a set and none looks like an afterthought.
const qr = (q, img) => `<div class="qr"><div class="frame"><img src="${img(q.qr)}" data-qr="${q.url}" alt="QR code: ${q.label}"></div><span>${q.label}</span></div>`;
const head = (c, img) => `<div class="head">
<div class="eyebrow">${c.eyebrow}</div>
<h1 class="serif">${c.title[0]}<em>${c.title[1]}</em></h1>
${qr(c.watch, img)}
</div>
<p class="lead">${c.lead}</p>`;
const foot = (c) => `<div class="foot"><span>${c.help || 'Something not right? Write to us first:'} <b>${HELP}</b></span><i>${c.code}</i></div>`;

const CARDS = {
  // ── A · first-time buyer ──
  a: {
    code: 'A',
    eyebrow: 'Thank you for your first order',
    title: ['Your first cup,', 'done right.'],
    lead: 'Three steps, thirty seconds. Or scan to watch it&nbsp;made.',
    steps: [
      ['step-scoop.jpg', 'Scoop', '2.5 tablespoons in your mug or&nbsp;glass.'],
      ['step-pour.jpg', 'Pour', '8oz of hot or cold milk or&nbsp;water.'],
      ['step-froth.jpg', 'Stir or froth', 'Until smooth. Sip it hot or over&nbsp;ice.'],
    ],
    // QR 1, top right, beside the title: as far from the review code as the card allows
    watch: { qr: 'qr-first-cup.svg', url: 'https://milonga.life/first-cup', label: 'Watch the video' },
    // QR 2, the card's one loud block: the review is this cohort's first job
    review: {
      qr: 'qr-review.svg', url: 'https://milonga.life/review', label: 'Write a review', title: ['Leave a review,', 'get 15% off.'],
      text: 'Tell us honestly how it&rsquo;s going and we&rsquo;ll email you 15% off your next order. It means the world to a small&nbsp;brand.',
    },
    // QR 3: the club, introduced and nothing more. No discount code, no price, no deadline (the
    // day-11 email sells it). The code opens the Mate Latte product page (Bernat, 2026-11-10),
    // through the /club redirect so it can be re-aimed like the other two.
    club: {
      qr: 'qr-club.svg', url: 'https://milonga.life/club', label: 'Join the club',
      title: ['Want every bag', 'for less?'],
      text: 'Mate Mornings Club members save up to 30%, with a fresh bag at the door every month. Skip, pause or cancel&nbsp;anytime.',
    },
    html: (c, img) => `${head(c, img)}
<div class="steps">
${c.steps.map(([file, t, d], i) => `<div class="step"><div class="tile"><img src="${img(file)}" alt=""><b>${i + 1}</b></div><h3>${t}</h3><p>${d}</p></div>`).join('\n')}
</div>
<div class="panel">
${qr(c.review, img)}
<div class="copy"><div class="stars">${STAR.repeat(5)}</div><h2 class="serif">${c.review.title[0]}<em>${c.review.title[1]}</em></h2><p>${c.review.text}</p></div>
</div>
<div class="closer">
<div class="copy"><h2 class="serif">${c.club.title[0]} <i>${c.club.title[1]}</i></h2><p>${c.club.text}</p></div>
${qr(c.club, img)}
</div>
${foot(c)}`,
  },

  // ── B · two or more orders, not in the club ──
  // Bernat's brief (2026-11-10): open on feeling, like the reference's second-order card; title
  // the offer "Subscribe for exclusive perks"; show the same two bags at both prices with the old
  // price struck through; "You might be the perfect fit for our subscription program"; add early
  // access to new products and exclusive store discounts to what members get.
  // The urgency is the one true thing about timing: join today and the very next order is the
  // cheaper one. Nothing on the card claims a deadline or a bag running out.
  // The only "30%" is the badge on the 30-serving example it belongs to (15 servings is 15% off),
  // so the card never promises 30% on every size.
  // The review is asked for plainly, with no 15% reward printed: a second discount on this card
  // would compete with the one it is selling. (Judge.me still sends the code to anyone who reviews.)
  b: {
    code: 'B',
    eyebrow: 'From all of us at Milonga',
    title: ['You came back.', 'Thank you.'],
    lead: 'A first order is curiosity. Coming back is trust, and to a small brand like ours, that means the&nbsp;world.',
    watch: { qr: 'qr-video-b.svg', url: 'https://milonga.life/video-b', label: 'Watch the video' },
    art: ['two-bags.png', 'Two Mate Latte pouches, 30 servings'],
    compare: [
      { label: 'One-time', above: 'Full price', price: PRICE.oneBag, line: `30 servings &middot; ${PRICE.oneCup} a cup` },
      { label: 'In the club', above: `<s>${PRICE.oneBag}</s>`, price: PRICE.clubBag, line: `30 servings &middot; ${PRICE.clubCup} a cup`, badge: 'Save 30%' },
    ],
    note: 'You might be the perfect fit for our subscription program. <b>Join today and your very next order costs&nbsp;less.</b>',
    club: {
      qr: 'qr-club-b.svg', url: 'https://milonga.life/club-b', label: 'Join the club',
      title: ['Subscribe for', 'exclusive perks.'],
      // "up to": the club is 30% off 30 or 60 servings and 15% off 15 (Shopify's selling plans), so
      // a flat "30% off every order" would be untrue for anyone who subscribes to the small size
      ticks: ['Save up to 30% on every order', 'Early access to new products', 'Exclusive store discounts', 'Skip, pause or cancel anytime'],
    },
    review: {
      qr: 'qr-review-b.svg', url: 'https://milonga.life/review-b', label: 'Write a review',
      title: ['Got a minute?', 'Leave a review.'],
      text: 'Tell us honestly how it&rsquo;s going. It helps a small brand more than you&rsquo;d&nbsp;think.',
    },
    html: (c, img) => `${head(c, img)}
<div class="compare">
${c.compare.map((x) => `<div class="cell${x.badge ? ' club' : ''}">${x.badge ? `<b class="badge">${x.badge}</b>` : ''}
<img src="${img(c.art[0])}" alt="${c.art[1]}">
<div class="label">${x.label}</div>
<div class="above">${x.above}</div>
<div class="price serif">${x.price}</div>
<div class="line">${x.line}</div>
</div>`).join('\n')}
</div>
<p class="note">${c.note}</p>
<div class="panel perks">
${qr(c.club, img)}
<div class="copy"><h2 class="serif">${c.club.title[0]}<em>${c.club.title[1]}</em></h2><ul class="ticks">${c.club.ticks.map((t) => `<li>${TICK}${t}</li>`).join('')}</ul></div>
</div>
<div class="closer">
<div class="copy"><h2 class="serif">${c.review.title[0]} <i>${c.review.title[1]}</i></h2><p>${c.review.text}</p></div>
${qr(c.review, img)}
</div>
${foot(c)}`,
  },

  // ── C · first club order ──
  // The job is keeping them: a new member cancels when the club feels like a trap or a surprise
  // charge, so the card's loud block is the way OUT of a delivery, not another offer. "Taking a
  // trip? Skip a month." is the line from the club's welcome email; the three numbered lines are
  // the whole sign-in (the portal emails a link, there is no password to forget).
  // The perks are the ones card B sold them on, word for word, so the promise and the welcome match.
  // No prices: they have just paid theirs.
  c: {
    code: 'C',
    eyebrow: 'The Mate Mornings Club',
    title: ['You&rsquo;re in.', 'Welcome.'],
    lead: 'Your first club bag is here, with a fresh one to follow every month. First time making it? Scan to&nbsp;watch.',
    watch: { qr: 'qr-video-c.svg', url: 'https://milonga.life/video-c', label: 'Watch the video' },
    perks: [
      ['percent', 'Member price', 'Up to 30% off every&nbsp;order.'],
      ['star', 'Early access', 'First in line for new&nbsp;products.'],
      ['tag', 'Member deals', 'Exclusive store&nbsp;discounts.'],
    ],
    note: 'Your subscription works around your life. Skip a delivery, pause for a while or cancel, all at <b>milonga.life/my&#8209;club</b>',
    portal: {
      qr: 'qr-my-club.svg', url: 'https://milonga.life/my-club', label: 'Manage my club',
      title: ['Taking a trip?', 'Skip a month.'],
      steps: ['Scan the code', 'Enter your subscription email', 'Tap the sign-in link we send you'],
    },
    review: {
      qr: 'qr-review-c.svg', url: 'https://milonga.life/review-c', label: 'Write a review',
      title: ['Got a minute?', 'Leave a review.'],
      text: 'Tell us honestly how it&rsquo;s going. It helps a small brand more than you&rsquo;d&nbsp;think.',
    },
    help: 'Questions about your club? Write to us:',
    html: (c, img) => `${head(c, img)}
<div class="perkrow">
${c.perks.map(([icon, t, d]) => `<div class="perk"><div class="disc">${ICON[icon]}</div><h3>${t}</h3><p>${d}</p></div>`).join('\n')}
</div>
<p class="note">${c.note}</p>
<div class="panel">
${qr(c.portal, img)}
<div class="copy"><h2 class="serif">${c.portal.title[0]}<em>${c.portal.title[1]}</em></h2><ol class="how">${c.portal.steps.map((t, i) => `<li><b>${i + 1}</b>${t}</li>`).join('')}</ol></div>
</div>
<div class="closer">
<div class="copy"><h2 class="serif">${c.review.title[0]} <i>${c.review.title[1]}</i></h2><p>${c.review.text}</p></div>
${qr(c.review, img)}
</div>
${foot(c)}`,
  },
};

const back = (c, img) => `<div class="card back">
${c.html(c, img)}
</div>`;

const PAD_X = BLEED + 24, PAD_TOP = BLEED + 21, PAD_BOTTOM = BLEED + SAFE;
const GAP = 14, TILE_W = (W - 2 * PAD_X - 2 * GAP) / 3, TILE_H = 52;
// each code prints 0.64 in across: 29 modules at 1.59 pt (0.56 mm) each, with 3 modules of cream
// around it inside the outline
const QR_PT = 46, QR_PAD = 5, QR_BOX = QR_PT + 2 * QR_PAD + 1.6;
const BACK_CSS = `
.back { background: ${CREAM}; padding: ${PAD_TOP}pt ${PAD_X}pt ${PAD_BOTTOM}pt; display: flex; flex-direction: column; }
.back .head { position: relative; padding-right: ${QR_BOX + 12}pt; }
.back h1 { margin: 6pt 0 0; font-size: 26pt; line-height: 26.5pt; letter-spacing: -.01em; }
.back .qr { flex: none; width: ${QR_BOX}pt; }
.back .qr .frame { padding: ${QR_PAD}pt; border: .8pt solid ${FOREST}; border-radius: 5pt; background: ${CREAM}; }
.back .qr img { width: ${QR_PT}pt; height: ${QR_PT}pt; }
.back .qr span { display: block; margin-top: 4pt; font-weight: 700; font-size: 4.8pt; line-height: 6pt; letter-spacing: .07em; text-transform: uppercase; white-space: nowrap; text-align: center; color: ${FOREST}; }
.back .head .qr { position: absolute; right: 0; top: 0; }
.back .lead { margin: 6pt 0 0; font-weight: 500; font-size: 8pt; line-height: 11.5pt; color: ${INK}; }
.back .lead b, .back .note b { font-weight: 700; color: ${FOREST}; }

.back .steps { margin-top: 11pt; display: flex; gap: ${GAP}pt; }
.back .step { width: ${TILE_W}pt; }
.back .tile { position: relative; width: ${TILE_W}pt; height: ${TILE_H}pt; }
.back .tile img { width: 100%; height: 100%; object-fit: cover; border-radius: 7pt; }
.back .tile b { position: absolute; left: -4.4pt; top: -4.4pt; width: 16pt; height: 16pt; border-radius: 50%; background: ${FOREST}; box-shadow: 0 0 0 1.6pt ${CREAM};
  color: ${CREAM}; font-weight: 700; font-size: 7.6pt; line-height: 16pt; text-align: center; }
.back .step h3, .back .perk h3 { margin: 7pt 0 0; font-weight: 700; font-size: 8.2pt; line-height: 10pt; color: ${FOREST}; }
.back .step p, .back .perk p { margin: 2.5pt 0 0; font-weight: 500; font-size: 7.2pt; line-height: 9.8pt; color: ${INK}; }

.back h2 { margin: 0; }
.back .copy p { margin: 4pt 0 0; font-weight: 500; font-size: 7.2pt; line-height: 9.8pt; color: ${INK}; }

/* card C's feature row: what members get, as the emails draw it (a forest disc, a gold glyph) */
.back .perkrow { margin-top: 12pt; display: flex; gap: ${GAP}pt; }
.back .perk { width: ${TILE_W}pt; }
.back .perk .disc { width: 24pt; height: 24pt; border-radius: 50%; background: ${FOREST}; display: flex; align-items: center; justify-content: center; }
.back .perk svg { width: 13pt; height: 13pt; fill: none; stroke: ${GOLD}; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.back .perk h3 { margin-top: 6pt; }
.back .perkrow + .note { margin-top: 10pt; }

/* card B's feature row: the same two bags at two prices. Theirs is an outline in grey, ours is
   filled gold with the old price struck through, so the colour makes the argument first */
.back .compare { margin-top: 10pt; display: flex; gap: 8pt; }
.back .cell { position: relative; flex: 1; padding: 6.5pt 9pt 6pt; border-radius: 8pt; border: .8pt solid ${LINE}; }
.back .cell.club { border-color: ${GOLD}; background: ${GOLD}; }
.back .cell img { position: absolute; right: 8pt; top: 8.5pt; height: 27pt; width: auto; }
.back .cell .label { font-weight: 700; font-size: 5.6pt; line-height: 7pt; letter-spacing: .16em; text-transform: uppercase; color: ${FOREST}; }
.back .cell .above { margin-top: 2pt; font-weight: 500; font-size: 7pt; line-height: 9pt; color: ${INK}; }
.back .cell .above s { font-family: ${SERIF}; font-weight: 400; font-size: 10.5pt; text-decoration: line-through; text-decoration-thickness: .7pt; color: ${DEEP}; }
.back .cell .price { margin-top: 1pt; font-weight: 700; font-size: 21pt; line-height: 21pt; letter-spacing: -.01em; }
.back .cell .line { margin-top: 2pt; font-weight: 500; font-size: 7pt; line-height: 9pt; color: ${INK}; white-space: nowrap; }
.back .cell:not(.club) .label, .back .cell:not(.club) .above, .back .cell:not(.club) .price, .back .cell:not(.club) .line { color: ${SOFT}; }
.back .badge { position: absolute; right: 8pt; top: -6.5pt; padding: 3.2pt 7pt 2.8pt; border-radius: 99pt; background: ${FOREST}; color: ${CREAM}; font-weight: 700; font-size: 5.6pt; line-height: 7pt; letter-spacing: .12em; text-transform: uppercase; white-space: nowrap; }
.back .note { margin: 4pt 0 0; font-weight: 500; font-size: 7.2pt; line-height: 9.8pt; color: ${INK}; }

/* the gold panel: the one loud block on each card, whatever that cohort's main job is */
.back .panel { margin-top: 10pt; padding: 8pt 11pt 8pt 10pt; border-radius: 9pt; background: ${GOLD}; display: flex; align-items: center; gap: 12pt; }
.back .stars { display: flex; gap: 1.6pt; margin-bottom: 4.5pt; }
.back .stars svg { width: 7.8pt; height: 7.4pt; fill: ${FOREST}; }
.back .panel h2 { font-size: 16.5pt; line-height: 17pt; }
.back .panel.perks h2 { font-size: 15pt; line-height: 15.5pt; }
.back .panel .copy p { color: ${DEEP}; }
.back .how { margin: 5pt 0 0; padding: 0; list-style: none; }
.back .how li { display: flex; align-items: center; gap: 4.5pt; font-weight: 500; font-size: 7.2pt; line-height: 10.4pt; color: ${DEEP}; white-space: nowrap; }
.back .how b { flex: none; width: 8.4pt; height: 8.4pt; border-radius: 50%; background: ${FOREST}; color: ${GOLD}; font-weight: 700; font-size: 5.4pt; line-height: 8.4pt; text-align: center; }
.back .ticks { margin: 4pt 0 0; padding: 0; list-style: none; }
.back .ticks li { display: flex; align-items: center; gap: 4.5pt; font-weight: 500; font-size: 7.2pt; line-height: 9.7pt; color: ${DEEP}; white-space: nowrap; }
.back .ticks svg { flex: none; width: 7pt; height: 7pt; fill: ${FOREST}; stroke: ${GOLD}; }

/* the closing block: the quiet ask, pinned above the help line */
.back .closer { margin-top: auto; padding-top: 8pt; display: flex; align-items: center; justify-content: space-between; gap: 14pt; }
.back .closer h2 { font-size: 13.5pt; line-height: 15pt; }
.back .closer h2 i { font-weight: 700; font-style: italic; }

.back .foot { margin-top: 7pt; padding-top: 5pt; border-top: .6pt solid ${LINE}; display: flex; justify-content: space-between; align-items: baseline; font-weight: 500; font-size: 6.2pt; line-height: 8pt; color: ${SOFT}; }
.back .foot b { font-weight: 700; color: ${FOREST}; }
.back .foot i { font-style: normal; font-weight: 700; font-size: 5pt; letter-spacing: .1em; color: ${SOFT}; opacity: .55; }
`;

// trim and safe lines, drawn only on the proof
const GUIDES = `<div style="position:absolute;inset:${BLEED}pt;border:.5pt solid #E0115F;pointer-events:none"></div>
<div style="position:absolute;inset:${BLEED + SAFE}pt;border:.5pt dashed #1E90FF;pointer-events:none"></div>`;

const doc = (title, css, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<!-- GENERATED by scripts/make-insert-cards.mjs. Edit the script, not this file. -->
<style>${FONTS}${BASE}${css}</style></head>
<body>${body}</body></html>
`;

// pages: [file name, title, css, html]
const local = (f) => ({
  'lockup-green.png': '../public/logo/lockup-milonga-green.png',
})[f] || `../${OUT}/img/${f}`;
const PAGES = [['insert-front', 'Insert card · front (all cohorts)', FRONT_CSS, front(local)]];
for (const [k, c] of Object.entries(CARDS)) PAGES.push([`insert-card-${k}`, `Insert card ${c.code} · back`, BACK_CSS, back(c, local)]);
for (const [name, title, css, html] of PAGES) fs.writeFileSync(`refine/${name}.html`, doc(title, css, html));

// ── render ──────────────────────────────────────────────────────────────────────────────
// CHROME=/path/to/chrome when the Playwright in node_modules has no browser of its own
const CHROME = process.env.CHROME || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const PX_W = W * 96 / 72, PX_H = H * 96 / 72; // 408 x 600 CSS px
const url = (name) => `file://${path.resolve(`refine/${name}.html`)}`;

async function render(name, pdfName) {
  // vector PDF, page = bleed size
  const page = await browser.newPage({ viewport: { width: PX_W, height: PX_H } });
  await page.goto(url(name));
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => {
    const card = document.querySelector('.card');
    const out = [];
    const box = card.getBoundingClientRect();
    for (const el of card.querySelectorAll('.back > *')) {
      const r = el.getBoundingClientRect();
      if (r.bottom > box.bottom - (27 * 96 / 72) + 0.5) out.push(`${el.className || el.tagName}: ends ${((r.bottom - box.top) * 72 / 96).toFixed(1)}pt`);
    }
    return out;
  });
  if (overflow.length) console.log(`  ! ${name}: past the safe line ->`, overflow.join(' | '));
  await page.pdf({ path: `${OUT}/${pdfName}.pdf`, width: `${W / 72}in`, height: `${H / 72}in`, printBackground: true, pageRanges: '1' });
  await page.close();

  // 600 dpi flattened fallback (with bleed)
  const hi = await browser.newPage({ viewport: { width: PX_W, height: PX_H }, deviceScaleFactor: 6.25 });
  await hi.goto(url(name));
  await hi.evaluate(() => document.fonts.ready);
  const full = await hi.screenshot({ type: 'png' });
  const codes = await hi.evaluate(() => [...document.querySelectorAll('img[data-qr]')].map((el) => {
    const r = el.getBoundingClientRect();
    return { url: el.dataset.qr, x: r.x, y: r.y, w: r.width, h: r.height };
  }));
  await hi.close();
  // A printed code can't be fixed after the run, so each one is read back from the 600 dpi render
  // (and again shrunk to 150 dpi, a phone held well back) and must give the URL it was drawn for.
  for (const q of codes) {
    const k = 6.25, m = q.w * 0.12;
    const region = { left: Math.round((q.x - m) * k), top: Math.round((q.y - m) * k), width: Math.round((q.w + 2 * m) * k), height: Math.round((q.h + 2 * m) * k) };
    for (const dpi of [600, 150]) {
      const { data, info } = await sharp(full).extract(region).resize(Math.round(region.width * dpi / 600)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const got = jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data;
      if (got !== q.url) { console.error(`QR CHECK FAILED on ${name} at ${dpi} dpi: wanted ${q.url}, read ${got ?? 'nothing'}`); process.exit(1); }
    }
    console.log(`  QR ok: ${q.url} (${(q.w * 72 / 96 / 72).toFixed(2)} in)`);
  }
  await sharp(full).withMetadata({ density: 600 }).png({ compressionLevel: 9 }).toFile(`${OUT}/png/${pdfName}-600dpi-bleed.png`);
  // trimmed proof at 300 dpi: what the card looks like after the cut (1200 x 1800)
  const b = Math.round(BLEED / 72 * 600);
  const meta = await sharp(full).metadata();
  await sharp(full).extract({ left: b, top: b, width: meta.width - 2 * b, height: meta.height - 2 * b }).resize(1200, 1800).withMetadata({ density: 300 }).png({ compressionLevel: 9 }).toFile(`${OUT}/png/${pdfName}-trimmed.png`);

  // the same page with the trim (pink) and safe (blue) lines, for the proof sheet
  const g = await browser.newPage({ viewport: { width: PX_W, height: PX_H }, deviceScaleFactor: 3 });
  await g.goto(url(name));
  await g.evaluate(() => document.fonts.ready);
  await g.evaluate((guides) => document.querySelector('.card').insertAdjacentHTML('beforeend', guides), GUIDES);
  const guided = await g.screenshot({ type: 'png' });
  await g.close();
  console.log('wrote', `${OUT}/${pdfName}.pdf`, '+ png');
  return guided;
}

const frontGuided = await render('insert-front', 'insert-front');
for (const [k, c] of Object.entries(CARDS)) {
  const backGuided = await render(`insert-card-${k}`, `insert-card-${k}-back`);

  // both sides in one PDF (page 1 front, page 2 back), which is how most printers want it
  const both = await browser.newPage();
  const [, , fcss, fhtml] = PAGES[0];
  const [, , bcss, bhtml] = PAGES.find(([n]) => n === `insert-card-${k}`);
  const tmp = `refine/.insert-card-${k}-both.html`;
  fs.writeFileSync(tmp, doc(`Insert card ${c.code}`, `${fcss}${bcss}.card{break-after:page}`, fhtml + bhtml));
  await both.goto(`file://${path.resolve(tmp)}`);
  await both.evaluate(() => document.fonts.ready);
  await both.pdf({ path: `${OUT}/insert-card-${k}.pdf`, width: `${W / 72}in`, height: `${H / 72}in`, printBackground: true });
  await both.close();
  fs.rmSync(tmp);
  console.log('wrote', `${OUT}/insert-card-${k}.pdf`, '(front + back)');

  // proof sheet: front and back side by side with the guides
  const m = await sharp(frontGuided).metadata();
  const pad = 60;
  await sharp({ create: { width: m.width * 2 + pad * 3, height: m.height + pad * 2, channels: 3, background: '#DAD7CC' } })
    .composite([{ input: frontGuided, left: pad, top: pad }, { input: backGuided, left: m.width + pad * 2, top: pad }])
    .jpeg({ quality: 92 }).toFile(`${OUT}/proof-card-${k}.jpg`);
  console.log('wrote', `${OUT}/proof-card-${k}.jpg`);
}
await browser.close();

// the three backs side by side, as they are after the cut: the quickest way to see them as a set
{
  const keys = Object.keys(CARDS), w = 600, h = 900, pad = 28;
  const tiles = await Promise.all(keys.map((k) => sharp(`${OUT}/png/insert-card-${k}-back-trimmed.png`).resize(w, h).toBuffer()));
  await sharp({ create: { width: keys.length * (w + pad) + pad, height: h + 2 * pad, channels: 3, background: '#DAD7CC' } })
    .composite(tiles.map((input, i) => ({ input, left: pad + i * (w + pad), top: pad })))
    .jpeg({ quality: 90 }).toFile(`${OUT}/proof-set.jpg`);
  console.log('wrote', `${OUT}/proof-set.jpg`);
}
