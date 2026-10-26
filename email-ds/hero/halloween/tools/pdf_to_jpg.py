"""Render a Canva PDF to maximum-quality JPEGs.

Canva embeds a placed photo as a recompressed JPEG at the size it was uploaded,
so rendering the PDF bigger only enlarges that copy. With --background, the
full-page image is swapped for the lossless master first (it must be the same
picture at a higher resolution); the type is vector and Canva's shadows are
300ppi, so both stay sharp at the larger size.

  python3 tools/pdf_to_jpg.py <in.pdf> <out-stem> --width 1920 3840 \\
          [--background out/halloween-hero-1920x800@2x.png]

Writes <out-stem>-<w>x<h>.jpg for each width: quality 100, no chroma
subsampling (4:4:4), sRGB.
"""
import argparse
import pymupdf
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('pdf'); ap.add_argument('stem')
ap.add_argument('--width', type=int, nargs='+', required=True)
ap.add_argument('--background')
ap.add_argument('--page', type=int, default=0)
a = ap.parse_args()

doc = pymupdf.open(a.pdf)
page = doc[a.page]
if a.background:
    # the image that covers the whole page is the background
    full = [img[0] for img in page.get_images(full=True)
            if any(abs(r.width - page.rect.width) < 1 and abs(r.height - page.rect.height) < 1
                   for r in page.get_image_rects(img[0]))]
    assert len(full) == 1, f'expected one full-page image, found {len(full)}'
    page.replace_image(full[0], filename=a.background)

for w in a.width:
    zoom = w / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False, colorspace=pymupdf.csRGB)
    img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    out = f'{a.stem}-{pix.width}x{pix.height}.jpg'
    img.save(out, quality=100, subsampling=0, optimize=True)
    print('wrote', out)
