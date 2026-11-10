// Package insert cards · 4 x 6 in, printed both sides, one card in every Mate Latte box
//
// One FRONT shared by every cohort (the thank-you), and one BACK per cohort:
//   A  first-time buyer          teach the first cup · ask for the review · introduce the club
//   B  2+ orders, no club        (next)
//   C  first club order          (next)
//
// The type system is the post-purchase emails' (serif two-line titles, regular then bold italic;
// Gotham for everything else), so the card and the email that lands the same week read as one.
//
// Print spec, same as the reference files: trim 4 x 6 in, 0.125 in bleed on every side, so each
// PDF page is 4.25 x 6.25 in (306 x 450 pt) with NO crop marks. Everything that must survive the
// cut sits 0.25 in inside the trim. All measurements below are points (72 pt = 1 in).
//
// Writes, in exports/print/inserts/:
//   insert-front.pdf · insert-card-a-back.pdf     vector masters for the printer (bleed included)
//   insert-card-a.pdf                             both sides in one file (page 1 front, page 2 back)
//   png/*.png                                     600 dpi flattened fallbacks + trimmed proofs
//   proof-card-a.jpg                              both sides side by side, trim and safe lines drawn
// and refine/insert-front.html, refine/insert-card-a.html (open in a browser to edit by eye).
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
const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', GOLD_SOFT = '#EFD9A0', CREAM = '#F7F4EA', INK = '#12331F', SOFT = '#3B5344', LINE = '#D9D6BE';
const SANS = "'Gotham','Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
// Times New Roman where it is installed (a Mac), Liberation Serif here: same metrics, same layout
const SERIF = "'Times New Roman','Liberation Serif',Times,Georgia,serif";

// facts (Shopify, checked 2026-11-10): the product page recipe; the club's selling plans are 30% off
// 30 and 60 servings and 15% off 15; the review thank-you is the 15% the day-7 email promises
const HELP = 'orders@milongamate.com';

const FONTS = [['Gotham-Medium.otf', 500], ['Gotham-Bold.otf', 700]]
  .map(([f, w]) => `@font-face{font-family:Gotham;src:url(../public/fonts/${f}) format('opentype');font-weight:${w};font-style:normal}`).join('\n');

const STAR = '<svg viewBox="0 0 20 19" aria-hidden="true"><path d="M10 0l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L10 15.2 3.9 18.6l1.4-6.8L.2 7.1l6.9-.8z"/></svg>';
const PLAY = '<svg viewBox="0 0 8 9" aria-hidden="true"><path d="M0 0l8 4.5L0 9z"/></svg>';
const ARROW = '<svg viewBox="0 0 26 10" aria-hidden="true"><path d="M0 4.2h21.4L18.3 1.1 19.4 0l5 5-5 5-1.1-1.1 3.1-3.1H0z"/></svg>';

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
// The pouch, as a card: its gold above, its forest below. The light behind the trees is the
// morning the product is for. No offer and no cohort wording, so one print run serves all three.
const CANOPY_H = W * 730 / 1080; // the band keeps its own aspect
const CANOPY_TOP = 205;
const front = (img) => `<div class="card front">
<div class="sky"></div>
<img class="canopy" src="${img('canopy.png')}" alt="">
<div class="ground"></div>
<img class="lockup" src="${img('lockup-green.png')}" alt="Milonga">
<div class="thanks serif">Thank you<em>Here&rsquo;s to better mornings.</em></div>
<div class="flip">Turn me over ${ARROW}</div>
</div>`;
const FRONT_CSS = `
.front { background: ${GOLD}; }
.front .sky { position: absolute; inset: 0; background:
  radial-gradient(circle at 50% ${CANOPY_TOP + 44}pt, rgba(253,244,214,.96) 0, rgba(246,228,178,.72) 74pt, rgba(227,188,98,0) 196pt), ${GOLD}; }
.front .canopy { position: absolute; left: 0; top: ${CANOPY_TOP}pt; width: ${W}pt; height: ${CANOPY_H}pt; }
.front .ground { position: absolute; left: 0; right: 0; top: ${CANOPY_TOP + CANOPY_H - 2}pt; bottom: 0; background: ${FOREST}; }
.front .lockup { position: absolute; left: 50%; top: 31pt; height: 62pt; width: auto; transform: translateX(-50%); }
.front .thanks { position: absolute; left: 0; right: 0; top: 105pt; text-align: center; font-size: 56pt; line-height: 57pt; letter-spacing: -.012em; }
.front .thanks em { margin-top: 4pt; font-size: 18.5pt; line-height: 22pt; letter-spacing: 0; }
.front .flip { position: absolute; left: 0; right: 0; bottom: ${BLEED + SAFE + 1}pt; text-align: center; font-weight: 700; font-size: 6.4pt; line-height: 8pt; letter-spacing: .24em; text-transform: uppercase; color: ${GOLD}; }
.front .flip svg { display: inline-block; width: 15pt; height: 5.8pt; margin-left: 4pt; vertical-align: -.2pt; fill: ${GOLD}; }
`;

