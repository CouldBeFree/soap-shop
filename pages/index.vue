<template>
  <div>
    <h1>Commit</h1>
    <transition name="fade">
      <is-not-signed-in
        v-if="isOpen"
        @close="isOpen = false"
        class="align-center flex justify-center"
      >
        <template #title>
          <h4 class="modal-title text-center">{{title}}</h4>
        </template>
      </is-not-signed-in>
      <cartModal
        class="align-center flex justify-center"
        v-if="cartModalOpen"
        @close="cartModalOpen = false"
      >
        <template #title>
          <h4 class="modal-title text-center">{{title}} успішно додано до корзини</h4>
        </template>
      </cartModal>
    </transition>
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
import cartModal from "../components/modal/cartModal";
import slider from "~/components/slider";
import product from "../components/product";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  transition: 'bounce',
  data() {
    return {
      cartProducts: [],
      isLoading: false,
      isOpen: false,
      fullPage: true,
      title: '',
      cartModalOpen: false
    }
  },
  components: {
    slider,
    isNotSignedIn,
    product,
    cartModal
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
    ...mapActions('products', ['getProducts']),
    onCartSubmit(item) {
      if (this.isLogged) {
        this.isLoading = true;
        this.cartProducts.push(item);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        const productsCopy = [...this.cartProducts];
        this.setProducts(productsCopy);
        this.title = item.name;
        this.cartModalOpen = true;
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
  async mounted() {
    await this.getProducts();
    let cartProducts = localStorage.getItem('cart');
    cartProducts = cartProducts ? JSON.parse(cartProducts) : [];
    if (cartProducts.length) {
      this.cartProducts = cartProducts;
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
