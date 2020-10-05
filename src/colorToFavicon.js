const FAVICON_SIZE = 64;

export default function colorToFavIcon(backgroundColor) {
  const icon = document.createElement("canvas");
  const context = icon.getContext("2d");

  icon.width = icon.height = FAVICON_SIZE;

  context.beginPath();
  context.ellipse(
    FAVICON_SIZE / 2,
    FAVICON_SIZE / 2,
    FAVICON_SIZE / 2,
    FAVICON_SIZE / 2,
    0,
    0,
    Math.PI * 2
  );
  context.fillStyle = backgroundColor;
  context.fill();

  return icon.toDataURL("image/x-icon");
}
