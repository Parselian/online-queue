<template>
  <v-form
    ref="createTicketForm"
    class="create-ticket-form"
    @submit.prevent="submitForm"
  >
    <h4 class="create-ticket-form__title">Заполните форму:</h4>
    <v-text-field
      v-model="queueStore.sessionName"
      density="compact"
      variant="underlined"
      disabled
      label="Активная сессия"
    />
    <v-text-field
      v-model="queueStore.ticketRequest"
      :rules="[v => !!v.trim() || 'Укажите ваш запрос']"
      density="compact"
      variant="underlined"
      label="Ваш запрос"
    />
    <v-btn
      type="submit"
      block
      class="mt-2"
      color="light-blue"
    >
      Создать тикет
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import {useQueueStore} from '@/stores/useQueueStore'
  import {useCreateTicketForm} from '@/components/queue/CreateTicketForm/features/useCreateTicketForm'

  const queueStore = useQueueStore()
  const {createQueueTicket} = useCreateTicketForm()

  const createTicketForm = ref()

  const submitForm = async () => {
    const {valid} = await createTicketForm.value.validate()

    if (valid) createQueueTicket()
  }
</script>

<style scoped lang="scss">
  @import "@/components/queue/CreateTicketForm/styles/create-ticket-form";
</style>