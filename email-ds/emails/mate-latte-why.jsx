// WHY WE TURNED MATE INTO A LATTE
//
// Subject: Why We Turned Mate Into a Latte 🧉☕
// Preview: All the energy of mate, now in a creamy, comforting morning ritual...
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  // The photograph exactly as supplied. Native 1.5 ratio, so the frame shows
  // all of it — nothing outpainted, nothing cropped.
  why: '../public/product/mate-pouch-man.jpg',
};

function MateLatteWhy() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE TAGLINE ───────────────────────────────────────────────────
    // Poster type and nothing else, on the reference's terms.
    //
    // WHAT THE REFERENCE IS ACTUALLY DOING — four things, all structural:
    //   · one or two words per line, so each line is a beat and the block is a
    //     column of words rather than a wrapped sentence;
    //   · leading near 0.9, so the lines almost touch and read as one mass;
    //   · a two-tone split that puts the accent on the payoff, not the setup;
    //   · no body copy at all. The type IS the section.
    //
    // WHERE IT SITS. The stack starts level with the top of the pack and runs
    // past his shoulder, and at 55px with 1.02 leading that block is 449px —
    // half this frame — so it now reaches almost to the foot of the section.
    //
    // IT CROSSES HIM, DELIBERATELY. "MORNING" and "RITUAL." measure 281px
    // against the roughly 215px of clear ground left at that height, so the
    // two longest lines run about 70px onto his sweater. That is the trade for
    // 55px type: the sweater there is flat mid-teal, the cream and gold hold
    // against it, and type crossing a subject is what the reference does. The
    // alternative is 45px, which clears him completely.
    h(M.T9Story, {
      src: IMG.why,
      alt: 'We turned mate into your new morning ritual. A man outdoors holds up a Milonga Yerba Mate Latte pouch in front of his face, framed by out-of-focus green trees. Try it now.',
      logo: true,
      logoTone: 'white',
      logoHeight: 96,
      // The wordmark belongs at the top of the frame; the stack is placed
      // against the photograph, so the two are positioned separately.
      logoTop: 30,
      align: 'left',
      // Five lines cream, three gold — the accent carries "new morning ritual".
      // Pure white, not the brand cream — at poster scale #F0EFDF reads as a
      // warm off-white against the gold below it rather than as a contrast.
      line1Color: '#FFFFFF',
      line1: 'We turned mate into your',
      line2: 'new morning ritual.',
      cta: { label: 'Try it now', href: '#shop', arrow: true },
      ctaInline: true,
      // No wash at all — the photograph goes in as shot.
      scrim: 0,
      // Flat letters. The automatic halo that comes with a zero scrim reads as
      // an effect at this size, so the type takes a single quiet shadow
      // instead — enough to keep it off the photograph, not enough to see.
      halo: 'soft',
      ratio: 1.501,
      size: 55,
      size2: 65,
      titleLead: 1.02,
      top: '27%',
      padLeft: 26,
      padRight: 289,
      measure: 285,
    }),

    // ── 2 · SO WHY A LATTE ────────────────────────────────────────────────
    // Flat beige, no photograph. The headline carries over section 1's
    // treatment exactly — same face, same weight, same left-aligned stack,
    // same 0.9-ish leading — so the two read as one email.
    //
    // WHAT DOES NOT CARRY OVER IS THE TWO-TONE. Gold on beige is the one
    // pairing the brand's contrast map rules out: at #E3BC62 on #F0EFDF there
    // is barely any contrast, and the accent half of the headline would go
    // soft. On a light ground the map sets everything typographic to the one
    // forest green, so the headline is flat and the emphasis inside the body
    // does the colour work instead.
    h(M.T10Close, {
      bg: 'beige',
      align: 'left',
      rule: false,
      line1: 'So why turn it',
      line2: 'into a latte?',
      size: 55,
      titleLead: 0.92,
      paras: [
        'We wanted to make mate **simple, creamy, comforting, and easy to enjoy**, just like your favorite morning latte.',
        'So we combined the natural energy of mate with functional ingredients in a **smooth, creamy vanilla latte** made for your everyday ritual.',
        '**Meet Mate Latte:** everything you love about mate, and more, reimagined for your morning.',
      ],
      measure: 468,
      pad: 56,
      padX: 30,
      textured: true,
      // Weight alone carries the emphasis. Forest green on beige was pulling
      // three separate phrases out of three short paragraphs, which left the
      // section looking half-highlighted rather than emphasised.
      emphasis: 'body',
    }),

    // ── 3 · THE EQUATION ──────────────────────────────────────────────────
    // Pictures down the left, the terms beside them, operators on the discs'
    // own centre line. Two of the discs are placeholders carrying their emoji
    // at full size — the rows hold their exact height, so dropping the real
    // photographs in later moves nothing else.
    h(M.T11Equation, {
      bg: 'beige',
      terms: [
        { src: '../public/product/ing-yerba-mate.png', emoji: '🧉',
          alt: 'Loose yerba mate leaf',
          label: 'Yerba mate', note: 'Natural energy + antioxidants' },
        { src: '../public/product/ing-lions-mane.png', emoji: '🍄',
          alt: 'A lion\u2019s mane mushroom',
          label: 'Functional ingredients', note: 'Lion\u2019s Mane + L-Theanine' },
        { src: '../public/product/ing-vanilla.png', emoji: '🍦',
          alt: 'A vanilla flower and pods',
          label: 'Creamy vanilla', note: 'Smooth, creamy & genuinely enjoyable' },
      ],
      result: {
        src: '../public/product/pouch-floating.png', emoji: '☕',
        alt: 'The Milonga Mate Latte pouch',
        label: 'Mate Latte', note: 'Ready in 30 seconds.',
      },
      serves: [
        // The brand's own line icons, not emoji. A photograph of a drink does
        // not survive a 94px disc — the iced cutout was tried and resolved to
        // a smudge — but a line drawing is legible at any size by design.
        { src: '../public/brand/icons/hot-forest.png', alt: 'A hot cup',
          label: 'Hot', note: 'Cozy & comforting' },
        { src: '../public/brand/icons/iced-forest.png', alt: 'An iced glass',
          label: 'Iced', note: 'Cold & refreshing' },
      ],
      circle: 152,
      labelSize: 26,
      pad: 4,
      padX: 30,
      textured: true,
    })
  );
}