// ── BACKS · one per cohort ──────────────────────────────────────────────────────────────
const CARDS = {
  a: {
    code: 'A',
    eyebrow: 'Thank you for your first order',
    title: ['Your first cup,', 'done right.'],
    lead: 'Three steps, thirty seconds. Or scan to watch it&nbsp;made.',
    steps: [
      ['step-scoop.jpg', 'Scoop', '2.5 tablespoons into your mug or&nbsp;glass.'],
      ['step-pour.jpg', 'Pour', '8oz of hot or cold milk or&nbsp;water.'],
      ['step-froth.jpg', 'Stir or froth', 'Until smooth. Sip it hot or over&nbsp;ice.'],
    ],
    // QR 1, top right, beside the title: as far from the review code as the card allows
    watch: { qr: 'qr-first-cup.svg', url: 'milonga.life/first-cup', label: 'Watch the video' },
    // QR 2, the card's one loud block: the review is this cohort's first job
    review: {
      qr: 'qr-review.svg', url: 'milonga.life/review', title: ['Leave a review,', 'get 15% off.'],
      text: 'Tell us honestly how it&rsquo;s going and we&rsquo;ll email you 15% off your next order. It means the world to a small&nbsp;brand.',
    },
    // the club, introduced and nothing more: no code, no price, no deadline (the day-11 email sells it)
    club: {
      title: ['Want every bag', 'for less?'],
      text: 'Mate Mornings Club members save up to 30%, with a fresh bag at the door every month. Skip, pause or cancel&nbsp;anytime.',
      url: 'milonga.life/club',
    },
  },
};

const back = (c, img) => `<div class="card back">
<div class="head">
<div class="eyebrow">${c.eyebrow}</div>
<h1 class="serif">${c.title[0]}<em>${c.title[1]}</em></h1>
<div class="scan"><img src="${img(c.watch.qr)}" alt="QR code: ${c.watch.url}"><span>${PLAY}${c.watch.label}</span></div>
</div>
<p class="lead">${c.lead}</p>
<div class="steps">
${c.steps.map(([file, t, d], i) => `<div class="step"><div class="tile"><img src="${img(file)}" alt=""><b>${i + 1}</b></div><h3>${t}</h3><p>${d}</p></div>`).join('\n')}
</div>
<div class="review">
<div class="qrcol"><div class="qrbox"><img src="${img(c.review.qr)}" alt="QR code: ${c.review.url}"></div><span class="url">${c.review.url}</span></div>
<div class="copy"><div class="stars">${STAR.repeat(5)}</div><h2 class="serif">${c.review.title[0]}<em>${c.review.title[1]}</em></h2><p>${c.review.text}</p></div>
</div>
<div class="club">
<div class="copy"><h2 class="serif">${c.club.title[0]} <i>${c.club.title[1]}</i></h2><p>${c.club.text} <b>${c.club.url}</b></p></div>
<img class="mark" src="${img('mark-green.png')}" alt="Milonga">
</div>
<div class="foot"><span>Something not right? Write to us first: <b>${HELP}</b></span><i>${c.code}</i></div>
</div>`;

