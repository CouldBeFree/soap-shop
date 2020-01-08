<template>
  <div>
    <slider></slider>
    <div class="container-fluid">
      <div class="row">
        <div v-for="product in products" class="col-12 col-md-4 col-xl-3 card-holder">
          <product :product="product"></product>
        </div>
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
  .card-holder {
    margin: 15px 0;
  }
</style>
