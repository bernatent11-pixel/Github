// MEET YOUR COFFEE'S COMPETITION — feed carousel.
//
// The email's comparison table is the piece that needed the most rethinking.
// A six-row table is a reference document; a slide is a glance. So the table
// becomes three slides of one contrast each, which is also how the argument
// actually lands in conversation.
//
// EVERY SLIDE IS A PHOTOGRAPH NOW, and that changes what the comparison can
// be. It was a block of type filling a green field; on a picture it has to be
// a caption — small, at the head of the frame, with the photograph carrying
// the rest. The order is still the argument: coffee first and dimmed, the
// Mate Latte second and brighter, because the last thing read is the thing
// remembered.
const M = window.MilongaEmailDS;
const h = React.createElement;
const S = (p, ...kids) => h(M.Slide, p, ...kids);

const FOREST = '#004D27';
const CREAM = '#F0EFDF';
const GOLD = '#E3BC62';
const HALO = '0 0 3px rgba(0,26,13,0.9), 0 1px 4px rgba(0,26,13,0.85), 0 3px 14px rgba(0,26,13,0.7), 0 8px 30px rgba(0,26,13,0.5)';

const IMG = {
  still: '../public/product/vs-stilllife-tall.jpg',
  cafe: '../public/product/vs-cafe-table.jpg',
  laptop: '../public/product/vs-laptop.jpg',
  balcony: '../public/product/vs-balcony.jpg',
};

// One contrast, as a caption on a photograph.
//
// The block runs at a third of the size it did on the flat slides — label 15,
// answers 25 and 27 against 18, 38 and 44 — because it is no longer the slide.
// It sits directly under the title and stops at about 40% of the frame, so
// the lower two thirds are photograph and nothing else.
function Versus(src, focus, scrim, label, coffee, mate) {
  const block = (who, text, ink, body, size) => h('div', null,
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 900, fontSize: 15,
      letterSpacing: '0.2em', textTransform: 'uppercase', color: ink, marginBottom: 9,
      textShadow: HALO } }, who),
    h('div', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500, fontSize: size,
      lineHeight: 1.22, color: body, maxWidth: 420, textShadow: HALO } }, text),
  );
  return h(M.Slide, { src, focus, scrim, scrimAt: 'top', align: 'top', padX: 46, padY: 52 },
    h(M.SlideTitle, { line1: label, size: 54, lead: 1.0, color: CREAM, halo: 'hold' }),
    h('div', { style: { height: 26 } }),
    block('Coffee', coffee, 'rgba(240,239,223,0.6)', 'rgba(240,239,223,0.72)', 25),
    h('div', { style: { height: 20, borderBottom: '1px solid rgba(227,188,98,0.45)', marginBottom: 20, maxWidth: 420 } }),
    block('Mate Latte', mate, GOLD, CREAM, 27),
  );
}

function CarouselCoffeeVsMate() {
  return h('div', null,

    // 1 · THE HOOK. The studio still life, rebuilt at 4:5 on more of its own
    // backdrop — see scripts/build-vs-stilllife.mjs. As shot it leaves about
    // 110 design units of clear green above the mug, less than this title
    // alone needs, and cropping to make room takes the foot off the pouch.
    // Rebuilt, the whole composition is there with 262 units clear above it,
    // and because the file is already 4:5 the frame shows all of it.
    S({ src: IMG.still, align: 'top', padX: 46, padY: 54 },
      h(M.SlideTitle, { line1: 'Meet your coffee’s', line2: 'competition.',
        size: 34, size2: 54, lead: 0.98, color: CREAM, color2: GOLD, halo: 'hold' }),
      h(M.SlideBody, { text: 'Turn your everyday morning cup into a better start to your day.',
        size: 19, color: '#FFFFFF', measure: 400, top: 22, halo: 'strong' }),
    ),

    Versus(IMG.cafe, 'center 30%', 0.34, 'Energy',
      'A spike, then a crash', 'Smooth, sustained energy'),
    Versus(IMG.laptop, 'center 24%', 0.34, 'Focus',
      'Awake, then scattered', 'Clear-headed & focused'),
    Versus(IMG.balcony, 'center top', 0.34, 'Calm',
      'Jittery, anxious, unsteady', 'Balanced, calm, and steady'),

    // 5 · THE ASK. Title, the three facts as a bulleted list under the gold
    // Milonga hand — the same bullet the site and the other closers use — and
    // the scoop shot taking the foot of the frame so the slide ends on the
    // product rather than on a colour.
    S({ bg: 'forest', textured: true, align: 'top', padX: 50, padY: 54 },
      h(M.SlideTitle, { line1: 'Upgrade your', line2: 'morning cup.',
        size: 46, lead: 0.98, color: CREAM, color2: GOLD }),
      h('div', { style: { marginTop: 22 } },
        ['100mg natural caffeine', 'Lion’s Mane + L-Theanine', 'Ready in 30 seconds'].map((t, i) =>
          h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 } },
            h('img', { src: '../public/logo/mark-gold.png', alt: '',
              style: { height: 23, width: 'auto', flex: 'none', display: 'block' } }),
            h('span', { style: { fontFamily: 'Gotham, Montserrat, sans-serif', fontWeight: 500,
              fontSize: 17, letterSpacing: '0.08em', textTransform: 'uppercase',
              lineHeight: 1.2, color: CREAM } }, t),
          )),
      ),
      h(M.SlideCta, { label: 'Shop the Mate Latte', bg: 'forest', align: 'left' }),
      h('img', { src: '../public/product/pouch-hand-pour-big.png',
        alt: 'A scoop of Milonga Mate Latte powder being poured into a glass beside the pouch',
        // Flush left, bleeding right: the pouch touches the edge of its own
        // file, so a negative offset would slice its front face off.
        style: { position: 'absolute', left: 0, bottom: 0, width: 620,
                 height: 'auto', display: 'block' } }),
    ),
  );
}
