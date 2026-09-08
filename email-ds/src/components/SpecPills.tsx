import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';

export interface SpecPillsProps {
  /** Short factual chips: "100mg natural caffeine", "Organic · Gluten-free". */
  items: string[];
  bg?: EmailBg;
  align?: 'left' | 'center';
  /** `outline` is a hairline ring (quiet, the default); `solid` fills them. */
  variant?: 'outline' | 'solid';
  size?: number;
}

/**
 * A cluster of small pills, each stating one fact.
 *
 * The whole formula, readable in two seconds, without a table or a paragraph.
 * It's the block that answers "what's actually in this?" before anyone has
 * decided to read — which is why it belongs high in an email, usually right
 * under the product shot.
 *
 * Keep every chip to a few words. A chip that wraps stops looking like a
 * label and starts looking like a sentence in a box.
 */
export function SpecPills({
  items,
  bg = 'forest',
  align = 'center',
  variant = 'outline',
  size = 11,
}: SpecPillsProps) {
  const t = onBg[bg];
  const solid = variant === 'solid';
  const fill = useBlockFill(bg, t.elevated);
  return (
    <div style={{ textAlign: align, fontSize: 0 }}>
      {items.map((label) => (
        <span
          key={label}
          style={{
            display: 'inline-block',
            background: solid ? fill : 'transparent',
            border: `1px solid ${solid ? t.rule : t.outline}`,
            borderRadius: 999,
            padding: '8px 15px',
            margin: '0 5px 8px',
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.2,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: t.accent,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
