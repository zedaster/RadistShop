<template>
  <a v-if="!isActive" class="btn btn-outline-dark mx-1" @click="addToCart">В корзину</a>
  <div v-else class="d-flex">
    <button class="btn btn-outline-dark" @click="minusCount"><i class="fa fa-minus" aria-hidden="true"></i></button>
    <div class="cart-count mx-2">
      <p>{{productCount}}</p>
    </div>
    <button class="btn btn-outline-dark" @click="plusCount"><i class="fa fa-plus" aria-hidden="true"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Product } from "@/types/Product";
import { Cart } from "@/types/Cart";

export default defineComponent({
  name: "add-to-cart-button",
  data: () => {
    return {
      isLoaded: false,
      isFavorite: false,
    };
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    cart: {
      type: Object as PropType<Cart>,
      required: true,
    }
  },
  computed: {
    isActive() : boolean {
      return this.cart.hasProduct(this.product);
    },
    productCount() : number {
      return this.cart.getProductCount(this.product);
    }
  },
  methods: {
    addToCart() : void {
      this.cart.setProductCount(this.product, 1);
    },
    minusCount() : void {
      this.cart.decrementProductCount(this.product);
    },
    plusCount() : void {
      this.cart.incrementProductCount(this.product);
    }
  }
});
</script>

<style scoped>
.cart-count {
  display: flex;
  align-items: center;
}
.cart-count p {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
</style>