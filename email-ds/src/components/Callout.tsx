import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
import { Icon } from './Icon';

export interface CalloutProps {
  /** Big statement text. */
  text: string;
  /** Optional attribution (for testimonial/quote use). */
  attribution?: string;
  /** quote = testimonial styling · highlight = key-message band. */
  variant?: 'quote' | 'highlight';
  tone?: 'forest' | 'gold' | 'beige';
}

const TONE = {
  forest: { bg: colors.forest, text: colors.white, accent: colors.gold, sub: colors.beige },
  gold: { bg: colors.gold, text: colors.forest, accent: colors.forest, sub: colors.forestDeep },
  beige: { bg: colors.beige, text: colors.forest, accent: colors.leaf, sub: colors.inkSoft },
};

/** A highlighted band for a key message or a customer quote. */
export function Callout({ text, attribution, variant = 'highlight', tone = 'forest' }: CalloutProps) {
  const t = TONE[tone];
  return (
    <div
      style={{
        background: t.bg,
        borderRadius: radius.lg,
        padding: '28px 30px',
        fontFamily: fontStack,
        textAlign: 'center',
      }}
    >
      {variant === 'quote' ? (
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 3 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={16} color={t.accent} />
          ))}
        </div>
      ) : null}
      <p
        style={{
          fontWeight: variant === 'quote' ? 500 : 900,
          fontSize: variant === 'quote' ? 18 : 22,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          margin: 0,
          color: t.text,
        }}
      >
        {variant === 'quote' ? `“${text}”` : text}
      </p>
      {attribution ? (
        <div style={{ marginTop: 14, fontWeight: 700, fontSize: 12.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.accent }}>
          {attribution}
        </div>
      ) : null}
    </div>
  );
}
