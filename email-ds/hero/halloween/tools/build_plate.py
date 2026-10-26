"""Build the Halloween background plate: the reference scene with its seven
AI-rendered products erased, so real packshots can be composited with labels
that are the actual artwork, not a model's guess at it.

  1. A rough backdrop field (push-pull from plainly-orange pixels, never from
     inside a product zone) gives something to measure difference against.
  2. Each product's silhouette = the large blob that differs from that field
     inside its zone, closed and hole-filled. Fruit a product had sliced (it sat
     behind it) is scrubbed too, or it would float with a straight edge. The
     ghosts, the gourd and the top peach leave whole: cut_sprites.py turns them
     into layers the compositor can place anywhere.
  3. The holes are refilled from the pixels at their own edge, so the fill meets
     the surrounding glow exactly instead of leaving a visible boundary.

Run order lives in run.sh (this script runs twice: once for the field the
sprite cutter needs, once to take the sprites out). Writes source/plate.png and
source/field.png; debug view in source/_debug-erase.png."""
import json, os
import numpy as np, cv2

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.path.dirname(HERE), 'source')

ref = cv2.imread(os.path.join(SRC, 'reference.png'), cv2.IMREAD_COLOR)
H, W = ref.shape[:2]
hsv = cv2.cvtColor(ref, cv2.COLOR_BGR2HSV)
h, s, v = [hsv[..., i].astype(np.int32) for i in range(3)]
spec = json.load(open(os.path.join(SRC, 'reference-products.json')))
K = lambda n: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (n, n))


def push_pull(img, w, levels=12):
    """Fill pixels with low weight from their neighbours across scales."""
    img = img.astype(np.float32) * w[..., None]
    w = w.astype(np.float32)
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


def poly_mask(pts):
    m = np.zeros((H, W), np.uint8)
    cv2.fillPoly(m, [np.array(pts, np.int32)], 1)
    return m > 0


def fill_holes(m):
    m = m.astype(np.uint8)
    ff = np.zeros((H + 2, W + 2), np.uint8)
    inv = m.copy()
    cv2.floodFill(inv, ff, (0, 0), 1)
    return (m | (1 - inv)) > 0


def zone_of(p, pad):
    if p['shape'] == 'can':
        box = ((p['cx'], p['cy']), (p['width'] + pad, p['length'] + pad), -p['tilt'])
        return poly_mask(cv2.boxPoints(box))
    x0, y0, x1, y1 = p['box']
    return poly_mask([[x0 - pad // 2, y0 - pad // 2], [x1 + pad // 2, y0 - pad // 2],
                      [x1 + pad // 2, y1 + pad // 2], [x0 - pad // 2, y1 + pad // 2]])


def box_mask(b):
    m = np.zeros((H, W), bool); m[b[1]:b[3], b[0]:b[2]] = True
    return m


# 1 — rough field ------------------------------------------------------------
zones = {p['id']: zone_of(p, 50) for p in spec['products']}
any_zone = np.any(list(zones.values()), axis=0)
scrub_boxes = {t['id']: box_mask(t['box']) for t in spec['scrub']}
any_scrub = np.any(list(scrub_boxes.values()), axis=0)

orange = (h >= 2) & (h <= 24) & (s >= 150) & (v >= 140)
edges = cv2.Canny(cv2.GaussianBlur(ref, (5, 5), 0), 20, 60)
rough_src = orange & ~(cv2.dilate(edges, K(9)) > 0) & ~(cv2.dilate((any_zone | any_scrub).astype(np.uint8), K(15)) > 0)
field = cv2.GaussianBlur(push_pull(ref, rough_src.astype(np.float32)), (0, 0), 6)
diff = np.abs(ref.astype(np.float32) - field).max(-1)
cv2.imwrite(os.path.join(SRC, 'field.png'), np.clip(field, 0, 255).astype(np.uint8))

# 2 — silhouettes --------------------------------------------------------------
def blob(region, thresh=30, min_px=1500):
    m = (diff > thresh) & region
    m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, K(15))
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m, connectivity=8)
    keep = np.zeros((H, W), bool)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] >= min_px:
            keep |= lab == i
    return fill_holes(keep) & region

product = np.zeros((H, W), bool)
for p in spec['products']:
    product |= blob(zones[p['id']])
    if p['shape'] == 'box':
        product |= zone_of(p, 0)                    # the pouch goes whole

scrub = np.zeros((H, W), bool)
for t in spec['scrub']:
    scrub |= blob(scrub_boxes[t['id']], thresh=24, min_px=400)

hole = product | scrub
hole = cv2.dilate(hole.astype(np.uint8), K(9)) > 0      # AA edge + AI glow
# Ghosts and the gourd leave the plate whole (cut_sprites.py makes them layers),
# with a wide margin so the soft bloom the render gave them goes too.
sprite_cover = np.zeros((H, W), bool)
for sp in spec.get('sprites', []):
    f = os.path.join(SRC, 'sprites', sp['id'] + '.png')
    if os.path.exists(f):
        x0, y0, x1, y1 = sp['box']
        sprite_cover[y0:y1, x0:x1] |= cv2.imread(f, cv2.IMREAD_UNCHANGED)[..., 3] > 10
hole |= cv2.dilate(sprite_cover.astype(np.uint8), K(41)) > 0

# 3 — refill from the hole's own edge -----------------------------------------
objects = (diff > 40) & ~hole                            # ghosts, fruit, leaves
objects = cv2.dilate(objects.astype(np.uint8), K(11)) > 0
src = ~hole & ~objects
fill = push_pull(ref, src.astype(np.float32))
fill = cv2.GaussianBlur(fill, (0, 0), 2.5)

# Hard edge next to fruit and leaves (so they keep their outline), a wide soft
# one into open backdrop (so the bloom the render left around each object fades
# into the fill instead of drawing a faint ring where the hole stops).
alpha = cv2.GaussianBlur(hole.astype(np.float32), (0, 0), 1.6)
soft = cv2.GaussianBlur((cv2.dilate(hole.astype(np.uint8), K(21)) > 0).astype(np.float32), (0, 0), 8)
near_obj = cv2.dilate(((diff > 40) & ~hole).astype(np.uint8), K(9)) > 0
alpha = np.maximum(alpha, np.where(near_obj, 0, soft))[..., None]
plate = ref.astype(np.float32) * (1 - alpha) + fill * alpha
grain = np.random.default_rng(7).normal(0, 1.3, (H, W, 1)).astype(np.float32)
plate = np.clip(plate + grain * alpha, 0, 255).astype(np.uint8)
cv2.imwrite(os.path.join(SRC, 'plate.png'), plate)

dbg = ref.copy()
dbg[hole] = (dbg[hole] * 0.3 + np.array([255, 0, 255]) * 0.7).astype(np.uint8)
cv2.imwrite(os.path.join(SRC, '_debug-erase.png'), dbg)
print('hole px', int(hole.sum()))
