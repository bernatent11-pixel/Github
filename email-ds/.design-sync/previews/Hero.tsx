import * as React from 'react';
import { Hero } from '@milonga/email-ds';

export const Forest = () => (
  <Hero
    tone="forest"
    eyebrow="Limited time"
    title="Your focus, 20% sharper"
    body="Take 20% off your first tin of Milonga Yerba Mate Latte."
    cta={{ label: 'Shop the launch', href: '#' }}
  />
);

export const Gold = () => (
  <Hero
    tone="gold"
    eyebrow="New · Launch day"
    title="Meet Milonga Vanilla Latte"
    body="Clean, focused energy in a smooth vanilla latte — nothing you can't pronounce."
    cta={{ label: 'Shop now', href: '#' }}
  />
);

export const Beige = () => (
  <Hero
    tone="beige"
    eyebrow="The Milonga story"
    title="From the fields of the Southern Cone"
    body="Milonga began with a ritual — sharing mate, staying present. We bottled that feeling."
    cta={{ label: 'Meet the blend', href: '#' }}
  />
);

export const WithImage = () => (
  <Hero
    tone="forest"
    eyebrow="Limited time"
    title="Energy That Thinks"
    body="Yerba mate, Lion's Mane and L-Theanine for calm, sustained focus."
    cta={{ label: 'Try Milonga', href: '#' }}
    image={{ kind: 'lifestyle', ratio: 'wide' }}
  />
);
