<template>
  <div id="addstory">
    <nav-bar></nav-bar>
    <div class="container my-5" style="background: grey">
      <div class="row my-5 mx-5">
        <div class="col-8 my-5">
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
        <div class="col-4 my-5 center">
          <button v-on:click="createStory" class="btn btn-light mb-5">
            Create Story
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
  name: "addStory",
  data() {
    return {
      imgUrl: null,
      imgData: null,
    };
  },
  methods: {
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
    },
    createStory: function () {
      let storyData = {
        userId: localStorage.getItem("userId"),
        userName:
          store.state.userDetails.firstName +
          " " +
          store.state.userDetails.lastName,
        userImageUrl: store.state.userDetails.imgUrl,
        fileUrl: "",
      };
      if (this.imageData === null) {
        alert("Upload an image to post the story");
      } else {
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
              storyData.fileUrl = this.imgUrl;
              const postUrl = store.state.API_LOCATION + "/story/";
              axios
                .post(postUrl, storyData, store.state.getTokenConfig())
                .then((res) => res.data)
                .then((data) => {
                  console.log(data);
                  this.$router.push("/storyfeed");
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