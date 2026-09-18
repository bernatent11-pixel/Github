import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Logo } from './Logo';
import { bgStyle } from '../textures';

/* ────────────────────────────────────────────────────────────────────────────
   HERO TEMPLATES · one per reference Bernat sent.

   Five fixed layouts, in Milonga's own type and colour. Each is plug and play:
   pass a picture and the copy, and nothing moves.

   THE RULE THAT MAKES THEM PLUG AND PLAY
   --------------------------------------
   Every photograph sits in a FIXED-RATIO frame and is cropped to fill it. A
   raw <img> takes whatever height its file happens to have, so a portrait shot
   pushes the headline down the page and a wide one starves it — which is why
   swapping an image in a normal template wrecks the layout. Here the frame
   owns the height and the picture adapts to it, so the type, the CTA and the
   spacing land in exactly the same place every time.

   The trade: images are cropped, not letterboxed. Give each frame art with its
   subject near the centre, or set `focus` to move the crop.
   ──────────────────────────────────────────────────────────────────────────── */

export interface FrameProps {
  src: string;
  alt: string;
  /** Height as a share of width. 1 = square, 1.25 = portrait, 0.66 = wide. */
  ratio: number;
  /** Which part of the picture to keep when cropping. CSS object-position. */
  focus?: string;
  children?: React.ReactNode;
}

/** A picture that always occupies the same box, whatever file goes in it. */
export function Frame({ src, alt, ratio, focus = 'center', children }: FrameProps) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: `${ratio * 100}%`, overflow: 'hidden', lineHeight: 0 }}>
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: focus,
          border: 0,
          display: 'block',
        }}
      />
      {children}
    </div>
  );
}

/* shared atoms ─────────────────────────────────────────────────────────── */

const caps = (size: number, tracking: string, color: string): React.CSSProperties => ({
  fontFamily: fontStack,
  fontWeight: 900,
  fontSize: size,
  letterSpacing: tracking,
  textTransform: 'uppercase',
  color,
  lineHeight: 1.25,
});

export interface Cta {
  label: string;
  href: string;
  arrow?: boolean;
}

function Pill({
  cta,
  fill,
  ink,
  outline = false,
  size = 12.5,
}: {
  cta: Cta;
  fill: string;
  ink: string;
  outline?: boolean;
  size?: number;
}) {
  return (
    <a
      href={cta.href}
      style={{
        display: 'inline-block',
        textDecoration: 'none',
        borderRadius: 999,
        padding: '15px 30px',
        ...caps(size, '0.13em', outline ? fill : ink),
        lineHeight: 1,
        background: outline ? 'transparent' : fill,
        border: `2px solid ${fill}`,
      }}
    >
      {cta.label}
      {cta.arrow ? <span style={{ marginLeft: 10 }}>&rarr;</span> : null}
    </a>
  );
}

function Bar({ text, fill, ink }: { text: string; fill: string; ink: string }) {
  return (
    <div style={{ background: fill, padding: '11px 20px', textAlign: 'center' }}>
      <span style={{ ...caps(10, '0.16em', ink), lineHeight: 1.2 }}>{text}</span>
    </div>
  );
}

/* ══ T1 · PHOTO + FLOATING CARD ══════════════════════════════════════════
   Reference: the spritz hero. Announcement strip, a tall photograph carrying
   an oversized offer, a pinned badge, then a filled card riding up over the
   picture's lower edge with the ask and a hairline pill. ─────────────────── */

export interface T1Props {
  src: string;
  alt: string;
  announcement?: string;
  /** Small line above the offer. */
  lead?: string;
  /** The oversized offer itself — two lines, the first much louder. */
  offerLine1: string;
  offerLine2?: string;
  /** Pinned on the picture. Straight, not tilted: rotation dies in email. */
  badge?: string;
  /** The card's headline. */
  cardLine1: string;
  cardLine2?: string;
  cta: Cta;
  legal?: string;
  bg?: EmailBg;
  ratio?: number;
  focus?: string;
}

