<template>
  <div>
    <div class="image-holder">
      <img :src="product.image" :alt="product.name">
    </div>
    <h5><nuxt-link :to="`/product/${product.id}`">{{product.name}}</nuxt-link></h5>
  </div>
</template>

<script>
  export default {
    name: "product",
    props: ['product']
  }
</script>

<style scoped lang="scss">
  .image-holder {
    position: relative;
    max-height: 265px;
    height: 100vh;

    img {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      object-fit: cover;
      height: 100%;
    }
  }
</style>
