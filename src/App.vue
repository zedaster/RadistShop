<template>
  <nav-bar :cart-count="cart.count"></nav-bar>
  <router-view :cart="cart" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import {Cart} from "@/types/Cart";

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      cart: new Cart([]),
    }
  },
});
</script>