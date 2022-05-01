<template>
  <div class="post-item">
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Содержание: </strong>{{ post.content }}</div>
    </div>
    <div class="post-item__buttons">
      <ui-button class="post-item__btn" @click="$emit('remove', post)"
        >Удалить</ui-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="sass" scoped>
.post-item
  padding: 15px
  border: 2px solid $primary
  display: flex
  align-items: center
  justify-content: space-between
  &__btn
</style>
