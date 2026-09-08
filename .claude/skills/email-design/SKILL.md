---
name: email-design
description: Design and build Milonga's email campaigns on the Milonga email design system, and remember every design decision so the system keeps improving. Use whenever the user wants to design an email, build an email design, mock up a campaign, change how an email looks, restyle a section, export an email for Klaviyo, or asks what the design system says. Also use whenever the user tells you to remember a design preference or improvement ("remember that", "from now on titles should…", "always do X in our emails") — capturing that into the design memory is this skill's job. Runs after email-copy-and-design has written the copy, and hands finished designs to email-performance-report. Trigger even if the user just says "let's design this email", "activate the design system", or "/email-design".
---

# Milonga — Email Design System

**This skill has memory.** The design language is not fixed in this file — it grows every time
Bernat says how something should look. Load the memory first, apply it, and add to it.

---

## The three files this skill lives on

| File | Holds | Read it |
|---|---|---|
| `/Email Marketing Agent/design-system/design-memory.md` | **Accumulated preferences.** Every rule Bernat asked to remember, dated | **Every activation, first** |
| `references/design-system.md` | The stable visual system — colour contrast map, structure, components, claim limits | Every activation |
| `references/saving-and-handoff.md` | Where finished designs go, how they connect to the copy and the report | Before saving anything |

The memory is the source of truth **on the user's computer**. When the Github repo is present, it is
mirrored to `email-ds/.design-sync/design-memory.md` and committed, so the evolution of the design
language has a dated history. Details in `references/saving-and-handoff.md`.

---

## On activation, before anything else

1. **Read the design memory.** If it does not exist, create it from
   `assets/design-memory-template.md` and say so — a fresh memory is not an error, it is day one.
2. **Read `references/design-system.md`.**
3. **State what you loaded** in one line: how many active rules are in memory, and the newest —
   which is simply the last row of the table. It tells Bernat the system is carrying what he taught
   it, rather than starting from scratch each time.

> Design system loaded — 18 remembered rules, newest: *"a founder note can sit on a cream sheet
> with paper grain and squared-off corners" (2026-09-08)*.

**When memory and this file disagree, memory wins.** The memory is newer by definition, and it is
what Bernat actually asked for.

---

## Remembering — the part that makes this compound

**Trigger on intent, not on the word "remember".** All of these are the same instruction:

- "remember that all titles are in caps"
- "from now on, beige emails use dark green titles"
- "always make the last paragraph bigger"
- "I don't like how X looks, do Y instead" — *said about the system, not this one email*

### Triage it first — three outcomes, not two

| It is | Looks like | Do |
|---|---|---|
| **A fix** | "Make *this* headline smaller" | Just do it. Nothing goes in memory |
| **A rule** | "Long headlines should always fit two even rows" | Store it |
| **An underspecified rule** | "Gold buttons should be more rounded" | Store it, and pin the number |

**The third one is the common case and the easy one to fluff.** "More rounded", "bigger", "warmer"
are real instructions with no measurable target. Store the intent, add an `Open:` note in the log
saying what still needs deciding, and **pin it on the next design that touches it** — propose a
concrete value, get it confirmed, then write the number into the rule. A rule that can't be checked
against a render doesn't hold: the next session picks a radius by eye, the one after picks a
different one, and the memory quietly stops meaning anything.

When it's genuinely ambiguous whether something is a rule or a fix, ask in one line. A wrong guess
either pollutes the memory with one-off tweaks or loses a rule that should have stuck.

### How to write a remembered rule

Append to the **Active rules** table. **Rules are append-only and applied in order, so the last row
is the newest** — that's what makes "most recent rule" answerable without parsing dates.

```
| 2026-09-08 | Type | Long headlines fit two rows of even width, never a long line plus a stub | Bernat, on the founder note |
```

- **Date:** full ISO (`YYYY-MM-DD`) for anything you add
- **Area:** one of `Background · Colour · Type · Depth · Icons · Images · Buttons · Structure ·
  Export · Letters`. Add a new one only when nothing fits, and say so in the log — an area
  vocabulary that grows per rule can't be filtered

Then write the reasoning into the **Log**. The table is what gets applied; the log is what explains
it in six months.

### Superseding — replace the row, don't strike it

