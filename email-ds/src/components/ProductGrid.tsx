import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';

export interface ProductGridItem {
  src: string;
  alt: string;
  name: string;
  /** One line. Not a paragraph. */
  note?: string;
  /** From the product truth file. Never estimated. */
  price?: string;
  /** A short fact stamped on the image — "NEW", "15 SERVINGS". Never a link. */
  badge?: string;
  href?: string;
}

export interface ProductGridProps {
  items: ProductGridItem[];
  bg?: EmailBg;
  /** Cards per row. Three is the practical ceiling at 600px. */
  per?: 2 | 3;
  gap?: number;
  /** Fill the card so it reads as an object, rather than art on bare ground. */
  carded?: boolean;
}

/**
 * Several products at once, in equal cards.
 *
 * Cards are equalised PER ROW — the row grows to its taller card, and the grid
 * as a whole does not equalise to its tallest. One global height leaves voids
 * under every short card in the set, which is the single most common way a
 * product grid looks broken.
 *
 * Use one crop ratio and one background treatment for every image in the grid.
 * This is the section where inconsistent product photography shows most: three
 * cutouts and one photo-on-white in the same row cannot be rescued by layout.
 */
export function ProductGrid({ items, bg = 'forest', per = 2, gap = 14, carded = true }: ProductGridProps) {
  const t = onBg[bg];
  const fill = useBlockFill(bg, t.elevated);
  const rows: ProductGridItem[][] = [];
  for (let i = 0; i < items.length; i += per) rows.push(items.slice(i, i + per));

  return (
    <div>
      {rows.map((row, ri) => (
        <div
          key={ri}
          style={{ display: 'flex', alignItems: 'stretch', gap, marginTop: ri === 0 ? 0 : gap }}
        >
          {row.map((p) => (
            <div
              key={p.name}
              style={{
                // A short final row keeps the column width rather than
                // stretching — a lone double-width product card reads as a
                // different section, not as the end of this one.
                flex: `0 0 calc(${100 / per}% - ${(gap * (per - 1)) / per}px)`,
                width: `calc(${100 / per}% - ${(gap * (per - 1)) / per}px)`,
              }}
            >
              <div
                style={{
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  background: carded ? fill : 'transparent',
                  border: carded ? `1px solid ${t.rule}` : undefined,
                  borderTopColor: carded ? t.sheen : undefined,
                  borderRadius: carded ? 14 : 0,
                  boxShadow: carded ? t.shadow : undefined,
                  padding: carded ? 14 : 0,
                  textAlign: 'center',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={p.src}
                    alt={p.alt}
                    style={{ display: 'block', width: '100%', height: 'auto', border: 0, borderRadius: carded ? 8 : 0 }}
                  />
                  {p.badge ? (
                    <span
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        background: colors.gold,
                        color: colors.forest,
                        fontFamily: fontStack,
                        fontWeight: 900,
                        fontSize: 9.5,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        borderRadius: 999,
                        padding: '5px 10px',
                      }}
                    >
                      {p.badge}
                    </span>
                  ) : null}
                </div>

                <div
                  style={{
                    fontFamily: fontStack,
                    fontWeight: 900,
                    fontSize: 14,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: t.title,
                    marginTop: 12,
                  }}
                >
                  {p.name}
                </div>

                {p.note ? (
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: t.body,
                      marginTop: 6,
                      // Takes the slack so every price in the row lines up.
                      flex: 1,
                    }}
                  >
                    {p.note}
                  </div>
                ) : (
                  <div style={{ flex: 1 }} />
                )}

                {p.price ? (
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 900,
                      fontSize: 15,
                      color: t.accent,
                      marginTop: 10,
                    }}
                  >
                    {p.price}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
