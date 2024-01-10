<template>
  <div class="layout">
    <HeaderComponent
      :username="userName"
      class="layout__header"
    />
    <div class="layout__body">
      <slot></slot>
      <div class="layout__controls">
        <div class="layout-controls__header">
          <div class="layout-controls__toggle"></div>
        </div>
        <slot name="controls"></slot>
      </div>
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