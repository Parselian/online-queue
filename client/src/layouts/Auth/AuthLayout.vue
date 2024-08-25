<template>
  <div class="auth">
    <div class="auth-bg">
      <v-icon
        class="auth-bg__top"
        icon="custom:topWaves"
      />
      <v-icon
        class="auth-bg__bottom"
        icon="custom:bottomWaves"
      />
      <v-icon
        class="auth-bg__lock"
        icon="custom:mockupLock"
      />
    </div>
    <v-btn
      @click="router.go(-1)"
      icon="custom:arrowLeft"
      variant="text"
      class="auth__back"
    >
    </v-btn>

    <div class="auth__body">
      <h1 class="auth__title">
        <slot name="title"></slot>
      </h1>
      <div class="auth__subtitle">
        <slot name="subtitle"></slot>
      </div>

      <div class="auth__content">
        <slot></slot>
      </div>
    </div>
    <!-- <SupportBubble/>

    <slot name="modals">
      <SupportModal />
    </slot> -->
  </div>
</template>

<script setup lang="ts">
  import router from '@/router'
  import SupportModal from '@/components/modals/SupportModal/SupportModal.vue'
  import SupportBubble from '@/components/SupportBubble/SupportBubble.vue'
</script>

<style scoped lang="scss">
  @import '@/layouts/Auth/styles/auth';
</style>