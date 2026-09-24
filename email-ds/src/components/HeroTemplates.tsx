import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg, bgFill } from '../theme';
import { Logo } from './Logo';
import { IconBadge } from './IconBadge';
import { AnyIconName } from './AnyIcon';
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

/**
 * A headline line that may end in an emoji.
 *
 * An emoji in a Gotham Black caps line is not the same object as the letters
 * around it: it comes from the system colour font, so uppercasing does nothing
 * to it, the caps tracking pushes it away from the word, it sits low against
 * the cap height, and the headline's drop shadow smears a colour glyph instead
 * of lifting it. Left alone it reads as something that fell into the title.
 *
 * So a trailing emoji gets its own treatment — no tracking, no shadow, nudged
 * up to the cap line and sized to sit with the letters rather than under them.
 */
const TRAILING_EMOJI = /^(.*?)[\s ]*(\p{Extended_Pictographic}[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}️‍]*)$/u;

function CapsLine({ text, style }: { text: string; style: React.CSSProperties }) {
  const m = TRAILING_EMOJI.exec(text);
  if (!m || !m[1]) return <div style={style}>{text}</div>;
  return (
    <div style={style}>
      {m[1]}
      <span
        style={{
          fontSize: '0.84em',
          verticalAlign: '0.02em',
          marginLeft: '0.2em',
          letterSpacing: 0,
          textShadow: 'none',
        }}
      >
        {m[2]}
      </span>
    </div>
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


/* ══ T6 · FULL IMAGE ═════════════════════════════════════════════════════
   One photograph is the whole section. Wordmark centred at the top, then the
   title, subtitle and CTA sitting on the picture.

   The hardest of the six to get right, because nothing is protecting the type
   except the photograph itself. Three things make it work:

     - a TALL frame. A wide picture leaves the type stacked on top of the
       subject; at 1.3–1.5 there is room for the words to have their own part
       of the frame.
     - the reading split in two. Wordmark, title and paragraph sit together at
       the TOP; the CTA sits alone near the BOTTOM. The photograph is what
       fills the gap between them, which is the whole reason to use a picture
       this size instead of a smaller one with copy underneath.
     - a scrim weighted at BOTH ends — the top block needs ground and so does
       the button, while the middle stays clear so the photograph is still a
       photograph.

   Give it art with a quiet lower half. If the subject sits low, use `focus`
   to push it up rather than fighting it with a heavier scrim. ───────────── */

export interface T6Props {
  src: string;
  alt: string;
  /** Small caps line above the title. */
  eyebrow?: string;
  /** The title. Two lines; the second takes the accent. */
  line1: string;
  line2?: string;
  /** One line under the title. */
  subtitle?: string;
  cta: Cta;
  /** Tiny line under the CTA. */
  legal?: string;
  /** Where the CTA sits, as a share of the frame. */
  at?: string;
  bg?: EmailBg;
  ratio?: number;
  focus?: string;
  /** Turn the scrim down for an already-dark photograph. */
  scrim?: number;
}

export function T6FullImage({
  src,
  alt,
  eyebrow,
  line1,
  line2,
  subtitle,
  cta,
  legal,
  at = '78%',
  bg = 'beige',
  ratio = 1.28,
  focus,
  scrim = 1,
}: T6Props) {
  const k = (v: number) => (v * scrim).toFixed(2);
  return (
    <Frame src={src} alt={alt} ratio={ratio} focus={focus}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom, rgba(0,26,13,${k(0.46)}) 0%, rgba(0,26,13,${k(0.36)}) 40%, rgba(0,26,13,${k(0.08)}) 60%, rgba(0,26,13,${k(0.34)}) 86%, rgba(0,26,13,${k(0.46)}) 100%)`,
        }}
      />

      {/* TOP BLOCK — wordmark, title, paragraph. They read as one unit, so
          they are one absolutely-positioned stack rather than three. */}
      <div style={{ position: 'absolute', top: 24, left: 0, right: 0, padding: '0 30px', textAlign: 'center' }}>
        <Logo tone="beige" variant="primary" height={76} />
        <div style={{ height: 34 }} />
        {eyebrow ? (
          <div style={{ ...caps(12, '0.2em', colors.gold), marginBottom: 12, textShadow: '0 1px 5px rgba(0,26,13,0.7)' }}>
            {eyebrow}
          </div>
        ) : null}
        <div style={{ ...caps(44, '0.01em', colors.beige), lineHeight: 0.98, textShadow: '0 2px 6px rgba(0,26,13,0.62), 0 4px 22px rgba(0,26,13,0.55)' }}>
          {line1}
        </div>
        {line2 ? (
          <div style={{ ...caps(44, '0.01em', colors.gold), lineHeight: 0.98, textShadow: '0 2px 6px rgba(0,26,13,0.62), 0 4px 22px rgba(0,26,13,0.55)' }}>
            {line2}
          </div>
        ) : null}
        {subtitle ? (
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.94)',
              maxWidth: 400,
              margin: '16px auto 0',
              textShadow: '0 1px 4px rgba(0,26,13,0.7), 0 3px 14px rgba(0,26,13,0.5)',
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* THE BUTTON, ALONE — the photograph fills the gap above it. */}
      <div style={{ position: 'absolute', top: at, left: 0, right: 0, padding: '0 30px', textAlign: 'center' }}>
        <Pill cta={cta} fill={colors.gold} ink={colors.forest} />
        {legal ? (
          <div
            style={{
              fontFamily: fontStack,
              fontSize: 10,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.72)',
              marginTop: 14,
            }}
          >
            {legal}
          </div>
        ) : null}
      </div>
    </Frame>
  );
}


/* ══ T7 · STATEMENT ON A PHOTOGRAPH ══════════════════════════════════════
   A title and one line of copy sitting on a full-bleed picture. No wordmark,
   no button — this is a mid-email section, not an opener.

   The thing that decides whether it works is the INK, and it is not a matter
   of taste. The contrast map is calibrated to flat brand grounds; a
   photograph is not one. Measure the region the type will occupy and pick:
   forest on a light picture, beige on a dark one. Getting it backwards is the
   single most common way type on art fails, and a heavier scrim never rescues
   it — it only dims the photograph you chose the section for.

   `wash` lifts the type's region a little in the OPPOSITE colour to the ink,
   which is a gentler instrument than a scrim: it lightens a light picture
   rather than darkening it. Keep it low. ─────────────────────────────────── */

export interface T7Props {
  src: string;
  alt: string;
  line1: string;
  line2?: string;
  /** One line under the title. */
  text?: string;
  /**
   * Type colour. `dark` is forest, for a light photograph; `light` is beige
   * with gold on the second line, for a dark one. Measure, don't guess.
   */
  ink?: 'dark' | 'light';
  /** Which end of the picture the type sits at. */
  anchor?: 'top' | 'bottom';
  /** 0 to 1. A gentle lift under the type, in the ink's opposite. */
  wash?: number;
  size?: number;
  ratio?: number;
  focus?: string;
  bg?: EmailBg;
}

export function T7Statement({
  src,
  alt,
  line1,
  line2,
  text,
  ink = 'dark',
  anchor = 'top',
  wash = 0.18,
  size = 40,
  ratio = 1.4,
  focus,
  bg = 'beige',
}: T7Props) {
  const dark = ink === 'dark';
  const head = dark ? colors.forest : colors.beige;
  const head2 = dark ? colors.forest : colors.gold;
  const bodyInk = dark ? 'rgba(20,20,20,0.86)' : 'rgba(255,255,255,0.92)';
  // A light picture is lifted with cream, a dark one deepened with forest —
  // the same control in both directions, so the picture never has to be
  // darkened to protect dark type.
  const washRgb = dark ? '240,239,223' : '0,26,13';
  const dir = anchor === 'top' ? 'to bottom' : 'to top';
  const shadow = dark ? 'none' : '0 2px 6px rgba(0,26,13,0.6), 0 4px 20px rgba(0,26,13,0.5)';

  return (
    <Frame src={src} alt={alt} ratio={ratio} focus={focus}>
      {wash > 0 ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(${dir}, rgba(${washRgb},${wash.toFixed(2)}) 0%, rgba(${washRgb},${(wash * 0.55).toFixed(2)}) 34%, rgba(${washRgb},0) 62%)`,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          ...(anchor === 'top' ? { top: 0, padding: '40px 32px 0' } : { bottom: 0, padding: '0 32px 40px' }),
          textAlign: 'center',
        }}
      >
        <div style={{ ...caps(size, '0.01em', head), lineHeight: 0.98, textShadow: shadow }}>{line1}</div>
        {line2 ? (
          <div style={{ ...caps(size, '0.01em', head2), lineHeight: 0.98, textShadow: shadow }}>{line2}</div>
        ) : null}
        {text ? (
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.5,
              color: bodyInk,
              maxWidth: 460,
              margin: '16px auto 0',
              textShadow: shadow,
            }}
          >
            {text}
          </div>
        ) : null}
      </div>
    </Frame>
  );
}


