<template>
  <div id="app">
    <div>
      <!-- <Main /> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Main from "./views/Main.vue";
export default {
  name: "app",
  components: {
    Main,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
