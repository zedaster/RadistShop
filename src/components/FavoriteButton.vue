<template>
  <button
    class="btn btn-outline-warning btn-white-hover"
    @click="($event) => change(active)"
  >
    <div v-if="!isLoaded" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <i v-if="isLoaded && isFavorite" class="fa fa-heart" aria-hidden="true"></i>
    <i v-if="isLoaded && !isFavorite" class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {Product} from "@/types/Product";
import {FavoriteRepository} from "@/resources/favorite/FavoriteRepository";
import axios from "axios/index";

export default defineComponent({
  name: "favorite-button",
  data() {
    return {
      isLoaded: false,
      isFavorite: false,
    }
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    // active: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  computed: {
  },

  created() : void {
    this.$favoriteRepository.isFavoriteProduct(this.product).then((isFav) => {
      this.isLoaded = true;
      this.isFavorite = isFav;
    });
  },

  methods: {
    change($event: Event) {
      // this.$emit("change", oldState);
      this.isLoaded = false;
      if (this.isFavorite) {
        this.$favoriteRepository.removeFavoriteProduct(this.product).then(async (isSuccess) => {
          if (isSuccess) this.isFavorite = false;
          this.isLoaded = true;
        });
      } else {
        this.$favoriteRepository.addFavoriteProduct(this.product).then(async (isSuccess) => {
          if (isSuccess) this.isFavorite = true;
          this.isLoaded = true;
        });
      }
    },
  },
});
</script>

<style scoped>
.btn-white-hover:hover {
  color: white;
}
.spinner-border {
  width: 16px;
  height: 16px;
}
</style>
