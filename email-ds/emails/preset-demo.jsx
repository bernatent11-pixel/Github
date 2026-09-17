// THE SAME EMAIL, THREE TIMES — once in each preset.
// Identical content, identical sections, identical palette. Only the
// proportions change: type size, air, image framing, alignment. This file
// exists to prove that one section kit produces three different-looking
// campaigns, so a month of emails never reads as one template.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  pour: '../public/product/mind-body-connected.jpg',
  iced: '../public/product/pouch-iced-botanical.png',
  mate: '../public/product/ing-yerba-mate.png',
  lions: '../public/product/ing-lions-mane.png',
};

function Tag(name, note) {
  return h('div', { style: { background: '#004D27', padding: '16px 30px', borderTop: '3px solid #E3BC62' } },
    h('div', { style: { fontFamily: M.fontStack, fontWeight: 900, fontSize: 13, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: '#E3BC62' } }, name),
    h('div', { style: { fontFamily: M.fontStack, fontSize: 12.5, lineHeight: 1.5, color: '#FFFFFF',
      opacity: 0.85, marginTop: 5 } }, note)
  );
}
function Gap(n) { return h('div', { style: { height: n, lineHeight: 0, fontSize: 0 } }); }

// One email's worth of content, rendered under whichever preset is in force.
function Body(bg) {
  return [
    h(M.HeroBanner, { key: 'hero', bg,
      line1: 'Everything your', line2: 'mornings need.',
      eyebrow: 'Three functional ingredients',
      body: 'Clean caffeine from yerba mate, Lion’s Mane for a clear head, and L-Theanine to keep the whole thing smooth.',
      cta: { label: 'Shop now', href: '#' },
    }),
    Gap(32),
    h(M.ImageBlock, { key: 'img', bg,
      src: IMG.flatlay, alt: 'The Mate Latte with yerba mate and Lion’s Mane',
      line1: 'Thirty seconds,', line2: 'start to finish.',
      subtitle: 'Hot or iced',
      body: 'Pour, whisk, drink. It does not clump and it does not need anything else.',
    }),
    Gap(32),
    h(M.SplitRow, { key: 'split', bg, src: IMG.iced, alt: 'Iced Mate Latte', inset: false, side: 'left',
      line1: 'Iced, too.',
      body: 'Same scoop, cold water, ice.',
      cta: { label: 'Try it', href: '#' },
    }),
    Gap(32),
    h(M.CtaBand, { key: 'cta', bg, label: 'Shop now', href: '#',
      pills: ['90 cal', '3g sugar', 'Dairy-free'] }),
    Gap(40),
  ];
}

function PresetDemo() {
  const bg = 'beige';
  return h(M.EmailShell, { bg },

    Tag('Preset · DENSE', 'Calibrated to the MUD\\WTR read — 15.3 images an email, 10.3 full-bleed, tight air, short copy. Pictures do the talking.'),
    Gap(24),
    h(M.PresetProvider, { preset: 'dense' }, Body(bg)),

    Tag('Preset · SYSTEMATIC', 'Calibrated to the Athletic Brewing read — strict grid, half the images inset as figures, heavy buttons. The safe default.'),
    Gap(24),
    h(M.PresetProvider, { preset: 'systematic' }, Body(bg)),

    Tag('Preset · EDITORIAL', 'Calibrated to the Nowadays read — 20px body, fewest images, most words, left-aligned. The only brand of the six whose emails survive images off.'),
    Gap(24),
    h(M.PresetProvider, { preset: 'editorial' }, Body(bg)),

    h(M.Footer, { bg, social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
