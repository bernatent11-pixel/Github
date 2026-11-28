// Black Friday ad · branded captions
//
// Burns Milonga-styled captions into the presenter-to-camera ad. The captions are drawn in the
// browser, one transparent frame per video frame, then laid over the footage with ffmpeg; the
// picture underneath is otherwise untouched. No logo is added (Bernat, 2026-11-24).
// The swear word in the sofa line is bleeped (Bernat, 2026-11-28): captions.json lists the span,
// and a 1 kHz tone takes the place of the voice for it. The rest of the sound is the original.
//
// The caption system is the brand's own headline, set in motion: the two typefaces the emails
// pair, used the way the emails use them.
//   caps   the lead-in words: small Gotham Black capitals, widely tracked, in cream. The eyebrow.
//   ital   the words that matter: large serif bold italic, in gold. The turn of the headline.
// A caption is a lead-in line and its key words ("DO YOU WANT / 40% off"); some are the key words
// alone ("Clean energy", "Focus"). Lead-in words wait at half strength and come up as they are
// said; the italic line is held back and pops in on its own cue, so the eye lands on the word that
// matters at the moment it is spoken. The offer lines are the same pairing, larger.
// There are no boxes: the type sits on the picture with a soft dark-green shadow under it. On a
// light background (the sofa shot) the ink turns forest, because type on a photograph takes its
// ink from the photograph.
//
// Captions sit on the table top, just under the glass and the pouches and above the area Reels
// and TikTok cover with their own UI. Two shots move theirs: left of the pouch while he holds it
// to camera, and well above the second speaker on the sofa.
//
// Words and timings live in captions.json (transcribed twice, by two unrelated speech models that
// agreed, and timed per word). Edit that file to change wording, line breaks, timing or position.
//
// Usage, from email-ds/:
//   node video/black-friday-ad/make.mjs <source video> [--preview]
//     --preview   only write preview.jpg (captions over stills) and captions.srt, no video
//     --paid      the cut for paid ads: a word that has a "paid" spelling in captions.json is drawn
//                 that way (the masked swear word becomes a solid bar, because Meta's ad rules allow
//                 bleeped sound but not profanity spelled with symbols). Writes only
//                 black-friday-ad-captioned-paid.mp4; the preview and the .srt are left alone.
// Writes, next to this script: black-friday-ad-captioned.mp4, captions.srt, preview.jpg
// Needs ffmpeg on the PATH. CHROME=/path/to/chrome if Playwright has no browser of its own.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DS = path.resolve(HERE, '../..'); // email-ds/
const args = process.argv.slice(2);
const PREVIEW = args.includes('--preview');
const PAID = args.includes('--paid');
const SRC = args.find((a) => !a.startsWith('--'));
if (!SRC || !fs.existsSync(SRC)) { console.error('usage: node video/black-friday-ad/make.mjs <source video> [--preview]'); process.exit(1); }

const { captions: written, bleeps = [] } = JSON.parse(fs.readFileSync(`${HERE}/captions.json`, 'utf8'));
// a word is [text, start] or [text, start, { paid: text for the paid cut }]
const captions = written.map((c) => ({ ...c, lines: c.lines.map(([kind, ws]) => [kind, ws.map(([text, t, alt]) => [PAID && alt?.paid ? alt.paid : text, t])]) }));
const W = 1080, H = 1920, FPS = 30;
// the band of the frame the captions can occupy; only this is rendered per frame
const STRIP = { top: 600, height: 1040 };
const CENTER_Y = 1462; // on the table top: the glass and pouches stand down to about y 1400, the platforms' UI starts about y 1540
const MAX_LINE = 860;  // widest a line may be: clear of the right-hand button column

const FOREST = '#004D27', GOLD = '#E3BC62', BEIGE = '#F0EFDF';
const font = (f) => `file://${DS}/public/fonts/${f}`;
// Times New Roman where it is installed (a Mac), Liberation Serif otherwise: same metrics
const SERIF = "'Times New Roman','Liberation Serif',Times,Georgia,serif";

