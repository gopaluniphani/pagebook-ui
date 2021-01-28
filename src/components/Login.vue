<template>
  <div class="container">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 600px">
        <h3 class="card-title mt-3 text-center">LOGIN</h3>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Email address"
            v-model="email"
            type="email"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Enter password"
            v-model="password"
            type="password"
          />
        </div>

        <div class="form-group">
          <button v-on:click="login" class="btn btn-dark btn-block">
            Login
          </button>
        </div>
        <!-- form-group// -->
        <router-link to="/Register">
          <p class="text-center" style="color: black">
            Don't have an account? Register
          </p>
        </router-link>
      </article>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    if (store.state.logout === false) {
      this.$router.push("/home");
    }
  },
  methods: {
    login: function () {
      const getUrl =
        store.state.API_LOCATION + `/profile/userProfile/${this.email}`;
      axios
        .get(getUrl)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .then((data) => {
          console.log(data);
          if (data === null) {
            alert("user doesn't exist");
          } else {
            console.log(data);
            store.state.userDetails = data;
            localStorage.setItem("userId", data.userId);
            store.state.logout = false;
            this.$router.push("/home");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
