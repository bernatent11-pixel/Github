// Customer call · branded captions
//
// Burns Milonga-styled captions into the phone call with a customer: one fixed wide shot, two of
// the team at the far end of a table, the customer on speakerphone. The source is 608 x 1080; it
// is scaled to 1080 x 1920 and the captions are drawn at that size, so the type is sharp even
// though the picture is not. Sound is copied, not re-encoded.
//
// What this format needs, and how the captions answer it:
//   The customer is never on screen, so every caption says who is talking: a small name tag
//   (Gotham Black capitals) above the words, and each voice in its own half of the brand's type
//   pairing. Shadi, in the room: Gotham Bold, cream. James, on the phone: serif bold italic, gold,
//   and larger, because the customer's words are the reason the video exists.
//   The people fill the middle of the frame and the bottom third is bare table, so the captions
//   sit there: below the phone and the gourd, above the area Reels and TikTok cover with their
//   own UI. They are anchored by their top edge, so the tag stays put while the words change.
//   It is a two-minute conversation, not an ad: up to two lines at a time, sentence case, calm
//   movement. Words wait at half strength and come up as they are said.
//   No boxes: the type sits on the table with a soft dark-green shadow pooled under it.
//
// Words: transcript.txt (edit there). Timing: build-captions.py lines the transcript up with the
// speech model's word timings (asr-words.json) and writes captions.json, which this script reads.
//
// Usage, from email-ds/:
//   python3 video/customer-call/build-captions.py                      after editing transcript.txt
//   node video/customer-call/make.mjs <source video> [--preview]
// Writes, next to this script: customer-call-captioned.mp4, captions.srt, preview.jpg
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
const SRC = args.find((a) => !a.startsWith('--'));
if (!SRC || !fs.existsSync(SRC)) { console.error('usage: node video/customer-call/make.mjs <source video> [--preview]'); process.exit(1); }

const { captions } = JSON.parse(fs.readFileSync(`${HERE}/captions.json`, 'utf8'));
const W = 1080, H = 1920, FPS = 30;
const WHO = { S: 'Shadi &middot; Founder', J: 'James &middot; Customer' };
const NAME = { S: 'SHADI', J: 'JAMES' };
// The table top runs from about y 1300 to the bottom; the platforms' UI starts about y 1545.
const TAG_Y = 1324, TEXT_Y = 1370, MAX_W = 860;
const STRIP = { top: 1200, height: 460 }; // the band the captions can occupy; only this is rendered per frame

const GOLD = '#E3BC62', BEIGE = '#F0EFDF';
const font = (f) => `file://${DS}/public/fonts/${f}`;
// Times New Roman where it is installed (a Mac), Liberation Serif otherwise: same metrics
const SERIF = "'Times New Roman','Liberation Serif',Times,Georgia,serif";
const SHADOW = '0 2px 0 rgba(0, 26, 13, .6), 0 6px 18px rgba(0, 20, 10, .7), 0 0 3px rgba(0, 20, 10, .6)';

const PAGE = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Gotham; src: url(${font('Gotham-Black.otf')}) format('opentype'); font-weight: 900; }
@font-face { font-family: Gotham; src: url(${font('Gotham-Bold.otf')}) format('opentype'); font-weight: 700; }
html, body { margin: 0; background: transparent; }
#stage { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; }
/* a pool of soft dark green on the table under the type, with no edge to read as a box */
#pool { position: absolute; left: ${(W - 1320) / 2}px; top: ${TAG_Y - 110}px; width: 1320px; height: 440px; border-radius: 50%; opacity: 0;
  background: radial-gradient(closest-side, rgba(6, 22, 13, .50) 0%, rgba(6, 22, 13, .40) 38%, rgba(6, 22, 13, .18) 70%, rgba(6, 22, 13, 0) 100%); }
.tag { position: absolute; left: 0; width: ${W}px; top: ${TAG_Y}px; text-align: center; opacity: 0; font-family: Gotham, sans-serif; font-weight: 900; font-size: 27px; line-height: 32px;
  letter-spacing: .22em; text-indent: .22em; text-transform: uppercase; text-shadow: ${SHADOW}; will-change: opacity; }
