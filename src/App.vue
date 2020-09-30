<template>
  <main>
    <span>
      This is a talk about
      <span class="input__wrapper">
        <span class="input__dummy" aria-hidden="true">{{
          backgroundColor
        }}</span>
        <label class="visually-hidden" for="color">enter a color</label>
        <input
          type="text"
          v-model="backgroundColor"
          id="color"
          @keydown="updateNumber"
        />
      </span>
    </span>
  </main>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { readableColor } from "color2k";
import queryString from "query-string";
import {restoreCursorPosition, incrementNumericValueOnKeyPress} from "./inputHelpers"

const DEFAULT_BACKGROUND_COLOR = "colors";
const DEFAULT_TEXT_COLOR = "black";
const DEFAULT_LINE_HEIGHT = 1.3;
const FONT_SIZE_BIG = 6; // vw
const FONT_SIZE_SMALL = 4; // vw

function getReadableTextColor(backgroundColor) {
  try {
    return readableColor(backgroundColor);
  } catch {
    return DEFAULT_TEXT_COLOR;
  }
}

function getReadableTextSize(backgroundColor) {
  if (!backgroundColor) return FONT_SIZE_BIG;
  return backgroundColor.length > 8 ? FONT_SIZE_SMALL : FONT_SIZE_BIG;
}

function getBackgroundColorFromUrl() {
  const parsedQueryString = queryString.parse(location.hash);
  return parsedQueryString?.bgColor
    ? parsedQueryString.bgColor
    : DEFAULT_BACKGROUND_COLOR;
}

function setBackgroundColorInUrl(backgroundColor) {
  const parameter = { bgColor: backgroundColor };
  location.hash = queryString.stringify(parameter);
}

export default {
  setup() {
    const backgroundColor = ref(DEFAULT_BACKGROUND_COLOR);
    const textColor = ref(DEFAULT_TEXT_COLOR);
    const lineHeight = ref(DEFAULT_LINE_HEIGHT);
    const fontSize = ref(FONT_SIZE_BIG);

    watch(backgroundColor, (newBackgroundColor) => {
      textColor.value = getReadableTextColor(newBackgroundColor);
      fontSize.value = getReadableTextSize(newBackgroundColor);
      setBackgroundColorInUrl(newBackgroundColor);
    });

    onMounted(() => {
      backgroundColor.value = getBackgroundColorFromUrl();
    });

    function updateNumber(event) {
      backgroundColor.value = incrementNumericValueOnKeyPress(
        event,
        backgroundColor.value
      );
      restoreCursorPosition(event.target);
    }

    return {
      backgroundColor,
      textColor,
      lineHeight,
      fontSize,
      updateNumber,
    };
  },
};
</script>

<style lang="scss" vars="{ backgroundColor, textColor, lineHeight, fontSize }">
$font-prefix: "./assets/fonts/plex/";
@import "./assets/fonts/plex/scss/serif/regular/index";

*,
*:after,
*::before {
  box-sizing: border-box;
}

.visually-hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}

html,
body,
#app,
main {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
}

main {
  display: flex;
  place-content: center;
  place-items: center;
}

main {
  width: 100%;
  height: 100%;
  padding: 2rem;
  color: var(--textColor);
  background-color: var(--backgroundColor);
  font-family: "IBM Plex Serif", Helvetica, sans-serif;
  font-size: clamp(1rem, calc(var(--fontSize) * 1vw), 7rem);
  font-weight: 400;
  line-height: var(--lineHeight);
}

.input__wrapper {
  --border-width: clamp(0.1rem, calc(var(--fontSize) * 0.1vw), 0.5rem);

  display: inline-flex;
  position: relative;
  border: var(--border-width) solid currentColor;

  &:focus-within {
    border: var(--border-width) solid turquoise;
  }
}

.input__dummy {
  min-width: 2ch;
  min-height: calc(var(--lineHeight) * 1em);
  visibility: hidden;

  // The dummy needs a character, otherwise the field will jump when empty
  &:empty::before {
    content: "l";
  }
}

.input__dummy,
input {
  padding: 0 0.5rem;
}

input {
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  border: none;
  background-color: initial;
  color: currentColor;

  &:focus {
    outline: none;
  }
}
</style>
