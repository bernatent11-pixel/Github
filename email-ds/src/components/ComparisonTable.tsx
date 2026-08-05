import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
import { Icon } from './Icon';

/** A cell is a check, a cross, or a short text value. */
export type Cell = boolean | string;

export interface ComparisonTableProps {
  /** Column headers; the first column is the row label (leave '' ). */
  columns: string[];
  /** Rows: [rowLabel, ...cells] aligned to columns. */
  rows: Array<[string, ...Cell[]]>;
  /** Index of the column to highlight as Milonga (default 1). */
  highlight?: number;
}

function renderCell(v: Cell, highlighted: boolean) {
  if (typeof v === 'boolean') {
    return (
      <Icon
        name={v ? 'check' : 'cross'}
        size={18}
        color={v ? (highlighted ? colors.gold : colors.leaf) : highlighted ? colors.lineOnDark : '#C7BCA6'}
      />
    );
  }
  return (
    <span style={{ fontWeight: 700, fontSize: 13, color: highlighted ? colors.gold : colors.forest }}>{v}</span>
  );
}

/** A "Milonga vs. the rest" table — the Milonga column is highlighted in forest + gold. */
export function ComparisonTable({ columns, rows, highlight = 1 }: ComparisonTableProps) {
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        fontFamily: fontStack,
        borderRadius: radius.md,
        overflow: 'hidden',
        border: `1px solid ${colors.line}`,
      }}
    >
      <thead>
        <tr>
          {columns.map((c, i) => {
            const hl = i === highlight;
            return (
              <th
                key={i}
                style={{
                  textAlign: i === 0 ? 'left' : 'center',
                  padding: '13px 14px',
                  fontWeight: 900,
                  fontSize: 13,
                  color: hl ? colors.gold : i === 0 ? colors.inkSoft : colors.forest,
                  background: hl ? colors.forest : colors.beige,
                  letterSpacing: hl ? '0.02em' : 0,
                }}
              >
                {c}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => {
          const [label, ...cells] = row;
          return (
            <tr key={r}>
              <td
                style={{
                  padding: '13px 14px',
                  fontWeight: 500,
                  fontSize: 13.5,
                  color: colors.ink,
                  background: colors.white,
                  borderTop: `1px solid ${colors.line}`,
                }}
              >
                {label}
              </td>
              {cells.map((v, c) => {
                const hl = c + 1 === highlight;
                return (
                  <td
                    key={c}
                    style={{
                      textAlign: 'center',
                      padding: '13px 14px',
                      background: hl ? 'rgba(0,77,39,0.94)' : colors.white,
                      borderTop: `1px solid ${hl ? 'rgba(227,188,98,0.25)' : colors.line}`,
                    }}
                  >
                    {renderCell(v, hl)}
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
