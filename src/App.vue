<template>
  <loading-container v-if="isLoading" />
  <div v-else>
    <nav-bar :cart-count="cart!.count"></nav-bar>
    <router-view :cart="cart!" />
    <cart-modal :cart="cart!" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import CartModal from "@/components/CartModal.vue";
import {Cart} from "@/types/Cart";
import LoadingContainer from "@/components/LoadingContainer.vue";

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    LoadingContainer,
    CartModal,
  },
  data() {
    return {
      isLoading: true,
      cart: null as Cart | null,
    }
  },
  created(): void {
    Cart.loadFromRepository().then((cart) => {
      this.cart = cart;
      this.isLoading = false;
    });
  },
});
</script>