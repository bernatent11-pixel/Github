// Not a campaign — a proving ground for the new sections in the library.
// Each block here exists to be LOOKED at, because every design error in this
// system is invisible in code and obvious in a picture.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  pour: '../public/product/mind-body-connected.jpg',
  mate: '../public/product/ing-yerba-mate.png',
  lions: '../public/product/ing-lions-mane.png',
  thea: '../public/product/ing-theanine.png',
  pouch: '../public/product/pouch-botanical.png',
  iced: '../public/product/pouch-iced-botanical.png',
  sticks: '../public/product/latte-sticks.png',
};

function SectionSampler() {
  const bg = 'beige';
  const ink = 'forest';

  return h(M.EmailShell, { bg },

    // O3 · Text-over-image, bottom-anchored with a scrim
    h(M.TextOverImage, {
      src: IMG.pour, alt: 'A Milonga stick poured into a glass of Mate Latte',
      eyebrow: 'The morning ritual',
      line1: 'Everything your', line2: 'mornings need.',
      bg: ink, anchor: 'bottom', scrim: true, size: 36,
    }),

    // R-C · Marquee — resets the eye after the photograph
    h(M.Section, { bg, pad: 'sm' },
      h(M.Marquee, { bg, text: 'Energy that thinks', repeat: 8 })
    ),

    // B1 · Zig-zag, alternating sides
    h(M.Section, { bg, pad: 'md' },
      h(M.ZigZag, {
        bg, rhythm: 'alternate', startSide: 'left',
        renderBullets: (b) => h(M.SpecPills, { bg, items: b, variant: 'gold', align: 'left', size: 11 }),
        items: [
          { src: IMG.mate, alt: 'Yerba mate', line1: 'Yerba mate,', line2: 'the foundation.',
            bullets: ['Clean sustained energy', 'No jitters, no crash'] },
          { src: IMG.lions, alt: 'Lion’s Mane', line1: 'Lion’s Mane,', line2: 'for a clear head.',
            bullets: ['Focus', 'Concentration'] },
          { src: IMG.thea, alt: 'L-Theanine', line1: 'L-Theanine,', line2: 'what balances it.',
            bullets: ['Balanced and calm', 'Smooth'] },
        ],
      })
    ),

    // R-A · Colour band wrapping a whole act, with a pull quote inside it
    h(M.ColorBand, { bg: ink, pad: 8 },
      h(M.Section, { bg: ink, pad: 'lg', align: 'center' },
        h(M.PullQuote, {
          bg: ink, stars: 5, size: 26,
          quote: '“A coffee latte without the acidity from coffee.”',
          attribution: 'Priscilla',
        })
      )
    ),

    // P2 · Product grid, 2-up
    h(M.Section, { bg, pad: 'lg' },
      h(M.SectionHeading, { bg, title: 'The range', align: 'center' }),
      h('div', { style: { height: 20 } }),
      h(M.ProductGrid, {
        bg, per: 2, carded: true,
        items: [
          { src: IMG.pouch, alt: 'Mate Latte pouch', name: 'Mate Latte', note: 'Vanilla · 15 servings', price: '$29.99', badge: 'New' },
          { src: IMG.iced, alt: 'Mate Latte iced', name: 'Iced ritual', note: 'Hot or iced, 30 seconds', price: '$29.99' },
        ],
      })
    ),

    // R-D · Breath
    h(M.Breath, { size: 48 }),

    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Button, { bg, label: 'Shop now', href: '#', size: 'lg' })
    ),

    h(M.Footer, { bg, social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
