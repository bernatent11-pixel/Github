# Assets — Higgsfield & product images

The landing page renders fully **without any assets** (it draws a built-in SVG
tin). Drop real assets here to upgrade it.

## 1. Hero product image (optional but recommended)
Export a product cutout (transparent PNG) and save it as:

```
assets/product.png
```

Then in `index.html`, replace the `<div class="tin-float" id="hero-tin"></div>`
block with:

```html
<img class="tin-float" src="assets/product.png" alt="Milonga Yerba Mate Latte tin" style="max-width:360px">
```

## 2. Scroll-scrub frame sequence (the Higgsfield asset)
This powers the Apple-style "product spins/animates as you scroll" effect.

1. In **Higgsfield**, generate a short clip of the tin — a 360° turntable or a
   slow hero motion — using the product photo as the reference image.
2. Export it as a numbered image sequence (recommended) into:

   ```
   assets/frames/0001.jpg
   assets/frames/0002.jpg
   ...
   assets/frames/0120.jpg
   ```

   To turn an exported `.mp4` into frames with ffmpeg:
   ```bash
   ffmpeg -i milonga-360.mp4 -vf fps=30 assets/frames/%04d.jpg
   ```

3. In `index.html`, set the frame count in the `FRAMES` config:
   ```js
   const FRAMES = { count: 120, path: i => `assets/frames/${String(i).padStart(4,'0')}.jpg` };
   ```

That's it — the pinned showcase section will scrub through the sequence on
scroll. If `count` stays `0`, the page uses the built-in animated tin instead.

### Tips for the Higgsfield clip
- Keep the **background transparent or matched to `#0e3a20`** (the showcase
  section's deep forest green) so the product blends in.
- A loopable 3–5s motion at 24–30fps gives ~72–150 frames — plenty for a smooth
  scroll without a heavy page.
- Keep total sequence size reasonable (resize frames to ~800px wide).
