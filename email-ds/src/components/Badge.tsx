import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface BadgeProps {
  /** The headline line, set in caps — e.g. "90 cal, 3g sugar". */
  label: string;
  /** Smaller caps line underneath — e.g. "per serving". */
  sub?: string;
  bg?: EmailBg;
  /** `solid` fills the pill in the accent colour; `outline` is a hairline. */
  variant?: 'solid' | 'outline';
}

/**
 * A filled pill that states a fact — calories, dosage, a claim. It looks like
 * a button but never links anywhere: use it to stamp a number onto a photo or
 * close a section, not as a call to action.
 */
export function Badge({ label, sub, bg = 'forest', variant = 'solid' }: BadgeProps) {
  const t = onBg[bg];
  const solid = variant === 'solid';
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: fontStack,
        background: solid ? t.accentGradient : 'transparent',
        backgroundColor: solid ? t.accent : 'transparent',
        border: `2px solid ${t.accent}`,
        borderRadius: 999,
        boxShadow: solid ? t.btnShadow : 'none',
        padding: sub ? '13px 30px 11px' : '13px 30px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          display: 'block',
          fontSize: 15,
          fontWeight: 900,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: solid ? t.btnText : t.accent,
          lineHeight: 1.15,
        }}
      >
        {label}
      </span>
      {sub ? (
        <span
          style={{
            display: 'block',
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: solid ? t.btnText : t.accent,
            opacity: 0.85,
            marginTop: 4,
          }}
        >
          {sub}
        </span>
      ) : null}
    </span>
  );
}
