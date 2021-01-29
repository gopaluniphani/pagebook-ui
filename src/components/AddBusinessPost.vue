<template>
  <div id="addpost">
    <nav-bar></nav-bar>
    <div class="container my-5" style="background: grey">
      <div class="row">
        <textarea
          class="mt-5 ml-5"
          placeholder="What's on your mind"
          cols="70"
          rows="10"
          v-model="text"
        ></textarea>
      </div>
      <div class="row my-5 mx-5">
        <div class="col-6">
          <p>Upload Image:</p>
          <div class="form-group input-group">
            <input
              type="file"
              accept="image/*"
              v-on:change="imageAdded($event)"
              id="profilePic"
            />
          </div>
          <!-- form-group end.// -->
        </div>
        <div class="col-6">
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
        </div>
      </div>
      <div class="row my-5 mx-5">
        <div class="col-12 center">
          <button v-on:click="addPost" class="btn btn-light mb-5">
            Create Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "addBusinessPost",
  data() {
    return {
      text: "",
      imageData: null,
      imageUrl: null,
      categoryType: "",
    };
  },
  methods: {
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
    },
    retrieveCategory: function (event) {
      this.categoryType = event.target.value;
    },
    addPost: function () {
      let postData = {
        approved: false,
        businessId: localStorage.getItem("businessId"),
        postCategory: this.categoryType,
        fileURL: "",
        userId: localStorage.getItem("userId"),
        profileType: store.state.userDetails.profileType,
        fileType: "",
      };
      if (this.imageData === null) {
        postData.fileUrl = this.text;
        postData.fileType = "text";
        const postUrl = store.state.API_LOCATION + "/post/";
        axios
          .post(postUrl, postData, store.state.getTokenConfig())
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            this.$router.push("/business");
          });
      } else {
        postData.fileType = "image";
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
              postData.fileURL = this.imgUrl;
              const postUrl = store.state.API_LOCATION + "/post/";
              axios
                .post(postUrl, postData, store.state.getTokenConfig())
                .then((res) => res.data)
                .then((data) => {
                  console.log(data);
                  this.$router.push("/business");
                });
            });
          }
        );
      }
    },
  },
};
</script>

<style>
</style>