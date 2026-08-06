// Iterative refine harness: renders ds-bundle/_refine.html and screenshots it.
// Usage: node scripts/shoot.mjs [out.png] [width]
import { chromium } from 'playwright';
const out = process.argv[2] ?? '/tmp/refine.png';
const width = Number(process.argv[3] ?? 1180);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto('file:///home/user/Github/email-ds/ds-bundle/_refine.html');
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
if (errs.length) console.log('PAGE ERRORS:', errs.slice(0, 3).join(' | '));
console.log('wrote', out);