/* ══ T8 · CALLOUT DIAGRAM ════════════════════════════════════════════════
   The product on the right, its benefits listed down the left, a hairline
   running from each one across to the glass.

   Two things make this read as a diagram rather than a list beside a photo.
   The lines must ACTUALLY REACH the product — a line that stops in open space
   is decoration, and the eye notices. And the ground must be the photograph's
   own backdrop, so the picture has no edge: the moment you can see where the
   image ends, it is a picture pasted on a panel.

   That is why the art for this section is pre-composed. The backdrop is
   extended outward from the photograph's own edge pixels rather than filled
   with a sampled colour — a flat fill leaves a seam, because a studio backdrop
   vignettes and its corner is not its edge.

   Each row's line length is set per row, so they land at the glass rather than
   all stopping on the same vertical — which is what the reference does and
   what stops the group looking like a table. ─────────────────────────────── */

export interface CalloutRow {
  /** Brand mark or generic glyph for the disc. */
  mark: AnyIconName;
  /** The benefit. Caps. */
  label: string;
  /** The line under it — where the joke lives. */
  note: string;
  /** How far the hairline runs right, in px. Aim it at the glass. */
  line: number;
}

export interface T8Props {
  /**
   * Pre-composed art: product right, backdrop extended left. `ratio` MUST
   * match this file's own aspect — the frame crops to fill, so a mismatch
   * silently zooms the art and every callout line then points at the wrong
   * part of the product.
   */
  src: string;
  alt: string;
  line1: string;
  line2?: string;
  /** Small caps above the title, as in the opening section. */
  eyebrow?: string;
  intro?: string;
  items: CalloutRow[];
  cta?: Cta;
  /** The photograph's own backdrop colour — the section ground. */
  ground?: string;
  /** Ink for type and hairlines. Measure the backdrop; don't guess. */
  ink?: string;
  ratio?: number;
  bg?: EmailBg;
}

