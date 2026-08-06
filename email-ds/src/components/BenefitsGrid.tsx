import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
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
  /** The email's flat background color. */
  bg?: EmailBg;
}

/**
 * A grid of icon + title + copy benefit cards — the core "why it's good" block.
 * Cards are outlined, never filled, so the flat email color shows through.
 */
export function BenefitsGrid({ items, columns = 2, bg = 'forest' }: BenefitsGridProps) {
  const t = onBg[bg];
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
          className="milonga-lift"
          style={{
            background: t.elevated,
            border: `1px solid ${t.rule}`,
            borderTopColor: t.sheen,
            borderRadius: 14,
            boxShadow: t.shadow,
            padding: '18px 18px 20px',
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <Icon name={b.icon} size={22} color={t.accent} />
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: t.title,
              marginBottom: 5,
            }}
          >
            {b.title}
          </div>
          <div style={{ fontWeight: 400, fontSize: 13.5, lineHeight: 1.55, color: t.body }}>
            {b.text}
          </div>
        </div>
      ))}
    </div>
  );
}
