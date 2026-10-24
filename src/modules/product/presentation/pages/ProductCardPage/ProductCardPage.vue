<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/modules/product/application/stores/useProductStore';
import DownloadModal from '@/modules/product/presentation/components/DownloadModal/DownloadModal.vue';
import ProductAttribution from '@/modules/product/presentation/components/ProductAttribution/ProductAttribution.vue';
import Breadcrumbs from '@/modules/shared/ui/components/Breadcrumbs/Breadcrumbs.vue';
import ProductCardSkeleton from './ProductCardSkeleton.vue';
import ProductNotFound from '@/modules/product/presentation/components/ProductNotFound/ProductNotFound.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const store = useProductStore();
const { currentProduct: product, isLoading } = storeToRefs(store);

const notFound = computed(() => !isLoading.value && !product.value);
const showDownloadModal = ref(false);
const showAudioModal = ref(false);

const hasAudio = computed(() => 
  product.value?.audioFormats && Object.keys(product.value.audioFormats).length > 0
);

onMounted(() => {
  const id = route.params.id as string;
  store.loadProductById(id);
});

const handleDownload = () => {
  showDownloadModal.value = true;
};

const handleAudioDownload = () => {
  showAudioModal.value = true;
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <ProductCardSkeleton v-if="isLoading" />

  <ProductNotFound v-if="notFound" />

  <div v-else-if="product" class="product-card-page">
    <Breadcrumbs :current-label="product.name" />
    
    <button
      class="product-card-page__back-link"
      @click="goBack"
    >
      {{ t('common.back') }}
    </button>

    <div class="product-card-page__details">
      <div class="product-card-page__image-section">
        <img
          class="product-card-page__main-image"
          :src="product.image"
          :alt="product.name"
        />
      </div>

      <div class="product-card-page__info-section">
        <h2>{{ product.author }}</h2>
        <h1>{{ product.name }}</h1>

        <dl class="product-card-page__facts">
          <div>
            <dt>{{ t('products.filters.epoch') }}</dt>
            <dd>{{ product.epoch }}</dd>
          </div>
          <div>
            <dt>{{ t('products.filters.kind') }}</dt>
            <dd>{{ product.kind }}</dd>
          </div>
          <div>
            <dt>{{ t('products.filters.genre') }}</dt>
            <dd>{{ product.genre }}</dd>
          </div>
        </dl>

        <div class="product-card-page__description-section">
          <h3>{{ t('productCard.descriptionTitle') }}</h3>
          <div
            class="product-card-page__description-content"
            v-html="product.description"
          />
        </div>

        <ProductAttribution :product="product" />

        <div class="product-card-page__actions">
          <button
            class="product-card-page__read-button"
            @click="handleDownload"
          >
            {{ t('productCard.readBook') }}
          </button>

          <button
            v-if="hasAudio"
            class="product-card-page__audio-button"
            @click="handleAudioDownload"
          >
            {{ t('productCard.listenAudiobook') }}
          </button>
        </div>
      </div>
    </div>

    <DownloadModal
      v-if="showDownloadModal"
      :product="product"
      @close="showDownloadModal = false"
    />

    <DownloadModal
      v-if="showAudioModal"
      :product="product"
      :title="t('downloadModal.audiobookTitle')"
      :formats="product.audioFormats"
      @close="showAudioModal = false"
    />
  </div>
</template>

<style scoped>
  @import './ProductCardPage.scss';
</style>
