import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Headline } from './Headline';
import { Button } from './Button';
import { SpecPills } from './SpecPills';
import { Logo } from './Logo';
import { IconBadge } from './IconBadge';
import { AnyIconName } from './AnyIcon';

/* ────────────────────────────────────────────────────────────────────────────
   PREDETERMINED SECTIONS

   Each one is a whole band of an email, ready to drop in and fill. They take
   content, not layout decisions — the layout decisions are already made, which
   is the point of having them. Every section exposes a `variant` so the same
   block can appear twice in a month without looking like the same block.

   These sit ON TOP of the primitives (Headline, Button, SpecPills…). Reach for
   a section first; drop to the primitives only when nothing here fits.
   ──────────────────────────────────────────────────────────────────────────── */

const pad = (n: number) => ({ height: n, lineHeight: 0, fontSize: 0 });

function Eyebrow({ text, bg }: { text: string; bg: EmailBg }) {
  const t = onBg[bg];
  return (
    <div
      style={{
        fontFamily: fontStack,
        fontWeight: 900,
        fontSize: 11.5,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: t.accent,
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  );
}

function Body({ text, bg, align = 'center' }: { text: string; bg: EmailBg; align?: 'left' | 'center' }) {
  const t = onBg[bg];
  return (
    <div
      style={{
        fontFamily: fontStack,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        color: t.body,
        maxWidth: align === 'center' ? 460 : undefined,
        margin: align === 'center' ? '0 auto' : undefined,
      }}
    >
      {text}
    </div>
  );
}

/* ══ S1 · IMAGE + TITLE + SUBTITLE ═══════════════════════════════════════ */

export interface ImageBlockProps {
  src: string;
  alt: string;
  /** Two-line house headline. Pass `line2` empty for a single line. */
  line1: string;
  line2?: string;
  subtitle?: string;
  body?: string;
  cta?: { label: string; href: string };
  bg?: EmailBg;
  /**
   * `bleed` runs the picture edge to edge — the loudest, and the one to use
   * when the photography is good. `inset` gives it margins and 12px corners,
   * which reads as a figure rather than a scene. `cutout` sits a transparent
   * product straight on the ground with no frame at all.
   */
  frame?: 'bleed' | 'inset' | 'cutout';
  /** Picture above the words or below them. Below is rarer and worth using. */
  imageFirst?: boolean;
  align?: 'left' | 'center';
  size?: number;
}

/**
 * The most-used section in any email: a picture, a title, a subtitle.
 *
 * Its variants are what stop it becoming the template. `bleed` + centred is the
 * obvious one; `inset` + left-aligned reads completely differently for the same
 * content, and putting the image *after* the words turns a promotion into a
 * caption. Vary the frame before you vary anything else.
 */
export function ImageBlock({
  src,
  alt,
  line1,
  line2 = '',
  subtitle,
  body,
  cta,
  bg = 'forest',
  frame = 'bleed',
  imageFirst = true,
  align = 'center',
  size = 30,
}: ImageBlockProps) {
  const art = (
    <img
      key="art"
      src={src}
      alt={alt}
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        border: 0,
        borderRadius: frame === 'inset' ? 12 : 0,
      }}
    />
  );
  const artWrap = (
    <div key="wrap" style={{ padding: frame === 'bleed' ? 0 : '0 30px' }}>
      {art}
    </div>
  );
  const words = (
    <div key="words" style={{ padding: '0 30px', textAlign: align }}>
      <Headline bg={bg} line1={line1} line2={line2} size={size} align={align} />
      {subtitle ? (
        <>
          <div style={pad(12)} />
          <Eyebrow text={subtitle} bg={bg} />
        </>
      ) : null}
      {body ? (
        <>
          <div style={pad(14)} />
          <Body text={body} bg={bg} align={align} />
        </>
      ) : null}
      {cta ? (
        <>
          <div style={pad(24)} />
          <Button bg={bg} label={cta.label} href={cta.href} size="md" />
        </>
      ) : null}
    </div>
  );
  return (
    <div>
      {imageFirst ? artWrap : words}
      <div style={pad(24)} />
      {imageFirst ? words : artWrap}
    </div>
  );
}

