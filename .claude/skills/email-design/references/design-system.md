# The Milonga email visual system

The stable part of the design language. Anything in the **design memory** that contradicts this
file wins — memory is newer and came from Bernat directly.

**Contents**
1. Colour and the contrast map
2. Backgrounds
3. Structure — the three acts
4. Typography
5. Depth
6. Icons and brand marks
7. Images
8. The component library
9. Email-client reality

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

- **Titles and buttons are always in CAPS.** Body copy is smaller and sentence case
- **Long titles auto-fit.** A headline that almost fits one line drops a point or two to fit it;
  anything longer is sized to fill **two rows of even width**, never a long line plus a stub
- **Subtitles** sit under titles in small caps, wide letter-spacing, in the accent colour
- **Emphasis inside body copy** is bold in the accent colour — it's what a skimmer takes away, so
  choose the phrases deliberately rather than bolding whatever sounds important

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
- **Give art breathing room.** Trimmed hard to its bounding box, foliage and product edges touch the
  frame and read as cut off

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