const PAD_X = BLEED + 24, PAD_TOP = BLEED + 21, PAD_BOTTOM = BLEED + SAFE;
const GAP = 8, TILE_W = (W - 2 * PAD_X - 2 * GAP) / 3, TILE_H = 60;
const QR_PT = 52; // 0.72 in; 29 modules -> 1.79 pt (0.63 mm) a module
const BACK_CSS = `
.back { background: ${CREAM}; padding: ${PAD_TOP}pt ${PAD_X}pt ${PAD_BOTTOM}pt; display: flex; flex-direction: column; }
.back .head { position: relative; padding-right: ${QR_PT + 12}pt; }
.back h1 { margin: 6pt 0 0; font-size: 26pt; line-height: 26.5pt; letter-spacing: -.01em; }
.back .scan { position: absolute; right: 0; top: 0; width: ${QR_PT}pt; }
.back .scan img { width: ${QR_PT}pt; height: ${QR_PT}pt; }
.back .scan span { position: absolute; right: 0; top: ${QR_PT + 4}pt; font-weight: 700; font-size: 4.9pt; line-height: 6pt; letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; color: ${FOREST}; }
.back .scan svg { display: inline-block; width: 3.6pt; height: 4pt; margin-right: 2.2pt; fill: ${FOREST}; }
.back .lead { margin: 6pt 0 0; font-weight: 500; font-size: 8pt; line-height: 11.5pt; color: ${INK}; }

.back .steps { margin-top: 13pt; display: flex; gap: ${GAP}pt; }
.back .step { width: ${TILE_W}pt; }
.back .tile { position: relative; width: ${TILE_W}pt; height: ${TILE_H}pt; }
.back .tile img { width: 100%; height: 100%; object-fit: cover; border-radius: 7pt; }
.back .tile b { position: absolute; left: -4.4pt; top: -4.4pt; width: 16pt; height: 16pt; border-radius: 50%; background: ${FOREST}; box-shadow: 0 0 0 1.6pt ${CREAM};
  color: ${CREAM}; font-weight: 700; font-size: 7.6pt; line-height: 16pt; text-align: center; }
.back .step h3 { margin: 7pt 0 0; font-weight: 700; font-size: 8.2pt; line-height: 10pt; color: ${FOREST}; }
.back .step p { margin: 2.5pt 0 0; font-weight: 500; font-size: 7.2pt; line-height: 9.8pt; color: ${INK}; }

.back h2 { margin: 0; }
.back .copy p { margin: 4pt 0 0; font-weight: 500; font-size: 7.2pt; line-height: 9.8pt; color: ${INK}; }
.back .url, .back .copy p b { font-weight: 700; color: ${FOREST}; }

.back .review { margin-top: 13pt; padding: 9pt 11pt 9pt 10pt; border-radius: 9pt; background: ${GOLD}; display: flex; align-items: center; gap: 11pt; }
.back .qrcol { flex: none; }
.back .qrbox { padding: 5.5pt; border-radius: 5pt; background: ${CREAM}; }
.back .qrbox img { width: ${QR_PT}pt; height: ${QR_PT}pt; }
.back .qrcol .url { display: block; margin-top: 4pt; font-size: 5.1pt; line-height: 6pt; letter-spacing: .04em; text-align: center; }
.back .stars { display: flex; gap: 1.6pt; margin-bottom: 4.5pt; }
.back .stars svg { width: 7.8pt; height: 7.4pt; fill: ${FOREST}; }
.back .review h2 { font-size: 16.5pt; line-height: 17pt; }
.back .review .copy p { color: ${DEEP}; }

.back .club { margin-top: auto; padding-top: 12pt; display: flex; align-items: center; justify-content: space-between; gap: 14pt; }
.back .club h2 { font-size: 13.5pt; line-height: 15pt; }
.back .club h2 i { font-weight: 700; font-style: italic; }
.back .club .mark { flex: none; height: 33pt; width: auto; }

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
  'mark-green.png': '../public/logo/mark-green.png',
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
  const codes = await hi.evaluate(() => [...document.querySelectorAll('img[alt^="QR code: "]')].map((el) => {
    const r = el.getBoundingClientRect();
    return { url: `https://${el.alt.slice(9)}`, x: r.x, y: r.y, w: r.width, h: r.height };
  }));
  await hi.close();
  // A printed code can't be fixed after the run, so each one is read back from the 600 dpi render
  // (and again shrunk to 100 dpi, a phone held well back) and must give the URL beside it.
  for (const q of codes) {
    const k = 6.25, m = q.w * 0.25;
    const region = { left: Math.round((q.x - m) * k), top: Math.round((q.y - m) * k), width: Math.round((q.w + 2 * m) * k), height: Math.round((q.h + 2 * m) * k) };
    for (const dpi of [600, 100]) {
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
