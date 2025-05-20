import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue"),
    meta: { title: "Products" },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetailView.vue"),
    props: true,
    meta: { title: "Product Details" },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
    meta: { title: "Shopping Cart" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Update document title based on route meta
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || "Vue E-Commerce"} | Vue E-Commerce`;
  next();
});

export default router;
