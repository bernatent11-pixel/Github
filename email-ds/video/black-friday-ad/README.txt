BLACK FRIDAY AD · BRANDED CAPTIONS
==================================

The presenter-to-camera Black Friday ad (1080 x 1920, 30 fps, 29.5 s) with Milonga captions
burned in. The picture is otherwise the original. So is the sound, except for one word: the
swear word in the sofa line is bleeped (Bernat, 2026-11-28). There is no logo on it (Bernat,
2026-11-24: removed).

FILES
  black-friday-ad-captioned.mp4        THE VIDEO. H.264 + AAC, 1080 x 1920, ready for Reels / TikTok / Shorts.
  black-friday-ad-captioned-paid.mp4   THE CUT FOR PAID ADS. The same video with one difference: in the
                                       caption the masked swear word is a solid bar, not "F*#%" (see below).
  captions.srt                         the same captions as a text track, for platforms that take one
  preview.jpg                          one still per caption, over the real frames
  captions.json                        every caption: its words, per-word timing, sizes and position; the bleep
  make.mjs                             draws the captions, bleeps the sound and builds the video
  The source video is not in the repo (27 MB). To rebuild, from email-ds/:
    node video/black-friday-ad/make.mjs /path/to/source.mov            the video, the .srt, the preview
    node video/black-friday-ad/make.mjs /path/to/source.mov --preview  the preview and the .srt only
    node video/black-friday-ad/make.mjs /path/to/source.mov --paid     the cut for paid ads

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

THE SWEAR WORD (sofa line, 6.6 s: "What the f...'s a Mate Latte?")
  IN THE SOUND it is bleeped. From 6.615 to 6.912 s (0.3 s: the whole word, its "f" and its "'s"
  included) the voice is replaced by a 1 kHz tone, the classic broadcast bleep, set level with the
  voices either side of it and eased in and out over 8 ms so it does not click. Nothing of the
  word is left under the tone, and every sample outside that span is the original (the track is
  encoded once more, AAC 192 kb/s). The span and the level are in captions.json ("bleeps").
  Found without ears: the word was placed from the sound's own shape (the quiet "f", the vowel,
  the "k", the hiss of the "s") and the speech model's timing, and checked by having three speech
  models transcribe the result. Before, all three wrote the word out. After, none does: they
  write "What the f*** is a Mate Latte?" (one "What the f is...", one "f*ck"), the way a
  transcriber writes a bleep, and every other word of the ad comes out unchanged. The picture is
  frame for frame the one from 2026-11-24. Still: listen to it once.

  IN THE CAPTION there are two cuts, because of how Meta words its ad rules (Advertising
  Standards > Profanity, read 2026-11-28):
    allowed       bleeped or covered audio, and fully blurred profanity, if not used excessively
    not allowed   profanity that is obscured, misspelled or vague, such as letters swapped for
                  symbols; a word written like "f*!%ing" is the example it gives
  black-friday-ad-captioned.mp4        caption reads WHAT THE F*#%'S. Fine for organic posts.
  black-friday-ad-captioned-paid.mp4   caption reads WHAT THE [solid bar]'S: the word is fully
                                       covered, which is the form the rule allows. Use this one
                                       behind ad spend on Meta. TikTok's written ad policy says
                                       nothing either way about bleeps; its review looks at the
                                       caption, the picture and the sound.
  Ad review is done case by case and can still refuse either cut.

BEFORE IT RUNS
  The captions repeat the offer exactly as spoken (40% off, bundle and save, free frother). They
  were not checked against what is live in the store.
