// Renders a carousel harness and cuts it into slides.
//
// The trick that keeps one set of design numbers serving both destinations:
// author at 600px wide, shoot at a device scale factor, land on whatever the
// destination wants. A slide is 600x750 in design units — 4:5 exactly — so
// 1.8x is the feed's native 1080x1350 and 5.12x is 3072x3840, a 4K master.
//
//   node scripts/shoot-carousel.mjs <harness.html> <outDir> [scale]
//
// Above about 2x the slides are shot one at a time with a clip rather than as
// one tall fullPage image: a five-slide strip at 4K is 3072 x 19200, which is
// 180MB of raw pixels to hold and cut in one go.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, readdirSync, rmSync } from 'fs';

const page_ = process.argv[2];                 // harness html in refine/
const outDir = process.argv[3];                // where the slides land
const SCALE = Number(process.argv[4] ?? 1.8);
const W = Math.round(600 * SCALE), H = Math.round(750 * SCALE);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 600, height: 750 }, deviceScaleFactor: SCALE });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`file:///home/user/Github/email-ds/refine/${page_}`);
await page.waitForTimeout(1800);
if (errs.length) { console.log('PAGE ERRORS:', errs.slice(0, 2).join(' | ')); process.exit(1); }

const docH = await page.evaluate(() => document.documentElement.scrollHeight);
const n = Math.round(docH / 750);
mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) if (f.endsWith('.jpg')) rmSync(`${outDir}/${f}`);

for (let i = 0; i < n; i++) {
  const buf = await page.screenshot({ fullPage: true, clip: { x: 0, y: i * 750, width: 600, height: 750 } });
  await sharp(buf)
    // A clip lands on the device pixel grid, so it can come back a pixel out.
    // Resizing to the exact frame keeps every slide identical.
    .resize(W, H, { fit: 'fill' })
    .jpeg({ quality: SCALE > 2 ? 95 : 90, chromaSubsampling: '4:4:4' })
    .toFile(`${outDir}/slide-${String(i + 1).padStart(2, '0')}.jpg`);
}
await browser.close();
console.log(`${outDir}: ${n} slides at ${W}x${H}`);
