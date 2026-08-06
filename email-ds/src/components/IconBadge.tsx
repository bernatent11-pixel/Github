import * as React from 'react';
import { EmailBg, onBg } from '../theme';
import { BrandIcon, BrandMark, BrandInk } from './BrandIcon';

export interface IconBadgeProps {
  mark: BrandMark;
  /** The email background — sets the disc colour. */
  bg?: EmailBg;
  /** Disc diameter in px. */
  size?: number;
  /** Override the disc fill. The glyph inside always contrasts with it. */
  fill?: string;
  /** Override the glyph ink. */
  ink?: BrandInk;
}

/**
 * A brand mark inside a filled disc, with the glyph in the OPPOSITE colour —
 * a gold disc carries a dark green icon, a dark green disc carries a gold one.
 * Used to lead benefit and ingredient rows.
 */
export function IconBadge({ mark, bg = 'forest', size = 46, fill, ink }: IconBadgeProps) {
  const t = onBg[bg];
  // The disc takes the accent colour; the glyph takes what reads on top of it.
  const disc = fill ?? t.icon;
  const glyph: BrandInk = ink ?? (bg === 'beige' ? 'cream' : bg === 'gold' ? 'forest' : 'forest');
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 999,
        background: disc,
        boxShadow: t.shadow,
        flex: '0 0 auto',
      }}
    >
      <BrandIcon mark={mark} ink={glyph} size={Math.round(size * 0.6)} />
    </span>
  );
}
