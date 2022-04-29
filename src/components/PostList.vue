<template>
  <div class="post-list" v-if="posts.length > 0">
    <h3 class="post-list__title">Список постов</h3>
    <post-item
      class="post-list__item"
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-else>Список постов пуст</h2>
</template>
<script>
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="sass">
$primary: teal
.post-list
  &__item
      margin-top: 5px
</style>
