<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div class="card p-4 mt-3">
            <h3 class="heading mt-5 text-center">
              Search for User or Business profiles
            </h3>
            <div class="d-flex justify-content-center px-5">
              <div class="search">
                <input
                  type="text"
                  v-model="searchTerm"
                  v-on:keyup.enter="search"
                  class="search-input"
                  placeholder="Search..."
                  name=""
                />
                <a href="#" class="search-icon">
                  <i class="fa fa-search"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="d-flex justify-content-center px-5">
            <div v-if="displayUsers">
              <h3 class="heading mt-5 text-center">User Profiles</h3>
              <div
                v-for="(user, k) in userProfiles"
                :key="k"
                class="row mb-2"
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
                <div class="col-8 mt-2">
                  <p>{{ user.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex justify-content-center px-5">
            <div v-if="displayBusiness">
              <h3 class="heading mt-5 text-center">Business Profiles</h3>
              <div
                v-for="(business, k) in businessProfiles"
                :key="k"
                class="row mb-2"
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
                <div class="col-8 mt-2">
                  <p>{{ business.name }}</p>
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
  name: "search",
  data() {
    return {
      userProfiles: [],
      businessProfiles: [],
      searchTerm: "",
      displayUsers: false,
      displayBusiness: false,
    };
  },
  mounted() {
    if (store.state.logout === true) this.$router.push("/");
  },
  methods: {
    search() {
      const userSearch = `${store.state.API_LOCATION}/search/user/${this.searchTerm}`;
      const businessSearch = `${store.state.API_LOCATION}/search/business/${this.searchTerm}`;

      axios
        .get(userSearch, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          this.userProfiles = data;
          if (data.length > 0) this.displayUsers = true;
          else this.displayUsers = false;
        });

      axios
        .get(businessSearch, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          this.businessProfiles = data;
          if (data.length > 0) this.displayBusiness = true;
          else this.displayBusiness = false;
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

<style scoped>
.card {
  border: none;
  background: #eee;
}

.search {
  width: 100%;
  margin-bottom: auto;
  margin-top: 20px;
  height: 50px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.search-input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  margin-top: 5px;
  caret-color: transparent;
  line-height: 20px;
  transition: width 0.4s linear;
}

.search .search-input {
  padding: 0 10px;
  width: 100%;
  caret-color: #536bf6;
  font-size: 19px;
  font-weight: 300;
  color: black;
  transition: width 0.4s linear;
}

.search-icon {
  height: 34px;
  width: 34px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #536bf6;
  font-size: 10px;
  bottom: 30px;
  position: relative;
  border-radius: 5px;
}

.search-icon:hover {
  color: #fff !important;
}

a:link {
  text-decoration: none;
}
</style>