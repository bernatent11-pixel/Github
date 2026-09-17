import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Button } from './Button';
import { Icon } from './Icon';
import { usePreset } from '../preset';

/* ────────────────────────────────────────────────────────────────────────────
   PREDETERMINED SECTIONS · PART TWO

   The pieces the first set left out: the chrome above and below the content,
   imagery that isn't a product, the offer, and the two text shapes an email
   needs that a paragraph can't do.
   ──────────────────────────────────────────────────────────────────────────── */

const pad = (n: number) => ({ height: n, lineHeight: 0, fontSize: 0 });

/* ══ S7 · ANNOUNCEMENT BAR ═══════════════════════════════════════════════ */

export interface AnnouncementBarProps {
  /** One short line. Shipping threshold, a promo, a launch date. */
  text: string;
  bg?: EmailBg;
  /** Fill the strip in the accent instead of the page colour. */
  filled?: boolean;
  href?: string;
}

/**
 * The thin strip above everything else.
 *
 * It exists because the first 40px of an email are read by everyone, including
 * the people who read nothing else. One fact — free shipping over $X, a launch
 * date, a code. Never two.
 *
 * Keep it genuinely thin. The moment it grows a headline it stops being chrome
 * and starts competing with the hero.
 */
export function AnnouncementBar({ text, bg = 'forest', filled = true, href }: AnnouncementBarProps) {
  const t = onBg[bg];
  const inner = (
    <span
      style={{
        fontFamily: fontStack,
        fontWeight: 900,
        fontSize: 10.5,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: filled ? t.btnText : t.accent,
        textDecoration: 'none',
        lineHeight: 1.2,
      }}
    >
      {text}
    </span>
  );
  return (
    <div
      style={{
        background: filled ? t.btnBg : 'transparent',
        borderBottom: filled ? undefined : `1px solid ${t.rule}`,
        padding: '11px 24px',
        textAlign: 'center',
      }}
    >
      {href ? (
        <a href={href} style={{ textDecoration: 'none' }}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

/* ══ S8 · NAV STRIP ══════════════════════════════════════════════════════ */

export interface NavStripProps {
  links: { label: string; href: string }[];
  bg?: EmailBg;
  /** Hairline under the row. */
  rule?: boolean;
}

/**
 * A row of links under the masthead — Shop, Our story, Find us.
 *
 * The most systematised brand in the benchmark carries the same nav row in
 * every single campaign, which is where most of its 97 "buttons" came from. It
 * is worth copying for one reason: it gives a reader who does not want today's
 * message somewhere to go other than the delete key.
 *
 * Three or four links. Five is a website menu.
 */
export function NavStrip({ links, bg = 'forest', rule = true }: NavStripProps) {
  const t = onBg[bg];
  return (
    <div
      style={{
        padding: '14px 24px',
        textAlign: 'center',
        borderBottom: rule ? `1px solid ${t.rule}` : undefined,
      }}
    >
      {links.map((l, i) => (
        <React.Fragment key={l.label}>
          {i > 0 ? (
            <span style={{ color: t.rule, margin: '0 10px', fontSize: 11 }}>·</span>
          ) : null}
          <a
            href={l.href}
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: t.accent,
              textDecoration: 'none',
            }}
          >
            {l.label}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ══ S9 · COLLAGE ════════════════════════════════════════════════════════ */

export interface CollageProps {
  images: { src: string; alt: string }[];
  bg?: EmailBg;
  /**
   * `row` sets them side by side at equal width. `feature` gives the first one
   * the full width and puts the rest underneath — the better choice when one
   * picture is genuinely stronger than the others.
   */
  layout?: 'row' | 'feature';
  /** 0 for a seamless mosaic, or the preset's gap for separated tiles. */
  gap?: number;
  /** Round the tiles. Off reads as a single mosaic. */
  rounded?: boolean;
  caption?: string;
}

/**
 * Two or three photographs as one moment, without any of them being a product
 * shot with a price under it.
 *
 * This is the section that makes an email feel like it came from a brand rather
 * than a store. Use it for lifestyle, texture, place, process — the things that
 * are not selling anything directly.
 *
 * At `gap: 0` the tiles butt together into a mosaic, which is the stronger look
 * when the photographs share a palette. Give them gaps when they don't.
 */
export function Collage({
  images,
  bg = 'forest',
  layout = 'row',
  gap,
  rounded = false,
  caption,
}: CollageProps) {
  const t = onBg[bg];
  const P = usePreset();
  const G = gap ?? 0;
  const tile = (im: { src: string; alt: string }, key: React.Key) => (
    <img
      key={key}
      src={im.src}
      alt={im.alt}
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        border: 0,
        borderRadius: rounded ? 10 : 0,
      }}
    />
  );

  if (layout === 'feature' && images.length > 1) {
    const [first, ...rest] = images;
    return (
      <div>
        {tile(first, 'lead')}
        <div style={{ display: 'flex', gap: G, marginTop: G }}>
          {rest.map((im, i) => (
            <div key={i} style={{ flex: 1 }}>
              {tile(im, i)}
            </div>
          ))}
        </div>
        {caption ? <Caption text={caption} bg={bg} /> : null}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: G }}>
        {images.map((im, i) => (
          <div key={i} style={{ flex: 1 }}>
            {tile(im, i)}
          </div>
        ))}
      </div>
      {caption ? <Caption text={caption} bg={bg} /> : null}
    </div>
  );
}

function Caption({ text, bg }: { text: string; bg: EmailBg }) {
  const t = onBg[bg];
  return (
    <div
      style={{
        fontFamily: fontStack,
        fontSize: 12,
        lineHeight: 1.5,
        color: t.body,
        opacity: 0.75,
        textAlign: 'center',
        padding: '12px 30px 0',
      }}
    >
      {text}
    </div>
  );
}

/* ══ S10 · OFFER BAND ════════════════════════════════════════════════════ */

export interface OfferBandProps {
  /** The offer itself — "20% OFF", "FREE SAMPLE". Short and loud. */
  headline: string;
  /** What it applies to, and any condition. One line. */
  detail?: string;
  /** A discount code, shown in a dashed box so it reads as copyable. */
  code?: string;
  /** Honest urgency only. An invented deadline is a lie the reader can check. */
  expiry?: string;
  cta: { label: string; href: string };
  bg?: EmailBg;
}

/**
 * The offer, given its own band so it cannot be mistaken for body copy.
 *
 * The dashed box around the code is doing real work: it is the visual
 * convention for "this is a thing you copy", and readers look for it. Without
 * it a code set in bold just looks like emphasis.
 *
 * Only state an expiry that is true. Fake urgency is the one promotional
 * technique a customer can catch you at, and it costs more than the sale.
 */
export function OfferBand({ headline, detail, code, expiry, cta, bg = 'forest' }: OfferBandProps) {
  const t = onBg[bg];
  return (
    <div style={{ padding: '0 30px', textAlign: 'center' }}>
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: 40,
          lineHeight: 1,
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          color: t.accent,
          textShadow: t.textShadow,
        }}
      >
        {headline}
      </div>
      {detail ? (
        <>
          <div style={pad(12)} />
          <div style={{ fontFamily: fontStack, fontSize: 15, lineHeight: 1.5, color: t.body }}>{detail}</div>
        </>
      ) : null}
      {code ? (
        <>
          <div style={pad(20)} />
          <span
            style={{
              display: 'inline-block',
              border: `2px dashed ${t.accent}`,
              borderRadius: 8,
              padding: '11px 22px',
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: t.accent,
            }}
          >
            {code}
          </span>
        </>
      ) : null}
      {expiry ? (
        <>
          <div style={pad(14)} />
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 10.5,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: t.body,
              opacity: 0.75,
            }}
          >
            {expiry}
          </div>
        </>
      ) : null}
      <div style={pad(24)} />
      <Button bg={bg} label={cta.label} href={cta.href} size="lg" />
    </div>
  );
}

