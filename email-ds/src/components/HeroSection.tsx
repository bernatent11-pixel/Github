import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Logo, LogoTone } from './Logo';
import { usePreset } from '../preset';

/* ────────────────────────────────────────────────────────────────────────────
   S0 · HERO — the first section of any email.

   Built from five competitor heroes Bernat sent (Cann, MUD\WTR, Brez, Athletic
   Brewing, Mateína). They use the same eight parts in a different order:

     announcement bar · logo · eyebrow · headline · feature figure ·
     subtitle / body · CTA · photograph

   What actually separates them is only WHERE THE PHOTOGRAPH SITS relative to
   the words, which is why this is one component with three variants rather
   than three components:

     over   type on a full-bleed photograph            (Cann, Mateína)
     stack  words first, photograph underneath them    (Brez, Athletic, MUD\WTR)
     card   photograph full-bleed with a coloured card
            floating over its lower edge carrying the
            headline and the CTA                       (Cann)

   Everything is Milonga's own: Gotham, the contrast map, pill CTAs. Nothing
   here reproduces a competitor's layout — what is borrowed is the anatomy,
   which is common to all five and to most good email heroes.
   ──────────────────────────────────────────────────────────────────────────── */

export interface HeroSectionCta {
  label: string;
  href: string;
  /** `solid` is the loud fill. `outline` is the quieter hairline pill. */
  style?: 'solid' | 'outline';
  /** A trailing arrow. Cheap, and it lifts click-through on a single CTA. */
  arrow?: boolean;
}

export interface HeroSectionProps {
  src: string;
  alt: string;
  bg?: EmailBg;
  variant?: 'over' | 'stack' | 'card';

  /** Thin strip above everything. One fact. */
  announcement?: string;
  /** Wordmark above the headline. */
  logo?: boolean;
  /**
   * Ink for the wordmark. Defaults sensibly, but a photograph's top edge is
   * whatever the photographer made it, so this is the one colour the contrast
   * map cannot decide for you — check the render and override when the mark
   * disappears.
   */
  logoTone?: LogoTone;
  /** Small caps lead-in. */
  eyebrow?: string;
  /** The house two-line headline. */
  line1: string;
  line2?: string;
  /**
   * An oversized figure or phrase between the two headline lines — "46% OFF",
   * "70,000+". When the campaign has one number worth shouting, this is where
   * it goes, and the headline shrinks to make room for it.
   */
  feature?: string;
  subtitle?: string;
  body?: string;
  cta?: HeroSectionCta;
  /** A fact pinned on the photograph. Gold pill; never a link. */
  badge?: string;
  /** Tiny line under the CTA — terms, a caveat, an expiry. */
  legal?: string;

  /** `over` only: which third of the photo the type sits in. */
  anchor?: 'top' | 'bottom';
  /** `over` only: darken that third so the type survives a busy picture. */
  scrim?: boolean;
  /** `card` only: the card's colour. Defaults to the button fill. */
  cardBg?: string;
  size?: number;
}

const SCRIM = {
  top: 'linear-gradient(to bottom, rgba(0,26,13,0.66) 0%, rgba(0,26,13,0.30) 48%, rgba(0,26,13,0) 74%)',
  bottom: 'linear-gradient(to top, rgba(0,26,13,0.66) 0%, rgba(0,26,13,0.30) 48%, rgba(0,26,13,0) 74%)',
};

