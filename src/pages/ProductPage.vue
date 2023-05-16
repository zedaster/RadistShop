<template>
  <nav-bar cart-count="5"></nav-bar>
  <loading-container v-if="isLoading" />
  <section v-else class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div
        class="back-container mb-3"
        @click="($event) => this.$router.push({ name: 'home' })"
      >
        <i class="fa fa-arrow-left me-2"></i>
        <p><b>Go back</b></p>
        <p></p>
      </div>

      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img
            class="card-img-top mb-5 mb-md-0"
            :src="product.image"
            alt="..."
          />
        </div>
        <div class="col-md-6">
          <div class="small mb-1 text-muted">{{ product.category }}</div>
          <!-- <h1 class="display-5 fw-bolder">Product {{ this.$route.params.id }}</h1> -->
          <h1 class="display-5 fw-bolder mb-3">
            {{ product.title }}
            <favorite-button :active="isFavorite" @change="toggleFavorite" />
          </h1>

          <!-- TODO: Create nice stars -->
          <div class="mb-2 d-flex">
            <h5 class="me-2">{{ product.rating.rate }}</h5>
            <div class="ratings me-3">
              <i v-for="n in 5" :key="n" :class="getStarClasses(n)"></i>
            </div>
            <p class="text-muted">{{ product.rating.count }} reviews</p>
          </div>

          <div class="fs-5 mb-3">
            <!-- <span class="text-decoration-line-through">$300</span> -->
            <span>${{ product.price }}</span>
          </div>

          <p class="lead mb-3">
            Your perfect pack for everyday use and walks in the forest. Stash
            your laptop (up to 15 inches) in the padded sleeve, your everyday
          </p>
          <div class="d-flex mb-3">
            <input
              class="form-control text-center me-3"
              id="inputQuantity"
              type="num"
              value="1"
              style="max-width: 3rem"
            />
            <button
              class="btn btn-outline-dark flex-shrink-0 me-3"
              type="button"
            >
              <i class="bi-cart-fill me-1"></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoadingContainer from "@/components/LoadingContainer.vue";
import NavBar from "@/components/NavBar.vue";
import FavoriteButton from "@/components/FavoriteButton.vue";
import {Product} from "@/types/Product";
import axios from "axios";

export default defineComponent({
  name: "ProductPage",
  components: {
    LoadingContainer,
    NavBar,
    FavoriteButton,
  },
  data() {
    return {
      isFavorite: false,
      isLoading: true,
      product: null as Product | null
    };
  },
  methods: {
    toggleFavorite() : void {
      this.isFavorite = !this.isFavorite;
    },
    getStarClasses(num: number) : string {
      if (this.product == null) {
        throw "The product is null!";
      }
      if (num <= this.product.rating.rate) {
        return "fa fa-star";
      } else if (num - 0.5 <= this.product.rating.rate) {
        return "fa fa-star-half-o";
      } else {
        return "fa fa-star-o";
      }
    },
  },
  created() : void {
    const id = this.$route.params.id;
    axios
      .get<Product>(`https://fakestoreapi.com/products/${id}`)
      .then(async (response) => {
        this.product = response.data;
        this.isLoading = false;
      });
  },
});
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";

.back-icon {
  font-size: 32px;
}
.ratings i {
  font-size: 24px;
  color: #fbc634 !important;
}
.back-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.back-container:hover {
  color: var(--bs-blue);
}
.back-container > p {
  margin: 0;
}
</style>
