import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface CurveSeries {
  label: string;
  /** Y values 0–100, sampled left to right across the chart. */
  points: number[];
  /** The Milonga line — drawn solid in the accent color. */
  highlight?: boolean;
}

export interface EnergyCurveProps {
  series: CurveSeries[];
  /** Axis captions under the chart, e.g. ['8am','12pm','3pm','6pm']. */
  xLabels?: string[];
  /** Chart height in px. */
  height?: number;
  bg?: EmailBg;
}

/** Build a smooth-ish SVG path through evenly spaced points. */
function pathFor(points: number[], w: number, hgt: number) {
  const n = points.length;
  if (n < 2) return '';
  const x = (i: number) => (i / (n - 1)) * w;
  const y = (v: number) => hgt - (Math.max(0, Math.min(100, v)) / 100) * hgt;
  let d = `M ${x(0)} ${y(points[0])}`;
  for (let i = 1; i < n; i++) {
    const cx = (x(i - 1) + x(i)) / 2;
    d += ` C ${cx} ${y(points[i - 1])}, ${cx} ${y(points[i])}, ${x(i)} ${y(points[i])}`;
  }
  return d;
}

/**
 * The "no crash" story as a picture: energy over time. The Milonga line is a
 * steady curve in the accent color; comparisons are dashed and muted.
 */
export function EnergyCurve({ series, xLabels = [], height = 130, bg = 'forest' }: EnergyCurveProps) {
  const t = onBg[bg];
  const W = 520;

  return (
    <div style={{ fontFamily: fontStack }}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ display: 'block', overflow: 'visible' }}>
        {/* baseline */}
        <line x1={0} y1={height} x2={W} y2={height} stroke={t.rule} strokeWidth={1} />
        {series.map((s, i) => (
          <path
            key={i}
            d={pathFor(s.points, W, height)}
            fill="none"
            stroke={s.highlight ? t.accent : t.body}
            strokeWidth={s.highlight ? 3 : 2}
            strokeDasharray={s.highlight ? undefined : '5 5'}
            strokeOpacity={s.highlight ? 1 : 0.55}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {xLabels.length ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {xLabels.map((l, i) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: '0.06em', color: t.body, opacity: 0.8 }}>
              {l}
            </span>
          ))}
        </div>
      ) : null}

      {/* legend */}
      <div style={{ display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
        {series.map((s, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span
              style={{
                width: 16,
                height: 0,
                borderTop: `${s.highlight ? 3 : 2}px ${s.highlight ? 'solid' : 'dashed'} ${s.highlight ? t.accent : t.body}`,
                opacity: s.highlight ? 1 : 0.55,
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 12, fontWeight: s.highlight ? 700 : 500, color: s.highlight ? t.accent : t.body }}>
              {s.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
