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
| `out/halloween-hero-email.jpg` | 1200×1300 | Email: the product cluster only, for a 600px slot |

Round 1 carries four products: Citrus Mango 10mg, Peach Ginger 10mg, Açaí Mint
10mg, and Açaí Mint functional energy. The centre, where the reference had the
Mate Latte pouch, holds the whole ghost and the gourd until the rest arrive.

## Rebuild

```bash
./run.sh            # plate → sprites → plate → compose; deterministic
```

Needs Python with `numpy`, `opencv-python-headless` and `Pillow`.

| Step | Script | What it does |
|---|---|---|
| Plate | `tools/build_plate.py` | Models the orange backdrop and erases the seven AI products, the fruit they sliced, and the ghosts, refilling from each hole's own edge so no seam shows |
| Sprites | `tools/cut_sprites.py` | Cuts the five ghosts, the gourd and the top peach out whole (GrabCut, seeded against the backdrop field) so they can be placed as layers |
| Compose | `tools/compose.py` | Lays out `slots.json`: cans with a burnt-orange shadow, warm rim and light warm grade; ghosts with their bloom. Each ghost the AI cans had sliced is slid until its cut edge hides behind a real can |
| Packshot keying | `tools/key_flat_bg.py` | Cuts a can off a flat studio colour (used for the lavender Açaí Mint energy shot) |

## Adding the rest of the lineup

1. Put the packshot in `email-ds/public/product/` as a transparent PNG. A packshot
   on a flat colour can be keyed with `python3 tools/key_flat_bg.py <in> <out.png>`
2. Add a `can` layer to `slots.json` (or a pouch — same fields, `native_width` = its
   body width in the PNG). `pending` lists where the reference had each one
3. Move the centre ghost and gourd if the pouch takes the centre, then `./run.sh`
   and look at the render before shipping

The reference's ring of seven does not fit the frame with every label readable:
its centre column stacks a can, the pouch and a can (about 1,250px of products
in a 1,116px frame), so the top can hides behind the pouch and the bottom one
runs off the edge. The 7-up layout needs a re-plan, not a drop-in — smaller
cans, or the pouch out of that column. Settle it when the packshots are in.

## Compliance

Three of the four cans read **10mg THC | 10mg CBD** on the pack. Like Unwind and
Sober October, this hero belongs only in sends to the audience cleared for the
infused line, with the infused-line disclosures in the email.
