import * as React from 'react';
import { EducationalEmail } from '@milonga/email-ds';

export const Default = () => <EducationalEmail />;

export const CustomTopic = () => (
  <EducationalEmail
    title="What Lion's Mane actually does for focus"
    intro="Lion's Mane is a functional mushroom studied for clarity and memory. Paired with 100mg natural caffeine and L-Theanine, it's the calm side of energy."
  />
);