const PAGE = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Gotham; src: url(${font('Gotham-Black.otf')}) format('opentype'); font-weight: 900; }
html, body { margin: 0; background: transparent; }
#stage { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; }
.cap { position: absolute; width: max-content; display: flex; flex-direction: column; align-items: center; opacity: 0; transform-origin: 50% 50%; will-change: transform, opacity; }
/* a pool of soft dark green under the type, with no edge to read as a box */
.cap::before { content: ''; position: absolute; z-index: -1; inset: -34% -16%; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(0, 26, 13, .50) 0%, rgba(0, 26, 13, .34) 46%, rgba(0, 26, 13, .12) 76%, rgba(0, 26, 13, 0) 100%); }
.line { display: flex; white-space: nowrap; transform-origin: 50% 55%; will-change: transform, opacity; }
.w { display: inline-block; transform-origin: 50% 70%; }
/* a censor bar: a run of full blocks in a word is drawn as one solid bar, cap-high, in the line's own ink */
.bar { display: inline-block; height: .73em; margin-right: .13em; border-radius: .07em; background: currentColor; vertical-align: baseline;
  box-shadow: 0 2px 0 rgba(0, 26, 13, .6), 0 5px 16px rgba(0, 20, 10, .7); }

/* caps: the eyebrow. Small, heavy, widely tracked, cream */
.caps { gap: .42em; font-family: Gotham, sans-serif; font-weight: 900; font-size: 45px; line-height: 1.16; letter-spacing: .13em; text-transform: uppercase; color: ${BEIGE};
  text-shadow: 0 2px 0 rgba(0, 26, 13, .6), 0 5px 16px rgba(0, 20, 10, .7), 0 0 2px rgba(0, 20, 10, .6); }
/* ital: the turn. Large serif bold italic, gold */
.ital { gap: .2em; font-family: ${SERIF}; font-weight: 700; font-style: italic; font-size: 128px; line-height: .98; letter-spacing: -.012em; color: ${GOLD};
  text-shadow: 0 3px 0 rgba(0, 26, 13, .62), 0 9px 26px rgba(0, 20, 10, .72), 0 0 3px rgba(0, 20, 10, .6); }
.caps + .ital { margin-top: 2px; }
.ital + .caps { margin-top: 12px; }

/* the offer: the same pairing, larger */
.offer .caps { font-size: 56px; }
.offer .ital { font-size: 164px; }
.big .ital { font-size: 218px; letter-spacing: -.02em; line-height: .92; }
.big .caps { font-size: 50px; }

