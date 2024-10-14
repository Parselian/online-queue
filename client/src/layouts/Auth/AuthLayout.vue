<template>
  <div class="layout">
    <slot></slot>
    <SupportBubble/>

    <slot name="modals">
      <SupportModal />
    </slot>
  </div>
</template>

<script setup lang="ts">
  import SupportModal from '@/components/modals/SupportModal/SupportModal.vue'
  import SupportBubble from '@/components/SupportBubble/SupportBubble.vue'
</script>

<style scoped lang="scss">
  @import '@/layouts/Auth/styles/auth.scss';
</style>