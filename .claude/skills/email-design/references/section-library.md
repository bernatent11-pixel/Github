# The Milonga email section library

A kit of modular sections, and the grammar for combining them so no two campaigns look alike.

**Read `design-system.md` first** — it holds the contrast map, which decides every colour here.
This file is about *structure*: what sections exist, what each is for, and how to sequence them.

**Contents**
1. How to use this — the composition rules
2. Openers
3. Body sections
4. Product sections
5. Proof sections
6. Rhythm devices
7. Closers
8. The hard specs
9. Provenance — what this is built on

---

## 1. How to use this — the composition rules

**An email is a sequence, not a stack.** The failure mode of a component library is that every
campaign comes out as hero → three text blocks → button. These rules exist to prevent that.

### The five rules of a varied email

**R1 · No two adjacent sections share a shape.** A full-bleed image cannot follow a full-bleed
image. A centred text block cannot follow a centred text block. If the section you want next has
the same silhouette as the one before, put a rhythm device between them or change one of the two.

**R2 · Alternate the eye's path.** Centre → left → centre → split → centre. A reader scanning a
column of perfectly centred blocks stops seeing them. At least one section per email should break
the centre axis.

**R3 · One background change per email, two at most.** Every change is a chapter break and must
mean something — a new act, not a new paragraph. Both edges land where the page is already flat.
See the Colour Band device.

**R4 · One primary CTA per act, three per email maximum.** More than three and none of them is
primary. The last one is the loudest.

**R5 · Every email gets exactly one loud moment.** A full-bleed photograph, a text-over-image, a
pull quote at 32px, or a colour band — one. Two loud moments cancel each other out.

### Picking a shape for the campaign