/* ══ S2 · SPLIT ROW ══════════════════════════════════════════════════════ */

export interface SplitRowProps {
  src: string;
  alt: string;
  line1: string;
  line2?: string;
  body?: string;
  cta?: { label: string; href: string };
  bg?: EmailBg;
  /** Which side the picture sits on. Flip it between campaigns. */
  side?: 'left' | 'right';
  /** Picture's share of the row. */
  imageWidth?: string;
  /** Round the picture. Off for transparent cutouts. */
  inset?: boolean;
}

/**
 * Image and message sharing one band, side by side.
 *
 * The single cheapest way to break the centre axis, which every email needs at
 * least once. Two of these in a row with the side flipped is a zig-zag; one on
 * its own is a feature.
 *
 * Keep the copy short — a split row with a full paragraph in it becomes two
 * columns of unequal height and stops looking deliberate.
 */
export function SplitRow({
  src,
  alt,
  line1,
  line2 = '',
  body,
  cta,
  bg = 'forest',
  side = 'left',
  imageWidth = '46%',
  inset = true,
}: SplitRowProps) {
  const art = (
    <div key="art" style={{ flex: `0 0 ${imageWidth}`, width: imageWidth }}>
      <img
        src={src}
        alt={alt}
        style={{ display: 'block', width: '100%', height: 'auto', border: 0, borderRadius: inset ? 12 : 0 }}
      />
    </div>
  );
  const words = (
    <div key="words" style={{ flex: 1 }}>
      <Headline bg={bg} line1={line1} line2={line2} size={24} align="left" />
      {body ? (
        <>
          <div style={pad(12)} />
          <Body text={body} bg={bg} align="left" />
        </>
      ) : null}
      {cta ? (
        <>
          <div style={pad(18)} />
          <Button bg={bg} label={cta.label} href={cta.href} size="sm" />
        </>
      ) : null}
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 22, alignItems: 'center', padding: '0 30px' }}>
      {side === 'left' ? [art, words] : [words, art]}
    </div>
  );
}

/* ══ S3 · PROCESS STRIP ══════════════════════════════════════════════════ */

export interface ProcessStep {
  /** A brand mark or generic glyph. Omit to show the step number instead. */
  mark?: AnyIconName;
  label: string;
  note?: string;
}

export interface ProcessStripProps {
  steps: ProcessStep[];
  bg?: EmailBg;
  /** `across` is the default; `stacked` suits longer notes. */
  layout?: 'across' | 'stacked';
  /** Show 1 · 2 · 3 alongside the icon. */
  numbered?: boolean;
}

/**
 * "It's easy", shown rather than asserted.
 *
 * Three steps. Four is a process and reads as work; three is a ritual. If the
 * real thing takes four steps, merge two — the section is a promise about
 * effort, not documentation.
 */
