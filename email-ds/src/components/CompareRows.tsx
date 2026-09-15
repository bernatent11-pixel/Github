import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface CompareRow {
  /** What is being compared: "Caffeine", "The feeling", "Per cup". */
  label: string;
  /** Milonga's answer. */
  ours: string;
  /**
   * Theirs. Pass an em dash for "they don't have this" — and pass it rather
   * than a number you cannot source. A figure we can't stand behind is worse
   * than an honest blank.
   */
  theirs: string;
}

export interface CompareRowsProps {
  rows: CompareRow[];
  bg?: EmailBg;
  /** Column heads, e.g. "Mate Latte" and "Coffee". */
  ourName: string;
  theirName: string;
  /** Optional art above each column head — a product cutout and an icon. */
  ourArt?: React.ReactNode;
  theirArt?: React.ReactNode;
}

/**
 * A two-column comparison, one rounded row per attribute.
 *
 * The argument is carried by the colour, not by the copy: our column is filled
 * gold, theirs is a hairline outline. A reader who only scans sees a solid gold
 * stripe beside a mostly empty one and has the point before reading a word.
 *
 * Keep each cell to a short phrase. These are rounded cells, not pills — they
 * may wrap to two lines — but a cell that runs to three has become a paragraph
 * in a box and belongs in the body copy instead.
 */
export function CompareRows({
  rows,
  bg = 'forest',
  ourName,
  theirName,
  ourArt,
  theirArt,
}: CompareRowsProps) {
  const t = onBg[bg];
  // Narrow label gutter and a capped width: the table reads as one centred
  // object rather than a full-bleed spreadsheet.
  const LABEL = 66;
  const MAXW = 512;

  const head: React.CSSProperties = {
    fontFamily: fontStack,
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: '0.13em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
  };

  const cell: React.CSSProperties = {
    fontFamily: fontStack,
    fontWeight: 700,
    fontSize: 11.5,
    lineHeight: 1.35,
    borderRadius: 999,
    padding: '10px 13px',
    textAlign: 'center',
  };

  return (
    <div style={{ maxWidth: MAXW, margin: '0 auto' }}>
      {/* Column heads — art, then the name. */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <div style={{ flex: `0 0 ${LABEL}px`, width: LABEL }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          {ourArt}
          <div style={{ ...head, color: t.accent, marginTop: 8 }}>{ourName}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          {theirArt}
          <div style={{ ...head, color: t.body, opacity: 0.66, marginTop: 8 }}>{theirName}</div>
        </div>
      </div>

      <div style={{ height: 14 }} />

      {rows.map((r) => (
        <div
          key={r.label}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}
        >
          <div
            style={{
              flex: `0 0 ${LABEL}px`,
              width: LABEL,
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 9,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: t.accent,
              lineHeight: 1.25,
            }}
          >
            {r.label}
          </div>
          <div
            style={{
              ...cell,
              flex: 1,
              background: colors.gold,
              color: colors.forest,
              boxShadow: t.btnShadow,
            }}
          >
            {r.ours}
          </div>
          <div
            style={{
              ...cell,
              flex: 1,
              border: `1px solid ${t.outline}`,
              color: t.body,
              opacity: 0.72,
            }}
          >
            {r.theirs}
          </div>
        </div>
      ))}
    </div>
  );
}
