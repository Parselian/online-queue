<template>
  <DefaultLayout>
    <h1 class="session__title">Выберите сессию</h1>
    <div class="session-controls">
      <SelectSessionForm />
    </div>

    <template #controls>
      <CreateSessionForm v-if="authStore.isUserAdmin"/>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import SelectSessionForm from '@/components/session/SelectSessionForm/SelectSessionForm.vue'
  import CreateSessionForm from '@/components/session/CreateSessionForm/CreateSessionForm.vue'

  const authStore = useAuthStore()
</script>

<style scoped lang="scss">
  @import "@/views/styles/sessionView/session-view.scss";
</style>