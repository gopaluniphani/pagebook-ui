<template>
  <div class="story_list_element">
    <img src="" />
    <h4>Profile Name</h4>
  </div>
</template>

<script>
export default {
  name: "storyList",
};
</script>

<style scoped>
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