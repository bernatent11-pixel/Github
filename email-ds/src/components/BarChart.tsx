import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';

export interface Bar {
  label: string;
  value: number;
  /** Optional value suffix, e.g. "mg". */
  suffix?: string;
  /** Highlight this bar as Milonga (gold on forest track). */
  highlight?: boolean;
}

export interface BarChartProps {
  data: Bar[];
  /** Max value for scaling; defaults to the largest value. */
  max?: number;
  onDark?: boolean;
}

/** A minimal horizontal bar chart for at-a-glance comparisons (caffeine, focus, etc.). */
export function BarChart({ data, max, onDark = false }: BarChartProps) {
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ fontFamily: fontStack, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {data.map((d, i) => {
        const pct = Math.max(4, Math.round((d.value / top) * 100));
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: onDark ? colors.beige : colors.forest }}>
                {d.label}
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: d.highlight ? (onDark ? colors.gold : colors.leaf) : onDark ? colors.beige : colors.inkSoft,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {d.value}
                {d.suffix ?? ''}
              </span>
            </div>
            <div
              style={{
                height: 12,
                borderRadius: radius.pill,
                background: onDark ? colors.forestDeep : colors.beige,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  borderRadius: radius.pill,
                  background: d.highlight ? colors.gold : onDark ? colors.leaf : colors.forest,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
