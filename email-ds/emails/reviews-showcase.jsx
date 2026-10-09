// THEY SAID IT BETTER — the Mate Latte reviews showcase.
//
// Subject: They Said It Better Than We Could ⭐️
// Preview: Four Mate Latte reviews, word for word: the taste, the energy, and the switch from coffee.
//
// Three acts. The opener hands the argument over ("don't take our word for
// it"), the forest band IS the argument — one loud pull quote, then the four
// reviews as gold cards — and the beige close turns belief into a basket with
// the real bundle prices.
//
// The reviews come from mate-latte-reviews.js, which records what was left
// out and why (a team member's review, and three trimmed sentences). The
// cards ship to Klaviyo as LIVE TEXT — scripts/make-reviews-html.mjs builds
// that block from the same file — never as part of an image.
//
// No build record exists for this campaign yet, so it will not reach the
// performance report until one is created.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const FONT = 'Gotham, Montserrat, sans-serif';

const REVIEWS = window.MATE_LATTE_REVIEWS;

const SECTION_1_ALT =
  'Milonga. Straight from our product page. Don’t take our word for it. We could ' +
  'tell you it’s creamy, smooth, and the easiest switch from coffee you’ll make. ' +
  'We’d rather let the people drinking it say so. A smiling man holds the Milonga ' +
  'Mate Latte pouch up to the camera outdoors under a pale sky. Try the Mate Latte.';

// The forest paper, shared by the band and anything that has to match it.
const FOREST_PAPER = {
  backgroundColor: FOREST,
  backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
  backgroundSize: '320px 320px',
};

function ReviewsShowcase({ shopHref = '#shop' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    // A customer-looking moment rather than a product shot: a man holding the
    // pouch up to the camera, mid-smile. The top fifth of the file is pale
    // sky (it measures about 200 of 255), so the ink is forest and the head of
    // the frame gets a cream LIFT rather than a scrim — dark type on a light
    // picture, kept bright.
    //
    // THE FRAME IS TALLER THAN THE FILE (1.66 against 1.5). It binds on
    // height, scales the picture up, and moves the pouch down from about 270
    // design units to 300 — which is the room the wordmark, title and line
    // need above it. The cost is about 30 units of width off each side.
    h(M.T9Story, {
      src: '../public/product/mate-pouch-man.jpg',
      alt: SECTION_1_ALT,
      logo: true,
      logoTone: 'green',
      logoHeight: 64,
      align: 'center',
      eyebrow: 'Straight from our product page',
      line1: 'Don’t take',
      line2: 'our word for it.',
      line1Color: FOREST,
      line2Color: FOREST,
      paras: ['We could tell you it’s creamy, smooth, and the easiest switch from coffee you’ll make. We’d rather let the people drinking it say so.'],
      cta: { label: 'Try the Mate Latte', href: shopHref, arrow: true },
      at: '88%',
      ctaAlign: 'center',
      ratio: 1.66,
      size: 40,
      size2: 40,
      titleLead: 1.0,
      top: 22,
      padLeft: 40,
      padRight: 40,
      measure: 440,
      ink: 'dark',
      scrim: 0.5,
      scrimAt: 'top',
      halo: 'soft',
    }),

    // ── 2 · THE REVIEWS ───────────────────────────────────────────────────
    // The education act inverts the page onto forest paper, so the gold cards
    // are the loudest objects in the email. One loud moment first — a pull
    // quote, the line a skimmer takes away — then all four cards in a 2-up
    // grid of equal heights, each carrying the customer's own headline.
    //
    // On dark green the titles are white and gold means one thing: the cards.
    h('div', { style: { ...FOREST_PAPER, padding: '60px 28px 56px' } },
      h(M.PullQuote, { bg: 'forest', stars: 5, size: 27,
        quote: '“The taste was what sold me first.”',
        attribution: 'Bryant, on the Mate Latte' }),

      h('div', { style: { textAlign: 'center', marginTop: 48 } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD,
          marginBottom: 14 } }, 'Every review so far: five stars'),
        h(M.Headline, { line1: 'Real reviews,', line2: 'word for word.', bg: 'forest',
          size: 34, align: 'center', color: '#FFFFFF', line2Color: '#FFFFFF', italic: true }),
      ),

      h('div', { style: { marginTop: 30 } },
        h(M.Reviews, { bg: 'forest', reviews: REVIEWS, layout: 'grid', gap: 14 }),
      ),

      // What the four keep coming back to, in their own vocabulary — every
      // pill is a phrase from one of the reviews above, nothing added.
      h('div', { style: { marginTop: 34, textAlign: 'center' } },
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 11.5,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFFFFF',
          opacity: 0.8, marginBottom: 12 } }, 'What they keep mentioning'),
        h(M.SpecPills, { bg: 'forest', align: 'center', variant: 'gold', size: 11.5,
          items: ['Creamy & smooth', 'No jitters', 'Steady energy', 'Easy to make'] }),
      ),
    ),

    // ── 3 · THE CLOSE ─────────────────────────────────────────────────────
    // Beige, dark green type only. The pouch and the real bundle ladder from
    // the product file: one bag, two at 10% off, three at 15% off, and an
    // extra 15% for subscribing. One button.
    h('div', { style: { padding: '60px 28px 48px', textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: FOREST,
        marginBottom: 14 } }, 'Your turn'),
      h(M.Headline, { line1: 'Taste it', line2: 'for yourself.', bg: 'beige',
        size: 40, align: 'center', italic: true }),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
        lineHeight: 1.5, color: '#12331F', maxWidth: 440, margin: '16px auto 0' } },
        '100mg natural caffeine, 500mg Lion’s Mane and 200mg L-Theanine in a creamy vanilla latte. 90 calories, 3g sugar, ready in 30 seconds.'),
      h('div', { style: { height: 30 } }),
      h(M.BundleOffer, {
        bg: 'beige',
        image: { src: '../public/product/pouch-floating.png', alt: 'The Milonga Mate Latte pouch, vanilla, 15 servings' },
        tiers: [
          { label: 'Buy 1', price: '$29.99', detail: '15 servings', unit: '$2.00 / serving', href: shopHref },
          { label: 'Buy 2', was: '$59.98', price: '$53.98', detail: '30 servings', unit: '$1.80 / serving', badge: 'Save 10%', href: shopHref },
          { label: 'Buy 3', was: '$89.97', price: '$76.47', detail: '45 servings', unit: '$1.70 / serving', badge: 'Save 15%', featured: true, href: shopHref },
        ],
        subscribe: {
          label: 'Subscribe & save', was: '$29.99', price: '$25.49', suffix: '/ bag',
          detail: 'An extra 15% off every delivery', badge: 'Extra 15%',
          cta: { label: 'Shop the Mate Latte', href: shopHref },
        },
      }),
    ),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
