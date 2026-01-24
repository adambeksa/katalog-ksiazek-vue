<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productFacade } from '@/modules/product/application/ProductFacade';
import MainBanner from '@/modules/banner/presentation/components/MainBanner/MainBanner.vue';
import PopularProducts from '@/modules/product/presentation/components/PopularProducts/PopularProducts.vue';
import PopularProductsSkeleton from '@/modules/product/presentation/components/PopularProducts/PopularProductsSkeleton.vue';
import type { Product } from '@/modules/product/domain/Product';

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
    <div class="container">
      <MainBanner />
      <PopularProductsSkeleton v-if="isLoading" />
      <PopularProducts v-else :products="popularProducts" />
    </div>
  </div>
</template>

<style scoped>
@import '@/modules/product/presentation/pages/HomePage/HomePage.scss';
</style>
