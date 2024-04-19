<template>
  <v-overlay
    class="helper-modal align-center justify-center"
    v-model="store.isSupportModalOpen"
  >
    <v-card class="helper-modal__card">
      <h2 class="helper-modal__title">Нашли проблему?</h2>
      <div class="helper-modal__subtitle">Или может есть предложения по улучшению? <br/> Напиши в телеграм👇</div>

      <a
        @click="store.toggleSupportModal"
        href="https://t.me/leti_talon"
        target="_blank"
        class="helper-modal__link"
      >
        Написать
      </a>

      <button
        @click="store.toggleSupportModal"
        class="helper-modal__close"
      >
        Закрыть
      </button>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/useModalsStore'

  const store = useModalsStore();
</script>

<style lang="scss" scoped>
  @import "@/components/HelperModal/scss/helper-modal";
</style>