/* ══ S11 · FAQ LIST ══════════════════════════════════════════════════════ */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqListProps {
  items: FaqItem[];
  bg?: EmailBg;
  /** Hairline between entries. */
  rules?: boolean;
}

/**
 * Questions and answers, which is a different shape from a paragraph and reads
 * far faster.
 *
 * Email cannot collapse and expand anything reliably, so every answer is
 * visible. That is a constraint worth respecting rather than fighting: three or
 * four short pairs, not a help centre. If the answers run long the section is
 * really an article and belongs on the site with a link to it.
 */
export function FaqList({ items, bg = 'forest', rules = true }: FaqListProps) {
  const t = onBg[bg];
  const P = usePreset();
  return (
    <div style={{ padding: '0 30px' }}>
      {items.map((it, i) => (
        <div
          key={it.q}
          style={{
            paddingTop: i === 0 ? 0 : 18,
            marginTop: i === 0 ? 0 : 18,
            borderTop: rules && i > 0 ? `1px solid ${t.rule}` : undefined,
          }}
        >
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 15,
              lineHeight: 1.35,
              color: t.title,
            }}
          >
            {it.q}
          </div>
          <div
            style={{
              fontFamily: fontStack,
              fontSize: P.body,
              lineHeight: P.bodyLead,
              color: t.body,
              marginTop: 7,
            }}
          >
            {it.a}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ S12 · QUOTE WITH IMAGE ══════════════════════════════════════════════ */

export interface QuoteWithImageProps {
  src: string;
  alt: string;
  quote: string;
  attribution: string;
  bg?: EmailBg;
  side?: 'left' | 'right';
  stars?: number;
}

/**
 * One testimonial beside a picture.
 *
 * Different job from the review grid: the grid is evidence in volume, this is a
 * single voice with a face or a moment attached. It carries much better when
 * the picture is a person or a real setting rather than the product on white —
 * the picture's job is to make the quote feel like it came from someone.
 *
 * Don't put this next to the grid. Two proof sections in a row reads as
 * protesting too much.
 */
export function QuoteWithImage({
  src,
  alt,
  quote,
  attribution,
  bg = 'forest',
  side = 'left',
  stars,
}: QuoteWithImageProps) {
  const t = onBg[bg];
  const P = usePreset();
  const art = (
    <div key="art" style={{ flex: '0 0 40%', width: '40%' }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', border: 0, borderRadius: 10 }} />
    </div>
  );
  const words = (
    <div key="words" style={{ flex: 1 }}>
      {stars ? (
        <div style={{ fontSize: 14, letterSpacing: '3px', color: t.accent, marginBottom: 12 }}>
          {'★'.repeat(stars)}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: fontStack,
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 19,
          lineHeight: 1.4,
          color: t.title,
        }}
      >
        {quote}
      </div>
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: t.accent,
          marginTop: 14,
        }}
      >
        {attribution}
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: P.gap + 8, alignItems: 'center', padding: '0 30px' }}>
      {side === 'left' ? [art, words] : [words, art]}
    </div>
  );
}

