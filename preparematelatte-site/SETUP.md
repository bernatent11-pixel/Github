# Setup — one-time, then never again

This folder is a **complete, ready-to-deploy website** for
`preparematelatte.milonga.life`, the business-card QR destination. Everything
is finished except one step that requires a human: creating the repository.

## Why it isn't live yet

GitHub Pages serves **one custom domain per repository**. The main repo already
claims `matelatte.milonga.life` for the mate latte sales page — pointing it here
would take that page offline (this was tried once already and reverted). So this
site needs its own repo.

The automation token used by Claude Code cannot create repositories
(`403 Resource not accessible by integration`), so a person has to do it.

## Step 1 — create the repo (30 seconds, once)

At <https://github.com/new>:

- **Owner:** `bernatent11-pixel`
- **Name:** `preparematelatte`
- **Visibility:** Public (Pages requires it on free plans)
- Tick **Add a README file** so a `main` branch exists

## Step 2 — push this folder to it

Copy the *contents* of this folder (not the folder itself) to the root of the
new repo and push to `main`:

```sh
git clone https://github.com/bernatent11-pixel/preparematelatte.git
cp -r preparematelatte-site/. preparematelatte/
cd preparematelatte && git add -A && git commit -m "Publish landing page" && git push
```

That's it. The included workflow enables Pages automatically and deploys. The
site is live at <https://preparematelatte.milonga.life> within a couple of
minutes, with HTTPS provisioned by GitHub.

DNS is **already done** — `preparematelatte.milonga.life` resolves to GitHub's
Pages servers. Nothing to change in GoDaddy.

## When the design is ready

Replace `index.html` with the designed page and push to `main`. That's the
whole process — the domain, DNS, HTTPS, deploy pipeline and 404 handling are
already wired and don't change.

Rules that keep the printed QR code working:

- Keep the landing page at the **domain root** (`index.html`)
- **Never** edit or delete `CNAME` — the workflow fails the build if you do
- Keep asset paths **relative** (`assets/x.png`, not `/assets/x.png`)
- Load any external resource over `https://` so the padlock stays clean

## What each file does

| File | Purpose |
| --- | --- |
| `index.html` | The landing page — currently a branded holding page |
| `404.html` | Branded fallback for any unknown path |
| `CNAME` | Claims `preparematelatte.milonga.life` for this repo |
| `.nojekyll` | Serves files as-is, no Jekyll processing |
| `.github/workflows/deploy.yml` | Enables Pages, verifies `CNAME`, deploys `main` |

## Guards against the failure we already hit

The site 404'd before because DNS pointed at GitHub while no repo claimed the
hostname, and because Pages published from a branch nobody had checked. The
workflow closes both holes:

1. It deploys from `main` via GitHub Actions — there is no "which branch does
   Pages serve?" question, and no manual Settings step to forget.
2. It **fails the build** if `CNAME` is missing or doesn't match the expected
   hostname, so a domain-level 404 shows up as a red build instead of being
   discovered by scanning a printed card.
