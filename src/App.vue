<template>
  <div class="app">
    <post-form @create="createPost" />
    <post-list :posts="posts" class="app__list" @remove="removePost" />
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        { id: 1, title: "Пост 1", content: "Текст поста 1" },
        { id: 2, title: "Пост 2", content: "Текст поста 2" },
        { id: 3, title: "Пост 3", content: "Текст поста 3" },
        { id: 4, title: "Пост 4", content: "Текст поста 4" },
        { id: 5, title: "Пост 5", content: "Текст поста 5" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
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
