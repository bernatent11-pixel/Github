# @milonga/email-ds

Milonga's **email design system** — on-brand, ready-made React blocks for building
marketing emails in the new Milonga branding, and the source for syncing that
system into **Claude Design** (claude.ai/design) so the design agent builds every
email out of these real components.

## What's inside

23 components in five groups:

- **Foundations** — `Logo` (gold/green/beige/white × mark/primary/full lockups), `Icon`, `Divider`
- **Layout** — `EmailShell`, `Section`, `SectionHeading`, `Header`, `Footer`
- **Blocks** — `Hero`, `Button`, `ImageSlot`, `ProductCard`, `Callout`, `List`
- **Data** — `BenefitsGrid`, `IngredientList`, `ComparisonTable`, `BarChart`, `Stats`
- **Blueprints** — full ready-to-adapt emails: `PromoEmail`, `EducationalEmail`, `StorytellingEmail`, `LaunchEmail`

Brand palette — forest `#004D27`, gold `#E3BC62`, leaf `#057441`, beige `#F0EFDF`,
white. Type — **Gotham** (bundled) with a Montserrat → Helvetica fallback for
email clients that strip web fonts. Image slots (`product` / `lifestyle` /
`studio`) render on-brand placeholders you replace with real photography later.

## Develop

```bash
npm install
npm run build      # esbuild bundle + tsc types → dist/
npm run assets     # regenerate logo lockups from ICONOS_1.png (needs sharp)
```

## Sync to Claude Design

This repo is set up for the `/design-sync` skill. Config lives in
`.design-sync/config.json`; see `.design-sync/NOTES.md` for build/re-sync details
and `.design-sync/conventions.md` for the design-agent usage guide.

```bash
# from email-ds/
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./dist/index.es.js --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
```

The validated design system is emitted to `ds-bundle/` (gitignored), ready to
upload to a Claude Design project.
