"""Composite the real packshots and the scene's ghosts onto the Halloween plate.

Every label in the output is the packshot's own pixels — scaled and rotated
once, never redrawn — which is the point: the reference's products were AI
renders and their small print was invented.

  python3 tools/compose.py   -> out/halloween-hero@2x.png    (4000x2232, the master; also as -4000x2232.jpg)
                                out/halloween-hero.jpg       (2000x1116, same frame as the reference)
                                out/halloween-hero-email.jpg (1200 wide, the product cluster only)

Layers come from slots.json, drawn in z order. Lighting, so a studio packshot
sits in a backlit orange scene: a soft cast shadow in burnt orange rather than
grey, a warm rim on the can's edge from the glow behind the cluster, and a
light warm grade that keeps the label's greens and creams reading as
themselves. Ghosts get back the soft bloom the reference gave them.
"""
import json, os
import numpy as np
from PIL import Image, ImageFilter, ImageChops, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
cfg = json.load(open(os.path.join(ROOT, 'slots.json')))
S = cfg['out_scale']

SHADOW = (96, 28, 4)
BLOOM = (255, 214, 160)
RIM = np.array([255, 176, 96], np.float32)
TINT = np.array([1.035, 0.985, 0.93], np.float32)


def can_layer(c):
    src = Image.open(os.path.join(ROOT, c['product'])).convert('RGBA')
    k = c['width'] * S / c['native_width']
    src = src.resize((round(src.width * k), round(src.height * k)), Image.LANCZOS)
    src = src.rotate(c['tilt'] - c['native_tilt'], resample=Image.BICUBIC, expand=True)
    return lit(src), (round(c['cx'] * S - src.width / 2), round(c['cy'] * S - src.height / 2))


def sprite_layer(sp):
    im = Image.open(os.path.join(ROOT, 'source', 'sprites', sp['id'] + '.png')).convert('RGBA')
    k = S * sp.get('scale', 1.0)
    im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    if sp.get('flip'):
        im = ImageOps.mirror(im)
    return im, (round(sp['x'] * S), round(sp['y'] * S))


def lit(can):
    a = np.asarray(can).astype(np.float32)
    rgb, al = a[..., :3], a[..., 3:]
    rgb = np.clip(rgb * TINT, 0, 255)
    m = can.getchannel('A')
    edge = ImageChops.subtract(m, m.filter(ImageFilter.MinFilter(9))).filter(ImageFilter.GaussianBlur(1.5 * S))
    e = (np.asarray(edge).astype(np.float32) / 255)[..., None] * 0.42
    rgb = 255 - (255 - rgb) * (1 - e * RIM / 255)
    return Image.fromarray(np.dstack([rgb, al]).clip(0, 255).astype(np.uint8), 'RGBA')


def halo(layer, xy, colour, blur, strength, offset=(0, 0)):
    """A blurred copy of the layer's silhouette, padded so the blur is never
    clipped to the layer's box (which is what draws a hard-edged rectangle)."""
    pad = round(blur * 3.5)
    al = Image.new('L', (layer.width + 2 * pad, layer.height + 2 * pad), 0)
    al.paste(layer.getchannel('A'), (pad, pad))
    al = al.filter(ImageFilter.GaussianBlur(blur)).point(lambda v: int(v * strength))
    h = Image.new('RGBA', al.size, colour + (0,))
    h.putalpha(al)
    return h, (xy[0] - pad + offset[0], xy[1] - pad + offset[1])


def cut_edge(sp, im):
    """Pixels along a sprite's sliced side, in its own (scaled, flipped) frame."""
    side = SPRITES[sp['id']].get('cut')
    if not side:
        return None
    slant = np.tan(np.radians(SPRITES[sp['id']].get('cut_tilt', 0)))
    if sp.get('flip'):
        side, slant = {'left': 'right', 'right': 'left'}[side], -slant
    a = np.asarray(im.getchannel('A')) > 128
    pts = []
    for y in np.nonzero(a.any(1))[0]:
        xs = np.nonzero(a[y])[0]
        pts.append((xs.max() if side == 'right' else xs.min(), y))
    pts = np.array(pts)
    # The slice is a straight line at the can's slant: measure each boundary
    # point's reach along that slant, and keep the ones out at the far line.
    reach = pts[:, 0] - pts[:, 1] * slant
    reach = reach if side == 'right' else -reach
    line = np.percentile(reach, 92)
    keep = reach >= line - 4 * S
    return pts[keep], (1 if side == 'right' else -1)


