// "Everything your mornings need" — a two-section Mate Latte email built from
// Bernat's two finished images (exports/klaviyo/mate-mornings/src/):
//   1. green, "100mg of caffeine is a non-negotiable" — white Milonga logo
//      on top, CTA "Try it now"
//   2. gold, the "If you want / You need" graph — a serif title "Everything
//      your mornings need" above it, CTA "Experience it"
// joined by a gold wave with volume rising out of the green, a gold ribbon above it.
//
// Both images carry horizontal gradients, so the space for the logo, title and
// buttons is grown out of each image's own edge (see grow below),
// and the whole email ships as image slices; each button is its own linked
// slice. The footer is live HTML (unsubscribe, address).
//
// Usage: node scripts/make-mate-mornings.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'exports/klaviyo/mate-mornings';
const SRC = `${OUT}/src`;
const IMG = `${OUT}/img`;
const RAW = 'https://raw.githubusercontent.com/bernatent11-pixel/Github/claude/email-design-system-a0nlwv/email-ds/' + IMG;
fs.mkdirSync(IMG, { recursive: true });
const LINK = 'https://milonga.life/products/the-original-mate-latte';

// ── 1. Grow each image's background where the new elements go ───────────
// The new band is one row, averaged over the image's last (or first) 60 rows
// and blurred sideways, repeated down: copying the single edge row would drag
// any speck in it (a glass reflection) into a streak.
async function grow(input, { top = 0, bottom = 0 }) {
  const meta = await sharp(input).metadata();
  const band = async (y) => sharp(input).extract({ left: 0, top: y, width: meta.width, height: 60 })
    .resize(meta.width, 1, { kernel: 'cubic' }).blur(12).resize(meta.width, 1).png().toBuffer();
  const parts = [];
  if (top) parts.push({ input: await sharp(await band(0)).resize(meta.width, top, { fit: 'fill' }).png().toBuffer(), top: 0, left: 0 });
  parts.push({ input: await sharp(input).png().toBuffer(), top, left: 0 });
  if (bottom) parts.push({ input: await sharp(await band(meta.height - 60)).resize(meta.width, bottom, { fit: 'fill' }).png().toBuffer(), top: top + meta.height, left: 0 });
  return sharp({ create: { width: meta.width, height: meta.height + top + bottom, channels: 3, background: '#000' } }).composite(parts).png();
}
// Section 1: room under the glass for the button.
await (await grow(`${SRC}/section-1-caffeine.webp`, { bottom: 280 })).toFile(`${SRC}/_s1.png`);
// Section 2: room on top for the wave and the title; the empty foot under the
// pouch trimmed, then regrown for the button.
const s2 = await sharp(`${SRC}/section-2-graph.webp`).extract({ left: 0, top: 0, width: 1080, height: 1330 }).png().toBuffer();
await (await grow(s2, { top: 200, bottom: 290 })).toFile(`${SRC}/_s2.png`);

// ── 2. Render the email at 600 wide, 2x ──────────────────────────────────
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
const b64 = (f) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
const s1h = Math.round((1599 + 280) * 600 / 1080), s2h = Math.round((1330 + 200 + 290) * 600 / 1080);

