FOUNDER CLIPS · BRANDED CAPTIONS
================================

Four talk-to-camera clips of the founder at the table, with Milonga captions burned in, in the
same style as the Black Friday ad (video/black-friday-ad, the version Bernat approved on
2026-11-24: two typefaces, no boxes, no logo). Sound is the original track, copied untouched.

THE VIDEOS (H.264 + AAC, 1080 x 1920, 30 fps, ready for Reels / TikTok / Shorts)
  1-why-we-drink-caffeine/1-why-we-drink-caffeine-captioned.mp4                           51.6 s  39 captions
      "So why do you think we drink caffeine in the first place?" The origin story and the formula.
  2-why-you-dont-feel-mushroom-coffee/2-why-you-dont-feel-mushroom-coffee-captioned.mp4   35.8 s  27 captions
      "Why do you think you don't feel your mushroom coffee?" Caffeine: 100 mg, from yerba mate.
  3-why-you-left-your-coffee/3-why-you-left-your-coffee-captioned.mp4                     32.3 s  21 captions
      "Be honest, why did you move away from your morning coffee?" Taste against mushroom coffee.
  4-tastes-like-a-latte/4-tastes-like-a-latte-captioned.mp4                               23.4 s  17 captions
      "Mushroom coffee probably tastes like dirt." The short taste cut.
  Each folder also holds:
    preview.jpg       one still per caption, over the real frames
    captions.srt      the same captions as a text track, for platforms that take one
    script.txt        THE WORDS. One caption per line; edit here
    asr-words.json    what the speech model heard, word by word, with times
    captions.json     the script with a time on every word (generated; do not edit)

THE CAPTION SYSTEM (the brand's own headline, set in motion)
  The two typefaces the emails pair, used the way the emails use them:
  caps    the lead-in words. Small Gotham Black capitals, widely tracked, in cream: the eyebrow.
  ital    the words that matter. Large serif bold italic, in gold: the turn of the headline.
  A caption is a lead-in and its key words ("FALL INTO A / vicious cycle", "TASTES LIKE /
  mushrooms"); some are the key words alone ("Clean energy", "the crash", "Salud").
  Lead-in words wait at half strength and come up as they are said. The italic line is held
  back and pops in on its own cue, so the eye lands on the word that matters as it is spoken.
  Three sizes of key word keep the eye moving: the standard one; a larger one for the product's
  own names and the lines that land (Mate Latte, yerba mate, L-theanine, Lion's Mane, a latte,
  creamy latte, the taste, mushrooms, Clean energy / Clear mind / calm state); and the largest
  for a number or one short word (1 in 4, 400 mg, 100 mg, half, dirt, Salud).
  No boxes and no logo: the type sits on the picture with a soft dark-green shadow pooled under it.

WHAT KEEPS PEOPLE WATCHING (why it is built this way)
  Short captions, two to six words, changing about every 1.3 seconds: there is always a next one.
  The first caption of every clip is the question or the jab he opens with, on screen from the
  first frame, so the hook reads with the sound off.
  One idea per caption, and the gold line is always the word a viewer would repeat.
  The screen never blinks empty in the middle of a sentence: a caption holds until the next lands.
  Every clip is made of jump cuts (9, 3, 6 and 4 of them). Each caption change next to a cut
  happens ON the cut frame, so no caption hangs over into the next shot or arrives early.

WHERE THEY SIT
  Centred on the table top at about y 1460 (of 1920), across the foot of the glass and the pouch,
  the same place as the Black Friday ad. Reels and TikTok start covering the frame with their own
  UI at about y 1540 to 1580, so no caption reaches below y 1556: a taller caption (three lines,
  or the big numbers) grows upward instead. No line is wider than 860 px, clear of the buttons
  down the right-hand side.

THE WORDS
  Each clip was transcribed by three unrelated speech models. They agree on every word except:
    "we created it into a latte" (clips 1 and 2): one model, and in clip 2 two, heard no "it".
        The caption has it.
    "the stains on your teeth" (clip 3): two models heard "stains" without "the".
    the sign-offs: "Delicioso" (clip 3, after he drinks) and "Salud" (clip 4, as he raises the
        glass) are Spanish and the English models mangled them; re-heard in Spanish they come out
        as written, and the picture agrees.
  Numbers are written as figures (1 in 4, 400 mg, 100 mg, 4 and 5). Nothing is reworded.
  Per-word timing is from the first model; build-captions.py lines the script up with it.
  Nobody has listened to these against the captions (they were made without ears): watch each
  one once with the sound on before posting.

BEFORE THEY GO OUT (things in the footage itself, not the captions)
  1  Clip 2 is cut off in the middle of its last sentence: "...to give you a recipe and a
     formula like". The caption trails off with it ("a formula like…"). Clip 1 has the same
     passage complete ("like none other"). Re-export clip 2 with the ending, or trim it back to
     "...mental focus and clarity" (33.4 s).
  2  Claims. The brand's own rule (design memory) approves "no jitters, no crash" and no other
     health claim. The founder says, and so the captions show:
       clip 1  "one in four Americans ... consume over 400 mg of caffeine a day"   needs a source
               "one of the world's healthiest caffeine sources on earth"
               "more antioxidants than green tea"
               "doesn't give you the jitters or the anxiety"
       clips 1 and 2  "L-theanine, which helps lower levels of stress"
                      "Lion's Mane, which helps with mental focus and clarity"
       clip 2  "mushroom coffee brands add about half the caffeine of a regular cup of coffee"
               "100 milligrams of natural caffeine"   check it against the label
               "you don't get the jitters, the anxiety and the crash"
       clip 3  "the stains on your teeth" (as a reason people leave coffee)
     Organic posts carry little risk. Behind ad spend, Meta and TikTok review the spoken words as
     well as the captions, and stress / anxiety / focus claims are the kind they reject.
  3  Clips 3 and 4 share twelve seconds of the same footage ("Because let's be honest, mushroom
     coffee tastes like mushrooms ... no chalky or earthy taste"). As two ad variants that is
     fine; posted days apart on the same feed it will read as a repeat.
  4  The sources arrived at 608 x 1080 (they look like copies sent through a messaging app). The
     captions are sharp because they are drawn at 1080 x 1920, but the picture under them is
     soft. If the originals exist at full size, rebuild from those: one command per clip.

TO CHANGE SOMETHING
  The source videos are not in the repo. From email-ds/, for a clip folder <clip>:
    edit video/founder-clips/<clip>/script.txt
        one caption per line; " / " starts a new line; the *starred* line is the gold italic one;
        {offer} or {big} makes the key words larger; "@cuts" lists the jump cuts by frame
    python3 video/founder-clips/build-captions.py video/founder-clips/<clip>
    node video/founder-clips/make.mjs video/founder-clips/<clip> /path/to/source.mp4            the video, the .srt, the preview
    node video/founder-clips/make.mjs video/founder-clips/<clip> /path/to/source.mp4 --preview  the preview and the .srt only
  A new clip needs a folder with a script.txt and an asr-words.json ([{"w": word, "t": start
  seconds}, ...], from any speech model that gives word times).

CHECKED
  Every frame of each finished video was compared with its source: the picture differs only
  inside the caption band, only on the frames where a caption is due, and each caption change
  beside a jump cut lands on the cut frame.
