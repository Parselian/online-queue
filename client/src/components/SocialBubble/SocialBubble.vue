<template>
  <div
    @click="toggleModal"
    class="social-bubble"
  >
  </div>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/useModalsStore'

  const {toggleModal} = useModalsStore()
</script>

<style scoped lang="scss">
  @import "@/components/SocialBubble/scss/social-bubble";
</style>