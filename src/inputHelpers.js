import { nextTick } from "vue";

function getIncrement(keyCode, altKey) {
  const stepSize = altKey ? 1 : 10;

  switch (keyCode) {
    case "ArrowUp":
      return stepSize;
    case "ArrowDown":
      return -stepSize;
    default:
      return;
  }
}

function getCursorPosition(element) {
  return element.selectionStart;
}

function getNumbersFromString(text) {
  const numberRegex = /[0-9]+/g;
  return text.matchAll(numberRegex);
}

function filterNumbersAroundCursor(matches, cursorPosition) {
  if (!matches) return;

  for (const match of matches) {
    const startOfSubstring = match.index;
    const endOfSubstring = match.index + match[0].length - 1;

    if (startOfSubstring > cursorPosition) return;

    if (endOfSubstring >= cursorPosition - 1) {
      return { start: startOfSubstring, end: endOfSubstring };
    }
  }

  return;
}

function restoreCursorPosition(element) {
  const currentCursorPosition = getCursorPosition(element);

  nextTick(() => {
    event.target.setSelectionRange(
      currentCursorPosition,
      currentCursorPosition
    );
  });
}

function incrementNumericValueOnKeyPress(event, text) {
  const increment = getIncrement(event.key, event.altKey);
  const cursorPosition = getCursorPosition(event.target);
  const numberPosition = filterNumbersAroundCursor(
    getNumbersFromString(text),
    cursorPosition
  );

  if (!increment || !numberPosition || !cursorPosition) return text;

  const prefix = text.substring(0, numberPosition.start);
  let number = parseInt(
    text.substring(numberPosition.start, numberPosition.end + 1),
    10
  );
  const suffix = text.substring(numberPosition.end + 1);

  number = Math.max(0, number + increment);

  event.preventDefault();

  return prefix + number + suffix;
}

export {incrementNumericValueOnKeyPress, restoreCursorPosition}