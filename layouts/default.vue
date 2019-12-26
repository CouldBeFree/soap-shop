<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid">
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
