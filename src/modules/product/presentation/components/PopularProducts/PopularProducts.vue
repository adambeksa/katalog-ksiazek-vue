<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ProductBox from '../ProductBox/ProductBox.vue';
import type { IProduct } from '@/modules/product/domain/interfaces/IProduct.interface';

interface Props {
  products: IProduct[];
}

defineProps<Props>();
const { t } = useI18n();
</script>

<template>
  <section class="popular-products">
    <h2 class="popular-products__title">{{ t('products.popular.title') }}</h2>
    <div class="popular-products__grid">
      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<style scoped>
@import './PopularProducts.scss';
</style>
