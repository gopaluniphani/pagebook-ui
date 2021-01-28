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
        <div class="col-4">
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
        <div class="col-8">
          <div class="row">
            <div class="col-4">
              <button
                v-if="isModerator"
                v-on:click="loadApprovedPosts()"
                class="btn btn-light"
              >
                Approved Posts
              </button>
            </div>
            <div class="col-4">
              <button
                v-if="isModerator"
                v-on:click="loadUnApprovedPosts()"
                class="btn btn-light"
              >
                Unapproved Posts
              </button>
            </div>
            <div class="col-4">
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-light"
                data-toggle="modal"
                data-target="#addModerator"
                v-if="isAdmin"
              >
                Launch demo modal
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="addModerator"
                tabindex="-1"
                role="dialog"
                aria-labelledby="addModeratoraLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addModeratorLabel">
                        Add Moderator
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form v-on:submit="addModerator($event)">
                        <input
                          name=""
                          class="form-control"
                          placeholder="Enter Moderator Email"
                          v-model="email"
                          type="email"
                        />
                        <input type="text" disabled v-model="message" />
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        v-on:click="clearMessage"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
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
          if (store.state.userDetails.email === data.adminEmail)
            this.isAdmin = true;
        });

      axios
        .get(
          `${store.state.API_LOCATION}/moderators/${businessId}`,
          store.state.getTokenConfig()
        )
        .then((res) => res.data)
        .then((data) => {
          const moderatorsList = data.moderators;
          if (moderatorsList.indexOf(store.state.userDetails.email) != -1) {
            this.isModerator = true;
          }
        });

      this.loadApprovedPosts();
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
                this.messsage = "User with this email doesn't exist";
              else this.message = "Added moderator successfully";
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