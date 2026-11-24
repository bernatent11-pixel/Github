// Black Friday ad · branded captions
//
// Burns Milonga-styled captions and the logo into the presenter-to-camera ad. The captions are
// drawn in the browser, one transparent frame per video frame, then laid over the footage with
// ffmpeg; the picture underneath and the sound are otherwise untouched.
//
// The caption system, from the brand's own parts:
//   say    the presenter. A forest chip per line (the brand's button), cream Gotham Black caps,
//          and the word being spoken turns gold: the dark-green row of the contrast map.
//   offer  the deal ("40% off", "Black Friday", ...). A gold chip with forest type, larger and
//          tilted a touch: gold with dark green on it is the loudest pairing the brand has, so it
//          is kept for the offer and nothing else.
//   other  the second voice (the cut to the sofa). A cream chip with forest type, so a change of
//          speaker reads as one without a name tag.
// Words wait at half strength and come up as they are said. Captions are one short line at a
// time and sit on the table top, just under the glass and the pouches and above the area Reels
// and TikTok cover with their own UI; three shots move theirs so they stay off the product (the
// pouch held to camera) or the person (the sofa).
//
// Words and timings live in captions.json (transcribed twice, by two unrelated speech models that
// agreed, and timed per word). Edit that file to change wording, line breaks or timing.
//
// Usage, from email-ds/:
//   node video/black-friday-ad/make.mjs <source video> [--preview]
//     --preview   only write preview.jpg (captions over stills), no video
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
const SRC = args.find((a) => !a.startsWith('--'));
if (!SRC || !fs.existsSync(SRC)) { console.error('usage: node video/black-friday-ad/make.mjs <source video> [--preview]'); process.exit(1); }

const { captions } = JSON.parse(fs.readFileSync(`${HERE}/captions.json`, 'utf8'));
const W = 1080, H = 1920, FPS = 30;
// the strip of the frame the captions can occupy; only this is rendered per frame
const STRIP = { top: 1000, height: 600 };
const CENTER_Y = 1450; // on the table top: the glass and pouches stand down to about y 1400, the platforms' UI starts about y 1540
const MAX_LINE = 850;  // widest a line may be: clear of the right-hand button column

const FOREST = '#004D27', DEEP = '#00351B', GOLD = '#E3BC62', GOLD_SOFT = '#EFD9A0', GOLD_DEEP = '#C9A24E', BEIGE = '#F0EFDF', CREAM = '#FBF8EF';
const font = (f) => `file://${DS}/public/fonts/${f}`;

const PAGE = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Gotham; src: url(${font('Gotham-Black.otf')}) format('opentype'); font-weight: 900; }
@font-face { font-family: Gotham; src: url(${font('Gotham-Bold.otf')}) format('opentype'); font-weight: 700; }
html, body { margin: 0; background: transparent; }
#stage { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; font-family: Gotham, sans-serif; }
.cap { position: absolute; left: 0; top: ${CENTER_Y}px; width: max-content; display: flex; flex-direction: column; align-items: center; gap: 9px; opacity: 0; transform-origin: 50% 50%; will-change: transform, opacity; }
.line { display: flex; gap: .26em; white-space: nowrap; font-weight: 900; text-transform: uppercase; line-height: 1; letter-spacing: .012em; }
.w { display: inline-block; transform-origin: 50% 60%; }

