<template>
  <DefaultLayout>
    <h1
      v-if="!hasStudentTicket"
      class="queue__title">У вас нет активного тикета</h1>
    <div
      v-else
      class="queue-ticket"
    >
      <div class="queue-ticket__label">Ваш талон:</div>
      <h1 class="queue-ticket__title">{{ createdTicketData.ticket_abbreviation }}</h1>
      <div class="queue-ticket__position">
        <b>Поизиция в очереди:</b> {{ createdTicketData.ticket_position }}
      </div>
    </div>
    <!-- <CurrentClient
      v-else
      :clientId="createdTicketData"
      :clientName="'Ярослав Мишустин'"
      :clientGroup="'0312'"
      :clientQuestion="'Пересдача контрольной'"
    /> -->
    <div
      v-if="!hasStudentTicket"
      class="queue-registration"
    >
      <h4 class="queue-registration__title">Заполните форму:</h4>
      <div class="queue-registration__form queue-registration-form">
        <v-text-field
          v-model="createTicketFormData.session_name"
          density="compact"
          variant="underlined"
          disabled
          label="Активная сессия"
        />
        <v-text-field
        v-model="createTicketFormData.ticket_request"
          density="compact"
          variant="underlined"
          label="Ваш запрос"
        />
        <v-btn
          @click="createQueueTicket"
          type="submit"
          block
          class="mt-2"
          :color="'black'"
        >
          Создать тикет
        </v-btn>
        <span
          v-if="isRegistrationAlertVisible"
          class="queue-registration-form__alert"
        >
          Пожалуйста заполните все поля
        </span>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import router from '@/router'
  import axios from 'axios'
  import { unref } from 'vue'
  import { ref } from 'vue'

  if (!localStorage.selected_session_id) router.push('/session')

  const createTicketFormData = ref({
    session_id: localStorage.selected_session_id,
    session_name: '',
    user_surname: localStorage.user_surname || '',
    student_id: localStorage.user_id,
    ticket_request: localStorage.user_request || '',
  })
  const isRegistrationAlertVisible = ref(false)
  const hasStudentTicket = ref(false)
  const createdTicketData = ref<Record<any, unknown>>({})

  const getActiveSession = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get-session', {params: {session_id: localStorage.selected_session_id}})
      createTicketFormData.value.session_name = response.data.session_name
    } catch (e) {
      console.error(e)
    }
  }
  getActiveSession()

  const createQueueTicket = async () => {
    if (!unref(createTicketFormData).ticket_request) return isRegistrationAlertVisible.value = true
    console.log('here');

    try {
      await axios.post('http://localhost:8080/api/create-ticket', unref(createTicketFormData))
      getTicket()
    } catch (e) {
      console.error(e)
    }
  }

  const getTicket = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get-single-ticket', {params: {student_id: localStorage.user_id}})
      hasStudentTicket.value = response.data ? true : false
      createdTicketData.value = response.data

      console.log(unref(createdTicketData))
    } catch (e) {
      console.error(e)
    }
  }
  getTicket()
</script>

<style>
  @import "@/views/styles/queueView/queue-view.scss";
</style>
