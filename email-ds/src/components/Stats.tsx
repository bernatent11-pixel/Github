import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface Stat {
  value: string;
  label: string;
}

export interface StatsProps {
  items: Stat[];
  /** The email's flat background color. */
  bg?: EmailBg;
}

/** A row of headline numbers with captions — dosages, counts, proof points. */
export function Stats({ items, bg = 'forest' }: StatsProps) {
  const t = onBg[bg];
  return (
    <div style={{ display: 'flex', fontFamily: fontStack, textAlign: 'center' }}>
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: '4px 8px',
            borderLeft: i > 0 ? `1px solid ${t.rule}` : 'none',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: '-0.01em',
              color: t.accent,
              backgroundImage: t.numberGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: t.textShadow,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: t.body,
              marginTop: 6,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
