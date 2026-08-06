// Generate the email-safe HTML for "The Original Mate Latte" (Klaviyo).
//
// This is a hand-built table layout, not a render of the React components:
// email clients strip flexbox, grid, aspect-ratio and most modern CSS, so the
// design is reproduced with nested tables, inline styles and hosted images.
// The brand rules are the same — dark green ground, gold accents, caps titles
// and buttons, two-tone headlines, the three-act order.
import { readFileSync, writeFileSync } from 'node:fs';

const IMG = JSON.parse(readFileSync(new URL('./assets.json', import.meta.url), 'utf8'));

const SHOP = 'https://www.milonga.life';

// ── brand ────────────────────────────────────────────────────────────────────
const FOREST = '#004D27';
const GOLD = '#E3BC62';
const BEIGE = '#F0EFDF';
const WHITE = '#FFFFFF';
const RULE = 'rgba(227,188,98,0.28)';
// Gotham is licensed and stripped by most clients; the stack degrades to
// Montserrat then the system sans.
const FONT = "'Gotham','Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const W = 600;

// ── helpers ──────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A full-width band on the email ground. */
const band = (inner, pad = '0 30px') =>
  `<tr><td align="center" bgcolor="${FOREST}" style="padding:${pad};">${inner}</td></tr>`;

/** Hairline separator. */
const rule = () =>
  band(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${RULE};font-size:0;line-height:0;">&nbsp;</td></tr></table>`, '0 30px');

const spacer = (h) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="${h}" style="height:${h}px;font-size:0;line-height:0;">&nbsp;</td></tr></table>`;

/** A section title, uppercase, with the tail in gold. */
function title(text, accentPart, size = 28, align = 'center') {
  let head = text, tail = '';
  if (accentPart && text.toLowerCase().endsWith(accentPart.toLowerCase())) {
    head = text.slice(0, text.length - accentPart.length);
    tail = text.slice(text.length - accentPart.length);
  } else {
    const w = text.trim().split(/\s+/);
    const cut = Math.ceil(w.length / 2);
    head = w.slice(0, cut).join(' ') + (w.length > cut ? ' ' : '');
    tail = w.slice(cut).join(' ');
  }
  return `<div style="font-family:${FONT};font-size:${size}px;line-height:1.2;font-weight:900;text-transform:uppercase;letter-spacing:0.02em;color:${BEIGE};text-align:${align};margin:0;">${esc(head)}<span style="color:${GOLD};">${esc(tail)}</span></div>`;
}

/** Caps + gold subtitle under a title. */
const subtitle = (text, align = 'center') =>
  `<div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};text-align:${align};padding-top:12px;">${esc(text)}</div>`;

const paragraph = (text, align = 'center') =>
  `<div style="font-family:${FONT};font-size:14px;line-height:1.65;color:${WHITE};text-align:${align};">${esc(text)}</div>`;

/** Pill button. Gold face, forest label. */
const button = (label, href, { solid = true } = {}) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
    <td align="center" bgcolor="${solid ? GOLD : FOREST}" style="border-radius:999px;border:2px solid ${GOLD};">
      <a href="${href}" style="display:inline-block;padding:16px 34px;font-family:${FONT};font-size:13.5px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:${solid ? FOREST : GOLD};text-decoration:none;border-radius:999px;">${esc(label)}</a>
    </td></tr></table>`;

/** A benefit or ingredient row: gold disc, then the copy. */
function iconRow(icon, heading, text, { discSize = 46, headSize = 18 } = {}) {
  const words = heading.trim().split(/\s+/);
  const cut = Math.ceil(words.length / 2);
  const head = words.slice(0, cut).join(' ');
  const tail = words.slice(cut).join(' ');
  const headHtml = text
    ? `<span style="color:${BEIGE};">${esc(heading)}</span>`
    : `${esc(head)}<span style="color:${GOLD};">${tail ? ' ' + esc(tail) : ''}</span>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="${discSize + 14}" valign="top" style="width:${discSize + 14}px;padding:11px 0;">
      <img src="${icon}" width="${discSize}" height="${discSize}" alt="" style="display:block;width:${discSize}px;height:${discSize}px;border:0;" />
    </td>
    <td valign="middle" style="padding:11px 0;">
      <div style="font-family:${FONT};font-size:${headSize}px;line-height:1.2;font-weight:900;text-transform:uppercase;letter-spacing:0.02em;color:${BEIGE};">${headHtml}</div>
      ${text ? `<div style="font-family:${FONT};font-size:13px;line-height:1.6;color:${WHITE};padding-top:5px;">${esc(text)}</div>` : ''}
    </td></tr></table>`;
}

// ── comparison table ─────────────────────────────────────────────────────────
const tick = (c) => `<span style="font-family:${FONT};font-size:15px;font-weight:700;color:${c};">&#10003;</span>`;
const cross = `<span style="font-family:${FONT};font-size:14px;color:rgba(240,239,223,0.35);">&#10005;</span>`;

