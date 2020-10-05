<template>
  <footer class="footer">
    <span class="footer__name">Björn Ganslandt</span>
    <span class="footer__twitter"
      >@<a href="https://twitter.com/Ansimorph">Ansimorph</a></span
    >
  </footer>
</template>

<style lang="scss">
footer {
  align-self: flex-end;
  font-size: 1rem;
  font-weight: 500;

  a {
    color: currentColor;
  }
}

.footer__name {
  margin-right: 0.6em;
  letter-spacing: 0.01em;
}
</style>
