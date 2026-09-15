// Campaign: "Meet Your Coffee's Competition" — comparison, then reviews.
// Two acts only. ACT 1 makes the argument against coffee; ACT 2 hands the
// argument to customers and gets out of the way.
//
// Dark green ground: the gold comparison column and the gold review cards both
// need a dark field to read as the loud thing on the page. Copy from Bernat's
// build brief; specs from .design-sync/brand/milonga-product.md.
//
// NOTE ON EXPORT: the review cards must ship as LIVE TEXT, not baked into the
// image. See refine/coffee-vs-mate-reviews.html and the note in ReviewCard.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  pouch: '../public/product/pouch-botanical.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

const GOLD = '#E3BC62';

// The coffee side deliberately has no caffeine figure. It varies by cup, and a
// number we cannot source is worse than an honest dash.
const ROWS = [
  { label: 'Caffeine', ours: '100mg, natural from yerba mate', theirs: 'From coffee beans' },
  { label: 'Focus', ours: '500mg Lion’s Mane', theirs: '—' },
  { label: 'Calm', ours: '200mg L-Theanine', theirs: '—' },
  { label: 'The feeling', ours: 'No jitters or heavy crash', theirs: 'Can bring jitters and a crash' },
  { label: 'Ready in', ours: '30 seconds, hot or iced', theirs: '—' },
  { label: 'Per cup', ours: 'About $2 at home', theirs: '$5–7 at the café' },
  { label: 'Also', ours: 'Dairy-free, no artificial sweeteners, 90 calories', theirs: '—' },
];

// Trimmed excerpts, never reworded. Four of the five full reviews contain
// wording the voice rules ban from anything a customer sees — "game changer",
// "caffeine boost", "addiction", and a teeth-staining line that reads as a
// health claim — so these are the cleared cuts.
const REVIEWS = [
  { name: 'Katya', quote: '“Never thought I’d trade in my coffee… I drink mine iced with coconut milk and love it.”' },
  { name: 'Sam', quote: '“Tastes super clean and doesn’t give me any jitters or crash afterwards. I love how easy and quick it is to make!!”' },
  { name: 'Jose P.', quote: '“Not too sweet, but still tastes amazing.”' },
  { name: 'M.L.', quote: '“Smooth, creamy, and balanced without being overly sweet.”' },
  { name: 'Priscilla', quote: '“…it genuinely doesn’t need anything else.”' },
];

function CoffeeVsMate({ shopHref = '#' }) {
  const bg = 'forest';

  return h(M.EmailShell, { bg, textured: true },

    // ═══ MASTHEAD ═══
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Logo, { tone: 'gold', variant: 'primary', size: 54 })
    ),

    // ═══ ACT 1 · THE COMPARISON ═══
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Headline, { bg, line1: 'Meet your coffee’s', line2: 'competition.', size: 32, align: 'center' }),
      h('div', { style: { height: 12 } }),
      h('div', { style: {
        fontFamily: M.fontStack, fontWeight: 900, fontSize: 11.5, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: GOLD, lineHeight: 1.4,
      } }, 'Same morning ritual. A better feeling after.'),
      h('div', { style: { height: 16 } }),
      h('div', { style: {
        fontFamily: M.fontStack, fontSize: 14.5, lineHeight: 1.6, color: '#FFFFFF',
        maxWidth: 460, margin: '0 auto',
      } }, 'Coffee gets you up. It also brings the jitters and the 3pm crash. The Mate Latte keeps your ritual and upgrades how it feels, in 30 seconds, hot or iced.')
    ),

    h(M.Section, { bg, pad: 'md' },
      h(M.CompareRows, {
        bg, rows: ROWS,
        ourName: 'Mate Latte', theirName: 'Coffee',
        // The product is photographed; coffee is a hairline glyph. The
        // asymmetry is the argument — one of these is a real thing you own.
        ourArt: h('img', {
          src: IMG.pouch, alt: '',
          style: { display: 'block', width: 104, height: 104, objectFit: 'contain', margin: '0 auto' },
        }),
        theirArt: h('div', {
          style: { width: 104, height: 104, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        }, h(M.Icon, { name: 'coffee', size: 62, color: 'rgba(255,255,255,0.5)' })),
      })
    ),

    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.Button, { bg, label: 'Upgrade my morning cup', href: shopHref, size: 'lg' })
    ),

    // ═══ ACT 2 · THE REVIEWS ═══
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Headline, { bg, line1: 'The reviews', line2: 'are in. ⭐', size: 32, align: 'center' }),
      h('div', { style: { height: 12 } }),
      h('div', { style: {
        fontFamily: M.fontStack, fontWeight: 900, fontSize: 11.5, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: GOLD, lineHeight: 1.4,
      } }, 'Every review so far is five stars. Here’s what they said.'),
      h('div', { style: { height: 14 } }),
      h('div', { style: {
        fontFamily: M.fontStack, fontSize: 14, lineHeight: 1.6, color: '#FFFFFF',
        maxWidth: 440, margin: '0 auto',
      } }, 'Real reviews from real customers, straight from our product page. Trimmed for length, never reworded.'),
      h('div', { style: { height: 24 } }),
      h('div', { style: { textAlign: 'left' } },
        h(M.Reviews, { bg, reviews: REVIEWS })
      ),
      h('div', { style: { height: 28 } }),
      h(M.Button, { bg, label: 'Get my better morning', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg, social: SOCIAL })
  );
}
