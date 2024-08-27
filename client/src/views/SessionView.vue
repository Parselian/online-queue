<template>
  <DefaultLayout>
    <h1 class="session__title">
      <v-icon
        icon="custom:ticketCircle"
        class="session__icon"
      />
      Выберите <br/> сессию
    </h1>
    <template #controls>
      <SelectSessionForm />
      <CreateSessionForm
        class="session__create"
        v-if="authStore.isUserAdmin"
      />
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