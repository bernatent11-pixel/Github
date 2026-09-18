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
  icedHand: '../public/product/iced-in-hand.jpg',
  calloutBg: '../public/product/iced-callout-bg.jpg',
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
      line1: 'Set the tone', line2: 'for your day.',
      subtitle: 'Before the day gets busy, take a moment to slow down. Clean caffeine, a clear head and a calm start, in thirty seconds, hot or iced.',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      legal: '15 servings · 90 cal · 3g sugar per scoop',
      ratio: 1.46, at: '84%',
    }),
    Gap(44),

    Label('Section 2 · statement on a photograph'),
    h(M.T7Statement, {
      // The upper third of this shot measures rgb(219,190,163) — a light warm
      // beige — so the ink is forest, not cream, and the wash LIFTS the
      // picture rather than darkening it.
      src: IMG.icedHand,
      alt: 'A hand holding a jar of iced Milonga Mate Latte',
      line1: 'For everything your', line2: 'day throws at you.',
      text: 'Work, errands, workouts, and whatever comes next.',
      ink: 'dark', anchor: 'top', wash: 0.2,
      size: 38, ratio: 1.26, focus: 'center 34%',
    }),
    Gap(44),

    Label('Section 3 · callout diagram'),
    h(M.T8Callouts, {
      src: IMG.calloutBg,
      alt: 'A hand holding a jar of iced Milonga Mate Latte, with its benefits listed alongside',
      line1: 'Everything a morning', line2: 'asks of you.',
      intro: 'One scoop of yerba mate, Lion’s Mane and L-Theanine — working while you get on with it.',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      // Must match iced-callout-bg.jpg's own 1200x1440 aspect.
      ratio: 1.2,
      // Line lengths are per row so each one lands on the glass rather than
      // stopping on a shared vertical.
      items: [
        { mark: 'yerba-mate', label: 'Clean, sustained energy', note: 'For walking into work already on your second gear.', line: 74 },
        { mark: 'lions-mane', label: 'Mental clarity & focus', note: 'For when your brain clocks in before you do.', line: 80 },
        { mark: 'l-theanine', label: 'Balanced calm', note: 'For keeping your cool when your boss starts the day with “Got a minute?”', line: 70 },
        { mark: 'check', label: 'No jitters, no crash', note: 'For when your inbox is already testing you at 8:47 AM.', line: 66 },
        { mark: 'leaf', label: 'Antioxidant-rich', note: 'For giving your morning routine a little extra goodness.', line: 68 },
      ],
    }),
    Gap(44),

    h(M.Footer, { bg: 'beige', social: [{ label: 'Instagram', href: '#' }, { label: 'Shop', href: '#' }] })
  );
}
