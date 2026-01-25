import { defineStore } from 'pinia';
import { ProductApiService } from '../../infrastructure/api-services/ProductApiService';
import type { IProduct } from '../../domain/interfaces/IProduct.interface';

const productApiService = new ProductApiService();

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as IProduct[],
    currentProduct: null as IProduct | null,
    isLoading: false,
    error: null as unknown | null,
  }),
  getters: {
    popularProducts: (state) => state.products.slice(0, 3),
  },
  actions: {
    async loadAllProducts() {
      if (this.products.length > 0) return;

      this.isLoading = true;
      this.error = null;
      try {
        this.products = await productApiService.getAll();
      } catch (e) {
        this.error = e;
        console.error('Failed to load products:', e);
      } finally {
        this.isLoading = false;
      }
    },
    async loadProductById(id: string) {
      this.isLoading = true;
      this.error = null;
      this.currentProduct = null;
      try {
        this.currentProduct = await productApiService.getById(id);
      } catch (e) {
        this.error = e;
        console.error('Failed to load product:', e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
