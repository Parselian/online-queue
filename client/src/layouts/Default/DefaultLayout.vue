<template>
  <div class="layout">
    <HeaderComponent
      :username="userName"
      class="layout__header"
    />
    <div class="layout-bg">
      <v-icon
        class="layout-bg__top"
        icon="custom:topWaves"
      />
      <v-icon
        class="layout-bg__bottom"
        icon="custom:bottomWaves"
      />
    </div>
    <div class="layout__body">
      <div class="layout__content">
        <slot></slot>
      </div>
      <div class="layout__controls">
        <div class="layout-controls__header">
          <div class="layout-controls__toggle"></div>
        </div>
        <slot name="controls"></slot>
      </div>
    </div>
    <!-- <VersionInfoModal /> -->
    <SupportModal />
    <SupportBubble/>
    <TicketsListModal />
  </div>
</template>

<script setup lang="ts">
  import SupportModal from '@/components/modals/SupportModal/SupportModal.vue'
  import VersionInfoModal from '@/components/modals/VersionInfoModal/VersionInfoModal.vue'
  import HeaderComponent from '@/components/Header/HeaderComponent.vue'
  import { ref } from 'vue';
  import SupportBubble from '@/components/SupportBubble/SupportBubble.vue'
  import TicketsListModal from '@/components/modals/TicketsListModal/TicketsListModal.vue';

  const userName = ref<string>(localStorage.user_name || '')
</script>

<style scoped lang="scss">
  @import '@/layouts/Default/styles/default.scss';
</style>