import * as React from 'react';
import { colors } from '../tokens';
import { Logo } from './Logo';

export interface DividerProps {
  /** line = hairline rule · mark = centered hand mark · dots = three dots. */
  variant?: 'line' | 'mark' | 'dots';
  onDark?: boolean;
  /** Vertical space above/below in px. */
  gap?: number;
}

/** A brand section break — hairline, centered mark, or three gold dots. */
export function Divider({ variant = 'line', onDark = false, gap = 24 }: DividerProps) {
  const lineColor = onDark ? colors.lineOnDark : colors.line;
  if (variant === 'mark') {
    return (
      <div style={{ textAlign: 'center', padding: `${gap}px 0` }}>
        <Logo variant="mark" tone={onDark ? 'gold' : 'green'} height={30} />
      </div>
    );
  }
  if (variant === 'dots') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: `${gap}px 0` }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: colors.gold, display: 'inline-block' }} />
        ))}
      </div>
    );
  }
  return <div style={{ padding: `${gap}px 0` }}><div style={{ height: 1, background: lineColor }} /></div>;
}
