// Plain-text notes from Shadi (Welcome E2, and the full "story behind Milonga").
//
// The brief: "Shadi from Milonga", replies to an inbox someone reads, no
// images, no header, ONE link, a lowercase subject the way he'd text. Job: a
// person behind the brand, a quiet reminder the code still works, and an
// invitation to reply. No deadline: WELCOME15 doesn't expire.
//
// Writes:
//   exports/klaviyo/welcome-e2/welcome-e2.html   text-based HTML block (looks like a typed email)
//   exports/klaviyo/welcome-e2/welcome-e2.txt    the same note for Klaviyo's text-only editor
//   refine/welcome-e2.html                       preview under an inbox row
// Usage: node scripts/make-welcome-e2.mjs [short|story]
import fs from 'node:fs';
import { validate } from './validate-klaviyo-email.mjs';

// Two versions of Shadi's note, picked by the first argument:
//   short  (default)  Welcome E2, day 1: the quick story          -> exports/klaviyo/welcome-e2/
//   story             the full story for people who just heard of us -> exports/klaviyo/welcome-story/
// Shared facts. The story is Shadi's own (sent by Bernat, 2026-11-06): South
// Florida, soccer, Argentina at 19, mate shared in gourds with teammates;
// slowing down, being present, real conversations. Yerba mate explained for
// someone who has never had it (a naturally caffeinated tea from a South
// American plant; product page: South America's most-loved tea). Gut and
// immune: approved claim (design memory 2026-10-16); antioxidants, vitamins,
// "supports focus", no acidity / bitterness / grassiness, the 2pm crash: the
// product page. WELCOME15 = 15% off the first order, no end date (Shopify),
// so no deadline.
const VARIANTS = {
  short: {
    out: 'exports/klaviyo/welcome-e2', file: 'welcome-e2', label: 'WELCOME FLOW · EMAIL 2 · DAY 1 · plain-text note',
    subject: 'hey, it’s shadi', preheader: 'the short story of why the mate latte exists', slot: 'e2_text_link',
    body: [
      'It’s Shadi, the guy behind Milonga. Can I tell you a quick story?',
      'At 19 I left South Florida for Argentina to chase pro soccer, and that’s where I found mate. If you’ve never had it: yerba mate is a naturally caffeinated tea made from the leaves of a South American plant, and down there it’s everywhere, the way coffee is here. My teammates passed a gourd (the traditional cup) around before practice and after every meal, everyone slowing down, actually talking. I was hooked.',
      'And the more I learned about it, the better it got: clean, steady energy, plus antioxidants and vitamins that support your gut and immune system. Then I’d come home and watch everyone stuck between coffee and alternatives that taste awful. So I made the drink I wished existed. ☕',
      'The Mate Latte **tastes like a creamy vanilla latte. Honestly delicious.** No bitterness, no acidity, nothing grassy. It’s a ritual you actually look forward to, and it gives you **everything your morning needs**: awake, focused and calm, all at once. Yerba mate for the energy, Lion’s Mane for focus, L-theanine for calm. Thirty seconds, hot or iced.',
      'Your 15% is still waiting for you (code WELCOME15), and [[this link applies it for you]]. I really think you’re going to love it.',
      'And if you have any questions, or just want to tell me how your mornings go, hit reply. I read every single one.',
    ],
  },
  story: {
    out: 'exports/klaviyo/welcome-story', file: 'welcome-story', label: 'SHADI · THE STORY BEHIND MILONGA · plain-text note for new subscribers',
    subject: 'the story behind milonga', preheader: 'a soccer dream, a gourd in argentina, and your new morning', slot: 'story_text_link',
    body: [
      'I’m Shadi, the founder of Milonga, and I wanted to share how all of this started.',
      'At 19, I moved from South Florida to Argentina to chase pro soccer, and that’s where I found mate: a naturally caffeinated tea that’s a tradition in parts of South America, the way coffee is here.',
      'What got me was the ritual. One gourd full of mate, passed around a circle. Just friends and family slowing down, talking and living in the moment. The mate is the heart of it, the thing everyone shares, with **no phones, no distractions, no outside noise.**',
      'Then I dug a little deeper and found out mate also gives you clean, steady energy without the jitters or the crash, plus antioxidants and vitamins that support your gut and immune system.',
      'Back in the US, I saw people stuck on coffee: the jitters, the acidity, the afternoon crash, and no ritual at all.',
      'So I made the Mate Latte, to bring that ritual into your morning. It **tastes like a creamy vanilla latte**, with no bitterness and no acidity, and it gives you **everything your morning needs** to feel awake, focused and calm. Thirty seconds, hot or iced.',
      'Your 15% is still waiting (code WELCOME15), and [[this link applies it for you]].',
      'Hit reply anytime. I read every one.',
    ],
  },
};
const V = VARIANTS[process.argv[2] ?? 'short'];
if (!V) throw new Error('variant: short | story');
const OUT = V.out;
fs.mkdirSync(OUT, { recursive: true });

export const FROM = 'Shadi from Milonga';
export const SUBJECT = V.subject;
export const PREHEADER = V.preheader;