export function T8Callouts({
  src,
  alt,
  line1,
  line2,
  eyebrow,
  intro,
  items,
  cta,
  ground = '#DBBEA3',
  ink = colors.forest,
  ratio = 1.2,
  bg = 'beige',
}: T8Props) {
  return (
    <div style={{ position: 'relative', background: ground }}>
      <Frame src={src} alt={alt} ratio={ratio} />

      {/* One column, distributed. `space-between` is what makes the section
          read as balanced rather than top-heavy: the title band, the callouts
          and the button each take a third of the height instead of stacking
          from the top and leaving the rest empty. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '46px 0 58px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ padding: '0 30px', textAlign: 'center' }}>
          {/* Same anatomy as the opening section — eyebrow, a headline whose
              second line is set apart, then the paragraph. There the two lines
              are cream and gold; on cream neither is legal (gold measures about
              1.5:1 here), so the split is carried by SLANT instead. That is the
              house two-line headline exactly: the contrast is weight and slant
              rather than colour, which is why it holds on any ground. */}
          {eyebrow ? (
            <div style={{ ...caps(11.5, '0.2em', ink), marginBottom: 14 }}>{eyebrow}</div>
          ) : null}
          <div style={{ ...caps(30, '0.01em', ink), lineHeight: 1.04 }}>{line1}</div>
          {line2 ? (
            <div style={{ ...caps(30, '0.01em', ink), lineHeight: 1.04, fontStyle: 'italic' }}>{line2}</div>
          ) : null}
          {intro ? (
            <div
              style={{
                fontFamily: fontStack,
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1.5,
                color: '#151515',
                maxWidth: 420,
                margin: '14px auto 0',
              }}
            >
              {intro}
            </div>
          ) : null}
        </div>

        {/* The callouts. White discs read as objects on the beige; the labels
            take the one ink the ground allows, and the notes go near-black —
            the pairing the ground can actually carry. */}
        <div style={{ paddingLeft: 24 }}>
          {items.map((it) => (
            <div key={it.label} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              {/* Each row is one rounded shape holding its icon, label and
                  note. On an open ground five bare rows read as a list; giving
                  each one an edge turns them into objects the lines connect to,
                  which is what makes the section read as a diagram. */}
              <span
                style={{
                  flex: '0 0 auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 11,
                  maxWidth: 268,
                  background: colors.white,
                  borderRadius: 999,
                  padding: '9px 20px 9px 9px',
                  boxShadow: '0 3px 12px rgba(0,26,13,0.10)',
                }}
              >
                <span style={{ flex: '0 0 auto' }}>
                  <IconBadge mark={it.mark} bg="beige" size={34} fill={colors.forest} ink="gold" />
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ ...caps(11.5, '0.05em', ink), display: 'block', lineHeight: 1.12 }}>{it.label}</span>
                  <span
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 500,
                      fontSize: 10.5,
                      lineHeight: 1.3,
                      color: '#151515',
                      display: 'block',
                      marginTop: 2,
                    }}
                  >
                    {it.note}
                  </span>
                </span>
              </span>
              {/* Per-row length, so each line lands on the glass. */}
              <span
                style={{ flex: '0 0 auto', height: 1, width: it.line, background: ink, opacity: 0.6, display: 'block' }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          {cta ? <Pill cta={cta} fill={colors.forest} ink={colors.beige} /> : null}
        </div>
      </div>
    </div>
  );
}


