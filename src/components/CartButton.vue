<template>
  <button
    class="btn btn-outline-light"
    type="submit"
    data-bs-toggle="modal"
    data-bs-target="#cartModal"
  >
    <i class="bi-cart-fill me-1"></i>
    Корзина
    <span class="badge bg-light text-dark ms-1 rounded-pill">{{ count }}</span>
  </button>
</template>

<script>
export default {
  name: "cart-button",
  props: {
    count: Number,
  },
};
</script>

<style scoped></style>
