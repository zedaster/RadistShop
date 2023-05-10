<template>
  <nav-bar cart-count="5"></nav-bar>
  <section>
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <product-card
          imageUrl="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          title="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
          price="109.95"
        />
        <product-card
          imageUrl="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
          title="Mens Casual Premium Slim Fit T-Shirts"
          price="22.3"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    //HelloWorld,
    ProductCard,
    NavBar,
  },
});
</script>

<style>
#app {
}
</style>