/* ══ T9 · STORY ON A PHOTOGRAPH ══════════════════════════════════════════
   A full-bleed picture carrying a title and SEVERAL paragraphs, with the CTA
   pinned near the bottom.

   T6 takes one line under the title and T7 takes one sentence. Neither can
   hold a story, and stretching them is how a section ends up with 90 words
   crammed into a subtitle slot. This is the variant for copy that has
   something to say.

   PICK THE ART BY ITS DEAD HALF, NOT ITS SUBJECT
   ----------------------------------------------
   Long copy on a photograph only works when the photograph has a large quiet
   region and its subject is somewhere else. Both of the mate pictures this was
   built for are that shape — sky or canopy up top, people and product below —
   so the type lands on nothing and the picture keeps its whole subject.

   That is also why `ratio` is the real control here. The type block has a
   fixed height once the copy is set; making the frame TALLER pushes the
   subject down past the end of the type rather than shrinking the type to fit
   around it. Set the ratio so the copy ends above the subject, then stop.

   The scrim is weighted to the top, where the type is, and lifts again at the
   bottom only if there is a button to protect. The middle stays clear — that
   is the part of the picture you chose the section for.

   SPLITTING THE COPY: `paras` vs `tailParas`
   ------------------------------------------
   Everything in `paras` stacks under the title. Anything in `tailParas` travels
   down with the CTA instead, which is how you open a clear window in the middle
   of the picture without cutting a word — the last paragraph reads as the line
   before the button, where it was always going to be read anyway.

   Use it when the copy is long enough that the top stack reaches into the
   subject. Moving the LAST paragraph down keeps the reading order intact;
   moving a middle one does not, and the reader will feel the jump. ────────── */

