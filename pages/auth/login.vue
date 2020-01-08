<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="onsubmit">
        <input
          v-model="email"
          type="email"
          placeholder="Імейл"
        >
        <input v-model="password" type="password" placeholder="Пароль">
        <button type="submit">Логін</button>
      </form>
    </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onsubmit() {

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

    &:focus {
      transition: border-color .15s ease-in-out,background-color .15s ease-in-out;
      box-shadow: 0.35714rem 0 2.14286rem rgba(0,48,70,.15);
      outline: 0;
    }
  }

  button {
    cursor: pointer;
  }
</style>
