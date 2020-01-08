<template>
  <div>
    <div class="layout" @click="$emit('close')">
      <div class="modal" @click.stop="handler">
        <slot name="title"></slot>
        <p class="content text-center">
          Щоб додати продукт до вибраних <nuxt-link :to="'/auth/login'" class="link">залогіньтесь</nuxt-link>
        </p>
        <button type="button" class="close" @click="$emit('close')">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "layout",
    methods: {
      handler() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);
    z-index: 100;
  }

  .modal {
    position: relative;
    max-width: 500px;
    background: #ffffff;
    z-index: 1000;
    width: 100%;
    margin: 1.75rem auto;
  }

  .content {
    padding-bottom: 20px;
  }

  .close {
    padding: 0;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 500;
    width: 1.42857rem;
    height: 1.42857rem;
    font-size: 1.14286rem;
    line-height: 1.42857rem;
  }

  .link {
    color: $main-color;
    transition: .4s;

    &:hover {
      transition: .5s;
      color: #7aa700;
    }
  }
</style>
