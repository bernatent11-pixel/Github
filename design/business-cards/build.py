import json
qr = json.load(open('qr.json'))

FONT = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&amp;display=swap" rel="stylesheet">')

BASE = """      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: 'Montserrat', 'Gotham', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      a { color: #1A6B3A; text-decoration: none; }
      a:hover { color: #0E4E2A; }
      /* 1050 x 600 px = 3.5in x 2in at 300dpi (trim). Keep live copy inside the 72px safe margin. */
      .card { width: 1050px; height: 600px; overflow: hidden; position: relative; }"""


def qr_block(key, px, knock_bg):
    """Level-H QR with a centre knock-out for the Milonga mark."""
    d = qr[key]['d']
    n = qr[key]['size']
    return f"""<div style="position: relative; width: {px}px; height: {px}px; flex: none;">
            <svg viewBox="0 0 {n} {n}" shape-rendering="crispEdges" style="display: block; width: 100%; height: 100%;" role="img" aria-label="QR code to {qr[key]['url']}">
              <path d="{d}" fill="#0E4E2A"></path>
            </svg>
            <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 22%; height: 22%; background: {knock_bg}; display: flex; align-items: center; justify-content: center;">
              <img src="mark-green.png" alt="" style="height: 76%; width: auto; display: block;">
            </div>
          </div>"""


def page(body, extra_css=""):
    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
    {FONT}
    <style>
{BASE}
{extra_css}
    </style>
</helmet>
{body}
</x-dc>
</body>
</html>
"""


# ---------------------------------------------------------------- Front A
front_a = f"""<div class="card" style="display: flex; background: #0E4E2A;">
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 62px 48px 58px 72px;">
    <img src="logo-cream.png" alt="Milonga" style="width: 120px; height: auto; display: block;">
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="font-weight: 800; font-size: 56px; line-height: 1.06; letter-spacing: -0.005em; color: #F2EFE7;">SIDE EFFECTS<br>MAY INCLUDE</div>
      <div style="font-weight: 700; font-style: italic; font-size: 56px; line-height: 1.08; color: #FBC747;">actually liking<br>your mornings.</div>
    </div>
    <div style="font-weight: 500; font-size: 31px; letter-spacing: 0.01em; color: #F2EFE7; opacity: 0.85;">preparematelatte.milonga.life</div>
  </div>
  <div style="width: 360px; flex: none; background: #F2EFE7; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px;">
    {qr_block('front', 258, '#F2EFE7')}
    <div style="font-weight: 700; font-size: 26px; line-height: 1.3; letter-spacing: 0.09em; text-align: center; color: #0E4E2A;">SCAN FOR<br>MATE LATTE</div>
  </div>
</div>"""

# ---------------------------------------------------------------- Back A
back_a = f"""<div class="card" style="display: flex; flex-direction: column; background: #F2EFE7;">
  <div style="flex: 1; display: flex; align-items: center; gap: 58px; padding: 0 75px;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      {qr_block('back', 246, '#F2EFE7')}
      <div style="font-weight: 700; font-size: 30px; line-height: 1.25; letter-spacing: 0.09em; text-align: center; color: #0E4E2A;">SCAN TO<br>REVIEW</div>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column;">
      <div style="font-weight: 600; font-size: 32px; letter-spacing: 0.09em; color: #1A6B3A;">LOVED YOUR MATE?</div>
      <div style="font-weight: 800; font-size: 106px; line-height: 1.0; letter-spacing: -0.015em; color: #0E4E2A; margin-top: 18px;">15% OFF</div>
      <div style="font-weight: 700; font-style: italic; font-size: 48px; line-height: 1.15; color: #1A6B3A; margin-top: 8px;">your next order</div>
      <div style="font-weight: 400; font-size: 36px; line-height: 1.5; color: #3A3A3A; margin-top: 26px; text-wrap: pretty;">Leave a quick review — we'll email your code.</div>
    </div>
  </div>
  <div style="height: 88px; flex: none; background: #0E4E2A; display: flex; align-items: center; justify-content: center;">
    <div style="font-weight: 500; font-size: 32px; letter-spacing: 0.03em; color: #F2EFE7;">info@milongamate.com · @milongamate · Miami, FL</div>
  </div>
</div>"""

# ---------------------------------------------------------------- Front B
front_b = f"""<div class="card" style="background: #0E4E2A; padding: 62px 72px 58px 72px; display: flex; flex-direction: column; justify-content: space-between;">
  <img src="logo-cream.png" alt="Milonga" style="width: 116px; height: auto; display: block;">
  <div style="display: flex; flex-direction: column; gap: 10px; max-width: 610px;">
    <div style="font-weight: 800; font-size: 54px; line-height: 1.06; letter-spacing: -0.005em; color: #F2EFE7;">SIDE EFFECTS<br>MAY INCLUDE</div>
    <div style="font-weight: 700; font-style: italic; font-size: 54px; line-height: 1.08; color: #FBC747;">actually liking<br>your mornings.</div>
  </div>
  <div style="font-weight: 500; font-size: 31px; letter-spacing: 0.01em; color: #F2EFE7; opacity: 0.85;">preparematelatte.milonga.life</div>
  <div style="position: absolute; right: 72px; bottom: 58px; width: 244px; height: 244px; border-radius: 24px; background: #F2EFE7; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
    {qr_block('front', 176, '#F2EFE7')}
    <div style="font-weight: 700; font-size: 22px; letter-spacing: 0.09em; color: #0E4E2A;">MATE LATTE</div>
  </div>
</div>"""

# ---------------------------------------------------------------- Back B
back_b = """<div class="card" style="background: #0E4E2A; display: flex; align-items: center; gap: 70px; padding: 0 80px;">
  <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 20px; flex: none;">
    <img src="logo-cream.png" alt="Milonga" style="width: 168px; height: auto; display: block;">
    <div style="font-weight: 600; font-size: 26px; letter-spacing: 0.14em; color: #FBC747;">ENERGY THAT THINKS</div>
  </div>
  <div style="width: 3px; align-self: stretch; margin: 96px 0; background: #F2EFE7; opacity: 0.28; flex: none;"></div>
  <div style="display: flex; flex-direction: column; gap: 22px; color: #F2EFE7;">
    <div style="font-weight: 500; font-size: 35px; letter-spacing: 0.01em;">info@milongamate.com</div>
    <div style="font-weight: 500; font-size: 35px; letter-spacing: 0.01em;">305-915-1651</div>
    <div style="font-weight: 500; font-size: 35px; letter-spacing: 0.01em;">@milongamate</div>
    <div style="font-weight: 500; font-size: 35px; letter-spacing: 0.01em;">preparematelatte.milonga.life</div>
  </div>
</div>"""

for name, body in [('Main', front_a), ('Back', back_a), ('FrontAlt', front_b), ('BackAlt', back_b)]:
    open(f'{name}.dc.html', 'w').write(page(body))
    print('wrote', f'{name}.dc.html')
