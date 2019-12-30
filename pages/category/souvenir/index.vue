<template>
    <div>
      <h1>Souvenir</h1>
      <ul>
        <li>
          <nuxt-link :to="'/category/souvenir/baby-soap'">Дитяче</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category/souvenir/man'">Чоловіче</nuxt-link>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>
