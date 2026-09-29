# Milonga carousels

Five email campaigns, reflowed as Instagram feed carousels. 25 slides,
1080 × 1350 (4:5) — the tallest frame the feed allows, so each slide takes the
most screen it can.

| Folder | From the email | Slides |
|---|---|---|
| `mate-latte-why` | Why We Turned Mate Into a Latte | 5 |
| `mate-ritual` | Why Mate Is Meant to Be Shared | 5 |
| `three-ingredients` | Everything Your Mornings Need | 5 |
| `coffee-vs-mate` | Meet Your Coffee's Competition | 5 |
| `set-the-tone` | Set the Tone for Your Day | 5 |

Upload `slide-01` … `slide-05` in order.

## What changed from the email, and why

An email section and a feed slide are different objects, so this is a reflow
rather than a resize.

**Height stops being an outcome and becomes a budget.** An email section is as
tall as its content — 900px in one place, 2800px in another — and the reader
scrolls. A slide is a fixed window, and anything that overflows is gone, not
clipped politely. So sections carrying three paragraphs became two or three
slides with one idea each.

**Type went up, not down.** Body copy that reads well in an email at 16px is a
wall at arm's length on a phone. Slides run 20–27px body against 36–56px
headlines.

**Three things were restructured rather than resized.** The coffee comparison
was a six-row table, which is a reference document — it became three slides of
one contrast each, which is how the argument lands in conversation anyway. The
five-item callout diagram lost its two weakest items to the closing spec line.
The three-ingredient email was the one that cost nothing: it was already three
parallel units, so each ingredient simply took a slide.

**The last slide is always the ask.** It is the only slide a reader reaches on
purpose.

**No wordmark and no slide counters.** The handle already sits above the post
and the dot row already says where a reader is, so both were removed from
every slide in the set.

**On a light photograph the ink goes dark.** Four of the shots in this set are
bright — the flatlay is on cream, the kitchen counter is marble, the jar is on
warm beige — and cream type on them was being rescued with a heavier and
heavier scrim, which turns a warm morning photograph into a grey one. They
carry forest green type on the picture as shot instead, with no wash at all.
Where the photograph IS dark, the scrim stays and does its job: the two
outdoor shots in `mate-ritual` run 0.58–0.66 at the foot, because sunlit grass
measures well over 130 and cream cannot hold on it unaided.

**The crop is a layout tool, not just a framing one.** Every source here is
portrait, so inside a 4:5 frame the width binds and the excess height is
free — 150 design units on a 2:3 source and 325 on the flatlay. Anchoring the
crop to the top or the foot spends all of it at one end instead of splitting
it, which is usually how a clean band of ground appears for the type without
touching the picture.

## One substitution worth knowing

`mate-ritual` slide 5 uses the CLEAN crop of the product still life. The file
the email shipped contains an açaí-mint can whose label reads "10mg THC | 10mg
CBD", and a public feed post is a worse place for that than an inbox.

## Rebuilding

Slides are authored in `emails/carousel/*.jsx` at 600 × 750 design units — the
same 600px scale the email templates use — and shot at 1.8×, which lands on
1080 × 1350 natively. One set of numbers serves both destinations.

```
npm run preview
node scripts/shoot-carousel.mjs carousel-<name>.html social/<name>
```

An optional third argument is the scale, so the same harness also cuts a 4K
master — 5.12× is 3072 × 3840, the same 4:5 frame:

```
node scripts/shoot-carousel.mjs carousel-<name>.html social/<name>-4k 5.12
```

The type is drawn at that size, so it is genuinely 4K sharp. The photographs
are not: the source files are 1080-1500px wide, so they are upsampled and hold
no detail the 1080 version does not. Instagram re-encodes anything wider than
1080 anyway — the master is for print, stories and anywhere else the same
artwork has to go bigger.
