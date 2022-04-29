<template>
  <div class="post-list">
    <h3 class="post-list__title">Список пользователей</h3>
    <post-item class="post-list__item" v-for="post in posts" :post="post" />
  </div>
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