def tuck(sp, cans, margin=7):
    """Slide a sprite sideways until its sliced edge sits under its can."""
    im, (x, y) = sprite_layer(sp)
    ce = cut_edge(sp, im)
    if ce is None or not sp.get('tuck'):
        return sp
    pts, direction = ce
    can, (cx, cy) = cans[sp['tuck']]
    ca = np.asarray(can.getchannel('A'))
    m = margin * S
    for step in range(0, 80 * S, S):
        dx = direction * step
        # the slice, plus a margin of the sprite's own body beyond it, under the can
        px = pts[:, 0] + x + dx - direction * m - cx
        py = pts[:, 1] + y - cy
        ok = (px >= 0) & (px < ca.shape[1]) & (py >= 0) & (py < ca.shape[0])
        if ok.all() and (ca[py, px] > 240).all():
            out = dict(sp); out['x'] = sp['x'] + dx / S
            return out
    print('warning: could not tuck', sp['id'], 'under', sp['tuck'])
    return sp


SPRITES = {s['id']: s for s in json.load(open(os.path.join(ROOT, 'source', 'reference-products.json')))['sprites']}

plate = Image.open(os.path.join(ROOT, 'source', 'plate.png')).convert('RGB')
W, H = plate.size
# Every layer goes onto its own transparent sheet first, so other formats
# (tools/formats.py) can move the whole cluster without re-deriving it.
canvas = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0))

cans = {L['id']: can_layer(L) for L in cfg['layers'] if L['kind'] == 'can'}
layers = [tuck(L, cans) if L['kind'] == 'sprite' else L for L in cfg['layers']]
for L in layers:
    if L['kind'] == 'sprite' and L.get('tuck'):
        print(f"{L['id']}: x {L['x']:.1f} (tucked under {L['tuck']})")

for L in sorted(layers, key=lambda L: L['z']):
    if L['kind'] == 'can':
        layer, xy = cans[L['id']]
        canvas.alpha_composite(*halo(layer, xy, SHADOW, 14 * S, 0.42, (9 * S, 22 * S)))
    else:
        layer, xy = sprite_layer(L)
        canvas.alpha_composite(*halo(layer, xy, SHADOW, 12 * S, 0.22, (6 * S, 14 * S)))
        if L['id'].startswith('ghost'):
            canvas.alpha_composite(*halo(layer, xy, BLOOM, 9 * S, 0.55))
    canvas.alpha_composite(layer, xy)

out = os.path.join(ROOT, 'out')
os.makedirs(out, exist_ok=True)
os.makedirs(os.path.join(ROOT, 'build'), exist_ok=True)
canvas.save(os.path.join(ROOT, 'build', 'products@2x.png'))
base = plate.resize((W * S, H * S), Image.LANCZOS).convert('RGBA')
base.alpha_composite(canvas)
rgb = base.convert('RGB')
# JPEGs at the encoder's maximum: quality 100, no chroma subsampling (4:4:4)
JPG = dict(quality=100, subsampling=0, optimize=True)
rgb.save(os.path.join(out, 'halloween-hero@2x.png'), optimize=True)
rgb.save(os.path.join(out, f'halloween-hero-{rgb.width}x{rgb.height}.jpg'), **JPG)
rgb.resize((W, H), Image.LANCZOS).save(os.path.join(out, 'halloween-hero.jpg'), **JPG)
# Email: the full banner at 600px would shrink each can to ~56px and the labels
# stop reading. Crop to the cluster instead — 1200px wide for a 600px slot.
x0, x1 = cfg['email_crop']
email = rgb.crop((x0 * S, 0, x1 * S, H * S))
email.resize((1200, round(1200 * email.height / email.width)), Image.LANCZOS).save(
    os.path.join(out, 'halloween-hero-email.jpg'), **JPG)
print('wrote', os.path.join(out, 'halloween-hero@2x.png'), rgb.size)
