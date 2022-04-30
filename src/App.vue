<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__buttons">
      <ui-button class="app__list" @click="showDialog">
        Создать пост
      </ui-button>
      <ui-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <ui-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </ui-dialog>
    <post-list
      :posts="posts"
      class="app__list"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка постов...</div>
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
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "content", name: "По содержимому" },
      ],
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
      this.isPostsLoading = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = response.data.map(({ userId, id, title, body }) => ({
          userId,
          id,
          title,
          content: body,
        }));
      } catch (err) {
        alert("Error");
      } finally {
        this.isPostsLoading = false;
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
  &__buttons
    margin: 15px 0
    display: flex
    justify-content: space-between
</style>


