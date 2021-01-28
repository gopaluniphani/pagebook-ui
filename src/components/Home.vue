<template>
  <div class="container">
    <nav-bar></nav-bar>
    <h1>Home</h1>
  </div>
</template>

<script>
import store from "../store";
export default {
  mounted() {
    if (store.state.logout == true) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>