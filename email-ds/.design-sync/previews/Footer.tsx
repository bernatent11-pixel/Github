import * as React from 'react';
import { Footer } from '@milonga/email-ds';

export const Dark = () => (
  <Footer
    tone="dark"
    social={[
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
    ]}
    address="Milonga · Clean, focused energy · Made with yerba mate"
  />
);

export const Light = () => (
  <Footer
    tone="light"
    social={[
      { label: 'Instagram', href: '#' },
      { label: 'Our story', href: '#' },
    ]}
    address="Milonga · Yerba Mate Latte"
  />
);
