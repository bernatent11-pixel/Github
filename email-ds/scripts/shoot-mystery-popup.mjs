// Renders a mystery-offer pop-up preview at a viewport size.
// Usage: node scripts/shoot-mystery-popup.mjs <ads_lp|main_site> out.png width height [?step=done]
import { chromium } from 'playwright';
const [variant, out, w, h, q = ''] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
await p.goto(`file://${process.cwd()}/popups/mate-latte-mystery/preview-${variant}.html${q}`);
await p.waitForTimeout(1500);
await p.screenshot({ path: out });
await b.close(); if (errs.length) console.log('ERR', errs.join(' | ')); console.log('wrote', out);
