# Milonga email design — memory

Everything Bernat has asked the design system to remember. **Read this before designing anything;
it overrides the skill's reference files, because it is newer and came from him directly.**

- **Active rules** is what gets applied. Every row here is live — nothing struck, nothing stale.
  Rules are **append-only, so the last row is the newest**
- **Log** is why — what prompted a rule, what it replaced, and anything still to be pinned down
- When a new rule contradicts an old one, **delete the old row, add the new one, and quote the old
  text in the log**. Most collisions are partial: carry the unchanged parts forward verbatim
- **Area** is one of `Background · Colour · Type · Depth · Icons · Images · Buttons · Structure ·
  Export · Letters`. Dates on new rules are full ISO. The seeded rules below predate this file and
  carry the month only

---

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
| 2026-09-10 | Background | The education act can invert the page — a dark green band on a cream email (or the reverse) marking the middle act as its own chapter. Both edges must land on a row where the page colour is already flat, never mid-content | Bernat |
| 2026-09-10 | Colour | **On dark green, titles are white and benefit pills gold.** Gold then means one thing across the whole email — the pills in an inverted band match the spec pills in the closing act, so the email reads as one system | Bernat, chose it over gold titles with white pills |
| 2026-09-10 | Export | When an email has a colour band, cut the Klaviyo images **on the colour edges** rather than hunting for a flat row — each image then carries one flat background at its boundary and the seam cannot show | Bernat |

---

## Log

**2026-09-10 — the inverted education band.** Bernat asked to "reverse the colours" on the middle
section of the ingredients email: dark green ground, gold titles, white benefit pills. Applied to
all three ingredient blocks plus the "Discover more" CTA that closes them, so the band is one
continuous chapter rather than three stripes.

Two things came out of it that are system-level, not campaign-level. First, the colour pairing
inside the band — see below; it was decided by comparison, not by argument. Second, the band's two
colour edges are the natural cut lines for the Klaviyo export — better than the flat-row search,
which is a way of *finding* an invisible seam when a hard edge is already there to *be* one.

**Gold titles with white pills was built, shown, and rejected.** The case for it was hierarchy: a
gold title reads before white benefits, so the ingredient name stays the loudest thing in its
block. Bernat picked the reverse — white titles, gold pills — and it supersedes the rule this
session first recorded (*"On dark green, gold titles take white pills, not gold ones. Gold pills
under a gold title collapse into one gold mass"*). The reason it loses: it makes gold mean two
different things in one email, since the closing act's spec pills are gold. Consistency of the
accent across the whole email beat local hierarchy inside one block. `SpecPills` keeps its `white`
variant — it is a sound option for a band with no gold elsewhere — but **do not re-propose it for
this email**.

**Note on the "one flat background per email" rule.** This is the second sanctioned transition
(the first being the forest canopy), and it is a hard edge rather than a scene, which that rule
warns against. It works here because both edges land in already-flat cream and because the band
maps exactly onto one act of the email. `references/design-system.md` §2 is now narrower than
what memory allows; the reference should be updated to describe both kinds of transition.


**2026-09-08 — ported from the previous Milonga email system.** Bernat sent the old design
system (the cannabis/Lion's Mane can line) and asked for anything that fits. Taken: the two-line
Black + Bold Italic headline — the signature move of that system and the reason he called those
emails "simple but clean"; the spec pill cluster; the ring-icon ingredient row with the dose in
the title; the documented type scale and 8px grid; and the inbox-preview chrome for reviewing.

**Deliberately not taken.** The yellow five-star review card — Milonga has no reviews yet and the
standing rule is not to invent any; it can be built in an afternoon once real ones exist. The old
palette (deep green #0E4E2A, cream #F2EFE7, citrus yellow #FBC747) — the new product's branding is
the brand now, so our #004D27 / #F0EFDF / #E3BC62 stand. The cannabis-line ingredient icons and
the jungle-band artwork, which we already cover with the forest canopy. An FDA compliance
paragraph was added to Footer as an **optional** prop only: whether an email needs one is a legal
question, not a design one.

**2026-09-08 — paper treatment for letters.** Bernat asked for a cream rectangle behind the
founder-note copy "so it looks like a personal note", then for it to actually look like paper.
Added fibre grain, a warm gradient across the sheet, a lit top edge, and a two-part shadow (tight
contact + wide ambient). Corners went from 22px to 6px — the soft radius was the biggest tell that
it was a card, not a sheet. Kept as an option, not a default: the same letter also works directly
on the green, and Bernat has both versions.

**2026-09-02 — beige is one green.** Superseded the earlier allowance for leaf-green accents and
any gold on beige. Gold on beige measures about 1.5:1 contrast and is effectively unreadable;
leaf green read as a third colour with no job. Beige emails are now dark green type throughout.

**2026-09 — balanced headlines.** A long hero headline was wrapping into two full lines plus a
one-word stub. Rather than hand-tuning each title, headline sizing became automatic: fit to one
line where it nearly fits, otherwise size to two rows of even width.

**2026-08 — rejected.** Badge/pill assets with backgrounds, and the supplied divider assets — the
previously designed dividers were kept instead. Only the background-less icons, the two textures
and the forest canopy were taken from that asset drop.

---

## Campaign-specific choices — *not* rules

Kept here so they aren't mistaken for system rules on a future read.

- The ingredients email carries **no dividers at all**, including the footer hairline. That was a
  choice for that campaign, not a system default
- The botanical product shot is used **at its original crop**. An attempt to add breathing room
  around it was reverted — Bernat wants that file untouched
