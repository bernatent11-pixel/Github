import * as React from 'react';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { ComparisonTable } from '../components/ComparisonTable';
import { Callout } from '../components/Callout';
import { Divider } from '../components/Divider';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface LaunchEmailProps {
  title?: string;
  ctaHref?: string;
}

/**
 * Product-launch blueprint — announces a drop: a bold hero, the product card,
 * a "why it's different" comparison, and an urgency band to convert.
 */
export function LaunchEmail({ title = 'Meet Milonga Vanilla Latte', ctaHref = '#' }: LaunchEmailProps) {
  return (
    <EmailShell page="beige" surface="white">
      <Header tone="dark" tagline="Now available" />
      <Hero
        tone="gold"
        eyebrow="New · Launch day"
        title={title}
        body="Clean, focused energy in a smooth vanilla latte. Yerba mate, Lion's Mane and L-Theanine — nothing you can't pronounce."
        cta={{ label: 'Shop now', href: ctaHref }}
      />
      <Section tone="white" pad="md">
        <ProductCard
          name="Vanilla Latte"
          variant="Yerba Mate Latte"
          description="Our first flavor: creamy vanilla, whole-leaf yerba mate, and functional mushrooms for all-day clarity."
          specs={['100mg caffeine', "300mg Lion's Mane", '15 servings']}
          price="$29"
          cta={{ label: 'Add to cart', href: ctaHref }}
        />
      </Section>
      <Section tone="beige" pad="md">
        <SectionHeading eyebrow="Why it's different" title="Not your average energy drink" />
        <div style={{ height: 16 }} />
        <ComparisonTable
          columns={['', 'Milonga', 'Coffee', 'Energy drink']}
          highlight={1}
          rows={[
            ['Clean caffeine', true, true, false],
            ['No sugar crash', true, false, false],
            ['Lion’s Mane focus', true, false, false],
            ['L-Theanine calm', true, false, false],
            ['Added sugar', 'None', 'None', 'High'],
          ]}
        />
      </Section>
      <Section tone="white" pad="md">
        <Callout tone="forest" text="Launch stock is limited — first batch ships this week." attribution="Free shipping over $35" />
      </Section>
      <Section tone="white" pad="sm" align="center">
        <Button label="Get your first tin" href={ctaHref} variant="gold" size="lg" />
      </Section>
      <Divider variant="dots" gap={6} />
      <Footer social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }]} />
    </EmailShell>
  );
}