| The campaign is | Open with | Body | Close with |
|---|---|---|---|
| **Education** (how it works, what's inside) | Type-Led Hero or Product Callout Hero | Zig-Zag Rows, Icon Rows, Process Strip | CTA Band |
| **Comparison** (us vs the alternative) | Type-Led Hero | Compare Table, then Review Grid | CTA Band |
| **Launch / promo** | Full-Bleed Hero or Text-Over-Image | Spec Pills, Product Showcase | Bundle Tiers |
| **Editorial / brand** | Text-Over-Image | Letter, Pull Quote, Bleed Image | Quiet CTA Band |
| **Proof / social** | Type-Led Hero | Review Grid, Hero Quote, Stat Band | CTA Band |
| **Seasonal / ritual** | Full-Bleed Hero | Process Strip, Zig-Zag Rows | CTA Band |

Two campaigns of the same type should still differ: swap the hero variant, flip the zig-zag's
starting side, move the colour band. **Do not ship the same sequence twice in a month.**

### The anti-sameness check

Before exporting, answer these. A "no" is a redesign, not a note.

1. Does any section repeat the shape of the one above it?
2. Is every section centred?
3. Is there exactly one loud moment?
4. Would this email be distinguishable from last week's at thumbnail size, with the text unreadable?
5. With images off, does it still read and still have a clickable CTA?

---

## 2. Openers

### O1 · Full-Bleed Hero

**Purpose** — the loud moment, spent immediately. Photography carries the whole first screen.

**Layout** — one image, edge to edge, no margin. Optionally overlaid: logo top-centre, headline in
the photo's empty region, a button over a clear band near the bottom.

**Content** — headline (≤6 words), optional 1-line subhead, one CTA.

**Images** — a photograph with *deliberate empty space* for the type. Minimum 1200px wide. If the
photo has no quiet region, this is the wrong section — use Text-Over-Image with a scrim instead.

**Type** — headline at 38–44, the two-line Black + Bold Italic house headline.

**Colour** — the page colour must match the photo's dominant tone so the image never looks pasted
on. Sample the photo; if it vignettes, fade its bottom back up to the page colour.

**CTA** — gold on a photograph, always. Green sinks into foliage.

**Spacing** — 0 above, 32 below.

**Variations** — (a) overlay text, (b) clean image then type underneath, (c) overlay with callout
pins pointing at the product.

**Use when** — the photography is genuinely good and the message is short.
**Pairs with** — Icon Rows, Zig-Zag Rows, Spec Pills. **Never** directly above another image.

---

### O2 · Type-Led Hero

**Purpose** — the message is the hook, not the picture.

**Layout** — logo, generous air, two-line headline, eyebrow in small caps, one paragraph. Centred.

**Content** — headline, eyebrow (≤8 words), paragraph (≤45 words).

**Images** — none. That is the point.

**Type** — headline 38, eyebrow 11.5 at 0.14em tracking, body 16.

**Colour** — flat brand ground. Any of the three.

**Spacing** — 32 / 14 / 16 / 32.

**Variations** — (a) centred, (b) left-aligned with a rule above the eyebrow, (c) headline only,
oversized, no paragraph.

**Use when** — comparison, announcement, or anything where a stock-looking photo would cheapen it.
**Pairs with** — Compare Table, Review Grid, Zig-Zag Rows.

---

### O3 · Text-Over-Image

**Purpose** — the editorial opening. Feels like a magazine cover rather than a promotion.

**Layout** — photograph with type sitting directly on it, anchored to one third (top, bottom, or
one side) — never dead centre over a busy frame.

**Content** — headline, optional eyebrow. No paragraph; this section is a statement.

**Images** — must carry a low-detail region for the type. Where it doesn't, apply a **scrim**: a
linear gradient from `rgba(0,26,13,0.55)` to transparent across the type's third only. Never a
full-frame darkening — that reads as a mistake.

**Type** — 32–44. Cream or gold on a dark scrim; forest on a light one.

**CTA** — optional. If present, one, directly under the headline.

**Spacing** — 0 / 0. It bleeds.

**Variations** — (a) bottom-anchored with a scrim, (b) side-anchored on a quiet half,
(c) type in the photograph's own negative space with no scrim at all — the best version when the
photo allows it.

**Use when** — brand, seasonal, editorial. **Pairs with** — Letter, Pull Quote, Bleed Image.
**Never** above Full-Bleed Hero.

---

### O4 · Product Callout Hero

**Purpose** — explain the product's contents while showing it.

**Layout** — product photograph, with small pill labels pinned around it, each connected to the
product by a short hairline arrow.

**Content** — 2–4 callouts, each a fact of ≤4 words (a dose, a claim, a spec).

**Images** — a product shot with clear space on both sides for the pills.

**Type** — pill label 10.5 at 0.06em, caps.

**Colour** — cream pill, gold icon disc, forest type. White arrows with a soft drop shadow so they
survive both light and dark regions of the photo.

**Spacing** — 0 / 32.

**Variations** — (a) callouts both sides, (b) one side only with the product offset,
(c) no arrows, callouts in a row beneath.

**Use when** — ingredient or formula education. **Pairs with** — Icon Rows, Zig-Zag Rows.

---

### O5 · Split Hero

**Purpose** — image and message share the first screen equally.

**Layout** — 50/50. Image one side, headline + paragraph + CTA the other. Stacks on mobile with
the image first.

**Content** — headline (≤5 words), paragraph (≤30), one CTA.

**Images** — a cutout or a tightly cropped photo. Must read at 270px wide.

**Spacing** — 32 / 32, 20 between the halves.

**Variations** — (a) image left, (b) image right, (c) image bleeding off the outer edge.

**Use when** — a launch or a single-product focus. **Pairs with** — Spec Pills, Product Showcase.

---

## 3. Body sections

### B1 · Zig-Zag Rows

**Purpose** — the workhorse. Several related points, each with its own picture.

**Layout** — image one side, copy the other; **the side alternates every row**. That alternation is
the whole value of the section — it is what stops a body reading as a list.

**Content** — per row: a two-line headline, and 3–4 benefit pills or a ≤30-word paragraph.

**Images** — cutouts on the flat colour, or inset photographs with 12px corners. Consistent
treatment across all rows — mixing cutouts and photos in one zig-zag looks like an accident.

**Type** — row headline 22, pills 11.5.

**Colour** — inherits the section band. If the band is inverted (see Colour Band), titles take the
accent and pills take white.

**Spacing** — 40 between rows.

**Variations** — (a) strict alternation, (b) all images left with a strong left rule — quieter,
better for 4+ rows, (c) image above copy, centred, for two rows only.

**Use when** — ingredients, benefits, features, steps with pictures.
**Pairs with** — Colour Band above and below, CTA Band beneath.

---

### B2 · Icon Rows

**Purpose** — several claims where a photograph per claim would be overkill.

**Layout** — a filled icon disc leading each row, title and one line of copy beside it.

**Content** — 3–5 rows. Title ≤4 words, copy ≤14.

**Type** — row title 16, copy 14.

**Colour** — disc in the accent, glyph in the opposite colour.

**Spacing** — 24 between rows.

**Variations** — (a) filled discs, loud, (b) hairline ring icons with the dose in the title
("LION'S MANE · 500MG") and hairline rules between rows — quiet, for when the copy does the work,
(c) three across in a row rather than stacked.

**Use when** — benefits, free-from claims, the formula. **Pairs with** — Spec Pills, Process Strip.

---

### B3 · Compare Table

**Purpose** — us against the alternative, settled in four seconds.

**Layout** — two column heads with matched art, then one rounded row per attribute: a narrow label
gutter, our cell, theirs.

**Content** — 5–8 rows. Each cell ≤7 words.

**Images** — both column heads photographed, sized so the two *products* match — not so the two
files match. A competitor's product looking bigger than yours undoes the whole section.

**Colour** — our column filled gold with forest type; theirs a hairline outline at 72% opacity. The
colour is the argument.

**Spacing** — 6 between rows, 32 above and below.

**Variations** — (a) two columns, (b) three (us / them / them), (c) no art, labels only — tighter,
for a quick mid-email comparison.

**Where a competitor figure can't be sourced, use an em dash.** A plausible number you cannot stand
behind is worse than an honest blank.

**Use when** — switching campaigns, category education. **Pairs with** — Review Grid directly
beneath: the claim, then the corroboration.

---

### B4 · Process Strip

**Purpose** — "it's easy", shown rather than asserted.

**Layout** — three steps across, each a numeral or icon, a one-word label, and a short line.

**Content** — exactly 3 steps. Four is a process; three is a ritual.

**Type** — numeral 32, label 16 caps, line 13.

**Spacing** — 32 / 32.

**Variations** — (a) three across, (b) vertical with a connecting rule, (c) numerals replaced by
icons.

**Use when** — preparation, ritual, onboarding. **Pairs with** — CTA Band.

---

### B5 · Letter

**Purpose** — the founder speaks. The one section allowed to be mostly words.

**Layout** — a cream paper sheet with fibre grain, a lit top edge, a layered shadow and 6px
corners, or the same copy directly on the ground with no sheet.

**Content** — 120–250 words. Emphasis phrases bolded in the accent colour — choose them
deliberately; they are what a skimmer takes away.

**Type** — body 16, line-height 1.65. Never below 16 here.

**Spacing** — 48 / 48. This section needs air around it or it reads as a terms-and-conditions box.

**Variations** — (a) on paper, (b) bare on the ground, (c) with a signature image.

**Use when** — founder notes, apologies, brand moments, anniversaries.
**Pairs with** — Text-Over-Image above, quiet CTA Band below. **Never** next to a Product Grid.

---

### B6 · Spec Pills

**Purpose** — the whole formula readable in two seconds, before anyone has decided to read.

**Layout** — a wrapped cluster of small pills, one fact each.

**Content** — 3–5 chips, each ≤4 words. A chip that wraps stops looking like a label.

**Colour** — gold fill, forest type, on any ground. On an inverted band where titles are already
gold, use white fill instead — two golds at different sizes read as one gold mass.

**Spacing** — 24 / 24.

**Variations** — (a) gold stamped, (b) white stamped, (c) hairline outline — quietest.

**Use when** — directly under a product shot, high in the email.
**Pairs with** — everything. The most portable section in the kit.

---

### B7 · Stat Band

**Purpose** — one number, made unmissable.

**Layout** — an oversized numeral with a short caption beneath, centred; or two or three across.

**Content** — 1–3 figures. Real, sourced figures only.

**Type** — numeral 64 with a gradient fill, caption 12 caps.

**Spacing** — 48 / 48.

**Variations** — (a) one figure, (b) three across, (c) figure inside a colour band.

**Use when** — a genuinely striking number exists. **Never** invent one to fill the layout.

---

## 4. Product sections

### P1 · Product Showcase

**Purpose** — one product, presented properly.

**Layout** — large product image, name, one line, price, CTA. Centred or split.

**Images** — cutout on the flat colour, or a lifestyle shot inset with 12px corners.

**Spacing** — 40 / 40.

**Variations** — (a) centred, (b) split with copy beside, (c) bleeding off one edge.

---

### P2 · Product Grid

**Purpose** — several products or variants at once.

**Layout** — 2-up or 3-up cards, equal height **per row** — the row equalises to its taller card,
and the whole grid does not equalise to its tallest. A grid with one global height leaves voids
under the short cards.

**Content** — per card: image, name, one line, price. An optional badge on the image.

**Images** — identical treatment and identical crop ratio across every card. This is the section
where inconsistent product photography is most visible.

**Spacing** — 14 between cards, 40 around the grid.

**Variations** — (a) 2-up, (b) 3-up, (c) 2-up with the last card full width when the count is odd.

**Use when** — the range, a gift guide, variants. **Pairs with** — Bundle Tiers.

---

### P3 · Bundle Tiers

**Purpose** — the offer, and the reason to buy more than one.

**Layout** — product image, then a row per tier: quantity, the saving, the struck-through original
price, the price, a button.

**Content** — 2–3 tiers. Prices from the product truth file, never estimated.

**Spacing** — 40 / 40.

**Variations** — (a) tiers stacked, (b) three across, (c) with a subscription row beneath.

**Use when** — promo and conversion emails. **Always the last section before the footer.**

---

## 5. Proof sections

### S1 · Review Grid

**Purpose** — the argument, handed to customers.

**Layout** — two cards per row, equalised per row, the name pinned to the bottom edge so every
attribution lines up. An odd final card runs full width.

**Content** — per card: stars, the customer's own review title, the quote, the name. **Carry the
title** — it gives every card a fixed top line, which is what stops a grid of equal cards reading
half-empty when the quotes run to different lengths.

**Colour** — gold card, forest type, on any ground.

**Spacing** — 14 between, 40 around.

**Variations** — (a) 2-up grid, (b) full-width stack for long or uneven quotes, (c) one hero quote.

**This section ships as live text, never as a flattened image.** An image-only testimonial block has
nothing to click and nothing to read with images off; Milonga's previous one took roughly a third
of the clicks of the campaigns around it.

**Order longest-with-longest.** In a row of equal-height cards the taller sets the height, so
pairing a long quote with a short one buys a void.

**Never invent, never reword.** Trim for length at a sentence boundary and say what was cut.

---

### S2 · Hero Quote

**Purpose** — one review, given the weight of a headline.

**Layout** — oversized quotation set centred, stars above, name below. No card.

**Type** — 24–32, italic.

**Spacing** — 48 / 48.

**Use when** — one review says the thing the whole email is arguing. **Pairs with** — CTA Band.

---

## 6. Rhythm devices

These are not content. They exist to control pace, and an email without at least one of them reads
as a document.

### R-A · Colour Band

An inverted band — dark green inside a cream email, or cream inside a dark green one — wrapping one
complete act. **Both edges must land where the page colour is already flat**, and the band must map
onto a whole act, never a half of one. Inside it the contrast map flips: titles take the accent,
pills go white.

Also the natural cut line for the image export: each exported image then carries one flat
background at its boundary and the seam cannot show.

### R-B · Bleed Image

A cutout entering from the left or right edge and running past the margin. Alternating edges down
an email is what gives a long email rhythm. Nothing else in the kit does this job.

### R-C · Marquee Strip

A single line of small caps at wide tracking, repeated across the full width — `ENERGY THAT
THINKS · ENERGY THAT THINKS ·`. A hairline above and below. Costs 40px and resets the reader's eye
between two heavy sections.

### R-D · Breath

Deliberate empty ground, 48–64px, with nothing in it. The cheapest premium signal available and the
first thing cut under pressure. Don't cut it.

---

## 7. Closers

### C1 · CTA Band

**Layout** — optional spec pills, then one button. Centred.
**Type** — button 13.5 caps, weight 900, minimum 44px tap height.
**Colour** — gold on dark, forest on light. Pill radius.
**Spacing** — 40 / 40.
**Variations** — (a) button alone, (b) pills then button, (c) short line then button.

### C2 · Footer

Logo, social links, legal, unsubscribe. Hairline above is optional and campaign-specific.
Never an image — unsubscribe must be live text.

---

## 8. The hard specs

Evidence-backed by the benchmark of 90 competitor emails. These are not preferences.

| Spec | Value | Why |
|---|---|---|
| Container | **600px** | Universal across all six brands, 90/90 emails. No upside in deviating |
| Breakpoint | **480px** | The only breakpoint any of the six ships |
| Body type | **16px minimum**, never below | Four of six run 13px, which is uncomfortable on a phone. The one brand at 20px also carries the most copy — big type did not force them to say less |
| Type scale | 16 / 18 / 20 / 24 / 32 / 40 | 8px base |
| Line height | 1.4 body, 1.15 headline | `100%` is heavy in the corpus and is a template default, not a decision |
| Spacing | 8 / 16 / 24 / 32 / 48 / 64 | 8px base. **No 9px anywhere** — it is an inherited template default three of the six never cleaned up |
| Button radius | **pill** | 0px dominates all six. A pill is a free differentiator in a field of square corners |
| Alt text | **100%, meaningful** | Best in the category is 87% |
| Dark mode | `@media (prefers-color-scheme: dark)` on every template | Zero of 90 declare it — see the caveat in §9 |
| Live text | Headlines, body and CTA labels are always real text | Five of six bake them into pixels |
| Image-link share | Under 30% | Category runs 61–87%. The best is 21% |

**The images-off test.** Before export, turn images off. The email must still read and still have a
clickable CTA. Five of those six brands would fail it today.

---

## 9. Provenance — what this is built on, and what it isn't

**Sections 8's specs come from the benchmark** of 90 emails across six brands (Athletic Brewing,
Brez, Cann, Nowadays, MUD\WTR, Mateina), measured from DOM structure and inline styles. Container
widths, palettes, type sizes, spacing values, image-vs-text link ratios, alt coverage and word
counts are solid — Milled does not rewrite markup.

**Sections 2–7 are not derived from those emails.** The benchmark is quantitative: it measures
palette, type and spacing, not layout. The campaign HTML that would let anyone study hero
variations, collages, editorial moments or section transitions **was not available** — only the
benchmark document arrived. So the section kit above is built from Milonga's own accumulated design
memory, the patterns already proven in our campaigns, and ordinary editorial design judgement. It is
not a transcription of anyone's emails, and it should not be described as one.

**To make it evidence-led, the raw campaign HTML is what's needed** — the `corpus-raw/` output of
the builder script, or a handful of saved `.html` files from the brands worth studying hardest. With
those, this file can be revised against what actually works rather than what is defensible.

**Three measurements in the benchmark are unmeasured, not zero**, and should not be treated as
category gaps without checking: `prefers-color-scheme` absence (Milled normalises head CSS),
`text-transform: uppercase` returning 0 across all 90 emails (not credible), and image `height`
attributes. The dark-mode block is worth shipping regardless — it is correct on its own merits.

**No performance data.** This is a craft benchmark, not an effectiveness one. Cann's 87%
image-heavy emails may well convert better than Nowadays' text-led ones. Validate against Klaviyo.
