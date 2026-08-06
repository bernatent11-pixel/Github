import * as React from 'react';
import { EmailBg } from '../theme';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { TextImage } from '../components/TextImage';
import { List } from '../components/List';
import { Callout } from '../components/Callout';
import { Divider } from '../components/Divider';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface StorytellingEmailProps {
  /** The one flat background color for the whole email. */
  bg?: EmailBg;
  /** Paint the brand paper grain across the whole email (gold / dark green). */
  textured?: boolean;
  title?: string;
  ctaHref?: string;
}

/**
 * Brand-storytelling blueprint — a narrative email: an evocative hero, a short
 * story section with a lifestyle image, a customer quote and a soft CTA.
 */
export function StorytellingEmail({
  bg = 'forest',
  textured = false,
  title = 'From the fields of the Southern Cone',
  ctaHref = '#',
}: StorytellingEmailProps) {
  return (
    <EmailShell bg={bg} textured={textured}>
      <Header bg={bg} />
      <Hero
        bg={bg}
        eyebrow="The Milonga story"
        title={title}
        body="Milonga began with a ritual — sharing mate, passing the gourd, staying present. We bottled that feeling into a modern latte."
        image={{ kind: 'lifestyle' }}
      />

      <Section bg={bg} pad="md" rule>
        <SectionHeading bg={bg} title="A ritual, reimagined" />
        <div style={{ height: 10 }} />
        <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>
          For generations, yerba mate has been the drink of focus and friendship. We keep the whole-leaf tradition and
          add what modern days ask for — Lion's Mane for clarity, L-Theanine for calm.
        </p>
        <div style={{ height: 16 }} />
        <List
          bg={bg}
          marker="leaf"
          items={[
            'Whole-leaf yerba mate, never powder concentrate',
            'Functional mushrooms for real, felt focus',
            'A vanilla latte you can make in 30 seconds',
          ]}
        />
      </Section>

      <Section bg={bg} pad="sm">
        <TextImage
          bg={bg}
          eyebrow="The blend"
          title="Small-batch, always"
          text="Hand-selected leaf, blended in small batches so every tin tastes the same as the last."
          image={{ kind: 'studio' }}
        />
      </Section>

      <Section bg={bg} pad="md" rule>
        <Callout
          bg={bg}
          variant="quote"
          text="It's the first energy drink that actually makes me feel calm and clear at the same time."
          attribution="Sofia R. — Milonga drinker"
        />
      </Section>

      <Divider bg={bg} variant="mark" gap={6} />

      <Section bg={bg} pad="sm" align="center">
        <Button label="Meet the blend" href={ctaHref} bg={bg} size="lg" />
      </Section>

      <Footer bg={bg} social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' }]} />
    </EmailShell>
  );
}
