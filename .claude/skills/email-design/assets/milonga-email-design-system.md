# Milonga — Email Design System

*Single-file reference. Paste this wherever the design system needs to be known.*
*Canonical version: the `email-design` skill. Snapshot taken 2026-09-08.*

---

## 1. Colour and the contrast map

| Colour | Hex | Role |
|---|---|---|
| Dark green (forest) | `#004D27` | Backgrounds, buttons, icons |
| Gold | `#E3BC62` | Titles, buttons, icons, accents |
| Leaf green | `#057441` | Secondary — buttons, trees, leaves |
| Beige / cream | `#F0EFDF` | Titles and text, paper, secondary background |
| White | `#FFFFFF` | Body copy on dark backgrounds |

**The contrast map is the heart of the system.** Given the email's background, every element's
colour is already decided — nothing is picked by eye:

| On this background | Logo | Title | Title accent | Body | Small caps / accent | Icons | Buttons |
|---|---|---|---|---|---|---|---|
| **Dark green** | Gold | Beige | Gold | White | Gold | Gold | Gold fill, green text |
| **Gold** | Cream | Beige | White | White | Leaf | Beige | Forest fill, beige text |
| **Beige** | Green | Dark green | Dark green | Black | Dark green | Dark green | Forest fill, beige text |

Two consequences worth internalising:

- **Beige takes dark green type only** — no leaf green, no gold. Gold on beige is about 1.5:1
  contrast, effectively unreadable.
- **Titles are two-tone by default** so they never read as one flat block. On dark green that's
  beige into gold. On beige both halves are dark green, so the split is invisible and that's fine —
  the rule that matters there is legibility, not the split.

---

## 2. Backgrounds

**One background per email.** Pick dark green, gold, or beige per campaign; every block inherits it.
There are never white cards.

**The exception is a deliberate transition**, at most once or twice, and it should read as a scene
rather than a hard edge. The illustrated forest canopy exists for exactly this: it sits on beige or
gold and resolves into the dark green below.

**Textured backgrounds run the whole email**, never one section. The grain is colour-corrected so
its average is exactly the brand hex — texture without a colour shift.

**On a textured background, rounded blocks take a plain solid fill** of the brand colour, so the
shape reads as cut out of the grain rather than dissolving into it.

---

## 3. Structure — the three acts

Every Milonga email follows the same arc:

| Act | Job |
|---|---|
| **Header** | LOUD. A statement. Create curiosity and interest |
| **Body** | Value, information, education |
| **CTA** | Price, offer, call to action, urgency |

Emails carry benefits, ingredients, comparisons, short paragraphs with images, tables, lists and
creative graphs — **information distributed evenly, laid out to be looked at**. A wall of text and a
wall of images both fail.

---

## 4. Typography

**Gotham** — Black, Bold, Medium, Regular. Montserrat is the email-safe fallback.

**The scale.** Pick the nearest step rather than a number that looked right — that is how two
headings end up 1px apart for no reason.

| Step | px | Use |
|---|---|---|
| hero | 64 | The full-bleed opening statement |
| h1 | 44 | A loud section headline |
| h2 | 28 | The standard section title |
| h3 | 20 | A row title inside a block |
| bodyLg | 16 | The paragraph that has to be read |
| body | 14 | Primary body copy |
| bodySm | 13 | Supporting copy inside blocks |
| caption | 11 | Captions, unit lines |
| eyebrow | 12 | Small caps above a title |

Spacing runs on an **8px grid**: 8 · 16 · 24 · 32 · 48 · 64.

- **Titles and buttons are always in CAPS.** Body copy is smaller and sentence case
- **Long titles auto-fit.** A headline that almost fits one line drops a point or two to fit it;
  anything longer is sized to fill **two rows of even width**, never a long line plus a stub
- **Subtitles** sit under titles in small caps, wide letter-spacing, in the accent colour
- **Emphasis inside body copy** is bold in the accent colour — it's what a skimmer takes away, so
  choose the phrases deliberately rather than bolding whatever sounds important

### The two-line headline

