<template>
  <v-form
    @submit.prevent="submitForm"
    ref="createSessionForm"
    class="create-session-form"
  >
    <v-text-field
      v-model="sessionsStore.newSessionName"
      :rules="[v => !!v || 'Введите название сессии!']"
      density="compact"
      required
      variant="underlined"
      label="Название сессии"
    >
    </v-text-field>
    <v-btn
      type="submit"
      block
      color="light-blue"
      class="session-create__button"
    >
      Создать сессию
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import {useSessionForm} from '@/components/session/features/useSessionForm'
  import { useSessionsStore } from '@/stores/useSessionsStore'

  const sessionsStore = useSessionsStore()
  const {createSession} = useSessionForm()
  const createSessionForm = ref()

  const submitForm = async () => {
    const {valid} = await createSessionForm.value.validate()

    if (valid) {
      createSession()
      createSessionForm.value.reset()
    }
  }
</script>