import * as React from 'react';
import { EmailBg, onBg } from '../theme';
import { Logo } from './Logo';

export interface DividerProps {
  /** line = hairline rule · mark = centered hand mark · dots = three dots. */
  variant?: 'line' | 'mark' | 'dots';
  /** The email's flat background color. */
  bg?: EmailBg;
  /** Vertical space above/below in px. */
  gap?: number;
}

/** A brand section break — hairline, centered mark, or three accent dots. */
export function Divider({ variant = 'line', bg = 'forest', gap = 24 }: DividerProps) {
  const t = onBg[bg];
  if (variant === 'mark') {
    return (
      <div style={{ textAlign: 'center', padding: `${gap}px 0` }}>
        <Logo variant="mark" tone={t.logo} height={30} />
      </div>
    );
  }
  if (variant === 'dots') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: `${gap}px 0` }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: t.icon, display: 'inline-block' }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ padding: `${gap}px 0` }}>
      <div style={{ height: 1, background: t.rule }} />
    </div>
  );
}
