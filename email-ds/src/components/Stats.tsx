import * as React from 'react';
import { colors, fontStack } from '../tokens';

export interface Stat {
  value: string;
  label: string;
}

export interface StatsProps {
  items: Stat[];
  onDark?: boolean;
}

/** A row of headline numbers with captions — dosages, counts, proof points. */
export function Stats({ items, onDark = false }: StatsProps) {
  return (
    <div style={{ display: 'flex', fontFamily: fontStack, textAlign: 'center' }}>
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: '4px 8px',
            borderLeft: i > 0 ? `1px solid ${onDark ? colors.lineOnDark : colors.line}` : 'none',
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 26, letterSpacing: '-0.01em', color: onDark ? colors.gold : colors.forest }}>
            {s.value}
          </div>
          <div style={{ fontWeight: 500, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: onDark ? colors.beige : colors.inkSoft, marginTop: 6 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
