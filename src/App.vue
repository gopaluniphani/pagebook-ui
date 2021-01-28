<template>
  <div id="app">
    <div id="router-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import store from "./store";
import axios from "axios";

export default {
  name: "app",
  mounted() {
    let userId = localStorage.getItem("userId");
    if (userId !== null) {
      const getUrl = `${store.state.API_LOCATION}/profile/userProfileById/${userId}`;
      store.state.logout = false;
      axios
        .get(getUrl)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          store.state.userDetails = data;
        });
    } else {
      store.state.logout = true;
    }
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#router-view {
  padding: 20px 0px;
  margin: 0 auto;
}
</style>