export function T1PhotoCard({
  src,
  alt,
  announcement,
  lead,
  offerLine1,
  offerLine2,
  badge,
  cardLine1,
  cardLine2,
  cta,
  legal,
  bg = 'beige',
  ratio = 1.2,
  focus,
}: T1Props) {
  const t = onBg[bg];
  return (
    <div>
      {announcement ? <Bar text={announcement} fill={colors.forest} ink={colors.gold} /> : null}
      <Frame src={src} alt={alt} ratio={ratio} focus={focus}>
        {/* The whole picture is darkened a touch, not just a third — the offer
            sits high and the card sits low, so there is no quiet band to aim a
            directional scrim at. */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,26,13,0.52) 0%, rgba(0,26,13,0.14) 44%, rgba(0,26,13,0.32) 100%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 0, right: 0, textAlign: 'center' }}>
          <Logo tone="beige" variant="primary" height={64} />
        </div>
        {badge ? (
          <div style={{ position: 'absolute', top: '31%', left: '6%' }}>
            <span
              style={{
                display: 'inline-block',
                background: colors.gold,
                borderRadius: 999,
                padding: '9px 15px',
                ...caps(10, '0.1em', colors.forest),
                boxShadow: '0 5px 16px rgba(0,26,13,0.34)',
              }}
            >
              {badge}
            </span>
          </div>
        ) : null}
        <div style={{ position: 'absolute', top: '19%', left: 0, right: 0, padding: '0 28px', textAlign: 'center' }}>
          {lead ? (
            <div style={{ ...caps(15, '0.1em', colors.beige), marginBottom: 10, textShadow: '0 2px 10px rgba(0,26,13,0.5)' }}>
              {lead}
            </div>
          ) : null}
          <div style={{ ...caps(58, '0.005em', colors.beige), lineHeight: 0.94, textShadow: '0 3px 18px rgba(0,26,13,0.55)' }}>
            {offerLine1}
          </div>
          {offerLine2 ? (
            <div style={{ ...caps(42, '0.01em', colors.beige), lineHeight: 1.0, textShadow: '0 3px 18px rgba(0,26,13,0.55)' }}>
              {offerLine2}
            </div>
          ) : null}
        </div>
      </Frame>

      <div style={{ padding: '0 22px', marginTop: -54, position: 'relative' }}>
        <div
          style={{
            background: colors.forest,
            borderRadius: 18,
            padding: '26px 24px',
            textAlign: 'center',
            boxShadow: '0 14px 36px rgba(0,26,13,0.3)',
          }}
        >
          <div style={{ ...caps(31, '0.015em', colors.beige), lineHeight: 1.06 }}>{cardLine1}</div>
          {cardLine2 ? (
            <div style={{ ...caps(31, '0.015em', colors.gold), lineHeight: 1.06 }}>{cardLine2}</div>
          ) : null}
          <div style={{ height: 20 }} />
          <Pill cta={cta} fill={colors.gold} ink={colors.forest} outline />
          {legal ? (
            <div style={{ fontFamily: fontStack, fontSize: 9.5, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.68)', marginTop: 14 }}>
              {legal}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ══ T2 · BIG NUMBER, PRODUCT BELOW ══════════════════════════════════════
   Reference: the "beloved by 70,000+" hero. Dark ground, a small italic
   lead-in, one enormous figure in the accent, a caps line under it, a real
   paragraph, a hairline pill, then the product. ──────────────────────────── */

export interface T2Props {
  src: string;
  alt: string;
  /** Italic lead-in above the figure. */
  lead: string;
  /** The figure. This is the section. */
  figure: string;
  /** Caps line under the figure. */
  under: string;
  body: string;
  cta: Cta;
  bg?: EmailBg;
  ratio?: number;
  focus?: string;
}

export function T2BigNumber({
  src,
  alt,
  lead,
  figure,
  under,
  body,
  cta,
  bg = 'forest',
  ratio = 0.95,
  focus,
}: T2Props) {
  const t = onBg[bg];
  return (
    <div style={{ ...bgStyle(bg, colors.forest, false) }}>
      <div style={{ padding: '30px 30px 0', textAlign: 'center' }}>
        <Logo tone="gold" variant="primary" height={64} />
        <div style={{ height: 26 }} />
        <div style={{ fontFamily: fontStack, fontStyle: 'italic', fontWeight: 500, fontSize: 27, color: colors.beige, lineHeight: 1.2 }}>
          {lead}
        </div>
        <div style={{ fontFamily: fontStack, fontWeight: 900, fontSize: 78, lineHeight: 0.98, letterSpacing: '-0.015em', color: colors.gold, margin: '4px 0 2px' }}>
          {figure}
        </div>
        <div style={{ ...caps(27, '0.02em', colors.beige) }}>{under}</div>
        <div style={{ height: 18 }} />
        <div style={{ fontFamily: fontStack, fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.9)', maxWidth: 430, margin: '0 auto' }}>
          {body}
        </div>
        <div style={{ height: 24 }} />
        <Pill cta={cta} fill={colors.gold} ink={colors.forest} outline />
        <div style={{ height: 30 }} />
      </div>
      <Frame src={src} alt={alt} ratio={ratio} focus={focus} />
    </div>
  );
}

/* ══ T3 · MINIMAL — WORDS, THEN PICTURE ══════════════════════════════════
   Reference: the "dirty martini spritz" hero. Light ground, wordmark, a
   title, two lines of copy, an arrow pill, then the photograph. The quietest
   of the five and the one that survives images-off best. ─────────────────── */

export interface T3Props {
  src: string;
  alt: string;
  title: string;
  body: string;
  cta: Cta;
  bg?: EmailBg;
  ratio?: number;
  focus?: string;
}

export function T3Minimal({ src, alt, title, body, cta, bg = 'beige', ratio = 0.8, focus }: T3Props) {
  const t = onBg[bg];
  return (
    <div>
      <div style={{ padding: '30px 34px 0', textAlign: 'center' }}>
        <Logo tone={t.logo} variant="primary" height={62} />
        <div style={{ height: 24 }} />
        <div style={{ ...caps(34, '0.02em', t.title), lineHeight: 1.08 }}>{title}</div>
        <div style={{ height: 14 }} />
        <div style={{ fontFamily: fontStack, fontSize: 15, lineHeight: 1.6, color: t.body, maxWidth: 400, margin: '0 auto' }}>
          {body}
        </div>
        <div style={{ height: 22 }} />
        <Pill cta={cta} fill={colors.gold} ink={colors.forest} size={12} />
        <div style={{ height: 28 }} />
      </div>
      <Frame src={src} alt={alt} ratio={ratio} focus={focus} />
    </div>
  );
}

/* ══ T4 · PILOT — EYEBROW, HEADLINE, PRODUCT, COPY, CTA ══════════════════
   Reference: the "step into the shadows" hero. A textured dark ground, a
   programme eyebrow, a loud caps headline, the product on the ground with no
   frame, then two short paragraphs and a quiet pill. The most editorial of
   the five, and the shape to use when the story matters more than the
   offer. ─────────────────────────────────────────────────────────────────── */

export interface T4Props {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Second, shorter paragraph. Where the availability or the ask goes. */
  body2?: string;
  /** One line above the button. */
  kicker?: string;
  cta: Cta;
  /** Circular stamp top-right — a programme mark, a seal, a batch. */
  stamp?: string;
  bg?: EmailBg;
  ratio?: number;
  focus?: string;
}

export function T4Pilot({
  src,
  alt,
  eyebrow,
  title,
  body,
  body2,
  kicker,
  cta,
  stamp,
  bg = 'forest',
  ratio = 1.0,
  focus,
}: T4Props) {
  return (
    <div style={{ ...bgStyle(bg, colors.forest, true), position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 26px 0' }}>
        <Logo tone="gold" variant="mark" height={52} />
        {stamp ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 54,
              height: 54,
              borderRadius: 999,
              border: `1.5px solid ${colors.gold}`,
              ...caps(8.5, '0.08em', colors.gold),
              textAlign: 'center',
              lineHeight: 1.15,
              padding: 5,
              boxSizing: 'border-box',
            }}
          >
            {stamp}
          </span>
        ) : null}
      </div>

      <div style={{ padding: '18px 30px 0', textAlign: 'center' }}>
        <div style={{ ...caps(11.5, '0.22em', colors.gold) }}>{eyebrow}</div>
        <div style={{ height: 12 }} />
        <div style={{ ...caps(43, '0.015em', colors.beige), lineHeight: 1.0, textShadow: '0 2px 12px rgba(0,26,13,0.4)' }}>
          {title}
        </div>
      </div>

      <div style={{ padding: '18px 30px 0' }}>
        <Frame src={src} alt={alt} ratio={ratio} focus={focus} />
      </div>

      <div style={{ padding: '22px 34px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: fontStack, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>{body}</div>
        {body2 ? (
          <div style={{ fontFamily: fontStack, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', marginTop: 14 }}>
            {body2}
          </div>
        ) : null}
        {kicker ? (
          <div style={{ fontFamily: fontStack, fontStyle: 'italic', fontWeight: 700, fontSize: 15, color: colors.gold, marginTop: 18 }}>
            {kicker}
          </div>
        ) : null}
        <div style={{ height: 18 }} />
        <Pill cta={cta} fill={colors.gold} ink={colors.forest} />
      </div>
    </div>
  );
}

/* ══ T5 · URGENCY — TWO-TONE HEADLINE ON A PHOTOGRAPH ════════════════════
   Reference: the "last chance, 20% off" hero. A wide lifestyle photograph, a
   two-tone caps headline sitting on it, one line of reassurance, one bright
   pill. Nothing else. The shape for a deadline. ──────────────────────────── */

export interface T5Props {
  src: string;
  alt: string;
  /** First half of the headline, in the light ink. */
  line1: string;
  /** Second half, in the accent. The half carrying the deadline. */
  line2: string;
  /** One short line under it. */
  note?: string;
  cta: Cta;
  bg?: EmailBg;
  ratio?: number;
  focus?: string;
}

export function T5Urgency({ src, alt, line1, line2, note, cta, bg = 'forest', ratio = 0.72, focus }: T5Props) {
  return (
    <Frame src={src} alt={alt} ratio={ratio} focus={focus}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,26,13,0.58) 0%, rgba(0,26,13,0.26) 40%, rgba(0,26,13,0.54) 100%)' }} />
      <div style={{ position: 'absolute', top: 18, left: 0, right: 0, textAlign: 'center' }}>
        <Logo tone="beige" variant="mark" height={60} />
      </div>
      <div style={{ position: 'absolute', top: '34%', left: 0, right: 0, padding: '0 26px', textAlign: 'center' }}>
        <div style={{ ...caps(37, '0.01em', colors.beige), lineHeight: 1.04, textShadow: '0 2px 14px rgba(0,26,13,0.5)' }}>
          {line1}
        </div>
        <div style={{ ...caps(37, '0.01em', colors.gold), lineHeight: 1.04, textShadow: '0 2px 14px rgba(0,26,13,0.5)' }}>
          {line2}
        </div>
        {note ? (
          <div style={{ fontFamily: fontStack, fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', marginTop: 12 }}>
            {note}
          </div>
        ) : null}
        <div style={{ height: 20 }} />
        <Pill cta={cta} fill={colors.gold} ink={colors.forest} size={11.5} />
      </div>
    </Frame>
  );
}