function compareCell(cell, hl) {
  const v = typeof cell === 'object' ? cell.v : cell;
  const note = typeof cell === 'object' ? cell.note : undefined;
  let mark;
  if (v === true) mark = tick(hl ? GOLD : BEIGE);
  else if (v === false) mark = cross;
  else mark = `<span style="font-family:${FONT};font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:${hl ? GOLD : BEIGE};">${esc(v)}</span>`;
  return `<td align="center" valign="middle" style="padding:11px 6px;border-top:1px solid ${RULE};${hl ? `background-color:rgba(227,188,98,0.07);border-left:1px solid ${RULE};border-right:1px solid ${RULE};` : ''}">
    ${mark}
    ${note ? `<div style="font-family:${FONT};font-size:10px;line-height:1.35;color:${hl ? GOLD : 'rgba(240,239,223,0.75)'};padding-top:4px;">${esc(note)}</div>` : ''}
  </td>`;
}

function comparisonTable(columns, rows, highlight = 1) {
  const head = columns
    .map((c, i) => {
      const hl = i === highlight;
      return `<th align="${i === 0 ? 'left' : 'center'}" valign="bottom" style="padding:10px 6px;font-family:${FONT};font-size:10.5px;line-height:1.25;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;color:${hl ? GOLD : BEIGE};border-bottom:1px solid ${RULE};${hl ? `background-color:rgba(227,188,98,0.07);border-left:1px solid ${RULE};border-right:1px solid ${RULE};border-top:1px solid ${RULE};` : ''}">${esc(c)}</th>`;
    })
    .join('');
  const body = rows
    .map(
      (r) => `<tr>
      <td valign="middle" style="padding:11px 6px;border-top:1px solid ${RULE};">
        <div style="font-family:${FONT};font-size:12.5px;line-height:1.25;font-weight:700;color:${BEIGE};">${esc(r.label)}</div>
        ${r.note ? `<div style="font-family:${FONT};font-size:10.5px;color:rgba(240,239,223,0.8);padding-top:2px;">${esc(r.note)}</div>` : ''}
      </td>
      ${r.cells.map((c, i) => compareCell(c, i + 1 === highlight)).join('')}
    </tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

// ── price block ──────────────────────────────────────────────────────────────
function priceOption(o) {
  return `<td width="50%" valign="top" style="width:50%;padding:6px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
      style="border:1.5px solid ${o.featured ? GOLD : RULE};border-radius:16px;${o.featured ? 'background-color:rgba(227,188,98,0.10);' : ''}">
      <tr><td align="center" style="padding:${o.badge ? '20px 12px 16px' : '16px 12px'};">
        ${o.badge ? `<div style="font-family:${FONT};font-size:9.5px;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;color:${FOREST};background-color:${GOLD};border-radius:999px;padding:5px 12px;display:inline-block;margin-bottom:10px;">${esc(o.badge)}</div>` : ''}
        <div style="font-family:${FONT};font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${WHITE};padding-bottom:8px;">${esc(o.label)}</div>
        <div style="font-family:${FONT};line-height:1.05;padding-bottom:8px;">
          ${o.was ? `<span style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.65);text-decoration:line-through;">${esc(o.was)}</span>&nbsp;` : ''}
          <span style="font-size:26px;font-weight:900;color:${GOLD};">${esc(o.price)}</span>${o.suffix ? `<span style="font-size:12px;font-weight:700;color:${GOLD};">${esc(o.suffix)}</span>` : ''}
        </div>
        ${o.detail ? `<div style="font-family:${FONT};font-size:11.5px;line-height:1.5;color:${WHITE};">${esc(o.detail)}</div>` : ''}
        ${o.unit ? `<div style="font-family:${FONT};font-size:11.5px;font-weight:700;color:${GOLD};padding-top:3px;">${esc(o.unit)}</div>` : ''}
        <div style="height:14px;font-size:0;line-height:0;">&nbsp;</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td align="center" bgcolor="${o.featured ? GOLD : FOREST}" style="border-radius:999px;border:1.5px solid ${o.featured ? GOLD : RULE};">
            <a href="${o.href}" style="display:block;padding:12px 8px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${o.featured ? FOREST : BEIGE};text-decoration:none;">${esc(o.cta)}</a>
          </td></tr></table>
      </td></tr></table></td>`;
}

// ── the email ────────────────────────────────────────────────────────────────
const rows = [];

// ACT 1 — header: loud, statement, curiosity.
rows.push(band(`<img src="${IMG.logo}" width="92" alt="Milonga" style="display:block;width:92px;height:auto;border:0;margin:0 auto;" />`, '34px 28px 26px'));
rows.push(band(subtitle('Energy that thinks') + spacer(6) + title('The Original Mate Latte', 'Mate Latte', 38), '0 26px 6px'));
rows.push(
  band(
    spacer(14) +
      paragraph(
        'Meet Milonga’s Mate Latte, a clean coffee alternative crafted with organic yerba mate, Lion’s Mane and L-Theanine to deliver smooth, long-lasting energy and focus without the crash. With only 90 calories, 3g of sugar and a rich, creamy taste, it’s the perfect way to elevate your morning ritual.',
      ),
    '0 34px 10px',
  ),
);
rows.push(band(`<img src="${IMG.botanical}" width="${W - 60}" alt="Milonga Mate Latte with vanilla and yerba mate" style="display:block;width:100%;max-width:${W - 60}px;height:auto;border:0;margin:0 auto;" />`, '18px 30px 6px'));
rows.push(band(spacer(10) + button('Shop the Mate Latte', SHOP) + spacer(6), '0 30px 20px'));

// ACT 2 — body: value, information, education.
rows.push(rule());
rows.push(band(spacer(26) + title('Elevate your morning ritual', 'Morning Ritual') + subtitle('Everything your mornings need') + spacer(20), '0 30px'));
rows.push(
  band(
    [
      iconRow(IMG.yerbaMate, 'Clean, sustained energy'),
      iconRow(IMG.lionsMane, 'Mental focus'),
      iconRow(IMG.lTheanine, 'Calm, no jitters'),
      iconRow(IMG.noCaneSugar, 'No synthetic sweeteners'),
      iconRow(IMG.glutenFree, 'Antioxidant rich'),
    ].join('') + spacer(24),
    '0 30px',
  ),
);

rows.push(rule());
rows.push(band(spacer(26) + title('Three main ingredients', 'Ingredients', 28, 'left') + subtitle('One unique experience', 'left') + spacer(18), '0 30px'));
rows.push(
  band(
    [
      iconRow(IMG.yerbaMate, '100mg Yerba Mate', 'Clean, sustained energy & rich antioxidants.', { discSize: 52, headSize: 19 }),
      iconRow(IMG.lionsMane, '500mg Lion’s Mane', 'Focus and memory.', { discSize: 52, headSize: 19 }),
      iconRow(IMG.lTheanine, '200mg L-Theanine', 'Balanced calm.', { discSize: 52, headSize: 19 }),
    ].join('') + spacer(20),
    '0 30px',
  ),
);
rows.push(band(`<img src="${IMG.handPour}" width="${W - 60}" alt="A scoop of Milonga poured into a glass" style="display:block;width:100%;max-width:${W - 60}px;height:auto;border:0;margin:0 auto;" />`, '0 30px'));
rows.push(
  band(
    spacer(18) +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
        <td align="center" style="border:1.5px solid ${GOLD};border-radius:999px;padding:11px 22px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${GOLD};">90 cal &middot; 3g sugar per serving</td>
      </tr></table>` +
      spacer(26),
    '0 30px',
  ),
);

