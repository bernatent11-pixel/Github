// Assembles directions.html — the Phase 1 gate deliverable.
import { readFileSync, writeFileSync } from 'node:fs';

const inner = f => readFileSync(f, 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const wmA = inner('wordmark-A-hora-dorada.svg');
const wmB = inner('wordmark-B-la-ronda.svg');
const wmC = inner('wordmark-C-luz-de-oro.svg').replace(/<rect width="560" height="280" fill="#1D1710"\/>/, '');

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DHen3XjGocRP3YUHvr2HfOM3gL/';
const img = (t, id) => `${CDN}hf_20261027_${t}_${id}.png`;
const MOODS = {
  A: [
    [img('172409','ab2dcb38-256b-4841-81ea-0d2b0e5b716d'),'Golden-hour still life'],
    [img('172409','a1f01542-c3f3-415a-a63c-702c70cc0802'),'Latte swirl, travertine'],
    [img('172409','2e16b446-72b0-4e7a-8c97-6a363eebabc3'),'Cream enamel in raking light'],
    [img('172408','9c035254-9482-4daf-b397-8080d9b7715d'),'Balcony, golden hour'],
    [img('172409','d8b7114e-b868-4972-9125-a7f8577bf935'),'Gourd meets glass'],
    [img('172411','a34f1112-caa8-4f1d-a333-918e1f6263fe'),'Plant shadows on plaster'],
    [img('172409','82e4192a-d561-408d-bdfa-a395909f11f1'),'Hands, steam, backlight'],
  ],
  B: [
    [img('172408','eb3b2d19-c9b6-4510-a3d7-d20398a10a50'),'Kitchen table, mid-laugh'],
    [img('172409','14992be6-9fc5-4406-975f-b017e464d1fe'),'The ronda from above'],
    [img('172409','12a16067-b073-46ec-8dc4-51493822bbf9'),'Terracotta & cream ceramics'],
    [img('172409','5ab4402a-8478-4c29-a767-872705c03211'),'Patio refill'],
    [img('172410','37b80f38-3d50-4dfd-b037-1ca8bbdb775d'),'Clay, enamel, straw'],
    [img('172449','632c4ddb-e28b-477b-bb3d-fa1d6d453e2e'),'After the long lunch'],
    [img('172448','f75d0861-0757-46dd-9fba-c4aff1b36619'),'Street-corner table'],
  ],
  C: [
    [img('172448','e7c49ede-a87f-48b5-9510-40422b624baa'),'Light shaft, steam'],
    [img('172450','6a78dfbe-adaa-40cc-bda3-30293bfa023b'),'The golden pour'],
    [img('172448','f87a9b36-e23e-4377-942f-588b68967e84'),'Half-lit calm'],
    [img('172448','75ccd7d7-ed23-49a8-96a4-a6237dfe5e28'),'Dust in the beam'],
    [img('172451','61fca67e-62bb-4a69-a35e-2b21974ce3ff'),'Bronze, molten highlight'],
    [img('172447','115f47dd-0f1d-4b23-8732-9b863ea94400'),'Cup into the light'],
    [img('172448','14f12ff6-c06e-412b-84da-e3855347c80a'),'Pampas sunrise'],
  ],
};
const TINS = {
  A: img('172448','eeded74e-dbff-45f8-8441-4c99f883b1c2'),
  B: img('172448','fc4d10c0-056c-4ef2-9fac-2980b6061604'),
  C: img('172449','6797b2c1-56a6-4945-b26c-f421d1f2cc1c'),
};

// ---- vector tin face per direction ----
function tin({ body, bodyEdge, labelBg, wm, wmVB, textColor, accent, sub, font }) {
  // wm inner content scaled into label band
  return `<svg viewBox="0 0 420 600" style="max-width:300px;width:100%" role="img" aria-label="LUZ tin mockup">
  <defs>
    <linearGradient id="g${font}" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".12" stop-color="#000" stop-opacity="0"/>
      <stop offset=".45" stop-color="#fff" stop-opacity=".18"/><stop offset=".8" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".28"/>
    </linearGradient>
  </defs>
  <ellipse cx="210" cy="562" rx="150" ry="16" fill="#000" opacity=".10"/>
  <path d="M60,92 h300 v440 a150,22 0 0 1 -300,0 Z" fill="${body}"/>
  <ellipse cx="210" cy="92" rx="150" ry="24" fill="${bodyEdge}"/>
  <ellipse cx="210" cy="88" rx="142" ry="20" fill="${body}"/>
  <rect x="60" y="150" width="300" height="300" fill="${labelBg}"/>
  <path d="M60,150 h300 v300 h-300 Z M60,92 h300 v440 a150,22 0 0 1 -300,0 Z" fill="url(#g${font})" fill-rule="evenodd" opacity="0"/>
  <g transform="translate(96,196) scale(${228 / wmVB[0]})">${wm}</g>
  <text x="210" y="330" text-anchor="middle" font-family="${font}" font-size="14.5" letter-spacing="3.2" fill="${textColor}">YERBA MATE · VANILLA LATTE</text>
  <line x1="150" y1="352" x2="270" y2="352" stroke="${accent}" stroke-width="2"/>
  <text x="210" y="382" text-anchor="middle" font-family="${font}" font-size="13" letter-spacing="4.5" fill="${accent}" font-weight="600">GOLDEN CLARITY</text>
  <text x="210" y="428" text-anchor="middle" font-family="${font}" font-size="10.5" letter-spacing="1.6" fill="${textColor}" opacity=".75">${sub}</text>
  <path d="M60,92 h300 v440 a150,22 0 0 1 -300,0 Z" fill="url(#g${font})"/>
</svg>`;
}

const tinA = tin({ body:'#F3E9D5', bodyEdge:'#E4D6BC', labelBg:'#F7EFE0', wm:wmA, wmVB:[660,280],
  textColor:'#2B1F14', accent:'#C98F2D', sub:'VAINILLA · 15 SERVINGS · NET WT 255 g (9 oz)', font:'Fraunces' });
const tinB = tin({ body:'#F4ECDA', bodyEdge:'#C65A33', labelBg:'#F6EEDF', wm:wmB, wmVB:[760,280],
  textColor:'#27221B', accent:'#C65A33', sub:'VAINILLA · 15 SERVINGS · NET WT 255 g (9 oz)', font:'Figtree' });
const tinC = tin({ body:'#241C13', bodyEdge:'#3A2E1E', labelBg:'#1D1710', wm:wmC, wmVB:[560,280],
  textColor:'#F5EBD8', accent:'#E0A33B', sub:'VAINILLA · 15 SERVINGS · NET WT 255 g (9 oz)', font:'Work Sans' });

const chip = (hex, name) => `<div class="chip"><span class="sw" style="background:${hex}"></span><b>${name}</b><code>${hex}</code></div>`;

const PALETTES = {
  A: [['#F7EFE0','Crema'],['#2B1F14','Espresso'],['#D9A441','Oro'],['#5B6B3F','Mate Olive'],['#EFD9AF','Haze']],
  B: [['#F6EEDF','Crema'],['#27221B','Cacao'],['#DCA94E','Oro'],['#C65A33','Terracota'],['#647356','Mate Verde']],
  C: [['#1D1710','Noche'],['#F5EBD8','Crema'],['#E0A33B','Oro Fundido'],['#A8552B','Brasa'],['#8B8A6F','Humo']],
};

const mood = d => MOODS[d].map(([u, c]) => `<figure><img src="${u}" loading="lazy" alt="${c}"><figcaption>${c}</figcaption></figure>`).join('');

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LUZ Directions</title>
<meta name="description" content="Three identity territories for the LUZ rebrand — Phase 1 gate review.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Archivo:wght@400;600&family=Bricolage+Grotesque:wght@500;700&family=Figtree:wght@400;600&family=Anton&family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{--cream:#F7EFE0;--ink:#2B1F14;--oro:#C98F2D;--line:rgba(43,31,20,.14);--card:#FFFDF7}
:root:not([data-theme=light]){ }
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--cream:#17120C;--ink:#F0E7D6;--oro:#D9A441;--line:rgba(240,231,214,.16);--card:#201A12}}
:root[data-theme="dark"]{--cream:#17120C;--ink:#F0E7D6;--oro:#D9A441;--line:rgba(240,231,214,.16);--card:#201A12}
*{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--ink);font:16px/1.65 Figtree,system-ui,sans-serif;padding:0 16px}
.wrap{max-width:1080px;margin:0 auto}
header{padding:72px 0 40px;border-bottom:1px solid var(--line)}
h1{font-family:Fraunces,serif;font-size:clamp(34px,6vw,58px);line-height:1.05;margin:0 0 14px}
.lede{max-width:62ch;font-size:18px}
h2{font-family:Fraunces,serif;font-size:clamp(26px,4vw,38px);margin:0}
.dir{padding:56px 0;border-bottom:1px solid var(--line)}
.eyebrow{letter-spacing:.22em;font-size:12px;font-weight:600;text-transform:uppercase;color:var(--oro)}
.idea{font-size:19px;max-width:66ch}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:22px 0}
.grid figure{margin:0}.grid img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:10px;display:block;background:#8884}
.grid figcaption{font-size:11.5px;opacity:.65;padding-top:4px}
.row{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:26px;margin-top:26px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px}
.card h3{margin:0 0 12px;font-size:13px;letter-spacing:.18em;text-transform:uppercase;opacity:.7}
.wm{background:#F7EFE0;border-radius:10px;padding:8px}
.wm.dark{background:#1D1710}
.wm svg{width:100%;height:auto;display:block}
.chips{display:flex;flex-wrap:wrap;gap:10px}
.chip{display:flex;align-items:center;gap:8px;font-size:13px}
.chip .sw{width:30px;height:30px;border-radius:8px;border:1px solid var(--line);display:inline-block}
.chip code{opacity:.6;font-size:12px}
.type-sample .d{font-size:30px;line-height:1.1;margin:0 0 6px}
.type-sample p{margin:4px 0}
.tins{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;align-items:start}
.tins .scene{position:relative;border-radius:12px;overflow:hidden}
.tins .scene img{width:100%;display:block}
.cap{font-size:12px;opacity:.65;margin-top:6px}
table{border-collapse:collapse;width:100%;font-size:14.5px;margin:18px 0}
th,td{border:1px solid var(--line);padding:9px 11px;text-align:left;vertical-align:top}
th{font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.win{background:color-mix(in srgb, var(--oro) 14%, transparent)}
.rec{background:var(--card);border:2px solid var(--oro);border-radius:16px;padding:28px;margin:48px 0}
.overlay-label{position:absolute;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:6px}
footer{padding:40px 0 80px;font-size:13px;opacity:.7}
.anton{font-family:Anton}
</style></head><body><div class="wrap">

<header>
  <div class="eyebrow">LUZ · Phase 1 · Gate Review</div>
  <h1>Three ways to carry the light.</h1>
  <p class="lede">Each territory is an <b>evolution</b> of the current LUZ tin — all three keep the equity we audited (the name, cream base, gold-as-light, green demoted to heritage accent, the tin as ritual object, <i>Golden Clarity</i>) and fix the audited weaknesses (Fredoka's childishness, fake-foil gradients, no symbol, no culture). Moodboards are Higgsfield studies; every wordmark is hand-built vector. Pick one — Corbin's feedback welcome on all three.</p>
</header>

<section class="dir" id="a">
  <div class="eyebrow">Direction A</div>
  <h2>Hora Dorada — the golden hour you pour</h2>
  <p class="idea"><b>Idea:</b> LUZ is the hour when light turns gold and everything slows. Editorial warmth: flared semi-serif wordmark holding a sun in the U (the vessel that carries light), long shadows, linen, travertine. <b>Rationale:</b> it upgrades the current tin's calm premium instinct into something gallery-grade, and owns golden-hour photography no competitor touches.</p>
  <div class="grid">${mood('A')}</div>
  <div class="row">
    <div class="card"><h3>Draft wordmark</h3><div class="wm"><svg viewBox="0 0 660 280">${wmA}</svg></div>
      <p class="cap">Flared stems (trumpet, not slab) keep it modern; the gold sun sits in the U's counter and doubles as the standalone symbol.</p></div>
    <div class="card"><h3>Palette</h3><div class="chips">${PALETTES.A.map(p=>chip(p[0],p[1])).join('')}</div>
      <p class="cap">Gold is one flat ink (#D9A441) — metallic rendition on tin is a printed foil spec, never a gradient.</p>
      <h3 style="margin-top:18px">Type pairing</h3>
      <div class="type-sample"><p class="d" style="font-family:Fraunces,serif;font-weight:600">Fraunces — La hora dorada</p>
      <p style="font-family:Archivo">Archivo for everything that works: body, UI, captions. Both OFL (free).</p></div></div>
  </div>
  <div class="row tins">
    <div><h3 class="eyebrow" style="letter-spacing:.14em">Hero tin — vector mockup</h3>${tinA}</div>
    <div><h3 class="eyebrow" style="letter-spacing:.14em">In scene (Higgsfield study)</h3>
      <div class="scene"><img src="${TINS.A}" alt="Cream tin, golden hour counter">
        <div class="overlay-label" style="top:42%;width:34%;height:26%;background:#F7EFE0;box-shadow:inset 8px 0 14px rgba(0,0,0,.12), inset -8px 0 14px rgba(0,0,0,.18)">
          <svg viewBox="0 0 660 280" style="width:78%">${wmA}</svg>
          <div style="font-family:Fraunces;font-size:min(1.1vw,8px);letter-spacing:.25em;color:#2B1F14">GOLDEN CLARITY</div>
        </div></div>
      <p class="cap">Blank tin generated (nano banana pro), label overlaid live as vector — position is approximate; final composites land in Phase 3.</p></div>
  </div>
</section>

<section class="dir" id="b">
  <div class="eyebrow">Direction B</div>
  <h2>La Ronda — the circle you share</h2>
  <p class="idea"><b>Idea:</b> Mate is drunk in a round, and the round is the brand: a rounded mono-stroke wordmark grown up from the current Fredoka friendliness, plus the <i>ronda ring</i> — three arcs (gold, terracotta, cacao: three friends around the gourd) with a gap that is always <i>your seat</i>. <b>Rationale:</b> it is the only territory that makes the positioning (ritual first, together or alone) literally visible, and it hands social channels an endless circle-based graphic system.</p>
  <div class="grid">${mood('B')}</div>
  <div class="row">
    <div class="card"><h3>Draft wordmark + ronda ring</h3><div class="wm"><svg viewBox="0 0 760 280">${wmB}</svg></div>
      <p class="cap">Mono-stroke round forms, confident spacing — warm without being childish. The ring works alone at 16&nbsp;px.</p></div>
    <div class="card"><h3>Palette</h3><div class="chips">${PALETTES.B.map(p=>chip(p[0],p[1])).join('')}</div>
      <p class="cap">Terracotta is the new voice in the room — clay, patio, cafecito — and the anti-cannabis, anti-clinical accent.</p>
      <h3 style="margin-top:18px">Type pairing</h3>
      <div class="type-sample"><p class="d" style="font-family:'Bricolage Grotesque'">Bricolage Grotesque — ¿Un mate?</p>
      <p style="font-family:Figtree">Figtree for body and UI — friendly geometry, superb at small sizes. Both OFL (free).</p></div></div>
  </div>
  <div class="row tins">
    <div><h3 class="eyebrow" style="letter-spacing:.14em">Hero tin — vector mockup</h3>${tinB}</div>
    <div><h3 class="eyebrow" style="letter-spacing:.14em">In scene (Higgsfield study)</h3>
      <div class="scene"><img src="${TINS.B}" alt="Cream tin with terracotta lid on social table">
        <div class="overlay-label" style="top:42%;width:34%;height:26%;background:#F6EEDF;box-shadow:inset 8px 0 14px rgba(0,0,0,.12), inset -8px 0 14px rgba(0,0,0,.18)">
          <svg viewBox="0 0 760 280" style="width:82%">${wmB}</svg>
          <div style="font-family:Figtree;font-size:min(1.1vw,8px);letter-spacing:.25em;color:#27221B">GOLDEN CLARITY</div>
        </div></div>
      <p class="cap">Blank tin generated (nano banana pro), label overlaid live as vector — position approximate; final composites in Phase 3.</p></div>
  </div>
</section>

<section class="dir" id="c">
  <div class="eyebrow">Direction C</div>
  <h2>Luz de Oro — light, cinematic</h2>
  <p class="idea"><b>Idea:</b> Treat light the way Liquid Death treats death: with total confidence. Condensed gold caps on warm espresso darkness, a beam of negative space cutting the Z, chiaroscuro photography. <b>Rationale:</b> maximum shelf drama and ad-stopping power; the dark field is warm brown, not old-Milonga green.</p>
  <div class="grid">${mood('C')}</div>
  <div class="row">
    <div class="card"><h3>Draft wordmark</h3><div class="wm dark"><svg viewBox="0 0 560 280">${wmC}</svg></div>
      <p class="cap">The beam through the Z is the device: one light shaft, repeatable across layouts.</p></div>
    <div class="card"><h3>Palette</h3><div class="chips">${PALETTES.C.map(p=>chip(p[0],p[1])).join('')}</div>
      <p class="cap">Espresso night is brown-black (no green) to keep distance from the old Milonga cans.</p>
      <h3 style="margin-top:18px">Type pairing</h3>
      <div class="type-sample"><p class="d anton">ANTON — LUZ DE ORO</p>
      <p style="font-family:'Work Sans'">Work Sans for body and UI. Both OFL (free).</p></div></div>
  </div>
  <div class="row tins">
    <div><h3 class="eyebrow" style="letter-spacing:.14em">Hero tin — vector mockup</h3>${tinC}</div>
    <div><h3 class="eyebrow" style="letter-spacing:.14em">In scene (Higgsfield study)</h3>
      <div class="scene"><img src="${TINS.C}" alt="Dark tin in golden beam">
        <div class="overlay-label" style="top:42%;width:34%;height:26%;background:#1D1710;box-shadow:inset 8px 0 14px rgba(0,0,0,.4), inset -8px 0 14px rgba(0,0,0,.5)">
          <svg viewBox="0 0 560 280" style="width:70%">${wmC}</svg>
          <div style="font-family:'Work Sans';font-size:min(1.1vw,8px);letter-spacing:.25em;color:#E0A33B">GOLDEN CLARITY</div>
        </div></div>
      <p class="cap">Blank tin generated (nano banana pro), label overlaid live as vector — position approximate; final composites in Phase 3.</p></div>
  </div>
</section>

<section class="dir">
  <h2>Scorecard</h2>
  <table>
    <tr><th>Criterion</th><th>A · Hora Dorada</th><th class="win">B · La Ronda</th><th>C · Luz de Oro</th></tr>
    <tr><td>Distinct vs. the 5 competitors</td><td>4/5 — cream+gold editorial is open space, mild premium-coffee adjacency</td><td class="win">4.5/5 — nobody owns the social circle; terracotta+ring separates it from Ryze's rounded-clinical look</td><td>4/5 — rare in functional powders, common in coffee/spirits; Liquid Death adjacency is visible</td></tr>
    <tr><td>Ritual / mate-culture fit</td><td>4/5 — golden hour = ritual time, but it's a solo mood</td><td class="win">5/5 — the ronda is the brand's geometry; sharing is built in</td><td>3/5 — drama over togetherness; the ronda disappears</td></tr>
    <tr><td>HARD NOs (wellness / serious / cheap)</td><td>Risk: drifts toward quiet-wellness seriousness</td><td class="win">Lowest risk — warm and talkative by construction; "cheap" risk from round forms is contained by spacing + photography</td><td>Risk: "too serious" — conflicts with balanced/present/talkative personality</td></tr>
    <tr><td>Legible at 16 px</td><td>Good; sun-dot clogs below 20 px (symbol scales alone)</td><td class="win">Excellent — mono-stroke forms and the ring are built for small</td><td>Wordmark yes; beam cut fills in below ~24 px</td></tr>
    <tr><td>Tin at 3 ft</td><td>Strong — espresso on cream</td><td class="win">Strong — cacao on cream, terracotta lid flags it on shelf</td><td>Strongest contrast, but reads "coffee/spirits" at distance</td></tr>
    <tr><td>One-color viability</td><td>Good — dot joins the ink</td><td class="win">Good — ring keeps its shape in one color</td><td>Good — mask survives one color</td></tr>
    <tr><td>Scales across channels</td><td>Site/email superb; social engine weaker (mood, not play)</td><td class="win">Best — circles generate patterns, stickers, story frames, UGC watermarks</td><td>Ads/TikTok covers superb; community surfaces feel cold</td></tr>
  </table>
</section>

<div class="rec">
  <div class="eyebrow">Recommendation</div>
  <h2 style="margin:6px 0 12px">Build on B — La Ronda — and let it absorb A's light.</h2>
  <p><b>Why B wins:</b> it is the only direction where the strategy is visible in the artwork — the circle literally is the ronda, the gap in the ring is the invitation, and it evolves (rather than replaces) the warmth of the current tin. It carries the lowest HARD-NO risk, the best small-size behavior, and the richest system for Instagram/TikTok, where this brand will live. The golden-hour photography rules from A become La Ronda's lighting direction — gold stays the light of the brand, so <i>Golden Clarity</i> keeps its meaning.</p>
  <p><b>Why A loses:</b> beautiful but solitary — it keeps slipping toward quiet premium wellness (a HARD NO) and gives social channels a mood, not a toolkit. <b>Why C loses:</b> it trades the brand's personality (warm, talkative, present) for drama; it would make superb ads for a different brand — one that drinks alone in the dark.</p>
</div>

<footer>
  LUZ · Phase 1 gate · Moodboards & blank-tin scenes: Higgsfield (nano banana pro / soul 2) · Wordmarks, palettes, tin faces: hand-built SVG · Fonts: Google Fonts, all SIL OFL · Spend so far: ~34 of 400 budgeted credits
</footer>
</div></body></html>`;

writeFileSync('directions.html', html);
console.log('directions.html written,', html.length, 'bytes');