export interface T9Props {
  src: string;
  alt: string;
  /** Show the wordmark above the title. Openers yes, mid-email sections no. */
  logo?: boolean;
  logoHeight?: number;
  eyebrow?: string;
  line1: string;
  /** Second title line, in the accent. */
  line2?: string;
  /** One sentence in the accent, between the title and the body. */
  lead?: string;
  /**
   * Measure for the lead alone. It is set three points larger than the body,
   * so sharing the body's measure gives it fewer characters per line and it
   * tends to shed a two-word last line. Narrow this until it rags evenly.
   */
  leadMeasure?: number;
  /** The paragraphs, in order. The first is set a little larger as a lead. */
  paras?: string[];
  /**
   * Paragraphs that ride down with the CTA instead of stacking under the
   * title, leaving the middle of the photograph clear. Use the LAST of the
   * copy here, never a middle one — the reading order has to survive.
   */
  tailParas?: string[];
  cta?: Cta;
  /**
   * Move the CTA group OFF the photograph, onto a band of `bg` underneath it.
   *
   * Some pictures have no quiet corner to put a button in — this section's
   * opener runs the pouch almost to the bottom edge, and a pill on top of the
   * pack is worse than no pill at all. When the picture has nowhere for it,
   * the button belongs on brand colour below, not squeezed onto the art.
   */
  ctaBelow?: boolean;
  /** Vertical padding of that band. */
  belowPad?: number;
  /** Where the CTA GROUP starts — tail paragraphs first, then the button. */
  at?: string;
  /** Headline size. */
  size?: number;
  /**
   * Where the type stack starts. A number is px from the top; a percentage
   * string places it as a share of the frame, which is how you centre a block
   * on art whose clear zone is in the middle rather than at one end.
   */
  top?: number | string;
  /**
   * Render the CTA at the foot of the type stack instead of pinning it at
   * `at`. Use it when the title, the copy and the button have to read as one
   * centred group rather than as a head and a foot.
   */
  ctaInline?: boolean;
  /**
   * Which end of the picture the scrim protects. 'top' weights it for a stack
   * anchored at the top; 'middle' carries it through the centre band and lets
   * both ends of the photograph come back clear.
   */
  scrimAt?: 'top' | 'middle';
  /**
   * Type colour. 'light' is cream and gold for a dark photograph; 'dark' is
   * forest for a light one, and it flips the scrim too — a light picture gets
   * lifted with cream rather than darkened, which is the only way dark type
   * and a bright photograph can both survive.
   *
   * MEASURE the band the copy will sit in; do not guess. Getting this backwards
   * is the most common way type on art fails, and no amount of shadow or scrim
   * rescues cream letters on a pale sky.
   */
  ink?: 'light' | 'dark';
  /** Override the wordmark's tone. Defaults to following `ink`. */
  logoTone?: 'gold' | 'green' | 'beige' | 'white';
  /**
   * Alignment of the copy. 'left' also lifts the wordmark out of the stack and
   * centres it across the full frame, because a logo centred inside a narrow
   * left-hand column reads as misplaced rather than as left-aligned.
   */
  align?: 'left' | 'center';
  /** Measure for the paragraphs. */
  measure?: number;
  /**
   * Side padding of the type column. Raising ONE of them slides the whole
   * centred stack toward the other side.
   *
   * A still life's copy space is rarely in the middle — this campaign's closing
   * art stacks its products down the right, so centred copy runs straight
   * across the pack. Moving the column into the space the photographer left is
   * the fix; a narrower measure just makes a thin ribbon that still clips the
   * product.
   */
  padLeft?: number;
  padRight?: number;
  ratio?: number;
  focus?: string;
  /** Overall scrim strength. Turn down for an already-dark photograph. */
  scrim?: number;
  bg?: EmailBg;
}