export function ProcessStrip({ steps, bg = 'forest', layout = 'across', numbered = false }: ProcessStripProps) {
  const t = onBg[bg];
  const across = layout === 'across';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: across ? 'row' : 'column',
        gap: across ? 14 : 24,
        padding: '0 30px',
        alignItems: across ? 'flex-start' : 'stretch',
      }}
    >
      {steps.map((s, i) => (
        <div
          key={s.label}
          style={{
            flex: 1,
            textAlign: across ? 'center' : 'left',
            display: across ? 'block' : 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div style={{ flex: '0 0 auto' }}>
            {s.mark ? (
              <IconBadge mark={s.mark} bg={bg} size={52} />
            ) : (
              <div
                style={{
                  fontFamily: fontStack,
                  fontWeight: 900,
                  fontSize: 34,
                  color: t.accent,
                  lineHeight: 1,
                }}
              >
                {i + 1}
              </div>
            )}
          </div>
          <div>
            <div
              style={{
                fontFamily: fontStack,
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: t.title,
                marginTop: across ? 12 : 0,
              }}
            >
              {numbered && s.mark ? `${i + 1}. ${s.label}` : s.label}
            </div>
            {s.note ? (
              <div
                style={{
                  fontFamily: fontStack,
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: t.body,
                  marginTop: 6,
                }}
              >
                {s.note}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ S4 · STAT BAND ══════════════════════════════════════════════════════ */

export interface StatFigure {
  figure: string;
  caption: string;
}

export interface StatBandProps {
  /** Real, sourced figures. Never one invented to fill the layout. */
  stats: StatFigure[];
  bg?: EmailBg;
  size?: number;
}

/**
 * One number, or three, made unmissable.
 *
 * The figures must be real and sourced. A stat band is the section most likely
 * to tempt someone into rounding a number up to make it sit better, and it is
 * also the section a reader is most likely to remember and repeat.
 */
export function StatBand({ stats, bg = 'forest', size = 56 }: StatBandProps) {
  const t = onBg[bg];
  return (
    <div style={{ display: 'flex', gap: 16, padding: '0 30px' }}>
      {stats.map((s) => (
        <div key={s.caption} style={{ flex: 1, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: size,
              lineHeight: 1,
              color: t.accent,
              backgroundImage: t.numberGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              letterSpacing: '-0.01em',
            }}
          >
            {s.figure}
          </div>
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: t.body,
              opacity: 0.8,
              marginTop: 10,
              lineHeight: 1.3,
            }}
          >
            {s.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ S5 · HERO BANNER (type-led) ═════════════════════════════════════════ */

export interface HeroBannerProps {
  line1: string;
  line2?: string;
  eyebrow?: string;
  body?: string;
  cta?: { label: string; href: string };
  bg?: EmailBg;
  /** Show the wordmark above the headline. */
  logo?: boolean;
  align?: 'left' | 'center';
  size?: number;
}

/**
 * The opener for when the message is the hook and a stock-looking photograph
 * would cheapen it.
 *
 * No image, deliberately. Comparison emails, announcements and anything with a
 * strong line open better here than under a picture that is only decorating.
 */
export function HeroBanner({
  line1,
  line2 = '',
  eyebrow,
  body,
  cta,
  bg = 'forest',
  logo = true,
  align = 'center',
  size = 38,
}: HeroBannerProps) {
  return (
    <div style={{ padding: '0 30px', textAlign: align }}>
      {logo ? (
        <>
          <div style={{ textAlign: align }}>
            <Logo tone={onBg[bg].logo} variant="primary" height={54} />
          </div>
          <div style={pad(26)} />
        </>
      ) : null}
      <Headline bg={bg} line1={line1} line2={line2} size={size} align={align} />
      {eyebrow ? (
        <>
          <div style={pad(14)} />
          <Eyebrow text={eyebrow} bg={bg} />
        </>
      ) : null}
      {body ? (
        <>
          <div style={pad(16)} />
          <Body text={body} bg={bg} align={align} />
        </>
      ) : null}
      {cta ? (
        <>
          <div style={pad(26)} />
          <Button bg={bg} label={cta.label} href={cta.href} size="lg" />
        </>
      ) : null}
    </div>
  );
}

/* ══ S6 · CTA BAND ═══════════════════════════════════════════════════════ */

export interface CtaBandProps {
  label: string;
  href: string;
  bg?: EmailBg;
  /** Facts above the button — the last reassurance before the click. */
  pills?: string[];
  /** One line above the button. Keep it to a promise, not a paragraph. */
  note?: string;
  /** White pills instead of gold, for a band where titles are already gold. */
  pillVariant?: 'gold' | 'white' | 'outline';
}

/**
 * The closer. Optional facts, then one button.
 *
 * The pills matter more than they look: they are the last thing read before the
 * decision, and "90 cal · 3g sugar · ready in 30 seconds" answers the three
 * objections a reader still has at the bottom of the email.
 */
export function CtaBand({ label, href, bg = 'forest', pills, note, pillVariant = 'gold' }: CtaBandProps) {
  return (
    <div style={{ padding: '0 30px', textAlign: 'center' }}>
      {pills && pills.length ? (
        <>
          <SpecPills bg={bg} items={pills} variant={pillVariant} align="center" />
          <div style={pad(24)} />
        </>
      ) : null}
      {note ? (
        <>
          <Body text={note} bg={bg} />
          <div style={pad(20)} />
        </>
      ) : null}
      <Button bg={bg} label={label} href={href} size="lg" />
    </div>
  );
}
