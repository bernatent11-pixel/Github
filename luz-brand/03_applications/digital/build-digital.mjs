// LUZ digital kit: design tokens, email template, social + ad templates.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { wordmark, sunMark, landscapeBand, COLORS as C } from '../../02_system/logo/geometry.mjs';

mkdirSync('templates', { recursive: true });
const save = (n, s) => { writeFileSync(n, s); console.log(n); };
const HANKEN = 'Hanken Grotesk, Arial, sans-serif', BODONI = 'Bodoni Moda, Georgia, serif';

/* ---------------- tokens ---------------- */
const colorTokens = JSON.parse(readFileSync('../../02_system/color/tokens.json', 'utf8'));
save('tokens.json', JSON.stringify({
  ...colorTokens,
  font: {
    display: { family: 'Bodoni Moda', fallback: 'Georgia, serif', weights: [500, 600], opticalSize: 96 },
    text: { family: 'Hanken Grotesk', fallback: 'Arial, sans-serif', weights: [400, 600, 700] },
  },
  size: { h1: 'clamp(40px,5vw,64px)', h2: 'clamp(32px,4vw,44px)', h3: '24px', body: '17px', caption: '13px', eyebrow: '12px' },
  space: { unit: 8, scale: [8, 16, 24, 32, 48, 64, 96] },
  radius: { card: 16, button: 999, image: 12 },
  shadow: { soft: '0 10px 30px rgba(0,53,27,.12)' },
}, null, 2));

save('tokens.css', `/* LUZ design tokens — generated */
:root{
${Object.entries(colorTokens.color).map(([k, v]) => `  --luz-${k}: ${v.value};`).join('\n')}
  --luz-font-display: "Bodoni Moda", Georgia, serif;
  --luz-font-text: "Hanken Grotesk", "Helvetica Neue", Arial, sans-serif;
  --luz-radius-card: 16px; --luz-radius-button: 999px;
  --luz-shadow-soft: 0 10px 30px rgba(0,53,27,.12);
}
`);

/* ---------------- email: header / module / footer (table-based, 600px) ---------------- */
const wmGold = wordmark(C.gold); const wmSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 ${wmGold.w + 40} 440" width="118"><g>${wmGold.content}</g></svg>`;
save('templates/email-template.html', `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>LUZ Email</title>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600&family=Hanken+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<style>body{margin:0;background:#F0EFDF}.btn:hover{background:#00351B!important}</style></head>
<body style="margin:0;background:#F0EFDF">
<!-- HEADER -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F0EFDF"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr><td align="center" style="background:#004D27;border-radius:16px 16px 0 0;padding:28px 0 22px">
    ${wmSvg.replace('<svg ', '<svg style="display:block" ')}
    <div style="font-family:${HANKEN};font-size:11px;letter-spacing:4px;color:#E3BC62;padding-top:10px">GOLDEN CLARITY</div>
  </td></tr>
  <!-- HERO MODULE -->
  <tr><td style="background:#FBF8EF;padding:40px 36px 8px" align="center">
    <div style="font-family:${HANKEN};font-weight:700;font-size:12px;letter-spacing:3px;color:#057441">EYEBROW LINE</div>
    <h1 style="font-family:${BODONI};font-weight:600;font-size:38px;line-height:1.1;color:#004D27;margin:14px 0">Morning, aligned.</h1>
    <p style="font-family:${HANKEN};font-size:16px;line-height:1.6;color:#12331F;margin:0 0 24px">Body copy kept small and warm. One idea per module, sentence case, "you" more than "we".</p>
  </td></tr>
  <!-- IMAGE MODULE -->
  <tr><td style="background:#FBF8EF;padding:0 36px" align="center">
    <div style="background:#EFD9A0;border-radius:12px;height:300px;line-height:300px;font-family:${HANKEN};color:#12331F;font-size:13px">[ IMAGE SLOT — polished mode, golden hour ]</div>
  </td></tr>
  <!-- CTA MODULE -->
  <tr><td style="background:#FBF8EF;padding:28px 36px 44px" align="center">
    <a class="btn" href="#" style="display:inline-block;background:#057441;color:#FBF8EF;font-family:${HANKEN};font-weight:700;font-size:16px;letter-spacing:1px;text-decoration:none;border-radius:999px;padding:16px 42px">PASS IT ON</a>
  </td></tr>
  <!-- FOOTER -->
  <tr><td style="background:#004D27;border-radius:0 0 16px 16px;padding:30px 36px" align="center">
    <div style="font-family:${BODONI};font-style:italic;font-size:18px;color:#E3BC62;padding-bottom:12px">A ritual worth coming back to.</div>
    <div style="font-family:${HANKEN};font-size:12px;line-height:1.7;color:#F0EFDF;opacity:.85">
      LUZ · [address placeholder] · <a href="#" style="color:#E3BC62">Unsubscribe</a> · <a href="#" style="color:#E3BC62">Preferences</a><br>
      © LUZ [year]. Distributed by Milonga Life Corp.
    </div>
  </td></tr>
</table></td></tr></table></body></html>`);

