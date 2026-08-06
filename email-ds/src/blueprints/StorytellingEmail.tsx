import * as React from 'react';
import { colors } from '../tokens';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { ImageSlot } from '../components/ImageSlot';
import { Callout } from '../components/Callout';
import { List } from '../components/List';
import { Divider } from '../components/Divider';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface StorytellingEmailProps {
  title?: string;
  ctaHref?: string;
}

/**
 * Brand-storytelling blueprint — a narrative email: an evocative hero, a short
 * story section with a lifestyle image, a customer quote, and a soft CTA.
 */
export function StorytellingEmail({ title = 'From the fields of the Southern Cone', ctaHref = '#' }: StorytellingEmailProps) {
  return (
    <EmailShell bg="forest">
      <Header bg="forest" />
      <Hero
        bg="forest"
        eyebrow="The Milonga story"
        title={title}
        body="Milonga began with a ritual — sharing mate, passing the gourd, staying present. We bottled that feeling into a modern latte."
        image={{ kind: 'lifestyle', ratio: 'wide' }}
      />
      <Section tone="white" pad="lg">
        <SectionHeading title="A ritual, reimagined" />
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.inkSoft, margin: '12px 0 0' }}>
          For generations, yerba mate has been the drink of focus and friendship. We keep the whole-leaf tradition and add
          what modern days ask for — Lion's Mane for clarity, L-Theanine for calm.
        </p>
        <div style={{ height: 18 }} />
        <List
          marker="leaf"
          items={[
            'Whole-leaf yerba mate, never powder concentrate',
            'Functional mushrooms for real, felt focus',
            'A vanilla latte you can make in 30 seconds',
          ]}
        />
      </Section>
      <Section tone="white" pad="sm">
        <ImageSlot kind="studio" ratio="landscape" caption="Hand-selected leaf, small-batch blended" />
      </Section>
      <Section tone="white" pad="md">
        <Callout
          variant="quote"
          tone="forest"
          text="It's the first energy drink that actually makes me feel calm and clear at the same time."
          attribution="Sofia R. — Milonga drinker"
        />
      </Section>
      <Divider variant="mark" />
      <Section tone="white" pad="md" align="center">
        <Button label="Meet the blend" href={ctaHref} bg="forest" size="lg" />
      </Section>
      <Footer social={[{ label: 'Instagram', href: '#' }, { label: 'Our story', href: '#' }]} />
    </EmailShell>
  );
}
