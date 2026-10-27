# LUZ Typography

Two families. Both free for commercial use under the **SIL Open Font License 1.1** (no cost; the only obligation is not to resell the fonts themselves). Font files ship in `fonts/`; both are on Google Fonts and available natively inside Canva and Klaviyo via Google Fonts.

- **Bodoni Moda** — display serif (variable: optical size 6–96, weights 400–900 + italics). The voice of LUZ at large sizes: high-contrast Didone that matches the tin. Always use the largest optical size the tool allows for headlines (opsz 96).
- **Hanken Grotesk** — text sans (variable: 100–900 + italics). Everything functional: body, UI, buttons, captions, nutrition panels.
- The **LUZ wordmark is not typeset** — it is custom-drawn vector art (see `../logo/`). Never retype "LUZ" in Bodoni Moda as a logo.

Evaluated and rejected: Playfair Display (ubiquitous in DTC), Fraunces/Gloock/Instrument Serif (wrong flavor vs. the approved tin serif), Fontshare Zodiak/Boska (FFL license restricts redistribution/self-hosting — unsuitable for a brand kit).

## Hierarchy

| Level | Face / weight | Web | Email | Print | Tracking | Leading |
|---|---|---|---|---|---|---|
| Display / H1 | Bodoni Moda 600, opsz 96 | clamp(40–64px) | 40px | 42pt | -0.5% | 1.05 |
| H2 | Bodoni Moda 500 | 32–44px | 30px | 26pt | 0 | 1.12 |
| H3 / pull quote | Bodoni Moda 500 italic | 22–26px | 22px | 16pt | 0 | 1.3 |
| Eyebrow / label | Hanken Grotesk 700, ALL CAPS | 12–13px | 13px | 8pt | +18% | 1.2 |
| Body | Hanken Grotesk 400 | 16–18px | 16px (min 16) | 9.5pt | 0 | 1.6 |
| Emphasis / buttons | Hanken Grotesk 600–700 | 16px | 16px | 9.5pt | +2% (buttons: caps +12%) | 1.2 |
| Caption / legal | Hanken Grotesk 400 | 13px | 13px | 7pt | +1% | 1.45 |

Carried from the Milonga book: body 16px minimum on screen; one size scale (64 · 44 · 28 · 20 · 16 · 14 on an 8px grid); sentence case in copy — all caps only for eyebrows, buttons and one-word emphasis.

## Email-safe fallback stacks

```css
font-family: "Bodoni Moda", "Bodoni MT", Didot, Georgia, "Times New Roman", serif;   /* display */
font-family: "Hanken Grotesk", "Helvetica Neue", Arial, sans-serif;                   /* text   */
```
Klaviyo supports Google Fonts for most clients; Outlook falls back to Georgia/Arial — both fallbacks were chosen to keep the same color (Georgia's contrast echoes Bodoni; Arial's neutrality echoes Hanken).

## Spanish accents

Both families carry full Latin coverage — á é í ó ú ñ ü ¡ ¿ — required for the Spanish sprinkle (che, cebar, buenísimo).
