// "If you want / You need" — a 9:16 story graphic for the Mate Latte, on the
// gold of the Mate Latte banner, its content fitted into Bernat's safe box
// (see BOX). Built as an SVG with LIVE TEXT so it drops
// into Figma as editable text layers (Montserrat), plus a PNG for checking.
//
// Left column: words only. Right column: our branded circles (forest, cream
// icon) with the ingredient. The flavor row uses the brand's hot-latte cup —
// there is no vanilla mark among the seven.
//
// Usage: node social/mate-latte-if-you-want/make.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import { chromium } from 'playwright';

const DIR = 'social/mate-latte-if-you-want';
const W = 1080, H = 1920;
const FOREST = '#004D27', INK = '#12331F';
const FONT = "Montserrat, 'Helvetica Neue', Arial, sans-serif";

const b64 = async (file, height) => 'data:image/png;base64,' +
  (await sharp(file).resize({ height }).png().toBuffer()).toString('base64');

const ROWS = [
  { want: ['Coffee-level', 'energy'], need: ['100mg Caffeine'], sub: '(from Yerba Mate)', icon: 'yerba-mate' },
  { want: ['No jitters'], need: ['L-Theanine'], icon: 'l-theanine' },
  { want: ['Enhanced', 'focus'], need: ['Lion’s Mane', 'Mushroom'], icon: 'lions-mane' },
  { want: ['Delicious', 'flavor'], need: ['Vanilla, honey', '& monk fruit'], icon: 'hot' },
];

// The safe box the content must sit in (Bernat's frame): 5.04%–94.30% of the
// width, 12.56%–65.92% of the height of the 9:16 frame. The gold background
// still fills the whole frame; only the content is fitted into the box.
const BOX = { x: 0.0504 * W, y: 0.1256 * H, w: (0.9430 - 0.0504) * W, h: (0.6592 - 0.1256) * H };

// Geometry, in content units (laid out at 1x, then scaled to fit BOX)
const TOP = 70;             // column headers baseline
const GRID_TOP = 120, ROW_H = 200;
const GRID_BOTTOM = GRID_TOP + ROW_H * ROWS.length;
const COL_X = 470;          // the vertical rule
const LEFT_X = 92;          // left text
const CIRCLE_CX = 580, R = 66;
const RIGHT_X = 676;        // right text

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

