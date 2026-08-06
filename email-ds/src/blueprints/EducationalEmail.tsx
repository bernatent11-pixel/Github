import * as React from 'react';
import { EmailBg } from '../theme';
import { EmailShell } from '../components/EmailShell';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Section, SectionHeading, Panel } from '../components/Section';
import { SectionBreak } from '../components/SectionBreak';
import { BenefitsGrid } from '../components/BenefitsGrid';
import { IngredientList } from '../components/IngredientList';
import { BarChart } from '../components/BarChart';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export interface EducationalEmailProps {
  /** The one flat background color for the whole email. */
  bg?: EmailBg;
  /** Paint the brand paper grain across the whole email (gold / dark green). */
  textured?: boolean;
  /** Background for the emphasis band (the head-to-head comparison). */
  accentBg?: EmailBg;
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
  textured = false,
  accentBg = 'forest',
  title = 'Why yerba mate beats the 3pm crash',
  intro = "Coffee spikes and drops you. Milonga pairs natural caffeine with L-Theanine and Lion's Mane for calm, sustained focus — no jitters, no crash.",
  ctaHref = '#',
}: EducationalEmailProps) {
  return (
    <EmailShell bg={bg} textured={textured}>
      <Header bg={bg} />
      <Hero bg={bg} eyebrow="The science" title={title} body={intro} image={{ kind: 'studio' }} />

      <Section bg={bg} pad="md" rule>
        <SectionHeading bg={bg} title="What makes it different" />
        <div style={{ height: 18 }} />
        <BenefitsGrid
          bg={bg}
          columns={2}
          items={[
            { icon: 'yerba-mate', title: 'Clean caffeine', text: '100mg from yerba mate — energy without the coffee spike.' },
            { icon: 'lions-mane', title: "Lion's Mane", text: '500mg for cognitive support — focus and mental clarity.' },
            { icon: 'l-theanine', title: 'No crash', text: '200mg of L-Theanine keeps the energy balanced and calm.' },
            { icon: 'no-cane-sugar', title: 'No cane sugar', text: 'Sweetened with honey and real monk fruit.' },
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
              { icon: 'lions-mane', name: "Lion's Mane", amount: '500mg', note: 'Cognitive support' },
              { icon: 'yerba-mate', name: 'Natural caffeine', amount: '100mg', note: 'From yerba mate' },
              { icon: 'l-theanine', name: 'L-Theanine', amount: '200mg', note: 'Balanced and calm' },
            ]}
          />
        </Panel>
      </Section>

      {/* The comparison band switches color for emphasis. */}
      <SectionBreak from={bg} to={accentBg} />
      <Section bg={accentBg} pad="lg">
        <SectionHeading bg={accentBg} eyebrow="Head to head" title="Caffeine, without the spike" />
        <div style={{ height: 18 }} />
        <BarChart
          bg={accentBg}
          max={220}
          data={[
            { label: 'Milonga', value: 100, suffix: 'mg', highlight: true },
            { label: 'Drip coffee', value: 165, suffix: 'mg' },
            { label: 'Energy drink', value: 200, suffix: 'mg' },
          ]}
        />
      </Section>
      <SectionBreak from={accentBg} to={bg} />

      <Section bg={bg} pad="md" align="center">
        <Button label="Try Milonga" href={ctaHref} bg={bg} size="lg" />
      </Section>

      <Footer bg={bg} social={[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' }]} />
    </EmailShell>
  );
}
