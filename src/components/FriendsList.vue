<template>
  <div id="frinedslist">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <h3 class="text-center">Friend Requests</h3>
        <div class="row" v-for="(friend, k) in friendsList" :key="k">
          <div class="col-4">
            <img
              :src="friend.imgUrl"
              width="50"
              height="50"
              style="border-radius: 50%"
            />
          </div>
          <div class="col-8">
            <p>{{ friend.firstName }}</p>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <h3 class="text-center">Friends List</h3>
        <div class="row" v-for="(requestor, k) in requestorList" :key="k">
          <div class="col-3">
            <img
              :src="requestor.imgUrl"
              width="50"
              height="50"
              style="border-radius: 50%"
            />
          </div>
          <div class="col-6">
            <p>{{ requestor.firstName }}</p>
          </div>
          <div class="col-3">
            <button
              v-on:click="addFriend(k, requestor.friendId)"
              class="btn btn-light"
            >
              Accept Request
            </button>
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
  name: "friendsList",
  data() {
    return {
      friendsList: [],
      requestorList: [],
    };
  },
  methods: {
    addFriend(k, friendId) {
      const url = `${store.state.API_LOCATION}/profile/addNewFriend/`;
      axios
        .post(
          url,
          {
            userId: localStorage.getItem("userId"),
            friendId: friendId,
          },
          store.state.getTokenConfig()
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.requestorList.splice(k, 1);
        });
    },
  },
  mounted() {
    if (store.state.logout === true) this.$router.push("/");

    const friendsListUrl = `${
      store.state.API_LOCATION
    }/profile/findFriendList/${localStorage.getItem("userId")}`;
    const requestsListUrl = `${
      store.state.API_LOCATION
    }/profile/getRequestorList/${localStorage.getItem("userId")}`;

    axios
      .get(friendsListUrl, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        this.friendsList = data;
      });

    axios
      .get(requestsListUrl, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        this.requestorList = data;
      });
  },
};
</script>

<style>
</style>