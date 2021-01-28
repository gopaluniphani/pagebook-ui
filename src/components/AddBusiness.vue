<template>
  <div id="addbusiness">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px">
          <h3 class="card-title mt-3 text-center">Create Account</h3>
          <div class="form-group input-group">
            <p>Upload Image:</p>
            <input
              type="file"
              accept="image/*"
              v-on:change="imageAdded($event)"
              id="businessImage"
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
              placeholder="Business Name"
              v-model="businessName"
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
              placeholder="Description"
              v-model="description"
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
              v-on:change="retrieveCategory($event)"
            >
              <option selected disabled>Choose one category</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="maths">Maths</option>
              <option value="sports">Sports</option>
              <option value="bollywood">Bollywood</option>
            </select>
          </div>

          <!-- form-group end.// -->

          <div class="form-group">
            <button v-on:click="createBusiness" class="btn btn-dark btn-block">
              Create Business
            </button>
          </div>
          <!-- form-group// -->
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "addBusiness",
  data() {
    return {
      imageData: null,
      imageUrl: null,
      businessName: "",
      description: "",
      category: "",
    };
  },
  methods: {
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
    },
    retrieveCategory: function (event) {
      this.category = event.target.value;
    },
    createBusiness: function () {
      console.log("inside creating business");

      console.log(this.imageData);
      this.imgUrl = null;
      if (this.imageData !== null) {
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
              const postUrl =
                store.state.API_LOCATION +
                `/business/moderator/${localStorage.getItem("userId")}`;
              const data = {
                imageUrl: this.imgUrl,
                name: this.businessName,
                adminEmail: store.state.userDetails.email,
                category: this.category,
                description: this.description,
              };
              console.log(data);
              axios
                .post(postUrl, data, store.state.getTokenConfig())
                .then((res) => res.data)
                .then((data) => {
                  console.log(data);
                  localStorage.setItem("businessId", data.id);
                  this.$router.push("/business");
                });
            });
          }
        );
      } else {
        const postUrl =
          store.state.API_LOCATION +
          `/business/moderator/${localStorage.getItem("userId")}`;
        const data = {
          imageUrl: "",
          name: this.businessName,
          adminEmail: store.state.userDetails.email,
          category: this.category,
          description: this.description,
        };
        console.log(data);
        axios
          .post(postUrl, data, store.state.getTokenConfig())
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            localStorage.setItem("businessId", data.id);
            this.$router.push("/business");
          });
      }
    },
  },
};
</script>

<style>
</style>