The house headline: a statement in **Gotham Black**, then the turn beneath it in **Bold Italic**.

> **CLARITY,**
> *on tap.*

> **WHAT'S IN IT,**
> *and why it works.*

The break is the point — the first line lands, the second re-frames it. Because the contrast is
weight and slant rather than colour, it reads on any background and survives a client that drops
colour. **Keep both lines short: it fails the moment either one wraps.**

Use it where a headline should feel spoken. The eyebrow + title + subtitle stack stays the
workhorse for everything else.

---

## 5. Depth

Nothing should read dead flat. Blocks, charts, numbers, buttons and images all sit slightly above
the background:

- Raised blocks get a soft fill, a lit top edge and a drop shadow
- Buttons get a gradient face and a shadow
- Big numerals get a gradient
- Titles get a soft text shadow

Depth is what stops a flat-colour email looking like a document.

---

## 6. Icons and brand marks

Seven brand marks, in four inks (gold, leaf, forest, cream). **Ink is chosen by background** — gold
on dark green, beige on gold, dark green on beige.

**They travel in fixed groups. Don't split them:**

| Group | Marks |
|---|---|
| **Ingredients** (primary) | Yerba mate · Lion's Mane · L-Theanine |
| **Free-from** (secondary) | No cane sugar / erythritol · Gluten & dairy-free |
| **Serve** | Hot · Iced |

Marks usually lead a row inside a **filled disc**, glyph in the opposite colour — a gold disc
carries a dark green icon. There is also a small generic glyph set (leaf, bolt, brain, clock,
scoop, whisk, check, cross…) for things the brand set doesn't cover.

---

## 7. Images

- **Cutouts** (transparent PNGs) sit directly on the flat colour, square corners, fitted not cropped
- **Photographs** are inset with rounded corners on a bed that tints the background
- **Bleed images** enter from the left or right edge and run past the margin — this is what makes
  art feel part of the page rather than pasted onto it. Alternating edges down an email gives it
  rhythm
