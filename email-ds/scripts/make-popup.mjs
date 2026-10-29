// Builds the Halloween welcome pop-up from popups/halloween-welcome/popup.src.html:
//   popup.html   — paste-ready for Shopify, images on Klaviyo's CDN (hosted.json)
//   preview.html — a stand-in store page with the pop-up open, local images,
//                  for renders (?step=done shows the code screen)
import fs from 'node:fs';

const DIR = 'popups/halloween-welcome';
const src = fs.readFileSync(`${DIR}/popup.src.html`, 'utf8');

const preview = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Pop-up preview</title>
<style>body{margin:0;background:#F0EFDF;font-family:Arial,sans-serif;color:#004D27}
.site{max-width:1100px;margin:0 auto;padding:28px}.bar{height:56px;border-bottom:1px solid #d9d6c3;margin-bottom:28px}
.blk{height:220px;background:#e4e0ca;border-radius:14px;margin-bottom:18px}</style></head><body>
<div class="site"><div class="bar"></div><div class="blk"></div><div class="blk"></div><div class="blk"></div></div>
${src.replaceAll('%IMG%', 'img')}
<script>MilongaPopup.open();if(/step=done/.test(location.search)){document.querySelector('.mlg-pop__form').hidden=true;document.querySelector('.mlg-pop__done').hidden=false;}</script>
</body></html>`;
fs.writeFileSync(`${DIR}/preview.html`, preview);

const hostedFile = `${DIR}/hosted.json`;
if (fs.existsSync(hostedFile)) {
  const hosted = JSON.parse(fs.readFileSync(hostedFile, 'utf8'));
  const out = src.replace(/%IMG%\/([\w.-]+)/g, (m, f) => {
    if (!hosted[f]) throw new Error(`no hosted URL for ${f} in hosted.json`);
    return hosted[f];
  });
  if (out.includes('%IMG%')) throw new Error('unreplaced image path');
  fs.writeFileSync(`${DIR}/popup.html`, out);
  console.log('wrote', `${DIR}/popup.html`, (out.length / 1024).toFixed(1) + ' KB');
} else {
  console.log('no hosted.json yet: popup.html not written (upload img/ first)');
}
console.log('wrote', `${DIR}/preview.html`);