/* on a light background the ink turns forest and the shadow turns to light */
.dark::before { background: radial-gradient(closest-side, rgba(251, 248, 239, .62) 0%, rgba(251, 248, 239, .4) 50%, rgba(251, 248, 239, 0) 100%); }
.dark .caps, .dark .ital { color: ${FOREST}; text-shadow: 0 2px 0 rgba(255, 255, 255, .45), 0 0 22px rgba(251, 248, 239, .9); }
.dark .bar { box-shadow: 0 2px 0 rgba(255, 255, 255, .45), 0 0 22px rgba(251, 248, 239, .9); }
</style></head><body><div id="stage"></div>
<script>
const CAPS = ${JSON.stringify(captions)};
const LEAD = 0.04;          // captions land a frame ahead of the voice, which reads as in sync
const stage = document.getElementById('stage');
const els = CAPS.map((c) => {
  const el = document.createElement('div');
  el.className = 'cap' + (c.size ? ' ' + c.size : '') + (c.ink === 'dark' ? ' dark' : '');
  c.rows = c.lines.map(([kind, words]) => {
    const l = document.createElement('div'); l.className = 'line ' + kind;
    const ws = words.map(([text, t]) => { const w = document.createElement('span'); w.className = 'w';
      text.split(/(\u2588+)/).forEach((part) => {
        if (part[0] === '\u2588') { const b = document.createElement('i'); b.className = 'bar'; b.style.width = part.length * 0.8 + 'em'; w.appendChild(b); }
        else if (part) w.appendChild(document.createTextNode(part));
      });
      l.appendChild(w); return { el: w, t }; });
    el.appendChild(l);
    return { el: l, kind, words: ws, start: ws[0].t - LEAD };
  });
  el.style.left = (c.x ?? ${W / 2}) + 'px';
  el.style.top = (c.y ?? ${CENTER_Y}) + 'px';
  stage.appendChild(el);
  c.start = c.rows[0].start;
  return el;
});
CAPS.forEach((c, i) => {
  const next = CAPS[i + 1];
  // hold a caption until the next one lands if the gap is short, so the screen never blinks empty mid-sentence
  c.bridged = !!next && next.start - c.end < 0.32;
  c.out = c.bridged ? next.start : c.end + 0.16;
  // a caption that belongs to one shot leaves with it, on the cut, with no fade into the next shot
  if (c.cut) { c.out = c.cut; c.bridged = true; }
});
// fit: no line wider than the safe width
window.fit = () => els.forEach((el, i) => {
  const wide = Math.max(...[...el.children].map((l) => l.getBoundingClientRect().width));
  CAPS[i].fit = Math.min(1, (CAPS[i].max ?? ${MAX_LINE}) / wide);
});
const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
// a quick overshoot and settle: up to 1.06, back to 1
const pop = (p, from, dur) => { const x = Math.min(1, Math.max(0, p / dur)); return x < 0.6 ? from + (1.06 - from) * ease(x / 0.6) : 1.06 - 0.06 * ease((x - 0.6) / 0.4); };
window.setTime = (t) => {
  CAPS.forEach((c, i) => {
    const el = els[i];
    if (t < c.start || t >= c.out) { el.style.opacity = 0; return; }
    const p = t - c.start;
    const fadeOut = c.bridged ? 1 : Math.min(1, (c.out - t) / 0.12);
    // already most of the way in on its first frame: the caption before it leaves on that same
    // frame, and a blank frame between two captions reads as a flicker
    el.style.opacity = Math.min(1, 0.6 + p / 0.05) * fadeOut;
    el.style.transform = 'translate(-50%, -50%) scale(' + (c.fit * (0.93 + 0.07 * ease(p / 0.14))) + ')';
    c.rows.forEach((row) => {
      const q = t - row.start;
      if (row.kind === 'ital') {
        // held back until its cue, then it pops: the eye lands on the word as it is said
        row.el.style.opacity = q < 0 ? 0 : Math.min(1, 0.55 + q / 0.05);
        row.el.style.transform = 'scale(' + (q < 0 ? 0.8 : pop(q, 0.8, 0.22)) + ')';
      }
      row.words.forEach((w) => {
        const said = t >= w.t - LEAD;
        w.el.style.opacity = said ? 1 : (row.kind === 'ital' ? 0.34 : 0.42);
        const b = said ? Math.max(0, 1 - (t - (w.t - LEAD)) / 0.16) : 0;   // a small lift as each word is said
        w.el.style.transform = 'translateY(' + (-5 * b * b) + 'px) scale(' + (1 + 0.05 * b * b) + ')';
      });
    });
  });
};
</script></body></html>`;

const CHROME = process.env.CHROME || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'milonga-captions-'));
fs.writeFileSync(`${tmp}/page.html`, PAGE);
await page.goto(`file://${tmp}/page.html`);
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => window.fit());
const clip = { x: 0, y: STRIP.top, width: W, height: STRIP.height };
const shot = async (t) => { await page.evaluate((x) => window.setTime(x), t); return page.screenshot({ type: 'png', omitBackground: true, clip }); };
const words = (c) => c.lines.flatMap(([, ws]) => ws);

