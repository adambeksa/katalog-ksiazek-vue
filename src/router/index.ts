import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../modules/product/presentation/pages/HomePage/HomePage.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../modules/product/presentation/pages/ProductListingPage/ProductListingPage.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../modules/product/presentation/pages/ProductCardPage/ProductCardPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../modules/shell/presentation/pages/NotFoundPage/NotFoundPage.vue'),
    },
  ],
});

export default router;

export const ROUTES = {
  HOME: { path: '/' },
  PRODUCTS: { path: '/products' },
  PRODUCT_DETAILS: {
    path: (id: string) => `/products/${id}`,
  },
};
