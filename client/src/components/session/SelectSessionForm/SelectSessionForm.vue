<template>
  <v-form
    ref="sessionsForm"
    class="select-session-form"
  >
    <v-select
      v-model="sessionsStore.selectedSubjectId"
      :items="sessionsStore.subjectsList"
      @update:menu="getSessionsList"
      :rules="[v => !!v || 'Выберите предмет!']"
      item-title="subject_name"
      item-value="ID"
      density="compact"
      variant="underlined"
      label="Желаемый предмет"
      class="select-session-form__select"
    />
    <v-select
      v-model="sessionsStore.selectedSessionId"
      :items="sessionsStore.sessionsList"
      :rules="[v => !!v || 'Выберите сессию!']"
      :disabled="isSessionSelectDisabled"
      item-title="session_name"
      item-value="id"
      density="compact"
      variant="underlined"
      label="Желаемая сессия"
      class="select-session-form__select"
    />
    <v-btn
      @click="submitSessionsForm(selectSession)"
      block
      color="light-blue"
      class="select-session-form__button"
    >
      Выбрать сессию
    </v-btn>
    <v-btn
      @click="getSessionsList"
      block
      variant="outlined"
      color="light-blue"
      class="select-session-form__button"
    >
      Обновить список
    </v-btn>
    <v-btn
      v-if="authStore.isUserAdmin"
      @click="submitSessionsForm(deleteSession)"
      block
      color="pink"
      class="select-session-form__button"
    >
      Удалить сессию
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
  import {
    computed,
    ref,
    unref
  } from 'vue'
  import {useSessionForm} from '@/components/session/features/useSessionForm'
  import {useSessionsStore} from '@/stores/useSessionsStore'
  import {useAuthStore} from '@/stores/useAuthStore'

  const authStore = useAuthStore()
  const sessionsStore = useSessionsStore()

  const sessionsForm = ref()

  const {
    deleteSession,
    getSessionsList,
    getSubjectsList,
    selectSession
  } = useSessionForm()

  async function init() {
    await getSubjectsList()
    getSessionsList()
  }
  init()

  const isSessionSelectDisabled = computed(() => !unref(sessionsStore.selectedSubjectId))

  const submitSessionsForm = async (callback: () => {}) => {
    const {valid} = await sessionsForm.value.validate()
    console.log(valid);

    if (valid) {
      callback()
      sessionsForm.value.reset()
    }
  }
</script>

<style scoped lang="scss">
  @import "@/components/session/SelectSessionForm/styles/select-session-form";
</style>