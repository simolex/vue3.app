<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  &::after, &::before
    box-sizing: border-box
.app
  display: flex
  flex-direction: column
  padding: 15px
</style>