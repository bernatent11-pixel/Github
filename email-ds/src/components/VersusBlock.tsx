import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Icon, IconName } from './Icon';

export interface VersusSide {
  /** Column label, e.g. "Coffee at 3pm". */
  label: string;
  /** Short lines describing this side. */
  points: string[];
  icon?: IconName;
}

export interface VersusBlockProps {
  /** The losing / "before" side — rendered muted. */
  left: VersusSide;
  /** The Milonga / "after" side — rendered in the accent color. */
  right: VersusSide;
  bg?: EmailBg;
}

/**
 * A two-column contrast — "before vs after", "them vs Milonga". The right side
 * is the Milonga side and is always the one accented.
 */
export function VersusBlock({ left, right, bg = 'forest' }: VersusBlockProps) {
  const t = onBg[bg];

  const side = (s: VersusSide, win: boolean) => (
    <div
      style={{
        border: `1px solid ${t.rule}`,
        borderRadius: 14,
        padding: '18px 16px 20px',
        opacity: win ? 1 : 0.72,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <Icon name={s.icon ?? (win ? 'check' : 'cross')} size={20} color={win ? t.accent : t.body} />
      </div>
      <div style={{ fontWeight: 900, fontSize: 15, color: win ? t.accent : t.title, marginBottom: 10 }}>{s.label}</div>
      {s.points.map((p, i) => (
        <div key={i} style={{ fontSize: 13, lineHeight: 1.5, color: t.body, padding: '4px 0' }}>
          {p}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontFamily: fontStack }}>
      {side(left, false)}
      {side(right, true)}
    </div>
  );
}
