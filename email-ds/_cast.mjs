import sharp from 'sharp';
// How far each slide's type band has been pushed from the photograph's own
// colour: rendered band vs the same band of the raw source, same crop.
const S = [
  ['1 passed', 'mate-passed.jpg', 'slide-01', 0.28, 0.06, 0.34],
  ['2 park',   'mate-park.jpg',   'slide-02', 0.34, 0.06, 0.46],
  ['3 circle', 'mate-circle.jpg', 'slide-03', 0.00, 0.06, 0.32],
  ['4 porch',  'mate-porch.jpg',  'slide-04', 0.00, 0.06, 0.46],
  ['5 table',  'mate-table.jpg',  'slide-05', 1.00, 0.38, 0.62],
];
const avg = async (buf) => {
  const st = await sharp(buf).stats();
  return st.channels.slice(0,3).map(c => Math.round(c.mean));
};
for (const [name, file, slide, focus, y0, y1] of S) {
  const m = await sharp(`public/product/${file}`).metadata();
  // reproduce object-fit: cover for a 4:5 frame on a 2:3 source
  const full = Math.round(m.width * 750 / 600);      // scaled height in frame units
  const over = full - 750;
  const top = Math.round(over * focus * m.width / 600);
  const H = Math.round(750 * m.width / 600);
  const band = { left: 0, top: top + Math.round(y0 * H), width: m.width,
                 height: Math.round((y1 - y0) * H) };
  const src = await avg(await sharp(`public/product/${file}`).extract(band).toBuffer());
  const out = await avg(await sharp(`social/mate-ritual/${slide}.jpg`)
    .extract({ left: 0, top: Math.round(y0*1350), width: 1080, height: Math.round((y1-y0)*1350) }).toBuffer());
  const lumS = 0.299*src[0]+0.587*src[1]+0.114*src[2];
  const lumO = 0.299*out[0]+0.587*out[1]+0.114*out[2];
  console.log(name.padEnd(9), 'source', String(src).padEnd(14), '-> slide', String(out).padEnd(14),
    'darkened', ((1-lumO/lumS)*100).toFixed(0)+'%', ' green over red:', (out[1]-out[0]));
}
