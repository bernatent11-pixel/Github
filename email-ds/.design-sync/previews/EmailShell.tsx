import * as React from 'react';
import { EmailShell, Header, Section, SectionHeading, Button } from '@milonga/email-ds';

export const Default = () => (
  <EmailShell page="beige" surface="white">
    <Header tone="dark" tagline="Energy That Thinks" />
    <Section tone="white" pad="lg" align="center">
      <SectionHeading
        eyebrow="Now available"
        title="Meet Milonga Vanilla Latte"
        intro="Clean, focused energy from yerba mate, Lion's Mane and L-Theanine."
        align="center"
      />
      <div style={{ height: 20 }} />
      <Button label="Shop the launch" href="#" variant="gold" size="lg" />
    </Section>
  </EmailShell>
);

export const ForestPage = () => (
  <EmailShell page="forest" surface="white">
    <Header tone="dark" tagline="Our roots" />
    <Section tone="white" pad="lg" align="center">
      <SectionHeading title="From the fields of the Southern Cone" align="center" />
      <div style={{ height: 20 }} />
      <Button label="Meet the blend" href="#" variant="forest" size="lg" />
    </Section>
  </EmailShell>
);