const LINK = 'https://milonga.life/discount/WELCOME15?redirect=%2Fproducts%2Fthe-original-mate-latte'
  + `&utm_source=klaviyo&utm_medium=email&utm_campaign=welcome_mystery_offer&utm_content=${V.slot}`;

// Each body entry is a paragraph; [[text]] is the one link; **text** is set
// bold in the HTML version (plain in the text-only one).
const GREETING = 'Hey {{ first_name|default:\'there\' }}!';
const BODY = V.body;
const SIGNOFF = ['Un abrazo,', 'Shadi'];

const ent = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/’/g, '&rsquo;').replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;');
const linkHtml = (p) => ent(p).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/L-theanine/g, '<span style="white-space:nowrap;">L-theanine</span>').replace(/\[\[(.+?)\]\]/, (_, t) => `<a href="${LINK.replace(/&/g, '&amp;')}" target="_blank" style="color:#004D27;font-weight:bold;text-decoration:underline;">${t}</a>`);

const html = `<!--
  ${V.label}
  From: ${FROM} (reply-to: an inbox Shadi or the team actually reads)
  Subject: ${SUBJECT}
  Preview text: ${PREHEADER}
  GENERATED by scripts/make-welcome-e2.mjs. Edit the script, not this file.
  Paste the whole file into one Klaviyo HTML block on a blank, white template.
-->
<style>
  .unsub-pill a { color:#6B6B6B !important; text-decoration:underline !important; }
  @media only screen and (max-width:620px) { .wrap { width:100% !important; } .pad { padding:28px 22px !important; } }
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="background:#FFFFFF;">
<tr><td align="center">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
<tr><td class="pad" align="left" style="padding:36px 32px 28px;font-family:Helvetica, Arial, sans-serif;font-size:16px;line-height:1.6;color:#1E1E1E;">

<p style="margin:0 0 18px;">${GREETING}</p>
${BODY.map((p) => `<p style="margin:0 0 18px;">${linkHtml(p)}</p>`).join('\n')}
<p style="margin:0;">${SIGNOFF.join('<br>')}</p>

</td></tr>
<tr><td class="pad" align="left" style="padding:0 32px 32px;font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1.5;color:#6B6B6B;">
<div class="unsub-pill">Don&rsquo;t want these emails anymore? {% unsubscribe 'Unsubscribe' %}</div>
<div style="padding-top:10px;">{{ organization.name }} &middot; {{ organization.full_address }}</div>
</td></tr>
</table>
</td></tr>
</table>
`;
const problems = validate(html);
if (problems.length) { console.error(problems); process.exit(1); }
fs.writeFileSync(`${OUT}/${V.file}.html`, html);

// Text-only version: the link is written out after its words.
const plain = (p) => p.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[\[(.+?)\]\]\.?\s*/, (_, t) => `${t}:\n${LINK}\n\n`).trimEnd();
const txt = [GREETING, ...BODY.map(plain), SIGNOFF.join('\n'), '—', 'Don’t want these emails anymore? {% unsubscribe \'Unsubscribe\' %}', '{{ organization.name }} · {{ organization.full_address }}'].join('\n\n') + '\n';
fs.writeFileSync(`${OUT}/${V.file}.txt`, txt);

// Preview under an inbox row (the first name filled in, tags shown as Klaviyo prints them).
const sample = html.replace(/\{\{ first_name\|default:'there' \}\}/g, 'Sam')
  .replace(/\{% unsubscribe 'Unsubscribe' %\}/, '<a href="#">Unsubscribe</a>')
  .replace(/\{\{ organization\.name \}\} &middot; \{\{ organization\.full_address \}\}/, 'Milonga &middot; [your address]');
fs.writeFileSync(`refine/${V.file}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${V.file} · preview</title><style>
body{margin:0;background:#2B3A31;padding:28px 0 60px}
.inbox{width:600px;max-width:calc(100% - 24px);margin:0 auto 18px;font-family:Helvetica,Arial,sans-serif}
.inbox .lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px}
.inbox .row{background:#fff;border-radius:12px;padding:13px 16px;display:grid;grid-template-columns:36px 1fr;column-gap:12px;align-items:center}
.inbox .av{grid-row:1/span 2;width:36px;height:36px;border-radius:50%;background:#004D27;color:#F0EFDF;display:grid;place-items:center;font-weight:900;font-size:13px}
.inbox .from{font-weight:700;font-size:13px;color:#12331F}
.inbox .sub{font-size:13px;line-height:1.4;color:#12331F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inbox .sub b{font-weight:700}.inbox .sub span{color:#6b6b6b}
</style></head><body>
<div class="inbox"><div class="lab">Inbox preview</div><div class="row"><div class="av">S</div>
<div class="from">${FROM}</div>
<div class="sub"><b>${ent(SUBJECT)}</b> <span>&mdash; ${PREHEADER}</span></div></div></div>
${sample}
</body></html>`);
console.log('wrote', `${OUT}/${V.file}.html`, '(validator: pass)', `${OUT}/${V.file}.txt`, `refine/${V.file}.html`);
