<template>
  <div>
    <slider></slider>
    <div class="container-fluid">
      <div v-for="product in products">
        <product :product="product"></product>
      </div>
    </div>
  </div>
</template>

<script>
import slider from "~/components/slider";
import product from "../components/product";
import { mapState } from 'vuex'

export default {
  components: {
    slider,
    product
  },
  computed: {
    ...mapState('products', {
      products: state => state.products
    })
  }
}
</script>

<style lang="scss">

</style>
