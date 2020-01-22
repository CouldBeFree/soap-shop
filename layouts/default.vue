<template>
  <div class="content-wrapper">
    <navbar></navbar>
    <nuxt class="main" />
    <footer-part></footer-part>
  </div>
</template>

<script>
  import navbar from "./partials/navbar";
  import footerPart from "./partials/footerPart";

  export default {
    components: {
      navbar,
      footerPart
    }
  }
</script>

<style scoped lang="scss">
  .content-wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;

    .main {
      flex: 1;
    }
  }
</style>
