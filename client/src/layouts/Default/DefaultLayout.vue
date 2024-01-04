<template>
  <div class="layout">
    <div>
      <HeaderComponent :username="userName"/>
    </div>
    <div class="layout__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import { ref } from 'vue';

  const userName = ref<string>(localStorage.user_name || '')
</script>

<style scoped lang="scss">
  @import '@/layouts/Default/styles/default.scss';
</style>