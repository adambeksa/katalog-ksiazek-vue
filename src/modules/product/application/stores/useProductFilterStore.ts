import { defineStore } from 'pinia';
import { useProductStore } from './useProductStore';
import { ProductFilterService } from '../../domain/services/ProductFilterService';
import type { IProductFilters } from '../../domain/interfaces/IProductFilters.interface';
import { i18n } from '@/i18n';

const productFilterService = new ProductFilterService();

export const useProductFilterStore = defineStore('productFilter', {
  state: () => ({
    filters: {
      author: i18n.global.t('common.all'),
      epoch: i18n.global.t('common.all'),
      genre: i18n.global.t('common.all'),
      kind: i18n.global.t('common.all'),
    } as IProductFilters,
    page: 1,
    itemsPerPage: 20,
  }),
  getters: {
    filterOptions(state) {
      const productStore = useProductStore();
      return productFilterService.buildFilterOptions(productStore.products);
    },
    filteredResult(state) {
      const productStore = useProductStore();
      return productFilterService.filterAndPaginate(productStore.products, {
        filters: state.filters,
        page: state.page,
        limit: state.itemsPerPage,
      });
    },
    filteredProducts(): any {
      return this.filteredResult.items;
    },
    totalItems(): number {
      return this.filteredResult.total;
    },
    totalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  actions: {
    setFilter(key: keyof IProductFilters, value: string) {
      this.filters = {
        ...this.filters,
        [key]: value,
      };
      this.page = 1;
    },
    setPage(newPage: number) {
      this.page = newPage;
    },
    resetFilters() {
      this.filters = {
        author: i18n.global.t('common.all'),
        epoch: i18n.global.t('common.all'),
        genre: i18n.global.t('common.all'),
        kind: i18n.global.t('common.all'),
      };
      this.page = 1;
    },
  },
});
