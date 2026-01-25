<script setup lang="ts">
import Breadcrumbs from '@/modules/shared/ui/components/Breadcrumbs/Breadcrumbs.vue';
import ProductBoxSkeleton from '@/modules/product/presentation/components/ProductBox/ProductBoxSkeleton.vue';
import ProductFiltersSkeleton from '@/modules/product/presentation/components/ProductFilters/ProductFiltersSkeleton.vue';
</script>

<template>
  <div class="product-listing">
    <Breadcrumbs />

    <ProductFiltersSkeleton />

    <div class="product-listing__grid">
      <ProductBoxSkeleton v-for="i in 9" :key="i" />
    </div>
  </div>
</template>

<style scoped>
@import './ProductListingPage.scss';
</style>
