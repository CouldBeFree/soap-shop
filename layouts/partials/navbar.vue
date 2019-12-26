<template>
  <nav class="nav flex justify-end">
    <ul class="container-fluid">
      <li>
        <nuxt-link :to="'/'">Головна</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "navbar"
  }
</script>

<style scoped lang="scss">
  .nav {
    background: $main-color;
  }
</style>
