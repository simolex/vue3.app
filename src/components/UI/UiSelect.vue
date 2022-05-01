<template>
  <select class="ui-select" v-model="modelValue" @change="changeOption">
    <option value="" disabled>Выберити из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "ui-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="sass" scoped>
.ui-select
   width: inherit
   height: inherit
   padding: 10px 15px
   background: none
   color: $primary
   border: 1px solid $primary
</style>