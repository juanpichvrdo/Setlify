// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useSpotifyAuth } from "@/utils/composables/useSpotifyAuth";

const { isAuthenticated, getAccessToken } = useSpotifyAuth();

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    name: "Home",
  },
  {
    path: "/setlist/:setlistId",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Setlist.vue"),
    name: "Setlist",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeResolve(async (to) => {
  if (to.query.code) {
    if (!isAuthenticated.value) {
      const spotifyToken = await getAccessToken(to.query.code as string);
      localStorage.setItem("spotifyToken", spotifyToken);
      isAuthenticated.value = !!spotifyToken;
    }

    const setlistRedirectId = sessionStorage.getItem("setlistRedirectId");
    if (setlistRedirectId) {
      return { name: "Setlist", params: { setlistId: setlistRedirectId } };
    } else {
      return { name: "Home" };
    }
  }
});

export default router;
