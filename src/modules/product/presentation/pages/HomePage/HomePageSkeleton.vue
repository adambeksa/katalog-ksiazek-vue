<script setup lang="ts">
import MainBanner from '@/modules/banner/presentation/components/MainBanner/MainBanner.vue';
import PopularProductsSkeleton from '@/modules/product/presentation/components/PopularProducts/PopularProductsSkeleton.vue';
</script>

<template>
  <div class="home">
    <MainBanner />
    <PopularProductsSkeleton />
  </div>
</template>