/* ---------------- social + ad templates (SVG masters) ---------------- */
const slot = (x, y, w, h, label) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#EFD9A0"/>
  <text x="${x + w / 2}" y="${y + h / 2}" text-anchor="middle" font-family="${HANKEN}" font-size="28" fill="#12331F" opacity=".7">${label}</text>`;
const wmF = wordmark(C.forest), wmG = wordmark(C.gold);
const wmAt = (c, x, y, w) => `<g transform="translate(${x},${y}) scale(${w / c.w})">${c.content}</g>`;

// IG post 1080×1350 (4:5)
save('templates/ig-post.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="${C.beige}"/>
  ${slot(0, 0, 1080, 1000, '[ PHOTO — raw or polished ]')}
  <rect y="1000" width="1080" height="350" fill="${C.forest}"/>
  <text x="80" y="1135" font-family="${BODONI}" font-size="64" fill="${C.gold}">Che, slow down a second.</text>
  <text x="80" y="1205" font-family="${HANKEN}" font-size="30" fill="${C.beige}">One supporting line in sentence case.</text>
  ${wmAt(wmG, 800, 1230, 200)}
</svg>`);

// IG story / TikTok cover 1080×1920
save('templates/ig-story.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="${C.forest}"/>
  ${slot(80, 320, 920, 1100, '[ PHOTO / VIDEO FRAME ]')}
  <text x="540" y="200" text-anchor="middle" font-family="${HANKEN}" font-weight="700" font-size="34" letter-spacing="10" fill="${C.gold}">EYEBROW · SAFE ZONE 250px</text>
  <text x="540" y="1560" text-anchor="middle" font-family="${BODONI}" font-size="78" fill="${C.gold}">Golden Clarity</text>
  ${wmAt(wmG, 440, 1680, 200)}
  <g transform="translate(540,1860) scale(0.18)">${sunMark(C.gold, { rise: true }).content}</g>
</svg>`);

// TikTok cover variant: big serif title zone
save('templates/tiktok-cover.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
  ${slot(0, 0, 1080, 1920, '[ FULL-BLEED FRAME ]')}
  <rect width="1080" height="1920" fill="${C.forestDeep}" opacity=".35"/>
  <text x="540" y="860" text-anchor="middle" font-family="${BODONI}" font-weight="600" font-size="110" fill="${C.beige}">Mate, not coffee.</text>
  <text x="540" y="960" text-anchor="middle" font-family="${HANKEN}" font-weight="600" font-size="38" fill="${C.gold}">EP. 01 — LA RONDA</text>
  ${wmAt(wmG, 440, 1700, 200)}
</svg>`);

