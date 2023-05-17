<template>
<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 p-3">
      <img :src="product.image" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">${{ product.price }} x {{ count }} = ${{ amount }}</p>
        <add-to-cart-button :cart="cart" :product="product" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/types/Product";
import { Cart } from "@/types/Cart";

export default {
  name: "cart-modal-item",
  props: {
    product: Product,
    count: Number,
    cart: Cart,
  },
  computed: {
    amount() {
      return Math.round(this.product.price * this.count * 100) / 100;
    }
  },
  components: {
    AddToCartButton,
  }
}
</script>

<style scoped>

</style>