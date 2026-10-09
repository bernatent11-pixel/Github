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
  // "They Said It Better Than We Could" — the whole forest band.
  'reviews-showcase': {
    src: 'emails/mate-latte-reviews.js', key: 'MATE_LATTE_REVIEWS',
    out: 'exports/reviews-showcase-reviews.html',
    label: 'SECTION 2 — the reviews band', placement: 'between the section 1 and section 3 images',
    page: '#004D27', title: '#FFFFFF', eyebrow: '#E3BC62', body: '#FFFFFF',
    btnBg: null, btnInk: null,
    pull: { quote: '&ldquo;The taste was what sold me first.&rdquo;', by: 'Bryant, on the Mate Latte' },
    line1: 'Real reviews,', line2: 'word for word.',
    kicker: 'Every review so far: five stars', kickerFirst: true,
    para: null,
    pills: { head: 'What they keep mentioning', items: ['Creamy &amp; smooth', 'No jitters', 'Steady energy', 'Easy to make'] },
    cta: null,
  },
};
const C = CAMPAIGNS[process.argv[2] ?? 'coffee-vs-mate'];
if (!C) throw new Error(`unknown campaign; one of: ${Object.keys(CAMPAIGNS).join(', ')}`);
const SRC = C.src;
const OUT = C.out;

const sandbox = { window: {} };
new Function('window', readFileSync(SRC, 'utf8'))(sandbox.window);
const reviews = sandbox.window[C.key];
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

const CELL = `valign="top" bgcolor="${GOLD}" style="background-color:${GOLD};border-radius:16px;padding:18px;"`;

// Two cards to a row. The pair's cells stretch to the taller of them for free —
// no hard-coded height to go stale when a quote is edited. A lone card on the
// last row spans the full width rather than leaving a hole beside it.
const rows = [];
for (let i = 0; i < reviews.length; i += 2) rows.push(reviews.slice(i, i + 2));

const grid = rows
  .map((row, i) => {
    const gap = i === 0 ? '' : `
              <tr><td colspan="3" class="mg-rowgap" style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
`;
    const body =
      row.length === 2
        ? `                <td class="mg-card" width="48%" ${CELL}>${card(row[0])}
                </td>
                <td class="mg-gap" width="4%" style="font-size:0;line-height:0;">&nbsp;</td>
                <td class="mg-card mg-card-b" width="48%" ${CELL}>${card(row[1])}
                </td>`
        : `                <td colspan="3" ${CELL}>${card(row[0])}
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
const head = `${pull}        <tr>
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
const button = C.cta ? `        <tr><td style="height:32px;line-height:32px;font-size:0;">&nbsp;</td></tr>

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

${C.cta ? '  Replace BOTH href="#" values with the product page URL before sending.' : '  No button in this block: the email\'s buttons live in its images.'}
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
    <td align="center" style="padding:0 30px 44px 30px;font-family:'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;">

${head}
        <tr><td style="height:26px;line-height:26px;font-size:0;">&nbsp;</td></tr>

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
