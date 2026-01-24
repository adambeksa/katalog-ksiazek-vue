import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products/ProductListingView.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/Products/ProductDetailView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound/NotFoundView.vue'),
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
