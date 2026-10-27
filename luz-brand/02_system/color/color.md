# LUZ Color System

Inherited from the Milonga foundation ("never invent a hex — these five do everything"), with LUZ usage rules.
All Pantone matches are nearest approximations — **confirm against a physical Pantone book with the printer.**
Tin gold is metallic in print: **PMS 871 C metallic ink or hot foil**, chosen with the tin printer. Never simulate it with a CMYK gradient.

## Palette

| Color | HEX | RGB | CMYK (approx) | Pantone | Role |
|---|---|---|---|---|---|
| **Forest** | #004D27 | 0 · 77 · 39 | 100/0/49/70 | PMS 3435 C (nearest) | Primary ground. Backgrounds, buttons, icons, wordmark on light. |
| **Gold** | #E3BC62 | 227 · 188 · 98 | 0/17/57/11 | PMS 141 C (nearest) · tin: PMS 871 C metallic or hot foil | Primary highlight. Titles on dark, accents, the sol. On tin: metallic spec. |
| **Leaf** | #057441 | 5 · 116 · 65 | 96/0/44/55 | PMS 3425 C (nearest) | Secondary. Buttons, botanical accents, eyebrows and icons on gold. |
| **Beige** | #F0EFDF | 240 · 239 · 223 | 0/0/7/6 | print as paper or 6% tint of PMS 7527 C | Light ground. Backgrounds, paper. |
| **White** | #FFFFFF | 255 · 255 · 255 | 0/0/0/0 | — | Text only, on forest and gold grounds. |
| **Forest Deep** | #00351B | 0 · 53 · 27 | 100/0/49/79 | PMS 627 C (nearest) | Depth tone: shadows, pattern-on-forest, hover states. |
| **Gold Soft** | #EFD9A0 | 239 · 217 · 160 | 0/9/33/6 | PMS 7501 C (nearest) | Soft fills, illustration skies, tints. |
| **Cream Paper** | #FBF8EF | 251 · 248 · 239 | 0/1/5/2 | paper | Email/web paper tone where beige is too heavy. |
| **Ink** | #12331F | 18 · 51 · 31 | 65/0/39/80 | PMS 5535 C (nearest) | Long-form text on light grounds. |

## Usage ratios

- **Screen (site, email, social):** 60% Beige/Cream ground · 25% Forest · 12% Gold · 3% Leaf.
- **Pack (tin, stick, mailer):** 55% Gold (metallic) · 35% Forest · 10% Beige. The shelf reads gold first, forest second — like the approved tin.
- One ground per piece. Everything sits on Forest, Beige/Cream, or Gold — never stacked grounds.

## Approved text pairings (WCAG 2.1, computed)

| Pairing | Contrast | Verdict |
|---|---|---|
| Forest on Beige | 8.67:1 | AA · AAA |
| Ink on Beige | 11.93:1 | AA · AAA |
| Leaf on Beige | 5.06:1 | AA |
| White on Forest | 10.04:1 | AA · AAA |
| Gold on Forest | 5.57:1 | AA |
| Beige on Forest | 8.67:1 | AA · AAA |
| Gold Soft on Forest | 7.22:1 | AA · AAA |
| Forest on Gold | 5.57:1 | AA |
| Ink on Gold | 7.66:1 | AA · AAA |
| Forest Deep on Gold | 7.63:1 | AA · AAA |
| White on Gold | 1.80:1 | FAIL |
| Forest on Gold Soft | 7.22:1 | AA · AAA |
| White on Leaf | 5.86:1 | AA |
| Gold on Beige | 1.56:1 | FAIL |
| Leaf on Gold | 3.25:1 | AA-large only |
| Ink on Cream Paper | 13.02:1 | AA · AAA |
| Forest on Cream Paper | 9.46:1 | AA · AAA |

## Rules

- **Forbidden:** Gold text on Beige (fails), Leaf body text on Forest, White on Gold (fails), long text in Gold anywhere — Gold is for display moments ≥24 px.
- Gold on Forest passes AA (5.57:1) but stays reserved for display moments by design: headlines, the wordmark, numbers — never body copy.
- Body copy on light grounds is Ink or Forest; on Forest it is White or Beige.
- Never white cards on white/beige grounds (carried from Milonga book). Paper grain lives on Forest and Gold, never on Beige.
