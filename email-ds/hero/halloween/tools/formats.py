"""Re-cut the Halloween hero for other frame shapes without cropping a product.

A crop can't do it: 1920x800 is wider than the master and loses the cans top
and bottom, and 800x1200 is portrait. So each format is rebuilt from parts:

  cluster  everything right of a seam: the seven products, their ghosts and
           fruit, and the plate around them
  decor    the falling leaves, ghosts and fruit on the left of the master

A seam is the cheapest path through open backdrop (dynamic programming over the
plate's difference from its backdrop field), so it never slices a leaf. Each
part is scaled and placed; the orange backdrop is regrown across the new frame
by push-pull from the placed parts' own backdrop, so there's no edge where
they meet; the parts' detail (objects, the wind swirl, grain) is added back on
top, fading out across open backdrop near a seam.

  python3 tools/formats.py      -> out/halloween-hero-1920x800.jpg (+ @2x .png)
                                   out/halloween-hero-800x1200.jpg (+ @2x .png)
Needs build/products@2x.png, written by tools/compose.py.
"""
import os
import numpy as np, cv2

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'source')
OUT = os.path.join(ROOT, 'out')

plate = cv2.imread(os.path.join(SRC, 'plate.png')).astype(np.float32)
field = cv2.imread(os.path.join(SRC, 'field.png')).astype(np.float32)
H1, W1 = plate.shape[:2]                                    # reference space, 2000x1116
residual = plate - field                                    # all the detail: objects, swirl, grain
prod = cv2.imread(os.path.join(ROOT, 'build', 'products@2x.png'), cv2.IMREAD_UNCHANGED).astype(np.float32)
SP = prod.shape[1] / W1                                     # the product layer is at 2x


def push_pull(img, w, levels=12):
    img = img * w[..., None]
    pyr = [(img, w)]
    for _ in range(levels):
        i, ww = pyr[-1]
        if min(ww.shape) < 4:
            break
        pyr.append((cv2.pyrDown(i), cv2.pyrDown(ww)))
    i, ww = pyr[-1]
    out = i / np.maximum(ww, 1e-6)[..., None]
    for i, ww in reversed(pyr[:-1]):
        up = cv2.pyrUp(out, dstsize=(ww.shape[1], ww.shape[0]))
        a = np.clip(ww * 4, 0, 1)[..., None]
        out = (i / np.maximum(ww, 1e-6)[..., None]) * a + up * (1 - a)
    return out


def seam(axis, lo, hi):
    """Cheapest path across the frame through [lo, hi): vertical (axis='x',
    one x per row) or horizontal (axis='y', one y per column). Cost is the
    plate's detail, with anything solid made very expensive."""
    detail = np.abs(residual).max(-1)
    solid = cv2.dilate((detail > 30).astype(np.uint8), np.ones((15, 15), np.uint8)) > 0
    cost = cv2.GaussianBlur(detail, (0, 0), 2) + solid * 1000.0
    if axis == 'y':
        cost = cost.T
    band = cost[:, lo:hi]
    n, m = band.shape
    acc = band.copy()
    back = np.zeros((n, m), np.int32)
    for r in range(1, n):
        prev = acc[r - 1]
        cand = np.stack([np.r_[np.inf, prev[:-1]], prev, np.r_[prev[1:], np.inf]])
        k = cand.argmin(0)
        back[r] = k - 1
        acc[r] += cand.min(0)
    path = np.zeros(n, np.int32)
    path[-1] = acc[-1].argmin()
    for r in range(n - 1, 0, -1):
        path[r - 1] = path[r] + back[r, path[r]]
    return path + lo


def side_mask(path, axis, keep):
    """Hard mask of one side of a seam: keep='before' (left/above) or 'after'."""
    if axis == 'x':
        idx = np.arange(W1)[None, :]; p = path[:, None]
    else:
        idx = np.arange(H1)[:, None]; p = path[None, :]
    return (idx < p) if keep == 'before' else (idx >= p)


