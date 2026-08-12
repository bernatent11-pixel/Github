# Milonga — Pre-launch Landing Page

A single-file, self-contained landing page for the **Milonga** food & beverage
pre-launch. Its primary goal is **collecting email signups** for the waitlist.

## Run it

It's just one file — open `index.html` in any browser. No build step, no
dependencies. Deploy by dropping it on Netlify, Vercel, GitHub Pages, Cloudflare
Pages, or any static host.

## Business-card page

The QR code on Milonga business cards points to:

```
https://milonga.life/link
```

That page does **not** live in this repo — it's a Shopify page on the live
store (handle `link`, so `/pages/link`), with a Shopify URL redirect from
`/link` to shorten it. It's currently a branded holding page ("Something's
brewing"); edit it in Shopify admin under **Online Store → Pages → Milonga**
when the real landing page is designed.

**Never change the page handle or delete the `/link` redirect** — that URL is
printed on business cards.

## Connect the waitlist (important)

By default the email form stores submissions in the browser's `localStorage`
so you can test it. To actually collect emails, set the `ENDPOINT` constant
near the bottom of `index.html`:

```js
const ENDPOINT = "https://formspree.io/f/xxxxxxx";
```

Works with any form backend that accepts a JSON `POST` with an `email` field —
e.g. [Formspree](https://formspree.io), Mailchimp, ConvertKit, Buttondown, a
Google Form, or your own API.

## Customize

Everything lives in `index.html`:

- **Brand & copy** — search for `Milonga`, the hero headline, and feature cards.
- **Colors & fonts** — the `:root` CSS variables at the top (ember/gold/cream
  palette, plus the Fraunces + Inter Google Fonts).
- **Product visual** — the CSS "bottle" mockup in the hero. Swap it for a real
  product photo when you have one (replace the `.visual` block with an `<img>`).
- **Social links & launch date** — in the stats strip and footer.

## Notes

The current content is a tasteful starting point with placeholder specifics
(launch quarter, signup count, social URLs). Update those with real numbers
before going live.
