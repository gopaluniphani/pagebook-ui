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
          <div class="row">
            <div class="row m-5">
              <div
                v-for="(postDto, k) in postDtos"
                :key="k"
                class="row mx-5 mb-5"
              >
                <post v-bind:postDto="postDto" />
              </div>
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
import axios from "axios";

export default {
  mounted() {
    console.log("inside home mounted", store.state.logout);
    if (store.state.logout === true) {
      this.$router.push("/");
    }
    const postsUrl = `${
      store.state.API_LOCATION
    }/post/getFeedPosts/${localStorage.getItem("userId")}/1`;
    axios
      .get(postsUrl, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.postDtos = data;
      });
  },
  data() {
    return {
      postDtos: [],
    };
  },
};
</script>

<style>
</style>