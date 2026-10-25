TRICK OR TREAT YOURSELF - Klaviyo HTML template
===============================================

File:     halloween-sale.html   (paste the whole file)
Subject:  Trick Or Treat Yourself 🎃👻
Preview:  Up to 30% off the Halloween Party Pack and up to 25% off everything, until Monday, November 2.
          (The preview text is also built into the HTML.)
Sale end: Monday, November 2, 2026 at 11:59 PM ET (time assumed; change SALE_END
          in scripts/make-halloween-html.mjs and rebuild if it is different)

PASTE IT INTO KLAVIYO
1. Content > Templates > Create template > choose the HTML / code editor.
2. Delete what is there, paste the full contents of halloween-sale.html, save.
3. In the campaign, pick this template and set the subject and preview above.
All images already live in your Klaviyo image library (named halloween-sale-*),
so nothing needs uploading.

LINKS
- Shop the sale button and the top picture  -> https://milonga.life
- Get the Party Pack (and its section)       -> https://milonga.life/products/halloween-party-pack-bundle
- Shop Lion's Mane                           -> https://milonga.life/products/lion-s-mane
- Shop Regular                               -> https://milonga.life/products/cannabis-regular-10mg
- Shop variety (Lion's Mane)                 -> https://milonga.life/products/lions-mane-variety-pack
- Shop variety (Cannabis)                    -> https://milonga.life/products/variety
- Shop Mate Latte                            -> https://milonga.life/products/the-original-mate-latte
- Footer logo and "Shop milonga.life"        -> https://milonga.life

MAKE THE TIMER LIVE (about 2 minutes)
Klaviyo has no built-in countdown, so the live timer is an image from a timer
service that redraws every time the email is opened. Sendtric is free:
1. Go to sendtric.com and create a timer:
   End: November 2, 2026, 11:59 PM   Time zone: America/New_York (Eastern)
   Background #DA5813, numbers #FFFFFF, labels #FFFFFF, width about 440px.
2. Copy the timer's image URL.
3. In halloween-sale.html find the line starting with  <!-- TIMER:
   - remove  <!-- TIMER:  at the start and  -->  at the end of that line
   - replace YOUR-TIMER-URL with the timer's image URL.
4. Keep the "Ends Monday, November 2 at 11:59 PM ET" pill under it: it is
   what readers see if images are off. (Or delete the pill if you prefer the
   timer alone.)
Until step 3 is done the email shows the pill only, so it is safe to send.

BEFORE YOU SEND
- Send only to the 21+ segment cleared for the infused line; counsel to
  review the disclosure in the footer.
- Send yourself a test (Preview & test) and click every button once.
- Lion's Mane 48-pack: Shopify still shows $113.40 (Açaí Mint) vs $113.48
  (the other flavours); the email shows $113.40.
