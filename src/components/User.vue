<template>
  <div id="user">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row my-2" style="background: grey">
        <div class="col-3">
          <img
            class="mx-2 my-2"
            width="200"
            height="200"
            style="border-radius: 50%"
            :src="userProfile.imgUrl"
            alt=""
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <table class="table" style="caption-side: top">
            <caption>
              User Details
            </caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  {{ userProfile.firstName + " " + userProfile.lastName }}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ userProfile.email }}</td>
              </tr>
              <tr>
                <td>Interests</td>
                <td>{{ userProfile.interest }}</td>
              </tr>
              <tr>
                <td>Bio</td>
                <td>{{ userProfile.bio }}</td>
              </tr>
              <tr>
                <td>Profile Type</td>
                <td>{{ userProfile.profileType }}</td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button v-if="isFriend" disabled class="btn btn-light">
                    Friends
                  </button>
                  <button
                    v-if="!isFriend"
                    class="btn btn-light"
                    v-on:click="addFriend()"
                  >
                    Add Friend
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-8">
          <div v-if="isPublic" class="row m-5">
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
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  name: "user",
  data() {
    return {
      userProfile: {},
      postDtos: [],
      isPublic: false,
      isFriend: false,
    };
  },
  methods: {
    addFriend() {
      const url = `${store.state.API_LOCATION}/profile/addRequest/`;
      axios
        .post(
          url,
          {
            requestorId: localStorage.getItem("userId"),
            userId: localStorage.getItem("profileId"),
          },
          store.state.getTokenConfig()
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
        });
    },
  },
  mounted() {
    if (store.state.logout === true) {
      this.$router.push("/");
    }

    if (localStorage.getItem("profileId") === localStorage.getItem("userId"))
      this.$router.push("/profile");

    const profileUrl = `${
      store.state.API_LOCATION
    }/profile/userProfileById/${localStorage.getItem("profileId")}`;
    axios
      .get(profileUrl, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        this.userProfile = data;
        if (data.profileType.toLowerCase() === "public") this.isPublic = true;
      });

    const postsUrl = `${
      store.state.API_LOCATION
    }/post/getUsersPost/${localStorage.getItem("profileId")}`;
    axios
      .get(postsUrl, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.postDtos = data;
      });

    const getFriendsList = `${
      store.state.API_LOCATION
    }/profile/getFriendsId/${localStorage.getItem("userId")}`;
    axios
      .get(getFriendsList, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        console.log(localStorage.getItem("profileId"));
        console.log(data.indexOf(localStorage.getItem("profileId")));
        if (data.indexOf(localStorage.getItem("profileId")) === -1) {
          this.isFriend = false;
          console.log(this.isFriend);
        } else {
          this.isFriend = true;
          console.log(this.isFriend);
          this.isPublic = true;
        }
      });
  },
};
</script>

<style>
</style>