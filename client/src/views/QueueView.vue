<template>
  <DefaultLayout>
    <h1
      v-if="!store.hasStudentTicket"
      class="queue__title">У вас нет активного тикета</h1>
    <div
      v-else
      class="queue-ticket"
    >
      <div class="queue-ticket__label">Ваш талон:</div>
      <h1 class="queue-ticket__title">{{ store.ticketData.ticket_abbreviation }}</h1>
      <div class="queue-ticket__position">
        <!-- <b>Поизиция в очереди:</b> {{ createdTicketData.ticket_position }} -->
      </div>
    </div>
    <template #controls>
      <template v-if="!store.hasStudentTicket">
        <h4 class="queue-registration__title">Заполните форму:</h4>
        <v-text-field
          v-model="store.ticketFormData.session_name"
          density="compact"
          variant="underlined"
          disabled
          label="Активная сессия"
        />
        <v-text-field
          v-model="store.ticketFormData.ticket_request"
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
          v-if="store.isRegistrationAlertVisible"
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

  import {
    getActiveSession,
    createQueueTicket,
    getTicket
  } from "@/views/helpers/queueClientView/queueClientView"
  import { useQueueClientStore } from "@/stores/useQueueClientStore"

  if (!localStorage.selected_session_id) router.push('/session')

  const store = useQueueClientStore()

  getActiveSession()
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
