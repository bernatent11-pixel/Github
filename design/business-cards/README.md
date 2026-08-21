# Milonga business cards

Redesign of the two printed business cards, rebuilt on the Milonga email design
system (Visual Design Guidelines v2.0 tokens: Deep Green `#0E4E2A`, Light Cream
`#F2EFE7`, Citrus Yellow `#FBC747`, Forest Green `#1A6B3A`, Gotham type ramp,
70/24/6 colour discipline, flat — no patterns, no shadows).

Four artboards, two complete directions. Any front works with either back.

| File | Artboard |
| --- | --- |
| `Main.dc.html` | Front A — split band. QR sits in its own full-height cream field. |
| `Back.dc.html` | Back A — review offer, `15% OFF` as the hook, Deep Green contact strip. |
| `FrontAlt.dc.html` | Front B — one uninterrupted green field, QR as a soft cream tile. |
| `BackAlt.dc.html` | Back B — contact face, for when the card shouldn't carry the offer. |

## Print spec

- **1050 × 600 px = 3.5 × 2 in at 300 dpi** (trim size — same as the current artwork).
- All live copy sits inside a **72 px (0.24 in) safe margin**.
- Ask the printer for **0.125 in bleed**: add 38 px of the background colour on
  every side when exporting, so the green and cream fields run off the edge.
- Type is **Montserrat** as a stand-in. Swap to real **Gotham** for print —
  Black for the caps line, Bold Italic for the punchline, Medium for the URL and
  contact line.

## QR codes

Generated with `segno` at **error correction level H**, Deep Green modules on
cream with a 4-module quiet zone and the hand-and-canopy mark knocked into the
centre (~7.8% of modules covered; H tolerates 30%).

Both codes were decode-tested at print size with the knockout in place — Front A
at 0.86 in, Back A at 0.82 in, Front B at 0.59 in all read.

| Card | Encodes |
| --- | --- |
| Front | `https://preparematelatte.milonga.life/link` |
| Back | `https://preparematelatte.milonga.life/review` — **placeholder**, regenerate against the real review destination before printing |

Polarity matters: these are **dark modules on a light field**. The previous cards
inverted this (white modules on green / tan), which many scanners will not read,
and white-on-tan measured roughly 2.4:1 contrast.

## Rebuilding

```bash
pip install segno Pillow numpy
python3 mk_logo.py   # ICONOS_1.png -> logo-cream.png, logo-green.png
python3 mk_mark.py   # ICONOS_1.png -> mark-green.png (icon only, for the QR centre)
python3 mk_qr.py     # -> qr.json (QR path data)
python3 build.py     # -> the four .dc.html artboards

node "<claude design skill>/seed-canvas.mjs" \
  --template "<claude design skill>/payload.template.html" \
  --out milonga-business-cards.html \
  --title "Milonga Business Cards" \
  --artboard Main.dc.html --artboard Back.dc.html \
  --artboard FrontAlt.dc.html --artboard BackAlt.dc.html \
  --image logo-cream.png --image logo-green.png --image mark-green.png \
  --canvas canvas.json
```

`milonga-business-cards.html` is a ~2.4 MB generated bundle and is gitignored.
