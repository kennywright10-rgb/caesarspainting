"""
Remove black background from logo-gold.png → saves as logo-gold-transparent.png
Run this from the CaesarsPainting folder:  python process-logo.py
"""
from PIL import Image
import numpy as np

img = Image.open("logo-gold.png").convert("RGBA")
data = np.array(img)

# Any pixel that is "very dark" (close to black) becomes transparent
# This preserves the gold while removing the background
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# Pixels where all channels are below threshold are considered "black background"
threshold = 40
is_black = (r < threshold) & (g < threshold) & (b < threshold)
data[is_black, 3] = 0  # set alpha to 0 (transparent)

result = Image.fromarray(data)
result.save("logo-gold-transparent.png")
print("Done → logo-gold-transparent.png")
