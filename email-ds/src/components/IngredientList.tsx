import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Icon } from './Icon';

export interface Ingredient {
  name: string;
  /** Dose or amount, e.g. "300mg". */
  amount?: string;
  /** One-line function, e.g. "Focus & clarity". */
  note?: string;
}

export interface IngredientListProps {
  items: Ingredient[];
  /** The email's flat background color. */
  bg?: EmailBg;
}

/** A functional-ingredient readout: name · dose · what it does, one row each. */
export function IngredientList({ items, bg = 'forest' }: IngredientListProps) {
  const t = onBg[bg];
  return (
    <div style={{ fontFamily: fontStack }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '13px 2px',
            borderBottom: i < items.length - 1 ? `1px solid ${t.rule}` : 'none',
          }}
        >
          <span style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
            <Icon name="leaf" size={18} color={t.accent} />
          </span>
          <span style={{ flex: '1 1 auto', minWidth: 0 }}>
            <span style={{ fontWeight: 900, fontSize: 12.5, color: t.title, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{it.name}</span>
            {it.note ? (
              <span style={{ display: 'block', fontWeight: 400, fontSize: 12, color: t.body, marginTop: 3 }}>
                {it.note}
              </span>
            ) : null}
          </span>
          {it.amount ? (
            <span
              style={{
                flex: '0 0 auto',
                fontWeight: 700,
                fontSize: 13,
                color: t.accent,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {it.amount}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
