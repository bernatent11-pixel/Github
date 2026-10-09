// Generate the live-text Klaviyo block for the reviews act.
//
//   node scripts/make-reviews-html.mjs [campaign]   (default: coffee-vs-mate)
//
// Reads the campaign's reviews file — the same array the React design
// renders — so the shipped HTML and the design can never drift. Edit a quote
// in one place and re-run this. Each campaign's copy, colours and button live
// in CAMPAIGNS below.
//
// Why the reviews act is not part of the image export: a testimonial section
// exported as one PNG has nothing to select, nothing to click and nothing to
// read when images are blocked. Milonga's previous image-only testimonial
// block took roughly a third of the clicks of the campaigns around it.
import { readFileSync, writeFileSync } from 'node:fs';

const CAMPAIGNS = {
  // "Meet Your Coffee's Competition" — act 2 on cream.
  'coffee-vs-mate': {
    src: 'emails/coffee-vs-mate-reviews.js', key: 'COFFEE_VS_MATE_REVIEWS',
    out: 'exports/coffee-vs-mate-reviews.html',
    label: 'ACT 2 — "Don\'t take it from us"', placement: 'directly under the ACT 1 image',
    page: '#F0EFDF', title: '#004D27', eyebrow: '#004D27', body: '#1A1A1A',
    btnBg: '#004D27', btnInk: '#F0EFDF',
    pull: null,
    line1: 'Don&rsquo;t take it from us.', line2: 'Take it from them.',
    kicker: 'Every review so far is five stars.', kickerFirst: false,
    para: 'Real reviews from real customers, straight from our product page.',
    pills: null, cta: 'Get my better morning',
  },
  // "They Said It Better Than We Could" — the review stack under the
  // opener, on beige, cards gold. The FIRST card rises into the opener's
  // photograph, which a live block cannot do, so it ships inside image 1;
  // this block starts at the second card (skip: 1).
  'reviews-showcase': {
    src: 'emails/mate-latte-reviews.js', key: 'MATE_LATTE_REVIEWS',
    out: 'exports/reviews-showcase-reviews.html',
    label: 'SECTION 2 — review cards 2–4', placement: 'directly under the section 1 image',
    page: '#F0EFDF', title: '#004D27', eyebrow: '#004D27', body: '#1A1A1A',
    btnBg: '#004D27', btnInk: '#F0EFDF', topCta: null,
    stack: true, cell: '#E3BC62', skip: 1, firstGap: 9, ctaGap: 36, padBottom: 56,
    pull: null, line1: null, line2: null, kicker: null, kickerFirst: false, para: null,
    pills: null,
    cta: 'See all reviews',
    ctaNote: 'Replace BOTH href="#" values on the See all reviews button with the reviews page URL.',
  },
};
const C = CAMPAIGNS[process.argv[2] ?? 'coffee-vs-mate'];
if (!C) throw new Error(`unknown campaign; one of: ${Object.keys(CAMPAIGNS).join(', ')}`);
const SRC = C.src;
const OUT = C.out;

const sandbox = { window: {} };
new Function('window', readFileSync(SRC, 'utf8'))(sandbox.window);
const reviews = sandbox.window[C.key].slice(C.skip ?? 0);
if (!Array.isArray(reviews) || !reviews.length) throw new Error(`no reviews in ${SRC}`);

// Curly quotes and dashes are written as entities: a stray encoding header on a
// Klaviyo block turns them into mojibake, and entities survive that.
const esc = (t) =>
  t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/’/g, '&rsquo;')
    .replace(/‘/g, '&lsquo;')
    .replace(/“/g, '&ldquo;')
    .replace(/”/g, '&rdquo;')
    .replace(/…/g, '&hellip;')
    .replace(/—/g, '&mdash;')
    .replace(/–/g, '&ndash;');

const INK = '#004D27';
const GOLD = '#E3BC62';
const PAGE = C.page;
const NAME_INK = '#2A6244';

const card = (r) => `
                  <div style="font-size:14px;line-height:1;letter-spacing:3px;color:${INK};">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div style="padding-top:11px;font-size:12.5px;line-height:1.25;font-weight:900;color:${INK};">${esc(r.title ?? '')}</div>
                  <div style="padding-top:7px;font-size:12.5px;line-height:1.45;font-style:italic;font-weight:500;color:${INK};">${esc(r.quote)}</div>
                  <div style="padding-top:13px;font-size:10.5px;line-height:1.2;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;color:${NAME_INK};">${esc(r.name)}</div>`;