export function HeroSection({
  src,
  alt,
  bg = 'forest',
  variant = 'stack',
  announcement,
  logo = true,
  eyebrow,
  line1,
  line2 = '',
  feature,
  subtitle,
  body,
  cta,
  badge,
  legal,
  logoTone,
  anchor = 'bottom',
  scrim = true,
  cardBg,
  size,
}: HeroSectionProps) {
  const t = onBg[bg];
  const P = usePreset();
  const over = variant === 'over';
  const card = variant === 'card';

  // On a photograph or a filled card the type is always the light ink — the
  // contrast map's colours are chosen against a flat brand ground, and neither
  // of those is one.
  const ink = over ? colors.beige : card ? colors.beige : t.title;
  const accentInk = over || card ? colors.gold : t.titleAccent;
  const bodyInk = over || card ? 'rgba(255,255,255,0.92)' : t.body;

  // A feature figure takes the room, so the headline steps down to make way.
  const H = size ?? (feature ? Math.round((P.headline ?? 38) * 0.62) : P.headline ?? 38);

  const headline = (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: H,
          lineHeight: 1.04,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: ink,
          textShadow: over ? '0 2px 14px rgba(0,26,13,0.45)' : t.textShadow,
        }}
      >
        {line1}
      </div>
      {feature ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 900,
            fontSize: Math.round(H * 1.85),
            lineHeight: 1,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: accentInk,
            margin: '6px 0',
            textShadow: over ? '0 2px 18px rgba(0,26,13,0.5)' : t.textShadow,
          }}
        >
          {feature}
        </div>
      ) : null}
      {line2 ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 900,
            fontStyle: feature ? 'normal' : 'italic',
            fontSize: H,
            lineHeight: 1.04,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: feature ? ink : accentInk,
            textShadow: over ? '0 2px 14px rgba(0,26,13,0.45)' : t.textShadow,
          }}
        >
          {line2}
        </div>
      ) : null}
    </div>
  );

  const button = cta ? (
    <a
      href={cta.href}
      style={{
        display: 'inline-block',
        textDecoration: 'none',
        borderRadius: 999,
        padding: '15px 32px',
        fontFamily: fontStack,
        fontWeight: 900,
        fontSize: 12.5,
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        lineHeight: 1,
        ...(cta.style === 'outline'
          ? {
              background: 'transparent',
              border: `2px solid ${over || card ? colors.gold : t.btnBg}`,
              color: over || card ? colors.gold : t.btnBg,
            }
          : {
              background: over || card ? colors.gold : t.btnGradient,
              backgroundColor: over || card ? colors.gold : t.btnBg,
              border: '2px solid transparent',
              color: over || card ? colors.forest : t.btnText,
              boxShadow: t.btnShadow,
            }),
      }}
    >
      {cta.label}
      {cta.arrow ? <span style={{ marginLeft: 10 }}>&rarr;</span> : null}
    </a>
  ) : null;

  const small = (text: string, color: string, gap: number) => (
    <div style={{ marginTop: gap }}>
      <span
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: P.eyebrow,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color,
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );

  const copy = body ? (
    <div
      style={{
        fontFamily: fontStack,
        fontWeight: 400,
        fontSize: P.body,
        lineHeight: P.bodyLead,
        color: bodyInk,
        maxWidth: P.copyWidth,
        margin: '16px auto 0',
      }}
    >
      {body}
    </div>
  ) : null;

  const bar = announcement ? (
    <div style={{ background: t.btnBg, padding: '11px 24px', textAlign: 'center' }}>
      <span
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: 10.5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: t.btnText,
          lineHeight: 1.2,
        }}
      >
        {announcement}
      </span>
    </div>
  ) : null;

  // On `over` the mark sits on bare photograph unless the scrim reaches it —
  // which it only does at the anchored end. Anywhere else, the page's own logo
  // tone is the safer default.
  const markTone: LogoTone = logoTone ?? (over && anchor === 'top' ? 'beige' : over ? t.logo : t.logo);
  const mark = logo ? (
    <div style={{ textAlign: 'center', paddingBottom: 22 }}>
      <Logo tone={markTone} variant="primary" height={48} />
    </div>
  ) : null;

  const pinned = badge ? (
    <div style={{ position: 'absolute', top: '7%', left: '5%' }}>
      <span
        style={{
          display: 'inline-block',
          background: colors.gold,
          color: colors.forest,
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          borderRadius: 999,
          padding: '8px 14px',
          boxShadow: '0 4px 14px rgba(0,26,13,0.3)',
        }}
      >
        {badge}
      </span>
    </div>
  ) : null;

  const photo = (
    <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', border: 0 }} />
  );

  /* ── over: type on the photograph ───────────────────────────────────── */
  if (over) {
    return (
      <div>
        {bar}
        <div style={{ position: 'relative', lineHeight: 0 }}>
          {photo}
          {scrim ? (
            <div style={{ position: 'absolute', inset: 0, background: SCRIM[anchor] }} />
          ) : null}
          {pinned}
          {/* The wordmark pins to the top of the picture rather than riding in
              the copy stack. Inside the stack it lands wherever the photograph
              happens to be busiest and disappears; at the top it has the sky. */}
          {logo && anchor === 'bottom' ? (
            <div style={{ position: 'absolute', top: 22, left: 0, right: 0, textAlign: 'center' }}>
              <Logo tone={logoTone ?? t.logo} variant="primary" height={46} />
            </div>
          ) : null}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              ...(anchor === 'top' ? { top: 0, padding: '28px 30px 0' } : { bottom: 0, padding: '0 30px 32px' }),
              textAlign: 'center',
            }}
          >
            {anchor === 'top' ? mark : null}
            {eyebrow ? small(eyebrow, colors.gold, 0) : null}
            <div style={{ height: eyebrow ? 12 : 0 }} />
            {headline}
            {subtitle ? small(subtitle, 'rgba(255,255,255,0.88)', 12) : null}
            {copy}
            {button ? <div style={{ marginTop: 24 }}>{button}</div> : null}
            {legal ? (
              <div
                style={{
                  fontFamily: fontStack,
                  fontSize: 9.5,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.7)',
                  marginTop: 12,
                }}
              >
                {legal}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  /* ── card: photograph with a coloured card over its lower edge ──────── */
  if (card) {
    return (
      <div>
        {bar}
        <div style={{ position: 'relative', lineHeight: 0 }}>
          {photo}
          {pinned}
          {logo ? (
            <div style={{ position: 'absolute', top: 20, left: 0, right: 0, textAlign: 'center' }}>
              <Logo tone="beige" variant="primary" height={42} />
            </div>
          ) : null}
        </div>
        {/* The card rides up over the photo's bottom edge — the overlap is what
            makes it read as one object rather than two stacked bands. Outlook
            drops the negative margin and simply butts them together, which
            still looks deliberate. */}
        <div style={{ padding: '0 24px', marginTop: -46, position: 'relative' }}>
          <div
            style={{
              background: cardBg ?? t.btnBg,
              borderRadius: 18,
              padding: '28px 26px',
              textAlign: 'center',
              boxShadow: '0 12px 34px rgba(0,26,13,0.26)',
            }}
          >
            {eyebrow ? small(eyebrow, colors.gold, 0) : null}
            <div style={{ height: eyebrow ? 12 : 0 }} />
            {headline}
            {subtitle ? small(subtitle, 'rgba(255,255,255,0.88)', 12) : null}
            {copy}
            {button ? <div style={{ marginTop: 22 }}>{button}</div> : null}
            {legal ? (
              <div
                style={{
                  fontFamily: fontStack,
                  fontSize: 9.5,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.7)',
                  marginTop: 12,
                }}
              >
                {legal}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  /* ── stack: words, then the photograph ──────────────────────────────── */
  return (
    <div>
      {bar}
      <div style={{ padding: '30px 30px 0', textAlign: 'center' }}>
        {mark}
        {eyebrow ? small(eyebrow, t.accent, 0) : null}
        <div style={{ height: eyebrow ? 14 : 0 }} />
        {headline}
        {subtitle ? small(subtitle, t.accent, 14) : null}
        {copy}
        {button ? <div style={{ marginTop: 24 }}>{button}</div> : null}
        {legal ? (
          <div
            style={{
              fontFamily: fontStack,
              fontSize: 9.5,
              letterSpacing: '0.06em',
              color: t.body,
              opacity: 0.7,
              marginTop: 12,
            }}
          >
            {legal}
          </div>
        ) : null}
      </div>
      <div style={{ height: 28 }} />
      <div style={{ position: 'relative', lineHeight: 0 }}>
        {photo}
        {pinned}
      </div>
    </div>
  );
}
