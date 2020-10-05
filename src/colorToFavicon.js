const FAVICON_SIZE = 64;

export default function colorToFavIcon(backgroundColor) {
  const icon = document.createElement("canvas");
  const context = icon.getContext("2d");

  icon.width = icon.height = FAVICON_SIZE;

  context.beginPath();
  context.rect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
  context.fillStyle = backgroundColor;
  context.fill();

  return icon.toDataURL("image/x-icon");
}
