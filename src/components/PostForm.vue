<template>
  <form class="form" @submit.prevent>
    <h4 class="form__title">Создание поста</h4>
    <ui-input v-model="post.title" class="form__name" type="text" placeholder="Название" />
    <ui-input v-model="post.content" class="form__content" placeholder="Содержание" />
    <ui-button class="form__button" @click="createPost">Создать</ui-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        content: "",
      };
    },
  },
};
</script>
<style lang="sass">

.form
  display: flex
  flex-direction: column
  &__name
  &__content
    resize: none
  &__button
    margin-top: 10px
</style>
