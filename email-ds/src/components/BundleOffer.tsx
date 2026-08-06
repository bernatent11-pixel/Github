import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';
import { Button } from './Button';

export interface BundleTier {
  /** e.g. "Buy 2". */
  label: string;
  /** Total price for the tier, e.g. "$53.98". */
  price: string;
  /** What you get, e.g. "30 servings". */
  detail?: string;
  /** Unit economics, e.g. "$1.80 per serving". */
  unit?: string;
  /** Corner badge, e.g. "Save 10%". */
  badge?: string;
  /** The tier to push — accent border and a filled button. */
  featured?: boolean;
  href: string;
}

export interface SubscribeOffer {
  label: string;
  /** Struck-through price shown before the offer price. */
  was?: string;
  price: string;
  /** e.g. "/mo". */
  suffix?: string;
  detail?: string;
  unit?: string;
  badge?: string;
  cta: { label: string; href: string };
}

export interface BundleOfferProps {
  bg?: EmailBg;
  /** Product shot above the offer — a transparent cutout reads best. */
  image?: { src: string; alt?: string };
  /** The one-time tiers, side by side. */
  tiers: BundleTier[];
  /** The subscription, given the full width beneath the tiers. */
  subscribe?: SubscribeOffer;
}

/**
 * The sales close, image-led: the product, then the one-time bundles side by
 * side, then the subscription across the bottom as the best-value option.
 * Use it when the offer has more than two shapes — otherwise `PriceBlock`.
 */
export function BundleOffer({ bg = 'forest', image, tiers, subscribe }: BundleOfferProps) {
  const t = onBg[bg];
  const fill = useBlockFill(bg, t.elevated);

  return (
    <div style={{ fontFamily: fontStack }}>
      {image ? (
        <div style={{ textAlign: 'center', marginBottom: 18, lineHeight: 0 }}>
          <img
            src={image.src}
            alt={image.alt ?? ''}
            style={{ display: 'inline-block', width: '78%', height: 'auto', border: 0 }}
          />
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tiers.length}, 1fr)`, gap: 10 }}>
        {tiers.map((tier) => (
          <div
            key={tier.label}
            className="milonga-lift"
            style={{
              position: 'relative',
              background: tier.featured ? fill : 'transparent',
              border: `${tier.featured ? 1.5 : 1}px solid ${tier.featured ? t.outline : t.rule}`,
              borderTopColor: tier.featured ? t.sheen : t.rule,
              borderRadius: 14,
              boxShadow: tier.featured ? t.shadow : 'none',
              padding: '16px 10px 14px',
              textAlign: 'center',
            }}
          >
            {/* Tiers without a badge reserve its height so the prices line up. */}
            {!tier.badge && tiers.some((x) => x.badge) ? <div style={{ height: 26 }} /> : null}
            {tier.badge ? (
              <div
                style={{
                  display: 'inline-block',
                  background: t.accent,
                  color: t.btnText,
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: 999,
                  padding: '4px 10px',
                  marginBottom: 9,
                }}
              >
                {tier.badge}
              </div>
            ) : null}
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: t.body,
                marginBottom: 7,
              }}
            >
              {tier.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: t.accent, lineHeight: 1.05, marginBottom: 7 }}>
              {tier.price}
            </div>
            {tier.detail ? <div style={{ fontSize: 11, lineHeight: 1.45, color: t.body }}>{tier.detail}</div> : null}
            {tier.unit ? (
              <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, paddingTop: 3 }}>{tier.unit}</div>
            ) : null}
            <div style={{ height: 13 }} />
            <Button
              bg={bg}
              label="Buy"
              href={tier.href}
              size="sm"
              variant={tier.featured ? 'solid' : 'outline'}
              fullWidth
            />
          </div>
        ))}
      </div>

      {subscribe ? (
        <div
          className="milonga-lift"
          style={{
            marginTop: 14,
            background: fill,
            border: `1.5px solid ${t.outline}`,
            borderTopColor: t.sheen,
            borderRadius: 16,
            boxShadow: t.shadowLg,
            padding: '18px 16px',
            textAlign: 'center',
          }}
        >
          {subscribe.badge ? (
            <div
              style={{
                display: 'inline-block',
                background: t.accent,
                color: t.btnText,
                fontSize: 9.5,
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: 999,
                padding: '5px 12px',
                marginBottom: 10,
              }}
            >
              {subscribe.badge}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: t.body,
              marginBottom: 8,
            }}
          >
            {subscribe.label}
          </div>
          <div style={{ lineHeight: 1.05, marginBottom: 8 }}>
            {subscribe.was ? (
              <span style={{ fontSize: 15, fontWeight: 700, color: t.body, opacity: 0.6, textDecoration: 'line-through' }}>
                {subscribe.was}{' '}
              </span>
            ) : null}
            <span style={{ fontSize: 28, fontWeight: 900, color: t.accent }}>{subscribe.price}</span>
            {subscribe.suffix ? (
              <span style={{ fontSize: 13, fontWeight: 700, color: t.accent }}>{subscribe.suffix}</span>
            ) : null}
          </div>
          {subscribe.detail ? <div style={{ fontSize: 12, lineHeight: 1.5, color: t.body }}>{subscribe.detail}</div> : null}
          {subscribe.unit ? (
            <div style={{ fontSize: 12, fontWeight: 700, color: t.accent, paddingTop: 3 }}>{subscribe.unit}</div>
          ) : null}
          <div style={{ height: 15 }} />
          <Button bg={bg} label={subscribe.cta.label} href={subscribe.cta.href} size="md" fullWidth />
        </div>
      ) : null}
    </div>
  );
}
