<template>
  <div>
    <navbar></navbar>
    <nuxt />
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

<style>

</style>
