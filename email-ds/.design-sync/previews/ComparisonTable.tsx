import * as React from 'react';
import { ComparisonTable } from '@milonga/email-ds';

export const Default = () => (
  <div style={{ padding: 24 }}>
    <ComparisonTable
      columns={['', 'Milonga', 'Coffee', 'Energy drink']}
      highlight={1}
      rows={[
        ['Clean caffeine', true, true, false],
        ['No sugar crash', true, false, false],
        ["Lion's Mane focus", true, false, false],
        ['L-Theanine calm', true, false, false],
        ['Added sugar', 'None', 'None', 'High'],
      ]}
    />
  </div>
);

export const CaffeineValues = () => (
  <div style={{ padding: 24 }}>
    <ComparisonTable
      columns={['', 'Milonga', 'Drip coffee', 'Energy drink']}
      highlight={1}
      rows={[
        ['Caffeine', '100mg', '165mg', '200mg'],
        ['Servings', '15', '—', '1'],
        ['Jitters', false, true, true],
      ]}
    />
  </div>
);
