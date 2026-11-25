// Founder clips · branded captions
//
// Burns Milonga-styled captions into the founder's talk-to-camera clips: one fixed shot at the
// table, pouch on the left, gourd or glass in front of him. Same caption system as the Black
// Friday ad (video/black-friday-ad), made to run on any clip that has a folder here.
//
// The caption system is the brand's own headline, set in motion: the two typefaces the emails
// pair, used the way the emails use them.
//   caps   the lead-in words: small Gotham Black capitals, widely tracked, in cream. The eyebrow.
//   ital   the words that matter: large serif bold italic, in gold. The turn of the headline.
// A caption is a lead-in and its key words ("FALL INTO A / vicious cycle"); some are the key
// words alone ("Clean energy"). Lead-in words wait at half strength and come up as they are said;
// the italic line is held back and pops in on its own cue, so the eye lands on the word that
// matters at the moment it is spoken. Numbers and the product's own names are set larger.
// There are no boxes and no logo: the type sits on the picture with a soft dark-green shadow.
//
// The clips arrive at 608 x 1080. The picture is scaled to 1080 x 1920 and the captions are drawn
// at that size, so the type is sharp even though the footage is not. Sound is copied untouched.
//
// Captions sit on the table top, across the foot of the glass and the pouch and above the area
// Reels and TikTok cover with their own UI. A taller caption grows upward, never down into it.
//
// Words: <clip>/script.txt (edit there). Timing: build-captions.py lines the script up with the
// speech model's word timings (<clip>/asr-words.json) and writes <clip>/captions.json.
//
// Usage, from email-ds/:
//   python3 video/founder-clips/build-captions.py video/founder-clips/<clip>       after editing script.txt
//   node video/founder-clips/make.mjs video/founder-clips/<clip> <source video> [--preview]
//     --preview   only write preview.jpg (captions over stills) and captions.srt, no video
//     --timeline  also print the frames each caption is on screen for
// Writes, in the clip's folder: <clip>-captioned.mp4, captions.srt, preview.jpg
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
const [CLIP, SRC] = args.filter((a) => !a.startsWith('--'));
if (!CLIP || !SRC || !fs.existsSync(`${CLIP}/captions.json`) || !fs.existsSync(SRC)) {
  console.error('usage: node video/founder-clips/make.mjs <clip folder> <source video> [--preview]'); process.exit(1);
}
const NAME = path.basename(path.resolve(CLIP));

const { captions, cuts = [] } = JSON.parse(fs.readFileSync(`${CLIP}/captions.json`, 'utf8'));
const W = 1080, H = 1920, FPS = 30;
// the band of the frame the captions can occupy; only this is rendered per frame
const STRIP = { top: 1060, height: 700 };
const CENTER_Y = 1462; // on the table top: the glass and pouch stand down to about y 1440
const BOTTOM = 1556;   // no caption reaches below this: the platforms' own UI starts about y 1540 to 1580
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

/* caps: the eyebrow. Small, heavy, widely tracked, cream */
.caps { gap: .42em; font-family: Gotham, sans-serif; font-weight: 900; font-size: 45px; line-height: 1.16; letter-spacing: .13em; text-transform: uppercase; color: ${BEIGE};
  text-shadow: 0 2px 0 rgba(0, 26, 13, .6), 0 5px 16px rgba(0, 20, 10, .7), 0 0 2px rgba(0, 20, 10, .6); }
/* ital: the turn. Large serif bold italic, gold */
.ital { gap: .2em; font-family: ${SERIF}; font-weight: 700; font-style: italic; font-size: 128px; line-height: .98; letter-spacing: -.012em; color: ${GOLD};
  text-shadow: 0 3px 0 rgba(0, 26, 13, .62), 0 9px 26px rgba(0, 20, 10, .72), 0 0 3px rgba(0, 20, 10, .6); }
.caps + .ital { margin-top: 2px; }
.ital + .caps { margin-top: 12px; }

/* the product's own names and the lines that land: the same pairing, larger */
.offer .caps { font-size: 50px; }
.offer .ital { font-size: 164px; }
/* a number or one short word */
.big .ital { font-size: 218px; letter-spacing: -.02em; line-height: .92; }
.big .caps { font-size: 50px; }

