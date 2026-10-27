// LUZ Brand Book — self-contained HTML (inline SVG assets) + print styles for PDF.
import { readFileSync, writeFileSync } from 'node:fs';
import { wordmark, sunMark, landscapeBand, COLORS as C } from '../02_system/logo/geometry.mjs';

const svgFile = p => readFileSync(p, 'utf8');
const inline = p => svgFile(p).replace('<svg ', '<svg class="asset" ');
const LOGO = '../02_system/logo/svg', GFX = '../02_system/graphics/svg', PKG = '../03_applications/packaging/svg';

const wmF = wordmark(C.forest), wmG = wordmark(C.gold);
const colorData = JSON.parse(readFileSync('../02_system/color/tokens.json', 'utf8'));
const colorMD = readFileSync('../02_system/color/color.md', 'utf8');
const wcagRows = colorMD.split('\n').filter(l => /^\| .+ on .+ \| \d/.test(l))
  .map(l => l.split('|').slice(1, 4).map(s => s.trim()));

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DHen3XjGocRP3YUHvr2HfOM3gL/';
const SCENES = [
  ['hf_20261027_223048_a36b4a76-b7ce-446e-bea1-6c332f4fb419.png', 'Golden-hour counter'],
  ['hf_20261027_223048_4e5f3b0c-b781-4539-ac76-279ac6318a41.png', 'The ronda table'],
  ['hf_20261027_223048_4dd80c88-84b1-4bd7-865a-f65dfedac7d9.png', 'On the go'],
  ['hf_20261027_223048_1dbfc1c8-fcec-4259-a8e2-0bb406897e20.png', 'Ecommerce white (Amazon base)'],
  ['hf_20261027_223048_6e8dc2b2-0c04-4420-9503-484dc7f5e308.png', 'Powder reveal'],
  ['hf_20261027_223047_509f734f-a9e4-4519-b005-e766b2c917d2.png', 'Morning whisk'],
  ['hf_20261027_223047_659b3755-34fb-464b-a392-3324f2bbf52d.png', 'Sobremesa'],
  ['hf_20261027_223047_e9308686-7910-4def-be5d-cb5801adce44.png', 'Deep work'],
];

