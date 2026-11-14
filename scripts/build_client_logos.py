"""
Builds the client logos shown in the homepage trust strip.

    python scripts/build_client_logos.py        (needs Pillow; run from the repo root)

Sources in assets/clients/:
- aqua-hub-source.png      Aqua Hub's logo (already transparent). The tagline is cropped off:
                           it is unreadable at logo-strip size.
- alvet-packet-crop.png    Alvet's logo, cropped from a photo of their product packet (white
                           lettering on a magenta band). The lettering is lifted out as a shape
                           and recoloured in Alvet's magenta. Replace with their real logo file
                           when you get one.
"""

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets/clients"
OUT = ROOT / "public/clients"
HEIGHT = 160  # output height; shown at ~48px, so 3x for sharp HiDPI screens


def trim(img: Image.Image, pad=4):
    x0, y0, x1, y1 = img.getchannel("A").point(lambda a: 255 if a > 12 else 0).getbbox()
    return img.crop((max(x0 - pad, 0), max(y0 - pad, 0), min(x1 + pad, img.width), min(y1 + pad, img.height)))


def fit_height(img: Image.Image, height=HEIGHT):
    return img.resize((round(img.width * height / img.height), height), Image.LANCZOS)


def aqua_hub():
    img = Image.open(SRC / "aqua-hub-source.png").convert("RGBA")
    alpha = img.getchannel("A")
    # Drop the tagline: it sits below the last wide empty row band.
    rows = [alpha.crop((0, y, img.width, y + 1)).getextrema()[1] > 40 for y in range(img.height)]
    gaps, start = [], None
    for y, filled in enumerate(rows + [True]):
        if not filled and start is None:
            start = y
        elif filled and start is not None:
            gaps.append((start, y))
            start = None
    inner = [g for g in gaps if g[0] > 0 and g[1] < img.height]
    cut = inner[-1][0]  # last gap = between "HUB" and the tagline
    return fit_height(trim(img.crop((0, 0, img.width, cut))))


def alvet():
    photo = Image.open(SRC / "alvet-packet-crop.png").convert("RGB")
    # The camera made white look light blue: white balance against the lettering.
    lettering = (152, 214, 255)
    gain = [255 / c for c in lettering]
    band = (143, 25, 113)
    magenta = tuple(min(255, round(band[i] * gain[i])) for i in range(3))  # ≈ #F01E71

    scale = 4
    big = photo.resize((photo.width * scale, photo.height * scale), Image.BICUBIC).filter(ImageFilter.GaussianBlur(1.2))
    g = big.getchannel("G")
    lo, hi = 60, 190  # band green level -> lettering green level
    alpha = g.point(lambda v: 0 if v <= lo else 255 if v >= hi else round((v - lo) / (hi - lo) * 255))
    # Sharpen the soft photo edges a little.
    alpha = alpha.point(lambda a: round(255 * (3 * (a / 255) ** 2 - 2 * (a / 255) ** 3)))

    # The white packet around the band also passes the test: remove anything touching the border.
    solid = alpha.point(lambda a: 255 if a > 100 else 0)
    from PIL import ImageDraw

    w, h = solid.size
    for x in range(0, w, 3):
        for y in (0, h - 1):
            if solid.getpixel((x, y)) == 255:
                ImageDraw.floodfill(solid, (x, y), 0)
    for y in range(0, h, 3):
        for x in (0, w - 1):
            if solid.getpixel((x, y)) == 255:
                ImageDraw.floodfill(solid, (x, y), 0)
    keep = solid.filter(ImageFilter.MaxFilter(7))
    alpha = Image.composite(alpha, Image.new("L", alpha.size, 0), keep)

    logo = Image.new("RGBA", alpha.size, (*magenta, 0))
    logo.putalpha(alpha)
    return fit_height(trim(logo)), magenta


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    aqua = aqua_hub()
    aqua.save(OUT / "aqua-hub.png", optimize=True)
    alv, magenta = alvet()
    alv.save(OUT / "alvet.png", optimize=True)
    print("aqua-hub.png", aqua.size)
    print("alvet.png", alv.size, "#%02X%02X%02X" % magenta)


if __name__ == "__main__":
    main()
