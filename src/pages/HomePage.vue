<template>
  <loading-container v-if="isLoading" />
  <section v-else>
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <product-card v-for="product in products"
                      :key="product.id"
          :product="product" :cart="cart"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import {Product} from "@/types/Product";
import {Cart} from "@/types/Cart";
import axios from "axios";
import LoadingContainer from "@/components/LoadingContainer.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    //HelloWorld,
    LoadingContainer,
    ProductCard,
  },
  props: {
    cart: {
      type: Object as PropType<Cart>,
      required: true,
    }
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
