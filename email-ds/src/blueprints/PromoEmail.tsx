import * as React from 'react';
import { EmailBg } from '../theme';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Stats } from '../components/Stats';
import { Callout } from '../components/Callout';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface PromoEmailProps {
  /** The one flat background color for the whole email. */
  bg?: EmailBg;
  /** Paint the brand paper grain across the whole email (gold / dark green). */
  textured?: boolean;
  title?: string;
  /** Discount / offer line. */
  offer?: string;
  code?: string;
  ctaHref?: string;
}

/**
 * Promotion blueprint — an offer-driven email: masthead, hero offer, proof
 * stats, the code band and a closing CTA.
 */
export function PromoEmail({
  bg = 'forest',
  textured = false,
  title = 'Your focus, 20% sharper',
  offer = 'Take 20% off your first tin of Milonga Yerba Mate Latte.',
  code = 'FOCUS20',
  ctaHref = '#',
}: PromoEmailProps) {
  return (
    <EmailShell bg={bg} textured={textured}>
      <Header bg={bg} />
      <Hero
        bg={bg}
        eyebrow="Limited time"
        title={title}
        body={offer}
        image={{ kind: 'lifestyle' }}
        cta={{ label: 'Shop the launch', href: ctaHref }}
      />

      <Section bg={bg} pad="md" rule>
        <Stats
          bg={bg}
          items={[
            { value: '100mg', label: 'Natural caffeine' },
            { value: '300mg', label: "Lion's Mane" },
            { value: '15', label: 'Servings' },
          ]}
        />
      </Section>

      <Section bg={bg} pad="md">
        <Callout bg={bg} text={`${code} — 20% off`} attribution="Auto-applies at checkout" />
      </Section>

      <Section bg={bg} pad="sm" align="center">
        <Button label="Claim your 20%" href={ctaHref} bg={bg} size="lg" />
      </Section>

      <Footer
        bg={bg}
        social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' }]}
      />
    </EmailShell>
  );
}
