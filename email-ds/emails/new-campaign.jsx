// NEW CAMPAIGN — section 1.
//
// A whole photograph carrying the wordmark, the title, a subtitle and the CTA.
// Copy below is PLACEHOLDER: the campaign has not been named yet, so this is
// standing in to prove the layout. Swap it when the brief lands.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  flatlay: '../public/product/flatlay-ingredients.jpg',
  pour: '../public/product/mind-body-connected.jpg',
  iced: '../public/product/pouch-iced-botanical.png',
  kitchen: '../public/product/kitchen-morning.jpg',
};

function Label(t) {
  return h('div', { style: { background: '#00351B', padding: '12px 30px',
    fontFamily: M.fontStack, fontWeight: 900, fontSize: 11, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: '#E3BC62' } }, t);
}
function Gap(n) { return h('div', { style: { height: n, lineHeight: 0, fontSize: 0 } }); }

function NewCampaign() {
  return h(M.EmailShell, { bg: 'beige' },

    Label('Section 1 · full image — tall frame, type low'),
    h(M.T6FullImage, {
      // Source is 1.5 tall; the frame takes 1.3, so the crop trims top and
      // bottom. Aimed a little high to keep the window light and the pouch,
      // and to leave the quiet counter for the type.
      src: IMG.kitchen, focus: 'center 34%',
      alt: 'A hand lifting the Milonga Mate Latte from a sunlit kitchen counter',
      eyebrow: 'Energy that thinks',
      line1: 'Everything your', line2: 'mornings need.',
      subtitle: 'Clean caffeine, a clear head and a calm start — in thirty seconds, hot or iced.',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      legal: '15 servings · 90 cal · 3g sugar per scoop',
      ratio: 1.46, at: '78%',
    }),
    Gap(44),

    Label('Same section, a different photograph — nothing moves'),
    h(M.T6FullImage, {
      src: IMG.pour,
      alt: 'A Milonga stick poured into a glass of Mate Latte',
      eyebrow: 'The morning ritual',
      line1: 'Thirty seconds,', line2: 'start to finish.',
      subtitle: 'Pour, whisk, drink. It does not clump and it does not need anything else.',
      cta: { label: 'Try it now', href: '#' },
      ratio: 1.3, at: '78%', focus: 'center 30%',
    }),
    Gap(44),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
