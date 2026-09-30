import sharp from 'sharp';

// coffee-vs-mate slide 1 needs sky where this photograph has none.
//
// The still life is 1333 x 2000 with the mug starting about 250px down. In a
// 4:5 frame that leaves roughly 110 design units of clear green at the head —
// less than the title alone needs — and cropping to make room takes the foot
// off the pouch. So the picture is REBUILT at 4:5 instead: the whole
// composition, scaled down, sitting on more of its own backdrop.
//
// The backdrop is flat studio paper, which is what makes this possible. The
// ground is the photograph's own top rows stretched over the whole canvas, so
// it carries the same green and the same fall-off, and the inset is feathered
// into it. Stretching a STRIP rather than the whole picture is the point:
// scaling the photograph up to build a ground drags a blurred ghost of the
// mug into the space that was meant to be empty.
const SRC = 'public/product/vs-stilllife.jpg';
const W = 1333, H = 1666;              // 4:5
const TOP = 430;                        // clear band for the title, in source px
const PAD = 20;                         // and a little air under the composition
const FEATHER = 100;

const { width: SW, height: SH } = await sharp(SRC).metadata();
const IH = H - TOP - PAD;
const IW = Math.round(SW * IH / SH);
const LEFT = Math.round((W - IW) / 2);

const ground = await sharp(SRC).extract({ left: 0, top: 0, width: SW, height: 60 })
  .resize(W, H, { fit: 'fill' }).blur(14).png().toBuffer();

const pic = await sharp(SRC).resize(IW, IH).removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(IW * IH * 4);
const ramp = (d) => (d >= FEATHER ? 255 : Math.round(255 * (d / FEATHER) ** 0.85));
for (let y = 0; y < IH; y++) {
  const fy = ramp(Math.min(y, IH - 1 - y));
  for (let x = 0; x < IW; x++) {
    const s = (y * IW + x) * 3, d = (y * IW + x) * 4;
    rgba[d] = pic[s]; rgba[d + 1] = pic[s + 1]; rgba[d + 2] = pic[s + 2];
    rgba[d + 3] = Math.min(fy, ramp(Math.min(x, IW - 1 - x)));
  }
}
const soft = await sharp(rgba, { raw: { width: IW, height: IH, channels: 4 } }).png().toBuffer();

await sharp(ground)
  .composite([{ input: soft, left: LEFT, top: TOP }])
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toFile('public/product/vs-stilllife-tall.jpg');

console.log(`${W}x${H}; composition ${IW}x${IH} at ${LEFT},${TOP}`);
console.log(`clear band at head: ${Math.round(TOP / W * 600)} design units`);
