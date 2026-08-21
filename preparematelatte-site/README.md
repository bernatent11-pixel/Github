# preparematelatte.milonga.life

The landing page behind the QR code on Milonga business cards.

```
https://preparematelatte.milonga.life
```

Currently a branded holding page ("Something's brewing") so a scan never lands
on a 404. Replace `index.html` when the real page is designed.

## Why this is its own repo

GitHub Pages serves **one custom domain per repository**. The main
`bernatent11-pixel/Github` repo already claims `matelatte.milonga.life` for the
mate latte sales page. Pointing that repo here would un-serve that domain and
404 a live sales page — which has already happened once and had to be reverted.
Keeping this separate means the two pages can never knock each other offline.

## How it deploys

Push to `main` → the workflow in `.github/workflows/deploy.yml` publishes the
repo root to Pages. Pages is enabled by the workflow itself, and the workflow
**fails the build** if `CNAME` is missing or doesn't match the expected
hostname — the exact failure that silently 404s a custom domain.

## DNS

In **GoDaddy**, under `milonga.life`:

| Type | Host | Points to |
| --- | --- | --- |
| `CNAME` | `preparematelatte` | `bernatent11-pixel.github.io` |

The apex `milonga.life` points at Shopify and is unrelated to this repo.

## Don't break the QR code

The domain is printed on physical business cards. Never change the `CNAME`
file, and keep the landing page at the domain root (`index.html`).
