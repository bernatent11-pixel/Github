"""Cut a product shot off a flat studio colour: flood-fill the backdrop from the
border (so interior pixels of the same hue survive), soft alpha in the edge band,
and un-mix the backdrop colour out of the edge pixels so no lavender fringe
travels to the new background."""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.float32)
h, w, _ = a.shape
bg = np.median(np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3),
                               a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)]), axis=0)
dist = np.sqrt(((a - bg) ** 2).sum(-1))

# Backdrop = everything within tolerance AND connected to the border.
near = Image.fromarray(((dist < 40) * 255).astype(np.uint8)).copy()
for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    ImageDraw.floodfill(near, seed, 128)
backdrop = np.asarray(near) == 128

# Soft alpha only in a thin band around the boundary.
fg_hard = Image.fromarray((~backdrop * 255).astype(np.uint8))
band = (np.asarray(fg_hard.filter(ImageFilter.MaxFilter(7))) > 0) & \
       (np.asarray(fg_hard.filter(ImageFilter.MinFilter(7))) == 0)
d0, d1 = 6.0, 70.0
soft = np.clip((dist - d0) / (d1 - d0), 0, 1)
alpha = np.where(backdrop, 0.0, 1.0)
alpha = np.where(band, soft, alpha)

# Decontaminate: C = a*F + (1-a)*B  ->  F = (C - (1-a)*B) / a
am = np.maximum(alpha, 1e-3)[..., None]
fg = np.clip((a - (1 - am) * bg) / am, 0, 255)
fg = np.where(alpha[..., None] > 0.999, a, fg)
rgba = np.dstack([fg, alpha * 255]).astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')
img = img.crop(img.getbbox())
img.save(out)
print('backdrop', bg, 'size', img.size)
