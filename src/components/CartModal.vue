<template>
  <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cartModalLabel">Корзина</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="!isCartEmpty">
            <cart-modal-item v-for="[product, count] of cartItemMap" :product="product" :count="count" :cart="cart"
                             :key="product.id" />
            <h5 class="text-end">К оплате: ${{ cart.totalAmount }}</h5>
          </div>
          <p v-else class="text-center p-3">Здесь пока нет товаров. Самое время начать ваши покупки!</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <a :href="payLink">
            <button :disabled="isCartEmpty" type="button" class="btn btn-primary">
              Оплатить
            </button>
          </a>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CartModalItem from "@/components/CartModalItem.vue";
import { Cart } from "@/types/Cart";
import { Product } from "@/types/Product";

export default defineComponent({
  name: "cart-modal",
  components: {
    CartModalItem
  },
  props: {
    cart: {
      type: Object as PropType<Cart>,
      required: true
    }
  },
  computed: {
    cartItemMap(): Map<Product, number> {
      return this.cart.getAllProducts();
    },
    isCartEmpty(): boolean {
      return this.cartItemMap.size == 0;
    },
    payLink(): string | null {
      return this.isCartEmpty ? null : "https://www.youtube.com/watch?v=X_8Nh5XfRw0";
    }
  }
});
</script>

<style scoped>

</style>