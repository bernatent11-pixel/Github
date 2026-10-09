// THE reviews for the reviews-showcase campaign — the single source of truth.
// The React design reads this file, and scripts/make-reviews-html.mjs builds
// the live-text Klaviyo block from the same array, so the two never drift.
//
// FOUR, NOT FIVE. The fifth review on file is signed Bernat Subira — a member
// of the Milonga team. Shown in a customer-review showcase without a
// disclosure it reads as an independent customer, which is exactly the
// endorsement the FTC's guides say must be disclosed. Left out; add it back
// with a "Milonga team" label if it should appear.
//
// Verbatim except where a whole sentence had to come out. Each cut removes
// complete sentences; nothing is reworded:
//   Priscilla    — "or stain my teeth" (banned phrase, as in coffee-vs-mate)
//   Francisco T. — "while still giving me the clean caffeine boost I need"
//                  (banned phrase, as in coffee-vs-mate)
//   Bryant       — "It only has 90 calories and less than 3g of sugar per
//                  scoop. That’s crazy!" — NEW for this campaign: the product
//                  carries 3g of sugar per scoop, not less than 3g, and a
//                  customer's mistaken figure becomes our claim once we
//                  publish it. The spec appears correctly in the close.
//
// Still unverified word-for-word against Judge.me (see design memory,
// 2026-09-15). Ordered long-with-long so each row of the 2-up grid fills to
// about the same depth.
window.MATE_LATTE_REVIEWS = [
  {
    name: 'Priscilla',
    title: 'Amazing !',
    quote: '“I’ve been drinking coffee for years, and as I’ve gotten older, I’ve been trying to find healthier alternatives that don’t give me the jitters. Mate has been a great alternative, although I’m not the biggest fan of the earthy taste of the leaf. This Mate Latte, though, is different. Not only is it the perfect substitute without making me jittery, but it also tastes so yummy! I usually drink it with water or almond milk because it genuinely doesn’t need anything else. I’m so glad I found a healthier alternative that I actually enjoy drinking :)”',
  },
  {
    name: 'Bryant',
    title: 'I’m speechless with the mate latte',
    quote: '“The taste was what sold me first. It’s creamy, lightly sweet, and has a really nice vanilla flavor without tasting like an overly sugary coffee drink. The energy and focus is a bonus. I feel awake and productive, especially during busy mornings. Compared with other functional coffees I’ve tried, this one is much easier to drink consistently.”',
  },
  {
    name: 'Francisco T.',
    title: 'I love the mate latte!!',
    quote: '“Finally, a coffee alternative that doesn’t taste like I’m forcing myself to drink something “healthy.” The Mate Latte is genuinely enjoyable. It’s creamy, smooth, and easy to make… I also like that the formula includes ingredients like Lion’s Mane and L-theanine for focus and staying calm.”',
  },
  {
    name: 'Manuela Jurado',
    title: 'So gooood!',
    quote: '“The biggest thing I noticed is how I feel afterward. With coffee, I sometimes feel like I need another one a few hours later. With the Mate Latte, I feel like I get a steady boost that carries me through what I’m doing without constantly thinking about my next caffeine fix.”',
  },
];
