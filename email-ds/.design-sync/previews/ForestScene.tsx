import * as React from 'react';
import { ForestScene, Section, SectionHeading } from '@milonga/email-ds';

export const BeigeToForest = () => (
  <div>
    <Section bg="beige" pad="md" align="center">
      <SectionHeading bg="beige" title="From the fields" align="center" />
    </Section>
    <ForestScene from="beige" to="forest" />
    <Section bg="forest" pad="md" align="center">
      <SectionHeading bg="forest" title="Whole-leaf, small batch" align="center" />
    </Section>
  </div>
);

export const GoldToForest = () => (
  <div>
    <Section bg="gold" pad="md" align="center">
      <SectionHeading bg="gold" title="Our roots" align="center" />
    </Section>
    <ForestScene from="gold" to="forest" />
    <Section bg="forest" pad="md" align="center">
      <SectionHeading bg="forest" title="Made with yerba mate" align="center" />
    </Section>
  </div>
);
