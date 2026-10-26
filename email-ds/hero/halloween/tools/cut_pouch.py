"""Cut the Mate Latte pouch off its white studio shot, without the glass.

In the supplied shot the latte glass stands in front of the pouch's lower right
edge, hiding a strip of the forest artwork (no type — the dose line ends left
of the glass). The strip is rebuilt row by row from the pouch's own left edge,
mirrored about that row's centre line: the outline, the edge lighting and the
forest greens all come from the real pouch, nothing is invented.

  python3 tools/cut_pouch.py <studio shot> <out.png>
"""
import sys
import numpy as np, cv2

src, out = sys.argv[1], sys.argv[2]
img = cv2.imread(src)
H, W = img.shape[:2]
f = img.astype(np.float32)

# 1 — everything that isn't the white sweep, connected from the border
# the sweep and its soft floor shadow: light and neutral (the pouch has no
# neutral greys — its foil is a saturated gold, its forest dark)
white = ((f.min(-1) > 185) & (f.max(-1) - f.min(-1) < 16)).astype(np.uint8)
ff = np.zeros((H + 2, W + 2), np.uint8)
bgfill = white.copy()
for seed in [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1)]:
    cv2.floodFill(bgfill, ff, seed, 2)
fg = bgfill != 2

# 2 — the glass. Where it stands, a row's non-white run carries on far past the
# pouch; the glass's own edge is the first latte-coloured pixel in that row
# (pale, warm: the pouch's gold foil is far more saturated, its forest far darker).
r, g, b = f[..., 2], f[..., 1], f[..., 0]
latte = (r > 200) & (g > 175) & (b > 130) & (r - b < 75)
rows = np.nonzero(fg.any(1))[0]
span_l = np.array([np.nonzero(fg[y])[0].min() for y in rows])
span_r = np.array([np.nonzero(fg[y])[0].max() for y in rows])
typical_r = np.median(span_r[span_r < W * 0.65])
left = np.full(H, -1); right = np.full(H, -1); glass_at = np.full(H, W)
for y, l, rr in zip(rows, span_l, span_r):
    left[y] = l
    if rr > typical_r + 50:                       # the glass is in this row
        xs = np.nonzero(latte[y, int(typical_r) - 120:])[0]
        glass_at[y] = int(typical_r) - 120 + xs.min()
    else:
        right[y] = rr
y_top, y_bot = rows.min(), rows.max()
pouch = fg.copy()
pouch[:, int(typical_r) + 30:] = False
rows = np.nonzero(pouch.any(1))[0]
gx0 = int(glass_at.min())

# the pouch's right edge behind the glass: mirror how the left edge moves
vis = (right > 0) & (np.arange(H) >= y_top) & (np.arange(H) <= y_bot)
centre = np.median((left[vis] + right[vis]) / 2.0)
hidden = np.nonzero((right < 0) & (left >= 0))[0]
for y in hidden:
    right[y] = int(round(2 * centre - left[y]))
# The glass rim's top line touches the pouch a few rows above the glass proper;
# the mirrored outline is a ceiling for every row, so nothing sticks out.
for y in rows:
    if left[y] >= 0:
        right[y] = min(right[y], int(round(2 * centre - left[y])) + 3)

# 3 — rebuild the hidden strip from the mirrored left strip. The two edges are
# lit differently, so each row's mirrored strip is matched to the real pixels
# beside the seam (a per-row gain, smoothed down the pouch) and cross-faded in.
outimg = f.copy()
alpha = np.zeros((H, W), np.float32)
hid = set(hidden.tolist())
FEATHER, PROBE = 24, 14
gain = np.ones((H, 3), np.float32)
for y in hidden:
    g0 = min(glass_at[y], right[y] + 1) - 6
    real = f[y, g0 - FEATHER - PROBE:g0 - FEATHER].mean(0)
    xm = [int(round(2 * centre - x)) for x in range(g0 - FEATHER - PROBE, g0 - FEATHER)]
    mirr = f[y, xm].mean(0)
    gain[y] = np.clip(real / np.maximum(mirr, 1), 0.6, 1.6)
if len(hidden):
    sm = cv2.GaussianBlur(gain[hidden.min():hidden.max() + 1].reshape(-1, 1, 3), (1, 0), 0, sigmaY=20)
    gain[hidden.min():hidden.max() + 1] = sm.reshape(-1, 3)
for y in rows:
    if left[y] < 0:
        continue
    x1 = min(right[y], W - 1)
    alpha[y, left[y]:x1 + 1] = 1
    if y in hid:
        g0 = min(glass_at[y], x1 + 1) - 6
        for x in range(g0 - FEATHER, x1 + 1):
            xm = int(round(2 * centre - x))
            m = np.clip(f[y, xm] * gain[y], 0, 255)
            t = min(1.0, (x - (g0 - FEATHER) + 1) / FEATHER)
            outimg[y, x] = f[y, x] * (1 - t) + m * t

# soft outline; unmix the white sweep out of the edge pixels so no pale fringe
# travels to an orange background:  C = a*F + (1-a)*254  ->  F = (C - (1-a)*254)/a
alpha = cv2.GaussianBlur(alpha, (0, 0), 0.9)
alpha = np.clip((alpha - 0.3) / 0.6, 0, 1)   # inside the foil's white catch-light
edge = (alpha > 0.02) & (alpha < 0.98)
a3 = np.maximum(alpha, 0.05)[..., None]
unmixed = np.clip((outimg - (1 - a3) * 254.0) / a3, 0, 255)
outimg = np.where(edge[..., None], unmixed, outimg)
# The foil's seal edge catches the studio's white light: on a dark or orange
# ground that 1-2px rim reads as an outline. Any edge pixel much brighter than
# the foil just inside it takes the inside colour instead.
solid = cv2.erode((alpha > 0.98).astype(np.uint8), np.ones((9, 9), np.uint8))
acc = outimg * solid[..., None]; w = solid.astype(np.float32)
ext = outimg.copy()
for r in (5, 9, 17):
    a_ = cv2.blur(acc, (r, r)); b_ = cv2.blur(w, (r, r))
    est = a_ / np.maximum(b_, 1e-6)[..., None]
    take = (b_ > 1e-3) & (w < 0.5)
    ext[take] = est[take]; w = np.maximum(w, take.astype(np.float32)); acc = ext * w[..., None]
ring = (alpha > 0) & (solid == 0)
luma = lambda im: im[..., 2] * 0.3 + im[..., 1] * 0.59 + im[..., 0] * 0.11
bright = ring & (luma(outimg) > luma(ext) + 18)
outimg[bright] = ext[bright]
outimg = np.clip(outimg, 0, 255).astype(np.uint8)
rgba = np.dstack([outimg, (alpha * 255).astype(np.uint8)])
ys, xs = np.nonzero(alpha > 0.01)
rgba = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
cv2.imwrite(out, rgba)
print('pouch', rgba.shape[1], 'x', rgba.shape[0], '| glass from x', gx0, '| rebuilt rows', len(hidden),
      '| centre line', round(float(centre), 1))
