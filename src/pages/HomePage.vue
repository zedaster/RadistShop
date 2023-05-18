<template>
  <loading-container v-if="isLoading" />
  <section v-else>
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row pb-3 gy-2">
        <div class="col-sm-12 col-md-3 col-lg-3 col-xl-2">
          <select class="form-select" id="sortType">
            <option selected value="default">По умолчанию</option>
            <option value="alphabet">По алфавиту</option>
            <option value="ascendingPrice">По возрастанию цены</option>
            <option value="descendingPrice">По убыванию цены</option>
          </select>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-8">
          <input class="form-control" type="text" id="search" placeholder="Поиск">
        </div>
        <div class="col-sm-12 col-md-3 сol-lg-3 col-xl-2">
          <button class="btn btn-outline-dark dropdown-toggle dropdown-filters-button" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">Фильтры
          </button>
          <ul class="dropdown-menu dropdown-filters">
            <h6 class="dropdown-header">Избранное</h6>
            <li class="dropdown-item">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Показать избранное</label>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <h6 class="dropdown-header">Категории</h6>
            <li class="dropdown-item">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  men's clothing
                </label>
              </div>
            </li>
            <li class="dropdown-item">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  women's clothing
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <product-card v-for="product in products"
                      :key="product.id"
                      :product="product" :cart="cart"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import { Product } from "@/types/Product";
import { Products } from "@/types/Products";
import { Cart } from "@/types/Cart";
import LoadingContainer from "@/components/LoadingContainer.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    //HelloWorld,
    LoadingContainer,
    ProductCard
  },
  props: {
    cart: {
      type: Object as PropType<Cart>,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      products: null as Array<Product> | null
    };
  },
  created(): void {
    Products
      .loadAllProducts()
      .then((products) => {
        this.products = products;
        this.isLoading = false;
      });
  }
});
</script>

<style scoped>
.search-input {
  width: 100%;
}

#sortType {
}

.dropdown-filters-button {
  width: 100%;
}
</style>