async function svg() {
  // Content extents in content units: rules span 70..W-70; the headers' cap
  // tops sit ~46 above their baseline; the pouch (with its shadow) is lowest.
  const pouchH = Math.round(270 * 1441 / 894);
  const cx0 = 70, cx1 = W - 70, cy0 = TOP - 50, cy1 = GRID_BOTTOM + 30 + pouchH + 30;
  const sc = Math.min(BOX.w / (cx1 - cx0), BOX.h / (cy1 - cy0));
  const tx = BOX.x + (BOX.w - (cx1 - cx0) * sc) / 2 - cx0 * sc;
  const ty = BOX.y + (BOX.h - (cy1 - cy0) * sc) / 2 - cy0 * sc;
  const fit = `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${sc.toFixed(4)})`;
  console.log('content scale', sc.toFixed(3), 'box', BOX);
  const icons = {};
  for (const r of ROWS) icons[r.icon] = await b64(`public/brand/icons/${r.icon}-cream.png`, 140);
  const pouch = await b64('public/product/pouch-mate-latte-vanilla-packshot-corrected.png', 760);

  const rows = ROWS.map((r, i) => {
    const cy = GRID_TOP + ROW_H * i + ROW_H / 2;
    const wantLines = r.want.length;
    const wantY = cy - ((wantLines - 1) * 60) / 2 + 20;
    const needLines = r.need.length + (r.sub ? 1 : 0);
    const needY = cy - ((needLines - 1) * 48) / 2 + 15;
    const ih = 92; // icon height in the circle
    return `
  <g id="row-${i + 1}">
    <text id="want-${i + 1}" x="${LEFT_X}" y="${wantY}" font-family="${FONT}" font-size="54" font-weight="800" fill="${FOREST}">${
      r.want.map((t, k) => `<tspan x="${LEFT_X}" dy="${k ? 60 : 0}">${esc(t)}</tspan>`).join('')}</text>
    <circle cx="${CIRCLE_CX}" cy="${cy}" r="${R}" fill="${FOREST}"/>
    <image href="${icons[r.icon]}" x="${CIRCLE_CX - ih / 2}" y="${cy - ih / 2}" width="${ih}" height="${ih}" preserveAspectRatio="xMidYMid meet"/>
    <text id="need-${i + 1}" x="${RIGHT_X}" y="${needY}" font-family="${FONT}" font-size="40" font-weight="800" fill="${FOREST}">${
      r.need.map((t, k) => `<tspan x="${RIGHT_X}" dy="${k ? 48 : 0}">${esc(t)}</tspan>`).join('')}${
      r.sub ? `<tspan x="${RIGHT_X}" dy="48" font-size="32" font-weight="600" fill="${INK}">${esc(r.sub)}</tspan>` : ''}</text>
  </g>`;
  }).join('');

  // Rules: soft forest lines that fade out at their ends.
  const hRules = ROWS.slice(1).map((_, i) => {
    const y = GRID_TOP + ROW_H * (i + 1);
    return `<line x1="70" y1="${y}" x2="${W - 70}" y2="${y}" stroke="url(#fadeH)" stroke-width="3" stroke-linecap="round"/>`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="gold" cx="50%" cy="38%" r="75%">
      <stop offset="0" stop-color="#F8DE97"/>
      <stop offset="0.55" stop-color="#EBC46E"/>
      <stop offset="1" stop-color="#D6A046"/>
    </radialGradient>
    <radialGradient id="floor" cx="50%" cy="100%" r="60%">
      <stop offset="0" stop-color="#FFF1C4" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#FFF1C4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeH" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="${W - 70}" y2="0">
      <stop offset="0" stop-color="${FOREST}" stop-opacity="0"/>
      <stop offset="0.12" stop-color="${FOREST}" stop-opacity="0.45"/>
      <stop offset="0.88" stop-color="${FOREST}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${FOREST}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeV" gradientUnits="userSpaceOnUse" x1="0" y1="${GRID_TOP - 60}" x2="0" y2="${GRID_BOTTOM + 30}">
      <stop offset="0" stop-color="${FOREST}" stop-opacity="0"/>
      <stop offset="0.08" stop-color="${FOREST}" stop-opacity="0.45"/>
      <stop offset="0.92" stop-color="${FOREST}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${FOREST}" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#6B4A10" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect id="background" width="${W}" height="${H}" fill="url(#gold)"/>
  <rect id="floor-glow" x="0" y="${H - 700}" width="${W}" height="700" fill="url(#floor)"/>

  <g id="content" transform="${fit}">
  <text id="header-want" x="${LEFT_X}" y="${TOP}" font-family="${FONT}" font-size="56" font-weight="900" fill="${FOREST}">If you want:</text>
  <text id="header-need" x="${CIRCLE_CX - R}" y="${TOP}" font-family="${FONT}" font-size="56" font-weight="900" fill="${FOREST}">You need:</text>

  <line id="rule-vertical" x1="${COL_X}" y1="${GRID_TOP - 60}" x2="${COL_X}" y2="${GRID_BOTTOM + 30}" stroke="url(#fadeV)" stroke-width="3" stroke-linecap="round"/>
  <line id="rule-header" x1="70" y1="${GRID_TOP}" x2="${W - 70}" y2="${GRID_TOP}" stroke="url(#fadeH)" stroke-width="3" stroke-linecap="round"/>
  ${hRules}
${rows}

  <text id="cta" x="${LEFT_X}" y="${GRID_BOTTOM + 170}" font-family="${FONT}" font-size="48" font-weight="600" fill="${FOREST}"><tspan x="${LEFT_X}" dy="0">Try </tspan><tspan font-weight="900">the Mate Latte</tspan><tspan x="${LEFT_X}" dy="62">for coffee-level</tspan><tspan x="${LEFT_X}" dy="62">energy + flavor…</tspan><tspan x="${LEFT_X}" dy="62" font-style="italic" font-weight="800">minus the jitters.</tspan></text>

  <image id="mate-latte-pouch" href="${pouch}" x="${W - 70 - 270}" y="${GRID_BOTTOM + 30}" width="270" height="${Math.round(270 * 1441 / 894)}" preserveAspectRatio="xMidYMid meet" filter="url(#shadow)"/>
  </g>
</svg>
`;
}

const out = await svg();
fs.writeFileSync(`${DIR}/mate-latte-if-you-want.svg`, out);

// PNG: the same SVG in a page with Montserrat loaded, screenshotted at 1080x1920.
const font = fs.readFileSync('public/fonts/Montserrat.woff2').toString('base64');
const html = `<!doctype html><html><head><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal}
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:italic}
html,body{margin:0}</style></head><body>${out}</body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.setContent(html);
await page.waitForTimeout(800);
await page.screenshot({ path: `${DIR}/mate-latte-if-you-want.png` });
await browser.close();
console.log('wrote', `${DIR}/mate-latte-if-you-want.svg`, (out.length / 1024).toFixed(0) + ' KB', 'and .png');
