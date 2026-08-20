# Milonga — Pre-launch Landing Page

A single-file, self-contained landing page for the **Milonga** food & beverage
pre-launch. Its primary goal is **collecting email signups** for the waitlist.

## Run it

It's just one file — open `index.html` in any browser. No build step, no
dependencies. Deploy by dropping it on Netlify, Vercel, GitHub Pages, Cloudflare
Pages, or any static host.

## Hosting

This site is served by GitHub Pages on a custom subdomain, deliberately
**outside** Shopify so the pages can be designed freely:

| URL | File |
| --- | --- |
| `https://preparematelatte.milonga.life/` | `index.html` (mate latte landing page) |
| `https://preparematelatte.milonga.life/link` | `link/index.html` (business-card page) |

The subdomain comes from the root `CNAME` file. DNS lives in **GoDaddy** under
`milonga.life`: a `CNAME` record with host `preparematelatte` pointing to
`bernatent11-pixel.github.io`. The apex `milonga.life` still points at Shopify
and is untouched.

## Business-card page (`/link/`)

`link/index.html` is the destination for the QR code printed on Milonga
business cards. It's currently a branded holding page ("Something's brewing")
so a scan never lands on a 404. Replace its contents with the real landing
page when it's designed.

**Never rename or move the `link/` folder, and never change the `CNAME`
file** — that URL is printed on business cards.

## If the site 404s

Two different 404s are possible, with different causes:

1. **"There isn't a GitHub Pages site here"** — GitHub doesn't know the domain.
   The root `CNAME` file is missing from the branch Pages publishes from
   (Settings → Pages → Source). DNS pointing at GitHub is not enough on its
   own: a repo has to claim the hostname with a `CNAME` file **on the published
   branch**. Merge the branch carrying `CNAME`, or restore the file if deleted.
2. **The branded "This page wandered off" page** — the domain works, but that
   path doesn't exist. Check the path against the table above.

`404.html` at the repo root is served for any unmatched path, so a stale or
mistyped URL always lands on something branded rather than a bare GitHub error.

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
