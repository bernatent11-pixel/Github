// Campaign: "A note from Shadi" — the personal upsell. A letter, not a layout:
// one voice, one offer, one deadline.
// ACT 1 header (the personal hook) · ACT 2 the note · ACT 3 the ask.
// Dark green, textured end to end. Copy supplied by the founder — set verbatim.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  sticks: '../public/product/latte-sticks.png',
};

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Shop', href: '#' },
];

function FounderNote({ shopHref = '#' }) {
  const bg = 'forest';
  const t = M.onBg[bg];

  return h(M.EmailShell, { bg, textured: true },

    // ═══ ACT 1 · HEADER ═══
    h(M.Header, { bg }),
    h(M.Section, { bg, pad: 'md', align: 'center' },
      h(M.SectionHeading, {
        bg,
        eyebrow: 'A note from the founder',
        title: 'I made you something',
        titleAccentPart: 'something',
        align: 'center',
        size: 34,
      })
    ),

    // ═══ ACT 2 · THE NOTE ═══
    h(M.Section, { bg, pad: 'md' },
      h(M.Prose, { bg, text: 'Hey,' }),
      h(M.Prose, { bg, text: 'This is Shadi, founder of Milonga. **How’s everything going? :)**' }),
      h(M.Prose, { bg, text: 'I wanted to share something we’ve been working on behind the scenes for a while.' }),
      h(M.Prose, { bg, text: 'If you place **your next Milonga order before September 8th**, we’re going to include **FREE samples of our brand-new Mate Latte in your order.**' }),
      h(M.Prose, { bg, text: '**The Mate Latte is our take on the classic latte, but powered by yerba mate.** It’s creamy, smooth, and made to give you that **focused energy without the anxious feeling or afternoon crash.** And the best part? You can make it in about **30 seconds, either hot or iced. Just mix, pour, and you’re ready to go.**' })
    ),

    // The samples themselves, centred, with the offer stamped beside them.
    h(M.Section, { bg, pad: 'sm', align: 'center' },
      h('div', { style: { position: 'relative', width: '82%', margin: '0 auto' } },
        h('img', {
          src: IMG.sticks,
          alt: 'Three Milonga Mate Latte vanilla sample sticks',
          style: { display: 'block', width: '100%', height: 'auto', border: 0 },
        }),
        h('div', { style: { position: 'absolute', top: '-2%', right: '-7%' } },
          h(M.Badge, { bg, label: 'Free sample', sub: 'Mate Latte' })
        )
      )
    ),

    // The part that has to land — set a size up from the rest.
    h(M.Section, { bg, pad: 'md' },
      h(M.Prose, { bg, size: 16, text: 'We’re just getting started with Mate Latte, and I’d love for you to be one of the first to try it.' }),
      h(M.Prose, { bg, size: 16, text: '**It’s a limited run, so grab your next order before September 8th and let us know what you think.**' }),

      // Sign-off.
      h('div', { style: { height: 10 } }),
      h('div', { style: {
        fontFamily: M.fontStack, fontSize: 15, fontWeight: 900, color: t.title, letterSpacing: '0.02em',
      } }, 'Shadi'),
      h('div', { style: {
        fontFamily: M.fontStack, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: t.accent, marginTop: 5,
      } }, 'Founder, Milonga')
    ),

    // ═══ ACT 3 · THE ASK ═══
    h(M.Section, { bg, pad: 'lg', align: 'center' },
      h(M.Button, { bg, label: 'Shop now', href: shopHref, size: 'lg' })
    ),

    h(M.Footer, { bg, social: SOCIAL, rule: false })
  );
}
