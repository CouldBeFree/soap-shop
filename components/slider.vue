<template>
  <no-ssr>
    <carousel class="parent" :loop="true" :nav="false" :items="1" :autoplay="false">
<!--      <img src="https://placeimg.com/1000/480/any?1">-->
<!--      <img src="https://placeimg.com/1000/480/any?2">-->
<!--      <img src="https://placeimg.com/1000/480/any?3">-->
<!--      <img src="https://placeimg.com/1000/480/any?4">-->
      <div class="image-holder">
        <img src="~/assets/images/natural-handmade-soap-etsy.jpg">
      </div>
      <div class="image-holder">
        <img src="~/assets/images/Natural-Cosmetics.jpg">
      </div>
      <div class="image-holder">
        <img src="~/assets/images/bath-bombs.jpg">
      </div>
      <div class="image-holder">
        <img src="~/assets/images/focus.jpg">
      </div>
    </carousel>
  </no-ssr>
</template>

<script>

  export default {
    name: "slider",
    components: {

    }
  }
</script>

<style lang="scss">
  .owl-dots {
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;

    .owl-dot {
      &:focus {
        outline: none;
      }
    }
  }

  .image-holder {
    max-height: 470px;
    height: 100vh;
    position: relative;

    img {
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      object-fit: cover;
    }
  }
</style>
