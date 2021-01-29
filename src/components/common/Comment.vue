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
            v-on:keyup.enter="postReply($event, comment.comment.commentId)"
            placeholder="Write Your Reply Here"
          />
          <comment
            :key="replyKey"
            class="mx-5"
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
      replyKey: 0,
    };
  },
  methods: {
    postReply: function (event, parentCommentId) {
      const url = `${store.state.API_LOCATION}/post/addComment`;
      const reply = event.target.value;
      const commentData = {
        text: reply,
        postId: this.postId,
        parentCommentId: parentCommentId,
        userId: localStorage.getItem("userId"),
      };
      axios.post(url, commentData, store.state.getTokenConfig()).then((res) => {
        this.replyKey += 1;
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

