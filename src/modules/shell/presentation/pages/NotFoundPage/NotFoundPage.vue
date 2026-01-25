<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1>404</h1>
      <p>{{ t('productCard.notFound') }}</p>
      <RouterLink to="/" class="not-found__link">
        {{ t('common.back') }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  @import './NotFoundPage.scss';
</style>