/* ══ S13 · CHECK LIST ════════════════════════════════════════════════════ */

export interface CheckListProps {
  /** Short claims. Four to six. */
  items: string[];
  bg?: EmailBg;
  /** `check` for what it has, `cross` for what it hasn't. */
  mark?: 'check' | 'cross';
  /** Two columns at 600px. One column for longer lines. */
  columns?: 1 | 2;
}

/**
 * What's in, or what's deliberately not.
 *
 * The free-from version is the more persuasive of the two for this category —
 * "no cane sugar, no erythritol, no artificial sweeteners" answers objections
 * a benefit list cannot, because it is the thing the reader was about to go
 * and check the label for.
 */
export function CheckList({ items, bg = 'forest', mark = 'check', columns = 2 }: CheckListProps) {
  const t = onBg[bg];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0 30px' }}>
      {items.map((it) => (
        <div
          key={it}
          style={{
            flex: columns === 2 ? '0 0 50%' : '0 0 100%',
            width: columns === 2 ? '50%' : '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: 12,
            paddingRight: 12,
            boxSizing: 'border-box',
          }}
        >
          <span style={{ flex: '0 0 auto', marginTop: 1 }}>
            <Icon name={mark} size={16} color={t.accent} />
          </span>
          <span
            style={{
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: 13.5,
              lineHeight: 1.4,
              color: t.body,
            }}
          >
            {it}
          </span>
        </div>
      ))}
    </div>
  );
}
