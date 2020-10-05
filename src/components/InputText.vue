<template>
  <span class="input__wrapper">
    <span class="input__dummy" aria-hidden="true">{{ backgroundColor }}</span>
    <label class="visually-hidden" for="color">enter a color</label>
    <input
      spellcheck="false"
      type="text"
      v-model="backgroundColor"
      id="color"
      @keydown="updateNumber"
    />
  </span>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import {
  restoreCursorPosition,
  incrementNumericValueOnKeyPress,
} from "../inputHelpers";
import queryString from "query-string";

const DEFAULT_BACKGROUND_COLOR = "colors";

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
  setup(_, { emit }) {
    const backgroundColor = ref(DEFAULT_BACKGROUND_COLOR);

    function updateNumber(event) {
      const updatedText = incrementNumericValueOnKeyPress(
        event,
        backgroundColor.value
      );

      if (updatedText) {
        backgroundColor.value = updatedText;
        restoreCursorPosition(event.target);
      }
    }

    onMounted(() => {
      backgroundColor.value = getBackgroundColorFromUrl();
    });

    watch(backgroundColor, (newBackgroundColor) => {
      setBackgroundColorInUrl(newBackgroundColor);
      emit("color-change", newBackgroundColor);
    });

    return {
      updateNumber,
      backgroundColor,
    };
  },
};
</script>

<style lang="scss">
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
