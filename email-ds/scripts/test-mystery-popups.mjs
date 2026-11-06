// Checks both mystery-offer pop-ups against a stubbed Klaviyo (nothing is
// sent): a bad email is refused; a good one subscribes to Mate Latte Signups
// (Vx3Tn4) with profile property source = the variant, and shows the
// thank-you with the address; a Klaviyo error keeps the form with a message.
import { chromium } from 'playwright';
const b = await chromium.launch();
let pass = true;
for (const variant of ['ads_lp', 'main_site']) {
  for (const status of [202, 400]) {
    const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
    let body = null, url = null;
    await p.route('https://a.klaviyo.com/**', (r) => { url = r.request().url(); body = JSON.parse(r.request().postData());
      r.fulfill({ status, headers: { 'access-control-allow-origin': '*' }, body: '' }); });
    await p.goto(`file://${process.cwd()}/popups/mate-latte-mystery/preview-${variant}.html`);
    await p.waitForTimeout(400);
    await p.fill('#mlg-mo-email', 'nope'); await p.click('.mlg-mo__form .mlg-mo__btn');
    const err1 = await p.textContent('.mlg-mo__err');
    await p.fill('#mlg-mo-email', 'sam@example.com'); await p.click('.mlg-mo__form .mlg-mo__btn');
    await p.waitForTimeout(400);
    const done = await p.isVisible('.mlg-mo__done');
    const sent = await p.textContent('.mlg-mo__sent');
    const err2 = await p.textContent('.mlg-mo__err');
    const a = body?.data?.attributes, prof = a?.profile?.data?.attributes;
    const ok = status === 202
      ? err1.includes('valid') && done && sent === 'sam@example.com' && url.includes('company_id=TwvSnK')
        && body.data.relationships.list.data.id === 'Vx3Tn4' && prof.email === 'sam@example.com'
        && prof.properties.source === variant && prof.subscriptions.email.marketing.consent === 'SUBSCRIBED'
        && a.custom_source === 'Mystery offer pop-up · ' + variant
      : !done && err2.includes('try again');
    console.log(variant, status, ok ? 'PASS' : 'FAIL', status === 202 ? JSON.stringify({ list: body.data.relationships.list.data.id, source: prof.properties.source, custom_source: a.custom_source }) : '');
    pass = pass && ok;
    await p.close();
  }
}
await b.close();
process.exit(pass ? 0 : 1);
