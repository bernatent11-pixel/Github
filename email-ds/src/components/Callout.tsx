import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';
import { Icon } from './Icon';

export interface CalloutProps {
  /** Big statement text. */
  text: string;
  /** Optional attribution (for testimonial/quote use). */
  attribution?: string;
  /** quote = testimonial styling · highlight = key-message band. */
  variant?: 'quote' | 'highlight';
  /** The email's flat background color. */
  bg?: EmailBg;
}

/**
 * An outlined band for a key message or a customer quote — a thin brand rule
 * around the type, never a filled block, so the flat email color carries through.
 */
export function Callout({ text, attribution, variant = 'highlight', bg = 'forest' }: CalloutProps) {
  const t = onBg[bg];
  const fill = useBlockFill(bg, 'transparent');
  return (
    <div
      style={{
        background: fill,
        border: `1px solid ${t.rule}`,
        borderRadius: 14,
        padding: '28px 30px',
        fontFamily: fontStack,
        textAlign: 'center',
      }}
    >
      {variant === 'quote' ? (
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 3 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={16} color={t.icon} />
          ))}
        </div>
      ) : null}
      <p
        style={{
          fontWeight: variant === 'quote' ? 500 : 900,
          fontSize: variant === 'quote' ? 15.5 : 18,
          lineHeight: variant === 'quote' ? 1.5 : 1.3,
          ...(variant === 'quote'
            ? { letterSpacing: '0' }
            : { textTransform: 'uppercase' as const, letterSpacing: '0.03em' }),
          margin: 0,
          color: t.title,
        }}
      >
        {variant === 'quote' ? `“${text}”` : text}
      </p>
      {attribution ? (
        <div
          style={{
            marginTop: 14,
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: t.accent,
          }}
        >
          {attribution}
        </div>
      ) : null}
    </div>
  );
}
