<template>
  <div class="layout">
    <div>
      <HeaderComponent :username="'User'"/>
    </div>
    <div class="layout__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderComponent from '@/components/Header/HeaderComponent.vue';
</script>

<style scoped lang="scss">
  @import '@/layouts/Default/styles/default.scss';
</style>