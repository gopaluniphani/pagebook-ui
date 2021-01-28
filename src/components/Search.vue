<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <input type="text" v-model="searchTerm" v-on:keyup.enter="search" />
        </div>
        <div class="col-3"></div>
      </div>
      <div class="row">
        <h3 class="text-center mb-5">User Profiles</h3>
        <div
          v-for="(user, k) in userProfiles"
          :key="k"
          class="row"
          v-on:click="routeToUserProfile(user.id)"
        >
          <div class="col-4">
            <img
              width="50"
              height="50"
              style="border-radius: 50%"
              :src="user.imageUrl"
            />
          </div>
          <div class="col-8">
            <p>{{ user.name }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <h3 class="text-center mb-5">Business Profiles</h3>
        <div
          v-for="(business, k) in businessProfiles"
          :key="k"
          class="row"
          v-on:click="routeToBusinessProfile(business.id)"
        >
          <div class="col-4">
            <img
              width="50"
              height="50"
              style="border-radius: 50%"
              :src="business.imageUrl"
            />
          </div>
          <div class="col-8">
            <p>{{ business.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "search",
  data() {
    return {
      userProfiles: [],
      businessProfiles: [],
      searchTerm: "",
    };
  },
  mounted() {
    if (store.state.logout === true) this.$router.push("/");
  },
  methods: {
    search() {
      const userSearch = `${store.state.API}/search/user/${this.searchTerm}`;
      const businessSearch = `${store.state.API}/search/business/${this.searchTerm}`;

      axios
        .get(userSearch, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          this.userProfiles = data;
        });

      axios
        .get(businessSearch, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          this.businessProfiles = data;
        });
    },
    routeToUserProfile(userId) {
      localStorage.setItem("profileId", userId);
      this.$router.push("/user");
    },
    routeToBusinessProfile(businessId) {
      localStorage.setItem("businessId", businessId);
      this.$router.push("/business");
    },
  },
};
</script>

<style>
</style>