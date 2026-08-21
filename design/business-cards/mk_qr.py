import segno, json

def qr_svg_body(data, quiet=4):
    """Return (module_count_incl_quiet, path_d) for a level-H QR."""
    qr = segno.make(data, error='h')
    m = [list(row) for row in qr.matrix]
    n = len(m)
    total = n + quiet * 2
    # merge horizontal runs into rects -> one compact path
    d = []
    for y, row in enumerate(m):
        x = 0
        while x < n:
            if row[x]:
                x2 = x
                while x2 + 1 < n and row[x2 + 1]:
                    x2 += 1
                w = x2 - x + 1
                d.append(f"M{x+quiet} {y+quiet}h{w}v1h-{w}z")
                x = x2 + 1
            else:
                x += 1
    print(f"  {data} -> version {qr.version}, {n} modules, {len(d)} runs")
    return total, "".join(d)

out = {}
for key, url in [
    ("front", "https://preparematelatte.milonga.life/link"),
    ("back",  "https://preparematelatte.milonga.life/review"),
]:
    total, d = qr_svg_body(url)
    out[key] = {"url": url, "size": total, "d": d}

open("qr.json", "w").write(json.dumps(out))
for k, v in out.items():
    print(k, "grid", v["size"], "path chars", len(v["d"]))