**When a new rule contradicts an old one, delete the old row and add the new one**, then record in
the log what was replaced, quoting the old rule's text. Keep the Active table a clean list of what
is live: a struck-through row is still a row someone has to read and decide about, and it makes
"how many active rules" meaningless.

**Most collisions are partial, not total.** An old row often bundles several decisions — title,
body, icon colour — and Bernat changes one. Carry the survivors forward **verbatim** into the new
row and say in the log which parts didn't move. Retyping them from memory is where a decision
silently disappears.

**Also flag when a rule now contradicts `references/design-system.md`.** Memory wins, but the
reference is then knowingly stale, and saying so in the log is what lets someone fix the underlying
component library later.

### Confirm, then persist

Confirm in the words you stored, one line per rule:

> Remembered — *"Dark green backgrounds take beige body copy, never white."* Replaces the earlier
> dark-green rule, which set body to white; titles and icons on it are unchanged.

**Then mirror and commit the memory if the Github repo is present** — see step 5 of
`references/saving-and-handoff.md`. Do this on any turn that changes memory, even one where nothing
was designed. Those turns are exactly the ones where the dated history is the only artifact
produced.

---

## Designing an email

### 1. Get the copy

Designs are built from copy that already exists, not invented alongside it. Look for:

- The build record at `/Email Marketing Agent/campaigns/YYYY-MM-DD-campaign-name.md` — the idea,
  the chosen subject line, the section-by-section copy, the design direction
- Or the week's document at `/Email Marketing Agent/campaigns/copies/[Month]/YYYY-MM-week-N.docx`

If neither exists and Bernat is designing something ad hoc, that's fine — build it, and say plainly
that there's no build record, so it won't reach the performance report unless one is created.

### 2. Build it

**When the `email-ds` repo is available, build with the component library** — it encodes the
contrast map, so colours cannot go off-brand by accident. `references/design-system.md` explains
the component set and the build/preview loop.

**When it isn't**, apply the visual system by hand from the same reference. The rules are the
system; the components are just a fast, safe way to obey them.

### 3. Refine with real renders, not descriptions

Render the email and **look at it** before showing it. Slice tall renders into readable chunks and
read each one. Most design errors in this system are invisible in code and obvious in a picture —
a glyph that fills instead of strokes, a title that wraps into a stub, an image touching its frame.

Show renders, not explanations of renders.

### 4. Iterate on Bernat's notes

Expect several rounds. After each, ask yourself whether the note was campaign-specific or a rule —
see **Remembering** above.

---

## When the design is final

**"Final" means Bernat approved it**, not that you think it's done. On approval, run the whole of
`references/saving-and-handoff.md`. In short:

1. **Export** — full-length PNG, plus the two-image Klaviyo split via `scripts/split-for-klaviyo.mjs`
2. **Save** to `/Email Marketing Agent/campaigns/designs/[Month]/YYYY-MM-week-N/`, mirroring the
   copy document's month and week exactly
3. **Fill the AS BUILT section** of the matching build record — including every word of copy baked
   into images, transcribed verbatim
4. **Mirror and commit the memory** if the repo is present and it changed this session

**Step 3 is the one that is easy to skip and expensive to lose.** The performance report reads
build records to explain *why* a campaign performed. Copy that lives inside a PNG is invisible to
it. Without the transcription, the report can see that an email underperformed but never that its
headline was the reason.

---

## What this skill will not do

**No medical or health claims.** Never that Milonga cures anything, removes stress, causes weight
loss, or makes anyone smarter. Ingredient amounts, caffeine content, "cognitive support", "clean
sustained energy", "balanced and calm", taste and convenience are all fine.

**Never mention THC, CBD, cannabis or weed.**

**No invented social proof.** There are no reviews, ratings, testimonials or customer counts yet.
Do not design a block that needs them.

**No invented product specs.** Doses, prices and ingredients come from the product truth file or
the build record. If a number isn't there, ask — don't fill the layout with a plausible one.

These hold even when a layout would look better with them. A design that needs a fabricated claim
is the wrong design.

---

## Handing off to the report

`references/report-wiring.md` explains how a finished design reaches
`email-performance-report`, and the one optional edit that makes the designs folder explicit to it.
Read it if the report can't find a campaign's design, or when setting the system up.
