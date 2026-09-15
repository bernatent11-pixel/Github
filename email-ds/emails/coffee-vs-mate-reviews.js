// THE reviews for this campaign — the single source of truth. The React design
// reads this file, and scripts/make-reviews-html.mjs generates the live-text
// Klaviyo block from the same array, so the two can never drift.
//
// Verbatim except where a phrase on the banned list had to come out. Each cut
// removes a whole clause at a sentence boundary; nothing is reworded:
//   Francisco T. — "while still giving me the clean caffeine boost I need"
//   Priscilla    — "or stain my teeth"
// Bryant, Manuela Jurado and Bernat Subira are untouched — none contains a
// banned phrase ("a nice boost of energy" is not "caffeine boost").
//
// Ordered longest-with-longest so the two cards in a row fill to roughly the
// same depth: in a row of equal-height cards the taller sets the height, so
// pairing a long quote with a short one buys a void.
window.COFFEE_VS_MATE_REVIEWS = [
  {
    name: 'Bryant',
    title: 'I’m speechless with the mate latte',
    quote: '“The taste was what sold me first. It’s creamy, lightly sweet, and has a really nice vanilla flavor without tasting like an overly sugary coffee drink. It only has 90 calories and less than 3g of sugar per scoop. That’s crazy! The energy and focus is a bonus. I feel awake and productive, especially during busy mornings. Compared with other functional coffees I’ve tried, this one is much easier to drink consistently.”',
  },
  {
    name: 'Priscilla',
    title: 'Amazing !',
    quote: '“I’ve been drinking coffee for years, and as I’ve gotten older, I’ve been trying to find healthier alternatives that don’t give me the jitters. Mate has been a great alternative, although I’m not the biggest fan of the earthy taste of the leaf. This Mate Latte, though, is different. Not only is it the perfect substitute without making me jittery, but it also tastes so yummy! I usually drink it with water or almond milk because it genuinely doesn’t need anything else. I’m so glad I found a healthier alternative that I actually enjoy drinking :)”',
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
  {
    name: 'Bernat Subira',
    title: 'New morning ritual',
    quote: '“I’ve been really enjoying the Mate Latte. It has a smooth, creamy taste without feeling too heavy, and it gives me a nice boost of energy without the jitters I usually get from coffee. It’s become an easy choice when I want something that tastes good and keeps me focused throughout the day. Definitely worth trying if you’re looking for a different way to get your caffeine.”',
  },
];
