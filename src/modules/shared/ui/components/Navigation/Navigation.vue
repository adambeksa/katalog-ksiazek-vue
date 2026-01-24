<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/router';

const { t } = useI18n();
</script>

<template>
  <nav class="navigation">
    <RouterLink :to="ROUTES.HOME.path" class="navigation__link">
      {{ t('nav.home') }}
    </RouterLink>
    <RouterLink :to="ROUTES.PRODUCTS.path" class="navigation__link">
      {{ t('nav.products') }}
    </RouterLink>
  </nav>
</template>

<style scoped>
@import './Navigation.scss';
</style>
