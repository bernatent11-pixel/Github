import * as React from 'react';
import { fontStack, radius } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface Bar {
  label: string;
  value: number;
  /** Optional value suffix, e.g. "mg". */
  suffix?: string;
  /** Highlight this bar as Milonga (accent fill instead of the muted one). */
  highlight?: boolean;
}

export interface BarChartProps {
  data: Bar[];
  /** Max value for scaling; defaults to the largest value. */
  max?: number;
  /** The email's flat background color. */
  bg?: EmailBg;
}

/** A minimal horizontal bar chart for at-a-glance comparisons (caffeine, focus, etc.). */
export function BarChart({ data, max, bg = 'forest' }: BarChartProps) {
  const t = onBg[bg];
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ fontFamily: fontStack, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {data.map((d, i) => {
        const pct = Math.max(4, Math.round((d.value / top) * 100));
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: t.title }}>{d.label}</span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: t.accent,
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
                background: t.panel,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  borderRadius: radius.pill,
                  background: d.highlight ? t.accent : t.title,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
