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
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider class="provider" name="Password" rules="required" v-slot="{ errors }">
            <input
              :class="{error: errors[0]}"
              v-model="password"
              type="password"
              placeholder="Пароль"
            >
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
        <button type="submit" class="button main-button">Логін</button>
        <nuxt-link :to="'/auth/forgot-password'" class="forgot-password">Забув пароль</nuxt-link>
        <nuxt-link :to="'/auth/register'" class="button secondary-button text-center">Немає акаунту</nuxt-link>
      </form>
    </ValidationObserver>
    <div class="social-login">
      <button>
        <span class="icon-facebook-circular-logo"></span>
      </button>
      <no-ssr>
        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">
          <span class="icon-google-plus"></span>
        </GoogleLogin>
        <v-facebook-login
          app-id="966242223397117"
          @login="onLogin"
          @logout="onLogout"
          @sdk-loaded="sdkLoaded">
        >
          <span class="icon-google-plus"></span>
        </v-facebook-login>
        <facebook-login class="button"
                        appId="326022817735322"
                        @login="getUserData"
                        @logout="onLogout"
                        @get-initial-status="getUserData">
        </facebook-login>
      </no-ssr>
    </div>
  </div>
</template>

<script>
  import GoogleLogin from 'vue-google-login';
  import facebookLogin from 'facebook-login-vuejs';

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
        isConnected: false,
        name: '',
        personalID: '',
        FB: undefined
      }
    },
    components: {
      GoogleLogin,
      facebookLogin
    },
    methods: {
      onSubmit() {
        //this.isLoading = true;
      },
      onSuccess(googleUser) {
        console.log(googleUser);

        // This only gets the user information: id, name, imageUrl and email
        console.log(googleUser.getBasicProfile());
      },
      onFailure(err) {
        console.error(err)
      },
      getUserData() {
        this.FB.api('/me', 'GET', { fields: 'id,name,email' },
          userInformation => {
            this.personalID = userInformation.id;
            this.email = userInformation.email;
            this.name = userInformation.name;
          }
        )
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected;
        this.FB = payload.FB;
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true;
        this.getUserData()
      },
      onLogout() {
        this.isConnected = false;
      }
    }
  }
</script>

<style scoped lang="scss">
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
</style>
