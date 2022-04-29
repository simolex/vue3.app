<template>
  <div class="post-list">
    <div class="post-list__item" v-for="post in posts">
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Содержание: </strong>{{ post.content }}</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="sass">
$primary: teal
.post-list
  &__item
      margin-top: 5px
      padding: 15px
      border: 2px solid $primary
</style>
