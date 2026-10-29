// Loads the paste-ready popup.html (Klaviyo-hosted images) in a blank page,
// opens it and screenshots it, to confirm the hosted images load.
// Usage: node scripts/check-popup-live.mjs out.png
import fs from 'node:fs';
import { chromium } from 'playwright';
const html = fs.readFileSync('popups/halloween-welcome/popup.html', 'utf8');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
const failed = [];
p.on('requestfailed', (r) => failed.push(r.url()));
p.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
await p.setContent(`<!doctype html><html><body style="margin:0;background:#F0EFDF">${html}</body></html>`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.MilongaPopup.open());
await p.waitForTimeout(800);
await p.screenshot({ path: process.argv[2] });
await b.close();
console.log(failed.length ? 'FAILED: ' + failed.join(' | ') : 'all requests ok');