export function T9Story({
  src,
  alt,
  logo = false,
  logoHeight = 68,
  eyebrow,
  line1,
  line2,
  lead,
  leadMeasure,
  paras = [],
  tailParas = [],
  cta,
  ctaBelow = false,
  ctaInline = false,
  scrimAt = 'top',
  ink = 'light',
  logoTone,
  align = 'center',
  belowPad = 34,
  at = '88%',
  size = 38,
  top = 30,
  measure = 452,
  padLeft = 30,
  padRight = 30,
  ratio = 1.7,
  focus,
  scrim = 1,
  bg = 'beige',
}: T9Props) {
  const t = onBg[bg];
  const darkInk = ink === 'dark';
  const leftAlign = align === 'left';
  // On a light photograph the brand's own contrast map applies: forest for the
  // whole headline, no gold. Gold only ever lifts off a dark ground.
  const headInk  = darkInk ? colors.forest : colors.beige;
  const headInk2 = darkInk ? colors.forest : colors.gold;
  const bodyInk  = darkInk ? colors.ink : 'rgba(255,255,255,0.95)';
  const leadInk  = darkInk ? colors.forest : colors.gold;
  const eyebrowInk = darkInk ? colors.forest : colors.gold;
  const pillFill = darkInk ? colors.forest : colors.gold;
  const pillInk  = darkInk ? colors.beige : colors.forest;
  // The scrim works in the ink's opposite: a light picture is lifted in cream,
  // a dark one deepened in forest. Darkening a bright photograph to carry dark
  // type just makes a muddy picture and still-illegible letters.
  const sRgb = darkInk ? '240,239,223' : '0,26,13';
  // With the wordmark lifted out, the copy has to start below it.
  const drop = logoHeight + 34;
  const stackTop = logo && leftAlign
    ? (typeof top === 'number' ? top + drop : `calc(${top} + ${drop}px)`)
    : top;
  const k = (v: number) => Math.min(1, v * scrim).toFixed(2);
  // When the CTA group sits on a band below, the picture has nothing to
  // protect at its foot — so the bottom of the scrim goes back to the light
  // setting instead of darkening art for a button that is not on it.
  const hasTailCopy = tailParas.length > 0 && !ctaBelow;
  const guarding = (!!cta && !ctaBelow) || hasTailCopy;
  // The bottom lift has to start above whatever sits down there. A lone button
  // needs the last 16%; a paragraph riding with it needs roughly twice that,
  // and starting the lift too late is what leaves a paragraph half-legible on
  // a bright patch of picture.
  const tail = !guarding
    ? `rgba(${sRgb},${k(0.06)}) 84%, rgba(${sRgb},${k(0.14)}) 100%`
    : hasTailCopy
      ? `rgba(${sRgb},${k(0.20)}) 70%, rgba(${sRgb},${k(0.46)}) 84%, rgba(${sRgb},${k(0.52)}) 100%`
      : `rgba(${sRgb},${k(0.30)}) 84%, rgba(${sRgb},${k(0.44)}) 100%`;
  // A centred stack needs the weight where IT is. Protecting the top instead
  // would dim the sky the type has left and leave the type itself exposed.
  const scrimCss = scrimAt === 'middle'
    ? `linear-gradient(to bottom, rgba(${sRgb},${k(0.10)}) 0%, rgba(${sRgb},${k(0.34)}) 20%, rgba(${sRgb},${k(0.56)}) 38%, rgba(${sRgb},${k(0.58)}) 66%, rgba(${sRgb},${k(0.30)}) 84%, rgba(${sRgb},${k(0.12)}) 100%)`
    : `linear-gradient(to bottom, rgba(${sRgb},${k(0.62)}) 0%, rgba(${sRgb},${k(0.56)}) 30%, rgba(${sRgb},${k(0.40)}) 48%, rgba(${sRgb},${k(0.10)}) 64%, ${tail})`;
  // SHADOW, NOT SCRIM. A scrim dims the whole photograph to protect a few
  // hundred pixels of type; a shadow sits behind the letters alone. So as the
  // scrim comes down, the type's own shadow automatically comes up — a tight,
  // dense halo that hugs each letter instead of a wash over the picture.
  // Without this, turning the scrim down quietly makes the copy unreadable.
  const bare = scrim < 0.7;
  // Dark type on a light picture is lifted by a pale halo, not a dark one —
  // a forest shadow behind forest letters just thickens them into a smudge.
  const shadow = darkInk
    ? '0 0 4px rgba(251,248,239,0.95), 0 0 12px rgba(251,248,239,0.85), 0 0 26px rgba(251,248,239,0.6)'
    : bare
    ? '0 0 3px rgba(0,26,13,0.95), 0 1px 3px rgba(0,26,13,0.9), 0 2px 10px rgba(0,26,13,0.8), 0 6px 28px rgba(0,26,13,0.6)'
    : '0 2px 6px rgba(0,26,13,0.62), 0 4px 22px rgba(0,26,13,0.55)';
  const softShadow = darkInk
    ? '0 0 3px rgba(251,248,239,0.98), 0 0 8px rgba(251,248,239,0.92), 0 0 18px rgba(251,248,239,0.7)'
    : bare
    ? '0 0 3px rgba(0,26,13,0.95), 0 1px 3px rgba(0,26,13,0.92), 0 2px 9px rgba(0,26,13,0.78), 0 5px 22px rgba(0,26,13,0.55)'
    : '0 1px 4px rgba(0,26,13,0.72), 0 3px 16px rgba(0,26,13,0.55)';

  return (
    <>
    <Frame src={src} alt={alt} ratio={ratio} focus={focus}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: scrimCss,
        }}
      />

      {/* Left-aligned copy still wants the wordmark centred on the FRAME, not
          inside its column, so it comes out of the stack and gets its own row. */}
      {logo && leftAlign ? (
        <div style={{ position: 'absolute', top, left: 0, right: 0, textAlign: 'center' }}>
          <Logo tone={logoTone ?? (darkInk ? 'green' : 'beige')} variant="primary" height={logoHeight} />
        </div>
      ) : null}

      <div style={{ position: 'absolute', top: stackTop, left: 0, right: 0, padding: `0 ${padRight}px 0 ${padLeft}px`, textAlign: leftAlign ? 'left' : 'center' }}>
        {logo && !leftAlign ? (
          <>
            <Logo tone={logoTone ?? (darkInk ? 'green' : 'beige')} variant="primary" height={logoHeight} />
            <div style={{ height: 30 }} />
          </>
        ) : null}
        {eyebrow ? (
          <div style={{ ...caps(12, '0.2em', eyebrowInk), marginBottom: 13, textShadow: softShadow }}>{eyebrow}</div>
        ) : null}
        <CapsLine text={line1} style={{ ...caps(size, '0.01em', headInk), lineHeight: 1.0, textShadow: shadow }} />
        {line2 ? (
          <CapsLine text={line2} style={{ ...caps(size, '0.01em', headInk2), lineHeight: 1.0, textShadow: shadow }} />
        ) : null}

        {lead ? (
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 500,
              fontSize: 19,
              lineHeight: 1.48,
              color: leadInk,
              maxWidth: leadMeasure ?? measure,
              margin: leftAlign ? '20px 0 0' : '20px auto 0',
              textShadow: softShadow,
            }}
          >
            {lead}
          </div>
        ) : null}

        {paras.map((p, i) => (
          <div
            key={i}
            style={{
              fontFamily: fontStack,
              fontWeight: 500,
              // The first paragraph is the one everybody reads, so it gets the
              // extra point. The rest settle to the 16px floor.
              fontSize: i === 0 && !lead ? 17 : 16,
              lineHeight: 1.56,
              color: bodyInk,
              maxWidth: measure,
              margin: leftAlign
                ? `${i === 0 ? (lead ? 16 : 18) : 14}px 0 0`
                : `${i === 0 ? (lead ? 16 : 18) : 14}px auto 0`,
              textShadow: softShadow,
            }}
          >
            {p}
          </div>
        ))}

        {cta && ctaInline ? (
          <div style={{ marginTop: 30 }}>
            <Pill cta={cta} fill={pillFill} ink={pillInk} />
          </div>
        ) : null}
      </div>

      {(cta && !ctaBelow && !ctaInline) || hasTailCopy ? (
        <div style={{ position: 'absolute', top: at, left: 0, right: 0, padding: `0 ${padRight}px 0 ${padLeft}px`, textAlign: 'center' }}>
          {tailParas.map((p, i) => (
            <div
              key={i}
              style={{
                fontFamily: fontStack,
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 1.56,
                color: bodyInk,
                maxWidth: measure,
                margin: leftAlign ? `${i === 0 ? 0 : 14}px 0 0` : `${i === 0 ? 0 : 14}px auto 0`,
                textShadow: softShadow,
              }}
            >
              {p}
            </div>
          ))}
          {cta && !ctaInline ? (
            <div style={{ marginTop: hasTailCopy ? 28 : 0 }}>
              <Pill cta={cta} fill={pillFill} ink={pillInk} />
            </div>
          ) : null}
        </div>
      ) : null}
    </Frame>

    {cta && ctaBelow ? (
      <div style={{ padding: `${belowPad}px ${padRight}px ${belowPad}px ${padLeft}px`, textAlign: 'center', ...bgStyle(bg, bgFill[bg]) }}>
        {tailParas.map((p, i) => (
          <div
            key={i}
            style={{
              fontFamily: fontStack,
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.56,
              color: t.body,
              maxWidth: measure,
              margin: `${i === 0 ? 0 : 14}px auto 0`,
            }}
          >
            {p}
          </div>
        ))}
        <div style={{ marginTop: tailParas.length ? 26 : 0 }}>
          <Pill cta={cta} fill={t.btnBg} ink={t.btnText} />
        </div>
      </div>
    ) : null}
    </>
  );
}


