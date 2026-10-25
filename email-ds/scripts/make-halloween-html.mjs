// Build the Halloween sale as one paste-ready Klaviyo HTML template.
//
// The design renders in HTML mode (refine/halloween-sale-html.html: every
// button left out, each image slice marked data-slice). This script cuts the
// slices at 2x, then writes table-based email HTML: the slices as images and
// every button, the timer and the footer as live HTML between them, each
// button linked to its page.
//
// Images are referenced from hosted.json (slice name -> URL, e.g. the Klaviyo
// image library) when it exists, otherwise from the repo's raw GitHub URLs.
//
// Usage: node scripts/make-halloween-html.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'exports/klaviyo/halloween-sale';
const IMG = `${OUT}/img`;
const RAW = 'https://raw.githubusercontent.com/bernatent11-pixel/Github/claude/email-design-system-a0nlwv/email-ds/' + IMG;
fs.mkdirSync(IMG, { recursive: true });

const SITE = 'https://milonga.life';
const LINK = {
  home: SITE,
  pack: `${SITE}/products/halloween-party-pack-bundle`,
  lionsMane: `${SITE}/products/lion-s-mane`,
  regular: `${SITE}/products/cannabis-regular-10mg`,
  lionsManeVariety: `${SITE}/products/lions-mane-variety-pack`,
  cannabisVariety: `${SITE}/products/variety`,
  latte: `${SITE}/products/the-original-mate-latte`,
};

const SUBJECT = 'Trick Or Treat Yourself 🎃👻';
const PREVIEW = 'Up to 30% off the Halloween Party Pack and up to 25% off everything, until Monday, November 2.';
const SALE_END = 'Monday, November 2 at 11:59 PM ET';

const ORANGE = '#DA5813';
const FOREST = '#004D27';
const DEEP = '#00351B';
const GOLD = '#E3BC62';
const BEIGE = '#F0EFDF';
const FONT = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";

