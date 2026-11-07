BROWSE ABANDONMENT · MATE LATTE BRANCH · EMAIL 2 · "Quick question"
===================================================================

Files:  browse-e2.html  plain-letter HTML block (validator passed; one link; unsubscribe included)
        browse-e2.txt   the same letter as plain text, for Klaviyo's text-only template
                        (Klaviyo adds its own unsubscribe footer to text-only emails)

FLOW
  Mate Latte branch of "Browse Abandon Flow": Email 1 -> wait 1 day -> THIS EMAIL
  From name   Shadi from Milonga
  Reply-to    an inbox Shadi (or the team) actually reads: the email asks for replies
  Smart Sending ON · exits if they add to cart, start checkout or order

SUBJECT LINE + PREVIEW TEXT (in use: option 1)
  1. Quick question                      It's Shadi from Milonga. Got a minute?
  2. Can I ask you something?            Saw you checking out the Mate Latte. Two seconds, I promise.
  3. Hey, it's Shadi                     A quick hello from the guy who made your next morning cup.
  4. What are you looking for?           Honest question from the founder. I read every reply.

LINK (one)
  the Mate Latte -> {{ event.URL|default:'https://milonga.life/products/the-original-mate-latte' }}
                    the exact product page this person viewed (Viewed Product event); the Mate
                    Latte page if the event has no URL. The event records the product page only,
                    not the variant. UTMs: keep "Add UTM tracking" ON in this flow message's
                    settings; it tags the link automatically.

FACTS USED
  "three years making yerba mate drinks with Milonga" — from the flow plan ("three years with Milonga")
  100mg natural caffeine from yerba mate, L-theanine, creamy vanilla, 30 seconds hot or iced — product page / pouch
  No discount: the browse flow doesn't lead with one.
