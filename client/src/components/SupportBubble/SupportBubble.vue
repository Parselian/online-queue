<template>
  <v-btn
    @click="toggleSupportModal"
    round
    theme="dark"
    class="support-bubble"
    icon="pest_control"
    size="x-large"
  >
  </v-btn>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/useModalsStore'

  const {toggleSupportModal} = useModalsStore()
</script>

<style scoped lang="scss">
  @import "@/components/SupportBubble/scss/support-bubble";
</style>