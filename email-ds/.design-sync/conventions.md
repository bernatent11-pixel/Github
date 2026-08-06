# Milonga Email Design System — how to build with it

This library builds **on-brand Milonga marketing emails**. Milonga is a functional
yerba mate latte; the voice is clean, focused, warm. **Never mention THC, CBD,
cannabis, or weed.**

Everything is exported on `window.MilongaEmailDS` — e.g.
`const { EmailShell, Header, Hero, Section, Footer } = window.MilongaEmailDS`.

## The core rule: flat brand backgrounds, never white

A Milonga email is built on the brand colors — dark green, gold or beige.
**There are never white cards.** Pick a base color on `EmailShell` and pass
that `bg` to every block:

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
picks its own logo tone, title, body, accent, icon, rule, button fill and depth.
Pass `bg` and the colors are correct by construction:

| `bg` | Logo | Title (1st half / 2nd half) | Body | Accent | Button |
|---|---|---|---|---|---|
| `forest` (#004D27) | gold | beige / **gold** | white | gold | gold face, forest label |
| `gold` (#E3BC62) | cream | **beige** (white tail) | white | leaf green | forest face, beige label |
| `beige` (#F0EFDF) | brand green | **dark green** throughout | black | leaf green | forest face, beige label |

For your own layout glue only, read `window.MilongaEmailDS.colors`
(`colors.forest`, `.gold`, `.leaf`, `.beige`, `.white`, `.ink`) or the
`--milonga-*` CSS variables. Never invent hexes.

## Mix the colors — nothing should read flat

Three rules keep every email lively:

**1. Titles are two-tone on dark green.** Headlines split across two brand
colors automatically — on dark green that's half beige, half gold. On gold,
titles are beige; on beige, titles are dark green throughout. `Hero`, `SectionHeading` and
`TextImage` do this for you: just pass a normal title. To choose the split
yourself, pass the trailing words as `titleAccentPart` (or `accentPart` on
`TwoToneTitle`); pass `flatTitle` for the rare one-color headline.

```jsx
<Hero bg="forest" title="Your focus, 20% sharper" titleAccentPart="20% sharper" … />
```

**2. An email may change background mid-way.** Switching color for one band
gives the email rhythm — start dark green, drop a gold section, come back. Give
the `Section` its own `bg` and put a `SectionBreak` at each seam:

```jsx
<Section bg="forest" pad="md">…</Section>
<SectionBreak from="forest" to="gold" />
<Section bg="gold" pad="lg">
  <SectionHeading bg="gold" title="Why it works" />
  <BenefitsGrid bg="gold" columns={2} items={…} />
</Section>
<SectionBreak from="gold" to="forest" />
```

Every block inside a switched section must get that section's `bg` so its
colors follow. Use it for emphasis — once or twice per email, not every block.

**Icons** have their own token per background, separate from `accent`: gold on
dark green, beige on gold, dark green on beige.

**3. On gold, lean on the brighter green.** Gold emails use leaf green
(`#057441`) for eyebrows, icons and accents, and forest green for body copy and
buttons — not dark green on everything. Titles there are beige, which is a
deliberately soft, tonal pairing carried by the caps and Gotham Black weight.

## Typography

- **All titles and all buttons are UPPERCASE.** The components already apply
  `text-transform` — pass normal sentence-case strings and they render in caps.
- Quotes (`Callout variant="quote"`) stay sentence case.
- Body copy is deliberately small against the caps headlines — don't enlarge it.
- Type is **Gotham** (400/500/700/900), bundled, with a Montserrat → Helvetica
  fallback because most email clients strip web fonts.

## Structure and depth

- Separate most blocks with **space and hairlines** — `<Section bg={bg} rule>`.
  A full background switch (above) is the stronger move: save it for one or two
  moments per email.
- Group related content in a **`Panel`** (raised by default: soft fill, lit top
  edge, shadow) or set `variant="outlined"` for a quieter hairline box.
- Blocks, charts, buttons, numerals and photos all carry **depth** (gradients,
  shadows, area washes) so nothing reads dead flat. That is built in — don't
  flatten it, and don't add your own shadows.

## Brand icons — use the real art

Wherever a block shows an icon, prefer the brand's own art. Any component that
takes an icon accepts a **brand mark** (`'yerba-mate'`, `'lions-mane'`,
`'l-theanine'`, `'no-cane-sugar'`, `'gluten-dairy-free'`, `'hot'`, `'iced'`) as
well as the generic glyphs (`'bolt'`, `'check'`, …) — pass a brand mark when one
fits the meaning, and fall back to a glyph only when it doesn't:

```jsx
<BenefitsGrid bg={bg} items={[
  { icon: 'yerba-mate', title: 'Clean caffeine', text: '100mg from yerba mate.' },
  { icon: 'lions-mane', title: "Lion's Mane",    text: '300mg for focus and clarity.' },
]} />
<IngredientList bg={bg} items={[{ icon: 'lions-mane', name: "Lion's Mane", amount: '300mg' }]} />
```

`IconRow` shows a labelled row of them on their own. The ink is picked from the
background automatically.

**Keep the marks in their groups — never mix them:**

| Group | Marks | Use |
|---|---|---|
| `INGREDIENTS` | yerba-mate, lions-mane, l-theanine | The three functional ingredients. **Always together, and the priority.** |
| `FREE_FROM` | no-cane-sugar, gluten-dairy-free | Always together. A secondary "extra", never above the ingredients. |
| `SERVE` | hot, iced | Always together. Says you can make it either way. |

```jsx
<IconRow bg={bg} marks={INGREDIENTS} size={54} />
<IconRow bg={bg} marks={FREE_FROM} />
<IconRow bg={bg} marks={SERVE} />
```

## Separators, scenes and texture

- **`Divider`** — `line` (hairline, the default), `mark` (the centred hand mark)
  or `dots`. Sections are usually separated by `<Section rule>` instead.
- **`ForestScene`** is the illustrated canopy: put it at the end of a beige or
  gold section, with a dark green section directly below. The art is colour-
  matched to the forest green, so the background change reads as a landscape
  rather than a hard edge. Use it once per email at most.
- **Texture**: pass `textured` to `EmailShell` (or to a blueprint) and the brand
  paper grain covers the WHOLE email — it is an alternative to the flat fill, not
  a per-section treatment. Gold and dark green only; beige has no texture art and
  stays flat. The grain never changes the colour.

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
