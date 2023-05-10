<template>
  <nav-bar cart-count="5"></nav-bar>
  <section class="py-5">
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
            src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
            alt="..."
          />
        </div>
        <div class="col-md-6">
          <div class="small mb-1 text-muted">men's clothing</div>
          <!-- <h1 class="display-5 fw-bolder">Product {{ this.$route.params.id }}</h1> -->
          <h1 class="display-5 fw-bolder mb-3">
            Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            <favorite-button :active="isFavorite" @change="toggleFavorite" />
          </h1>

          <div class="mb-2 d-flex">
            <div class="ratings me-3">
              <i class="fa fa-star rating-color"></i>
              <i class="fa fa-star rating-color"></i>
              <i class="fa fa-star rating-color"></i>
              <i class="fa fa-star rating-color"></i>
              <i class="fa fa-star"></i>
            </div>
            <p class="text-muted">12 reviews</p>
          </div>

          <div class="fs-5 mb-3">
            <!-- <span class="text-decoration-line-through">$300</span> -->
            <span>$109.95</span>
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

<script>
import NavBar from "@/components/NavBar";
import FavoriteButton from "@/components/FavoriteButton";
export default {
  name: "ProductPage",
  data() {
    return {
      isFavorite: false,
    };
  },
  created() {
    // check id here
    console.log("Created");
  },
  components: {
    NavBar,
    FavoriteButton,
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";

.back-icon {
  font-size: 32px;
}
.ratings i {
  color: #6c757d;
  font-size: 24px;
}
.rating-color {
  color: #fbc634 !important;
}
.back-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.back-container > p {
  margin: 0;
}
</style>
