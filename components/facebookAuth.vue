<template>
  <div>
    <button @click="checkLoginState">Auth with facebook</button>
  </div>
</template>

<script>
  export default {
    name: "facebookAuth",
    mounted() {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : 198282397928750,
          cookie     : true,
          xfbml      : true,
          version    : '2.8'
        });

        FB.getLoginStatus(function(response) {
          console.log(response);
          //this.statusChangeCallback(response);
        });
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    methods: {
      test(){
        alert(2);
      },
      statusChangeCallback(response) {
        if(response.status === 'connected') {
          console.log('Logged in')
        } else {
          console.log('Not authenticated')
        }
      },
      checkLoginState() {
        FB.getLoginStatus(function(response) {
          //this.statusChangeCallback(response);
        });
      }
    }
  }
</script>

<style scoped>

</style>
