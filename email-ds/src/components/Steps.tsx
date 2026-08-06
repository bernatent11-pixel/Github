import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface Step {
  title: string;
  text?: string;
}

export interface StepsProps {
  items: Step[];
  /**
   * `numerals` — oversized 01/02/03 beside each step (editorial, the default).
   * `discs` — filled accent discs in a row across the email (compact, punchy).
   */
  variant?: 'numerals' | 'discs';
  bg?: EmailBg;
}

/** A 1-2-3 sequence — how to prepare, a ritual, an onboarding flow. */
export function Steps({ items, variant = 'numerals', bg = 'forest' }: StepsProps) {
  const t = onBg[bg];

  if (variant === 'discs') {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 18,
          textAlign: 'center',
          fontFamily: fontStack,
        }}
      >
        {items.map((s, i) => (
          <div key={i}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: t.accentGradient,
                backgroundColor: t.accent,
                boxShadow: t.shadow,
                color: t.btnText,
                fontWeight: 900,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontWeight: 900, fontSize: 12.5, color: t.title, marginBottom: 6, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.title}
            </div>
            {s.text ? (
              <div style={{ fontSize: 12.5, lineHeight: 1.6, color: t.body }}>{s.text}</div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: fontStack }}>
      {items.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '14px 0' }}>
          <span
            style={{
              flex: '0 0 auto',
              minWidth: 48,
              fontSize: 38,
              fontWeight: 900,
              lineHeight: 0.9,
              color: t.accent,
              opacity: 0.65,
              backgroundImage: t.numberGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span>
            <span style={{ display: 'block', fontWeight: 900, fontSize: 13.5, color: t.title, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.title}
            </span>
            {s.text ? (
              <span style={{ display: 'block', fontSize: 12.5, lineHeight: 1.6, color: t.body }}>{s.text}</span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
