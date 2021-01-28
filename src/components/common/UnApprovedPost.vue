<template>
  <div class="post">
    <div class="profile">
      <img class="mb-2" :src="postDto.userImgUrl" />
      <h3>{{ postDto.userName }}</h3>
    </div>
    <div class="postimg">
      <img
        v-if="postDto.post.fileType.toLowerCase() === 'image'"
        :src="postDto.post.fileURL"
      />
      <textarea v-else disabled v-model="postDto.post.fileURL"></textarea>
    </div>
    <div class="row">
      <div class="col-6">
        <button v-on:click="approvePost()" class="btn btn-light">
          Approve
        </button>
      </div>
      <div class="col-6">
        <button v-on:click="rejectPost()" class="btn btn-light">Reject</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";

export default {
  name: "unApprovedPost",
  props: {
    postDto: Object,
  },
  methods: {
    approvePost() {
      const postId = this.postDto.post.postId;
      axios
        .put(store.state.API_LOCATION + "/post/approvePost/" + postId)
        .then((res) => {
          console.log(res.data);
          alert("post approved");
        });
    },
    rejectPost() {
      const postId = this.postDto.post.postId;
      axios
        .delete(store.state.API_LOCATION + "/post/unApprovePost/" + postId)
        .then((res) => {
          console.log(res.data);
          alert("post rejected");
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.post {
  border: 1px solid black;
  width: 400px;
  height: auto;
  padding: 10px;
}
.profile {
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid blue;
  }
  h3 {
    margin-left: 30px;
  }
}
.postimg {
  img {
    border: 1px solid black;
    width: 100%;
    height: 350px;
  }
}
.like {
  display: flex;
  i {
    margin-right: 30px;
  }
}
.red {
  color: red;
}
.yellow {
  color: rgb(255, 174, 0);
}
.comment {
  margin: 10px 0px 0px 10px;
  text-align: left;
  input[type="text"] {
    padding: 10px;
    margin-left: 10px;
    width: 300px;
    background: rgb(235, 235, 235);
    border-radius: 10px;
  }
}
</style>
