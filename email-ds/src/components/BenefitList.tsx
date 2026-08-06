import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { BrandMark } from './BrandIcon';
import { IconBadge } from './IconBadge';

export interface BenefitLine {
  /** Bold headline for the row, set in caps. */
  title: string;
  /** Optional regular-weight line underneath. */
  text?: string;
  /** Brand mark shown in the disc. */
  mark?: BrandMark;
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
}

/**
 * A vertical run of benefits, each led by a brand mark in a filled disc.
 * The workhorse for "everything your mornings need" style lists.
 */
export function BenefitList({
  items,
  bg = 'forest',
  badgeSize = 38,
  size = 17,
  twoTone = true,
}: BenefitListProps) {
  const t = onBg[bg];
  return (
    <div style={{ fontFamily: fontStack }}>
      {items.map((b, i) => {
        // Split the title so the tail picks up the accent colour.
        const words = b.title.trim().split(/\s+/);
        const cut = twoTone && words.length > 1 ? Math.ceil(words.length / 2) : words.length;
        const head = words.slice(0, cut).join(' ');
        const tail = words.slice(cut).join(' ');
        return (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '11px 0' }}>
            <IconBadge mark={b.mark ?? 'yerba-mate'} bg={bg} size={badgeSize} />
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
