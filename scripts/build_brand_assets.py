"""
Builds every logo/icon file the site uses from the single source logo.

    python scripts/build_brand_assets.py            (needs Pillow: pip install pillow)

Source: assets/brand/upos-logo-source.webp (green + blue logo on a white background,
with the tagline underneath). To swap in a higher-resolution version, replace that file
and re-run. The script finds the mark, wordmark and tagline itself, so the layout only
has to match (mark on the left, "Pos" on the right, tagline below).

The white background is removed by "un-mixing" each pixel against the three ink colours
(green, blue, black). That gives clean anti-aliased transparency and lets us recolour
the logo for dark mode.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets/brand/upos-logo-source.webp"
PUBLIC = ROOT / "public/brand"
APP = ROOT / "src/app"

# Ink colours measured from the source logo (used to separate it from the white background).
GREEN = (5, 88, 59)  # #05583B
BLUE = (52, 108, 144)  # #346C90
BLACK = (0, 0, 0)

# Output colours: the site's button colours, so the logo matches the "Request a demo" button
# (tokens in src/app/globals.css).
LIGHT_COLOURS = {GREEN: (10, 122, 67), BLUE: (29, 78, 216), BLACK: (14, 28, 22)}  # --primary, --accent, --fg
# On the green footer: white, with the accent bars in light blue.
ON_BRAND_COLOURS = {GREEN: (255, 255, 255), BLUE: (180, 204, 255), BLACK: (255, 255, 255)}
# Dark theme (on --bg #0b1511): the dark-mode button green and accent blue.
DARK_COLOURS = {GREEN: (61, 220, 132), BLUE: (122, 167, 255), BLACK: (230, 239, 233)}

WHITE = (255, 255, 255)


def unmix(src: Image.Image):
    """Per pixel: which ink it is, and how much of it (alpha) over white."""
    px = src.load()
    w, h = src.size
    inks = [GREEN, BLUE, BLACK]
    ink_map = [[GREEN] * w for _ in range(h)]
    alpha = Image.new("L", (w, h), 0)
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            c = px[x, y]
            best = None
            for f in inks:
                d = [WHITE[i] - f[i] for i in range(3)]
                v = [WHITE[i] - c[i] for i in range(3)]
                a = sum(d[i] * v[i] for i in range(3)) / sum(di * di for di in d)
                a = max(0.0, min(1.0, a))
                err = sum((v[i] - a * d[i]) ** 2 for i in range(3))
                if best is None or err < best[0]:
                    best = (err, f, a)
            _, f, a = best
            ink_map[y][x] = f
            ap[x, y] = round(a * 255) if a > 0.03 else 0  # drop compression noise in the white

    # Faint edge pixels are too pale to tell the inks apart (a light green edge can look grey),
    # so they take the ink of the nearest solid pixel. Without this, edges get dark fringes.
    solid = lambda x, y: ap[x, y] >= 128
    for y in range(h):
        for x in range(w):
            if 0 < ap[x, y] < 128:
                for r in range(1, 5):
                    near = [
                        (nx, ny)
                        for ny in range(max(y - r, 0), min(y + r + 1, h))
                        for nx in range(max(x - r, 0), min(x + r + 1, w))
                        if solid(nx, ny)
                    ]
                    if near:
                        nx, ny = min(near, key=lambda q: (q[0] - x) ** 2 + (q[1] - y) ** 2)
                        ink_map[y][x] = ink_map[ny][nx]
                        break
    return ink_map, alpha


def render(ink_map, alpha, box, colours=None):
    """RGBA crop of the logo, optionally recoloured."""
    x0, y0, x1, y1 = box
    out = Image.new("RGBA", (x1 - x0, y1 - y0))
    op = out.load()
    ap = alpha.load()
    for y in range(y0, y1):
        for x in range(x0, x1):
            f = ink_map[y][x]
            if colours:
                f = colours[f]
            op[x - x0, y - y0] = (*f, ap[x, y])
    return out


def ink_bbox(alpha, region, threshold=10):
    x0, y0, x1, y1 = region
    mask = alpha.crop(region).point(lambda a: 255 if a > threshold else 0)
    bx = mask.getbbox()
    return (x0 + bx[0], y0 + bx[1], x0 + bx[2], y0 + bx[3])


def find_gaps(profile, min_gap):
    """(start, end) runs of empty rows/columns at least min_gap long."""
    gaps, start = [], None
    for i, filled in enumerate(profile + [True]):
        if not filled and start is None:
            start = i
        elif filled and start is not None:
            if i - start >= min_gap:
                gaps.append((start, i))
            start = None
    return gaps


def tile(img: Image.Image, size: int, scale: float, background=None, radius=0):
    """Centre img on a square canvas, its longest side = scale * size."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    if background:
        bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        ImageDraw.Draw(bg).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=(*background, 255))
        canvas = bg
    longest = max(img.size)
    target = (round(img.width * scale * size / longest), round(img.height * scale * size / longest))
    resized = img.resize(target, Image.LANCZOS)
    canvas.alpha_composite(resized, ((size - target[0]) // 2, (size - target[1]) // 2))
    return canvas


def fit_height(img: Image.Image, height: int):
    return img.resize((round(img.width * height / img.height), height), Image.LANCZOS)


def find_crops(alpha):
    """(lockup, mark) boxes: lockup = mark + "Pos" above the tagline; mark = the diamond (with its "U")."""
    w, h = alpha.size
    # Split lockup from the tagline at the widest empty row band.
    full = ink_bbox(alpha, (0, 0, w, h))
    rows = [alpha.crop((0, y, w, y + 1)).getextrema()[1] > 10 for y in range(h)]
    row_gaps = [g for g in find_gaps(rows, 8) if full[1] < g[0] and g[1] < full[3]]
    split_y = max(row_gaps, key=lambda g: g[1] - g[0])
    lockup = ink_bbox(alpha, (0, 0, w, split_y[0]))

    # Split the mark from "Pos" at the first wide empty column band inside the lockup.
    cols = [alpha.crop((x, lockup[1], x + 1, lockup[3])).getextrema()[1] > 10 for x in range(w)]
    col_gaps = [g for g in find_gaps(cols, 12) if lockup[0] < g[0] and g[1] < lockup[2]]
    mark = ink_bbox(alpha, (lockup[0], lockup[1], col_gaps[0][0], lockup[3]))

    pad = 2  # keep the outermost anti-aliased pixels
    grow = lambda b: (max(b[0] - pad, 0), max(b[1] - pad, 0), min(b[2] + pad, w), min(b[3] + pad, h))
    return grow(lockup), grow(mark)


def without_letter(alpha, mark):
    """
    Copy of alpha with the "U" erased from the mark, for icons and profile pictures.
    The U is the one shape in the mark that starts in its right-hand 40% (every diamond
    stroke and accent bar starts further left). Returns (alpha, tight mark box).
    """
    x0, y0, x1, y1 = mark
    out = alpha.copy()
    ap = out.load()
    seen, kept, erased = set(), set(), []
    for sy in range(y0, y1):
        for sx in range(x0, x1):
            if ap[sx, sy] <= 8 or (sx, sy) in seen:
                continue
            stack, shape = [(sx, sy)], []
            seen.add((sx, sy))
            while stack:
                cx, cy = stack.pop()
                shape.append((cx, cy))
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if x0 <= nx < x1 and y0 <= ny < y1 and (nx, ny) not in seen and ap[nx, ny] > 8:
                        seen.add((nx, ny))
                        stack.append((nx, ny))
            if min(px for px, _ in shape) > x0 + 0.6 * (x1 - x0):
                erased += shape
            else:
                kept.update(shape)
    # Also clear a 4px margin around the letter: the lossy source has faint ringing there
    # that shows as a ghost "U" on dark backgrounds.
    m = 4
    for px, py in erased:
        for ny in range(max(py - m, y0), min(py + m + 1, y1)):
            for nx in range(max(px - m, x0), min(px + m + 1, x1)):
                if (nx, ny) not in kept:
                    ap[nx, ny] = 0
    tight = ink_bbox(out, mark)
    return out, (tight[0] - 2, tight[1] - 2, tight[2] + 2, tight[3] + 2)


def main():
    src = Image.open(SOURCE).convert("RGB")
    ink_map, alpha = unmix(src)

    lockup, mark = find_crops(alpha)
    icon_alpha, icon_box = without_letter(alpha, mark)

    logo = render(ink_map, alpha, lockup, LIGHT_COLOURS)
    logo_dark = render(ink_map, alpha, lockup, DARK_COLOURS)
    mark_img = render(ink_map, icon_alpha, icon_box, LIGHT_COLOURS)  # icons: diamond without the "U"

    PUBLIC.mkdir(parents=True, exist_ok=True)

    # Header / footer / OG / email lockups (displayed at ~36–72px tall; 4x for sharp HiDPI).
    fit_height(logo, 240).save(PUBLIC / "upos-logo.png", optimize=True)
    fit_height(logo_dark, 240).save(PUBLIC / "upos-logo-dark.png", optimize=True)
    fit_height(render(ink_map, alpha, lockup, ON_BRAND_COLOURS), 240).save(PUBLIC / "upos-logo-white.png", optimize=True)

    # Structured-data logo: square, white background (Google shows it on white).
    tile(logo, 512, 0.8, background=WHITE).convert("RGB").save(PUBLIC / "upos-logo-square.png", optimize=True)

    # Icons: the diamond mark on a white tile, so it reads on light and dark browser chrome.
    tile(mark_img, 192, 0.8, background=WHITE, radius=36).save(APP / "icon.png", optimize=True)
    tile(mark_img, 180, 0.76, background=WHITE).convert("RGB").save(APP / "apple-icon.png", optimize=True)
    tile(mark_img, 192, 0.8, background=WHITE, radius=36).save(PUBLIC / "icon-192.png", optimize=True)
    tile(mark_img, 512, 0.8, background=WHITE, radius=96).save(PUBLIC / "icon-512.png", optimize=True)
    # Maskable: full-bleed background, mark inside the 80% safe zone.
    tile(mark_img, 512, 0.62, background=WHITE).convert("RGB").save(PUBLIC / "icon-maskable-512.png", optimize=True)

    ico = tile(mark_img, 256, 0.86, background=WHITE, radius=44)
    ico.save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    print("lockup", lockup, "mark", mark, "icon", icon_box)
    for p in sorted(PUBLIC.glob("*.png")) + [APP / "icon.png", APP / "apple-icon.png", APP / "favicon.ico"]:
        with Image.open(p) as im:
            print(f"{p.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {p.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
