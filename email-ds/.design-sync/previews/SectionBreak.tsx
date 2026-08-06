import * as React from 'react';
import { SectionBreak, Section, SectionHeading } from '@milonga/email-ds';

export const HardEdge = () => (
  <div>
    <Section bg="forest" pad="md">
      <SectionHeading bg="forest" title="Clean energy, all day" />
    </Section>
    <SectionBreak from="forest" to="gold" />
    <Section bg="gold" pad="md">
      <SectionHeading bg="gold" title="Why it works" />
    </Section>
  </div>
);

export const FadeBlend = () => (
  <div>
    <Section bg="beige" pad="md">
      <SectionHeading bg="beige" title="What's inside" />
    </Section>
    <SectionBreak from="beige" to="forest" variant="fade" />
    <Section bg="forest" pad="md">
      <SectionHeading bg="forest" title="Head to head" />
    </Section>
  </div>
);
