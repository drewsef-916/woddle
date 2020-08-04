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
        <h4>Track workouts, make progress!</h4>
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
</style>
