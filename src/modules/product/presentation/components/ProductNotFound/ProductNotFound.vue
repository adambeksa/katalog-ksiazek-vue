<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="product-not-found">
    <h1>{{ t('productCard.notFound') }}</h1>
    <RouterLink to="/products" class="product-not-found__back-link">
      {{ t('productCard.backToList') }}
    </RouterLink>
  </div>
</template>

<style scoped>
@import './ProductNotFound.scss';
</style>
