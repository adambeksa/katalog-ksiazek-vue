<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<!-- Nagłówek kolumn indeksu książek (ukryty na telefonie) -->
<template>
  <div class="product-listing__head" aria-hidden="true">
    <span>{{ t('products.listing.columns.number') }}</span>
    <span />
    <span>{{ t('products.listing.columns.title') }}</span>
    <span>{{ t('products.filters.author') }}</span>
    <span>{{ t('products.filters.epoch') }}</span>
    <span>{{ t('products.filters.kind') }}</span>
    <span>{{ t('products.listing.columns.audio') }}</span>
  </div>
</template>

<style scoped>
@import './ProductListingPage.scss';
</style>