rows.push(rule());
rows.push(
  band(
    spacer(26) +
      subtitle('Ready in 30 seconds') +
      spacer(8) +
      title('Hot or iced', 'Iced') +
      spacer(20) +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
        <td align="center" style="padding:0 22px;"><img src="${IMG.hot}" width="52" alt="Hot" style="display:block;width:52px;height:auto;border:0;" /><div style="font-family:${FONT};font-size:10.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${GOLD};padding-top:9px;">Hot</div></td>
        <td align="center" style="padding:0 22px;"><img src="${IMG.iced}" width="52" alt="Iced" style="display:block;width:52px;height:auto;border:0;" /><div style="font-family:${FONT};font-size:10.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${GOLD};padding-top:9px;">Iced</div></td>
      </tr></table>` +
      spacer(26),
    '0 30px',
  ),
);

rows.push(rule());
rows.push(band(spacer(26) + title('Why upgrade to the Mate Latte?', 'the Mate Latte?') + subtitle('Is that even a question?') + spacer(20), '0 30px'));
rows.push(
  band(
    comparisonTable(
      ['', 'Mate Latte', 'Matcha', 'Coffee', 'Mushroom coffee'],
      [
        {
          label: 'Smooth caffeine',
          note: 'No jitters or crash',
          cells: [
            { v: true, note: '100mg from yerba mate' },
            { v: true, note: '~70mg' },
            { v: false, note: 'Spikes + crashes' },
            { v: 'Varies', note: 'Still coffee-based' },
          ],
        },
        {
          label: 'L-Theanine',
          note: 'Calm focus, no anxiety',
          cells: [{ v: true, note: '200mg added' }, { v: 'Trace', note: '~25mg natural' }, false, { v: false, note: 'Most brands omit' }],
        },
        {
          label: 'Lion’s Mane',
          note: 'Cognitive support',
          cells: [{ v: true, note: '500mg full dose' }, false, false, { v: true, note: 'Varies by brand' }],
        },
        {
          label: 'Dairy-free latte',
          note: 'Just add water',
          cells: [
            { v: true, note: 'Oat + coconut built in' },
            { v: false, note: 'Needs milk/creamer' },
            { v: false, note: 'Needs creamer' },
            { v: false, note: 'Needs creamer' },
          ],
        },
      ],
    ) + spacer(28),
    '0 22px',
  ),
);

// ACT 3 — CTA: price, offer, call to action.
rows.push(rule());
rows.push(band(spacer(28) + title('Get yours before it runs out', 'it runs out') + spacer(22), '0 30px'));
rows.push(
  band(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${priceOption({
        label: 'One-time',
        price: '$29.99',
        detail: '15 servings',
        unit: '$2.00 per serving',
        cta: 'Buy now',
        href: SHOP,
      })}
      ${priceOption({
        label: 'Subscribe & Save',
        was: '$29.99',
        price: '$25.49',
        suffix: '/mo',
        detail: '15 servings monthly · cancel anytime',
        unit: '$1.70 per serving',
        badge: 'Save 15%',
        featured: true,
        cta: 'Subscribe & Save',
        href: SHOP,
      })}
    </tr></table>` + spacer(28),
    '0 24px',
  ),
);

