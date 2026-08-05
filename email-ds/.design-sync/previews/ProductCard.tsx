import * as React from 'react';
import { ProductCard } from '@milonga/email-ds';

export const Default = () => (
  <div style={{ maxWidth: 340 }}>
    <ProductCard
      name="Vanilla Latte"
      variant="Yerba Mate Latte"
      description="Our first flavor: creamy vanilla, whole-leaf yerba mate, and functional mushrooms for all-day clarity."
      specs={['100mg caffeine', "300mg Lion's Mane", '15 servings']}
      price="$29"
      cta={{ label: 'Add to cart', href: '#' }}
    />
  </div>
);

export const Minimal = () => (
  <div style={{ maxWidth: 340 }}>
    <ProductCard
      name="Vanilla Latte"
      variant="Vanilla · Latte"
      specs={['100mg caffeine', '15 servings']}
      price="$29"
      cta={{ label: 'Shop now', href: '#' }}
    />
  </div>
);
