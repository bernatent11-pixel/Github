# Wiring the email memory into the other skills

The memory file lives at `/Email Marketing Agent/email-memory.md` (seeded from
`assets/email-memory-template.md`).

**It is worthless unless something writes to it and something reads it.** Four one-line edits, made
on claude.ai — these skills are synced, so a local edit is overwritten on the next sync.

---

## The loop

```
   report  ──writes──▶  email-memory.md  ──reads──▶  strategy
                              │                          │
                              └──reads──▶ subject lines, copy
```

The report is the only skill that *proves* anything, so it's the only one that writes Proven and
Disproven. Everything else reads.

---

## 1. `email-performance-report` — write at the end

Add a final phase, after the workbook is filled:

```markdown
## Update the email memory

Open `/Email Marketing Agent/email-memory.md` and add only what this month **proved**, not
everything it showed. A single campaign beating average is not proof; a pattern holding across
three sends, or a deliberate test resolving, is.

- Something that worked repeatably → **Proven**, with the campaign names and numbers as evidence
- Something that clearly failed → **Disproven**, with what happened
- An **Open bet** that settled → move it, and say which way
- New evidence contradicting an existing entry → replace it, quote the old text in the log

If the month proved nothing, write that in the log. "Not enough data" is a real finding and stops
the next session inventing a pattern from noise.
```

## 2. `email-monthly-strategy` — read first

In its load table:

```markdown
| **The memory** | `/Email Marketing Agent/email-memory.md` | **What has already been proven and disproven on this list.** Do not re-propose a Disproven tactic without saying why it's different this time |
```

## 3. `email-subject-lines` — read before writing

```markdown
| **The memory** | `/Email Marketing Agent/email-memory.md` | Proven subject-line patterns for this list — the section headed *Subject lines* |
```

## 4. `email-copy-and-design` — read before writing

```markdown
| **The memory** | `/Email Marketing Agent/email-memory.md` | Proven copy, offer and design patterns — and the Disproven list, so we don't rebuild something that already failed |
```

---

## Why a file rather than Claude's built-in memory

Built-in memory is per-surface — claude.ai, Claude Code and the desktop app don't share one store,
and this system runs across all three. A file in the folder every skill already reads is the only
thing all of them see.

It's also reviewable. Bernat can open it, disagree with an entry, and correct it. A model-managed
memory can't be audited, corrected line by line, or diffed month over month — and for a store that
drives what gets sent to the whole list, being able to say *"no, that's wrong"* matters more than
the convenience.
