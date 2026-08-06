// Iterative refine harness: renders a page from refine/ and screenshots it.
// Usage: node scripts/shoot.mjs [out.png] [width] [page.html]
import { chromium } from 'playwright';
const out = process.argv[2] ?? '/tmp/refine.png';
// Default to the email's own width so previews are edge-to-edge — no page
// background showing as gutters beside the email.
const width = Number(process.argv[3] ?? 600);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
const harness = process.argv[4] ?? 'index.html';
await page.goto(`file:///home/user/Github/email-ds/refine/${harness}`);
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
if (errs.length) console.log('PAGE ERRORS:', errs.slice(0, 3).join(' | '));
console.log('wrote', out);
