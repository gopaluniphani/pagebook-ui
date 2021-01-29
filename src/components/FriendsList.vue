<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="d-flex justify-content-center px-5">
            <div v-if="showFriendsList">
              <h3 class="heading mt-5 text-center">Friends List</h3>
              <div
                v-on:click="routeToUserProfile(friend.friendId)"
                class="row mb-2"
                v-for="(friend, k) in friendsList"
                :key="k"
              >
                <div class="col-4">
                  <img
                    :src="friend.imgUrl"
                    width="50"
                    height="50"
                    style="border-radius: 50%"
                  />
                </div>
                <div class="col-8 mt-3">
                  <p>{{ friend.firstName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex justify-content-center px-5">
            <div v-if="showRequestorList">
              <h3 class="heading mt-5 text-center">Friends Requests</h3>
              <div
                v-on:click="routeToUserProfile(requestor.userId)"
                v-for="(requestor, k) in requestorList"
                :key="k"
              >
                <div class="row">
                  <div class="col-3">
                    <img
                      :src="requestor.imgUrl"
                      width="50"
                      height="50"
                      style="border-radius: 50%"
                    />
                  </div>
                  <div class="col-9">
                    <p>{{ requestor.firstName }}</p>
                  </div>
                  <div class="col-3">
                    <button
                      v-on:click="addFriend(k, requestor.requestorId)"
                      class="btn btn-light"
                    >
                      Accept Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      showFriendsList: false,
      showRequestorList: false,
    };
  },
  methods: {
    addFriend(k, friendId) {
      const url = `${store.state.API_LOCATION}/profile/addNewFriend/`;
      console.log(friendId);
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
    routeToUserProfile(userId) {
      localStorage.setItem("profileId", userId);
      this.$router.push("/user");
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
        if (data.length > 0) this.showFriendsList = true;
        else this.showFriendsList = false;
        console.log(data);
      });

    axios
      .get(requestsListUrl, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        this.requestorList = data;
        if (data.length > 0) this.showRequestorList = true;
        else this.showRequestorList = false;
        console.log(data);
      });
  },
};
</script>

<style scoped>
.card {
  border: none;
  background: #eee;
}
