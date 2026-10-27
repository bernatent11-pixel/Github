# LUZ Brand System

The complete identity for **LUZ** — Vanilla Mate Latte, the rebrand of Milonga on the same brand foundation. Tagline: **Golden Clarity**.

## What's where

| Folder | Contents |
|---|---|
| `decisions.md` | Assumptions & decisions log — **read first** |
| `00_audit/` | Phase 0 audit (pre-gate) + competitor map |
| `01_directions/` | Phase 1 exploration (superseded by the client's approved gold-tin direction; photography research still feeds the system) |
| `02_system/logo/` | `geometry.mjs` (single source of truth) → 22 SVG masters + PNG @1x/2x/4x: wordmark (4 colorways), el Sol symbol, lockups (horizontal/stacked/tagline), favicon/app icon, avatar, UGC watermark, clear-space sheet |
| `02_system/color/` | `color.md`, `tokens.json`, `color-tokens.css` — HEX/RGB/CMYK/nearest-Pantone + computed WCAG matrix |
| `02_system/type/` | `type.md` (hierarchy, email fallbacks, licenses) + OFL font files (Bodoni Moda, Hanken Grotesk) |
| `02_system/graphics/` | Icon chips, rayos patterns, monte divider, grain texture + `graphics.md` |
| `02_system/imagery/` | Imagery direction + 17-prompt tested Higgsfield bank (models per prompt) |
| `02_system/voice.md` | Voice snapshot: 5 do/don't pairs + 10-word Spanish glossary with rules |
| `03_applications/packaging/` | Tin wrap flat (placeholder dieline), lid band, stick pack, mailer + `regulatory-flags.md` |
| `03_applications/digital/` | `tokens.json`/`tokens.css`, Klaviyo email template, IG post/story/carousel, TikTok cover, Meta ads 1:1/4:5/9:16, Amazon spec |
| `04_brandbook/` | `index.html` (the book), `LUZ-brand-book.pdf`, `luz-in-60-seconds.html/.pdf` |

Regenerate anything: `node <folder>/build-*.mjs` (logo PNGs: `02_system/logo/export-png.mjs`; needs the fonts in `02_system/type/fonts` installed).

## Open decisions / handoff needs

1. **Real tin dieline + print spec** from the printer (current flats assume Ø99×H142 mm; metallic = PMS 871 C or foil).
2. **Regulatory**: supplement vs. food route, panels, claims — all placeholders; see `03_applications/packaging/regulatory-flags.md`.
3. **Domain/handles**: `drinkluz.com` is a placeholder on artwork.
4. **AI scene renders** (Higgsfield library + brand book links): review each for label distortion before publishing; container network couldn't preview them.
5. Environment network allowlist for `d8j0ntlcm91z4.cloudfront.net` would let future sessions pull renders for pixel-level composites.

## Phase 5 — self-review (skeptical creative director)

**What's generic:** gold + deep green + Didone serif sits near premium-tea codes (Harney & Sons adjacency). What saves it: el Sol, the monte band, the voice, and golden-hour photography — enforce those, not just the palette. **What a designer would flag:** the custom wordmark's serif-bracket junctions deserve a professional type-designer pass before trademark filing; the monte band's canopy circles get bubbly above label scale (keep it ≤ 1/3 of composition height); the tagline-lockup SVG uses live text (PNG exports are canonical — fonts must be installed to re-render). **What breaks small / one-color:** Didone hairlines thin out below 96 px — that's exactly why the sol-alone rule exists (min 16 px); the landscape band has no one-color version by design (drop it in engraving/one-color contexts, use rayos pattern instead); gold fails on light grounds (enforced in the WCAG table). **Not fixable here:** real foil behavior vs. flat gold on screen (printer proof needed); scene-render label fidelity (human review); final legal panels.
