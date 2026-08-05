import * as React from 'react';
import { Section, SectionHeading } from '@milonga/email-ds';

export const White = () => (
  <Section tone="white" pad="md">
    <SectionHeading eyebrow="The science" title="Why yerba mate beats the 3pm crash" intro="Calm, sustained focus — no jitters, no crash." />
  </Section>
);

export const Beige = () => (
  <Section tone="beige" pad="md" align="center">
    <SectionHeading eyebrow="Head to head" title="Caffeine, without the spike" align="center" />
  </Section>
);

export const Forest = () => (
  <Section tone="forest" pad="lg">
    <SectionHeading eyebrow="Our roots" title="A ritual, reimagined" intro="For generations, yerba mate has been the drink of focus and friendship." onDark />
  </Section>
);
