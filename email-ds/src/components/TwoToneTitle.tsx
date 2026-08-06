import * as React from 'react';
import { EmailBg, onBg } from '../theme';

export interface TwoToneTitleProps {
  /** The full headline. Split automatically unless `accentPart` is given. */
  title: string;
  /**
   * The exact trailing words to render in the accent color. Omit and the
   * headline is split roughly in half by word count.
   */
  accentPart?: string;
  bg?: EmailBg;
  /** Render as one flat color instead (rare — the mix is the house style). */
  flat?: boolean;
  /** Override the accent half's colour when the campaign calls for a
   *  different brand colour than the background's default pairing. */
  accentColor?: string;
}

/**
 * Splits a headline into two colors so titles are never one flat block —
 * on dark green that's half beige, half gold; on gold and beige the second
 * half picks up the brighter green.
 */
export function splitTitle(title: string, accentPart?: string): [string, string] {
  const t = title.trim();
  if (accentPart) {
    const idx = t.toLowerCase().lastIndexOf(accentPart.trim().toLowerCase());
    if (idx > -1) return [t.slice(0, idx), t.slice(idx)];
    return [t, ''];
  }
  const words = t.split(/\s+/);
  if (words.length < 2) return ['', t]; // a single word takes the accent color
  const cut = Math.ceil(words.length / 2);
  return [words.slice(0, cut).join(' ') + ' ', words.slice(cut).join(' ')];
}

/**
 * Pick a type size that makes a headline sit evenly in the column.
 *
 * A title that ALMOST fits on one line is shrunk a point or two so it fits on
 * one; anything longer is sized so it fills two balanced rows instead of a
 * long line plus a stub. Pair it with `textWrap: 'balance'` for the split.
 */
export function fitTitleSize(title: string, base: number, columnWidth = 528): number {
  // Average advance per character for uppercase Gotham Black, as a share of em.
  const PER_CHAR = 0.72;
  const len = title.trim().length;
  if (!len) return base;
  const oneLine = columnWidth / (len * PER_CHAR);
  if (base <= oneLine) return base; // already fits on one line
  if (oneLine >= base * 0.84) return Math.floor(oneLine * 10) / 10; // nearly — pull it onto one
  const twoLines = (columnWidth * 2) / (len * PER_CHAR);
  return Math.max(base * 0.7, Math.min(base, Math.floor(twoLines * 10) / 10));
}

/** Inline two-tone headline text — use inside an existing h1/h2/h3. */
export function TwoToneTitle({ title, accentPart, bg = 'forest', flat = false, accentColor }: TwoToneTitleProps) {
  const t = onBg[bg];
  if (flat) return <>{title}</>;
  const [head, tail] = splitTitle(title, accentPart);
  return (
    <>
      {head ? <span style={{ color: t.title }}>{head}</span> : null}
      {tail ? <span style={{ color: accentColor ?? t.titleAccent }}>{tail}</span> : null}
    </>
  );
}
