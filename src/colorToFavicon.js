export default function colorToFavIcon(backgroundColor) {
  let icon, context;
  (icon = document.createElement("canvas")),
    (icon.width = icon.height = 64),
    (context = icon.getContext("2d"));

  context.beginPath();
  context.rect(4, 4, 60, 60);
  context.fillStyle = backgroundColor;
  context.fill();

  return icon.toDataURL("image/x-icon");
}
