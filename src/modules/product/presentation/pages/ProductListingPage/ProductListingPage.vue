<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/modules/product/application/stores/useProductStore';
import { useProductFilterStore } from '@/modules/product/application/stores/useProductFilterStore';
import type { IProductFilters } from '@/modules/product/domain/interfaces/IProductFilters.interface';
import ProductBox from '@/modules/product/presentation/components/ProductBox/ProductBox.vue';
import ProductFilters from '@/modules/product/presentation/components/ProductFilters/ProductFilters.vue';
import ProductListingSkeleton from './ProductListingSkeleton.vue';
import ProductListingHead from './ProductListingHead.vue';
import Breadcrumbs from '@/modules/shared/ui/components/Breadcrumbs/Breadcrumbs.vue';

const { t } = useI18n();
const productStore = useProductStore();
const filterStore = useProductFilterStore();

const { isLoading } = storeToRefs(productStore);
const { 
  filteredProducts: products, 
  filters, 
  filterOptions, 
  page, 
  totalPages,
  itemsPerPage
} = storeToRefs(filterStore);

onMounted(() => {
  productStore.loadAllProducts();
});

const handleFilterChange = (key: keyof IProductFilters, value: string) => {
  filterStore.setFilter(key, value);
};

const previousPage = () => {
  if (page.value > 1) {
    filterStore.setPage(page.value - 1);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    filterStore.setPage(page.value + 1);
  }
};
</script>

<template>
  <ProductListingSkeleton v-if="isLoading" />

  <div v-else class="product-listing">
      <Breadcrumbs />
      
      <ProductFilters
        :filters="filters"
        :filter-options="filterOptions"
        @filter-change="handleFilterChange"
      />

      <ProductListingHead />
      <div
        class="product-listing__grid"
        :style="{ counterReset: `book ${(page - 1) * itemsPerPage}` }"
      >
        <ProductBox
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-if="products.length === 0" class="product-listing__empty">
        <p>{{ t('products.listing.empty') }}</p>
      </div>

      <div v-else class="pagination">
        <button
          :disabled="page === 1"
          class="pagination__button"
          @click="previousPage"
        >
          {{ t('products.pagination.previous') }}
        </button>
        <span class="pagination__info">
          {{ t('products.pagination.pageInfo', { page, total: totalPages }) }}
        </span>
        <button
          :disabled="page === totalPages"
          class="pagination__button"
          @click="nextPage"
        >
          {{ t('products.pagination.next') }}
        </button>
      </div>
    </div>
</template>

<style scoped>
  @import './ProductListingPage.scss';
</style>
