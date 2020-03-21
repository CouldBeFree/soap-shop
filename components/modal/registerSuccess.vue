<template>
    <div class="layout flex justify-center align-center" @click="$emit('close')">
      <div class="register-modal">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: "registerSuccess"
  }
</script>

<style scoped>
  .register-modal {
    max-width: calc(100vw - 80%);
    max-height: calc(100vh - 80%);
    height: 100%;
    background: #ffffff;
    z-index: 1000;
    width: 100%;
    padding: 10px;
  }
</style>
