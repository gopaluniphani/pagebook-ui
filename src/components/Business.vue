<template>
  <div id="business">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row my-2" style="background: grey">
        <div class="col-3">
          <img
            class="mx-2 my-2"
            width="200"
            height="200"
            style="border-radius: 50%"
            :src="businessProfile.fileUrl"
            alt=""
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <table class="table" style="caption-side: top">
            <caption>
              Business Details
            </caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  {{ businessProfile.name }}
                </td>
              </tr>
              <tr>
                <td>Admin Email</td>
                <td>{{ businessProfile.adminEmail }}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{{ businessProfile.description }}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{{ businessProfile.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-8">
          <div class="row mb-5">
            <div class="col-3">
              <button
                v-if="isModerator"
                v-on:click="loadApprovedPosts()"
                class="btn btn-light"
              >
                Approved Posts
              </button>
            </div>
            <div class="col-3">
              <button
                v-if="isModerator"
                v-on:click="loadUnApprovedPosts()"
                class="btn btn-light"
              >
                Unapproved Posts
              </button>
            </div>
            <div class="col-3">
              <router-link to="/addBusinessPost">
                <button class="btn btn-light">Add Business Post</button>
              </router-link>
            </div>
            <div class="col-3">
              <div>
                <b-button v-if="isAdmin" class="btn btn-light" v-b-modal.modal-1
                  >Add Moderator</b-button
                >

                <b-modal id="modal-1" title="Add Moderator">
                  <form v-on:submit="addModerator($event)">
                    <input
                      name=""
                      class="form-control"
                      placeholder="Enter Moderator Email"
                      v-model="email"
                      type="email"
                    />
                    <button type="submit" class="btn btn-light mt-2">
                      Submit
                    </button>
                    <p class="mt-2" type="text" disabled :value="message" />
                  </form>
                </b-modal>
              </div>
            </div>
          </div>
          <div v-if="approved" class="row">
            <div
              v-for="(postDto, k) in approvedPostDtos"
              :key="k"
              class="row mx-5 mb-5"
            >
              <post v-bind:postDto="postDto" />
            </div>
          </div>
          <div v-else class="row">
            <div
              v-for="(postDto, k) in unApprovedPostDtos"
              :key="k"
              class="row mx-5 mb-5"
            >
              <unApprovedPost v-bind:postDto="postDto" />
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
  name: "business",
  data() {
    return {
      businessProfile: {},
      approved: true,
      approvedPostDtos: [],
      unApprovedPostDtos: [],
      email: "",
      message: "",
      isModerator: false,
      isAdmin: false,
    };
  },
  mounted() {
    if (store.state.logout === true) this.$router.push("/");

    const businessId = localStorage.getItem("businessId");
    if (businessId !== null) {
      axios
        .get(
          `${store.state.API_LOCATION}/business/${businessId}`,
          store.state.getTokenConfig()
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.businessProfile = data;
          if (store.state.userDetails.email === data.adminEmail) {
            this.isAdmin = true;
            this.isModerator = true;
          } else {
            this.isAdmin = false;
            this.isModerator = false;
          }
        });

      axios
        .get(
          `${store.state.API_LOCATION}/business/moderators/${businessId}`,
          store.state.getTokenConfig()
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          const moderatorsList = data.moderators;
          if (moderatorsList.indexOf(store.state.userDetails.email) !== -1) {
            this.isModerator = true;
            this.isAdmin = false;
          } else {
            this.isModerator = false;
            this.isAdmin = false;
          }
        });

      // this.loadApprovedPosts();
    }
  },
  methods: {
    loadApprovedPosts() {
      const businessId = localStorage.getItem("businessId");
      const url = `${store.state.API_LOCATION}/post/getBusinessPost/${businessId}`;
      axios
        .get(url, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.approvedPostDtos = data;
          this.unApprovedPostDtos = [];
        });
    },
    loadUnApprovedPosts() {
      const businessId = localStorage.getItem("businessId");
      const url = `${store.state.API_LOCATION}/post/getUnapprovedPost/${businessId}`;
      axios
        .get(url, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.unApprovedPostDtos = data;
          this.approvedPostDtos = [];
        });
    },
    addModerator(event) {
      event.preventDefault();
      const retrieveModeratorId = `${store.state.API_LOCATION}/profile/userProfile/${this.email}`;
      axios
        .get(retrieveModeratorId, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          const moderatorId = data.userId;
          const addModeratorUrl = `${
            store.state.API_LOCATION
          }/business/addmoderator/${localStorage.getItem(
            "businessId"
          )}/${moderatorId}`;
          axios
            .post(addModeratorUrl, {}, store.state.getTokenConfig())
            .then((res) => {
              console.log(res.data);
              if (res.data === null)
                alert("User with this email doesn't exist");
              else alert("Added moderator successfully");
            });
        });
    },
    clearMessage() {
      this.message = "";
    },
  },
};
</script>

<style>
</style>