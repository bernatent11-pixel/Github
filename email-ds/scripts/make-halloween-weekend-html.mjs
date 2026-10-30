// Build "It's Halloween weekend" as one paste-ready Klaviyo HTML block.
//
// Same method as make-halloween-html.mjs: the design renders in HTML mode
// (refine/halloween-weekend-html.html: buttons left out, slices marked), the
// slices are cut at 2x, and the buttons, the timer slot and the footer are
// written as live HTML between them, each button linked to its page.
//
// Images come from exports/klaviyo/halloween-weekend/hosted.json (file -> URL
// on Klaviyo's CDN) when it exists, otherwise from the repo's raw GitHub URLs.
//
// Usage: node scripts/make-halloween-weekend-html.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'exports/klaviyo/halloween-weekend';
const IMG = `${OUT}/img`;
const RAW = 'https://raw.githubusercontent.com/bernatent11-pixel/Github/claude/email-design-system-a0nlwv/email-ds/' + IMG;
fs.mkdirSync(IMG, { recursive: true });

const SITE = 'https://milonga.life';
const LINK = {
  home: SITE,
  pack: `${SITE}/products/halloween-party-pack-bundle`,
  lionsManeVariety: `${SITE}/products/lions-mane-variety-pack`,
  cannabisVariety: `${SITE}/products/variety`,
};
const SALE_END = 'Monday, November 2 at 11:59 PM ET';

const PURPLE = '#3A1F55';
const NIGHT = '#2C1743';
const FOREST = '#004D27';
const GOLD = '#E3BC62';
const BEIGE = '#F0EFDF';
const FONT = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";

// ── 1. Cut the slices ────────────────────────────────────────────────────
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 600, height: 900 }, deviceScaleFactor: 2 });
await page.goto('file:///home/user/Github/email-ds/refine/halloween-weekend-html.html');
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
  // Floor the top and the bottom: rounding the bottom up takes a row of the
  // next section with it, which shows as a hairline seam.
  const top = Math.floor(r.top * 2), bottom = Math.min(H, Math.floor(r.bottom * 2));
  const file = `${r.name}.jpg`;
  await sharp(png).extract({ left: 0, top, width: 1200, height: bottom - top })
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(`${IMG}/${file}`);
  slices[r.name] = { file };
  console.log(r.name, 1200 + 'x' + (bottom - top));
}
// The variety row holds two cards; cut it down the middle of the gap between
// them (22 | 271 | 14 | 271 | 22, so x = 300) so each card is its own image
// and links to its own product.
for (const [side, left] of [['l', 0], ['r', 600]]) {
  await sharp(`${IMG}/s3-row.jpg`).extract({ left, top: 0, width: 600, height: (await sharp(`${IMG}/s3-row.jpg`).metadata()).height })
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(`${IMG}/s3-row-${side}.jpg`);
}
fs.unlinkSync(`${IMG}/s3-row.jpg`);
fs.copyFileSync('public/logo/lockup-milonga-green.png', `${IMG}/footer-logo.png`);
const logoMeta = await sharp(`${IMG}/footer-logo.png`).metadata();

const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const url = (file) => hosted[file] || `${RAW}/${file}`;

// ── 2. The pieces ────────────────────────────────────────────────────────
const ALT = {
  's1-hero': 'Milonga. It’s Halloween weekend. Party Pack up to 30% off, ends Monday. The whole Milonga lineup on a purple Halloween night with a full moon, witches on broomsticks, friendly ghosts, autumn leaves and jack-o’-lanterns: Lion’s Mane and Social Mate cans around a pouch of Mate Latte.',
  's2-head': 'Limited edition, last weekend. The Halloween Party Pack. Costumes by day, the party by night. Our two mates in one box, plus the Milonga bucket hat, up to 30% off until Monday. The Party Pack box of Lion’s Mane and Social Mate cans with a Milonga bucket hat, jack-o’-lanterns, ghosts and witches under a full moon.',
  's2-body': 'By day, Lion’s Mane Mate: 100mg natural caffeine, 1,000mg Lion’s Mane, 220mg L-Theanine. By night, Social Mate: 10mg THC, 10mg CBD, 110mg natural caffeine, 220mg L-Theanine. Party Pack, 24-pack: $103.80, was $138.40, save 25%: 12 cans of Lion’s Mane, 12 cans of Social Mate, 1 Milonga bucket hat. Party Pack XL, 48-pack: $167.72, was $239.60, save 30%: 24 cans of Lion’s Mane, 24 cans of Social Mate, 2 Milonga bucket hats.',
  's3-head': 'Sober October, last call. Every flavor, one box. The Sober October variety packs: 8 of each flavor in the 24-pack, 25% off until Monday.',
  's3-row-l': 'Sober October Lion’s Mane Variety Pack, 25% off the 24-pack: 12-pack $50.40; 24-pack $56.70, was $75.60; 48-pack $151.20.',
  's3-row-r': 'Sober October Cannabis Variety Pack, Regular 10mg, 25% off the 24-pack: 12-pack $78.00; 24-pack $111.75, was $149.00; 48-pack $285.00.',
};
const LINK_OF = { 's1-hero': LINK.home, 's2-head': LINK.pack, 's2-body': LINK.pack };

