import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
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
  onDark?: boolean;
}

/** A functional-ingredient readout: name · dose · what it does, one row each. */
export function IngredientList({ items, onDark = false }: IngredientListProps) {
  return (
    <div style={{ fontFamily: fontStack }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '13px 2px',
            borderBottom: i < items.length - 1 ? `1px solid ${onDark ? colors.lineOnDark : colors.line}` : 'none',
          }}
        >
          <span
            style={{
              flex: '0 0 auto',
              width: 30,
              height: 30,
              borderRadius: radius.pill,
              background: onDark ? colors.forestDeep : colors.beige,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="leaf" size={17} color={onDark ? colors.gold : colors.leaf} />
          </span>
          <span style={{ flex: '1 1 auto', minWidth: 0 }}>
            <span style={{ fontWeight: 700, fontSize: 14.5, color: onDark ? colors.white : colors.forest }}>
              {it.name}
            </span>
            {it.note ? (
              <span style={{ display: 'block', fontWeight: 400, fontSize: 12.5, color: onDark ? colors.beige : colors.inkSoft, marginTop: 2 }}>
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
                color: onDark ? colors.gold : colors.leaf,
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
