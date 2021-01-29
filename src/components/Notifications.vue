<template>
  <div id="notifications">
    <nav-bar></nav-bar>
    <div class="container">
      <h3 class="heading mt-5 text-center">Notifications</h3>
      <div
        v-for="(notification, k) in notificationList"
        :key="k"
        class="row mb-2"
      >
        <div class="col-3"></div>
        <div class="col-6 mt-2">
          <p>{{ notification.message }}</p>
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
  name: "notifications",
  data() {
    return {
      notificationList: [],
    };
  },
  mounted() {
    if (store.state.logout === true) this.$rotuer.push("/");
    const url = `http://10.177.1.117:8088/pagebook/api/notification/getNotification/${localStorage.getItem(
      "userId"
    )}`;
    axios
      .get(url, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        this.notificationList = data;
        console.log(data);
      });
  },
};
</script>

<style>
</style>