const img = (name) => {
  const s = slices[name];
  const inner = `<img src="${url(s.file)}" width="600" alt="${ALT[name].replace(/"/g, '&quot;')}" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;">`;
  const href = LINK_OF[name];
  return `<tr><td style="padding:0;font-size:0;line-height:0;">${href ? `<a href="${href}" target="_blank" style="text-decoration:none;">${inner}</a>` : inner}</td></tr>`;
};

// Half of a two-card row: its own image, linked to its own product.
const half = (name, href) =>
  `<td width="50%" valign="top" style="width:50%;padding:0;font-size:0;line-height:0;"><a href="${href}" target="_blank" style="text-decoration:none;">` +
  `<img src="${url(`${name}.jpg`)}" width="300" alt="${ALT[name].replace(/"/g, '&quot;')}" style="display:block;width:100%;max-width:300px;height:auto;border:0;outline:none;text-decoration:none;"></a></td>`;

// A bulletproof button: a rounded cell with a padded link inside it.
const button = (label, href, { fill = GOLD, ink = FOREST, size = 15, pad = '16px 34px', cls = '' } = {}) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>` +
  `<td align="center" bgcolor="${fill}" style="border-radius:999px;background:${fill};">` +
  `<a href="${href}" target="_blank"${cls ? ` class="${cls}"` : ''} style="display:inline-block;padding:${pad};white-space:nowrap;font-family:${FONT};font-size:${size}px;font-weight:800;` +
  `letter-spacing:2px;text-transform:uppercase;color:${ink};text-decoration:none;border-radius:999px;mso-padding-alt:0;">${label}</a>` +
  `</td></tr></table>`;

const row = (bg, html, pad = '0') =>
  `<tr><td align="center" bgcolor="${bg}" style="background:${bg};padding:${pad};">${html}</td></tr>`;

// The two buttons under the variety cards, each in the white foot of its
// card. Widths are shares of the 600 frame (22 | 271 | 14 | 271 | 22).
const pct = (px) => (px / 6).toFixed(3) + '%';
const gap = (px) => `<td width="${pct(px)}" style="width:${pct(px)};padding:0;font-size:0;line-height:0;">&nbsp;</td>`;
const footCell = (px, content) =>
  `<td width="${pct(px)}" valign="top" align="center" bgcolor="#FFFFFF" style="width:${pct(px)};padding:0;background:#FFFFFF;border-radius:0 0 22px 22px;">` +
  `<div style="padding:8px 6px 20px;">${content}</div></td>`;