- **Badges can be stamped onto an image** — a gold pill stating a fact ("90 CAL, 3G SUGAR / PER
  SERVING"). It looks like a button but never links

---

## 7b. Blocks worth knowing

- **Spec pills** — a wrapped cluster of small outlined pills, one fact each ("100MG NATURAL
  CAFFEINE", "ORGANIC · DAIRY-FREE"). The whole formula readable in two seconds. It belongs high
  in the email, usually right under the product shot, before anyone has decided to read. Keep each
  chip to a few words; a chip that wraps stops looking like a label
- **Ingredient rows, two ways.** Filled discs when the row should shout. **Ring icons with the dose
  in the title** — "LION'S MANE · 500MG", hairline rules between rows — when the copy is doing the
  work. Putting the amount in the title rather than the body is what makes a formula scannable
- **Paper** — a cream sheet with fibre grain, a warm gradient, a lit top edge and a two-part
  shadow, corners squared to 6px. For a founder note or anything that should read as written
  rather than designed
- **Prose** — a paragraph where phrases wrapped in `**asterisks**` are set bold in the accent
  colour
- **Badge** — a filled pill stating a fact. Looks like a button, never links

---

## 8. The component library

Lives in the `email-ds` package in the Github repo. Emails are written as React and previewed in a
browser at 600px.

```
email-ds/
├── src/theme.ts          The contrast map — the heart of the system
├── src/components/       ~45 components
├── emails/*.jsx          One file per campaign
├── refine/*.html         One preview harness per campaign
└── scripts/shoot.mjs     Render a harness to PNG
```

**The build and preview loop:**

```bash
cd email-ds
npm run build
node .ds-sync/package-build.mjs --config .design-sync/config.json \
     --node-modules node_modules --out ds-bundle
node scripts/shoot.mjs /tmp/out.png 600 <harness>.html
```

Then slice the tall PNG into readable chunks and actually look at each one.

**Why build with components rather than hand-rolled HTML:** they read the contrast map, so a colour
can't go off-brand by accident, and a change to the map updates every email at once.

---

## 9. Email-client reality

The React build is the design. What ships to Klaviyo has to survive email clients:

- **Nested tables, inline styles, `bgcolor`.** No flexbox, no grid, no `aspect-ratio`
- **Outlook desktop drops gradients, shadows, transforms and absolute positioning.** Anything that
  depends on them needs a floor that still looks right — or bake it into the image
- **A badge overlaid on a photo** is absolutely positioned, so it drops below the image in Outlook.
  For a hero moment, bake it into the PNG instead
- **Rotation never survives.** Don't tilt anything that needs to look tilted

Because of all this, Milonga campaigns usually ship as **images** — see the export step in
`saving-and-handoff.md`.

---

## 10. Review it the way it will be seen

Preview every design under a **fake inbox row** carrying the subject line and preview text
(`refine/_inbox.js` does this). A design judged on its own always looks better than it performs:
the first thing anyone actually sees is one line in a crowded list. Reviewing the two together
catches the common failure — a subject and a preheader that say the same thing, or an empty
preheader that the client fills with "View in browser".

---

# The remembered rules

These are the decisions Bernat has asked the system to keep. **They override everything above** —
they are newer and came from him directly. In the live system they live in
`/Email Marketing Agent/design-system/design-memory.md` and grow every time he says
"remember that".

## Active rules

| Date | Area | Rule | From |
|---|---|---|---|
| 2026-08 | Background | One flat background per email — dark green, gold or beige. Every block inherits it. Never white cards | Bernat |
| 2026-08 | Background | A deliberate colour transition is allowed once or twice, and should read as a scene (the forest canopy), not a hard edge | Bernat |
| 2026-08 | Background | Textured backgrounds cover the **whole** email, never a single section | Bernat |
| 2026-08 | Background | On a textured email, rounded blocks take a plain solid brand fill so they stay visible against the grain | Bernat |
| 2026-08 | Type | Titles and buttons are always CAPS. Body copy is smaller | Bernat |
| 2026-08 | Type | Secondary titles are bigger; subtitles are CAPS in the accent colour | Bernat |
| 2026-08 | Colour | Dark green bg → beige/gold two-tone titles, white body, gold icons | Bernat |
| 2026-08 | Colour | Gold bg → beige titles, white body, beige icons | Bernat |
| 2026-08 | Depth | Nothing reads flat — blocks, charts, numbers, titles, images and buttons all carry volume | Bernat |
| 2026-08 | Icons | Use the background-less brand icon set. Marks travel in their fixed groups and are not split | Bernat |
| 2026-08 | Icons | Icons run bigger than feels necessary, usually in a filled disc with the glyph in the opposite colour | Bernat |
| 2026-09-02 | Colour | **Beige bg → dark green type only.** No leaf green, no gold — titles, eyebrows and subtitles all one dark green | Bernat |
| 2026-09 | Type | Long titles auto-fit — one that almost fits a line drops a point or two to fit it; longer ones fill two rows of **even width**, never a long line plus a stub | Bernat |
| 2026-09 | Structure | Every email runs three acts: header (loud, curiosity) → body (value, education) → CTA (price, offer, urgency) | Bernat |
| 2026-09 | Images | Cutouts enter from the left or right edge and run past the margin. Alternating edges down an email gives it rhythm | Bernat |
| 2026-09 | Images | A gold pill badge can be stamped onto a product image to state a fact (e.g. "90 CAL, 3G SUGAR / PER SERVING") | Bernat |
| 2026-09 | Export | Campaigns ship to Klaviyo as **two stacked images**, cut at a flat row so the seam is invisible | Bernat |
| 2026-09-08 | Letters | A founder note can sit on a cream sheet with paper grain, a lit top edge and a layered shadow — squared-off corners, because paper has no soft radius | Bernat |
| 2026-09-08 | Type | **Two-line headline** — a statement in Gotham Black, then the turn beneath it in Bold Italic ("CLARITY, / on tap."). The contrast is weight and slant, not colour, so it holds anywhere. Both lines must be short enough not to wrap | Ported from the previous Milonga email system |
| 2026-09-08 | Blocks | **Spec pill cluster** — a wrapped row of small outlined pills, one fact each, placed high in the email under the product shot. The whole formula readable in two seconds, before anyone has decided to read | Ported |
| 2026-09-08 | Blocks | Ingredient rows have a quiet variant: **ring icons and the dose in the title** ("LION'S MANE · 500MG"), rows separated by hairlines. Use it when the copy is doing the work; filled discs when the row should shout | Ported |
| 2026-09-08 | Type | Sizes come from a **documented type scale** and spacing from an **8px grid** — pick the nearest step rather than a number that looked right | Ported |
| 2026-09-08 | Export | Review every design under a **fake inbox row** showing the subject line and preview text. A design judged alone always looks better than it performs | Ported |

---

# Where a finished design goes

## 1. Work out the month and week — don't invent them

The design's filename must match the copy's. The copy already exists at:

```
/Email Marketing Agent/campaigns/copies/[Month]/YYYY-MM-week-N.docx
```

**Take the month and week number from that file**, or from the build record's send date if the
document isn't there yet. Never recompute the week independently — if the copy says week 2 and the
design says week 3, the correlation this whole convention exists for is broken, and nobody notices
until the report can't match them.

`[Month]` is the full month name of the **send month**, e.g. `September`.

---

## 2. Where the design goes

```
/Email Marketing Agent/campaigns/designs/[Month]/YYYY-MM-week-N/
```

Exactly mirroring `campaigns/copies/[Month]/YYYY-MM-week-N.docx` — same month folder, same week
name. One folder per week, holding every campaign designed for that week.

Inside it, one folder per campaign, **named identically to its build record**:

```
designs/September/2026-09-week-2/
└── 2026-09-15-founder-note-free-samples/
    ├── 2026-09-15-founder-note-free-samples-full.png    Full design, one image
    ├── 2026-09-15-founder-note-free-samples-1.jpg       Klaviyo slice, top
    ├── 2026-09-15-founder-note-free-samples-2.jpg       Klaviyo slice, bottom
    └── 2026-09-15-founder-note-free-samples.jsx         Source, so it can be edited later
```

**If the month or week folder doesn't exist, create it.** Don't ask, don't save elsewhere.

**A revision edits that campaign's existing folder in place** — same names. A second design for the
same campaign is a revision, not a new folder.

---

## 3. Export

**Full design:** render at 600px CSS width with a device pixel ratio of 2, giving a 1200px-wide
PNG. That's retina for a 600px email.

**Klaviyo slices:** two stacked images, via the bundled script:

```bash
node scripts/split-for-klaviyo.mjs <render.png> <out-prefix> jpeg
```

It finds the flattest row in the middle band and cuts there. **Why flatness rather than an even
split:** a row crossing a card or photo can never be uniform (dark background, light card, dark
background), so if a client rounds heights by a pixel, a hairline shows. The flattest row is
naturally in open background, where a seam disappears. Uneven halves are worth an invisible join.

Re-stitch the two slices and look at the seam before shipping them. If it's visible, cut elsewhere.

**In Klaviyo:** two image blocks stacked, both 100% width, no padding or spacing between them.

---

## 4. Fill the AS BUILT section of the build record

Open `/Email Marketing Agent/campaigns/YYYY-MM-DD-campaign-name.md` and complete the **AS BUILT**
section that `email-copy-and-design` left empty:

- Final subject line and preview text
- Sections as built
- CTA label and destination
- **Every piece of copy baked into images, transcribed verbatim**
- Screenshot — the path from step 2
- Klaviyo campaign ID and template ID
- What changed from the brief, and why

**The transcription is the whole point.** `email-performance-report` reads build records to explain
why a campaign performed — subject line to open rate, design and copy and CTA to click rate. When
the copy lives inside a PNG, the report is blind to it: it can tell you an email underperformed but
never that the headline was the reason. Ten minutes of transcription is what makes the next month's
analysis possible.

Note **what changed from the brief and why** honestly. "Dropped the third section, the email ran
too long" is the kind of thing that explains a result later.

---
