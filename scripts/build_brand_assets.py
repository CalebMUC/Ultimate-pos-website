"""
Builds every logo/icon file the site uses, by drawing the Ultimate POS logo.

    python scripts/build_brand_assets.py            (needs Pillow: pip install pillow)

The logo is the one in the Ultimate POS app: a gold diamond with a small diamond in its
centre, followed by the wordmark "Ultimate" + "POS" ("POS" in gold). It's drawn here
from shapes and the site's display font rather than cut from a screenshot, so every size
is sharp. To adjust it, change the colours/proportions below and re-run.

File names still say "upos-logo" so links in emails that were already sent keep working.
"""

import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public/brand"
APP = ROOT / "src/app"
FONT = ROOT / "node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff"

# Colours sampled from the logo in the app's sidebar.
GOLD = (243, 190, 13)  # #F3BE0D
NAVY = (10, 24, 64)  # #0A1840, the sidebar background
CREAM = (238, 233, 216)  # the small centre diamond on navy
WHITE = (255, 255, 255)
# On white, the sampled gold is very light, so the light version uses a deeper gold.
GOLD_ON_LIGHT = (224, 160, 0)  # #E0A000

# Proportions of the mark, as fractions of the outer diamond's width (= its height).
HOLE = 0.68  # inner edge of the gold ring
CENTRE = 0.34  # the small centre diamond
CORNER = 0.09  # corner rounding, as a fraction of a side

# Wordmark: cap height as a fraction of the mark's height, and the gap after the mark.
CAP_HEIGHT = 0.44
MARK_GAP = 0.24

SUPERSAMPLE = 4


def diamond_mask(size: int, width: float) -> Image.Image:
    """L mask (size x size) with a rounded diamond `width` px across, centred."""
    big = size * SUPERSAMPLE
    side = width * SUPERSAMPLE / math.sqrt(2)
    c = big / 2
    m = Image.new("L", (big, big), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        (c - side / 2, c - side / 2, c + side / 2, c + side / 2), radius=side * CORNER, fill=255
    )
    return m.rotate(45, resample=Image.BICUBIC).resize((size, size), Image.LANCZOS)


def layer(size, colour, mask: Image.Image) -> Image.Image:
    out = Image.new("RGBA", size, (*colour, 0))
    out.putalpha(mask)
    return out


def mark(size: int, ring, centre) -> Image.Image:
    """The diamond mark on a transparent square: gold ring, see-through gap, small centre diamond."""
    w = size - 2  # 1px margin keeps the anti-aliased tips
    ring_mask = ImageChops.subtract(diamond_mask(size, w), diamond_mask(size, w * HOLE))
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    img = Image.alpha_composite(img, layer(img.size, ring, ring_mask))
    return Image.alpha_composite(img, layer(img.size, centre, diamond_mask(size, w * CENTRE)))


def wordmark(cap_height: int, ultimate, pos):
    """
    "UltimatePOS" on a transparent background, with capitals cap_height px tall.
    Returns (image, cap_top): the image also holds the parts that rise above the capitals
    ("l", "t") or dip below the baseline ("O", "S"); cap_top is where the capitals start.
    """
    probe = ImageFont.truetype(str(FONT), 1000)
    font = ImageFont.truetype(str(FONT), round(1000 * cap_height / -probe.getbbox("U", anchor="ls")[1]))
    ultimate_w = font.getlength("Ultimate")
    pos_gap = round(0.045 * cap_height)
    _, top, _, bottom = font.getbbox("UltimatePOS", anchor="ls")
    width = math.ceil(ultimate_w + pos_gap + font.getlength("POS")) + 4
    baseline = -top + 1

    img = Image.new("RGBA", (width, baseline + bottom + 2), (0, 0, 0, 0))
    for text, x, colour in (("Ultimate", 0, ultimate), ("POS", ultimate_w + pos_gap, pos)):
        mask = Image.new("L", img.size, 0)
        ImageDraw.Draw(mask).text((x, baseline), text, font=font, fill=255, anchor="ls")
        img = Image.alpha_composite(img, layer(img.size, colour, mask))
    return img, baseline - cap_height


def lockup(height: int, ring, centre, ultimate, pos) -> Image.Image:
    """Mark + wordmark, `height` px tall, on a transparent background; capitals centred on the mark."""
    cap = round(CAP_HEIGHT * height)
    words, cap_top = wordmark(cap, ultimate, pos)
    gap = round(MARK_GAP * height)
    img = Image.new("RGBA", (height + gap + words.width, height), (0, 0, 0, 0))
    img.alpha_composite(mark(height, ring, centre), (0, 0))
    img.alpha_composite(words, (height + gap, round((height - cap) / 2) - cap_top))
    return img


def tile(img: Image.Image, size: int, scale: float, background, radius=0) -> Image.Image:
    """Centre img on a square background, its longest side = scale * size."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(canvas).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=(*background, 255))
    longest = max(img.size)
    target = (round(img.width * scale * size / longest), round(img.height * scale * size / longest))
    canvas.alpha_composite(img.resize(target, Image.LANCZOS), ((size - target[0]) // 2, (size - target[1]) // 2))
    return canvas


def main():
    PUBLIC.mkdir(parents=True, exist_ok=True)

    # Header / footer / OG / email lockups (displayed ~32–56px tall; 240px for sharp HiDPI).
    light = lockup(240, GOLD_ON_LIGHT, NAVY, NAVY, GOLD_ON_LIGHT)  # on white
    dark = lockup(240, GOLD, CREAM, WHITE, GOLD)  # dark mode, the green footer, navy
    light.save(PUBLIC / "upos-logo.png", optimize=True)
    dark.save(PUBLIC / "upos-logo-dark.png", optimize=True)
    dark.save(PUBLIC / "upos-logo-white.png", optimize=True)

    # Structured-data logo: square, white background (Google shows it on white).
    tile(light, 512, 0.86, WHITE).convert("RGB").save(PUBLIC / "upos-logo-square.png", optimize=True)

    # Icons: the mark on a navy tile, like the app's sidebar.
    icon_mark = mark(1024, GOLD, CREAM)
    tile(icon_mark, 192, 0.74, NAVY, radius=40).save(APP / "icon.png", optimize=True)
    tile(icon_mark, 192, 0.74, NAVY, radius=40).save(PUBLIC / "icon-192.png", optimize=True)
    tile(icon_mark, 512, 0.74, NAVY, radius=104).save(PUBLIC / "icon-512.png", optimize=True)
    # Apple and maskable icons are cropped by the OS: full-bleed navy, mark inside the safe zone.
    tile(icon_mark, 180, 0.66, NAVY).convert("RGB").save(APP / "apple-icon.png", optimize=True)
    tile(icon_mark, 512, 0.58, NAVY).convert("RGB").save(PUBLIC / "icon-maskable-512.png", optimize=True)
    # Favicon: the mark fills more of the tile so it still reads at 16px.
    tile(icon_mark, 256, 0.84, NAVY, radius=48).save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    for p in sorted(PUBLIC.glob("*.png")) + [APP / "icon.png", APP / "apple-icon.png", APP / "favicon.ico"]:
        with Image.open(p) as im:
            print(f"{p.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {p.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
