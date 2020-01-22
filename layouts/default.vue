<template>
  <div>
    <navbar></navbar>
    <nuxt />
    <footer></footer>
  </div>
</template>

<script>
  import navbar from "./partials/navbar";
  import footer from "./partials/footer";

  export default {
    components: {
      navbar,
      footer
    }
  }
</script>

<style>

</style>
