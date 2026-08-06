import * as React from 'react';
import { EmailBg, onBg } from '../theme';
import { useSurface } from '../surface';
import { Logo, LogoVariant } from './Logo';

export interface HeaderProps {
  /** The email's flat background color. Every block in an email shares this. */
  bg?: EmailBg;
  /** Logo lockup: `primary` (hand + MILONGA) is the Milonga standard. */
  logo?: LogoVariant;
  /** Logo height in px. 92 is the brand standard ("medium"). */
  size?: number;
  /** Optional uppercase tagline under the logo. Off by default — it lives in the footer. */
  tagline?: string;
  /** Extra space below the header before the first content block. */
  padBottom?: number;
}

/**
 * The email masthead: the flat email background with the Milonga logo centered.
 * The logo tone is chosen automatically for contrast against `bg`
 * (gold logo on dark green, cream on gold, brand green on beige).
 */
export function Header({ bg = 'forest', logo = 'primary', size = 92, tagline, padBottom = 30 }: HeaderProps) {
  const t = onBg[bg];
  const surface = useSurface(bg);
  return (
    <div
      style={{
        ...surface,
        padding: `34px 28px ${padBottom}px`,
        textAlign: 'center',
      }}
    >
      <Logo variant={logo} tone={t.logo} height={size} />
      {tagline ? (
        <div
          style={{
            marginTop: 14,
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: t.accent,
          }}
        >
          {tagline}
        </div>
      ) : null}
    </div>
  );
}
