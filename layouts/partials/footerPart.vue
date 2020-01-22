<template>
  <div class="container-fluid footer flex direction-column align-center">
    <p class="content text-center">
      Наші продукти виробляються, без хімікатів, без синтетики, без добавок, жорстокості до тварин.
      Ми запобігаємо забрудненню та зменшуємо відходи.
    </p>
    <ul class="footer-nav flex">
      <li>
        <nuxt-link :to="'/auth/login'">Вхід</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/'">Мій обліковий запис</nuxt-link>
      </li>
    </ul>
    <ul class="flex justify-end social-holder">
      <li>
        <a target="_blank" href="https://www.instagram.com/">
          <span class="icon-instagram"></span>
        </a>
      </li>
      <li>
        <a target="_blank" href="https://www.facebook.com/">
          <span class="icon-facebook-circular-logo"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "footerPart"
  }
</script>

<style scoped lang="scss">
  .footer {
    background: $secondary-dark;
    color: #ffffff;
    padding: 45px 0;

    .footer-nav {
      padding: 30px 0;
      font-size: 15px;

      li {
        margin-right: 20px;

        a {
          transition: .6s;

          &:hover {
            transition: .6s;
            color: #96cd00;
          }
        }
      }
    }

    .social-holder {
      font-size: 20px;

      li {
        margin-left: 10px;

        a {
          transition: .6s;

          &:hover {
            transition: .6s;
            color: #96cd00;
          }
        }
      }
    }

    .content {
      max-width: 470px;
      padding: 0 15px;
      font-size: 16px;
      line-height: 20px;
    }
  }
</style>
