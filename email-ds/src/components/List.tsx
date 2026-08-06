import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Icon } from './Icon';

export interface ListProps {
  items: React.ReactNode[];
  /** Marker style. */
  marker?: 'leaf' | 'check' | 'dot';
  /** The email's flat background color. */
  bg?: EmailBg;
}

/** A short, scannable list with brand markers — for benefits or steps in body copy. */
export function List({ items, marker = 'leaf', bg = 'forest' }: ListProps) {
  const t = onBg[bg];
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontFamily: fontStack }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '7px 0' }}>
          <span style={{ flex: '0 0 auto', marginTop: 2 }}>
            {marker === 'dot' ? (
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: t.icon, marginTop: 5 }} />
            ) : (
              <Icon name={marker} size={16} color={t.icon} />
            )}
          </span>
          <span style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.6, color: t.body }}>
            {it}
          </span>
        </li>
      ))}
    </ul>
  );
}
