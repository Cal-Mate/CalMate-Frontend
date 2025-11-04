<template>
  <header>
    <headerComponent></headerComponent>
  </header>
  <!-- 본문 -->
  <main>
    <RouterView/>
  </main>
</template>

<script setup>

  import {RouterLink, RouterView} from 'vue-router';
  import { onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import headerComponent from '@/components/Header.vue';
    const userStore = useUserStore();
</script>

<style scoped>

</style>