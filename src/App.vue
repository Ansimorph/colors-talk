<template>
<main>
  <span>
  This is a talk about
  <span class="input__wrapper">
    <span class="input__dummy" aria-hidden="true">{{ backgroundColor }}</span>
    <input type="text" v-model="backgroundColor">
  </span>
  </span>
</main>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      backgroundColor: 'colors',
      lineHeight: '1.3'
    }
  }
}
</script>

<style lang="scss" vars="{ backgroundColor, lineHeight }">
@import "./assets/fonts/plex/css/ibm-plex.css";

*, *:after, *::before {
  box-sizing: border-box;
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
  background-color: var(--backgroundColor);
  font-family: "IBM Plex Serif", Helvetica, sans-serif;
  font-size: clamp(1rem, 7vw, 7rem);
  font-weight: 400;
  line-height: var(--lineHeight);
}

.input__wrapper {
  display: inline-flex;
  position: relative;
  vertical-align: bottom;
  border: 0.2rem solid black;
}

.input__dummy {
  min-width: 2ch;
  min-height: calc(var(--lineHeight) * 1em);
  visibility: hidden;
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
}

</style>
