// THEY SAID IT BETTER — the Mate Latte reviews showcase.
//
// Subject: They Said It Better Than We Could ⭐️
// Preview: Four Mate Latte reviews, word for word: the taste, the energy, and the switch from coffee.
//
// Three acts. The opener is one review at full size — Katya's, over two
// pouches raised to a blue sky — and fades into the forest band, where the
// other four customers follow as a stack of beige cards. The beige close
// turns belief into a basket with the real bundle prices.
//
// KLAVIYO: image 1 (reviews-showcase-1.jpg: the opener and the first review
// card, which rises into the photograph), then the live-text block
// (reviews-showcase-reviews.html: cards 2–4 and the See all reviews button),
// then image 3 (the close).
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
const CREAM = '#F0EFDF';
// Section 1→2 geometry: the sky gap between the forearms, and how far the
// first review card rises into the photograph's faded foot.
const HAND_GAP = { x: 312 };
const CARD_RISE = 104;

// Section 2's palette, in one place so the ground can be tried in another
// colour without touching the layout. GOLD TRIAL (Bernat, 2026-10-09): on a
// gold ground the cards cannot also be gold — gold on gold has no edge — so
// they turn beige; the photo's foot fades to gold, and the button takes the
// gold page's forest fill. The beige version was: ground #F0EFDF, cards in
// the gold gradient, fade rgba(240,239,223,…), button bg 'beige'.
const S2 = {
  ground: '#E3BC62',
  fade: 'rgba(227,188,98,',
  // Dark green cards (Bernat, 2026-10-09), so their type follows the
  // dark-green map: white headline and quote, gold name and stars.
  card: 'linear-gradient(180deg, #0A5A31 0%, #004D27 55%, #00401F 100%)',
  title: '#FFFFFF', name: '#E3BC62', stars: '#E3BC62', quote: '#FFFFFF',
  btnBg: 'gold',
};
const FONT = 'Gotham, Montserrat, sans-serif';

const REVIEWS = window.MATE_LATTE_REVIEWS;

const HERO = window.MATE_LATTE_HERO_REVIEW;

const SECTION_1_ALT =
  'Milonga. Five stars. ' + HERO.title + '. ' + HERO.quote.replace(/…/g, '') +
  ' ' + HERO.name + ', verified buyer. Two hands raise two Milonga Mate Latte ' +
  'pouches against a clear blue sky. Five stars. Amazing! Priscilla: ' +
  REVIEWS[0].quote.replace(/[“”]/g, '');

const SECTION_3_ALT =
  'Your turn. Create a moment worth savoring. A creamy vanilla mate latte made ' +
  'for the little moments that matter in your day. Enjoy smooth, steady energy ' +
  'and a clear, focused mind with a sense of calm. Your daily ritual is ready in ' +
  'just 30 seconds. Three Milonga Mate Latte pouches. Buy 1: $34.99, 15 servings, ' +
  '$2.33 a serving, or $24.49 subscribed. Buy 2: $62.98, save 10%, 30 servings, ' +
  '$2.10 a serving, or $44.09 subscribed. Buy 4: $118.96, save 15%, 60 ' +
  'servings, $1.98 a serving, or $83.27 subscribed. Subscribing takes an extra ' +
  '30% off. Buy now.';

// The forest paper, shared by the band and anything that has to match it.
const FOREST_PAPER = {
  backgroundColor: FOREST,
  backgroundImage: 'url(../public/brand/textures/tile-paper-forest.jpg)',
  backgroundSize: '320px 320px',
};

