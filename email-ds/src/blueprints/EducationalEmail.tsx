import * as React from 'react';
import { EmailBg } from '../theme';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section, SectionHeading, Panel } from '../components/Section';
import { BenefitsGrid } from '../components/BenefitsGrid';
import { IngredientList } from '../components/IngredientList';
import { BarChart } from '../components/BarChart';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface EducationalEmailProps {
  /** The one flat background color for the whole email. */
  bg?: EmailBg;
  title?: string;
  intro?: string;
  ctaHref?: string;
}

/**
 * Educational blueprint — teaches one idea with balanced info: a hero, benefits,
 * an ingredient readout and a comparison chart. The "value" email.
 */
export function EducationalEmail({
  bg = 'beige',
  title = 'Why yerba mate beats the 3pm crash',
  intro = "Coffee spikes and drops you. Milonga pairs natural caffeine with L-Theanine and Lion's Mane for calm, sustained focus — no jitters, no crash.",
  ctaHref = '#',
}: EducationalEmailProps) {
  return (
    <EmailShell bg={bg}>
      <Header bg={bg} />
      <Hero bg={bg} eyebrow="The science" title={title} body={intro} image={{ kind: 'studio' }} />

      <Section bg={bg} pad="md" rule>
        <SectionHeading bg={bg} title="What makes it different" />
        <div style={{ height: 18 }} />
        <BenefitsGrid
          bg={bg}
          columns={2}
          items={[
            { icon: 'bolt', title: 'Clean caffeine', text: '100mg from yerba mate — energy without the coffee spike.' },
            { icon: 'brain', title: "Lion's Mane", text: '300mg to support focus, memory and mental clarity.' },
            { icon: 'clock', title: 'No crash', text: 'L-Theanine smooths the curve for hours of steady calm.' },
            { icon: 'leaf', title: 'Whole-leaf', text: 'Real yerba mate, naturally rich in antioxidants.' },
          ]}
        />
      </Section>

      <Section bg={bg} pad="md" rule>
        <SectionHeading bg={bg} title="What's inside every serving" />
        <div style={{ height: 12 }} />
        <Panel bg={bg} pad={16}>
          <IngredientList
            bg={bg}
            items={[
              { name: "Lion's Mane", amount: '300mg', note: 'Focus & clarity' },
              { name: 'Natural caffeine', amount: '100mg', note: 'From yerba mate' },
              { name: 'L-Theanine', amount: '300mg', note: 'Calm, no jitters' },
            ]}
          />
        </Panel>
      </Section>

      <Section bg={bg} pad="md" rule>
        <SectionHeading bg={bg} eyebrow="Head to head" title="Caffeine, without the spike" />
        <div style={{ height: 18 }} />
        <BarChart
          bg={bg}
          max={220}
          data={[
            { label: 'Milonga', value: 100, suffix: 'mg', highlight: true },
            { label: 'Drip coffee', value: 165, suffix: 'mg' },
            { label: 'Energy drink', value: 200, suffix: 'mg' },
          ]}
        />
      </Section>

      <Section bg={bg} pad="md" align="center">
        <Button label="Try Milonga" href={ctaHref} bg={bg} size="lg" />
      </Section>

      <Footer bg={bg} social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }]} />
    </EmailShell>
  );
}