const CELL_BG = C.cell ?? GOLD;
const CELL = C.stack
  ? `valign="top" align="center" bgcolor="${CELL_BG}" style="background-color:${CELL_BG};border-radius:28px;padding:30px 28px 28px 28px;text-align:center;"`
  : `valign="top" bgcolor="${CELL_BG}" style="background-color:${CELL_BG};border-radius:16px;padding:18px;"`;

// The last two words of a headline are joined by a non-breaking space, so a
// long one can never strand its final word on a line of its own — email
// clients ignore text-wrap: balance.
// The stacked card leads with the customer's headline, large, then the name,
// the stars and the quote — the order of the BREZ card it follows.
const stackCard = (r) => `
                  <div style="font-size:24px;line-height:1.1;font-weight:900;letter-spacing:0.01em;text-transform:uppercase;color:${INK};">${esc((r.title ?? '').replace(/\s+!/, '!')).replace(/ (\S+)$/, '&nbsp;$1')}</div>
                  <div style="padding-top:8px;font-size:11.5px;line-height:1.2;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:${C.cell === GOLD ? INK : '#3B5344'};">${esc(r.name)}</div>
                  <div style="padding-top:12px;font-size:16px;line-height:1;letter-spacing:4px;color:${INK};">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div style="padding-top:14px;font-size:15.5px;line-height:1.55;font-style:italic;font-weight:500;color:${C.cell === GOLD ? INK : '#12331F'};">${esc(r.quote)}</div>`;

// Two cards to a row. The pair's cells stretch to the taller of them for free —
// no hard-coded height to go stale when a quote is edited. A lone card on the
// last row spans the full width rather than leaving a hole beside it.
const rows = [];
const PER_ROW = C.stack ? 1 : 2;
for (let i = 0; i < reviews.length; i += PER_ROW) rows.push(reviews.slice(i, i + PER_ROW));

const grid = rows
  .map((row, i) => {
    const gap = i === 0 ? '' : `
              <tr><td colspan="3" class="mg-rowgap" style="height:${C.stack ? 18 : 14}px;line-height:${C.stack ? 18 : 14}px;font-size:0;">&nbsp;</td></tr>
`;
    const body =
      row.length === 2
        ? `                <td class="mg-card" width="48%" ${CELL}>${card(row[0])}
                </td>
                <td class="mg-gap" width="4%" style="font-size:0;line-height:0;">&nbsp;</td>
                <td class="mg-card mg-card-b" width="48%" ${CELL}>${card(row[1])}
                </td>`
        : `                <td colspan="3" ${CELL}>${(C.stack ? stackCard : card)(row[0])}
                </td>`;
    return `${gap}              <tr>
${body}
              </tr>`;
  })
  .join('\n');

const kicker = `        <tr>
          <td align="center" style="padding:${C.kickerFirst ? '0' : '14px'} 0 ${C.kickerFirst ? '14px' : '0'} 0;font-size:11.5px;line-height:1.4;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;color:${C.eyebrow};">
            ${C.kicker}
          </td>
        </tr>`;
const pull = C.pull ? `        <tr>
          <td align="center" style="padding:44px 0 0 0;">
            <div style="font-size:15px;line-height:1;letter-spacing:4px;color:${GOLD};">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <div style="padding-top:14px;font-size:27px;line-height:1.35;font-style:italic;font-weight:500;color:${C.title};">${C.pull.quote}</div>
            <div style="padding-top:14px;font-size:11px;line-height:1.2;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:${GOLD};">${C.pull.by}</div>
          </td>
        </tr>
` : '';
const topCta = C.topCta ? `        <tr>
          <td align="center" style="padding:6px 0 40px 0;">
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
              href="#" style="height:50px;v-text-anchor:middle;width:260px;" arcsize="50%" stroke="f" fillcolor="${C.topCta.bg}">
              <w:anchorlock/>
              <center style="color:${C.topCta.ink};font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:13.5px;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;">${C.topCta.label}</center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-- -->
            <a href="#" style="display:inline-block;background-color:${C.topCta.bg};border-radius:999px;padding:17px 38px;font-size:13.5px;line-height:1;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;color:${C.topCta.ink};text-decoration:none;">${C.topCta.label}</a>
            <!--<![endif]-->
          </td>
        </tr>
` : '';
const head = !C.line1 ? (topCta || (C.firstGap ? `        <tr><td style="height:${C.firstGap}px;line-height:${C.firstGap}px;font-size:0;">&nbsp;</td></tr>
` : '')) : `${pull}        <tr>
          <td align="center" style="padding:${C.pull ? 48 : 40}px 0 0 0;">
${C.kickerFirst ? `            <div style="padding-bottom:14px;font-size:11.5px;line-height:1.4;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:${C.eyebrow};">${C.kicker}</div>
` : ''}            <div style="font-size:30px;line-height:1.05;font-weight:900;letter-spacing:0.02em;text-transform:uppercase;color:${C.title};">${C.line1}</div>
            <div style="font-size:30px;line-height:1.05;font-weight:900;font-style:italic;letter-spacing:0.02em;text-transform:uppercase;color:${C.title};">${C.line2}</div>
          </td>
        </tr>
${C.kickerFirst ? '' : kicker + '\n'}${C.para ? `        <tr>
          <td align="center" style="padding:14px 0 0 0;font-size:13.5px;line-height:1.65;color:${C.body};">
            ${C.para}
          </td>
        </tr>
