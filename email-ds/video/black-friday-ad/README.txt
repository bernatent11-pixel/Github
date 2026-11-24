BLACK FRIDAY AD · BRANDED CAPTIONS
==================================

The presenter-to-camera Black Friday ad (1080 x 1920, 30 fps, 29.5 s) with Milonga captions
burned in. Picture and sound are otherwise the original; the audio track is copied, not
re-encoded. There is no logo on it (Bernat, 2026-11-24: removed).

FILES
  black-friday-ad-captioned.mp4   THE VIDEO. H.264 + AAC, 1080 x 1920, ready for Reels / TikTok / Shorts.
  captions.srt                    the same captions as a text track, for platforms that take one
  preview.jpg                     one still per caption, over the real frames
  captions.json                   every caption: its words, per-word timing, sizes and position
  make.mjs                        draws the captions and builds the video
  The source video is not in the repo (27 MB). To rebuild, from email-ds/:
    node video/black-friday-ad/make.mjs /path/to/source.mov            the video, the .srt, the preview
    node video/black-friday-ad/make.mjs /path/to/source.mov --preview  the preview and the .srt only

THE CAPTION SYSTEM (the brand's own headline, set in motion)
  The two typefaces the emails pair, used the way the emails use them:
  caps    the lead-in words. Small Gotham Black capitals, widely tracked, in cream: the eyebrow.
  ital    the words that matter. Large serif bold italic, in gold: the turn of the headline.
  A caption is a lead-in line and its key words ("DO YOU WANT / 40% off", "BUT WITHOUT THE /
  jitters and crash"); some are the key words alone ("Clean energy", "Focus", "Mmm").
  Lead-in words wait at half strength and come up as they are said. The italic line is held
  back and pops in on its own cue, so the eye lands on the word that matters as it is spoken.
  The offer lines (40% off, Black Friday, Limited time, save, Free frother) are the same
  pairing, larger.
  No boxes: the type sits on the picture with a soft dark-green shadow pooled under it.
  On the light wall of the sofa shot the ink turns forest green instead, with a light glow:
  type on a photograph takes its ink from the photograph.
  The first version (2026-11-24, replaced the same day) set every line in Gotham capitals inside
  green and gold chips, with the logo top centre. It is in git history if it is wanted back.

WHERE THEY SIT
  Centred on the table top at about y 1460: the glass and pouches stand down to about y 1400,
  and Reels / TikTok start covering the frame with their own UI at about y 1540.
  Two shots move theirs: left of the pouch while he holds it to camera (4.5-6.5 s), and high on
  the wall, well above the second speaker, in the sofa shot (6.5-7.97 s; Bernat asked for it
  higher). That one starts on the first frame of its shot and is gone on the last.

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
