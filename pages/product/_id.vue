<template>
    <div class="container-fluid">
      <no-ssr>
        <loading
          :active.sync="isLoading"
          :is-full-page="true"
        ></loading>
      </no-ssr>
      {{product}}
      <h1>Product name {{product.name}}</h1>
      <h4>Price {{product.price}} uah</h4>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "product",
    data: function() {
      return {
        isLoading: false
      }
    },
    async mounted() {
      this.isLoading = true;
      await this.getProduct(this.$route.params.id);
      this.isLoading = false;
    },
    methods: {
      ...mapActions('products', ['getProduct'])
    },
    computed: {
      ...mapState('products', {
        product: state => state.product
      })
    }
  }
</script>

<style scoped>

</style>
