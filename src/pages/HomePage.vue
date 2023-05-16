<template>
  <nav-bar cart-count="5"></nav-bar>
  <loading-container v-if="isLoading" />
  <section v-else>
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <product-card v-for="product in products"
                      :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import NavBar from "@/components/NavBar.vue";
import {Product} from "@/types/Product";
import axios from "axios";
import LoadingContainer from "@/components/LoadingContainer.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    //HelloWorld,
    LoadingContainer,
    ProductCard,
    NavBar,
  },
  data() {
    return {
      isLoading: true,
      products: null as Array<Product> | null,
    }
  },
  created() : void {
    axios
      .get<Array<Product>>('https://fakestoreapi.com/products/')
    .then(async (response) => {
      this.products = response.data;
      this.isLoading = false;
    });

  }
});
</script>

<style>
#app {
}
</style>
