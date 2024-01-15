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
        <!-- <b>Поизиция в очереди:</b> {{ createdTicketData.ticket_position }} -->
      </div>
    </div>
    <template #controls>
      <template v-if="!hasStudentTicket">
        <h4 class="queue-registration__title">Заполните форму:</h4>
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
        @click="createQueueTicket()"
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
      </template>
      <template v-else>
        <v-btn
          block
          @click="getTicket()"
          color="black"
        >
          Обновить
        </v-btn>
      </template>
      <v-btn
        class="queue__button--sessions"
        block
        @click="router.push('/session')"
        color="black"
      >
        к выбору сессии
      </v-btn>
    </template>
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
    if (!localStorage.user_id) return
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-session`, {params: {session_id: localStorage.selected_session_id}})
      createTicketFormData.value.session_name = response.data.session_name
      return true;
    } catch (e) {
      router.push('/session')
      return false;
    }
  }
  getActiveSession()

  const createQueueTicket = async () => {
    const activeSession = await getActiveSession()
    if (!activeSession) return
    if (!unref(createTicketFormData).ticket_request) return isRegistrationAlertVisible.value = true

    try {
      await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/create-ticket`, unref(createTicketFormData))
      await getTicket()
      isRegistrationAlertVisible.value = false
    } catch (e) {
      console.error(e)
    }
  }

  const getTicket = async () => {
    const activeSession = await getActiveSession()
    if (!activeSession) return

    if (!localStorage.user_id) return
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-single-ticket`, {params: {
        student_id: localStorage.user_id,
        session_id: localStorage.selected_session_id
      }})

      hasStudentTicket.value = !response.data.is_ticket_closed ? true : false
      createdTicketData.value = response.data
    } catch (e) {
      hasStudentTicket.value = false
      console.error(e)
    }
  }
  getTicket()

  // setInterval(async () => {
  //   if (!localStorage.user_id) return
  //   await getTicket()
  //   console.log('queue updated')
  // }, 10000)
</script>

<style>
  @import "@/views/styles/queueView/queue-view.scss";
</style>
