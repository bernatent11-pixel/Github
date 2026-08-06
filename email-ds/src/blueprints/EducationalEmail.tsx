import * as React from 'react';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Section, SectionHeading } from '../components/Section';
import { ImageSlot } from '../components/ImageSlot';
import { BenefitsGrid } from '../components/BenefitsGrid';
import { IngredientList } from '../components/IngredientList';
import { BarChart } from '../components/BarChart';
import { Divider } from '../components/Divider';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface EducationalEmailProps {
  title?: string;
  intro?: string;
  ctaHref?: string;
}

/**
 * Educational blueprint — teaches one idea with balanced info: a hero image,
 * benefits, an ingredient readout, and a comparison chart. The "value" email.
 */
export function EducationalEmail({
  title = 'Why yerba mate beats the 3pm crash',
  intro = "Coffee spikes and drops you. Milonga pairs natural caffeine with L-Theanine and Lion's Mane for calm, sustained focus — no jitters, no crash.",
  ctaHref = '#',
}: EducationalEmailProps) {
  return (
    <EmailShell bg="beige">
      <Header bg="beige" />
      <Section tone="white" pad="lg">
        <SectionHeading eyebrow="The science" title={title} intro={intro} />
      </Section>
      <Section tone="white" pad="sm">
        <ImageSlot kind="studio" ratio="wide" caption="Yerba mate, Lion's Mane & vanilla — the Milonga blend" />
      </Section>
      <Section tone="white" pad="md">
        <BenefitsGrid
          columns={2}
          items={[
            { icon: 'bolt', title: 'Clean caffeine', text: '100mg from yerba mate — energy without the coffee spike.' },
            { icon: 'brain', title: "Lion's Mane", text: '300mg to support focus, memory and mental clarity.' },
            { icon: 'clock', title: 'No crash', text: 'L-Theanine smooths the curve for hours of steady calm.' },
            { icon: 'leaf', title: 'Whole-leaf', text: 'Real yerba mate, naturally rich in antioxidants.' },
          ]}
        />
      </Section>
      <Divider variant="line" />
      <Section tone="white" pad="md">
        <SectionHeading title="What's inside every serving" align="left" />
        <div style={{ height: 12 }} />
        <IngredientList
          items={[
            { name: "Lion's Mane", amount: '300mg', note: 'Focus & clarity' },
            { name: 'Natural caffeine', amount: '100mg', note: 'From yerba mate' },
            { name: 'L-Theanine', amount: '300mg', note: 'Calm, no jitters' },
          ]}
        />
      </Section>
      <Section tone="beige" pad="md">
        <SectionHeading eyebrow="Head to head" title="Caffeine, without the spike" />
        <div style={{ height: 16 }} />
        <BarChart
          data={[
            { label: 'Milonga', value: 100, suffix: 'mg', highlight: true },
            { label: 'Drip coffee', value: 165, suffix: 'mg' },
            { label: 'Energy drink', value: 200, suffix: 'mg' },
          ]}
          max={220}
        />
      </Section>
      <Section tone="white" pad="md" align="center">
        <Button label="Try Milonga" href={ctaHref} variant="gold" size="lg" />
      </Section>
      <Footer social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }]} />
    </EmailShell>
  );
}
