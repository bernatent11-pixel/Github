// EXPORT — the two finished sections, no labels, nothing else.
// Rendered at 1200px (2x of the 600px email) and cut into one file per
// section, so each drops into its own Klaviyo image block.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  kitchen: '../public/product/kitchen-morning.jpg',
  callout: '../public/product/iced-callout-flat.jpg',
};

function NewCampaignExport() {
  return h(M.EmailShell, { bg: 'beige' },

    h(M.T6FullImage, {
      src: IMG.kitchen, focus: 'center 34%',
      alt: 'A hand lifting the Milonga Mate Latte from a sunlit kitchen counter',
      eyebrow: 'Energy that thinks',
      line1: 'Set the tone', line2: 'for your day.',
      subtitle: 'Before the day gets busy, take a moment to slow down. Clean caffeine, a clear head and a calm start, in thirty seconds, hot or iced.',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      legal: '15 servings · 90 cal · 3g sugar per scoop',
      ratio: 1.46, at: '84%',
    }),

    h(M.T8Callouts, {
      src: IMG.callout,
      alt: 'A hand holding a jar of iced Milonga Mate Latte, with its benefits listed alongside',
      eyebrow: 'Made to keep up',
      line1: 'For everything your', line2: 'day throws at you.',
      intro: 'Work, errands, workouts, and whatever comes next.',
      cta: { label: 'Shop the Mate Latte', href: '#' },
      ratio: 1.2,
      items: [
        { mark: 'yerba-mate', label: 'Clean, sustained energy', note: 'For walking into work already on your second gear.', line: 92 },
        { mark: 'lions-mane', label: 'Mental clarity & focus', note: 'For when your brain clocks in before you do.', line: 98 },
        { mark: 'l-theanine', label: 'Balanced calm', note: 'For keeping your cool when your boss starts the day with “Got a minute?”', line: 88 },
        { mark: 'check', label: 'No jitters, no crash', note: 'For when your inbox is already testing you at 8:47 AM.', line: 84 },
        { mark: 'leaf', label: 'Antioxidant-rich', note: 'For giving your morning routine a little extra goodness.', line: 86 },
      ],
    })
  );
}
