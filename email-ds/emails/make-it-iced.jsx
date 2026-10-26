// MAKE IT ICED
//
// Subject: Your Mate Latte, Over Ice 🧊🧉
// Preview: Same scoop, same thirty seconds — a completely different drink.
//
// Three acts, the house structure. The photograph opens loud, a forest band
// inverts the page for the education act, and a beige close carries the facts
// and the button.
const M = window.MilongaEmailDS;
const h = React.createElement;

const IMG = {
  // The iced serve on a table in the morning, pouch behind it. Native 1333 x
  // 2000, so its own ratio is 1.5 and the frame shows all of it.
  iced: '../public/product/latte-iced-table.jpg',
};

function MakeItIced() {
  return h(M.EmailShell, { bg: 'beige' },

    // ── 1 · THE OPENER ────────────────────────────────────────────────────
    // THE INK IS MEASURED, NOT ASSUMED. Sampled on the file: the top eighteen
    // percent runs 133, the upper-left where the stack sits runs 139, and the
    // table at the foot where the button lands runs 166. That is a light
    // photograph everywhere, so the type is FOREST and the wordmark is green —
    // cream on this picture would be a white-on-white problem solved with a
    // scrim, and a scrim on a light morning shot costs exactly the thing the
    // picture was chosen for.
    //
    // No wash either. Forest on 139 is about 6:1, well past the floor, and the
    // blossoms the stack crosses read 245 — better still.
    h(M.T9Story, {
      src: IMG.iced,
      alt: 'Your Mate Latte, over ice. A tall glass of iced Milonga Mate Latte on a table in morning light, a hand stirring it with a straw, the vanilla Mate Latte pouch behind it and a branch of white blossom above. Try it iced.',
      logo: true,
      logoTone: 'green',
      logoHeight: 56,
      // In the stack rather than centred on the frame. Centred, the mark
      // landed on the blossom branch — green on a mid-tone tangle of twigs,
      // which is the one part of this picture that cannot carry it. At the
      // head of the left column it sits on plain sunlit wall.
      logoAlign: 'left',
      align: 'left',
      eyebrow: 'Hot or iced',
      // The two-line headline: the statement, then the turn set apart beneath
      // it. On this ground the accent colour is unavailable — gold on a light
      // picture is the same 1.5:1 problem it has on beige — so both lines are
      // one forest green and the split is carried by size alone.
      line1: 'Same scoop.',
      line2: 'Over ice.',
      line1Color: '#004D27',
      line2Color: '#004D27',
      // Two lines, not four. The pouch stands at 35% of the frame and the
      // stack has to finish above it — a paragraph that runs onto kraft paper
      // is a paragraph nobody reads.
      paras: ['Built for a mug. Better, it turns out, over ice.'],
      cta: { label: 'Try it iced', href: '#shop', arrow: true },
      ctaAlign: 'left',
      at: '88%',
      ratio: 1.5,
      size: 40,
      size2: 52,
      titleLead: 0.98,
      top: 34,
      padLeft: 34,
      padRight: 230,
      measure: 320,
      scrim: 0,
      halo: 'none',
      ink: 'dark',
    }),

    // ── 2 · THE FORMULA, IN TWO SECONDS ───────────────────────────────────
    // The spec cluster sits high, directly under the product shot, which is
    // where it answers "what is actually in this?" before anyone has decided
    // to read. Gold fills with dark green type: on cream gold is a fill and
    // never type, and a filled chip is the loudest thing this ground carries.
    h(M.Section, { bg: 'beige', pad: 'sm', align: 'center' },
      h(M.SpecPills, {
        items: ['15 servings', '90 cal', '3g sugar', 'Dairy-free', 'Hot or iced'],
        bg: 'beige', variant: 'gold', align: 'center', size: 12,
      }),
    ),

    // ── 3 · THE EDUCATION ACT, INVERTED ───────────────────────────────────
    // A forest band on a beige email, marking the middle act as its own
    // chapter. Both its edges land on flat page colour, which is the condition
    // that keeps a hard transition from reading as a mistake.
    h(M.T10Close, {
      bg: 'forest',
      align: 'left',
      rule: false,
      eyebrow: 'One pouch, two drinks',
      line1: 'Hot in the morning.',
      line2: 'Iced by noon.',
      // Both lines cream, set apart by size rather than by colour. Gold is
      // already doing a job in this email — it fills the spec pills — and the
      // standing rule on a dark band is that gold means one thing across the
      // whole page, so it does not also become a headline colour here.
      line1Color: '#F0EFDF',
      line2Color: '#F0EFDF',
      size: 38,
      size2: 46,
      titleLead: 0.98,
      paras: [
        'Nothing about the pouch changes. **One scoop, thirty seconds**, and whether you finish it with steamed milk or pour it over ice is a decision you make at the counter.',
        'Cold, the vanilla reads sweeter and the mate reads lighter — which is why the same drink that starts the day also works at three in the afternoon, when a second coffee would not.',
        '**100mg natural caffeine. 500mg Lion’s Mane. 200mg L-Theanine.** The formula does not care what temperature you drink it at.',
      ],
      measure: 468,
      pad: 56,
      padX: 30,
      textured: true,
      emphasis: 'accent',
    }),

    // ── 4 · THE CLOSE ─────────────────────────────────────────────────────
    // Back on beige, where the page started, so the forest band reads as one
    // chapter with flat page colour on both of its edges.
    h(M.T10Close, {
      bg: 'beige',
      align: 'center',
      rule: false,
      // Short enough not to wrap. "Two ways to drink it." broke after
      // "DRINK" and left a one-word stub on its own row, which the type rules
      // rule out — two even rows or one line, never a line plus a stub.
      line1: 'Fifteen servings.',
      line2: 'Hot or iced.',
      size: 38,
      size2: 44,
      titleLead: 0.98,
      paras: ['Everything you already like about the Mate Latte, with ice in it.'],
      measure: 420,
      pad: 52,
      padX: 30,
      textured: true,
      emphasis: 'body',
      cta: { label: 'Shop the Mate Latte', href: '#shop', arrow: true },
    }),
  );
}