// ── preview: one still per caption, taken once every word of it has been said ──
// (The paid cut takes the same stills and throws them away: the browser draws type a hair
// differently depending on what it drew before, and this keeps the two cuts identical everywhere
// but the one word that differs.)
{
  const tiles = [];
  for (const [i, c] of captions.entries()) {
    // once its last word is said, and before the next caption takes its place
    const ws = words(c), next = captions[i + 1];
    const t = Math.min(ws[ws.length - 1][1] + 0.3, (next ? words(next)[0][1] : c.end) - 0.1);
    const frame = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(t), '-i', SRC, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 64e6 });
    // composite first, resize after: sharp resizes before it composites within one pipeline
    const full = await sharp(frame).composite([{ input: await shot(t), left: 0, top: STRIP.top }]).png().toBuffer();
    tiles.push(await sharp(full).resize(360).jpeg({ quality: 88 }).toBuffer());
  }
  const cols = 6, rows = Math.ceil(tiles.length / cols), tw = 360, th = 640, gap = 10;
  await sharp({ create: { width: cols * (tw + gap) + gap, height: rows * (th + gap) + gap, channels: 3, background: '#1b1b1b' } })
    .composite(tiles.map((input, i) => ({ input, left: gap + (i % cols) * (tw + gap), top: gap + Math.floor(i / cols) * (th + gap) })))
    .jpeg({ quality: 88 }).toFile(PAID ? `${tmp}/preview.jpg` : `${HERE}/preview.jpg`);
  if (!PAID) console.log('wrote', `${HERE}/preview.jpg`, `(${tiles.length} stills)`);
}

// ── captions.srt, for uploading as a caption track where a platform takes one ──
if (!PAID) {
  const ts = (t) => { const ms = Math.round(t * 1000); const p = (n, l = 2) => String(n).padStart(l, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
  const srt = captions.map((c, i) => `${i + 1}\n${ts(words(c)[0][1])} --> ${ts(c.end)}\n${c.lines.map(([, ws]) => ws.map((w) => w[0]).join(' ')).join('\n')}\n`).join('\n');
  fs.writeFileSync(`${HERE}/captions.srt`, srt);
  console.log('wrote', `${HERE}/captions.srt`);
}

// ── sound ──
// With no bleeps the track is copied as it is. With bleeps ([{ from, to, level }], in seconds) the
// voice is swapped for a 1 kHz tone over each span: the voice fades out and the tone in over 8 ms
// at each end, so there is no click and nothing of the word is left under the tone. Every sample
// outside the spans is the original; the track is then encoded again (AAC, 192 kb/s).
const sound = () => {
  if (!bleeps.length) return { graph: '', args: ['-map', '0:a', '-c:a', 'copy'] };
  const channels = Number(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=channels', '-of', 'default=nw=1:nk=1', SRC]).toString());
  const D = 0.008;
  // 0 outside a bleep, 1 inside it, ramping over D seconds at each end; eased below so the ramp has no corners
  const env = bleeps.map(({ from, to }) => `clip((t-${from})/${D},0,1)*clip((${to}-t)/${D},0,1)`).join('+');
  const tone = bleeps.map(({ from, to, level = 0.2 }) => `${level}*sin(2*PI*1000*(t-${from}))*between(t,${from},${to})`).join('+');
  const expr = (ch) => `st(0,${env});st(1,ld(0)*ld(0)*(3-2*ld(0)));val(${ch})*(1-ld(1))+(${tone})*ld(1)`;
  return { graph: `;[0:a]aeval=exprs='${Array.from({ length: channels }, (_, ch) => expr(ch)).join('|')}':c=same[a]`, args: ['-map', '[a]', '-c:a', 'aac', '-b:a', '192k'] };
};

if (!PREVIEW) {
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', SRC]).toString());
  const frames = Math.round(dur * FPS);
  fs.mkdirSync(`${tmp}/f`);
  for (let i = 0; i < frames; i++) {
    fs.writeFileSync(`${tmp}/f/${String(i).padStart(5, '0')}.png`, await shot(i / FPS));
    if (i % 150 === 0) console.log(`  caption frames ${i}/${frames}`);
  }
  const out = `${HERE}/black-friday-ad-captioned${PAID ? '-paid' : ''}.mp4`;
  // The overlay is RGB; it is converted to the footage's own BT.709 so the brand colours land
  // where they should.
  const snd = sound();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', SRC, '-framerate', String(FPS), '-i', `${tmp}/f/%05d.png`,
    '-filter_complex',
    `[1:v]scale=out_color_matrix=bt709:out_range=tv,format=yuva444p[cap];[0:v][cap]overlay=0:${STRIP.top}:eof_action=pass,format=yuv420p[v]${snd.graph}`,
    '-map', '[v]', ...snd.args, '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-r', String(FPS),
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-movflags', '+faststart', out], { stdio: 'inherit' });
  console.log('wrote', out);
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
