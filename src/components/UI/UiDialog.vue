<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot />
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "ui-dialog",
  mixins: [toggleMixin],
  mounted() {
    console.log("dialog mounted");
  },
};
</script>

<style lang="sass" scoped>
.dialog
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background-color: rgba(0,0,0,.3)
  z-index: 100
  &__content
    padding: 22px
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: #fff
    border-radius: 12px
    min-height: 50px
    min-width: 300px
</style>