/* ══ T10 · TYPE-LED CLOSE ════════════════════════════════════════════════
   The last section: no picture, one flat brand ground, a title, a lead line
   and the button.

   Every campaign that opens on photography needs somewhere to land, and an
   email that is photographs the whole way down has no punctuation in it. The
   colour change IS the design here — after two full-bleed pictures, a flat
   forest field reads as arriving somewhere, and the reader's eye finally has
   nothing to do but read.

   Which is why there is deliberately no image slot. Adding one would make this
   a third photo section. ────────────────────────────────────────────────── */

export interface T10Props {
  eyebrow?: string;
  line1: string;
  line2?: string;
  /** One sentence, set larger than the body — the point of the section. */
  lead?: string;
  /** Supporting paragraphs under the lead. */
  paras?: string[];
  cta?: Cta;
  bg?: EmailBg;
  size?: number;
  measure?: number;
  /** Vertical padding of the whole band. */
  pad?: number;
  /** A hairline above the title, to mark the change of ground. */
  rule?: boolean;
  /** Lay the brand's paper texture over the flat ground. */
  textured?: boolean;
}

export function T10Close({
  eyebrow,
  line1,
  line2,
  lead,
  paras = [],
  cta,
  bg = 'forest',
  size = 38,
  measure = 452,
  pad = 58,
  rule = true,
  textured = false,
}: T10Props) {
  const t = onBg[bg];
  return (
    <div style={{ padding: `${pad}px 30px`, textAlign: 'center', ...bgStyle(bg, bgFill[bg], textured) }}>
      {rule ? <div style={{ width: 46, height: 2, background: t.accent, margin: '0 auto 26px' }} /> : null}
      {eyebrow ? <div style={{ ...caps(12, '0.2em', t.accent), marginBottom: 14 }}>{eyebrow}</div> : null}
      <CapsLine text={line1} style={{ ...caps(size, '0.01em', t.title), lineHeight: 1.0 }} />
      {line2 ? <CapsLine text={line2} style={{ ...caps(size, '0.01em', t.titleAccent), lineHeight: 1.0 }} /> : null}

      {lead ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 19,
            lineHeight: 1.5,
            color: t.accent,
            maxWidth: measure,
            margin: '22px auto 0',
          }}
        >
          {lead}
        </div>
      ) : null}

      {paras.map((p, i) => (
        <div
          key={i}
          style={{
            fontFamily: fontStack,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.6,
            color: t.body,
            maxWidth: measure,
            margin: '16px auto 0',
          }}
        >
          {p}
        </div>
      ))}

      {cta ? (
        <div style={{ marginTop: 32 }}>
          <Pill cta={cta} fill={t.btnBg} ink={t.btnText} />
        </div>
      ) : null}
    </div>
  );
}
