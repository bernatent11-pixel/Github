// Canonical PNG export: inline SVG in DOM so installed brand fonts apply.
import { createRequire } from 'node:module';
const { chromium } = createRequire('/opt/node-tools/node_modules/x.js')('playwright');
import fs from 'node:fs';
const files = fs.readdirSync('svg').filter(f => f.endsWith('.svg'));
fs.mkdirSync('png', { recursive: true });
const widths = { 'luz-appicon': 512, 'luz-favicon': 512, 'luz-avatar': 512 };
const b = await chromium.launch();
const p = await b.newPage();
for (const f of files) {
  const name = f.replace('.svg', '');
  const svg = fs.readFileSync('svg/' + f, 'utf8');
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  const base = widths[name] || 600;
  const dark = /white|watermark/.test(name);
  for (const [sfx, mult] of [['', 1], ['@2x', 2], ['@4x', 4]]) {
    const w = Math.round(base * mult), h = Math.round(w * vb[3] / vb[2]);
    await p.setViewportSize({ width: Math.max(w, 10), height: Math.max(h, 10) });
    await p.setContent(`<body style="margin:0;background:${dark ? '#004D27' : 'transparent'}">
      <div style="width:${w}px;height:${h}px">${svg.replace('<svg ', '<svg style="width:100%;height:100%" ')}</div>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `png/${name}${sfx}.png`, omitBackground: !dark });
  }
}
await b.close();
console.log('exported', files.length * 3, 'PNGs');