const cardButton = (label, href) => button(label, href, { fill: FOREST, ink: '#FFFFFF', size: 12, pad: '13px 18px', cls: 'card-btn' });
const cardFeet = (a, b) =>
  `<tr><td bgcolor="${NIGHT}" style="background:${NIGHT};padding:0;">` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>` +
  gap(22) + footCell(271, cardButton(...a)) + gap(14) + footCell(271, cardButton(...b)) + gap(22) +
  `</tr></table></td></tr>`;

const COMPLIANCE =
  'Sale prices as marked on milonga.life until ' + SALE_END + ', while supplies last. Up to 30% off applies to the ' +
  'Halloween Party Pack XL; the variety packs are 25% off the 24-pack. Social Mate is for 21+ only. Hemp-derived; ' +
  'contains less than 0.3% delta-9 THC on a dry-weight basis. Contains THC. Contains caffeine. Do not drive or operate ' +
  'machinery after consuming. Keep out of reach of children and pets. Not for use if pregnant or nursing. These ' +
  'statements have not been evaluated by the Food and Drug Administration.';

// ── 3. The template ──────────────────────────────────────────────────────
// A BODY-ONLY FRAGMENT for a Klaviyo HTML block (EMAIL_QA.md). The
// unsubscribe is the full {% unsubscribe 'Unsubscribe' %} tag in a pill cell;
// the address is {{ organization.full_address }}, the account's own.
const html = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,800;0,900;1,800&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:#004D27 !important; text-decoration:none !important; }
  .web-view-line a { color:#3B5344 !important; }
  @media only screen and (max-width:620px) {
    .wrap { width:100% !important; }
    .card-btn { font-size:10px !important; letter-spacing:1px !important; padding:11px 12px !important; }
  }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BEIGE}" style="background:${BEIGE};">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · IT'S HALLOWEEN WEEKEND ──────────────────────────────── -->
${img('s1-hero')}
${row(PURPLE, button('Shop the Halloween sale', LINK.home, { size: 16, pad: '17px 36px' }), '0 20px 24px')}

<!-- ── LIVE TIMER ──────────────────────────────────────────────────
     Paste your countdown timer image tag in place of the line marked
     TIMER below (e.g. from Sendtric: end Monday, November 2, 2026,
     11:59 PM, time zone America/New_York). Keep the fallback line: it
     is what readers see if images are off.                          -->
${row(PURPLE, `<div style="font-family:${FONT};font-size:12px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;padding-bottom:12px;">Sale ends in</div>
<!-- TIMER: <img src="YOUR-TIMER-URL" width="440" alt="Countdown to the end of the sale" style="display:block;margin:0 auto;width:440px;max-width:100%;height:auto;border:0;"> -->
<div style="display:inline-block;background:${NIGHT};border:1.5px solid ${GOLD};border-radius:16px;padding:14px 22px;font-family:${FONT};font-size:18px;font-weight:900;color:#FFFFFF;letter-spacing:1px;">Ends ${SALE_END}</div>`, '6px 20px 40px')}

<!-- ── 2 · THE HALLOWEEN PARTY PACK ────────────────────────────── -->
${img('s2-head')}
${img('s2-body')}
${row(PURPLE, button('Get the Party Pack', LINK.pack, { size: 16, pad: '17px 40px' }) +
  `<div style="font-family:${FONT};font-size:13px;font-weight:700;color:#FFFFFF;padding-top:14px;">Social Mate is 21+. New to it? Start with half a can.</div>`, '0 24px 56px')}

<!-- ── 3 · THE SOBER OCTOBER VARIETY PACKS ─────────────────────── -->
${img('s3-head')}
<tr><td bgcolor="${NIGHT}" style="background:${NIGHT};padding:0;font-size:0;line-height:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>${half('s3-row-l', LINK.lionsManeVariety)}${half('s3-row-r', LINK.cannabisVariety)}</tr></table></td></tr>
${cardFeet(['Shop variety', LINK.lionsManeVariety], ['Shop variety', LINK.cannabisVariety])}
${row(NIGHT, `<div style="font-family:${FONT};font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${GOLD};padding-bottom:18px;">Halloween weekend ends <span style="white-space:nowrap;">${SALE_END}</span></div>` +
  button('Shop the sale', LINK.home), '30px 22px 52px')}

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td align="center" bgcolor="${BEIGE}" style="background:${BEIGE};padding:34px 30px 36px;font-family:${FONT};color:${FOREST};">
<a href="${LINK.home}" target="_blank"><img src="${url('footer-logo.png')}" width="${Math.round(logoMeta.width * 64 / logoMeta.height)}" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:900;letter-spacing:2px;text-transform:uppercase;"><a href="${LINK.home}" target="_blank" style="color:${FOREST};text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid ${FOREST};border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${FOREST};">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:600;color:#3B5344;">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:600;color:#3B5344;">${COMPLIANCE}</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};">{{ organization.name }} · {{ organization.full_address }}</div>
<div style="padding-top:4px;font-size:11px;line-height:1.55;font-weight:700;color:${FOREST};"><a href="${LINK.home}" target="_blank" style="color:${FOREST};text-decoration:none;">Milonga.life</a> · <a href="mailto:connect@milonga.life" style="color:${FOREST};text-decoration:none;">connect@milonga.life</a></div>
</td></tr>

</table>
</td></tr>
</table>
`;
const { validate, report } = await import('./validate-klaviyo-email.mjs');
const problems = validate(html);
if (problems.length) {
  console.error(report(problems, 'halloween-weekend.html (not written)'));
  process.exit(1);
}
fs.writeFileSync(`${OUT}/halloween-weekend.html`, html);
console.log('wrote', `${OUT}/halloween-weekend.html`, (html.length / 1024).toFixed(1) + ' KB');
