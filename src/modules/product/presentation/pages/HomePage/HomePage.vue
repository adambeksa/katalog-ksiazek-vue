<script setup lang="ts">
import { productFacade } from '@/modules/product/application/ProductFacade';
import type { Product } from '@/modules/product/domain/Product';
import { ref, onMounted } from 'vue';
import MainBanner from '@/modules/banner/presentation/components/MainBanner/MainBanner.vue';
import PopularProducts from '@/modules/product/presentation/components/PopularProducts/PopularProducts.vue';
import HomePageSkeleton from './HomePageSkeleton.vue';

const popularProducts = ref<Product[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const allProducts = await productFacade.getAllProducts();
    popularProducts.value = allProducts.slice(0, 3);
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="home">
    <HomePageSkeleton v-if="isLoading" />
    <template v-else>
      <MainBanner />
      <PopularProducts :products="popularProducts" />
    </template>
  </div>
</template>
