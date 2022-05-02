<template>
  <nav class="navbar">
    <div class="navbar__logo" @click="$router.push('/')">Vue 3</div>
    <div class="navbar__buttons">
      <ui-button class="navbar__btn" @click="$router.push('/posts')"
        >Посты</ui-button
      >
      <ui-button class="navbar__btn" @click="$router.push('/store')"
        >Посты (Vuex)</ui-button
      >
      <ui-button class="navbar__btn" @click="$router.push('/about')"
        >О нас</ui-button
      >
    </div>
  </nav>
</template>

<script>
import UiButton from "./UI/UiButton.vue";
export default {
  components: { UiButton },
};
</script>

<style lang="sass" scoped>
.navbar
  padding: 15px
  height: 50px
  background-color: $primary
  box-shadow: 2px 2px 4px gray
  display: flex
  align-items: center
  justify-content: space-between
  &__btn
    &:not(:last-child)
      margin-right: 7px
  &__logo
    cursor: pointer
    font-size: 30px
    font-weight: 700
    color: $secondary
</style>