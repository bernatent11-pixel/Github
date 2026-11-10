// Black Friday website hero: Bernat's product scene (src-hero-109.jpg, 2000x858) with the offer on
// the left, in the email system's type: Times New Roman titles (regular + bold italic), Montserrat
// 700/500 for the small lines, white on a soft dark fade from the left edge, gold accents.
//
//   exports/web/bf-hero/bf-hero.jpg      2000x858, for the site's hero slot
//   exports/web/bf-hero/bf-hero@2x.jpg   4000x1716 (sharper on retina screens, same layout)
//
// Usage: node scripts/make-bf-hero.mjs
import fs from 'node:fs';
import { chromium } from 'playwright';

const DIR = 'exports/web/bf-hero';
const bg = fs.readFileSync(`${DIR}/src-hero-109.jpg`).toString('base64');
const montserrat = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
const GOLD = '#E3BC62';

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${montserrat}) format('woff2');font-weight:100 900}
html,body{margin:0;padding:0}
.hero{position:relative;width:2000px;height:858px;overflow:hidden;background:#C8875F url(data:image/jpeg;base64,${bg}) center/cover no-repeat}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(40,14,10,.62) 0%,rgba(40,14,10,.50) 28%,rgba(40,14,10,.22) 44%,rgba(40,14,10,0) 54%)}
.copy{position:absolute;left:118px;top:50%;transform:translateY(-50%);width:820px;color:#fff;text-shadow:0 2px 18px rgba(30,8,6,.25)}
.eyebrow{font-family:Montserrat,Arial,sans-serif;font-weight:700;font-size:24px;letter-spacing:7px;text-transform:uppercase;color:${GOLD}}
.t1{margin-top:0;font-family:'Times New Roman',Times,'Liberation Serif',serif;font-weight:400;font-size:118px;line-height:112px}
.t2{font-family:'Times New Roman',Times,'Liberation Serif',serif;font-weight:700;font-style:italic;font-size:86px;line-height:96px}
.t2 b{color:${GOLD};font-weight:700}
.rule{margin:30px 0 0;width:84px;height:3px;background:${GOLD};border-radius:2px}
.small{margin-top:24px;font-family:Montserrat,Arial,sans-serif;font-weight:500;font-size:28px;line-height:36px;color:#FFF6EC}
</style></head><body><div class="hero"><div class="fade"></div>
<div class="copy">
  <div class="t1">Black Friday</div>
  <div class="t2">Up to <b>30% off</b><br>site-wide.</div>
  <div class="rule"></div>
  <div class="small">Our biggest sale of the year.</div>
</div></div></body></html>`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
for (const [scale, name] of [[1, 'bf-hero.jpg'], [2, 'bf-hero@2x.jpg']]) {
  const page = await browser.newPage({ viewport: { width: 2000, height: 858 }, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${DIR}/${name}`, type: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 2000, height: 858 } });
  await page.close();
  console.log('wrote', `${DIR}/${name}`);
}
await browser.close();
