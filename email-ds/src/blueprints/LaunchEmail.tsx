import * as React from 'react';
import { EmailBg } from '../theme';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { ComparisonTable } from '../components/ComparisonTable';
import { Callout } from '../components/Callout';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface LaunchEmailProps {
  /** The one flat background color for the whole email. */
  bg?: EmailBg;
  title?: string;
  ctaHref?: string;
}

/**
 * Product-launch blueprint — announces a drop: a bold hero, the product card,
 * a "why it's different" comparison and an urgency band to convert.
 */
export function LaunchEmail({ bg = 'gold', title = 'Meet Milonga Vanilla Latte', ctaHref = '#' }: LaunchEmailProps) {
  return (
    <EmailShell bg={bg}>
      <Header bg={bg} />
      <Hero
        bg={bg}
        eyebrow="New · Launch day"
        title={title}
        body="Clean, focused energy in a smooth vanilla latte. Yerba mate, Lion's Mane and L-Theanine — nothing you can't pronounce."
        image={{ kind: 'product', cutout: true }}
        cta={{ label: 'Shop now', href: ctaHref }}
      />

      <Section bg={bg} pad="md" rule>
        <ProductCard
          bg={bg}
          name="Vanilla Latte"
          variant="Yerba Mate Latte"
          description="Our first flavor: creamy vanilla, whole-leaf yerba mate, and functional mushrooms for all-day clarity."
          specs={['100mg caffeine', "300mg Lion's Mane", '15 servings']}
          price="$29"
          cta={{ label: 'Add to cart', href: ctaHref }}
        />
      </Section>

      <Section bg={bg} pad="md" rule>
        <SectionHeading bg={bg} eyebrow="Why it's different" title="Not your average energy drink" />
        <div style={{ height: 18 }} />
        <ComparisonTable
          bg={bg}
          highlight={1}
          columns={['', 'Milonga', 'Coffee', 'Energy drink']}
          rows={[
            ['Clean caffeine', true, true, false],
            ['No sugar crash', true, false, false],
            ["Lion's Mane focus", true, false, false],
            ['L-Theanine calm', true, false, false],
            ['Added sugar', 'None', 'None', 'High'],
          ]}
        />
      </Section>

      <Section bg={bg} pad="md">
        <Callout bg={bg} text="Launch stock is limited — first batch ships this week." attribution="Free shipping over $35" />
      </Section>

      <Section bg={bg} pad="sm" align="center">
        <Button label="Get your first tin" href={ctaHref} bg={bg} size="lg" />
      </Section>

      <Footer bg={bg} social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' }]} />
    </EmailShell>
  );
}
