import * as React from 'react';
import { colors } from '../tokens';

export type IconName =
  | 'leaf'
  | 'bolt'
  | 'brain'
  | 'clock'
  | 'heart'
  | 'seed'
  | 'check'
  | 'cross'
  | 'star';

export interface IconProps {
  /** Which glyph to draw. */
  name: IconName;
  /** Pixel size (square). */
  size?: number;
  /** Any CSS color; defaults to the brand forest green. */
  color?: string;
  title?: string;
}

const PATHS: Record<IconName, React.ReactNode> = {
  leaf: <path d="M20 4C9 5 4 12 4 20c6 .3 10-1 13-4 2.2-2.2 3-6 3-12Zm-9 13c2.5-3 5-5 8-6" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  brain: (
    <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1V4.5A2.5 2.5 0 0 0 9 4Zm6 0a2.5 2.5 0 0 0-2 .5V18a3 3 0 0 0 5-1 3 3 0 0 0 2-5 3 3 0 0 0-1-5 3 3 0 0 0-3-3Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeWidth={2} fill="none" stroke="currentColor" />
    </>
  ),
  heart: <path d="M12 21C6 16.5 3 13 3 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9 2.5C21 13 18 16.5 12 21Z" />,
  seed: <path d="M12 3c5 3 7 7 7 11a7 7 0 1 1-14 0c0-4 2-8 7-11Z" />,
  check: (
    <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
  ),
  cross: (
    <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
  ),
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.9 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z" />,
};

/** A small brand glyph set used for benefits, comparisons and accents. */
export function Icon({ name, size = 22, color = colors.forest, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ display: 'block', color }}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
