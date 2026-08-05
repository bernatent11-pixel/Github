import * as React from 'react';
import { colors, fontStack } from '../tokens';
import markGold from '../../public/logo/mark-gold.png';
import markGreen from '../../public/logo/mark-green.png';
import markBeige from '../../public/logo/mark-beige.png';
import markWhite from '../../public/logo/mark-white.png';
import lockupGold from '../../public/logo/lockup-milonga-gold.png';
import lockupGreen from '../../public/logo/lockup-milonga-green.png';
import lockupBeige from '../../public/logo/lockup-milonga-beige.png';
import lockupWhite from '../../public/logo/lockup-milonga-white.png';

export type LogoTone = 'gold' | 'green' | 'beige' | 'white';
/** mark = hand only · primary = hand + MILONGA · full = YERBA MATE + hand + MILONGA */
export type LogoVariant = 'mark' | 'primary' | 'full';

export interface LogoProps {
  /** Which lockup to show. */
  variant?: LogoVariant;
  /** Brand color treatment — pick for contrast against the surface. */
  tone?: LogoTone;
  /** Rendered height in px of the mark/lockup art. */
  height?: number;
  alt?: string;
}

const MARK: Record<LogoTone, string> = { gold: markGold, green: markGreen, beige: markBeige, white: markWhite };
const LOCKUP: Record<LogoTone, string> = { gold: lockupGold, green: lockupGreen, beige: lockupBeige, white: lockupWhite };
const TEXT: Record<LogoTone, string> = {
  gold: colors.gold,
  green: colors.forest,
  beige: colors.beige,
  white: colors.white,
};

/**
 * The Milonga wordmark + hand/plant mark, in the new brand palette.
 * Recolored from the brand source art; four tones for light and dark surfaces.
 */
export function Logo({ variant = 'primary', tone = 'gold', height = 72, alt = 'Milonga' }: LogoProps) {
  if (variant === 'mark') {
    return <img src={MARK[tone]} alt={alt} height={height} style={{ display: 'block', height, width: 'auto' }} />;
  }
  const lockup = (
    <img src={LOCKUP[tone]} alt={alt} height={height} style={{ display: 'block', height, width: 'auto' }} />
  );
  if (variant === 'primary') return lockup;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <span
        style={{
          fontFamily: fontStack,
          fontWeight: 700,
          fontSize: Math.max(11, Math.round(height * 0.14)),
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: TEXT[tone],
          marginBottom: Math.round(height * 0.06),
          paddingLeft: '0.32em',
        }}
      >
        Yerba Mate
      </span>
      {lockup}
    </div>
  );
}
