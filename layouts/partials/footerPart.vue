<template>
  <div class="container-fluid footer">
    <ul class="flex justify-end">
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

    ul {
      padding: 10px 0;
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
  }
</style>
