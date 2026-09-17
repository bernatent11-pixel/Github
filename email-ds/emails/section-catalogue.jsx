// THE SECTION CATALOGUE — every predetermined section, rendered and labelled.
// Not an email. This is the menu: pick a section by name, drop it into a
// campaign, fill it with that campaign's content.
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
  hand: '../public/product/pouch-hand-pour-big.png',
  coffee: '../public/product/coffee-cup.png',
};

// The label strip that separates one catalogue entry from the next.
function Tag({ id, name, note }) {
  return h('div', { style: {
    background: '#004D27', padding: '14px 30px', borderTop: '2px solid #E3BC62',
  } },
    h('div', { style: {
      fontFamily: M.fontStack, fontWeight: 900, fontSize: 12, letterSpacing: '0.16em',
      textTransform: 'uppercase', color: '#E3BC62', lineHeight: 1.3,
    } }, id + ' · ' + name),
    note ? h('div', { style: {
      fontFamily: M.fontStack, fontSize: 12.5, lineHeight: 1.5, color: '#FFFFFF',
      opacity: 0.82, marginTop: 5,
    } }, note) : null
  );
}

function Gap(n) { return h('div', { style: { height: n || 40, lineHeight: 0, fontSize: 0 } }); }

function SectionCatalogue() {
  const cream = 'beige';
  const ink = 'forest';
  const gold = 'gold';

  return h(M.EmailShell, { bg: cream },

    h(Tag, { id: 'S5', name: 'Hero Banner — type-led opener', note: 'No image. For comparisons, announcements, anything a stock photo would cheapen.' }),
    Gap(36),
    h(M.HeroBanner, {
      bg: cream, line1: 'Meet your coffee’s', line2: 'competition.',
      eyebrow: 'Same morning ritual. A better feeling after.',
      body: 'Coffee gets you up. It also brings the jitters and the 3pm crash.',
      cta: { label: 'Upgrade my morning', href: '#' },
    }),
    Gap(40),

    h(Tag, { id: 'S1a', name: 'Image Block — bleed, image first', note: 'The loudest variant. Use when the photography is genuinely good.' }),
    h(M.ImageBlock, {
      bg: cream, src: IMG.flatlay, alt: 'Flat-lay of the Mate Latte with yerba mate and Lion’s Mane',
      line1: 'Everything your', line2: 'mornings need.',
      subtitle: 'Three functional ingredients',
      frame: 'bleed', imageFirst: true,
    }),
    Gap(40),

    h(Tag, { id: 'S1b', name: 'Image Block — inset, left-aligned, words first', note: 'Same content, completely different read. Vary the frame before anything else.' }),
    Gap(32),
    h(M.ImageBlock, {
      bg: cream, src: IMG.pour, alt: 'A Milonga stick poured into a glass',
      line1: 'Thirty seconds,', line2: 'start to finish.',
      body: 'Pour, whisk, drink. Hot or iced.',
      frame: 'inset', imageFirst: false, align: 'left', size: 26,
    }),
    Gap(40),

    h(Tag, { id: 'S2', name: 'Split Row — image one side, message the other', note: 'The cheapest way to break the centre axis. Flip the side between campaigns.' }),
    Gap(32),
    h(M.SplitRow, {
      bg: cream, src: IMG.iced, alt: 'Iced Mate Latte', inset: false, side: 'left',
      line1: 'Iced, too.', line2: '',
      body: 'Same scoop, cold water, ice. It does not clump.',
      cta: { label: 'Shop now', href: '#' },
    }),
    Gap(40),

    h(Tag, { id: 'S3', name: 'Process Strip — three steps', note: 'Three, never four. Four is a process; three is a ritual.' }),
    Gap(32),
    h(M.ProcessStrip, {
      bg: cream, layout: 'across',
      steps: [
        { mark: 'scoop', label: 'Pour', note: 'One scoop into your cup' },
        { mark: 'whisk', label: 'Whisk', note: 'Ten seconds, no lumps' },
        { mark: 'hot', label: 'Enjoy', note: 'Hot or over ice' },
      ],
    }),
    Gap(40),

    h(Tag, { id: 'S4', name: 'Stat Band — the numbers', note: 'Real, sourced figures only. Never one invented to fill the layout.' }),
    Gap(32),
    h(M.StatBand, {
      bg: cream,
      stats: [
        { figure: '100mg', caption: 'Natural caffeine' },
        { figure: '90', caption: 'Calories per scoop' },
        { figure: '30s', caption: 'Start to finish' },
      ],
    }),
    Gap(40),

    h(Tag, { id: 'B3', name: 'Compare Table', note: 'Our column gold, theirs a hairline. The colour is the argument.' }),
    Gap(32),
    h(M.CompareRows, {
      bg: cream, ourName: 'Mate Latte', theirName: 'Coffee',
      ourArt: h('img', { src: IMG.pouch, alt: '', style: { display: 'block', width: 150, height: 150, objectFit: 'contain', margin: '0 auto' } }),
      theirArt: h('img', { src: IMG.coffee, alt: '', style: { display: 'block', width: 132, height: 132, objectFit: 'contain', margin: '0 auto' } }),
      rows: [
        { label: 'Caffeine', ours: '100mg, from yerba mate', theirs: '100mg, from beans' },
        { label: 'Focus', ours: '500mg Lion’s Mane', theirs: '—' },
        { label: 'The feeling', ours: 'Smooth, sustained', theirs: 'Spike, then crash' },
      ],
    }),
    Gap(40),

    h(Tag, { id: 'R-C', name: 'Marquee Strip', note: 'Carries no information. Resets the eye between two heavy sections, for 40px.' }),
    Gap(24),
    h(M.Section, { bg: cream, pad: 'sm' }, h(M.Marquee, { bg: cream, text: 'Energy that thinks', repeat: 8 })),
    Gap(40),

    h(Tag, { id: 'R-A', name: 'Colour Band + S2 Pull Quote', note: 'The band wraps a WHOLE act. Inside it the contrast map flips.' }),
    h(M.ColorBand, { bg: ink, pad: 8 },
      h(M.Section, { bg: ink, pad: 'lg', align: 'center' },
        h(M.PullQuote, { bg: ink, stars: 5, size: 24,
          quote: '“A coffee latte without the acidity from coffee.”', attribution: 'Priscilla' })
      )
    ),
    Gap(40),

    h(Tag, { id: 'B1', name: 'Zig-Zag Rows — alternating sides', note: 'The alternation is the whole value. Past four rows, switch to one side.' }),
    Gap(32),
    h(M.Section, { bg: cream, pad: 'sm' },
      h(M.ZigZag, {
        bg: cream, rhythm: 'alternate', startSide: 'left',
        renderBullets: (b) => h(M.SpecPills, { bg: cream, items: b, variant: 'gold', align: 'left', size: 11 }),
        items: [
          { src: IMG.mate, alt: 'Yerba mate', line1: 'Yerba mate,', line2: 'the foundation.', bullets: ['Clean sustained energy'] },
          { src: IMG.lions, alt: 'Lion’s Mane', line1: 'Lion’s Mane,', line2: 'for a clear head.', bullets: ['Focus', 'Concentration'] },
        ],
      })
    ),
    Gap(40),

    h(Tag, { id: 'P2', name: 'Product Grid — 2-up', note: 'Equalised per row. One global height voids every short card.' }),
    Gap(32),
    h(M.Section, { bg: cream, pad: 'sm' },
      h(M.ProductGrid, {
        bg: cream, per: 2, carded: true,
        items: [
          { src: IMG.pouch, alt: 'Mate Latte', name: 'Mate Latte', note: 'Vanilla · 15 servings', price: '$29.99', badge: 'New' },
          { src: IMG.iced, alt: 'Iced', name: 'Iced ritual', note: 'Hot or iced', price: '$29.99' },
        ],
      })
    ),
    Gap(40),

    h(Tag, { id: 'S1c', name: 'Image Block on GOLD', note: 'The third ground. Beige titles, white body, forest buttons.' }),
    h(M.ColorBand, { bg: gold, pad: 0 },
      h(M.ImageBlock, {
        bg: gold, src: IMG.hand, alt: 'Pouring the Mate Latte',
        line1: 'The ritual,', line2: 'upgraded.',
        subtitle: 'Hot or iced, 30 seconds',
        frame: 'bleed', imageFirst: true, size: 28,
        cta: { label: 'Try it now', href: '#' },
      })
    ),
    Gap(40),

    h(Tag, { id: 'C1', name: 'CTA Band — the closer', note: 'The pills answer the last three objections before the click.' }),
    Gap(32),
    h(M.CtaBand, {
      bg: cream, label: 'Shop now', href: '#',
      pills: ['90 cal', '3g sugar', 'Dairy-free', 'Ready in 30 seconds'],
    }),
    Gap(40),

    h(M.Footer, { bg: cream, social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
