import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueRouter, { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductPage from "@/pages/ProductPage.vue";

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

const app = createApp(App);
app.use(router);
app.mount("#app");
