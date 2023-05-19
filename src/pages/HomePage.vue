<template>
  <loading-container v-if="isLoading" />
  <section v-else>
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row pb-3 gy-2">
        <div class="col-sm-12 col-md-3 col-lg-3 col-xl-2">
          <select class="form-select" id="sortType" v-model="sortType">
            <option value="default">По умолчанию</option>
            <option value="alphabet">По алфавиту</option>
            <option value="ascendingPrice">По возрастанию цены</option>
            <option value="descendingPrice">По убыванию цены</option>
          </select>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-8">
          <input class="form-control" type="text" v-model="searchText" id="search" placeholder="Поиск">
        </div>
        <div class="col-sm-12 col-md-3 сol-lg-3 col-xl-2">
          <button class="btn btn-outline-dark dropdown-toggle dropdown-filters-button" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">Фильтры
          </button>
          <ul class="dropdown-menu dropdown-filters">
            <h6 class="dropdown-header">Избранное</h6>
            <li class="dropdown-item">
              <div class="form-check form-switch">
                <input class="form-check-input" v-model="favoritesSelected" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Показать избранное</label>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <h6 class="dropdown-header">Категории</h6>
            <li class="dropdown-item" v-for="category in allCategories" :key="category">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :value="category" id="flexCheckDefault"
                       @change="$event => onChangeCategory(category, $event)">
                <label class="form-check-label" for="flexCheckDefault">
                  {{ category }}
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <product-card v-for="product in visibleProducts"
                      :key="product.id"
                      :product="product"
                      :cart="cart"
                      :favorites="favorites"
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
import { Favorites } from "@/types/Favorites";

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
    },
    favorites: {
      type: Object as PropType<Favorites>,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      searchText: "",
      sortType: "default",
      favoritesSelected: false,
      allCategories: null as Set<string> | null,
      visibleCategories: null as Set<string> | null,
      allProducts: null as Array<Product> | null,
      sortedProducts: null as Array<Product> | null,
      visibleProducts: null as Array<Product> | null
    };
  },
  methods: {
    onChangeCategory(category: string, event: InputEvent) {
      const currentTarget = event.currentTarget as HTMLInputElement;
      if (currentTarget.checked) {
        if (this.areAllCategoriesVisible) {
          this.visibleCategories = new Set([category]);
        } else {
          this.visibleCategories!.add(category);
        }
      } else {
        console.log("delete");
        this.visibleCategories!.delete(category);
        console.log("Size " + this.visibleProducts!.length);
        if (this.visibleCategories!.size == 0) {
          this.visibleCategories = this.allCategories;
        }
      }
      this.applyFilters();
    },
    applyFilters() {
      console.log('applying filters');
      // Apply query
      const query = this.searchText?.toLowerCase()?.trim();
      if (query == null || query == "") {
        this.visibleProducts = this.allProducts;
      } else {
        this.visibleProducts = this.allProducts!
          .filter((product) => product.title.toLowerCase().includes(query));
      }

      console.log('Favorites selected ' + this.favoritesSelected);
      // Apply favorite filter
      if (this.favoritesSelected) {
        this.visibleProducts = this.visibleProducts!.filter((product) => this.favorites.isFavoriteProduct(product));
      }

      // Apply category filter
      this.visibleProducts = this.visibleProducts!.filter((product) => this.visibleCategories!.has(product.category));
    }
  },
  computed: {
    areAllCategoriesVisible(): boolean {
      return Array.from(this.allCategories!).every((category) => this.visibleCategories!.has(category));
    }
  },
  watch: {
    searchText() {
      this.applyFilters();
    },
    sortType(newType: string) {
      switch (newType) {
        case "default":
          this.allProducts!.sort((p1, p2) => p1.id - p2.id);
          break;
        case "alphabet":
          this.allProducts!.sort((p1, p2) => p1.title.localeCompare(p2.title));
          break;
        case "ascendingPrice":
          this.allProducts!.sort((p1, p2) => p1.price - p2.price);
          break;
        case "descendingPrice":
          this.allProducts!.sort((p1, p2) => p2.price - p1.price);
          break;
      }
      this.applyFilters();
    },
    favoritesSelected() {
      console.log('favoritesSelected watch')
      this.applyFilters();
    }
  },
  created(): void {
    Products
      .loadAllProducts()
      .then((products) => {
        this.allProducts = this.visibleProducts = products;
        Products
          .loadCategories()
          .then((categories) => {
            this.allCategories = this.visibleCategories = new Set(categories);
            this.isLoading = false;
          });
      });
  }
});
</script>

<style scoped>
.dropdown-filters-button {
  width: 100%;
}
</style>
