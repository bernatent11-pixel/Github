import * as React from 'react';
import { EmailBg, bgFill } from '../theme';

export interface SectionBreakProps {
  /** The background above the break. */
  from: EmailBg;
  /** The background below the break. */
  to: EmailBg;
  /** `hard` is a clean edge; `fade` blends the two colors over `height` px. */
  variant?: 'hard' | 'fade';
  /** Blend height in px (fade only). */
  height?: number;
}

/**
 * The seam between two differently-colored sections. A Milonga email may change
 * background once or twice for emphasis — put this between the sections so the
 * colors meet deliberately instead of clashing.
 */
export function SectionBreak({ from, to, variant = 'hard', height = 40 }: SectionBreakProps) {
  if (variant === 'hard') {
    // A hard edge needs nothing but the two blocks meeting; this keeps the
    // seam explicit in the markup and guards against margin collapse.
    return <div style={{ background: bgFill[to], height: 0, lineHeight: 0, fontSize: 0 }} />;
  }
  return (
    <div
      style={{
        height,
        background: `linear-gradient(180deg, ${bgFill[from]} 0%, ${bgFill[to]} 100%)`,
        lineHeight: 0,
        fontSize: 0,
      }}
    />
  );
}
