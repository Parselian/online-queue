<template>
  <div class="layout">
    <slot></slot>
    <SocialBubble/>
    <div
      v-if="store.isModalOpen"
      class="layout__modals"
    >
      <HelperModal />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HelperModal from '@/components/HelperModal/HelperModal.vue'
  import SocialBubble from '@/components/SocialBubble/SocialBubble.vue'

  import { useModalsStore } from '@/stores/useModalsStore'

  const store = useModalsStore()
</script>

<style scoped lang="scss">
  @import '@/layouts/Auth/styles/auth.scss';
</style>