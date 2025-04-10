import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";
import WalletV from "@/views/WalletV.vue";
import UserHistory from "@/components/UserHistory.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiereGuest: true },
  },
  {
    path: "/wallet",
    name: "WalletView",
    component: WalletV,
    meta: { requiereAuth: true },
  },
  {
    path: "/history",
    name: "HistoryView",
    component: UserHistory,
    meta: { requiereAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    alert("Ingrese un user");
    next("/");
  } else if (to.meta.requiresGuest && store.state.isAuthenticated) {
    next("/#");
  } else {
    next();
  }
});

export default router;
