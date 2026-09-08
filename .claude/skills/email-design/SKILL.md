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
3. **State what you loaded** in one line: how many active rules are in memory and the most recent
   one. It tells Bernat the system is actually carrying what he taught it, rather than starting
   from scratch each time.

> Design system loaded — 14 remembered rules, most recent: *"beige backgrounds take dark green
> type only, no leaf green, no gold" (2026-09-02)*.

**When memory and this file disagree, memory wins.** The memory is newer by definition, and it is
what Bernat actually asked for.

---

## Remembering — the part that makes this compound

**Trigger on intent, not on the word "remember".** All of these are the same instruction:

- "remember that all titles are in caps"
- "from now on, beige emails use dark green titles"
- "always make the last paragraph bigger"
- "I don't like how X looks, do Y instead" — *said about the system, not this one email*

The distinction that matters: **is this a rule, or a fix to this campaign?** "Make this headline
smaller" is a fix. "Long headlines should always fit two even rows" is a rule. When it is genuinely
ambiguous, ask in one line — a wrong guess either pollutes the memory with one-off tweaks or loses
a rule that should have stuck.

### How to write a remembered rule

Append to the **Active rules** table in the memory file:

```
| 2026-09-08 | Titles | Long headlines auto-fit to two rows of even width, never a long line plus a stub | Bernat, on the founder note |
```

Then add the reasoning to the **Log** below it — what prompted it, what it replaced. The rule table
is what gets applied; the log is what explains it in six months.

**When a new rule contradicts an old one, supersede it — don't stack.** Strike the old row, note in
the log which rule replaced it and why. A memory full of contradictions is worse than no memory,
because the next session has to guess which one is live. This is the single most important
maintenance rule in the file.

**Confirm what you stored, in the words you stored it:**

> Remembered — *"Gold on beige is too low-contrast for body copy; use dark green"*. That's rule 15,
> and it supersedes rule 6 which allowed gold accents on beige.

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
4. **Mirror and commit the memory** if the repo is present

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
