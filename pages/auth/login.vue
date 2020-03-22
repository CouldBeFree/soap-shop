<template>
  <div class="form-wrap">
    <h1 class="text-center">Логін</h1>
    <no-ssr>
      <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
      ></loading>
    </no-ssr>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" class="flex flex-column">
          <ValidationProvider name="Email" rules="required|email" class="provider" v-slot="{ errors }">
            <input
              :class="{error: errors[0]}"
              v-model="email"
              type="email"
              placeholder="Імейл"
            >
            <transition name="fade">
              <span class="error-text" v-if="errors[0]">{{ errors[0] }}</span>
            </transition>
          </ValidationProvider>
          <ValidationProvider class="provider" name="Password" rules="required" v-slot="{ errors }">
            <input
              :class="{error: errors[0]}"
              v-model="password"
              type="password"
              placeholder="Пароль"
            >
            <transition name="fade">
              <span class="error-text" v-if="errors[0]">{{ errors[0] }}</span>
            </transition>
          </ValidationProvider>
        <button type="submit" class="button main-button">Логін</button>
        <nuxt-link :to="'/auth/forgot-password'" class="forgot-password">Забув пароль</nuxt-link>
        <nuxt-link :to="'/auth/register'" class="button secondary-button text-center">Немає акаунту</nuxt-link>
      </form>
    </ValidationObserver>
    <transition name="fade">
      <div class="err" v-if="error">
        <span>Не правильний логін або імейл</span>
      </div>
    </transition>
    <div class="social-login">
      <button @click="onFacebookAuth">
        <span class="icon-facebook-circular-logo"></span>
      </button>
      <no-ssr>
        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">
          <span class="icon-google-plus"></span>
        </GoogleLogin>
        <facebook-login
          class="button"
          ref="facebook"
          appId="198282397928750"
          @login="getUserData"
        >
        </facebook-login>
      </no-ssr>
    </div>
  </div>
</template>

<script>
  import GoogleLogin from 'vue-google-login';
  import facebookLogin from 'facebook-login-vuejs';
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: "login",
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        fullPage: true,
        params: {
          client_id: '59305806445-6du20q97skt3i8djdhtqgfcgtv185b76.apps.googleusercontent.com'
        },
        renderParams: {
          width: 250,
          height: 50,
          longtitle: true
        },
        name: '',
        personalID: '',
        FB: {},
        socialEmail: ''
      }
    },
    components: {
      GoogleLogin,
      facebookLogin
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
      this.setError('');
    },
    methods: {
      ...mapActions('user', ['postUserData']),
      ...mapMutations('user', ['setSubmitType', 'setError']),
      async onSubmit() {
        const user = {
          email: this.email,
          password: this.password
        };
        this.setSubmitType('login');
        this.isLoading = true;
        await this.postUserData(user);
        this.isLoading = false;
        if(this.isRegistered){
          this.$router.push('/')
        }
      },
      onFacebookAuth() {
        console.dir(this.$refs.facebook);
      },
      onSuccess(googleUser) {
        const profile = googleUser.getBasicProfile();
        this.personalID = profile.dV;
        this.socialEmail = profile.zu;
        this.name = profile.Ad;
      },
      onFailure(err) {
        console.error(err)
      },
      async getUserData(data) {
        this.FB = data.FB;
        if (Object.keys(this.FB).length > 1) {
          this.FB.api('/me', 'GET', { fields: 'id,name,email' },
          userInformation => {
            this.personalID = userInformation.id;
            this.socialEmail = userInformation.email;
            this.name = userInformation.name;
          }
        );
        }
      }
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

  .form-wrap {
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }

  .button {
    margin-bottom: 5px;
  }

  .social-login {
    margin-top: 5px;

    button {
      cursor: pointer;
      background: none;
      border: none;

      &:focus {
        outline: 0;
      }
    }

    span {
      font-size: 40px;
    }

    .icon-facebook-circular-logo {
      color: #3C5998;
    }

    .icon-google-plus {
      color: #DD4B3A;
    }
  }

  .forgot-password {
    transition: .4s;
    align-self: flex-end;
    margin-bottom: 15px;
    color: $secondary-dark;

    &:hover {
      transition: .6s;
      color: #888;
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

  .error {
    border: 1px solid red;

    &-text {
      position: relative;
      bottom: 10px;
      color: red;
    }
  }

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .err {
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;

    span {
      color: $error;
    }
  }
</style>
