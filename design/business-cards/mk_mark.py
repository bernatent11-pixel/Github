from PIL import Image
import numpy as np

src = Image.open('/home/user/Github/ICONOS_1.png').convert('RGBA')
a = np.asarray(src).astype(int)
al = a[:, :, 3]
lum = a[:, :, :3].sum(axis=2)
light = (al > 24) & (lum > 330)

ys, xs = np.where(light)
print('canopy bbox x', xs.min(), xs.max(), 'y', ys.min(), ys.max())

# icon = everything inside the canopy's horizontal span, from the canopy top down
x0, x1 = xs.min() - 6, xs.max() + 6
y0 = ys.min() - 6
band = np.zeros_like(al, dtype=bool)
band[y0:, x0:x1] = True
region = (al > 8) & band
yy, xx = np.where(region)
y1 = yy.max()
print('icon crop', x0, y0, x1, y1, '->', x1 - x0, 'x', y1 - y0)

def build(dark_hex, light_hex, out, width=280):
    dh = tuple(int(dark_hex[i:i + 2], 16) for i in (1, 3, 5))
    lh = tuple(int(light_hex[i:i + 2], 16) for i in (1, 3, 5))
    o = np.zeros((*al.shape, 4), dtype=np.uint8)
    o[..., 0:3] = dh
    o[light, 0:3] = lh
    o[..., 3] = al
    o[~band, 3] = 0
    im = Image.fromarray(o, 'RGBA').crop((x0, y0, x1, y1 + 1))
    im = im.resize((width, round(width * im.height / im.width)), Image.LANCZOS)
    im.save(out, optimize=True)
    print(out, im.size)

build('#0E4E2A', '#6FBE43', 'mark-green.png')
