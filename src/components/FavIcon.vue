<template>
  <teleport to="head">
    <link rel="icon" :href="favIcon" />
  </teleport>
</template>

<script>
import { computed } from "vue";

const FAVICON_SIZE = 64;

function colorToFavIcon(backgroundColor) {
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

export default {
  props: {
    backgroundColor: String,
  },
  setup(props) {
    const favIcon = computed(() => colorToFavIcon(props.backgroundColor));
    return {
      favIcon,
    }
  }
}
</script>
