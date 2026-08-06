import * as React from 'react';
import { colors } from '../tokens';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Stats } from '../components/Stats';
import { Callout } from '../components/Callout';
import { Divider } from '../components/Divider';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface PromoEmailProps {
  /** Promo headline. */
  title?: string;
  /** Discount / offer line. */
  offer?: string;
  code?: string;
  ctaHref?: string;
}

/**
 * Promotion blueprint — a full offer-driven email: masthead, hero offer, proof
 * stats, a highlighted code band and a closing CTA. Swap in product/lifestyle art.
 */
export function PromoEmail({
  title = 'Your focus, 20% sharper',
  offer = 'Take 20% off your first tin of Milonga Yerba Mate Latte.',
  code = 'FOCUS20',
  ctaHref = '#',
}: PromoEmailProps) {
  return (
    <EmailShell bg="forest">
      <Header bg="forest" />
      <Hero
        tone="forest"
        eyebrow="Limited time"
        title={title}
        body={offer}
        cta={{ label: 'Shop the launch', href: ctaHref }}
        image={{ kind: 'lifestyle', ratio: 'wide' }}
      />
      <Section tone="white" pad="md" align="center">
        <Stats
          items={[
            { value: '100mg', label: 'Natural caffeine' },
            { value: '300mg', label: "Lion's Mane" },
            { value: '15', label: 'Servings' },
          ]}
        />
      </Section>
      <div style={{ background: colors.white, padding: '0 30px' }}>
        <Callout tone="gold" text={`${code} — 20% off`} attribution="Auto-applies at checkout" />
      </div>
      <Section tone="white" pad="md" align="center">
        <Button label="Claim your 20%" href={ctaHref} variant="forest" size="lg" />
      </Section>
      <Divider variant="dots" gap={4} />
      <Footer
        social={[
          { label: 'Instagram', href: '#' },
          { label: 'TikTok', href: '#' },
        ]}
        address="Milonga · Clean, focused energy · Made with yerba mate"
      />
    </EmailShell>
  );
}
