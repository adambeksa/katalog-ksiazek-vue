<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/router';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  currentLabel?: string;
}

const props = defineProps<Props>();
const route = useRoute();
const { t } = useI18n();

const items = computed<BreadcrumbItem[]>(() => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.home'), path: ROUTES.HOME.path },
  ];

  const pathname = route.path;
  const segments = pathname.split('/').filter((segment) => segment !== '');
  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    let label: string | undefined;

    // Map route paths to translation keys
    if (currentPath === ROUTES.PRODUCTS.path) {
      label = t('nav.products');
    }

    if (isLast && props.currentLabel) {
      label = props.currentLabel;
    }

    if (!label) {
      label = segment;
    }

    breadcrumbs.push({
      label,
      path: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
});
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ul class="breadcrumbs__list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumbs__item">
        <RouterLink v-if="item.path" :to="item.path" class="breadcrumbs__link">
          {{ item.label }}
        </RouterLink>
        <span v-else class="breadcrumbs__current" aria-current="page">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="breadcrumbs__separator" aria-hidden="true">
          &rsaquo;
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@import './Breadcrumbs.scss';
</style>
