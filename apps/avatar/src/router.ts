import Home from "./views/Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{ path: "/", component: Home }];
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
