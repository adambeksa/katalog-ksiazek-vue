<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/router';

const { t } = useI18n();
</script>

<template>
  <section class="banner">
    <h1 class="banner__title">{{ t('banner.title') }}</h1>
    <p class="banner__text">
      {{ t('banner.text') }}
      <a href="https://wolnelektury.pl/" class="banner__link">
        {{ t('banner.source') }}
      </a>
      . {{ t('banner.description') }}
    </p>
    <RouterLink :to="ROUTES.PRODUCTS.path" class="banner__cta">
      {{ t('banner.cta') }}
    </RouterLink>
  </section>
</template>

<style scoped>
@import './MainBanner.scss';
</style>
