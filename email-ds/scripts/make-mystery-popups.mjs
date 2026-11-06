// The two "Unlock a mystery offer" pop-ups, built from
// popups/mate-latte-mystery/popup.src.html:
//   A) popup-ads-lp.html     — matelatte.milonga.life, cold Meta traffic,
//                              one line on what the Mate Latte is
//   B) popup-main-site.html  — milonga.life, warm and cold; wrapped in Shopify
//                              Liquid so logged-in customers with an order
//                              never see an offer they can't use
// Both sign people up to "Mate Latte Signups" with profile property source.
// Also writes a local preview per variant (?step=done shows the thank-you).
//
// Usage: node scripts/make-mystery-popups.mjs
import fs from 'node:fs';

const DIR = 'popups/mate-latte-mystery';
const src = fs.readFileSync(`${DIR}/popup.src.html`, 'utf8');
const hosted = fs.existsSync(`${DIR}/hosted.json`) ? JSON.parse(fs.readFileSync(`${DIR}/hosted.json`, 'utf8')) : null;

const VARIANTS = {
  ads_lp: {
    file: 'popup-ads-lp.html',
    label: 'ADS LANDING PAGE (matelatte.milonga.life)',
    eyebrow: 'New here? Welcome',
    body: 'Meet the Mate Latte: creamy vanilla yerba mate with 100mg of natural caffeine, ready in 30 seconds. Sign up and your offer lands in your inbox right away.',
    delay: 10000, scroll: 0.5, exit: true,
  },
  main_site: {
    file: 'popup-main-site.html',
    label: 'MAIN WEBSITE (milonga.life)',
    eyebrow: 'A little something for you',
    body: 'Join the Milonga list and your offer lands in your inbox right away. It’s yours for 72 hours from the moment you sign up.',
    delay: 6000, scroll: 0.4, exit: true,
    liquid: ['{% unless customer and customer.orders_count > 0 %}', '{% endunless %}'],
  },
};

const fill = (v, img) => src
  .replaceAll('%VARIANT_LABEL%', v.label).replaceAll('%SOURCE%', v.key)
  .replaceAll('%EYEBROW%', v.eyebrow).replaceAll('%BODY%', v.body)
  .replaceAll('%DELAY_MS%', String(v.delay)).replaceAll('%SCROLL_SHARE%', String(v.scroll))
  .replaceAll('%EXIT_INTENT%', String(v.exit))
  .replace(/%IMG%\/([\w.-]+)/g, (m, f) => img(f));

for (const [key, v] of Object.entries(VARIANTS)) {
  v.key = key;
  const preview = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pop-up preview · ${key}</title><style>body{margin:0;background:#F0EFDF;font-family:Arial,sans-serif}
.site{max-width:1100px;margin:0 auto;padding:28px}.bar{height:56px;border-bottom:1px solid #d9d6c3;margin-bottom:28px}
.blk{height:220px;background:#e4e0ca;border-radius:14px;margin-bottom:18px}</style></head><body>
<div class="site"><div class="bar"></div><div class="blk"></div><div class="blk"></div><div class="blk"></div></div>
${fill(v, (f) => `img/${f}`)}
<script>MilongaMysteryPopup.open();if(/step=done/.test(location.search)){document.querySelector('.mlg-mo__sent').textContent='sam@example.com';document.querySelector('.mlg-mo__form').hidden=true;document.querySelector('.mlg-mo__done').hidden=false;}</script>
</body></html>`;
  fs.writeFileSync(`${DIR}/preview-${key}.html`, preview);
  if (hosted) {
    let out = fill(v, (f) => { if (!hosted[f]) throw new Error('no hosted URL for ' + f); return hosted[f]; });
    if (v.liquid) out = `${v.liquid[0]}\n${out}\n${v.liquid[1]}\n`;
    fs.writeFileSync(`${DIR}/${v.file}`, out);
    console.log('wrote', `${DIR}/${v.file}`);
  }
  console.log('wrote', `${DIR}/preview-${key}.html`);
}
if (!hosted) console.log('no hosted.json yet: paste-ready files not written (upload img/ first)');
