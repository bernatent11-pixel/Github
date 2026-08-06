import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';
import { useBlockFill } from '../surface';

export interface BundleTab {
  /** e.g. "Buy 2 · Save 10%". */
  label: string;
  href?: string;
  /** The tab the reader is looking at — filled instead of outlined. */
  active?: boolean;
}

export interface PriceOption {
  /** Small caps label above the price, e.g. "One-time". */
  label: string;
  /** The headline price, e.g. "$29.99". */
  price: string;
  /** Struck-through price shown before it, e.g. "$29.99". */
  was?: string;
  /** Suffix on the price, e.g. "/mo". */
  suffix?: string;
  /** Line under the price, e.g. "15 servings". */
  detail?: string;
  /** Unit economics line, e.g. "$2.00 per serving". */
  unit?: string;
  cta: { label: string; href: string };
  /** The recommended option — gold border, filled button, badge. */
  featured?: boolean;
  /** Badge above a featured option, e.g. "Save 15%". */
  badge?: string;
}

export interface PriceBlockProps {
  /** Optional bundle selector across the top. */
  tabs?: BundleTab[];
  /** Two options, side by side: one-time and subscription. */
  options: PriceOption[];
  bg?: EmailBg;
}

/**
 * The sales block: an optional bundle selector, then the purchase options side
 * by side with their per-serving maths. The featured option is outlined in the
 * accent colour and carries the solid button.
 */
export function PriceBlock({ tabs = [], options, bg = 'forest' }: PriceBlockProps) {
  const t = onBg[bg];
  const fill = useBlockFill(bg, t.elevated);

  return (
    <div
      style={{
        fontFamily: fontStack,
        background: fill,
        border: `1px solid ${t.rule}`,
        borderTopColor: t.sheen,
        borderRadius: 20,
        boxShadow: t.shadow,
        padding: '20px 18px 22px',
      }}
    >
      {tabs.length ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {tabs.map((tab, i) => (
            <a
              key={i}
              href={tab.href ?? '#'}
              style={{
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 10.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid ${tab.active ? t.accent : t.rule}`,
                background: tab.active ? t.accent : 'transparent',
                color: tab.active ? (bg === 'forest' ? bgFill.forest : t.btnText) : t.body,
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 12 }}>
        {options.map((o, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              borderRadius: 16,
              border: `1.5px solid ${o.featured ? t.accent : t.rule}`,
              background: o.featured ? 'rgba(227, 188, 98, 0.10)' : 'transparent',
              padding: o.badge ? '22px 14px 16px' : '16px 14px',
              textAlign: 'center',
            }}
          >
            {o.badge ? (
              <span
                style={{
                  position: 'absolute',
                  top: -11,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: t.accent,
                  color: bg === 'forest' ? bgFill.forest : t.btnText,
                  fontWeight: 900,
                  fontSize: 9.5,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: 999,
                  whiteSpace: 'nowrap',
                }}
              >
                {o.badge}
              </span>
            ) : null}

            <div
              style={{
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: t.body,
                marginBottom: 8,
              }}
            >
              {o.label}
            </div>

            <div style={{ lineHeight: 1.05, marginBottom: 8 }}>
              {o.was ? (
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: t.body,
                    opacity: 0.65,
                    textDecoration: 'line-through',
                    marginRight: 6,
                  }}
                >
                  {o.was}
                </span>
              ) : null}
              <span style={{ fontWeight: 900, fontSize: 26, letterSpacing: '-0.01em', color: t.accent }}>
                {o.price}
              </span>
              {o.suffix ? (
                <span style={{ fontWeight: 700, fontSize: 12, color: t.accent }}>{o.suffix}</span>
              ) : null}
            </div>

            {o.detail ? (
              <div style={{ fontSize: 11.5, lineHeight: 1.5, color: t.body, marginBottom: 3 }}>{o.detail}</div>
            ) : null}
            {o.unit ? (
              <div style={{ fontSize: 11.5, fontWeight: 700, color: t.accent, marginBottom: 14 }}>{o.unit}</div>
            ) : (
              <div style={{ height: 14 }} />
            )}

            <a
              href={o.cta.href}
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                fontFamily: fontStack,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: 999,
                padding: '12px 10px',
                background: o.featured ? t.btnGradient : 'transparent',
                backgroundColor: o.featured ? t.btnBg : 'transparent',
                color: o.featured ? t.btnText : t.title,
                border: `1.5px solid ${o.featured ? t.btnBg : t.rule}`,
                boxShadow: o.featured ? t.btnShadow : 'none',
              }}
            >
              {o.cta.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
