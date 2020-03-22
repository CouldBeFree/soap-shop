<template>
    <div>
      {{user}}
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "me",
    computed: {
      ...mapState('user', {
        user: state => state.user
      })
    },
    mounted() {
      console.log(this.user);
    }
  }
</script>

<style scoped>

</style>
