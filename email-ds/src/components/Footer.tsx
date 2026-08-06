import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';
import { Logo } from './Logo';

export interface FooterProps {
  /** The email's flat background color — the footer shares it. */
  bg?: EmailBg;
  tagline?: string;
  /** Social links, e.g. [{label:'Instagram', href:'#'}]. */
  social?: Array<{ label: string; href: string }>;
  /** Legal / mailing address line. */
  address?: string;
  unsubscribeHref?: string;
  /** Logo height in px. */
  size?: number;
}

/**
 * The closing block, on the same flat color as the rest of the email: a hairline,
 * the logo, the tagline, social links, address and unsubscribe.
 */
export function Footer({
  bg = 'forest',
  tagline = 'Energy That Thinks',
  social = [],
  address = 'Milonga · Yerba Mate Latte',
  unsubscribeHref = '#',
  size = 58,
}: FooterProps) {
  const t = onBg[bg];
  return (
    <div style={{ background: bgFill[bg], fontFamily: fontStack, padding: '0 30px 34px' }}>
      <div style={{ height: 1, background: t.rule, marginBottom: 30 }} />
      <div style={{ textAlign: 'center' }}>
        <Logo variant="primary" tone={t.logo} height={size} />
        {tagline ? (
          <div
            style={{
              marginTop: 12,
              fontWeight: 500,
              fontSize: 10.5,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: t.accent,
            }}
          >
            {tagline}
          </div>
        ) : null}
        {social.length ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '20px 0 0' }}>
            {social.map((s, i) => (
              <a
                key={i}
                href={s.href}
                style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.04em', color: t.title, textDecoration: 'none' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        ) : null}
        <div style={{ marginTop: 20, fontWeight: 400, fontSize: 11.5, lineHeight: 1.7, color: t.body, opacity: 0.85 }}>
          {address}
          <br />
          <a href={unsubscribeHref} style={{ color: 'inherit', textDecoration: 'underline' }}>
            Unsubscribe
          </a>{' '}
          · View in browser
        </div>
      </div>
    </div>
  );
}