.tag.S { color: ${BEIGE}; }
.tag.J { color: ${GOLD}; }
.cap { position: absolute; left: ${(W - MAX_W) / 2}px; width: ${MAX_W}px; top: ${TEXT_Y}px; text-align: center; text-wrap: balance; opacity: 0; text-shadow: ${SHADOW}; will-change: transform, opacity; }
/* Shadi, in the room: Gotham Bold, cream */
.cap.S { font-family: Gotham, sans-serif; font-weight: 700; font-size: 57px; line-height: 70px; letter-spacing: -.005em; color: ${BEIGE}; }
/* James, on the phone: serif bold italic, gold, larger */
.cap.J { font-family: ${SERIF}; font-weight: 700; font-style: italic; font-size: 84px; line-height: 84px; letter-spacing: -.008em; color: ${GOLD}; }
.w { display: inline-block; white-space: pre; }
</style></head><body><div id="stage"><div id="pool"></div></div>
<script>
const CAPS = ${JSON.stringify(captions)};
const LEAD = 0.04;          // captions land a frame ahead of the voice, which reads as in sync
const stage = document.getElementById('stage'), pool = document.getElementById('pool');
const els = CAPS.map((c) => {
  const el = document.createElement('div'); el.className = 'cap ' + c.who;
  c.ws = c.words.map(([text, t], i) => {
    const w = document.createElement('span'); w.className = 'w'; w.textContent = text; el.appendChild(w);
    if (i < c.words.length - 1) el.appendChild(document.createTextNode(' '));
    return { el: w, t };
  });
  stage.appendChild(el);
  c.start = c.ws[0].t - LEAD;
  return el;
});
CAPS.forEach((c, i) => {
  const next = CAPS[i + 1];
  // hold a caption until the next one lands if the gap is short, so the table never blinks empty mid-thought
  c.bridged = !!next && next.start - c.end < 0.7;
  c.out = c.bridged ? next.start : c.end + 0.25;
});
// a turn = consecutive captions by one speaker with no real pause between them; the tag belongs to the turn
const TURNS = [];
CAPS.forEach((c, i) => {
  const last = TURNS[TURNS.length - 1];
  if (last && last.who === c.who && CAPS[i - 1].bridged) last.out = c.out;
  else TURNS.push({ who: c.who, start: c.start, out: c.out });
});
const WHO = ${JSON.stringify(WHO)};
const tags = TURNS.map((t) => { const el = document.createElement('div'); el.className = 'tag ' + t.who; el.innerHTML = WHO[t.who]; stage.appendChild(el); return el; });
// fit: never more than two lines; a caption that would run to three steps its type down until it does not
window.fit = () => els.forEach((el) => {
  const lh = parseFloat(getComputedStyle(el).lineHeight), fs = parseFloat(getComputedStyle(el).fontSize);
  let k = 1;
  while (el.getBoundingClientRect().height > lh * k * 2 + 2 && k > 0.7) { k -= 0.03; el.style.fontSize = fs * k + 'px'; el.style.lineHeight = lh * k + 'px'; }
});
const clamp = (x) => Math.min(1, Math.max(0, x));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
window.setTime = (t) => {
  let sig = '';
  let on = 0;
  CAPS.forEach((c, i) => {
    const el = els[i];
    if (t < c.start || t >= c.out) { el.style.opacity = 0; return; }
    const p = t - c.start;
    // already most of the way in on its first frame: the caption before it leaves on that same frame
    const o = Math.min(1, 0.6 + p / 0.06) * (c.bridged ? 1 : clamp((c.out - t) / 0.15));
    const y = 7 * (1 - ease(p / 0.14));
    el.style.opacity = o; el.style.transform = 'translateY(' + y + 'px)';
    on = Math.max(on, o);
    let said = 0;
    c.ws.forEach((w) => { const s = t >= w.t - LEAD; w.el.style.opacity = s ? 1 : 0.42; said += s; });
    sig += i + ':' + o.toFixed(2) + ':' + y.toFixed(1) + ':' + said + ';';
  });
  TURNS.forEach((tn, i) => {
    const o = t < tn.start || t >= tn.out ? 0 : Math.min(1, 0.6 + (t - tn.start) / 0.06) * clamp((tn.out - t) / 0.15 + (CAPS.some((c) => c.start === tn.out) ? 1 : 0));
    tags[i].style.opacity = o;
    if (o) sig += 't' + i + ':' + o.toFixed(2) + ';';
  });
  pool.style.opacity = on;
  return sig; // identical signature = identical picture, so the frame need not be drawn again
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
const text = (c) => c.words.map((w) => w[0]).join(' ');
const scaled = ['-vf', `scale=${W}:${H}:flags=lanczos`];

// ── preview: a still for every third caption, taken once all of it has been said ──
{
  const picks = captions.filter((c, i) => i % 3 === 1 || c.who === 'J' && text(c).length > 34).slice(0, 24);
  const tiles = [];
  for (const c of picks) {
    const t = Math.min(c.words[c.words.length - 1][1] + 0.25, c.end - 0.05);
    const frame = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(t), '-i', SRC, '-frames:v', '1', ...scaled, '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 64e6 });
    // composite first, resize after: sharp resizes before it composites within one pipeline
    const full = await sharp(frame).composite([{ input: await shot(t), left: 0, top: STRIP.top }]).png().toBuffer();
    tiles.push(await sharp(full).resize(360).jpeg({ quality: 88 }).toBuffer());
  }
  const cols = 8, rows = Math.ceil(tiles.length / cols), tw = 360, th = 640, gap = 10;
  await sharp({ create: { width: cols * (tw + gap) + gap, height: rows * (th + gap) + gap, channels: 3, background: '#1b1b1b' } })
    .composite(tiles.map((input, i) => ({ input, left: gap + (i % cols) * (tw + gap), top: gap + Math.floor(i / cols) * (th + gap) })))
    .jpeg({ quality: 88 }).toFile(`${HERE}/preview.jpg`);
  console.log('wrote', `${HERE}/preview.jpg`, `(${tiles.length} stills)`);
}

// ── captions.srt, for uploading as a caption track where a platform takes one ──
{
  const ts = (t) => { const ms = Math.round(t * 1000); const p = (n, l = 2) => String(n).padStart(l, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
  const srt = captions.map((c, i) => `${i + 1}\n${ts(c.words[0][1])} --> ${ts(c.end)}\n${i === 0 || captions[i - 1].who !== c.who ? NAME[c.who] + ': ' : ''}${text(c)}\n`).join('\n');
  fs.writeFileSync(`${HERE}/captions.srt`, srt);
  console.log('wrote', `${HERE}/captions.srt`);
}

if (!PREVIEW) {
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', SRC]).toString());
  const frames = Math.round(dur * FPS);
  fs.mkdirSync(`${tmp}/f`);
  let lastSig = null, lastFile = null, drawn = 0;
  for (let i = 0; i < frames; i++) {
    const file = `${tmp}/f/${String(i).padStart(5, '0')}.png`;
    const sig = await page.evaluate((x) => window.setTime(x), i / FPS);
    if (sig === lastSig) fs.copyFileSync(lastFile, file);     // nothing moved since the last frame
    else { fs.writeFileSync(file, await page.screenshot({ type: 'png', omitBackground: true, clip })); drawn++; }
    lastSig = sig; lastFile = file;
    if (i % 500 === 0) console.log(`  caption frames ${i}/${frames}`);
  }
  console.log(`  ${drawn} of ${frames} frames drawn, the rest repeat the frame before`);
  const out = `${HERE}/customer-call-captioned.mp4`;
  // The footage is scaled up to 1080 x 1920 first; the overlay is RGB and is converted to the
  // footage's own BT.709 so the brand colours land where they should.
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', SRC, '-framerate', String(FPS), '-i', `${tmp}/f/%05d.png`,
    '-filter_complex',
    `[0:v]scale=${W}:${H}:flags=lanczos[bg];[1:v]scale=out_color_matrix=bt709:out_range=tv,format=yuva444p[cap];[bg][cap]overlay=0:${STRIP.top}:eof_action=pass,format=yuv420p[v]`,
    '-map', '[v]', '-map', '0:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-r', String(FPS),
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-c:a', 'copy', '-movflags', '+faststart', out], { stdio: 'inherit' });
  console.log('wrote', out);
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
