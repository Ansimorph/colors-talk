<template>
<main>
  <span>
  This is a talk about
  <span class="input__wrapper">
    <span class="input__dummy" aria-hidden="true">{{ backgroundColor }}</span>
    <label class="visually-hidden" for="color">enter a color</label>
    <input type="text" v-model="backgroundColor" id="color">
  </span>
  </span>
</main>
</template>

<script>
import { ref, watch } from 'vue';
import Color from "color";

const DEFAULT_BACKGROUND = "white";

export default {
  setup() {
    const backgroundColor = ref('colors');
    const textColor = ref('black');
    const lineHeight = ref('1.3');

    watch(
      backgroundColor,
      (newBackgroundColor) => {
        let backgroundColorObject;
        const textColorObject = Color(textColor.value);

        try {
          backgroundColorObject = Color(newBackgroundColor);
          }
        catch {
          backgroundColorObject = Color(DEFAULT_BACKGROUND);
        }

        const contrast = backgroundColorObject.contrast(textColorObject);

        if (contrast <= 3) {
          textColor.value = textColorObject.negate().string();
        }
      }
    )

    return {
      backgroundColor, textColor, lineHeight
    }
  }
}
</script>

<style lang="scss" vars="{ backgroundColor, textColor, lineHeight }">
@import "./assets/fonts/plex/css/ibm-plex.css";

*, *:after, *::before {
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

html, body, #app, main {
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
  font-size: clamp(1rem, 7vw, 7rem);
  font-weight: 400;
  line-height: var(--lineHeight);
}

.input__wrapper {
  --border-width: clamp(0.1rem, 0.6vw, 0.5rem);

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
  &:empty::before{
    content: "l";
  }
}

.input__dummy, input {
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
