<template>
  <div class="color-container">
    <main>
      <p>
        This is a talk about
          <InputText
            @color-change="updateBackgroundColor($event)"
          />
      </p>
    </main>
    <FooterElement />
  </div>
  <FavIcon :backgroundColor="backgroundColor" />
</template>

<script>
import { ref } from "vue";
import { readableColor } from "color2k";
import InputText from "./components/InputText"
import FooterElement from './components/FooterElement';
import FavIcon from "./components/FavIcon"

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

export default {
  components: {
    InputText,
    FooterElement,
    FavIcon,
  },
  setup() {
    const backgroundColor = ref(null);
    const textColor = ref(DEFAULT_TEXT_COLOR);
    const lineHeight = ref(DEFAULT_LINE_HEIGHT);
    const fontSize = ref(FONT_SIZE_BIG);

    function updateBackgroundColor(newBackgroundColor) {
      textColor.value = getReadableTextColor(newBackgroundColor);
      fontSize.value = getReadableTextSize(newBackgroundColor);
      backgroundColor.value = newBackgroundColor;
    }

    return {
      backgroundColor,
      textColor,
      lineHeight,
      fontSize,
      updateBackgroundColor,
    };
  },
};
</script>

<style lang="scss" vars="{ backgroundColor, textColor, lineHeight, fontSize }">
$font-prefix: "./assets/fonts/plex/";
@import "./assets/fonts/plex/scss/serif/regular/index";
@import "./assets/fonts/plex/scss/serif/medium/index";

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

.color-container {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
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

main {
  display: flex;
  place-content: center;
  place-items: center;
}
</style>
