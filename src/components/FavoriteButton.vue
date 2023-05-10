<template>
  <button
    class="btn btn-outline-warning btn-white-hover"
    @click="($event) => change(active)"
  >
    <i v-if="active" class="fa fa-heart" aria-hidden="true"></i>
    <i v-else class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
</template>

<script>
export default {
  name: "favorite-button",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change(oldState) {
      this.$emit("change", oldState);
    },
  },
};
</script>

<style scoped>
.btn-white-hover:hover {
  color: white;
}
</style>
