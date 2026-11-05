type Crop = { backgroundSize: string; backgroundPosition: string; aspectRatio: string };

/**
 * The offsets that make an <img> show what `background-size` and `background-position` would,
 * so a crop gets responsive sizes and lazy loading, which a CSS background can't have.
 */
export function cropStyle(crop: Crop, image: { width: number; height: number }) {
  const scale = parseFloat(crop.backgroundSize) / 100;
  const [x, y] = crop.backgroundPosition.split(" ").map((v) => parseFloat(v) / 100);
  const [boxWidth, boxHeight] = crop.aspectRatio.split("/").map(Number);
  // Rendered image height, as a share of the box's height.
  const relativeHeight = (scale * (image.height / image.width)) / (boxHeight / boxWidth);
  return {
    scale,
    width: `${scale * 100}%`,
    left: `${(1 - scale) * x * 100}%`,
    top: `${(1 - relativeHeight) * y * 100}%`,
  };
}
