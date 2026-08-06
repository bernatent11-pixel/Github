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
  /** Paint the brand paper grain across the whole email (gold / dark green). */
  textured?: boolean;
  title?: string;
  ctaHref?: string;
}

/**
 * Product-launch blueprint — announces a drop: a bold hero, the product card,
 * a "why it's different" comparison and an urgency band to convert.
 */
export function LaunchEmail({ bg = 'gold',
  textured = false, title = 'Meet the Mate Latte', ctaHref = '#' }: LaunchEmailProps) {
  return (
    <EmailShell bg={bg} textured={textured}>
      <Header bg={bg} />
      <Hero
        bg={bg}
        eyebrow="New · Launch day"
        title={title}
        body="Yerba mate, Lion's Mane and L-Theanine in a creamy vanilla latte. Ready in 30 seconds — hot or iced."
        image={{ kind: 'product', cutout: true }}
        cta={{ label: 'Shop now', href: ctaHref }}
      />

      <Section bg={bg} pad="md" rule>
        <ProductCard
          bg={bg}
          name="Mate Latte"
          variant="Vanilla · 15 servings"
          description="Oat milk and coconut make it creamy. Honey and real monk fruit make it sweet. 90 calories and 3g of sugar a scoop."
          specs={['Organic', 'Gluten & dairy-free', 'No artificial sweeteners']}
          price="$29.99"
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
        <Callout bg={bg} text="Subscribe and take another 15% off" attribution="Cancel any time" />
      </Section>

      <Section bg={bg} pad="sm" align="center">
        <Button label="Get your first tin" href={ctaHref} bg={bg} size="lg" />
      </Section>

      <Footer bg={bg} social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' }]} />
    </EmailShell>
  );
}
