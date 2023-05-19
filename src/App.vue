<template>
  <loading-container v-if="isLoading" />
  <div v-else>
    <nav-bar :cart-count="cart!.count"></nav-bar>
    <router-view :cart="cart!" :favorites="favorites!" />
    <cart-modal :cart="cart!" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import CartModal from "@/components/CartModal.vue";
import {Cart} from "@/types/Cart";
import LoadingContainer from "@/components/LoadingContainer.vue";
import { Products } from "@/types/Products";
import { CartLocalStorage } from "@/resources/cart/CartLocalStorage";
import { FavoriteLocalStorage } from "@/resources/favorite/FavoriteLocalStorage";
import { Favorites } from "@/types/Favorites";

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
      favorites: null as Favorites | null,
    }
  },
  async created(): Promise<void> {
    const allProducts = await Products.loadMapOfProducts();
    const cartRepo = new CartLocalStorage();
    const favRepo = new FavoriteLocalStorage();
    this.cart = await Cart.create(cartRepo, allProducts);
    this.favorites = await Favorites.create(favRepo, allProducts);
    this.isLoading = false;
  },
});
</script>