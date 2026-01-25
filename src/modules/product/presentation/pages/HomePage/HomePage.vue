<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useProductStore } from '@/modules/product/application/stores/useProductStore';
import MainBanner from '@/modules/banner/presentation/components/MainBanner/MainBanner.vue';
import PopularProducts from '@/modules/product/presentation/components/PopularProducts/PopularProducts.vue';
import HomePageSkeleton from './HomePageSkeleton.vue';

const store = useProductStore();
const { popularProducts, isLoading } = storeToRefs(store);

onMounted(() => {
  store.loadAllProducts();
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
