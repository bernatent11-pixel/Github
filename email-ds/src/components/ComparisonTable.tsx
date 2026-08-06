import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';
import { Icon } from './Icon';

/** A cell value: a tick, a cross, or a short string like "Varies". */
export type CellValue = boolean | string;

/** A cell may carry a small note under the value, e.g. "100mg from yerba mate". */
export type Cell = CellValue | { v: CellValue; note?: string };

/** A row: a label (with an optional note under it) and one cell per column. */
export type Row = [string, ...Cell[]] | { label: string; note?: string; cells: Cell[] };

export interface ComparisonTableProps {
  /** Column headers; the first is the row-label column (usually ''). */
  columns: string[];
  rows: Row[];
  /** Index of the column to highlight as Milonga (default 1). */
  highlight?: number;
  /**
   * `rows` = horizontal hairlines only (default) ·
   * `lane` = the Milonga column sits in an outlined lane ·
   * `grid` = lines on both axes.
   */
  style?: 'rows' | 'lane' | 'grid';
  bg?: EmailBg;
}

const norm = (r: Row) =>
  Array.isArray(r) ? { label: r[0], note: undefined as string | undefined, cells: r.slice(1) as Cell[] } : r;
const cellOf = (c: Cell) => (typeof c === 'object' && c !== null ? c : { v: c as CellValue, note: undefined });

/**
 * A "Milonga vs. the rest" table. Cells are ticks, crosses or short text, each
 * with an optional note; the Milonga column is accented so it wins at a glance.
 */
export function ComparisonTable({ columns, rows, highlight = 1, style = 'rows', bg = 'forest' }: ComparisonTableProps) {
  const t = onBg[bg];
  const lane = style === 'lane';
  const grid = style === 'grid';
  const laneFill = useBlockFill(bg, 'rgba(255,255,255,0.05)');

  const colStyle = (i: number): React.CSSProperties =>
    i === highlight
      ? { background: lane ? laneFill : 'transparent', borderLeft: `1px solid ${t.rule}`, borderRight: `1px solid ${t.rule}` }
      : grid && i > 0
        ? { borderLeft: `1px solid ${t.rule}` }
        : {};

  const renderValue = (v: CellValue, hl: boolean) => {
    if (typeof v === 'boolean') {
      return <Icon name={v ? 'check' : 'cross'} size={16} color={v ? (hl ? t.accent : t.icon) : t.rule} />;
    }
    return (
      <span style={{ fontWeight: 900, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: hl ? t.accent : t.body }}>
        {v}
      </span>
    );
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fontStack }}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th
              key={i}
              style={{
                textAlign: i === 0 ? 'left' : 'center',
                verticalAlign: 'bottom',
                padding: '10px 8px',
                fontWeight: 900,
                fontSize: 10.5,
                lineHeight: 1.25,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: i === highlight ? t.accent : t.title,
                borderBottom: `1px solid ${t.rule}`,
                ...colStyle(i),
                ...(i === highlight ? { borderTop: `1px solid ${t.rule}` } : {}),
              }}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((raw, r) => {
          const row = norm(raw);
          const last = r === rows.length - 1;
          return (
            <tr key={r}>
              <td
                style={{
                  padding: '11px 8px',
                  borderTop: r ? `1px solid ${t.rule}` : 'none',
                  verticalAlign: 'middle',
                }}
              >
                <span style={{ display: 'block', fontWeight: 700, fontSize: 12.5, color: t.title, lineHeight: 1.25 }}>
                  {row.label}
                </span>
                {row.note ? (
                  <span style={{ display: 'block', fontSize: 10.5, color: t.body, opacity: 0.8, marginTop: 2 }}>
                    {row.note}
                  </span>
                ) : null}
              </td>
              {row.cells.map((raw2, c) => {
                const cell = cellOf(raw2);
                const hl = c + 1 === highlight;
                return (
                  <td
                    key={c}
                    style={{
                      textAlign: 'center',
                      padding: '11px 8px',
                      borderTop: r ? `1px solid ${t.rule}` : 'none',
                      verticalAlign: 'middle',
                      ...colStyle(c + 1),
                      ...(hl && last ? { borderBottom: `1px solid ${t.rule}` } : {}),
                    }}
                  >
                    {renderValue(cell.v, hl)}
                    {cell.note ? (
                      <span
                        style={{
                          display: 'block',
                          fontSize: 10,
                          lineHeight: 1.35,
                          color: hl ? t.accent : t.body,
                          opacity: hl ? 0.95 : 0.75,
                          marginTop: 4,
                        }}
                      >
                        {cell.note}
                      </span>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
