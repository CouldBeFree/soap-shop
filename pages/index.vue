<template>
  <div>
    <is-not-signed-in
      v-if="isOpen"
      @close="isOpen = false"
      v-scroll-lock="isOpen"
    >
      <template #title>
        <h4 class="modal-title text-center">{{title}}</h4>
      </template>
    </is-not-signed-in>
    <no-ssr>
      <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
      >
      </loading>
    </no-ssr>
    <slider/>
    <div class="container-fluid">
      <div class="row">
        <div v-for="product in products" class="col-12 col-md-4 col-xl-3 card-holder">
          <product
            :product="product"
            @cartSubmit="onCartSubmit"
            @likeSubmit="onLikeSubmit"
          >
          </product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isNotSignedIn from "../components/modal/isNotSignedIn";
import slider from "~/components/slider";
import product from "../components/product";
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      cartProducts: [],
      isLoading: false,
      isOpen: false,
      fullPage: true,
      title: ''
    }
  },
  components: {
    slider,
    isNotSignedIn,
    product
  },
  computed: {
    ...mapState('products', {
      products: state => state.products
    }),
    ...mapState('user', {
      user: state => state.user
    }),
    isLogged: function () {
      return Object.entries(this.user).length === 0 && this.user.constructor === Object;
    }
  },
  methods: {
    ...mapMutations('user', ['setProducts']),
    onCartSubmit(item) {
      if (this.isLogged) {
        this.isLoading = true;
        this.cartProducts.push(item);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        const productsCopy = [...this.cartProducts];
        this.setProducts(productsCopy);
        this.isLoading = false;
      }
    },
    onLikeSubmit(item) {
      if (this.isLogged) {
        this.title = item.name;
        this.isOpen = true;
      }
    }
  },
  mounted() {
    const cartProducts = localStorage.getItem('cart');
    if (cartProducts) {
      this.cartProducts.push(cartProducts);
      const productsCopy = [...this.cartProducts];
      this.setProducts(productsCopy);
    }
  }
}
</script>

<style scoped lang="scss">
  .card-holder {
    margin: 15px 0;
  }

  .modal-title {
    padding: 30px 20px;
    font-size: 20px;
    font-weight: 400;
  }
</style>
