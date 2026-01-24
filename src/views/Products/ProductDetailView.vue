<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { productFacade } from '@/modules/product/application/ProductFacade';
import type { IProduct } from '@/modules/product/domain/interfaces/IProduct.interface';
import DownloadModal from '@/modules/product/presentation/components/DownloadModal/DownloadModal.vue';
import ProductAttribution from '@/modules/product/presentation/components/ProductAttribution/ProductAttribution.vue';
import Breadcrumbs from '@/modules/shared/ui/components/Breadcrumbs/Breadcrumbs.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const product = ref<IProduct | null>(null);
const isLoading = ref(true);
const notFound = ref(false);
const showDownloadModal = ref(false);
const showAudioModal = ref(false);

const hasAudio = computed(() => 
  product.value?.audioFormats && Object.keys(product.value.audioFormats).length > 0
);

onMounted(async () => {
  try {
    const id = route.params.id as string;
    product.value = await productFacade.getProductById(id);
    if (!product.value) {
      notFound.value = true;
    }
  } catch (error) {
    console.error('Error loading product:', error);
    notFound.value = true;
  } finally {
    isLoading.value = false;
  }
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
  <div v-if="isLoading" class="product-card-page">
    <div class="container">
      <p>{{ t('common.loading') }}</p>
    </div>
  </div>

  <div v-else-if="notFound" class="product-card-page">
    <div class="container">
      <h1>{{ t('productCard.notFound') }}</h1>
      <RouterLink to="/products" class="product-card-page__back-link">
        {{ t('productCard.backToList') }}
      </RouterLink>
    </div>
  </div>

  <div v-else-if="product" class="product-card-page">
    <div class="container">
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
@import '@/modules/product/presentation/pages/ProductCardPage/ProductCardPage.scss';
</style>
