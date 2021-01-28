<template>
  <div id="storyfeed">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="story">
        <div class="left_container">
          <div class="storylist">
            <div
              v-for="(story, k) in stories"
              :key="k"
              class="story_list_element"
            >
              <img
                :src="story.userImageUrl"
                v-on:click="displayStory(story.fileUrl)"
              />
              <h4>{{ story.userName }}</h4>
            </div>
          </div>
        </div>
        <div class="right_container">
          <!-- <i class="fas fa-chevron-circle-left fa-3x prev"></i> -->
          <img v-if="imageUrl !== ''" :src="imageUrl" />
          <!-- <i class="fas fa-chevron-circle-right fa-3x next"></i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "storyfeed",
  data() {
    return {
      stories: [],
      imageUrl: "",
    };
  },
  methods: {
    displayStory(fileUrl) {
      this.imageUrl = fileUrl;
    },
  },
  mounted() {
    if (store.state.logout === true) this.$router.push("/");

    const myStories = `${
      store.state.API_LOCATION
    }/story/user/${localStorage.getItem("userId")}`;
    const feedStories = `${
      store.state.API_LOCATION
    }/story/feed/user/${localStorage.getItem("userId")}`;

    axios
      .get(myStories, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.stories.push(...data);
      });

    axios
      .get(feedStories, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.stories.push(...data.stories);
      });
  },
};
</script>

<style>
.story {
  margin-top: 20px;
  width: 100%;
  height: 700px;
  display: flex;
  border: 1px solid black;
}
.left_container {
  border: 1px solid black;
  overflow-y: scroll;
  width: 30%;
}
.right_container {
  width: 70%;
  display: flex;
  border: 1px solid black;
}
.right_container > img {
  width: 60%;
  height: 600px;
  margin: 40px 100px;
  border: 1px solid black;
}
.storylist {
  margin-top: 10px;
}
.search {
  margin: 20px 10px;
}
.search > input[type="text"] {
  width: 220px;
  padding: 8px;
  border-radius: 10px;
}
.search > i {
  position: relative;
  bottom: 500px;
  left: 0px;
  top: 300px;
}
.search > img {
  border: solid;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 7px;
  cursor: pointer;
}
.prev {
  margin: 300px 0px 0px 50px;
}
.next {
  margin: 300px 50px 0px 0px;
}

.story_list_element {
  display: flex;
  background: rgb(236, 233, 233);
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  transition: 400ms;
}
.story_list_element:hover {
  background: rgb(207, 205, 205);
}
.story_list_element > img {
  border: solid;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 7px;
  cursor: pointer;
}
.story_list_element > h4 {
  font-size: 20px;
  padding: 20px 20px 0px;
}
</style>