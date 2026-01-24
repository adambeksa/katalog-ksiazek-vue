<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/router';
import type { IProduct } from '../../../domain/interfaces/IProduct.interface';

interface Props {
  product: IProduct;
}

const props = defineProps<Props>();
const { t } = useI18n();
</script>

<template>
  <div v-if="product" class="product-box">
    <img
      class="product-box__image"
      :src="product.image"
      :alt="product.name"
    />
    <div class="product-box__info">
      <h3 class="product-box__title">{{ product.name }}</h3>
      <div
        class="product-box__description"
        v-html="product.description"
      />
      <RouterLink
        :to="ROUTES.PRODUCT_DETAILS.path(product.id)"
        class="product-box__link"
      >
        {{ t('products.box.viewDetails') }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@import './ProductBox.scss';
</style>
