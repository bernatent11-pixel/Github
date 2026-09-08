// Demo: the three patterns ported from the previous Milonga email system,
// rebuilt on the current brand. Not a campaign — a reference render.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = { handFloat: '../public/product/pouch-hand-float.png' };

function NewBlocksDemo({ shopHref = '#' }) {
  const bg = 'forest';

  return h(M.EmailShell, { bg, textured: true },
    h(M.Header, { bg }),

    // 1 — the two-line headline: statement, then the turn.
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Headline, { bg, line1: 'Clarity,', line2: 'on tap.', size: 60, align: 'center' }),
      h('div', { style: { height: 16 } }),
      h('p', { style: { fontSize: 15, lineHeight: 1.55, margin: '0 auto', maxWidth: 430, color: '#fff' } },
        'Yerba mate with 500mg Lion’s Mane and 200mg L-Theanine — smooth energy, real focus, and an afternoon that doesn’t fall apart at 3pm.')
    ),

    h(M.BleedImage, { bg, src: IMG.handFloat, side: 'left', width: 0.8, overhang: 24, alt: '' }),

    // 2 — the spec pill cluster: the whole formula in two seconds.
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.SpecPills, { bg, items: [
        '100mg natural caffeine',
        '500mg Lion’s Mane',
        '200mg L-Theanine',
        'No cane sugar',
        'Organic · dairy-free',
      ]})
    ),

    // 3 — ingredient rows: ring icons, dose in the title, hairline separated.
    h(M.Section, { bg, pad: 'lg' },
      h(M.Headline, { bg, line1: 'What’s in it,', line2: 'and why it works.', size: 26 }),
      h('div', { style: { height: 10 } }),
      h(M.BenefitList, { bg, variant: 'ring', badgeSize: 54, size: 15, twoTone: false, items: [
        { mark: 'yerba-mate', title: 'Yerba mate', dose: '100mg caffeine',
          text: 'From the leaf itself, not synthetic. A gradual lift and a gradual return — closer to a long walk than an elevator.' },
        { mark: 'lions-mane', title: 'Lion’s Mane', dose: '500mg',
          text: 'A full dose of the mushroom extract, not the pinch most brands put on the label to earn the name.' },
        { mark: 'l-theanine', title: 'L-Theanine', dose: '200mg',
          text: 'The amino acid from tea leaves. It smooths the edges off caffeine — alertness without the jitter.' },
      ]})
    ),

    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Button, { bg, label: 'Try it now', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg, social: [
      { label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }, { label: 'Shop', href: '#' },
    ], rule: false })
  );
}
