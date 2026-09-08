# Wiring designs into the performance report

**Most of this already works** — `email-performance-report` reads the build records in
`/Email Marketing Agent/campaigns/` "and its screenshot". When this skill fills the AS BUILT
section it writes the design path into the **Screenshot** field, so the report can follow it to the
images without any change.

The transcription of copy baked into images is what actually closes the gap. The report can already
correlate:

| The report explains | Using |
|---|---|
| Open rate | Subject line, preview text, send time — from the build record |
| Click rate | Design, copy, CTA — from AS BUILT **plus the design images** |
| Conversion rate | What the email promised vs. what the landing page delivered |

---

## Optional: make the designs folder explicit in the report skill

`email-performance-report` is synced from claude.ai, so edit it there rather than on disk — a local
edit is overwritten on the next sync.

In its **"What it reads"** table (near the end of its SKILL.md, alongside the row for
`/campaigns/`), add:

```markdown
| **`/campaigns/designs/[Month]/YYYY-MM-week-N/`** | The built design — full PNG, Klaviyo slices and source, one folder per campaign, named identically to its build record. Look here when a build record's AS BUILT points at a design |
```

And in the data-gathering step where it lists `/Email Marketing Agent/campaigns/`, add:

```markdown
Also list `/Email Marketing Agent/campaigns/designs/[Month]/` for the report month. A campaign with
a design but no completed AS BUILT means the copy inside its images was never transcribed — note it
in Data Notes, because the diagnosis for that campaign can only cover structure, not words.
```

That last line matters more than it looks: it turns a silent gap into a visible one. Without it, a
campaign whose AS BUILT was skipped gets diagnosed as if it had no copy, rather than flagged as
missing data.
