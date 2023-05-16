import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueRouter, { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import { FavoriteLocalStorage } from "@/resources/favorite/FavoriteLocalStorage";
import { FavoriteRepository } from "@/resources/favorite/FavoriteRepository";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/product/:id",
      name: "product",
      component: ProductPage,
    },
  ],
  history: createWebHistory(),
});

declare module 'vue' {
  interface ComponentCustomProperties {
    $favoriteRepository: FavoriteRepository
  }
}

const app = createApp(App);
app.config.globalProperties.$favoriteRepository = new FavoriteLocalStorage();
// app.config.globalProperties.$favoriteRepository = new FavoriteLocalStorage();
app.use(router);
app.mount("#app");
