// Renders a carousel harness and cuts it into 1080x1350 slides.
//
// The trick that keeps one set of design numbers serving both destinations:
// author at 600px wide, shoot at deviceScaleFactor 1.8, land on 1080. A slide
// is 600x750 in design units, which is 1080x1350 on the way out — 4:5 exactly,
// with no separate tuning pass for the feed.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, readdirSync, rmSync } from 'fs';

const page_ = process.argv[2];                 // harness html in refine/
const outDir = process.argv[3];                // where the slides land
const SCALE = 1.8, W = 600 * SCALE, H = 750 * SCALE;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 600, height: 750 }, deviceScaleFactor: SCALE });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`file:///home/user/Github/email-ds/refine/${page_}`);
await page.waitForTimeout(1800);
const shot = '/tmp/carousel-full.png';
await page.screenshot({ path: shot, fullPage: true });
await browser.close();
if (errs.length) { console.log('PAGE ERRORS:', errs.slice(0, 2).join(' | ')); process.exit(1); }

const meta = await sharp(shot).metadata();
const n = Math.round(meta.height / H);
mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) if (f.endsWith('.jpg')) rmSync(`${outDir}/${f}`);
for (let i = 0; i < n; i++) {
  await sharp(shot).extract({ left: 0, top: Math.round(i * H), width: Math.round(W), height: Math.round(H) })
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    .toFile(`${outDir}/slide-${String(i + 1).padStart(2, '0')}.jpg`);
}
console.log(`${outDir}: ${n} slides at ${W}x${H} (source ${meta.width}x${meta.height})`);
