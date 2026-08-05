# Milonga Email DS — sync notes

New, hand-built design system (not converted from a pre-existing repo). Source
shape: **package**. React + TypeScript, esbuild bundle. 23 components across
5 groups (Foundations, Layout, Blocks, Data, Blueprints). Brand: forest
`#004D27`, gold `#E3BC62`, leaf `#057441`, beige `#F0EFDF`, white. Font: Gotham.

## Compliance
- **Never** reference THC, CBD, cannabis, or weed in any content or preview.

## Build / re-sync
- Package build: `npm run build` (esbuild → `dist/index.es.js` + copies `dist/tokens.css`, `dist/fonts.css`, `dist/fonts/`; then `tsc` emits `dist/*.d.ts`).
- Converter entry: `--entry ./dist/index.es.js`, `--node-modules ./node_modules`, `--out ./ds-bundle`.
- Playwright render check: Chromium build **1194** is pre-installed at `/opt/pw-browsers` → install **playwright@1.56.0 + playwright-core@1.56.0** in `.ds-sync/` (that version pins revision 1194). `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` is already set.

## Assets (generated — regenerate if the source art changes)
- Logos: `scripts/make-logos.mjs` recolors `../ICONOS_1.png` (green source lockup) into gold/green/beige/white full lockups + hand-only marks under `public/logo/`. The recolor is luminance-thresholded (dark green→gold, light-green crown→soft gold); the hand-only crop is a centered box with a top-corner cleanup. If the source logo changes, re-tune the crop fractions in `make-logos.mjs`.
- Fonts: `public/fonts/Gotham-*.otf` were **user-provided** (from a free-download site — license is gray; the user owns using their brand font). `public/fonts/Montserrat.woff2` (one variable file, SIL OFL) is the email-safe fallback, fetched by `scripts/fetch-montserrat.mjs` from Google Fonts (needs network). `src/styles/fonts.css` + `src/styles/montserrat.css` are concatenated into `dist/fonts.css` at build and shipped via `cfg.extraFonts`.
- Docs/groups: `scripts/gen-docs.mjs` writes `docs/<Name>.md` (frontmatter `category` → DS pane group + a human blurb → `.prompt.md`).

## Styling model
- Components are **self-styling via inline styles** (CSS-in-JS-ish) plus a `:root`
  token stylesheet (`src/styles/tokens.css` → shipped `cssEntry`). No utility
  classes. `[CSS_RUNTIME]`-style is expected; the `--milonga-*` vars ride in the
  `styles.css` closure (they land in `_ds_bundle.css`).

## Known render warns
- None outstanding. `ComparisonTable` and `Stats` were flagged `[GRID_OVERFLOW]`
  (wide) and are pinned to `{"cardMode":"column"}` in `cfg.overrides` — that is
  intentional, not a new warn.

## Upload status
- **Not yet uploaded.** DesignSync authorization is unavailable in this remote
  environment (no interactive `/design-login`), so no claude.ai/design project was
  created and `projectId` is unset. The validated bundle sits at `ds-bundle/`.
  To finish: authorize DesignSync, create a DS project, record its `projectId`
  here + in `config.json`, then upload `ds-bundle/` (incremental/atomic per the
  skill). Everything up to upload is done and reproducible.

## Re-sync risks (watch-list)
- Gotham license is gray; a future run may need to swap the files.
- Montserrat is fetched from Google Fonts at asset-gen time — network-dependent;
  the committed `public/fonts/Montserrat.woff2` removes that dependency for builds.
- Logo recolor thresholds are tuned to the current `ICONOS_1.png`; new source art
  needs re-tuning.
- `conventions.md` is human-editable — validate its names against the build on
  each re-sync, don't rewrite it.
