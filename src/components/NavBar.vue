<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <!-- TODO: add home -->
      <a
        class="navbar-brand"
        @click="($event) => this.$router.push({ name: 'home' })"
        >Radist Shop</a
      >
      <div class="d-flex">
        <cart-button :count="cartCount" />
      </div>
    </div>
  </nav>
</template>

<script>
import CartButton from "@/components/CartButton.vue";

export default {
  name: "nav-bar",
  props: {
    cartCount: Number,
  },
  components: {
    CartButton,
  },
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
