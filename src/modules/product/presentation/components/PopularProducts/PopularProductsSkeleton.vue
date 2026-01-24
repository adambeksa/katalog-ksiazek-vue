<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ProductBoxSkeleton from '../ProductBox/ProductBoxSkeleton.vue';

const { t } = useI18n();
</script>

<template>
  <section class="popular-products">
    <h2 class="popular-products__title">{{ t('products.popular.title') }}</h2>
    <div class="popular-products__grid">
      <ProductBoxSkeleton v-for="i in 3" :key="i" />
    </div>
  </section>
</template>

<style scoped>
@import './PopularProducts.scss';
</style>
