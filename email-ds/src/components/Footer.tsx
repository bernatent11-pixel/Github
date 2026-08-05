import * as React from 'react';
import { colors, fontStack } from '../tokens';
import { Logo } from './Logo';

export interface FooterProps {
  tagline?: string;
  /** Social links, e.g. [{label:'Instagram', href:'#'}]. */
  social?: Array<{ label: string; href: string }>;
  /** Legal / mailing address line. */
  address?: string;
  unsubscribeHref?: string;
  /** dark = forest footer (default) · light = beige footer. */
  tone?: 'dark' | 'light';
}

/** The closing block: logo, tagline, social, address and unsubscribe. */
export function Footer({
  tagline = 'Energy That Thinks',
  social = [],
  address = 'Milonga · Yerba Mate Latte',
  unsubscribeHref = '#',
  tone = 'dark',
}: FooterProps) {
  const dark = tone === 'dark';
  const sub = dark ? colors.beige : colors.inkSoft;
  return (
    <div style={{ background: dark ? colors.forestDeep : colors.beige, padding: '34px 30px 30px', textAlign: 'center', fontFamily: fontStack }}>
      <Logo variant="primary" tone={dark ? 'gold' : 'green'} height={58} />
      {tagline ? (
        <div style={{ marginTop: 12, fontWeight: 500, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: dark ? colors.gold : colors.leaf }}>
          {tagline}
        </div>
      ) : null}
      {social.length ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '20px 0 0' }}>
          {social.map((s, i) => (
            <a key={i} href={s.href} style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.04em', color: dark ? colors.beige : colors.forest, textDecoration: 'none' }}>
              {s.label}
            </a>
          ))}
        </div>
      ) : null}
      <div style={{ marginTop: 22, fontWeight: 400, fontSize: 12, lineHeight: 1.7, color: sub }}>
        {address}
        <br />
        <a href={unsubscribeHref} style={{ color: sub, textDecoration: 'underline' }}>
          Unsubscribe
        </a>{' '}
        · View in browser
      </div>
    </div>
  );
}
