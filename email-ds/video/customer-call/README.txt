CUSTOMER CALL · BRANDED CAPTIONS
================================

The phone call with James, a customer (one fixed shot, 1 min 55 s), with Milonga captions burned
in. The source is 608 x 1080; the video is scaled to 1080 x 1920 and the captions are drawn at
that size, so the type is sharp even though the picture is soft. Sound is copied, not re-encoded.

FILES
  customer-call-captioned.mp4   THE VIDEO. H.264 + AAC, 1080 x 1920, ready for Reels / TikTok / Shorts.
  captions.srt                  the same captions as a text track, with the speaker named at each change
  preview.jpg                   stills of the captions over the real frames
  transcript.txt                THE WORDS: one caption per line, with who says it. Edit here.
  asr-words.json                what the speech model heard, word by word, with timings
  build-captions.py             lines transcript.txt up with those timings -> captions.json
  captions.json                 the timed captions make.mjs draws (generated; do not edit)
  make.mjs                      draws the captions and builds the video
  The source video is not in the repo (30 MB). To change the words and rebuild, from email-ds/:
    edit video/customer-call/transcript.txt
    python3 video/customer-call/build-captions.py
    node video/customer-call/make.mjs /path/to/source.mp4            (add --preview for stills only)

WHAT THIS FORMAT NEEDED
  The customer is never on screen. So every caption says who is talking: a small name tag in
  Gotham Black capitals ("SHADI · FOUNDER", "JAMES · CUSTOMER") and each voice in its own half
  of the brand's type pairing:
    Shadi, in the room    Gotham Bold, cream
    James, on the phone   serif bold italic, gold, and larger: his words are why the video exists
  The people fill the middle of the frame and the bottom third is bare table. The captions sit
  there, under the phone and the gourd and above the area Reels and TikTok cover with their own
  UI (about y 1545 down). They are anchored by their top edge, so the name tag stays put while
  the words under it change.
  It is a two-minute conversation, not an ad: up to two lines at a time, sentence case, calm
  movement. Words wait at half strength and come up as they are said.
  No boxes: the type sits on the table with a soft dark shadow pooled under it. No logo.

THE WORDS, AND HOW SURE THEY ARE
  Three unrelated speech models transcribed the call, on the raw sound and on a cleaned-up copy,
  and a speaker-separation model marked who spoke when. Shadi's lines agreed throughout. James
  is on a speakerphone in an echoing room, and a few of his words did not come out the same way
  twice. Nobody has listened to it against the captions yet: watch it once with the sound on.
  Captioned as "clean verbatim": fillers (um, uh) and repeated words are left out; nothing is
  reworded except "everything that we have offering" -> "everything we offer".
  LEFT OUT because the models could not agree (add them in transcript.txt if you can hear them):
     6.8 s   James's first word before "how are you doing?" (heard as Yes / Cheers / Jess)
    66.8 s   James, after "...drinking your Milonga": something like "I like 'em all"
             (heard as maul / mal / mall / malt). Not guessed at: it would be putting praise in
             a customer's mouth.
  WORTH A LISTEN, captioned on the balance of the models:
    34.9 s   "The doctor told me not to drink COFFEE" (two heard coffee, the rest lost the word)
    39.2 s   "your Mate Latte HITS THE SPOT" (three of six; the others heard noise)
   104.6 s   "my go-to FOR NOW, FOR RECENTLY" (all agreed on these words, odd as they are)
  The last three lines: "Thank you, James." may be the second person in the room rather than
  Shadi; it carries Shadi's tag because it is a voice in the room.

BEFORE IT IS POSTED
  1 CONSENT. This is a recorded phone call with a named customer. Florida requires every party
    to a call to agree to its recording; and using his words to sell needs his yes as well. Get
    James's permission in writing before this goes anywhere public.
  2 "THE DOCTOR TOLD ME NOT TO DRINK COFFEE, so I had to come up with something else" (33-38 s).
    In an ad, a customer's words count as the brand's. This one implies the Mate Latte is what
    to drink when a doctor says no to coffee, and it has the same caffeine as a cup of coffee
    (the Black Friday ad says so). Cut those five seconds, or do not run this as an ad.
  3 "YOU GUYS ARE MY GO-TO... for now, for recently" (102-106 s). The tail weakens the best line
    in the call. The caption shows it because he says it; trimming the video after "go-to"
    fixes both.
  4 LENGTH. 1 min 55 s is long for Reels or TikTok. The strongest 30-40 seconds are the taste
    and "hits the spot" answer (28-46 s), "I got a cup right here" (72-75 s) and "my go-to"
    (102-103 s).
