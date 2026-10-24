<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { IProduct } from '../../../domain/interfaces/IProduct.interface';

interface Props {
  product: IProduct;
}

defineProps<Props>();
const { t } = useI18n();
</script>

<template>
  <div class="product-attribution">
    <div class="product-attribution__header">
      <img
        src="/assets/wolne-lektury-logo.png"
        :alt="t('attribution.wolneLektury')"
        class="product-attribution__logo"
      />
    </div>

    <div class="product-attribution__content">
      <div class="product-attribution__item">
        <strong>{{ t('attribution.source') }}</strong> {{ t('attribution.sourceText') }}
        <a
          :href="product.url"
          target="_blank"
          rel="noopener noreferrer"
          class="product-attribution__link"
        >
          {{ t('attribution.wolneLektury') }}
        </a>
      </div>

      <div class="product-attribution__item">
        <strong>{{ t('attribution.license') }}</strong>
        <template v-if="product.license && !product.licenseUrl">{{ product.license }}</template>
        <a
          v-else
          :href="product.licenseUrl || product.url"
          target="_blank"
          rel="noopener noreferrer"
          class="product-attribution__link"
        >
          {{ product.license || t('attribution.licenseFallback') }}
        </a>
      </div>

      <div v-if="product.audioArtist" class="product-attribution__item">
        <strong>{{ t('attribution.narrator') }}</strong> {{ product.audioArtist }}
      </div>

      <div v-if="product.audioDirector" class="product-attribution__item">
        <strong>{{ t('attribution.director') }}</strong> {{ product.audioDirector }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './ProductAttribution.scss';
</style>
