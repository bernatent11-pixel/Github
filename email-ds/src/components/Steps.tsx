import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface Step {
  title: string;
  text?: string;
}

export interface StepsProps {
  items: Step[];
  /** `numbered` shows 1-2-3 discs; `ruled` is a plain hairline sequence. */
  variant?: 'numbered' | 'ruled';
  bg?: EmailBg;
}

/** A 1-2-3 sequence — how to prepare, a ritual, an onboarding flow. */
export function Steps({ items, variant = 'numbered', bg = 'forest' }: StepsProps) {
  const t = onBg[bg];
  return (
    <div style={{ fontFamily: fontStack }}>
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
            padding: '14px 0',
            borderTop: i ? `1px solid ${t.rule}` : 'none',
          }}
        >
          <span
            style={{
              flex: '0 0 auto',
              width: 28,
              height: 28,
              borderRadius: 999,
              border: `1.5px solid ${t.accent}`,
              color: t.accent,
              fontWeight: 900,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              visibility: variant === 'numbered' ? 'visible' : 'hidden',
            }}
          >
            {i + 1}
          </span>
          <span>
            <span style={{ display: 'block', fontWeight: 700, fontSize: 15, color: t.title, marginBottom: 3 }}>
              {s.title}
            </span>
            {s.text ? (
              <span style={{ display: 'block', fontSize: 13.5, lineHeight: 1.55, color: t.body }}>{s.text}</span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
