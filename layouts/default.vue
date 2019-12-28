<template>
  <div>
    <navbar></navbar>
    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
  import navbar from "./partials/navbar";

  export default {
    components: {
      navbar
    }
  }
</script>

<style>

</style>
