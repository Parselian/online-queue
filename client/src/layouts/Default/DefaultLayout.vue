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
    <div
      v-if="store.isModalOpen"
      class="layout__modals"
    >
      <HelperModal />
    </div>
    <SocialBubble/>
  </div>
</template>

<script setup lang="ts">
  import HelperModal from '@/components/HelperModal/HelperModal.vue'
  import HeaderComponent from '@/components/Header/HeaderComponent.vue'
  import { ref } from 'vue';
  import SocialBubble from '@/components/SocialBubble/SocialBubble.vue'

  import { useModalsStore } from '@/stores/useModalsStore'

  const store = useModalsStore()

  const userName = ref<string>(localStorage.user_name || '')
</script>

<style scoped lang="scss">
  @import '@/layouts/Default/styles/default.scss';
</style>