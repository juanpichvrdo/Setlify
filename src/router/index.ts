// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    name: "Home",
  },
  {
    path: "/:setlistId",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Setlist.vue"),
    name: "Setlist",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
