<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <h1 class="home-title">Welcome to Woddle</h1>
        <h4 class="home-subtitle">Track workouts, make progress!</h4>
        <div class="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="false" data-width=""></div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('getWorkouts');
    // console.log(window.FB.getLoginStatus());
    window.FB.getLoginStatus(res => this.$store.dispatch(`checkFBLogin(${res})`));
    // this.$store.dispatch('checkFacebookLogin');
  }
}
</script>

<style lang="scss">
  input {
    border: 1px solid #fff;
    border-radius: 3px;
    color: #aaa;
    text-indent: 5px;
  }
  .home-title {
    font-size: 4em;
    color: #03dffc;
  }
  .home-subtitle {
    padding-bottom: 1em;
  }
</style>
