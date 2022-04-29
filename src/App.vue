<template>
  <div class="app">
    <post-form />
    <post-list />
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
      title: "",
      content: "",
    };
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        content: this.content,
      };
      this.posts.push(newPost);
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style lang="sass">
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
