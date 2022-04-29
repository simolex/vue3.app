<template>
  <input class="ui-input" type="text" :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: "ui-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="sass">
.ui-input
  flex-basis:  100%
  border: 1px solid $primary
  padding: 10px 15px
  margin-top: 10px
</style>
