# Mystery offer pop-up: two ways to put it live

Pick ONE per site. If both run on the same site, people get two pop-ups.

| | A. Custom-coded pop-up (recommended) | B. Klaviyo's sign-up form builder |
|---|---|---|
| Files | `../popup-main-site.html`, `../popup-ads-lp.html` | the HTML blocks in this folder plus the steps below |
| Looks like the mock-ups | exactly (copy sits in the photo's gap on desktop and phone) | close; the builder controls spacing and fonts |
| Tap-to-copy code tag | yes, built in | yes, through Klaviyo's Coupon block |
| Feeds Klaviyo | yes: list Mate Latte Signups, `source` property | yes: same list, `source` as a hidden field |
| Where it goes | Shopify theme (and the ads landing page's custom code) | Klaviyo → Sign-up forms |

Both send "Start shopping" to the home page through Shopify's discount link
(`https://milonga.life/discount/WELCOME15?redirect=%2F`), so the code is
already applied when they reach checkout.

---

## A. Custom-coded pop-up

**Main site (milonga.life):** Shopify admin → Online Store → Themes → Customize →
Footer → Add section → **Custom Liquid** → paste all of `popup-main-site.html` → Save.
It already hides itself from logged-in customers who have ordered before, from
people who came in from one of our emails, and on cart, checkout and account pages.

**Ads landing page (matelatte.milonga.life):** paste all of `popup-ads-lp.html`
into that page builder's custom code / footer HTML area (before `</body>`).

**Test:** open the page with `?mlg_pop=1` at the end of the URL to force the pop-up open.

---

## B. Klaviyo sign-up form builder

Klaviyo's HTML block only allows a limited list of tags and strips scripts. That's
why the snippets here are plain text and inline styles, and why the email field,
buttons and code tag are Klaviyo's own blocks. The HTML block is on paid plans and
is still rolling out. If you don't see it, use Text blocks with the same words,
in Times New Roman for the title.

Build one form per site (or one form with two URL-targeted versions):

**Form settings**
- Type: **Popup**. Desktop width: custom, about **900px**. Corner radius 24. Close "X" on.
- Background image, desktop: `https://cdn.klaviyomail.com/company/TwvSnK/images/680a7923-416c-4703-b38f-e98181888b05.jpeg` (cover, centered)
- Background image, mobile: `https://cdn.klaviyomail.com/company/TwvSnK/images/cf01afd8-c1e9-4743-9477-bdbd31fa9abe.jpeg` (cover, centered)
- Push the content into the photo's gap with form padding. Desktop: about **36% left, 33% right, 32% top**
  (on a 900px form: left 330, right 300, top 190). Mobile: left/right 28, top about **22%** of the height.
- List: **Mate Latte Signups** (Vx3Tn4)
- Hidden field: `source` = `main_site` (main site form) or `ads_lp` (ads landing page form)

**Step 1: sign-up**
1. HTML block: `html-block-step1-main-site.html` or `html-block-step1-ads-lp.html`
2. Email field: placeholder "Your email address", required, rounded (pill), white fill, forest #004D27 border
3. Button: **Unlock my offer**, action **Submit form**, fill #004D27, white bold uppercase text, pill
4. Button: **No thanks**, action **Close form**, no fill, text #2F4A39, small uppercase, underlined
5. Text (10–11px, #5B5232): "New customers only. One per person. By signing up you agree to receive marketing emails from Milonga. Unsubscribe anytime."

**Step 2: success**
1. HTML block: `html-block-step2-reveal.html` (¡Listo! You unlocked / 15% off / your first order)
2. **Coupon block**: Static coupon, code **WELCOME15**. Style it as the tag: dashed forest border, cream fill, forest text.
   Shoppers tap it to copy the code. Check the copy behavior in Klaviyo's preview before publishing.
3. Text (13px, #2F4A39): "Tap to copy, then paste it at checkout."
4. Button: **Start shopping**, action **Go to URL** → `https://milonga.life/discount/WELCOME15?redirect=%2F`
5. Text (10px): "One use per customer. Valid on one-time purchases."

**Targeting & behavior**
- Show on: main site form → milonga.life. Ads form → matelatte.milonga.life (that page must load Klaviyo's onsite script, company ID TwvSnK).
- Timing: main site after 6 s or 40% scroll; ads page after 10 s or 50% scroll. Exit intent on desktop for both.
- Don't show to existing subscribers. On the main site, also exclude people who have placed an order.
- After someone closes it, don't show it again for 7 days.
- Turn off any other pop-up on the same pages (e.g. the Halloween one).