/* say: the forest button, cream caps, the spoken word in gold */
.say .line { font-size: 62px; padding: 17px 30px 13px; border-radius: 23px; color: ${BEIGE};
  background: linear-gradient(180deg, #0B5E33 0%, ${FOREST} 52%, #00401F 100%);
  box-shadow: 0 10px 26px rgba(0, 24, 12, .42), 0 2px 0 rgba(0, 24, 12, .5), inset 0 1.5px 0 rgba(255, 255, 255, .12); }
.say .w.now { color: ${GOLD}; }

/* offer: gold with dark green on it, the loudest pairing, kept for the deal */
.offer .line { font-size: 88px; padding: 20px 36px 14px; border-radius: 28px; color: ${FOREST};
  background: linear-gradient(180deg, ${GOLD_SOFT} 0%, ${GOLD} 48%, ${GOLD_DEEP} 100%);
  box-shadow: 0 14px 34px rgba(0, 24, 12, .46), 0 3px 0 rgba(120, 90, 30, .55), inset 0 2px 0 rgba(255, 255, 255, .5); }
.offer.big .line { font-size: 168px; padding: 24px 44px 12px; border-radius: 38px; letter-spacing: -.005em; }

/* other: the second voice */
.other .line { font-size: 62px; padding: 17px 30px 13px; border-radius: 23px; color: ${FOREST};
  background: linear-gradient(180deg, ${CREAM} 0%, ${BEIGE} 100%);
  box-shadow: 0 10px 26px rgba(0, 24, 12, .42), 0 2px 0 rgba(0, 24, 12, .28), inset 0 1.5px 0 rgba(255, 255, 255, .8); }
</style></head><body><div id="stage"></div>
<script>
const CAPS = ${JSON.stringify(captions)};
const LEAD = 0.04;          // captions land a frame ahead of the voice, which reads as in sync
const stage = document.getElementById('stage');
const els = CAPS.map((c, i) => {
  const el = document.createElement('div');
  el.className = 'cap ' + c.style + (c.big ? ' big' : '');
  c.words = [];
  for (const line of c.lines) {
    const l = document.createElement('div'); l.className = 'line';
    for (const [text, t] of line) { const w = document.createElement('span'); w.className = 'w'; w.textContent = text; l.appendChild(w); c.words.push({ el: w, t }); }
    el.appendChild(l);
  }
  el.style.left = (c.x ?? ${W / 2}) + 'px';
  el.style.top = (c.y ?? ${CENTER_Y}) + 'px';
  stage.appendChild(el);
  c.start = c.words[0].t - LEAD;
  return el;
});
CAPS.forEach((c, i) => {
  const next = CAPS[i + 1];
  // hold a caption until the next one lands if the gap is short, so the screen never blinks empty mid-sentence
  c.bridged = !!next && next.start - c.end < 0.32;
  c.out = c.bridged ? next.start : c.end + 0.14;
  c.tilt = c.style === 'offer' ? (i % 2 ? 2 : -2.4) : c.style === 'other' ? 1.6 : 0;
});
// fit: no line wider than the safe width
window.fit = () => els.forEach((el, i) => {
  const wide = Math.max(...[...el.children].map((l) => l.getBoundingClientRect().width));
  CAPS[i].fit = Math.min(1, (CAPS[i].max ?? ${MAX_LINE}) / wide);
});
const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
// a quick overshoot and settle: up to 1.06, back to 1
const pop = (p, from, dur) => { const x = Math.min(1, Math.max(0, p / dur)); return x < 0.62 ? from + (1.06 - from) * ease(x / 0.62) : 1.06 - 0.06 * ease((x - 0.62) / 0.38); };
window.setTime = (t) => {
  CAPS.forEach((c, i) => {
    const el = els[i];
    if (t < c.start || t >= c.out) { el.style.opacity = 0; return; }
    const p = t - c.start;
    const hero = c.style === 'offer';
    const s = c.fit * pop(p, hero ? 0.72 : 0.84, hero ? 0.22 : 0.16);
    const fadeOut = c.bridged ? 1 : Math.min(1, (c.out - t) / 0.1);
    // already most of the way in on its first frame: the caption before it leaves on that same
    // frame, and a blank frame between two captions reads as a flicker
    el.style.opacity = Math.min(1, 0.6 + p / 0.05) * fadeOut;
    el.style.transform = 'translate(-50%, -50%) rotate(' + c.tilt + 'deg) scale(' + s + ')';
    c.words.forEach((w, k) => {
      const said = t >= w.t - LEAD, last = k === c.words.length - 1;
      const now = said && (last || t < c.words[k + 1].t - LEAD);
      w.el.className = 'w' + (now ? ' now' : '');
      w.el.style.opacity = said ? 1 : 0.46;
      const b = said ? Math.max(0, 1 - (t - (w.t - LEAD)) / 0.16) : 0;   // a small lift as each word is said
      w.el.style.transform = 'scale(' + (1 + 0.07 * b * b) + ')';
    });
  });
};
</script></body></html>`;

// the logo, drawn once: the beige lockup, top centre, with a soft shadow so it holds on a bright ceiling
async function logoOverlay() {
  const h = 172;
  const mark = await sharp(`${DS}/public/logo/lockup-milonga-beige.png`).resize({ height: h }).png().toBuffer();
  const { width: w } = await sharp(mark).metadata();
  // shadow: the lockup's own shape in dark forest, blurred
  const alpha = await sharp(mark).extractChannel(3).toBuffer();
  const pad = 40;
  const shadow = await sharp({ create: { width: w, height: h, channels: 3, background: '#00180C' } }).joinChannel(alpha).png().toBuffer();
  const shadowBlur = await sharp({ create: { width: w + 2 * pad, height: h + 2 * pad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: shadow, left: pad, top: pad + 5 }]).png().toBuffer().then((b) => sharp(b).blur(9).linear([1, 1, 1, 0.9], [0, 0, 0, 0]).png().toBuffer());
  const top = 196; // below where Reels and TikTok put their own header
  return sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: shadowBlur, left: Math.round((W - w) / 2) - pad, top: top - pad }, { input: mark, left: Math.round((W - w) / 2), top }])
    .png().toBuffer();
}

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
const logo = await logoOverlay();
fs.writeFileSync(`${tmp}/logo.png`, logo);

// ── preview: one still per caption, captions and logo laid over the real frame ──
{
  const times = captions.map((c) => { const ws = c.lines.flat(); return ws[Math.min(ws.length - 1, Math.ceil(ws.length / 2))][1] + 0.12; });
  const tiles = [];
  for (const t of times) {
    const frame = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(t), '-i', SRC, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 64e6 });
    const cap = await shot(t);
    // composite first, resize after: sharp resizes before it composites within one pipeline
    const full = await sharp(frame).composite([{ input: logo, left: 0, top: 0 }, { input: cap, left: 0, top: STRIP.top }]).png().toBuffer();
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
  const srt = captions.map((c, i) => `${i + 1}\n${ts(c.lines[0][0][1])} --> ${ts(c.end)}\n${c.lines.map((l) => l.map((w) => w[0]).join(' ')).join('\n')}\n`).join('\n');
  fs.writeFileSync(`${HERE}/captions.srt`, srt);
  console.log('wrote', `${HERE}/captions.srt`);
}

if (!PREVIEW) {
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', SRC]).toString());
  const frames = Math.round(dur * FPS);
  fs.mkdirSync(`${tmp}/f`);
  for (let i = 0; i < frames; i++) {
    fs.writeFileSync(`${tmp}/f/${String(i).padStart(5, '0')}.png`, await shot(i / FPS));
    if (i % 150 === 0) console.log(`  caption frames ${i}/${frames}`);
  }
  const out = `${HERE}/black-friday-ad-captioned.mp4`;
  // The overlays are RGB; they are converted to the footage's own BT.709 so the brand colours land
  // where they should. Sound is copied, not re-encoded.
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', SRC, '-framerate', String(FPS), '-i', `${tmp}/f/%05d.png`, '-loop', '1', '-i', `${tmp}/logo.png`,
    '-filter_complex',
    `[1:v]scale=out_color_matrix=bt709:out_range=tv,format=yuva444p[cap];[2:v]scale=out_color_matrix=bt709:out_range=tv,format=yuva444p[logo];` +
    `[0:v][logo]overlay=0:0:shortest=1[a];[a][cap]overlay=0:${STRIP.top}:eof_action=pass,format=yuv420p[v]`,
    '-map', '[v]', '-map', '0:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-r', String(FPS),
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-c:a', 'copy', '-movflags', '+faststart', out], { stdio: 'inherit' });
  console.log('wrote', out);
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
