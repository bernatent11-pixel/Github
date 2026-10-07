// Cut the Citrus Mango can out of can-citrus-mango-hand.jpg for the comparison
// header: rebuilds the strips under the thumb and fingers from the label next
// to them, draws a clean lid over the fingers on top, and masks the cylinder.
// Usage: node scripts/cut-can-citrus-mango.cjs [preview.jpg]
const s=require('sharp');
(async()=>{
const {data,info}=await s('public/product/can-citrus-mango-hand.jpg').raw().toBuffer({resolveWithObject:true});
const W=info.width,C=info.channels;
const px=(x,y)=>{const i=(y*W+x)*C;return [data[i],data[i+1],data[i+2]]};
const set=(x,y,v)=>{const i=(y*W+x)*C;for(let k=0;k<3;k++)data[i+k]=Math.max(0,Math.min(255,Math.round(v[k])))};
const skin=p=>p[0]>p[1]&&p[1]>=p[2]-4&&p[0]-p[2]>14&&!(p[0]>215&&p[2]<120);
for(let y=1060;y<1400;y++){
  let L=0;for(let x=588;x<700;x++){if(skin(px(x,y)))L=x}
  if(L>0){L+=3;const src=px(L,y);for(let x=584;x<L;x++){const t=(x-588)/Math.max(1,L-588);const f=0.82+0.18*Math.min(1,Math.max(0,t));set(x,y,src.map(c=>c*f))}}
  if(y<1250){let R=0;for(let x=921;x>884;x--){if(skin(px(x,y)))R=x}
    if(R>0){R-=3;const src=px(R,y);for(let x=R+1;x<926;x++){const t=(921-x)/Math.max(1,921-R);const f=0.84+0.16*Math.min(1,Math.max(0,t));set(x,y,src.map(c=>c*f))}}}
}
const X0=560,Y0=960;const p=(x,y)=>[(x-X0),(y-Y0)];
let can=await s(data,{raw:{width:W,height:info.height,channels:C}}).extract({left:X0,top:Y0,width:400,height:960}).png().toBuffer();
const lid='<svg xmlns="http://www.w3.org/2000/svg" width="400" height="960"><defs>'+
 '<linearGradient id="r" x1="0" x2="1"><stop offset="0" stop-color="#8E949B"/><stop offset="0.35" stop-color="#E4E7EA"/><stop offset="0.6" stop-color="#C9CDD2"/><stop offset="1" stop-color="#7F858C"/></linearGradient>'+
 '<linearGradient id="i" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#A9AEB4"/><stop offset="1" stop-color="#D7DADE"/></linearGradient>'+
 '<linearGradient id="n" x1="0" x2="1"><stop offset="0" stop-color="#9AA0A6"/><stop offset="0.4" stop-color="#EEF0F2"/><stop offset="1" stop-color="#8A9096"/></linearGradient></defs>'+
 '<path d="M '+p(589,1040)+' L '+p(919,1040)+' L '+p(919,1072)+' L '+p(921,1100)+' C '+p(900,1092)+' '+p(608,1092)+' '+p(587,1100)+' L '+p(589,1072)+' Z" fill="url(#n)"/>'+
 '<ellipse cx="'+(754-X0)+'" cy="'+(1040-Y0)+'" rx="160" ry="36" fill="url(#r)"/>'+
 '<ellipse cx="'+(754-X0)+'" cy="'+(1042-Y0)+'" rx="144" ry="28" fill="url(#i)"/>'+
 '<rect x="'+(722-X0)+'" y="'+(1028-Y0)+'" width="64" height="22" rx="11" fill="#C3C7CC" stroke="#8C9298" stroke-width="2"/>'+
 '<ellipse cx="'+(754-X0)+'" cy="'+(1039-Y0)+'" rx="14" ry="6" fill="#7E848A"/></svg>';
can=await s(can).composite([{input:Buffer.from(lid)}]).png().toBuffer();
const d='M '+p(594,1040).join(' ')+' A 160 36 0 0 1 '+p(914,1040).join(' ')+' L '+p(919,1072).join(' ')+' L '+p(921,1100).join(' ')+' L '+p(919,1818).join(' ')+' L '+p(911,1838).join(' ')+' A 157 40 0 0 1 '+p(597,1838).join(' ')+' L '+p(587,1818).join(' ')+' L '+p(588,1100).join(' ')+' L '+p(589,1072).join(' ')+' Z';
const svg='<svg xmlns="http://www.w3.org/2000/svg" width="400" height="960"><path fill="#fff" d="'+d+'"/></svg>';
const mask=await s(Buffer.from(svg)).blur(0.8).extractChannel(0).toBuffer();
const cut=await s(await s(can).removeAlpha().toBuffer()).joinChannel(mask).png().toBuffer();
await s(cut).trim({threshold:1}).png().toFile('public/product/can-citrus-mango-cutout.png');
const m=await s('public/product/can-citrus-mango-cutout.png').metadata();
const full=await s('public/product/can-citrus-mango-cutout.png').resize({height:520}).png().toBuffer();
const small=await s('public/product/can-citrus-mango-cutout.png').resize({height:200}).png().toBuffer();
await s({create:{width:520,height:560,channels:3,background:'#004D27'}}).composite([{input:full,left:40,top:20},{input:small,left:360,top:320}]).jpeg({quality:90}).toFile(process.argv[2] || "/dev/null");
console.log(m.width,m.height);
})();
