# Halloween hero — real packshots in the AI scene

The reference (`source/reference.png`) is an AI render: the scene is good, but
every can and the pouch carry invented small print. This folder rebuilds it with
the products as **real packshots, composited** — every word on a can is the
actual artwork, scaled and rotated once, never redrawn.

## Outputs

| File | Size | Use |
|---|---|---|
| `out/halloween-hero@2x.png` | 4000×2232 | Master, same frame as the reference at 2× |
| `out/halloween-hero.jpg` | 2000×1116 | Web banner, drop-in for the reference |
| `out/halloween-hero-email.jpg` | 1200×1185 | Email: the product cluster only, for a 600px slot |

The full lineup, every label the real artwork:

| Left — functional energy | Centre | Right — 10mg infused |
|---|---|---|
| Citrus Mango | | Citrus Mango |
| Peach Ginger | Mate Latte, Vanilla (pouch) | Peach Ginger |
| Açaí Mint | | Açaí Mint |

Flavours share a row across the two lines, so the eye reads the range as a
system: three flavours, two formulas, and the latte between them.

**Why not the reference's arrangement.** Its ring stacked a can, the pouch and a
can in the centre column, about 1,250px of product in a 1,116px frame, so the top
can hid behind the pouch and the bottom one ran off the edge. Here the pouch has
the centre column to itself, and the cans form a hexagon around it: no product
overlaps another's label.

## Rebuild

```bash
./run.sh            # plate → sprites → plate → compose; deterministic
```

Needs Python with `numpy`, `opencv-python-headless` and `Pillow`.

| Step | Script | What it does |
|---|---|---|
| Plate | `tools/build_plate.py` | Models the orange backdrop and erases the seven AI products, the fruit they sliced, and the ghosts, refilling from each hole's own edge so no seam shows |
| Sprites | `tools/cut_sprites.py` | Cuts the five ghosts, the gourd and the loose fruit out whole (GrabCut, seeded by difference from the backdrop) so each can be placed as a layer |
| Compose | `tools/compose.py` | Lays out `slots.json`: cans with a burnt-orange shadow, warm rim and light warm grade; ghosts with their bloom. Each ghost the AI cans had sliced is slid until its cut edge hides behind a real can |
| Packshot keying | `tools/key_flat_bg.py` | Cuts a can off a flat studio colour (the lavender, peach and yellow functional-can shots) |
| Pouch | `tools/cut_pouch.py` | Cuts the pouch off its white sweep and drops the latte glass that stood in front of it; the hidden strip of forest art is rebuilt from the pouch's own left edge, mirrored and tone-matched row by row |

## Changing the lineup

1. Put the packshot in `email-ds/public/product/` as a transparent PNG. A packshot
   on a flat colour can be keyed with `python3 tools/key_flat_bg.py <in> <out.png>`
2. Point a `can` layer in `slots.json` at it (the pouch uses the same fields), or
   add one and make room
3. `./run.sh`, then look at the render at 100% before shipping it. The ghosts
   re-tuck themselves; fruit sprites are placed by hand

## Compliance

Three of the seven products read **10mg THC | 10mg CBD** on the pack. Like Unwind and
Sober October, this hero belongs only in sends to the audience cleared for the
infused line, with the infused-line disclosures in the email.
