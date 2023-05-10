<template>
  <div class="col mb-5">
    <div class="card h-100">
      <!-- Product image-->

      <div class="img-container"><img :src="imageUrl" :alt="title" /></div>

      <!-- Product details-->
      <div class="card-body p-4">
        <div class="text-center">
          <!-- Product name-->
          <h5 class="fw-bolder">{{ title }}</h5>
          <!-- Product price-->
          ${{ price }}
        </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center">
          <a class="btn btn-outline-dark mt-auto" href="#">View options</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-card",
  props: {
    imageUrl: String,
    title: String,
    price: Number,
  },
};
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  text-align: center;
  padding: 4px;
}

.img-container img {
  height: 100%;
}
</style>
