<template>
  <form class="form" @submit.prevent>
    <h4 class="form__title">Создание поста</h4>
    <input
      v-bind:value="title"
      @input="title = $event.target.value"
      class="form__name"
      type="text"
      placeholder="Название"
    />
    <textarea
      v-bind:value="content"
      @input="content = $event.target.value"
      class="form__content"
      placeholder="Содержание"
    ></textarea>
    <button class="form__button" @click="createPost">Создать</button>
  </form>
</template>
<script>
export default {};
</script>
<style lang="sass">

.form
  display: flex
  flex-direction: column
  &__name,
  &__content
    width: 100%
    border: 1px solid $primary
    padding: 10px 15px
    margin-top: 10px
  &__content
    resize: none
  &__button
    cursor: pointer
    margin-top: 10px
    align-self: flex-end
    padding: 10px 15px
    background: none
    color: $primary
    border: 1px solid $primary
</style>
