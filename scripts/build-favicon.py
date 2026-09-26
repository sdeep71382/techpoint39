"""
Builds the favicon set from the real Space Grotesk 700 outlines that next/font
already downloads, so the browser-tab mark matches the site's display typeface
instead of being a separate hand-drawn approximation.

Run with:  python scripts/build-favicon.py
Requires:  pip install fonttools brotli pillow

Writes, using Next.js file conventions (see dist/docs/.../app-icons.md):
  src/app/favicon.ico       .ico only, root app segment only
  src/app/icon.svg          scalable, rounded
  src/app/apple-icon.png    apple-icon does not accept .svg, so this is a PNG
"""
import glob
import os

from fontTools.pens.basePen import BasePen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "app")
PUBLIC = os.path.join(ROOT, "public")

NAVY = "#071F4F"
WHITE = "#FFFFFF"
SIGNAL = "#FFD21F"

CAP = 700.0   # cap height in font units (upem is 1000)
LETTERS = "TP"
STEPS = 12    # curve flattening resolution, per cubic segment


class ContourPen(BasePen):
    """Flattens a glyph into polygons so one source drives both SVG and PNG."""

    def __init__(self, glyph_set):
        super().__init__(glyph_set)
        self.contours = []
        self._current = []
        self._start = None

    def _moveTo(self, pt):
        self._close()
        self._start = pt
        self._current = [pt]

    def _lineTo(self, pt):
        self._current.append(pt)

    def _curveToOne(self, *points):
        # De Casteljau, so the flattened outline matches the real curve.
        p0 = self._current[-1]
        pts = [p0] + list(points)
        for step in range(1, STEPS + 1):
            t = step / STEPS
            cur = pts
            while len(cur) > 1:
                cur = [
                    (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
                    for a, b in zip(cur, cur[1:])
                ]
            self._current.append(cur[0])

    def _closePath(self):
        self._close()

    def _endPath(self):
        self._close()

    def _close(self):
        if len(self._current) > 2:
            self.contours.append(self._current)
        self._current = []
        self._start = None

    def done(self):
        self._close()
        return self.contours


def find_font():
    """Locate the latin subset next/font caches for Space Grotesk."""
    for path in sorted(glob.glob(os.path.join(ROOT, ".next", "**", "*.woff2"), recursive=True)):
        try:
            font = TTFont(path)
            if "fvar" not in font or font["head"].unitsPerEm != 1000:
                continue
            cmap = font.getBestCmap()
            if all(ord(ch) in cmap for ch in LETTERS):
                return path, font
        except Exception:
            continue
    raise SystemExit("No Space Grotesk woff2 found under .next/. Run `npm run dev` first.")


def load_glyphs(font):
    """Return per-letter contours in font units plus the advance widths."""
    bold = instantiateVariableFont(font, {"wght": 700}, inplace=True, updateFontNames=False)
    glyph_set = bold.getGlyphSet()
    cmap = bold.getBestCmap()
    hmtx = bold["hmtx"]

    letters = []
    for ch in LETTERS:
        name = cmap[ord(ch)]
        pen = ContourPen(glyph_set)
        glyph_set[name].draw(pen)
        advance, lsb = hmtx[name]
        letters.append({"ch": ch, "contours": pen.done(), "adv": advance, "lsb": lsb})
    return letters


def place(letters, size, cap_ratio, baseline_ratio):
    """
    Scale so the caps occupy cap_ratio of the tile, then centre the ink.

    Centring on the ink rather than the advance matters: the T carries a left
    side bearing that would otherwise push the mark right of centre.
    """
    scale = size * cap_ratio / CAP
    baseline = size * baseline_ratio
    pen_x = 0.0
    ink_left = None
    ink_right = None
    for letter in letters:
        for contour in letter["contours"]:
            for x, _ in contour:
                world = pen_x + x
                ink_left = world if ink_left is None else min(ink_left, world)
                ink_right = world if ink_right is None else max(ink_right, world)
        pen_x += letter["adv"]
    shift = size / 2 - ((ink_left + ink_right) / 2) * scale
    return scale, baseline, shift


def build_svg(letters, *, size=64, cap_ratio, baseline_ratio, corner, bar):
    scale, baseline, shift = place(letters, size, cap_ratio, baseline_ratio)
    body = []
    pen_x = 0.0
    for letter in letters:
        for contour in letter["contours"]:
            # Font units go straight into the path; the group transform below
            # does the scaling and the y-flip, so the numbers stay small.
            pts = " ".join(f"{pen_x + x:.0f},{y:.0f}" for x, y in contour)
            body.append(f'    <polygon points="{pts}"/>')
        pen_x += letter["adv"]
    radius = 14 if corner else 0
    bx, by, bw, bh = bar
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Tech Point Services">
  <title>Tech Point Services</title>
  <rect width="64" height="64" rx="{radius}" fill="{NAVY}"/>
  <g transform="translate({shift:.3f} {baseline:.3f}) scale({scale:.5f} {-scale:.5f})" fill="{WHITE}">
{chr(10).join(body)}
  </g>
  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="2" fill="{SIGNAL}"/>
</svg>
"""


def build_png(letters, size, *, cap_ratio, baseline_ratio, corner_ratio, bar):
    """Same mark, drawn with Pillow, supersampled then downscaled."""
    ss = 8
    big = size * ss
    scale, baseline, shift = place(letters, big, cap_ratio, baseline_ratio)

    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    radius = int(big * corner_ratio) if corner_ratio else 0
    draw.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius, fill=NAVY)

    pen_x = 0.0
    for letter in letters:
        for contour in letter["contours"]:
            draw.polygon(
                [(shift + (pen_x + x) * scale, baseline - y * scale) for x, y in contour],
                fill=WHITE,
            )
        pen_x += letter["adv"]

    bx, by, bw, bh = bar
    draw.rounded_rectangle(
        [big * bx, big * by, big * (bx + bw), big * (by + bh)],
        radius=big * 0.02,
        fill=SIGNAL,
    )
    return img.resize((size, size), Image.LANCZOS)


ROUNDED = {"cap_ratio": 28 / 64, "baseline_ratio": 43 / 64, "bar": (14, 47, 36, 4)}
SQUARE = {"cap_ratio": 30 / 64, "baseline_ratio": 46 / 64, "bar": (12, 50, 40, 4)}


def main():
    path, font = find_font()
    print("font:", os.path.relpath(path, ROOT))
    letters = load_glyphs(font)

    os.makedirs(OUT, exist_ok=True)

    targets = [
        ("icon.svg", build_svg(letters, corner=True, **ROUNDED)),
    ]
    for name, data in targets:
        with open(os.path.join(OUT, name), "w", encoding="utf8") as handle:
            handle.write(data)
        print(f"wrote src/app/{name}  {len(data)} bytes")

    # Only apple-icon needs a raster: icon.svg covers every modern browser with
    # sizes="any", and favicon.ico covers the legacy path.
    rasters = [
        ("apple-icon.png", 180, 0, SQUARE),
    ]
    for name, size, corner_ratio, spec in rasters:
        img = build_png(letters, size, corner_ratio=corner_ratio, **spec)
        target = os.path.join(OUT, name)
        img.save(target, optimize=True)
        print(f"wrote src/app/{name}  {os.path.getsize(target)} bytes")

    # favicon.ico is only recognised in the root app segment, so it goes to
    # src/app rather than public/.
    ico = build_png(letters, 64, corner_ratio=14 / 64, **ROUNDED)
    target = os.path.join(OUT, "favicon.ico")
    ico.save(target, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"wrote src/app/favicon.ico  {os.path.getsize(target)} bytes")


if __name__ == "__main__":
    main()
