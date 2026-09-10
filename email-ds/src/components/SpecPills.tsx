import * as React from 'react';
import { fontStack } from '../tokens';
import { colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';

export interface SpecPillsProps {
  /** Short factual chips: "100mg natural caffeine", "Organic · Gluten-free". */
  items: string[];
  bg?: EmailBg;
  align?: 'left' | 'center';
  /**
   * `outline` is a hairline ring (quiet, the default), `solid` fills them in
   * the background's own raised tone, and `gold` fills them in brand gold with
   * dark green type — the loudest, and the one that reads as a stamp of fact
   * rather than a label.
   */
  variant?: 'outline' | 'solid' | 'gold';
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
  const gold = variant === 'gold';
  const solid = variant === 'solid';
  const raised = useBlockFill(bg, t.elevated);
  const fill = gold ? colors.gold : solid ? raised : 'transparent';
  const ink = gold ? colors.forest : t.accent;
  const edge = gold ? colors.gold : solid ? t.rule : t.outline;
  return (
    <div style={{ textAlign: align, fontSize: 0 }}>
      {items.map((label) => (
        <span
          key={label}
          style={{
            display: 'inline-block',
            background: fill,
            border: `1px solid ${edge}`,
            boxShadow: gold ? t.btnShadow : undefined,
            borderRadius: 999,
            padding: '8px 15px',
            margin: '0 5px 8px',
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.2,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: ink,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
