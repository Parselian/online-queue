<template>
  <div class="layout">
    <slot></slot>
    <SupportBubble/>

    <slot name="modals">
      <HelperModal />
    </slot>
  </div>
</template>

<script setup lang="ts">
  import HelperModal from '@/components/HelperModal/HelperModal.vue'
  import SupportBubble from '@/components/SupportBubble/SupportBubble.vue'
</script>

<style scoped lang="scss">
  @import '@/layouts/Auth/styles/auth.scss';
</style>