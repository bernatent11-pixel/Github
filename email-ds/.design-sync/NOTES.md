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

## Design direction (locked with the user, step by step)
- **One flat background per email** — `forest` / `gold` / `beige`. No white cards,
  no alternating bands. `src/theme.ts` (`onBg`) is the single contrast map: it
  decides logo tone, title/body/accent colors, rules, button fills and all depth
  tokens per background. Components take `bg` and never hard-code colors.
- **Header**: flat bg + centered logo at 92px, no tagline. Gold logo on dark
  green, cream on gold, brand green on beige (the cream-on-gold choice was the
  user's — the dark green logo read muddy on gold).
- **Hero**: eyebrow -> uppercase headline (34px) -> body -> image -> CTA. Omit
  the image for a typographic hero.
- **Images**: a regular photo is inset + rounded; a `cutout` (transparent PNG)
  runs full width, square corners, `object-fit: contain` so it fits exactly.
- **Body**: open hairlines as the default rhythm, `Panel` for grouping.
  TextImage supports `stacked` and `side`.
- **Tables**: `rows` is the default style; `lane` when Milonga should visually
  win; `grid` for dense data.
- **Steps**: ships both `numerals` (oversized 01/02/03) and `discs`.
- **Typography**: ALL titles and ALL buttons are uppercase (components apply
  `text-transform`; pass sentence case). Quotes stay sentence case. Body copy is
  deliberately a step smaller than the first design pass.
- **Depth**: everything (blocks, charts, buttons, numerals, photos) carries
  elevation/gradients/shadows so nothing reads flat. Hover lift is CSS-only and
  applies where supported; email clients keep the static depth.
- **Beige gotcha**: raised fills must stay a WARM tint of the beige. Anything
  near-white re-introduces the white-card look the user explicitly rejected —
  this was tuned down twice.
- **Color mixing (added after the first pass — the user asked for less flatness)**:
  1. **Two-tone titles**: `TwoToneTitle` splits every headline across two brand
     colors. On forest that is beige + gold (the user's explicit ask). The user
     then fixed the other two: **gold bg -> beige titles**, **beige bg -> dark
     green titles throughout** (both halves the same, so the split is a no-op
     there). Beige-on-gold is a low-contrast pairing (~1.6:1) carried by caps +
     Gotham Black + a deepened text shadow — don't "fix" it to green. Hero/SectionHeading/TextImage apply it
     automatically; `titleAccentPart` overrides the split, `flatTitle` disables.
  2. **Mixed backgrounds**: a Section may carry its own `bg`, so an email can go
     e.g. forest → gold → forest. Put `SectionBreak` at each seam (`hard` or
     `fade`). Every block inside a switched section must be passed that section's
     `bg`. EducationalEmail ships this via its `accentBg` prop.
  3. **Body + icon colors (user-specified)**: body text is WHITE on forest and
     gold, BLACK on beige. Icons use a dedicated `icon` token (separate from
     `accent`, added so icons could change without dragging eyebrows/figures to
     low contrast): gold on forest, beige on gold, dark green on beige.
     Caveat flagged to the user: beige icons on gold (the ComparisonTable
     checkmarks especially) are very low contrast — they asked for it, but if
     legibility complaints come back, that is the first thing to revisit.
  4. **Gold is no longer all-dark-green**: gold's accent is now leaf `#057441`
     (eyebrows, icons, title tails) with `forestDeep` for primary type.
- **Footer**: hairline, primary lockup (84px), uppercase social links, the
  `MILONGA YERBA MATE` brand line, then unsubscribe / view in browser. No
  "YERBA MATE" kicker and no tagline — the user removed both.

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