// Footer.
rows.push(rule());
rows.push(
  band(
    spacer(30) +
      `<img src="${IMG.logo}" width="84" alt="Milonga" style="display:block;width:84px;height:auto;border:0;margin:0 auto;" />` +
      spacer(20) +
      `<div style="font-family:${FONT};font-size:12.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BEIGE};text-align:center;">
        <a href="https://www.instagram.com/" style="color:${BEIGE};text-decoration:none;">Instagram</a>&nbsp;&nbsp;&nbsp;
        <a href="https://www.tiktok.com/" style="color:${BEIGE};text-decoration:none;">TikTok</a>&nbsp;&nbsp;&nbsp;
        <a href="${SHOP}" style="color:${BEIGE};text-decoration:none;">Shop</a>
      </div>` +
      spacer(18) +
      `<div style="font-family:${FONT};font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};text-align:center;">Milonga Yerba Mate</div>` +
      spacer(14) +
      `<div style="font-family:${FONT};font-size:10.5px;line-height:1.75;color:rgba(255,255,255,0.78);text-align:center;">
        {{ organization.name }}<br />
        {{ organization.full_address }}<br />
        {% unsubscribe 'Unsubscribe' %} &middot; <a href="{% web_view %}" style="color:rgba(255,255,255,0.78);">View in browser</a>
      </div>` +
      spacer(30),
    '0 30px',
  ),
);

const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>The Original Mate Latte</title>
<style type="text/css">
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  body{margin:0!important;padding:0!important;width:100%!important;background-color:${FOREST};}
  a{color:${GOLD};}
  /* One column on phones: the price options and the comparison stay readable. */
  @media only screen and (max-width:620px){
    .m-full{width:100%!important;max-width:100%!important;}
    .m-pad{padding-left:18px!important;padding-right:18px!important;}
  }
</style>
<!--[if mso]><style type="text/css">body,table,td,div,span,a{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${FOREST};">
<div style="display:none;font-size:1px;color:${FOREST};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">Organic yerba mate, 500mg Lion's Mane and 200mg L-Theanine in a creamy vanilla latte. 90 calories, 3g sugar.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${FOREST}" style="background-color:${FOREST};">
  <tr><td align="center" style="padding:0;">
    <table role="presentation" width="${W}" class="m-full" cellpadding="0" cellspacing="0" border="0" bgcolor="${FOREST}" style="width:${W}px;max-width:${W}px;background-color:${FOREST};">
      ${rows.join('\n      ')}
    </table>
  </td></tr>
</table>
</body>
</html>`;

writeFileSync(new URL('./original-mate-latte.html', import.meta.url), html);
console.log('wrote original-mate-latte.html —', Math.round(html.length / 1024) + 'KB');
