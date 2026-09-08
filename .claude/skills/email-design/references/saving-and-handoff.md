# Saving a finished design, and handing it to the report

Run all of this when Bernat approves a design. The point of the naming is that a human — and the
performance report — can put a design next to its copy without searching.

---

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

## 5. Mirror and commit the memory

If the Github repo is present:

```bash
cp "/Email Marketing Agent/design-system/design-memory.md" \
   email-ds/.design-sync/design-memory.md
git add email-ds/.design-sync/design-memory.md && git commit -m "design memory: <the rule>"
```

The folder copy is the source of truth — it's the one that's always there. The repo copy exists so
the design language has a dated, diffable history: months later, "when did we stop using gold on
beige, and why" is answerable.

If the repo isn't available, skip this silently. It's a convenience, not a requirement.

---

## 6. Report back

> **Design saved.**
>
> 🎨 `/Email Marketing Agent/campaigns/designs/September/2026-09-week-2/2026-09-15-founder-note-free-samples/`
> — full PNG + 2 Klaviyo slices + source
> 📋 AS BUILT completed in `2026-09-15-founder-note-free-samples.md`, image copy transcribed
> 🧠 Memory: no new rules this round
