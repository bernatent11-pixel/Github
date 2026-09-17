import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Headline } from './Headline';
import { ImageSlot } from './ImageSlot';

export interface ZigZagItem {
  src: string;
  alt: string;
  line1: string;
  line2: string;
  /** Either a paragraph or a list of short benefit chips — not both. */
  body?: string;
  bullets?: string[];
  children?: React.ReactNode;
}

export interface ZigZagProps {
  items: ZigZagItem[];
  bg?: EmailBg;
  /** Share of the row the picture takes. */
  imageWidth?: string;
  /**
   * `alternate` flips the picture side every row — the whole point of the
   * section, and what stops a body reading as a list. `left` keeps every
   * picture on one side, which is quieter and better past four rows.
   */
  rhythm?: 'alternate' | 'left' | 'right';
  /** Which side the first row's picture sits on when alternating. */
  startSide?: 'left' | 'right';
  /** Vertical gap between rows. */
  gap?: number;
  /** Render the chips. Passed in so the section doesn't hard-code a variant. */
  renderBullets?: (bullets: string[]) => React.ReactNode;
}

/**
 * The workhorse body section: several related points, each with its own
 * picture, the picture changing sides every row.
 *
 * The alternation is not decoration. A column of image-left rows reads as a
 * list and gets skimmed as one; alternating forces the eye to cross the column
 * on every row, which is what makes a long body feel designed rather than
 * dumped. Past four rows it starts to feel restless — switch to `left`.
 *
 * Keep the image treatment identical down the whole section. Mixing cutouts
 * and inset photographs in one zig-zag reads as an accident, not as variety.
 */
export function ZigZag({
  items,
  bg = 'forest',
  imageWidth = '34%',
  rhythm = 'alternate',
  startSide = 'left',
  gap = 40,
  renderBullets,
}: ZigZagProps) {
  const t = onBg[bg];
  return (
    <div>
      {items.map((it, i) => {
        const side =
          rhythm === 'alternate'
            ? (i % 2 === 0) === (startSide === 'left')
              ? 'left'
              : 'right'
            : rhythm;
        const art = (
          <div key="art" style={{ flex: `0 0 ${imageWidth}`, width: imageWidth }}>
            <ImageSlot bg={bg} src={it.src} alt={it.alt} cutout ratio="square" />
          </div>
        );
        const copy = (
          <div key="copy" style={{ flex: 1 }}>
            <Headline bg={bg} line1={it.line1} line2={it.line2} size={22} align="left" />
            <div style={{ height: 14 }} />
            {it.body ? (
              <div style={{ fontFamily: fontStack, fontSize: 16, lineHeight: 1.5, color: t.body }}>
                {it.body}
              </div>
            ) : null}
            {it.bullets && renderBullets ? renderBullets(it.bullets) : null}
            {it.children}
          </div>
        );
        return (
          <div
            key={it.line1 + i}
            style={{
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start',
              marginTop: i === 0 ? 0 : gap,
            }}
          >
            {side === 'left' ? [art, copy] : [copy, art]}
          </div>
        );
      })}
    </div>
  );
}
