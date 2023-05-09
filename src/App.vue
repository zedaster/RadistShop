<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  -->

  <div class="container">
    <h1>Hello world!</h1>
  </div>

  <!--
  <button class="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse">
    Bootstrap collapse
  </button>
  <div class="collapse py-2" id="collapseTarget">
    This is the toggle-able content!
  </div>
  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    //HelloWorld,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