const misuse = (() => {
  const base = `<svg viewBox="-20 -60 ${wmF.w + 40} 520" class="mis">`;
  const end = '</svg>';
  return [
    [base + `<g transform="scale(1.6,1)">${wordmark('#004D27').content}</g>` + end, 'Don’t stretch or condense'],
    [base + `<g>${wordmark('#C62FA0').content}</g>` + end, 'Don’t recolor outside the palette'],
    [base + `<rect x="-20" y="-60" width="${wmF.w + 40}" height="520" fill="#EFD9A0"/><g>${wordmark('#E3BC62').content}</g>` + end, 'Don’t use gold on light grounds'],
    [base + `<g transform="rotate(-8 500 200)">${wordmark('#004D27').content}</g>` + end, 'Don’t rotate or tilt'],
    [base + `<g filter="drop-shadow(10px 12px 6px rgba(0,0,0,.45))">${wordmark('#004D27').content}</g>` + end, 'No drop shadows or effects'],
    [base + `<text x="0" y="330" font-family="Bodoni Moda" font-size="400" fill="#004D27">LUZ</text>` + end, 'Never retype the wordmark in a font'],
  ];
})();

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LUZ Brand Book</title>
<meta name="description" content="The LUZ identity system: story, logo, color, type, graphics, imagery, voice, packaging and applications.">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--forest:#004D27;--gold:#E3BC62;--leaf:#057441;--beige:#F0EFDF;--deep:#00351B;--soft:#EFD9A0;--cream:#FBF8EF;--ink:#12331F;--line:rgba(0,53,27,.15)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--beige:#0E1A12;--cream:#132317;--ink:#EDE9DA;--line:rgba(227,188,98,.22)}}
:root[data-theme="dark"]{--beige:#0E1A12;--cream:#132317;--ink:#EDE9DA;--line:rgba(227,188,98,.22)}
*{box-sizing:border-box}
body{margin:0;background:var(--beige);color:var(--ink);font:17px/1.65 "Hanken Grotesk",Arial,sans-serif;padding:0 16px}
.wrap{max-width:1060px;margin:0 auto}
h1,h2{font-family:"Bodoni Moda",Georgia,serif;font-weight:600;color:var(--ink)}
h1{font-size:clamp(40px,7vw,76px);line-height:1.12;margin:.25em 0}
h2{font-size:clamp(30px,4.5vw,46px);margin:0 0 .4em}
h3{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--leaf);margin:2em 0 .8em}
.eyebrow{font-weight:700;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
section{padding:72px 0;border-bottom:1px solid var(--line)}
.asset{width:100%;height:auto;display:block}
.cardgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
.card{background:var(--cream);border:1px solid var(--line);border-radius:14px;padding:18px}
.card.dark{background:var(--forest)}
.card p{font-size:13px;opacity:.75;margin:10px 0 0}
table{border-collapse:collapse;width:100%;font-size:14.5px}
th,td{border:1px solid var(--line);padding:8px 11px;text-align:left}
th{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase}
.sw{display:flex;flex-direction:column;border-radius:12px;overflow:hidden;border:1px solid var(--line)}
.sw .c{height:90px}.sw .i{background:var(--cream);padding:10px 12px;font-size:12.5px;line-height:1.5}
.grid-img{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
.grid-img figure{margin:0}.grid-img img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:10px;background:#8883}
.grid-img figcaption{font-size:11.5px;opacity:.65;padding-top:4px}
.mis{background:var(--beige);border-radius:8px}
.two{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:26px;align-items:start}
.note{background:var(--soft);color:#12331F;border-radius:12px;padding:14px 18px;font-size:14px}
.dodont td:first-child{color:var(--leaf);font-weight:600}.dodont td:last-child{opacity:.8}
nav{position:sticky;top:0;background:color-mix(in srgb,var(--beige) 88%,transparent);backdrop-filter:blur(8px);z-index:9;border-bottom:1px solid var(--line);margin:0 -16px;padding:10px 16px;font-size:13px;overflow-x:auto;white-space:nowrap}
nav a{color:var(--ink);text-decoration:none;margin-right:18px;opacity:.75}nav a:hover{color:var(--leaf);opacity:1}
code{background:var(--cream);padding:2px 6px;border-radius:6px;font-size:13px}
.hero{background:var(--forest);margin:0 -16px;padding:90px 16px 0;color:var(--beige)}
.hero .eyebrow{color:var(--gold)}
footer{padding:48px 0 90px;font-size:13px;opacity:.7}
@media print{nav{display:none}section{page-break-before:always;border:none}.hero{page-break-before:avoid}body{background:#fff}}
</style></head><body>

<div class="hero"><div class="wrap" style="padding-top:10px">
  <div class="eyebrow">Brand Book · v1.0 · ${new Date().toISOString().slice(0, 10)}</div>
  <h1 style="color:var(--beige)">LUZ<span style="color:var(--gold)">.</span></h1>
  <p style="max-width:58ch;font-size:19px">Yerba Mate Latte — the mate ritual, turned into the cup you look forward to. One brand idea everywhere: <b style="color:var(--gold)">Golden Clarity</b>.</p>
  <div style="max-width:540px;margin:48px 0 0">${inline(`${LOGO}/luz-lockup-tagline.svg`).replace('class="asset"', 'class="asset" style="background:#F0EFDF;border-radius:16px 16px 0 0;padding:24px"')}</div>
</div></div>

<nav class="wrap">${['story', 'logo', 'color', 'type', 'graphics', 'imagery', 'voice', 'packaging', 'applications', 'dodont', 'assets'].map(s => `<a href="#${s}">${s === 'dodont' ? 'Do/Don’t' : s[0].toUpperCase() + s.slice(1)}</a>`).join('')}</nav>
<div class="wrap">

<section id="story">
  <div class="eyebrow">01</div><h2>Brand story</h2>
  <div class="two"><div>
  <p><b>LUZ means light.</b> It started with a ritual: in South America, mate has always been more than something you drink — it's a reason to slow down, share, and be present. Founded by father-and-son duo Samer and Shadi Atassi (Shadi learned mate from his teammates chasing a football career in Argentina), LUZ brings that ritual into modern life: real mate energy, in a creamy vanilla latte, ready in thirty seconds.</p>
  <p><b>Position:</b> the modern expression of mate — an ancient ritual of presence, balance, energy and connection, turned into delicious, functional products for everyday life. Mate culture first, benefits second. A lifestyle brand, never a supplement brand.</p>
  <p><b>The product:</b> Vanilla Mate Latte — organic yerba mate extract (100&nbsp;mg natural caffeine), 500&nbsp;mg Lion's Mane, 200&nbsp;mg L-theanine. Creamy, dairy-free, honey + monk fruit, &lt;3&nbsp;g sugar, ~90 cal. Hot or iced. $34.99 · 15 servings.</p>
  </div><div>
  <table><tr><th colspan="2">On one line</th></tr>
  <tr><td>Essence</td><td>The mate moment: connection, conversation, presence</td></tr>
  <tr><td>Promise</td><td>The functional ritual you actually enjoy</td></tr>
  <tr><td>Personality</td><td>Creative · Warm · Natural · Expressive</td></tr>
  <tr><td>Tagline</td><td><b>Golden Clarity</b> (the only one)</td></tr>
  <tr><td>Community line</td><td>Pass it on.</td></tr>
  <tr><td>Never</td><td>Too wellness · too serious · too cheap · no cannabis echo</td></tr>
  <tr><td>Company</td><td>LUZ standalone; "Milonga Life Corp" legal line only</td></tr></table>
  </div></div>
</section>

<section id="logo">
  <div class="eyebrow">02</div><h2>Logo</h2>
  <p>The wordmark is <b>custom-drawn vector</b> (Didone-informed: thick stems, thin bowls, sharp slab serifs) — never typeset, never traced from AI output. The symbol is <b>el Sol</b>: a disc with eight tapered rays; its rising form sits on a horizon line.</p>
  <div class="cardgrid">
    <div class="card"><h3 style="margin-top:0">Primary wordmark</h3>${inline(`${LOGO}/luz-wordmark-forest.svg`)}</div>
    <div class="card dark"><h3 style="margin-top:0;color:var(--gold)">On forest</h3>${inline(`${LOGO}/luz-wordmark-gold.svg`)}</div>
    <div class="card"><h3 style="margin-top:0">Horizontal lockup</h3>${inline(`${LOGO}/luz-lockup-horizontal.svg`)}</div>
    <div class="card"><h3 style="margin-top:0">Stacked lockup</h3><div style="max-width:220px;margin:0 auto">${inline(`${LOGO}/luz-lockup-stacked.svg`)}</div></div>
    <div class="card"><h3 style="margin-top:0">Tagline lockup</h3>${inline(`${LOGO}/luz-lockup-tagline.svg`)}</div>
    <div class="card dark"><h3 style="margin-top:0;color:var(--gold)">El Sol — symbol</h3><div style="max-width:160px;margin:0 auto">${inline(`${LOGO}/luz-sol-gold.svg`)}</div></div>
    <div class="card"><h3 style="margin-top:0">App icon / favicon</h3><div style="max-width:140px;margin:0 auto">${inline(`${LOGO}/luz-appicon.svg`)}</div></div>
    <div class="card"><h3 style="margin-top:0">Social avatar</h3><div style="max-width:140px;margin:0 auto;border-radius:50%;overflow:hidden">${inline(`${LOGO}/luz-avatar.svg`)}</div></div>
    <div class="card dark"><h3 style="margin-top:0;color:var(--gold)">UGC watermark · 38%</h3>${inline(`${LOGO}/luz-watermark.svg`)}<p style="color:var(--beige)">Bottom-right, 24&nbsp;px margin, 12% of video width (min 86&nbsp;px).</p></div>
  </div>
  <h3>Clear space & minimum size</h3>
  <div style="max-width:620px">${inline(`${LOGO}/luz-clearspace.svg`)}</div>
  <p>Clear space = ½ cap height on all sides. Minimum wordmark width <b>96&nbsp;px / 22&nbsp;mm</b>; below that, use el Sol alone (min 16&nbsp;px). One-color versions (black/white) ship in the kit for print and engraving.</p>
  <h3>Misuse</h3>
  <div class="cardgrid">${misuse.map(([s, t]) => `<div class="card">${s.replace('<svg ', '<svg class="asset" ')}<p>✕ ${t}</p></div>`).join('')}</div>
</section>

<section id="color">
  <div class="eyebrow">03</div><h2>Color</h2>
  <p>Five working colors + four support tones, inherited from the Milonga foundation — never invent a hex. On screen gold is flat <code>#E3BC62</code>; <b>on the tin, gold is a metallic print spec (PMS 871&nbsp;C or hot foil from the printer)</b> — never a CMYK gradient. Pantone values are nearest matches; confirm on a physical book.</p>
  <div class="cardgrid">${Object.entries(colorData.color).map(([k, v]) => `
    <div class="sw"><div class="c" style="background:${v.value};${k === 'white' || k === 'cream' || k === 'beige' ? 'border-bottom:1px solid var(--line)' : ''}"></div>
    <div class="i"><b>${k[0].toUpperCase() + k.slice(1)}</b> · ${v.value}<br>CMYK ${v.cmyk.join('/')}<br>${v.pantone}<br><span style="opacity:.75">${v.role}</span></div></div>`).join('')}
  </div>
  <h3>Ratios</h3>
  <p><b>Screen:</b> 60 beige · 25 forest · 12 gold · 3 leaf &nbsp;&nbsp; <b>Pack:</b> 55 gold (metallic) · 35 forest · 10 beige. One ground per piece.</p>
  <h3>Text pairings — WCAG 2.1 (computed)</h3>
  <table><tr><th>Pairing</th><th>Contrast</th><th>Verdict</th></tr>
  ${wcagRows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table>
  <p class="note">Forbidden: gold on beige, white on gold, long text in gold anywhere, white cards on beige, more than one ground per piece.</p>
</section>

<section id="type">
  <div class="eyebrow">04</div><h2>Type</h2>
  <div class="two"><div>
    <p style="font-family:'Bodoni Moda';font-size:46px;line-height:1.1;margin:0">Bodoni Moda<br><i style="color:var(--leaf)">la hora dorada</i></p>
    <p>Display serif — headlines, pull quotes, pack display. Optical size 96 at large sizes. <b>SIL OFL (free, commercial OK)</b>; on Google Fonts, Canva and Klaviyo.</p>
  </div><div>
    <p style="font-size:40px;font-weight:600;line-height:1.15;margin:0">Hanken Grotesk<br><span style="font-weight:400;opacity:.7">does all the work</span></p>
    <p>Body, UI, buttons, captions, panels. <b>SIL OFL</b>. Email fallbacks: Georgia (display) / Arial (text).</p>
  </div></div>
  <table><tr><th>Level</th><th>Face</th><th>Web</th><th>Email</th><th>Print</th><th>Track / lead</th></tr>
  <tr><td>H1</td><td>Bodoni Moda 600 (opsz 96)</td><td>40–64px</td><td>40px</td><td>42pt</td><td>-0.5% / 1.05</td></tr>
  <tr><td>H2</td><td>Bodoni Moda 500</td><td>32–44px</td><td>30px</td><td>26pt</td><td>0 / 1.12</td></tr>
  <tr><td>H3 / quote</td><td>Bodoni Moda 500 italic</td><td>22–26px</td><td>22px</td><td>16pt</td><td>0 / 1.3</td></tr>
  <tr><td>Eyebrow</td><td>Hanken 700 CAPS</td><td>12–13px</td><td>13px</td><td>8pt</td><td>+18% / 1.2</td></tr>
  <tr><td>Body</td><td>Hanken 400</td><td>16–18px</td><td>16px min</td><td>9.5pt</td><td>0 / 1.6</td></tr>
  <tr><td>Caption</td><td>Hanken 400</td><td>13px</td><td>13px</td><td>7pt</td><td>+1% / 1.45</td></tr></table>
  <p>Sentence case everywhere; caps only for eyebrows, buttons, one-word emphasis. The LUZ wordmark is never typeset in Bodoni Moda.</p>
</section>

<section id="graphics">
  <div class="eyebrow">05</div><h2>Graphic language</h2>
  <h3>El Monte — the landscape</h3>
  <div style="border-radius:14px;overflow:hidden">${inline(`${LOGO}/luz-landscape-band.svg`)}</div>
  <p>Layered treeline, beige sierra, rising sol — generated from brand geometry, so it is always consistent. It is the pack's label band, the web/email divider, and a croppable ground. Calm shapes only; never dense jungle, palms, or leaf motifs that could echo cannabis.</p>
  <h3>Icon chips</h3>
  <div class="cardgrid" style="grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
    ${['icon-mate-leaf', 'icon-lions-mane', 'icon-calma', 'icon-energia', 'icon-hot', 'icon-iced', 'icon-gourd'].map(i => `<div class="card" style="text-align:center">${inline(`${GFX}/${i}.svg`)}<p>${i.replace('icon-', '')}</p></div>`).join('')}
  </div>
  <p>Gold line art in a forest disc. Ingredients always travel together, in order: mate · lion's mane · L-theanine. Run icons big; never split a group, never recolor.</p>
  <h3>Pattern & texture</h3>
  <div class="cardgrid">
    <div class="card dark">${inline(`${GFX}/pattern-rayos.svg`)}<p style="color:var(--beige)">Rayos — tone-on-tone (grounds, unboxing interior)</p></div>
    <div class="card dark">${inline(`${GFX}/pattern-rayos-gold.svg`)}<p style="color:var(--beige)">Rayos gold — social frames</p></div>
    <div class="card dark">${inline(`${GFX}/texture-grain.svg`)}<p style="color:var(--beige)">Paper grain 6% — on forest/gold only, never beige, never over photos</p></div>
  </div>
</section>

<section id="imagery">
  <div class="eyebrow">06</div><h2>Imagery</h2>
  <p>Two modes from the foundation: <b>Polished</b> (editorial, golden-hour, Casalú-level — site, email, Amazon) and <b>Raw</b> (phone-shot, Bloom-style — TikTok, creators, performance). Signature light: warm, low, directional; steam made visible by backlight. People mid-moment, never posing. Never: clinical props, mushroom imagery, grassy wellness, jungle density, anything cannabis-adjacent.</p>
  <div class="note">AI imagery rules: no logos or label text in prompts; the approved tin travels as a reference image; <b>every output is reviewed for label distortion — warped text means discard or composite the vector artwork.</b> People → soul_2 · product → nano_banana_pro · motion → seedance_2_0 / kling3_0. The full 17-prompt tested bank lives in <code>02_system/imagery/imagery.md</code>.</div>
  <h3>From the tested bank (links render in browser; also in the chat gallery)</h3>
  <div class="grid-img">${SCENES.map(([f, c]) => `<figure><img loading="lazy" src="${CDN + f}" alt="${c}"><figcaption>${c}</figcaption></figure>`).join('')}</div>
</section>

<section id="voice">
  <div class="eyebrow">07</div><h2>Voice</h2>
  <p><b>The Argentine friend everyone wants at the table.</b> Short sentences. "You" more than "we". Funny, never mean. Functional, never medicinal. The feeling leads, facts back it up — "supports", never "boosts". LUZ adds the register of light: write the moment the light hits the table, not the ingredient list.</p>
  <table class="dodont"><tr><th>✅ Do</th><th>✕ Don't</th></tr>
  <tr><td>"Morning, aligned. Pour the light."</td><td>"Optimize your morning routine with nootropics."</td></tr>
  <tr><td>"Che, your 2pm self called. It says thanks."</td><td>"Say goodbye to the afternoon crash forever!"</td></tr>
  <tr><td>"Made for the long sobremesa."</td><td>"Engineered for maximum productivity."</td></tr>
  <tr><td>"Supports focus you can actually feel."</td><td>"Boosts brainpower."</td></tr>
  <tr><td>"One tin. Fifteen slow mornings."</td><td>"CHEAPER THAN YOUR LATTE HABIT!!"</td></tr></table>
  <h3>Spanish sprinkle — max one word per piece</h3>
  <table><tr><th>Word</th><th>Use for</th><th>Rule</th></tr>
  <tr><td>mate</td><td>everywhere</td><td>the category word; never "matés"</td></tr>
  <tr><td>ronda</td><td>community moments</td><td>content only — never a program name</td></tr>
  <tr><td>cebar</td><td>ritual how-to</td><td>pair with a visual</td></tr>
  <tr><td>che</td><td>social hooks, subject lines</td><td>never on pack/legal</td></tr>
  <tr><td>dale</td><td>CTAs, replies</td><td>never on pack</td></tr>
  <tr><td>sobremesa</td><td>storytelling, email</td><td>monthly, not daily</td></tr>
  <tr><td>merienda</td><td>2–5pm content</td><td>afternoon-reset anchor</td></tr>
  <tr><td>tranquilo</td><td>reassurance</td><td>no "chill pill" jokes</td></tr>
  <tr><td>buenísimo</td><td>community replies</td><td>reactions only</td></tr>
  <tr><td>asado</td><td>lifestyle scenes</td><td>LUZ is present, not the point</td></tr></table>
  <p>Banned: boost · supercharge · detox · miracle · game-changing · "the only" · "the first" · competitor names. Tagline: <b>Golden Clarity</b>, never extended, never translated.</p>
</section>

<section id="packaging">
  <div class="eyebrow">08</div><h2>Packaging</h2>
  <p class="note"><b>Placeholder dieline.</b> Tin assumed Ø99 × H142&nbsp;mm; the real dieline, print process and metallic spec must come from the tin printer. Every data panel is a placeholder pending <code>regulatory-flags.md</code> (supplement vs. food route for Lion's Mane + L-theanine, claims, allergens, net weight).</p>
  <h3>Tin wrap — flat vector art</h3>
  ${inline(`${PKG}/tin-wrap-flat.svg`)}
  <h3>Lid band · stick pack · mailer</h3>
  <div class="cardgrid">
    <div class="card">${inline(`${PKG}/tin-lid-band.svg`)}<p>Lid band — GOLDEN CLARITY</p></div>
    <div class="card" style="max-width:260px">${inline(`${PKG}/stick-pack-front.svg`)}<p>Single-serve stick (trial)</p></div>
    <div class="card dark">${inline(`${PKG}/mailer-top.svg`)}<p style="color:var(--beige)">Shipping mailer — forest + gold; rayos inside, "La ronda starts here. Pass it on."</p></div>
  </div>
  <h3>In scene (Higgsfield, approved tin as reference)</h3>
  <div class="grid-img">${SCENES.slice(0, 5).map(([f, c]) => `<figure><img loading="lazy" src="${CDN + f}" alt="${c}"><figcaption>${c}</figcaption></figure>`).join('')}</div>
</section>

<section id="applications">
  <div class="eyebrow">09</div><h2>Applications</h2>
  <p>Everything ships in <code>03_applications/digital/</code>: <code>tokens.json</code> + <code>tokens.css</code> (site variables), a Klaviyo-ready email template (600px, Forest header/footer, pill CTA, Georgia/Arial fallbacks), IG post/story/carousel masters, TikTok cover, Meta ad statics (1:1, 4:5, 9:16) and the Amazon main-image spec.</p>
  <div class="cardgrid">
    ${['ig-post', 'ig-story', 'tiktok-cover'].map(t => `<div class="card">${inline(`../03_applications/digital/templates/${t}.svg`)}<p>${t}</p></div>`).join('')}
    ${['meta-ad-1x1', 'meta-ad-4x5', 'meta-ad-9x16'].map(t => `<div class="card">${inline(`../03_applications/digital/templates/${t}.svg`)}<p>${t}</p></div>`).join('')}
  </div>
  <p>Carousel master (cover + body slide): <code>templates/ig-carousel.svg</code>. Email: <code>templates/email-template.html</code>.</p>
</section>

<section id="dodont">
  <div class="eyebrow">10</div><h2>Do / Don't</h2>
  <table class="dodont"><tr><th>✅ Do</th><th>✕ Don't</th></tr>
  <tr><td>Gold tin, forest type, el monte band — shelf reads gold first</td><td>Cream/white tins, busy jungle illustration, flavor cartoons</td></tr>
  <tr><td>Golden-hour light in every polished shot</td><td>Clinical white-box wellness photography</td></tr>
  <tr><td>El Sol as avatar and stamp</td><td>Faces, 32-ray suns (flag territory), leaf symbols</td></tr>
  <tr><td>"Supports …" + one Spanish word max</td><td>"Boosts", medical promises, Spanish as costume</td></tr>
  <tr><td>Flat gold #E3BC62 on screen; PMS 871/foil in print</td><td>CMYK gradient "fake foil", bevels, glows</td></tr>
  <tr><td>Vector wordmark from the kit</td><td>Retyping LUZ in Bodoni (or any font), AI-generated logos</td></tr>
  <tr><td>One ground per piece (forest, beige, or gold)</td><td>Stacked grounds, white cards on beige</td></tr>
  <tr><td>Review AI scenes for label distortion</td><td>Publishing warped-label renders</td></tr></table>
</section>

<section id="assets">
  <div class="eyebrow">11</div><h2>Asset index</h2>
  <table>
  <tr><th>Asset</th><th>Path</th></tr>
  <tr><td>Logo suite — SVG masters + PNG 1x/2x/4x (forest/gold/black/white; lockups, sol, favicon, avatar, watermark, clear-space)</td><td><code>02_system/logo/svg · png</code></td></tr>
  <tr><td>Logo geometry source (regenerates everything)</td><td><code>02_system/logo/geometry.mjs</code></td></tr>
  <tr><td>Color: tokens, CSS vars, spec + WCAG</td><td><code>02_system/color/</code></td></tr>
  <tr><td>Type spec + OFL font files</td><td><code>02_system/type/</code></td></tr>
  <tr><td>Icons, patterns, monte band, texture</td><td><code>02_system/graphics/svg</code></td></tr>
  <tr><td>Imagery direction + 17-prompt tested bank</td><td><code>02_system/imagery/imagery.md</code></td></tr>
  <tr><td>Voice + Spanish glossary</td><td><code>02_system/voice.md</code></td></tr>
  <tr><td>Packaging flats (tin wrap, lid, stick, mailer) + regulatory flags</td><td><code>03_applications/packaging/</code></td></tr>
  <tr><td>Digital kit: tokens, email, social + ad templates, specs</td><td><code>03_applications/digital/</code></td></tr>
  <tr><td>Brand book (this file) + PDF + LUZ-in-60-seconds</td><td><code>04_brandbook/</code></td></tr>
  <tr><td>Decisions & assumptions log</td><td><code>decisions.md</code></td></tr></table>
</section>

<footer>LUZ Brand Book v1.0 — identity by hand-built vector; moodboards & scenes via Higgsfield (nano banana pro / soul 2 / seedance 2.0). Fonts: Bodoni Moda + Hanken Grotesk, SIL OFL. Photography links require internet; originals in the Higgsfield library.</footer>
</div></body></html>`;

writeFileSync('index.html', page);
console.log('brand book written:', (page.length / 1024).toFixed(0), 'KB');
