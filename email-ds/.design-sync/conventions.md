# Milonga Email Design System — how to build with it

This library builds **on-brand Milonga marketing emails** out of ready-made React
blocks. Milonga is a functional yerba mate latte; the voice is clean, focused,
warm. **Never mention THC, CBD, cannabis, or weed.**

Every component is exported on `window.MilongaEmailDS`. Import by name, e.g.
`const { EmailShell, Hero, Button } = window.MilongaEmailDS`.

## Composition model — wrap, then stack

An email is always: **`EmailShell` → `Header` → content blocks → `Footer`.**
`EmailShell` paints the page backdrop and centers a ~600px column; put everything
inside it. Between header and footer, stack blocks — usually each inside a
`Section` (a padded band with a brand surface) or a self-padding block like
`Hero`, `ProductCard`, `Callout`, `Divider`.

```jsx
const { EmailShell, Header, Section, SectionHeading, BenefitsGrid, Button, Footer } = window.MilongaEmailDS;

<EmailShell page="beige" surface="white">
  <Header tone="dark" tagline="Energy That Thinks" />
  <Section tone="white" pad="lg">
    <SectionHeading eyebrow="The science" title="Why yerba mate beats the 3pm crash"
      intro="Clean caffeine, Lion's Mane and L-Theanine for calm, sustained focus." />
  </Section>
  <Section tone="white" pad="md">
    <BenefitsGrid columns={2} items={[
      { icon: 'bolt',  title: 'Clean caffeine', text: '100mg from yerba mate — no coffee spike.' },
      { icon: 'brain', title: "Lion's Mane",    text: '300mg to support focus and clarity.' },
    ]} />
  </Section>
  <Section tone="white" pad="md" align="center">
    <Button label="Try Milonga" href="#" variant="gold" size="lg" />
  </Section>
  <Footer social={[{ label: 'Instagram', href: '#' }]} />
</EmailShell>
```

**Fastest path:** the four **blueprints** — `PromoEmail`, `EducationalEmail`,
`StorytellingEmail`, `LaunchEmail` — are complete, on-brand emails with sensible
defaults. Render one and adjust props (`title`, `offer`, `code`, `ctaHref`, …)
rather than assembling from scratch when a campaign fits one of those shapes.

## Styling idiom — props and tokens, NOT utility classes

There are **no utility CSS classes** in this system. You style in two ways only:

1. **Component props** carry the design language. Pick the brand surface/treatment
   with `tone` / `variant` / `size` / `onDark`, never ad-hoc colors:
   - Surfaces (`tone`): `white`, `beige`, `cream`, `forest`, `gold`, `leaf`.
   - `Button` `variant`: `gold` (default, gold-on-forest), `forest`, `leaf`,
     `outline`, `outlineOnDark`. `size`: `sm` | `md` | `lg`.
   - On a dark (forest) surface, pass `onDark` (BenefitsGrid, IngredientList,
     BarChart, List, Stats, SectionHeading) so text/markers flip to light.
2. **For your own layout glue only** (a spacer, a wrapper div), use the brand
   palette via CSS variables or the exported `colors` object — never invent hexes:

   `var(--milonga-forest)` `#004D27` · `var(--milonga-gold)` `#E3BC62` ·
   `var(--milonga-leaf)` `#057441` · `var(--milonga-beige)` `#F0EFDF` ·
   `var(--milonga-cream)` · `var(--milonga-white)` · `var(--milonga-ink)` (body
   text) · `var(--milonga-ink-soft)`. Radii: `var(--milonga-radius-sm|md|lg|pill)`.
   The same values are on `window.MilongaEmailDS.colors` (`colors.forest`, …).

**Type is Gotham** (weights 400/500/700/900), shipped with the bundle; the
email-safe fallback stack is Montserrat → Helvetica → Arial (most email clients
strip web fonts, so real sends fall back — that's expected). Don't set
`font-family` yourself; the components already do.

## Images

Use `ImageSlot` (or the `image`/`imageSrc` props on `Hero` / `ProductCard`). With
no `src` it renders an on-brand placeholder labelled by `kind`
(`product` | `lifestyle` | `studio`) — leave those in for art the team drops in
later. Set `ratio` (`square` | `landscape` | `portrait` | `wide`).

## Where the truth lives

- Per-component API + examples: `components/<group>/<Name>/<Name>.prompt.md` and
  `<Name>.d.ts`. Groups: **Foundations, Layout, Blocks, Data, Blueprints.**
- Brand tokens: the `--milonga-*` custom properties (in the `styles.css` closure)
  and the `colors` export. Fonts ship under `fonts/` (Gotham + Montserrat).
- Data blocks for info-dense emails: `BenefitsGrid`, `IngredientList`,
  `ComparisonTable` (Milonga column auto-highlighted), `BarChart` (highlight the
  Milonga bar), `Stats`. Reach for these instead of prose when comparing or
  listing.
