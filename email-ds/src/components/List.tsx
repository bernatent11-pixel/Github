import * as React from 'react';
import { colors, fontStack } from '../tokens';
import { Icon } from './Icon';

export interface ListProps {
  items: React.ReactNode[];
  /** Marker style. */
  marker?: 'leaf' | 'check' | 'dot';
  onDark?: boolean;
}

/** A short, scannable list with brand markers — for benefits or steps in body copy. */
export function List({ items, marker = 'leaf', onDark = false }: ListProps) {
  const accent = onDark ? colors.gold : colors.leaf;
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontFamily: fontStack }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '7px 0' }}>
          <span style={{ flex: '0 0 auto', marginTop: 2 }}>
            {marker === 'dot' ? (
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: accent, marginTop: 5 }} />
            ) : (
              <Icon name={marker} size={16} color={accent} />
            )}
          </span>
          <span style={{ fontWeight: 400, fontSize: 14.5, lineHeight: 1.55, color: onDark ? colors.beige : colors.ink }}>
            {it}
          </span>
        </li>
      ))}
    </ul>
  );
}
