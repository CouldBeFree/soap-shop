<template>
  <div>
    <nav class="nav">
      <ul class="container-fluid flex justify-end align-center">
        <li>
          <nuxt-link :to="'/'">Головна</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/contact-us'">Зв'язатись з нами</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category'">Магазин</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/shopping-cart'" class="flex align-center">
            <span class="icon-shopping-cart"></span>
            <span>{{selectedProducts.length}} items</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/auth/login'">
            <span class="icon-login"></span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/selected-products'">
            <span class="icon-heart"></span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="sub-nav container-fluid flex justify-between">
      <ul class="flex align-center left-part">
        <li class="logo">
          <nuxt-link :to="'/'">
            <img src="../../assets/images/logo.png" alt="miracle-soap">
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category/baby-soap'">Дитяче</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category/bouquets'">Мильні букети</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category/cosmetic'">Натуральна косметика</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category/kits'">Набори</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/category/man'">Чоловіче</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "navbar",
    computed: {
      ...mapState('basket', {
        selectedProducts: state => state.selectedProducts
      })
    }
  }
</script>

<style scoped lang="scss">
  .nav {
    background: $main-color;
    padding: 15px 0;

    ul {
      li {
        padding: 0 10px;
        color: #ffffff;

        .icon-shopping-cart {
          padding-right: 10px;
          font-size: 24px;
        }

        .icon-login, .icon-heart {
          font-size: 20px;
        }

        a {
          &:hover {
            transition: .4s;
            color: #003046;
          }
        }
      }
    }
  }

  .sub-nav {
    .logo {
      img {
        max-height: 45px;
        height: 100vh;
      }
    }

    ul {
      li {
        &:not(:first-child) {
         margin-left: 15px;
        }

        a {
          font-family: $secondary-font;
          font-size: 14px;
          color: #003046;
          font-weight: 600;

          &:hover {
            transition: .5s;
            color: #a9b6ba;
          }
        }
      }
    }
  }

  .right-part {
    span {
      font-size: 20px;
      color: $main-color;
    }
  }
</style>
