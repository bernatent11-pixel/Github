import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { BrandIcon, BrandMark } from './BrandIcon';
import { IconBadge } from './IconBadge';

export interface BenefitLine {
  /** Bold headline for the row, set in caps. */
  title: string;
  /** Optional regular-weight line underneath. */
  text?: string;
  /** Brand mark shown in the disc. */
  mark?: BrandMark;
  /**
   * The amount, printed after the title and dimmed — "LION'S MANE · 500MG".
   * Putting the dose in the title rather than the body is what makes a
   * formula scannable: the reader gets name and quantity in one pass.
   */
  dose?: string;
}

export interface BenefitListProps {
  items: BenefitLine[];
  bg?: EmailBg;
  /** Disc diameter in px. */
  badgeSize?: number;
  /** Title size in px. */
  size?: number;
  /** Colour the second half of each title with the accent. */
  twoTone?: boolean;
  /**
   * `disc` fills the badge in the accent colour — loud, good for benefits.
   * `ring` is a hairline circle around the mark and separates rows with a
   * rule: quieter, and better when the copy is doing the work.
   */
  variant?: 'disc' | 'ring';
}

/**
 * A vertical run of benefits, each led by a brand mark in a filled disc.
 * The workhorse for "everything your mornings need" style lists.
 */
export function BenefitList({
  items,
  bg = 'forest',
  badgeSize = 46,
  size = 18,
  twoTone = true,
  variant = 'disc',
}: BenefitListProps) {
  const t = onBg[bg];
  const ring = variant === 'ring';
  return (
    <div style={{ fontFamily: fontStack }}>
      {items.map((b, i) => {
        // Split the title so the tail picks up the accent colour.
        const words = b.title.trim().split(/\s+/);
        const cut = twoTone && words.length > 1 ? Math.ceil(words.length / 2) : words.length;
        const head = words.slice(0, cut).join(' ');
        const tail = words.slice(cut).join(' ');
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              padding: ring ? '18px 0' : '11px 0',
              borderTop: ring && i > 0 ? `1px solid ${t.rule}` : undefined,
            }}
          >
            {ring ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: badgeSize,
                  height: badgeSize,
                  borderRadius: 999,
                  border: `1px solid ${t.rule}`,
                  flex: '0 0 auto',
                }}
              >
                <BrandIcon mark={b.mark ?? 'yerba-mate'} bg={bg} size={Math.round(badgeSize * 0.58)} />
              </span>
            ) : (
              <IconBadge mark={b.mark ?? 'yerba-mate'} bg={bg} size={badgeSize} />
            )}
            <span style={{ paddingTop: badgeSize > 34 ? 4 : 2 }}>
              <span
                style={{
                  display: 'block',
                  fontWeight: 900,
                  fontSize: size,
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  color: t.title,
                }}
              >
                {head}
                {tail ? <span style={{ color: t.titleAccent }}> {tail}</span> : null}
                {b.dose ? (
                  <span style={{ color: t.accent, opacity: 0.6, fontWeight: 700 }}> · {b.dose}</span>
                ) : null}
              </span>
              {b.text ? (
                <span style={{ display: 'block', fontSize: 13, lineHeight: 1.6, color: t.body, marginTop: 5 }}>
                  {b.text}
                </span>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}
