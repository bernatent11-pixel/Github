// Fetch the Montserrat (latin) woff2 fallback weights and emit a local @font-face
// stylesheet. Montserrat is SIL OFL — free to bundle. It is the email-safe
// fallback for Gotham (which most email clients strip).
import { mkdirSync, writeFileSync } from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const weights = [400, 500, 700, 900];
mkdirSync('public/fonts', { recursive: true });

const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Montserrat:wght@${weights.join(';')}&display=swap`, { headers: { 'User-Agent': UA } })).text();

// Split into @font-face blocks, keep only the /* latin */ (not latin-ext) ones.
const blocks = css.split('@font-face').slice(1);
const byWeight = {};
for (const b of blocks) {
  const w = b.match(/font-weight:\s*(\d+)/)?.[1];
  const range = b.match(/unicode-range:\s*([^;]+);/)?.[1] ?? '';
  const url = b.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  // latin subset covers basic ASCII (U+0000-00FF) and is not the -ext block.
  if (w && url && range.includes('U+0000-00FF')) byWeight[w] = url;
}

let out = '/* Montserrat (latin) — email-safe fallback for Gotham. SIL OFL. */\n';
for (const w of weights) {
  const url = byWeight[String(w)];
  if (!url) throw new Error('no latin url for weight ' + w);
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  const file = `Montserrat-${w}.woff2`;
  writeFileSync(`public/fonts/${file}`, buf);
  out += `@font-face{font-family:"Montserrat";font-style:normal;font-weight:${w};font-display:swap;src:url("./fonts/${file}") format("woff2");}\n`;
  console.log('saved', file, buf.length, 'bytes');
}
writeFileSync('src/styles/montserrat.css', out);
console.log('wrote src/styles/montserrat.css');
