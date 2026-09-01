import * as React from 'react';
import { colors, fontStack } from '../tokens';
import { EmailBg } from '../theme';
import paperTile from '../../public/brand/textures/tile-paper.jpg';

export interface PaperProps {
  /** Inner padding in px. */
  pad?: number;
  /** Corner radius in px. 0 gives a squared-off sheet. */
  radius?: number;
  /**
   * The background the sheet is laid ON — only used to pick a shadow that
   * reads against it. The sheet itself is always cream.
   */
  on?: EmailBg;
  children?: React.ReactNode;
}

/**
 * A sheet of cream paper laid on the email — for a letter, a note, anything
 * that should read as written rather than designed.
 *
 * The paper is not a flat rectangle: it carries a fibre grain, a slow warm
 * gradient across the sheet, a lit top edge and a two-part shadow (a tight
 * contact shadow where it meets the page, a wide soft one underneath). Clients
 * that drop gradients and shadows still get the cream fill and the grain.
 */
export function Paper({ pad = 26, radius = 6, on = 'forest', children }: PaperProps) {
  const dark = on === 'forest';
  return (
    <div
      style={{
        fontFamily: fontStack,
        backgroundColor: colors.beige,
        backgroundImage: `linear-gradient(150deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 42%, rgba(160,150,120,0.10) 100%), url(${paperTile})`,
        backgroundSize: 'auto, 320px 320px',
        backgroundRepeat: 'no-repeat, repeat',
        borderRadius: radius,
        // The lit top edge and the shaded bottom edge give the sheet thickness.
        borderTop: '1px solid rgba(255,255,255,0.75)',
        borderBottom: `1px solid ${dark ? 'rgba(0,26,13,0.16)' : 'rgba(0,77,39,0.10)'}`,
        boxShadow: dark
          ? '0 1px 2px rgba(0,26,13,0.45), 0 10px 26px rgba(0,26,13,0.38), 0 28px 60px rgba(0,26,13,0.30)'
          : '0 1px 2px rgba(0,77,39,0.18), 0 10px 26px rgba(0,77,39,0.14), 0 28px 60px rgba(0,77,39,0.10)',
        padding: pad,
      }}
    >
      {children}
    </div>
  );
}
