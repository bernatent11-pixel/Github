"""Cut the reference's ghosts (and the floating gourd) out as clean sprites.

In the reference the ghosts sit IN FRONT of the products, so each one is
complete — only its antialiased edge is mixed with whatever was behind it.
GrabCut separates it, seeded with what is certainly ghost (cream) and certainly
not (the orange backdrop, the cans' greens and blues); the eyes and mouth are
enclosed, so filling holes brings them back. The edge colour is then rebuilt
from the sprite's own interior, so no can green or backdrop orange travels with
it when it is set down somewhere else.

Writes source/sprites/<id>.png, cropped to the sprite's box in reference.png."""
import json, os
import numpy as np, cv2

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.path.dirname(HERE), 'source')
ref = cv2.imread(os.path.join(SRC, 'reference.png'))
# the backdrop with nothing on it (written by build_plate.py): a ghost's lit flank
# is backdrop-coloured but far brighter than the backdrop at that spot
field = cv2.imread(os.path.join(SRC, 'field.png')).astype(np.float32)
diff_all = np.abs(ref.astype(np.float32) - field).max(-1)
spec = json.load(open(os.path.join(SRC, 'reference-products.json')))
os.makedirs(os.path.join(SRC, 'sprites'), exist_ok=True)
K = lambda n: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (n, n))


def fill_holes(m):
    h, w = m.shape
    ff = np.zeros((h + 2, w + 2), np.uint8)
    inv = m.astype(np.uint8).copy()
    cv2.floodFill(inv, ff, (0, 0), 1)
    return (m.astype(np.uint8) | (1 - inv)) > 0


def extend_colours(img, solid):
    """Push the solid interior's colours outward across the edge band."""
    w = solid.astype(np.float32)
    acc, ws = img.astype(np.float32) * w[..., None], w
    out = img.astype(np.float32).copy()
    for r in (3, 7, 15, 31):
        a = cv2.blur(acc, (r, r)); b = cv2.blur(ws, (r, r))
        est = a / np.maximum(b, 1e-6)[..., None]
        take = (b > 1e-3) & (w < 0.5)
        out[take] = est[take]
        w = np.maximum(w, take.astype(np.float32))
        acc, ws = out * w[..., None], w
    return out


for sp in spec['sprites']:
    x0, y0, x1, y1 = sp['box']
    crop = ref[y0:y1, x0:x1]
    hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV).astype(np.int32)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    mask = np.full(crop.shape[:2], cv2.GC_PR_BGD, np.uint8)
    backdrop = (h >= 2) & (h <= 24) & (s >= 170) & (v >= 150)
    can_paint = (h >= 33) & (h <= 160) & (s >= 40)           # greens, blues, açaí purple
    if sp['kind'] == 'ghost':
        core = (s < 60) & (v > 200)
        n, lab, st, _ = cv2.connectedComponentsWithStats(core.astype(np.uint8))
        big = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
    else:
        cx0, cy0, cx1, cy1 = sp['core']
        big = np.zeros(crop.shape[:2], np.uint8); big[cy0 - y0:cy1 - y0, cx0 - x0:cx1 - x0] = 1
    diff = diff_all[y0:y1, x0:x1]
    if sp['kind'] == 'ghost':
        mask[(diff > 35) & ~can_paint] = cv2.GC_PR_FGD
        mask[big > 0] = cv2.GC_PR_FGD
        mask[cv2.erode(big, K(5)) > 0] = cv2.GC_FGD
        mask[(backdrop & (diff < 20)) | can_paint] = cv2.GC_BGD
    else:  # the gourd sits on the gold pouch, which is far from the backdrop too
        far = cv2.distanceTransform(1 - big, cv2.DIST_L2, 5) > 22
        mask[big > 0] = cv2.GC_FGD
        mask[(backdrop & far) | (can_paint & far)] = cv2.GC_BGD
    for bx in sp.get('not', []):                               # hand-marked: not this sprite
        bx0, by0, bx1, by1 = bx
        mask[max(0, by0 - y0):by1 - y0, max(0, bx0 - x0):bx1 - x0] = cv2.GC_BGD
    mask[:2, :] = mask[-2:, :] = cv2.GC_BGD
    mask[:, :2] = mask[:, -2:] = cv2.GC_BGD
    bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(crop, mask, None, bgd, fgd, 8, cv2.GC_INIT_WITH_MASK)
    m = (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8))
    big_id = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])
    m = lab == big_id                                          # one object, no specks
    m = fill_holes(cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_OPEN, K(3)))
    alpha = cv2.GaussianBlur(m.astype(np.float32), (0, 0), 0.9)
    alpha = np.clip((alpha - 0.08) / 0.84, 0, 1)                 # pull the soft edge in a touch
    solid = cv2.erode(m.astype(np.uint8), K(7)) > 0
    rgb = extend_colours(crop, solid)
    rgb = np.where(solid[..., None], crop.astype(np.float32), rgb)
    cv2.imwrite(os.path.join(SRC, 'sprites', sp['id'] + '.png'),
                np.dstack([rgb, alpha * 255]).clip(0, 255).astype(np.uint8))
    print(sp['id'], 'px', int(m.sum()))
