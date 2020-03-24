<template>
  <div class="container-fluid wrapper center"
       :class="{ 'flex-column': isUser }"
  >
    <div v-if="user && user.local" class="text-center">
      <h1>Hello {{user.local.name}}</h1>
      <h2>Email {{user.local.email}}</h2>
      <button class="button main-button" @click="logOut">Вийти з акаунту</button>
    </div>
    <div v-else>
      <h2 class="text-center">
        <nuxt-link :to="'/auth/register'">Зареєструйтесь</nuxt-link> або <nuxt-link :to="'/auth/login'">зайдіть в свій акаунт</nuxt-link>
      </h2>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  // :style="{'background-image': 'url(' + require('~/assets/images/hands.jpg') + ')'}"

  export default {
    name: "me",
    computed: {
      ...mapState('user', {
        user: state => state.user
      }),
      isUser() {
        return Object.keys(this.user).length !== 0;
      }
    },
    methods: {
      ...mapMutations('user', ['setUser']),
      logOut() {
        this.setUser({});
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  button {
    margin-top: 10px;
  }

  h2 {
    margin: 15px 0;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .wrapper{
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  h2 {
    a {
      color: $main-color;
    }
  }
</style>
