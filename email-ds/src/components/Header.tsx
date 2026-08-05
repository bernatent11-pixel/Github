import * as React from 'react';
import { colors, fontStack } from '../tokens';
import { Logo, LogoVariant } from './Logo';

export interface HeaderProps {
  /** Dark = forest bar with gold logo · light = beige bar with green logo. */
  tone?: 'dark' | 'light';
  /** Which logo lockup to show in the bar. */
  logo?: LogoVariant;
  /** Small uppercase tagline shown under the logo (e.g. brand promise). */
  tagline?: string;
  /** Optional right-aligned utility link (e.g. "Shop"). */
  link?: { label: string; href: string };
}

/** The email masthead: centered logo, optional tagline, on a brand bar. */
export function Header({ tone = 'dark', logo = 'primary', tagline = 'Energy That Thinks', link }: HeaderProps) {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        background: dark ? colors.forest : colors.beige,
        padding: '24px 28px 22px',
        textAlign: 'center',
        fontFamily: fontStack,
        position: 'relative',
      }}
    >
      <Logo variant={logo} tone={dark ? 'gold' : 'green'} height={logo === 'mark' ? 46 : 66} />
      {tagline ? (
        <div
          style={{
            marginTop: 12,
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: dark ? colors.gold : colors.leaf,
          }}
        >
          {tagline}
        </div>
      ) : null}
      {link ? (
        <a
          href={link.href}
          style={{
            position: 'absolute',
            right: 28,
            top: 28,
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: dark ? colors.gold : colors.forest,
          }}
        >
          {link.label}
        </a>
      ) : null}
    </div>
  );
}
