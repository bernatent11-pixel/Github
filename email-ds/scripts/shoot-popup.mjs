// Renders popups/halloween-welcome/preview.html at a viewport size.
// Usage: node scripts/shoot-popup.mjs out.png width height [?step=done]
import { chromium } from 'playwright';
const [out, w, h, q=''] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width:+w, height:+h }, deviceScaleFactor: 2 });
const errs=[]; p.on('pageerror', e=>errs.push(String(e))); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
await p.goto('file:///home/user/Github/email-ds/popups/halloween-welcome/preview.html'+q);
await p.waitForTimeout(1500);
await p.screenshot({ path: out });
await b.close(); if (errs.length) console.log('ERR', errs.join(' | ')); console.log('wrote', out);