` : ''}`;
const pills = C.pills ? `        <tr><td style="height:32px;line-height:32px;font-size:0;">&nbsp;</td></tr>
        <tr>
          <td align="center" style="font-size:11.5px;line-height:1.4;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:${C.title};">${C.pills.head}</td>
        </tr>
        <tr>
          <td align="center" style="padding:12px 0 0 0;font-size:0;line-height:0;">${C.pills.items.map((t) => `<span style="display:inline-block;margin:0 4px 8px;background-color:${GOLD};border-radius:999px;padding:8px 15px;font-size:11.5px;line-height:1.2;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:${INK};">${t}</span>`).join('')}</td>
        </tr>` : '';
const button = C.cta ? `        <tr><td style="height:${C.ctaGap ?? 32}px;line-height:${C.ctaGap ?? 32}px;font-size:0;">&nbsp;</td></tr>

        <tr>
          <td align="center">
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
              href="#" style="height:50px;v-text-anchor:middle;width:290px;" arcsize="50%" stroke="f" fillcolor="${C.btnBg}">
              <w:anchorlock/>
              <center style="color:${C.btnInk};font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:13.5px;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;">${C.cta}</center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-- -->
            <a href="#" style="display:inline-block;background-color:${C.btnBg};border-radius:999px;padding:17px 38px;font-size:13.5px;line-height:1;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;color:${C.btnInk};text-decoration:none;">${C.cta}</a>
            <!--<![endif]-->
          </td>
        </tr>
` : '';
const tail = pills + button;

const html = `<!--
  ${C.label} as LIVE TEXT for Klaviyo.
  GENERATED by scripts/make-reviews-html.mjs from ${SRC}. Do not hand-edit:
  change a quote there and re-run, or the design and the send will disagree.

  Paste into a Klaviyo HTML block ${C.placement}.

  Equal card heights come free: the two cells in a table row stretch to the
  taller of them, so nothing is hard-coded and the block still looks right if a
  quote is edited later.

  The <style> block stacks the cards one-up under 620px so they stay readable
  on a phone. If Klaviyo strips it, the two-up grid still renders.

  Deliberate differences from the React design:
    - Gotham falls back to Montserrat, the design system's documented email
      fallback.
    - Outlook desktop squares the rounded corners. That is the accepted floor.

${C.cta ? '  ' + (C.ctaNote ?? 'Replace BOTH href="#" values with the product page URL before sending.') : C.topCta ? '  Replace BOTH href="#" values on the "' + C.topCta.label + '" button with the reviews page URL.' : '  No button in this block: the email\'s buttons live in its images.'}
-->
<style>
  @media only screen and (max-width:620px) {
    /* border-box, or the 18px padding is added to a 100% width and the card
       hangs past the right margin. */
    .mg-card { display:block !important; width:100% !important; box-sizing:border-box !important; }
    .mg-gap  { display:none !important; height:0 !important; }
    .mg-rowgap { height:14px !important; }
    /* Stacked, a row's second card sits directly under its first; without
       this they touch, since the row gap only separates rows. */
    .mg-card-b { margin-top:14px !important; }
  }
</style>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAGE}" style="background-color:${PAGE};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:0 30px ${C.padBottom ?? 44}px 30px;font-family:'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;">

${head}
${C.line1 ? '        <tr><td style="height:26px;line-height:26px;font-size:0;">&nbsp;</td></tr>' : ''}

        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${grid}
            </table>
          </td>
        </tr>

${tail}
      </table>
    </td>
  </tr>
</table>
`;

writeFileSync(OUT, html);
console.log(`wrote ${OUT} — ${reviews.length} reviews, ${rows.length} rows`);
