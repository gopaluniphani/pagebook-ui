<template>
  <div class="post">
    <div class="profile">
      <img class="mb-2" :src="postDto.userImgURL" />
      <h3 class="mt-2">{{ postDto.userName }}</h3>
    </div>
    <div class="postimg mb-2">
      <img
        v-if="postDto.post.fileType.toLowerCase() === 'image'"
        :src="postDto.post.fileURL"
      />
      <textarea v-else disabled v-model="postDto.post.fileURL"></textarea>
    </div>
    <div class="like mb-2">
      <i class="fa fa-heart fa-2x red" v-if="like" @click="likePost"></i>
      <i class="far fa-heart fa-2x" v-else @click="likePost"></i>
      <i
        class="fas fa-thumbs-down fa-2x"
        v-if="dislike"
        @click="dislikePost"
      ></i>
      <i class="far fa-thumbs-down fa-2x" v-else @click="dislikePost"></i>
      <i class="fa fa-frown fa-2x yellow" v-if="sad" @click="sadReaction"></i>
      <i class="far fa-frown fa-2x" v-else @click="sadReaction"></i>
      <i
        class="fas fa-grin-stars fa-2x yellow"
        v-if="happy"
        @click="happyReaction"
      ></i>
      <i class="far fa-grin-stars fa-2x" v-else @click="happyReaction"></i>
    </div>
    <button class="btn btn-light" v-on:click="sharePost">Share</button>
    <div class="comment">
      <i class="fas fa-comment-alt fa-1x"></i>
      <input
        type="text"
        v-model="comment"
        v-on:keyup.enter="postComment"
        placeholder="Write Your Comment Here"
      />
    </div>
    <comment
      :key="commentKey"
      v-bind:parentCommentId="'1'"
      v-bind:postId="postDto.post.postId"
    />
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import store from "../../store";
import axios from "axios";

export default {
  components: { Comment },
  name: "post",
  props: {
    postDto: Object,
  },
  data: () => {
    return {
      like: false,
      dislike: false,
      sad: false,
      happy: false,
      comment: "",
      commentKey: 0,
    };
  },
  mounted() {
    switch (this.postDto.performedAction) {
      case 1:
        this.like = true;
        break;
      case 2:
        this.dislike = true;
        break;
      case 3:
        this.happy = true;
        break;
      case 4:
        this.sad = true;
    }
  },
  methods: {
    likePost() {
      this.like = !this.like;
      this.dislike = this.sad = this.happy = false;
      if (this.like) this.updateActionCall(1);
    },
    dislikePost() {
      this.dislike = !this.dislike;
      this.like = this.sad = this.happy = false;
      if (this.dislike) this.updateActionCall(2);
    },
    sadReaction() {
      this.sad = !this.sad;
      this.like = this.dislike = this.happy = false;
      if (this.sad) this.updateActionCall(4);
    },
    happyReaction() {
      this.happy = !this.happy;
      this.like = this.dislike = this.sad = false;
      if (this.happy) this.updateActionCall(3);
    },
    addReply(parentCommentId, postId) {
      console.log(postId, parentCommentId);
    },
    updateActionCall(action) {
      const url = `${store.state.API_LOCATION}/post/addAction`;
      const actionData = {
        postId: this.postDto.post.postId,
        userId: localStorage.getItem("userId"),
        actionType: action,
      };
      console.log(actionData);
      axios.post(url, actionData, store.state.getTokenConfig());
    },
    postComment() {
      const url = `${store.state.API_LOCATION}/post/addComment`;
      axios
        .post(
          url,
          {
            text: this.comment,
            postId: this.postDto.post.postId,
            parentCommentId: 1,
            userId: localStorage.getItem("userId"),
          },
          store.state.getTokenConfig()
        )
        .then((res) => {
          console.log(res);
          this.comment = "";
          this.commentKey += 1;
        });
    },
    sharePost() {
      console.log("inside share post");
      let postData = {
        postCategory: this.postDto.post.postCategory,
        fileURL: this.postDto.post.fileURL,
        userId: localStorage.getItem("userId"),
        profileType: store.state.userDetails.profileType,
        fileType: this.postDto.post.fileType,
      };
      const postUrl = store.state.API_LOCATION + "/post/";
      axios
        .post(postUrl, postData, store.state.getTokenConfig())
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          alert("post shared");
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
