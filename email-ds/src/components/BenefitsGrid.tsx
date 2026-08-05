import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
import { Icon, IconName } from './Icon';

export interface Benefit {
  icon: IconName;
  title: string;
  text: string;
}

export interface BenefitsGridProps {
  items: Benefit[];
  /** 1 or 2 columns. */
  columns?: 1 | 2;
  /** Render on a forest surface (flips text light). */
  onDark?: boolean;
}

/** A grid of icon + title + copy benefit cards — the core "why it's good" block. */
export function BenefitsGrid({ items, columns = 2, onDark = false }: BenefitsGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 14,
        fontFamily: fontStack,
      }}
    >
      {items.map((b, i) => (
        <div
          key={i}
          style={{
            background: onDark ? colors.forestDeep : colors.cream,
            border: `1px solid ${onDark ? colors.lineOnDark : colors.line}`,
            borderRadius: radius.md,
            padding: '18px 18px 20px',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: radius.pill,
              background: onDark ? colors.gold : colors.forest,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Icon name={b.icon} size={21} color={onDark ? colors.forest : colors.gold} />
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: onDark ? colors.white : colors.forest,
              marginBottom: 5,
            }}
          >
            {b.title}
          </div>
          <div style={{ fontWeight: 400, fontSize: 13.5, lineHeight: 1.55, color: onDark ? colors.beige : colors.inkSoft }}>
            {b.text}
          </div>
        </div>
      ))}
    </div>
  );
}
