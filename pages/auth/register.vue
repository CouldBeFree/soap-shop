<template>
    <div class="form-wrap">
      <h1 class="text-center">Зареєструвати новий акаунт</h1>
      <no-ssr>
        <loading
          :active.sync="isLoading"
          :is-full-page="fullPage"
        ></loading>
      </no-ssr>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)" class="flex flex-column">
          <ValidationProvider name="Нікнейм" rules="required" class="provider" v-slot="{ errors }">
            <input
              :class="{error: errors[0]}"
              v-model="nickname"
              type="text"
              placeholder="Нікнейм"
            >
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider name="Email" rules="required|email" class="provider" v-slot="{ errors }">
            <input
              :class="{error: errors[0]}"
              v-model="email"
              type="email"
              placeholder="Імейл"
            >
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider class="provider" name="Password" rules="required" v-slot="{ errors }">
            <input
              :class="{error: errors[0]}"
              v-model="password"
              type="password" placeholder="Пароль"
            >
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
          <button type="submit" class="button main-button">Зареєструватись</button>
          <nuxt-link :to="'/auth/login'" class="button secondary-button text-center">Логін</nuxt-link>
        </form>
        <div class="err" v-if="error">
          <span>{{error}}</span>
        </div>
      </ValidationObserver>
      <transition name="fade">
        <register-success
          v-if="this.isRegistered && isModalOpen && !error"
          @close="isModalOpen = false"
        >
          <div class="flex flex-column justify-around wrap align-center">
            <h2 class="success-headline flex justify-center">Реєстрація успішна</h2>
            <p class="link-wrap">Перейти на <nuxt-link to="/" class="link">головну</nuxt-link></p>
            <p class="link-wrap">Перейти до <nuxt-link to="/" class="link">покупок</nuxt-link></p>
          </div>
        </register-success>
      </transition>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import registerSuccess from "../../components/modal/registerSuccess";

  export default {
    name: "register",
    components: {
      registerSuccess
    },
    data() {
      return {
        nickname: '',
        email: '',
        password: '',
        isLoading: false,
        fullPage: true,
        isModalOpen: false
      }
    },
    methods: {
      async onSubmit() {
        const user = {
          name: this.nickname,
          email: this.email,
          password: this.password
        };
        this.isLoading = true;
        await this.registerUser(user);
        this.isLoading = false;
        this.isModalOpen = true;
      },
      ...mapActions('user', ['registerUser'])
    },
    computed: {
      ...mapState('user', {
        error: state => state.error,
        user: state => state.user
      }),
      isRegistered() {
        return Object.keys(this.user).length !== 0
      }
    },
    destroyed() {
      this.isModalOpen = false;
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .link {
    color: $main-color;
  }

  .link-wrap {
    font-size: 16px;
  }

  .wrap {
    height: 100%;
  }

  .err {
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;

    span {
      color: $error;
    }
  }

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .form-wrap {
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }

  input {
    padding: 15px;
    color: #666;
    background-color: #f2f5f5;
    background-clip: padding-box;
    font-size: 1rem;
    border: 0 solid #c7d2d6;
    border-radius: 0;
    box-shadow: none;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 20px;

    &:focus {
      transition: border-color .15s ease-in-out,background-color .15s ease-in-out;
      box-shadow: 0.35714rem 0 2.14286rem rgba(0,48,70,.15);
      outline: 0;
    }
  }

  .button {
    margin-bottom: 10px;
  }

  .error {
    border: 1px solid red;

    &-text {
      position: relative;
      bottom: 10px;
      color: red;
    }
  }

  .provider {
    & > div{
      width: 100%;
    }

    input {
      width: 100%;
    }
  }
</style>
