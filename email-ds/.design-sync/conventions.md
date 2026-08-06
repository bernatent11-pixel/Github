# Milonga Email Design System — how to build with it

This library builds **on-brand Milonga marketing emails**. Milonga is a functional
yerba mate latte; the voice is clean, focused, warm. **Never mention THC, CBD,
cannabis, or weed.**

Everything is exported on `window.MilongaEmailDS` — e.g.
`const { EmailShell, Header, Hero, Section, Footer } = window.MilongaEmailDS`.

## The one rule: one flat background per email

A Milonga email is **a single flat color end to end** — dark green, gold, or
beige. There are no white cards and no alternating section colors. Pick the
color once on `EmailShell` and pass the same `bg` to every block:

```jsx
const { EmailShell, Header, Hero, Section, SectionHeading, BenefitsGrid, Button, Footer } = window.MilongaEmailDS;
const bg = 'forest'; // 'forest' | 'gold' | 'beige' — choose once per email

<EmailShell bg={bg}>
  <Header bg={bg} />
  <Hero bg={bg} eyebrow="The science" title="Why yerba mate beats the 3pm crash"
        body="Clean caffeine, Lion's Mane and L-Theanine for calm, sustained focus."
        image={{ kind: 'lifestyle' }} cta={{ label: 'Try Milonga', href: '#' }} />
  <Section bg={bg} pad="md" rule>
    <SectionHeading bg={bg} title="What makes it different" />
    <div style={{ height: 18 }} />
    <BenefitsGrid bg={bg} columns={2} items={[
      { icon: 'bolt',  title: 'Clean caffeine', text: '100mg from yerba mate — no coffee spike.' },
      { icon: 'brain', title: "Lion's Mane",    text: '300mg for focus and clarity.' },
    ]} />
  </Section>
  <Section bg={bg} pad="md" align="center">
    <Button label="Shop the launch" href="#" bg={bg} size="lg" />
  </Section>
  <Footer bg={bg} social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' }]} />
</EmailShell>
```

**Never hard-code a color.** Every component reads the `onBg` contrast map and
picks its own logo tone, title, body, accent, rule, button fill and depth. Pass
`bg` and the colors are correct by construction:

| `bg` | Logo | Titles | Body | Accent | Button |
|---|---|---|---|---|---|
| `forest` (#004D27) | gold | white | beige | gold | gold face, forest label |
| `gold` (#E3BC62) | cream | forest | deep green | forest | forest face, beige label |
| `beige` (#F0EFDF) | brand green | forest | ink | leaf | forest face, beige label |

For your own layout glue only, read `window.MilongaEmailDS.colors`
(`colors.forest`, `.gold`, `.leaf`, `.beige`, `.white`, `.ink`) or the
`--milonga-*` CSS variables. Never invent hexes.

## Typography

- **All titles and all buttons are UPPERCASE.** The components already apply
  `text-transform` — pass normal sentence-case strings and they render in caps.
- Quotes (`Callout variant="quote"`) stay sentence case.
- Body copy is deliberately small against the caps headlines — don't enlarge it.
- Type is **Gotham** (400/500/700/900), bundled, with a Montserrat → Helvetica
  fallback because most email clients strip web fonts.

## Structure and depth

- Separate blocks with **space and hairlines** — `<Section bg={bg} rule>` — not
  with colored bands.
- Group related content in a **`Panel`** (raised by default: soft fill, lit top
  edge, shadow) or set `variant="outlined"` for a quieter hairline box.
- Blocks, charts, buttons, numerals and photos all carry **depth** (gradients,
  shadows, area washes) so nothing reads dead flat. That is built in — don't
  flatten it, and don't add your own shadows.

## Images

Use `ImageSlot`, or the `image` / `imageSrc` props on `Hero`, `TextImage` and
`ProductCard`. With no `src` you get an on-brand placeholder labelled by `kind`
(`product` | `lifestyle` | `studio`) — leave those in for art added later.

- A **regular photo** is inset with rounded corners.
- A **`cutout`** (transparent product PNG) runs the full email width with square
  corners and is fitted, never cropped, so it sits directly on the flat color.

## Where the truth lives

- Per-component API and examples: `components/<group>/<Name>/<Name>.prompt.md`
  and `<Name>.d.ts`. Groups: **Foundations, Layout, Blocks, Data, Blueprints**.
- **Blueprints** are complete, on-brand emails — `PromoEmail`,
  `EducationalEmail`, `StorytellingEmail`, `LaunchEmail`. Each takes a single
  `bg` plus text overrides. Start from one of these when the campaign fits.
- For info-dense emails reach for the **Data** blocks instead of prose:
  `BenefitsGrid`, `IngredientList`, `ComparisonTable` (styles: `rows` default,
  `lane`, `grid`), `BarChart`, `Stats`, `VersusBlock`, `Steps`
  (`numerals` | `discs`) and `EnergyCurve`.
