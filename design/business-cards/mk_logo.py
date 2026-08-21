from PIL import Image
import numpy as np

src = Image.open('/home/user/Github/ICONOS_1.png').convert('RGBA')
a = np.asarray(src).astype(int)
rgb, al = a[:, :, :3], a[:, :, 3]

opaque = al > 24
lum = rgb.sum(axis=2)
light = opaque & (lum > 330)   # the light-green canopy
dark = opaque & ~light

ys, xs = np.where(al > 8)
y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
print('ink', opaque.sum(), 'dark', dark.sum(), 'light', light.sum(), 'bbox', x0, y0, x1, y1)

def build(dark_hex, light_hex, out, width=460, pad=10):
    dh = tuple(int(dark_hex[i:i + 2], 16) for i in (1, 3, 5))
    lh = tuple(int(light_hex[i:i + 2], 16) for i in (1, 3, 5))
    h, w = al.shape
    o = np.zeros((h, w, 4), dtype=np.uint8)
    o[..., 0:3] = dh                      # default ink colour everywhere (edges included)
    o[light, 0:3] = lh
    o[..., 3] = al                        # keep the original antialiased alpha
    im = Image.fromarray(o, 'RGBA').crop((x0 - pad, y0 - pad, x1 + 1 + pad, y1 + 1 + pad))
    im = im.resize((width, round(width * im.height / im.width)), Image.LANCZOS)
    im.save(out, optimize=True)
    print(out, im.size)

build('#F2EFE7', '#F2EFE7', 'logo-cream.png')   # single-colour cream, for Deep Green fields
build('#0E4E2A', '#6FBE43', 'logo-green.png')   # two-tone, for Light Cream fields
