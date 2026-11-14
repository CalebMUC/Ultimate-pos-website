"""
Builds profile pictures and cover images for Google Business Profile and social networks.

    python scripts/build_social_assets.py        (needs Pillow; run from the repo root)

Output: marketing/get-found/images/. Uses the same source logo and colours as
build_brand_assets.py, and the site's fonts from node_modules/@fontsource.
Every cover keeps its text inside the network's "safe area" (the part that is never
cropped on phones or hidden behind the profile picture).
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_brand_assets import (  # noqa: E402
    BLACK,
    BLUE,
    GREEN,
    LIGHT_COLOURS,
    ROOT,
    SOURCE,
    find_crops,
    render,
    unmix,
    without_letter,
)

OUT = ROOT / "marketing/get-found/images"
FONTS = ROOT / "node_modules/@fontsource"
JAKARTA = FONTS / "plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff"
INTER_600 = FONTS / "inter/files/inter-latin-600-normal.woff"
INTER_500 = FONTS / "inter/files/inter-latin-500-normal.woff"

TAGLINE = "Ultimate solution for your business"
LINE_2 = "POS software for Kenyan businesses  ·  M-Pesa built in  ·  Multi-branch"
LINE_3 = "ultimatepos.co.ke   ·   0720 463 710"

# Logo on the green covers: white, with the accent bars in light blue.
ON_GREEN = {GREEN: (255, 255, 255), BLUE: (180, 204, 255), BLACK: (255, 255, 255)}

# (file, size, safe area x0, y0, x1, y1)
COVERS = [
    ("facebook-cover-1640x624.png", (1640, 624), (300, 110, 1340, 514)),
    ("linkedin-cover-1128x191.png", (1128, 191), (250, 28, 1100, 163)),
    ("x-header-1500x500.png", (1500, 500), (330, 80, 1380, 400)),
    ("youtube-banner-2560x1440.png", (2560, 1440), (507, 508, 2053, 931)),
    ("google-business-cover-1080x608.png", (1080, 608), (80, 150, 1000, 458)),
]


def gradient(size):
    """Brand gradient: dark green -> button green -> blue (same as the share-image band)."""
    w, h = size
    stops = [(0.0, (7, 92, 51)), (0.55, (10, 122, 67)), (1.0, (13, 90, 156))]
    img = Image.new("RGB", size)
    px = img.load()
    for x in range(w):
        t = x / max(w - 1, 1)
        for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
            if t0 <= t <= t1:
                k = (t - t0) / (t1 - t0)
                col = tuple(round(c0[i] + (c1[i] - c0[i]) * k) for i in range(3))
                break
        for y in range(h):
            px[x, y] = col
    return img.convert("RGBA")


def text_block(logo, height=400):
    """Logo on the left, three lines of text on the right, transparent background."""
    jakarta = ImageFont.truetype(str(JAKARTA), 112)
    inter600 = ImageFont.truetype(str(INTER_600), 50)
    inter500 = ImageFont.truetype(str(INTER_500), 46)
    lines = [(TAGLINE, jakarta, (255, 255, 255)), (LINE_2, inter600, (230, 245, 236)), (LINE_3, inter500, (190, 235, 210))]
    gaps = [0, 34, 26]
    sizes = [ImageDraw.Draw(Image.new("L", (1, 1))).textbbox((0, 0), t, font=f) for t, f, _ in lines]
    text_w = max(b[2] for b in sizes)
    text_h = sum(b[3] - b[1] for b in sizes) + sum(gaps)

    logo = logo.resize((round(logo.width * height / logo.height), height), Image.LANCZOS)
    gap = 90
    block = Image.new("RGBA", (logo.width + gap + text_w, max(height, text_h)), (0, 0, 0, 0))
    block.alpha_composite(logo, (0, (block.height - height) // 2))
    draw = ImageDraw.Draw(block)
    y = (block.height - text_h) // 2
    for (text, font, colour), box, g in zip(lines, sizes, gaps):
        y += g
        draw.text((logo.width + gap, y - box[1]), text, font=font, fill=colour)
        y += box[3] - box[1]
    return block


def fit(img, box):
    x0, y0, x1, y1 = box
    scale = min((x1 - x0) / img.width, (y1 - y0) / img.height)
    resized = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    return resized, (x0 + ((x1 - x0) - resized.width) // 2, y0 + ((y1 - y0) - resized.height) // 2)


def watermark(canvas, mark):
    """Large faint mark bleeding off the right edge."""
    h = round(canvas.height * 1.3)
    big = mark.resize((round(mark.width * h / mark.height), h), Image.LANCZOS)
    alpha = big.getchannel("A").point(lambda a: a * 0.07)
    big.putalpha(alpha)
    canvas.alpha_composite(big, (canvas.width - round(big.width * 0.62), (canvas.height - h) // 2))


def avatar(mark, background, size=1080, scale=0.58):
    """Square profile picture; the mark stays inside the circle networks crop it to."""
    canvas = Image.new("RGBA", (size, size), (*background, 255)) if isinstance(background, tuple) else background
    m = mark.resize((round(mark.width * size * scale / mark.height), round(size * scale)), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas.convert("RGB")


def main():
    src = Image.open(SOURCE).convert("RGB")
    ink_map, alpha = unmix(src)
    lockup, mark = find_crops(alpha)
    icon_alpha, icon_box = without_letter(alpha, mark)  # profile pictures: diamond without the "U"

    OUT.mkdir(parents=True, exist_ok=True)
    logo_white = render(ink_map, alpha, lockup, ON_GREEN)
    mark_white = render(ink_map, icon_alpha, icon_box, ON_GREEN)
    mark_colour = render(ink_map, icon_alpha, icon_box, LIGHT_COLOURS)

    block = text_block(logo_white)
    for name, size, safe in COVERS:
        canvas = gradient(size)
        watermark(canvas, mark_white)
        img, pos = fit(block, safe)
        canvas.alpha_composite(img, pos)
        canvas.convert("RGB").save(OUT / name, optimize=True)

    avatar(mark_colour, (255, 255, 255)).save(OUT / "profile-picture-white-1080.png", optimize=True)
    avatar(mark_white, gradient((1080, 1080))).save(OUT / "profile-picture-green-1080.png", optimize=True)
    # Google Business Profile logo: full lockup on white, square.
    gbp = Image.new("RGBA", (1080, 1080), (255, 255, 255, 255))
    lock = render(ink_map, alpha, lockup, LIGHT_COLOURS)
    img, pos = fit(lock, (150, 150, 930, 930))
    gbp.alpha_composite(img, pos)
    gbp.convert("RGB").save(OUT / "google-business-logo-1080.png", optimize=True)

    for p in sorted(OUT.glob("*.png")):
        with Image.open(p) as im:
            print(f"{p.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {p.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
