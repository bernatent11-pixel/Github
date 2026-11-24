BLACK FRIDAY AD · BRANDED CAPTIONS
==================================

The presenter-to-camera Black Friday ad (1080 x 1920, 30 fps, 29.5 s) with Milonga captions and
the logo burned in. Picture and sound are otherwise the original; the audio track is copied, not
re-encoded.

FILES
  black-friday-ad-captioned.mp4   THE VIDEO. H.264 + AAC, 1080 x 1920, ready for Reels / TikTok / Shorts.
  captions.srt                    the same captions as a text track, for platforms that take one
  preview.jpg                     one still per caption, over the real frames
  captions.json                   every caption: its words, per-word timing, style and position
  make.mjs                        draws the captions and builds the video
  The source video is not in the repo (27 MB). To rebuild, from email-ds/:
    node video/black-friday-ad/make.mjs /path/to/source.mov            the video, the .srt, the preview
    node video/black-friday-ad/make.mjs /path/to/source.mov --preview  the preview and the .srt only

THE CAPTION SYSTEM (built from the brand's own parts)
  say     the presenter. A forest-green chip (the brand's button) with cream Gotham Black caps;
          the word being spoken turns gold. Words wait at half strength and come up as said.
  offer   the deal: 40% OFF, BLACK FRIDAY, LIMITED TIME ONLY, BUNDLE AND SAVE, FREE FROTHER
          INCLUDED. A gold chip with dark green type, larger, tilted a touch. Gold with dark green
          on it is the loudest pairing the brand has, so it is kept for the offer and nothing else.
  other   the second voice (the cut to the sofa). A cream chip with dark green type, so the change
          of speaker reads without a name tag.
  Logo    the beige lockup, top centre, with a soft shadow so it holds over the ceiling lights.

WHERE THEY SIT
  One short line at a time, centred on the table top at y 1450: the glass and pouches stand down
  to about y 1400, and Reels / TikTok start covering the frame with their own UI at about y 1540.
  Three shots move theirs: left of the pouch while he holds it to camera (4.5-6.5 s), and above
  the second speaker's head on the sofa (6.5-7.9 s). The logo sits below the platforms' header.

THE WORDS
  Do you want 40% off the coffee alternative that's breaking the internet? Now's your time to get
  the Mate Latte. What the f*#%'s a Mate Latte? Clean energy. Focus. Calm and balanced state.
  Same caffeine as a cup of coffee, but without the jitters and crash. All in a delicious vanilla
  latte. Mmm. 40% off. Black Friday. Limited time only. Bundle and save. Free frother included.

  Transcribed by two unrelated speech models that agreed on every word but two ("a Mate Latte" /
  "the Mate Latte"; and one heard "for author" where the other, and the frother in his hand, say
  "frother"). Timed per word from the first model. Nobody has listened to it against the captions
  yet: watch it once with the sound on before posting.

BEFORE IT RUNS AS A PAID AD
  The caption masks the swear word ("F*#%'S") but the AUDIO still says it. Organic posts are
  fine; Meta and TikTok can reject paid ads for spoken profanity. Bleep or dip that word in the
  sound if this is going behind ad spend.
  The captions repeat the offer exactly as spoken (40% off, bundle and save, free frother). They
  were not checked against what is live in the store.
