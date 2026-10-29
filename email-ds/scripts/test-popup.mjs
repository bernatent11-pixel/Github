// Checks the pop-up's form against a stubbed Klaviyo (nothing is sent):
// a bad email is refused, a good one posts the right subscription and shows
// the code, and a Klaviyo error keeps the form with a message.
import { chromium } from 'playwright';
const b = await chromium.launch();
const run = async (status) => {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  let body = null;
  await p.route('https://a.klaviyo.com/**', (r) => { body = { url: r.request().url(), headers: r.request().headers(), json: JSON.parse(r.request().postData()) };
    r.fulfill({ status, headers: { 'access-control-allow-origin': '*' }, body: '' }); });
  await p.goto('file:///home/user/Github/email-ds/popups/halloween-welcome/preview.html');
  await p.waitForTimeout(500);
  await p.fill('#mlg-pop-email', 'not-an-email'); await p.click('.mlg-pop__form .mlg-pop__btn');
  const err1 = await p.textContent('.mlg-pop__err');
  await p.fill('#mlg-pop-email', 'sam@example.com'); await p.click('.mlg-pop__form .mlg-pop__btn');
  await p.waitForTimeout(400);
  const doneShown = await p.isVisible('.mlg-pop__done');
  const err2 = await p.textContent('.mlg-pop__err');
  const stored = await p.evaluate(() => localStorage.getItem('mlg_pop_halloween15'));
  await p.close();
  return { status, err1, doneShown, err2, stored, body };
};
const ok = await run(202), bad = await run(400);
await b.close();
console.log(JSON.stringify({ ok, bad: { ...bad, body: undefined } }, null, 1));
const pass = ok.err1.includes('valid') && ok.doneShown && ok.stored === 'joined'
  && ok.body.url.includes('company_id=TwvSnK') && ok.body.json.data.relationships.list.data.id === 'XCBbqf'
  && ok.body.json.data.attributes.profile.data.attributes.email === 'sam@example.com'
  && !bad.doneShown && bad.err2.includes('try again');
console.log(pass ? 'PASS' : 'FAIL'); process.exit(pass ? 0 : 1);
