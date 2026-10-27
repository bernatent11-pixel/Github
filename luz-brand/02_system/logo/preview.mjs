// Quick visual proof sheet for geometry iteration.
import { writeFileSync } from 'node:fs';
import { wordmark, sunMark, landscapeBand, COLORS } from './geometry.mjs';

const wm = wordmark(COLORS.forest);
const wmGold = wordmark(COLORS.gold);
const sun = sunMark(COLORS.gold);
const rise = sunMark(COLORS.gold, { rise: true });
const band = landscapeBand(1000, 300, {});

const html = `<!doctype html><meta charset="utf-8"><body style="background:#777;margin:0;display:grid;gap:4px">
<div style="background:${COLORS.beige};padding:30px"><svg viewBox="-20 -20 ${wm.w + 40} 440" height="150"><g>${wm.content}</g></svg></div>
<div style="background:${COLORS.forest};padding:30px"><svg viewBox="-20 -20 ${wm.w + 40} 440" height="150">${wmGold.content}</svg></div>
<div style="background:${COLORS.forest};padding:20px"><svg viewBox="-180 -180 360 360" height="120">${sun.content}</svg>
<svg viewBox="-180 -180 360 190" height="80" style="margin-left:40px">${rise.content}</svg></div>
<div style="background:${COLORS.goldSoft}"><svg viewBox="0 0 1000 300" width="100%">${band}</svg></div>
</body>`;
writeFileSync('proof.html', html);
console.log('proof written');
