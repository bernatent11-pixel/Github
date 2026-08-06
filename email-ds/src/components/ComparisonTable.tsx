import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Icon } from './Icon';

/** A cell is a check, a cross, or a short text value. */
export type Cell = boolean | string;

export interface ComparisonTableProps {
  /** Column headers; the first column is the row label (leave ''). */
  columns: string[];
  /** Rows: [rowLabel, ...cells] aligned to columns. */
  rows: Array<[string, ...Cell[]]>;
  /** Index of the column to highlight as Milonga (default 1). */
  highlight?: number;
  /**
   * `rows` = horizontal hairlines only (lightest) ·
   * `lane` = no grid, the Milonga column sits in an outlined lane ·
   * `grid` = lines on both axes (densest).
   */
  style?: 'rows' | 'lane' | 'grid';
  /** The email's flat background color. */
  bg?: EmailBg;
}

/**
 * A "Milonga vs. the rest" table. Outlined, never filled — the Milonga column
 * is marked with the accent color so it reads without a solid block.
 */
export function ComparisonTable({ columns, rows, highlight = 1, style = 'rows', bg = 'forest' }: ComparisonTableProps) {
  const t = onBg[bg];
  const grid = style === 'grid';
  const lane = style === 'lane';
  /** In `lane` style the Milonga column is bounded by a soft outline. */
  const laneEdge = (i: number): React.CSSProperties =>
    lane && i === highlight
      ? { borderLeft: `1px solid ${t.rule}`, borderRight: `1px solid ${t.rule}` }
      : {};

  const renderCell = (v: Cell, hl: boolean) => {
    if (typeof v === 'boolean') {
      return <Icon name={v ? 'check' : 'cross'} size={17} color={v ? (hl ? t.icon : t.body) : t.rule} />;
    }
    return <span style={{ fontWeight: 700, fontSize: 12.5, color: hl ? t.accent : t.body }}>{v}</span>;
  };

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: fontStack,
        border: grid ? `1px solid ${t.rule}` : 'none',
        borderRadius: grid ? 14 : 0,
      }}
    >
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th
              key={i}
              style={{
                textAlign: i === 0 ? 'left' : 'center',
                padding: '12px 12px',
                fontWeight: 900,
                fontSize: 12.5,
                color: i === highlight ? t.accent : t.title,
                borderBottom: `1px solid ${t.rule}`,
                ...(lane && i === highlight ? { borderTop: `1px solid ${t.rule}` } : {}),
                ...laneEdge(i),
              }}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => {
          const [label, ...cells] = row;
          return (
            <tr key={r}>
              <td
                style={{
                  padding: '12px 12px',
                  fontWeight: 500,
                  fontSize: 12.5,
                  color: t.body,
                  borderTop: r ? `1px solid ${t.rule}` : 'none',
                }}
              >
                {label}
              </td>
              {cells.map((v, c) => (
                <td
                  key={c}
                  style={{
                    textAlign: 'center',
                    padding: '12px 12px',
                    borderTop: r ? `1px solid ${t.rule}` : 'none',
                    ...(grid ? { borderLeft: `1px solid ${t.rule}` } : {}),
                    ...laneEdge(c + 1),
                    ...(lane && c + 1 === highlight && r === rows.length - 1
                      ? { borderBottom: `1px solid ${t.rule}` }
                      : {}),
                  }}
                >
                  {renderCell(v, c + 1 === highlight)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