/* on a light background the ink turns forest and the shadow turns to light */
.dark::before { background: radial-gradient(closest-side, rgba(251, 248, 239, .62) 0%, rgba(251, 248, 239, .4) 50%, rgba(251, 248, 239, 0) 100%); }
.dark .caps, .dark .ital { color: ${FOREST}; text-shadow: 0 2px 0 rgba(255, 255, 255, .45), 0 0 22px rgba(251, 248, 239, .9); }
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
    const ws = words.map(([text, t]) => { const w = document.createElement('span'); w.className = 'w'; w.textContent = text; l.appendChild(w); return { el: w, t }; });
    el.appendChild(l);
    return { el: l, kind, words: ws, start: ws[0].t - LEAD };
  });
  el.style.left = (c.x ?? ${W / 2}) + 'px';
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
// Jump cuts. The clips are cut between sentences, a frame or four away from where the words put
// the caption change, so the change nearest each cut is moved onto the cut itself: the old
// caption is gone on the last frame of its shot and the new one arrives on the first frame of the
// next. A cut that falls in a pause simply ends the caption that was still up.
const CUTS = ${JSON.stringify(cuts)}.map((k) => (k - 0.5) / ${FPS});   // half a frame before the new shot's first frame
const NOTES = [];
CUTS.forEach((cut) => {
  let j = -1, best = 0.25;
  CAPS.forEach((c, i) => { const d = Math.abs(c.start - cut); if (d <= best) { best = d; j = i; } });
  if (j >= 0) {
    const c = CAPS[j], prev = CAPS[j - 1];
    if (prev && (prev.out > cut || prev.out === c.start)) { prev.out = cut; prev.bridged = true; }
    // a caption that opens on its italic line shows nothing until that line's cue, so it is not brought forward
    if (!(cut < c.start && c.rows[0].kind === 'ital')) c.start = cut;
    return;
  }
  const on = CAPS.find((c) => c.start < cut && cut < c.out);
  if (!on) return;
  const rows = on.rows, said = rows[rows.length - 1].words[rows[rows.length - 1].words.length - 1].t;
  if (cut >= said + 0.25) { on.out = cut; on.bridged = true; }
  else NOTES.push('a cut at ' + cut.toFixed(2) + ' s falls inside a caption that is still being said');
});
// fit: a line wider than the safe width has its own type stepped down until it fits (the other
// line keeps its size); then a caption too tall to sit centred on the table grows upward instead
window.fit = () => els.map((el, i) => {
  const c = CAPS[i], max = c.max ?? ${MAX_LINE};
  const scales = [...el.children].map((l) => {
    const wide = l.getBoundingClientRect().width;
    if (wide <= max) return 1;
    l.style.fontSize = parseFloat(getComputedStyle(l).fontSize) * max / wide + 'px';
    return max / wide;
  });
  const h = el.getBoundingClientRect().height;
  c.cy = c.y ?? Math.min(${CENTER_Y}, ${BOTTOM} - h / 2);
  el.style.top = c.cy + 'px';
  return { text: c.lines.map(([, ws]) => ws.map((w) => w[0]).join(' ')).join(' / '), scales: scales.map((s) => +s.toFixed(2)), top: Math.round(c.cy - h / 2), bottom: Math.round(c.cy + h / 2) };
});
const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
// a quick overshoot and settle: up to 1.06, back to 1
const pop = (p, from, dur) => { const x = Math.min(1, Math.max(0, p / dur)); return x < 0.6 ? from + (1.06 - from) * ease(x / 0.6) : 1.06 - 0.06 * ease((x - 0.6) / 0.4); };
window.setTime = (t) => {
  let sig = '';
  const put = (el, prop, v) => { el.style[prop] = v; sig += v + ';'; };
  CAPS.forEach((c, i) => {
    const el = els[i];
    if (t < c.start || t >= c.out) { el.style.opacity = 0; return; }
    sig += '#' + i + ':';
    const p = t - c.start;
    const fadeOut = c.bridged ? 1 : Math.min(1, (c.out - t) / 0.12);
    // already most of the way in on its first frame: the caption before it leaves on that same
    // frame, and a blank frame between two captions reads as a flicker
    put(el, 'opacity', (Math.min(1, 0.6 + p / 0.05) * fadeOut).toFixed(3));
    put(el, 'transform', 'translate(-50%, -50%) scale(' + (0.93 + 0.07 * ease(p / 0.14)).toFixed(4) + ')');
    c.rows.forEach((row) => {
      const q = t - row.start;
      if (row.kind === 'ital') {
        // held back until its cue, then it pops: the eye lands on the word as it is said
        put(row.el, 'opacity', (q < 0 ? 0 : Math.min(1, 0.55 + q / 0.05)).toFixed(3));
        put(row.el, 'transform', 'scale(' + (q < 0 ? 0.8 : pop(q, 0.8, 0.22)).toFixed(4) + ')');
      }
      row.words.forEach((w) => {
        const said = t >= w.t - LEAD;
        put(w.el, 'opacity', said ? 1 : (row.kind === 'ital' ? 0.34 : 0.42));
        const b = said ? Math.max(0, 1 - (t - (w.t - LEAD)) / 0.16) : 0;   // a small lift as each word is said
        put(w.el, 'transform', 'translateY(' + (-5 * b * b).toFixed(2) + 'px) scale(' + (1 + 0.05 * b * b).toFixed(4) + ')');
      });
    });
  });
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
const fitted = await page.evaluate(() => window.fit());
for (const n of await page.evaluate(() => NOTES)) console.log('  CHECK', n);
if (args.includes('--timeline')) {
  for (const c of await page.evaluate(() => CAPS.map((c) => ({ start: c.start, out: c.out, text: c.lines.map(([, ws]) => ws.map((w) => w[0]).join(' ')).join(' / ') }))))
    console.log(`  on screen frames ${Math.max(0, Math.ceil(c.start * FPS - 1e-6))} to ${Math.ceil(c.out * FPS - 1e-6) - 1}: ${c.text}`);
}
for (const f of fitted) {
  if (f.scales.some((s) => s < 1)) console.log(`  stepped down to fit: ${f.text}  (${f.scales.join(', ')})`);
  if (f.top < STRIP.top + 60 || f.bottom > BOTTOM + 1) console.log(`  CHECK position: ${f.text}  (y ${f.top} to ${f.bottom})`);
}
const clip = { x: 0, y: STRIP.top, width: W, height: STRIP.height };
const shot = async (t) => { await page.evaluate((x) => window.setTime(x), t); return page.screenshot({ type: 'png', omitBackground: true, clip }); };
const words = (c) => c.lines.flatMap(([, ws]) => ws);
const scaled = ['-vf', `scale=${W}:${H}:flags=lanczos`];
const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', SRC]).toString());

// ── preview: one still per caption, taken once every word of it has been said ──
{
  const tiles = [];
  for (const [i, c] of captions.entries()) {
    // once its last word is said, and before the next caption takes its place
    const ws = words(c), next = captions[i + 1];
    const t = Math.min(ws[ws.length - 1][1] + 0.3, (next ? words(next)[0][1] : Math.min(c.end, dur)) - 0.1);
    const frame = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(t), '-i', SRC, '-frames:v', '1', ...scaled, '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 64e6 });
    // composite first, resize after: sharp resizes before it composites within one pipeline
    const full = await sharp(frame).composite([{ input: await shot(t), left: 0, top: STRIP.top }]).png().toBuffer();
    tiles.push(await sharp(full).resize(300).jpeg({ quality: 88 }).toBuffer());
  }
  const cols = 8, rows = Math.ceil(tiles.length / cols), tw = 300, th = Math.round(300 * H / W), gap = 8;
  await sharp({ create: { width: cols * (tw + gap) + gap, height: rows * (th + gap) + gap, channels: 3, background: '#1b1b1b' } })
    .composite(tiles.map((input, i) => ({ input, left: gap + (i % cols) * (tw + gap), top: gap + Math.floor(i / cols) * (th + gap) })))
    .jpeg({ quality: 86 }).toFile(`${CLIP}/preview.jpg`);
  console.log('wrote', `${CLIP}/preview.jpg`, `(${tiles.length} stills)`);
}

// ── captions.srt, for uploading as a caption track where a platform takes one ──
{
  const ts = (t) => { const ms = Math.round(t * 1000); const p = (n, l = 2) => String(n).padStart(l, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
  const srt = captions.map((c, i) => `${i + 1}\n${ts(words(c)[0][1])} --> ${ts(Math.min(c.end, dur))}\n${c.lines.map(([, ws]) => ws.map((w) => w[0]).join(' ')).join('\n')}\n`).join('\n');
  fs.writeFileSync(`${CLIP}/captions.srt`, srt);
  console.log('wrote', `${CLIP}/captions.srt`);
}

if (!PREVIEW) {
  const frames = Math.round(dur * FPS);
  fs.mkdirSync(`${tmp}/f`);
  let lastSig = null, lastFile = null, drawn = 0;
  for (let i = 0; i < frames; i++) {
    const file = `${tmp}/f/${String(i).padStart(5, '0')}.png`;
    const sig = await page.evaluate((x) => window.setTime(x), i / FPS);
    if (sig === lastSig) fs.copyFileSync(lastFile, file);     // nothing moved since the last frame
    else { fs.writeFileSync(file, await page.screenshot({ type: 'png', omitBackground: true, clip })); drawn++; }
    lastSig = sig; lastFile = file;
    if (i % 300 === 0) console.log(`  caption frames ${i}/${frames}`);
  }
  console.log(`  ${drawn} of ${frames} frames drawn, the rest repeat the frame before`);
  const out = `${CLIP}/${NAME}-captioned.mp4`;
  // The footage is scaled up to 1080 x 1920 first; the overlay is RGB and is converted to the
  // footage's own BT.709 so the brand colours land where they should. Sound is copied, not re-encoded.
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', SRC, '-framerate', String(FPS), '-i', `${tmp}/f/%05d.png`,
    '-filter_complex',
    `[0:v]scale=${W}:${H}:flags=lanczos[bg];[1:v]scale=out_color_matrix=bt709:out_range=tv,format=yuva444p[cap];[bg][cap]overlay=0:${STRIP.top}:eof_action=pass,format=yuv420p[v]`,
    '-map', '[v]', '-map', '0:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-r', String(FPS),
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-c:a', 'copy', '-movflags', '+faststart', out], { stdio: 'inherit' });
  console.log('wrote', out);
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