// ── 1. Cut the slices ────────────────────────────────────────────────────
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 600, height: 900 }, deviceScaleFactor: 2 });
await page.goto('file:///home/user/Github/email-ds/refine/halloween-sale-html.html');
await page.waitForTimeout(1500);
const rects = await page.evaluate(() => [...document.querySelectorAll('[data-slice]')].map((el) => {
  const r = el.getBoundingClientRect();
  return { name: el.dataset.slice, top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
}));
const png = await page.screenshot({ fullPage: true });
await browser.close();

const { height: H } = await sharp(png).metadata();
const slices = {};
for (const r of rects) {
  const top = Math.round(r.top * 2), bottom = Math.min(H, Math.round(r.bottom * 2));
  const file = `${r.name}.jpg`;
  await sharp(png).extract({ left: 0, top, width: 1200, height: bottom - top })
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(`${IMG}/${file}`);
  slices[r.name] = { file, h: (bottom - top) / 2 };
  console.log(r.name, 1200 + 'x' + (bottom - top));
}
// The footer logo travels with the slices.
fs.copyFileSync('public/logo/lockup-milonga-green.png', `${IMG}/footer-logo.png`);
const logoMeta = await sharp(`${IMG}/footer-logo.png`).metadata();

const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const url = (file) => hosted[file] || `${RAW}/${file}`;

// ── 2. The pieces ────────────────────────────────────────────────────────
const ALT = {
  's1-hero': 'Milonga. Trick or treat yourself. Up to 30% off sitewide. The Milonga lineup on an orange Halloween backdrop with friendly ghosts: Lion’s Mane and Social Mate cans around a pouch of Mate Latte.',
  's2-head': 'Limited edition. The Halloween Party Pack. Day to night, no alcohol needed. Our two mates in one box, plus the Milonga bucket hat. The Party Pack box of Lion’s Mane and Social Mate cans with a Milonga bucket hat, jack-o’-lanterns and ghosts.',
  's2-body': 'By day, Lion’s Mane Mate, for costume-making, pumpkin carving and getting ready: 100mg natural caffeine, clean, sustained energy; 1,000mg Lion’s Mane, focus and concentration; 220mg L-Theanine, calm and balance. By night, Social Mate, for when the party starts, no alcohol needed: 10mg THC, an uplifting herbal experience; 10mg CBD, smooth and balanced; 110mg natural caffeine, natural, steady energy; 220mg L-Theanine, calm and balance. Party Pack, 24-pack: $103.80, was $138.40, save 25%: 12 cans of Lion’s Mane, 12 cans of Social Mate, 1 Milonga bucket hat. Party Pack XL, 48-pack: $167.72, was $239.60, save 30%: 24 cans of Lion’s Mane, 24 cans of Social Mate, 2 Milonga bucket hats.',
  's3-head': 'Sitewide. Everything else, up to 25% off. The bigger the pack, the bigger the saving. Stock the fridge for Halloween and the month ahead.',
  's3-row-0': 'Lion’s Mane cans, up to 25% off: 12-pack $42.84, was $50.40; 24-pack $60.48, was $75.60; 48-pack $113.40, was $151.20. Regular 10mg, up to 25% off: 12-pack $66.30, was $78.00; 24-pack $119.20, was $149.00; 48-pack $213.75, was $285.00.',
  's3-row-1': 'Sober October Lion’s Mane Variety Pack: 12-pack $50.40; 24-pack $56.70, was $75.60; 48-pack $151.20. Sober October Cannabis Variety Pack, Regular 10mg: 12-pack $78.00; 24-pack $111.75, was $149.00; 48-pack $285.00. Also in Light 5mg: 12-pack $66.00, 24-pack $125.00, 48-pack $237.00.',
  's3-latte': 'The Mate Latte: 30 servings $62.98, was $69.98; 60 servings $118.96, was $139.96.',
};
const LINK_OF = { 's1-hero': LINK.home, 's2-head': LINK.pack, 's2-body': LINK.pack, 's3-head': LINK.home };

const img = (name) => {
  const s = slices[name];
  const inner = `<img src="${url(s.file)}" width="600" alt="${ALT[name].replace(/"/g, '&quot;')}" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;">`;
  const href = LINK_OF[name];
  return `<tr><td style="padding:0;font-size:0;line-height:0;">${href ? `<a href="${href}" target="_blank" style="text-decoration:none;">${inner}</a>` : inner}</td></tr>`;
};

// A bulletproof button: a rounded cell with a padded link inside it.
const button = (label, href, { fill = FOREST, ink = '#FFFFFF', size = 15, pad = '16px 34px', cls = '' } = {}) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>` +
  `<td align="center" bgcolor="${fill}" style="border-radius:999px;background:${fill};">` +
  `<a href="${href}" target="_blank"${cls ? ` class="${cls}"` : ''} style="display:inline-block;padding:${pad};white-space:nowrap;font-family:${FONT};font-size:${size}px;font-weight:800;` +
  `letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;border-radius:999px;mso-padding-alt:0;">${label}</a>` +
  `</td></tr></table>`;

const row = (bg, html, pad = '0') =>
  `<tr><td align="center" bgcolor="${bg}" style="background:${bg};padding:${pad};">${html}</td></tr>`;

// The two buttons under a row of cards, each in the white foot of its card.
// Every width is a share of the 600 frame (22 | 271 | 14 | 271 | 22), so the
// feet scale with the card images above them and stay aligned on a phone.
const pct = (px) => (px / 6).toFixed(3) + '%';
const gap = (px) => `<td width="${pct(px)}" style="width:${pct(px)};padding:0;font-size:0;line-height:0;">&nbsp;</td>`;
const footCell = (px, content, radius) =>
  `<td width="${pct(px)}" valign="top" align="center" bgcolor="#FFFFFF" style="width:${pct(px)};padding:0;background:#FFFFFF;border-radius:${radius};">` +
  `<div style="padding:8px 6px 20px;">${content}</div></td>`;
const cardButton = (label, href) => button(label, href, { size: 12, pad: '13px 18px', cls: 'card-btn' });
const cardFeet = (a, b) =>
  `<tr><td bgcolor="${FOREST}" style="background:${FOREST};padding:0;">` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>` +
  gap(22) + footCell(271, cardButton(...a), '0 0 22px 22px') + gap(14) + footCell(271, cardButton(...b), '0 0 22px 22px') + gap(22) +
  `</tr></table></td></tr>` +
  `<tr><td bgcolor="${FOREST}" style="background:${FOREST};height:14px;font-size:0;line-height:0;">&nbsp;</td></tr>`;
const latteFoot = () =>
  `<tr><td bgcolor="${FOREST}" style="background:${FOREST};padding:0;">` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>` +
  gap(22) + footCell(556, cardButton('Shop Mate Latte', LINK.latte), '0 0 24px 24px') + gap(22) +
  `</tr></table></td></tr>`;

const COMPLIANCE =
  'Sale prices as marked on milonga.life until ' + SALE_END + ', while supplies last. Up to 30% off applies to the ' +
  'Halloween Party Pack XL; other products are up to 25% off. Social Mate is for 21+ only. Hemp-derived; contains less ' +
  'than 0.3% delta-9 THC on a dry-weight basis. Contains THC. Contains caffeine. Do not drive or operate machinery after ' +
  'consuming. Keep out of reach of children and pets. Not for use if pregnant or nursing. These statements have not been ' +
  'evaluated by the Food and Drug Administration.';

// ── 3. The template ──────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${SUBJECT}</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,800;0,900;1,800&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:${BEIGE}; }
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  @media only screen and (max-width:620px) {
    .wrap { width:100% !important; }
    .card-btn { font-size:10px !important; letter-spacing:1px !important; padding:11px 12px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${BEIGE};">
<!-- Preview text -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${BEIGE};">${PREVIEW}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BEIGE}" style="background:${BEIGE};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · TRICK OR TREAT YOURSELF ─────────────────────────────── -->
${img('s1-hero')}
${row(ORANGE, button('Shop the sale', LINK.home, { fill: GOLD, ink: FOREST, size: 16, pad: '17px 40px' }), '4px 20px 26px')}

<!-- ── LIVE TIMER ──────────────────────────────────────────────────
     Paste your countdown timer image tag in place of the line marked
     TIMER below (e.g. from Sendtric: end Monday, November 2, 2026,
     11:59 PM, time zone America/New_York). Keep the fallback line: it
     is what readers see if images are off.                          -->
${row(ORANGE, `<div style="font-family:${FONT};font-size:12px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;padding-bottom:14px;">Sale ends in</div>
<!-- TIMER: <img src="YOUR-TIMER-URL" width="440" alt="Countdown to the end of the sale" style="display:block;margin:0 auto;width:440px;max-width:100%;height:auto;border:0;"> -->
<div style="display:inline-block;background:${DEEP};border:1.5px solid ${GOLD};border-radius:16px;padding:14px 22px;font-family:${FONT};font-size:18px;font-weight:900;color:#FFFFFF;letter-spacing:1px;">Ends ${SALE_END}</div>`, '8px 20px 34px')}

<!-- ── 2 · THE HALLOWEEN PARTY PACK ────────────────────────────── -->
${img('s2-head')}
${img('s2-body')}
${row(ORANGE, button('Get the Party Pack', LINK.pack, { size: 16, pad: '17px 40px' }) +
  `<div style="font-family:${FONT};font-size:13px;font-weight:700;color:#FFFFFF;padding-top:14px;">Social Mate is 21+. New to it? Start with half a can.</div>`, '0 24px 56px')}

<!-- ── 3 · EVERYTHING ELSE ─────────────────────────────────────── -->
${img('s3-head')}
${img('s3-row-0')}
${cardFeet(['Shop Lion’s Mane', LINK.lionsMane], ['Shop Regular', LINK.regular])}
${img('s3-row-1')}
${cardFeet(['Shop variety', LINK.lionsManeVariety], ['Shop variety', LINK.cannabisVariety])}
${img('s3-latte')}
${latteFoot()}
${row(FOREST, `<div style="font-family:${FONT};font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${GOLD};">Sale ends ${SALE_END}</div>`, '26px 22px 54px')}

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td align="center" bgcolor="${BEIGE}" style="background:${BEIGE};padding:34px 30px 36px;font-family:${FONT};color:${FOREST};">
<a href="${LINK.home}" target="_blank"><img src="${url('footer-logo.png')}" width="${Math.round(logoMeta.width * 64 / logoMeta.height)}" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:13px;font-weight:900;letter-spacing:3px;text-transform:uppercase;"><a href="${LINK.home}" target="_blank" style="color:${FOREST};text-decoration:none;">Shop milonga.life</a></div>
<div style="padding-top:14px;font-size:12px;font-weight:700;color:${FOREST};">{% web_view %} &nbsp;·&nbsp; {% unsubscribe %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:600;color:#3B5344;">${COMPLIANCE}</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:600;color:#3B5344;">{{ organization.name }} · {{ organization.full_address }}</div>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>
`;
fs.writeFileSync(`${OUT}/halloween-sale.html`, html);
console.log('wrote', `${OUT}/halloween-sale.html`, (html.length / 1024).toFixed(1) + ' KB');