// carousel cover + body 1080×1350
save('templates/ig-carousel.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2240 1350">
  <g><rect width="1080" height="1350" fill="${C.forest}"/>
    <g transform="translate(540,330) scale(0.9)">${sunMark(C.gold).content}</g>
    <text x="540" y="760" text-anchor="middle" font-family="${BODONI}" font-size="86" fill="${C.beige}">What's in the tin?</text>
    <text x="540" y="840" text-anchor="middle" font-family="${HANKEN}" font-size="32" fill="${C.gold}">Swipe — 5 slides</text>
    ${wmAt(wmG, 440, 1150, 200)}</g>
  <g transform="translate(1160,0)"><rect width="1080" height="1350" fill="${C.beige}"/>
    <text x="90" y="200" font-family="${HANKEN}" font-weight="700" font-size="30" letter-spacing="8" fill="${C.leaf}">02 · LION’S MANE</text>
    <text x="90" y="330" font-family="${BODONI}" font-size="72" fill="${C.forest}">Focus, the calm kind.</text>
    ${slot(90, 420, 900, 640, '[ ICON CHIP OR PHOTO ]')}
    <text x="90" y="1180" font-family="${HANKEN}" font-size="30" fill="${C.ink}">Supports focus you can actually feel. One claim, one source, never medical.</text>
  </g>
</svg>`);

// Meta ads 1:1 / 4:5 / 9:16
const ad = (w, h, name) => save(`templates/meta-ad-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${C.beige}"/>
  ${slot(0, 0, w, Math.round(h * 0.62), '[ PRODUCT / LIFESTYLE SHOT ]')}
  <rect y="${Math.round(h * 0.62)}" width="${w}" height="${h}" fill="${C.forest}"/>
  <text x="${w / 2}" y="${Math.round(h * 0.62) + 110}" text-anchor="middle" font-family="${BODONI}" font-size="${Math.round(w / 14)}" fill="${C.gold}">Your alternative is still coffee.</text>
  <text x="${w / 2}" y="${Math.round(h * 0.62) + 185}" text-anchor="middle" font-family="${HANKEN}" font-size="${Math.round(w / 32)}" fill="${C.beige}">This isn’t. 100 mg of mate energy, zero coffee.</text>
  <rect x="${w / 2 - 150}" y="${h - 150}" width="300" height="86" rx="43" fill="${C.gold}"/>
  <text x="${w / 2}" y="${h - 95}" text-anchor="middle" font-family="${HANKEN}" font-weight="700" font-size="34" fill="${C.forest}">TRY LUZ</text>
</svg>`);
ad(1080, 1080, '1x1'); ad(1080, 1350, '4x5'); ad(1080, 1920, '9x16');

/* ---------------- specs ---------------- */
save('specs.md', `# LUZ Digital Specs

## Amazon main image
- 1:1, ≥2000×2000 px, pure white #FFFFFF background (prompt bank #4 base), product fills 80–85% of frame, no props/text/badges (Amazon policy). Secondary images: lifestyle (#1, #3), benefits infographic built from icon chips on Forest, powder reveal (#5), how-to (side-panel steps restyled).

## Meta ad statics
- Masters: templates/meta-ad-{1x1,4x5,9x16}.svg. Photo top ~62%, Forest message band, gold Bodoni hook ≤ 7 words, Hanken support line, gold pill CTA. Keep text <20% of image area for delivery.

## IG / TikTok
- Post 1080×1350; Story/Cover 1080×1920 with 250px top / 320px bottom safe zones. Captions: sentence case, ≤1 Spanish word, ≤1 emoji (foundation rule).

## Email (Klaviyo)
- templates/email-template.html: 600px table layout, Forest header/footer, Cream body, pill CTA (leaf ground). Fonts via Google Fonts with Georgia/Arial fallbacks; body min 16px; buttons are real HTML, never images.

## Watermark (creator/UGC)
- ../../02_system/logo/svg/luz-watermark.svg at 38% opacity, bottom-right, 24px margin, width 12% of video width (min 86px).
`);
console.log('digital kit done');