const button = (label, fill, ink, shadow) => `<div class="btn" style="background:${fill};color:${ink};box-shadow:${shadow}">${label}</div>`;
const page = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
html,body{margin:0;background:#fff}
.email{width:600px;margin:0;position:relative;overflow:hidden}
.sec{position:relative;width:600px}
.sec img.bg{display:block;width:600px;height:auto}
.logo{position:absolute;left:50%;transform:translateX(-50%);top:30px;height:74px;width:auto}
.btnrow{position:absolute;left:0;right:0;display:flex;justify-content:center}
.btn{font-family:Montserrat,sans-serif;font-weight:800;font-size:17px;letter-spacing:.14em;text-transform:uppercase;padding:19px 46px;border-radius:999px;white-space:nowrap}
.title{position:absolute;left:0;right:0;text-align:center;color:#004D27;font-family:'Times New Roman','Liberation Serif',Times,serif;line-height:1}
.title .l1{font-style:italic;font-weight:700;font-size:62px;letter-spacing:-.5px}
.title .l2{font-weight:400;font-size:46px;margin-top:4px}
.wave{position:absolute;left:0;width:600px;height:120px}
</style></head><body><div class="email">

<div class="sec" id="s1" style="height:${s1h}px">
  <img class="bg" src="${b64(`${SRC}/_s1.png`)}" alt="">
  <img class="logo" src="${b64('public/logo/lockup-milonga-white.png')}" alt="">
  <div class="btnrow" style="top:${Math.round(1540 * 600 / 1080)}px">${button('Try it now', 'linear-gradient(180deg,#EBCB7E 0%,#E3BC62 55%,#D8AE52 100%)', '#004D27', '0 10px 22px rgba(0,30,18,.45)')}</div>
</div>

<div class="sec" id="s2" style="height:${s2h}px">
  <img class="bg" src="${b64(`${SRC}/_s2.png`)}" alt="">
  <!-- The transition, with volume: the section's gold rises out of the green
       as a sheet with a rolled, lit edge — a soft shadow cast up onto the
       green, a sheen along the crest fading into the gold, a darker fold just
       under it — and above it a gold ribbon drawn as a shaded tube (dark base,
       gold body, cream highlight) with its own shadow on the green. -->
  <svg class="wave" style="top:-118px" viewBox="0 0 600 120" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#DFAD55"/><stop offset=".25" stop-color="#E8BF69"/><stop offset=".5" stop-color="#EBC772"/><stop offset=".75" stop-color="#E9C06A"/><stop offset="1" stop-color="#DFAD55"/></linearGradient>
      <filter id="soft" x="-5%" y="-40%" width="110%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="softer" x="-5%" y="-60%" width="110%" height="220%"><feGaussianBlur stdDeviation="2.4"/></filter>
      <filter id="sheen" x="-5%" y="-60%" width="110%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>
      <clipPath id="front"><path d="M0,74 C120,40 230,38 330,66 C430,94 520,90 600,56 L600,120 L0,120 Z"/></clipPath>
    </defs>
    <!-- ribbon: shadow on the green, then the tube -->
    <path d="M0,48 C110,16 220,18 330,46 C430,72 520,70 600,34" fill="none" stroke="#001A10" stroke-opacity=".5" stroke-width="9" filter="url(#softer)" transform="translate(0,5)"/>
    <path d="M0,44 C110,12 220,14 330,42 C430,68 520,66 600,30" fill="none" stroke="#9C6F2A" stroke-width="9" stroke-linecap="round"/>
    <path d="M0,43 C110,11 220,13 330,41 C430,67 520,65 600,29" fill="none" stroke="url(#g)" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M0,41.6 C110,9.6 220,11.6 330,39.6 C430,65.6 520,63.6 600,27.6" fill="none" stroke="#FFF4D4" stroke-opacity=".9" stroke-width="1.8" stroke-linecap="round"/>
    <!-- the sheet: its shadow cast up onto the green, then the gold -->
    <path d="M0,74 C120,40 230,38 330,66 C430,94 520,90 600,56 L600,120 L0,120 Z" fill="#001A10" opacity=".55" filter="url(#soft)" transform="translate(0,-4)"/>
    <path d="M0,74 C120,40 230,38 330,66 C430,94 520,90 600,56 L600,120 L0,120 Z" fill="url(#g)"/>
    <g clip-path="url(#front)">
      <!-- sheen along the crest, fading down into the gold -->
      <path d="M0,80 C120,46 230,44 330,72 C430,100 520,96 600,62" fill="none" stroke="#FFF6DA" stroke-opacity=".75" stroke-width="18" filter="url(#sheen)"/>
      <!-- the fold under the lip: a darker gold line, softened -->
      <path d="M0,86 C120,52 230,50 330,78 C430,106 520,102 600,68" fill="none" stroke="#B9873A" stroke-opacity=".55" stroke-width="3" filter="url(#softer)"/>
    </g>
    <!-- the lit rim -->
    <path d="M0,74.6 C120,40.6 230,38.6 330,66.6 C430,94.6 520,90.6 600,56.6" fill="none" stroke="#FFF7DF" stroke-width="2"/>
  </svg>
  <div class="title" style="top:30px"><div class="l1">Everything</div><div class="l2">your mornings need.</div></div>
  <div class="btnrow" style="top:${Math.round((200 + 1330 + 40) * 600 / 1080)}px">${button('Experience it', '#004D27', '#FFFFFF', '0 10px 22px rgba(90,60,0,.35)')}</div>
</div>

</div></body></html>`;
fs.writeFileSync(`${OUT}/_render.html`, page);

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 600, height: 1000 }, deviceScaleFactor: 2 });
await pg.goto('file://' + process.cwd() + `/${OUT}/_render.html`);
await pg.waitForTimeout(800);
const geo = await pg.evaluate(() => {
  const r = (el) => { const b = el.getBoundingClientRect(); return { top: b.top + scrollY, bottom: b.bottom + scrollY }; };
  const rows = [...document.querySelectorAll('.btnrow')].map(r);
  const btns = [...document.querySelectorAll('.btn')].map(r);
  return { s1: r(document.getElementById('s1')), s2: r(document.getElementById('s2')), rows, btns };
});
const png = await pg.screenshot({ fullPage: true });
await browser.close();
fs.writeFileSync(`${OUT}/mate-mornings-full.png`, png);

// ── 3. Slices: picture, button band, picture, button band ────────────────
// Each button band runs 34px above and below its button so the whole pill and
// its shadow are clickable and no cut crosses it.
const cut = [
  ['s1-hero', 0, geo.btns[0].top - 34],
  ['s1-cta', geo.btns[0].top - 34, geo.s1.bottom],
  ['s2-hero', geo.s1.bottom, geo.btns[1].top - 34],
  ['s2-cta', geo.btns[1].top - 34, geo.s2.bottom],
];
const slices = {};
for (const [name, a, b] of cut) {
  const top = Math.floor(a * 2), bottom = Math.floor(b * 2);
  await sharp(png).extract({ left: 0, top, width: 1200, height: bottom - top })
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(`${IMG}/${name}.jpg`);
  slices[name] = `${name}.jpg`;
  console.log(name, 1200 + 'x' + (bottom - top));
}
fs.copyFileSync('public/logo/lockup-milonga-green.png', `${IMG}/footer-logo.png`);
const logoMeta = await sharp(`${IMG}/footer-logo.png`).metadata();

// ── 4. The Klaviyo HTML ──────────────────────────────────────────────────
const hostedPath = `${OUT}/hosted.json`;
const hosted = fs.existsSync(hostedPath) ? JSON.parse(fs.readFileSync(hostedPath, 'utf8')) : {};
const url = (f) => hosted[f] || `${RAW}/${f}`;
const ALT = {
  's1-hero': 'Milonga. 100mg of caffeine is a non-negotiable. Every other coffee alternative falls short… Try the Mate Latte for sustained energy without the crash. A pouch of Milonga Mate Latte, Vanilla, beside a tall glass of Mate Latte on green.',
  's1-cta': 'Try it now',
  's2-hero': 'Everything your mornings need. If you want coffee-level energy, you need 100mg caffeine from yerba mate. If you want no jitters, you need L-Theanine. If you want enhanced focus, you need Lion’s Mane mushroom. If you want delicious flavor, you need vanilla, honey and monk fruit. Try the Mate Latte for coffee-level energy, focus and flavor, minus the jitters.',
  's2-cta': 'Experience it',
};
const img = (name) => `<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${LINK}" target="_blank" style="text-decoration:none;"><img src="${url(slices[name])}" width="600" alt="${ALT[name].replace(/"/g, '&quot;')}" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;"></a></td></tr>`;
const FONT = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";
const html = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;800;900&display=swap');
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { color:inherit; }
  .unsub-pill a { color:#004D27 !important; text-decoration:none !important; }
  .web-view-line a { color:#3B5344 !important; }
  @media only screen and (max-width:620px) { .wrap { width:100% !important; } }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F0EFDF" style="background:#F0EFDF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

<!-- ── 1 · 100MG OF CAFFEINE ──────────────────────────────────────── -->
${img('s1-hero')}
${img('s1-cta')}

<!-- ── 2 · EVERYTHING YOUR MORNINGS NEED ─────────────────────────── -->
${img('s2-hero')}
${img('s2-cta')}

<!-- ── FOOTER ─────────────────────────────────────────────────────── -->
<tr><td align="center" bgcolor="#F0EFDF" style="background:#F0EFDF;padding:34px 30px 36px;font-family:${FONT};color:#004D27;">
<a href="https://milonga.life" target="_blank"><img src="${url('footer-logo.png')}" width="${Math.round(logoMeta.width * 64 / logoMeta.height)}" height="64" alt="Milonga" style="display:block;margin:0 auto;height:64px;width:auto;border:0;"></a>
<div style="padding-top:18px;font-size:14px;font-weight:900;letter-spacing:2px;text-transform:uppercase;"><a href="https://milonga.life" target="_blank" style="color:#004D27;text-decoration:none;">milonga.life</a></div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0;"><tr><td class="unsub-pill" align="center" style="border:1.5px solid #004D27;border-radius:999px;padding:10px 24px;font-family:${FONT};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#004D27;">{% unsubscribe 'Unsubscribe' %}</td></tr></table>
<div class="web-view-line" style="padding-top:12px;font-size:11px;font-weight:600;color:#3B5344;">{% web_view %}</div>
<div style="padding-top:18px;font-size:11px;line-height:1.55;font-weight:600;color:#3B5344;">Contains caffeine. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</div>
<div style="padding-top:14px;font-size:11px;line-height:1.55;font-weight:700;color:#004D27;">{{ organization.name }} · {{ organization.full_address }}</div>
<div style="padding-top:4px;font-size:11px;line-height:1.55;font-weight:700;color:#004D27;"><a href="https://milonga.life" target="_blank" style="color:#004D27;text-decoration:none;">Milonga.life</a> · <a href="mailto:connect@milonga.life" style="color:#004D27;text-decoration:none;">connect@milonga.life</a></div>
</td></tr>

</table>
</td></tr>
</table>
`;
const { validate, report } = await import('./validate-klaviyo-email.mjs');
const problems = validate(html);
if (problems.length) { console.error(report(problems, 'mate-mornings.html (not written)')); process.exit(1); }
fs.writeFileSync(`${OUT}/mate-mornings.html`, html);
fs.unlinkSync(`${OUT}/_render.html`);
console.log('wrote', `${OUT}/mate-mornings.html`);
