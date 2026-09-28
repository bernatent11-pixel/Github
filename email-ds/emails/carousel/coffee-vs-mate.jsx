// MEET YOUR COFFEE'S COMPETITION — feed carousel.
//
// The email's comparison table is the piece that needed the most rethinking.
// A six-row table is a reference document; a slide is a glance. So the table
// becomes three slides of one contrast each, which is also how the argument
// actually lands in conversation.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

function Versus(label, coffee, mate, idx) {
  const row = (who, text, accent) => h('div', { style: { flex: '1 1 0', textAlign: 'center' } },
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900, fontSize: 17,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 14 } }, who),
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500, fontSize: 27,
      lineHeight: 1.34, color: accent === '#E3BC62' ? '#F0EFDF' : 'rgba(240,239,223,0.72)' } }, text),
  );
  return h(M.Slide, { bg: 'forest', textured: true, align: 'center', padX: 46, index: idx },
    h(M.SlideEyebrow, { text: label, align: 'center' }),
    h('div', { style: { height: 26 } }),
    h('div', { style: { display: 'flex', gap: 30, alignItems: 'flex-start' } },
      row('Coffee', coffee, 'rgba(240,239,223,0.5)'),
      h('div', { style: { width: 1, alignSelf: 'stretch', background: 'rgba(227,188,98,0.3)' } }),
      row('Mate Latte', mate, '#E3BC62'),
    ),
  );
}

function CarouselCoffeeVsMate() {
  return h('div', null,

    S({ bg: 'beige', textured: true, align: 'center', padX: 52, logo: true, logoHeight: 60, index: '1/5' },
      h(M.SlideTitle, { line1: 'Meet your coffee’s', line2: 'competition.',
        size: 48, lead: 0.94, align: 'center', color: '#004D27', color2: '#004D27' }),
      h(M.SlideBody, { text: 'Same morning cup. A completely different afternoon.',
        size: 22, color: '#000000', align: 'center', measure: 440, top: 24 }),
    ),

    Versus('The feeling', 'A spike, then a crash', 'Steady, even energy', '2/5'),
    Versus('Focus', 'Sharp, then scattered', 'Clear and sustained', '3/5'),
    Versus('Calm', 'Jittery on an empty stomach', 'L-Theanine balances it', '4/5'),

    S({ bg: 'forest', textured: true, align: 'center', padX: 54, logo: true,
        logoTone: 'gold', logoHeight: 60, index: '5/5' },
      h(M.SlideTitle, { line1: 'Upgrade your', line2: 'morning cup.',
        size: 48, lead: 0.96, align: 'center', color: '#F0EFDF', color2: '#E3BC62' }),
      h(M.SlideBody, { text: '100mg natural caffeine\nLion’s Mane + L-Theanine\nReady in 30 seconds',
        size: 20, align: 'center', measure: 420, top: 24 }),
      h(M.SlideCta, { label: 'Shop the Mate Latte', bg: 'forest', align: 'center' }),
    ),
  );
}
