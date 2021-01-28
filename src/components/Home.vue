<template>
  <div id="home">
    <nav-bar></nav-bar>
    <div class="container my-2">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <router-link to="/addPost">
                <button class="btn btn-light">Add Post</button>
              </router-link>
            </div>
            <div class="col-6">
              <router-link to="/addStory">
                <button class="btn btn-light">Add Story</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
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