function ReviewsShowcase({ shopHref = '#shop' }) {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    // Bernat's mockup on the email: two pouches raised against a blue sky,
    // Katya's five-star review over the sky in cream, white wordmark centred
    // at the head.
    //
    // THE SKY IS EXTENDED 360px UPWARD (pouches-sky-tall.jpg, by
    // scripts/extend-sky.cjs, continuing the sky's own gradient). In the
    // original the right pouch starts 31% down, which left about 280 units for
    // a block that needs about 380; now it starts at 440.
    //
    // The sky measures about rgb(60,120,170) behind the type — white and
    // cream read at roughly 4.8:1 there, so no scrim, just a soft shadow.
    //
    // THE FOOT FADES TO FOREST, after the BREZ section Bernat sent: the arms
    // and the tree shade down into the email's dark green, so the photograph
    // turns into the reviews band rather than stopping on a hard edge. The
    // button sits on that green, centred under the picture.
    h('div', { style: { position: 'relative', zIndex: 0, background: S2.ground } },
      h('img', { src: '../public/product/pouches-sky-tall.jpg', alt: SECTION_1_ALT,
        style: { display: 'block', width: 600, height: 'auto' } }),
      h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 190,
        background: `linear-gradient(180deg, ${S2.fade}0) 0%, ${S2.fade}0.6) 40%, ${S2.fade}0.92) 72%, ${S2.ground} 100%)` } }),


      h('div', { style: { position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center' } },
        h(M.Logo, { tone: 'white', variant: 'primary', height: 76 })),

      h('div', { style: { position: 'absolute', top: 132, left: 40, right: 40,
        textShadow: '0 1px 3px rgba(0,30,60,0.35)' } },
        h('div', { style: { fontSize: 30, letterSpacing: '6px', lineHeight: 1, color: CREAM } }, '★★★★★'),
        h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 36, lineHeight: 1.05,
          textTransform: 'uppercase', color: CREAM, marginTop: 16, letterSpacing: '0.01em' } }, HERO.title),
        h('div', { style: { fontFamily: FONT, fontWeight: 400, fontSize: 16.5, lineHeight: 1.6,
          color: CREAM, marginTop: 14, maxWidth: 500 } }, HERO.quote),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 18, marginTop: 20 } },
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 22, color: '#FFFFFF' } }, HERO.name),
          h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 10, background: CREAM,
            borderRadius: 999, padding: '7px 16px 7px 8px', textShadow: 'none',
            boxShadow: '0 6px 16px rgba(0,30,60,0.28)' } },
            h('span', { style: { width: 24, height: 24, borderRadius: 999, background: '#111',
              color: '#FFFFFF', fontSize: 14, fontWeight: 900, display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center', lineHeight: 1 } }, '✓'),
            h('span', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 15, color: '#111' } }, 'Verified Buyer'),
          ),
        ),
      ),
    ),

    // ── 2 · MORE REVIEWS ──────────────────────────────────────────────────
    // The other customers as a stack of gold cards on beige — the BREZ stack.
    // THE FIRST CARD RISES OVER THE PHOTOGRAPH: it is pulled up CARD_RISE
    // units into the faded foot of the picture, so the stack starts on top of
    // the image rather than under it, which is what gives the section its
    // depth. Each card: the customer's own headline large and centred, the
    // name, five stars, the quote. On beige, gold is a fill and never type, so
    // everything on the cards is forest.
    h('div', { style: { position: 'relative', zIndex: 1, display: 'flow-root',
      background: S2.ground, padding: '0 28px 56px' } },
      h('div', { style: { marginTop: -CARD_RISE } },
        REVIEWS.map((r, i) => h('div', { key: i, style: {
          background: S2.card,
          borderRadius: 28, padding: '30px 30px 28px', marginTop: i ? 18 : 0,
          textAlign: 'center',
          // The first card's lift is cast UP onto the photograph it rises over;
          // below, every card keeps a tight 6-unit shadow. Klaviyo cuts 9
          // units under the first card onto flat beige, so nothing may reach
          // that far — and the live cards beneath carry no shadow at all.
          boxShadow: i === 0
            ? '0 -18px 22px rgba(0,26,13,0.22), 0 2px 4px rgba(0,53,27,0.14), inset 0 1px 0 rgba(255,255,255,0.14)'
            : '0 2px 4px rgba(0,53,27,0.14), inset 0 1px 0 rgba(255,255,255,0.14)' } },
          // balance, so a long headline breaks into two even rows instead of
          // a full line and a one-word stub.
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 24, lineHeight: 1.1,
            textTransform: 'uppercase', color: S2.title, letterSpacing: '0.01em', textWrap: 'balance' } },
            r.title.replace(/\s+!/, '!')),
          h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 11.5, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: S2.name, marginTop: 8 } }, r.name),
          h('div', { style: { fontSize: 16, letterSpacing: '4px', color: S2.stars, marginTop: 12 } }, '★★★★★'),
          h('div', { style: { fontFamily: FONT, fontStyle: 'italic', fontWeight: 500, fontSize: 15.5,
            lineHeight: 1.55, color: S2.quote, marginTop: 14 } }, r.quote),
        ))),

      h('div', { style: { marginTop: 36, textAlign: 'center' } },
        h(M.Button, { label: 'See all reviews', href: '#reviews', bg: S2.btnBg, size: 'lg' })),
    ),

    // ── 3 · THE CLOSE ─────────────────────────────────────────────────────
    // The buying section on the forest paper, so the email closes on its
    // darkest, richest ground. Dark-green map: gold eyebrow, white title and
    // body. The three bags, then the bundle ladder as raised cards — the
    // featured gold card keeps forest type, because gold-on-gold vanishes.
    h('div', { style: { ...FOREST_PAPER, padding: '60px 28px 52px', textAlign: 'center' } },
      h('div', { style: { fontFamily: FONT, fontWeight: 900, fontSize: 12,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD,
        marginBottom: 14 } }, 'Your turn'),
      h(M.Headline, { line1: 'Create a moment', line2: 'worth savoring.', bg: 'forest',
        size: 40, align: 'center', color: '#FFFFFF', line2Color: '#FFFFFF', italic: true }),
      h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16,
        lineHeight: 1.5, color: '#FFFFFF', maxWidth: 440, margin: '16px auto 0' } },
        'A creamy vanilla mate latte made for the little moments that matter in your day. Enjoy smooth, steady energy and a clear, focused mind with a sense of calm. Your daily ritual is ready in just 30 seconds.'),
      h('div', { style: { height: 30 } }),
      // Prices as Shopify shows them (The Original Mate Latte – Vanilla,
      // read 2026-10-09): 1 bag $34.99, 2 bags $62.98 (save 10%), 4 bags
      // $118.96 (save 15%); subscribed, each 30% less again.
      h(M.BundleOffer, {
        bg: 'forest', raised: true, imageWidth: '100%', plainFill: '#FFFFFF',
        image: { src: '../public/product/three-bags.png', alt: 'Three Milonga Mate Latte pouches, vanilla, 15 servings each' },
        // The Mate Mornings Club is set on the whole product in Shopify, so
        // its 30% applies to every bundle on top of the bundle saving — shown
        // small inside each card rather than as a fourth box.
        tiers: [
          { label: 'Buy 1', price: '$34.99', detail: '15 servings', unit: '$2.33 / serving', href: shopHref,
            sub: { price: '$24.49', note: 'Extra 30% off' } },
          { label: 'Buy 2', was: '$69.98', price: '$62.98', detail: '30 servings', unit: '$2.10 / serving', badge: 'Save 10%', href: shopHref,
            sub: { price: '$44.09', note: 'Extra 30% off' } },
          { label: 'Buy 4', was: '$139.96', price: '$118.96', detail: '60 servings', unit: '$1.98 / serving', badge: 'Save 15%', featured: true, href: shopHref,
            sub: { price: '$83.27', note: 'Extra 30% off' } },
        ],
      }),
    ),

    // The footer joins the close on forest, so the email ends on one ground.
    h(M.Footer, { bg: 'forest', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