def feathered(mask, reach=45):
    """1 inside the part, fading to 0 at its seam — but only across open
    backdrop: solid things keep full strength (the seam never crosses them)."""
    d = cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5)
    w = np.clip(d / reach, 0, 1)
    solid = cv2.dilate((np.abs(residual).max(-1) > 30).astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
    return np.where(solid & mask, 1.0, w).astype(np.float32)


def place(img, scale, ox, oy, size, interp=cv2.INTER_AREA):
    """Scale an image (in reference space) and set its origin at (ox, oy) on a
    blank canvas of `size`; returns the canvas."""
    w, h = size
    sh = cv2.resize(img, (max(1, round(img.shape[1] * scale)), max(1, round(img.shape[0] * scale))),
                    interpolation=interp)
    if sh.ndim == 2:
        sh = sh[..., None]
    out = np.zeros((h, w, sh.shape[2]), np.float32)
    x0, y0 = round(ox), round(oy)
    sx0, sy0 = max(0, -x0), max(0, -y0)
    dx0, dy0 = max(0, x0), max(0, y0)
    cw = min(w - dx0, sh.shape[1] - sx0); ch = min(h - dy0, sh.shape[0] - sy0)
    if cw > 0 and ch > 0:
        out[dy0:dy0 + ch, dx0:dx0 + cw] = sh[sy0:sy0 + ch, sx0:sx0 + cw]
    return out


def build(size, parts, products, k, seed):
    """parts: [(mask, scale, ox, oy)] in output pixels at k=1; products: (scale, ox, oy)."""
    w, h = size[0] * k, size[1] * k
    fsum = np.zeros((h, w, 3), np.float32); wsum = np.zeros((h, w), np.float32)
    detail = np.zeros((h, w, 3), np.float32); cover = np.zeros((h, w), np.float32)
    for mask, s, ox, oy in parts:
        s, ox, oy = s * k, ox * k, oy * k
        # each part's backdrop fades out well before its edge, so where two parts
        # meet (or a gap opens) the backdrop is regrown, never butted
        bw = np.clip(cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5) / 150, 0, 1) ** 2
        fsum += place(field * bw[..., None], s, ox, oy, (w, h))
        wsum += place(bw.astype(np.float32), s, ox, oy, (w, h))[..., 0]
        fw = feathered(mask)
        detail += place(residual * fw[..., None], s, ox, oy, (w, h))
        cover += place(fw, s, ox, oy, (w, h))[..., 0]
    back = push_pull(fsum / np.maximum(wsum, 1e-6)[..., None], np.clip(wsum, 0, 1))
    grain = np.random.default_rng(seed).normal(0, 1.3, (h, w, 1)).astype(np.float32)
    img = back + detail + grain * (1 - np.clip(cover, 0, 1))[..., None]
    # the product cluster, premultiplied so its soft shadows scale cleanly
    s, ox, oy = products
    s, ox, oy = s * k / SP, ox * k, oy * k
    pm = prod.copy(); pm[..., :3] *= pm[..., 3:] / 255
    layer = place(pm, s, ox, oy, (w, h))
    a = layer[..., 3:] / 255
    img = img * (1 - a) + layer[..., :3]
    return np.clip(img, 0, 255).astype(np.uint8)


def save(name, size, parts, products):
    for k in (1, 2):
        img = build(size, parts, products, k, seed=7)
        suffix = '' if k == 1 else '@2x'
        path = os.path.join(OUT, f'halloween-hero-{size[0]}x{size[1]}{suffix}')
        if k == 1:
            cv2.imwrite(path + '.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 92])
        else:
            cv2.imwrite(path + '.png', img)
    print('wrote', name, size)


# ---------------------------------------------------------------- 1920 x 800
# Wider than the master. Same scale for both parts — height decides it — with
# the decor pinned left, the cluster pinned right, and the copy space between
# them simply grows.
s = 800 / H1
v = seam('x', 600, 870)
decor = side_mask(v, 'x', 'before')
cluster = side_mask(v, 'x', 'after')
save('banner', (1920, 800),
     [(decor, s, 0, 0), (cluster, s, 1920 - W1 * s, 0)],
     (s, 1920 - W1 * s, 0))

# ---------------------------------------------------------------- 800 x 1200
# Portrait: the cluster fills the width at the bottom; the top of the decor
# (the leaves, the peach and the cut-off ghost of the master's top left) runs
# across the top, leaving open orange between for the headline.
left = 836                                   # the cluster's left edge: just clear of the maple leaf
s_c = 800 / (W1 - left)
oy_c = 1200 - H1 * s_c
vc = seam('x', 780, 860)
cluster_p = side_mask(vc, 'x', 'after')
hz = seam('y', 440, 540)
decor_p = side_mask(hz, 'y', 'before') & (np.arange(W1)[None, :] < 880)
s_d = 800 / 880
save('portrait', (800, 1200),
     [(decor_p, s_d, 0, 0), (cluster_p, s_c, -left * s_c, oy_c)],
     (s_c, -left * s_c, oy_c))
