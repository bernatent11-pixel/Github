import * as React from 'react';
import { SectionHeading } from '@milonga/email-ds';

export const Full = () => (
  <div style={{ padding: 24 }}>
    <SectionHeading eyebrow="What's inside" title="Energy That Thinks" intro="Yerba mate, Lion's Mane and L-Theanine in one smooth Vanilla Latte." />
  </div>
);

export const Centered = () => (
  <div style={{ padding: 24 }}>
    <SectionHeading title="What's inside every serving" align="center" />
  </div>
);

export const OnDark = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <SectionHeading eyebrow="The Milonga story" title="From the fields of the Southern Cone" intro="We bottled the ritual of sharing mate into a modern latte." onDark />
  </div>
);
