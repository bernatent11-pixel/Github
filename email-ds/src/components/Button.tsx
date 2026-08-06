import * as React from 'react';
import { fontStack, radius } from '../tokens';
import { EmailBg, onBg } from '../theme';

/** solid = the primary action · outline = secondary, same color as the text. */
export type ButtonVariant = 'solid' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Button text. */
  label: string;
  /** Link target — emails use anchors, so this renders an <a>. */
  href?: string;
  /** The email's flat background; the button colors itself to contrast with it. */
  bg?: EmailBg;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the full width of its container. */
  fullWidth?: boolean;
}

const SIZES: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 13, padding: '11px 22px' },
  md: { fontSize: 15, padding: '14px 30px' },
  lg: { fontSize: 15.5, padding: '16px 36px' },
};

/**
 * The call to action. Colors come from the email's background: gold on dark
 * green, forest on gold, forest on beige — so it always reads.
 */
export function Button({ label, href = '#', bg = 'forest', variant = 'solid', size = 'lg', fullWidth = false }: ButtonProps) {
  const t = onBg[bg];
  const look: React.CSSProperties =
    variant === 'solid'
      ? { background: t.btnBg, color: t.btnText, border: `2px solid ${t.btnBg}` }
      : { background: 'transparent', color: t.outline, border: `2px solid ${t.outline}` };

  return (
    <a
      href={href}
      style={{
        display: fullWidth ? 'block' : 'inline-block',
        textAlign: 'center',
        textDecoration: 'none',
        fontFamily: fontStack,
        fontWeight: 700,
        letterSpacing: '0.01em',
        borderRadius: radius.pill,
        lineHeight: 1.1,
        ...SIZES[size],
        ...look,
      }}
    >
      {label}
    </a>
  );
}
