<template>
  <button
    class="btn btn-outline-warning btn-white-hover"
    @click="change"
  >
    <i v-if="isFavorite" class="fa fa-heart" aria-hidden="true"></i>
    <i v-else class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Product } from "@/types/Product";
import { Favorites } from "@/types/Favorites";

export default defineComponent({
  name: "favorite-button",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    favorites: {
      type: Object as PropType<Favorites>,
      required: true
    }
  },

  computed: {
    isFavorite(): boolean {
      return this.favorites.isFavoriteProduct(this.product);
    }
  },


  methods: {
    change() {
      // this.$emit("change", oldState);
      if (this.isFavorite) {
        this.favorites.removeFavoriteProduct(this.product);
      } else {
        this.favorites.addFavoriteProduct(this.product);
      }
    }
  }
});
</script>

<style scoped>
.btn-white-hover:hover {
  color: white;
}
</style>
