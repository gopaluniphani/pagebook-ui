<template>
  <div>
    <span v-if="hasComments">
      <div v-for="(comment, k) in comments" :key="k">
        <p>
          {{ comment.userName + ": " + comment.comment.text }}
        </p>
        <div class="comment">
          <i class="fas fa-comment-alt fa-1x"></i>
          <input
            type="text"
            v-model="reply"
            v-on:keyup.enter="postReply(comment.comment.commentId)"
            placeholder="Write Your Reply Here"
          />
          <comment
            v-bind:parentCommentId="comment.comment.commentId"
            v-bind:postId="postId"
          />
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";

export default {
  name: "comment",
  props: {
    parentCommentId: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  data() {
    return {
      comments: [],
      hasComments: false,
      reply: "",
    };
  },
  methods: {
    postReply: function (parentCommentId) {
      const url = `${store.state.API_LOCATION}/post/addComment`;
      axios
        .post(
          url,
          {
            text: this.reply,
            postId: this.postId,
            parentCommentId: parentCommentId,
            userId: localStorage.getItem("userId"),
          },
          store.state.getTokenConfig()
        )
        .then((res) => {
          this.reply = "";
          console.log(res.data);
        });
    },
  },
  mounted() {
    const url = `${store.state.API_LOCATION}/post/getComments?parentCommentId=${this.parentCommentId}&postId=${this.postId}`;
    axios
      .get(url, store.state.getTokenConfig())
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.comments = data;
        console.log(this.comments);
        if (data.length > 0) this.hasComments = true;
      });
  },
};
</script>

