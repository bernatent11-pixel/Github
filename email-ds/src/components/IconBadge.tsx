import * as React from 'react';
import { EmailBg, onBg } from '../theme';
import { BrandIcon, BrandInk } from './BrandIcon';
import { AnyIconName, isBrandMark } from './AnyIcon';
import { Icon } from './Icon';
import { colors } from '../tokens';

export interface IconBadgeProps {
  /** A Milonga brand mark (preferred) or one of the generic glyphs. */
  mark: AnyIconName;
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
  const glyphHex = glyph === 'cream' ? colors.beige : glyph === 'gold' ? colors.gold : glyph === 'leaf' ? colors.leaf : colors.forest;
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
      {isBrandMark(mark) ? (
        <BrandIcon mark={mark} ink={glyph} size={Math.round(size * 0.6)} />
      ) : (
        <Icon name={mark} size={Math.round(size * 0.5)} color={glyphHex} />
      )}
    </span>
  );
}
