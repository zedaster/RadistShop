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
        <div class="text-center">
          <a class="btn btn-outline-dark mt-auto" href="#"
          >Подробнее</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {Product} from "@/types/Product";

export default defineComponent({
  name: "product-card",
  props: {
    product: Product,
  },
  methods: {
    openProduct: function ($event){
      this.$router.push({ name: 'product', params: {id: this.product.id}});
    }
  }
});
</script>

<style scoped>
.card-body:hover {
  cursor: pointer;
  color: var(--bs-blue);
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
