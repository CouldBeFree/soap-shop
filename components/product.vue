<template>
  <div>
    <nuxt-link :to="{ name: 'product-id', params: {id: product.id} }">
      <div class="image-holder">
        <img :src="product.image" :alt="product.name">
      </div>
    </nuxt-link>
    <h5 class="sub-headline"><nuxt-link :to="{name: `category-${product.category}`}">{{product.category}}</nuxt-link></h5>
    <h5 class="headline"><nuxt-link :to="{name: 'product-id', params: {id: product.id}}">{{product.name}}</nuxt-link></h5>
    <div class="flex justify-between">
      <span class="price"><span class="uah-icon">₴</span>{{product.price}}</span>
      <div class="flex align-center">
        <span @click="onClick(product.id)" class="icon-shopping-cart"></span>
        <span @click="onClick(product.id)" class="icon-heart"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "product",
    props: ['product'],
    methods: {
      onClick(id) {
        console.info(id);
      }
    }
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
      width: 100%;
    }
  }

  .headline {
    a {
      font-size: 22px;
      color: #003046;
      font-weight: normal;
      transition: .5s;

      &:hover {
        transition: .4s;
        color: #c7d2d6;
      }
    }
  }

  .sub-headline {
    margin: 5px 0;

    a {
      color: $main-color;
      font-size: 14px;
      font-weight: normal;
      transition: .5s;

      &:hover {
        transition: .4s;
        color: #c7d2d6;
      }
    }
  }

  .price {
    font-size: 18px;
    color: $secondary-dark;
    display: block;
    margin-top: 5px;

    .icon-uah {
      font-weight: 600;
      font-size: 18px;
    }
  }

  .icon-shopping-cart {
    transition: .5s;
    cursor: pointer;
    color: $main-color;
    padding-right: 10px;

    &:hover {
      transition: .4s;
      color: $secondary-dark;
    }
  }

  .icon-heart {
    transition: .5s;
    cursor: pointer;
    color: #c7d2d6;

    &:hover {
      transition: .4s;
      color: $secondary-dark;
    }
  }

  .uah-icon {
    padding-right: 5px;
  }
</style>
