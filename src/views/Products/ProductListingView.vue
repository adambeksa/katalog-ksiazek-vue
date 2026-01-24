<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { productFacade } from '@/modules/product/application/ProductFacade';
import { productFilterFacade } from '@/modules/product/application/ProductFilterFacade';
import type { IProduct } from '@/modules/product/domain/interfaces/IProduct.interface';
import type { IProductFilters } from '@/modules/product/domain/interfaces/IProductFilters.interface';
import type { IFilterOptions } from '@/modules/product/domain/interfaces/IFilterOptions.interface';
import ProductBox from '@/modules/product/presentation/components/ProductBox/ProductBox.vue';
import ProductFilters from '@/modules/product/presentation/components/ProductFilters/ProductFilters.vue';
import ProductFiltersSkeleton from '@/modules/product/presentation/components/ProductFilters/ProductFiltersSkeleton.vue';
import Breadcrumbs from '@/modules/shared/ui/components/Breadcrumbs/Breadcrumbs.vue';

const { t } = useI18n();

const initialProducts = ref<IProduct[]>([]);
const isLoading = ref(true);
const page = ref(1);

const filters = ref<IProductFilters>({
  author: t('common.all'),
  epoch: t('common.all'),
  genre: t('common.all'),
  kind: t('common.all'),
});

const filterOptions = computed<IFilterOptions>(() => {
  return productFilterFacade.deriveFilterOptions(initialProducts.value);
});

const filteredResult = computed(() => {
  return productFilterFacade.filterProducts(initialProducts.value, {
    filters: filters.value,
    page: page.value,
  });
});

const products = computed(() => filteredResult.value.items);
const total = computed(() => filteredResult.value.total);
const totalPages = computed(() => Math.ceil(total.value / 20));

watch(filters, () => {
  page.value = 1;
}, { deep: true });

onMounted(async () => {
  try {
    initialProducts.value = await productFacade.getAllProducts();
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    isLoading.value = false;
  }
});

const handleFilterChange = (key: keyof IProductFilters, value: string) => {
  filters.value = {
    ...filters.value,
    [key]: value,
  };
};

const previousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};
</script>

<template>
  <div class="product-listing">
    <div class="container">
      <Breadcrumbs />
      
      <ProductFiltersSkeleton v-if="isLoading" />
      <ProductFilters
        v-else
        :filters="filters"
        :filter-options="filterOptions"
        @filter-change="handleFilterChange"
      />

      <div class="product-listing__grid">
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
  </div>
</template>

<style scoped>
@import '@/modules/product/presentation/pages/ProductListingPage/ProductListingPage.scss';
</style>
