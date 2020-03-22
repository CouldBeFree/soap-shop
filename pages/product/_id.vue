<template>
    <div class="container-fluid">
      <no-ssr>
        <!--<loading
          :active.sync="false"
          :is-full-page="true"
        ></loading>-->
      </no-ssr>
      <h1 v-if="product && product.name">Product name {{product.name}}</h1>
      <h4 v-if="product && product.price">Price {{product.price}} uah</h4>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "product",
    data: function() {
      return {
        product: {}
      }
    },
    async asyncData({ params, $axios, store }) {
      console.log('$store', store);
      const { data } = await $axios.$get(`/product/${params.id}`);
      return {
        product: data
      }
    },
    methods: {
      ...mapActions('products', ['getProduct'])
    },
    computed: {
      ...mapState('products', {
        //product: state => state.product
      })
    }
  }
</script>

<style scoped>

</style>
