<template>
  <DefaultLayout>
    <h1 class="home__title">Это домашняя страница</h1>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import router from '@/router'

  router.push('/admin/queue')
</script>

<style scoped lang="scss">
  @import "@/views/styles/homeView/home-view.scss";
</style>