import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';

export type ButtonVariant = 'gold' | 'forest' | 'leaf' | 'outline' | 'outlineOnDark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Button text. */
  label: string;
  /** Link target — emails use anchors, so this renders an <a>. */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the full width of its container. */
  fullWidth?: boolean;
}

const SIZES: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 13, padding: '10px 20px' },
  md: { fontSize: 15, padding: '14px 30px' },
  lg: { fontSize: 17, padding: '18px 40px' },
};

const VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  gold: { background: colors.gold, color: colors.forest, border: '2px solid ' + colors.gold },
  forest: { background: colors.forest, color: colors.beige, border: '2px solid ' + colors.forest },
  leaf: { background: colors.leaf, color: colors.white, border: '2px solid ' + colors.leaf },
  outline: { background: 'transparent', color: colors.forest, border: '2px solid ' + colors.forest },
  outlineOnDark: { background: 'transparent', color: colors.gold, border: '2px solid ' + colors.gold },
};

/** The primary call-to-action. Gold-on-forest is the Milonga default. */
export function Button({ label, href = '#', variant = 'gold', size = 'md', fullWidth = false }: ButtonProps) {
  return (
    <a
      href={href}
      style={{
        display: fullWidth ? 'block' : 'inline-block',
        textAlign: 'center',
        textDecoration: 'none',
        fontFamily: fontStack,
        fontWeight: 700,
        letterSpacing: '0.02em',
        borderRadius: radius.pill,
        lineHeight: 1.1,
        ...SIZES[size],
        ...VARIANTS[variant],
      }}
    >
      {label}
    </a>
  );
}
