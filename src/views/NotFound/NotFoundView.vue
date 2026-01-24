<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="not-found">
    <div class="container">
      <h1>404</h1>
      <p>{{ t('productCard.notFound') }}</p>
      <RouterLink to="/" class="not-found__link">
        {{ t('common.back') }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.not-found__link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color, #007bff);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.not-found__link:hover {
  background-color: var(--primary-color-dark, #0056b3);
}
</style>
