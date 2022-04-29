<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <ui-button class="app__list" @click="showDialog"> Создать пост </ui-button>
    <post-list :posts="posts" class="app__list" @remove="removePost" />
    <ui-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </ui-dialog>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },

    async fetchPosts() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
        this.posts = response.data.map((post) => ({
          userId: post.userId,
          id: post.id,
          title: post.title,
          content: post.body,
        }));
      } catch (err) {
        alert("Error");
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="sass" scoped>
$primary: teal

*
  margin: 0
  padding: 0
  box-sizing: border-box
  &::after, &::before
    box-sizing: border-box
.app
  padding: 15px
  &__list
    margin-top: 20px
</style>
