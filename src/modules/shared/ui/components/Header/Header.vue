<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/router';

const { t } = useI18n();
</script>

<template>
  <header class="header">
    <div class="header__container">
      <RouterLink :to="ROUTES.HOME.path" class="header__logo">
        <h1 class="header__title">{{ t('meta.title') }}</h1>
      </RouterLink>
      <Navigation />
    </div>
  </header>
</template>

<script lang="ts">
import Navigation from '../Navigation/Navigation.vue';

export default {
  components: {
    Navigation,
  },
};
</script>

<style scoped>
@import './Header.scss';
</style>
