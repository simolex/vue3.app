<template>
  <button class="ui-button">
    <slot />
  </button>
</template>
<script>
export default {
  name: "ui-button",
};
</script>
<style lang="sass" scoped>
.ui-button
  cursor: pointer

  align-self: flex-end
  padding: 10px 15px
  background: none
  color: $primary
  border: 1px solid $primary
</style>
