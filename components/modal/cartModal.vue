<template>
    <div class="layout" @click="$emit('close')">
      <div class="cart-modal"  @click.stop="handler">
        <slot name="title"></slot>
        <div class="flex direction-column align-center">
          <button @click="$emit('close')" class="button main-button">Продовжити покупки</button>
          <nuxt-link :to="'/cart'" class="button secondary-button">Перейти до корзини</nuxt-link>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "cartModal",
    methods: {
      handler() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .cart-modal {
    position: relative;
    max-width: 500px;
    background: #ffffff;
    z-index: 1000;
    width: 100%;
    margin: 1.75rem auto;

    .button {
      margin-bottom: 10px;
    }
  }
</style>
