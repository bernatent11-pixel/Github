import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1320, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('file:///home/user/Github/email-ds/ds-bundle/_showcase.html');
await page.waitForTimeout(1500); // let fonts + react render
await page.screenshot({ path: '/tmp/milonga-showcase.png', fullPage: true });
await browser.close();
console.log('wrote /tmp/milonga-showcase.png');
