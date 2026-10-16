// FOCUSED MIND, ENERGIZED, ON THE GO — the Lion's Mane cans, a lifestyle
// email about drinking them on the move.
//
// Copy is Bernat's, word for word (title, paragraph, button). No build
// record yet. Further sections to follow; for now the opener and the footer.
const M = window.MilongaEmailDS;
const h = React.createElement;

const FOREST = '#004D27';
const GOLD = '#E3BC62';
const FONT = 'Gotham, Montserrat, sans-serif';

// The fridge photograph is 1333 x 2000, drawn 600 wide: 900 units tall.
const PHOTO_H = 900;
// Room above the photograph. The hand enters the frame about 170 units
// down and the type needs about 330, so the fridge is extended HEAD units
// upward from its own top rows (can-acai-mint-fridge-tall.jpg) and a dark
// grade in the photograph's own warm near-black — not green (Bernat) —
// holds the type and lets go above the hand.
const HEAD = 190;
// The button: under the can, on the glass of the shelf it was lifted from.
const CTA_TOP = HEAD + 790;

const SECTION_1_ALT =
  'Milonga. Focused mind, energized, on the go. Find your flow and feel ready ' +
  'for whatever the day brings. Smooth, balanced energy to help you feel ' +
  'focused, clear-headed, and in your element. A hand lifts a can of Milonga ' +
  'Yerba Mate in Açaí Mint from a fridge shelf between other cans. Get it now.';

function OnTheGo({ shopHref = '#shop' }) {
  const title = { fontFamily: FONT, fontWeight: 900, fontSize: 44, lineHeight: 1.02,
    letterSpacing: '0.01em', textTransform: 'uppercase', color: '#FFFFFF' };
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    h('div', { style: { position: 'relative', height: HEAD + PHOTO_H, overflow: 'hidden', background: '#0D0B09' } },
      h('img', { src: '../public/product/can-acai-mint-fridge-tall.jpg', alt: SECTION_1_ALT,
        style: { position: 'absolute', top: 0, left: 0, display: 'block', width: 600, height: 'auto' } }),
      // The dark grade: the fridge's own warm near-black at the head, clear
      // by the hand. The foot still darkens so the button sits on dark glass.
      h('div', { style: { position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(13,11,9,0.94) 0%, rgba(13,11,9,0.86) 12%, rgba(13,11,9,0.66) 22%, rgba(13,11,9,0.32) 29%, rgba(13,11,9,0) 36%, rgba(0,53,27,0) 82%, rgba(0,53,27,0.55) 91%, rgba(0,45,23,0.85) 100%)' } }),
      h('div', { style: { position: 'absolute', top: 30, left: 36, right: 36, textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,26,13,0.6), 0 1px 2px rgba(0,26,13,0.5)' } },
        h(M.Logo, { tone: 'gold', variant: 'primary', height: 70 }),
        h('div', { style: { marginTop: 20 } },
          h('div', { style: title }, 'Focused mind'),
          h('div', { style: title }, 'energized'),
          h('div', { style: { ...title, color: GOLD, fontStyle: 'italic', fontWeight: 800, marginTop: 2 } }, 'on the go')),
        h('div', { style: { fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.5,
          color: '#FFFFFF', margin: '14px auto 0', maxWidth: 480 } },
          'Find your flow and feel ready for whatever the day brings. Smooth, balanced energy to help you feel focused, ',
          h('span', { style: { whiteSpace: 'nowrap' } }, 'clear-headed,'), ' and in your element.'),
      ),
      h('div', { style: { position: 'absolute', top: CTA_TOP, left: 0, right: 0, textAlign: 'center' } },
        h('div', { style: { display: 'inline-block', borderRadius: 999,
          boxShadow: '0 10px 24px rgba(0,26,13,0.5), 0 2px 6px rgba(0,26,13,0.4)' } },
          h(M.Button, { label: 'Get it now', href: shopHref, bg: 'forest', size: 'lg' }))),
    ),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] }),
  );
}
