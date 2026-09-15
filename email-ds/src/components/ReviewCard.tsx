import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Icon } from './Icon';

export interface Review {
  /** The customer's name as it appears on the review, e.g. "Jose P." */
  name: string;
  /** The quote. Trim for length if you must; never reword a customer. */
  quote: string;
  /** Out of five. Defaults to five — pass a real number, never a flattering one. */
  stars?: number;
}

export interface ReviewCardProps {
  review: Review;
  bg?: EmailBg;
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
export function ReviewCard({ review, bg = 'forest' }: ReviewCardProps) {
  const t = onBg[bg];
  const stars = review.stars ?? 5;
  return (
    <div
      style={{
        background: colors.gold,
        borderRadius: 16,
        padding: '20px 22px',
        boxShadow: t.shadowLg,
        // The lit top edge — the card catches light rather than lying flat.
        borderTop: `1px solid rgba(255,255,255,0.45)`,
      }}
    >
      <div style={{ fontSize: 0, marginBottom: 11 }}>
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} style={{ display: 'inline-block', marginRight: 3 }}>
            <Icon name="star" size={15} color={colors.forest} />
          </span>
        ))}
      </div>
      <div
        style={{
          fontFamily: fontStack,
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 14.5,
          lineHeight: 1.5,
          color: colors.forest,
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
}

/** A stack of review cards. */
export function Reviews({ reviews, bg = 'forest', gap = 14 }: ReviewsProps) {
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
