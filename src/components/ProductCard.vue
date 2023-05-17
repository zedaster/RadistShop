<template>
  <div class="col mb-5">
    <div class="card h-100">

        <!-- Product details-->
      <div class="card-body" @click="openProduct">
      <!-- Product image-->
        <div class="img-container"><img :src="product.image" :alt="product.title" /></div>
        <div class="text-center pt-4">
          <!-- Product name-->
          <h5 class="fw-bolder">{{ product.title }}</h5>
          <!-- Product price-->
          ${{ product.price }}
        </div>

      </div>

      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="d-flex justify-content-center">

          <add-to-cart-button :cart="cart" :product="product" />
          <favorite-button :product="product" class="mx-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {Cart} from "@/types/Cart";
import {Product} from "@/types/Product";
import FavoriteButton from "@/components/FavoriteButton.vue";
import AddToCartButton from "@/components/AddToCartButton.vue";
import type { PropType } from 'vue'

export default defineComponent({
  name: "product-card",
  components: {
    FavoriteButton,
    AddToCartButton,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    cart: {
      type: Object as PropType<Cart>,
      required: true,
    },
  },
  methods: {
    openProduct: function ($event: Event){
      this.$router.push({ name: 'product', params: {id: this.product.id}});
    }
  },
});
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
.card-body:hover {
  cursor: pointer;
  color: var(--bs-gray);
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>
