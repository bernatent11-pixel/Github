import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';
import { Icon } from './Icon';
import { AnyIcon, AnyIconName } from './AnyIcon';

export interface VersusSide {
  /** Column label, e.g. "Coffee at 3pm". */
  label: string;
  /** Short lines describing this side. */
  points: string[];
  icon?: AnyIconName;
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
  const fill = useBlockFill(bg, t.elevated);

  const side = (s: VersusSide, win: boolean) => (
    <div
      className={win ? 'milonga-lift' : undefined}
      style={{
        // The losing side still gets a panel wash so it reads as a block, not
        // as empty background — it's the contrast that carries the point.
        background: win ? fill : t.panel,
        // The Milonga side is outlined in the accent so it wins on any
        // background, not just the dark ones where the fill does the work.
        border: win ? `1.5px solid ${t.outline}` : `1px solid ${t.rule}`,
        borderTopColor: win ? t.sheen : t.rule,
        borderRadius: 14,
        boxShadow: win ? t.shadow : 'none',
        padding: '18px 16px 20px',
        opacity: win ? 1 : 0.88,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        {s.icon ? (
          <AnyIcon name={s.icon} bg={bg} size={26} />
        ) : (
          <Icon name={win ? 'check' : 'cross'} size={20} color={win ? t.icon : t.body} />
        )}
      </div>
      <div style={{ fontWeight: 900, fontSize: 12.5, color: win ? t.accent : t.title, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
      {s.points.map((p, i) => (
        <div key={i} style={{ fontSize: 12.5, lineHeight: 1.55, color: t.body, padding: '4px 0' }}>
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
