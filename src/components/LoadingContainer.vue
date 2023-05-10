<template>
<div class="loading-container">
    <div class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
name: "loading-container"
}
</script>

<style scoped>
.loading-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>