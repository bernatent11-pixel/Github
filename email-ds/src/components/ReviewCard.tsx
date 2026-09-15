import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Icon } from './Icon';

export interface Review {
  /** The customer's name as it appears on the review, e.g. "Jose P." */
  name: string;
  /**
   * The review's own headline, as the customer wrote it. Worth carrying: it
   * gives every card a fixed top line, which is what stops a grid of equal
   * cards looking half-empty when the quotes run to different lengths.
   */
  title?: string;
  /** The quote. Trim for length if you must; never reword a customer. */
  quote: string;
  /** Out of five. Defaults to five — pass a real number, never a flattering one. */
  stars?: number;
}

export interface ReviewCardProps {
  review: Review;
  bg?: EmailBg;
  /**
   * Force a fixed height so a row of cards is optically equal. Used by the
   * `grid` layout, where ragged card heights read as a mistake rather than as
   * reviews of different lengths.
   */
  height?: number;
  /** Quote size. The grid runs smaller than a full-width stack. */
  size?: number;
}

/**
 * One customer review on a filled gold card: stars, the quote, the name.
 *
 * **Build these as live text, never as a flattened image.** A testimonial block
 * exported as one PNG has nothing to select, nothing to click and nothing to
 * read when images are blocked — which is most of the first impression on a
 * cold list. Milonga's previous image-only testimonial block took roughly a
 * third of the clicks of the campaigns around it.
 *
 * The quote is set in italic at a size that survives a phone, and the name sits
 * under it in small caps so the eye lands on the words before the attribution.
 */
export function ReviewCard({ review, bg = 'forest', height, size = 14.5 }: ReviewCardProps) {
  const t = onBg[bg];
  const stars = review.stars ?? 5;
  return (
    <div
      style={{
        background: colors.gold,
        borderRadius: 16,
        padding: height ? '18px 18px' : '20px 22px',
        boxShadow: t.shadowLg,
        // The lit top edge — the card catches light rather than lying flat.
        borderTop: `1px solid rgba(255,255,255,0.45)`,
        ...(height
          ? { height, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }
          : null),
      }}
    >
      <div style={{ fontSize: 0, marginBottom: 11 }}>
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} style={{ display: 'inline-block', marginRight: 3 }}>
            <Icon name="star" size={15} color={colors.forest} />
          </span>
        ))}
      </div>
      {review.title ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 900,
            fontSize: height ? 12.5 : 14,
            lineHeight: 1.25,
            color: colors.forest,
            marginBottom: 7,
          }}
        >
          {review.title}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: fontStack,
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1.45,
          color: colors.forest,
          // In a fixed-height card the quote takes the slack so the name is
          // pinned to the bottom edge and every attribution lines up.
          ...(height ? { flex: 1 } : null),
        }}
      >
        {review.quote}
      </div>
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: 10.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: colors.forest,
          opacity: 0.72,
          marginTop: 13,
        }}
      >
        {review.name}
      </div>
    </div>
  );
}

export interface ReviewsProps {
  reviews: Review[];
  bg?: EmailBg;
  /** Space between cards, in px. */
  gap?: number;
  /**
   * `stack` is one full-width card per row — best when the quotes are long or
   * uneven. `grid` is two equal square cards per row: tidier, and the right
   * choice when there are enough reviews that a stack would run for a screen
   * and a half. In `grid` every card is the same height, so the longest quote
   * sets it for all of them.
   */
  layout?: 'stack' | 'grid';
  /** Card height in `grid`. Square at the default two-up column width. */
  cardHeight?: number;
}

/** Review cards, stacked full width or squared off two to a row. */
export function Reviews({
  reviews,
  bg = 'forest',
  gap = 14,
  layout = 'stack',
  cardHeight = 248,
}: ReviewsProps) {
  if (layout === 'grid') {
    // An odd count leaves a half-empty row. Rather than let one card sit at
    // column width with a void under it, the last one runs full width and
    // sizes to its own text — it reads as a closing quote instead of a gap.
    const odd = reviews.length % 2 === 1;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap, justifyContent: 'center' }}>
        {reviews.map((r, i) => {
          const last = odd && i === reviews.length - 1;
          return (
            <div
              key={r.name}
              style={
                last
                  ? { flex: '0 0 100%', width: '100%' }
                  : { flex: `0 0 calc(50% - ${gap / 2}px)`, width: `calc(50% - ${gap / 2}px)` }
              }
            >
              <ReviewCard review={r} bg={bg} height={last ? undefined : cardHeight} size={12.5} />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {reviews.map((r, i) => (
        <div key={r.name} style={{ marginTop: i === 0 ? 0 : gap }}>
          <ReviewCard review={r} bg={bg} />
        </div>
      ))}
    </div>
  );
}
