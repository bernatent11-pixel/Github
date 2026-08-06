import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useSurface } from '../surface';
import { Logo } from './Logo';

export interface FooterProps {
  /** The email's flat background color — the footer shares it. */
  bg?: EmailBg;
  /** Social / utility links, e.g. [{label:'Instagram', href:'#'}]. */
  social?: Array<{ label: string; href: string }>;
  /** Brand line under the links. */
  brandLine?: string;
  /** Optional legal / mailing address line under the brand line. */
  address?: string;
  unsubscribeHref?: string;
  browserHref?: string;
  /** Logo height in px. */
  size?: number;
  /** Optional uppercase tagline under the logo. Off by default. */
  tagline?: string;
  /** Hairline above the sign-off. On by default; turn it off in emails that
   *  carry no rules at all. */
  rule?: boolean;
}

/**
 * The closing block, on the same flat color as the rest of the email: a
 * hairline, the Milonga lockup, the social links, the brand line, and the
 * legal links.
 */
export function Footer({
  bg = 'forest',
  social = [],
  brandLine = 'Milonga Yerba Mate',
  address,
  unsubscribeHref = '#',
  browserHref = '#',
  size = 84,
  tagline,
  rule = true,
}: FooterProps) {
  const t = onBg[bg];
  const surface = useSurface(bg);
  return (
    <div style={{ ...surface, fontFamily: fontStack, padding: '0 30px 34px' }}>
      {rule ? <div style={{ height: 1, background: t.rule, marginBottom: 30 }} /> : <div style={{ height: 30 }} />}
      <div style={{ textAlign: 'center' }}>
        <Logo variant="primary" tone={t.logo} height={size} />

        {tagline ? (
          <div
            style={{
              marginTop: 18,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: t.accent,
            }}
          >
            {tagline}
          </div>
        ) : null}

        {social.length ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 22, margin: '24px 0 0', flexWrap: 'wrap' }}>
            {social.map((s, i) => (
              <a
                key={i}
                href={s.href}
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: t.title,
                  textDecoration: 'none',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        ) : null}

        {brandLine ? (
          <div
            style={{
              marginTop: 20,
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: t.accent,
            }}
          >
            {brandLine}
          </div>
        ) : null}

        <div style={{ marginTop: 14, fontWeight: 400, fontSize: 10.5, lineHeight: 1.75, color: t.body, opacity: 0.78 }}>
          {address ? (
            <>
              {address}
              <br />
            </>
          ) : null}
          <a href={unsubscribeHref} style={{ color: 'inherit' }}>
            Unsubscribe
          </a>
          {' · '}
          <a href={browserHref} style={{ color: 'inherit' }}>
            View in browser
          </a>
        </div>
      </div>
    </div>
  );
}
