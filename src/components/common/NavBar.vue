<template>
  <nav class="navbar navbar-dark bg-secondary justify-content-between">
    <router-link to="/home" class="navbar-brand">PageBook</router-link>

    <span v-if="this.logoutStatus">
      <router-link to="/">
        <button class="btn btn-outline-light my-2 my-sm-0">Login</button>
      </router-link>
    </span>
    <span v-if="!this.logoutStatus">
      <router-link to="/search">
        <button class="btn btn-outline-light mx-2 my-2 my-sm-0">Search</button>
      </router-link>
      <router-link to="/storyfeed">
        <button class="btn btn-outline-light mx-2 my-2 my-sm-0">Stories</button>
      </router-link>
      <router-link to="/profile">
        <button class="btn btn-outline-light mx-2 my-2 my-sm-0">Profile</button>
      </router-link>
      <button
        class="btn btn-outline-light mx-2 my-2 my-sm-0"
        v-on:click="logout"
      >
        Logout
      </button>
    </span>
  </nav>
</template>

<script>
import store from "../../store";

export default {
  name: "nav-bar",
  data: function () {
    return {
      logoutStatus: store.state.logout,
    };
  },
  mounted() {
    console.log("logoutStatus", store.state.logout);
    this.logoutStatus = store.state.logout;
  },
  updated() {
    console.log("logoutStatus", store.state.logout);
    this.logoutStatus = store.state.logout;
  },
  methods: {
    logout: function () {
      localStorage.removeItem("userId");
      store.state.logout = true;
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>