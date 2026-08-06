// Campaign: "Why we made it" — the educational follow-up to the Mate Latte
// launch. Short, inspirational, one problem stated plainly.
// ACT 1 header (loud) · ACT 2 body (education) · ACT 3 CTA (price/offer).
// Beige email that resolves into dark green for the close, via the canopy.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  handPour: '../public/product/pouch-hand-pour.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function WhyWeMadeIt({ shopHref = '#' }) {
  const bg = 'beige';
  const close = 'forest';

  return h(M.EmailShell, { bg },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Hero, {
      bg,
      eyebrow: 'Why we made it',
      title: 'Energy shouldn’t cost you your afternoon',
      titleAccentPart: 'your afternoon',
      titleSize: 36,
      body: 'Every morning came down to the same trade: enough caffeine to actually wake up, or few enough jitters to think straight. Never both. We wanted a third option — so we made one.',
    }),
    h(M.Divider, { bg, variant: 'mark', gap: 10 }),

    // ═══ ACT 2 · BODY ═══

    // The problem, side by side.
    h(M.Section, { bg, pad: 'lg' },
      h(M.SectionHeading, {
        bg,
        title: 'The trade-off nobody asked for',
        subtitle: 'It was never the coffee’s fault',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.VersusBlock, {
        bg,
        left: {
          label: 'The old routine',
          icon: 'clock',
          points: [
            'A big hit of caffeine, all at once',
            'Jitters somewhere around cup two',
            'Flat by 2pm',
            'So you make another',
          ],
        },
        right: {
          label: 'The Milonga way',
          icon: 'leaf',
          points: [
            '100mg of caffeine, from yerba mate',
            '200mg of L-Theanine alongside it',
            'Even through the afternoon',
            'One cup does the morning',
          ],
        },
      })
    ),

    // The same story as a picture.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        eyebrow: 'The whole point',
        title: 'What smooth looks like',
        align: 'center',
      }),
      h('div', { style: { height: 22 } }),
      h(M.EnergyCurve, {
        bg,
        height: 190,
        xLabels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm'],
        series: [
          { label: 'Coffee', points: [10, 88, 96, 52, 20, 11] },
          { label: 'Mate Latte', highlight: true, points: [12, 56, 70, 72, 66, 50] },
        ],
      }),
      h('div', { style: { height: 12 } }),
      h('div', {
        style: {
          fontSize: 10.5, lineHeight: 1.6, textAlign: 'center', opacity: 0.65,
        },
      }, 'Illustrative — how the ritual is meant to feel, not a measurement.')
    ),

    // Why "Milonga".
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.TextImage, {
        bg,
        layout: 'side',
        imageSide: 'right',
        eyebrow: 'About the name',
        title: 'Named after a dance',
        text: 'La milonga is the dance our grandparents met on — live music, late nights, everyone still going long after the band should have stopped. That is the energy we wanted in a cup: awake, warm, and in no rush to end.',
        image: { src: IMG.handPour, alt: 'A scoop of Milonga poured into a glass', cutout: true },
      })
    ),

    // Three ingredients, one line each — the answer to the problem above.
    h(M.Section, { bg, pad: 'lg', rule: true },
      h(M.SectionHeading, {
        bg,
        title: 'So we built it backwards',
        subtitle: 'Start with the feeling, then the formula',
        align: 'center',
      }),
      h('div', { style: { height: 22 } }),
      h(M.BenefitList, { bg, badgeSize: 52, size: 18, twoTone: false, items: [
        { mark: 'yerba-mate', title: 'Yerba mate for the lift', text: '100mg of caffeine, the way South America has taken it for centuries.' },
        { mark: 'l-theanine', title: 'L-Theanine to steady it', text: '200mg, so the lift arrives calm instead of sharp.' },
        { mark: 'lions-mane', title: 'Lion’s Mane for the head', text: '500mg, a full dose — not a pinch for the label.' },
      ]})
    ),

    // The colour change reads as a scene, not an edge.
    h(M.ForestScene, { from: bg, to: close }),

    // ═══ ACT 3 · CTA ═══
    h(M.Section, { bg: close, pad: 'lg' },
      h(M.SectionHeading, {
        bg: close,
        title: 'Start tomorrow morning',
        subtitle: 'One scoop · 30 seconds · hot or iced',
        align: 'center',
      }),
      h('div', { style: { height: 24 } }),
      h(M.PriceBlock, {
        bg: close,
        options: [
          {
            label: 'One-time',
            price: '$29.99',
            detail: '15 servings',
            unit: '$2.00 per serving',
            cta: { label: 'Buy now', href: shopHref },
          },
          {
            label: 'Subscribe & Save',
            was: '$29.99',
            price: '$25.49',
            suffix: '/mo',
            detail: '15 servings monthly · cancel anytime',
            unit: '$1.70 per serving',
            badge: 'Save 15%',
            featured: true,
            cta: { label: 'Subscribe & Save', href: shopHref },
          },
        ],
      })
    ),

    h(M.Footer, { bg: close, social: SOCIAL })
  );
}
