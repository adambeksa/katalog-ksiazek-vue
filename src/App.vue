<script setup lang="ts">
import Header from './modules/shared/ui/components/Header/Header.vue';
import Footer from './modules/shared/ui/components/Footer/Footer.vue';
</script>

<template>
  <div class="layout">
    <Header />
    <main class="layout__main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
@import './styles/layout.scss';
</style>
