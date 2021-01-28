<template>
  <div class="container">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px">
        <h3 class="card-title mt-3 text-center">Create Account</h3>
        <div class="form-group input-group">
          <p>Profile Pic:</p>
          <input
            type="file"
            accept="image/*"
            v-on:change="imageAdded($event)"
            id="profilePic"
          />
        </div>
        <!-- form-group end.// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="First name"
            v-model="firstName"
            type="text"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Last name"
            v-model="lastName"
            type="text"
          />
        </div>
        <!-- form-group// -->
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
            <span class="input-group-text">
              <i class="fa fa-bio"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Bio"
            v-model="bio"
            type="text"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-bio"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Interests (Enter , seperated)"
            v-model="interests"
            type="text"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="categories"
              >Profile Type</label
            >
          </div>
          <select
            class="custom-select"
            id="categories"
            v-on:change="retrieveProfileType($event)"
          >
            <option selected disabled>Choose one category</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <!-- form-group end.// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Create password"
            v-model="password"
            type="password"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Confirm password"
            v-model="confirmPassword"
            type="password"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group">
          <button v-on:click="register" class="btn btn-dark btn-block">
            Create Account
          </button>
        </div>
        <!-- form-group// -->
        <router-link to="/">
          <p class="text-center" style="color: black">Have an account? Login</p>
        </router-link>
      </article>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "register",
  data() {
    return {
      imageData: null,
      imageUrl: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bio: "",
      profileType: "",
      interests: "",
      confirmPassword: "",
    };
  },
  methods: {
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
    },
    retrieveProfileType: function (event) {
      this.profileType = event.target.value;
    },
    register: function () {
      console.log("inside register");
      if (this.password !== this.confirmPassword) {
        window.alert("Passwords didn't match");
      } else {
        console.log("passwords matched");

        console.log(this.imageData);
        this.imgUrl = null;
        if (this.imageData !== null) {
          axios
            .post(`${store.state.AUTH_LOCATION}/register`, {
              username: this.email,
              password: this.password,
              client: "pagebook",
              roles: ["pagebook"],
            })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
              localStorage.setItem("token", data.data.jwt);
              const storageRef = firebase
                .storage()
                .ref(`${this.imageData.name} ${Date()}`)
                .put(this.imageData);
              storageRef.on(
                `state_changed`,
                (snapshot) => {
                  this.uploadValue =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                  console.log(error.message);
                },
                () => {
                  this.uploadValue = 100;
                  storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.imgUrl = url;
                    console.log(this.imgUrl);
                    const postUrl = store.state.API_LOCATION + "/profile/save";
                    const data = {
                      imgUrl: this.imgUrl,
                      firstName: this.firstName,
                      lastName: this.lastName,
                      email: this.email,
                      bio: this.bio,
                      profileType: this.profileType,
                      interest: this.interests,
                      totalFriends: 0,
                    };
                    console.log(data);
                    axios
                      .post(postUrl, data, store.state.getTokenConfig())
                      .then((res) => res.data)
                      .then((data) => {
                        console.log(data);
                        this.$router.push("/");
                      });
                  });
                }
              );
            });
        } else {
          axios
            .post(`${store.state.AUTH_LOCATION}/register`, {
              username: this.email,
              password: this.password,
              client: "pagebook",
              roles: ["pagebook"],
            })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
              localStorage.setItem("token", data.data.jwtToken);
              const postUrl = store.state.API_LOCATION + "/profile/save";
              const userData = {
                imageUrl: "",
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                bio: this.bio,
                profileType: this.profileType,
                interests: this.interests,
                totalFriends: 0,
              };
              console.log(userData);
              axios
                .post(postUrl, userData, store.state.getTokenConfig())
                .then((res) => res.data)
                .then((user) => {
                  console.log(user);
                  this.$router.push("/");
                });
            });
        }
      }
    },
  },
};
</script>
